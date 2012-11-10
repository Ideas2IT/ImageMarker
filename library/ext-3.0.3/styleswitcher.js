/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
function setActiveStyleSheet(f){var e,c,d=document.getElementsByTagName("link"),b=d.length;
for(e=0;
e<b;
e++){c=d[e];
if(c.getAttribute("rel").indexOf("style")!=-1&&c.getAttribute("title")){c.disabled=true;
if(c.getAttribute("title")==f){c.disabled=false
}}}}function getActiveStyleSheet(){var e,c,d=document.getElementsByTagName("link"),b=d.length;
for(e=0;
e<b;
e++){c=d[e];
if(c.getAttribute("rel").indexOf("style")!=-1&&c.getAttribute("title")&&!c.disabled){return c.getAttribute("title")
}}return null
}function getPreferredStyleSheet(){var e,c,d=document.getElementsByTagName("link"),b=d.length;
for(e=0;
e<b;
e++){c=d[e];
if(c.getAttribute("rel").indexOf("style")!=-1&&c.getAttribute("rel").indexOf("alt")==-1&&c.getAttribute("title")){return c.getAttribute("title")
}}return null
}function createCookie(c,d,e){if(e){var b=new Date();
b.setTime(b.getTime()+(e*24*60*60*1000));
var a="; expires="+b.toGMTString()
}else{a=""
}document.cookie=c+"="+d+a+"; path=/"
}function readCookie(d){var f=d+"=",b=document.cookie.split(";"),e,g,a=b.length;
for(e=0;
e<a;
e++){g=b[e];
while(g.charAt(0)==" "){g=g.substring(1,g.length)
}if(g.indexOf(f)==0){return g.substring(f.length,g.length)
}}return null
}window.onload=function(b){var a=readCookie("style");
var c=a?a:getPreferredStyleSheet();
setActiveStyleSheet(c)
};
window.onunload=function(a){var b=getActiveStyleSheet();
createCookie("style",b,365)
};
var cookie=readCookie("style");
var title=cookie?cookie:getPreferredStyleSheet();
setActiveStyleSheet(title);