# The ClickFix loader waiting for orders on nearly 3,000 hacked sites

Nearly three in ten sites in Derp's [ClickFix tracker](https://www.derp.ca/clickfix/) carry the same hidden JavaScript loader. We call it LA02. It profiles the browser, reports to an external controller, and waits for code that can decide what happens to the visitor next.

On August 11, the tracker was watching 10,539 compromised sites. LA02 appeared on 2,997 of them.

The sites themselves are ordinary. Across the tracker, 92.7 percent sit on hosting infrastructure. Hostinger accounts for 1,251 hosts, while GoDaddy and Namecheap account for 214 and 213. These are the shared plans and familiar networks used by small businesses everywhere. The page still loads, the certificate is valid, and the domain is the one the visitor meant to open.

ClickFix gets the victim to run the malware. A compromised page shows a fake CAPTCHA, update prompt, or error, quietly puts a command on the clipboard, and talks the reader through pasting it into the Windows Run box or a terminal. The victim runs the command with their own hands, outside the browser's normal download flow. Derp has watched the technique deliver infostealers, remote access trojans, and blockchain-backed backdoors across [several](https://www.derp.ca/research/hellsuchecker-clickfix-etherhiding/) [prior](https://www.derp.ca/research/artlist-clickfix-native-rat/) [chains](https://www.derp.ca/research/serpentine-cloud-clickfix-return/).

We think LA02 is the part that decides who gets sent further down that road. Its controller can return JavaScript during registration or use LA02's browser API to bind later delivery to a selected click.

The controller keeps the payload decision server-side. An operator can change what the infected pages deliver, and which visitors receive it, without editing those pages again.

So we went looking for what the controller returned.

We examined 297 successful LA02 registrations, roughly 10 percent of the 2,997 infected sites we track. Every clean exchange we decoded returned one field, `vid`, and ended at registration.

The loader, protocol, and browser control API are already installed. The delivery decision stays on the controller.

---

## What happens when you visit one of these sites

You click a link to a business you know, or find it through a search. The page loads normally. Somewhere in the HTML sits a block of obfuscated JavaScript the owner did not put there.

The script runs before you finish reading the first paragraph. Its first move is a user-agent check for crawler and automation labels. A match stops execution; an ordinary Chrome or Firefox identity carries on.

Its second move is to delete its own script element. The code keeps running, while the script tag disappears from the rendered DOM.

Then it checks the storage owned by that website. One value identifies the browser on that origin. The other records when LA02 may register again after a selected click. It either recovers the device identifier or generates a new one.

Next it takes inventory. It counts trusted mouse movements and clicks, reads the full page URL, and walks through the page's JavaScript environment. The preserved examples contained between 244 and 355 names from frameworks, plugins, analytics, page builders, and other injected code.

It waits half a second, then sends the page URL, device ID, and inventory to an unrelated server. The message is scrambled, though not well.

That server returns the registration decision.

Every fully decoded answer we recovered contained one visitor ID. The loader also leaves its `fd5` control object in the page for controller-supplied or companion code.

---

## Eight steps and a 500-millisecond pause

Written as a path:

```text
compromised page
  -> obfuscated inline LA02 loader
  -> crawler and suppression checks
  -> same-origin device UUID
  -> page URL and JavaScript-environment inventory
  -> XOR-encoded POST /x9i32md/w1/la02
  -> XOR-encoded controller response
       -> vid only: registration stops
       -> vid plus js: execute controller JavaScript
            -> optional fd5 call
            -> optional selected browser-generated click
            -> optional follow-on request and returned JavaScript
```

Three names carry through the rest of this. `vid` is the visitor ID the controller issues. `js` is the optional response field that carries code. `fd5` is the control object the loader leaves in the page.

Registration completes on page load. A click matters when controller-supplied or companion code calls `fd5.cl()` with a target selector.

Later preserved builds run through eight steps:

1. Test the user agent against a crawler and automation expression.
2. Remove `document.currentScript` from the DOM.
3. Read the suppression timestamp from same-origin localStorage.
4. Create or recover a same-origin device UUID.
5. Register document-level mouse and click counters.
6. Install the `window.fd5` control object.
7. Wait 500 milliseconds.
8. Send the registration request.

The later user-agent expression is:

```text
bot|crawler|crawling|spider|headless|facebookexternalhit|whatsapp|sogou|ia_archiver|chatgpt|anthropic|googleother|lighthouse|mediapartners
```

A normal Linux Chrome user agent passes. Public scanning services can reach registration by presenting an ordinary browser identity. The filter screens out honest robots.

---

## The loader eats its own script tag

The preserved loaders are heavily obfuscated inline JavaScript. Variable names and encoded string tables change between builds, but the recovered entry flow remains recognizable.

One infected response contained a 24,489-byte loader at decoded-body offset 459,810. By the time the page finished rendering, the loader was gone from the DOM. Its first 256-byte prefix and the literal `fd5` and `x9i32md` strings were also absent.

Post-execution DOM inspection misses the implant. Preserve the original HTTP response, cached page body, database content, and browser network trace. The goblin cleans its plate.

---

## Two localStorage keys keep the visitor quiet for three days

Later builds use two localStorage keys:

| Key | Role |
| --- | --- |
| `akx02` | Device UUID exposed to the controller as `did` |
| `am80dq` | Registration suppression expiry timestamp |

When `akx02` is absent, the loader creates a UUID with `crypto.randomUUID()` and stores it. Because localStorage is origin-scoped, the identifier survives return visits and page changes on the same origin. Every infected hostname gets its own identifier.

The loader checks `am80dq` before registration. The `fd5.cl()` path sets it three days into the future after accepting the selected click and before receiving the controller result. Later page loads on that origin can stay quiet for three days whatever the request outcome.

Both keys survive a cookie clear. Testing should vary page origin, localStorage state, suppression expiry, browser profile, and network source separately.

---

## A repeating 16-byte XOR key exposes the protocol

The observed requests and responses use this repeating key:

```text
33 23 6f 30 a9 3b f4 da 9a 98 5a 08 0f 1e 93 b9
```

Decimal:

```text
51,35,111,48,169,59,244,218,154,152,90,8,15,30,147,185
```

The browser serializes a JSON object, encodes it as UTF-8, and XORs each byte with the repeating key. The response passes through the same operation before JSON parsing.

```javascript
function xor(bytes, key) {
  return bytes.map((value, index) => value ^ key[index % key.length]);
}

requestBytes = xor(utf8(JSON.stringify(request)), key);
response = JSON.parse(utf8(xor(responseBytes, key)));
```

This is reversible obfuscation with a reusable key. One preserved loader makes every intact body from that observed build readable.

One archived response had passed through lossy UTF-8 conversion. Replacement characters expanded a 46-byte ciphertext to 84 bytes and destroyed the original values. Preserve the ciphertext first and decode a working copy.

---

## The loader takes inventory before it asks for anything

After its 500-millisecond timer, the loader sends:

```http
POST https://<controller>/x9i32md/w1/la02
```

The decoded body has three fields:

```json
{
  "did": "<same-origin device UUID>",
  "u": "<current infected page URL>",
  "wks": ["<selected window property names>"]
}
```

| Field | Role |
| --- | --- |
| `did` | Device identity stored by the infected origin |
| `u` | Full current page URL |
| `wks` | Selected names from the page's JavaScript environment |

The page URL identifies the source of the visitor. The device value identifies return activity on that origin. The `wks` array inventories browser globals, frameworks, plugins, analytics, page builders, and other injected code.

One representative request contained 355 `wks` values. Another contained 244. The count moves with the site because the array inventories whatever that page loads. A conventional browser fingerprint returns a more stable field set.

The infected page supplies traffic and a trusted origin. The controller receives enough context to decide whether that visit is useful.

---

## One registration, byte for byte

A representative [urlscan.io capture](https://urlscan.io/result/019fecfc-0db0-74ed-a8dc-a989bd86fc1b/) loaded an infected page and registered with `fashion-chicken[.]com`. The browser trace names an inline script inside the infected document as the request initiator.

The initiator sat at zero-based line 2596, column 12723.

Timing, measured from the main document request:

| Offset | Event |
| --- | --- |
| 0.000s | Main document request |
| 0.640s | Main document response |
| 2.273s | LA02 registration request |
| 2.402s | LA02 registration response |

The controller answered in 128.484 milliseconds.

The encoded POST body is 6,508 bytes:

```text
SHA-256: 066b172f2dcda9ed321f6024300a1d4f8dc71b3c0264acd254d63e9cc78326a0
```

Its decoded JSON has the same byte length:

```text
SHA-256: ec04b666e77bf5dd347585e8a6829fee0f6b2cd1cc713adbbc54c1a65b411d13
```

The published excerpt redacts the infected URL and capture-specific identifiers:

```json
{
  "did": "<same-origin device UUID>",
  "u": "https://<infected page>/",
  "wks": ["0", "1", "2", "3", "parseFloat", "parseInt"]
}
```

The retained body continues through all 355 window-property names.

The controller returned HTTP 200 with a 46-byte XOR ciphertext:

```text
SHA-256: 78defc2eeb6c535b60a7d6a05dc036ff124536109d2ee8afea98da3dbe171e92
```

Decoding produces a single field:

```json
{"vid":"<controller-issued visitor UUID>"}
```

```text
Plaintext SHA-256: 7590e51982569db62231f4a265448abfb1aaede76df4aaa6d33109cd7ba2b5b7
```

Both plaintext hashes cover the unredacted bodies.

---

## The fd5 API controls later delivery

The registration response supports an optional JavaScript field:

```json
{
  "vid": "<visitor UUID>",
  "js": "<optional controller JavaScript>"
}
```

When `js` is present, the loader passes it to indirect `eval` inside the infected page's browser context. The code can use page APIs and the `window.fd5` object installed by the loader.

| Method | Client behavior |
| --- | --- |
| `fd5.cl(selector, fk, delay)` | Binds a one-shot click handler, sets suppression, sends interaction telemetry to `icj1`, and evaluates returned JavaScript |
| `fd5.ch()` | Sends `vid` and `did` to `uf3j`; resolves true when the decoded numeric response equals `1` |
| `fd5.bl()` | Sends `vid` and `did` to `sci5`; discards the decoded response value |

`fd5.cl()` accepts clicks carrying the browser's `isTrusted` flag. A page-level `dispatchEvent()` call produces `isTrusted: false`. Browser automation can still generate trusted input, so the flag filters cheap synthetic clicks without proving a person.

The click request carries:

| Field | Meaning |
| --- | --- |
| `vid` | Controller-issued visitor UUID |
| `did` | Same-origin device UUID |
| `vrms` | Registration duration |
| `mm` | Trusted mousemove count |
| `dc` | Trusted click count |
| `fk` | Caller-supplied gate value |
| `vis` | Page visible and window focused |
| `ms` | Time from registration completion to the selected click |

The controller receives activity, focus, visibility, and timing signals with the selected click. If `icj1` returns JavaScript, the loader evaluates it after adjusting the requested delay for network time.

The observed `sci5` behavior sends `vid` and `did`. The client then discards the returned value.

---

## 297 responses, 46 bytes each

All 297 responses were 46 bytes, and every body had a distinct hash. That pattern is consistent with a unique UUID in each response. The clean exchanges we decoded followed the same shape:

- Every request contained exactly `did`, `u`, and `wks`.
- Every response contained exactly `vid`.
- Every trace ended at registration.

---

## Two implants share a page and ignore each other

LA02 repeatedly appeared beside Polygon-based EtherHiding loaders. We inspected those pages at browser-initiator level.

Every capture contained separate script tags and separate Chrome DevTools Protocol script IDs for LA02 and EtherHiding. The Polygon request began before the LA02 POST each time. EtherHiding controller requests inherited the EtherHiding script ID, while LA02 requests inherited the LA02 script ID.

Each script kept its own configuration. LA02 carried its routes, controller hosts, state model, and telemetry API. EtherHiding carried contracts, RPC hosts, selectors, controller paths, and site tokens.

The August captures used the same EtherHiding design with randomized identifiers:

- Polygon JSON-RPC `eth_call` through an ordered fallback list.
- An ABI string decoder.
- A per-site 48-hex token.
- A dynamically created script element.
- A controller path shaped as `/api.php?s=<48 hex>` with an optional Unix-minute `_v` value.

Those captures rotated the contract, controller, RPC order, site token, window guard, and cache value. Earlier mixed captures used different EtherHiding templates and stage paths.

The EtherHiding controllers returned a mix of HTTP 404s, JavaScript no-ops, and requests with no recorded body. In the Mubi capture, LA02's `wks` inventory recorded globals left by the co-resident implant.

That visibility is passive. Every LA02 call in the captures goes to its own controller.

The browser initiator graph establishes independent execution chains on the same pages. The EtherHiding chain owns its Polygon and API requests; LA02 owns its registration request.

In these captures, EtherHiding handled the visible ClickFix web stage. LA02 handled browser profiling and server-controlled delivery through its own script and controller.

---

## LA02 controls the traffic

Our working model is that LA02 acts as a traffic distribution system. It profiles each visitor and lets the external controller decide which browsers should receive code and when.

Several parts of LA02 fit that job:

- The compromised origin supplies legitimate traffic and user trust.
- The user-agent filter removes obvious crawlers and analysis tools.
- `u` identifies the page that produced the visit.
- `wks` inventories frameworks, plugins, analytics, and other injected code.
- Same-origin device state and three-day suppression reduce repeated exposure.
- Mouse, click, visibility, focus, and timing values help score browser activity.
- Remote `js` delivery separates site compromise from delivery policy.

The infected page supplies the traffic. LA02 gives the controller the page, device, environment, and activity signals needed to make a separate delivery decision for each visitor.

This resembles the operating model in our [SocGholish gateway analysis](https://www.derp.ca/research/ta2726-wordpress-malware-launchpads/). There, a compromised WordPress site handled visitor state and relayed an upstream delivery decision. LA02 performs a similar traffic-selection job through an injected browser loader and external controller.

Both systems use a compromised site as a gateway for an upstream traffic-selection decision.

---

## Three loader builds preserve the protocol

| SHA-256 | Controller | Size |
| --- | --- | ---: |
| `69ce445bfca08d447edd576a12e81c36f9fee521a73d582078edc944e7665ef9` | `h1-analytics[.]com` | 27,298 |
| `e6dddd4860ebe1b56cee4446172daf839b6276786ebb29c5793203c3460a81f5` | `fashion-chicken[.]com` | 24,489 |
| `394ae3b71f9ea66f0541d99e6b771461f828b104793a086d76ce903409c0bdbe` | `fashion-chicken[.]com` | 23,391 |

The March build shows its age against the August pair:

- Its bot expression ends at `anthropic`. Later builds append `googleother`, `lighthouse`, and `mediapartners`.
- It uses `querySelectorAll` and `preventDefault`, where later builds use `querySelector`.
- Its storage labels decode as `<DEVICE_ID_KEY>` and `<SKIP_TS_KEY>`.
- Its registration sent 344 `wks` values, including 126 `on*` event properties.
- The August examples sent 355 and 244 values while excluding `on*` names.

Across all three builds, the route family, repeating key, registration schema, visitor ID, and `fd5` API stay recognizable. Collection details, storage labels, and obfuscation moved.

---

## Match the full route, then widen

Use the complete routes as network anchors:

```text
/x9i32md/w1/la02
/x9i32md/w1/icj1
/x9i32md/w1/uf3j
/x9i32md/w1/sci5
```

Match each route in full. The shared prefix and four-character labels collide with ordinary traffic on their own, while the complete paths stay precise.

```text
legitimate page loads an obfuscated inline script
  -> cross-origin POST to /x9i32md/w1/la02
  -> XOR-looking request body
  -> text/plain response
  -> common successful recorded body length of 46 bytes
  -> optional later POST to icj1, uf3j, or sci5
```

Decoded and runtime anchors:

```text
akx02
am80dq
window.fd5
51,35,111,48,169,59,244,218,154,152,90,8,15,30,147,185
```

Short fields such as `did`, `vid`, `mm`, `dc`, `fk`, and `vis` work as supporting context. Each is too generic to carry a detection alone.

Site-side hunting should inspect original responses, page caches, database content, theme files, plugin files, must-use plugins, and injected header or footer blocks. The loader removes its script element, and its encoded string table may hide literal routes in the raw source.

Browser-side findings include new same-origin `akx02` or `am80dq` values, a new `window.fd5` object, and cross-origin POSTs to the complete route family.

---

## Indicators of compromise

### Routes and state

```text
/x9i32md/w1/la02
/x9i32md/w1/icj1
/x9i32md/w1/uf3j
/x9i32md/w1/sci5
akx02
am80dq
window.fd5
```

### Controller infrastructure

```text
h1-analytics[.]com
a1-analytics[.]sbs
a2-analytics[.]xyz
fg-analytics[.]biz
bacon-rumors[.]xyz
fashion-chicken[.]com
siege-close[.]com
admiration-noble[.]sbs
great-fade[.]sbs
grant-member[.]pro
pace-draft[.]sbs
football-attraction[.]pro
rebel-pause[.]xyz
mg-analytics[.]sbs
relaxation-seed[.]xyz
carpet-sail[.]com
```

The dictionary-pair name generator is clearly enjoying itself.

---

## The server keeps the second decision

LA02 creates a remote decision point inside a compromised page. The installed script registers the visit, inventories the page environment, and exposes an optional interaction gate. The controller can change delivery policy without modifying the infected site again.

The browser traces show the EtherHiding and LA02 scripts running as separate chains on the same page. That overlap is worth tracking.

Every fully decoded LA02 response issued a visitor ID and ended at registration. The loader architecture keeps the next delivery decision on the server.
