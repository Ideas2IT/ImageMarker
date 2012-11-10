window.undefined=window.undefined;
Ext={version:"3.1.0"};
Ext.apply=function(h,g,c){if(c){Ext.apply(h,c)
}if(h&&g&&typeof g=="object"){for(var f in g){h[f]=g[f]
}}return h
};
(function(){var W=0,I=Object.prototype.toString,H=navigator.userAgent.toLowerCase(),C=function(a){return a.test(H)
},U=document,R=U.compatMode=="CSS1Compat",M=C(/opera/),V=C(/chrome/),G=C(/webkit/),D=!V&&C(/safari/),X=D&&C(/applewebkit\/4/),aa=D&&C(/version\/3/),K=D&&C(/version\/4/),J=!M&&C(/msie/),N=J&&C(/msie 7/),O=J&&C(/msie 8/),L=J&&!N&&!O,P=!G&&C(/gecko/),Y=P&&C(/rv:1\.8/),ab=P&&C(/rv:1\.9/),F=J&&!R,e=C(/windows|win32/),S=C(/macintosh|mac os x/),T=C(/adobeair/),Q=C(/linux/),Z=/^https/i.test(window.location.protocol);
if(L){try{U.execCommand("BackgroundImageCache",false,true)
}catch(E){}}Ext.apply(Ext,{SSL_SECURE_URL:Z&&J?'javascript:""':"about:blank",isStrict:R,isSecure:Z,isReady:false,enableGarbageCollector:true,enableListenerCollection:false,enableNestedListenerRemoval:false,USE_NATIVE_JSON:false,applyIf:function(c,b){if(c){for(var a in b){if(!Ext.isDefined(c[a])){c[a]=b[a]
}}}return c
},id:function(a,b){return(a=Ext.getDom(a)||{}).id=a.id||(b||"ext-gen")+(++W)
},extend:function(){var b=function(c){for(var d in c){this[d]=c[d]
}};
var a=Object.prototype.constructor;
return function(c,g,d){if(Ext.isObject(g)){d=g;
g=c;
c=d.constructor!=a?d.constructor:function(){g.apply(this,arguments)
}
}var h=function(){},f,i=g.prototype;
h.prototype=i;
f=c.prototype=new h();
f.constructor=c;
c.superclass=i;
if(i.constructor==a){i.constructor=g
}c.override=function(j){Ext.override(c,j)
};
f.superclass=f.supr=(function(){return i
});
f.override=b;
Ext.override(c,d);
c.extend=function(j){return Ext.extend(c,j)
};
return c
}
}(),override:function(b,a){if(a){var c=b.prototype;
Ext.apply(c,a);
if(Ext.isIE&&a.hasOwnProperty("toString")){c.toString=a.toString
}}},namespace:function(){var b,a;
Ext.each(arguments,function(c){a=c.split(".");
b=window[a[0]]=window[a[0]]||{};
Ext.each(a.slice(1),function(d){b=b[d]=b[d]||{}
})
});
return b
},urlEncode:function(a,b){var d,f=[],c=encodeURIComponent;
Ext.iterate(a,function(h,g){d=Ext.isEmpty(g);
Ext.each(d?h:g,function(i){f.push("&",c(h),"=",(!Ext.isEmpty(i)&&(i!=h||!d))?(Ext.isDate(i)?Ext.encode(i).replace(/"/g,""):c(i)):"")
})
});
if(!b){f.shift();
b=""
}return b+f.join("")
},urlDecode:function(g,h){if(Ext.isEmpty(g)){return{}
}var b={},c=g.split("&"),a=decodeURIComponent,f,d;
Ext.each(c,function(i){i=i.split("=");
f=a(i[0]);
d=a(i[1]);
b[f]=h||!b[f]?d:[].concat(b[f]).concat(d)
});
return b
},urlAppend:function(a,b){if(!Ext.isEmpty(b)){return a+(a.indexOf("?")===-1?"?":"&")+b
}return a
},toArray:function(){return J?function(f,a,c,b){b=[];
for(var g=0,d=f.length;
g<d;
g++){b.push(f[g])
}return b.slice(a||0,c||b.length)
}:function(b,a,c){return Array.prototype.slice.call(b,a||0,c||b.length)
}
}(),isIterable:function(a){if(Ext.isArray(a)||a.callee){return true
}if(/NodeList|HTMLCollection/.test(I.call(a))){return true
}return((a.nextNode||a.item)&&Ext.isNumber(a.length))
},each:function(a,b,d){if(Ext.isEmpty(a,true)){return
}if(!Ext.isIterable(a)||Ext.isPrimitive(a)){a=[a]
}for(var f=0,c=a.length;
f<c;
f++){if(b.call(d||a[f],a[f],f,a)===false){return f
}}},iterate:function(c,d,b){if(Ext.isEmpty(c)){return
}if(Ext.isIterable(c)){Ext.each(c,d,b);
return
}else{if(Ext.isObject(c)){for(var a in c){if(c.hasOwnProperty(a)){if(d.call(b||c,a,c[a],c)===false){return
}}}}}},getDom:function(a){if(!a||!U){return null
}return a.dom?a.dom:(Ext.isString(a)?U.getElementById(a):a)
},getBody:function(){return Ext.get(U.body||U.documentElement)
},removeNode:J&&!O?function(){var a;
return function(b){if(b&&b.tagName!="BODY"){(Ext.enableNestedListenerRemoval)?Ext.EventManager.purgeElement(b,true):Ext.EventManager.removeAll(b);
a=a||U.createElement("div");
a.appendChild(b);
a.innerHTML="";
delete Ext.elCache[b.id]
}}
}():function(a){if(a&&a.parentNode&&a.tagName!="BODY"){(Ext.enableNestedListenerRemoval)?Ext.EventManager.purgeElement(a,true):Ext.EventManager.removeAll(a);
a.parentNode.removeChild(a);
delete Ext.elCache[a.id]
}},isEmpty:function(b,a){return b===null||b===undefined||((Ext.isArray(b)&&!b.length))||(!a?b==="":false)
},isArray:function(a){return I.apply(a)==="[object Array]"
},isDate:function(a){return I.apply(a)==="[object Date]"
},isObject:function(a){return !!a&&Object.prototype.toString.call(a)==="[object Object]"
},isPrimitive:function(a){return Ext.isString(a)||Ext.isNumber(a)||Ext.isBoolean(a)
},isFunction:function(a){return I.apply(a)==="[object Function]"
},isNumber:function(a){return typeof a==="number"&&isFinite(a)
},isString:function(a){return typeof a==="string"
},isBoolean:function(a){return typeof a==="boolean"
},isElement:function(a){return !!a&&a.tagName
},isDefined:function(a){return typeof a!=="undefined"
},isOpera:M,isWebKit:G,isChrome:V,isSafari:D,isSafari3:aa,isSafari4:K,isSafari2:X,isIE:J,isIE6:L,isIE7:N,isIE8:O,isGecko:P,isGecko2:Y,isGecko3:ab,isBorderBox:F,isLinux:Q,isWindows:e,isMac:S,isAir:T});
Ext.ns=Ext.namespace
})();
Ext.ns("Ext.util","Ext.lib","Ext.data");
Ext.elCache={};
Ext.apply(Function.prototype,{createInterceptor:function(d,e){var f=this;
return !Ext.isFunction(d)?this:function(){var a=this,b=arguments;
d.target=a;
d.method=f;
return(d.apply(e||a||window,b)!==false)?f.apply(a||window,b):null
}
},createCallback:function(){var d=arguments,c=this;
return function(){return c.apply(window,d)
}
},createDelegate:function(h,e,f){var g=this;
return function(){var a=e||arguments;
if(f===true){a=Array.prototype.slice.call(arguments,0);
a=a.concat(e)
}else{if(Ext.isNumber(f)){a=Array.prototype.slice.call(arguments,0);
var b=[f,0].concat(e);
Array.prototype.splice.apply(a,b)
}}return g.apply(h||window,a)
}
},defer:function(j,h,f,g){var i=this.createDelegate(h,f,g);
if(j>0){return setTimeout(i,j)
}i();
return 0
}});
Ext.applyIf(String,{format:function(c){var d=Ext.toArray(arguments,1);
return c.replace(/\{(\d+)\}/g,function(b,a){return d[a]
})
}});
Ext.applyIf(Array.prototype,{indexOf:function(d,f){var e=this.length;
f=f||0;
f+=(f<0)?e:0;
for(;
f<e;
++f){if(this[f]===d){return f
}}return -1
},remove:function(c){var d=this.indexOf(c);
if(d!=-1){this.splice(d,1)
}return this
}});
Ext.ns("Ext.grid","Ext.list","Ext.dd","Ext.tree","Ext.form","Ext.menu","Ext.state","Ext.layout","Ext.app","Ext.ux","Ext.chart","Ext.direct");
Ext.apply(Ext,function(){var f=Ext,e=0,d=null;
return{emptyFn:function(){},BLANK_IMAGE_URL:Ext.isIE6||Ext.isIE7||Ext.isAir?"http://extjs.com/s.gif":"data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",extendX:function(b,a){return Ext.extend(b,a(b.prototype))
},getDoc:function(){return Ext.get(document)
},num:function(a,b){a=Number(Ext.isEmpty(a)||Ext.isBoolean(a)?NaN:a);
return isNaN(a)?b:a
},value:function(a,c,b){return Ext.isEmpty(a,b)?c:a
},escapeRe:function(a){return a.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1")
},sequence:function(a,h,b,c){a[h]=a[h].createSequence(b,c)
},addBehaviors:function(a){if(!Ext.isReady){Ext.onReady(function(){Ext.addBehaviors(a)
})
}else{var i={},b,j,c;
for(j in a){if((b=j.split("@"))[1]){c=b[0];
if(!i[c]){i[c]=Ext.select(c)
}i[c].on(b[1],a[j])
}}i=null
}},getScrollBarWidth:function(c){if(!Ext.isReady){return 0
}if(c===true||d===null){var a=Ext.getBody().createChild('<div class="x-hide-offsets" style="width:100px;height:50px;overflow:hidden;"><div style="height:200px;"></div></div>'),b=a.child("div",true);
var i=b.offsetWidth;
a.setStyle("overflow",(Ext.isWebKit||Ext.isGecko)?"auto":"scroll");
var j=b.offsetWidth;
a.remove();
d=i-j+2
}return d
},combine:function(){var c=arguments,i=c.length,a=[];
for(var b=0;
b<i;
b++){var j=c[b];
if(Ext.isArray(j)){a=a.concat(j)
}else{if(j.length!==undefined&&!j.substr){a=a.concat(Array.prototype.slice.call(j,0))
}else{a.push(j)
}}}return a
},copyTo:function(c,b,a){if(Ext.isString(a)){a=a.split(/[,;\s]/)
}Ext.each(a,function(h){if(b.hasOwnProperty(h)){c[h]=b[h]
}},this);
return c
},destroy:function(){Ext.each(arguments,function(a){if(a){if(Ext.isArray(a)){this.destroy.apply(this,a)
}else{if(Ext.isFunction(a.destroy)){a.destroy()
}else{if(a.dom){a.remove()
}}}}},this)
},destroyMembers:function(a,c,l,i){for(var b=1,m=arguments,n=m.length;
b<n;
b++){Ext.destroy(a[m[b]]);
delete a[m[b]]
}},clean:function(b){var a=[];
Ext.each(b,function(c){if(!!c){a.push(c)
}});
return a
},unique:function(c){var b=[],a={};
Ext.each(c,function(h){if(!a[h]){b.push(h)
}a[h]=true
});
return b
},flatten:function(c){var a=[];
function b(h){Ext.each(h,function(g){if(Ext.isArray(g)){b(g)
}else{a.push(g)
}});
return a
}return b(c)
},min:function(c,b){var a=c[0];
b=b||function(i,j){return i<j?-1:1
};
Ext.each(c,function(h){a=b(a,h)==-1?a:h
});
return a
},max:function(c,b){var a=c[0];
b=b||function(i,j){return i>j?1:-1
};
Ext.each(c,function(h){a=b(a,h)==1?a:h
});
return a
},mean:function(a){return Ext.sum(a)/a.length
},sum:function(b){var a=0;
Ext.each(b,function(c){a+=c
});
return a
},partition:function(c,b){var a=[[],[]];
Ext.each(c,function(k,i,l){a[(b&&b(k,i,l))||(!b&&k)?0:1].push(k)
});
return a
},invoke:function(h,c){var a=[],b=Array.prototype.slice.call(arguments,2);
Ext.each(h,function(i,g){if(i&&Ext.isFunction(i[c])){a.push(i[c].apply(i,b))
}else{a.push(undefined)
}});
return a
},pluck:function(c,a){var b=[];
Ext.each(c,function(h){b.push(h[a])
});
return b
},zip:function(){var a=Ext.partition(arguments,function(g){return !Ext.isFunction(g)
}),i=a[0],b=a[1][0],p=Ext.max(Ext.pluck(i,"length")),j=[];
for(var c=0;
c<p;
c++){j[c]=[];
if(b){j[c]=b.apply(b,Ext.pluck(i,c))
}else{for(var n=0,o=i.length;
n<o;
n++){j[c].push(i[n][c])
}}}return j
},getCmp:function(a){return Ext.ComponentMgr.get(a)
},useShims:f.isIE6||(f.isMac&&f.isGecko2),type:function(a){if(a===undefined||a===null){return false
}if(a.htmlElement){return"element"
}var b=typeof a;
if(b=="object"&&a.nodeName){switch(a.nodeType){case 1:return"element";
case 3:return(/\S/).test(a.nodeValue)?"textnode":"whitespace"
}}if(b=="object"||b=="function"){switch(a.constructor){case Array:return"array";
case RegExp:return"regexp";
case Date:return"date"
}if(Ext.isNumber(a.length)&&Ext.isFunction(a.item)){return"nodelist"
}}return b
},intercept:function(a,h,b,c){a[h]=a[h].createInterceptor(b,c)
},callback:function(h,a,b,c){if(Ext.isFunction(h)){if(c){h.defer(c,a,b||[])
}else{h.apply(a,b||[])
}}}}
}());
Ext.apply(Function.prototype,{createSequence:function(d,e){var f=this;
return !Ext.isFunction(d)?this:function(){var a=f.apply(this||window,arguments);
d.apply(e||this||window,arguments);
return a
}
}});
Ext.applyIf(String,{escape:function(b){return b.replace(/('|\\)/g,"\\$1")
},leftPad:function(g,e,h){var f=String(g);
if(!h){h=" "
}while(f.length<e){f=h+f
}return f
}});
String.prototype.toggle=function(c,d){return this==c?d:c
};
String.prototype.trim=function(){var b=/^\s+|\s+$/g;
return function(){return this.replace(b,"")
}
}();
Date.prototype.getElapsed=function(b){return Math.abs((b||new Date()).getTime()-this.getTime())
};
Ext.applyIf(Number.prototype,{constrain:function(c,d){return Math.min(Math.max(this,c),d)
}});
Ext.util.TaskRunner=function(n){n=n||10;
var m=[],r=[],q=0,l=false,o=function(){l=false;
clearInterval(q);
q=0
},k=function(){if(!l){l=true;
q=setInterval(j,n)
}},p=function(a){r.push(a);
if(a.onStop){a.onStop.apply(a.scope||a)
}},j=function(){var b=r.length,g=new Date().getTime();
if(b>0){for(var e=0;
e<b;
e++){m.remove(r[e])
}r=[];
if(m.length<1){o();
return
}}for(var e=0,f,c,a,d=m.length;
e<d;
++e){f=m[e];
c=g-f.taskRunTime;
if(f.interval<=c){a=f.run.apply(f.scope||f,f.args||[++f.taskRunCount]);
f.taskRunTime=g;
if(a===false||f.taskRunCount===f.repeat){p(f);
return
}}if(f.duration&&f.duration<=(g-f.taskStartTime)){p(f)
}}};
this.start=function(a){m.push(a);
a.taskStartTime=new Date().getTime();
a.taskRunTime=0;
a.taskRunCount=0;
k();
return a
};
this.stop=function(a){p(a);
return a
};
this.stopAll=function(){o();
for(var a=0,b=m.length;
a<b;
a++){if(m[a].onStop){m[a].onStop()
}}m=[];
r=[]
}
};
Ext.TaskMgr=new Ext.util.TaskRunner();
if(typeof jQuery=="undefined"){throw"Unable to load Ext, jQuery not found."
}(function(){var d;
Ext.lib.Dom={getViewWidth:function(a){return a?Math.max(jQuery(document).width(),jQuery(window).width()):jQuery(window).width()
},getViewHeight:function(a){return a?Math.max(jQuery(document).height(),jQuery(window).height()):jQuery(window).height()
},isAncestor:function(b,a){var c=false;
b=Ext.getDom(b);
a=Ext.getDom(a);
if(b&&a){if(b.contains){return b.contains(a)
}else{if(b.compareDocumentPosition){return !!(b.compareDocumentPosition(a)&16)
}else{while(a=a.parentNode){c=a==b||c
}}}}return c
},getRegion:function(a){return Ext.lib.Region.getRegion(a)
},getY:function(a){return this.getXY(a)[1]
},getX:function(a){return this.getXY(a)[0]
},getXY:function(v){var w,r,p,c,s=(document.body||document.documentElement);
v=Ext.getDom(v);
if(v==s){return[0,0]
}if(v.getBoundingClientRect){p=v.getBoundingClientRect();
c=f(document).getScroll();
return[Math.round(p.left+c.left),Math.round(p.top+c.top)]
}var b=0,q=0;
w=v;
var x=f(v).getStyle("position")=="absolute";
while(w){b+=w.offsetLeft;
q+=w.offsetTop;
if(!x&&f(w).getStyle("position")=="absolute"){x=true
}if(Ext.isGecko){r=f(w);
var a=parseInt(r.getStyle("borderTopWidth"),10)||0;
var u=parseInt(r.getStyle("borderLeftWidth"),10)||0;
b+=u;
q+=a;
if(w!=v&&r.getStyle("overflow")!="visible"){b+=u;
q+=a
}}w=w.offsetParent
}if(Ext.isSafari&&x){b-=s.offsetLeft;
q-=s.offsetTop
}if(Ext.isGecko&&!x){var t=f(s);
b+=parseInt(t.getStyle("borderLeftWidth"),10)||0;
q+=parseInt(t.getStyle("borderTopWidth"),10)||0
}w=v.parentNode;
while(w&&w!=s){if(!Ext.isOpera||(w.tagName!="TR"&&f(w).getStyle("display")!="inline")){b-=w.scrollLeft;
q-=w.scrollTop
}w=w.parentNode
}return[b,q]
},setXY:function(c,b){c=Ext.fly(c,"_setXY");
c.position();
var a=c.translatePoints(b);
if(b[0]!==false){c.dom.style.left=a.left+"px"
}if(b[1]!==false){c.dom.style.top=a.top+"px"
}},setX:function(a,b){this.setXY(a,[b,false])
},setY:function(b,a){this.setXY(b,[false,a])
}};
function f(a){if(!d){d=new Ext.Element.Flyweight()
}d.dom=a;
return d
}Ext.lib.Event={getPageX:function(a){a=a.browserEvent||a;
return a.pageX
},getPageY:function(a){a=a.browserEvent||a;
return a.pageY
},getXY:function(a){a=a.browserEvent||a;
return[a.pageX,a.pageY]
},getTarget:function(a){return a.target
},on:function(a,j,b,c,i){jQuery(a).bind(j,b)
},un:function(a,c,b){jQuery(a).unbind(c,b)
},purgeElement:function(a){jQuery(a).unbind()
},preventDefault:function(a){a=a.browserEvent||a;
if(a.preventDefault){a.preventDefault()
}else{a.returnValue=false
}},stopPropagation:function(a){a=a.browserEvent||a;
if(a.stopPropagation){a.stopPropagation()
}else{a.cancelBubble=true
}},stopEvent:function(a){this.preventDefault(a);
this.stopPropagation(a)
},onAvailable:function(a,l,m){var b=new Date();
var k=function(){if(b.getElapsed()>10000){clearInterval(c)
}var g=document.getElementById(a);
if(g){clearInterval(c);
l.call(m||window,g)
}};
var c=setInterval(k,50)
},resolveTextNode:Ext.isGecko?function(a){if(!a){return
}var b=HTMLElement.prototype.toString.call(a);
if(b=="[xpconnect wrapped native prototype]"||b=="[object XULElement]"){return
}return a.nodeType==3?a.parentNode:a
}:function(a){return a&&a.nodeType==3?a.parentNode:a
},getRelatedTarget:function(a){a=a.browserEvent||a;
var b=a.relatedTarget;
if(!b){if(a.type=="mouseout"){b=a.toElement
}else{if(a.type=="mouseover"){b=a.fromElement
}}}return this.resolveTextNode(b)
}};
Ext.lib.Ajax=function(){var b=function(c){return function(i,j){if((j=="error"||j=="timeout")&&c.failure){c.failure.call(c.scope||window,a(c,i))
}else{if(c.success){c.success.call(c.scope||window,a(c,i))
}}}
};
var a=function(r,c){var p={},n,q,o;
try{n=c.getAllResponseHeaders();
Ext.each(n.replace(/\r\n/g,"\n").split("\n"),function(g){q=g.indexOf(":");
if(q>=0){o=g.substr(0,q).toLowerCase();
if(g.charAt(q+1)==" "){++q
}p[o]=g.substr(q+1)
}})
}catch(m){}return{responseText:c.responseText,responseXML:c.responseXML,argument:r.argument,status:c.status,statusText:c.statusText,getResponseHeader:function(g){return p[g.toLowerCase()]
},getAllResponseHeaders:function(){return n
}}
};
return{request:function(c,o,r,n,q){var m={type:c,url:o,data:n,timeout:r.timeout,complete:b(r)};
if(q){var p=q.headers;
if(q.xmlData){m.data=q.xmlData;
m.processData=false;
m.type=(c?c:(q.method?q.method:"POST"));
if(!p||!p["Content-Type"]){m.contentType="text/xml"
}}else{if(q.jsonData){m.data=typeof q.jsonData=="object"?Ext.encode(q.jsonData):q.jsonData;
m.processData=false;
m.type=(c?c:(q.method?q.method:"POST"));
if(!p||!p["Content-Type"]){m.contentType="application/json"
}}}if(p){m.beforeSend=function(h){for(var g in p){if(p.hasOwnProperty(g)){h.setRequestHeader(g,p[g])
}}}
}}jQuery.ajax(m)
},formRequest:function(l,m,o,c,p,n){jQuery.ajax({type:Ext.getDom(l).method||"POST",url:m,data:jQuery(l).serialize()+(c?"&"+c:""),timeout:o.timeout,complete:b(o)})
},isCallInProgress:function(c){return false
},abort:function(c){return false
},serializeForm:function(c){return jQuery(c.dom||c).serialize()
}}
}();
Ext.lib.Anim=function(){var a=function(h,c){var b=true;
return{stop:function(g){},isAnimated:function(){return b
},proxyCallback:function(){b=false;
Ext.callback(h,c)
}}
};
return{scroll:function(m,o,c,b,p,n){var l=a(p,n);
m=Ext.getDom(m);
if(typeof o.scroll.to[0]=="number"){m.scrollLeft=o.scroll.to[0]
}if(typeof o.scroll.to[1]=="number"){m.scrollTop=o.scroll.to[1]
}l.proxyCallback();
return l
},motion:function(k,m,c,b,n,l){return this.run(k,m,c,b,n,l)
},color:function(m,o,c,b,p,n){var l=a(p,n);
l.proxyCallback();
return l
},run:function(A,c,x,k,z,E,b){var w=a(z,E),v=Ext.fly(A,"_animrun");
var B={};
for(var y in c){switch(y){case"points":var o,C;
v.position();
if(o=c.points.by){var D=v.getXY();
C=v.translatePoints([D[0]+o[0],D[1]+o[1]])
}else{C=v.translatePoints(c.points.to)
}B.left=C.left;
B.top=C.top;
if(!parseInt(v.getStyle("left"),10)){v.setLeft(0)
}if(!parseInt(v.getStyle("top"),10)){v.setTop(0)
}if(c.points.from){v.setXY(c.points.from)
}break;
case"width":B.width=c.width.to;
if(c.width.from){v.setWidth(c.width.from)
}break;
case"height":B.height=c.height.to;
if(c.height.from){v.setHeight(c.height.from)
}break;
case"opacity":B.opacity=c.opacity.to;
if(c.opacity.from){v.setOpacity(c.opacity.from)
}break;
case"left":B.left=c.left.to;
if(c.left.from){v.setLeft(c.left.from)
}break;
case"top":B.top=c.top.to;
if(c.top.from){v.setTop(c.top.from)
}break;
case"callback":case"scope":break;
default:B[y]=c[y].to;
if(c[y].from){v.setStyle(y,c[y].from)
}break
}}jQuery(A).animate(B,x*1000,undefined,w.proxyCallback);
return w
}}
}();
Ext.lib.Region=function(b,a,h,c){this.top=b;
this[1]=b;
this.right=a;
this.bottom=h;
this.left=c;
this[0]=c
};
Ext.lib.Region.prototype={contains:function(a){return(a.left>=this.left&&a.right<=this.right&&a.top>=this.top&&a.bottom<=this.bottom)
},getArea:function(){return((this.bottom-this.top)*(this.right-this.left))
},intersect:function(a){var c=Math.max(this.top,a.top);
var b=Math.min(this.right,a.right);
var j=Math.min(this.bottom,a.bottom);
var i=Math.max(this.left,a.left);
if(j>=c&&b>=i){return new Ext.lib.Region(c,b,j,i)
}else{return null
}},union:function(a){var c=Math.min(this.top,a.top);
var b=Math.max(this.right,a.right);
var j=Math.max(this.bottom,a.bottom);
var i=Math.min(this.left,a.left);
return new Ext.lib.Region(c,b,j,i)
},constrainTo:function(a){this.top=this.top.constrain(a.top,a.bottom);
this.bottom=this.bottom.constrain(a.top,a.bottom);
this.left=this.left.constrain(a.left,a.right);
this.right=this.right.constrain(a.left,a.right);
return this
},adjust:function(b,c,h,a){this.top+=b;
this.left+=c;
this.right+=a;
this.bottom+=h;
return this
}};
Ext.lib.Region.getRegion=function(c){var a=Ext.lib.Dom.getXY(c);
var j=a[1];
var b=a[0]+c.offsetWidth;
var l=a[1]+c.offsetHeight;
var k=a[0];
return new Ext.lib.Region(j,b,l,k)
};
Ext.lib.Point=function(b,a){if(Ext.isArray(b)){a=b[1];
b=b[0]
}this.x=this.right=this.left=this[0]=b;
this.y=this.top=this.bottom=this[1]=a
};
Ext.lib.Point.prototype=new Ext.lib.Region();
if(Ext.isIE){function e(){var a=Function.prototype;
delete a.createSequence;
delete a.defer;
delete a.createDelegate;
delete a.createCallback;
delete a.createInterceptor;
window.detachEvent("onunload",e)
}window.attachEvent("onunload",e)
}})();