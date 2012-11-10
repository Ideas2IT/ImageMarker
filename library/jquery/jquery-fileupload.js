function upclick(d){var e={element:null,action:"about:blank",action_params:{},maxsize:0,onstart:null,oncomplete:null,dataname:null,target:null,zindex:"auto"};
for(var n in e){d[n]=d[n]?d[n]:e[n]
}var g=d.element;
if(typeof g=="string"){g=document.getElementById(g)
}var m=g.ownerDocument;
var l;
var a=m.createElement("div");
var k="frame"+new Date().getTime().toString().substr(8);
a.innerHTML='<iframe name="'+k+'" src="about:blank" onload="this.onload_callback()"></iframe>';
var b=a.childNodes[0];
b.onload_callback=function(){var r=m.createElement("form");
a.appendChild(r);
r.method="post";
r.enctype="multipart/form-data";
r.encoding="multipart/form-data";
if(d.target){r.target=d.target;
r.setAttribute("target",d.target)
}else{r.target=k;
r.setAttribute("target",k)
}r.action=d.action;
r.setAttribute("action",d.action);
r.style.margin=0;
r.style.padding=0;
r.style.height="80px";
r.style.width="40px";
r.runat="server";
var u=d.action_params;
for(var q in u){var t=m.createElement("input");
t.type="hidden";
t.name=q;
t.value=String(u[q]);
r.appendChild(t)
}if(d.maxsize){var s=m.createElement("input");
s.type="hidden";
s.name="MAX_FILE_SIZE";
s.value=String(d.maxsize);
r.appendChild(s)
}l=m.createElement("input");
l.name=d.dataname;
l.type="file";
l.size="1";
l.runat="server";
r.appendChild(l);
l.style.position="absolute";
l.style.display="block";
l.style.top=0;
l.style.left=0;
l.style.height=r.style.height;
l.style.width="80px";
l.style.opacity=0;
l.style.filter="alpha(opacity=0)";
l.style.fontSize=8;
l.style.zIndex=1;
l.style.visiblity="hidden";
l.style.marginLeft="-40px";
var p=function(w){if(!l.value){return
}var v=d.onstart;
if(v){v(l.value)
}r.submit()
};
if(l.addEventListener){l.addEventListener("change",p,false)
}else{if(l.attachEvent){l.attachEvent("onpropertychange",function(v){if(!v){v=window.event
}if(v.propertyName=="value"){p()
}})
}else{l.onpropertychange=p
}}b.onload_callback=function(){var v=null;
if(b.contentWindow){v=b.contentWindow
}else{if(b.contentDocument){v=b.contentDocument.defaultView
}}var x=v.document.body.innerHTML;
var w=d.oncomplete;
if(w){w(x)
}r.reset()
}
};
b.style.display="none";
b.width=0;
b.height=0;
b.marginHeight=0;
b.marginWidth=0;
m.body.insertBefore(a,m.body.firstChild);
a.style.position="absolute";
a.style.overflow="hidden";
a.style.padding=0;
a.style.margin=0;
a.style.visiblity="hidden";
a.style.width="0px";
a.style.height="0px";
if(d.zindex=="auto"){var o=0,j;
var f=g;
var i;
while(f.tagName!="BODY"){i=f.currentStyle?f.currentStyle:getComputedStyle(f,null);
j=parseInt(i.zIndex);
j=isNaN(j)?0:j;
o+=j+1;
f=f.parentNode
}a.style.zIndex=o
}else{a.style.zIndex=d.zindex
}var c=function(q){if(!q){q=window.event
}a.style.width="0px";
a.style.height="0px";
var p=m.elementFromPoint(q.clientX,q.clientY);
if(p===g){a.style.width="40px";
a.style.height="80px"
}};
if(a.addEventListener){a.addEventListener("mousemove",c,false)
}else{if(a.attachEvent){a.attachEvent("onmousemove",c)
}}var h=function(q){if(!q){q=window.event
}var p=y=0;
if(q.pageX){p=q.pageX
}else{if(q.clientX){p=q.clientX+(m.documentElement.scrollLeft?m.documentElement.scrollLeft:m.body.scrollLeft)
}}if(q.pageY){y=q.pageY
}else{if(q.clientY){y=q.clientY+(m.documentElement.scrollTop?m.documentElement.scrollTop:m.body.scrollTop)
}}a.style.left=p-20+"px";
a.style.top=y-40+"px";
a.style.width="40px";
a.style.height="80px"
};
if(g.addEventListener){g.addEventListener("mousemove",h,false)
}else{if(g.attachEvent){g.attachEvent("onmousemove",h)
}}};