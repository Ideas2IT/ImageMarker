Ext.DomHelper=function(){var u=null,D=/^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,B=/^table|tbody|tr|td$/i,x,A="afterbegin",z="afterend",J="beforebegin",y="beforeend",L="<table>",F="</table>",K=L+"<tbody>",E="</tbody>"+F,C=K+"<tr>",v="</tr>"+E;
function G(b,g,h,a,c,e){var d=x.insertHtml(a,Ext.getDom(b),w(g));
return h?Ext.get(d,true):d
}function w(b){var c="",d,g,j,e,h;
if(Ext.isString(b)){c=b
}else{if(Ext.isArray(b)){for(var a=0;
a<b.length;
a++){if(b[a]){c+=w(b[a])
}}}else{c+="<"+(b.tag=b.tag||"div");
Ext.iterate(b,function(l,k){if(!/tag|children|cn|html$/i.test(l)){if(Ext.isObject(k)){c+=" "+l+'="';
Ext.iterate(k,function(m,n){c+=m+":"+n+";"
});
c+='"'
}else{c+=" "+({cls:"class",htmlFor:"for"}[l]||l)+'="'+k+'"'
}}});
if(D.test(b.tag)){c+="/>"
}else{c+=">";
if((h=b.children||b.cn)){c+=w(h)
}else{if(b.html){c+=b.html
}}c+="</"+b.tag+">"
}}}return c
}function H(j,h,b,g){u.innerHTML=[h,b,g].join("");
var e=-1,c=u,d;
while(++e<j){c=c.firstChild
}if(d=c.nextSibling){var a=document.createDocumentFragment();
while(c){d=c.nextSibling;
a.appendChild(c);
c=d
}c=a
}return c
}function I(d,c,a,b){var g,e;
u=u||document.createElement("div");
if(d=="td"&&(c==A||c==y)||!/td|tr|tbody/i.test(d)&&(c==J||c==z)){return
}e=c==J?a:c==z?a.nextSibling:c==A?a.firstChild:null;
if(c==J||c==z){a=a.parentNode
}if(d=="td"||(d=="tr"&&(c==y||c==A))){g=H(4,C,b,v)
}else{if((d=="tbody"&&(c==y||c==A))||(d=="tr"&&(c==J||c==z))){g=H(3,K,b,E)
}else{g=H(2,L,b,F)
}}a.insertBefore(g,e);
return g
}x={markup:function(a){return w(a)
},applyStyles:function(a,e){if(e){var c=0,d,b;
a=Ext.fly(a);
if(Ext.isFunction(e)){e=e.call()
}if(Ext.isString(e)){e=e.trim().split(/\s*(?::|;)\s*/);
for(d=e.length;
c<d;
){a.setStyle(e[c++],e[c++])
}}else{if(Ext.isObject(e)){a.setStyle(e)
}}}},insertHtml:function(e,l,d){var g={},j,b,c,a,h,k;
e=e.toLowerCase();
g[J]=["BeforeBegin","previousSibling"];
g[z]=["AfterEnd","nextSibling"];
if(l.insertAdjacentHTML){if(B.test(l.tagName)&&(k=I(l.tagName.toLowerCase(),e,l,d))){return k
}g[A]=["AfterBegin","firstChild"];
g[y]=["BeforeEnd","lastChild"];
if((j=g[e])){l.insertAdjacentHTML(j[0],d);
return l[j[1]]
}}else{c=l.ownerDocument.createRange();
b="setStart"+(/end/i.test(e)?"After":"Before");
if(g[e]){c[b](l);
a=c.createContextualFragment(d);
l.parentNode.insertBefore(a,e==J?l:l.nextSibling);
return l[(e==J?"previous":"next")+"Sibling"]
}else{h=(e==A?"first":"last")+"Child";
if(l.firstChild){c[b](l[h]);
a=c.createContextualFragment(d);
if(e==A){l.insertBefore(a,l.firstChild)
}else{l.appendChild(a)
}}else{l.innerHTML=d
}return l[h]
}}throw'Illegal insertion point -> "'+e+'"'
},insertBefore:function(c,a,b){return G(c,a,b,J)
},insertAfter:function(c,a,b){return G(c,a,b,z,"nextSibling")
},insertFirst:function(c,a,b){return G(c,a,b,A,"firstChild")
},append:function(c,a,b){return G(c,a,b,y,"",true)
},overwrite:function(c,a,b){c=Ext.getDom(c);
c.innerHTML=w(a);
return b?Ext.get(c.firstChild):c.firstChild
},createHtml:w};
return x
}();
Ext.apply(Ext.DomHelper,function(){var o,k="afterbegin",m="afterend",l="beforebegin",p="beforeend";
function n(a,g,h,e,b,d){a=Ext.getDom(a);
var c;
if(o.useDom){c=j(g,null);
if(d){a.appendChild(c)
}else{(b=="firstChild"?a:a.parentNode).insertBefore(c,a[b]||a)
}}else{c=Ext.DomHelper.insertHtml(e,a,Ext.DomHelper.createHtml(g))
}return h?Ext.get(c,true):c
}function j(g,c){var a,s=document,b,d,h,e;
if(Ext.isArray(g)){a=s.createDocumentFragment();
Ext.each(g,function(q){j(q,a)
})
}else{if(Ext.isString(g)){a=s.createTextNode(g)
}else{a=s.createElement(g.tag||"div");
b=!!a.setAttribute;
Ext.iterate(g,function(r,q){if(!/tag|children|cn|html|style/.test(r)){if(r=="cls"){a.className=q
}else{if(b){a.setAttribute(r,q)
}else{a[r]=q
}}}});
Ext.DomHelper.applyStyles(a,g.style);
if((e=g.children||g.cn)){j(e,a)
}else{if(g.html){a.innerHTML=g.html
}}}}if(c){c.appendChild(a)
}return a
}o={createTemplate:function(a){var b=Ext.DomHelper.createHtml(a);
return new Ext.Template(b)
},useDom:false,insertBefore:function(c,a,b){return n(c,a,b,l)
},insertAfter:function(c,a,b){return n(c,a,b,m,"nextSibling")
},insertFirst:function(c,a,b){return n(c,a,b,k,"firstChild")
},append:function(c,a,b){return n(c,a,b,p,"",true)
},createDom:j};
return o
}());
Ext.Template=function(h){var g=this,a=arguments,j=[];
if(Ext.isArray(h)){h=h.join("")
}else{if(a.length>1){Ext.each(a,function(b){if(Ext.isObject(b)){Ext.apply(g,b)
}else{j.push(b)
}});
h=j.join("")
}}g.html=h;
if(g.compiled){g.compile()
}};
Ext.Template.prototype={re:/\{([\w-]+)\}/g,applyTemplate:function(d){var c=this;
return c.compiled?c.compiled(d):c.html.replace(c.re,function(b,a){return d[a]!==undefined?d[a]:""
})
},set:function(e,g){var d=this;
d.html=e;
d.compiled=null;
return g?d.compile():d
},compile:function(){var me=this,sep=Ext.isGecko?"+":",";
function fn(m,name){name="values['"+name+"']";
return"'"+sep+"("+name+" == undefined ? '' : "+name+")"+sep+"'"
}eval("this.compiled = function(values){ return "+(Ext.isGecko?"'":"['")+me.html.replace(/\\/g,"\\\\").replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn)+(Ext.isGecko?"';};":"'].join('');};"));
return me
},insertFirst:function(d,e,g){return this.doInsert("afterBegin",d,e,g)
},insertBefore:function(d,e,g){return this.doInsert("beforeBegin",d,e,g)
},insertAfter:function(d,e,g){return this.doInsert("afterEnd",d,e,g)
},append:function(d,e,g){return this.doInsert("beforeEnd",d,e,g)
},doInsert:function(l,j,g,h){j=Ext.getDom(j);
var k=Ext.DomHelper.insertHtml(l,j,this.applyTemplate(g));
return h?Ext.get(k,true):k
},overwrite:function(d,e,g){d=Ext.getDom(d);
d.innerHTML=this.applyTemplate(e);
return g?Ext.get(d.firstChild,true):d.firstChild
}};
Ext.Template.prototype.apply=Ext.Template.prototype.applyTemplate;
Ext.Template.from=function(c,d){c=Ext.getDom(c);
return new Ext.Template(c.value||c.innerHTML,d||"")
};
Ext.apply(Ext.Template.prototype,{disableFormats:false,re:/\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,applyTemplate:function(h){var k=this,j=k.disableFormats!==true,l=Ext.util.Format,n=k;
if(k.compiled){return k.compiled(h)
}function m(c,a,e,b){if(e&&j){if(e.substr(0,5)=="this."){return n.call(e.substr(5),h[a],h)
}else{if(b){var g=/^\s*['"](.*)["']\s*$/;
b=b.split(",");
for(var q=0,d=b.length;
q<d;
q++){b[q]=b[q].replace(g,"$1")
}b=[h[a]].concat(b)
}else{b=[h[a]]
}return l[e].apply(l,b)
}}else{return h[a]!==undefined?h[a]:""
}}return k.html.replace(k.re,m)
},compile:function(){var me=this,fm=Ext.util.Format,useF=me.disableFormats!==true,sep=Ext.isGecko?"+":",",body;
function fn(m,name,format,args){if(format&&useF){args=args?","+args:"";
if(format.substr(0,5)!="this."){format="fm."+format+"("
}else{format='this.call("'+format.substr(5)+'", ';
args=", values"
}}else{args="";
format="(values['"+name+"'] == undefined ? '' : "
}return"'"+sep+format+"values['"+name+"']"+args+")"+sep+"'"
}if(Ext.isGecko){body="this.compiled = function(values){ return '"+me.html.replace(/\\/g,"\\\\").replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn)+"';};"
}else{body=["this.compiled = function(values){ return ['"];
body.push(me.html.replace(/\\/g,"\\\\").replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn));
body.push("'].join('');};");
body=body.join("")
}eval(body);
return me
},call:function(g,d,e){return this[g](d,e)
}});
Ext.Template.prototype.apply=Ext.Template.prototype.applyTemplate;
Ext.DomQuery=function(){var cache={},simpleCache={},valueCache={},nonSpace=/\S/,trimRe=/^\s+|\s+$/g,tplRe=/\{(\d+)\}/g,modeRe=/^(\s?[\/>+~]\s?|\s|$)/,tagTokenRe=/^(#)?([\w-\*]+)/,nthRe=/(\d*)n\+?(\d*)/,nthRe2=/\D/,isIE=window.ActiveXObject?true:false,key=30803;
eval("var batch = 30803;");
function child(p,index){var i=0,n=p.firstChild;
while(n){if(n.nodeType==1){if(++i==index){return n
}}n=n.nextSibling
}return null
}function next(n){while((n=n.nextSibling)&&n.nodeType!=1){}return n
}function prev(n){while((n=n.previousSibling)&&n.nodeType!=1){}return n
}function children(d){var n=d.firstChild,ni=-1,nx;
while(n){nx=n.nextSibling;
if(n.nodeType==3&&!nonSpace.test(n.nodeValue)){d.removeChild(n)
}else{n.nodeIndex=++ni
}n=nx
}return this
}function byClassName(c,a,v){if(!v){return c
}var r=[],ri=-1,cn;
for(var i=0,ci;
ci=c[i];
i++){if((" "+ci.className+" ").indexOf(v)!=-1){r[++ri]=ci
}}return r
}function attrValue(n,attr){if(!n.tagName&&typeof n.length!="undefined"){n=n[0]
}if(!n){return null
}if(attr=="for"){return n.htmlFor
}if(attr=="class"||attr=="className"){return n.className
}return n.getAttribute(attr)||n[attr]
}function getNodes(ns,mode,tagName){var result=[],ri=-1,cs;
if(!ns){return result
}tagName=tagName||"*";
if(typeof ns.getElementsByTagName!="undefined"){ns=[ns]
}if(!mode){for(var i=0,ni;
ni=ns[i];
i++){cs=ni.getElementsByTagName(tagName);
for(var j=0,ci;
ci=cs[j];
j++){result[++ri]=ci
}}}else{if(mode=="/"||mode==">"){var utag=tagName.toUpperCase();
for(var i=0,ni,cn;
ni=ns[i];
i++){cn=ni.childNodes;
for(var j=0,cj;
cj=cn[j];
j++){if(cj.nodeName==utag||cj.nodeName==tagName||tagName=="*"){result[++ri]=cj
}}}}else{if(mode=="+"){var utag=tagName.toUpperCase();
for(var i=0,n;
n=ns[i];
i++){while((n=n.nextSibling)&&n.nodeType!=1){}if(n&&(n.nodeName==utag||n.nodeName==tagName||tagName=="*")){result[++ri]=n
}}}else{if(mode=="~"){var utag=tagName.toUpperCase();
for(var i=0,n;
n=ns[i];
i++){while((n=n.nextSibling)){if(n.nodeName==utag||n.nodeName==tagName||tagName=="*"){result[++ri]=n
}}}}}}}return result
}function concat(a,b){if(b.slice){return a.concat(b)
}for(var i=0,l=b.length;
i<l;
i++){a[a.length]=b[i]
}return a
}function byTag(cs,tagName){if(cs.tagName||cs==document){cs=[cs]
}if(!tagName){return cs
}var r=[],ri=-1;
tagName=tagName.toLowerCase();
for(var i=0,ci;
ci=cs[i];
i++){if(ci.nodeType==1&&ci.tagName.toLowerCase()==tagName){r[++ri]=ci
}}return r
}function byId(cs,attr,id){if(cs.tagName||cs==document){cs=[cs]
}if(!id){return cs
}var r=[],ri=-1;
for(var i=0,ci;
ci=cs[i];
i++){if(ci&&ci.id==id){r[++ri]=ci;
return r
}}return r
}function byAttribute(cs,attr,value,op,custom){var r=[],ri=-1,st=custom=="{",f=Ext.DomQuery.operators[op];
for(var i=0,ci;
ci=cs[i];
i++){if(ci.nodeType!=1){continue
}var a;
if(st){a=Ext.DomQuery.getStyle(ci,attr)
}else{if(attr=="class"||attr=="className"){a=ci.className
}else{if(attr=="for"){a=ci.htmlFor
}else{if(attr=="href"){a=ci.getAttribute("href",2)
}else{a=ci.getAttribute(attr)
}}}}if((f&&f(a,value))||(!f&&a)){r[++ri]=ci
}}return r
}function byPseudo(cs,name,value){return Ext.DomQuery.pseudos[name](cs,value)
}function nodupIEXml(cs){var d=++key,r;
cs[0].setAttribute("_nodup",d);
r=[cs[0]];
for(var i=1,len=cs.length;
i<len;
i++){var c=cs[i];
if(!c.getAttribute("_nodup")!=d){c.setAttribute("_nodup",d);
r[r.length]=c
}}for(var i=0,len=cs.length;
i<len;
i++){cs[i].removeAttribute("_nodup")
}return r
}function nodup(cs){if(!cs){return[]
}var len=cs.length,c,i,r=cs,cj,ri=-1;
if(!len||typeof cs.nodeType!="undefined"||len==1){return cs
}if(isIE&&typeof cs[0].selectSingleNode!="undefined"){return nodupIEXml(cs)
}var d=++key;
cs[0]._nodup=d;
for(i=1;
c=cs[i];
i++){if(c._nodup!=d){c._nodup=d
}else{r=[];
for(var j=0;
j<i;
j++){r[++ri]=cs[j]
}for(j=i+1;
cj=cs[j];
j++){if(cj._nodup!=d){cj._nodup=d;
r[++ri]=cj
}}return r
}}return r
}function quickDiffIEXml(c1,c2){var d=++key,r=[];
for(var i=0,len=c1.length;
i<len;
i++){c1[i].setAttribute("_qdiff",d)
}for(var i=0,len=c2.length;
i<len;
i++){if(c2[i].getAttribute("_qdiff")!=d){r[r.length]=c2[i]
}}for(var i=0,len=c1.length;
i<len;
i++){c1[i].removeAttribute("_qdiff")
}return r
}function quickDiff(c1,c2){var len1=c1.length,d=++key,r=[];
if(!len1){return c2
}if(isIE&&typeof c1[0].selectSingleNode!="undefined"){return quickDiffIEXml(c1,c2)
}for(var i=0;
i<len1;
i++){c1[i]._qdiff=d
}for(var i=0,len=c2.length;
i<len;
i++){if(c2[i]._qdiff!=d){r[r.length]=c2[i]
}}return r
}function quickId(ns,mode,root,id){if(ns==root){var d=root.ownerDocument||root;
return d.getElementById(id)
}ns=getNodes(ns,mode,"*");
return byId(ns,null,id)
}return{getStyle:function(el,name){return Ext.fly(el).getStyle(name)
},compile:function(path,type){type=type||"select";
var fn=["var f = function(root){\n var mode; ++batch; var n = root || document;\n"],q=path,mode,lq,tk=Ext.DomQuery.matchers,tklen=tk.length,mm,lmode=q.match(modeRe);
if(lmode&&lmode[1]){fn[fn.length]='mode="'+lmode[1].replace(trimRe,"")+'";';
q=q.replace(lmode[1],"")
}while(path.substr(0,1)=="/"){path=path.substr(1)
}while(q&&lq!=q){lq=q;
var tm=q.match(tagTokenRe);
if(type=="select"){if(tm){if(tm[1]=="#"){fn[fn.length]='n = quickId(n, mode, root, "'+tm[2]+'");'
}else{fn[fn.length]='n = getNodes(n, mode, "'+tm[2]+'");'
}q=q.replace(tm[0],"")
}else{if(q.substr(0,1)!="@"){fn[fn.length]='n = getNodes(n, mode, "*");'
}}}else{if(tm){if(tm[1]=="#"){fn[fn.length]='n = byId(n, null, "'+tm[2]+'");'
}else{fn[fn.length]='n = byTag(n, "'+tm[2]+'");'
}q=q.replace(tm[0],"")
}}while(!(mm=q.match(modeRe))){var matched=false;
for(var j=0;
j<tklen;
j++){var t=tk[j];
var m=q.match(t.re);
if(m){fn[fn.length]=t.select.replace(tplRe,function(x,i){return m[i]
});
q=q.replace(m[0],"");
matched=true;
break
}}if(!matched){throw'Error parsing selector, parsing failed at "'+q+'"'
}}if(mm[1]){fn[fn.length]='mode="'+mm[1].replace(trimRe,"")+'";';
q=q.replace(mm[1],"")
}}fn[fn.length]="return nodup(n);\n}";
eval(fn.join(""));
return f
},select:function(path,root,type){if(!root||root==document){root=document
}if(typeof root=="string"){root=document.getElementById(root)
}var paths=path.split(","),results=[];
for(var i=0,len=paths.length;
i<len;
i++){var p=paths[i].replace(trimRe,"");
if(!cache[p]){cache[p]=Ext.DomQuery.compile(p);
if(!cache[p]){throw p+" is not a valid selector"
}}var result=cache[p](root);
if(result&&result!=document){results=results.concat(result)
}}if(paths.length>1){return nodup(results)
}return results
},selectNode:function(path,root){return Ext.DomQuery.select(path,root)[0]
},selectValue:function(path,root,defaultValue){path=path.replace(trimRe,"");
if(!valueCache[path]){valueCache[path]=Ext.DomQuery.compile(path,"select")
}var n=valueCache[path](root),v;
n=n[0]?n[0]:n;
if(typeof n.normalize=="function"){n.normalize()
}v=(n&&n.firstChild?n.firstChild.nodeValue:null);
return((v===null||v===undefined||v==="")?defaultValue:v)
},selectNumber:function(path,root,defaultValue){var v=Ext.DomQuery.selectValue(path,root,defaultValue||0);
return parseFloat(v)
},is:function(el,ss){if(typeof el=="string"){el=document.getElementById(el)
}var isArray=Ext.isArray(el),result=Ext.DomQuery.filter(isArray?el:[el],ss);
return isArray?(result.length==el.length):(result.length>0)
},filter:function(els,ss,nonMatches){ss=ss.replace(trimRe,"");
if(!simpleCache[ss]){simpleCache[ss]=Ext.DomQuery.compile(ss,"simple")
}var result=simpleCache[ss](els);
return nonMatches?quickDiff(result,els):result
},matchers:[{re:/^\.([\w-]+)/,select:'n = byClassName(n, null, " {1} ");'},{re:/^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,select:'n = byPseudo(n, "{1}", "{2}");'},{re:/^(?:([\[\{])(?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,select:'n = byAttribute(n, "{2}", "{4}", "{3}", "{1}");'},{re:/^#([\w-]+)/,select:'n = byId(n, null, "{1}");'},{re:/^@([\w-]+)/,select:'return {firstChild:{nodeValue:attrValue(n, "{1}")}};'}],operators:{"=":function(a,v){return a==v
},"!=":function(a,v){return a!=v
},"^=":function(a,v){return a&&a.substr(0,v.length)==v
},"$=":function(a,v){return a&&a.substr(a.length-v.length)==v
},"*=":function(a,v){return a&&a.indexOf(v)!==-1
},"%=":function(a,v){return(a%v)==0
},"|=":function(a,v){return a&&(a==v||a.substr(0,v.length+1)==v+"-")
},"~=":function(a,v){return a&&(" "+a+" ").indexOf(" "+v+" ")!=-1
}},pseudos:{"first-child":function(c){var r=[],ri=-1,n;
for(var i=0,ci;
ci=n=c[i];
i++){while((n=n.previousSibling)&&n.nodeType!=1){}if(!n){r[++ri]=ci
}}return r
},"last-child":function(c){var r=[],ri=-1,n;
for(var i=0,ci;
ci=n=c[i];
i++){while((n=n.nextSibling)&&n.nodeType!=1){}if(!n){r[++ri]=ci
}}return r
},"nth-child":function(c,a){var r=[],ri=-1,m=nthRe.exec(a=="even"&&"2n"||a=="odd"&&"2n+1"||!nthRe2.test(a)&&"n+"+a||a),f=(m[1]||1)-0,l=m[2]-0;
for(var i=0,n;
n=c[i];
i++){var pn=n.parentNode;
if(batch!=pn._batch){var j=0;
for(var cn=pn.firstChild;
cn;
cn=cn.nextSibling){if(cn.nodeType==1){cn.nodeIndex=++j
}}pn._batch=batch
}if(f==1){if(l==0||n.nodeIndex==l){r[++ri]=n
}}else{if((n.nodeIndex+l)%f==0){r[++ri]=n
}}}return r
},"only-child":function(c){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(!prev(ci)&&!next(ci)){r[++ri]=ci
}}return r
},empty:function(c){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){var cns=ci.childNodes,j=0,cn,empty=true;
while(cn=cns[j]){++j;
if(cn.nodeType==1||cn.nodeType==3){empty=false;
break
}}if(empty){r[++ri]=ci
}}return r
},contains:function(c,v){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if((ci.textContent||ci.innerText||"").indexOf(v)!=-1){r[++ri]=ci
}}return r
},nodeValue:function(c,v){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(ci.firstChild&&ci.firstChild.nodeValue==v){r[++ri]=ci
}}return r
},checked:function(c){var r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(ci.checked==true){r[++ri]=ci
}}return r
},not:function(c,ss){return Ext.DomQuery.filter(c,ss,true)
},any:function(c,selectors){var ss=selectors.split("|"),r=[],ri=-1,s;
for(var i=0,ci;
ci=c[i];
i++){for(var j=0;
s=ss[j];
j++){if(Ext.DomQuery.is(ci,s)){r[++ri]=ci;
break
}}}return r
},odd:function(c){return this["nth-child"](c,"odd")
},even:function(c){return this["nth-child"](c,"even")
},nth:function(c,a){return c[a-1]||[]
},first:function(c){return c[0]||[]
},last:function(c){return c[c.length-1]||[]
},has:function(c,ss){var s=Ext.DomQuery.select,r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){if(s(ss,ci).length>0){r[++ri]=ci
}}return r
},next:function(c,ss){var is=Ext.DomQuery.is,r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){var n=next(ci);
if(n&&is(n,ss)){r[++ri]=ci
}}return r
},prev:function(c,ss){var is=Ext.DomQuery.is,r=[],ri=-1;
for(var i=0,ci;
ci=c[i];
i++){var n=prev(ci);
if(n&&is(n,ss)){r[++ri]=ci
}}return r
}}}
}();
Ext.query=Ext.DomQuery.select;
Ext.util.DelayedTask=function(m,n,j){var l=this,k,h=function(){clearInterval(k);
k=null;
m.apply(n,j||[])
};
l.delay=function(c,a,b,d){l.cancel();
m=a||m;
n=b||n;
j=d||j;
k=setInterval(h,c)
};
l.cancel=function(){if(k){clearInterval(k);
k=null
}}
};
(function(){var q=Ext.util,n=Ext.toArray,o=Ext.each,x=Ext.isObject,r=true,p=false;
q.Observable=function(){var b=this,a=b.events;
if(b.listeners){b.on(b.listeners);
delete b.listeners
}b.events=a||{}
};
q.Observable.prototype={filterOptRe:/^(?:scope|delay|buffer|single)$/,fireEvent:function(){var h=n(arguments),e=h[0].toLowerCase(),d=this,g=r,b=d.events[e],c,a;
if(d.eventsSuspended===r){if(c=d.eventQueue){c.push(h)
}}else{if(x(b)&&b.bubble){if(b.fire.apply(b,h.slice(1))===p){return p
}a=d.getBubbleTarget&&d.getBubbleTarget();
if(a&&a.enableBubble){if(!a.events[e]||!Ext.isObject(a.events[e])||!a.events[e].bubble){a.enableBubble(e)
}return a.fireEvent.apply(a,h)
}}else{if(x(b)){h.shift();
g=b.fire.apply(b,h)
}}}return g
},addListener:function(b,j,g,c){var k=this,a,e,h,d;
if(x(b)){c=b;
for(a in c){e=c[a];
if(!k.filterOptRe.test(a)){k.addListener(a,e.fn||e,e.scope||c.scope,e.fn?e:c)
}}}else{b=b.toLowerCase();
d=k.events[b]||r;
if(Ext.isBoolean(d)){k.events[b]=d=new q.Event(k,b)
}d.addListener(j,g,x(c)?c:{})
}},removeListener:function(d,b,c){var a=this.events[d.toLowerCase()];
if(x(a)){a.removeListener(b,c)
}},purgeListeners:function(){var a=this.events,c,b;
for(b in a){c=a[b];
if(x(c)){c.clearListeners()
}}},addEvents:function(a){var b=this;
b.events=b.events||{};
if(Ext.isString(a)){var d=arguments,c=d.length;
while(c--){b.events[d[c]]=b.events[d[c]]||r
}}else{Ext.applyIf(b.events,a)
}},hasListener:function(b){var a=this.events[b];
return x(a)&&a.listeners.length>0
},suspendEvents:function(a){this.eventsSuspended=r;
if(a&&!this.eventQueue){this.eventQueue=[]
}},resumeEvents:function(){var b=this,a=b.eventQueue||[];
b.eventsSuspended=p;
delete b.eventQueue;
o(a,function(c){b.fireEvent.apply(b,c)
})
}};
var t=q.Observable.prototype;
t.on=t.addListener;
t.un=t.removeListener;
q.Observable.releaseCapture=function(a){a.fireEvent=t.fireEvent
};
function s(b,a,c){return function(){if(a.target==arguments[0]){b.apply(c,n(arguments))
}}
}function v(b,a,c,d){c.task=new q.DelayedTask();
return function(){c.task.delay(a.buffer,b,d,n(arguments))
}
}function u(b,a,c,d){return function(){a.removeListener(c,d);
return b.apply(d,arguments)
}
}function w(b,a,c,d){return function(){var e=new q.DelayedTask();
if(!c.tasks){c.tasks=[]
}c.tasks.push(e);
e.delay(a.delay||10,b,d,n(arguments))
}
}q.Event=function(a,b){this.name=b;
this.obj=a;
this.listeners=[]
};
q.Event.prototype={addListener:function(b,c,d){var a=this,e;
c=c||a.obj;
if(!a.isListening(b,c)){e=a.createListener(b,c,d);
if(a.firing){a.listeners=a.listeners.slice(0)
}a.listeners.push(e)
}},createListener:function(b,c,a){a=a||{},c=c||this.obj;
var e={fn:b,scope:c,options:a},d=b;
if(a.target){d=s(d,a,c)
}if(a.delay){d=w(d,a,b,c)
}if(a.single){d=u(d,this,b,c)
}if(a.buffer){d=v(d,a,b,c)
}e.fireFn=d;
return e
},findListener:function(b,c){var a=this.listeners,e=a.length,g,d;
while(e--){g=a[e];
if(g){d=g.scope;
if(g.fn==b&&(d==c||d==this.obj)){return e
}}}return -1
},isListening:function(a,b){return this.findListener(a,b)!=-1
},removeListener:function(b,c){var d,h,g,a=this,e=p;
if((d=a.findListener(b,c))!=-1){if(a.firing){a.listeners=a.listeners.slice(0)
}h=a.listeners[d].fn;
if(h.task){h.task.cancel();
delete h.task
}g=h.tasks&&h.tasks.length;
if(g){while(g--){h.tasks[g].cancel()
}delete h.tasks
}a.listeners.splice(d,1);
e=r
}return e
},clearListeners:function(){var a=this,c=a.listeners,b=c.length;
while(b--){a.removeListener(c[b].fn,c[b].scope)
}},fire:function(){var a=this,d=n(arguments),b=a.listeners,g=b.length,c=0,e;
if(g>0){a.firing=r;
for(;
c<g;
c++){e=b[c];
if(e&&e.fireFn.apply(e.scope||a.obj||window,d)===p){return(a.firing=p)
}}}a.firing=p;
return r
}}
})();
Ext.apply(Ext.util.Observable.prototype,function(){function b(e){var l=(this.methodEvents=this.methodEvents||{})[e],o,p,n,m=this;
if(!l){this.methodEvents[e]=l={};
l.originalFn=this[e];
l.methodName=e;
l.before=[];
l.after=[];
var a=function(c,d,g){if(!Ext.isEmpty(p=c.apply(d||m,g))){if(Ext.isObject(p)){o=!Ext.isEmpty(p.returnValue)?p.returnValue:p;
n=!!p.cancel
}else{if(p===false){n=true
}else{o=p
}}}};
this[e]=function(){var c=Ext.toArray(arguments);
o=p=undefined;
n=false;
Ext.each(l.before,function(d){a(d.fn,d.scope,c);
if(n){return o
}});
if(!Ext.isEmpty(p=l.originalFn.apply(m,c))){o=p
}Ext.each(l.after,function(d){a(d.fn,d.scope,c);
if(n){return o
}});
return o
}
}return l
}return{beforeMethod:function(e,g,a){b.call(this,e).before.push({fn:g,scope:a})
},afterMethod:function(e,g,a){b.call(this,e).after.push({fn:g,scope:a})
},removeMethodListener:function(e,l,a){var j=b.call(this,e),k=false;
Ext.each(j.before,function(d,c,g){if(d.fn==l&&d.scope==a){g.splice(c,1);
k=true;
return false
}});
if(!k){Ext.each(j.after,function(d,c,g){if(d.fn==l&&d.scope==a){g.splice(c,1);
return false
}})
}},relayEvents:function(g,a){var h=this;
function j(c){return function(){return h.fireEvent.apply(h,[c].concat(Ext.toArray(arguments)))
}
}Ext.each(a,function(c){h.events[c]=h.events[c]||true;
g.on(c,j(c),h)
})
},enableBubble:function(a){var d=this;
if(!Ext.isEmpty(a)){a=Ext.isArray(a)?a:Ext.toArray(arguments);
Ext.each(a,function(g){g=g.toLowerCase();
var c=d.events[g]||true;
if(Ext.isBoolean(c)){c=new Ext.util.Event(d,g);
d.events[g]=c
}c.bubble=true
})
}}}
}());
Ext.util.Observable.capture=function(g,d,e){g.fireEvent=g.fireEvent.createInterceptor(d,e)
};
Ext.util.Observable.observeClass=function(c,d){if(c){if(!c.fireEvent){Ext.apply(c,new Ext.util.Observable());
Ext.util.Observable.capture(c.prototype,c.fireEvent,c)
}if(Ext.isObject(d)){c.on(d)
}return c
}};
Ext.EventManager=function(){var y,G,K=false,H=Ext.lib.Event,F=Ext.lib.Dom,Q=document,x=window,N="ie-deferred-loader",E="DOMContentLoaded",M=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,C=[];
function I(d){var c=false,g=0,b=C.length,c=false,a=false,e;
if(d){if(d.getElementById||d.navigator){for(;
g<b;
++g){e=C[g];
if(e.el===d){c=e.id;
break
}}if(!c){c=Ext.id(d);
C.push({id:c,el:d});
a=true
}}else{c=Ext.id(d)
}if(!Ext.elCache[c]){Ext.Element.addToCache(new Ext.Element(d),c);
if(a){Ext.elCache[c].skipGC=true
}}}return c
}function J(e,d,a,g,j){e=Ext.getDom(e);
var h=I(e),k=Ext.elCache[h].events,c;
c=H.on(e,d,g);
k[d]=k[d]||[];
k[d].push([a,g,j,c]);
if(d=="mousewheel"&&e.addEventListener){var b=["DOMMouseScroll",g,false];
e.addEventListener.apply(e,b);
Ext.EventManager.addListener(x,"unload",function(){e.removeEventListener.apply(e,b)
})
}if(d=="mousedown"&&e==document){Ext.EventManager.stoppedMouseDownEvent.addListener(g)
}}function P(){if(!K){Ext.isReady=K=true;
if(G){clearInterval(G)
}if(Ext.isGecko||Ext.isOpera){Q.removeEventListener(E,P,false)
}if(Ext.isIE){var a=Q.getElementById(N);
if(a){a.onreadystatechange=null;
a.parentNode.removeChild(a)
}}if(y){y.fire();
y.listeners=[]
}}}function R(){var a="complete";
y=new Ext.util.Event();
if(Ext.isGecko||Ext.isOpera){Q.addEventListener(E,P,false)
}else{if(Ext.isIE){Q.write("<script id="+N+' defer="defer" src="//:"><\/script>');
Q.getElementById(N).onreadystatechange=function(){if(this.readyState==a){P()
}}
}else{if(Ext.isWebKit){G=setInterval(function(){if(Q.readyState==a){P()
}},10)
}}}H.on(x,"load",P)
}function A(a,b){return function(){var c=Ext.toArray(arguments);
if(b.target==Ext.EventObject.setEvent(c[0]).target){a.apply(this,c)
}}
}function z(c,b,d){d.task=new Ext.util.DelayedTask(c);
var a=function(e){d.task.delay(b.buffer,c,null,[new Ext.EventObjectImpl(e)])
};
return a
}function D(e,b,a,c,d){return function(g){Ext.EventManager.removeListener(b,a,c,d);
e(g)
}
}function O(c,b,a){return function(e){var d=new Ext.util.DelayedTask(c);
if(!a.tasks){a.tasks=[]
}a.tasks.push(d);
d.delay(b.delay||10,c,null,[new Ext.EventObjectImpl(e)])
}
}function L(g,j,b,d,e){var c=!Ext.isObject(b)?{}:b,h=Ext.getDom(g);
d=d||c.fn;
e=e||c.scope;
if(!h){throw'Error listening for "'+j+'". Element "'+g+"\" doesn't exist."
}function a(k){if(!Ext){return
}k=Ext.EventObject.setEvent(k);
var l;
if(c.delegate){if(!(l=k.getTarget(c.delegate,h))){return
}}else{l=k.target
}if(c.stopEvent){k.stopEvent()
}if(c.preventDefault){k.preventDefault()
}if(c.stopPropagation){k.stopPropagation()
}if(c.normalized){k=k.browserEvent
}d.call(e||h,k,l,c)
}if(c.target){a=A(a,c)
}if(c.delay){a=O(a,c,d)
}if(c.single){a=D(a,h,j,d,e)
}if(c.buffer){a=z(a,c,d)
}J(h,j,d,a,e);
return a
}var B={addListener:function(g,b,j,a,h){if(Ext.isObject(b)){var c=b,e,d;
for(e in c){d=c[e];
if(!M.test(e)){if(Ext.isFunction(d)){L(g,e,c,d,c.scope)
}else{L(g,e,d)
}}}}else{L(g,b,h,j,a)
}},removeListener:function(d,m,k,j){d=Ext.getDom(d);
var h=I(d),l=d&&(Ext.elCache[h].events)[m]||[],g,a,c,b,e;
for(a=0,len=l.length;
a<len;
a++){if(Ext.isArray(l[a])&&l[a][0]==k&&(!j||l[a][2]==j)){if(k.task){k.task.cancel();
delete k.task
}b=k.tasks&&k.tasks.length;
if(b){while(b--){k.tasks[b].cancel()
}delete k.tasks
}e=g=l[a][1];
if(H.extAdapter){e=l[a][3]
}H.un(d,m,e);
l.splice(a,1);
if(l.length===0){delete Ext.elCache[h].events[m]
}for(b in Ext.elCache[h].events){return false
}Ext.elCache[h].events={};
return false
}}if(m=="mousewheel"&&d.addEventListener&&g){d.removeEventListener("DOMMouseScroll",g,false)
}if(m=="mousedown"&&d==Q&&g){Ext.EventManager.stoppedMouseDownEvent.removeListener(g)
}},removeAll:function(g){g=Ext.getDom(g);
var h=I(g),a=Ext.elCache[h]||{},j=a.events||{},b,c,l,e,k,d;
for(e in j){if(j.hasOwnProperty(e)){b=j[e];
for(c=0,l=b.length;
c<l;
c++){k=b[c][0];
if(k.task){k.task.cancel();
delete k.task
}if(k.tasks&&(d=k.tasks.length)){while(d--){k.tasks[d].cancel()
}delete k.tasks
}H.un(g,e,H.extAdapter?b[c][3]:b[c][1])
}}}if(Ext.elCache[h]){Ext.elCache[h].events={}
}},getListeners:function(b,a){b=Ext.getDom(b);
var d=I(b),g=Ext.elCache[d]||{},e=g.events||{},c=[];
if(e&&e[a]){return e[a]
}else{return null
}},purgeElement:function(e,h,c){e=Ext.getDom(e);
var g=I(e),k=Ext.elCache[g]||{},j=k.events||{},d,a,b;
if(c){if(j&&j.hasOwnProperty(c)){a=j[c];
for(d=0,b=a.length;
d<b;
d++){Ext.EventManager.removeListener(e,c,a[d][0])
}}}else{Ext.EventManager.removeAll(e)
}if(h&&e&&e.childNodes){for(d=0,b=e.childNodes.length;
d<b;
d++){Ext.EventManager.purgeElement(e.childNodes[d],h,c)
}}},_unload:function(){var a;
for(a in Ext.elCache){Ext.EventManager.removeAll(a)
}},onDocumentReady:function(b,c,a){if(K){y.addListener(b,c,a);
y.fire();
y.listeners=[]
}else{if(!y){R()
}a=a||{};
a.delay=a.delay||1;
y.addListener(b,c,a)
}}};
B.on=B.addListener;
B.un=B.removeListener;
B.stoppedMouseDownEvent=new Ext.util.Event();
return B
}();
Ext.onReady=Ext.EventManager.onDocumentReady;
(function(){var b=function(){var g=document.body||document.getElementsByTagName("body")[0];
if(!g){return false
}var a=[" ",Ext.isIE?"ext-ie "+(Ext.isIE6?"ext-ie6":(Ext.isIE7?"ext-ie7":"ext-ie8")):Ext.isGecko?"ext-gecko "+(Ext.isGecko2?"ext-gecko2":"ext-gecko3"):Ext.isOpera?"ext-opera":Ext.isWebKit?"ext-webkit":""];
if(Ext.isSafari){a.push("ext-safari "+(Ext.isSafari2?"ext-safari2":(Ext.isSafari3?"ext-safari3":"ext-safari4")))
}else{if(Ext.isChrome){a.push("ext-chrome")
}}if(Ext.isMac){a.push("ext-mac")
}if(Ext.isLinux){a.push("ext-linux")
}if(Ext.isStrict||Ext.isBorderBox){var e=g.parentNode;
if(e){e.className+=Ext.isStrict?" ext-strict":" ext-border-box"
}}g.className+=a.join(" ");
return true
};
if(!b()){Ext.onReady(b)
}})();
Ext.EventObject=function(){var d=Ext.lib.Event,e={3:13,63234:37,63235:39,63232:38,63233:40,63276:33,63277:34,63272:46,63273:36,63275:35},g=Ext.isIE?{1:0,4:1,2:2}:(Ext.isWebKit?{1:0,2:1,3:2}:{0:0,1:1,2:2});
Ext.EventObjectImpl=function(a){if(a){this.setEvent(a.browserEvent||a)
}};
Ext.EventObjectImpl.prototype={setEvent:function(a){var b=this;
if(a==b||(a&&a.browserEvent)){return a
}b.browserEvent=a;
if(a){b.button=a.button?g[a.button]:(a.which?a.which-1:-1);
if(a.type=="click"&&b.button==-1){b.button=0
}b.type=a.type;
b.shiftKey=a.shiftKey;
b.ctrlKey=a.ctrlKey||a.metaKey||false;
b.altKey=a.altKey;
b.keyCode=a.keyCode;
b.charCode=a.charCode;
b.target=d.getTarget(a);
b.xy=d.getXY(a)
}else{b.button=-1;
b.shiftKey=false;
b.ctrlKey=false;
b.altKey=false;
b.keyCode=0;
b.charCode=0;
b.target=null;
b.xy=[0,0]
}return b
},stopEvent:function(){var a=this;
if(a.browserEvent){if(a.browserEvent.type=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.fire(a)
}d.stopEvent(a.browserEvent)
}},preventDefault:function(){if(this.browserEvent){d.preventDefault(this.browserEvent)
}},stopPropagation:function(){var a=this;
if(a.browserEvent){if(a.browserEvent.type=="mousedown"){Ext.EventManager.stoppedMouseDownEvent.fire(a)
}d.stopPropagation(a.browserEvent)
}},getCharCode:function(){return this.charCode||this.keyCode
},getKey:function(){return this.normalizeKey(this.keyCode||this.charCode)
},normalizeKey:function(a){return Ext.isSafari?(e[a]||a):a
},getPageX:function(){return this.xy[0]
},getPageY:function(){return this.xy[1]
},getXY:function(){return this.xy
},getTarget:function(b,a,c){return b?Ext.fly(this.target).findParent(b,a,c):(c?Ext.get(this.target):this.target)
},getRelatedTarget:function(){return this.browserEvent?d.getRelatedTarget(this.browserEvent):null
},getWheelDelta:function(){var b=this.browserEvent;
var a=0;
if(b.wheelDelta){a=b.wheelDelta/120
}else{if(b.detail){a=-b.detail/3
}}return a
},within:function(b,a,j){if(b){var c=this[a?"getRelatedTarget":"getTarget"]();
return c&&((j?(c==Ext.getDom(b)):false)||Ext.fly(b).contains(c))
}return false
}};
return new Ext.EventObjectImpl()
}();
Ext.apply(Ext.EventManager,function(){var r,l,p,s,t=Ext.lib.Dom,m=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/,n=0,o=0,q=Ext.isWebKit?Ext.num(navigator.userAgent.match(/AppleWebKit\/(\d+)/)[1])>=525:!((Ext.isGecko&&!Ext.isWindows)||Ext.isOpera);
return{doResizeEvent:function(){var a=t.getViewHeight(),b=t.getViewWidth();
if(o!=a||n!=b){r.fire(n=b,o=a)
}},onWindowResize:function(c,a,b){if(!r){r=new Ext.util.Event();
l=new Ext.util.DelayedTask(this.doResizeEvent);
Ext.EventManager.on(window,"resize",this.fireWindowResize,this)
}r.addListener(c,a,b)
},fireWindowResize:function(){if(r){if((Ext.isIE||Ext.isAir)&&l){l.delay(50)
}else{r.fire(t.getViewWidth(),t.getViewHeight())
}}},onTextResize:function(c,d,b){if(!p){p=new Ext.util.Event();
var a=new Ext.Element(document.createElement("div"));
a.dom.className="x-text-resize";
a.dom.innerHTML="X";
a.appendTo(document.body);
s=a.dom.offsetHeight;
setInterval(function(){if(a.dom.offsetHeight!=s){p.fire(s,s=a.dom.offsetHeight)
}},this.textResizeInterval)
}p.addListener(c,d,b)
},removeResizeListener:function(a,b){if(r){r.removeListener(a,b)
}},fireResize:function(){if(r){r.fire(t.getViewWidth(),t.getViewHeight())
}},textResizeInterval:50,ieDeferSrc:false,useKeydown:q}
}());
Ext.EventManager.on=Ext.EventManager.addListener;
Ext.apply(Ext.EventObjectImpl.prototype,{BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,RETURN:13,SHIFT:16,CTRL:17,CONTROL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGEUP:33,PAGE_DOWN:34,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,isNavKeyPress:function(){var c=this,d=this.normalizeKey(c.keyCode);
return(d>=33&&d<=40)||d==c.RETURN||d==c.TAB||d==c.ESC
},isSpecialKey:function(){var b=this.normalizeKey(this.keyCode);
return(this.type=="keypress"&&this.ctrlKey)||this.isNavKeyPress()||(b==this.BACKSPACE)||(b>=16&&b<=20)||(b>=44&&b<=45)
},getPoint:function(){return new Ext.lib.Point(this.xy[0],this.xy[1])
},hasModifier:function(){return((this.ctrlKey||this.altKey)||this.shiftKey)
}});
(function(){var t=document;
Ext.Element=function(d,c){var b=typeof d=="string"?t.getElementById(d):d,a;
if(!b){return null
}a=b.id;
if(!c&&a&&Ext.elCache[a]){return Ext.elCache[a].el
}this.dom=b;
this.id=a||Ext.id(b)
};
var B=Ext.lib.Dom,w=Ext.DomHelper,q=Ext.lib.Event,x=Ext.lib.Anim,v=Ext.Element,A=Ext.elCache;
v.prototype={set:function(a,d){var c=this.dom,e,b,d=(d!==false)&&!!c.setAttribute;
for(e in a){if(a.hasOwnProperty(e)){b=a[e];
if(e=="style"){w.applyStyles(c,b)
}else{if(e=="cls"){c.className=b
}else{if(d){c.setAttribute(e,b)
}else{c[e]=b
}}}}}return this
},defaultUnit:"px",is:function(a){return Ext.DomQuery.is(this.dom,a)
},focus:function(a,b){var d=this,b=b||d.dom;
try{if(Number(a)){d.focus.defer(a,null,[null,b])
}else{b.focus()
}}catch(c){}return d
},blur:function(){try{this.dom.blur()
}catch(a){}return this
},getValue:function(b){var a=this.dom.value;
return b?parseInt(a,10):a
},addListener:function(d,a,b,c){Ext.EventManager.on(this.dom,d,a,b||this,c);
return this
},removeListener:function(c,a,b){Ext.EventManager.removeListener(this.dom,c,a,b||this);
return this
},removeAllListeners:function(){Ext.EventManager.removeAll(this.dom);
return this
},purgeAllListeners:function(){Ext.EventManager.purgeElement(this,true);
return this
},addUnits:function(a){if(a===""||a=="auto"||a===undefined){a=a||""
}else{if(!isNaN(a)||!s.test(a)){a=a+(this.defaultUnit||"px")
}}return a
},load:function(b,a,c){Ext.Ajax.request(Ext.apply({params:a,url:b.url||b,callback:c,el:this.dom,indicatorText:b.indicatorText||""},Ext.isObject(b)?b:{}));
return this
},isBorderBox:function(){return u[(this.dom.tagName||"").toLowerCase()]||Ext.isBorderBox
},remove:function(){var b=this,a=b.dom;
if(a){delete b.dom;
Ext.removeNode(a)
}},hover:function(d,e,b,c){var a=this;
a.on("mouseenter",d,b||a.dom,c);
a.on("mouseleave",e,b||a.dom,c);
return a
},contains:function(a){return !a?false:Ext.lib.Dom.isAncestor(this.dom,a.dom?a.dom:a)
},getAttributeNS:function(a,b){return this.getAttribute(b,a)
},getAttribute:Ext.isIE?function(d,b){var a=this.dom,c=typeof a[b+":"+d];
if(["undefined","unknown"].indexOf(c)==-1){return a[b+":"+d]
}return a[d]
}:function(c,b){var a=this.dom;
return a.getAttributeNS(b,c)||a.getAttribute(b+":"+c)||a.getAttribute(c)||a[c]
},update:function(a){if(this.dom){this.dom.innerHTML=a
}return this
}};
var p=v.prototype;
v.addMethods=function(a){Ext.apply(p,a)
};
p.on=p.addListener;
p.un=p.removeListener;
p.autoBoxAdjust=true;
var s=/\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,y;
v.get=function(d){var e,a,b;
if(!d){return null
}if(typeof d=="string"){if(!(a=t.getElementById(d))){return null
}if(A[d]&&A[d].el){e=A[d].el;
e.dom=a
}else{e=v.addToCache(new v(a))
}return e
}else{if(d.tagName){if(!(b=d.id)){b=Ext.id(d)
}if(A[b]&&A[b].el){e=A[b].el;
e.dom=d
}else{e=v.addToCache(new v(d))
}return e
}else{if(d instanceof v){if(d!=y){d.dom=t.getElementById(d.id)||d.dom
}return d
}else{if(d.isComposite){return d
}else{if(Ext.isArray(d)){return v.select(d)
}else{if(d==t){if(!y){var c=function(){};
c.prototype=v.prototype;
y=new c();
y.dom=t
}return y
}}}}}}return null
};
v.addToCache=function(b,a){a=a||b.id;
A[a]={el:b,data:{},events:{}};
return b
};
v.data=function(c,d,b){c=v.get(c);
if(!c){return null
}var a=A[c.id].data;
if(arguments.length==2){return a[d]
}else{return(a[d]=b)
}};
function r(){if(!Ext.enableGarbageCollector){clearInterval(v.collectorThreadId)
}else{var e,c,a,b;
for(e in A){b=A[e];
if(b.skipGC){continue
}c=b.el;
a=c.dom;
if(!a||!a.parentNode||(!a.offsetParent&&!t.getElementById(e))){if(Ext.enableListenerCollection){Ext.EventManager.removeAll(a)
}delete A[e]
}}if(Ext.isIE){var d={};
for(e in A){d[e]=A[e]
}A=Ext.elCache=d
}}}v.collectorThreadId=setInterval(r,30000);
var z=function(){};
z.prototype=v.prototype;
v.Flyweight=function(a){this.dom=a
};
v.Flyweight.prototype=new z();
v.Flyweight.prototype.isFlyweight=true;
v._flyweights={};
v.fly=function(a,c){var b=null;
c=c||"_global";
if(a=Ext.getDom(a)){(v._flyweights[c]=v._flyweights[c]||new v.Flyweight()).dom=a;
b=v._flyweights[c]
}return b
};
Ext.get=v.get;
Ext.fly=v.fly;
var u=Ext.isStrict?{select:1}:{input:1,select:1,textarea:1};
if(Ext.isIE||Ext.isGecko){u.button=1
}Ext.EventManager.on(window,"unload",function(){delete A;
delete v._flyweights
})
})();
Ext.Element.addMethods({swallowEvent:function(g,e){var h=this;
function j(a){a.stopPropagation();
if(e){a.preventDefault()
}}if(Ext.isArray(g)){Ext.each(g,function(a){h.on(a,j)
});
return h
}h.on(g,j);
return h
},relayEvent:function(d,c){this.on(d,function(a){c.fireEvent(d,a)
})
},clean:function(h){var m=this,l=m.dom,k=l.firstChild,n=-1;
if(Ext.Element.data(l,"isCleaned")&&h!==true){return m
}while(k){var j=k.nextSibling;
if(k.nodeType==3&&!/\S/.test(k.nodeValue)){l.removeChild(k)
}else{k.nodeIndex=++n
}k=j
}Ext.Element.data(l,"isCleaned",true);
return m
},load:function(){var b=this.getUpdater();
b.update.apply(b,arguments);
return this
},getUpdater:function(){return this.updateManager||(this.updateManager=new Ext.Updater(this))
},update:function(html,loadScripts,callback){if(!this.dom){return this
}html=html||"";
if(loadScripts!==true){this.dom.innerHTML=html;
if(Ext.isFunction(callback)){callback()
}return this
}var id=Ext.id(),dom=this.dom;
html+='<span id="'+id+'"></span>';
Ext.lib.Event.onAvailable(id,function(){var DOC=document,hd=DOC.getElementsByTagName("head")[0],re=/(?:<script([^>]*)?>)((\n|\r|.)*?)(?:<\/script>)/ig,srcRe=/\ssrc=([\'\"])(.*?)\1/i,typeRe=/\stype=([\'\"])(.*?)\1/i,match,attrs,srcMatch,typeMatch,el,s;
while((match=re.exec(html))){attrs=match[1];
srcMatch=attrs?attrs.match(srcRe):false;
if(srcMatch&&srcMatch[2]){s=DOC.createElement("script");
s.src=srcMatch[2];
typeMatch=attrs.match(typeRe);
if(typeMatch&&typeMatch[2]){s.type=typeMatch[2]
}hd.appendChild(s)
}else{if(match[2]&&match[2].length>0){if(window.execScript){window.execScript(match[2])
}else{window.eval(match[2])
}}}}el=DOC.getElementById(id);
if(el){Ext.removeNode(el)
}if(Ext.isFunction(callback)){callback()
}});
dom.innerHTML=html.replace(/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,"");
return this
},removeAllListeners:function(){this.removeAnchor();
Ext.EventManager.removeAll(this.dom);
return this
},createProxy:function(h,j,k){h=Ext.isObject(h)?h:{tag:"div",cls:h};
var l=this,g=j?Ext.DomHelper.append(j,h,true):Ext.DomHelper.insertBefore(l.dom,h,true);
if(k&&l.setBox&&l.getBox){g.setBox(l.getBox())
}return g
}});
Ext.Element.prototype.getUpdateManager=Ext.Element.prototype.getUpdater;
Ext.Element.addMethods({getAnchorXY:function(y,s,D){y=(y||"tl").toLowerCase();
D=D||{};
var u=this,B=u.dom==document.body||u.dom==document,o=D.width||B?Ext.lib.Dom.getViewWidth():u.getWidth(),w=D.height||B?Ext.lib.Dom.getViewHeight():u.getHeight(),h,C=Math.round,A=u.getXY(),r=u.getScroll(),v=B?r.left:!s?A[0]:0,x=B?r.top:!s?A[1]:0,z={c:[C(o*0.5),C(w*0.5)],t:[C(o*0.5),0],l:[0,C(w*0.5)],r:[o,C(w*0.5)],b:[C(o*0.5),w],tl:[0,0],bl:[0,w],br:[o,w],tr:[o,0]};
h=z[y];
return[h[0]+v,h[1]+x]
},anchorTo:function(w,r,v,x,o,n){var q=this,t=q.dom,p=!Ext.isEmpty(o),u=function(){Ext.fly(t).alignTo(w,r,v,x);
Ext.callback(n,Ext.fly(t))
},s=this.getAnchor();
this.removeAnchor();
Ext.apply(s,{fn:u,scroll:p});
Ext.EventManager.onWindowResize(u,null);
if(p){Ext.EventManager.on(window,"scroll",u,null,{buffer:!isNaN(o)?o:50})
}u.call(q);
return q
},removeAnchor:function(){var c=this,d=this.getAnchor();
if(d&&d.fn){Ext.EventManager.removeResizeListener(d.fn);
if(d.scroll){Ext.EventManager.un(window,"scroll",d.fn)
}delete d.fn
}return c
},getAnchor:function(){var d=Ext.Element.data,g=this.dom;
if(!g){return
}var e=d(g,"_anchor");
if(!e){e=d(g,"_anchor",{})
}return e
},getAlignToXY:function(ae,X,W){ae=Ext.get(ae);
if(!ae||!ae.dom){throw"Element.alignToXY with an element that doesn't exist"
}W=W||[0,0];
X=(!X||X=="?"?"tl-bl?":(!/-/.test(X)&&X!==""?"tl-"+X:X||"tl-bl")).toLowerCase();
var m=this,w=m.dom,d,h,Y,aa,T,P,p,R=Ext.lib.Dom.getViewWidth()-10,x=Ext.lib.Dom.getViewHeight()-10,ag,ad,ac,ab,y,Z,c=document,o=c.documentElement,V=c.body,Q=(o.scrollLeft||V.scrollLeft||0)+5,S=(o.scrollTop||V.scrollTop||0)+5,r=false,af="",ah="",U=X.match(/^([a-z]+)-([a-z]+)(\?)?$/);
if(!U){throw"Element.alignTo with an invalid alignment "+X
}af=U[1];
ah=U[2];
r=!!U[3];
d=m.getAnchorXY(af,true);
h=ae.getAnchorXY(ah,false);
Y=h[0]-d[0]+W[0];
aa=h[1]-d[1]+W[1];
if(r){T=m.getWidth();
P=m.getHeight();
p=ae.getRegion();
ag=af.charAt(0);
ad=af.charAt(af.length-1);
ac=ah.charAt(0);
ab=ah.charAt(ah.length-1);
y=((ag=="t"&&ac=="b")||(ag=="b"&&ac=="t"));
Z=((ad=="r"&&ab=="l")||(ad=="l"&&ab=="r"));
if(Y+T>R+Q){Y=Z?p.left-T:R+Q-T
}if(Y<Q){Y=Z?p.right:Q
}if(aa+P>x+S){aa=y?p.top-P:x+S-P
}if(aa<S){aa=y?p.bottom:S
}}return[Y,aa]
},alignTo:function(l,h,j,g){var k=this;
return k.setXY(k.getAlignToXY(l,h,j),k.preanim&&!!g?k.preanim(arguments,3):false)
},adjustForConstraints:function(g,e,d){return this.getConstrainToXY(e||document,false,d,g)||g
},getConstrainToXY:function(g,h,l,j){var k={top:0,left:0,bottom:0,right:0};
return function(L,E,J,H){L=Ext.get(L);
J=J?Ext.applyIf(J,k):k;
var a,e,b=0,c=0;
if(L.dom==document.body||L.dom==document){a=Ext.lib.Dom.getViewWidth();
e=Ext.lib.Dom.getViewHeight()
}else{a=L.dom.clientWidth;
e=L.dom.clientHeight;
if(!E){var d=L.getXY();
b=d[0];
c=d[1]
}}var w=L.getScroll();
b+=J.left+w.left;
c+=J.top+w.top;
a-=J.right;
e-=J.bottom;
var x=b+a;
var M=c+e;
var K=H||(!E?this.getXY():[this.getLeft(true),this.getTop(true)]);
var F=K[0],G=K[1];
var y=this.dom.offsetWidth,s=this.dom.offsetHeight;
var I=false;
if((F+y)>x){F=x-y;
I=true
}if((G+s)>M){G=M-s;
I=true
}if(F<b){F=b;
I=true
}if(G<c){G=c;
I=true
}return I?[F,G]:false
}
}(),getCenterXY:function(){return this.getAlignToXY(document,"c-c")
},center:function(b){return this.alignTo(b||document,"c-c")
}});
Ext.Element.addMethods(function(){var k="parentNode",g="nextSibling",l="previousSibling",j=Ext.DomQuery,h=Ext.get;
return{findParent:function(p,a,e){var c=this.dom,o=document.body,b=0,d;
if(Ext.isGecko&&Object.prototype.toString.call(c)=="[object XULElement]"){return null
}a=a||50;
if(isNaN(a)){d=Ext.getDom(a);
a=Number.MAX_VALUE
}while(c&&c.nodeType==1&&b<a&&c!=o&&c!=d){if(j.is(c,p)){return e?h(c):c
}b++;
c=c.parentNode
}return null
},findParentNode:function(a,b,d){var c=Ext.fly(this.dom.parentNode,"_internal");
return c?c.findParent(a,b,d):null
},up:function(a,b){return this.findParentNode(a,b,true)
},select:function(a){return Ext.Element.select(a,this.dom)
},query:function(a){return j.select(a,this.dom)
},child:function(c,b){var a=j.selectNode(c,this.dom);
return b?a:h(a)
},down:function(c,b){var a=j.selectNode(" > "+c,this.dom);
return b?a:h(a)
},parent:function(b,a){return this.matchNode(k,k,b,a)
},next:function(b,a){return this.matchNode(g,g,b,a)
},prev:function(b,a){return this.matchNode(l,l,b,a)
},first:function(b,a){return this.matchNode(g,"firstChild",b,a)
},last:function(b,a){return this.matchNode(l,"lastChild",b,a)
},matchNode:function(d,a,e,c){var b=this.dom[a];
while(b){if(b.nodeType==1&&(!e||j.is(b,e))){return !c?h(b):b
}b=b[d]
}return null
}}
}());
Ext.Element.addMethods({select:function(d,c){return Ext.Element.select(d,c,this.dom)
}});
Ext.Element.addMethods(function(){var g=Ext.getDom,e=Ext.get,d=Ext.DomHelper;
return{appendChild:function(a){return e(a).appendTo(this)
},appendTo:function(a){g(a).appendChild(this.dom);
return this
},insertBefore:function(a){(a=g(a)).parentNode.insertBefore(this.dom,a);
return this
},insertAfter:function(a){(a=g(a)).parentNode.insertBefore(this.dom,a.nextSibling);
return this
},insertFirst:function(a,b){a=a||{};
if(a.nodeType||a.dom||typeof a=="string"){a=g(a);
this.dom.insertBefore(a,this.dom.firstChild);
return !b?e(a):a
}else{return this.createChild(a,this.dom.firstChild,b)
}},replace:function(a){a=e(a);
this.insertBefore(a);
a.remove();
return this
},replaceWith:function(b){var a=this;
if(b.nodeType||b.dom||typeof b=="string"){b=g(b);
a.dom.parentNode.insertBefore(b,a.dom)
}else{b=d.insertBefore(a.dom,b)
}delete Ext.elCache[a.id];
Ext.removeNode(a.dom);
a.id=Ext.id(a.dom=b);
Ext.Element.addToCache(a.isFlyweight?new Ext.Element(a.dom):a);
return a
},createChild:function(b,c,a){b=b||{tag:"div"};
return c?d.insertBefore(c,b,a!==true):d[!this.dom.firstChild?"overwrite":"append"](this.dom,b,a!==true)
},wrap:function(c,b){var a=d.insertBefore(this.dom,c||{tag:"div"},!b);
a.dom?a.dom.appendChild(this.dom):a.appendChild(this.dom);
return a
},insertHtml:function(c,b,j){var a=d.insertHtml(c,this.dom,b);
return j?Ext.get(a):a
}}
}());
Ext.apply(Ext.Element.prototype,function(){var g=Ext.getDom,e=Ext.get,d=Ext.DomHelper;
return{insertSibling:function(c,n,m){var b=this,o,p=(n||"before").toLowerCase()=="after",a;
if(Ext.isArray(c)){a=b;
Ext.each(c,function(h){o=Ext.fly(a,"_internal").insertSibling(h,n,m);
if(p){a=o
}});
return o
}c=c||{};
if(c.nodeType||c.dom){o=b.dom.parentNode.insertBefore(g(c),p?b.dom.nextSibling:b.dom);
if(!m){o=e(o)
}}else{if(p&&!b.dom.nextSibling){o=d.append(b.dom.parentNode,c,!m)
}else{o=d[p?"insertAfter":"insertBefore"](b.dom,c,!m)
}}return o
}}
}());
Ext.Element.addMethods(function(){var ab={},G=/(-[a-z])/gi,ag={},M=document.defaultView,J=Ext.isIE?"styleFloat":"cssFloat",O=/alpha\(opacity=(.*)\)/i,X=/^\s+|\s+$/g,S=Ext.Element,ae="padding",af="margin",F="border",K="-left",Q="-right",H="-top",U="-bottom",Z="-width",N=Math,T="hidden",ad="isClipped",Y="overflow",V="overflow-x",W="overflow-y",P="originalClip",aa={l:F+K+Z,r:F+Q+Z,t:F+H+Z,b:F+U+Z},ac={l:ae+K,r:ae+Q,t:ae+H,b:ae+U},ah={l:af+K,r:af+Q,t:af+H,b:af+U},L=Ext.Element.data;
function R(b,a){return a.charAt(1).toUpperCase()
}function I(a){return ab[a]||(ab[a]=a=="float"?J:a.replace(G,R))
}return{adjustWidth:function(c){var b=this;
var a=Ext.isNumber(c);
if(a&&b.autoBoxAdjust&&!b.isBorderBox()){c-=(b.getBorderWidth("lr")+b.getPadding("lr"))
}return(a&&c<0)?0:c
},adjustHeight:function(c){var b=this;
var a=Ext.isNumber(c);
if(a&&b.autoBoxAdjust&&!b.isBorderBox()){c-=(b.getBorderWidth("tb")+b.getPadding("tb"))
}return(a&&c<0)?0:c
},addClass:function(b){var a=this,c,e,d;
b=Ext.isArray(b)?b:[b];
for(c=0,e=b.length;
c<e;
c++){d=b[c];
if(d){a.dom.className+=(!a.hasClass(d)&&d?" "+d:"")
}}return a
},radioClass:function(b){var a=this.dom.parentNode.childNodes,d;
b=Ext.isArray(b)?b:[b];
for(var c=0,e=a.length;
c<e;
c++){d=a[c];
if(d&&d.nodeType==1){Ext.fly(d,"_internal").removeClass(b)
}}return this.addClass(b)
},removeClass:function(b){var a=this,d;
b=Ext.isArray(b)?b:[b];
if(a.dom&&a.dom.className){for(var c=0,e=b.length;
c<e;
c++){d=b[c];
if(d){a.dom.className=a.dom.className.replace(ag[d]=ag[d]||new RegExp("(?:^|\\s+)"+d+"(?:\\s+|$)","g")," ")
}}}return a
},toggleClass:function(a){return this.hasClass(a)?this.removeClass(a):this.addClass(a)
},hasClass:function(a){return a&&(" "+this.dom.className+" ").indexOf(" "+a+" ")!=-1
},replaceClass:function(a,b){return this.removeClass(a).addClass(b)
},isStyle:function(b,a){return this.getStyle(b)==a
},getStyle:function(){return M&&M.getComputedStyle?function(a){var d=this.dom,h,e,g,c,b=Ext.isWebKit,c;
if(d==document){return null
}a=I(a);
if(b&&/marginRight/.test(a)){c=this.getStyle("display");
d.style.display="inline-block"
}g=(h=d.style[a])?h:(e=M.getComputedStyle(d,""))?e[a]:null;
if(b){if(g=="rgba(0, 0, 0, 0)"){g="transparent"
}else{if(c){d.style.display=c
}}}return g
}:function(a){var c=this.dom,e,d;
if(c==document){return null
}if(a=="opacity"){if(c.style.filter.match){if(e=c.style.filter.match(O)){var b=parseFloat(e[1]);
if(!isNaN(b)){return b?b/100:0
}}}return 1
}a=I(a);
return c.style[a]||((d=c.currentStyle)?d[a]:null)
}
}(),getColor:function(g,e,a){var c=this.getStyle(g),d=Ext.isDefined(a)?a:"#",b;
if(!c||/transparent|inherit/.test(c)){return e
}if(/^r/.test(c)){Ext.each(c.slice(4,c.length-1).split(","),function(h){b=parseInt(h,10);
d+=(b<16?"0":"")+b.toString(16)
})
}else{c=c.replace("#","");
d+=c.length==3?c.replace(/^(\w)(\w)(\w)$/,"$1$1$2$2$3$3"):c
}return(d.length>5?d.toLowerCase():e)
},setStyle:function(a,b){var d,c,e;
if(!Ext.isObject(a)){d={};
d[a]=b;
a=d
}for(c in a){b=a[c];
c=="opacity"?this.setOpacity(b):this.dom.style[I(c)]=b
}return this
},setOpacity:function(e,g){var b=this,d=b.dom.style;
if(!g||!b.anim){if(Ext.isIE){var c=e<1?"alpha(opacity="+e*100+")":"",a=d.filter.replace(O,"").replace(X,"");
d.zoom=1;
d.filter=a+(a.length>0?" ":"")+c
}else{d.opacity=e
}}else{b.anim({opacity:{to:e}},b.preanim(arguments,1),null,0.35,"easeIn")
}return b
},clearOpacity:function(){var a=this.dom.style;
if(Ext.isIE){if(!Ext.isEmpty(a.filter)){a.filter=a.filter.replace(O,"").replace(X,"")
}}else{a.opacity=a["-moz-opacity"]=a["-khtml-opacity"]=""
}return this
},getHeight:function(c){var d=this,a=d.dom,b=Ext.isIE&&d.isStyle("display","none"),e=N.max(a.offsetHeight,b?0:a.clientHeight)||0;
e=!c?e:e-d.getBorderWidth("tb")-d.getPadding("tb");
return e<0?0:e
},getWidth:function(d){var c=this,a=c.dom,b=Ext.isIE&&c.isStyle("display","none"),e=N.max(a.offsetWidth,b?0:a.clientWidth)||0;
e=!d?e:e-c.getBorderWidth("lr")-c.getPadding("lr");
return e<0?0:e
},setWidth:function(b,c){var a=this;
b=a.adjustWidth(b);
!c||!a.anim?a.dom.style.width=a.addUnits(b):a.anim({width:{to:b}},a.preanim(arguments,1));
return a
},setHeight:function(c,b){var a=this;
c=a.adjustHeight(c);
!b||!a.anim?a.dom.style.height=a.addUnits(c):a.anim({height:{to:c}},a.preanim(arguments,1));
return a
},getBorderWidth:function(a){return this.addStyles(a,aa)
},getPadding:function(a){return this.addStyles(a,ac)
},clip:function(){var b=this,a=b.dom;
if(!L(a,ad)){L(a,ad,true);
L(a,P,{o:b.getStyle(Y),x:b.getStyle(V),y:b.getStyle(W)});
b.setStyle(Y,T);
b.setStyle(V,T);
b.setStyle(W,T)
}return b
},unclip:function(){var c=this,a=c.dom;
if(L(a,ad)){L(a,ad,false);
var b=L(a,P);
if(b.o){c.setStyle(Y,b.o)
}if(b.x){c.setStyle(V,b.x)
}if(b.y){c.setStyle(W,b.y)
}}return c
},addStyles:function(b,c){var a=0,g=b.match(/\w/g),d;
for(var e=0,h=g.length;
e<h;
e++){d=g[e]&&parseInt(this.getStyle(c[g[e]]),10);
if(d){a+=N.abs(d)
}}return a
},margins:ah}
}());
Ext.Element.boxMarkup='<div class="{0}-tl"><div class="{0}-tr"><div class="{0}-tc"></div></div></div><div class="{0}-ml"><div class="{0}-mr"><div class="{0}-mc"></div></div></div><div class="{0}-bl"><div class="{0}-br"><div class="{0}-bc"></div></div></div>';
Ext.Element.addMethods(function(){var d="_internal",c=/(\d+)px/;
return{applyStyles:function(a){Ext.DomHelper.applyStyles(this.dom,a);
return this
},getStyles:function(){var a={};
Ext.each(arguments,function(b){a[b]=this.getStyle(b)
},this);
return a
},getStyleSize:function(){var b=this,m,h,a=this.dom,l=a.style;
if(l.width&&l.width!="auto"){m=parseInt(l.width,10);
if(b.isBorderBox()){m-=b.getFrameWidth("lr")
}}if(l.height&&l.height!="auto"){h=parseInt(l.height,10);
if(b.isBorderBox()){h-=b.getFrameWidth("tb")
}}return{width:m||b.getWidth(true),height:h||b.getHeight(true)}
},setOverflow:function(b){var a=this.dom;
if(b=="auto"&&Ext.isMac&&Ext.isGecko2){a.style.overflow="hidden";
(function(){a.style.overflow="auto"
}).defer(1)
}else{a.style.overflow=b
}},boxWrap:function(b){b=b||"x-box";
var a=Ext.get(this.insertHtml("beforeBegin","<div class='"+b+"'>"+String.format(Ext.Element.boxMarkup,b)+"</div>"));
Ext.DomQuery.selectNode("."+b+"-mc",a.dom).appendChild(this.dom);
return a
},setSize:function(b,j,h){var a=this;
if(Ext.isObject(b)){j=b.height;
b=b.width
}b=a.adjustWidth(b);
j=a.adjustHeight(j);
if(!h||!a.anim){a.dom.style.width=a.addUnits(b);
a.dom.style.height=a.addUnits(j)
}else{a.anim({width:{to:b},height:{to:j}},a.preanim(arguments,2))
}return a
},getComputedHeight:function(){var a=this,b=Math.max(a.dom.offsetHeight,a.dom.clientHeight);
if(!b){b=parseInt(a.getStyle("height"),10)||0;
if(!a.isBorderBox()){b+=a.getFrameWidth("tb")
}}return b
},getComputedWidth:function(){var a=Math.max(this.dom.offsetWidth,this.dom.clientWidth);
if(!a){a=parseInt(this.getStyle("width"),10)||0;
if(!this.isBorderBox()){a+=this.getFrameWidth("lr")
}}return a
},getFrameWidth:function(a,b){return b&&this.isBorderBox()?0:(this.getPadding(a)+this.getBorderWidth(a))
},addClassOnOver:function(a){this.hover(function(){Ext.fly(this,d).addClass(a)
},function(){Ext.fly(this,d).removeClass(a)
});
return this
},addClassOnFocus:function(a){this.on("focus",function(){Ext.fly(this,d).addClass(a)
},this.dom);
this.on("blur",function(){Ext.fly(this,d).removeClass(a)
},this.dom);
return this
},addClassOnClick:function(b){var a=this.dom;
this.on("mousedown",function(){Ext.fly(a,d).addClass(b);
var h=Ext.getDoc(),j=function(){Ext.fly(a,d).removeClass(b);
h.removeListener("mouseup",j)
};
h.on("mouseup",j)
});
return this
},getViewSize:function(y){var b=document,w=this,z=w.dom,x=Ext.lib.Dom,v=(z==b||z==b.body),t,a,A,u=0,C=0,B=0,h=0;
if(v){return{width:x.getViewWidth(),height:x.getViewHeight()}
}t=w.isBorderBox();
u=w.getBorderWidth("tb");
C=w.getBorderWidth("lr");
B=w.getPadding("tb");
h=w.getPadding("lr");
if(a=w.getStyle("width").match(c)){if((a=parseInt(a[1],10))&&t){a-=(C+h)
}if(!y){a+=h
}}else{if(!(a=z.clientWidth)&&(a=z.offsetWidth)){a-=C
}if(a&&y){a-=h
}}if(A=w.getStyle("height").match(c)){if((A=parseInt(A[1],10))&&t){A-=(u+B)
}if(!y){A+=B
}}else{if(!(A=z.clientHeight)&&(A=z.offsetHeight)){A-=u
}if(A&&y){A-=B
}}return{width:a,height:A}
},getSize:function(a){return{width:this.getWidth(a),height:this.getHeight(a)}
},repaint:function(){var a=this.dom;
this.addClass("x-repaint");
setTimeout(function(){Ext.fly(a).removeClass("x-repaint")
},1);
return this
},unselectable:function(){this.dom.unselectable="on";
return this.swallowEvent("selectstart",true).applyStyles("-moz-user-select:none;-khtml-user-select:none;").addClass("x-unselectable")
},getMargins:function(k){var j=this,l,b={t:"top",l:"left",r:"right",b:"bottom"},a={};
if(!k){for(l in j.margins){a[b[l]]=parseInt(j.getStyle(j.margins[l]),10)||0
}return a
}else{return j.addStyles.call(j,k,j.margins)
}}}
}());
(function(){var v=Ext.lib.Dom,u="left",q="right",s="top",o="bottom",p="position",t="static",r="relative",n="auto",m="z-index";
Ext.Element.addMethods({getX:function(){return v.getX(this.dom)
},getY:function(){return v.getY(this.dom)
},getXY:function(){return v.getXY(this.dom)
},getOffsetsTo:function(a){var b=this.getXY(),c=Ext.fly(a,"_internal").getXY();
return[b[0]-c[0],b[1]-c[1]]
},setX:function(a,b){return this.setXY([a,this.getY()],this.animTest(arguments,b,1))
},setY:function(b,a){return this.setXY([this.getX(),b],this.animTest(arguments,a,1))
},setLeft:function(a){this.setStyle(u,this.addUnits(a));
return this
},setTop:function(a){this.setStyle(s,this.addUnits(a));
return this
},setRight:function(a){this.setStyle(q,this.addUnits(a));
return this
},setBottom:function(a){this.setStyle(o,this.addUnits(a));
return this
},setXY:function(b,a){var c=this;
if(!a||!c.anim){v.setXY(c.dom,b)
}else{c.anim({points:{to:b}},c.preanim(arguments,1),"motion")
}return c
},setLocation:function(a,b,c){return this.setXY([a,b],this.animTest(arguments,c,2))
},moveTo:function(a,b,c){return this.setXY([a,b],this.animTest(arguments,c,2))
},getLeft:function(a){return !a?this.getX():parseInt(this.getStyle(u),10)||0
},getRight:function(a){var b=this;
return !a?b.getX()+b.getWidth():(b.getLeft(true)+b.getWidth())||0
},getTop:function(a){return !a?this.getY():parseInt(this.getStyle(s),10)||0
},getBottom:function(a){var b=this;
return !a?b.getY()+b.getHeight():(b.getTop(true)+b.getHeight())||0
},position:function(b,c,a,d){var e=this;
if(!b&&e.isStyle(p,t)){e.setStyle(p,r)
}else{if(b){e.setStyle(p,b)
}}if(c){e.setStyle(m,c)
}if(a||d){e.setXY([a||false,d||false])
}},clearPositioning:function(a){a=a||"";
this.setStyle({left:a,right:a,top:a,bottom:a,"z-index":"",position:t});
return this
},getPositioning:function(){var a=this.getStyle(u);
var b=this.getStyle(s);
return{position:this.getStyle(p),left:a,right:a?"":this.getStyle(q),top:b,bottom:b?"":this.getStyle(o),"z-index":this.getStyle(m)}
},setPositioning:function(a){var b=this,c=b.dom.style;
b.setStyle(a);
if(a.right==n){c.right=""
}if(a.bottom==n){c.bottom=""
}return b
},translatePoints:function(a,b){b=isNaN(a[1])?b:a[1];
a=isNaN(a[0])?a:a[0];
var e=this,d=e.isStyle(p,r),c=e.getXY(),h=parseInt(e.getStyle(u),10),g=parseInt(e.getStyle(s),10);
h=!isNaN(h)?h:(d?0:e.dom.offsetLeft);
g=!isNaN(g)?g:(d?0:e.dom.offsetTop);
return{left:(a-c[0]+h),top:(b-c[1]+g)}
},animTest:function(c,a,b){return !!a&&this.preanim?this.preanim(c,b):false
}})
})();
Ext.Element.addMethods({setBox:function(l,k,h){var m=this,j=l.width,n=l.height;
if((k&&!m.autoBoxAdjust)&&!m.isBorderBox()){j-=(m.getBorderWidth("lr")+m.getPadding("lr"));
n-=(m.getBorderWidth("tb")+m.getPadding("tb"))
}m.setBounds(l.x,l.y,j,n,m.animTest.call(m,arguments,h,2));
return m
},getBox:function(w,b){var r=this,E,A,h,B=r.getBorderWidth,H=r.getPadding,z,D,F,l;
if(!b){E=r.getXY()
}else{A=parseInt(r.getStyle("left"),10)||0;
h=parseInt(r.getStyle("top"),10)||0;
E=[A,h]
}var C=r.dom,G=C.offsetWidth,y=C.offsetHeight,t;
if(!w){t={x:E[0],y:E[1],0:E[0],1:E[1],width:G,height:y}
}else{z=B.call(r,"l")+H.call(r,"l");
D=B.call(r,"r")+H.call(r,"r");
F=B.call(r,"t")+H.call(r,"t");
l=B.call(r,"b")+H.call(r,"b");
t={x:E[0]+z,y:E[1]+F,0:E[0]+z,1:E[1]+F,width:G-(z+D),height:y-(F+l)}
}t.right=t.x+t.width;
t.bottom=t.y+t.height;
return t
},move:function(r,y,x){var u=this,o=u.getXY(),q=o[0],s=o[1],w=[q-y,s],p=[q+y,s],t=[q,s-y],z=[q,s+y],v={l:w,left:w,r:p,right:p,t:t,top:t,up:t,b:z,bottom:z,down:z};
r=r.toLowerCase();
u.moveTo(v[r][0],v[r][1],u.animTest.call(u,arguments,x,2))
},setLeftTop:function(h,j){var e=this,g=e.dom.style;
g.left=e.addUnits(h);
g.top=e.addUnits(j);
return e
},getRegion:function(){return Ext.lib.Dom.getRegion(this.dom)
},setBounds:function(h,k,m,j,n){var l=this;
if(!n||!l.anim){l.setSize(m,j);
l.setLocation(h,k)
}else{l.anim({points:{to:[h,k]},width:{to:l.adjustWidth(m)},height:{to:l.adjustHeight(j)}},l.preanim(arguments,4),"motion")
}return l
},setRegion:function(c,d){return this.setBounds(c.left,c.top,c.right-c.left,c.bottom-c.top,this.animTest.call(this,arguments,d,1))
}});
Ext.Element.addMethods({isScrollable:function(){var b=this.dom;
return b.scrollHeight>b.clientHeight||b.scrollWidth>b.clientWidth
},scrollTo:function(d,c){this.dom["scroll"+(/top/i.test(d)?"Top":"Left")]=c;
return this
},getScroll:function(){var l=this.dom,m=document,k=m.body,p=m.documentElement,d,n,o;
if(l==m||l==k){if(Ext.isIE&&Ext.isStrict){d=p.scrollLeft;
n=p.scrollTop
}else{d=window.pageXOffset;
n=window.pageYOffset
}o={left:d||(k?k.scrollLeft:0),top:n||(k?k.scrollTop:0)}
}else{o={left:l.scrollLeft,top:l.scrollTop}
}return o
}});
Ext.Element.addMethods({scrollTo:function(j,o,k){var n=/top/i.test(j),p=this,m=p.dom,l;
if(!k||!p.anim){l="scroll"+(n?"Top":"Left"),m[l]=o
}else{l="scroll"+(n?"Left":"Top"),p.anim({scroll:{to:n?[m[l],o]:[o,m[l]]}},p.preanim(arguments,2),"scroll")
}return p
},scrollIntoView:function(y,t){var b=Ext.getDom(y)||Ext.getBody().dom,w=this.dom,x=this.getOffsetsTo(b),o=x[0]+b.scrollLeft,B=x[1]+b.scrollTop,D=B+w.offsetHeight,z=o+w.offsetWidth,A=b.clientHeight,l=parseInt(b.scrollTop,10),C=parseInt(b.scrollLeft,10),r=l+A,c=C+b.clientWidth;
if(w.offsetHeight>A||B<l){b.scrollTop=B
}else{if(D>r){b.scrollTop=D-A
}}b.scrollTop=b.scrollTop;
if(t!==false){if(w.offsetWidth>b.clientWidth||o<C){b.scrollLeft=o
}else{if(z>c){b.scrollLeft=z-b.clientWidth
}}b.scrollLeft=b.scrollLeft
}return this
},scrollChildIntoView:function(c,d){Ext.fly(c,"_scrollChildIntoView").scrollIntoView(this,d)
},scroll:function(s,A,y){if(!this.isScrollable()){return
}var x=this.dom,w=x.scrollLeft,h=x.scrollTop,r=x.scrollWidth,t=x.scrollHeight,v=x.clientWidth,B=x.clientHeight,z=false,l,u={l:Math.min(w+A,r-v),r:l=Math.max(w-A,0),t:Math.max(h-A,0),b:Math.min(h+A,t-B)};
u.d=u.b;
u.u=u.t;
s=s.substr(0,1);
if((l=u[s])>-1){z=true;
this.scrollTo(s=="l"||s=="r"?"left":"top",l,this.preanim(arguments,2))
}return z
}});
Ext.Element.VISIBILITY=1;
Ext.Element.DISPLAY=2;
Ext.Element.addMethods(function(){var p="visibility",s="display",u="hidden",n="none",v="originalDisplay",t="visibilityMode",r=Ext.Element.DISPLAY,q=Ext.Element.data,o=function(b){var a=q(b,v);
if(a===undefined){q(b,v,a="")
}return a
},m=function(a){var b=q(a,t);
if(b===undefined){q(a,t,b=1)
}return b
};
return{originalDisplay:"",visibilityMode:1,setVisibilityMode:function(a){q(this.dom,t,a);
return this
},animate:function(e,c,d,b,a){this.anim(e,{duration:c,callback:d,easing:b},a);
return this
},anim:function(g,e,j,c,h,a){j=j||"run";
e=e||{};
var d=this,b=Ext.lib.Anim[j](d.dom,g,(e.duration||c)||0.35,(e.easing||h)||"easeOut",function(){if(a){a.call(d)
}if(e.callback){e.callback.call(e.scope||d,d,e)
}},d);
e.anim=b;
return b
},preanim:function(a,b){return !a[b]?false:(Ext.isObject(a[b])?a[b]:{duration:a[b+1],callback:a[b+2],easing:a[b+3]})
},isVisible:function(){return !this.isStyle(p,u)&&!this.isStyle(s,n)
},setVisible:function(b,e){var d=this,c=d.dom,a=m(this.dom)==r;
if(!e||!d.anim){if(a){d.setDisplayed(b)
}else{d.fixDisplay();
c.style.visibility=b?"visible":u
}}else{if(b){d.setOpacity(0.01);
d.setVisible(true)
}d.anim({opacity:{to:(b?1:0)}},d.preanim(arguments,1),null,0.35,"easeIn",function(){if(!b){c.style[a?s:p]=(a)?n:u;
Ext.fly(c).setOpacity(1)
}})
}return d
},toggle:function(a){var b=this;
b.setVisible(!b.isVisible(),b.preanim(arguments,0));
return b
},setDisplayed:function(a){if(typeof a=="boolean"){a=a?o(this.dom):n
}this.setStyle(s,a);
return this
},fixDisplay:function(){var a=this;
if(a.isStyle(s,n)){a.setStyle(p,u);
a.setStyle(s,o(this.dom));
if(a.isStyle(s,n)){a.setStyle(s,"block")
}}},hide:function(a){this.setVisible(false,this.preanim(arguments,0));
return this
},show:function(a){this.setVisible(true,this.preanim(arguments,0));
return this
}}
}());
Ext.Element.addMethods(function(){var o="visibility",j="display",k="hidden",l="none",p="x-masked",m="x-masked-relative",n=Ext.Element.data;
return{isVisible:function(c){var b=!this.isStyle(o,k)&&!this.isStyle(j,l),a=this.dom.parentNode;
if(c!==true||!b){return b
}while(a&&!/body/i.test(a.tagName)){if(!Ext.fly(a,"_isVisible").isVisible()){return false
}a=a.parentNode
}return true
},isDisplayed:function(){return !this.isStyle(j,l)
},enableDisplayMode:function(a){this.setVisibilityMode(Ext.Element.DISPLAY);
if(!Ext.isEmpty(a)){n(this.dom,"originalDisplay",a)
}return this
},mask:function(s,d){var b=this,g=b.dom,c=Ext.DomHelper,e="ext-el-mask-msg",t,a;
if(b.getStyle("position")=="static"){b.addClass(m)
}if((t=n(g,"maskMsg"))){t.remove()
}if((t=n(g,"mask"))){t.remove()
}a=c.append(g,{cls:"ext-el-mask"},true);
n(g,"mask",a);
b.addClass(p);
a.setDisplayed(true);
if(typeof s=="string"){var h=c.append(g,{cls:e,cn:{tag:"div"}},true);
n(g,"maskMsg",h);
h.dom.className=d?e+" "+d:e;
h.dom.firstChild.innerHTML=s;
h.setDisplayed(true);
h.center(b)
}if(Ext.isIE&&!(Ext.isIE7&&Ext.isStrict)&&b.getStyle("height")=="auto"){a.setSize(undefined,b.getHeight())
}return a
},unmask:function(){var b=this,a=b.dom,d=n(a,"mask"),c=n(a,"maskMsg");
if(d){if(c){c.remove();
n(a,"maskMsg",undefined)
}d.remove();
n(a,"mask",undefined)
}b.removeClass([p,m])
},isMasked:function(){var a=n(this.dom,"mask");
return a&&a.isVisible()
},createShim:function(){var b=document.createElement("iframe"),a;
b.frameBorder="0";
b.className="ext-shim";
b.src=Ext.SSL_SECURE_URL;
a=Ext.get(this.dom.parentNode.insertBefore(b,this.dom));
a.autoBoxAdjust=false;
return a
}}
}());
Ext.Element.addMethods({addKeyListener:function(e,h,j){var g;
if(!Ext.isObject(e)||Ext.isArray(e)){g={key:e,fn:h,scope:j}
}else{g={key:e.key,shift:e.shift,ctrl:e.ctrl,alt:e.alt,fn:h,scope:j}
}return new Ext.KeyMap(this,g)
},addKeyMap:function(b){return new Ext.KeyMap(this,b)
}});
(function(){var C=null,M=undefined,S=true,H=false,T="setX",V="setY",ab="setXY",P="left",R="bottom",I="top",Q="right",K="height",W="width",U="points",E="hidden",O="absolute",G="visible",X="motion",N="position",J="easeOut",Y=new Ext.Element.Flyweight(),F={},D=function(a){return a||{}
},L=function(a){Y.dom=a;
Y.id=Ext.id(a);
return Y
},Z=function(a){if(!F[a]){F[a]=[]
}return F[a]
},aa=function(a,b){F[a]=b
};
Ext.enableFx=S;
Ext.Fx={switchStatements:function(b,a,c){return a.apply(this,c[b])
},slideIn:function(l,o){o=D(o);
var j=this,m=j.dom,e=m.style,c,b,g,p,a,e,k,d,h,n;
l=l||"t";
j.queueFx(o,function(){c=L(m).getXY();
L(m).fixDisplay();
b=L(m).getFxRestore();
g={x:c[0],y:c[1],0:c[0],1:c[1],width:m.offsetWidth,height:m.offsetHeight};
g.right=g.x+g.width;
g.bottom=g.y+g.height;
L(m).setWidth(g.width).setHeight(g.height);
p=L(m).fxWrap(b.pos,o,E);
e.visibility=G;
e.position=O;
function r(){L(m).fxUnwrap(p,b.pos,o);
e.width=b.width;
e.height=b.height;
L(m).afterFx(o)
}d={to:[g.x,g.y]};
h={to:g.width};
n={to:g.height};
function q(x,A,w,z,u,s,B,ad,ae,v,y){var t={};
L(x).setWidth(w).setHeight(z);
if(L(x)[u]){L(x)[u](s)
}A[B]=A[ad]="0";
if(ae){t.width=ae
}if(v){t.height=v
}if(y){t.points=y
}return t
}k=L(m).switchStatements(l.toLowerCase(),q,{t:[p,e,g.width,0,C,C,P,R,C,n,C],l:[p,e,0,g.height,C,C,Q,I,h,C,C],r:[p,e,g.width,g.height,T,g.right,P,I,C,C,d],b:[p,e,g.width,g.height,V,g.bottom,P,I,C,n,d],tl:[p,e,0,0,C,C,Q,R,h,n,d],bl:[p,e,0,0,V,g.y+g.height,Q,I,h,n,d],br:[p,e,0,0,ab,[g.right,g.bottom],P,I,h,n,d],tr:[p,e,0,0,T,g.x+g.width,P,R,h,n,d]});
e.visibility=G;
L(p).show();
arguments.callee.anim=L(p).fxanim(k,o,X,0.5,J,r)
});
return j
},slideOut:function(k,m){m=D(m);
var h=this,l=h.dom,d=l.style,c=h.getXY(),a,b,g,e,j={to:0};
k=k||"t";
h.queueFx(m,function(){b=L(l).getFxRestore();
g={x:c[0],y:c[1],0:c[0],1:c[1],width:l.offsetWidth,height:l.offsetHeight};
g.right=g.x+g.width;
g.bottom=g.y+g.height;
L(l).setWidth(g.width).setHeight(g.height);
a=L(l).fxWrap(b.pos,m,G);
d.visibility=G;
d.position=O;
L(a).setWidth(g.width).setHeight(g.height);
function o(){m.useDisplay?L(l).setDisplayed(H):L(l).hide();
L(l).fxUnwrap(a,b.pos,m);
d.width=b.width;
d.height=b.height;
L(l).afterFx(m)
}function n(y,q,s,p,u,r,v,t,w){var x={};
y[q]=y[s]="0";
x[p]=u;
if(r){x[r]=v
}if(t){x[t]=w
}return x
}e=L(l).switchStatements(k.toLowerCase(),n,{t:[d,P,R,K,j],l:[d,Q,I,W,j],r:[d,P,I,W,j,U,{to:[g.right,g.y]}],b:[d,P,I,K,j,U,{to:[g.x,g.bottom]}],tl:[d,Q,R,W,j,K,j],bl:[d,Q,I,W,j,K,j,U,{to:[g.x,g.bottom]}],br:[d,P,I,W,j,K,j,U,{to:[g.x+g.width,g.bottom]}],tr:[d,P,R,W,j,K,j,U,{to:[g.right,g.y]}]});
arguments.callee.anim=L(a).fxanim(e,m,X,0.5,J,o)
});
return h
},puff:function(a){a=D(a);
var c=this,b=c.dom,g=b.style,e,h,d;
c.queueFx(a,function(){e=L(b).getWidth();
h=L(b).getHeight();
L(b).clearOpacity();
L(b).show();
d=L(b).getFxRestore();
function j(){a.useDisplay?L(b).setDisplayed(H):L(b).hide();
L(b).clearOpacity();
L(b).setPositioning(d.pos);
g.width=d.width;
g.height=d.height;
g.fontSize="";
L(b).afterFx(a)
}arguments.callee.anim=L(b).fxanim({width:{to:L(b).adjustWidth(e*2)},height:{to:L(b).adjustHeight(h*2)},points:{by:[-e*0.5,-h*0.5]},opacity:{to:0},fontSize:{to:200,unit:"%"}},a,X,0.5,J,j)
});
return c
},switchOff:function(a){a=D(a);
var c=this,b=c.dom,e=b.style,d;
c.queueFx(a,function(){L(b).clearOpacity();
L(b).clip();
d=L(b).getFxRestore();
function g(){a.useDisplay?L(b).setDisplayed(H):L(b).hide();
L(b).clearOpacity();
L(b).setPositioning(d.pos);
e.width=d.width;
e.height=d.height;
L(b).afterFx(a)
}L(b).fxanim({opacity:{to:0.3}},C,C,0.1,C,function(){L(b).clearOpacity();
(function(){L(b).fxanim({height:{to:1},points:{by:[0,L(b).getHeight()*0.5]}},a,X,0.3,"easeIn",g)
}).defer(100)
})
});
return c
},highlight:function(e,a){a=D(a);
var c=this,b=c.dom,h=a.attr||"backgroundColor",g={},d;
c.queueFx(a,function(){L(b).clearOpacity();
L(b).show();
function j(){b.style[h]=d;
L(b).afterFx(a)
}d=b.style[h];
g[h]={from:e||"ffff9c",to:a.endColor||L(b).getColor(h)||"ffffff"};
arguments.callee.anim=L(b).fxanim(g,a,"color",1,"easeIn",j)
});
return c
},frame:function(h,d,a){a=D(a);
var e=this,b=e.dom,g,c;
e.queueFx(a,function(){h=h||"#C3DAF9";
if(h.length==6){h="#"+h
}d=d||1;
L(b).show();
var m=L(b).getXY(),k={x:m[0],y:m[1],0:m[0],1:m[1],width:b.offsetWidth,height:b.offsetHeight},l=function(){g=L(document.body||document.documentElement).createChild({style:{position:O,"z-index":35000,border:"0px solid "+h}});
return g.queueFx({},j)
};
arguments.callee.anim={isAnimated:true,stop:function(){d=0;
g.stopFx()
}};
function j(){var n=Ext.isBorderBox?2:1;
c=g.anim({top:{from:k.y,to:k.y-20},left:{from:k.x,to:k.x-20},borderWidth:{from:0,to:10},opacity:{from:1,to:0},height:{from:k.height,to:k.height+20*n},width:{from:k.width,to:k.width+20*n}},{duration:a.duration||1,callback:function(){g.remove();
--d>0?l():L(b).afterFx(a)
}});
arguments.callee.anim={isAnimated:true,stop:function(){c.stop()
}}
}l()
});
return e
},pause:function(a){var b=this.dom,c;
this.queueFx({},function(){c=setTimeout(function(){L(b).afterFx({})
},a*1000);
arguments.callee.anim={isAnimated:true,stop:function(){clearTimeout(c);
L(b).afterFx({})
}}
});
return this
},fadeIn:function(b){b=D(b);
var d=this,c=d.dom,a=b.endOpacity||1;
d.queueFx(b,function(){L(c).setOpacity(0);
L(c).fixDisplay();
c.style.visibility=G;
arguments.callee.anim=L(c).fxanim({opacity:{to:a}},b,C,0.5,J,function(){if(a==1){L(c).clearOpacity()
}L(c).afterFx(b)
})
});
return d
},fadeOut:function(b){b=D(b);
var d=this,c=d.dom,e=c.style,a=b.endOpacity||0;
d.queueFx(b,function(){arguments.callee.anim=L(c).fxanim({opacity:{to:a}},b,C,0.5,J,function(){if(a==0){Ext.Element.data(c,"visibilityMode")==Ext.Element.DISPLAY||b.useDisplay?e.display="none":e.visibility=E;
L(c).clearOpacity()
}L(c).afterFx(b)
})
});
return d
},scale:function(c,b,a){this.shift(Ext.apply({},a,{width:c,height:b}));
return this
},shift:function(a){a=D(a);
var b=this.dom,c={};
this.queueFx(a,function(){for(var d in a){if(a[d]!=M){c[d]={to:a[d]}
}}c.width?c.width.to=L(b).adjustWidth(a.width):c;
c.height?c.height.to=L(b).adjustWidth(a.height):c;
if(c.x||c.y||c.xy){c.points=c.xy||{to:[c.x?c.x.to:L(b).getX(),c.y?c.y.to:L(b).getY()]}
}arguments.callee.anim=L(b).fxanim(c,a,X,0.35,J,function(){L(b).afterFx(a)
})
});
return this
},ghost:function(k,a){a=D(a);
var h=this,l=h.dom,d=l.style,g={opacity:{to:0},points:{}},c=g.points,b,e,j;
k=k||"b";
h.queueFx(a,function(){b=L(l).getFxRestore();
e=L(l).getWidth();
j=L(l).getHeight();
function m(){a.useDisplay?L(l).setDisplayed(H):L(l).hide();
L(l).clearOpacity();
L(l).setPositioning(b.pos);
d.width=b.width;
d.height=b.height;
L(l).afterFx(a)
}c.by=L(l).switchStatements(k.toLowerCase(),function(n,o){return[n,o]
},{t:[0,-j],l:[-e,0],r:[e,0],b:[0,j],tl:[-e,-j],bl:[-e,j],br:[e,j],tr:[e,-j]});
arguments.callee.anim=L(l).fxanim(g,a,X,0.5,J,m)
});
return h
},syncFx:function(){var a=this;
a.fxDefaults=Ext.apply(a.fxDefaults||{},{block:H,concurrent:S,stopFx:H});
return a
},sequenceFx:function(){var a=this;
a.fxDefaults=Ext.apply(a.fxDefaults||{},{block:H,concurrent:H,stopFx:H});
return a
},nextFx:function(){var a=Z(this.dom.id)[0];
if(a){a.call(this)
}},hasActiveFx:function(){return Z(this.dom.id)[0]
},stopFx:function(d){var c=this,a=c.dom.id;
if(c.hasActiveFx()){var b=Z(a)[0];
if(b&&b.anim){if(b.anim.isAnimated){aa(a,[b]);
b.anim.stop(d!==undefined?d:S)
}else{aa(a,[])
}}}return c
},beforeFx:function(a){if(this.hasActiveFx()&&!a.concurrent){if(a.stopFx){this.stopFx();
return S
}return H
}return S
},hasFxBlock:function(){var a=Z(this.dom.id);
return a&&a[0]&&a[0].block
},queueFx:function(a,d){var c=L(this.dom);
if(!c.hasFxBlock()){Ext.applyIf(a,c.fxDefaults);
if(!a.concurrent){var b=c.beforeFx(a);
d.block=a.block;
Z(c.dom.id).push(d);
if(b){c.nextFx()
}}else{d.call(c)
}}return c
},fxWrap:function(a,c,e){var d=this.dom,g,h;
if(!c.wrap||!(g=Ext.getDom(c.wrap))){if(c.fixPosition){h=L(d).getXY()
}var b=document.createElement("div");
b.style.visibility=e;
g=d.parentNode.insertBefore(b,d);
L(g).setPositioning(a);
if(L(g).isStyle(N,"static")){L(g).position("relative")
}L(d).clearPositioning("auto");
L(g).clip();
g.appendChild(d);
if(h){L(g).setXY(h)
}}return g
},fxUnwrap:function(d,a,b){var c=this.dom;
L(c).clearPositioning();
L(c).setPositioning(a);
if(!b.wrap){var e=L(d).dom.parentNode;
e.insertBefore(c,d);
L(d).remove()
}},getFxRestore:function(){var a=this.dom.style;
return{pos:this.getPositioning(),width:a.width,height:a.height}
},afterFx:function(b){var c=this.dom,a=c.id;
if(b.afterStyle){L(c).setStyle(b.afterStyle)
}if(b.afterCls){L(c).addClass(b.afterCls)
}if(b.remove==S){L(c).remove()
}if(b.callback){b.callback.call(b.scope,L(c))
}if(!b.concurrent){Z(a).shift();
L(c).nextFx()
}},fxanim:function(d,c,g,b,e,h){g=g||"run";
c=c||{};
var a=Ext.lib.Anim[g](this.dom,d,(c.duration||b)||0.35,(c.easing||e)||J,h,this);
c.anim=a;
return a
}};
Ext.Fx.resize=Ext.Fx.scale;
Ext.Element.addMethods(Ext.Fx)
})();
Ext.CompositeElementLite=function(c,d){this.elements=[];
this.add(c,d);
this.el=new Ext.Element.Flyweight()
};
Ext.CompositeElementLite.prototype={isComposite:true,getElement:function(d){var c=this.el;
c.dom=d;
c.id=d.id;
return c
},transformElement:function(b){return Ext.getDom(b)
},getCount:function(){return this.elements.length
},add:function(m,h){var l=this,k=l.elements;
if(!m){return this
}if(Ext.isString(m)){m=Ext.Element.selectorFunction(m,h)
}else{if(m.isComposite){m=m.elements
}else{if(!Ext.isIterable(m)){m=[m]
}}}for(var n=0,j=m.length;
n<j;
++n){k.push(l.transformElement(m[n]))
}return l
},invoke:function(m,e){var l=this,n=l.elements,j=n.length,k;
for(i=0;
i<j;
i++){k=n[i];
if(k){Ext.Element.prototype[m].apply(l.getElement(k),e)
}}return l
},item:function(e){var h=this,j=h.elements[e],g=null;
if(j){g=h.getElement(j)
}return g
},addListener:function(e,n,o,p){var q=this.elements,l=q.length,r,m;
for(r=0;
r<l;
r++){m=q[r];
if(m){Ext.EventManager.on(m,e,n,o||m,p)
}}return this
},each:function(n,o){var m=this,p=m.elements,k=p.length,e,l;
for(e=0;
e<k;
e++){l=p[e];
if(l){l=this.getElement(l);
if(n.call(o||l,l,m,e)){break
}}}return m
},fill:function(d){var c=this;
c.elements=[];
c.add(d);
return c
},filter:function(h){var g=[],k=this,j=k.elements,l=Ext.isFunction(h)?h:function(a){return a.is(h)
};
k.each(function(a,c,b){if(l(a,b)!==false){g[g.length]=k.transformElement(a)
}});
k.elements=g;
return k
},indexOf:function(b){return this.elements.indexOf(this.transformElement(b))
},replaceElement:function(k,l,h){var d=!isNaN(k)?k:this.indexOf(k),j;
if(d>-1){l=Ext.getDom(l);
if(h){j=this.elements[d];
j.parentNode.insertBefore(l,j);
Ext.removeNode(j)
}this.elements.splice(d,1,l)
}return this
},clear:function(){this.elements=[]
}};
Ext.CompositeElementLite.prototype.on=Ext.CompositeElementLite.prototype.addListener;
(function(){var g,d=Ext.Element.prototype,e=Ext.CompositeElementLite.prototype;
for(g in d){if(Ext.isFunction(d[g])){(function(a){e[a]=e[a]||function(){return this.invoke(a,arguments)
}
}).call(e,g)
}}})();
if(Ext.DomQuery){Ext.Element.selectorFunction=Ext.DomQuery.select
}Ext.Element.select=function(e,d){var g;
if(typeof e=="string"){g=Ext.Element.selectorFunction(e,d)
}else{if(e.length!==undefined){g=e
}else{throw"Invalid selector"
}}return new Ext.CompositeElementLite(g)
};
Ext.select=Ext.Element.select;
Ext.apply(Ext.CompositeElementLite.prototype,{addElements:function(g,e){if(!g){return this
}if(typeof g=="string"){g=Ext.Element.selectorFunction(g,e)
}var d=this.elements;
Ext.each(g,function(a){d.push(Ext.get(a))
});
return this
},first:function(){return this.item(0)
},last:function(){return this.item(this.getCount()-1)
},contains:function(b){return this.indexOf(b)!=-1
},removeElement:function(k,j){var l=this,h=this.elements,g;
Ext.each(k,function(a){if((g=(h[a]||h[a=l.indexOf(a)]))){if(j){if(g.dom){g.remove()
}else{Ext.removeNode(g)
}}h.splice(a,1)
}});
return this
}});
Ext.CompositeElement=function(c,d){this.elements=[];
this.add(c,d)
};
Ext.extend(Ext.CompositeElement,Ext.CompositeElementLite,{getElement:function(b){return b
},transformElement:function(b){return Ext.get(b)
}});
Ext.Element.select=function(g,h,e){var j;
if(typeof g=="string"){j=Ext.Element.selectorFunction(g,e)
}else{if(g.length!==undefined){j=g
}else{throw"Invalid selector"
}}return(h===true)?new Ext.CompositeElement(j):new Ext.CompositeElementLite(j)
};
Ext.select=Ext.Element.select;
(function(){var k="beforerequest",p="requestcomplete",q="requestexception",n=undefined,r="load",m="POST",l="GET",o=window;
Ext.data.Connection=function(a){Ext.apply(this,a);
this.addEvents(k,p,q);
Ext.data.Connection.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Connection,Ext.util.Observable,{timeout:30000,autoAbort:false,disableCaching:true,disableCachingParam:"_dc",request:function(b){var j=this;
if(j.fireEvent(k,j,b)){if(b.el){if(!Ext.isEmpty(b.indicatorText)){j.indicatorText='<div class="loading-indicator">'+b.indicatorText+"</div>"
}if(j.indicatorText){Ext.getDom(b.el).innerHTML=j.indicatorText
}b.success=(Ext.isFunction(b.success)?b.success:function(){}).createInterceptor(function(s){Ext.getDom(b.el).innerHTML=s.responseText
})
}var d=b.params,e=b.url||j.url,g,a={success:j.handleResponse,failure:j.handleFailure,scope:j,argument:{options:b},timeout:b.timeout||j.timeout},c,h;
if(Ext.isFunction(d)){d=d.call(b.scope||o,b)
}d=Ext.urlEncode(j.extraParams,Ext.isObject(d)?Ext.urlEncode(d):d);
if(Ext.isFunction(e)){e=e.call(b.scope||o,b)
}if((c=Ext.getDom(b.form))){e=e||c.action;
if(b.isUpload||/multipart\/form-data/i.test(c.getAttribute("enctype"))){return j.doFormUpload.call(j,b,d,e)
}h=Ext.lib.Ajax.serializeForm(c);
d=d?(d+"&"+h):h
}g=b.method||j.method||((d||b.xmlData||b.jsonData)?m:l);
if(g===l&&(j.disableCaching&&b.disableCaching!==false)||b.disableCaching===true){var v=b.disableCachingParam||j.disableCachingParam;
e=Ext.urlAppend(e,v+"="+(new Date().getTime()))
}b.headers=Ext.apply(b.headers||{},j.defaultHeaders||{});
if(b.autoAbort===true||j.autoAbort){j.abort()
}if((g==l||b.xmlData||b.jsonData)&&d){e=Ext.urlAppend(e,d);
d=""
}return(j.transId=Ext.lib.Ajax.request(g,e,a,d,b))
}else{return b.callback?b.callback.apply(b.scope,[b,n,n]):null
}},isLoading:function(a){return a?Ext.lib.Ajax.isCallInProgress(a):!!this.transId
},abort:function(a){if(a||this.isLoading()){Ext.lib.Ajax.abort(a||this.transId)
}},handleResponse:function(b){this.transId=false;
var a=b.argument.options;
b.argument=a?a.argument:null;
this.fireEvent(p,this,b,a);
if(a.success){a.success.call(a.scope,b,a)
}if(a.callback){a.callback.call(a.scope,a,true,b)
}},handleFailure:function(c,a){this.transId=false;
var b=c.argument.options;
c.argument=b?b.argument:null;
this.fireEvent(q,this,c,b,a);
if(b.failure){b.failure.call(b.scope,c,b)
}if(b.callback){b.callback.call(b.scope,b,false,c)
}},doFormUpload:function(a,h,g){var e=Ext.id(),j=document,A=j.createElement("iframe"),d=Ext.getDom(a.form),x=[],y,b="multipart/form-data",c={target:d.target,method:d.method,encoding:d.encoding,enctype:d.enctype,action:d.action};
Ext.fly(A).set({id:e,name:e,cls:"x-hidden",src:Ext.SSL_SECURE_URL});
j.body.appendChild(A);
if(Ext.isIE){document.frames[e].name=e
}Ext.fly(d).set({target:e,method:m,enctype:b,encoding:b,action:g||c.action});
Ext.iterate(Ext.urlDecode(h,false),function(s,t){y=j.createElement("input");
Ext.fly(y).set({type:"hidden",value:t,name:s});
d.appendChild(y);
x.push(y)
});
function z(){var C=this,t={responseText:"",responseXML:null,argument:a.argument},w,s;
try{w=A.contentWindow.document||A.contentDocument||o.frames[e].document;
if(w){if(w.body){if(/textarea/i.test((s=w.body.firstChild||{}).tagName)){t.responseText=s.value
}else{t.responseText=w.body.innerHTML
}}t.responseXML=w.XMLDocument||w
}}catch(v){}Ext.EventManager.removeListener(A,r,z,C);
C.fireEvent(p,C,t,a);
function u(B,F,G){if(Ext.isFunction(B)){B.apply(F,G)
}}u(a.success,a.scope,[t,a]);
u(a.callback,a.scope,[a,true,t]);
if(!C.debugUploads){setTimeout(function(){Ext.removeNode(A)
},100)
}}Ext.EventManager.on(A,r,z,this);
d.submit();
Ext.fly(d).set(c);
Ext.each(x,function(s){Ext.removeNode(s)
})
}})
})();
Ext.Ajax=new Ext.data.Connection({autoAbort:false,serializeForm:function(b){return Ext.lib.Ajax.serializeForm(b)
}});
Ext.UpdateManager=Ext.Updater=Ext.extend(Ext.util.Observable,function(){var h="beforeupdate",m="update",n="failure";
function j(c){var b=this;
b.transaction=null;
if(c.argument.form&&c.argument.reset){try{c.argument.form.reset()
}catch(a){}}if(b.loadScripts){b.renderer.render(b.el,c,b,k.createDelegate(b,[c]))
}else{b.renderer.render(b.el,c,b);
k.call(b,c)
}}function k(c,b,a){this.fireEvent(b||m,this.el,c);
if(Ext.isFunction(c.argument.callback)){c.argument.callback.call(c.argument.scope,this.el,Ext.isEmpty(a)?true:false,c,c.argument.options)
}}function l(a){k.call(this,a,n,!!(this.transaction=null))
}return{constructor:function(b,c){var a=this;
b=Ext.get(b);
if(!c&&b.updateManager){return b.updateManager
}a.el=b;
a.defaultUrl=null;
a.addEvents(h,m,n);
Ext.apply(a,Ext.Updater.defaults);
a.transaction=null;
a.refreshDelegate=a.refresh.createDelegate(a);
a.updateDelegate=a.update.createDelegate(a);
a.formUpdateDelegate=(a.formUpdate||function(){}).createDelegate(a);
a.renderer=a.renderer||a.getDefaultRenderer();
Ext.Updater.superclass.constructor.call(a)
},setRenderer:function(a){this.renderer=a
},getRenderer:function(){return this.renderer
},getDefaultRenderer:function(){return new Ext.Updater.BasicRenderer()
},setDefaultUrl:function(a){this.defaultUrl=a
},getEl:function(){return this.el
},update:function(d,o,g,a){var b=this,e,c;
if(b.fireEvent(h,b.el,d,o)!==false){if(Ext.isObject(d)){e=d;
d=e.url;
o=o||e.params;
g=g||e.callback;
a=a||e.discardUrl;
c=e.scope;
if(!Ext.isEmpty(e.nocache)){b.disableCaching=e.nocache
}if(!Ext.isEmpty(e.text)){b.indicatorText='<div class="loading-indicator">'+e.text+"</div>"
}if(!Ext.isEmpty(e.scripts)){b.loadScripts=e.scripts
}if(!Ext.isEmpty(e.timeout)){b.timeout=e.timeout
}}b.showLoading();
if(!a){b.defaultUrl=d
}if(Ext.isFunction(d)){d=d.call(b)
}var r=Ext.apply({},{url:d,params:(Ext.isFunction(o)&&c)?o.createDelegate(c):o,success:j,failure:l,scope:b,callback:undefined,timeout:(b.timeout*1000),disableCaching:b.disableCaching,argument:{options:e,url:d,form:null,callback:g,scope:c||window,params:o}},e);
b.transaction=Ext.Ajax.request(r)
}},formUpdate:function(b,e,c,a){var d=this;
if(d.fireEvent(h,d.el,b,e)!==false){if(Ext.isFunction(e)){e=e.call(d)
}b=Ext.getDom(b);
d.transaction=Ext.Ajax.request({form:b,url:e,success:j,failure:l,scope:d,timeout:(d.timeout*1000),argument:{url:e,form:b,callback:a,reset:c}});
d.showLoading.defer(1,d)
}},startAutoRefresh:function(d,c,a,g,e){var b=this;
if(e){b.update(c||b.defaultUrl,a,g,true)
}if(b.autoRefreshProcId){clearInterval(b.autoRefreshProcId)
}b.autoRefreshProcId=setInterval(b.update.createDelegate(b,[c||b.defaultUrl,a,g,true]),d*1000)
},stopAutoRefresh:function(){if(this.autoRefreshProcId){clearInterval(this.autoRefreshProcId);
delete this.autoRefreshProcId
}},isAutoRefreshing:function(){return !!this.autoRefreshProcId
},showLoading:function(){if(this.showLoadIndicator){this.el.dom.innerHTML=this.indicatorText
}},abort:function(){if(this.transaction){Ext.Ajax.abort(this.transaction)
}},isUpdating:function(){return this.transaction?Ext.Ajax.isLoading(this.transaction):false
},refresh:function(a){if(this.defaultUrl){this.update(this.defaultUrl,null,a,true)
}}}
}());
Ext.Updater.defaults={timeout:30,disableCaching:false,showLoadIndicator:true,indicatorText:'<div class="loading-indicator">Loading...</div>',loadScripts:false,sslBlankUrl:Ext.SSL_SECURE_URL};
Ext.Updater.updateElement=function(k,l,j,g){var h=Ext.get(k).getUpdater();
Ext.apply(h,g);
h.update(l,j,g?g.callback:null)
};
Ext.Updater.BasicRenderer=function(){};
Ext.Updater.BasicRenderer.prototype={render:function(j,g,e,h){j.update(g.responseText,e.loadScripts,h)
}};
(function(){Date.useStrict=false;
function c(a){var b=Array.prototype.slice.call(arguments,1);
return a.replace(/\{(\d+)\}/g,function(j,h){return b[h]
})
}Date.formatCodeToRegex=function(b,g){var a=Date.parseCodes[b];
if(a){a=typeof a=="function"?a():a;
Date.parseCodes[b]=a
}return a?Ext.applyIf({c:a.c?c(a.c,g||"{0}"):a.c},a):{g:0,c:null,s:Ext.escapeRe(b)}
};
var d=Date.formatCodeToRegex;
Ext.apply(Date,{parseFunctions:{"M$":function(h,j){var b=new RegExp("\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/");
var a=(h||"").match(b);
return a?new Date(((a[1]||"")+a[2])*1):null
}},parseRegexes:[],formatFunctions:{"M$":function(){return"\\/Date("+this.getTime()+")\\/"
}},y2kYear:50,MILLI:"ms",SECOND:"s",MINUTE:"mi",HOUR:"h",DAY:"d",MONTH:"mo",YEAR:"y",defaults:{},dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNumbers:{Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11},getShortMonthName:function(a){return Date.monthNames[a].substring(0,3)
},getShortDayName:function(a){return Date.dayNames[a].substring(0,3)
},getMonthNumber:function(a){return Date.monthNumbers[a.substring(0,1).toUpperCase()+a.substring(1,3).toLowerCase()]
},formatCodes:{d:"String.leftPad(this.getDate(), 2, '0')",D:"Date.getShortDayName(this.getDay())",j:"this.getDate()",l:"Date.dayNames[this.getDay()]",N:"(this.getDay() ? this.getDay() : 7)",S:"this.getSuffix()",w:"this.getDay()",z:"this.getDayOfYear()",W:"String.leftPad(this.getWeekOfYear(), 2, '0')",F:"Date.monthNames[this.getMonth()]",m:"String.leftPad(this.getMonth() + 1, 2, '0')",M:"Date.getShortMonthName(this.getMonth())",n:"(this.getMonth() + 1)",t:"this.getDaysInMonth()",L:"(this.isLeapYear() ? 1 : 0)",o:"(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",Y:"this.getFullYear()",y:"('' + this.getFullYear()).substring(2, 4)",a:"(this.getHours() < 12 ? 'am' : 'pm')",A:"(this.getHours() < 12 ? 'AM' : 'PM')",g:"((this.getHours() % 12) ? this.getHours() % 12 : 12)",G:"this.getHours()",h:"String.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",H:"String.leftPad(this.getHours(), 2, '0')",i:"String.leftPad(this.getMinutes(), 2, '0')",s:"String.leftPad(this.getSeconds(), 2, '0')",u:"String.leftPad(this.getMilliseconds(), 3, '0')",O:"this.getGMTOffset()",P:"this.getGMTOffset(true)",T:"this.getTimezone()",Z:"(this.getTimezoneOffset() * -60)",c:function(){for(var a="Y-m-dTH:i:sP",e=[],l=0,m=a.length;
l<m;
++l){var b=a.charAt(l);
e.push(b=="T"?"'T'":Date.getFormatCode(b))
}return e.join(" + ")
},U:"Math.round(this.getTime() / 1000)"},isValid:function(q,s,r,b,m,h,p){b=b||0;
m=m||0;
h=h||0;
p=p||0;
var a=new Date(q,s-1,r,b,m,h,p);
return q==a.getFullYear()&&s==a.getMonth()+1&&r==a.getDate()&&b==a.getHours()&&m==a.getMinutes()&&h==a.getSeconds()&&p==a.getMilliseconds()
},parseDate:function(h,a,j){var b=Date.parseFunctions;
if(b[a]==null){Date.createParser(a)
}return b[a](h,Ext.isDefined(j)?j:Date.useStrict)
},getFormatCode:function(a){var b=Date.formatCodes[a];
if(b){b=typeof b=="function"?b():b;
Date.formatCodes[a]=b
}return b||("'"+String.escape(a)+"'")
},createFormat:function(a){var b=[],l=false,j="";
for(var k=0;
k<a.length;
++k){j=a.charAt(k);
if(!l&&j=="\\"){l=true
}else{if(l){l=false;
b.push("'"+String.escape(j)+"'")
}else{b.push(Date.getFormatCode(j))
}}}Date.formatFunctions[a]=new Function("return "+b.join("+"))
},createParser:function(){var a=["var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,","def = Date.defaults,","results = String(input).match(Date.parseRegexes[{0}]);","if(results){","{1}","if(u != null){","v = new Date(u * 1000);","}else{","dt = (new Date()).clearTime();","y = y >= 0? y : Ext.num(def.y, dt.getFullYear());","m = m >= 0? m : Ext.num(def.m - 1, dt.getMonth());","d = d >= 0? d : Ext.num(def.d, dt.getDate());","h  = h || Ext.num(def.h, dt.getHours());","i  = i || Ext.num(def.i, dt.getMinutes());","s  = s || Ext.num(def.s, dt.getSeconds());","ms = ms || Ext.num(def.ms, dt.getMilliseconds());","if(z >= 0 && y >= 0){","v = new Date(y, 0, 1, h, i, s, ms);","v = !strict? v : (strict === true && (z <= 364 || (v.isLeapYear() && z <= 365))? v.add(Date.DAY, z) : null);","}else if(strict === true && !Date.isValid(y, m + 1, d, h, i, s, ms)){","v = null;","}else{","v = new Date(y, m, d, h, i, s, ms);","}","}","}","if(v){","if(zz != null){","v = v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - zz);","}else if(o){","v = v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));","}","}","return v;"].join("\n");
return function(o){var u=Date.parseRegexes.length,b=1,t=[],p=[],q=false,v="";
for(var r=0;
r<o.length;
++r){v=o.charAt(r);
if(!q&&v=="\\"){q=true
}else{if(q){q=false;
p.push(String.escape(v))
}else{var s=d(v,b);
b+=s.g;
p.push(s.s);
if(s.g&&s.c){t.push(s.c)
}}}}Date.parseRegexes[u]=new RegExp("^"+p.join("")+"$","i");
Date.parseFunctions[o]=new Function("input","strict",c(a,u,t.join("")))
}
}(),parseCodes:{d:{g:1,c:"d = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},j:{g:1,c:"d = parseInt(results[{0}], 10);\n",s:"(\\d{1,2})"},D:function(){for(var b=[],a=0;
a<7;
b.push(Date.getShortDayName(a)),++a){}return{g:0,c:null,s:"(?:"+b.join("|")+")"}
},l:function(){return{g:0,c:null,s:"(?:"+Date.dayNames.join("|")+")"}
},N:{g:0,c:null,s:"[1-7]"},S:{g:0,c:null,s:"(?:st|nd|rd|th)"},w:{g:0,c:null,s:"[0-6]"},z:{g:1,c:"z = parseInt(results[{0}], 10);\n",s:"(\\d{1,3})"},W:{g:0,c:null,s:"(?:\\d{2})"},F:function(){return{g:1,c:"m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n",s:"("+Date.monthNames.join("|")+")"}
},M:function(){for(var b=[],a=0;
a<12;
b.push(Date.getShortMonthName(a)),++a){}return Ext.applyIf({s:"("+b.join("|")+")"},d("F"))
},m:{g:1,c:"m = parseInt(results[{0}], 10) - 1;\n",s:"(\\d{2})"},n:{g:1,c:"m = parseInt(results[{0}], 10) - 1;\n",s:"(\\d{1,2})"},t:{g:0,c:null,s:"(?:\\d{2})"},L:{g:0,c:null,s:"(?:1|0)"},o:function(){return d("Y")
},Y:{g:1,c:"y = parseInt(results[{0}], 10);\n",s:"(\\d{4})"},y:{g:1,c:"var ty = parseInt(results[{0}], 10);\ny = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",s:"(\\d{1,2})"},a:{g:1,c:"if (results[{0}] == 'am') {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",s:"(am|pm)"},A:{g:1,c:"if (results[{0}] == 'AM') {\nif (!h || h == 12) { h = 0; }\n} else { if (!h || h < 12) { h = (h || 0) + 12; }}",s:"(AM|PM)"},g:function(){return d("G")
},G:{g:1,c:"h = parseInt(results[{0}], 10);\n",s:"(\\d{1,2})"},h:function(){return d("H")
},H:{g:1,c:"h = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},i:{g:1,c:"i = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},s:{g:1,c:"s = parseInt(results[{0}], 10);\n",s:"(\\d{2})"},u:{g:1,c:"ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",s:"(\\d+)"},O:{g:1,c:["o = results[{0}];","var sn = o.substring(0,1),","hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),","mn = o.substring(3,5) % 60;","o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),s:"([+-]\\d{4})"},P:{g:1,c:["o = results[{0}];","var sn = o.substring(0,1),","hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),","mn = o.substring(4,6) % 60;","o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + String.leftPad(hr, 2, '0') + String.leftPad(mn, 2, '0')) : null;\n"].join("\n"),s:"([+-]\\d{2}:\\d{2})"},T:{g:0,c:null,s:"[A-Z]{1,4}"},Z:{g:1,c:"zz = results[{0}] * 1;\nzz = (-43200 <= zz && zz <= 50400)? zz : null;\n",s:"([+-]?\\d{1,5})"},c:function(){var b=[],j=[d("Y",1),d("m",2),d("d",3),d("h",4),d("i",5),d("s",6),{c:"ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"},{c:["if(results[8]) {","if(results[8] == 'Z'){","zz = 0;","}else if (results[8].indexOf(':') > -1){",d("P",8).c,"}else{",d("O",8).c,"}","}"].join("\n")}];
for(var a=0,h=j.length;
a<h;
++a){b.push(j[a].c)
}return{g:1,c:b.join(""),s:[j[0].s,"(?:","-",j[1].s,"(?:","-",j[2].s,"(?:","(?:T| )?",j[3].s,":",j[4].s,"(?::",j[5].s,")?","(?:(?:\\.|,)(\\d+))?","(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?",")?",")?",")?"].join("")}
},U:{g:1,c:"u = parseInt(results[{0}], 10);\n",s:"(-?\\d+)"}}})
}());
Ext.apply(Date.prototype,{dateFormat:function(b){if(Date.formatFunctions[b]==null){Date.createFormat(b)
}return Date.formatFunctions[b].call(this)
},getTimezone:function(){return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/,"$1$2").replace(/[^A-Z]/g,"")
},getGMTOffset:function(b){return(this.getTimezoneOffset()>0?"-":"+")+String.leftPad(Math.floor(Math.abs(this.getTimezoneOffset())/60),2,"0")+(b?":":"")+String.leftPad(Math.abs(this.getTimezoneOffset()%60),2,"0")
},getDayOfYear:function(){var d=0,h=this.clone(),g=this.getMonth(),j;
for(j=0,h.setDate(1),h.setMonth(0);
j<g;
h.setMonth(++j)){d+=h.getDaysInMonth()
}return d+this.getDate()-1
},getWeekOfYear:function(){var d=86400000,c=7*d;
return function(){var b=Date.UTC(this.getFullYear(),this.getMonth(),this.getDate()+3)/d,g=Math.floor(b/7),a=new Date(g*c).getUTCFullYear();
return g-Math.floor(Date.UTC(a,0,7)/c)+1
}
}(),isLeapYear:function(){var b=this.getFullYear();
return !!((b&3)==0&&(b%100||(b%400==0&&b)))
},getFirstDayOfMonth:function(){var b=(this.getDay()-(this.getDate()-1))%7;
return(b<0)?(b+7):b
},getLastDayOfMonth:function(){return this.getLastDateOfMonth().getDay()
},getFirstDateOfMonth:function(){return new Date(this.getFullYear(),this.getMonth(),1)
},getLastDateOfMonth:function(){return new Date(this.getFullYear(),this.getMonth(),this.getDaysInMonth())
},getDaysInMonth:function(){var b=[31,28,31,30,31,30,31,31,30,31,30,31];
return function(){var a=this.getMonth();
return a==1&&this.isLeapYear()?29:b[a]
}
}(),getSuffix:function(){switch(this.getDate()){case 1:case 21:case 31:return"st";
case 2:case 22:return"nd";
case 3:case 23:return"rd";
default:return"th"
}},clone:function(){return new Date(this.getTime())
},isDST:function(){return new Date(this.getFullYear(),0,1).getTimezoneOffset()!=this.getTimezoneOffset()
},clearTime:function(h){if(h){return this.clone().clearTime()
}var c=this.getDate();
this.setHours(0);
this.setMinutes(0);
this.setSeconds(0);
this.setMilliseconds(0);
if(this.getDate()!=c){for(var d=1,j=this.add(Date.HOUR,d);
j.getDate()!=c;
d++,j=this.add(Date.HOUR,d)){}this.setDate(c);
this.setHours(j.getHours())
}return this
},add:function(d,j){var h=this.clone();
if(!d||j===0){return h
}switch(d.toLowerCase()){case Date.MILLI:h.setMilliseconds(this.getMilliseconds()+j);
break;
case Date.SECOND:h.setSeconds(this.getSeconds()+j);
break;
case Date.MINUTE:h.setMinutes(this.getMinutes()+j);
break;
case Date.HOUR:h.setHours(this.getHours()+j);
break;
case Date.DAY:h.setDate(this.getDate()+j);
break;
case Date.MONTH:var g=this.getDate();
if(g>28){g=Math.min(g,this.getFirstDateOfMonth().add("mo",j).getLastDateOfMonth().getDate())
}h.setDate(g);
h.setMonth(this.getMonth()+j);
break;
case Date.YEAR:h.setFullYear(this.getFullYear()+j);
break
}return h
},between:function(g,e){var d=this.getTime();
return g.getTime()<=d&&d<=e.getTime()
}});
Date.prototype.format=Date.prototype.dateFormat;
if(Ext.isSafari&&(navigator.userAgent.match(/WebKit\/(\d+)/)[1]||NaN)<420){Ext.apply(Date.prototype,{_xMonth:Date.prototype.setMonth,_xDate:Date.prototype.setDate,setMonth:function(g){if(g<=-1){var h=Math.ceil(-g),j=Math.ceil(h/12),e=(h%12)?12-h%12:0;
this.setFullYear(this.getFullYear()-j);
return this._xMonth(e)
}else{return this._xMonth(g)
}},setDate:function(b){return this.setTime(this.getTime()-(this.getDate()-b)*86400000)
}})
}Ext.util.MixedCollection=function(c,d){this.items=[];
this.map={};
this.keys=[];
this.length=0;
this.addEvents("clear","add","replace","remove","sort");
this.allowFunctions=c===true;
if(d){this.getKey=d
}Ext.util.MixedCollection.superclass.constructor.call(this)
};
Ext.extend(Ext.util.MixedCollection,Ext.util.Observable,{allowFunctions:false,add:function(d,g){if(arguments.length==1){g=arguments[0];
d=this.getKey(g)
}if(typeof d!="undefined"&&d!==null){var e=this.map[d];
if(typeof e!="undefined"){return this.replace(d,g)
}this.map[d]=g
}this.length++;
this.items.push(g);
this.keys.push(d);
this.fireEvent("add",this.length-1,g,d);
return g
},getKey:function(b){return b.id
},replace:function(j,h){if(arguments.length==1){h=arguments[0];
j=this.getKey(h)
}var g=this.map[j];
if(typeof j=="undefined"||j===null||typeof g=="undefined"){return this.add(j,h)
}var e=this.indexOfKey(j);
this.items[e]=h;
this.map[j]=h;
this.fireEvent("replace",j,g,h);
return h
},addAll:function(j){if(arguments.length>1||Ext.isArray(j)){var g=arguments.length>1?arguments:j;
for(var k=0,h=g.length;
k<h;
k++){this.add(g[k])
}}else{for(var l in j){if(this.allowFunctions||typeof j[l]!="function"){this.add(l,j[l])
}}}},each:function(j,k){var g=[].concat(this.items);
for(var l=0,h=g.length;
l<h;
l++){if(j.call(k||g[l],g[l],l,h)===false){break
}}},eachKey:function(h,j){for(var e=0,g=this.keys.length;
e<g;
e++){h.call(j||window,this.keys[e],this.items[e],e,g)
}},find:function(h,j){for(var e=0,g=this.items.length;
e<g;
e++){if(h.call(j||window,this.items[e],this.keys[e])){return this.items[e]
}}return null
},insert:function(e,d,g){if(arguments.length==2){g=arguments[1];
d=this.getKey(g)
}if(this.containsKey(d)){this.suspendEvents();
this.removeKey(d);
this.resumeEvents()
}if(e>=this.length){return this.add(d,g)
}this.length++;
this.items.splice(e,0,g);
if(typeof d!="undefined"&&d!==null){this.map[d]=g
}this.keys.splice(e,0,d);
this.fireEvent("add",e,g,d);
return g
},remove:function(b){return this.removeAt(this.indexOf(b))
},removeAt:function(e){if(e<this.length&&e>=0){this.length--;
var g=this.items[e];
this.items.splice(e,1);
var d=this.keys[e];
if(typeof d!="undefined"){delete this.map[d]
}this.keys.splice(e,1);
this.fireEvent("remove",g,d);
return g
}return false
},removeKey:function(b){return this.removeAt(this.indexOfKey(b))
},getCount:function(){return this.length
},indexOf:function(b){return this.items.indexOf(b)
},indexOfKey:function(b){return this.keys.indexOf(b)
},item:function(d){var e=this.map[d],g=e!==undefined?e:(typeof d=="number")?this.items[d]:undefined;
return !Ext.isFunction(g)||this.allowFunctions?g:null
},itemAt:function(b){return this.items[b]
},key:function(b){return this.map[b]
},contains:function(b){return this.indexOf(b)!=-1
},containsKey:function(b){return typeof this.map[b]!="undefined"
},clear:function(){this.length=0;
this.items=[];
this.keys=[];
this.map={};
this.fireEvent("clear")
},first:function(){return this.items[0]
},last:function(){return this.items[this.length-1]
},_sort:function(c,t,k){var q,p,r=String(t).toUpperCase()=="DESC"?-1:1,n=[],s=this.keys,o=this.items;
k=k||function(a,b){return a-b
};
for(q=0,p=o.length;
q<p;
q++){n[n.length]={key:s[q],value:o[q],index:q}
}n.sort(function(a,d){var b=k(a[c],d[c])*r;
if(b===0){b=(a.index<d.index?-1:1)
}return b
});
for(q=0,p=n.length;
q<p;
q++){o[q]=n[q].value;
s[q]=n[q].key
}this.fireEvent("sort",this)
},sort:function(d,c){this._sort("value",d,c)
},keySort:function(d,c){this._sort("key",d,c||function(h,j){var a=String(h).toUpperCase(),b=String(j).toUpperCase();
return a>b?1:(a<b?-1:0)
})
},getRange:function(j,h){var g=this.items;
if(g.length<1){return[]
}j=j||0;
h=Math.min(typeof h=="undefined"?this.length-1:h,this.length-1);
var l,k=[];
if(j<=h){for(l=j;
l<=h;
l++){k[k.length]=g[l]
}}else{for(l=j;
l>=h;
l--){k[k.length]=g[l]
}}return k
},filter:function(j,e,h,g){if(Ext.isEmpty(e,false)){return this.clone()
}e=this.createValueMatcher(e,h,g);
return this.filterBy(function(a){return a&&e.test(a[j])
})
},filterBy:function(m,n){var l=new Ext.util.MixedCollection();
l.getKey=this.getKey;
var j=this.keys,o=this.items;
for(var p=0,k=o.length;
p<k;
p++){if(m.call(n||this,o[p],j[p])){l.add(j[p],o[p])
}}return l
},findIndex:function(l,g,j,k,h){if(Ext.isEmpty(g,false)){return -1
}g=this.createValueMatcher(g,k,h);
return this.findIndexBy(function(a){return a&&g.test(a[l])
},null,j)
},findIndexBy:function(m,n,l){var j=this.keys,o=this.items;
for(var p=(l||0),k=o.length;
p<k;
p++){if(m.call(n||this,o[p],j[p])){return p
}}return -1
},createValueMatcher:function(l,j,h,g){if(!l.exec){var k=Ext.escapeRe;
l=String(l);
if(j===true){l=k(l)
}else{l="^"+k(l);
if(g===true){l+="$"
}}l=new RegExp(l,h?"":"i")
}return l
},clone:function(){var j=new Ext.util.MixedCollection();
var g=this.keys,k=this.items;
for(var l=0,h=k.length;
l<h;
l++){j.add(g[l],k[l])
}j.getKey=this.getKey;
return j
}});
Ext.util.MixedCollection.prototype.get=Ext.util.MixedCollection.prototype.item;
Ext.util.JSON=new (function(){var useHasOwn=!!{}.hasOwnProperty,isNative=function(){var useNative=null;
return function(){if(useNative===null){useNative=Ext.USE_NATIVE_JSON&&window.JSON&&JSON.toString()=="[object JSON]"
}return useNative
}
}(),pad=function(n){return n<10?"0"+n:n
},doDecode=function(json){return eval("("+json+")")
},doEncode=function(o){if(!Ext.isDefined(o)||o===null){return"null"
}else{if(Ext.isArray(o)){return encodeArray(o)
}else{if(Ext.isDate(o)){return Ext.util.JSON.encodeDate(o)
}else{if(Ext.isString(o)){return encodeString(o)
}else{if(typeof o=="number"){return isFinite(o)?String(o):"null"
}else{if(Ext.isBoolean(o)){return String(o)
}else{var a=["{"],b,i,v;
for(i in o){if(!o.getElementsByTagName){if(!useHasOwn||o.hasOwnProperty(i)){v=o[i];
switch(typeof v){case"undefined":case"function":case"unknown":break;
default:if(b){a.push(",")
}a.push(doEncode(i),":",v===null?"null":doEncode(v));
b=true
}}}}a.push("}");
return a.join("")
}}}}}}},m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},encodeString=function(s){if(/["\\\x00-\x1f]/.test(s)){return'"'+s.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];
if(c){return c
}c=b.charCodeAt();
return"\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16)
})+'"'
}return'"'+s+'"'
},encodeArray=function(o){var a=["["],b,i,l=o.length,v;
for(i=0;
i<l;
i+=1){v=o[i];
switch(typeof v){case"undefined":case"function":case"unknown":break;
default:if(b){a.push(",")
}a.push(v===null?"null":Ext.util.JSON.encode(v));
b=true
}}a.push("]");
return a.join("")
};
this.encodeDate=function(o){return'"'+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+'"'
};
this.encode=function(){var ec;
return function(o){if(!ec){ec=isNative()?JSON.stringify:doEncode
}return ec(o)
}
}();
this.decode=function(){var dc;
return function(json){if(!dc){dc=isNative()?JSON.parse:doDecode
}return dc(json)
}
}()
})();
Ext.encode=Ext.util.JSON.encode;
Ext.decode=Ext.util.JSON.decode;
Ext.util.Format=function(){var trimRe=/^\s+|\s+$/g,stripTagsRE=/<\/?[^>]+>/gi,stripScriptsRe=/(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)/ig,nl2brRe=/\r?\n/g;
return{ellipsis:function(value,len,word){if(value&&value.length>len){if(word){var vs=value.substr(0,len-2),index=Math.max(vs.lastIndexOf(" "),vs.lastIndexOf("."),vs.lastIndexOf("!"),vs.lastIndexOf("?"));
if(index==-1||index<(len-15)){return value.substr(0,len-3)+"..."
}else{return vs.substr(0,index)+"..."
}}else{return value.substr(0,len-3)+"..."
}}return value
},undef:function(value){return value!==undefined?value:""
},defaultValue:function(value,defaultValue){return value!==undefined&&value!==""?value:defaultValue
},htmlEncode:function(value){return !value?value:String(value).replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;")
},htmlDecode:function(value){return !value?value:String(value).replace(/&gt;/g,">").replace(/&lt;/g,"<").replace(/&quot;/g,'"').replace(/&amp;/g,"&")
},trim:function(value){return String(value).replace(trimRe,"")
},substr:function(value,start,length){return String(value).substr(start,length)
},lowercase:function(value){return String(value).toLowerCase()
},uppercase:function(value){return String(value).toUpperCase()
},capitalize:function(value){return !value?value:value.charAt(0).toUpperCase()+value.substr(1).toLowerCase()
},call:function(value,fn){if(arguments.length>2){var args=Array.prototype.slice.call(arguments,2);
args.unshift(value);
return eval(fn).apply(window,args)
}else{return eval(fn).call(window,value)
}},usMoney:function(v){v=(Math.round((v-0)*100))/100;
v=(v==Math.floor(v))?v+".00":((v*10==Math.floor(v*10))?v+"0":v);
v=String(v);
var ps=v.split("."),whole=ps[0],sub=ps[1]?"."+ps[1]:".00",r=/(\d+)(\d{3})/;
while(r.test(whole)){whole=whole.replace(r,"$1,$2")
}v=whole+sub;
if(v.charAt(0)=="-"){return"-$"+v.substr(1)
}return"$"+v
},date:function(v,format){if(!v){return""
}if(!Ext.isDate(v)){v=new Date(Date.parse(v))
}return v.dateFormat(format||"m/d/Y")
},dateRenderer:function(format){return function(v){return Ext.util.Format.date(v,format)
}
},stripTags:function(v){return !v?v:String(v).replace(stripTagsRE,"")
},stripScripts:function(v){return !v?v:String(v).replace(stripScriptsRe,"")
},fileSize:function(size){if(size<1024){return size+" bytes"
}else{if(size<1048576){return(Math.round(((size*10)/1024))/10)+" KB"
}else{return(Math.round(((size*10)/1048576))/10)+" MB"
}}},math:function(){var fns={};
return function(v,a){if(!fns[a]){fns[a]=new Function("v","return v "+a+";")
}return fns[a](v)
}
}(),round:function(value,precision){var result=Number(value);
if(typeof precision=="number"){precision=Math.pow(10,precision);
result=Math.round(value*precision)/precision
}return result
},number:function(v,format){if(!format){return v
}v=Ext.num(v,NaN);
if(isNaN(v)){return""
}var comma=",",dec=".",i18n=false,neg=v<0;
v=Math.abs(v);
if(format.substr(format.length-2)=="/i"){format=format.substr(0,format.length-2);
i18n=true;
comma=".";
dec=","
}var hasComma=format.indexOf(comma)!=-1,psplit=(i18n?format.replace(/[^\d\,]/g,""):format.replace(/[^\d\.]/g,"")).split(dec);
if(1<psplit.length){v=v.toFixed(psplit[1].length)
}else{if(2<psplit.length){throw ("NumberFormatException: invalid format, formats should have no more than 1 period: "+format)
}else{v=v.toFixed(0)
}}var fnum=v.toString();
if(hasComma){psplit=fnum.split(".");
var cnum=psplit[0],parr=[],j=cnum.length,m=Math.floor(j/3),n=cnum.length%3||3;
for(var i=0;
i<j;
i+=n){if(i!=0){n=3
}parr[parr.length]=cnum.substr(i,n);
m-=1
}fnum=parr.join(comma);
if(psplit[1]){fnum+=dec+psplit[1]
}}return(neg?"-":"")+format.replace(/[\d,?\.?]+/,fnum)
},numberRenderer:function(format){return function(v){return Ext.util.Format.number(v,format)
}
},plural:function(v,s,p){return v+" "+(v==1?s:(p?p:s+"s"))
},nl2br:function(v){return Ext.isEmpty(v)?"":v.replace(nl2brRe,"<br/>")
}}
}();
Ext.XTemplate=function(){Ext.XTemplate.superclass.constructor.apply(this,arguments);
var A=this,M=A.html,G=/<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/,Q=/^<tpl\b[^>]*?for="(.*?)"/,D=/^<tpl\b[^>]*?if="(.*?)"/,B=/^<tpl\b[^>]*?exec="(.*?)"/,F,H=0,L=[],I="values",C="parent",K="xindex",J="xcount",P="return ",R="with(values){ ";
M=["<tpl>",M,"</tpl>"].join("");
while((F=M.match(G))){var S=F[0].match(Q),T=F[0].match(D),m=F[0].match(B),O=null,N=null,E=null,s=S&&S[1]?S[1]:"";
if(T){O=T&&T[1]?T[1]:null;
if(O){N=new Function(I,C,K,J,R+P+(Ext.util.Format.htmlDecode(O))+"; }")
}}if(m){O=m&&m[1]?m[1]:null;
if(O){E=new Function(I,C,K,J,R+(Ext.util.Format.htmlDecode(O))+"; }")
}}if(s){switch(s){case".":s=new Function(I,C,R+P+I+"; }");
break;
case"..":s=new Function(I,C,R+P+C+"; }");
break;
default:s=new Function(I,C,R+P+s+"; }")
}}L.push({id:H,target:s,exec:E,test:N,body:F[1]||""});
M=M.replace(F[0],"{xtpl"+H+"}");
++H
}Ext.each(L,function(a){A.compileTpl(a)
});
A.master=L[L.length-1];
A.tpls=L
};
Ext.extend(Ext.XTemplate,Ext.Template,{re:/\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\\]\s?[\d\.\+\-\*\\\(\)]+)?\}/g,codeRe:/\{\[((?:\\\]|.|\n)*?)\]\}/g,applySubTemplate:function(v,o,p,s,t){var q=this,r,m=q.tpls[v],n,u=[];
if((m.test&&!m.test.call(q,o,p,s,t))||(m.exec&&m.exec.call(q,o,p,s,t))){return""
}n=m.target?m.target.call(q,o,p):o;
r=n.length;
p=m.target?o:p;
if(m.target&&Ext.isArray(n)){Ext.each(n,function(a,b){u[u.length]=m.compiled.call(q,a,p,b+1,r)
});
return u.join("")
}return m.compiled.call(q,n,p,s,t)
},compileTpl:function(tpl){var fm=Ext.util.Format,useF=this.disableFormats!==true,sep=Ext.isGecko?"+":",",body;
function fn(m,name,format,args,math){if(name.substr(0,4)=="xtpl"){return"'"+sep+"this.applySubTemplate("+name.substr(4)+", values, parent, xindex, xcount)"+sep+"'"
}var v;
if(name==="."){v="values"
}else{if(name==="#"){v="xindex"
}else{if(name.indexOf(".")!=-1){v=name
}else{v="values['"+name+"']"
}}}if(math){v="("+v+math+")"
}if(format&&useF){args=args?","+args:"";
if(format.substr(0,5)!="this."){format="fm."+format+"("
}else{format='this.call("'+format.substr(5)+'", ';
args=", values"
}}else{args="";
format="("+v+" === undefined ? '' : "
}return"'"+sep+format+v+args+")"+sep+"'"
}function codeFn(m,code){return"'"+sep+"("+code.replace(/\\'/g,"'")+")"+sep+"'"
}if(Ext.isGecko){body="tpl.compiled = function(values, parent, xindex, xcount){ return '"+tpl.body.replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn).replace(this.codeRe,codeFn)+"';};"
}else{body=["tpl.compiled = function(values, parent, xindex, xcount){ return ['"];
body.push(tpl.body.replace(/(\r\n|\n)/g,"\\n").replace(/'/g,"\\'").replace(this.re,fn).replace(this.codeRe,codeFn));
body.push("'].join('');};");
body=body.join("")
}eval(body);
return this
},applyTemplate:function(b){return this.master.compiled.call(this,b,{},1,1)
},compile:function(){return this
}});
Ext.XTemplate.prototype.apply=Ext.XTemplate.prototype.applyTemplate;
Ext.XTemplate.from=function(b){b=Ext.getDom(b);
return new Ext.XTemplate(b.value||b.innerHTML)
};
Ext.util.CSS=function(){var h=null;
var j=document;
var e=/(-[a-z])/gi;
var g=function(b,a){return a.charAt(1).toUpperCase()
};
return{createStyleSheet:function(d,a){var n;
var o=j.getElementsByTagName("head")[0];
var b=j.createElement("style");
b.setAttribute("type","text/css");
if(a){b.setAttribute("id",a)
}if(Ext.isIE){o.appendChild(b);
n=b.styleSheet;
n.cssText=d
}else{try{b.appendChild(j.createTextNode(d))
}catch(c){b.cssText=d
}o.appendChild(b);
n=b.styleSheet?b.styleSheet:(b.sheet||j.styleSheets[j.styleSheets.length-1])
}this.cacheStyleSheet(n);
return n
},removeStyleSheet:function(a){var b=j.getElementById(a);
if(b){b.parentNode.removeChild(b)
}},swapStyleSheet:function(a,c){this.removeStyleSheet(a);
var b=j.createElement("link");
b.setAttribute("rel","stylesheet");
b.setAttribute("type","text/css");
b.setAttribute("id",a);
b.setAttribute("href",c);
j.getElementsByTagName("head")[0].appendChild(b)
},refreshCache:function(){return this.getRules(true)
},cacheStyleSheet:function(c){if(!h){h={}
}try{var a=c.cssRules||c.rules;
for(var d=a.length-1;
d>=0;
--d){h[a[d].selectorText.toLowerCase()]=a[d]
}}catch(b){}},getRules:function(d){if(h===null||d){h={};
var b=j.styleSheets;
for(var c=0,m=b.length;
c<m;
c++){try{this.cacheStyleSheet(b[c])
}catch(a){}}}return h
},getRule:function(d,b){var c=this.getRules(b);
if(!Ext.isArray(d)){return c[d.toLowerCase()]
}for(var a=0;
a<d.length;
a++){if(c[d[a]]){return c[d[a].toLowerCase()]
}}return null
},updateRule:function(l,b,c){if(!Ext.isArray(l)){var a=this.getRule(l);
if(a){a.style[b.replace(e,g)]=c;
return true
}}else{for(var d=0;
d<l.length;
d++){if(this.updateRule(l[d],b,c)){return true
}}}return false
}}
}();
Ext.util.ClickRepeater=function(c,d){this.el=Ext.get(c);
this.el.unselectable();
Ext.apply(this,d);
this.addEvents("mousedown","click","mouseup");
if(!this.disabled){this.disabled=true;
this.enable()
}if(this.handler){this.on("click",this.handler,this.scope||this)
}Ext.util.ClickRepeater.superclass.constructor.call(this)
};
Ext.extend(Ext.util.ClickRepeater,Ext.util.Observable,{interval:20,delay:250,preventDefault:true,stopDefault:false,timer:0,enable:function(){if(this.disabled){this.el.on("mousedown",this.handleMouseDown,this);
if(this.preventDefault||this.stopDefault){this.el.on("click",this.eventOptions,this)
}}this.disabled=false
},disable:function(b){if(b||!this.disabled){clearTimeout(this.timer);
if(this.pressClass){this.el.removeClass(this.pressClass)
}Ext.getDoc().un("mouseup",this.handleMouseUp,this);
this.el.removeAllListeners()
}this.disabled=true
},setDisabled:function(b){this[b?"disable":"enable"]()
},eventOptions:function(b){if(this.preventDefault){b.preventDefault()
}if(this.stopDefault){b.stopEvent()
}},destroy:function(){this.disable(true);
Ext.destroy(this.el);
this.purgeListeners()
},handleMouseDown:function(){clearTimeout(this.timer);
this.el.blur();
if(this.pressClass){this.el.addClass(this.pressClass)
}this.mousedownTime=new Date();
Ext.getDoc().on("mouseup",this.handleMouseUp,this);
this.el.on("mouseout",this.handleMouseOut,this);
this.fireEvent("mousedown",this);
this.fireEvent("click",this);
if(this.accelerate){this.delay=400
}this.timer=this.click.defer(this.delay||this.interval,this)
},click:function(){this.fireEvent("click",this);
this.timer=this.click.defer(this.accelerate?this.easeOutExpo(this.mousedownTime.getElapsed(),400,-390,12000):this.interval,this)
},easeOutExpo:function(j,b,c,d){return(j==d)?b+c:c*(-Math.pow(2,-10*j/d)+1)+b
},handleMouseOut:function(){clearTimeout(this.timer);
if(this.pressClass){this.el.removeClass(this.pressClass)
}this.el.on("mouseover",this.handleMouseReturn,this)
},handleMouseReturn:function(){this.el.un("mouseover",this.handleMouseReturn,this);
if(this.pressClass){this.el.addClass(this.pressClass)
}this.click()
},handleMouseUp:function(){clearTimeout(this.timer);
this.el.un("mouseover",this.handleMouseReturn,this);
this.el.un("mouseout",this.handleMouseOut,this);
Ext.getDoc().un("mouseup",this.handleMouseUp,this);
this.el.removeClass(this.pressClass);
this.fireEvent("mouseup",this)
}});
Ext.KeyNav=function(c,d){this.el=Ext.get(c);
Ext.apply(this,d);
if(!this.disabled){this.disabled=true;
this.enable()
}};
Ext.KeyNav.prototype={disabled:false,defaultEventAction:"stopEvent",forceKeyDown:false,relay:function(g){var e=g.getKey();
var d=this.keyToHandler[e];
if(d&&this[d]){if(this.doRelay(g,this[d],d)!==true){g[this.defaultEventAction]()
}}},doRelay:function(g,d,e){return d.call(this.scope||this,g)
},enter:false,left:false,right:false,up:false,down:false,tab:false,esc:false,pageUp:false,pageDown:false,del:false,home:false,end:false,keyToHandler:{37:"left",39:"right",38:"up",40:"down",33:"pageUp",34:"pageDown",46:"del",36:"home",35:"end",13:"enter",27:"esc",9:"tab"},stopKeyUp:function(c){var d=c.getKey();
if(d>=37&&d<=40){c.stopEvent()
}},destroy:function(){this.disable()
},enable:function(){if(this.disabled){if(Ext.isSafari2){this.el.on("keyup",this.stopKeyUp,this)
}this.el.on(this.isKeydown()?"keydown":"keypress",this.relay,this);
this.disabled=false
}},disable:function(){if(!this.disabled){if(Ext.isSafari2){this.el.un("keyup",this.stopKeyUp,this)
}this.el.un(this.isKeydown()?"keydown":"keypress",this.relay,this);
this.disabled=true
}},setDisabled:function(b){this[b?"disable":"enable"]()
},isKeydown:function(){return this.forceKeyDown||Ext.EventManager.useKeydown
}};
Ext.KeyMap=function(g,d,e){this.el=Ext.get(g);
this.eventName=e||"keydown";
this.bindings=[];
if(d){this.addBinding(d)
}this.enable()
};
Ext.KeyMap.prototype={stopEvent:false,addBinding:function(u){if(Ext.isArray(u)){Ext.each(u,function(a){this.addBinding(a)
},this);
return
}var n=u.key,q=u.fn||u.handler,j=u.scope;
if(u.stopEvent){this.stopEvent=u.stopEvent
}if(typeof n=="string"){var p=[];
var r=n.toUpperCase();
for(var t=0,s=r.length;
t<s;
t++){p.push(r.charCodeAt(t))
}n=p
}var v=Ext.isArray(n);
var o=function(b){if(this.checkModifiers(u,b)){var d=b.getKey();
if(v){for(var c=0,a=n.length;
c<a;
c++){if(n[c]==d){if(this.stopEvent){b.stopEvent()
}q.call(j||window,d,b);
return
}}}else{if(d==n){if(this.stopEvent){b.stopEvent()
}q.call(j||window,d,b)
}}}};
this.bindings.push(o)
},checkModifiers:function(e,m){var l,o,n=["shift","ctrl","alt"];
for(var p=0,k=n.length;
p<k;
++p){o=n[p];
l=e[o];
if(!(l===undefined||(l===m[o+"Key"]))){return false
}}return true
},on:function(j,o,p){var l,k,n,m;
if(typeof j=="object"&&!Ext.isArray(j)){l=j.key;
k=j.shift;
n=j.ctrl;
m=j.alt
}else{l=j
}this.addBinding({key:l,shift:k,ctrl:n,alt:m,fn:o,scope:p})
},handleKeyDown:function(e){if(this.enabled){var j=this.bindings;
for(var h=0,b=j.length;
h<b;
h++){j[h].call(this,e)
}}},isEnabled:function(){return this.enabled
},enable:function(){if(!this.enabled){this.el.on(this.eventName,this.handleKeyDown,this);
this.enabled=true
}},disable:function(){if(this.enabled){this.el.removeListener(this.eventName,this.handleKeyDown,this);
this.enabled=false
}},setDisabled:function(b){this[b?"disable":"enable"]()
}};
Ext.util.TextMetrics=function(){var b;
return{measure:function(a,g,e){if(!b){b=Ext.util.TextMetrics.Instance(a,e)
}b.bind(a);
b.setFixedWidth(e||"auto");
return b.getSize(g)
},createInstance:function(a,d){return Ext.util.TextMetrics.Instance(a,d)
}}
}();
Ext.util.TextMetrics.Instance=function(e,h){var j=new Ext.Element(document.createElement("div"));
document.body.appendChild(j.dom);
j.position("absolute");
j.setLeftTop(-1000,-1000);
j.hide();
if(h){j.setWidth(h)
}var g={getSize:function(a){j.update(a);
var b=j.getSize();
j.update("");
return b
},bind:function(a){j.setStyle(Ext.fly(a).getStyles("font-size","font-style","font-weight","font-family","line-height","text-transform","letter-spacing"))
},setFixedWidth:function(a){j.setWidth(a)
},getWidth:function(a){j.dom.style.width="auto";
return this.getSize(a).width
},getHeight:function(a){return this.getSize(a).height
}};
g.bind(e);
return g
};
Ext.Element.addMethods({getTextWidth:function(g,d,e){return(Ext.util.TextMetrics.measure(this.dom,Ext.value(g,this.dom.innerHTML,true)).width).constrain(d||0,e||1000000)
}});
Ext.util.Cookies={set:function(r,p){var l=arguments;
var m=arguments.length;
var k=(m>2)?l[2]:null;
var n=(m>3)?l[3]:"/";
var q=(m>4)?l[4]:null;
var o=(m>5)?l[5]:false;
document.cookie=r+"="+escape(p)+((k===null)?"":("; expires="+k.toGMTString()))+((n===null)?"":("; path="+n))+((q===null)?"":("; domain="+q))+((o===true)?"; secure":"")
},get:function(m){var h=m+"=";
var k=h.length;
var j=document.cookie.length;
var l=0;
var n=0;
while(l<j){n=l+k;
if(document.cookie.substring(l,n)==h){return Ext.util.Cookies.getCookieVal(n)
}l=document.cookie.indexOf(" ",l)+1;
if(l===0){break
}}return null
},clear:function(b){if(Ext.util.Cookies.get(b)){document.cookie=b+"=; expires=Thu, 01-Jan-70 00:00:01 GMT"
}},getCookieVal:function(c){var d=document.cookie.indexOf(";",c);
if(d==-1){d=document.cookie.length
}return unescape(document.cookie.substring(c,d))
}};
Ext.handleError=function(b){throw b
};
Ext.Error=function(b){this.message=(this.lang[b])?this.lang[b]:b
};
Ext.Error.prototype=new Error();
Ext.apply(Ext.Error.prototype,{lang:{},name:"Ext.Error",getName:function(){return this.name
},getMessage:function(){return this.message
},toJson:function(){return Ext.encode(this)
}});
Ext.ComponentMgr=function(){var g=new Ext.util.MixedCollection();
var d={};
var e={};
return{register:function(a){g.add(a)
},unregister:function(a){g.remove(a)
},get:function(a){return g.get(a)
},onAvailable:function(a,b,c){g.on("add",function(l,k){if(k.id==a){b.call(c||k,k);
g.un("add",b,c)
}})
},all:g,isRegistered:function(a){return d[a]!==undefined
},registerType:function(a,b){d[a]=b;
b.xtype=a
},create:function(b,a){return b.render?b:new d[b.xtype||a](b)
},registerPlugin:function(a,b){e[a]=b;
b.ptype=a
},createPlugin:function(b,a){var c=e[b.ptype||a];
if(c.init){return c
}else{return new c(b)
}}}
}();
Ext.reg=Ext.ComponentMgr.registerType;
Ext.preg=Ext.ComponentMgr.registerPlugin;
Ext.create=Ext.ComponentMgr.create;
Ext.Component=function(d){d=d||{};
if(d.initialConfig){if(d.isAction){this.baseAction=d
}d=d.initialConfig
}else{if(d.tagName||d.dom||Ext.isString(d)){d={applyTo:d,id:d.id||d}
}}this.initialConfig=d;
Ext.apply(this,d);
this.addEvents("added","disable","enable","beforeshow","show","beforehide","hide","removed","beforerender","render","afterrender","beforedestroy","destroy","beforestaterestore","staterestore","beforestatesave","statesave");
this.getId();
Ext.ComponentMgr.register(this);
Ext.Component.superclass.constructor.call(this);
if(this.baseAction){this.baseAction.addComponent(this)
}this.initComponent();
if(this.plugins){if(Ext.isArray(this.plugins)){for(var g=0,e=this.plugins.length;
g<e;
g++){this.plugins[g]=this.initPlugin(this.plugins[g])
}}else{this.plugins=this.initPlugin(this.plugins)
}}if(this.stateful!==false){this.initState()
}if(this.applyTo){this.applyToMarkup(this.applyTo);
delete this.applyTo
}else{if(this.renderTo){this.render(this.renderTo);
delete this.renderTo
}}};
Ext.Component.AUTO_ID=1000;
Ext.extend(Ext.Component,Ext.util.Observable,{disabled:false,hidden:false,autoEl:"div",disabledClass:"x-item-disabled",allowDomMove:true,autoShow:false,hideMode:"display",hideParent:false,rendered:false,tplWriteMode:"overwrite",ctype:"Ext.Component",actionMode:"el",getActionEl:function(){return this[this.actionMode]
},initPlugin:function(b){if(b.ptype&&!Ext.isFunction(b.init)){b=Ext.ComponentMgr.createPlugin(b)
}else{if(Ext.isString(b)){b=Ext.ComponentMgr.createPlugin({ptype:b})
}}b.init(this);
return b
},initComponent:Ext.emptyFn,render:function(e,g){if(!this.rendered&&this.fireEvent("beforerender",this)!==false){if(!e&&this.el){this.el=Ext.get(this.el);
e=this.el.dom.parentNode;
this.allowDomMove=false
}this.container=Ext.get(e);
if(this.ctCls){this.container.addClass(this.ctCls)
}this.rendered=true;
if(g!==undefined){if(Ext.isNumber(g)){g=this.container.dom.childNodes[g]
}else{g=Ext.getDom(g)
}}this.onRender(this.container,g||null);
if(this.autoShow){this.el.removeClass(["x-hidden","x-hide-"+this.hideMode])
}if(this.cls){this.el.addClass(this.cls);
delete this.cls
}if(this.style){this.el.applyStyles(this.style);
delete this.style
}if(this.overCls){this.el.addClassOnOver(this.overCls)
}this.fireEvent("render",this);
var j=this.getContentTarget();
if(this.html){j.update(Ext.DomHelper.markup(this.html));
delete this.html
}if(this.contentEl){var h=Ext.getDom(this.contentEl);
Ext.fly(h).removeClass(["x-hidden","x-hide-display"]);
j.appendChild(h)
}if(this.tpl){if(!this.tpl.compile){this.tpl=new Ext.XTemplate(this.tpl)
}if(this.data){this.tpl[this.tplWriteMode](j,this.data);
delete this.data
}}this.afterRender(this.container);
if(this.hidden){this.doHide()
}if(this.disabled){this.disable(true)
}if(this.stateful!==false){this.initStateEvents()
}this.fireEvent("afterrender",this)
}return this
},update:function(g,k,h){var l=this.getContentTarget();
if(this.tpl&&typeof g!=="string"){this.tpl[this.tplWriteMode](l,g||{})
}else{var j=Ext.isObject(g)?Ext.DomHelper.markup(g):g;
l.update(j,k,h)
}},onAdded:function(d,c){this.ownerCt=d;
this.initRef();
this.fireEvent("added",this,d,c)
},onRemoved:function(){this.removeRef();
this.fireEvent("removed",this,this.ownerCt);
delete this.ownerCt
},initRef:function(){if(this.ref&&!this.refOwner){var h=this.ref.split("/"),j=h.length,e=0,g=this;
while(g&&e<j){g=g.ownerCt;
++e
}if(g){g[this.refName=h[--e]]=this;
this.refOwner=g
}}},removeRef:function(){if(this.refOwner&&this.refName){delete this.refOwner[this.refName];
delete this.refOwner
}},initState:function(){if(Ext.state.Manager){var c=this.getStateId();
if(c){var d=Ext.state.Manager.get(c);
if(d){if(this.fireEvent("beforestaterestore",this,d)!==false){this.applyState(Ext.apply({},d));
this.fireEvent("staterestore",this,d)
}}}}},getStateId:function(){return this.stateId||((this.id.indexOf("ext-comp-")==0||this.id.indexOf("ext-gen")==0)?null:this.id)
},initStateEvents:function(){if(this.stateEvents){for(var d=0,c;
c=this.stateEvents[d];
d++){this.on(c,this.saveState,this,{delay:100})
}}},applyState:function(b){if(b){Ext.apply(this,b)
}},getState:function(){return null
},saveState:function(){if(Ext.state.Manager&&this.stateful!==false){var c=this.getStateId();
if(c){var d=this.getState();
if(this.fireEvent("beforestatesave",this,d)!==false){Ext.state.Manager.set(c,d);
this.fireEvent("statesave",this,d)
}}}},applyToMarkup:function(b){this.allowDomMove=false;
this.el=Ext.get(b);
this.render(this.el.dom.parentNode)
},addClass:function(b){if(this.el){this.el.addClass(b)
}else{this.cls=this.cls?this.cls+" "+b:b
}return this
},removeClass:function(b){if(this.el){this.el.removeClass(b)
}else{if(this.cls){this.cls=this.cls.split(" ").remove(b).join(" ")
}}return this
},onRender:function(d,e){if(!this.el&&this.autoEl){if(Ext.isString(this.autoEl)){this.el=document.createElement(this.autoEl)
}else{var g=document.createElement("div");
Ext.DomHelper.overwrite(g,this.autoEl);
this.el=g.firstChild
}if(!this.el.id){this.el.id=this.getId()
}}if(this.el){this.el=Ext.get(this.el);
if(this.allowDomMove!==false){d.dom.insertBefore(this.el.dom,e);
if(g){Ext.removeNode(g);
g=null
}}}},getAutoCreate:function(){var b=Ext.isObject(this.autoCreate)?this.autoCreate:Ext.apply({},this.defaultAutoCreate);
if(this.id&&!b.id){b.id=this.id
}return b
},afterRender:Ext.emptyFn,destroy:function(){if(!this.isDestroyed){if(this.fireEvent("beforedestroy",this)!==false){this.destroying=true;
this.beforeDestroy();
if(this.ownerCt&&this.ownerCt.remove){this.ownerCt.remove(this,false)
}if(this.rendered){this.el.remove();
if(this.actionMode=="container"||this.removeMode=="container"){this.container.remove()
}}this.onDestroy();
Ext.ComponentMgr.unregister(this);
this.fireEvent("destroy",this);
this.purgeListeners();
this.destroying=false;
this.isDestroyed=true
}}},deleteMembers:function(){var d=arguments;
for(var g=0,e=d.length;
g<e;
++g){delete this[d[g]]
}},beforeDestroy:Ext.emptyFn,onDestroy:Ext.emptyFn,getEl:function(){return this.el
},getContentTarget:function(){return this.el
},getId:function(){return this.id||(this.id="ext-comp-"+(++Ext.Component.AUTO_ID))
},getItemId:function(){return this.itemId||this.getId()
},focus:function(c,d){if(d){this.focus.defer(Ext.isNumber(d)?d:10,this,[c,false]);
return
}if(this.rendered){this.el.focus();
if(c===true){this.el.dom.select()
}}return this
},blur:function(){if(this.rendered){this.el.blur()
}return this
},disable:function(b){if(this.rendered){this.onDisable()
}this.disabled=true;
if(b!==true){this.fireEvent("disable",this)
}return this
},onDisable:function(){this.getActionEl().addClass(this.disabledClass);
this.el.dom.disabled=true
},enable:function(){if(this.rendered){this.onEnable()
}this.disabled=false;
this.fireEvent("enable",this);
return this
},onEnable:function(){this.getActionEl().removeClass(this.disabledClass);
this.el.dom.disabled=false
},setDisabled:function(b){return this[b?"disable":"enable"]()
},show:function(){if(this.fireEvent("beforeshow",this)!==false){this.hidden=false;
if(this.autoRender){this.render(Ext.isBoolean(this.autoRender)?Ext.getBody():this.autoRender)
}if(this.rendered){this.onShow()
}this.fireEvent("show",this)
}return this
},onShow:function(){this.getVisibilityEl().removeClass("x-hide-"+this.hideMode)
},hide:function(){if(this.fireEvent("beforehide",this)!==false){this.doHide();
this.fireEvent("hide",this)
}return this
},doHide:function(){this.hidden=true;
if(this.rendered){this.onHide()
}},onHide:function(){this.getVisibilityEl().addClass("x-hide-"+this.hideMode)
},getVisibilityEl:function(){return this.hideParent?this.container:this.getActionEl()
},setVisible:function(b){return this[b?"show":"hide"]()
},isVisible:function(){return this.rendered&&this.getVisibilityEl().isVisible()
},cloneConfig:function(d){d=d||{};
var g=d.id||Ext.id();
var e=Ext.applyIf(d,this.initialConfig);
e.id=g;
return new this.constructor(e)
},getXType:function(){return this.constructor.xtype
},isXType:function(c,d){if(Ext.isFunction(c)){c=c.xtype
}else{if(Ext.isObject(c)){c=c.constructor.xtype
}}return !d?("/"+this.getXTypes()+"/").indexOf("/"+c+"/")!=-1:this.constructor.xtype==c
},getXTypes:function(){var e=this.constructor;
if(!e.xtypes){var g=[],c=this;
while(c&&c.constructor.xtype){g.unshift(c.constructor.xtype);
c=c.constructor.superclass
}e.xtypeChain=g;
e.xtypes=g.join("/")
}return e.xtypes
},findParentBy:function(d){for(var c=this.ownerCt;
(c!=null)&&!d(c,this);
c=c.ownerCt){}return c||null
},findParentByType:function(b){return Ext.isFunction(b)?this.findParentBy(function(a){return a.constructor===b
}):this.findParentBy(function(a){return a.constructor.xtype===b
})
},getPositionEl:function(){return this.positionEl||this.el
},purgeListeners:function(){Ext.Component.superclass.purgeListeners.call(this);
if(this.mons){this.on("beforedestroy",this.clearMons,this,{single:true})
}},clearMons:function(){Ext.each(this.mons,function(b){b.item.un(b.ename,b.fn,b.scope)
},this);
this.mons=[]
},createMons:function(){if(!this.mons){this.mons=[];
this.on("beforedestroy",this.clearMons,this,{single:true})
}},mon:function(p,e,q,r,l){this.createMons();
if(Ext.isObject(e)){var m=/^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate)$/;
var n=e;
for(var o in n){if(m.test(o)){continue
}if(Ext.isFunction(n[o])){this.mons.push({item:p,ename:o,fn:n[o],scope:n.scope});
p.on(o,n[o],n.scope,n)
}else{this.mons.push({item:p,ename:o,fn:n[o],scope:n.scope});
p.on(o,n[o])
}}return
}this.mons.push({item:p,ename:e,fn:q,scope:r});
p.on(e,q,r,l)
},mun:function(n,r,o,p){var m,q;
this.createMons();
for(var k=0,l=this.mons.length;
k<l;
++k){q=this.mons[k];
if(n===q.item&&r==q.ename&&o===q.fn&&p===q.scope){this.mons.splice(k,1);
n.un(r,o,p);
m=true;
break
}}return m
},nextSibling:function(){if(this.ownerCt){var b=this.ownerCt.items.indexOf(this);
if(b!=-1&&b+1<this.ownerCt.items.getCount()){return this.ownerCt.items.itemAt(b+1)
}}return null
},previousSibling:function(){if(this.ownerCt){var b=this.ownerCt.items.indexOf(this);
if(b>0){return this.ownerCt.items.itemAt(b-1)
}}return null
},getBubbleTarget:function(){return this.ownerCt
}});
Ext.reg("component",Ext.Component);
Ext.Action=Ext.extend(Object,{constructor:function(b){this.initialConfig=b;
this.itemId=b.itemId=(b.itemId||b.id||Ext.id());
this.items=[]
},isAction:true,setText:function(b){this.initialConfig.text=b;
this.callEach("setText",[b])
},getText:function(){return this.initialConfig.text
},setIconClass:function(b){this.initialConfig.iconCls=b;
this.callEach("setIconClass",[b])
},getIconClass:function(){return this.initialConfig.iconCls
},setDisabled:function(b){this.initialConfig.disabled=b;
this.callEach("setDisabled",[b])
},enable:function(){this.setDisabled(false)
},disable:function(){this.setDisabled(true)
},isDisabled:function(){return this.initialConfig.disabled
},setHidden:function(b){this.initialConfig.hidden=b;
this.callEach("setVisible",[!b])
},show:function(){this.setHidden(false)
},hide:function(){this.setHidden(true)
},isHidden:function(){return this.initialConfig.hidden
},setHandler:function(c,d){this.initialConfig.handler=c;
this.initialConfig.scope=d;
this.callEach("setHandler",[c,d])
},each:function(c,d){Ext.each(this.items,c,d)
},callEach:function(j,g){var k=this.items;
for(var l=0,h=k.length;
l<h;
l++){k[l][j].apply(k[l],g)
}},addComponent:function(b){this.items.push(b);
b.on("destroy",this.removeComponent,this)
},removeComponent:function(b){this.items.remove(b)
},execute:function(){this.initialConfig.handler.apply(this.initialConfig.scope||window,arguments)
}});
(function(){Ext.Layer=function(m,n){m=m||{};
var l=Ext.DomHelper;
var b=m.parentEl,k=b?Ext.getDom(b):document.body;
if(n){this.dom=Ext.getDom(n)
}if(!this.dom){var a=m.dh||{tag:"div",cls:"x-layer"};
this.dom=l.append(k,a)
}if(m.cls){this.addClass(m.cls)
}this.constrain=m.constrain!==false;
this.setVisibilityMode(Ext.Element.VISIBILITY);
if(m.id){this.id=this.dom.id=m.id
}else{this.id=Ext.id(this.dom)
}this.zindex=m.zindex||this.getZIndex();
this.position("absolute",this.zindex);
if(m.shadow){this.shadowOffset=m.shadowOffset||4;
this.shadow=new Ext.Shadow({offset:this.shadowOffset,mode:m.shadow})
}else{this.shadowOffset=0
}this.useShim=m.shim!==false&&Ext.useShims;
this.useDisplay=m.useDisplay;
this.hide()
};
var d=Ext.Element.prototype;
var c=[];
Ext.extend(Ext.Layer,Ext.Element,{getZIndex:function(){return this.zindex||parseInt((this.getShim()||this).getStyle("z-index"),10)||11000
},getShim:function(){if(!this.useShim){return null
}if(this.shim){return this.shim
}var a=c.shift();
if(!a){a=this.createShim();
a.enableDisplayMode("block");
a.dom.style.display="none";
a.dom.style.visibility="visible"
}var b=this.dom.parentNode;
if(a.dom.parentNode!=b){b.insertBefore(a.dom,this.dom)
}a.setStyle("z-index",this.getZIndex()-2);
this.shim=a;
return a
},hideShim:function(){if(this.shim){this.shim.setDisplayed(false);
c.push(this.shim);
delete this.shim
}},disableShadow:function(){if(this.shadow){this.shadowDisabled=true;
this.shadow.hide();
this.lastShadowOffset=this.shadowOffset;
this.shadowOffset=0
}},enableShadow:function(a){if(this.shadow){this.shadowDisabled=false;
this.shadowOffset=this.lastShadowOffset;
delete this.lastShadowOffset;
if(a){this.sync(true)
}}},sync:function(t){var h=this.shadow;
if(!this.updating&&this.isVisible()&&(h||this.useShim)){var q=this.getShim();
var l=this.getWidth(),r=this.getHeight();
var s=this.getLeft(true),b=this.getTop(true);
if(h&&!this.shadowDisabled){if(t&&!h.isVisible()){h.show(this)
}else{h.realign(s,b,l,r)
}if(q){if(t){q.show()
}var p=h.adjusts,a=q.dom.style;
a.left=(Math.min(s,s+p.l))+"px";
a.top=(Math.min(b,b+p.t))+"px";
a.width=(l+p.w)+"px";
a.height=(r+p.h)+"px"
}}else{if(q){if(t){q.show()
}q.setSize(l,r);
q.setLeftTop(s,b)
}}}},destroy:function(){this.hideShim();
if(this.shadow){this.shadow.hide()
}this.removeAllListeners();
Ext.removeNode(this.dom);
delete this.dom
},remove:function(){this.destroy()
},beginUpdate:function(){this.updating=true
},endUpdate:function(){this.updating=false;
this.sync(true)
},hideUnders:function(a){if(this.shadow){this.shadow.hide()
}this.hideShim()
},constrainXY:function(){if(this.constrain){var s=Ext.lib.Dom.getViewWidth(),w=Ext.lib.Dom.getViewHeight();
var a=Ext.getDoc().getScroll();
var b=this.getXY();
var r=b[0],t=b[1];
var x=this.shadowOffset;
var q=this.dom.offsetWidth+x,v=this.dom.offsetHeight+x;
var u=false;
if((r+q)>s+a.left){r=s-q-x;
u=true
}if((t+v)>w+a.top){t=w-v-x;
u=true
}if(r<a.left){r=a.left;
u=true
}if(t<a.top){t=a.top;
u=true
}if(u){if(this.avoidY){var h=this.avoidY;
if(t<=h&&(t+v)>=h){t=h-v-5
}}b=[r,t];
this.storeXY(b);
d.setXY.call(this,b);
this.sync()
}}return this
},isVisible:function(){return this.visible
},showAction:function(){this.visible=true;
if(this.useDisplay===true){this.setDisplayed("")
}else{if(this.lastXY){d.setXY.call(this,this.lastXY)
}else{if(this.lastLT){d.setLeftTop.call(this,this.lastLT[0],this.lastLT[1])
}}}},hideAction:function(){this.visible=false;
if(this.useDisplay===true){this.setDisplayed(false)
}else{this.setLeftTop(-10000,-10000)
}},setVisible:function(n,o,b,a,e){if(n){this.showAction()
}if(o&&n){var p=function(){this.sync(true);
if(a){a()
}}.createDelegate(this);
d.setVisible.call(this,true,true,b,p,e)
}else{if(!n){this.hideUnders(true)
}var p=a;
if(o){p=function(){this.hideAction();
if(a){a()
}}.createDelegate(this)
}d.setVisible.call(this,n,o,b,p,e);
if(n){this.sync(true)
}else{if(!o){this.hideAction()
}}}return this
},storeXY:function(a){delete this.lastLT;
this.lastXY=a
},storeLeftTop:function(a,b){delete this.lastXY;
this.lastLT=[a,b]
},beforeFx:function(){this.beforeAction();
return Ext.Layer.superclass.beforeFx.apply(this,arguments)
},afterFx:function(){Ext.Layer.superclass.afterFx.apply(this,arguments);
this.sync(this.isVisible())
},beforeAction:function(){if(!this.updating&&this.shadow){this.shadow.hide()
}},setLeft:function(a){this.storeLeftTop(a,this.getTop(true));
d.setLeft.apply(this,arguments);
this.sync();
return this
},setTop:function(a){this.storeLeftTop(this.getLeft(true),a);
d.setTop.apply(this,arguments);
this.sync();
return this
},setLeftTop:function(a,b){this.storeLeftTop(a,b);
d.setLeftTop.apply(this,arguments);
this.sync();
return this
},setXY:function(e,o,b,a,n){this.fixDisplay();
this.beforeAction();
this.storeXY(e);
var p=this.createCB(a);
d.setXY.call(this,e,o,b,p,n);
if(!o){p()
}return this
},createCB:function(a){var b=this;
return function(){b.constrainXY();
b.sync(true);
if(a){a()
}}
},setX:function(n,m,b,a,e){this.setXY([n,this.getY()],m,b,a,e);
return this
},setY:function(a,n,e,b,m){this.setXY([this.getX(),a],n,e,b,m);
return this
},setSize:function(e,b,h,r,q,a){this.beforeAction();
var p=this.createCB(q);
d.setSize.call(this,e,b,h,r,p,a);
if(!h){p()
}return this
},setWidth:function(n,o,b,a,e){this.beforeAction();
var p=this.createCB(a);
d.setWidth.call(this,n,o,b,p,e);
if(!o){p()
}return this
},setHeight:function(e,h,a,p,b){this.beforeAction();
var o=this.createCB(p);
d.setHeight.call(this,e,h,a,o,b);
if(!h){o()
}return this
},setBounds:function(b,h,a,u,e,s,r,t){this.beforeAction();
var v=this.createCB(r);
if(!e){this.storeXY([b,h]);
d.setXY.call(this,[b,h]);
d.setSize.call(this,a,u,e,s,v,t);
v()
}else{d.setBounds.call(this,b,h,a,u,e,s,v,t)
}return this
},setZIndex:function(a){this.zindex=a;
this.setStyle("z-index",a+2);
if(this.shadow){this.shadow.setZIndex(a+1)
}if(this.shim){this.shim.setStyle("z-index",a)
}return this
}})
})();
Ext.Shadow=function(h){Ext.apply(this,h);
if(typeof this.mode!="string"){this.mode=this.defaultMode
}var g=this.offset,j={h:0};
var a=Math.floor(this.offset/2);
switch(this.mode.toLowerCase()){case"drop":j.w=0;
j.l=j.t=g;
j.t-=1;
if(Ext.isIE){j.l-=this.offset+a;
j.t-=this.offset+a;
j.w-=a;
j.h-=a;
j.t+=1
}break;
case"sides":j.w=(g*2);
j.l=-g;
j.t=g-1;
if(Ext.isIE){j.l-=(this.offset-a);
j.t-=this.offset+a;
j.l+=1;
j.w-=(this.offset-a)*2;
j.w-=a+1;
j.h-=1
}break;
case"frame":j.w=j.h=(g*2);
j.l=j.t=-g;
j.t+=1;
j.h-=2;
if(Ext.isIE){j.l-=(this.offset-a);
j.t-=(this.offset-a);
j.l+=1;
j.w-=(this.offset+a+1);
j.h-=(this.offset+a);
j.h+=1
}break
}this.adjusts=j
};
Ext.Shadow.prototype={offset:4,defaultMode:"drop",show:function(b){b=Ext.get(b);
if(!this.el){this.el=Ext.Shadow.Pool.pull();
if(this.el.dom.nextSibling!=b.dom){this.el.insertBefore(b)
}}this.el.setStyle("z-index",this.zIndex||parseInt(b.getStyle("z-index"),10)-1);
if(Ext.isIE){this.el.dom.style.filter="progid:DXImageTransform.Microsoft.alpha(opacity=50) progid:DXImageTransform.Microsoft.Blur(pixelradius="+(this.offset)+")"
}this.realign(b.getLeft(true),b.getTop(true),b.getWidth(),b.getHeight());
this.el.dom.style.display="block"
},isVisible:function(){return this.el?true:false
},realign:function(B,D,a,y){if(!this.el){return
}var l=this.adjusts,t=this.el.dom,C=t.style;
var x=0;
C.left=(B+l.l)+"px";
C.top=(D+l.t)+"px";
var d=(a+l.w),z=(y+l.h),w=d+"px",h=z+"px";
if(C.width!=w||C.height!=h){C.width=w;
C.height=h;
if(!Ext.isIE){var s=t.childNodes;
var A=Math.max(0,(d-12))+"px";
s[0].childNodes[1].style.width=A;
s[1].childNodes[1].style.width=A;
s[2].childNodes[1].style.width=A;
s[1].style.height=Math.max(0,(z-12))+"px"
}}},hide:function(){if(this.el){this.el.dom.style.display="none";
Ext.Shadow.Pool.push(this.el);
delete this.el
}},setZIndex:function(b){this.zIndex=b;
if(this.el){this.el.setStyle("z-index",b)
}}};
Ext.Shadow.Pool=function(){var c=[];
var d=Ext.isIE?'<div class="x-ie-shadow"></div>':'<div class="x-shadow"><div class="xst"><div class="xstl"></div><div class="xstc"></div><div class="xstr"></div></div><div class="xsc"><div class="xsml"></div><div class="xsmc"></div><div class="xsmr"></div></div><div class="xsb"><div class="xsbl"></div><div class="xsbc"></div><div class="xsbr"></div></div></div>';
return{pull:function(){var a=c.shift();
if(!a){a=Ext.get(Ext.DomHelper.insertHtml("beforeBegin",document.body.firstChild,d));
a.autoBoxAdjust=false
}return a
},push:function(a){c.push(a)
}}
}();
Ext.BoxComponent=Ext.extend(Ext.Component,{initComponent:function(){Ext.BoxComponent.superclass.initComponent.call(this);
this.addEvents("resize","move")
},boxReady:false,deferHeight:false,setSize:function(h,m){if(typeof h=="object"){m=h.height,h=h.width
}if(Ext.isDefined(h)&&Ext.isDefined(this.boxMinWidth)&&(h<this.boxMinWidth)){h=this.boxMinWidth
}if(Ext.isDefined(m)&&Ext.isDefined(this.boxMinHeight)&&(m<this.boxMinHeight)){m=this.boxMinHeight
}if(Ext.isDefined(h)&&Ext.isDefined(this.boxMaxWidth)&&(h>this.boxMaxWidth)){h=this.boxMaxWidth
}if(Ext.isDefined(m)&&Ext.isDefined(this.boxMaxHeight)&&(m>this.boxMaxHeight)){m=this.boxMaxHeight
}if(!this.boxReady){this.width=h,this.height=m;
return this
}if(this.cacheSizes!==false&&this.lastSize&&this.lastSize.width==h&&this.lastSize.height==m){return this
}this.lastSize={width:h,height:m};
var n=this.adjustSize(h,m),k=n.width,j=n.height,l;
if(k!==undefined||j!==undefined){l=this.getResizeEl();
if(!this.deferHeight&&k!==undefined&&j!==undefined){l.setSize(k,j)
}else{if(!this.deferHeight&&j!==undefined){l.setHeight(j)
}else{if(k!==undefined){l.setWidth(k)
}}}this.onResize(k,j,h,m)
}return this
},setWidth:function(b){return this.setSize(b)
},setHeight:function(b){return this.setSize(undefined,b)
},getSize:function(){return this.getResizeEl().getSize()
},getWidth:function(){return this.getResizeEl().getWidth()
},getHeight:function(){return this.getResizeEl().getHeight()
},getOuterSize:function(){var b=this.getResizeEl();
return{width:b.getWidth()+b.getMargins("lr"),height:b.getHeight()+b.getMargins("tb")}
},getPosition:function(d){var c=this.getPositionEl();
if(d===true){return[c.getLeft(true),c.getTop(true)]
}return this.xy||c.getXY()
},getBox:function(e){var g=this.getPosition(e);
var d=this.getSize();
d.x=g[0];
d.y=g[1];
return d
},updateBox:function(b){this.setSize(b.width,b.height);
this.setPagePosition(b.x,b.y);
return this
},getResizeEl:function(){return this.resizeEl||this.el
},setAutoScroll:function(b){if(this.rendered){this.getContentTarget().setOverflow(b?"auto":"")
}this.autoScroll=b;
return this
},setPosition:function(j,k){if(j&&typeof j[1]=="number"){k=j[1];
j=j[0]
}this.x=j;
this.y=k;
if(!this.boxReady){return this
}var h=this.adjustPosition(j,k);
var l=h.x,m=h.y;
var n=this.getPositionEl();
if(l!==undefined||m!==undefined){if(l!==undefined&&m!==undefined){n.setLeftTop(l,m)
}else{if(l!==undefined){n.setLeft(l)
}else{if(m!==undefined){n.setTop(m)
}}}this.onPosition(l,m);
this.fireEvent("move",this,l,m)
}return this
},setPagePosition:function(e,g){if(e&&typeof e[1]=="number"){g=e[1];
e=e[0]
}this.pageX=e;
this.pageY=g;
if(!this.boxReady){return
}if(e===undefined||g===undefined){return
}var d=this.getPositionEl().translatePoints(e,g);
this.setPosition(d.left,d.top);
return this
},afterRender:function(){Ext.BoxComponent.superclass.afterRender.call(this);
if(this.resizeEl){this.resizeEl=Ext.get(this.resizeEl)
}if(this.positionEl){this.positionEl=Ext.get(this.positionEl)
}this.boxReady=true;
this.setAutoScroll(this.autoScroll);
this.setSize(this.width,this.height);
if(this.x||this.y){this.setPosition(this.x,this.y)
}else{if(this.pageX||this.pageY){this.setPagePosition(this.pageX,this.pageY)
}}},syncSize:function(){delete this.lastSize;
this.setSize(this.autoWidth?undefined:this.getResizeEl().getWidth(),this.autoHeight?undefined:this.getResizeEl().getHeight());
return this
},onResize:function(h,e,g,j){this.fireEvent("resize",this,h,e,g,j)
},onPosition:function(d,c){},adjustSize:function(d,c){if(this.autoWidth){d="auto"
}if(this.autoHeight){c="auto"
}return{width:d,height:c}
},adjustPosition:function(d,c){return{x:d,y:c}
}});
Ext.reg("box",Ext.BoxComponent);
Ext.Spacer=Ext.extend(Ext.BoxComponent,{autoEl:"div"});
Ext.reg("spacer",Ext.Spacer);
Ext.SplitBar=function(l,j,g,k,h){this.el=Ext.get(l,true);
this.el.dom.unselectable="on";
this.resizingEl=Ext.get(j,true);
this.orientation=g||Ext.SplitBar.HORIZONTAL;
this.minSize=0;
this.maxSize=2000;
this.animate=false;
this.useShim=false;
this.shim=null;
if(!h){this.proxy=Ext.SplitBar.createProxy(this.orientation)
}else{this.proxy=Ext.get(h).dom
}this.dd=new Ext.dd.DDProxy(this.el.dom.id,"XSplitBars",{dragElId:this.proxy.id});
this.dd.b4StartDrag=this.onStartProxyDrag.createDelegate(this);
this.dd.endDrag=this.onEndProxyDrag.createDelegate(this);
this.dragSpecs={};
this.adapter=new Ext.SplitBar.BasicLayoutAdapter();
this.adapter.init(this);
if(this.orientation==Ext.SplitBar.HORIZONTAL){this.placement=k||(this.el.getX()>this.resizingEl.getX()?Ext.SplitBar.LEFT:Ext.SplitBar.RIGHT);
this.el.addClass("x-splitbar-h")
}else{this.placement=k||(this.el.getY()>this.resizingEl.getY()?Ext.SplitBar.TOP:Ext.SplitBar.BOTTOM);
this.el.addClass("x-splitbar-v")
}this.addEvents("resize","moved","beforeresize","beforeapply");
Ext.SplitBar.superclass.constructor.call(this)
};
Ext.extend(Ext.SplitBar,Ext.util.Observable,{onStartProxyDrag:function(h,j){this.fireEvent("beforeresize",this);
this.overlay=Ext.DomHelper.append(document.body,{cls:"x-drag-overlay",html:"&#160;"},true);
this.overlay.unselectable();
this.overlay.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));
this.overlay.show();
Ext.get(this.proxy).setDisplayed("block");
var l=this.adapter.getElementSize(this);
this.activeMinSize=this.getMinimumSize();
this.activeMaxSize=this.getMaximumSize();
var k=l-this.activeMinSize;
var g=Math.max(this.activeMaxSize-l,0);
if(this.orientation==Ext.SplitBar.HORIZONTAL){this.dd.resetConstraints();
this.dd.setXConstraint(this.placement==Ext.SplitBar.LEFT?k:g,this.placement==Ext.SplitBar.LEFT?g:k,this.tickSize);
this.dd.setYConstraint(0,0)
}else{this.dd.resetConstraints();
this.dd.setXConstraint(0,0);
this.dd.setYConstraint(this.placement==Ext.SplitBar.TOP?k:g,this.placement==Ext.SplitBar.TOP?g:k,this.tickSize)
}this.dragSpecs.startSize=l;
this.dragSpecs.startPoint=[h,j];
Ext.dd.DDProxy.prototype.b4StartDrag.call(this.dd,h,j)
},onEndProxyDrag:function(g){Ext.get(this.proxy).setDisplayed(false);
var d=Ext.lib.Event.getXY(g);
if(this.overlay){Ext.destroy(this.overlay);
delete this.overlay
}var e;
if(this.orientation==Ext.SplitBar.HORIZONTAL){e=this.dragSpecs.startSize+(this.placement==Ext.SplitBar.LEFT?d[0]-this.dragSpecs.startPoint[0]:this.dragSpecs.startPoint[0]-d[0])
}else{e=this.dragSpecs.startSize+(this.placement==Ext.SplitBar.TOP?d[1]-this.dragSpecs.startPoint[1]:this.dragSpecs.startPoint[1]-d[1])
}e=Math.min(Math.max(e,this.activeMinSize),this.activeMaxSize);
if(e!=this.dragSpecs.startSize){if(this.fireEvent("beforeapply",this,e)!==false){this.adapter.setElementSize(this,e);
this.fireEvent("moved",this,e);
this.fireEvent("resize",this,e)
}}},getAdapter:function(){return this.adapter
},setAdapter:function(b){this.adapter=b;
this.adapter.init(this)
},getMinimumSize:function(){return this.minSize
},setMinimumSize:function(b){this.minSize=b
},getMaximumSize:function(){return this.maxSize
},setMaximumSize:function(b){this.maxSize=b
},setCurrentSize:function(c){var d=this.animate;
this.animate=false;
this.adapter.setElementSize(this,c);
this.animate=d
},destroy:function(b){Ext.destroy(this.shim,Ext.get(this.proxy));
this.dd.unreg();
if(b){this.el.remove()
}this.purgeListeners()
}});
Ext.SplitBar.createProxy=function(d){var g=new Ext.Element(document.createElement("div"));
document.body.appendChild(g.dom);
g.unselectable();
var e="x-splitbar-proxy";
g.addClass(e+" "+(d==Ext.SplitBar.HORIZONTAL?e+"-h":e+"-v"));
return g.dom
};
Ext.SplitBar.BasicLayoutAdapter=function(){};
Ext.SplitBar.BasicLayoutAdapter.prototype={init:function(b){},getElementSize:function(b){if(b.orientation==Ext.SplitBar.HORIZONTAL){return b.resizingEl.getWidth()
}else{return b.resizingEl.getHeight()
}},setElementSize:function(d,e,g){if(d.orientation==Ext.SplitBar.HORIZONTAL){if(!d.animate){d.resizingEl.setWidth(e);
if(g){g(d,e)
}}else{d.resizingEl.setWidth(e,true,0.1,g,"easeOut")
}}else{if(!d.animate){d.resizingEl.setHeight(e);
if(g){g(d,e)
}}else{d.resizingEl.setHeight(e,true,0.1,g,"easeOut")
}}}};
Ext.SplitBar.AbsoluteLayoutAdapter=function(b){this.basic=new Ext.SplitBar.BasicLayoutAdapter();
this.container=Ext.get(b)
};
Ext.SplitBar.AbsoluteLayoutAdapter.prototype={init:function(b){this.basic.init(b)
},getElementSize:function(b){return this.basic.getElementSize(b)
},setElementSize:function(d,e,g){this.basic.setElementSize(d,e,this.moveSplitter.createDelegate(this,[d]))
},moveSplitter:function(d){var c=Ext.SplitBar;
switch(d.placement){case c.LEFT:d.el.setX(d.resizingEl.getRight());
break;
case c.RIGHT:d.el.setStyle("right",(this.container.getWidth()-d.resizingEl.getLeft())+"px");
break;
case c.TOP:d.el.setY(d.resizingEl.getBottom());
break;
case c.BOTTOM:d.el.setY(d.resizingEl.getTop()-d.el.getHeight());
break
}}};
Ext.SplitBar.VERTICAL=1;
Ext.SplitBar.HORIZONTAL=2;
Ext.SplitBar.LEFT=1;
Ext.SplitBar.RIGHT=2;
Ext.SplitBar.TOP=3;
Ext.SplitBar.BOTTOM=4;
Ext.Container=Ext.extend(Ext.BoxComponent,{bufferResize:50,autoDestroy:true,forceLayout:false,defaultType:"panel",resizeEvent:"resize",bubbleEvents:["add","remove"],initComponent:function(){Ext.Container.superclass.initComponent.call(this);
this.addEvents("afterlayout","beforeadd","beforeremove","add","remove");
this.enableBubble(this.bubbleEvents);
var b=this.items;
if(b){delete this.items;
this.add(b)
}},initItems:function(){if(!this.items){this.items=new Ext.util.MixedCollection(false,this.getComponentId);
this.getLayout()
}},setLayout:function(b){if(this.layout&&this.layout!=b){this.layout.setContainer(null)
}this.initItems();
this.layout=b;
b.setContainer(this)
},afterRender:function(){this.layoutDone=false;
if(!this.layout){this.layout="auto"
}if(Ext.isObject(this.layout)&&!this.layout.layout){this.layoutConfig=this.layout;
this.layout=this.layoutConfig.type
}if(Ext.isString(this.layout)){this.layout=new Ext.Container.LAYOUTS[this.layout.toLowerCase()](this.layoutConfig)
}this.setLayout(this.layout);
Ext.Container.superclass.afterRender.call(this);
if(Ext.isDefined(this.activeItem)){var b=this.activeItem;
delete this.activeItem;
this.layout.setActiveItem(b)
}if(!this.ownerCt&&!this.layoutDone){this.doLayout(false,true)
}if(this.monitorResize===true){Ext.EventManager.onWindowResize(this.doLayout,this,[false])
}},getLayoutTarget:function(){return this.el
},getComponentId:function(b){return b.getItemId()
},add:function(c){this.initItems();
var k=arguments.length>1;
if(k||Ext.isArray(c)){var h=[];
Ext.each(k?arguments:c,function(a){h.push(this.add(a))
},this);
return h
}var j=this.lookupComponent(this.applyDefaults(c));
var l=this.items.length;
if(this.fireEvent("beforeadd",this,j,l)!==false&&this.onBeforeAdd(j)!==false){this.items.add(j);
j.onAdded(this,l);
this.onAdd(j);
this.fireEvent("add",this,j,l)
}return j
},onAdd:function(b){},onAdded:function(d,c){this.ownerCt=d;
this.initRef();
this.cascade(function(a){a.initRef()
});
this.fireEvent("added",this,d,c)
},insert:function(m,n){this.initItems();
var o=arguments,p=o.length;
if(p>2){var a=[];
for(var l=p-1;
l>=1;
--l){a.push(this.insert(m,o[l]))
}return a
}var c=this.lookupComponent(this.applyDefaults(n));
m=Math.min(m,this.items.length);
if(this.fireEvent("beforeadd",this,c,m)!==false&&this.onBeforeAdd(c)!==false){if(c.ownerCt==this){this.items.remove(c)
}this.items.insert(m,c);
c.onAdded(this,m);
this.onAdd(c);
this.fireEvent("add",this,c,m)
}return c
},applyDefaults:function(c){var d=this.defaults;
if(d){if(Ext.isFunction(d)){d=d.call(this,c)
}if(Ext.isString(c)){c=Ext.ComponentMgr.get(c);
Ext.apply(c,d)
}else{if(!c.events){Ext.applyIf(c,d)
}else{Ext.apply(c,d)
}}}return c
},onBeforeAdd:function(b){if(b.ownerCt){b.ownerCt.remove(b,false)
}if(this.hideBorders===true){b.border=(b.border===true)
}},remove:function(e,c){this.initItems();
var g=this.getComponent(e);
if(g&&this.fireEvent("beforeremove",this,g)!==false){this.doRemove(g,c);
this.fireEvent("remove",this,g)
}return g
},onRemove:function(b){},doRemove:function(c,d){if(this.layout&&this.rendered){this.layout.onRemove(c)
}this.items.remove(c);
c.onRemoved();
this.onRemove(c);
if(d===true||(d!==false&&this.autoDestroy)){c.destroy()
}},removeAll:function(n){this.initItems();
var l,k=[],h=[];
this.items.each(function(a){k.push(a)
});
for(var m=0,j=k.length;
m<j;
++m){l=k[m];
this.remove(l,n);
if(l.ownerCt!==this){h.push(l)
}}return h
},getComponent:function(b){if(Ext.isObject(b)){b=b.getItemId()
}return this.items.get(b)
},lookupComponent:function(b){if(Ext.isString(b)){return Ext.ComponentMgr.get(b)
}else{if(!b.events){return this.createComponent(b)
}}return b
},createComponent:function(e,g){var c=e.render?e:Ext.create(Ext.apply({ownerCt:this},e),g||this.defaultType);
delete c.ownerCt;
return c
},canLayout:function(){var d=this.getLayoutTarget(),c;
return !!(d&&(c=d.dom.offsetWidth||d.dom.offsetHeight))
},doLayout:function(p,q){var m=this.rendered,n=q||this.forceLayout,r,c,l,o;
this.layoutDone=true;
if(!this.canLayout()||this.collapsed){this.deferLayout=this.deferLayout||!p;
if(!n){return
}p=p&&!this.deferLayout
}else{delete this.deferLayout
}r=(p!==true&&this.items)?this.items.items:[];
for(c=0,l=r.length;
c<l;
c++){if((o=r[c]).layout){o.suspendLayoutResize=true
}}if(m&&this.layout){this.layout.layout()
}for(c=0;
c<l;
c++){if((o=r[c]).doLayout){o.doLayout(false,n)
}}if(m){this.onLayout(p,n)
}this.hasLayout=true;
delete this.forceLayout;
for(c=0;
c<l;
c++){if((o=r[c]).layout){delete o.suspendLayoutResize
}}},onLayout:Ext.emptyFn,onResize:function(h,e,g,j){Ext.Container.superclass.onResize.apply(this,arguments);
if((this.rendered&&this.layout&&this.layout.monitorResize)&&!this.suspendLayoutResize){this.layout.onResize()
}},hasLayoutPending:function(){var b=this.layoutPending;
this.ownerCt.bubble(function(a){return !(b=a.layoutPending)
});
return b
},onShow:function(){Ext.Container.superclass.onShow.call(this);
if(Ext.isDefined(this.deferLayout)){this.doLayout(true)
}},getLayout:function(){if(!this.layout){var b=new Ext.layout.ContainerLayout(this.layoutConfig);
this.setLayout(b)
}return this.layout
},beforeDestroy:function(){var b;
if(this.items){while(b=this.items.first()){this.doRemove(b,true)
}}if(this.monitorResize){Ext.EventManager.removeResizeListener(this.doLayout,this)
}Ext.destroy(this.layout);
Ext.Container.superclass.beforeDestroy.call(this)
},bubble:function(j,e,g){var h=this;
while(h){if(j.apply(e||h,g||[h])===false){break
}h=h.ownerCt
}return this
},cascade:function(k,l,h){if(k.apply(l||this,h||[this])!==false){if(this.items){var m=this.items.items;
for(var n=0,j=m.length;
n<j;
n++){if(m[n].cascade){m[n].cascade(k,l,h)
}else{k.apply(l||m[n],h||[m[n]])
}}}}return this
},findById:function(g){var e,d=this;
this.cascade(function(a){if(d!=a&&a.id===g){e=a;
return false
}});
return e||null
},findByType:function(c,d){return this.findBy(function(a){return a.isXType(c,d)
})
},find:function(c,d){return this.findBy(function(a){return a[c]===d
})
},findBy:function(h,j){var g=[],e=this;
this.cascade(function(a){if(e!=a&&h.call(j||a,a,e)===true){g.push(a)
}});
return g
},get:function(b){return this.items.get(b)
}});
Ext.Container.LAYOUTS={};
Ext.reg("container",Ext.Container);
Ext.layout.ContainerLayout=Ext.extend(Object,{monitorResize:false,activeItem:null,constructor:function(b){Ext.apply(this,b)
},layout:function(){var b=this.container.getLayoutTarget();
if(!(this.hasLayout||Ext.isEmpty(this.targetCls))){b.addClass(this.targetCls)
}this.onLayout(this.container,b);
this.container.fireEvent("afterlayout",this.container,this);
this.hasLayout=true
},onLayout:function(d,c){this.renderAll(d,c)
},isValidParent:function(c,d){return d&&c.getPositionEl().dom.parentNode==(d.dom||d)
},renderAll:function(m,l){var c=m.items.items;
for(var n=0,j=c.length;
n<j;
n++){var k=c[n];
if(k&&(!k.rendered||!this.isValidParent(k,l))){this.renderItem(k,n,l)
}}},renderItem:function(g,e,c){if(g&&!g.rendered){g.render(c,e);
this.configureItem(g,e)
}else{if(g&&!this.isValidParent(g,c)){if(Ext.isNumber(e)){e=c.dom.childNodes[e]
}c.dom.insertBefore(g.getPositionEl().dom,e||null);
g.container=c;
this.configureItem(g,e)
}}},configureItem:function(g,e){if(this.extraCls){var c=g.getPositionEl?g.getPositionEl():g;
c.addClass(this.extraCls)
}if(g.doLayout&&this.forceLayout){g.doLayout(false,true)
}if(this.renderHidden&&g!=this.activeItem){g.hide()
}},onRemove:function(c){if(this.activeItem==c){delete this.activeItem
}if(c.rendered&&this.extraCls){var d=c.getPositionEl?c.getPositionEl():c;
d.removeClass(this.extraCls)
}},onResize:function(){var d=this.container,b=d.bufferResize;
if(d.collapsed){return
}if(b&&d.ownerCt){if(!d.hasLayoutPending()){if(!this.resizeTask){this.resizeTask=new Ext.util.DelayedTask(this.runLayout,this);
this.resizeBuffer=Ext.isNumber(b)?b:50
}d.layoutPending=true;
this.resizeTask.delay(this.resizeBuffer)
}}else{d.doLayout(false,this.forceLayout)
}},runLayout:function(){var b=this.container;
b.doLayout();
delete b.layoutPending
},setContainer:function(b){this.container=b
},parseMargins:function(d){if(Ext.isNumber(d)){d=d.toString()
}var g=d.split(" ");
var e=g.length;
if(e==1){g[1]=g[0];
g[2]=g[0];
g[3]=g[0]
}if(e==2){g[2]=g[0];
g[3]=g[1]
}if(e==3){g[3]=g[1]
}return{top:parseInt(g[0],10)||0,right:parseInt(g[1],10)||0,bottom:parseInt(g[2],10)||0,left:parseInt(g[3],10)||0}
},fieldTpl:(function(){var b=new Ext.Template('<div class="x-form-item {itemCls}" tabIndex="-1">','<label for="{id}" style="{labelStyle}" class="x-form-item-label">{label}{labelSeparator}</label>','<div class="x-form-element" id="x-form-el-{id}" style="{elementStyle}">','</div><div class="{clearCls}"></div>',"</div>");
b.disableFormats=true;
return b.compile()
})(),destroy:function(){if(!Ext.isEmpty(this.targetCls)){var b=this.container.getLayoutTarget();
if(b){b.removeClass(this.targetCls)
}}}});
Ext.Container.LAYOUTS.auto=Ext.layout.ContainerLayout;
Ext.layout.FitLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,onLayout:function(d,c){Ext.layout.FitLayout.superclass.onLayout.call(this,d,c);
if(!this.container.collapsed){this.setItemSize(this.activeItem||d.items.itemAt(0),c.getViewSize(true))
}},setItemSize:function(c,d){if(c&&d.height>0){c.setSize(d)
}}});
Ext.Container.LAYOUTS.fit=Ext.layout.FitLayout;
Ext.layout.CardLayout=Ext.extend(Ext.layout.FitLayout,{deferredRender:false,layoutOnCardChange:false,renderHidden:true,constructor:function(b){Ext.layout.CardLayout.superclass.constructor.call(this,b)
},setActiveItem:function(g){var e=this.activeItem;
g=this.container.getComponent(g);
if(e!=g){if(e){e.hide();
e.fireEvent("deactivate",e)
}var d=g.doLayout&&(this.layoutOnCardChange||!g.rendered);
this.activeItem=g;
if(g){g.show()
}this.layout();
if(g&&d){g.doLayout()
}g.fireEvent("activate",g)
}},renderAll:function(d,c){if(this.deferredRender){this.renderItem(this.activeItem,undefined,c)
}else{Ext.layout.CardLayout.superclass.renderAll.call(this,d,c)
}}});
Ext.Container.LAYOUTS.card=Ext.layout.CardLayout;
Ext.layout.AnchorLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,getAnchorViewSize:function(d,c){return c.dom==document.body?c.getViewSize(true):c.getStyleSize()
},onLayout:function(y,v){Ext.layout.AnchorLayout.superclass.onLayout.call(this,y,v);
var F=v.getViewSize(true);
var H=F.width,z=F.height;
if(H<20&&z<20){return
}var D,c;
if(y.anchorSize){if(typeof y.anchorSize=="number"){D=y.anchorSize
}else{D=y.anchorSize.width;
c=y.anchorSize.height
}}else{D=y.initialConfig.width;
c=y.initialConfig.height
}var w=y.items.items,x=w.length,A,h,a,B,E,C,G;
for(A=0;
A<x;
A++){h=w[A];
C=h.getPositionEl();
if(h.anchor){a=h.anchorSpec;
if(!a){G=h.anchor.split(" ");
h.anchorSpec=a={right:this.parseAnchor(G[0],h.initialConfig.width,D),bottom:this.parseAnchor(G[1],h.initialConfig.height,c)}
}B=a.right?this.adjustWidthAnchor(a.right(H)-C.getMargins("lr"),h):undefined;
E=a.bottom?this.adjustHeightAnchor(a.bottom(z)-C.getMargins("tb"),h):undefined;
if(B||E){h.setSize(B||undefined,E||undefined)
}}}},parseAnchor:function(n,j,a){if(n&&n!="none"){var l;
if(/^(r|right|b|bottom)$/i.test(n)){var k=a-j;
return function(b){if(b!==l){l=b;
return b-k
}}
}else{if(n.indexOf("%")!=-1){var m=parseFloat(n.replace("%",""))*0.01;
return function(b){if(b!==l){l=b;
return Math.floor(b*m)
}}
}else{n=parseInt(n,10);
if(!isNaN(n)){return function(b){if(b!==l){l=b;
return b+n
}}
}}}}return false
},adjustWidthAnchor:function(c,d){return c
},adjustHeightAnchor:function(c,d){return c
}});
Ext.Container.LAYOUTS.anchor=Ext.layout.AnchorLayout;
Ext.layout.ColumnLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,extraCls:"x-column",scrollOffset:0,targetCls:"x-column-layout-ct",isValidParent:function(c,d){return c.getPositionEl().dom.parentNode==this.innerCt.dom
},onLayout:function(t,q){var s=t.items.items,r=s.length,p,v;
if(!this.innerCt){this.innerCt=q.createChild({cls:"x-column-inner"});
this.innerCt.createChild({cls:"x-clear"})
}this.renderAll(t,this.innerCt);
var c=q.getViewSize(true);
if(c.width<1&&c.height<1){return
}var o=c.width-this.scrollOffset,u=c.height,h=o;
this.innerCt.setWidth(o);
for(v=0;
v<r;
v++){p=s[v];
if(!p.columnWidth){h-=(p.getSize().width+p.getPositionEl().getMargins("lr"))
}}h=h<0?0:h;
for(v=0;
v<r;
v++){p=s[v];
if(p.columnWidth){p.setSize(Math.floor(p.columnWidth*h)-p.getPositionEl().getMargins("lr"))
}}}});
Ext.Container.LAYOUTS.column=Ext.layout.ColumnLayout;
Ext.layout.BorderLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,rendered:false,targetCls:"x-border-layout-ct",onLayout:function(W,h){var V;
if(!this.rendered){var n=W.items.items;
V=[];
for(var P=0,N=n.length;
P<N;
P++){var I=n[P];
var S=I.region;
if(I.collapsed){V.push(I)
}I.collapsed=false;
if(!I.rendered){I.render(h,P);
I.getPositionEl().addClass("x-border-panel")
}this[S]=S!="center"&&I.split?new Ext.layout.BorderLayout.SplitRegion(this,I.initialConfig,S):new Ext.layout.BorderLayout.Region(this,I.initialConfig,S);
this[S].render(h,I)
}this.rendered=true
}var w=h.getViewSize(false);
if(w.width<20||w.height<20){if(V){this.restoreCollapsed=V
}return
}else{if(this.restoreCollapsed){V=this.restoreCollapsed;
delete this.restoreCollapsed
}}var M=w.width,L=w.height;
var O=M,b=L,R=0,Q=0;
var e=this.north,J=this.south,T=this.west,K=this.east,I=this.center;
if(!I&&Ext.layout.BorderLayout.WARN!==false){throw"No center region defined in BorderLayout "+W.id
}if(e&&e.isVisible()){var m=e.getSize();
var c=e.getMargins();
m.width=M-(c.left+c.right);
m.x=c.left;
m.y=c.top;
R=m.height+m.y+c.bottom;
b-=R;
e.applyLayout(m)
}if(J&&J.isVisible()){var m=J.getSize();
var c=J.getMargins();
m.width=M-(c.left+c.right);
m.x=c.left;
var s=(m.height+c.top+c.bottom);
m.y=L-s+c.top;
b-=s;
J.applyLayout(m)
}if(T&&T.isVisible()){var m=T.getSize();
var c=T.getMargins();
m.height=b-(c.top+c.bottom);
m.x=c.left;
m.y=R+c.top;
var X=(m.width+c.left+c.right);
Q+=X;
O-=X;
T.applyLayout(m)
}if(K&&K.isVisible()){var m=K.getSize();
var c=K.getMargins();
m.height=b-(c.top+c.bottom);
var X=(m.width+c.left+c.right);
m.x=M-X+c.left;
m.y=R+c.top;
O-=X;
K.applyLayout(m)
}if(I){var c=I.getMargins();
var U={x:Q+c.left,y:R+c.top,width:O-(c.left+c.right),height:b-(c.top+c.bottom)};
I.applyLayout(U)
}if(V){for(var P=0,N=V.length;
P<N;
P++){V[P].collapse(false)
}}if(Ext.isIE&&Ext.isStrict){h.repaint()
}},destroy:function(){var d=["north","south","east","west"];
for(var e=0;
e<d.length;
e++){var g=this[d[e]];
if(g){if(g.destroy){g.destroy()
}else{if(g.split){g.split.destroy(true)
}}}}Ext.layout.BorderLayout.superclass.destroy.call(this)
}});
Ext.layout.BorderLayout.Region=function(d,e,g){Ext.apply(this,e);
this.layout=d;
this.position=g;
this.state={};
if(typeof this.margins=="string"){this.margins=this.layout.parseMargins(this.margins)
}this.margins=Ext.applyIf(this.margins||{},this.defaultMargins);
if(this.collapsible){if(typeof this.cmargins=="string"){this.cmargins=this.layout.parseMargins(this.cmargins)
}if(this.collapseMode=="mini"&&!this.cmargins){this.cmargins={left:0,top:0,right:0,bottom:0}
}else{this.cmargins=Ext.applyIf(this.cmargins||{},g=="north"||g=="south"?this.defaultNSCMargins:this.defaultEWCMargins)
}}};
Ext.layout.BorderLayout.Region.prototype={collapsible:false,split:false,floatable:true,minWidth:50,minHeight:50,defaultMargins:{left:0,top:0,right:0,bottom:0},defaultNSCMargins:{left:5,top:5,right:5,bottom:5},defaultEWCMargins:{left:5,top:0,right:5,bottom:0},floatingZIndex:100,isCollapsed:false,render:function(e,j){this.panel=j;
j.el.enableDisplayMode();
this.targetEl=e;
this.el=j.el;
var g=j.getState,h=this.position;
j.getState=function(){return Ext.apply(g.call(j)||{},this.state)
}.createDelegate(this);
if(h!="center"){j.allowQueuedExpand=false;
j.on({beforecollapse:this.beforeCollapse,collapse:this.onCollapse,beforeexpand:this.beforeExpand,expand:this.onExpand,hide:this.onHide,show:this.onShow,scope:this});
if(this.collapsible||this.floatable){j.collapseEl="el";
j.slideAnchor=this.getSlideAnchor()
}if(j.tools&&j.tools.toggle){j.tools.toggle.addClass("x-tool-collapse-"+h);
j.tools.toggle.addClassOnOver("x-tool-collapse-"+h+"-over")
}}},getCollapsedEl:function(){if(!this.collapsedEl){if(!this.toolTemplate){var c=new Ext.Template('<div class="x-tool x-tool-{id}">&#160;</div>');
c.disableFormats=true;
c.compile();
Ext.layout.BorderLayout.Region.prototype.toolTemplate=c
}this.collapsedEl=this.targetEl.createChild({cls:"x-layout-collapsed x-layout-collapsed-"+this.position,id:this.panel.id+"-xcollapsed"});
this.collapsedEl.enableDisplayMode("block");
if(this.collapseMode=="mini"){this.collapsedEl.addClass("x-layout-cmini-"+this.position);
this.miniCollapsedEl=this.collapsedEl.createChild({cls:"x-layout-mini x-layout-mini-"+this.position,html:"&#160;"});
this.miniCollapsedEl.addClassOnOver("x-layout-mini-over");
this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
this.collapsedEl.on("click",this.onExpandClick,this,{stopEvent:true})
}else{if(this.collapsible!==false&&!this.hideCollapseTool){var d=this.toolTemplate.append(this.collapsedEl.dom,{id:"expand-"+this.position},true);
d.addClassOnOver("x-tool-expand-"+this.position+"-over");
d.on("click",this.onExpandClick,this,{stopEvent:true})
}if(this.floatable!==false||this.titleCollapse){this.collapsedEl.addClassOnOver("x-layout-collapsed-over");
this.collapsedEl.on("click",this[this.floatable?"collapseClick":"onExpandClick"],this)
}}}return this.collapsedEl
},onExpandClick:function(b){if(this.isSlid){this.panel.expand(false)
}else{this.panel.expand()
}},onCollapseClick:function(b){this.panel.collapse()
},beforeCollapse:function(g,e){this.lastAnim=e;
if(this.splitEl){this.splitEl.hide()
}this.getCollapsedEl().show();
var d=this.panel.getEl();
this.originalZIndex=d.getStyle("z-index");
d.setStyle("z-index",100);
this.isCollapsed=true;
this.layout.layout()
},onCollapse:function(b){this.panel.el.setStyle("z-index",1);
if(this.lastAnim===false||this.panel.animCollapse===false){this.getCollapsedEl().dom.style.visibility="visible"
}else{this.getCollapsedEl().slideIn(this.panel.slideAnchor,{duration:0.2})
}this.state.collapsed=true;
this.panel.saveState()
},beforeExpand:function(d){if(this.isSlid){this.afterSlideIn()
}var c=this.getCollapsedEl();
this.el.show();
if(this.position=="east"||this.position=="west"){this.panel.setSize(undefined,c.getHeight())
}else{this.panel.setSize(c.getWidth(),undefined)
}c.hide();
c.dom.style.visibility="hidden";
this.panel.el.setStyle("z-index",this.floatingZIndex)
},onExpand:function(){this.isCollapsed=false;
if(this.splitEl){this.splitEl.show()
}this.layout.layout();
this.panel.el.setStyle("z-index",this.originalZIndex);
this.state.collapsed=false;
this.panel.saveState()
},collapseClick:function(b){if(this.isSlid){b.stopPropagation();
this.slideIn()
}else{b.stopPropagation();
this.slideOut()
}},onHide:function(){if(this.isCollapsed){this.getCollapsedEl().hide()
}else{if(this.splitEl){this.splitEl.hide()
}}},onShow:function(){if(this.isCollapsed){this.getCollapsedEl().show()
}else{if(this.splitEl){this.splitEl.show()
}}},isVisible:function(){return !this.panel.hidden
},getMargins:function(){return this.isCollapsed&&this.cmargins?this.cmargins:this.margins
},getSize:function(){return this.isCollapsed?this.getCollapsedEl().getSize():this.panel.getSize()
},setPanel:function(b){this.panel=b
},getMinWidth:function(){return this.minWidth
},getMinHeight:function(){return this.minHeight
},applyLayoutCollapsed:function(d){var c=this.getCollapsedEl();
c.setLeftTop(d.x,d.y);
c.setSize(d.width,d.height)
},applyLayout:function(b){if(this.isCollapsed){this.applyLayoutCollapsed(b)
}else{this.panel.setPosition(b.x,b.y);
this.panel.setSize(b.width,b.height)
}},beforeSlide:function(){this.panel.beforeEffect()
},afterSlide:function(){this.panel.afterEffect()
},initAutoHide:function(){if(this.autoHide!==false){if(!this.autoHideHd){var b=new Ext.util.DelayedTask(this.slideIn,this);
this.autoHideHd={mouseout:function(a){if(!a.within(this.el,true)){b.delay(500)
}},mouseover:function(a){b.cancel()
},scope:this}
}this.el.on(this.autoHideHd);
this.collapsedEl.on(this.autoHideHd)
}},clearAutoHide:function(){if(this.autoHide!==false){this.el.un("mouseout",this.autoHideHd.mouseout);
this.el.un("mouseover",this.autoHideHd.mouseover);
this.collapsedEl.un("mouseout",this.autoHideHd.mouseout);
this.collapsedEl.un("mouseover",this.autoHideHd.mouseover)
}},clearMonitor:function(){Ext.getDoc().un("click",this.slideInIf,this)
},slideOut:function(){if(this.isSlid||this.el.hasActiveFx()){return
}this.isSlid=true;
var b=this.panel.tools;
if(b&&b.toggle){b.toggle.hide()
}this.el.show();
if(this.position=="east"||this.position=="west"){this.panel.setSize(undefined,this.collapsedEl.getHeight())
}else{this.panel.setSize(this.collapsedEl.getWidth(),undefined)
}this.restoreLT=[this.el.dom.style.left,this.el.dom.style.top];
this.el.alignTo(this.collapsedEl,this.getCollapseAnchor());
this.el.setStyle("z-index",this.floatingZIndex+2);
this.panel.el.replaceClass("x-panel-collapsed","x-panel-floating");
if(this.animFloat!==false){this.beforeSlide();
this.el.slideIn(this.getSlideAnchor(),{callback:function(){this.afterSlide();
this.initAutoHide();
Ext.getDoc().on("click",this.slideInIf,this)
},scope:this,block:true})
}else{this.initAutoHide();
Ext.getDoc().on("click",this.slideInIf,this)
}},afterSlideIn:function(){this.clearAutoHide();
this.isSlid=false;
this.clearMonitor();
this.el.setStyle("z-index","");
this.panel.el.replaceClass("x-panel-floating","x-panel-collapsed");
this.el.dom.style.left=this.restoreLT[0];
this.el.dom.style.top=this.restoreLT[1];
var b=this.panel.tools;
if(b&&b.toggle){b.toggle.show()
}},slideIn:function(b){if(!this.isSlid||this.el.hasActiveFx()){Ext.callback(b);
return
}this.isSlid=false;
if(this.animFloat!==false){this.beforeSlide();
this.el.slideOut(this.getSlideAnchor(),{callback:function(){this.el.hide();
this.afterSlide();
this.afterSlideIn();
Ext.callback(b)
},scope:this,block:true})
}else{this.el.hide();
this.afterSlideIn()
}},slideInIf:function(b){if(!b.within(this.el)){this.slideIn()
}},anchors:{west:"left",east:"right",north:"top",south:"bottom"},sanchors:{west:"l",east:"r",north:"t",south:"b"},canchors:{west:"tl-tr",east:"tr-tl",north:"tl-bl",south:"bl-tl"},getAnchor:function(){return this.anchors[this.position]
},getCollapseAnchor:function(){return this.canchors[this.position]
},getSlideAnchor:function(){return this.sanchors[this.position]
},getAlignAdj:function(){var b=this.cmargins;
switch(this.position){case"west":return[0,0];
break;
case"east":return[0,0];
break;
case"north":return[0,0];
break;
case"south":return[0,0];
break
}},getExpandAdj:function(){var c=this.collapsedEl,d=this.cmargins;
switch(this.position){case"west":return[-(d.right+c.getWidth()+d.left),0];
break;
case"east":return[d.right+c.getWidth()+d.left,0];
break;
case"north":return[0,-(d.top+d.bottom+c.getHeight())];
break;
case"south":return[0,d.top+d.bottom+c.getHeight()];
break
}},destroy:function(){Ext.destroy(this.miniCollapsedEl,this.collapsedEl)
}};
Ext.layout.BorderLayout.SplitRegion=function(d,e,g){Ext.layout.BorderLayout.SplitRegion.superclass.constructor.call(this,d,e,g);
this.applyLayout=this.applyFns[g]
};
Ext.extend(Ext.layout.BorderLayout.SplitRegion,Ext.layout.BorderLayout.Region,{splitTip:"Drag to resize.",collapsibleSplitTip:"Drag to resize. Double click to hide.",useSplitTips:false,splitSettings:{north:{orientation:Ext.SplitBar.VERTICAL,placement:Ext.SplitBar.TOP,maxFn:"getVMaxSize",minProp:"minHeight",maxProp:"maxHeight"},south:{orientation:Ext.SplitBar.VERTICAL,placement:Ext.SplitBar.BOTTOM,maxFn:"getVMaxSize",minProp:"minHeight",maxProp:"maxHeight"},east:{orientation:Ext.SplitBar.HORIZONTAL,placement:Ext.SplitBar.RIGHT,maxFn:"getHMaxSize",minProp:"minWidth",maxProp:"maxWidth"},west:{orientation:Ext.SplitBar.HORIZONTAL,placement:Ext.SplitBar.LEFT,maxFn:"getHMaxSize",minProp:"minWidth",maxProp:"maxWidth"}},applyFns:{west:function(j){if(this.isCollapsed){return this.applyLayoutCollapsed(j)
}var h=this.splitEl.dom,e=h.style;
this.panel.setPosition(j.x,j.y);
var g=h.offsetWidth;
e.left=(j.x+j.width-g)+"px";
e.top=(j.y)+"px";
e.height=Math.max(0,j.height)+"px";
this.panel.setSize(j.width-g,j.height)
},east:function(j){if(this.isCollapsed){return this.applyLayoutCollapsed(j)
}var h=this.splitEl.dom,e=h.style;
var g=h.offsetWidth;
this.panel.setPosition(j.x+g,j.y);
e.left=(j.x)+"px";
e.top=(j.y)+"px";
e.height=Math.max(0,j.height)+"px";
this.panel.setSize(j.width-g,j.height)
},north:function(j){if(this.isCollapsed){return this.applyLayoutCollapsed(j)
}var h=this.splitEl.dom,e=h.style;
var g=h.offsetHeight;
this.panel.setPosition(j.x,j.y);
e.left=(j.x)+"px";
e.top=(j.y+j.height-g)+"px";
e.width=Math.max(0,j.width)+"px";
this.panel.setSize(j.width,j.height-g)
},south:function(j){if(this.isCollapsed){return this.applyLayoutCollapsed(j)
}var h=this.splitEl.dom,e=h.style;
var g=h.offsetHeight;
this.panel.setPosition(j.x,j.y+g);
e.left=(j.x)+"px";
e.top=(j.y)+"px";
e.width=Math.max(0,j.width)+"px";
this.panel.setSize(j.width,j.height-g)
}},render:function(g,j){Ext.layout.BorderLayout.SplitRegion.superclass.render.call(this,g,j);
var h=this.position;
this.splitEl=g.createChild({cls:"x-layout-split x-layout-split-"+h,html:"&#160;",id:this.panel.id+"-xsplit"});
if(this.collapseMode=="mini"){this.miniSplitEl=this.splitEl.createChild({cls:"x-layout-mini x-layout-mini-"+h,html:"&#160;"});
this.miniSplitEl.addClassOnOver("x-layout-mini-over");
this.miniSplitEl.on("click",this.onCollapseClick,this,{stopEvent:true})
}var e=this.splitSettings[h];
this.split=new Ext.SplitBar(this.splitEl.dom,j.el,e.orientation);
this.split.tickSize=this.tickSize;
this.split.placement=e.placement;
this.split.getMaximumSize=this[e.maxFn].createDelegate(this);
this.split.minSize=this.minSize||this[e.minProp];
this.split.on("beforeapply",this.onSplitMove,this);
this.split.useShim=this.useShim===true;
this.maxSize=this.maxSize||this[e.maxProp];
if(j.hidden){this.splitEl.hide()
}if(this.useSplitTips){this.splitEl.dom.title=this.collapsible?this.collapsibleSplitTip:this.splitTip
}if(this.collapsible){this.splitEl.on("dblclick",this.onCollapseClick,this)
}},getSize:function(){if(this.isCollapsed){return this.collapsedEl.getSize()
}var b=this.panel.getSize();
if(this.position=="north"||this.position=="south"){b.height+=this.splitEl.dom.offsetHeight
}else{b.width+=this.splitEl.dom.offsetWidth
}return b
},getHMaxSize:function(){var c=this.maxSize||10000;
var d=this.layout.center;
return Math.min(c,(this.el.getWidth()+d.el.getWidth())-d.getMinWidth())
},getVMaxSize:function(){var c=this.maxSize||10000;
var d=this.layout.center;
return Math.min(c,(this.el.getHeight()+d.el.getHeight())-d.getMinHeight())
},onSplitMove:function(d,e){var g=this.panel.getSize();
this.lastSplitSize=e;
if(this.position=="north"||this.position=="south"){this.panel.setSize(g.width,e);
this.state.height=e
}else{this.panel.setSize(e,g.height);
this.state.width=e
}this.layout.layout();
this.panel.saveState();
return false
},getSplitBar:function(){return this.split
},destroy:function(){Ext.destroy(this.miniSplitEl,this.split,this.splitEl);
Ext.layout.BorderLayout.SplitRegion.superclass.destroy.call(this)
}});
Ext.Container.LAYOUTS.border=Ext.layout.BorderLayout;
Ext.layout.FormLayout=Ext.extend(Ext.layout.AnchorLayout,{labelSeparator:":",trackLabels:false,onRemove:function(g){Ext.layout.FormLayout.superclass.onRemove.call(this,g);
if(this.trackLabels){g.un("show",this.onFieldShow,this);
g.un("hide",this.onFieldHide,this)
}var c=g.getPositionEl(),e=g.getItemCt&&g.getItemCt();
if(g.rendered&&e){if(c&&c.dom){c.insertAfter(e)
}Ext.destroy(e);
Ext.destroyMembers(g,"label","itemCt");
if(g.customItemCt){Ext.destroyMembers(g,"getItemCt","customItemCt")
}}},setContainer:function(d){Ext.layout.FormLayout.superclass.setContainer.call(this,d);
if(d.labelAlign){d.addClass("x-form-label-"+d.labelAlign)
}if(d.hideLabels){Ext.apply(this,{labelStyle:"display:none",elementStyle:"padding-left:0;",labelAdjust:0})
}else{this.labelSeparator=d.labelSeparator||this.labelSeparator;
d.labelWidth=d.labelWidth||100;
if(Ext.isNumber(d.labelWidth)){var c=Ext.isNumber(d.labelPad)?d.labelPad:5;
Ext.apply(this,{labelAdjust:d.labelWidth+c,labelStyle:"width:"+d.labelWidth+"px;",elementStyle:"padding-left:"+(d.labelWidth+c)+"px"})
}if(d.labelAlign=="top"){Ext.apply(this,{labelStyle:"width:auto;",labelAdjust:0,elementStyle:"padding-left:0;"})
}}},isHide:function(b){return b.hideLabel||this.container.hideLabels
},onFieldShow:function(b){b.getItemCt().removeClass("x-hide-"+b.hideMode)
},onFieldHide:function(b){b.getItemCt().addClass("x-hide-"+b.hideMode)
},getLabelStyle:function(j){var g="",l=[this.labelStyle,j];
for(var k=0,h=l.length;
k<h;
++k){if(l[k]){g+=l[k];
if(g.substr(-1,1)!=";"){g+=";"
}}}return g
},renderItem:function(h,g,j){if(h&&(h.isFormField||h.fieldLabel)&&h.inputType!="hidden"){var c=this.getTemplateArgs(h);
if(Ext.isNumber(g)){g=j.dom.childNodes[g]||null
}if(g){h.itemCt=this.fieldTpl.insertBefore(g,c,true)
}else{h.itemCt=this.fieldTpl.append(j,c,true)
}if(!h.getItemCt){Ext.apply(h,{getItemCt:function(){return h.itemCt
},customItemCt:true})
}h.label=h.getItemCt().child("label.x-form-item-label");
if(!h.rendered){h.render("x-form-el-"+h.id)
}else{if(!this.isValidParent(h,j)){Ext.fly("x-form-el-"+h.id).appendChild(h.getPositionEl())
}}if(this.trackLabels){if(h.hidden){this.onFieldHide(h)
}h.on({scope:this,show:this.onFieldShow,hide:this.onFieldHide})
}this.configureItem(h)
}else{Ext.layout.FormLayout.superclass.renderItem.apply(this,arguments)
}},getTemplateArgs:function(c){var d=!c.fieldLabel||c.hideLabel;
return{id:c.id,label:c.fieldLabel,labelStyle:this.getLabelStyle(c.labelStyle),elementStyle:this.elementStyle||"",labelSeparator:d?"":(Ext.isDefined(c.labelSeparator)?c.labelSeparator:this.labelSeparator),itemCls:(c.itemCls||this.container.itemCls||"")+(c.hideLabel?" x-hide-label":""),clearCls:c.clearCls||"x-form-clear-left"}
},adjustWidthAnchor:function(e,g){if(g.label&&!this.isHide(g)&&(this.container.labelAlign!="top")){var c=Ext.isIE6||(Ext.isIE&&!Ext.isStrict);
return e-this.labelAdjust+(c?-3:0)
}return e
},adjustHeightAnchor:function(d,c){if(c.label&&!this.isHide(c)&&(this.container.labelAlign=="top")){return d-c.label.getHeight()
}return d
},isValidParent:function(c,d){return d&&this.container.getEl().contains(c.getPositionEl())
}});
Ext.Container.LAYOUTS.form=Ext.layout.FormLayout;
Ext.layout.AccordionLayout=Ext.extend(Ext.layout.FitLayout,{fill:true,autoWidth:true,titleCollapse:true,hideCollapseTool:false,collapseFirst:false,animate:false,sequence:false,activeOnTop:false,renderItem:function(b){if(this.animate===false){b.animCollapse=false
}b.collapsible=true;
if(this.autoWidth){b.autoWidth=true
}if(this.titleCollapse){b.titleCollapse=true
}if(this.hideCollapseTool){b.hideCollapseTool=true
}if(this.collapseFirst!==undefined){b.collapseFirst=this.collapseFirst
}if(!this.activeItem&&!b.collapsed){this.setActiveItem(b,true)
}else{if(this.activeItem&&this.activeItem!=b){b.collapsed=true
}}Ext.layout.AccordionLayout.superclass.renderItem.apply(this,arguments);
b.header.addClass("x-accordion-hd");
b.on("beforeexpand",this.beforeExpand,this)
},onRemove:function(b){Ext.layout.AccordionLayout.superclass.onRemove.call(this,b);
if(b.rendered){b.header.removeClass("x-accordion-hd")
}b.un("beforeexpand",this.beforeExpand,this)
},beforeExpand:function(g,d){var e=this.activeItem;
if(e){if(this.sequence){delete this.activeItem;
if(!e.collapsed){e.collapse({callback:function(){g.expand(d||true)
},scope:this});
return false
}}else{e.collapse(this.animate)
}}this.setActive(g);
if(this.activeOnTop){g.el.dom.parentNode.insertBefore(g.el.dom,g.el.dom.parentNode.firstChild)
}this.layout()
},setItemSize:function(g,d){if(this.fill&&g){var e=0;
this.container.items.each(function(a){if(a!=g){e+=a.header.getHeight()
}});
d.height-=e;
g.setSize(d)
}},setActiveItem:function(b){this.setActive(b,true)
},setActive:function(g,d){var e=this.activeItem;
g=this.container.getComponent(g);
if(e!=g){if(g.rendered&&g.collapsed&&d){g.expand()
}else{if(e){e.fireEvent("deactivate",e)
}this.activeItem=g;
g.fireEvent("activate",g)
}}}});
Ext.Container.LAYOUTS.accordion=Ext.layout.AccordionLayout;
Ext.layout.Accordion=Ext.layout.AccordionLayout;
Ext.layout.TableLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:false,targetCls:"x-table-layout-ct",tableAttrs:null,setContainer:function(b){Ext.layout.TableLayout.superclass.setContainer.call(this,b);
this.currentRow=0;
this.currentColumn=0;
this.cells=[]
},onLayout:function(n,l){var m=n.items.items,j=m.length,k,c;
if(!this.table){this.table=l.createChild(Ext.apply({tag:"table",cls:"x-table-layout",cellspacing:0,cn:{tag:"tbody"}},this.tableAttrs),null,true)
}this.renderAll(n,l)
},getRow:function(d){var c=this.table.tBodies[0].childNodes[d];
if(!c){c=document.createElement("tr");
this.table.tBodies[0].appendChild(c)
}return c
},getNextCell:function(m){var l=this.getNextNonSpan(this.currentColumn,this.currentRow);
var p=this.currentColumn=l[0],q=this.currentRow=l[1];
for(var n=q;
n<q+(m.rowspan||1);
n++){if(!this.cells[n]){this.cells[n]=[]
}for(var r=p;
r<p+(m.colspan||1);
r++){this.cells[n][r]=true
}}var o=document.createElement("td");
if(m.cellId){o.id=m.cellId
}var c="x-table-layout-cell";
if(m.cellCls){c+=" "+m.cellCls
}o.className=c;
if(m.colspan){o.colSpan=m.colspan
}if(m.rowspan){o.rowSpan=m.rowspan
}this.getRow(q).appendChild(o);
return o
},getNextNonSpan:function(e,g){var d=this.columns;
while((d&&e>=d)||(this.cells[g]&&this.cells[g][e])){if(d&&e>=d){g++;
e=0
}else{e++
}}return[e,g]
},renderItem:function(h,g,j){if(h&&!h.rendered){h.render(this.getNextCell(h));
this.configureItem(h,g)
}else{if(h&&!this.isValidParent(h,j)){var c=this.getNextCell(h);
c.insertBefore(h.getPositionEl().dom,null);
h.container=Ext.get(c);
this.configureItem(h,g)
}}},isValidParent:function(c,d){return c.getPositionEl().up("table",5).dom.parentNode===(d.dom||d)
}});
Ext.Container.LAYOUTS.table=Ext.layout.TableLayout;
Ext.layout.AbsoluteLayout=Ext.extend(Ext.layout.AnchorLayout,{extraCls:"x-abs-layout-item",onLayout:function(d,c){c.position();
this.paddingLeft=c.getPadding("l");
this.paddingTop=c.getPadding("t");
Ext.layout.AbsoluteLayout.superclass.onLayout.call(this,d,c)
},adjustWidthAnchor:function(c,d){return c?c-d.getPosition(true)[0]+this.paddingLeft:c
},adjustHeightAnchor:function(c,d){return c?c-d.getPosition(true)[1]+this.paddingTop:c
}});
Ext.Container.LAYOUTS.absolute=Ext.layout.AbsoluteLayout;
Ext.layout.BoxLayout=Ext.extend(Ext.layout.ContainerLayout,{defaultMargins:{left:0,top:0,right:0,bottom:0},padding:"0",pack:"start",monitorResize:true,scrollOffset:0,extraCls:"x-box-item",targetCls:"x-box-layout-ct",innerCls:"x-box-inner",constructor:function(b){Ext.layout.BoxLayout.superclass.constructor.call(this,b);
if(Ext.isString(this.defaultMargins)){this.defaultMargins=this.parseMargins(this.defaultMargins)
}},isValidParent:function(c,d){return c.getPositionEl().dom.parentNode==this.innerCt.dom
},onLayout:function(q,n){var p=q.items.items,c=p.length,m,r,o=c-1,l;
if(!this.innerCt){this.innerCt=n.createChild({cls:this.innerCls});
this.padding=this.parseMargins(this.padding)
}this.renderAll(q,this.innerCt)
},renderItem:function(b){if(Ext.isString(b.margins)){b.margins=this.parseMargins(b.margins)
}else{if(!b.margins){b.margins=this.defaultMargins
}}Ext.layout.BoxLayout.superclass.renderItem.apply(this,arguments)
},getTargetSize:function(b){return(Ext.isIE6&&Ext.isStrict&&b.dom==document.body)?b.getStyleSize():b.getViewSize(true)
},getItems:function(c){var d=[];
c.items.each(function(a){if(a.isVisible()){d.push(a)
}});
return d
}});
Ext.layout.VBoxLayout=Ext.extend(Ext.layout.BoxLayout,{align:"left",onLayout:function(af,c){Ext.layout.VBoxLayout.superclass.onLayout.call(this,af,c);
var ae=this.getItems(af),ab,V,t,aa,Q,X,h=c.getViewSize(true),Z=h.width,T=h.height-this.scrollOffset,Y=this.padding.left,S=this.padding.top,ac=this.pack=="start",N=Z-(this.padding.left+this.padding.right),O=0,P=0,W=0,L=0,ag=0,w=0,R=[],U=[],M,ad=ae.length;
for(i=0;
i<ad;
i++){M=ae[i];
ab=M.margins;
t=ab.top+ab.bottom;
P=Math.max(P,M.getWidth()+ab.left+ab.right)
}var aj=P+this.padding.left+this.padding.right;
switch(this.align){case"stretch":this.innerCt.setSize(Z,T);
break;
case"stretchmax":case"left":this.innerCt.setSize(aj,T);
break;
case"center":this.innerCt.setSize(Z=Math.max(Z,aj),T);
break
}var ai=Math.max(0,Z-this.padding.left-this.padding.right);
for(i=0;
i<ad;
i++){M=ae[i];
ab=M.margins;
if(this.align=="stretch"){M.setWidth((N-(ab.left+ab.right)).constrain(M.minWidth||0,M.maxWidth||1000000))
}else{if(this.align=="stretchmax"){M.setWidth((P-(ab.left+ab.right)).constrain(M.minWidth||0,M.maxWidth||1000000))
}else{if(ac&&M.flex){M.setWidth()
}}}}for(i=0;
i<ad;
i++){M=ae[i];
ab=M.margins;
W+=M.flex||0;
V=M.getHeight();
t=ab.top+ab.bottom;
O+=V+t;
L+=t+(M.flex?0:V)
}O=T-O-this.padding.top-this.padding.bottom;
var ah=Math.max(0,T-this.padding.top-this.padding.bottom-L),l=ah;
for(i=0;
i<ad;
i++){M=ae[i];
if(ac&&M.flex){V=Math.floor(ah*(M.flex/W));
l-=V;
R.push(V)
}}if(this.pack=="center"){S+=O?O/2:0
}else{if(this.pack=="end"){S+=O
}}w=0;
for(i=0;
i<ad;
i++){M=ae[i];
ab=M.margins;
S+=ab.top;
X=ai;
aa=Y+ab.left;
if(this.align=="center"){if((Q=ai-(M.getWidth()+ab.left+ab.right))>0){aa+=(Q/2);
X-=Q
}}M.setPosition(aa,S);
if(ac&&M.flex){V=Math.max(0,R[w++]+(l-->0?1:0));
M.setSize(X,V)
}else{V=M.getHeight()
}S+=V+ab.bottom
}}});
Ext.Container.LAYOUTS.vbox=Ext.layout.VBoxLayout;
Ext.layout.HBoxLayout=Ext.extend(Ext.layout.BoxLayout,{align:"top",onLayout:function(ac,w){Ext.layout.HBoxLayout.superclass.onLayout.call(this,ac,w);
var ab=this.getItems(ac),Y,ad,L,U,Q,J=w.getViewSize(true),W=J.width-this.scrollOffset,M=J.height,l=this.padding.left,S=this.padding.top,Z=this.pack=="start",P=["stretch","stretchmax"].indexOf(this.align)==-1,V=M-(this.padding.top+this.padding.bottom),K=0,t=0,h=0,ae=0,aa=0;
Ext.each(ab,function(a){Y=a.margins;
h+=a.flex||0;
ad=a.getWidth();
L=Y.left+Y.right;
K+=ad+L;
ae+=L+(a.flex?0:ad);
t=Math.max(t,a.getHeight()+Y.top+Y.bottom)
});
K=W-K-this.padding.left-this.padding.right;
var R=t+this.padding.top+this.padding.bottom;
switch(this.align){case"stretch":this.innerCt.setSize(W,M);
break;
case"stretchmax":case"top":this.innerCt.setSize(W,R);
break;
case"middle":this.innerCt.setSize(W,M=Math.max(M,R));
break
}var T=Math.max(0,W-this.padding.left-this.padding.right-ae),I=T,X=[],O=[],N=0,af=Math.max(0,M-this.padding.top-this.padding.bottom);
Ext.each(ab,function(a){if(Z&&a.flex){ad=Math.floor(T*(a.flex/h));
I-=ad;
X.push(ad)
}});
if(this.pack=="center"){l+=K?K/2:0
}else{if(this.pack=="end"){l+=K
}}Ext.each(ab,function(a){Y=a.margins;
l+=Y.left;
a.setPosition(l,S+Y.top);
if(Z&&a.flex){ad=Math.max(0,X[N++]+(I-->0?1:0));
if(P){O.push(a.getHeight())
}a.setSize(ad,af)
}else{ad=a.getWidth()
}l+=ad+Y.right
});
N=0;
Ext.each(ab,function(a){Y=a.margins;
U=a.getHeight();
if(Z&&a.flex){U=O[N++]
}if(this.align=="stretch"){a.setHeight((V-(Y.top+Y.bottom)).constrain(a.minHeight||0,a.maxHeight||1000000))
}else{if(this.align=="stretchmax"){a.setHeight((t-(Y.top+Y.bottom)).constrain(a.minHeight||0,a.maxHeight||1000000))
}else{if(this.align=="middle"){Q=af-(U+Y.top+Y.bottom);
U=S+Y.top+(Q/2);
if(Q>0){a.setPosition(a.x,U)
}}if(Z&&a.flex){a.setHeight(U)
}}}},this)
}});
Ext.Container.LAYOUTS.hbox=Ext.layout.HBoxLayout;
Ext.Viewport=Ext.extend(Ext.Container,{initComponent:function(){Ext.Viewport.superclass.initComponent.call(this);
document.getElementsByTagName("html")[0].className+=" x-viewport";
this.el=Ext.getBody();
this.el.setHeight=Ext.emptyFn;
this.el.setWidth=Ext.emptyFn;
this.el.setSize=Ext.emptyFn;
this.el.dom.scroll="no";
this.allowDomMove=false;
this.autoWidth=true;
this.autoHeight=true;
Ext.EventManager.onWindowResize(this.fireResize,this);
this.renderTo=this.el
},fireResize:function(d,c){this.onResize(d,c,d,c)
}});
Ext.reg("viewport",Ext.Viewport);
Ext.Panel=Ext.extend(Ext.Container,{baseCls:"x-panel",collapsedCls:"x-panel-collapsed",maskDisabled:true,animCollapse:Ext.enableFx,headerAsText:true,buttonAlign:"right",collapsed:false,collapseFirst:true,minButtonWidth:75,elements:"body",preventBodyReset:false,padding:undefined,resizeEvent:"bodyresize",toolTarget:"header",collapseEl:"bwrap",slideAnchor:"t",disabledClass:"",deferHeight:true,expandDefaults:{duration:0.25},collapseDefaults:{duration:0.25},initComponent:function(){Ext.Panel.superclass.initComponent.call(this);
this.addEvents("bodyresize","titlechange","iconchange","collapse","expand","beforecollapse","beforeexpand","beforeclose","close","activate","deactivate");
if(this.unstyled){this.baseCls="x-plain"
}this.toolbars=[];
if(this.tbar){this.elements+=",tbar";
this.topToolbar=this.createToolbar(this.tbar);
delete this.tbar
}if(this.bbar){this.elements+=",bbar";
this.bottomToolbar=this.createToolbar(this.bbar);
delete this.bbar
}if(this.header===true){this.elements+=",header";
delete this.header
}else{if(this.headerCfg||(this.title&&this.header!==false)){this.elements+=",header"
}}if(this.footerCfg||this.footer===true){this.elements+=",footer";
delete this.footer
}if(this.buttons){this.fbar=this.buttons;
delete this.buttons
}if(this.fbar){this.createFbar(this.fbar)
}if(this.autoLoad){this.on("render",this.doAutoLoad,this,{delay:10})
}},createFbar:function(c){var d=this.minButtonWidth;
this.elements+=",footer";
this.fbar=this.createToolbar(c,{buttonAlign:this.buttonAlign,toolbarCls:"x-panel-fbar",enableOverflow:false,defaults:function(a){return{minWidth:a.minWidth||d}
}});
this.fbar.items.each(function(a){a.minWidth=a.minWidth||this.minButtonWidth
},this);
this.buttons=this.fbar.items.items
},createToolbar:function(d,g){var e;
if(Ext.isArray(d)){d={items:d}
}e=d.events?Ext.apply(d,g):this.createComponent(Ext.apply({},d,g),"toolbar");
e.ownerCt=this;
e.bufferResize=false;
this.toolbars.push(e);
return e
},createElement:function(e,g){if(this[e]){g.appendChild(this[e].dom);
return
}if(e==="bwrap"||this.elements.indexOf(e)!=-1){if(this[e+"Cfg"]){this[e]=Ext.fly(g).createChild(this[e+"Cfg"])
}else{var d=document.createElement("div");
d.className=this[e+"Cls"];
this[e]=Ext.get(g.appendChild(d))
}if(this[e+"CssClass"]){this[e].addClass(this[e+"CssClass"])
}if(this[e+"Style"]){this[e].applyStyles(this[e+"Style"])
}}},onRender:function(r,s){Ext.Panel.superclass.onRender.call(this,r,s);
this.createClasses();
var v=this.el,q=v.dom,n,p;
if(this.collapsible&&!this.hideCollapseTool){this.tools=this.tools?this.tools.slice(0):[];
this.tools[this.collapseFirst?"unshift":"push"]({id:"toggle",handler:this.toggleCollapse,scope:this})
}if(this.tools){p=this.tools;
this.elements+=(this.header!==false)?",header":""
}this.tools={};
v.addClass(this.baseCls);
if(q.firstChild){this.header=v.down("."+this.headerCls);
this.bwrap=v.down("."+this.bwrapCls);
var o=this.bwrap?this.bwrap:v;
this.tbar=o.down("."+this.tbarCls);
this.body=o.down("."+this.bodyCls);
this.bbar=o.down("."+this.bbarCls);
this.footer=o.down("."+this.footerCls);
this.fromMarkup=true
}if(this.preventBodyReset===true){v.addClass("x-panel-reset")
}if(this.cls){v.addClass(this.cls)
}if(this.buttons){this.elements+=",footer"
}if(this.frame){v.insertHtml("afterBegin",String.format(Ext.Element.boxMarkup,this.baseCls));
this.createElement("header",q.firstChild.firstChild.firstChild);
this.createElement("bwrap",q);
n=this.bwrap.dom;
var t=q.childNodes[1],u=q.childNodes[2];
n.appendChild(t);
n.appendChild(u);
var d=n.firstChild.firstChild.firstChild;
this.createElement("tbar",d);
this.createElement("body",d);
this.createElement("bbar",d);
this.createElement("footer",n.lastChild.firstChild.firstChild);
if(!this.footer){this.bwrap.dom.lastChild.className+=" x-panel-nofooter"
}this.ft=Ext.get(this.bwrap.dom.lastChild);
this.mc=Ext.get(d)
}else{this.createElement("header",q);
this.createElement("bwrap",q);
n=this.bwrap.dom;
this.createElement("tbar",n);
this.createElement("body",n);
this.createElement("bbar",n);
this.createElement("footer",n);
if(!this.header){this.body.addClass(this.bodyCls+"-noheader");
if(this.tbar){this.tbar.addClass(this.tbarCls+"-noheader")
}}}if(Ext.isDefined(this.padding)){this.body.setStyle("padding",this.body.addUnits(this.padding))
}if(this.border===false){this.el.addClass(this.baseCls+"-noborder");
this.body.addClass(this.bodyCls+"-noborder");
if(this.header){this.header.addClass(this.headerCls+"-noborder")
}if(this.footer){this.footer.addClass(this.footerCls+"-noborder")
}if(this.tbar){this.tbar.addClass(this.tbarCls+"-noborder")
}if(this.bbar){this.bbar.addClass(this.bbarCls+"-noborder")
}}if(this.bodyBorder===false){this.body.addClass(this.bodyCls+"-noborder")
}this.bwrap.enableDisplayMode("block");
if(this.header){this.header.unselectable();
if(this.headerAsText){this.header.dom.innerHTML='<span class="'+this.headerTextCls+'">'+this.header.dom.innerHTML+"</span>";
if(this.iconCls){this.setIconClass(this.iconCls)
}}}if(this.floating){this.makeFloating(this.floating)
}if(this.collapsible&&this.titleCollapse&&this.header){this.mon(this.header,"click",this.toggleCollapse,this);
this.header.setStyle("cursor","pointer")
}if(p){this.addTool.apply(this,p)
}if(this.fbar){this.footer.addClass("x-panel-btns");
this.fbar.render(this.footer);
this.footer.createChild({cls:"x-clear"})
}if(this.tbar&&this.topToolbar){this.topToolbar.render(this.tbar)
}if(this.bbar&&this.bottomToolbar){this.bottomToolbar.render(this.bbar)
}},setIconClass:function(e){var g=this.iconCls;
this.iconCls=e;
if(this.rendered&&this.header){if(this.frame){this.header.addClass("x-panel-icon");
this.header.replaceClass(g,this.iconCls)
}else{var h=this.header,j=h.child("img.x-panel-inline-icon");
if(j){Ext.fly(j).replaceClass(g,this.iconCls)
}else{Ext.DomHelper.insertBefore(h.dom.firstChild,{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-panel-inline-icon "+this.iconCls})
}}}this.fireEvent("iconchange",this,e,g)
},makeFloating:function(b){this.floating=true;
this.el=new Ext.Layer(Ext.apply({},b,{shadow:Ext.isDefined(this.shadow)?this.shadow:"sides",shadowOffset:this.shadowOffset,constrain:false,shim:this.shim===false?false:undefined}),this.el)
},getTopToolbar:function(){return this.topToolbar
},getBottomToolbar:function(){return this.bottomToolbar
},addButton:function(e,g,d){if(!this.fbar){this.createFbar([])
}if(g){if(Ext.isString(e)){e={text:e}
}e=Ext.apply({handler:g,scope:d},e)
}return this.fbar.add(e)
},addTool:function(){if(!this.rendered){if(!this.tools){this.tools=[]
}Ext.each(arguments,function(b){this.tools.push(b)
},this);
return
}if(!this[this.toolTarget]){return
}if(!this.toolTemplate){var l=new Ext.Template('<div class="x-tool x-tool-{id}">&#160;</div>');
l.disableFormats=true;
l.compile();
Ext.Panel.prototype.toolTemplate=l
}for(var m=0,o=arguments,p=o.length;
m<p;
m++){var a=o[m];
if(!this.tools[a.id]){var k="x-tool-"+a.id+"-over";
var n=this.toolTemplate.insertFirst((a.align!=="left")?this[this.toolTarget]:this[this.toolTarget].child("span"),a,true);
this.tools[a.id]=n;
n.enableDisplayMode("block");
this.mon(n,"click",this.createToolHandler(n,a,k,this));
if(a.on){this.mon(n,a.on)
}if(a.hidden){n.hide()
}if(a.qtip){if(Ext.isObject(a.qtip)){Ext.QuickTips.register(Ext.apply({target:n.id},a.qtip))
}else{n.dom.qtip=a.qtip
}}n.addClassOnOver(k)
}}},onLayout:function(c,d){if(this.hasLayout&&this.toolbars.length>0){Ext.each(this.toolbars,function(a){a.doLayout(undefined,d)
});
this.syncHeight()
}},syncHeight:function(){var e=this.toolbarHeight,j=this.body,g=this.lastSize.height,h;
if(this.autoHeight||!Ext.isDefined(g)||g=="auto"){return
}if(e!=this.getToolbarHeight()){e=Math.max(0,this.adjustBodyHeight(g-this.getFrameHeight()));
j.setHeight(e);
h=j.getSize();
this.toolbarHeight=this.getToolbarHeight();
this.onBodyResize(h.width,h.height)
}},onShow:function(){if(this.floating){return this.el.show()
}Ext.Panel.superclass.onShow.call(this)
},onHide:function(){if(this.floating){return this.el.hide()
}Ext.Panel.superclass.onHide.call(this)
},createToolHandler:function(j,g,h,e){return function(a){j.removeClass(h);
if(g.stopEvent!==false){a.stopEvent()
}if(g.handler){g.handler.call(g.scope||j,a,j,e,g)
}}
},afterRender:function(){if(this.floating&&!this.hidden){this.el.show()
}if(this.title){this.setTitle(this.title)
}if(this.collapsed){this.collapsed=false;
this.collapse(false)
}Ext.Panel.superclass.afterRender.call(this);
this.initEvents()
},getKeyMap:function(){if(!this.keyMap){this.keyMap=new Ext.KeyMap(this.el,this.keys)
}return this.keyMap
},initEvents:function(){if(this.keys){this.getKeyMap()
}if(this.draggable){this.initDraggable()
}if(this.toolbars.length>0){Ext.each(this.toolbars,function(b){b.doLayout();
b.on({scope:this,afterlayout:this.syncHeight,remove:this.syncHeight})
},this);
if(!this.ownerCt){this.syncHeight()
}}},initDraggable:function(){this.dd=new Ext.Panel.DD(this,Ext.isBoolean(this.draggable)?null:this.draggable)
},beforeEffect:function(b){if(this.floating){this.el.beforeAction()
}if(b!==false){this.el.addClass("x-panel-animated")
}},afterEffect:function(b){this.syncShadow();
if(b!==false){this.el.removeClass("x-panel-animated")
}},createEffect:function(j,a,h){var g={scope:h,block:true};
if(j===true){g.callback=a;
return g
}else{if(!j.callback){g.callback=a
}else{g.callback=function(){a.call(h);
Ext.callback(j.callback,j.scope)
}
}}return Ext.applyIf(g,j)
},collapse:function(c){if(this.collapsed||this.el.hasFxBlock()||this.fireEvent("beforecollapse",this,c)===false){return
}var d=c===true||(c!==false&&this.animCollapse);
this.beforeEffect(d);
this.onCollapse(d,c);
return this
},onCollapse:function(d,c){if(d){this[this.collapseEl].slideOut(this.slideAnchor,Ext.apply(this.createEffect(c||true,this.afterCollapse,this),this.collapseDefaults))
}else{this[this.collapseEl].hide();
this.afterCollapse(false)
}},afterCollapse:function(b){this.collapsed=true;
this.el.addClass(this.collapsedCls);
this.afterEffect(b);
this.fireEvent("collapse",this)
},expand:function(c){if(!this.collapsed||this.el.hasFxBlock()||this.fireEvent("beforeexpand",this,c)===false){return
}var d=c===true||(c!==false&&this.animCollapse);
this.el.removeClass(this.collapsedCls);
this.beforeEffect(d);
this.onExpand(d,c);
return this
},onExpand:function(d,c){if(d){this[this.collapseEl].slideIn(this.slideAnchor,Ext.apply(this.createEffect(c||true,this.afterExpand,this),this.expandDefaults))
}else{this[this.collapseEl].show();
this.afterExpand(false)
}},afterExpand:function(b){this.collapsed=false;
this.afterEffect(b);
if(Ext.isDefined(this.deferLayout)){this.doLayout(true)
}this.fireEvent("expand",this)
},toggleCollapse:function(b){this[this.collapsed?"expand":"collapse"](b);
return this
},onDisable:function(){if(this.rendered&&this.maskDisabled){this.el.mask()
}Ext.Panel.superclass.onDisable.call(this)
},onEnable:function(){if(this.rendered&&this.maskDisabled){this.el.unmask()
}Ext.Panel.superclass.onEnable.call(this)
},onResize:function(d,c){if(Ext.isDefined(d)||Ext.isDefined(c)){if(!this.collapsed){if(Ext.isNumber(d)){this.body.setWidth(d=this.adjustBodyWidth(d-this.getFrameWidth()))
}else{if(d=="auto"){d=this.body.setWidth("auto").dom.offsetWidth
}else{d=this.body.dom.offsetWidth
}}if(this.tbar){this.tbar.setWidth(d);
if(this.topToolbar){this.topToolbar.setSize(d)
}}if(this.bbar){this.bbar.setWidth(d);
if(this.bottomToolbar){this.bottomToolbar.setSize(d);
if(Ext.isIE){this.bbar.setStyle("position","static");
this.bbar.setStyle("position","")
}}}if(this.footer){this.footer.setWidth(d);
if(this.fbar){this.fbar.setSize(Ext.isIE?(d-this.footer.getFrameWidth("lr")):"auto")
}}if(Ext.isNumber(c)){c=Math.max(0,this.adjustBodyHeight(c-this.getFrameHeight()));
this.body.setHeight(c)
}else{if(c=="auto"){this.body.setHeight(c)
}}if(this.disabled&&this.el._mask){this.el._mask.setSize(this.el.dom.clientWidth,this.el.getHeight())
}}else{this.queuedBodySize={width:d,height:c};
if(!this.queuedExpand&&this.allowQueuedExpand!==false){this.queuedExpand=true;
this.on("expand",function(){delete this.queuedExpand;
this.onResize(this.queuedBodySize.width,this.queuedBodySize.height)
},this,{single:true})
}}this.onBodyResize(d,c)
}this.syncShadow();
Ext.Panel.superclass.onResize.call(this)
},onBodyResize:function(d,c){this.fireEvent("bodyresize",this,d,c)
},getToolbarHeight:function(){var b=0;
if(this.rendered){Ext.each(this.toolbars,function(a){b+=a.getHeight()
},this)
}return b
},adjustBodyHeight:function(b){return b
},adjustBodyWidth:function(b){return b
},onPosition:function(){this.syncShadow()
},getFrameWidth:function(){var c=this.el.getFrameWidth("lr")+this.bwrap.getFrameWidth("lr");
if(this.frame){var d=this.bwrap.dom.firstChild;
c+=(Ext.fly(d).getFrameWidth("l")+Ext.fly(d.firstChild).getFrameWidth("r"));
c+=this.mc.getFrameWidth("lr")
}return c
},getFrameHeight:function(){var b=this.el.getFrameWidth("tb")+this.bwrap.getFrameWidth("tb");
b+=(this.tbar?this.tbar.getHeight():0)+(this.bbar?this.bbar.getHeight():0);
if(this.frame){b+=this.el.dom.firstChild.offsetHeight+this.ft.dom.offsetHeight+this.mc.getFrameWidth("tb")
}else{b+=(this.header?this.header.getHeight():0)+(this.footer?this.footer.getHeight():0)
}return b
},getInnerWidth:function(){return this.getSize().width-this.getFrameWidth()
},getInnerHeight:function(){return this.getSize().height-this.getFrameHeight()
},syncShadow:function(){if(this.floating){this.el.sync(true)
}},getLayoutTarget:function(){return this.body
},getContentTarget:function(){return this.body
},setTitle:function(c,d){this.title=c;
if(this.header&&this.headerAsText){this.header.child("span").update(c)
}if(d){this.setIconClass(d)
}this.fireEvent("titlechange",this,c);
return this
},getUpdater:function(){return this.body.getUpdater()
},load:function(){var b=this.body.getUpdater();
b.update.apply(b,arguments);
return this
},beforeDestroy:function(){Ext.Panel.superclass.beforeDestroy.call(this);
if(this.header){this.header.removeAllListeners()
}if(this.tools){for(var b in this.tools){Ext.destroy(this.tools[b])
}}if(Ext.isArray(this.buttons)){while(this.buttons.length){Ext.destroy(this.buttons[0])
}}if(this.rendered){Ext.destroy(this.ft,this.header,this.footer,this.toolbars,this.tbar,this.bbar,this.body,this.mc,this.bwrap);
if(this.fbar){Ext.destroy(this.fbar,this.fbar.el)
}}else{Ext.destroy(this.topToolbar,this.bottomToolbar)
}},createClasses:function(){this.headerCls=this.baseCls+"-header";
this.headerTextCls=this.baseCls+"-header-text";
this.bwrapCls=this.baseCls+"-bwrap";
this.tbarCls=this.baseCls+"-tbar";
this.bodyCls=this.baseCls+"-body";
this.bbarCls=this.baseCls+"-bbar";
this.footerCls=this.baseCls+"-footer"
},createGhost:function(h,j,g){var k=document.createElement("div");
k.className="x-panel-ghost "+(h?h:"");
if(this.header){k.appendChild(this.el.dom.firstChild.cloneNode(true))
}Ext.fly(k.appendChild(document.createElement("ul"))).setHeight(this.bwrap.getHeight());
k.style.width=this.el.dom.offsetWidth+"px";
if(!g){this.container.dom.appendChild(k)
}else{Ext.getDom(g).appendChild(k)
}if(j!==false&&this.el.useShim!==false){var l=new Ext.Layer({shadow:false,useDisplay:true,constrain:false},k);
l.show();
return l
}else{return new Ext.Element(k)
}},doAutoLoad:function(){var b=this.body.getUpdater();
if(this.renderer){b.setRenderer(this.renderer)
}b.update(Ext.isObject(this.autoLoad)?this.autoLoad:{url:this.autoLoad})
},getTool:function(b){return this.tools[b]
}});
Ext.reg("panel",Ext.Panel);
Ext.Editor=function(c,d){if(c.field){this.field=Ext.create(c.field,"textfield");
d=Ext.apply({},c);
delete d.field
}else{this.field=c
}Ext.Editor.superclass.constructor.call(this,d)
};
Ext.extend(Ext.Editor,Ext.Component,{value:"",alignment:"c-c?",offsets:[0,0],shadow:"frame",constrain:false,swallowKeys:true,completeOnEnter:true,cancelOnEsc:true,updateEl:false,initComponent:function(){Ext.Editor.superclass.initComponent.call(this);
this.addEvents("beforestartedit","startedit","beforecomplete","complete","canceledit","specialkey")
},onRender:function(c,d){this.el=new Ext.Layer({shadow:this.shadow,cls:"x-editor",parentEl:c,shim:this.shim,shadowOffset:this.shadowOffset||4,id:this.id,constrain:this.constrain});
if(this.zIndex){this.el.setZIndex(this.zIndex)
}this.el.setStyle("overflow",Ext.isGecko?"auto":"hidden");
if(this.field.msgTarget!="title"){this.field.msgTarget="qtip"
}this.field.inEditor=true;
this.mon(this.field,{scope:this,blur:this.onBlur,specialkey:this.onSpecialKey});
if(this.field.grow){this.mon(this.field,"autosize",this.el.sync,this.el,{delay:1})
}this.field.render(this.el).show();
this.field.getEl().dom.name="";
if(this.swallowKeys){this.field.el.swallowEvent(["keypress","keydown"])
}},onSpecialKey:function(j,k){var e=k.getKey(),h=this.completeOnEnter&&e==k.ENTER,l=this.cancelOnEsc&&e==k.ESC;
if(h||l){k.stopEvent();
if(h){this.completeEdit()
}else{this.cancelEdit()
}if(j.triggerBlur){j.triggerBlur()
}}this.fireEvent("specialkey",j,k)
},startEdit:function(d,g){if(this.editing){this.completeEdit()
}this.boundEl=Ext.get(d);
var e=g!==undefined?g:this.boundEl.dom.innerHTML;
if(!this.rendered){this.render(this.parentEl||document.body)
}if(this.fireEvent("beforestartedit",this,this.boundEl,e)!==false){this.startValue=e;
this.field.reset();
this.field.setValue(e);
this.realign(true);
this.editing=true;
this.show()
}},doAutoSize:function(){if(this.autoSize){var c=this.boundEl.getSize(),d=this.field.getSize();
switch(this.autoSize){case"width":this.setSize(c.width,d.height);
break;
case"height":this.setSize(d.width,c.height);
break;
case"none":this.setSize(d.width,d.height);
break;
default:this.setSize(c.width,c.height)
}}},setSize:function(d,c){delete this.field.lastSize;
this.field.setSize(d,c);
if(this.el){if(Ext.isGecko2||Ext.isOpera){this.el.setSize(d,c)
}this.el.sync()
}},realign:function(b){if(b===true){this.doAutoSize()
}this.el.alignTo(this.boundEl,this.alignment,this.offsets)
},completeEdit:function(d){if(!this.editing){return
}var c=this.getValue();
if(!this.field.isValid()){if(this.revertInvalid!==false){this.cancelEdit(d)
}return
}if(String(c)===String(this.startValue)&&this.ignoreNoChange){this.hideEdit(d);
return
}if(this.fireEvent("beforecomplete",this,c,this.startValue)!==false){c=this.getValue();
if(this.updateEl&&this.boundEl){this.boundEl.update(c)
}this.hideEdit(d);
this.fireEvent("complete",this,c,this.startValue)
}},onShow:function(){this.el.show();
if(this.hideEl!==false){this.boundEl.hide()
}this.field.show().focus(false,true);
this.fireEvent("startedit",this.boundEl,this.startValue)
},cancelEdit:function(d){if(this.editing){var c=this.getValue();
this.setValue(this.startValue);
this.hideEdit(d);
this.fireEvent("canceledit",this,c,this.startValue)
}},hideEdit:function(b){if(b!==true){this.editing=false;
this.hide()
}},onBlur:function(){if(this.allowBlur!==true&&this.editing){this.completeEdit()
}},onHide:function(){if(this.editing){this.completeEdit();
return
}this.field.blur();
if(this.field.collapse){this.field.collapse()
}this.el.hide();
if(this.hideEl!==false){this.boundEl.show()
}},setValue:function(b){this.field.setValue(b)
},getValue:function(){return this.field.getValue()
},beforeDestroy:function(){Ext.destroyMembers(this,"field");
delete this.parentEl;
delete this.boundEl
}});
Ext.reg("editor",Ext.Editor);
Ext.ColorPalette=Ext.extend(Ext.Component,{itemCls:"x-color-palette",value:null,clickEvent:"click",ctype:"Ext.ColorPalette",allowReselect:false,colors:["000000","993300","333300","003300","003366","000080","333399","333333","800000","FF6600","808000","008000","008080","0000FF","666699","808080","FF0000","FF9900","99CC00","339966","33CCCC","3366FF","800080","969696","FF00FF","FFCC00","FFFF00","00FF00","00FFFF","00CCFF","993366","C0C0C0","FF99CC","FFCC99","FFFF99","CCFFCC","CCFFFF","99CCFF","CC99FF","FFFFFF"],initComponent:function(){Ext.ColorPalette.superclass.initComponent.call(this);
this.addEvents("select");
if(this.handler){this.on("select",this.handler,this.scope,true)
}},onRender:function(d,e){this.autoEl={tag:"div",cls:this.itemCls};
Ext.ColorPalette.superclass.onRender.call(this,d,e);
var g=this.tpl||new Ext.XTemplate('<tpl for="."><a href="#" class="color-{.}" hidefocus="on"><em><span style="background:#{.}" unselectable="on">&#160;</span></em></a></tpl>');
g.overwrite(this.el,this.colors);
this.mon(this.el,this.clickEvent,this.handleClick,this,{delegate:"a"});
if(this.clickEvent!="click"){this.mon(this.el,"click",Ext.emptyFn,this,{delegate:"a",preventDefault:true})
}},afterRender:function(){Ext.ColorPalette.superclass.afterRender.call(this);
if(this.value){var b=this.value;
this.value=null;
this.select(b)
}},handleClick:function(c,e){c.preventDefault();
if(!this.disabled){var g=e.className.match(/(?:^|\s)color-(.{6})(?:\s|$)/)[1];
this.select(g.toUpperCase())
}},select:function(d){d=d.replace("#","");
if(d!=this.value||this.allowReselect){var c=this.el;
if(this.value){c.child("a.color-"+this.value).removeClass("x-color-palette-sel")
}c.child("a.color-"+d).addClass("x-color-palette-sel");
this.value=d;
this.fireEvent("select",this,d)
}}});
Ext.reg("colorpalette",Ext.ColorPalette);
Ext.DatePicker=Ext.extend(Ext.BoxComponent,{todayText:"Today",okText:"&#160;OK&#160;",cancelText:"Cancel",todayTip:"{0} (Spacebar)",minText:"This date is before the minimum date",maxText:"This date is after the maximum date",format:"m/d/y",disabledDaysText:"Disabled",disabledDatesText:"Disabled",monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"Next Month (Control+Right)",prevText:"Previous Month (Control+Left)",monthYearText:"Choose a month (Control+Up/Down to move years)",startDay:0,showToday:true,focusOnSelect:true,initComponent:function(){Ext.DatePicker.superclass.initComponent.call(this);
this.value=this.value?this.value.clearTime(true):new Date().clearTime();
this.addEvents("select");
if(this.handler){this.on("select",this.handler,this.scope||this)
}this.initDisabledDays()
},initDisabledDays:function(){if(!this.disabledDatesRE&&this.disabledDates){var d=this.disabledDates,e=d.length-1,g="(?:";
Ext.each(d,function(a,b){g+=Ext.isDate(a)?"^"+Ext.escapeRe(a.dateFormat(this.format))+"$":d[b];
if(b!=e){g+="|"
}},this);
this.disabledDatesRE=new RegExp(g+")")
}},setDisabledDates:function(b){if(Ext.isArray(b)){this.disabledDates=b;
this.disabledDatesRE=null
}else{this.disabledDatesRE=b
}this.initDisabledDays();
this.update(this.value,true)
},setDisabledDays:function(b){this.disabledDays=b;
this.update(this.value,true)
},setMinDate:function(b){this.minDate=b;
this.update(this.value,true)
},setMaxDate:function(b){this.maxDate=b;
this.update(this.value,true)
},setValue:function(b){this.value=b.clearTime(true);
this.update(this.value)
},getValue:function(){return this.value
},focus:function(){this.update(this.activeDate)
},onEnable:function(b){Ext.DatePicker.superclass.onEnable.call(this);
this.doDisabled(false);
this.update(b?this.value:this.activeDate);
if(Ext.isIE){this.el.repaint()
}},onDisable:function(){Ext.DatePicker.superclass.onDisable.call(this);
this.doDisabled(true);
if(Ext.isIE&&!Ext.isIE8){Ext.each([].concat(this.textNodes,this.el.query("th span")),function(b){Ext.fly(b).repaint()
})
}},doDisabled:function(b){this.keyNav.setDisabled(b);
this.prevRepeater.setDisabled(b);
this.nextRepeater.setDisabled(b);
if(this.showToday){this.todayKeyListener.setDisabled(b);
this.todayBtn.setDisabled(b)
}},onRender:function(q,d){var l=['<table cellspacing="0">','<tr><td class="x-date-left"><a href="#" title="',this.prevText,'">&#160;</a></td><td class="x-date-middle" align="center"></td><td class="x-date-right"><a href="#" title="',this.nextText,'">&#160;</a></td></tr>','<tr><td colspan="3"><table class="x-date-inner" cellspacing="0"><thead><tr>'],r=this.dayNames,o;
for(o=0;
o<7;
o++){var m=this.startDay+o;
if(m>6){m=m-7
}l.push("<th><span>",r[m].substr(0,1),"</span></th>")
}l[l.length]="</tr></thead><tbody><tr>";
for(o=0;
o<42;
o++){if(o%7===0&&o!==0){l[l.length]="</tr><tr>"
}l[l.length]='<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>'
}l.push("</tr></tbody></table></td></tr>",this.showToday?'<tr><td colspan="3" class="x-date-bottom" align="center"></td></tr>':"",'</table><div class="x-date-mp"></div>');
var n=document.createElement("div");
n.className="x-date-picker";
n.innerHTML=l.join("");
q.dom.insertBefore(n,d);
this.el=Ext.get(n);
this.eventEl=Ext.get(n.firstChild);
this.prevRepeater=new Ext.util.ClickRepeater(this.el.child("td.x-date-left a"),{handler:this.showPrevMonth,scope:this,preventDefault:true,stopDefault:true});
this.nextRepeater=new Ext.util.ClickRepeater(this.el.child("td.x-date-right a"),{handler:this.showNextMonth,scope:this,preventDefault:true,stopDefault:true});
this.monthPicker=this.el.down("div.x-date-mp");
this.monthPicker.enableDisplayMode("block");
this.keyNav=new Ext.KeyNav(this.eventEl,{left:function(a){if(a.ctrlKey){this.showPrevMonth()
}else{this.update(this.activeDate.add("d",-1))
}},right:function(a){if(a.ctrlKey){this.showNextMonth()
}else{this.update(this.activeDate.add("d",1))
}},up:function(a){if(a.ctrlKey){this.showNextYear()
}else{this.update(this.activeDate.add("d",-7))
}},down:function(a){if(a.ctrlKey){this.showPrevYear()
}else{this.update(this.activeDate.add("d",7))
}},pageUp:function(a){this.showNextMonth()
},pageDown:function(a){this.showPrevMonth()
},enter:function(a){a.stopPropagation();
return true
},scope:this});
this.el.unselectable();
this.cells=this.el.select("table.x-date-inner tbody td");
this.textNodes=this.el.query("table.x-date-inner tbody span");
this.mbtn=new Ext.Button({text:"&#160;",tooltip:this.monthYearText,renderTo:this.el.child("td.x-date-middle",true)});
this.mbtn.el.child("em").addClass("x-btn-arrow");
if(this.showToday){this.todayKeyListener=this.eventEl.addKeyListener(Ext.EventObject.SPACE,this.selectToday,this);
var p=(new Date()).dateFormat(this.format);
this.todayBtn=new Ext.Button({renderTo:this.el.child("td.x-date-bottom",true),text:String.format(this.todayText,p),tooltip:String.format(this.todayTip,p),handler:this.selectToday,scope:this})
}this.mon(this.eventEl,"mousewheel",this.handleMouseWheel,this);
this.mon(this.eventEl,"click",this.handleDateClick,this,{delegate:"a.x-date-date"});
this.mon(this.mbtn,"click",this.showMonthPicker,this);
this.onEnable(true)
},createMonthPicker:function(){if(!this.monthPicker.dom.firstChild){var d=['<table border="0" cellspacing="0">'];
for(var c=0;
c<6;
c++){d.push('<tr><td class="x-date-mp-month"><a href="#">',Date.getShortMonthName(c),"</a></td>",'<td class="x-date-mp-month x-date-mp-sep"><a href="#">',Date.getShortMonthName(c+6),"</a></td>",c===0?'<td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-prev"></a></td><td class="x-date-mp-ybtn" align="center"><a class="x-date-mp-next"></a></td></tr>':'<td class="x-date-mp-year"><a href="#"></a></td><td class="x-date-mp-year"><a href="#"></a></td></tr>')
}d.push('<tr class="x-date-mp-btns"><td colspan="4"><button type="button" class="x-date-mp-ok">',this.okText,'</button><button type="button" class="x-date-mp-cancel">',this.cancelText,"</button></td></tr>","</table>");
this.monthPicker.update(d.join(""));
this.mon(this.monthPicker,"click",this.onMonthClick,this);
this.mon(this.monthPicker,"dblclick",this.onMonthDblClick,this);
this.mpMonths=this.monthPicker.select("td.x-date-mp-month");
this.mpYears=this.monthPicker.select("td.x-date-mp-year");
this.mpMonths.each(function(g,b,a){a+=1;
if((a%2)===0){g.dom.xmonth=5+Math.round(a*0.5)
}else{g.dom.xmonth=Math.round((a-1)*0.5)
}})
}},showMonthPicker:function(){if(!this.disabled){this.createMonthPicker();
var b=this.el.getSize();
this.monthPicker.setSize(b);
this.monthPicker.child("table").setSize(b);
this.mpSelMonth=(this.activeDate||this.value).getMonth();
this.updateMPMonth(this.mpSelMonth);
this.mpSelYear=(this.activeDate||this.value).getFullYear();
this.updateMPYear(this.mpSelYear);
this.monthPicker.slideIn("t",{duration:0.2})
}},updateMPYear:function(j){this.mpyear=j;
var l=this.mpYears.elements;
for(var g=1;
g<=10;
g++){var k=l[g-1],h;
if((g%2)===0){h=j+Math.round(g*0.5);
k.firstChild.innerHTML=h;
k.xyear=h
}else{h=j-(5-Math.round(g*0.5));
k.firstChild.innerHTML=h;
k.xyear=h
}this.mpYears.item(g-1)[h==this.mpSelYear?"addClass":"removeClass"]("x-date-mp-sel")
}},updateMPMonth:function(b){this.mpMonths.each(function(a,g,e){a[a.dom.xmonth==b?"addClass":"removeClass"]("x-date-mp-sel")
})
},selectMPMonth:function(b){},onMonthClick:function(k,d){k.stopEvent();
var l=new Ext.Element(d),e;
if(l.is("button.x-date-mp-cancel")){this.hideMonthPicker()
}else{if(l.is("button.x-date-mp-ok")){var j=new Date(this.mpSelYear,this.mpSelMonth,(this.activeDate||this.value).getDate());
if(j.getMonth()!=this.mpSelMonth){j=new Date(this.mpSelYear,this.mpSelMonth,1).getLastDateOfMonth()
}this.update(j);
this.hideMonthPicker()
}else{if((e=l.up("td.x-date-mp-month",2))){this.mpMonths.removeClass("x-date-mp-sel");
e.addClass("x-date-mp-sel");
this.mpSelMonth=e.dom.xmonth
}else{if((e=l.up("td.x-date-mp-year",2))){this.mpYears.removeClass("x-date-mp-sel");
e.addClass("x-date-mp-sel");
this.mpSelYear=e.dom.xyear
}else{if(l.is("a.x-date-mp-prev")){this.updateMPYear(this.mpyear-10)
}else{if(l.is("a.x-date-mp-next")){this.updateMPYear(this.mpyear+10)
}}}}}}},onMonthDblClick:function(h,e){h.stopEvent();
var j=new Ext.Element(e),g;
if((g=j.up("td.x-date-mp-month",2))){this.update(new Date(this.mpSelYear,g.dom.xmonth,(this.activeDate||this.value).getDate()));
this.hideMonthPicker()
}else{if((g=j.up("td.x-date-mp-year",2))){this.update(new Date(g.dom.xyear,this.mpSelMonth,(this.activeDate||this.value).getDate()));
this.hideMonthPicker()
}}},hideMonthPicker:function(b){if(this.monthPicker){if(b===true){this.monthPicker.hide()
}else{this.monthPicker.slideOut("t",{duration:0.2})
}}},showPrevMonth:function(b){this.update(this.activeDate.add("mo",-1))
},showNextMonth:function(b){this.update(this.activeDate.add("mo",1))
},showPrevYear:function(){this.update(this.activeDate.add("y",-1))
},showNextYear:function(){this.update(this.activeDate.add("y",1))
},handleMouseWheel:function(d){d.stopEvent();
if(!this.disabled){var c=d.getWheelDelta();
if(c>0){this.showPrevMonth()
}else{if(c<0){this.showNextMonth()
}}}},handleDateClick:function(c,d){c.stopEvent();
if(!this.disabled&&d.dateValue&&!Ext.fly(d.parentNode).hasClass("x-date-disabled")){this.cancelFocus=this.focusOnSelect===false;
this.setValue(new Date(d.dateValue));
delete this.cancelFocus;
this.fireEvent("select",this,this.value)
}},selectToday:function(){if(this.todayBtn&&!this.todayBtn.disabled){this.setValue(new Date().clearTime());
this.fireEvent("select",this,this.value)
}},update:function(M,W){if(this.rendered){var al=this.activeDate,Z=this.isVisible();
this.activeDate=M;
if(!W&&al&&this.el){var aa=M.getTime();
if(al.getMonth()==M.getMonth()&&al.getFullYear()==M.getFullYear()){this.cells.removeClass("x-date-selected");
this.cells.each(function(a){if(a.dom.firstChild.dateValue==aa){a.addClass("x-date-selected");
if(Z&&!this.cancelFocus){Ext.fly(a.dom.firstChild).focus(50)
}return false
}},this);
return
}}var ae=M.getDaysInMonth(),X=M.getFirstDateOfMonth(),ah=X.getDay()-this.startDay;
if(ah<0){ah+=7
}ae+=ah;
var U=M.add("mo",-1),ag=U.getDaysInMonth()-ah,ai=this.cells.elements,V=this.textNodes,d=86400000,R=(new Date(U.getFullYear(),U.getMonth(),ag)).clearTime(),T=new Date().clearTime().getTime(),O=M.clearTime(true).getTime(),Q=this.minDate?this.minDate.clearTime(true):Number.NEGATIVE_INFINITY,w=this.maxDate?this.maxDate.clearTime(true):Number.POSITIVE_INFINITY,N=this.disabledDatesRE,S=this.disabledDatesText,t=this.disabledDays?this.disabledDays.join(""):false,P=this.disabledDaysText,Y=this.format;
if(this.showToday){var ac=new Date().clearTime(),aj=(ac<Q||ac>w||(N&&Y&&N.test(ac.dateFormat(Y)))||(t&&t.indexOf(ac.getDay())!=-1));
if(!this.disabled){this.todayBtn.setDisabled(aj);
this.todayKeyListener[aj?"disable":"enable"]()
}}var ad=function(a,e){e.title="";
var c=R.getTime();
e.firstChild.dateValue=c;
if(c==T){e.className+=" x-date-today";
e.title=a.todayText
}if(c==O){e.className+=" x-date-selected";
if(Z){Ext.fly(e.firstChild).focus(50)
}}if(c<Q){e.className=" x-date-disabled";
e.title=a.minText;
return
}if(c>w){e.className=" x-date-disabled";
e.title=a.maxText;
return
}if(t){if(t.indexOf(R.getDay())!=-1){e.title=P;
e.className=" x-date-disabled"
}}if(N&&Y){var b=R.dateFormat(Y);
if(N.test(b)){e.title=S.replace("%0",b);
e.className=" x-date-disabled"
}}};
var L=0;
for(;
L<ah;
L++){V[L].innerHTML=(++ag);
R.setDate(R.getDate()+1);
ai[L].className="x-date-prevday";
ad(this,ai[L])
}for(;
L<ae;
L++){var ak=L-ah+1;
V[L].innerHTML=(ak);
R.setDate(R.getDate()+1);
ai[L].className="x-date-active";
ad(this,ai[L])
}var K=0;
for(;
L<42;
L++){V[L].innerHTML=(++K);
R.setDate(R.getDate()+1);
ai[L].className="x-date-nextday";
ad(this,ai[L])
}this.mbtn.setText(this.monthNames[M.getMonth()]+" "+M.getFullYear());
if(!this.internalRender){var af=this.el.dom.firstChild,ab=af.offsetWidth;
this.el.setWidth(ab+this.el.getBorderWidth("lr"));
Ext.fly(af).setWidth(ab);
this.internalRender=true;
if(Ext.isOpera&&!this.secondPass){af.rows[0].cells[1].style.width=(ab-(af.rows[0].cells[0].offsetWidth+af.rows[0].cells[2].offsetWidth))+"px";
this.secondPass=true;
this.update.defer(10,this,[M])
}}}},beforeDestroy:function(){if(this.rendered){Ext.destroy(this.keyNav,this.monthPicker,this.eventEl,this.mbtn,this.nextRepeater,this.prevRepeater,this.cells.el,this.todayBtn);
delete this.textNodes;
delete this.cells.elements
}}});
Ext.reg("datepicker",Ext.DatePicker);
Ext.LoadMask=function(g,d){this.el=Ext.get(g);
Ext.apply(this,d);
if(this.store){this.store.on({scope:this,beforeload:this.onBeforeLoad,load:this.onLoad,exception:this.onLoad});
this.removeMask=Ext.value(this.removeMask,false)
}else{var e=this.el.getUpdater();
e.showLoadIndicator=false;
e.on({scope:this,beforeupdate:this.onBeforeLoad,update:this.onLoad,failure:this.onLoad});
this.removeMask=Ext.value(this.removeMask,true)
}};
Ext.LoadMask.prototype={msg:"Loading...",msgCls:"x-mask-loading",disabled:false,disable:function(){this.disabled=true
},enable:function(){this.disabled=false
},onLoad:function(){this.el.unmask(this.removeMask)
},onBeforeLoad:function(){if(!this.disabled){this.el.mask(this.msg,this.msgCls)
}},show:function(){this.onBeforeLoad()
},hide:function(){this.onLoad()
},destroy:function(){if(this.store){this.store.un("beforeload",this.onBeforeLoad,this);
this.store.un("load",this.onLoad,this);
this.store.un("exception",this.onLoad,this)
}else{var b=this.el.getUpdater();
b.un("beforeupdate",this.onBeforeLoad,this);
b.un("update",this.onLoad,this);
b.un("failure",this.onLoad,this)
}}};
Ext.Slider=Ext.extend(Ext.BoxComponent,{vertical:false,minValue:0,maxValue:100,decimalPrecision:0,keyIncrement:1,increment:0,clickRange:[5,15],clickToChange:true,animate:true,dragging:false,initComponent:function(){if(!Ext.isDefined(this.value)){this.value=this.minValue
}Ext.Slider.superclass.initComponent.call(this);
this.keyIncrement=Math.max(this.increment,this.keyIncrement);
this.addEvents("beforechange","change","changecomplete","dragstart","drag","dragend");
if(this.vertical){Ext.apply(this,Ext.Slider.Vertical)
}},onRender:function(){this.autoEl={cls:"x-slider "+(this.vertical?"x-slider-vert":"x-slider-horz"),cn:{cls:"x-slider-end",cn:{cls:"x-slider-inner",cn:[{cls:"x-slider-thumb"},{tag:"a",cls:"x-slider-focus",href:"#",tabIndex:"-1",hidefocus:"on"}]}}};
Ext.Slider.superclass.onRender.apply(this,arguments);
this.endEl=this.el.first();
this.innerEl=this.endEl.first();
this.thumb=this.innerEl.first();
this.halfThumb=(this.vertical?this.thumb.getHeight():this.thumb.getWidth())/2;
this.focusEl=this.thumb.next();
this.initEvents()
},initEvents:function(){this.thumb.addClassOnOver("x-slider-thumb-over");
this.mon(this.el,{scope:this,mousedown:this.onMouseDown,keydown:this.onKeyDown});
this.focusEl.swallowEvent("click",true);
this.tracker=new Ext.dd.DragTracker({onBeforeStart:this.onBeforeDragStart.createDelegate(this),onStart:this.onDragStart.createDelegate(this),onDrag:this.onDrag.createDelegate(this),onEnd:this.onDragEnd.createDelegate(this),tolerance:3,autoStart:300});
this.tracker.initEl(this.thumb)
},onMouseDown:function(c){if(this.disabled){return
}if(this.clickToChange&&c.target!=this.thumb.dom){var d=this.innerEl.translatePoints(c.getXY());
this.onClickChange(d)
}this.focus()
},onClickChange:function(b){if(b.top>this.clickRange[0]&&b.top<this.clickRange[1]){this.setValue(Ext.util.Format.round(this.reverseValue(b.left),this.decimalPrecision),undefined,true)
}},onKeyDown:function(c){if(this.disabled){c.preventDefault();
return
}var d=c.getKey();
switch(d){case c.UP:case c.RIGHT:c.stopEvent();
if(c.ctrlKey){this.setValue(this.maxValue,undefined,true)
}else{this.setValue(this.value+this.keyIncrement,undefined,true)
}break;
case c.DOWN:case c.LEFT:c.stopEvent();
if(c.ctrlKey){this.setValue(this.minValue,undefined,true)
}else{this.setValue(this.value-this.keyIncrement,undefined,true)
}break;
default:c.preventDefault()
}},doSnap:function(e){if(!(this.increment&&e)){return e
}var h=e,j=this.increment,g=e%j;
if(g!=0){h-=g;
if(g*2>j){h+=j
}else{if(g*2<-j){h-=j
}}}return h.constrain(this.minValue,this.maxValue)
},afterRender:function(){Ext.Slider.superclass.afterRender.apply(this,arguments);
if(this.value!==undefined){var b=this.normalizeValue(this.value);
if(b!==this.value){delete this.value;
this.setValue(b,false)
}else{this.moveThumb(this.translateValue(b),false)
}}},getRatio:function(){var d=this.innerEl.getWidth(),c=this.maxValue-this.minValue;
return c==0?d:(d/c)
},normalizeValue:function(b){b=this.doSnap(b);
b=Ext.util.Format.round(b,this.decimalPrecision);
b=b.constrain(this.minValue,this.maxValue);
return b
},setValue:function(d,e,g){d=this.normalizeValue(d);
if(d!==this.value&&this.fireEvent("beforechange",this,d,this.value)!==false){this.value=d;
this.moveThumb(this.translateValue(d),e!==false);
this.fireEvent("change",this,d);
if(g){this.fireEvent("changecomplete",this,d)
}}},translateValue:function(d){var c=this.getRatio();
return(d*c)-(this.minValue*c)-this.halfThumb
},reverseValue:function(c){var d=this.getRatio();
return(c+this.halfThumb+(this.minValue*d))/d
},moveThumb:function(c,d){if(!d||this.animate===false){this.thumb.setLeft(c)
}else{this.thumb.shift({left:c,stopFx:true,duration:0.35})
}},focus:function(){this.focusEl.focus(10)
},onBeforeDragStart:function(b){return !this.disabled
},onDragStart:function(b){this.thumb.addClass("x-slider-thumb-drag");
this.dragging=true;
this.dragStartValue=this.value;
this.fireEvent("dragstart",this,b)
},onDrag:function(d){var c=this.innerEl.translatePoints(this.tracker.getXY());
this.setValue(Ext.util.Format.round(this.reverseValue(c.left),this.decimalPrecision),false);
this.fireEvent("drag",this,d)
},onDragEnd:function(b){this.thumb.removeClass("x-slider-thumb-drag");
this.dragging=false;
this.fireEvent("dragend",this,b);
if(this.dragStartValue!=this.value){this.fireEvent("changecomplete",this,this.value)
}},onResize:function(d,c){this.innerEl.setWidth(d-(this.el.getPadding("l")+this.endEl.getPadding("r")));
this.syncThumb()
},onDisable:function(){Ext.Slider.superclass.onDisable.call(this);
this.thumb.addClass(this.disabledClass);
if(Ext.isIE){var b=this.thumb.getXY();
this.thumb.hide();
this.innerEl.addClass(this.disabledClass).dom.disabled=true;
if(!this.thumbHolder){this.thumbHolder=this.endEl.createChild({cls:"x-slider-thumb "+this.disabledClass})
}this.thumbHolder.show().setXY(b)
}},onEnable:function(){Ext.Slider.superclass.onEnable.call(this);
this.thumb.removeClass(this.disabledClass);
if(Ext.isIE){this.innerEl.removeClass(this.disabledClass).dom.disabled=false;
if(this.thumbHolder){this.thumbHolder.hide()
}this.thumb.show();
this.syncThumb()
}},syncThumb:function(){if(this.rendered){this.moveThumb(this.translateValue(this.value))
}},getValue:function(){return this.value
},beforeDestroy:function(){Ext.destroyMembers(this,"endEl","innerEl","thumb","halfThumb","focusEl","tracker","thumbHolder");
Ext.Slider.superclass.beforeDestroy.call(this)
}});
Ext.reg("slider",Ext.Slider);
Ext.Slider.Vertical={onResize:function(d,c){this.innerEl.setHeight(c-(this.el.getPadding("t")+this.endEl.getPadding("b")));
this.syncThumb()
},getRatio:function(){var c=this.innerEl.getHeight(),d=this.maxValue-this.minValue;
return c/d
},moveThumb:function(c,d){if(!d||this.animate===false){this.thumb.setBottom(c)
}else{this.thumb.shift({bottom:c,stopFx:true,duration:0.35})
}},onDrag:function(d){var g=this.innerEl.translatePoints(this.tracker.getXY()),e=this.innerEl.getHeight()-g.top;
this.setValue(this.minValue+Ext.util.Format.round(e/this.getRatio(),this.decimalPrecision),false);
this.fireEvent("drag",this,d)
},onClickChange:function(c){if(c.left>this.clickRange[0]&&c.left<this.clickRange[1]){var d=this.innerEl.getHeight()-c.top;
this.setValue(this.minValue+Ext.util.Format.round(d/this.getRatio(),this.decimalPrecision),undefined,true)
}}};
Ext.ProgressBar=Ext.extend(Ext.BoxComponent,{baseCls:"x-progress",animate:false,waitTimer:null,initComponent:function(){Ext.ProgressBar.superclass.initComponent.call(this);
this.addEvents("update")
},onRender:function(k,h){var l=new Ext.Template('<div class="{cls}-wrap">','<div class="{cls}-inner">','<div class="{cls}-bar">','<div class="{cls}-text">',"<div>&#160;</div>","</div>","</div>",'<div class="{cls}-text {cls}-text-back">',"<div>&#160;</div>","</div>","</div>","</div>");
this.el=h?l.insertBefore(h,{cls:this.baseCls},true):l.append(k,{cls:this.baseCls},true);
if(this.id){this.el.dom.id=this.id
}var g=this.el.dom.firstChild;
this.progressBar=Ext.get(g.firstChild);
if(this.textEl){this.textEl=Ext.get(this.textEl);
delete this.textTopEl
}else{this.textTopEl=Ext.get(this.progressBar.dom.firstChild);
var j=Ext.get(g.childNodes[1]);
this.textTopEl.setStyle("z-index",99).addClass("x-hidden");
this.textEl=new Ext.CompositeElement([this.textTopEl.dom.firstChild,j.dom.firstChild]);
this.textEl.setWidth(g.offsetWidth)
}this.progressBar.setHeight(g.offsetHeight)
},afterRender:function(){Ext.ProgressBar.superclass.afterRender.call(this);
if(this.value){this.updateProgress(this.value,this.text)
}else{this.updateText(this.text)
}},updateProgress:function(j,h,e){this.value=j||0;
if(h){this.updateText(h)
}if(this.rendered){var g=Math.floor(j*this.el.dom.firstChild.offsetWidth);
this.progressBar.setWidth(g,e===true||(e!==false&&this.animate));
if(this.textTopEl){this.textTopEl.removeClass("x-hidden").setWidth(g)
}}this.fireEvent("update",this,j,h);
return this
},wait:function(c){if(!this.waitTimer){var d=this;
c=c||{};
this.updateText(c.text);
this.waitTimer=Ext.TaskMgr.start({run:function(b){var a=c.increment||10;
b-=1;
this.updateProgress(((((b+a)%a)+1)*(100/a))*0.01,null,c.animate)
},interval:c.interval||1000,duration:c.duration,onStop:function(){if(c.fn){c.fn.apply(c.scope||this)
}this.reset()
},scope:d})
}return this
},isWaiting:function(){return this.waitTimer!==null
},updateText:function(b){this.text=b||"&#160;";
if(this.rendered){this.textEl.update(this.text)
}return this
},syncProgressBar:function(){if(this.value){this.updateProgress(this.value,this.text)
}return this
},setSize:function(e,g){Ext.ProgressBar.superclass.setSize.call(this,e,g);
if(this.textTopEl){var d=this.el.dom.firstChild;
this.textEl.setSize(d.offsetWidth,d.offsetHeight)
}this.syncProgressBar();
return this
},reset:function(b){this.updateProgress(0);
if(this.textTopEl){this.textTopEl.addClass("x-hidden")
}if(this.waitTimer){this.waitTimer.onStop=null;
Ext.TaskMgr.stop(this.waitTimer);
this.waitTimer=null
}if(b===true){this.hide()
}return this
},onDestroy:function(){if(this.rendered){if(this.textEl.isComposite){this.textEl.clear()
}Ext.destroyMembers(this,"textEl","progressBar","textTopEl")
}Ext.ProgressBar.superclass.onDestroy.call(this)
}});
Ext.reg("progress",Ext.ProgressBar);
(function(){var d=Ext.EventManager;
var c=Ext.lib.Dom;
Ext.dd.DragDrop=function(a,g,b){if(a){this.init(a,g,b)
}};
Ext.dd.DragDrop.prototype={id:null,config:null,dragElId:null,handleElId:null,invalidHandleTypes:null,invalidHandleIds:null,invalidHandleClasses:null,startPageX:0,startPageY:0,groups:null,locked:false,lock:function(){this.locked=true
},moveOnly:false,unlock:function(){this.locked=false
},isTarget:true,padding:null,_domRef:null,__ygDragDrop:true,constrainX:false,constrainY:false,minX:0,maxX:0,minY:0,maxY:0,maintainOffset:false,xTicks:null,yTicks:null,primaryButtonOnly:true,available:false,hasOuterHandles:false,b4StartDrag:function(b,a){},startDrag:function(b,a){},b4Drag:function(a){},onDrag:function(a){},onDragEnter:function(b,a){},b4DragOver:function(a){},onDragOver:function(b,a){},b4DragOut:function(a){},onDragOut:function(b,a){},b4DragDrop:function(a){},onDragDrop:function(b,a){},onInvalidDrop:function(a){},b4EndDrag:function(a){},endDrag:function(a){},b4MouseDown:function(a){},onMouseDown:function(a){},onMouseUp:function(a){},onAvailable:function(){},defaultPadding:{left:0,right:0,top:0,bottom:0},constrainTo:function(t,v,a){if(Ext.isNumber(v)){v={left:v,right:v,top:v,bottom:v}
}v=v||this.defaultPadding;
var r=Ext.get(this.getEl()).getBox(),y=Ext.get(t),b=y.getScroll(),s,x=y.dom;
if(x==document.body){s={x:b.left,y:b.top,width:Ext.lib.Dom.getViewWidth(),height:Ext.lib.Dom.getViewHeight()}
}else{var q=y.getXY();
s={x:q[0],y:q[1],width:x.clientWidth,height:x.clientHeight}
}var u=r.y-s.y,w=r.x-s.x;
this.resetConstraints();
this.setXConstraint(w-(v.left||0),s.width-w-r.width-(v.right||0),this.xTickSize);
this.setYConstraint(u-(v.top||0),s.height-u-r.height-(v.bottom||0),this.yTickSize)
},getEl:function(){if(!this._domRef){this._domRef=Ext.getDom(this.id)
}return this._domRef
},getDragEl:function(){return Ext.getDom(this.dragElId)
},init:function(a,g,b){this.initTarget(a,g,b);
d.on(this.id,"mousedown",this.handleMouseDown,this)
},initTarget:function(a,g,b){this.config=b||{};
this.DDM=Ext.dd.DDM;
this.groups={};
if(typeof a!=="string"){a=Ext.id(a)
}this.id=a;
this.addToGroup((g)?g:"default");
this.handleElId=a;
this.setDragElId(a);
this.invalidHandleTypes={A:"A"};
this.invalidHandleIds={};
this.invalidHandleClasses=[];
this.applyConfig();
this.handleOnAvailable()
},applyConfig:function(){this.padding=this.config.padding||[0,0,0,0];
this.isTarget=(this.config.isTarget!==false);
this.maintainOffset=(this.config.maintainOffset);
this.primaryButtonOnly=(this.config.primaryButtonOnly!==false)
},handleOnAvailable:function(){this.available=true;
this.resetConstraints();
this.onAvailable()
},setPadding:function(b,j,a,h){if(!j&&0!==j){this.padding=[b,b,b,b]
}else{if(!a&&0!==a){this.padding=[b,j,b,j]
}else{this.padding=[b,j,a,h]
}}},setInitPosition:function(k,l){var b=this.getEl();
if(!this.DDM.verifyEl(b)){return
}var m=k||0;
var n=l||0;
var a=c.getXY(b);
this.initPageX=a[0]-m;
this.initPageY=a[1]-n;
this.lastPageX=a[0];
this.lastPageY=a[1];
this.setStartPosition(a)
},setStartPosition:function(a){var b=a||c.getXY(this.getEl());
this.deltaSetXY=null;
this.startPageX=b[0];
this.startPageY=b[1]
},addToGroup:function(a){this.groups[a]=true;
this.DDM.regDragDrop(this,a)
},removeFromGroup:function(a){if(this.groups[a]){delete this.groups[a]
}this.DDM.removeDDFromGroup(this,a)
},setDragElId:function(a){this.dragElId=a
},setHandleElId:function(a){if(typeof a!=="string"){a=Ext.id(a)
}this.handleElId=a;
this.DDM.regHandle(this.id,a)
},setOuterHandleElId:function(a){if(typeof a!=="string"){a=Ext.id(a)
}d.on(a,"mousedown",this.handleMouseDown,this);
this.setHandleElId(a);
this.hasOuterHandles=true
},unreg:function(){d.un(this.id,"mousedown",this.handleMouseDown);
this._domRef=null;
this.DDM._remove(this)
},destroy:function(){this.unreg()
},isLocked:function(){return(this.DDM.isLocked()||this.locked)
},handleMouseDown:function(a,b){if(this.primaryButtonOnly&&a.button!=0){return
}if(this.isLocked()){return
}this.DDM.refreshCache(this.groups);
var e=new Ext.lib.Point(Ext.lib.Event.getPageX(a),Ext.lib.Event.getPageY(a));
if(!this.hasOuterHandles&&!this.DDM.isOverTarget(e,this)){}else{if(this.clickValidator(a)){this.setStartPosition();
this.b4MouseDown(a);
this.onMouseDown(a);
this.DDM.handleMouseDown(a,this);
this.DDM.stopEvent(a)
}else{}}},clickValidator:function(a){var b=a.getTarget();
return(this.isValidHandleChild(b)&&(this.id==this.handleElId||this.DDM.handleWasClicked(b,this.id)))
},addInvalidHandleType:function(b){var a=b.toUpperCase();
this.invalidHandleTypes[a]=a
},addInvalidHandleId:function(a){if(typeof a!=="string"){a=Ext.id(a)
}this.invalidHandleIds[a]=a
},addInvalidHandleClass:function(a){this.invalidHandleClasses.push(a)
},removeInvalidHandleType:function(b){var a=b.toUpperCase();
delete this.invalidHandleTypes[a]
},removeInvalidHandleId:function(a){if(typeof a!=="string"){a=Ext.id(a)
}delete this.invalidHandleIds[a]
},removeInvalidHandleClass:function(b){for(var a=0,g=this.invalidHandleClasses.length;
a<g;
++a){if(this.invalidHandleClasses[a]==b){delete this.invalidHandleClasses[a]
}}},isValidHandleChild:function(e){var l=true;
var a;
try{a=e.nodeName.toUpperCase()
}catch(b){a=e.nodeName
}l=l&&!this.invalidHandleTypes[a];
l=l&&!this.invalidHandleIds[e.id];
for(var m=0,n=this.invalidHandleClasses.length;
l&&m<n;
++m){l=!Ext.fly(e).hasClass(this.invalidHandleClasses[m])
}return l
},setXTicks:function(a,j){this.xTicks=[];
this.xTickSize=j;
var b={};
for(var h=this.initPageX;
h>=this.minX;
h=h-j){if(!b[h]){this.xTicks[this.xTicks.length]=h;
b[h]=true
}}for(h=this.initPageX;
h<=this.maxX;
h=h+j){if(!b[h]){this.xTicks[this.xTicks.length]=h;
b[h]=true
}}this.xTicks.sort(this.DDM.numericSort)
},setYTicks:function(a,j){this.yTicks=[];
this.yTickSize=j;
var b={};
for(var h=this.initPageY;
h>=this.minY;
h=h-j){if(!b[h]){this.yTicks[this.yTicks.length]=h;
b[h]=true
}}for(h=this.initPageY;
h<=this.maxY;
h=h+j){if(!b[h]){this.yTicks[this.yTicks.length]=h;
b[h]=true
}}this.yTicks.sort(this.DDM.numericSort)
},setXConstraint:function(a,b,g){this.leftConstraint=a;
this.rightConstraint=b;
this.minX=this.initPageX-a;
this.maxX=this.initPageX+b;
if(g){this.setXTicks(this.initPageX,g)
}this.constrainX=true
},clearConstraints:function(){this.constrainX=false;
this.constrainY=false;
this.clearTicks()
},clearTicks:function(){this.xTicks=null;
this.yTicks=null;
this.xTickSize=0;
this.yTickSize=0
},setYConstraint:function(g,a,b){this.topConstraint=g;
this.bottomConstraint=a;
this.minY=this.initPageY-g;
this.maxY=this.initPageY+a;
if(b){this.setYTicks(this.initPageY,b)
}this.constrainY=true
},resetConstraints:function(){if(this.initPageX||this.initPageX===0){var a=(this.maintainOffset)?this.lastPageX-this.initPageX:0;
var b=(this.maintainOffset)?this.lastPageY-this.initPageY:0;
this.setInitPosition(a,b)
}else{this.setInitPosition()
}if(this.constrainX){this.setXConstraint(this.leftConstraint,this.rightConstraint,this.xTickSize)
}if(this.constrainY){this.setYConstraint(this.topConstraint,this.bottomConstraint,this.yTickSize)
}},getTick:function(a,m){if(!m){return a
}else{if(m[0]>=a){return m[0]
}else{for(var o=0,p=m.length;
o<p;
++o){var n=o+1;
if(m[n]&&m[n]>=a){var b=a-m[o];
var l=m[n]-a;
return(l>b)?m[o]:m[n]
}}return m[m.length-1]
}}},toString:function(){return("DragDrop "+this.id)
}}
})();
if(!Ext.dd.DragDropMgr){Ext.dd.DragDropMgr=function(){var b=Ext.EventManager;
return{ids:{},handleIds:{},dragCurrent:null,dragOvers:{},deltaX:0,deltaY:0,preventDefault:true,stopPropagation:true,initialized:false,locked:false,init:function(){this.initialized=true
},POINT:0,INTERSECT:1,mode:0,_execOnAll:function(k,l){for(var j in this.ids){for(var a in this.ids[j]){var h=this.ids[j][a];
if(!this.isTypeOfDD(h)){continue
}h[k].apply(h,l)
}}},_onLoad:function(){this.init();
b.on(document,"mouseup",this.handleMouseUp,this,true);
b.on(document,"mousemove",this.handleMouseMove,this,true);
b.on(window,"unload",this._onUnload,this,true);
b.on(window,"resize",this._onResize,this,true)
},_onResize:function(a){this._execOnAll("resetConstraints",[])
},lock:function(){this.locked=true
},unlock:function(){this.locked=false
},isLocked:function(){return this.locked
},locationCache:{},useCache:true,clickPixelThresh:3,clickTimeThresh:350,dragThreshMet:false,clickTimeout:null,startX:0,startY:0,regDragDrop:function(d,a){if(!this.initialized){this.init()
}if(!this.ids[a]){this.ids[a]={}
}this.ids[a][d.id]=d
},removeDDFromGroup:function(e,a){if(!this.ids[a]){this.ids[a]={}
}var g=this.ids[a];
if(g&&g[e.id]){delete g[e.id]
}},_remove:function(d){for(var a in d.groups){if(a&&this.ids[a]&&this.ids[a][d.id]){delete this.ids[a][d.id]
}}delete this.handleIds[d.id]
},regHandle:function(d,a){if(!this.handleIds[d]){this.handleIds[d]={}
}this.handleIds[d][a]=a
},isDragDrop:function(a){return(this.getDDById(a))?true:false
},getRelated:function(j,n){var k=[];
for(var l in j.groups){for(var m in this.ids[l]){var a=this.ids[l][m];
if(!this.isTypeOfDD(a)){continue
}if(!n||a.isTarget){k[k.length]=a
}}}return k
},isLegalTarget:function(h,j){var l=this.getRelated(h,true);
for(var k=0,a=l.length;
k<a;
++k){if(l[k].id==j.id){return true
}}return false
},isTypeOfDD:function(a){return(a&&a.__ygDragDrop)
},isHandle:function(d,a){return(this.handleIds[d]&&this.handleIds[d][a])
},getDDById:function(d){for(var a in this.ids){if(this.ids[a][d]){return this.ids[a][d]
}}return null
},handleMouseDown:function(e,g){if(Ext.QuickTips){Ext.QuickTips.disable()
}if(this.dragCurrent){this.handleMouseUp(e)
}this.currentTarget=e.getTarget();
this.dragCurrent=g;
var a=g.getEl();
this.startX=e.getPageX();
this.startY=e.getPageY();
this.deltaX=this.startX-a.offsetLeft;
this.deltaY=this.startY-a.offsetTop;
this.dragThreshMet=false;
this.clickTimeout=setTimeout(function(){var c=Ext.dd.DDM;
c.startDrag(c.startX,c.startY)
},this.clickTimeThresh)
},startDrag:function(a,d){clearTimeout(this.clickTimeout);
if(this.dragCurrent){this.dragCurrent.b4StartDrag(a,d);
this.dragCurrent.startDrag(a,d)
}this.dragThreshMet=true
},handleMouseUp:function(a){if(Ext.QuickTips){Ext.QuickTips.enable()
}if(!this.dragCurrent){return
}clearTimeout(this.clickTimeout);
if(this.dragThreshMet){this.fireEvents(a,true)
}else{}this.stopDrag(a);
this.stopEvent(a)
},stopEvent:function(a){if(this.stopPropagation){a.stopPropagation()
}if(this.preventDefault){a.preventDefault()
}},stopDrag:function(a){if(this.dragCurrent){if(this.dragThreshMet){this.dragCurrent.b4EndDrag(a);
this.dragCurrent.endDrag(a)
}this.dragCurrent.onMouseUp(a)
}this.dragCurrent=null;
this.dragOvers={}
},handleMouseMove:function(e){if(!this.dragCurrent){return true
}if(Ext.isIE&&(e.button!==0&&e.button!==1&&e.button!==2)){this.stopEvent(e);
return this.handleMouseUp(e)
}if(!this.dragThreshMet){var g=Math.abs(this.startX-e.getPageX());
var a=Math.abs(this.startY-e.getPageY());
if(g>this.clickPixelThresh||a>this.clickPixelThresh){this.startDrag(this.startX,this.startY)
}}if(this.dragThreshMet){this.dragCurrent.b4Drag(e);
this.dragCurrent.onDrag(e);
if(!this.dragCurrent.moveOnly){this.fireEvents(e,false)
}}this.stopEvent(e);
return true
},fireEvents:function(u,t){var e=this.dragCurrent;
if(!e||e.isLocked()){return
}var a=u.getPoint();
var D=[];
var A=[];
var w=[];
var y=[];
var B=[];
for(var z in this.dragOvers){var C=this.dragOvers[z];
if(!this.isTypeOfDD(C)){continue
}if(!this.isOverTarget(a,C,this.mode)){A.push(C)
}D[z]=true;
delete this.dragOvers[z]
}for(var s in e.groups){if("string"!=typeof s){continue
}for(z in this.ids[s]){var x=this.ids[s][z];
if(!this.isTypeOfDD(x)){continue
}if(x.isTarget&&!x.isLocked()&&((x!=e)||(e.ignoreSelf===false))){if(this.isOverTarget(a,x,this.mode)){if(t){y.push(x)
}else{if(!D[x.id]){B.push(x)
}else{w.push(x)
}this.dragOvers[x.id]=x
}}}}}if(this.mode){if(A.length){e.b4DragOut(u,A);
e.onDragOut(u,A)
}if(B.length){e.onDragEnter(u,B)
}if(w.length){e.b4DragOver(u,w);
e.onDragOver(u,w)
}if(y.length){e.b4DragDrop(u,y);
e.onDragDrop(u,y)
}}else{var v=0;
for(z=0,v=A.length;
z<v;
++z){e.b4DragOut(u,A[z].id);
e.onDragOut(u,A[z].id)
}for(z=0,v=B.length;
z<v;
++z){e.onDragEnter(u,B[z].id)
}for(z=0,v=w.length;
z<v;
++z){e.b4DragOver(u,w[z].id);
e.onDragOver(u,w[z].id)
}for(z=0,v=y.length;
z<v;
++z){e.b4DragDrop(u,y[z].id);
e.onDragDrop(u,y[z].id)
}}if(t&&!y.length){e.onInvalidDrop(u)
}},getBestMatch:function(k){var h=null;
var l=k.length;
if(l==1){h=k[0]
}else{for(var j=0;
j<l;
++j){var a=k[j];
if(a.cursorIsOver){h=a;
break
}else{if(!h||h.overlap.getArea()<a.overlap.getArea()){h=a
}}}}return h
},refreshCache:function(l){for(var a in l){if("string"!=typeof a){continue
}for(var k in this.ids[a]){var j=this.ids[a][k];
if(this.isTypeOfDD(j)){var h=this.getLocation(j);
if(h){this.locationCache[j.id]=h
}else{delete this.locationCache[j.id]
}}}}},verifyEl:function(g){if(g){var a;
if(Ext.isIE){try{a=g.offsetParent
}catch(e){}}else{a=g.offsetParent
}if(a){return true
}}return false
},getLocation:function(u){if(!this.isTypeOfDD(u)){return null
}var w=u.getEl(),l,x,y,a,e,A,z,r,v;
try{l=Ext.lib.Dom.getXY(w)
}catch(t){}if(!l){return null
}x=l[0];
y=x+w.offsetWidth;
a=l[1];
e=a+w.offsetHeight;
A=a-u.padding[0];
z=y+u.padding[1];
r=e+u.padding[2];
v=x-u.padding[3];
return new Ext.lib.Region(A,z,r,v)
},isOverTarget:function(a,t,r){var p=this.locationCache[t.id];
if(!p||!this.useCache){p=this.getLocation(t);
this.locationCache[t.id]=p
}if(!p){return false
}t.cursorIsOver=p.contains(a);
var m=this.dragCurrent;
if(!m||!m.getTargetCoord||(!r&&!m.constrainX&&!m.constrainY)){return t.cursorIsOver
}t.overlap=null;
var o=m.getTargetCoord(a.x,a.y);
var s=m.getDragEl();
var q=new Ext.lib.Region(o.y,o.x+s.offsetWidth,o.y+s.offsetHeight,o.x);
var n=q.intersect(p);
if(n){t.overlap=n;
return(r)?true:t.cursorIsOver
}else{return false
}},_onUnload:function(d,a){Ext.dd.DragDropMgr.unregAll()
},unregAll:function(){if(this.dragCurrent){this.stopDrag();
this.dragCurrent=null
}this._execOnAll("unreg",[]);
for(var a in this.elementCache){delete this.elementCache[a]
}this.elementCache={};
this.ids={}
},elementCache:{},getElWrapper:function(d){var a=this.elementCache[d];
if(!a||!a.el){a=this.elementCache[d]=new this.ElementWrapper(Ext.getDom(d))
}return a
},getElement:function(a){return Ext.getDom(a)
},getCss:function(d){var a=Ext.getDom(d);
return(a)?a.style:null
},ElementWrapper:function(a){this.el=a||null;
this.id=this.el&&a.id;
this.css=this.el&&a.style
},getPosX:function(a){return Ext.lib.Dom.getX(a)
},getPosY:function(a){return Ext.lib.Dom.getY(a)
},swapNode:function(h,a){if(h.swapNode){h.swapNode(a)
}else{var g=a.parentNode;
var j=a.nextSibling;
if(j==h){g.insertBefore(h,a)
}else{if(a==h.nextSibling){g.insertBefore(a,h)
}else{h.parentNode.replaceChild(a,h);
g.insertBefore(h,j)
}}}},getScroll:function(){var h,a,g=document.documentElement,j=document.body;
if(g&&(g.scrollTop||g.scrollLeft)){h=g.scrollTop;
a=g.scrollLeft
}else{if(j){h=j.scrollTop;
a=j.scrollLeft
}else{}}return{top:h,left:a}
},getStyle:function(d,a){return Ext.fly(d).getStyle(a)
},getScrollTop:function(){return this.getScroll().top
},getScrollLeft:function(){return this.getScroll().left
},moveToEl:function(a,e){var g=Ext.lib.Dom.getXY(e);
Ext.lib.Dom.setXY(a,g)
},numericSort:function(a,e){return(a-e)
},_timeoutCount:0,_addListeners:function(){var a=Ext.dd.DDM;
if(Ext.lib.Event&&document){a._onLoad()
}else{if(a._timeoutCount>2000){}else{setTimeout(a._addListeners,10);
if(document&&document.body){a._timeoutCount+=1
}}}},handleWasClicked:function(a,e){if(this.isHandle(e,a.id)){return true
}else{var g=a.parentNode;
while(g){if(this.isHandle(e,g.id)){return true
}else{g=g.parentNode
}}}return false
}}
}();
Ext.dd.DDM=Ext.dd.DragDropMgr;
Ext.dd.DDM._addListeners()
}Ext.dd.DD=function(g,e,d){if(g){this.init(g,e,d)
}};
Ext.extend(Ext.dd.DD,Ext.dd.DragDrop,{scroll:true,autoOffset:function(j,e){var g=j-this.startPageX;
var h=e-this.startPageY;
this.setDelta(g,h)
},setDelta:function(c,d){this.deltaX=c;
this.deltaY=d
},setDragElPos:function(g,d){var e=this.getDragEl();
this.alignElWithMouse(e,g,d)
},alignElWithMouse:function(r,n,o){var p=this.getTargetCoord(n,o);
var k=r.dom?r:Ext.fly(r,"_dd");
if(!this.deltaSetXY){var m=[p.x,p.y];
k.setXY(m);
var q=k.getLeft(true);
var l=k.getTop(true);
this.deltaSetXY=[q-p.x,l-p.y]
}else{k.setLeftTop(p.x+this.deltaSetXY[0],p.y+this.deltaSetXY[1])
}this.cachePosition(p.x,p.y);
this.autoScroll(p.x,p.y,r.offsetHeight,r.offsetWidth);
return p
},cachePosition:function(d,e){if(d){this.lastPageX=d;
this.lastPageY=e
}else{var g=Ext.lib.Dom.getXY(this.getEl());
this.lastPageX=g[0];
this.lastPageY=g[1]
}},autoScroll:function(u,v,z,t){if(this.scroll){var s=Ext.lib.Dom.getViewHeight();
var C=Ext.lib.Dom.getViewWidth();
var h=this.DDM.getScrollTop();
var A=this.DDM.getScrollLeft();
var w=z+v;
var r=t+u;
var x=(s+h-v-this.deltaY);
var y=(C+A-u-this.deltaX);
var B=40;
var D=(document.all)?80:30;
if(w>s&&x<B){window.scrollTo(A,h+D)
}if(v<h&&h>0&&v-h<B){window.scrollTo(A,h-D)
}if(r>C&&y<B){window.scrollTo(A+D,h)
}if(u<A&&A>0&&u-A<B){window.scrollTo(A-D,h)
}}},getTargetCoord:function(j,e){var g=j-this.deltaX;
var h=e-this.deltaY;
if(this.constrainX){if(g<this.minX){g=this.minX
}if(g>this.maxX){g=this.maxX
}}if(this.constrainY){if(h<this.minY){h=this.minY
}if(h>this.maxY){h=this.maxY
}}g=this.getTick(g,this.xTicks);
h=this.getTick(h,this.yTicks);
return{x:g,y:h}
},applyConfig:function(){Ext.dd.DD.superclass.applyConfig.call(this);
this.scroll=(this.config.scroll!==false)
},b4MouseDown:function(b){this.autoOffset(b.getPageX(),b.getPageY())
},b4Drag:function(b){this.setDragElPos(b.getPageX(),b.getPageY())
},toString:function(){return("DD "+this.id)
}});
Ext.dd.DDProxy=function(g,e,d){if(g){this.init(g,e,d);
this.initFrame()
}};
Ext.dd.DDProxy.dragElId="ygddfdiv";
Ext.extend(Ext.dd.DDProxy,Ext.dd.DD,{resizeFrame:true,centerFrame:false,createFrame:function(){var e=this;
var g=document.body;
if(!g||!g.firstChild){setTimeout(function(){e.createFrame()
},50);
return
}var h=this.getDragEl();
if(!h){h=document.createElement("div");
h.id=this.dragElId;
var j=h.style;
j.position="absolute";
j.visibility="hidden";
j.cursor="move";
j.border="2px solid #aaa";
j.zIndex=999;
g.insertBefore(h,g.firstChild)
}},initFrame:function(){this.createFrame()
},applyConfig:function(){Ext.dd.DDProxy.superclass.applyConfig.call(this);
this.resizeFrame=(this.config.resizeFrame!==false);
this.centerFrame=(this.config.centerFrame);
this.setDragElId(this.config.dragElId||Ext.dd.DDProxy.dragElId)
},showFrame:function(j,k){var l=this.getEl();
var h=this.getDragEl();
var g=h.style;
this._resizeProxy();
if(this.centerFrame){this.setDelta(Math.round(parseInt(g.width,10)/2),Math.round(parseInt(g.height,10)/2))
}this.setDragElPos(j,k);
Ext.fly(h).show()
},_resizeProxy:function(){if(this.resizeFrame){var b=this.getEl();
Ext.fly(this.getDragEl()).setSize(b.offsetWidth,b.offsetHeight)
}},b4MouseDown:function(d){var e=d.getPageX();
var g=d.getPageY();
this.autoOffset(e,g);
this.setDragElPos(e,g)
},b4StartDrag:function(d,c){this.showFrame(d,c)
},b4EndDrag:function(b){Ext.fly(this.getDragEl()).hide()
},endDrag:function(g){var d=this.getEl();
var e=this.getDragEl();
e.style.visibility="";
this.beforeMove();
d.style.visibility="hidden";
Ext.dd.DDM.moveToEl(d,e);
e.style.visibility="hidden";
d.style.visibility="";
this.afterDrag()
},beforeMove:function(){},afterDrag:function(){},toString:function(){return("DDProxy "+this.id)
}});
Ext.dd.DDTarget=function(g,e,d){if(g){this.initTarget(g,e,d)
}};
Ext.extend(Ext.dd.DDTarget,Ext.dd.DragDrop,{getDragEl:Ext.emptyFn,isValidHandleChild:Ext.emptyFn,startDrag:Ext.emptyFn,endDrag:Ext.emptyFn,onDrag:Ext.emptyFn,onDragDrop:Ext.emptyFn,onDragEnter:Ext.emptyFn,onDragOut:Ext.emptyFn,onDragOver:Ext.emptyFn,onInvalidDrop:Ext.emptyFn,onMouseDown:Ext.emptyFn,onMouseUp:Ext.emptyFn,setXConstraint:Ext.emptyFn,setYConstraint:Ext.emptyFn,resetConstraints:Ext.emptyFn,clearConstraints:Ext.emptyFn,clearTicks:Ext.emptyFn,setInitPosition:Ext.emptyFn,setDragElId:Ext.emptyFn,setHandleElId:Ext.emptyFn,setOuterHandleElId:Ext.emptyFn,addInvalidHandleClass:Ext.emptyFn,addInvalidHandleId:Ext.emptyFn,addInvalidHandleType:Ext.emptyFn,removeInvalidHandleClass:Ext.emptyFn,removeInvalidHandleId:Ext.emptyFn,removeInvalidHandleType:Ext.emptyFn,toString:function(){return("DDTarget "+this.id)
}});
Ext.dd.DragTracker=Ext.extend(Ext.util.Observable,{active:false,tolerance:5,autoStart:false,constructor:function(b){Ext.apply(this,b);
this.addEvents("mousedown","mouseup","mousemove","dragstart","dragend","drag");
this.dragRegion=new Ext.lib.Region(0,0,0,0);
if(this.el){this.initEl(this.el)
}Ext.dd.DragTracker.superclass.constructor.call(this,b)
},initEl:function(b){this.el=Ext.get(b);
b.on("mousedown",this.onMouseDown,this,this.delegate?{delegate:this.delegate}:undefined)
},destroy:function(){this.el.un("mousedown",this.onMouseDown,this)
},onMouseDown:function(g,d){if(this.fireEvent("mousedown",this,g)!==false&&this.onBeforeStart(g)!==false){this.startXY=this.lastXY=g.getXY();
this.dragTarget=this.delegate?d:this.el.dom;
if(this.preventDefault!==false){g.preventDefault()
}var e=Ext.getDoc();
e.on("mouseup",this.onMouseUp,this);
e.on("mousemove",this.onMouseMove,this);
e.on("selectstart",this.stopSelect,this);
if(this.autoStart){this.timer=this.triggerStart.defer(this.autoStart===true?1000:this.autoStart,this)
}}},onMouseMove:function(h,j){if(this.active&&Ext.isIE&&!h.browserEvent.button){h.preventDefault();
this.onMouseUp(h);
return
}h.preventDefault();
var e=h.getXY(),g=this.startXY;
this.lastXY=e;
if(!this.active){if(Math.abs(g[0]-e[0])>this.tolerance||Math.abs(g[1]-e[1])>this.tolerance){this.triggerStart()
}else{return
}}this.fireEvent("mousemove",this,h);
this.onDrag(h);
this.fireEvent("drag",this,h)
},onMouseUp:function(g){var d=Ext.getDoc();
d.un("mousemove",this.onMouseMove,this);
d.un("mouseup",this.onMouseUp,this);
d.un("selectstart",this.stopSelect,this);
g.preventDefault();
this.clearStart();
var e=this.active;
this.active=false;
delete this.elRegion;
this.fireEvent("mouseup",this,g);
if(e){this.onEnd(g);
this.fireEvent("dragend",this,g)
}},triggerStart:function(b){this.clearStart();
this.active=true;
this.onStart(this.startXY);
this.fireEvent("dragstart",this,this.startXY)
},clearStart:function(){if(this.timer){clearTimeout(this.timer);
delete this.timer
}},stopSelect:function(b){b.stopEvent();
return false
},onBeforeStart:function(b){},onStart:function(b){},onDrag:function(b){},onEnd:function(b){},getDragTarget:function(){return this.dragTarget
},getDragCt:function(){return this.el
},getXY:function(b){return b?this.constrainModes[b].call(this,this.lastXY):this.lastXY
},getOffset:function(g){var d=this.getXY(g);
var e=this.startXY;
return[e[0]-d[0],e[1]-d[1]]
},constrainModes:{point:function(c){if(!this.elRegion){this.elRegion=this.getDragCt().getRegion()
}var d=this.dragRegion;
d.left=c[0];
d.top=c[1];
d.right=c[0];
d.bottom=c[1];
d.constrainTo(this.elRegion);
return[d.left,d.top]
}}});
Ext.dd.ScrollManager=function(){var t=Ext.dd.DragDropMgr;
var r={};
var u=null;
var o={};
var p=function(a){u=null;
v()
};
var n=function(){if(t.dragCurrent){t.refreshCache(t.dragCurrent.groups)
}};
var s=function(){if(t.dragCurrent){var a=Ext.dd.ScrollManager;
var b=o.el.ddScrollConfig?o.el.ddScrollConfig.increment:a.increment;
if(!a.animate){if(o.el.scroll(o.dir,b)){n()
}}else{o.el.scroll(o.dir,b,true,a.animDuration,n)
}}};
var v=function(){if(o.id){clearInterval(o.id)
}o.id=0;
o.el=null;
o.dir=""
};
var q=function(c,a){v();
o.el=c;
o.dir=a;
var b=(c.ddScrollConfig&&c.ddScrollConfig.frequency)?c.ddScrollConfig.frequency:Ext.dd.ScrollManager.frequency;
o.id=setInterval(s,b)
};
var m=function(b,k){if(k||!t.dragCurrent){return
}var j=Ext.dd.ScrollManager;
if(!u||u!=t.dragCurrent){u=t.dragCurrent;
j.refreshCache()
}var h=Ext.lib.Event.getXY(b);
var g=new Ext.lib.Point(h[0],h[1]);
for(var d in r){var c=r[d],e=c._region;
var a=c.ddScrollConfig?c.ddScrollConfig:j;
if(e&&e.contains(g)&&c.isScrollable()){if(e.bottom-g.y<=a.vthresh){if(o.el!=c){q(c,"down")
}return
}else{if(e.right-g.x<=a.hthresh){if(o.el!=c){q(c,"left")
}return
}else{if(g.y-e.top<=a.vthresh){if(o.el!=c){q(c,"up")
}return
}else{if(g.x-e.left<=a.hthresh){if(o.el!=c){q(c,"right")
}return
}}}}}}v()
};
t.fireEvents=t.fireEvents.createSequence(m,t);
t.stopDrag=t.stopDrag.createSequence(p,t);
return{register:function(b){if(Ext.isArray(b)){for(var c=0,a=b.length;
c<a;
c++){this.register(b[c])
}}else{b=Ext.get(b);
r[b.id]=b
}},unregister:function(b){if(Ext.isArray(b)){for(var c=0,a=b.length;
c<a;
c++){this.unregister(b[c])
}}else{b=Ext.get(b);
delete r[b.id]
}},vthresh:25,hthresh:25,increment:100,frequency:500,animate:true,animDuration:0.4,refreshCache:function(){for(var a in r){if(typeof r[a]=="object"){r[a]._region=r[a].getRegion()
}}}}
}();
Ext.dd.Registry=function(){var h={};
var e={};
var g=0;
var j=function(b,c){if(typeof b=="string"){return b
}var a=b.id;
if(!a&&c!==false){a="extdd-"+(++g);
b.id=a
}return a
};
return{register:function(b,a){a=a||{};
if(typeof b=="string"){b=document.getElementById(b)
}a.ddel=b;
h[j(b)]=a;
if(a.isHandle!==false){e[a.ddel.id]=a
}if(a.handles){var c=a.handles;
for(var d=0,l=c.length;
d<l;
d++){e[j(c[d])]=a
}}},unregister:function(c){var a=j(c,false);
var b=h[a];
if(b){delete h[a];
if(b.handles){var d=b.handles;
for(var m=0,n=d.length;
m<n;
m++){delete e[j(d[m],false)]
}}}},getHandle:function(a){if(typeof a!="string"){a=a.id
}return e[a]
},getHandleFromEvent:function(a){var b=Ext.lib.Event.getTarget(a);
return b?e[b.id]:null
},getTarget:function(a){if(typeof a!="string"){a=a.id
}return h[a]
},getTargetFromEvent:function(a){var b=Ext.lib.Event.getTarget(a);
return b?h[b.id]||e[b.id]:null
}}
}();
Ext.dd.StatusProxy=function(b){Ext.apply(this,b);
this.id=this.id||Ext.id();
this.el=new Ext.Layer({dh:{id:this.id,tag:"div",cls:"x-dd-drag-proxy "+this.dropNotAllowed,children:[{tag:"div",cls:"x-dd-drop-icon"},{tag:"div",cls:"x-dd-drag-ghost"}]},shadow:!b||b.shadow!==false});
this.ghost=Ext.get(this.el.dom.childNodes[1]);
this.dropStatus=this.dropNotAllowed
};
Ext.dd.StatusProxy.prototype={dropAllowed:"x-dd-drop-ok",dropNotAllowed:"x-dd-drop-nodrop",setStatus:function(b){b=b||this.dropNotAllowed;
if(this.dropStatus!=b){this.el.replaceClass(this.dropStatus,b);
this.dropStatus=b
}},reset:function(b){this.el.dom.className="x-dd-drag-proxy "+this.dropNotAllowed;
this.dropStatus=this.dropNotAllowed;
if(b){this.ghost.update("")
}},update:function(d){if(typeof d=="string"){this.ghost.update(d)
}else{this.ghost.update("");
d.style.margin="0";
this.ghost.dom.appendChild(d)
}var c=this.ghost.dom.firstChild;
if(c){Ext.fly(c).setStyle("float","none")
}},getEl:function(){return this.el
},getGhost:function(){return this.ghost
},hide:function(b){this.el.hide();
if(b){this.reset(true)
}},stop:function(){if(this.anim&&this.anim.isAnimated&&this.anim.isAnimated()){this.anim.stop()
}},show:function(){this.el.show()
},sync:function(){this.el.sync()
},repair:function(d,g,e){this.callback=g;
this.scope=e;
if(d&&this.animRepair!==false){this.el.addClass("x-dd-drag-repair");
this.el.hideUnders(true);
this.anim=this.el.shift({duration:this.repairDuration||0.5,easing:"easeOut",xy:d,stopFx:true,callback:this.afterRepair,scope:this})
}else{this.afterRepair()
}},afterRepair:function(){this.hide(true);
if(typeof this.callback=="function"){this.callback.call(this.scope||this)
}this.callback=null;
this.scope=null
},destroy:function(){Ext.destroy(this.ghost,this.el)
}};
Ext.dd.DragSource=function(c,d){this.el=Ext.get(c);
if(!this.dragData){this.dragData={}
}Ext.apply(this,d);
if(!this.proxy){this.proxy=new Ext.dd.StatusProxy()
}Ext.dd.DragSource.superclass.constructor.call(this,this.el.dom,this.ddGroup||this.group,{dragElId:this.proxy.id,resizeFrame:false,isTarget:false,scroll:this.scroll===true});
this.dragging=false
};
Ext.extend(Ext.dd.DragSource,Ext.dd.DDProxy,{dropAllowed:"x-dd-drop-ok",dropNotAllowed:"x-dd-drop-nodrop",getDragData:function(b){return this.dragData
},onDragEnter:function(j,h){var e=Ext.dd.DragDropMgr.getDDById(h);
this.cachedTarget=e;
if(this.beforeDragEnter(e,j,h)!==false){if(e.isNotifyTarget){var g=e.notifyEnter(this,j,this.dragData);
this.proxy.setStatus(g)
}else{this.proxy.setStatus(this.dropAllowed)
}if(this.afterDragEnter){this.afterDragEnter(e,j,h)
}}},beforeDragEnter:function(d,e,g){return true
},alignElWithMouse:function(){Ext.dd.DragSource.superclass.alignElWithMouse.apply(this,arguments);
this.proxy.sync()
},onDragOver:function(j,h){var e=this.cachedTarget||Ext.dd.DragDropMgr.getDDById(h);
if(this.beforeDragOver(e,j,h)!==false){if(e.isNotifyTarget){var g=e.notifyOver(this,j,this.dragData);
this.proxy.setStatus(g)
}if(this.afterDragOver){this.afterDragOver(e,j,h)
}}},beforeDragOver:function(d,e,g){return true
},onDragOut:function(d,g){var e=this.cachedTarget||Ext.dd.DragDropMgr.getDDById(g);
if(this.beforeDragOut(e,d,g)!==false){if(e.isNotifyTarget){e.notifyOut(this,d,this.dragData)
}this.proxy.reset();
if(this.afterDragOut){this.afterDragOut(e,d,g)
}}this.cachedTarget=null
},beforeDragOut:function(d,e,g){return true
},onDragDrop:function(d,g){var e=this.cachedTarget||Ext.dd.DragDropMgr.getDDById(g);
if(this.beforeDragDrop(e,d,g)!==false){if(e.isNotifyTarget){if(e.notifyDrop(this,d,this.dragData)){this.onValidDrop(e,d,g)
}else{this.onInvalidDrop(e,d,g)
}}else{this.onValidDrop(e,d,g)
}if(this.afterDragDrop){this.afterDragDrop(e,d,g)
}}delete this.cachedTarget
},beforeDragDrop:function(d,e,g){return true
},onValidDrop:function(d,e,g){this.hideProxy();
if(this.afterValidDrop){this.afterValidDrop(d,e,g)
}},getRepairXY:function(c,d){return this.el.getXY()
},onInvalidDrop:function(d,e,g){this.beforeInvalidDrop(d,e,g);
if(this.cachedTarget){if(this.cachedTarget.isNotifyTarget){this.cachedTarget.notifyOut(this,e,this.dragData)
}this.cacheTarget=null
}this.proxy.repair(this.getRepairXY(e,this.dragData),this.afterRepair,this);
if(this.afterInvalidDrop){this.afterInvalidDrop(e,g)
}},afterRepair:function(){if(Ext.enableFx){this.el.highlight(this.hlColor||"c3daf9")
}this.dragging=false
},beforeInvalidDrop:function(d,e,g){return true
},handleMouseDown:function(c){if(this.dragging){return
}var d=this.getDragData(c);
if(d&&this.onBeforeDrag(d,c)!==false){this.dragData=d;
this.proxy.stop();
Ext.dd.DragSource.superclass.handleMouseDown.apply(this,arguments)
}},onBeforeDrag:function(d,c){return true
},onStartDrag:Ext.emptyFn,startDrag:function(d,c){this.proxy.reset();
this.dragging=true;
this.proxy.update("");
this.onInitDrag(d,c);
this.proxy.show()
},onInitDrag:function(e,g){var d=this.el.dom.cloneNode(true);
d.id=Ext.id();
this.proxy.update(d);
this.onStartDrag(e,g);
return true
},getProxy:function(){return this.proxy
},hideProxy:function(){this.proxy.hide();
this.proxy.reset(true);
this.dragging=false
},triggerCacheRefresh:function(){Ext.dd.DDM.refreshCache(this.groups)
},b4EndDrag:function(b){},endDrag:function(b){this.onEndDrag(this.dragData,b)
},onEndDrag:function(d,c){},autoOffset:function(d,c){this.setDelta(-12,-20)
},destroy:function(){Ext.dd.DragSource.superclass.destroy.call(this);
Ext.destroy(this.proxy)
}});
Ext.dd.DropTarget=function(c,d){this.el=Ext.get(c);
Ext.apply(this,d);
if(this.containerScroll){Ext.dd.ScrollManager.register(this.el)
}Ext.dd.DropTarget.superclass.constructor.call(this,this.el.dom,this.ddGroup||this.group,{isTarget:true})
};
Ext.extend(Ext.dd.DropTarget,Ext.dd.DDTarget,{dropAllowed:"x-dd-drop-ok",dropNotAllowed:"x-dd-drop-nodrop",isTarget:true,isNotifyTarget:true,notifyEnter:function(e,g,d){if(this.overClass){this.el.addClass(this.overClass)
}return this.dropAllowed
},notifyOver:function(e,g,d){return this.dropAllowed
},notifyOut:function(e,g,d){if(this.overClass){this.el.removeClass(this.overClass)
}},notifyDrop:function(e,g,d){return false
}});
Ext.dd.DragZone=function(c,d){Ext.dd.DragZone.superclass.constructor.call(this,c,d);
if(this.containerScroll){Ext.dd.ScrollManager.register(this.el)
}};
Ext.extend(Ext.dd.DragZone,Ext.dd.DragSource,{getDragData:function(b){return Ext.dd.Registry.getHandleFromEvent(b)
},onInitDrag:function(d,c){this.proxy.update(this.dragData.ddel.cloneNode(true));
this.onStartDrag(d,c);
return true
},afterRepair:function(){if(Ext.enableFx){Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor||"c3daf9")
}this.dragging=false
},getRepairXY:function(b){return Ext.Element.fly(this.dragData.ddel).getXY()
}});
Ext.dd.DropZone=function(c,d){Ext.dd.DropZone.superclass.constructor.call(this,c,d)
};
Ext.extend(Ext.dd.DropZone,Ext.dd.DropTarget,{getTargetFromEvent:function(b){return Ext.dd.Registry.getTargetFromEvent(b)
},onNodeEnter:function(h,g,j,e){},onNodeOver:function(h,g,j,e){return this.dropAllowed
},onNodeOut:function(h,g,j,e){},onNodeDrop:function(h,g,j,e){return false
},onContainerOver:function(e,g,d){return this.dropNotAllowed
},onContainerDrop:function(e,g,d){return false
},notifyEnter:function(e,g,d){return this.dropNotAllowed
},notifyOver:function(g,j,e){var h=this.getTargetFromEvent(j);
if(!h){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,g,j,e);
this.lastOverNode=null
}return this.onContainerOver(g,j,e)
}if(this.lastOverNode!=h){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,g,j,e)
}this.onNodeEnter(h,g,j,e);
this.lastOverNode=h
}return this.onNodeOver(h,g,j,e)
},notifyOut:function(e,g,d){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,e,g,d);
this.lastOverNode=null
}},notifyDrop:function(g,j,e){if(this.lastOverNode){this.onNodeOut(this.lastOverNode,g,j,e);
this.lastOverNode=null
}var h=this.getTargetFromEvent(j);
return h?this.onNodeDrop(h,g,j,e):this.onContainerDrop(g,j,e)
},triggerCacheRefresh:function(){Ext.dd.DDM.refreshCache(this.groups)
}});
Ext.Element.addMethods({initDD:function(j,e,h){var g=new Ext.dd.DD(Ext.id(this.dom),j,e);
return Ext.apply(g,h)
},initDDProxy:function(j,e,h){var g=new Ext.dd.DDProxy(Ext.id(this.dom),j,e);
return Ext.apply(g,h)
},initDDTarget:function(j,e,h){var g=new Ext.dd.DDTarget(Ext.id(this.dom),j,e);
return Ext.apply(g,h)
}});
Ext.data.Api=(function(){var b={};
return{actions:{create:"create",read:"read",update:"update",destroy:"destroy"},restActions:{create:"POST",read:"GET",update:"PUT",destroy:"DELETE"},isAction:function(a){return(Ext.data.Api.actions[a])?true:false
},getVerb:function(a){if(b[a]){return b[a]
}for(var d in this.actions){if(this.actions[d]===a){b[a]=d;
break
}}return(b[a]!==undefined)?b[a]:null
},isValid:function(a){var g=[];
var h=this.actions;
for(var j in a){if(!(j in h)){g.push(j)
}}return(!g.length)?true:g
},hasUniqueUrl:function(l,h){var a=(l.api[h])?l.api[h].url:null;
var j=true;
for(var k in l.api){if((j=(k===h)?true:(l.api[k].url!=a)?true:false)===false){break
}}return j
},prepare:function(a){if(!a.api){a.api={}
}for(var e in this.actions){var g=this.actions[e];
a.api[g]=a.api[g]||a.url||a.directFn;
if(typeof(a.api[g])=="string"){a.api[g]={url:a.api[g],method:(a.restful===true)?Ext.data.Api.restActions[g]:undefined}
}}},restify:function(a){a.restful=true;
for(var d in this.restActions){a.api[this.actions[d]].method=this.restActions[d]
}a.onWrite=a.onWrite.createInterceptor(function(l,c,n,o){var p=c.reader;
var m=new Ext.data.Response({action:l,raw:n});
switch(n.status){case 200:return true;
break;
case 201:m.success=true;
break;
case 204:m.success=true;
m.data=null;
break;
default:return true;
break
}if(m.success===true){this.fireEvent("write",this,l,m.data,m,o,c.request.arg)
}else{this.fireEvent("exception",this,"remote",l,c,m,o)
}c.request.callback.call(c.request.scope,m.data,m,m.success);
return false
},a)
}}
})();
Ext.data.Response=function(c,d){Ext.apply(this,c,{raw:d})
};
Ext.data.Response.prototype={message:null,success:false,status:null,root:null,raw:null,getMessage:function(){return this.message
},getSuccess:function(){return this.success
},getStatus:function(){return this.status
},getRoot:function(){return this.root
},getRawResponse:function(){return this.raw
}};
Ext.data.Api.Error=Ext.extend(Ext.Error,{constructor:function(c,d){this.arg=d;
Ext.Error.call(this,c)
},name:"Ext.data.Api"});
Ext.apply(Ext.data.Api.Error.prototype,{lang:{"action-url-undefined":"No fallback url defined for this action.  When defining a DataProxy api, please be sure to define an url for each CRUD action in Ext.data.Api.actions or define a default url in addition to your api-configuration.",invalid:"received an invalid API-configuration.  Please ensure your proxy API-configuration contains only the actions defined in Ext.data.Api.actions","invalid-url":"Invalid url.  Please review your proxy configuration.",execute:'Attempted to execute an unknown action.  Valid API actions are defined in Ext.data.Api.actions"'}});
Ext.data.SortTypes={none:function(b){return b
},stripTagsRE:/<\/?[^>]+>/gi,asText:function(b){return String(b).replace(this.stripTagsRE,"")
},asUCText:function(b){return String(b).toUpperCase().replace(this.stripTagsRE,"")
},asUCString:function(b){return String(b).toUpperCase()
},asDate:function(b){if(!b){return 0
}if(Ext.isDate(b)){return b.getTime()
}return Date.parse(String(b))
},asFloat:function(d){var c=parseFloat(String(d).replace(/,/g,""));
return isNaN(c)?0:c
},asInt:function(d){var c=parseInt(String(d).replace(/,/g,""),10);
return isNaN(c)?0:c
}};
Ext.data.Record=function(d,c){this.id=(c||c===0)?c:Ext.data.Record.id(this);
this.data=d||{}
};
Ext.data.Record.create=function(j){var l=Ext.extend(Ext.data.Record,{});
var k=l.prototype;
k.fields=new Ext.util.MixedCollection(false,function(a){return a.name
});
for(var g=0,h=j.length;
g<h;
g++){k.fields.add(new Ext.data.Field(j[g]))
}l.getField=function(a){return k.fields.get(a)
};
return l
};
Ext.data.Record.PREFIX="ext-record";
Ext.data.Record.AUTO_ID=1;
Ext.data.Record.EDIT="edit";
Ext.data.Record.REJECT="reject";
Ext.data.Record.COMMIT="commit";
Ext.data.Record.id=function(b){b.phantom=true;
return[Ext.data.Record.PREFIX,"-",Ext.data.Record.AUTO_ID++].join("")
};
Ext.data.Record.prototype={dirty:false,editing:false,error:null,modified:null,phantom:false,join:function(b){this.store=b
},set:function(e,g){var d=Ext.isPrimitive(g)?String:Ext.encode;
if(d(this.data[e])==d(g)){return
}this.dirty=true;
if(!this.modified){this.modified={}
}if(this.modified[e]===undefined){this.modified[e]=this.data[e]
}this.data[e]=g;
if(!this.editing){this.afterEdit()
}},afterEdit:function(){if(this.store){this.store.afterEdit(this)
}},afterReject:function(){if(this.store){this.store.afterReject(this)
}},afterCommit:function(){if(this.store){this.store.afterCommit(this)
}},get:function(b){return this.data[b]
},beginEdit:function(){this.editing=true;
this.modified=this.modified||{}
},cancelEdit:function(){this.editing=false;
delete this.modified
},endEdit:function(){this.editing=false;
if(this.dirty){this.afterEdit()
}},reject:function(d){var e=this.modified;
for(var g in e){if(typeof e[g]!="function"){this.data[g]=e[g]
}}this.dirty=false;
delete this.modified;
this.editing=false;
if(d!==true){this.afterReject()
}},commit:function(b){this.dirty=false;
delete this.modified;
this.editing=false;
if(b!==true){this.afterCommit()
}},getChanges:function(){var e=this.modified,d={};
for(var g in e){if(e.hasOwnProperty(g)){d[g]=this.data[g]
}}return d
},hasError:function(){return this.error!==null
},clearError:function(){this.error=null
},copy:function(b){return new this.constructor(Ext.apply({},this.data),b||this.id)
},isModified:function(b){return !!(this.modified&&this.modified.hasOwnProperty(b))
},isValid:function(){return this.fields.find(function(b){return(b.allowBlank===false&&Ext.isEmpty(this.data[b.name]))?true:false
},this)?false:true
},markDirty:function(){this.dirty=true;
if(!this.modified){this.modified={}
}this.fields.each(function(b){this.modified[b.name]=this.data[b.name]
},this)
}};
Ext.StoreMgr=Ext.apply(new Ext.util.MixedCollection(),{register:function(){for(var d=0,c;
(c=arguments[d]);
d++){this.add(c)
}},unregister:function(){for(var d=0,c;
(c=arguments[d]);
d++){this.remove(this.lookup(c))
}},lookup:function(j){if(Ext.isArray(j)){var g=["field1"],k=!Ext.isArray(j[0]);
if(!k){for(var l=2,h=j[0].length;
l<=h;
++l){g.push("field"+l)
}}return new Ext.data.ArrayStore({fields:g,data:j,expandData:k,autoDestroy:true,autoCreated:true})
}return Ext.isObject(j)?(j.events?j:Ext.create(j,"store")):this.get(j)
},getKey:function(b){return b.storeId
}});
Ext.data.Store=Ext.extend(Ext.util.Observable,{writer:undefined,remoteSort:false,autoDestroy:false,pruneModifiedRecords:false,lastOptions:null,autoSave:true,batch:true,restful:false,paramNames:undefined,defaultParamNames:{start:"start",limit:"limit",sort:"sort",dir:"dir"},batchKey:"_ext_batch_",constructor:function(b){this.data=new Ext.util.MixedCollection(false);
this.data.getKey=function(a){return a.id
};
this.baseParams={};
this.removed=[];
if(b&&b.data){this.inlineData=b.data;
delete b.data
}Ext.apply(this,b);
this.paramNames=Ext.applyIf(this.paramNames||{},this.defaultParamNames);
if((this.url||this.api)&&!this.proxy){this.proxy=new Ext.data.HttpProxy({url:this.url,api:this.api})
}if(this.restful===true&&this.proxy){this.batch=false;
Ext.data.Api.restify(this.proxy)
}if(this.reader){if(!this.recordType){this.recordType=this.reader.recordType
}if(this.reader.onMetaChange){this.reader.onMetaChange=this.reader.onMetaChange.createSequence(this.onMetaChange,this)
}if(this.writer){if(this.writer instanceof (Ext.data.DataWriter)===false){this.writer=this.buildWriter(this.writer)
}this.writer.meta=this.reader.meta;
this.pruneModifiedRecords=true
}}if(this.recordType){this.fields=this.recordType.prototype.fields
}this.modified=[];
this.addEvents("datachanged","metachange","add","remove","update","clear","exception","beforeload","load","loadexception","beforewrite","write","beforesave","save");
if(this.proxy){this.relayEvents(this.proxy,["loadexception","exception"])
}if(this.writer){this.on({scope:this,add:this.createRecords,remove:this.destroyRecord,update:this.updateRecord,clear:this.onClear})
}this.sortToggle={};
if(this.sortField){this.setDefaultSort(this.sortField,this.sortDir)
}else{if(this.sortInfo){this.setDefaultSort(this.sortInfo.field,this.sortInfo.direction)
}}Ext.data.Store.superclass.constructor.call(this);
if(this.id){this.storeId=this.id;
delete this.id
}if(this.storeId){Ext.StoreMgr.register(this)
}if(this.inlineData){this.loadData(this.inlineData);
delete this.inlineData
}else{if(this.autoLoad){this.load.defer(10,this,[typeof this.autoLoad=="object"?this.autoLoad:undefined])
}}this.batchCounter=0;
this.batches={}
},buildWriter:function(c){var d=undefined;
type=(c.format||"json").toLowerCase();
switch(type){case"json":d=Ext.data.JsonWriter;
break;
case"xml":d=Ext.data.XmlWriter;
break;
default:d=Ext.data.JsonWriter
}return new d(c)
},destroy:function(){if(!this.isDestroyed){if(this.storeId){Ext.StoreMgr.unregister(this)
}this.clearData();
this.data=null;
Ext.destroy(this.proxy);
this.reader=this.writer=null;
this.purgeListeners();
this.isDestroyed=true
}},add:function(e){e=[].concat(e);
if(e.length<1){return
}for(var h=0,g=e.length;
h<g;
h++){e[h].join(this)
}var j=this.data.length;
this.data.addAll(e);
if(this.snapshot){this.snapshot.addAll(e)
}this.fireEvent("add",this,e,j)
},addSorted:function(d){var c=this.findInsertIndex(d);
this.insert(c,d)
},remove:function(d){if(Ext.isArray(d)){Ext.each(d,function(a){this.remove(a)
},this)
}var c=this.data.indexOf(d);
if(c>-1){d.join(null);
this.data.removeAt(c)
}if(this.pruneModifiedRecords){this.modified.remove(d)
}if(this.snapshot){this.snapshot.remove(d)
}if(c>-1){this.fireEvent("remove",this,d,c)
}},removeAt:function(b){this.remove(this.getAt(b))
},removeAll:function(c){var d=[];
this.each(function(a){d.push(a)
});
this.clearData();
if(this.snapshot){this.snapshot.clear()
}if(this.pruneModifiedRecords){this.modified=[]
}if(c!==true){this.fireEvent("clear",this,d)
}},onClear:function(c,d){Ext.each(d,function(a,b){this.destroyRecord(this,a,b)
},this)
},insert:function(j,e){e=[].concat(e);
for(var h=0,g=e.length;
h<g;
h++){this.data.insert(j,e[h]);
e[h].join(this)
}if(this.snapshot){this.snapshot.addAll(e)
}this.fireEvent("add",this,e,j)
},indexOf:function(b){return this.data.indexOf(b)
},indexOfId:function(b){return this.data.indexOfKey(b)
},getById:function(b){return(this.snapshot||this.data).key(b)
},getAt:function(b){return this.data.itemAt(b)
},getRange:function(c,d){return this.data.getRange(c,d)
},storeOptions:function(b){b=Ext.apply({},b);
delete b.callback;
delete b.scope;
this.lastOptions=b
},clearData:function(){this.data.each(function(b){b.join(null)
});
this.data.clear()
},load:function(d){d=d||{};
this.storeOptions(d);
if(this.sortInfo&&this.remoteSort){var e=this.paramNames;
d.params=d.params||{};
d.params[e.sort]=this.sortInfo.field;
d.params[e.dir]=this.sortInfo.direction
}try{return this.execute("read",null,d)
}catch(g){this.handleException(g);
return false
}},updateRecord:function(d,e,g){if(g==Ext.data.Record.EDIT&&this.autoSave===true&&(!e.phantom||(e.phantom&&e.isValid()))){this.save()
}},createRecords:function(l,g,k){for(var j=0,h=g.length;
j<h;
j++){if(g[j].phantom&&g[j].isValid()){g[j].markDirty();
this.modified.push(g[j])
}}if(this.autoSave===true){this.save()
}},destroyRecord:function(d,e,g){if(this.modified.indexOf(e)!=-1){this.modified.remove(e)
}if(!e.phantom){this.removed.push(e);
e.lastIndex=g;
if(this.autoSave===true){this.save()
}}},execute:function(j,h,l,g){if(!Ext.data.Api.isAction(j)){throw new Ext.data.Api.Error("execute",j)
}l=Ext.applyIf(l||{},{params:{}});
if(g!==undefined){this.addToBatch(g)
}var k=true;
if(j==="read"){Ext.applyIf(l.params,this.baseParams);
k=this.fireEvent("beforeload",this,l)
}else{if(this.writer.listful===true&&this.restful!==true){h=(Ext.isArray(h))?h:[h]
}else{if(Ext.isArray(h)&&h.length==1){h=h.shift()
}}if((k=this.fireEvent("beforewrite",this,j,h,l))!==false){this.writer.apply(l.params,this.baseParams,j,h)
}}if(k!==false){if(this.writer&&this.proxy.url&&!this.proxy.restful&&!Ext.data.Api.hasUniqueUrl(this.proxy,j)){l.params.xaction=j
}this.proxy.request(Ext.data.Api.actions[j],h,l.params,this.reader,this.createCallback(j,h,g),this,l)
}return k
},save:function(){if(!this.writer){throw new Ext.data.Store.Error("writer-undefined")
}var n=[],m,l,p,r={};
if(this.removed.length){n.push(["destroy",this.removed])
}var s=[].concat(this.getModifiedRecords());
if(s.length){var o=[];
for(var q=s.length-1;
q>=0;
q--){if(s[q].phantom===true){var t=s.splice(q,1).shift();
if(t.isValid()){o.push(t)
}}else{if(!s[q].isValid()){s.splice(q,1)
}}}if(o.length){n.push(["create",o])
}if(s.length){n.push(["update",s])
}}m=n.length;
if(m){p=++this.batchCounter;
for(var q=0;
q<m;
++q){l=n[q];
r[l[0]]=l[1]
}if(this.fireEvent("beforesave",this,r)!==false){for(var q=0;
q<m;
++q){l=n[q];
this.doTransaction(l[0],l[1],p)
}return p
}}return -1
},doTransaction:function(l,h,n){function k(b){try{this.execute(l,b,undefined,n)
}catch(a){this.handleException(a)
}}if(this.batch===false){for(var m=0,j=h.length;
m<j;
m++){k.call(this,h[m])
}}else{k.call(this,h)
}},addToBatch:function(j){var b=this.batches,h=this.batchKey+j,g=b[h];
if(!g){b[h]=g={id:j,count:0,data:{}}
}++g.count
},removeFromBatch:function(o,l,m){var p=this.batches,n=this.batchKey+o,k=p[n],m,b;
if(k){b=k.data[l]||[];
k.data[l]=b.concat(m);
if(k.count===1){m=k.data;
delete p[n];
this.fireEvent("save",this,o,m)
}else{--k.count
}}},createCallback:function(j,g,e){var h=Ext.data.Api.actions;
return(j=="read")?this.loadRecords:function(b,c,a){this["on"+Ext.util.Format.capitalize(j)+"Records"](a,g,[].concat(b));
if(a===true){this.fireEvent("write",this,j,b,c,g)
}this.removeFromBatch(e,j,b)
}
},clearModified:function(d){if(Ext.isArray(d)){for(var c=d.length-1;
c>=0;
c--){this.modified.splice(this.modified.indexOf(d[c]),1)
}}else{this.modified.splice(this.modified.indexOf(d),1)
}},reMap:function(e){if(Ext.isArray(e)){for(var h=0,g=e.length;
h<g;
h++){this.reMap(e[h])
}}else{delete this.data.map[e._phid];
this.data.map[e.id]=e;
var j=this.data.keys.indexOf(e._phid);
this.data.keys.splice(j,1,e.id);
delete e._phid
}},onCreateRecords:function(h,g,e){if(h===true){try{this.reader.realize(g,e);
this.reMap(g)
}catch(j){this.handleException(j);
if(Ext.isArray(g)){this.onCreateRecords(h,g,e)
}}}},onUpdateRecords:function(h,g,e){if(h===true){try{this.reader.update(g,e)
}catch(j){this.handleException(j);
if(Ext.isArray(g)){this.onUpdateRecords(h,g,e)
}}}},onDestroyRecords:function(j,g,k){g=(g instanceof Ext.data.Record)?[g]:[].concat(g);
for(var l=0,h=g.length;
l<h;
l++){this.removed.splice(this.removed.indexOf(g[l]),1)
}if(j===false){for(l=g.length-1;
l>=0;
l--){this.insert(g[l].lastIndex,g[l])
}}},handleException:function(b){Ext.handleError(b)
},reload:function(b){this.load(Ext.applyIf(b||{},this.lastOptions))
},loadRecords:function(l,j,m){if(this.isDestroyed===true){return
}if(!l||m===false){if(m!==false){this.fireEvent("load",this,[],j)
}if(j.callback){j.callback.call(j.scope||this,[],j,false,l)
}return
}var n=l.records,o=l.totalRecords||n.length;
if(!j||j.add!==true){if(this.pruneModifiedRecords){this.modified=[]
}for(var p=0,k=n.length;
p<k;
p++){n[p].join(this)
}if(this.snapshot){this.data=this.snapshot;
delete this.snapshot
}this.clearData();
this.data.addAll(n);
this.totalLength=o;
this.applySort();
this.fireEvent("datachanged",this)
}else{this.totalLength=Math.max(o,this.data.length+n.length);
this.add(n)
}this.fireEvent("load",this,n,j);
if(j.callback){j.callback.call(j.scope||this,n,j,true)
}},loadData:function(g,e){var d=this.reader.readRecords(g);
this.loadRecords(d,{add:e},true)
},getCount:function(){return this.data.length||0
},getTotalCount:function(){return this.totalLength||0
},getSortState:function(){return this.sortInfo
},applySort:function(){if(this.sortInfo&&!this.remoteSort){var d=this.sortInfo,c=d.field;
this.sortData(c,d.direction)
}},sortData:function(j,h){h=h||"ASC";
var g=this.fields.get(j).sortType;
var e=function(c,d){var a=g(c.data[j]),b=g(d.data[j]);
return a>b?1:(a<b?-1:0)
};
this.data.sort(h,e);
if(this.snapshot&&this.snapshot!=this.data){this.snapshot.sort(h,e)
}},setDefaultSort:function(c,d){d=d?d.toUpperCase():"ASC";
this.sortInfo={field:c,direction:d};
this.sortToggle[c]=d
},sort:function(j,l){var k=this.fields.get(j);
if(!k){return false
}if(!l){if(this.sortInfo&&this.sortInfo.field==k.name){l=(this.sortToggle[k.name]||"ASC").toggle("ASC","DESC")
}else{l=k.sortDir
}}var g=(this.sortToggle)?this.sortToggle[k.name]:null;
var h=(this.sortInfo)?this.sortInfo:null;
this.sortToggle[k.name]=l;
this.sortInfo={field:k.name,direction:l};
if(!this.remoteSort){this.applySort();
this.fireEvent("datachanged",this)
}else{if(!this.load(this.lastOptions)){if(g){this.sortToggle[k.name]=g
}if(h){this.sortInfo=h
}}}},each:function(c,d){this.data.each(c,d)
},getModifiedRecords:function(){return this.modified
},createFilterFn:function(j,e,h,g){if(Ext.isEmpty(e,false)){return false
}e=this.data.createValueMatcher(e,h,g);
return function(a){return e.test(a.data[j])
}
},sum:function(l,k,j){var n=this.data.items,h=0;
k=k||0;
j=(j||j===0)?j:n.length-1;
for(var m=k;
m<=j;
m++){h+=(n[m].data[l]||0)
}return h
},filter:function(k,l,j,h){var g=this.createFilterFn(k,l,j,h);
return g?this.filterBy(g):this.clearFilter()
},filterBy:function(c,d){this.snapshot=this.snapshot||this.data;
this.data=this.queryBy(c,d||this);
this.fireEvent("datachanged",this)
},query:function(k,l,j,h){var g=this.createFilterFn(k,l,j,h);
return g?this.queryBy(g):this.data.clone()
},queryBy:function(d,e){var g=this.snapshot||this.data;
return g.filterBy(d,e||this)
},find:function(m,n,k,l,j){var h=this.createFilterFn(m,n,l,j);
return h?this.data.findIndexBy(h,null,k):-1
},findExact:function(d,e,g){return this.data.findIndexBy(function(a){return a.get(d)===e
},this,g)
},findBy:function(d,e,g){return this.data.findIndexBy(d,e,g)
},collect:function(p,o,u){var q=(u===true&&this.snapshot)?this.snapshot.items:this.data.items;
var l,d,v=[],t={};
for(var s=0,r=q.length;
s<r;
s++){l=q[s].data[p];
d=String(l);
if((o||!Ext.isEmpty(l))&&!t[d]){t[d]=true;
v[v.length]=l
}}return v
},clearFilter:function(b){if(this.isFiltered()){this.data=this.snapshot;
delete this.snapshot;
if(b!==true){this.fireEvent("datachanged",this)
}}},isFiltered:function(){return this.snapshot&&this.snapshot!=this.data
},afterEdit:function(b){if(this.modified.indexOf(b)==-1){this.modified.push(b)
}this.fireEvent("update",this,b,Ext.data.Record.EDIT)
},afterReject:function(b){this.modified.remove(b);
this.fireEvent("update",this,b,Ext.data.Record.REJECT)
},afterCommit:function(b){this.modified.remove(b);
this.fireEvent("update",this,b,Ext.data.Record.COMMIT)
},commitChanges:function(){var d=this.modified.slice(0);
this.modified=[];
for(var g=0,e=d.length;
g<e;
g++){d[g].commit()
}},rejectChanges:function(){var d=this.modified.slice(0);
this.modified=[];
for(var g=0,e=d.length;
g<e;
g++){d[g].reject()
}var d=this.removed.slice(0).reverse();
this.removed=[];
for(var g=0,e=d.length;
g<e;
g++){this.insert(d[g].lastIndex||0,d[g]);
d[g].reject()
}},onMetaChange:function(b){this.recordType=this.reader.recordType;
this.fields=this.recordType.prototype.fields;
delete this.snapshot;
if(this.reader.meta.sortInfo){this.sortInfo=this.reader.meta.sortInfo
}else{if(this.sortInfo&&!this.fields.get(this.sortInfo.field)){delete this.sortInfo
}}if(this.writer){this.writer.meta=this.reader.meta
}this.modified=[];
this.fireEvent("metachange",this,this.reader.meta)
},findInsertIndex:function(e){this.suspendEvents();
var g=this.data.clone();
this.data.add(e);
this.applySort();
var d=this.data.indexOf(e);
this.data=g;
this.resumeEvents();
return d
},setBaseParam:function(d,c){this.baseParams=this.baseParams||{};
this.baseParams[d]=c
}});
Ext.reg("store",Ext.data.Store);
Ext.data.Store.Error=Ext.extend(Ext.Error,{name:"Ext.data.Store"});
Ext.apply(Ext.data.Store.Error.prototype,{lang:{"writer-undefined":"Attempted to execute a write-action without a DataWriter installed."}});
Ext.data.Field=function(k){if(typeof k=="string"){k={name:k}
}Ext.apply(this,k);
if(!this.type){this.type="auto"
}var l=Ext.data.SortTypes;
if(typeof this.sortType=="string"){this.sortType=l[this.sortType]
}if(!this.sortType){switch(this.type){case"string":this.sortType=l.asUCString;
break;
case"date":this.sortType=l.asDate;
break;
default:this.sortType=l.none
}}var j=/[\$,%]/g;
if(!this.convert){var g,h=this.dateFormat;
switch(this.type){case"":case"auto":case undefined:g=function(a){return a
};
break;
case"string":g=function(a){return(a===undefined||a===null)?"":String(a)
};
break;
case"int":g=function(a){return a!==undefined&&a!==null&&a!==""?parseInt(String(a).replace(j,""),10):""
};
break;
case"float":g=function(a){return a!==undefined&&a!==null&&a!==""?parseFloat(String(a).replace(j,""),10):""
};
break;
case"bool":g=function(a){return a===true||a==="true"||a==1
};
break;
case"date":g=function(a){if(!a){return""
}if(Ext.isDate(a)){return a
}if(h){if(h=="timestamp"){return new Date(a*1000)
}if(h=="time"){return new Date(parseInt(a,10))
}return Date.parseDate(a,h)
}var b=Date.parse(a);
return b?new Date(b):null
};
break;
default:g=function(a){return a
};
break
}this.convert=g
}};
Ext.data.Field.prototype={dateFormat:null,defaultValue:"",mapping:null,sortType:null,sortDir:"ASC",allowBlank:true};
Ext.data.DataReader=function(d,c){this.meta=d;
this.recordType=Ext.isArray(c)?Ext.data.Record.create(c):c;
if(this.recordType){this.buildExtractors()
}};
Ext.data.DataReader.prototype={getTotal:Ext.emptyFn,getRoot:Ext.emptyFn,getMessage:Ext.emptyFn,getSuccess:Ext.emptyFn,getId:Ext.emptyFn,buildExtractors:Ext.emptyFn,extractData:Ext.emptyFn,extractValues:Ext.emptyFn,realize:function(e,g){if(Ext.isArray(e)){for(var d=e.length-1;
d>=0;
d--){if(Ext.isArray(g)){this.realize(e.splice(d,1).shift(),g.splice(d,1).shift())
}else{this.realize(e.splice(d,1).shift(),g)
}}}else{if(Ext.isArray(g)&&g.length==1){g=g.shift()
}if(!this.isData(g)){throw new Ext.data.DataReader.Error("realize",e)
}e.phantom=false;
e._phid=e.id;
e.id=this.getId(g);
e.fields.each(function(a){if(g[a.name]!==a.defaultValue){e.data[a.name]=g[a.name]
}});
e.commit()
}},update:function(e,g){if(Ext.isArray(e)){for(var d=e.length-1;
d>=0;
d--){if(Ext.isArray(g)){this.update(e.splice(d,1).shift(),g.splice(d,1).shift())
}else{this.update(e.splice(d,1).shift(),g)
}}}else{if(Ext.isArray(g)&&g.length==1){g=g.shift()
}if(this.isData(g)){e.fields.each(function(a){if(g[a.name]!==a.defaultValue){e.data[a.name]=g[a.name]
}})
}e.commit()
}},extractData:function(r,z){var s=(this instanceof Ext.data.JsonReader)?"json":"node";
var x=[];
if(this.isData(r)&&!(this instanceof Ext.data.XmlReader)){r=[r]
}var t=this.recordType.prototype.fields,n=t.items,p=t.length,x=[];
if(z===true){var q=this.recordType;
for(var v=0;
v<r.length;
v++){var y=r[v];
var u=new q(this.extractValues(y,n,p),this.getId(y));
u[s]=y;
x.push(u)
}}else{for(var v=0;
v<r.length;
v++){var w=this.extractValues(r[v],n,p);
w[this.meta.idProperty]=this.getId(r[v]);
x.push(w)
}}return x
},isData:function(b){return(b&&Ext.isObject(b)&&!Ext.isEmpty(this.getId(b)))?true:false
},onMetaChange:function(b){delete this.ef;
this.meta=b;
this.recordType=Ext.data.Record.create(b.fields);
this.buildExtractors()
}};
Ext.data.DataReader.Error=Ext.extend(Ext.Error,{constructor:function(c,d){this.arg=d;
Ext.Error.call(this,c)
},name:"Ext.data.DataReader"});
Ext.apply(Ext.data.DataReader.Error.prototype,{lang:{update:"#update received invalid data from server.  Please see docs for DataReader#update and review your DataReader configuration.",realize:"#realize was called with invalid remote-data.  Please see the docs for DataReader#realize and review your DataReader configuration.","invalid-response":"#readResponse received an invalid response from the server."}});
Ext.data.DataWriter=function(b){Ext.apply(this,b)
};
Ext.data.DataWriter.prototype={writeAllFields:false,listful:false,apply:function(l,k,m,j){var n=[],h=m+"Record";
if(Ext.isArray(j)){Ext.each(j,function(a){n.push(this[h](a))
},this)
}else{if(j instanceof Ext.data.Record){n=this[h](j)
}}this.render(l,k,n)
},render:Ext.emptyFn,updateRecord:Ext.emptyFn,createRecord:Ext.emptyFn,destroyRecord:Ext.emptyFn,toHash:function(k,n){var l=k.fields.map,m={},h=(this.writeAllFields===false&&k.phantom===false)?k.getChanges():k.data,j;
Ext.iterate(h,function(a,b){if((j=l[a])){m[j.mapping?j.mapping:j.name]=b
}});
if(k.phantom){if(k.fields.containsKey(this.meta.idProperty)&&Ext.isEmpty(k.data[this.meta.idProperty])){delete m[this.meta.idProperty]
}}else{m[this.meta.idProperty]=k.id
}return m
},toArray:function(c){var d=[];
Ext.iterate(c,function(a,b){d.push({name:a,value:b})
},this);
return d
}};
Ext.data.DataProxy=function(d){d=d||{};
this.api=d.api;
this.url=d.url;
this.restful=d.restful;
this.listeners=d.listeners;
this.prettyUrls=d.prettyUrls;
this.addEvents("exception","beforeload","load","loadexception","beforewrite","write");
Ext.data.DataProxy.superclass.constructor.call(this);
try{Ext.data.Api.prepare(this)
}catch(c){if(c instanceof Ext.data.Api.Error){c.toConsole()
}}Ext.data.DataProxy.relayEvents(this,["beforewrite","write","exception"])
};
Ext.extend(Ext.data.DataProxy,Ext.util.Observable,{restful:false,setApi:function(){if(arguments.length==1){var b=Ext.data.Api.isValid(arguments[0]);
if(b===true){this.api=arguments[0]
}else{throw new Ext.data.Api.Error("invalid",b)
}}else{if(arguments.length==2){if(!Ext.data.Api.isAction(arguments[0])){throw new Ext.data.Api.Error("invalid",arguments[0])
}this.api[arguments[0]]=arguments[1]
}}Ext.data.Api.prepare(this)
},isApiAction:function(b){return(this.api[b])?true:false
},request:function(n,j,m,k,l,o,p){if(!this.api[n]&&!this.load){throw new Ext.data.DataProxy.Error("action-undefined",n)
}m=m||{};
if((n===Ext.data.Api.actions.read)?this.fireEvent("beforeload",this,m):this.fireEvent("beforewrite",this,n,j,m)!==false){this.doRequest.apply(this,arguments)
}else{l.call(o||this,null,p,false)
}},load:null,doRequest:function(n,j,m,k,l,o,p){this.load(m,k,l,o,p)
},onRead:Ext.emptyFn,onWrite:Ext.emptyFn,buildUrl:function(k,g){g=g||null;
var l=(this.conn&&this.conn.url)?this.conn.url:(this.api[k])?this.api[k].url:this.url;
if(!l){throw new Ext.data.Api.Error("invalid-url",k)
}var j=null;
var h=l.match(/(.*)(\.json|\.xml|\.html)$/);
if(h){j=h[2];
l=h[1]
}if((this.restful===true||this.prettyUrls===true)&&g instanceof Ext.data.Record&&!g.phantom){l+="/"+g.id
}return(j===null)?l:l+j
},destroy:function(){this.purgeListeners()
}});
Ext.apply(Ext.data.DataProxy,Ext.util.Observable.prototype);
Ext.util.Observable.call(Ext.data.DataProxy);
Ext.data.DataProxy.Error=Ext.extend(Ext.Error,{constructor:function(c,d){this.arg=d;
Ext.Error.call(this,c)
},name:"Ext.data.DataProxy"});
Ext.apply(Ext.data.DataProxy.Error.prototype,{lang:{"action-undefined":"DataProxy attempted to execute an API-action but found an undefined url / function.  Please review your Proxy url/api-configuration.","api-invalid":"Recieved an invalid API-configuration.  Please ensure your proxy API-configuration contains only the actions from Ext.data.Api.actions."}});
Ext.data.Request=function(b){Ext.apply(this,b)
};
Ext.data.Request.prototype={action:undefined,rs:undefined,params:undefined,callback:Ext.emptyFn,scope:undefined,reader:undefined};
Ext.data.Response=function(b){Ext.apply(this,b)
};
Ext.data.Response.prototype={action:undefined,success:undefined,message:undefined,data:undefined,raw:undefined,records:undefined};
Ext.data.ScriptTagProxy=function(b){Ext.apply(this,b);
Ext.data.ScriptTagProxy.superclass.constructor.call(this,b);
this.head=document.getElementsByTagName("head")[0]
};
Ext.data.ScriptTagProxy.TRANS_ID=1000;
Ext.extend(Ext.data.ScriptTagProxy,Ext.data.DataProxy,{timeout:30000,callbackParam:"callback",nocache:true,doRequest:function(v,u,w,t,r,q,p){var x=Ext.urlEncode(Ext.apply(w,this.extraParams));
var y=this.buildUrl(v,u);
if(!y){throw new Ext.data.Api.Error("invalid-url",y)
}y=Ext.urlAppend(y,x);
if(this.nocache){y=Ext.urlAppend(y,"_dc="+(new Date().getTime()))
}var z=++Ext.data.ScriptTagProxy.TRANS_ID;
var o={id:z,action:v,cb:"stcCallback"+z,scriptId:"stcScript"+z,params:w,arg:p,url:y,callback:r,scope:q,reader:t};
window[o.cb]=this.createCallback(v,u,o);
y+=String.format("&{0}={1}",this.callbackParam,o.cb);
if(this.autoAbort!==false){this.abort()
}o.timeoutId=this.handleFailure.defer(this.timeout,this,[o]);
var s=document.createElement("script");
s.setAttribute("src",y);
s.setAttribute("type","text/javascript");
s.setAttribute("id",o.scriptId);
this.head.appendChild(s);
this.trans=o
},createCallback:function(h,e,j){var g=this;
return function(a){g.trans=false;
g.destroyTrans(j,true);
if(h===Ext.data.Api.actions.read){g.onRead.call(g,h,j,a)
}else{g.onWrite.call(g,h,j,a,e)
}}
},onRead:function(k,l,e){var h;
try{h=l.reader.readRecords(e)
}catch(j){this.fireEvent("loadexception",this,l,e,j);
this.fireEvent("exception",this,"response",k,l,e,j);
l.callback.call(l.scope||window,null,l.arg,false);
return
}if(h.success===false){this.fireEvent("loadexception",this,l,e);
this.fireEvent("exception",this,"remote",k,l,e,null)
}else{this.fireEvent("load",this,e,l.arg)
}l.callback.call(l.scope||window,h,l.arg,h.success)
},onWrite:function(m,n,p,e){var k=n.reader;
try{var o=k.readResponse(m,p)
}catch(l){this.fireEvent("exception",this,"response",m,n,o,l);
n.callback.call(n.scope||window,null,o,false);
return
}if(!o.success===true){this.fireEvent("exception",this,"remote",m,n,o,e);
n.callback.call(n.scope||window,null,o,false);
return
}this.fireEvent("write",this,m,o.data,o,e,n.arg);
n.callback.call(n.scope||window,o.data,o,true)
},isLoading:function(){return this.trans?true:false
},abort:function(){if(this.isLoading()){this.destroyTrans(this.trans)
}},destroyTrans:function(d,e){this.head.removeChild(document.getElementById(d.scriptId));
clearTimeout(d.timeoutId);
if(e){window[d.cb]=undefined;
try{delete window[d.cb]
}catch(g){}}else{window[d.cb]=function(){window[d.cb]=undefined;
try{delete window[d.cb]
}catch(a){}}
}},handleFailure:function(b){this.trans=false;
this.destroyTrans(b,false);
if(b.action===Ext.data.Api.actions.read){this.fireEvent("loadexception",this,null,b.arg)
}this.fireEvent("exception",this,"response",b.action,{response:null,options:b.arg});
b.callback.call(b.scope||window,null,b.arg,false)
},destroy:function(){this.abort();
Ext.data.ScriptTagProxy.superclass.destroy.call(this)
}});
Ext.data.HttpProxy=function(e){Ext.data.HttpProxy.superclass.constructor.call(this,e);
this.conn=e;
this.conn.url=null;
this.useAjax=!e||!e.events;
var g=Ext.data.Api.actions;
this.activeRequest={};
for(var d in g){this.activeRequest[g[d]]=undefined
}};
Ext.extend(Ext.data.HttpProxy,Ext.data.DataProxy,{getConnection:function(){return this.useAjax?Ext.Ajax:this.conn
},setUrl:function(d,c){this.conn.url=d;
if(c===true){this.url=d;
this.api=null;
Ext.data.Api.prepare(this)
}},doRequest:function(o,q,m,r,k,p,l){var n={method:(this.api[o])?this.api[o]["method"]:undefined,request:{callback:k,scope:p,arg:l},reader:r,callback:this.createCallback(o,q),scope:this};
if(m.jsonData){n.jsonData=m.jsonData
}else{if(m.xmlData){n.xmlData=m.xmlData
}else{n.params=m||{}
}}this.conn.url=this.buildUrl(o,q);
if(this.useAjax){Ext.applyIf(n,this.conn);
if(this.activeRequest[o]){}this.activeRequest[o]=Ext.Ajax.request(n)
}else{this.conn.request(n)
}this.conn.url=null
},createCallback:function(c,d){return function(a,b,g){this.activeRequest[c]=undefined;
if(!b){if(c===Ext.data.Api.actions.read){this.fireEvent("loadexception",this,a,g)
}this.fireEvent("exception",this,"response",c,a,g);
a.request.callback.call(a.request.scope,null,a.request.arg,false);
return
}if(c===Ext.data.Api.actions.read){this.onRead(c,a,g)
}else{this.onWrite(c,a,g,d)
}}
},onRead:function(m,k,e){var j;
try{j=k.reader.read(e)
}catch(l){this.fireEvent("loadexception",this,k,e,l);
this.fireEvent("exception",this,"response",m,k,e,l);
k.request.callback.call(k.request.scope,null,k.request.arg,false);
return
}if(j.success===false){this.fireEvent("loadexception",this,k,e);
var n=k.reader.readResponse(m,e);
this.fireEvent("exception",this,"remote",m,k,n,null)
}else{this.fireEvent("load",this,k,k.request.arg)
}k.request.callback.call(k.request.scope,j,k.request.arg,j.success)
},onWrite:function(n,l,p,e){var k=l.reader;
var o;
try{o=k.readResponse(n,p)
}catch(m){this.fireEvent("exception",this,"response",n,l,p,m);
l.request.callback.call(l.request.scope,null,l.request.arg,false);
return
}if(o.success===false){this.fireEvent("exception",this,"remote",n,l,o,e)
}else{this.fireEvent("write",this,n,o.data,o,e,l.request.arg)
}l.request.callback.call(l.request.scope,o.data,o,o.success)
},destroy:function(){if(!this.useAjax){this.conn.abort()
}else{if(this.activeRequest){var c=Ext.data.Api.actions;
for(var d in c){if(this.activeRequest[c[d]]){Ext.Ajax.abort(this.activeRequest[c[d]])
}}}}Ext.data.HttpProxy.superclass.destroy.call(this)
}});
Ext.data.MemoryProxy=function(c){var d={};
d[Ext.data.Api.actions.read]=true;
Ext.data.MemoryProxy.superclass.constructor.call(this,{api:d});
this.data=c
};
Ext.extend(Ext.data.MemoryProxy,Ext.data.DataProxy,{doRequest:function(s,r,t,q,o,n,m){t=t||{};
var e;
try{e=q.readRecords(this.data)
}catch(p){this.fireEvent("loadexception",this,null,m,p);
this.fireEvent("exception",this,"response",s,m,null,p);
o.call(n,null,m,false);
return
}o.call(n,e,m,true)
}});
Ext.data.JsonWriter=function(b){Ext.data.JsonWriter.superclass.constructor.call(this,b);
if(this.returnJson!=undefined){this.encode=this.returnJson
}};
Ext.extend(Ext.data.JsonWriter,Ext.data.DataWriter,{returnJson:undefined,encode:true,render:function(j,h,e){if(this.encode===true){Ext.apply(j,h);
j[this.meta.root]=Ext.encode(e)
}else{var g=Ext.apply({},h);
g[this.meta.root]=e;
j.jsonData=g
}},createRecord:function(b){return this.toHash(b)
},updateRecord:function(b){return this.toHash(b)
},destroyRecord:function(b){return b.id
}});
Ext.data.JsonReader=function(d,c){d=d||{};
Ext.applyIf(d,{idProperty:"id",successProperty:"success",totalProperty:"total"});
Ext.data.JsonReader.superclass.constructor.call(this,d,c||d.fields)
};
Ext.extend(Ext.data.JsonReader,Ext.data.DataReader,{read:function(e){var d=e.responseText;
var g=Ext.decode(d);
if(!g){throw {message:"JsonReader.read: Json object not found"}
}return this.readRecords(g)
},readResponse:function(l,h){var k=(h.responseText!==undefined)?Ext.decode(h.responseText):h;
if(!k){throw new Ext.data.JsonReader.Error("response")
}var j=this.getRoot(k);
if(l===Ext.data.Api.actions.create){var m=Ext.isDefined(j);
if(m&&Ext.isEmpty(j)){throw new Ext.data.JsonReader.Error("root-empty",this.meta.root)
}else{if(!m){throw new Ext.data.JsonReader.Error("root-undefined-response",this.meta.root)
}}}var n=new Ext.data.Response({action:l,success:this.getSuccess(k),data:(j)?this.extractData(j,false):[],message:this.getMessage(k),raw:k});
if(Ext.isEmpty(n.success)){throw new Ext.data.JsonReader.Error("successProperty-response",this.meta.successProperty)
}return n
},readRecords:function(x){this.jsonData=x;
if(x.metaData){this.onMetaChange(x.metaData)
}var c=this.meta,s=this.recordType,w=s.prototype.fields,o=w.items,r=w.length,q;
var t=this.getRoot(x),u=t.length,v=u,p=true;
if(c.totalProperty){q=parseInt(this.getTotal(x),10);
if(!isNaN(q)){v=q
}}if(c.successProperty){q=this.getSuccess(x);
if(q===false||q==="false"){p=false
}}return{success:p,records:this.extractData(t,true),totalRecords:v}
},buildExtractors:function(){if(this.ef){return
}var g=this.meta,o=this.recordType,p=o.prototype.fields,m=p.items,n=p.length;
if(g.totalProperty){this.getTotal=this.createAccessor(g.totalProperty)
}if(g.successProperty){this.getSuccess=this.createAccessor(g.successProperty)
}if(g.messageProperty){this.getMessage=this.createAccessor(g.messageProperty)
}this.getRoot=g.root?this.createAccessor(g.root):function(a){return a
};
if(g.id||g.idProperty){var q=this.createAccessor(g.id||g.idProperty);
this.getId=function(a){var b=q(a);
return(b===undefined||b==="")?null:b
}
}else{this.getId=function(){return null
}
}var r=[];
for(var s=0;
s<n;
s++){p=m[s];
var t=(p.mapping!==undefined&&p.mapping!==null)?p.mapping:p.name;
r.push(this.createAccessor(t))
}this.ef=r
},simpleAccess:function(c,d){return c[d]
},createAccessor:function(){var b=/[\[\.]/;
return function(d){try{return(b.test(d))?new Function("obj","return obj."+d):function(c){return c[d]
}
}catch(a){}return Ext.emptyFn
}
}(),extractValues:function(l,o,k){var m,p={};
for(var n=0;
n<k;
n++){m=o[n];
var j=this.ef[n](l);
p[m.name]=m.convert((j!==undefined)?j:m.defaultValue,l)
}return p
}});
Ext.data.JsonReader.Error=Ext.extend(Ext.Error,{constructor:function(c,d){this.arg=d;
Ext.Error.call(this,c)
},name:"Ext.data.JsonReader"});
Ext.apply(Ext.data.JsonReader.Error.prototype,{lang:{response:"An error occurred while json-decoding your server response","successProperty-response":'Could not locate your "successProperty" in your server response.  Please review your JsonReader config to ensure the config-property "successProperty" matches the property in your server-response.  See the JsonReader docs.',"root-undefined-config":'Your JsonReader was configured without a "root" property.  Please review your JsonReader config and make sure to define the root property.  See the JsonReader docs.',"idProperty-undefined":'Your JsonReader was configured without an "idProperty"  Please review your JsonReader configuration and ensure the "idProperty" is set (e.g.: "id").  See the JsonReader docs.',"root-empty":'Data was expected to be returned by the server in the "root" property of the response.  Please review your JsonReader configuration to ensure the "root" property matches that returned in the server-response.  See JsonReader docs.'}});
Ext.data.ArrayReader=Ext.extend(Ext.data.JsonReader,{readRecords:function(C){this.arrayData=C;
var H=this.meta,K=H?Ext.num(H.idIndex,H.id):null,M=this.recordType,E=M.prototype.fields,k=[],J;
var v=this.getRoot(C);
for(var n=0,j=v.length;
n<j;
n++){var B=v[n],N={},F=((K||K===0)&&B[K]!==undefined&&B[K]!==""?B[K]:null);
for(var o=0,G=E.length;
o<G;
o++){var D=E.items[o],s=D.mapping!==undefined&&D.mapping!==null?D.mapping:o;
J=B[s]!==undefined?B[s]:D.defaultValue;
J=D.convert(J,B);
N[D.name]=J
}var L=new M(N,F);
L.json=B;
k[k.length]=L
}var I=k.length;
if(H.totalProperty){J=parseInt(this.getTotal(C),10);
if(!isNaN(J)){I=J
}}return{records:k,totalRecords:I}
}});
Ext.data.ArrayStore=Ext.extend(Ext.data.Store,{constructor:function(b){Ext.data.ArrayStore.superclass.constructor.call(this,Ext.apply(b,{reader:new Ext.data.ArrayReader(b)}))
},loadData:function(j,g){if(this.expandData===true){var k=[];
for(var l=0,h=j.length;
l<h;
l++){k[k.length]=[j[l]]
}j=k
}Ext.data.ArrayStore.superclass.loadData.call(this,j,g)
}});
Ext.reg("arraystore",Ext.data.ArrayStore);
Ext.data.SimpleStore=Ext.data.ArrayStore;
Ext.reg("simplestore",Ext.data.SimpleStore);
Ext.data.JsonStore=Ext.extend(Ext.data.Store,{constructor:function(b){Ext.data.JsonStore.superclass.constructor.call(this,Ext.apply(b,{reader:new Ext.data.JsonReader(b)}))
}});
Ext.reg("jsonstore",Ext.data.JsonStore);
Ext.data.XmlWriter=function(b){Ext.data.XmlWriter.superclass.constructor.apply(this,arguments);
this.tpl=(typeof(this.tpl)==="string")?new Ext.XTemplate(this.tpl).compile():this.tpl.compile()
};
Ext.extend(Ext.data.XmlWriter,Ext.data.DataWriter,{documentRoot:"xrequest",forceDocumentRoot:false,root:"records",xmlVersion:"1.0",xmlEncoding:"ISO-8859-15",tpl:'<tpl for="."><?xml version="{version}" encoding="{encoding}"?><tpl if="documentRoot"><{documentRoot}><tpl for="baseParams"><tpl for="."><{name}>{value}</{name}</tpl></tpl></tpl><tpl if="records.length&gt;1"><{root}></tpl><tpl for="records"><{parent.record}><tpl for="."><{name}>{value}</{name}></tpl></{parent.record}></tpl><tpl if="records.length&gt;1"></{root}></tpl><tpl if="documentRoot"></{documentRoot}></tpl></tpl>',render:function(d,g,e){g=this.toArray(g);
d.xmlData=this.tpl.applyTemplate({version:this.xmlVersion,encoding:this.xmlEncoding,documentRoot:(g.length>0||this.forceDocumentRoot===true)?this.documentRoot:false,record:this.meta.record,root:this.root,baseParams:g,records:(Ext.isArray(e[0]))?e:[e]})
},createRecord:function(b){return this.toArray(this.toHash(b))
},updateRecord:function(b){return this.toArray(this.toHash(b))
},destroyRecord:function(c){var d={};
d[this.meta.idProperty]=c.id;
return this.toArray(d)
}});
Ext.data.XmlReader=function(d,c){d=d||{};
Ext.applyIf(d,{idProperty:d.idProperty||d.idPath||d.id,successProperty:d.successProperty||d.success});
Ext.data.XmlReader.superclass.constructor.call(this,d,c||d.fields)
};
Ext.extend(Ext.data.XmlReader,Ext.data.DataReader,{read:function(d){var c=d.responseXML;
if(!c){throw {message:"XmlReader.read: XML Document not available"}
}return this.readRecords(c)
},readRecords:function(m){this.xmlData=m;
var j=m.documentElement||m,n=Ext.DomQuery,k=0,l=true;
if(this.meta.totalProperty){k=this.getTotal(j,0)
}if(this.meta.successProperty){l=this.getSuccess(j)
}var h=this.extractData(n.select(this.meta.record,j),true);
return{success:l,records:h,totalRecords:k||h.length}
},readResponse:function(l,j){var m=Ext.DomQuery,k=j.responseXML;
var h=new Ext.data.Response({action:l,success:this.getSuccess(k),message:this.getMessage(k),data:this.extractData(m.select(this.meta.record,k)||m.select(this.meta.root,k),false),raw:k});
if(Ext.isEmpty(h.success)){throw new Ext.data.DataReader.Error("successProperty-response",this.meta.successProperty)
}if(l===Ext.data.Api.actions.create){var n=Ext.isDefined(h.data);
if(n&&Ext.isEmpty(h.data)){throw new Ext.data.JsonReader.Error("root-empty",this.meta.root)
}else{if(!n){throw new Ext.data.JsonReader.Error("root-undefined-response",this.meta.root)
}}}return h
},getSuccess:function(){return true
},buildExtractors:function(){if(this.ef){return
}var g=this.meta,o=this.recordType,p=o.prototype.fields,m=p.items,n=p.length;
if(g.totalProperty){this.getTotal=this.createAccessor(g.totalProperty)
}if(g.successProperty){this.getSuccess=this.createAccessor(g.successProperty)
}if(g.messageProperty){this.getMessage=this.createAccessor(g.messageProperty)
}this.getRoot=function(a){return(!Ext.isEmpty(a[this.meta.record]))?a[this.meta.record]:a[this.meta.root]
};
if(g.idPath||g.idProperty){var q=this.createAccessor(g.idPath||g.idProperty);
this.getId=function(b){var a=q(b)||b.id;
return(a===undefined||a==="")?null:a
}
}else{this.getId=function(){return null
}
}var r=[];
for(var s=0;
s<n;
s++){p=m[s];
var t=(p.mapping!==undefined&&p.mapping!==null)?p.mapping:p.name;
r.push(this.createAccessor(t))
}this.ef=r
},createAccessor:function(){var b=Ext.DomQuery;
return function(a){switch(a){case this.meta.totalProperty:return function(g,e){return b.selectNumber(a,g,e)
};
break;
case this.meta.successProperty:return function(k,j){var l=b.selectValue(a,k,true);
var h=l!==false&&l!=="false";
return h
};
break;
default:return function(g,e){return b.selectValue(a,g,e)
};
break
}}
}(),extractValues:function(l,o,k){var m,p={};
for(var n=0;
n<k;
n++){m=o[n];
var j=this.ef[n](l);
p[m.name]=m.convert((j!==undefined)?j:m.defaultValue,l)
}return p
}});
Ext.data.XmlStore=Ext.extend(Ext.data.Store,{constructor:function(b){Ext.data.XmlStore.superclass.constructor.call(this,Ext.apply(b,{reader:new Ext.data.XmlReader(b)}))
}});
Ext.reg("xmlstore",Ext.data.XmlStore);
Ext.data.GroupingStore=Ext.extend(Ext.data.Store,{constructor:function(b){Ext.data.GroupingStore.superclass.constructor.call(this,b);
this.applyGroupField()
},remoteGroup:false,groupOnSort:false,groupDir:"ASC",clearGrouping:function(){this.groupField=false;
if(this.remoteGroup){if(this.baseParams){delete this.baseParams.groupBy
}var b=this.lastOptions;
if(b&&b.params){delete b.params.groupBy
}this.reload()
}else{this.applySort();
this.fireEvent("datachanged",this)
}},groupBy:function(h,e,j){j=j?(String(j).toUpperCase()=="DESC"?"DESC":"ASC"):this.groupDir;
if(this.groupField==h&&this.groupDir==j&&!e){return
}this.groupField=h;
this.groupDir=j;
this.applyGroupField();
if(this.groupOnSort){this.sort(h,j);
return
}if(this.remoteGroup){this.reload()
}else{var g=this.sortInfo||{};
if(g.field!=h||g.direction!=j){this.applySort()
}else{this.sortData(h,j)
}this.fireEvent("datachanged",this)
}},applyGroupField:function(){if(this.remoteGroup){if(!this.baseParams){this.baseParams={}
}this.baseParams.groupBy=this.groupField;
this.baseParams.groupDir=this.groupDir
}},applySort:function(){Ext.data.GroupingStore.superclass.applySort.call(this);
if(!this.groupOnSort&&!this.remoteGroup){var b=this.getGroupState();
if(b&&(b!=this.sortInfo.field||this.groupDir!=this.sortInfo.direction)){this.sortData(this.groupField,this.groupDir)
}}},applyGrouping:function(b){if(this.groupField!==false){this.groupBy(this.groupField,true,this.groupDir);
return true
}else{if(b===true){this.fireEvent("datachanged",this)
}return false
}},getGroupState:function(){return this.groupOnSort&&this.groupField!==false?(this.sortInfo?this.sortInfo.field:undefined):this.groupField
}});
Ext.reg("groupingstore",Ext.data.GroupingStore);
Ext.data.DirectProxy=function(b){Ext.apply(this,b);
if(typeof this.paramOrder=="string"){this.paramOrder=this.paramOrder.split(/[\s,|]/)
}Ext.data.DirectProxy.superclass.constructor.call(this,b)
};
Ext.extend(Ext.data.DirectProxy,Ext.data.DataProxy,{paramOrder:undefined,paramsAsHash:true,directFn:undefined,doRequest:function(y,x,z,v,r,q,o){var s=[],t=this.api[y]||this.directFn;
switch(y){case Ext.data.Api.actions.create:s.push(z.jsonData);
break;
case Ext.data.Api.actions.read:if(t.directCfg.method.len>0){if(this.paramOrder){for(var w=0,u=this.paramOrder.length;
w<u;
w++){s.push(z[this.paramOrder[w]])
}}else{if(this.paramsAsHash){s.push(z)
}}}break;
case Ext.data.Api.actions.update:s.push(z.jsonData);
break;
case Ext.data.Api.actions.destroy:s.push(z.jsonData);
break
}var p={params:z||{},request:{callback:r,scope:q,arg:o},reader:v};
s.push(this.createCallback(y,x,p),this);
t.apply(window,s)
},createCallback:function(g,e,d){return function(b,a){if(!a.status){if(g===Ext.data.Api.actions.read){this.fireEvent("loadexception",this,d,a,null)
}this.fireEvent("exception",this,"remote",g,d,a,null);
d.request.callback.call(d.request.scope,null,d.request.arg,false);
return
}if(g===Ext.data.Api.actions.read){this.onRead(g,d,b,a)
}else{this.onWrite(g,d,b,a,e)
}}
},onRead:function(k,l,j,m){var h;
try{h=l.reader.readRecords(j)
}catch(n){this.fireEvent("loadexception",this,l,m,n);
this.fireEvent("exception",this,"response",k,l,m,n);
l.request.callback.call(l.request.scope,null,l.request.arg,false);
return
}this.fireEvent("load",this,m,l.request.arg);
l.request.callback.call(l.request.scope,h,l.request.arg,true)
},onWrite:function(k,m,j,n,h){var l=m.reader.extractData(j,false);
this.fireEvent("write",this,k,l,n,h,m.request.arg);
m.request.callback.call(m.request.scope,l,n,true)
}});
Ext.data.DirectStore=function(b){b.batchTransactions=false;
Ext.data.DirectStore.superclass.constructor.call(this,Ext.apply(b,{proxy:(typeof(b.proxy)=="undefined")?new Ext.data.DirectProxy(Ext.copyTo({},b,"paramOrder,paramsAsHash,directFn,api")):b.proxy,reader:(typeof(b.reader)=="undefined"&&typeof(b.fields)=="object")?new Ext.data.JsonReader(Ext.copyTo({},b,"totalProperty,root,idProperty"),b.fields):b.reader}))
};
Ext.extend(Ext.data.DirectStore,Ext.data.Store,{});
Ext.reg("directstore",Ext.data.DirectStore);
Ext.Direct=Ext.extend(Ext.util.Observable,{exceptions:{TRANSPORT:"xhr",PARSE:"parse",LOGIN:"login",SERVER:"exception"},constructor:function(){this.addEvents("event","exception");
this.transactions={};
this.providers={}
},addProvider:function(g){var j=arguments;
if(j.length>1){for(var h=0,a=j.length;
h<a;
h++){this.addProvider(j[h])
}return
}if(!g.events){g=new Ext.Direct.PROVIDERS[g.type](g)
}g.id=g.id||Ext.id();
this.providers[g.id]=g;
g.on("data",this.onProviderData,this);
g.on("exception",this.onProviderException,this);
if(!g.isConnected()){g.connect()
}return g
},getProvider:function(b){return this.providers[b]
},removeProvider:function(c){var d=c.id?c:this.providers[c.id];
d.un("data",this.onProviderData,this);
d.un("exception",this.onProviderException,this);
delete this.providers[d.id];
return d
},addTransaction:function(b){this.transactions[b.tid]=b;
return b
},removeTransaction:function(b){delete this.transactions[b.tid||b];
return b
},getTransaction:function(b){return this.transactions[b.tid||b]
},onProviderData:function(h,j){if(Ext.isArray(j)){for(var e=0,g=j.length;
e<g;
e++){this.onProviderData(h,j[e])
}return
}if(j.name&&j.name!="event"&&j.name!="exception"){this.fireEvent(j.name,j)
}else{if(j.type=="exception"){this.fireEvent("exception",j)
}}this.fireEvent("event",j,h)
},createEvent:function(d,c){return new Ext.Direct.eventTypes[d.type](Ext.apply(d,c))
}});
Ext.Direct=new Ext.Direct();
Ext.Direct.TID=1;
Ext.Direct.PROVIDERS={};
Ext.Direct.Transaction=function(b){Ext.apply(this,b);
this.tid=++Ext.Direct.TID;
this.retryCount=0
};
Ext.Direct.Transaction.prototype={send:function(){this.provider.queueTransaction(this)
},retry:function(){this.retryCount++;
this.send()
},getProvider:function(){return this.provider
}};
Ext.Direct.Event=function(b){Ext.apply(this,b)
};
Ext.Direct.Event.prototype={status:true,getData:function(){return this.data
}};
Ext.Direct.RemotingEvent=Ext.extend(Ext.Direct.Event,{type:"rpc",getTransaction:function(){return this.transaction||Ext.Direct.getTransaction(this.tid)
}});
Ext.Direct.ExceptionEvent=Ext.extend(Ext.Direct.RemotingEvent,{status:false,type:"exception"});
Ext.Direct.eventTypes={rpc:Ext.Direct.RemotingEvent,event:Ext.Direct.Event,exception:Ext.Direct.ExceptionEvent};
Ext.direct.Provider=Ext.extend(Ext.util.Observable,{priority:1,constructor:function(b){Ext.apply(this,b);
this.addEvents("connect","disconnect","data","exception");
Ext.direct.Provider.superclass.constructor.call(this,b)
},isConnected:function(){return false
},connect:Ext.emptyFn,disconnect:Ext.emptyFn});
Ext.direct.JsonProvider=Ext.extend(Ext.direct.Provider,{parseResponse:function(b){if(!Ext.isEmpty(b.responseText)){if(typeof b.responseText=="object"){return b.responseText
}return Ext.decode(b.responseText)
}return null
},getEvents:function(l){var n=null;
try{n=this.parseResponse(l)
}catch(m){var o=new Ext.Direct.ExceptionEvent({data:m,xhr:l,code:Ext.Direct.exceptions.PARSE,message:"Error parsing json response: \n\n "+n});
return[o]
}var p=[];
if(Ext.isArray(n)){for(var e=0,k=n.length;
e<k;
e++){p.push(Ext.Direct.createEvent(n[e]))
}}else{p.push(Ext.Direct.createEvent(n))
}return p
}});
Ext.direct.PollingProvider=Ext.extend(Ext.direct.JsonProvider,{priority:3,interval:3000,constructor:function(b){Ext.direct.PollingProvider.superclass.constructor.call(this,b);
this.addEvents("beforepoll","poll")
},isConnected:function(){return !!this.pollTask
},connect:function(){if(this.url&&!this.pollTask){this.pollTask=Ext.TaskMgr.start({run:function(){if(this.fireEvent("beforepoll",this)!==false){if(typeof this.url=="function"){this.url(this.baseParams)
}else{Ext.Ajax.request({url:this.url,callback:this.onData,scope:this,params:this.baseParams})
}}},interval:this.interval,scope:this});
this.fireEvent("connect",this)
}else{if(!this.url){throw"Error initializing PollingProvider, no url configured."
}}},disconnect:function(){if(this.pollTask){Ext.TaskMgr.stop(this.pollTask);
delete this.pollTask;
this.fireEvent("disconnect",this)
}},onData:function(o,l,m){if(l){var p=this.getEvents(m);
for(var e=0,k=p.length;
e<k;
e++){var n=p[e];
this.fireEvent("data",this,n)
}}else{var n=new Ext.Direct.ExceptionEvent({data:n,code:Ext.Direct.exceptions.TRANSPORT,message:"Unable to connect to the server.",xhr:m});
this.fireEvent("data",this,n)
}}});
Ext.Direct.PROVIDERS.polling=Ext.direct.PollingProvider;
Ext.direct.RemotingProvider=Ext.extend(Ext.direct.JsonProvider,{enableBuffer:10,maxRetries:1,timeout:undefined,constructor:function(b){Ext.direct.RemotingProvider.superclass.constructor.call(this,b);
this.addEvents("beforecall","call");
this.namespace=(Ext.isString(this.namespace))?Ext.ns(this.namespace):this.namespace||window;
this.transactions={};
this.callBuffer=[]
},initAPI:function(){var m=this.actions;
for(var l in m){var p=this.namespace[l]||(this.namespace[l]={}),o=m[l];
for(var n=0,c=o.length;
n<c;
n++){var k=o[n];
p[k.name]=this.createMethod(l,k)
}}},isConnected:function(){return !!this.connected
},connect:function(){if(this.url){this.initAPI();
this.connected=true;
this.fireEvent("connect",this)
}else{if(!this.url){throw"Error initializing RemotingProvider, no url configured."
}}},disconnect:function(){if(this.connected){this.connected=false;
this.fireEvent("disconnect",this)
}},onData:function(t,o,n){if(o){var m=this.getEvents(n);
for(var s=0,r=m.length;
s<r;
s++){var q=m[s],e=this.getTransaction(q);
this.fireEvent("data",this,q);
if(e){this.doCallback(e,q,true);
Ext.Direct.removeTransaction(e)
}}}else{var p=[].concat(t.ts);
for(var s=0,r=p.length;
s<r;
s++){var e=this.getTransaction(p[s]);
if(e&&e.retryCount<this.maxRetries){e.retry()
}else{var q=new Ext.Direct.ExceptionEvent({data:q,transaction:e,code:Ext.Direct.exceptions.TRANSPORT,message:"Unable to connect to the server.",xhr:n});
this.fireEvent("data",this,q);
if(e){this.doCallback(e,q,false);
Ext.Direct.removeTransaction(e)
}}}}},getCallData:function(b){return{action:b.action,method:b.method,data:b.data,type:"rpc",tid:b.tid}
},doSend:function(m){var k={url:this.url,callback:this.onData,scope:this,ts:m,timeout:this.timeout},h;
if(Ext.isArray(m)){h=[];
for(var n=0,j=m.length;
n<j;
n++){h.push(this.getCallData(m[n]))
}}else{h=this.getCallData(m)
}if(this.enableUrlEncode){var l={};
l[Ext.isString(this.enableUrlEncode)?this.enableUrlEncode:"data"]=Ext.encode(h);
k.params=l
}else{k.jsonData=h
}Ext.Ajax.request(k)
},combineAndSend:function(){var b=this.callBuffer.length;
if(b>0){this.doSend(b==1?this.callBuffer[0]:this.callBuffer);
this.callBuffer=[]
}},queueTransaction:function(b){if(b.form){this.processForm(b);
return
}this.callBuffer.push(b);
if(this.enableBuffer){if(!this.callTask){this.callTask=new Ext.util.DelayedTask(this.combineAndSend,this)
}this.callTask.delay(Ext.isNumber(this.enableBuffer)?this.enableBuffer:10)
}else{this.combineAndSend()
}},doCall:function(l,k,c){var m=null,o=c[k.len],n=c[k.len+1];
if(k.len!==0){m=c.slice(0,k.len)
}var p=new Ext.Direct.Transaction({provider:this,args:c,action:l,method:k.name,data:m,cb:n&&Ext.isFunction(o)?o.createDelegate(n):o});
if(this.fireEvent("beforecall",this,p)!==false){Ext.Direct.addTransaction(p);
this.queueTransaction(p);
this.fireEvent("call",this,p)
}},doForm:function(m,c,p,n,q){var r=new Ext.Direct.Transaction({provider:this,action:m,method:c.name,args:[p,n,q],cb:q&&Ext.isFunction(n)?n.createDelegate(q):n,isForm:true});
if(this.fireEvent("beforecall",this,r)!==false){Ext.Direct.addTransaction(r);
var l=String(p.getAttribute("enctype")).toLowerCase()=="multipart/form-data",o={extTID:r.tid,extAction:m,extMethod:c.name,extType:"rpc",extUpload:String(l)};
Ext.apply(r,{form:Ext.getDom(p),isUpload:l,params:n&&Ext.isObject(n.params)?Ext.apply(o,n.params):o});
this.fireEvent("call",this,r);
this.processForm(r)
}},processForm:function(b){Ext.Ajax.request({url:this.url,params:b.params,callback:this.onData,scope:this,form:b.form,isUpload:b.isUpload,ts:b})
},createMethod:function(g,e){var c;
if(!e.formHandler){c=function(){this.doCall(g,e,Array.prototype.slice.call(arguments,0))
}.createDelegate(this)
}else{c=function(b,a,d){this.doForm(g,e,b,a,d)
}.createDelegate(this)
}c.directCfg={action:g,method:e};
return c
},getTransaction:function(b){return b&&b.tid?Ext.Direct.getTransaction(b.tid):null
},doCallback:function(l,j){var k=j.status?"success":"failure";
if(l&&l.cb){var e=l.cb,h=Ext.isDefined(j.result)?j.result:j.data;
if(Ext.isFunction(e)){e(h,j)
}else{Ext.callback(e[k],e.scope,[h,j]);
Ext.callback(e.callback,e.scope,[h,j])
}}}});
Ext.Direct.PROVIDERS.remoting=Ext.direct.RemotingProvider;
Ext.Resizable=function(y,x){this.el=Ext.get(y);
if(x&&x.wrap){x.resizeChild=this.el;
this.el=this.el.wrap(typeof x.wrap=="object"?x.wrap:{cls:"xresizable-wrap"});
this.el.id=this.el.dom.id=x.resizeChild.id+"-rzwrap";
this.el.setStyle("overflow","hidden");
this.el.setPositioning(x.resizeChild.getPositioning());
x.resizeChild.clearPositioning();
if(!x.width||!x.height){var w=x.resizeChild.getSize();
this.el.setSize(w.width,w.height)
}if(x.pinned&&!x.adjustments){x.adjustments="auto"
}}this.proxy=this.el.createProxy({tag:"div",cls:"x-resizable-proxy",id:this.el.id+"-rzproxy"},Ext.getBody());
this.proxy.unselectable();
this.proxy.enableDisplayMode("block");
Ext.apply(this,x);
if(this.pinned){this.disableTrackOver=true;
this.el.addClass("x-resizable-pinned")
}var t=this.el.getStyle("position");
if(t!="absolute"&&t!="fixed"){this.el.setStyle("position","relative")
}if(!this.handles){this.handles="s,e,se";
if(this.multiDirectional){this.handles+=",n,w"
}}if(this.handles=="all"){this.handles="n s e w ne nw se sw"
}var p=this.handles.split(/\s*?[,;]\s*?| /);
var z=Ext.Resizable.positions;
for(var u=0,s=p.length;
u<s;
u++){if(p[u]&&z[p[u]]){var q=z[p[u]];
this[q]=new Ext.Resizable.Handle(this,q,this.disableTrackOver,this.transparent)
}}this.corner=this.southeast;
if(this.handles.indexOf("n")!=-1||this.handles.indexOf("w")!=-1){this.updateBox=true
}this.activeHandle=null;
if(this.resizeChild){if(typeof this.resizeChild=="boolean"){this.resizeChild=Ext.get(this.el.dom.firstChild,true)
}else{this.resizeChild=Ext.get(this.resizeChild,true)
}}if(this.adjustments=="auto"){var A=this.resizeChild;
var r=this.west,v=this.east,B=this.north,p=this.south;
if(A&&(r||B)){A.position("relative");
A.setLeft(r?r.el.getWidth():0);
A.setTop(B?B.el.getHeight():0)
}this.adjustments=[(v?-v.el.getWidth():0)+(r?-r.el.getWidth():0),(B?-B.el.getHeight():0)+(p?-p.el.getHeight():0)-1]
}if(this.draggable){this.dd=this.dynamic?this.el.initDD(null):this.el.initDDProxy(null,{dragElId:this.proxy.id});
this.dd.setHandleElId(this.resizeChild?this.resizeChild.id:this.el.id);
if(this.constrainTo){this.dd.constrainTo(this.constrainTo)
}}this.addEvents("beforeresize","resize");
if(this.width!==null&&this.height!==null){this.resizeTo(this.width,this.height)
}else{this.updateChildSize()
}if(Ext.isIE){this.el.dom.style.zoom=1
}Ext.Resizable.superclass.constructor.call(this)
};
Ext.extend(Ext.Resizable,Ext.util.Observable,{adjustments:[0,0],animate:false,disableTrackOver:false,draggable:false,duration:0.35,dynamic:false,easing:"easeOutStrong",enabled:true,handles:false,multiDirectional:false,height:null,width:null,heightIncrement:0,widthIncrement:0,minHeight:5,minWidth:5,maxHeight:10000,maxWidth:10000,minX:0,minY:0,pinned:false,preserveRatio:false,resizeChild:false,transparent:false,resizeTo:function(c,d){this.el.setSize(c,d);
this.updateChildSize();
this.fireEvent("resize",this,c,d,null)
},startSizing:function(g,d){this.fireEvent("beforeresize",this,g);
if(this.enabled){if(!this.overlay){this.overlay=this.el.createProxy({tag:"div",cls:"x-resizable-overlay",html:"&#160;"},Ext.getBody());
this.overlay.unselectable();
this.overlay.enableDisplayMode("block");
this.overlay.on({scope:this,mousemove:this.onMouseMove,mouseup:this.onMouseUp})
}this.overlay.setStyle("cursor",d.el.getStyle("cursor"));
this.resizing=true;
this.startBox=this.el.getBox();
this.startPoint=g.getXY();
this.offsets=[(this.startBox.x+this.startBox.width)-this.startPoint[0],(this.startBox.y+this.startBox.height)-this.startPoint[1]];
this.overlay.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));
this.overlay.show();
if(this.constrainTo){var e=Ext.get(this.constrainTo);
this.resizeRegion=e.getRegion().adjust(e.getFrameWidth("t"),e.getFrameWidth("l"),-e.getFrameWidth("b"),-e.getFrameWidth("r"))
}this.proxy.setStyle("visibility","hidden");
this.proxy.show();
this.proxy.setBox(this.startBox);
if(!this.dynamic){this.proxy.setStyle("visibility","visible")
}}},onMouseDown:function(d,c){if(this.enabled){c.stopEvent();
this.activeHandle=d;
this.startSizing(c,d)
}},onMouseUp:function(c){this.activeHandle=null;
var d=this.resizeElement();
this.resizing=false;
this.handleOut();
this.overlay.hide();
this.proxy.hide();
this.fireEvent("resize",this,d.width,d.height,c)
},updateChildSize:function(){if(this.resizeChild){var h=this.el;
var g=this.resizeChild;
var j=this.adjustments;
if(h.dom.offsetWidth){var b=h.getSize(true);
g.setSize(b.width+j[0],b.height+j[1])
}if(Ext.isIE){setTimeout(function(){if(h.dom.offsetWidth){var a=h.getSize(true);
g.setSize(a.width+j[0],a.height+j[1])
}},10)
}}},snap:function(l,j,g){if(!j||!l){return l
}var k=l;
var h=l%j;
if(h>0){if(h>(j/2)){k=l+(j-h)
}else{k=l-h
}}return Math.max(g,k)
},resizeElement:function(){var b=this.proxy.getBox();
if(this.updateBox){this.el.setBox(b,false,this.animate,this.duration,null,this.easing)
}else{this.el.setSize(b.width,b.height,this.animate,this.duration,null,this.easing)
}this.updateChildSize();
if(!this.dynamic){this.proxy.hide()
}if(this.draggable&&this.constrainTo){this.dd.resetConstraints();
this.dd.constrainTo(this.constrainTo)
}return b
},constrain:function(e,j,g,h){if(e-j<g){j=e-g
}else{if(e-j>h){j=e-h
}}return j
},onMouseMove:function(N){if(this.enabled&&this.activeHandle){try{if(this.resizeRegion&&!this.resizeRegion.contains(N.getPoint())){return
}var x=this.curSize||this.startBox,R=this.startBox.x,S=this.startBox.y,X=R,Y=S,Q=x.width,h=x.height,W=Q,O=h,P=this.minWidth,M=this.minHeight,G=this.maxWidth,y=this.maxHeight,U=this.widthIncrement,Z=this.heightIncrement,K=N.getXY(),I=-(this.startPoint[0]-Math.max(this.minX,K[0])),L=-(this.startPoint[1]-Math.max(this.minY,K[1])),T=this.activeHandle.position,w,V;
switch(T){case"east":Q+=I;
Q=Math.min(Math.max(P,Q),G);
break;
case"south":h+=L;
h=Math.min(Math.max(M,h),y);
break;
case"southeast":Q+=I;
h+=L;
Q=Math.min(Math.max(P,Q),G);
h=Math.min(Math.max(M,h),y);
break;
case"north":L=this.constrain(h,L,M,y);
S+=L;
h-=L;
break;
case"west":I=this.constrain(Q,I,P,G);
R+=I;
Q-=I;
break;
case"northeast":Q+=I;
Q=Math.min(Math.max(P,Q),G);
L=this.constrain(h,L,M,y);
S+=L;
h-=L;
break;
case"northwest":I=this.constrain(Q,I,P,G);
L=this.constrain(h,L,M,y);
S+=L;
h-=L;
R+=I;
Q-=I;
break;
case"southwest":I=this.constrain(Q,I,P,G);
h+=L;
h=Math.min(Math.max(M,h),y);
R+=I;
Q-=I;
break
}var J=this.snap(Q,U,P);
var H=this.snap(h,Z,M);
if(J!=Q||H!=h){switch(T){case"northeast":S-=H-h;
break;
case"north":S-=H-h;
break;
case"southwest":R-=J-Q;
break;
case"west":R-=J-Q;
break;
case"northwest":R-=J-Q;
S-=H-h;
break
}Q=J;
h=H
}if(this.preserveRatio){switch(T){case"southeast":case"east":h=O*(Q/W);
h=Math.min(Math.max(M,h),y);
Q=W*(h/O);
break;
case"south":Q=W*(h/O);
Q=Math.min(Math.max(P,Q),G);
h=O*(Q/W);
break;
case"northeast":Q=W*(h/O);
Q=Math.min(Math.max(P,Q),G);
h=O*(Q/W);
break;
case"north":w=Q;
Q=W*(h/O);
Q=Math.min(Math.max(P,Q),G);
h=O*(Q/W);
R+=(w-Q)/2;
break;
case"southwest":h=O*(Q/W);
h=Math.min(Math.max(M,h),y);
w=Q;
Q=W*(h/O);
R+=w-Q;
break;
case"west":V=h;
h=O*(Q/W);
h=Math.min(Math.max(M,h),y);
S+=(V-h)/2;
w=Q;
Q=W*(h/O);
R+=w-Q;
break;
case"northwest":w=Q;
V=h;
h=O*(Q/W);
h=Math.min(Math.max(M,h),y);
Q=W*(h/O);
S+=V-h;
R+=w-Q;
break
}}this.proxy.setBounds(R,S,Q,h);
if(this.dynamic){this.resizeElement()
}}catch(e){}}},handleOver:function(){if(this.enabled){this.el.addClass("x-resizable-over")
}},handleOut:function(){if(!this.resizing){this.el.removeClass("x-resizable-over")
}},getEl:function(){return this.el
},getResizeChild:function(){return this.resizeChild
},destroy:function(d){Ext.destroy(this.dd,this.overlay,this.proxy);
this.overlay=null;
this.proxy=null;
var g=Ext.Resizable.positions;
for(var e in g){if(typeof g[e]!="function"&&this[g[e]]){this[g[e]].destroy()
}}if(d){this.el.update("");
Ext.destroy(this.el);
this.el=null
}this.purgeListeners()
},syncHandleHeight:function(){var b=this.el.getHeight(true);
if(this.west){this.west.el.setHeight(b)
}if(this.east){this.east.el.setHeight(b)
}}});
Ext.Resizable.positions={n:"north",s:"south",e:"east",w:"west",se:"southeast",sw:"southwest",nw:"northwest",ne:"northeast"};
Ext.Resizable.Handle=function(l,j,g,k){if(!this.tpl){var h=Ext.DomHelper.createTemplate({tag:"div",cls:"x-resizable-handle x-resizable-handle-{0}"});
h.compile();
Ext.Resizable.Handle.prototype.tpl=h
}this.position=j;
this.rz=l;
this.el=this.tpl.append(l.el.dom,[this.position],true);
this.el.unselectable();
if(k){this.el.setOpacity(0)
}this.el.on("mousedown",this.onMouseDown,this);
if(!g){this.el.on({scope:this,mouseover:this.onMouseOver,mouseout:this.onMouseOut})
}};
Ext.Resizable.Handle.prototype={afterResize:function(b){},onMouseDown:function(b){this.rz.onMouseDown(this,b)
},onMouseOver:function(b){this.rz.handleOver(this,b)
},onMouseOut:function(b){this.rz.handleOut(this,b)
},destroy:function(){Ext.destroy(this.el);
this.el=null
}};
Ext.Window=Ext.extend(Ext.Panel,{baseCls:"x-window",resizable:true,draggable:true,closable:true,closeAction:"close",constrain:false,constrainHeader:false,plain:false,minimizable:false,maximizable:false,minHeight:100,minWidth:200,expandOnShow:true,collapsible:false,initHidden:undefined,hidden:true,monitorResize:true,elements:"header,body",frame:true,floating:true,initComponent:function(){this.initTools();
Ext.Window.superclass.initComponent.call(this);
this.addEvents("resize","maximize","minimize","restore");
if(Ext.isDefined(this.initHidden)){this.hidden=this.initHidden
}if(this.hidden===false){this.hidden=true;
this.show()
}},getState:function(){return Ext.apply(Ext.Window.superclass.getState.call(this)||{},this.getBox(true))
},onRender:function(c,d){Ext.Window.superclass.onRender.call(this,c,d);
if(this.plain){this.el.addClass("x-window-plain")
}this.focusEl=this.el.createChild({tag:"a",href:"#",cls:"x-dlg-focus",tabIndex:"-1",html:"&#160;"});
this.focusEl.swallowEvent("click",true);
this.proxy=this.el.createProxy("x-window-proxy");
this.proxy.enableDisplayMode("block");
if(this.modal){this.mask=this.container.createChild({cls:"ext-el-mask"},this.el.dom);
this.mask.enableDisplayMode("block");
this.mask.hide();
this.mon(this.mask,"click",this.focus,this)
}if(this.maximizable){this.mon(this.header,"dblclick",this.toggleMaximize,this)
}},initEvents:function(){Ext.Window.superclass.initEvents.call(this);
if(this.animateTarget){this.setAnimateTarget(this.animateTarget)
}if(this.resizable){this.resizer=new Ext.Resizable(this.el,{minWidth:this.minWidth,minHeight:this.minHeight,handles:this.resizeHandles||"all",pinned:true,resizeElement:this.resizerAction});
this.resizer.window=this;
this.mon(this.resizer,"beforeresize",this.beforeResize,this)
}if(this.draggable){this.header.addClass("x-window-draggable")
}this.mon(this.el,"mousedown",this.toFront,this);
this.manager=this.manager||Ext.WindowMgr;
this.manager.register(this);
if(this.maximized){this.maximized=false;
this.maximize()
}if(this.closable){var b=this.getKeyMap();
b.on(27,this.onEsc,this);
b.disable()
}},initDraggable:function(){this.dd=new Ext.Window.DD(this)
},onEsc:function(){this[this.closeAction]()
},beforeDestroy:function(){if(this.rendered){this.hide();
if(this.doAnchor){Ext.EventManager.removeResizeListener(this.doAnchor,this);
Ext.EventManager.un(window,"scroll",this.doAnchor,this)
}Ext.destroy(this.focusEl,this.resizer,this.dd,this.proxy,this.mask)
}Ext.Window.superclass.beforeDestroy.call(this)
},onDestroy:function(){if(this.manager){this.manager.unregister(this)
}Ext.Window.superclass.onDestroy.call(this)
},initTools:function(){if(this.minimizable){this.addTool({id:"minimize",handler:this.minimize.createDelegate(this,[])})
}if(this.maximizable){this.addTool({id:"maximize",handler:this.maximize.createDelegate(this,[])});
this.addTool({id:"restore",handler:this.restore.createDelegate(this,[]),hidden:true})
}if(this.closable){this.addTool({id:"close",handler:this[this.closeAction].createDelegate(this,[])})
}},resizerAction:function(){var b=this.proxy.getBox();
this.proxy.hide();
this.window.handleResize(b);
return b
},beforeResize:function(){this.resizer.minHeight=Math.max(this.minHeight,this.getFrameHeight()+40);
this.resizer.minWidth=Math.max(this.minWidth,this.getFrameWidth()+40);
this.resizeBox=this.el.getBox()
},updateHandles:function(){if(Ext.isIE&&this.resizer){this.resizer.syncHandleHeight();
this.el.repaint()
}},handleResize:function(c){var d=this.resizeBox;
if(d.x!=c.x||d.y!=c.y){this.updateBox(c)
}else{this.setSize(c)
}this.focus();
this.updateHandles();
this.saveState()
},focus:function(){var g=this.focusEl,e=this.defaultButton,d=typeof e;
if(Ext.isDefined(e)){if(Ext.isNumber(e)&&this.fbar){g=this.fbar.items.get(e)
}else{if(Ext.isString(e)){g=Ext.getCmp(e)
}else{g=e
}}}g=g||this.focusEl;
g.focus.defer(10,g)
},setAnimateTarget:function(b){b=Ext.get(b);
this.animateTarget=b
},beforeShow:function(){delete this.el.lastXY;
delete this.el.lastLT;
if(this.x===undefined||this.y===undefined){var d=this.el.getAlignToXY(this.container,"c-c");
var c=this.el.translatePoints(d[0],d[1]);
this.x=this.x===undefined?c.left:this.x;
this.y=this.y===undefined?c.top:this.y
}this.el.setLeftTop(this.x,this.y);
if(this.expandOnShow){this.expand(false)
}if(this.modal){Ext.getBody().addClass("x-body-masked");
this.mask.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true));
this.mask.show()
}},show:function(g,e,d){if(!this.rendered){this.render(Ext.getBody())
}if(this.hidden===false){this.toFront();
return this
}if(this.fireEvent("beforeshow",this)===false){return this
}if(e){this.on("show",e,d,{single:true})
}this.hidden=false;
if(Ext.isDefined(g)){this.setAnimateTarget(g)
}this.beforeShow();
if(this.animateTarget){this.animShow()
}else{this.afterShow()
}return this
},afterShow:function(c){this.proxy.hide();
this.el.setStyle("display","block");
this.el.show();
if(this.maximized){this.fitContainer()
}if(Ext.isMac&&Ext.isGecko2){this.cascade(this.setAutoScroll)
}if(this.monitorResize||this.modal||this.constrain||this.constrainHeader){Ext.EventManager.onWindowResize(this.onWindowResize,this)
}this.doConstrain();
this.doLayout();
if(this.keyMap){this.keyMap.enable()
}this.toFront();
this.updateHandles();
if(c&&(Ext.isIE||Ext.isWebKit)){var d=this.getSize();
this.onResize(d.width,d.height)
}this.onShow();
this.fireEvent("show",this)
},animShow:function(){this.proxy.show();
this.proxy.setBox(this.animateTarget.getBox());
this.proxy.setOpacity(0);
var b=this.getBox();
this.el.setStyle("display","none");
this.proxy.shift(Ext.apply(b,{callback:this.afterShow.createDelegate(this,[true],false),scope:this,easing:"easeNone",duration:0.25,opacity:0.5}))
},hide:function(g,e,d){if(this.hidden||this.fireEvent("beforehide",this)===false){return this
}if(e){this.on("hide",e,d,{single:true})
}this.hidden=true;
if(g!==undefined){this.setAnimateTarget(g)
}if(this.modal){this.mask.hide();
Ext.getBody().removeClass("x-body-masked")
}if(this.animateTarget){this.animHide()
}else{this.el.hide();
this.afterHide()
}return this
},afterHide:function(){this.proxy.hide();
if(this.monitorResize||this.modal||this.constrain||this.constrainHeader){Ext.EventManager.removeResizeListener(this.onWindowResize,this)
}if(this.keyMap){this.keyMap.disable()
}this.onHide();
this.fireEvent("hide",this)
},animHide:function(){this.proxy.setOpacity(0.5);
this.proxy.show();
var b=this.getBox(false);
this.proxy.setBox(b);
this.el.hide();
this.proxy.shift(Ext.apply(this.animateTarget.getBox(),{callback:this.afterHide,scope:this,duration:0.25,easing:"easeNone",opacity:0}))
},onShow:Ext.emptyFn,onHide:Ext.emptyFn,onWindowResize:function(){if(this.maximized){this.fitContainer()
}if(this.modal){this.mask.setSize("100%","100%");
var b=this.mask.dom.offsetHeight;
this.mask.setSize(Ext.lib.Dom.getViewWidth(true),Ext.lib.Dom.getViewHeight(true))
}this.doConstrain()
},doConstrain:function(){if(this.constrain||this.constrainHeader){var d;
if(this.constrain){d={right:this.el.shadowOffset,left:this.el.shadowOffset,bottom:this.el.shadowOffset}
}else{var e=this.getSize();
d={right:-(e.width-100),bottom:-(e.height-25)}
}var g=this.el.getConstrainToXY(this.container,true,d);
if(g){this.setPosition(g[0],g[1])
}}},ghost:function(e){var g=this.createGhost(e);
var d=this.getBox(true);
g.setLeftTop(d.x,d.y);
g.setWidth(d.width);
this.el.hide();
this.activeGhost=g;
return g
},unghost:function(c,d){if(!this.activeGhost){return
}if(c!==false){this.el.show();
this.focus();
if(Ext.isMac&&Ext.isGecko2){this.cascade(this.setAutoScroll)
}}if(d!==false){this.setPosition(this.activeGhost.getLeft(true),this.activeGhost.getTop(true))
}this.activeGhost.hide();
this.activeGhost.remove();
delete this.activeGhost
},minimize:function(){this.fireEvent("minimize",this);
return this
},close:function(){if(this.fireEvent("beforeclose",this)!==false){if(this.hidden){this.doClose()
}else{this.hide(null,this.doClose,this)
}}},doClose:function(){this.fireEvent("close",this);
this.destroy()
},maximize:function(){if(!this.maximized){this.expand(false);
this.restoreSize=this.getSize();
this.restorePos=this.getPosition(true);
if(this.maximizable){this.tools.maximize.hide();
this.tools.restore.show()
}this.maximized=true;
this.el.disableShadow();
if(this.dd){this.dd.lock()
}if(this.collapsible){this.tools.toggle.hide()
}this.el.addClass("x-window-maximized");
this.container.addClass("x-window-maximized-ct");
this.setPosition(0,0);
this.fitContainer();
this.fireEvent("maximize",this)
}return this
},restore:function(){if(this.maximized){var b=this.tools;
this.el.removeClass("x-window-maximized");
if(b.restore){b.restore.hide()
}if(b.maximize){b.maximize.show()
}this.setPosition(this.restorePos[0],this.restorePos[1]);
this.setSize(this.restoreSize.width,this.restoreSize.height);
delete this.restorePos;
delete this.restoreSize;
this.maximized=false;
this.el.enableShadow(true);
if(this.dd){this.dd.unlock()
}if(this.collapsible&&b.toggle){b.toggle.show()
}this.container.removeClass("x-window-maximized-ct");
this.doConstrain();
this.fireEvent("restore",this)
}return this
},toggleMaximize:function(){return this[this.maximized?"restore":"maximize"]()
},fitContainer:function(){var b=this.container.getViewSize(false);
this.setSize(b.width,b.height)
},setZIndex:function(b){if(this.modal){this.mask.setStyle("z-index",b)
}this.el.setZIndex(++b);
b+=5;
if(this.resizer){this.resizer.proxy.setStyle("z-index",++b)
}this.lastZIndex=b
},alignTo:function(e,g,j){var h=this.el.getAlignToXY(e,g,j);
this.setPagePosition(h[0],h[1]);
return this
},anchorTo:function(l,j,k,g){if(this.doAnchor){Ext.EventManager.removeResizeListener(this.doAnchor,this);
Ext.EventManager.un(window,"scroll",this.doAnchor,this)
}this.doAnchor=function(){this.alignTo(l,j,k)
};
Ext.EventManager.onWindowResize(this.doAnchor,this);
var h=typeof g;
if(h!="undefined"){Ext.EventManager.on(window,"scroll",this.doAnchor,this,{buffer:h=="number"?g:50})
}this.doAnchor();
return this
},toFront:function(b){if(this.manager.bringToFront(this)){if(!b||!b.getTarget().focus){this.focus()
}}return this
},setActive:function(b){if(b){if(!this.maximized){this.el.enableShadow(true)
}this.fireEvent("activate",this)
}else{this.el.disableShadow();
this.fireEvent("deactivate",this)
}},toBack:function(){this.manager.sendToBack(this);
return this
},center:function(){var b=this.el.getAlignToXY(this.container,"c-c");
this.setPagePosition(b[0],b[1]);
return this
}});
Ext.reg("window",Ext.Window);
Ext.Window.DD=function(b){this.win=b;
Ext.Window.DD.superclass.constructor.call(this,b.el.id,"WindowDD-"+b.id);
this.setHandleElId(b.header.id);
this.scroll=false
};
Ext.extend(Ext.Window.DD,Ext.dd.DD,{moveOnly:true,headerOffsets:[100,25],startDrag:function(){var e=this.win;
this.proxy=e.ghost();
if(e.constrain!==false){var g=e.el.shadowOffset;
this.constrainTo(e.container,{right:g,left:g,bottom:g})
}else{if(e.constrainHeader!==false){var d=this.proxy.getSize();
this.constrainTo(e.container,{right:-(d.width-this.headerOffsets[0]),bottom:-(d.height-this.headerOffsets[1])})
}}},b4Drag:Ext.emptyFn,onDrag:function(b){this.alignElWithMouse(this.proxy,b.getPageX(),b.getPageY())
},endDrag:function(b){this.win.unghost();
this.win.saveState()
}});
Ext.WindowGroup=function(){var m={};
var o=[];
var n=null;
var p=function(a,b){return(!a._lastAccess||a._lastAccess<b._lastAccess)?-1:1
};
var l=function(){var b=o,d=b.length;
if(d>0){b.sort(p);
var c=b[0].manager.zseed;
for(var a=0;
a<d;
a++){var e=b[a];
if(e&&!e.hidden){e.setZIndex(c+(a*10))
}}}k()
};
var j=function(a){if(a!=n){if(n){n.setActive(false)
}n=a;
if(a){a.setActive(true)
}}};
var k=function(){for(var a=o.length-1;
a>=0;
--a){if(!o[a].hidden){j(o[a]);
return
}}j(null)
};
return{zseed:9000,register:function(a){if(a.manager){a.manager.unregister(a)
}a.manager=this;
m[a.id]=a;
o.push(a);
a.on("hide",k)
},unregister:function(a){delete a.manager;
delete m[a.id];
a.un("hide",k);
o.remove(a)
},get:function(a){return typeof a=="object"?a:m[a]
},bringToFront:function(a){a=this.get(a);
if(a!=n){a._lastAccess=new Date().getTime();
l();
return true
}return false
},sendToBack:function(a){a=this.get(a);
a._lastAccess=-(new Date().getTime());
l();
return a
},hideAll:function(){for(var a in m){if(m[a]&&typeof m[a]!="function"&&m[a].isVisible()){m[a].hide()
}}},getActive:function(){return n
},getBy:function(b,c){var a=[];
for(var d=o.length-1;
d>=0;
--d){var e=o[d];
if(b.call(c||e,e)!==false){a.push(e)
}}return a
},each:function(b,c){for(var a in m){if(m[a]&&typeof m[a]!="function"){if(b.call(c||m[a],m[a])===false){return
}}}}}
};
Ext.WindowMgr=new Ext.WindowGroup();
Ext.MessageBox=function(){var A,S,E,B,N,J,C,T,H,F,L,O,D,z,G,M="",Q="",I=["ok","yes","no","cancel"];
var R=function(a){D[a].blur();
if(A.isVisible()){A.hide();
y();
Ext.callback(S.fn,S.scope||window,[a,z.dom.value,S],1)
}};
var y=function(){if(S&&S.cls){A.el.removeClass(S.cls)
}H.reset()
};
var P=function(a,c,b){if(S&&S.closable!==false){A.hide();
y()
}if(b){b.stopEvent()
}};
var K=function(c){var a=0,b;
if(!c){Ext.each(I,function(d){D[d].hide()
});
return a
}A.footer.dom.style.display="";
Ext.iterate(D,function(e,d){b=c[e];
if(b){d.show();
d.setText(Ext.isString(b)?b:Ext.MessageBox.buttonText[e]);
a+=d.getEl().getWidth()+15
}else{d.hide()
}});
return a
};
return{getDialog:function(c){if(!A){var a=[];
D={};
Ext.each(I,function(d){a.push(D[d]=new Ext.Button({text:this.buttonText[d],handler:R.createCallback(d),hideMode:"offsets"}))
},this);
A=new Ext.Window({autoCreate:true,title:c,resizable:false,constrain:true,constrainHeader:true,minimizable:false,maximizable:false,stateful:false,modal:true,shim:true,buttonAlign:"center",width:400,height:100,minHeight:80,plain:true,footer:true,closable:true,close:function(){if(S&&S.buttons&&S.buttons.no&&!S.buttons.cancel){R("no")
}else{R("cancel")
}},fbar:new Ext.Toolbar({items:a,enableOverflow:false})});
A.render(document.body);
A.getEl().addClass("x-window-dlg");
E=A.mask;
N=A.body.createChild({html:'<div class="ext-mb-icon"></div><div class="ext-mb-content"><span class="ext-mb-text"></span><br /><div class="ext-mb-fix-cursor"><input type="text" class="ext-mb-input" /><textarea class="ext-mb-textarea"></textarea></div></div>'});
L=Ext.get(N.dom.firstChild);
var b=N.dom.childNodes[1];
J=Ext.get(b.firstChild);
C=Ext.get(b.childNodes[2].firstChild);
C.enableDisplayMode();
C.addKeyListener([10,13],function(){if(A.isVisible()&&S&&S.buttons){if(S.buttons.ok){R("ok")
}else{if(S.buttons.yes){R("yes")
}}}});
T=Ext.get(b.childNodes[2].childNodes[1]);
T.enableDisplayMode();
H=new Ext.ProgressBar({renderTo:N});
N.createChild({cls:"x-clear"})
}return A
},updateText:function(g){if(!A.isVisible()&&!S.width){A.setSize(this.maxWidth,100)
}J.update(g||"&#160;");
var d=Q!=""?(L.getWidth()+L.getMargins("lr")):0;
var b=J.getWidth()+J.getMargins("lr");
var a=A.getFrameWidth("lr");
var c=A.body.getFrameWidth("lr");
if(Ext.isIE&&d>0){d+=3
}var e=Math.max(Math.min(S.width||d+b+a+c,this.maxWidth),Math.max(S.minWidth||this.minWidth,G||0));
if(S.prompt===true){z.setWidth(e-d-a-c)
}if(S.progress===true||S.wait===true){H.setSize(e-d-a-c)
}if(Ext.isIE&&e==G){e+=4
}A.setSize(e,"auto").center();
return this
},updateProgress:function(b,c,a){H.updateProgress(b,c);
if(a){this.updateText(a)
}return this
},isVisible:function(){return A&&A.isVisible()
},hide:function(){var a=A?A.activeGhost:null;
if(this.isVisible()||a){A.hide();
y();
if(a){A.unghost(false,false)
}}return this
},show:function(e){if(this.isVisible()){this.hide()
}S=e;
var c=this.getDialog(S.title||"&#160;");
c.setTitle(S.title||"&#160;");
var d=(S.closable!==false&&S.progress!==true&&S.wait!==true);
c.tools.close.setDisplayed(d);
z=C;
S.prompt=S.prompt||(S.multiline?true:false);
if(S.prompt){if(S.multiline){C.hide();
T.show();
T.setHeight(Ext.isNumber(S.multiline)?S.multiline:this.defaultTextHeight);
z=T
}else{C.show();
T.hide()
}}else{C.hide();
T.hide()
}z.dom.value=S.value||"";
if(S.prompt){c.focusEl=z
}else{var a=S.buttons;
var b=null;
if(a&&a.ok){b=D.ok
}else{if(a&&a.yes){b=D.yes
}}if(b){c.focusEl=b
}}if(S.iconCls){c.setIconClass(S.iconCls)
}this.setIcon(Ext.isDefined(S.icon)?S.icon:M);
G=K(S.buttons);
H.setVisible(S.progress===true||S.wait===true);
this.updateProgress(0,S.progressText);
this.updateText(S.msg);
if(S.cls){c.el.addClass(S.cls)
}c.proxyDrag=S.proxyDrag===true;
c.modal=S.modal!==false;
c.mask=S.modal!==false?E:false;
if(!c.isVisible()){document.body.appendChild(A.el.dom);
c.setAnimateTarget(S.animEl);
c.on("show",function(){if(d===true){c.keyMap.enable()
}else{c.keyMap.disable()
}},this,{single:true});
c.show(S.animEl)
}if(S.wait===true){H.wait(S.waitConfig)
}return this
},setIcon:function(a){if(!A){M=a;
return
}M=undefined;
if(a&&a!=""){L.removeClass("x-hidden");
L.replaceClass(Q,a);
N.addClass("x-dlg-icon");
Q=a
}else{L.replaceClass(Q,"x-hidden");
N.removeClass("x-dlg-icon");
Q=""
}return this
},progress:function(a,b,c){this.show({title:a,msg:b,buttons:false,progress:true,closable:false,minWidth:this.minProgressWidth,progressText:c});
return this
},wait:function(a,b,c){this.show({title:b,msg:a,buttons:false,closable:false,wait:true,modal:true,minWidth:this.minProgressWidth,waitConfig:c});
return this
},alert:function(d,a,b,c){this.show({title:d,msg:a,buttons:this.OK,fn:b,scope:c});
return this
},confirm:function(d,a,b,c){this.show({title:d,msg:a,buttons:this.YESNO,fn:b,scope:c,icon:this.QUESTION});
return this
},prompt:function(b,d,a,c,g,e){this.show({title:b,msg:d,buttons:this.OKCANCEL,fn:a,minWidth:250,scope:c,prompt:true,multiline:g,value:e});
return this
},OK:{ok:true},CANCEL:{cancel:true},OKCANCEL:{ok:true,cancel:true},YESNO:{yes:true,no:true},YESNOCANCEL:{yes:true,no:true,cancel:true},INFO:"ext-mb-info",WARNING:"ext-mb-warning",QUESTION:"ext-mb-question",ERROR:"ext-mb-error",defaultTextHeight:75,maxWidth:600,minWidth:100,minProgressWidth:250,buttonText:{ok:"OK",cancel:"Cancel",yes:"Yes",no:"No"}}
}();
Ext.Msg=Ext.MessageBox;
Ext.dd.PanelProxy=function(d,c){this.panel=d;
this.id=this.panel.id+"-ddproxy";
Ext.apply(this,c)
};
Ext.dd.PanelProxy.prototype={insertProxy:true,setStatus:Ext.emptyFn,reset:Ext.emptyFn,update:Ext.emptyFn,stop:Ext.emptyFn,sync:Ext.emptyFn,getEl:function(){return this.ghost
},getGhost:function(){return this.ghost
},getProxy:function(){return this.proxy
},hide:function(){if(this.ghost){if(this.proxy){this.proxy.remove();
delete this.proxy
}this.panel.el.dom.style.display="";
this.ghost.remove();
delete this.ghost
}},show:function(){if(!this.ghost){this.ghost=this.panel.createGhost(undefined,undefined,Ext.getBody());
this.ghost.setXY(this.panel.el.getXY());
if(this.insertProxy){this.proxy=this.panel.el.insertSibling({cls:"x-panel-dd-spacer"});
this.proxy.setSize(this.panel.getSize())
}this.panel.el.dom.style.display="none"
}},repair:function(d,g,e){this.hide();
if(typeof g=="function"){g.call(e||this)
}},moveProxy:function(d,c){if(this.proxy){d.insertBefore(this.proxy.dom,c)
}}};
Ext.Panel.DD=function(d,e){this.panel=d;
this.dragData={panel:d};
this.proxy=new Ext.dd.PanelProxy(d,e);
Ext.Panel.DD.superclass.constructor.call(this,d.el,e);
var g=d.header;
if(g){this.setHandleElId(g.id)
}(g?g:this.panel.body).setStyle("cursor","move");
this.scroll=false
};
Ext.extend(Ext.Panel.DD,Ext.dd.DragSource,{showFrame:Ext.emptyFn,startDrag:Ext.emptyFn,b4StartDrag:function(d,c){this.proxy.show()
},b4MouseDown:function(d){var e=d.getPageX();
var g=d.getPageY();
this.autoOffset(e,g)
},onInitDrag:function(d,c){this.onStartDrag(d,c);
return true
},createFrame:Ext.emptyFn,getDragEl:function(b){return this.proxy.ghost.dom
},endDrag:function(b){this.proxy.hide();
this.panel.saveState()
},autoOffset:function(d,c){d-=this.startPageX;
c-=this.startPageY;
this.setDelta(d,c)
}});
Ext.state.Provider=function(){this.addEvents("statechange");
this.state={};
Ext.state.Provider.superclass.constructor.call(this)
};
Ext.extend(Ext.state.Provider,Ext.util.Observable,{get:function(c,d){return typeof this.state[c]=="undefined"?d:this.state[c]
},clear:function(b){delete this.state[b];
this.fireEvent("statechange",this,b,null)
},set:function(d,c){this.state[d]=c;
this.fireEvent("statechange",this,d,c)
},decodeValue:function(h){var l=/^(a|n|d|b|s|o)\:(.*)$/;
var k=l.exec(unescape(h));
if(!k||!k[1]){return
}var m=k[1];
var j=k[2];
switch(m){case"n":return parseFloat(j);
case"d":return new Date(Date.parse(j));
case"b":return(j=="1");
case"a":var n=[];
if(j!=""){Ext.each(j.split("^"),function(a){n.push(this.decodeValue(a))
},this)
}return n;
case"o":var n={};
if(j!=""){Ext.each(j.split("^"),function(a){var b=a.split("=");
n[b[0]]=this.decodeValue(b[1])
},this)
}return n;
default:return j
}},encodeValue:function(n){var h;
if(typeof n=="number"){h="n:"+n
}else{if(typeof n=="boolean"){h="b:"+(n?"1":"0")
}else{if(Ext.isDate(n)){h="d:"+n.toGMTString()
}else{if(Ext.isArray(n)){var k="";
for(var l=0,j=n.length;
l<j;
l++){k+=this.encodeValue(n[l]);
if(l!=j-1){k+="^"
}}h="a:"+k
}else{if(typeof n=="object"){var k="";
for(var m in n){if(typeof n[m]!="function"&&n[m]!==undefined){k+=m+"="+this.encodeValue(n[m])+"^"
}}h="o:"+k.substring(0,k.length-1)
}else{h="s:"+n
}}}}}return escape(h)
}});
Ext.state.Manager=function(){var b=new Ext.state.Provider();
return{setProvider:function(a){b=a
},get:function(d,a){return b.get(d,a)
},set:function(a,d){b.set(a,d)
},clear:function(a){b.clear(a)
},getProvider:function(){return b
}}
}();
Ext.state.CookieProvider=function(b){Ext.state.CookieProvider.superclass.constructor.call(this);
this.path="/";
this.expires=new Date(new Date().getTime()+(1000*60*60*24*7));
this.domain=null;
this.secure=false;
Ext.apply(this,b);
this.state=this.readCookies()
};
Ext.extend(Ext.state.CookieProvider,Ext.state.Provider,{set:function(d,c){if(typeof c=="undefined"||c===null){this.clear(d);
return
}this.setCookie(d,c);
Ext.state.CookieProvider.superclass.set.call(this,d,c)
},clear:function(b){this.clearCookie(b);
Ext.state.CookieProvider.superclass.clear.call(this,b)
},readCookies:function(){var n={};
var k=document.cookie+";";
var c=/\s?(.*?)=(.*?);/g;
var l;
while((l=c.exec(k))!=null){var j=l[1];
var m=l[2];
if(j&&j.substring(0,3)=="ys-"){n[j.substr(3)]=this.decodeValue(m)
}}return n
},setCookie:function(d,c){document.cookie="ys-"+d+"="+this.encodeValue(c)+((this.expires==null)?"":("; expires="+this.expires.toGMTString()))+((this.path==null)?"":("; path="+this.path))+((this.domain==null)?"":("; domain="+this.domain))+((this.secure==true)?"; secure":"")
},clearCookie:function(b){document.cookie="ys-"+b+"=null; expires=Thu, 01-Jan-70 00:00:01 GMT"+((this.path==null)?"":("; path="+this.path))+((this.domain==null)?"":("; domain="+this.domain))+((this.secure==true)?"; secure":"")
}});
Ext.DataView=Ext.extend(Ext.BoxComponent,{selectedClass:"x-view-selected",emptyText:"",deferEmptyText:true,trackOver:false,last:false,initComponent:function(){Ext.DataView.superclass.initComponent.call(this);
if(Ext.isString(this.tpl)||Ext.isArray(this.tpl)){this.tpl=new Ext.XTemplate(this.tpl)
}this.addEvents("beforeclick","click","mouseenter","mouseleave","containerclick","dblclick","contextmenu","containercontextmenu","selectionchange","beforeselect");
this.store=Ext.StoreMgr.lookup(this.store);
this.all=new Ext.CompositeElementLite();
this.selected=new Ext.CompositeElementLite()
},afterRender:function(){Ext.DataView.superclass.afterRender.call(this);
this.mon(this.getTemplateTarget(),{click:this.onClick,dblclick:this.onDblClick,contextmenu:this.onContextMenu,scope:this});
if(this.overClass||this.trackOver){this.mon(this.getTemplateTarget(),{mouseover:this.onMouseOver,mouseout:this.onMouseOut,scope:this})
}if(this.store){this.bindStore(this.store,true)
}},refresh:function(){this.clearSelections(false,true);
var c=this.getTemplateTarget();
c.update("");
var d=this.store.getRange();
if(d.length<1){if(!this.deferEmptyText||this.hasSkippedEmptyText){c.update(this.emptyText)
}this.all.clear()
}else{this.tpl.overwrite(c,this.collectData(d,0));
this.all.fill(Ext.query(this.itemSelector,c.dom));
this.updateIndexes(0)
}this.hasSkippedEmptyText=true
},getTemplateTarget:function(){return this.el
},prepareData:function(b){return b
},collectData:function(g,j){var k=[];
for(var l=0,h=g.length;
l<h;
l++){k[k.length]=this.prepareData(g[l].data,j+l,g[l])
}return k
},bufferRender:function(d){var c=document.createElement("div");
this.tpl.overwrite(c,this.collectData(d));
return Ext.query(this.itemSelector,c)
},onUpdate:function(k,j){var h=this.store.indexOf(j);
if(h>-1){var l=this.isSelected(h);
var n=this.all.elements[h];
var m=this.bufferRender([j],h)[0];
this.all.replaceElement(h,m,true);
if(l){this.selected.replaceElement(n,m);
this.all.item(h).addClass(this.selectedClass)
}this.updateIndexes(h,h)
}},onAdd:function(k,m,l){if(this.all.getCount()===0){this.refresh();
return
}var n=this.bufferRender(m,l),j,a=this.all.elements;
if(l<this.all.getCount()){j=this.all.item(l).insertSibling(n,"before",true);
a.splice.apply(a,[l,0].concat(n))
}else{j=this.all.last().insertSibling(n,"after",true);
a.push.apply(a,n)
}this.updateIndexes(l)
},onRemove:function(g,e,d){this.deselect(d);
this.all.removeElement(d,true);
this.updateIndexes(d);
if(this.store.getCount()===0){this.refresh()
}},refreshNode:function(b){this.onUpdate(this.store,this.store.getAt(b))
},updateIndexes:function(h,j){var e=this.all.elements;
h=h||0;
j=j||((j===0)?0:(e.length-1));
for(var g=h;
g<=j;
g++){e[g].viewIndex=g
}},getStore:function(){return this.store
},bindStore:function(d,c){if(!c&&this.store){if(d!==this.store&&this.store.autoDestroy){this.store.destroy()
}else{this.store.un("beforeload",this.onBeforeLoad,this);
this.store.un("datachanged",this.refresh,this);
this.store.un("add",this.onAdd,this);
this.store.un("remove",this.onRemove,this);
this.store.un("update",this.onUpdate,this);
this.store.un("clear",this.refresh,this)
}if(!d){this.store=null
}}if(d){d=Ext.StoreMgr.lookup(d);
d.on({scope:this,beforeload:this.onBeforeLoad,datachanged:this.refresh,add:this.onAdd,remove:this.onRemove,update:this.onUpdate,clear:this.refresh})
}this.store=d;
if(d){this.refresh()
}},findItemFromChild:function(b){return Ext.fly(b).findParent(this.itemSelector,this.getTemplateTarget())
},onClick:function(g){var d=g.getTarget(this.itemSelector,this.getTemplateTarget());
if(d){var e=this.indexOf(d);
if(this.onItemClick(d,e,g)!==false){this.fireEvent("click",this,e,d,g)
}}else{if(this.fireEvent("containerclick",this,g)!==false){this.onContainerClick(g)
}}},onContainerClick:function(b){this.clearSelections()
},onContextMenu:function(c){var d=c.getTarget(this.itemSelector,this.getTemplateTarget());
if(d){this.fireEvent("contextmenu",this,this.indexOf(d),d,c)
}else{this.fireEvent("containercontextmenu",this,c)
}},onDblClick:function(c){var d=c.getTarget(this.itemSelector,this.getTemplateTarget());
if(d){this.fireEvent("dblclick",this,this.indexOf(d),d,c)
}},onMouseOver:function(c){var d=c.getTarget(this.itemSelector,this.getTemplateTarget());
if(d&&d!==this.lastItem){this.lastItem=d;
Ext.fly(d).addClass(this.overClass);
this.fireEvent("mouseenter",this,this.indexOf(d),d,c)
}},onMouseOut:function(b){if(this.lastItem){if(!b.within(this.lastItem,true,true)){Ext.fly(this.lastItem).removeClass(this.overClass);
this.fireEvent("mouseleave",this,this.indexOf(this.lastItem),this.lastItem,b);
delete this.lastItem
}}},onItemClick:function(d,e,g){if(this.fireEvent("beforeclick",this,e,d,g)===false){return false
}if(this.multiSelect){this.doMultiSelection(d,e,g);
g.preventDefault()
}else{if(this.singleSelect){this.doSingleSelection(d,e,g);
g.preventDefault()
}}return true
},doSingleSelection:function(d,e,g){if(g.ctrlKey&&this.isSelected(e)){this.deselect(e)
}else{this.select(e,false)
}},doMultiSelection:function(j,g,h){if(h.shiftKey&&this.last!==false){var e=this.last;
this.selectRange(e,g,h.ctrlKey);
this.last=e
}else{if((h.ctrlKey||this.simpleSelect)&&this.isSelected(g)){this.deselect(g)
}else{this.select(g,h.ctrlKey||h.shiftKey||this.simpleSelect)
}}},getSelectionCount:function(){return this.selected.getCount()
},getSelectedNodes:function(){return this.selected.elements
},getSelectedIndexes:function(){var e=[],h=this.selected.elements;
for(var j=0,g=h.length;
j<g;
j++){e.push(h[j].viewIndex)
}return e
},getSelectedRecords:function(){var h=[],j=this.selected.elements;
for(var e=0,g=j.length;
e<g;
e++){h[h.length]=this.store.getAt(j[e].viewIndex)
}return h
},getRecords:function(g){var j=[],k=g;
for(var l=0,h=k.length;
l<h;
l++){j[j.length]=this.store.getAt(k[l].viewIndex)
}return j
},getRecord:function(b){return this.store.getAt(b.viewIndex)
},clearSelections:function(d,c){if((this.multiSelect||this.singleSelect)&&this.selected.getCount()>0){if(!c){this.selected.removeClass(this.selectedClass)
}this.selected.clear();
this.last=false;
if(!d){this.fireEvent("selectionchange",this,this.selected.elements)
}}},isSelected:function(b){return this.selected.contains(this.getNode(b))
},deselect:function(b){if(this.isSelected(b)){b=this.getNode(b);
this.selected.removeElement(b);
if(this.last==b.viewIndex){this.last=false
}Ext.fly(b).removeClass(this.selectedClass);
this.fireEvent("selectionchange",this,this.selected.elements)
}},select:function(m,k,h){if(Ext.isArray(m)){if(!k){this.clearSelections(true)
}for(var n=0,j=m.length;
n<j;
n++){this.select(m[n],true,true)
}if(!h){this.fireEvent("selectionchange",this,this.selected.elements)
}}else{var l=this.getNode(m);
if(!k){this.clearSelections(true)
}if(l&&!this.isSelected(l)){if(this.fireEvent("beforeselect",this,l,this.selected.elements)!==false){Ext.fly(l).addClass(this.selectedClass);
this.selected.add(l);
this.last=l.viewIndex;
if(!h){this.fireEvent("selectionchange",this,this.selected.elements)
}}}}},selectRange:function(g,e,d){if(!d){this.clearSelections(true)
}this.select(this.getNodes(g,e),true)
},getNode:function(b){if(Ext.isString(b)){return document.getElementById(b)
}else{if(Ext.isNumber(b)){return this.all.elements[b]
}}return b
},getNodes:function(j,h){var k=this.all.elements;
j=j||0;
h=!Ext.isDefined(h)?Math.max(k.length-1,0):h;
var g=[],l;
if(j<=h){for(l=j;
l<=h&&k[l];
l++){g.push(k[l])
}}else{for(l=j;
l>=h&&k[l];
l--){g.push(k[l])
}}return g
},indexOf:function(b){b=this.getNode(b);
if(Ext.isNumber(b.viewIndex)){return b.viewIndex
}return this.all.indexOf(b)
},onBeforeLoad:function(){if(this.loadingText){this.clearSelections(false,true);
this.getTemplateTarget().update('<div class="loading-indicator">'+this.loadingText+"</div>");
this.all.clear()
}},onDestroy:function(){this.all.clear();
this.selected.clear();
Ext.DataView.superclass.onDestroy.call(this);
this.bindStore(null)
}});
Ext.DataView.prototype.setStore=Ext.DataView.prototype.bindStore;
Ext.reg("dataview",Ext.DataView);
Ext.list.ListView=Ext.extend(Ext.DataView,{itemSelector:"dl",selectedClass:"x-list-selected",overClass:"x-list-over",scrollOffset:undefined,columnResize:true,columnSort:true,maxWidth:Ext.isIE?99:100,initComponent:function(){if(this.columnResize){this.colResizer=new Ext.list.ColumnResizer(this.colResizer);
this.colResizer.init(this)
}if(this.columnSort){this.colSorter=new Ext.list.Sorter(this.columnSort);
this.colSorter.init(this)
}if(!this.internalTpl){this.internalTpl=new Ext.XTemplate('<div class="x-list-header"><div class="x-list-header-inner">','<tpl for="columns">','<div style="width:{[values.width*100]}%;text-align:{align};"><em unselectable="on" id="',this.id,'-xlhd-{#}">',"{header}","</em></div>","</tpl>",'<div class="x-clear"></div>',"</div></div>",'<div class="x-list-body"><div class="x-list-body-inner">',"</div></div>")
}if(!this.tpl){this.tpl=new Ext.XTemplate('<tpl for="rows">',"<dl>",'<tpl for="parent.columns">','<dt style="width:{[values.width*100]}%;text-align:{align};">','<em unselectable="on"<tpl if="cls"> class="{cls}</tpl>">',"{[values.tpl.apply(parent)]}","</em></dt>","</tpl>",'<div class="x-clear"></div>',"</dl>","</tpl>")
}var o=this.columns,q=0,p=0,j=o.length,u=[];
for(var r=0;
r<j;
r++){var c=o[r];
if(!c.isColumn){c.xtype=c.xtype?(/^lv/.test(c.xtype)?c.xtype:"lv"+c.xtype):"lvcolumn";
c=Ext.create(c)
}if(c.width){q+=c.width*100;
p++
}u.push(c)
}o=this.columns=u;
if(p<j){var t=j-p;
if(q<this.maxWidth){var v=((this.maxWidth-q)/t)/100;
for(var s=0;
s<j;
s++){var c=o[s];
if(!c.width){c.width=v
}}}}Ext.list.ListView.superclass.initComponent.call(this)
},onRender:function(){this.autoEl={cls:"x-list-wrap"};
Ext.list.ListView.superclass.onRender.apply(this,arguments);
this.internalTpl.overwrite(this.el,{columns:this.columns});
this.innerBody=Ext.get(this.el.dom.childNodes[1].firstChild);
this.innerHd=Ext.get(this.el.dom.firstChild.firstChild);
if(this.hideHeaders){this.el.dom.firstChild.style.display="none"
}},getTemplateTarget:function(){return this.innerBody
},collectData:function(){var b=Ext.list.ListView.superclass.collectData.apply(this,arguments);
return{columns:this.columns,rows:b}
},verifyInternalSize:function(){if(this.lastSize){this.onResize(this.lastSize.width,this.lastSize.height)
}},onResize:function(h,m){var l=this.innerBody.dom;
var k=this.innerHd.dom;
if(!l){return
}var n=l.parentNode;
if(Ext.isNumber(h)){var j=h-Ext.num(this.scrollOffset,Ext.getScrollBarWidth());
if(this.reserveScrollOffset||((n.offsetWidth-n.clientWidth)>10)){l.style.width=j+"px";
k.style.width=j+"px"
}else{l.style.width=h+"px";
k.style.width=h+"px";
setTimeout(function(){if((n.offsetWidth-n.clientWidth)>10){l.style.width=j+"px";
k.style.width=j+"px"
}},10)
}}if(Ext.isNumber(m)){n.style.height=(m-k.parentNode.offsetHeight)+"px"
}},updateIndexes:function(){Ext.list.ListView.superclass.updateIndexes.apply(this,arguments);
this.verifyInternalSize()
},findHeaderIndex:function(k){k=k.dom||k;
var h=k.parentNode,l=h.parentNode.childNodes;
for(var c=0,j;
j=l[c];
c++){if(j==h){return c
}}return -1
},setHdWidths:function(){var j=this.innerHd.dom.getElementsByTagName("div");
for(var e=0,h=this.columns,g=h.length;
e<g;
e++){j[e].style.width=(h[e].width*100)+"%"
}}});
Ext.reg("listview",Ext.list.ListView);
Ext.ListView=Ext.list.ListView;
Ext.list.Column=Ext.extend(Object,{isColumn:true,align:"left",header:"",width:null,cls:"",constructor:function(b){if(!b.tpl){b.tpl=new Ext.XTemplate("{"+b.dataIndex+"}")
}else{if(Ext.isString(b.tpl)){b.tpl=new Ext.XTemplate(b.tpl)
}}Ext.apply(this,b)
}});
Ext.reg("lvcolumn",Ext.list.Column);
Ext.list.NumberColumn=Ext.extend(Ext.list.Column,{format:"0,000.00",constructor:function(b){b.tpl=b.tpl||new Ext.XTemplate("{"+b.dataIndex+':number("'+(b.format||this.format)+'")}');
Ext.list.NumberColumn.superclass.constructor.call(this,b)
}});
Ext.reg("lvnumbercolumn",Ext.list.NumberColumn);
Ext.list.DateColumn=Ext.extend(Ext.list.Column,{format:"m/d/Y",constructor:function(b){b.tpl=b.tpl||new Ext.XTemplate("{"+b.dataIndex+':date("'+(b.format||this.format)+'")}');
Ext.list.DateColumn.superclass.constructor.call(this,b)
}});
Ext.reg("lvdatecolumn",Ext.list.DateColumn);
Ext.list.BooleanColumn=Ext.extend(Ext.list.Column,{trueText:"true",falseText:"false",undefinedText:"&#160;",constructor:function(h){h.tpl=h.tpl||new Ext.XTemplate("{"+h.dataIndex+":this.format}");
var c=this.trueText,j=this.falseText,g=this.undefinedText;
h.tpl.format=function(a){if(a===undefined){return g
}if(!a||a==="false"){return j
}return c
};
Ext.list.DateColumn.superclass.constructor.call(this,h)
}});
Ext.reg("lvbooleancolumn",Ext.list.BooleanColumn);
Ext.list.ColumnResizer=Ext.extend(Ext.util.Observable,{minPct:0.05,constructor:function(b){Ext.apply(this,b);
Ext.list.ColumnResizer.superclass.constructor.call(this)
},init:function(b){this.view=b;
b.on("render",this.initEvents,this)
},initEvents:function(b){b.mon(b.innerHd,"mousemove",this.handleHdMove,this);
this.tracker=new Ext.dd.DragTracker({onBeforeStart:this.onBeforeStart.createDelegate(this),onStart:this.onStart.createDelegate(this),onDrag:this.onDrag.createDelegate(this),onEnd:this.onEnd.createDelegate(this),tolerance:3,autoStart:300});
this.tracker.initEl(b.innerHd);
b.on("beforedestroy",this.tracker.destroy,this.tracker)
},handleHdMove:function(m,p){var e=5,l=m.getPageX(),n=m.getTarget("em",3,true);
if(n){var o=n.getRegion(),q=n.dom.style,r=n.dom.parentNode;
if(l-o.left<=e&&r!=r.parentNode.firstChild){this.activeHd=Ext.get(r.previousSibling.firstChild);
q.cursor=Ext.isWebKit?"e-resize":"col-resize"
}else{if(o.right-l<=e&&r!=r.parentNode.lastChild.previousSibling){this.activeHd=n;
q.cursor=Ext.isWebKit?"w-resize":"col-resize"
}else{delete this.activeHd;
q.cursor=""
}}}},onBeforeStart:function(b){this.dragHd=this.activeHd;
return !!this.dragHd
},onStart:function(g){this.view.disableHeaders=true;
this.proxy=this.view.el.createChild({cls:"x-list-resizer"});
this.proxy.setHeight(this.view.el.getHeight());
var e=this.tracker.getXY()[0],d=this.view.innerHd.getWidth();
this.hdX=this.dragHd.getX();
this.hdIndex=this.view.findHeaderIndex(this.dragHd);
this.proxy.setX(this.hdX);
this.proxy.setWidth(e-this.hdX);
this.minWidth=d*this.minPct;
this.maxWidth=d-(this.minWidth*(this.view.columns.length-1-this.hdIndex))
},onDrag:function(c){var d=this.tracker.getXY()[0];
this.proxy.setWidth((d-this.hdX).constrain(this.minWidth,this.maxWidth))
},onEnd:function(x){var z=this.proxy.getWidth();
this.proxy.remove();
var A=this.hdIndex,u=this.view,B=u.columns,y=B.length,s=this.view.innerHd.getWidth(),C=this.minPct*100,e=Math.ceil((z*u.maxWidth)/s),t=(B[A].width*100)-e,v=Math.floor(t/(y-1-A)),w=t-(v*(y-1-A));
for(var D=A+1;
D<y;
D++){var E=(B[D].width*100)+v,F=Math.max(C,E);
if(E!=F){w+=E-F
}B[D].width=F/100
}B[A].width=e/100;
B[A+1].width+=(w/100);
delete this.dragHd;
u.setHdWidths();
u.refresh();
setTimeout(function(){u.disableHeaders=false
},100)
}});
Ext.ListView.ColumnResizer=Ext.list.ColumnResizer;
Ext.list.Sorter=Ext.extend(Ext.util.Observable,{sortClasses:["sort-asc","sort-desc"],constructor:function(b){Ext.apply(this,b);
Ext.list.Sorter.superclass.constructor.call(this)
},init:function(b){this.view=b;
b.on("render",this.initEvents,this)
},initEvents:function(b){b.mon(b.innerHd,"click",this.onHdClick,this);
b.innerHd.setStyle("cursor","pointer");
b.mon(b.store,"datachanged",this.updateSortState,this);
this.updateSortState.defer(10,this,[b.store])
},updateSortState:function(p){var m=p.getSortState();
if(!m){return
}this.sortState=m;
var n=this.view.columns,l=-1;
for(var o=0,k=n.length;
o<k;
o++){if(n[o].dataIndex==m.field){l=o;
break
}}if(l!=-1){var j=m.direction;
this.updateSortIcon(l,j)
}},updateSortIcon:function(e,g){var h=this.sortClasses;
var j=this.view.innerHd.select("em").removeClass(h);
j.item(e).addClass(h[g=="DESC"?1:0])
},onHdClick:function(g){var d=g.getTarget("em",3);
if(d&&!this.view.disableHeaders){var e=this.view.findHeaderIndex(d);
this.view.store.sort(this.view.columns[e].dataIndex)
}}});
Ext.ListView.Sorter=Ext.list.Sorter;
Ext.TabPanel=Ext.extend(Ext.Panel,{monitorResize:true,deferredRender:true,tabWidth:120,minTabWidth:30,resizeTabs:false,enableTabScroll:false,scrollIncrement:0,scrollRepeatInterval:400,scrollDuration:0.35,animScroll:true,tabPosition:"top",baseCls:"x-tab-panel",autoTabs:false,autoTabSelector:"div.x-tab",activeTab:undefined,tabMargin:2,plain:false,wheelIncrement:20,idDelimiter:"__",itemCls:"x-tab-item",elements:"body",headerAsText:false,frame:false,hideBorders:true,initComponent:function(){this.frame=false;
Ext.TabPanel.superclass.initComponent.call(this);
this.addEvents("beforetabchange","tabchange","contextmenu");
this.setLayout(new Ext.layout.CardLayout(Ext.apply({layoutOnCardChange:this.layoutOnTabChange,deferredRender:this.deferredRender},this.layoutConfig)));
if(this.tabPosition=="top"){this.elements+=",header";
this.stripTarget="header"
}else{this.elements+=",footer";
this.stripTarget="footer"
}if(!this.stack){this.stack=Ext.TabPanel.AccessStack()
}this.initItems()
},onRender:function(n,j){Ext.TabPanel.superclass.onRender.call(this,n,j);
if(this.plain){var k=this.tabPosition=="top"?"header":"footer";
this[k].addClass("x-tab-panel-"+k+"-plain")
}var h=this[this.stripTarget];
this.stripWrap=h.createChild({cls:"x-tab-strip-wrap",cn:{tag:"ul",cls:"x-tab-strip x-tab-strip-"+this.tabPosition}});
var l=(this.tabPosition=="bottom"?this.stripWrap:null);
h.createChild({cls:"x-tab-strip-spacer"},l);
this.strip=new Ext.Element(this.stripWrap.dom.firstChild);
this.edge=this.strip.createChild({tag:"li",cls:"x-tab-edge",cn:[{tag:"span",cls:"x-tab-strip-text",cn:"&#160;"}]});
this.strip.createChild({cls:"x-clear"});
this.body.addClass("x-tab-panel-body-"+this.tabPosition);
if(!this.itemTpl){var m=new Ext.Template('<li class="{cls}" id="{id}"><a class="x-tab-strip-close"></a>','<a class="x-tab-right" href="#"><em class="x-tab-left">','<span class="x-tab-strip-inner"><span class="x-tab-strip-text {iconCls}">{text}</span></span>',"</em></a></li>");
m.disableFormats=true;
m.compile();
Ext.TabPanel.prototype.itemTpl=m
}this.items.each(this.initTab,this)
},afterRender:function(){Ext.TabPanel.superclass.afterRender.call(this);
if(this.autoTabs){this.readTabs(false)
}if(this.activeTab!==undefined){var b=Ext.isObject(this.activeTab)?this.activeTab:this.items.get(this.activeTab);
delete this.activeTab;
this.setActiveTab(b)
}},initEvents:function(){Ext.TabPanel.superclass.initEvents.call(this);
this.mon(this.strip,{scope:this,mousedown:this.onStripMouseDown,contextmenu:this.onStripContextMenu});
if(this.enableTabScroll){this.mon(this.strip,"mousewheel",this.onWheel,this)
}},findTargets:function(g){var d=null;
var e=g.getTarget("li",this.strip);
if(e){d=this.getComponent(e.id.split(this.idDelimiter)[1]);
if(d.disabled){return{close:null,item:null,el:null}
}}return{close:g.getTarget(".x-tab-strip-close",this.strip),item:d,el:e}
},onStripMouseDown:function(c){if(c.button!==0){return
}c.preventDefault();
var d=this.findTargets(c);
if(d.close){if(d.item.fireEvent("beforeclose",d.item)!==false){d.item.fireEvent("close",d.item);
this.remove(d.item)
}return
}if(d.item&&d.item!=this.activeTab){this.setActiveTab(d.item)
}},onStripContextMenu:function(c){c.preventDefault();
var d=this.findTargets(c);
if(d.item){this.fireEvent("contextmenu",this,d.item,c)
}},readTabs:function(m){if(m===true){this.items.each(function(a){this.remove(a)
},this)
}var n=this.el.query(this.autoTabSelector);
for(var h=0,j=n.length;
h<j;
h++){var l=n[h],k=l.getAttribute("title");
l.removeAttribute("title");
this.add({title:k,contentEl:l})
}},initTab:function(o,j){var n=this.strip.dom.childNodes[j],m=this.getTemplateArgs(o),p=n?this.itemTpl.insertBefore(n,m):this.itemTpl.append(this.strip,m),k="x-tab-strip-over",l=Ext.get(p);
l.hover(function(){if(!o.disabled){l.addClass(k)
}},function(){l.removeClass(k)
});
if(o.tabTip){l.child("span.x-tab-strip-text",true).qtip=o.tabTip
}o.tabEl=p;
l.select("a").on("click",function(a){if(!a.getPageX()){this.onStripMouseDown(a)
}},this,{preventDefault:true});
o.on({scope:this,disable:this.onItemDisabled,enable:this.onItemEnabled,titlechange:this.onItemTitleChanged,iconchange:this.onItemIconChanged,beforeshow:this.onBeforeShowItem})
},getTemplateArgs:function(c){var d=c.closable?"x-tab-strip-closable":"";
if(c.disabled){d+=" x-item-disabled"
}if(c.iconCls){d+=" x-tab-with-icon"
}if(c.tabCls){d+=" "+c.tabCls
}return{id:this.id+this.idDelimiter+c.getItemId(),text:c.title,cls:d,iconCls:c.iconCls||""}
},onAdd:function(c){Ext.TabPanel.superclass.onAdd.call(this,c);
if(this.rendered){var d=this.items;
this.initTab(c,d.indexOf(c));
if(d.getCount()==1){this.syncSize()
}this.delegateUpdates()
}},onBeforeAdd:function(d){var e=d.events?(this.items.containsKey(d.getItemId())?d:null):this.items.get(d);
if(e){this.setActiveTab(d);
return false
}Ext.TabPanel.superclass.onBeforeAdd.apply(this,arguments);
var g=d.elements;
d.elements=g?g.replace(",header",""):g;
d.border=(d.border===true)
},onRemove:function(g){var c=Ext.get(g.tabEl);
if(c){c.select("a").removeAllListeners();
Ext.destroy(c)
}Ext.TabPanel.superclass.onRemove.call(this,g);
this.stack.remove(g);
delete g.tabEl;
g.un("disable",this.onItemDisabled,this);
g.un("enable",this.onItemEnabled,this);
g.un("titlechange",this.onItemTitleChanged,this);
g.un("iconchange",this.onItemIconChanged,this);
g.un("beforeshow",this.onBeforeShowItem,this);
if(g==this.activeTab){var e=this.stack.next();
if(e){this.setActiveTab(e)
}else{if(this.items.getCount()>0){this.setActiveTab(0)
}else{this.setActiveTab(null)
}}}if(!this.destroying){this.delegateUpdates()
}},onBeforeShowItem:function(b){if(b!=this.activeTab){this.setActiveTab(b);
return false
}},onItemDisabled:function(c){var d=this.getTabEl(c);
if(d){Ext.fly(d).addClass("x-item-disabled")
}this.stack.remove(c)
},onItemEnabled:function(c){var d=this.getTabEl(c);
if(d){Ext.fly(d).removeClass("x-item-disabled")
}},onItemTitleChanged:function(c){var d=this.getTabEl(c);
if(d){Ext.fly(d).child("span.x-tab-strip-text",true).innerHTML=c.title
}},onItemIconChanged:function(h,g,j){var e=this.getTabEl(h);
if(e){e=Ext.get(e);
e.child("span.x-tab-strip-text").replaceClass(j,g);
e[Ext.isEmpty(g)?"removeClass":"addClass"]("x-tab-with-icon")
}},getTabEl:function(d){var c=this.getComponent(d);
return c?c.tabEl:null
},onResize:function(){Ext.TabPanel.superclass.onResize.apply(this,arguments);
this.delegateUpdates()
},beginUpdate:function(){this.suspendUpdates=true
},endUpdate:function(){this.suspendUpdates=false;
this.delegateUpdates()
},hideTabStripItem:function(c){c=this.getComponent(c);
var d=this.getTabEl(c);
if(d){d.style.display="none";
this.delegateUpdates()
}this.stack.remove(c)
},unhideTabStripItem:function(c){c=this.getComponent(c);
var d=this.getTabEl(c);
if(d){d.style.display="";
this.delegateUpdates()
}},delegateUpdates:function(){if(this.suspendUpdates){return
}if(this.resizeTabs&&this.rendered){this.autoSizeTabs()
}if(this.enableTabScroll&&this.rendered){this.autoScrollTabs()
}},autoSizeTabs:function(){var t=this.items.length,y=this.tabPosition!="bottom"?"header":"footer",x=this[y].dom.offsetWidth,z=this[y].dom.clientWidth;
if(!this.resizeTabs||t<1||!z){return
}var r=Math.max(Math.min(Math.floor((z-4)/t)-this.tabMargin,this.tabWidth),this.minTabWidth);
this.lastTabWidth=r;
var p=this.strip.query("li:not([className^=x-tab-edge])");
for(var v=0,s=p.length;
v<s;
v++){var q=p[v],o=Ext.fly(q).child(".x-tab-strip-inner",true),u=q.offsetWidth,w=o.offsetWidth;
o.style.width=(r-(u-w))+"px"
}},adjustBodyWidth:function(b){if(this.header){this.header.setWidth(b)
}if(this.footer){this.footer.setWidth(b)
}return b
},setActiveTab:function(g){g=this.getComponent(g);
if(this.fireEvent("beforetabchange",this,g,this.activeTab)===false){return
}if(!this.rendered){this.activeTab=g;
return
}if(this.activeTab!=g){if(this.activeTab){var e=this.getTabEl(this.activeTab);
if(e){Ext.fly(e).removeClass("x-tab-strip-active")
}}if(g){var d=this.getTabEl(g);
Ext.fly(d).addClass("x-tab-strip-active");
this.activeTab=g;
this.stack.add(g);
this.layout.setActiveItem(g);
if(this.scrolling){this.scrollToTab(g,this.animScroll)
}}this.fireEvent("tabchange",this,g)
}},getActiveTab:function(){return this.activeTab||null
},getItem:function(b){return this.getComponent(b)
},autoScrollTabs:function(){this.pos=this.tabPosition=="bottom"?this.footer:this.header;
var n=this.items.length,q=this.pos.dom.offsetWidth,r=this.pos.dom.clientWidth,o=this.stripWrap,p=o.dom,k=p.offsetWidth,m=this.getScrollPos(),l=this.edge.getOffsetsTo(this.stripWrap)[0]+m;
if(!this.enableTabScroll||n<1||k<20){return
}if(l<=r){p.scrollLeft=0;
o.setWidth(r);
if(this.scrolling){this.scrolling=false;
this.pos.removeClass("x-tab-scrolling");
this.scrollLeft.hide();
this.scrollRight.hide();
if(Ext.isAir||Ext.isWebKit){p.style.marginLeft="";
p.style.marginRight=""
}}}else{if(!this.scrolling){this.pos.addClass("x-tab-scrolling");
if(Ext.isAir||Ext.isWebKit){p.style.marginLeft="18px";
p.style.marginRight="18px"
}}r-=o.getMargins("lr");
o.setWidth(r>20?r:20);
if(!this.scrolling){if(!this.scrollLeft){this.createScrollers()
}else{this.scrollLeft.show();
this.scrollRight.show()
}}this.scrolling=true;
if(m>(l-r)){p.scrollLeft=l-r
}else{this.scrollToTab(this.activeTab,false)
}this.updateScrollButtons()
}},createScrollers:function(){this.pos.addClass("x-tab-scrolling-"+this.tabPosition);
var g=this.stripWrap.dom.offsetHeight;
var e=this.pos.insertFirst({cls:"x-tab-scroller-left"});
e.setHeight(g);
e.addClassOnOver("x-tab-scroller-left-over");
this.leftRepeater=new Ext.util.ClickRepeater(e,{interval:this.scrollRepeatInterval,handler:this.onScrollLeft,scope:this});
this.scrollLeft=e;
var d=this.pos.insertFirst({cls:"x-tab-scroller-right"});
d.setHeight(g);
d.addClassOnOver("x-tab-scroller-right-over");
this.rightRepeater=new Ext.util.ClickRepeater(d,{interval:this.scrollRepeatInterval,handler:this.onScrollRight,scope:this});
this.scrollRight=d
},getScrollWidth:function(){return this.edge.getOffsetsTo(this.stripWrap)[0]+this.getScrollPos()
},getScrollPos:function(){return parseInt(this.stripWrap.dom.scrollLeft,10)||0
},getScrollArea:function(){return parseInt(this.stripWrap.dom.clientWidth,10)||0
},getScrollAnim:function(){return{duration:this.scrollDuration,callback:this.updateScrollButtons,scope:this}
},getScrollIncrement:function(){return this.scrollIncrement||(this.resizeTabs?this.lastTabWidth+2:100)
},scrollToTab:function(n,k){if(!n){return
}var p=this.getTabEl(n),l=this.getScrollPos(),o=this.getScrollArea(),m=Ext.fly(p).getOffsetsTo(this.stripWrap)[0]+l,j=m+p.offsetWidth;
if(m<l){this.scrollTo(m,k)
}else{if(j>(l+o)){this.scrollTo(j-o,k)
}}},scrollTo:function(c,d){this.stripWrap.scrollTo("left",c,d?this.getScrollAnim():false);
if(!d){this.updateScrollButtons()
}},onWheel:function(m){var l=m.getWheelDelta()*this.wheelIncrement*-1;
m.stopEvent();
var k=this.getScrollPos(),n=k+l,e=this.getScrollWidth()-this.getScrollArea();
var d=Math.max(0,Math.min(e,n));
if(d!=k){this.scrollTo(d,false)
}},onScrollRight:function(){var e=this.getScrollWidth()-this.getScrollArea(),g=this.getScrollPos(),d=Math.min(e,g+this.getScrollIncrement());
if(d!=g){this.scrollTo(d,this.animScroll)
}},onScrollLeft:function(){var c=this.getScrollPos(),d=Math.max(0,c-this.getScrollIncrement());
if(d!=c){this.scrollTo(d,this.animScroll)
}},updateScrollButtons:function(){var b=this.getScrollPos();
this.scrollLeft[b===0?"addClass":"removeClass"]("x-tab-scroller-left-disabled");
this.scrollRight[b>=(this.getScrollWidth()-this.getScrollArea())?"addClass":"removeClass"]("x-tab-scroller-right-disabled")
},beforeDestroy:function(){Ext.destroy(this.leftRepeater,this.rightRepeater);
this.deleteMembers("strip","edge","scrollLeft","scrollRight","stripWrap");
this.activeTab=null;
Ext.TabPanel.superclass.beforeDestroy.apply(this)
}});
Ext.reg("tabpanel",Ext.TabPanel);
Ext.TabPanel.prototype.activate=Ext.TabPanel.prototype.setActiveTab;
Ext.TabPanel.AccessStack=function(){var b=[];
return{add:function(a){b.push(a);
if(b.length>10){b.shift()
}},remove:function(g){var h=[];
for(var j=0,a=b.length;
j<a;
j++){if(b[j]!=g){h.push(b[j])
}}b=h
},next:function(){return b.pop()
}}
};
Ext.Button=Ext.extend(Ext.BoxComponent,{hidden:false,disabled:false,pressed:false,enableToggle:false,menuAlign:"tl-bl?",type:"button",menuClassTarget:"tr:nth(2)",clickEvent:"click",handleMouseEvents:true,tooltipType:"qtip",buttonSelector:"button:first-child",scale:"small",iconAlign:"left",arrowAlign:"right",initComponent:function(){Ext.Button.superclass.initComponent.call(this);
this.addEvents("click","toggle","mouseover","mouseout","menushow","menuhide","menutriggerover","menutriggerout");
if(this.menu){this.menu=Ext.menu.MenuMgr.get(this.menu)
}if(Ext.isString(this.toggleGroup)){this.enableToggle=true
}},getTemplateArgs:function(){return[this.type,"x-btn-"+this.scale+" x-btn-icon-"+this.scale+"-"+this.iconAlign,this.getMenuClass(),this.cls,this.id]
},setButtonClass:function(){if(this.useSetClass){if(!Ext.isEmpty(this.oldCls)){this.el.removeClass([this.oldCls,"x-btn-pressed"])
}this.oldCls=(this.iconCls||this.icon)?(this.text?" x-btn-text-icon":" x-btn-icon"):" x-btn-noicon";
this.el.addClass([this.oldCls,this.pressed?"x-btn-pressed":null])
}},getMenuClass:function(){return this.menu?(this.arrowAlign!="bottom"?"x-btn-arrow":"x-btn-arrow-bottom"):""
},onRender:function(j,g){if(!this.template){if(!Ext.Button.buttonTemplate){Ext.Button.buttonTemplate=new Ext.Template('<table id="{4}" cellspacing="0" class="x-btn {3}"><tbody class="{1}">','<tr><td class="x-btn-tl"><i>&#160;</i></td><td class="x-btn-tc"></td><td class="x-btn-tr"><i>&#160;</i></td></tr>','<tr><td class="x-btn-ml"><i>&#160;</i></td><td class="x-btn-mc"><em class="{2}" unselectable="on"><button type="{0}"></button></em></td><td class="x-btn-mr"><i>&#160;</i></td></tr>','<tr><td class="x-btn-bl"><i>&#160;</i></td><td class="x-btn-bc"></td><td class="x-btn-br"><i>&#160;</i></td></tr>',"</tbody></table>");
Ext.Button.buttonTemplate.compile()
}this.template=Ext.Button.buttonTemplate
}var e,h=this.getTemplateArgs();
if(g){e=this.template.insertBefore(g,h,true)
}else{e=this.template.append(j,h,true)
}this.btnEl=e.child(this.buttonSelector);
this.mon(this.btnEl,{scope:this,focus:this.onFocus,blur:this.onBlur});
this.initButtonEl(e,this.btnEl);
Ext.ButtonToggleMgr.register(this)
},initButtonEl:function(d,g){this.el=d;
this.setIcon(this.icon);
this.setText(this.text);
this.setIconClass(this.iconCls);
if(Ext.isDefined(this.tabIndex)){g.dom.tabIndex=this.tabIndex
}if(this.tooltip){this.setTooltip(this.tooltip,true)
}if(this.handleMouseEvents){this.mon(d,{scope:this,mouseover:this.onMouseOver,mousedown:this.onMouseDown})
}if(this.menu){this.mon(this.menu,{scope:this,show:this.onMenuShow,hide:this.onMenuHide})
}if(this.repeat){var e=new Ext.util.ClickRepeater(d,Ext.isObject(this.repeat)?this.repeat:{});
this.mon(e,"click",this.onClick,this)
}this.mon(d,this.clickEvent,this.onClick,this)
},afterRender:function(){Ext.Button.superclass.afterRender.call(this);
this.useSetClass=true;
this.setButtonClass();
this.doc=Ext.getDoc();
this.doAutoWidth()
},setIconClass:function(b){this.iconCls=b;
if(this.el){this.btnEl.dom.className="";
this.btnEl.addClass(["x-btn-text",b||""]);
this.setButtonClass()
}return this
},setTooltip:function(c,d){if(this.rendered){if(!d){this.clearTip()
}if(Ext.isObject(c)){Ext.QuickTips.register(Ext.apply({target:this.btnEl.id},c));
this.tooltip=c
}else{this.btnEl.dom[this.tooltipType]=c
}}else{this.tooltip=c
}return this
},clearTip:function(){if(Ext.isObject(this.tooltip)){Ext.QuickTips.unregister(this.btnEl)
}},beforeDestroy:function(){if(this.rendered){this.clearTip()
}if(this.menu&&this.menu.autoDestroy){Ext.destroy(this.menu)
}Ext.destroy(this.repeater)
},onDestroy:function(){if(this.rendered){this.doc.un("mouseover",this.monitorMouseOver,this);
this.doc.un("mouseup",this.onMouseUp,this);
delete this.doc;
delete this.btnEl;
Ext.ButtonToggleMgr.unregister(this)
}},doAutoWidth:function(){if(this.el&&this.text&&this.width===undefined){this.el.setWidth("auto");
if(Ext.isIE7&&Ext.isStrict){var b=this.btnEl;
if(b&&b.getWidth()>20){b.clip();
b.setWidth(Ext.util.TextMetrics.measure(b,this.text).width+b.getFrameWidth("lr"))
}}if(this.minWidth){if(this.el.getWidth()<this.minWidth){this.el.setWidth(this.minWidth)
}}}},setHandler:function(c,d){this.handler=c;
this.scope=d;
return this
},setText:function(b){this.text=b;
if(this.el){this.btnEl.update(b||"&#160;");
this.setButtonClass()
}this.doAutoWidth();
return this
},setIcon:function(b){this.icon=b;
if(this.el){this.btnEl.setStyle("background-image",b?"url("+b+")":"");
this.setButtonClass()
}return this
},getText:function(){return this.text
},toggle:function(c,d){c=c===undefined?!this.pressed:!!c;
if(c!=this.pressed){if(this.rendered){this.el[c?"addClass":"removeClass"]("x-btn-pressed")
}this.pressed=c;
if(!d){this.fireEvent("toggle",this,c);
if(this.toggleHandler){this.toggleHandler.call(this.scope||this,this,c)
}}}return this
},focus:function(){this.btnEl.focus()
},onDisable:function(){this.onDisableChange(true)
},onEnable:function(){this.onDisableChange(false)
},onDisableChange:function(b){if(this.el){if(!Ext.isIE6||!this.text){this.el[b?"addClass":"removeClass"](this.disabledClass)
}this.el.dom.disabled=b
}this.disabled=b
},showMenu:function(){if(this.rendered&&this.menu){if(this.tooltip){Ext.QuickTips.getQuickTip().cancelShow(this.btnEl)
}this.menu.show(this.el,this.menuAlign)
}return this
},hideMenu:function(){if(this.menu){this.menu.hide()
}return this
},hasVisibleMenu:function(){return this.menu&&this.menu.isVisible()
},onClick:function(b){if(b){b.preventDefault()
}if(b.button!==0){return
}if(!this.disabled){if(this.enableToggle&&(this.allowDepress!==false||!this.pressed)){this.toggle()
}if(this.menu&&!this.menu.isVisible()&&!this.ignoreNextClick){this.showMenu()
}this.fireEvent("click",this,b);
if(this.handler){this.handler.call(this.scope||this,this,b)
}}},isMenuTriggerOver:function(c,d){return this.menu&&!d
},isMenuTriggerOut:function(c,d){return this.menu&&!d
},onMouseOver:function(c){if(!this.disabled){var d=c.within(this.el,true);
if(!d){this.el.addClass("x-btn-over");
if(!this.monitoringMouseOver){this.doc.on("mouseover",this.monitorMouseOver,this);
this.monitoringMouseOver=true
}this.fireEvent("mouseover",this,c)
}if(this.isMenuTriggerOver(c,d)){this.fireEvent("menutriggerover",this,this.menu,c)
}}},monitorMouseOver:function(b){if(b.target!=this.el.dom&&!b.within(this.el)){if(this.monitoringMouseOver){this.doc.un("mouseover",this.monitorMouseOver,this);
this.monitoringMouseOver=false
}this.onMouseOut(b)
}},onMouseOut:function(c){var d=c.within(this.el)&&c.target!=this.el.dom;
this.el.removeClass("x-btn-over");
this.fireEvent("mouseout",this,c);
if(this.isMenuTriggerOut(c,d)){this.fireEvent("menutriggerout",this,this.menu,c)
}},focus:function(){this.btnEl.focus()
},blur:function(){this.btnEl.blur()
},onFocus:function(b){if(!this.disabled){this.el.addClass("x-btn-focus")
}},onBlur:function(b){this.el.removeClass("x-btn-focus")
},getClickEl:function(c,d){return this.el
},onMouseDown:function(b){if(!this.disabled&&b.button===0){this.getClickEl(b).addClass("x-btn-click");
this.doc.on("mouseup",this.onMouseUp,this)
}},onMouseUp:function(b){if(b.button===0){this.getClickEl(b,true).removeClass("x-btn-click");
this.doc.un("mouseup",this.onMouseUp,this)
}},onMenuShow:function(b){this.menu.ownerCt=this;
this.ignoreNextClick=0;
this.el.addClass("x-btn-menu-active");
this.fireEvent("menushow",this,this.menu)
},onMenuHide:function(b){this.el.removeClass("x-btn-menu-active");
this.ignoreNextClick=this.restoreClick.defer(250,this);
this.fireEvent("menuhide",this,this.menu);
delete this.menu.ownerCt
},restoreClick:function(){this.ignoreNextClick=0
}});
Ext.reg("button",Ext.Button);
Ext.ButtonToggleMgr=function(){var d={};
function c(g,a){if(a){var b=d[g.toggleGroup];
for(var k=0,l=b.length;
k<l;
k++){if(b[k]!=g){b[k].toggle(false)
}}}}return{register:function(b){if(!b.toggleGroup){return
}var a=d[b.toggleGroup];
if(!a){a=d[b.toggleGroup]=[]
}a.push(b);
b.on("toggle",c)
},unregister:function(b){if(!b.toggleGroup){return
}var a=d[b.toggleGroup];
if(a){a.remove(b);
b.un("toggle",c)
}},getPressed:function(a){var b=d[a];
if(b){for(var g=0,j=b.length;
g<j;
g++){if(b[g].pressed===true){return b[g]
}}}return null
}}
}();
Ext.SplitButton=Ext.extend(Ext.Button,{arrowSelector:"em",split:true,initComponent:function(){Ext.SplitButton.superclass.initComponent.call(this);
this.addEvents("arrowclick")
},onRender:function(){Ext.SplitButton.superclass.onRender.apply(this,arguments);
if(this.arrowTooltip){this.el.child(this.arrowSelector).dom[this.tooltipType]=this.arrowTooltip
}},setArrowHandler:function(c,d){this.arrowHandler=c;
this.scope=d
},getMenuClass:function(){return"x-btn-split"+(this.arrowAlign=="bottom"?"-bottom":"")
},isClickOnArrow:function(g){if(this.arrowAlign!="bottom"){var d=this.el.child("em.x-btn-split");
var e=d.getRegion().right-d.getPadding("r");
return g.getPageX()>e
}else{return g.getPageY()>this.btnEl.getRegion().bottom
}},onClick:function(c,d){c.preventDefault();
if(!this.disabled){if(this.isClickOnArrow(c)){if(this.menu&&!this.menu.isVisible()&&!this.ignoreNextClick){this.showMenu()
}this.fireEvent("arrowclick",this,c);
if(this.arrowHandler){this.arrowHandler.call(this.scope||this,this,c)
}}else{if(this.enableToggle){this.toggle()
}this.fireEvent("click",this,c);
if(this.handler){this.handler.call(this.scope||this,this,c)
}}}},isMenuTriggerOver:function(b){return this.menu&&b.target.tagName==this.arrowSelector
},isMenuTriggerOut:function(c,d){return this.menu&&c.target.tagName!=this.arrowSelector
}});
Ext.reg("splitbutton",Ext.SplitButton);
Ext.CycleButton=Ext.extend(Ext.SplitButton,{getItemText:function(d){if(d&&this.showText===true){var c="";
if(this.prependText){c+=this.prependText
}c+=d.text;
return c
}return undefined
},setActiveItem:function(g,e){if(!Ext.isObject(g)){g=this.menu.getComponent(g)
}if(g){if(!this.rendered){this.text=this.getItemText(g);
this.iconCls=g.iconCls
}else{var d=this.getItemText(g);
if(d){this.setText(d)
}this.setIconClass(g.iconCls)
}this.activeItem=g;
if(!g.checked){g.setChecked(true,true)
}if(this.forceIcon){this.setIconClass(this.forceIcon)
}if(!e){this.fireEvent("change",this,g)
}}},getActiveItem:function(){return this.activeItem
},initComponent:function(){this.addEvents("change");
if(this.changeHandler){this.on("change",this.changeHandler,this.scope||this);
delete this.changeHandler
}this.itemCount=this.items.length;
this.menu={cls:"x-cycle-menu",items:[]};
var b;
Ext.each(this.items,function(d,a){Ext.apply(d,{group:d.group||this.id,itemIndex:a,checkHandler:this.checkHandler,scope:this,checked:d.checked||false});
this.menu.items.push(d);
if(d.checked){b=d
}},this);
this.setActiveItem(b,true);
Ext.CycleButton.superclass.initComponent.call(this);
this.on("click",this.toggleSelected,this)
},checkHandler:function(d,c){if(c){this.setActiveItem(d)
}},toggleSelected:function(){var g=this.menu;
g.render();
if(!g.hasLayout){g.doLayout()
}var h,e;
for(var j=1;
j<this.itemCount;
j++){h=(this.activeItem.itemIndex+j)%this.itemCount;
e=g.items.itemAt(h);
if(!e.disabled){e.setChecked(true);
break
}}}});
Ext.reg("cycle",Ext.CycleButton);
Ext.layout.ToolbarLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,triggerWidth:18,lastOverflow:false,forceLayout:true,noItemsMenuText:'<div class="x-toolbar-no-items">(None)</div>',onLayout:function(t,q){if(!this.leftTr){var r=t.buttonAlign=="center"?"center":"left";
q.addClass("x-toolbar-layout-ct");
q.insertHtml("beforeEnd",'<table cellspacing="0" class="x-toolbar-ct"><tbody><tr><td class="x-toolbar-left" align="'+r+'"><table cellspacing="0"><tbody><tr class="x-toolbar-left-row"></tr></tbody></table></td><td class="x-toolbar-right" align="right"><table cellspacing="0" class="x-toolbar-right-ct"><tbody><tr><td><table cellspacing="0"><tbody><tr class="x-toolbar-right-row"></tr></tbody></table></td><td><table cellspacing="0"><tbody><tr class="x-toolbar-extras-row"></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>');
this.leftTr=q.child("tr.x-toolbar-left-row",true);
this.rightTr=q.child("tr.x-toolbar-right-row",true);
this.extrasTr=q.child("tr.x-toolbar-extras-row",true)
}var p=t.buttonAlign=="right"?this.rightTr:this.leftTr,c=0,o=t.items.items;
for(var u=0,s=o.length,n;
u<s;
u++,c++){n=o[u];
if(n.isFill){p=this.rightTr;
c=-1
}else{if(!n.rendered){n.render(this.insertCell(n,p,c))
}else{if(!n.xtbHidden&&!this.isValidParent(n,p.childNodes[c])){var v=this.insertCell(n,p,c);
v.appendChild(n.getPositionEl().dom);
n.container=Ext.get(v)
}}}}this.cleanup(this.leftTr);
this.cleanup(this.rightTr);
this.cleanup(this.extrasTr);
this.fitToSize(q)
},cleanup:function(c){var h=c.childNodes;
for(var g=h.length-1,j;
g>=0&&(j=h[g]);
g--){if(!j.firstChild){c.removeChild(j)
}}},insertCell:function(h,g,j){var c=document.createElement("td");
c.className="x-toolbar-cell";
g.insertBefore(c,g.childNodes[j]||null);
return c
},hideItem:function(c){var d=(this.hiddens=this.hiddens||[]);
d.push(c);
c.xtbHidden=true;
c.xtbWidth=c.getPositionEl().dom.parentNode.offsetWidth;
c.hide()
},unhideItem:function(b){b.show();
b.xtbHidden=false;
this.hiddens.remove(b);
if(this.hiddens.length<1){delete this.hiddens
}},getItemWidth:function(b){return b.hidden?(b.xtbWidth||0):b.getPositionEl().dom.parentNode.offsetWidth
},fitToSize:function(c){if(this.container.enableOverflow===false){return
}var o=c.dom.clientWidth,w=this.lastWidth||0,v=c.dom.firstChild.offsetWidth,p=o-this.triggerWidth,q=-1;
this.lastWidth=o;
if(v>o||(this.hiddens&&o>=w)){var u,s=this.container.items.items,t=s.length,r,x=0;
for(u=0;
u<t;
u++){r=s[u];
if(!r.isFill){x+=this.getItemWidth(r);
if(x>p){if(!(r.hidden||r.xtbHidden)){this.hideItem(r)
}}else{if(r.xtbHidden){this.unhideItem(r)
}}}}}if(this.hiddens){this.initMore();
if(!this.lastOverflow){this.container.fireEvent("overflowchange",this.container,true);
this.lastOverflow=true
}}else{if(this.more){this.clearMenu();
this.more.destroy();
delete this.more;
if(this.lastOverflow){this.container.fireEvent("overflowchange",this.container,false);
this.lastOverflow=false
}}}},createMenuConfig:function(h,c){var g=Ext.apply({},h.initialConfig),j=h.toggleGroup;
Ext.apply(g,{text:h.overflowText||h.text,iconCls:h.iconCls,icon:h.icon,itemId:h.itemId,disabled:h.disabled,handler:h.handler,scope:h.scope,menu:h.menu,hideOnClick:c});
if(j||h.enableToggle){Ext.apply(g,{group:j,checked:h.pressed,listeners:{checkchange:function(a,b){h.toggle(b)
}}})
}delete g.ownerCt;
delete g.xtype;
delete g.id;
return g
},addComponentToMenu:function(d,c){if(c instanceof Ext.Toolbar.Separator){d.add("-")
}else{if(Ext.isFunction(c.isXType)){if(c.isXType("splitbutton")){d.add(this.createMenuConfig(c,true))
}else{if(c.isXType("button")){d.add(this.createMenuConfig(c,!c.menu))
}else{if(c.isXType("buttongroup")){c.items.each(function(a){this.addComponentToMenu(d,a)
},this)
}}}}}},clearMenu:function(){var b=this.moreMenu;
if(b&&b.items){b.items.each(function(a){delete a.menu
})
}},beforeMoreShow:function(c){var n=this.container.items.items,h=n.length,l,m,p=function(a,b){return a.isXType("buttongroup")&&!(b instanceof Ext.Toolbar.Separator)
};
this.clearMenu();
c.removeAll();
for(var o=0;
o<h;
o++){l=n[o];
if(l.xtbHidden){if(m&&(p(l,m)||p(m,l))){c.add("-")
}this.addComponentToMenu(c,l);
m=l
}}if(c.items.length<1){c.add(this.noItemsMenuText)
}},initMore:function(){if(!this.more){this.moreMenu=new Ext.menu.Menu({listeners:{beforeshow:this.beforeMoreShow,scope:this}});
this.moreMenu.ownerCt=this.container;
this.more=new Ext.Button({iconCls:"x-toolbar-more-icon",cls:"x-toolbar-more",menu:this.moreMenu});
var b=this.insertCell(this.more,this.extrasTr,100);
this.more.render(b)
}},onRemove:function(b){delete this.leftTr;
delete this.rightTr;
delete this.extrasTr;
Ext.layout.ToolbarLayout.superclass.onRemove.call(this,b)
},destroy:function(){Ext.destroy(this.more,this.moreMenu);
delete this.leftTr;
delete this.rightTr;
delete this.extrasTr;
Ext.layout.ToolbarLayout.superclass.destroy.call(this)
}});
Ext.Container.LAYOUTS.toolbar=Ext.layout.ToolbarLayout;
Ext.Toolbar=function(b){if(Ext.isArray(b)){b={items:b,layout:"toolbar"}
}else{b=Ext.apply({layout:"toolbar"},b);
if(b.buttons){b.items=b.buttons
}}Ext.Toolbar.superclass.constructor.call(this,b)
};
(function(){var b=Ext.Toolbar;
Ext.extend(b,Ext.Container,{defaultType:"button",trackMenus:true,internalDefaults:{removeMode:"container",hideParent:true},toolbarCls:"x-toolbar",initComponent:function(){b.superclass.initComponent.call(this);
this.addEvents("overflowchange")
},onRender:function(d,a){if(!this.el){if(!this.autoCreate){this.autoCreate={cls:this.toolbarCls+" x-small-editor"}
}this.el=d.createChild(Ext.apply({id:this.id},this.autoCreate),a);
Ext.Toolbar.superclass.onRender.apply(this,arguments)
}},lookupComponent:function(a){if(Ext.isString(a)){if(a=="-"){a=new b.Separator()
}else{if(a==" "){a=new b.Spacer()
}else{if(a=="->"){a=new b.Fill()
}else{a=new b.TextItem(a)
}}}this.applyDefaults(a)
}else{if(a.isFormField||a.render){a=this.createComponent(a)
}else{if(a.tag){a=new b.Item({autoEl:a})
}else{if(a.tagName){a=new b.Item({el:a})
}else{if(Ext.isObject(a)){a=a.xtype?this.createComponent(a):this.constructButton(a)
}}}}}return a
},applyDefaults:function(c){if(!Ext.isString(c)){c=Ext.Toolbar.superclass.applyDefaults.call(this,c);
var a=this.internalDefaults;
if(c.events){Ext.applyIf(c.initialConfig,a);
Ext.apply(c,a)
}else{Ext.applyIf(c,a)
}}return c
},addSeparator:function(){return this.add(new b.Separator())
},addSpacer:function(){return this.add(new b.Spacer())
},addFill:function(){this.add(new b.Fill())
},addElement:function(a){return this.addItem(new b.Item({el:a}))
},addItem:function(a){return this.add.apply(this,arguments)
},addButton:function(j){if(Ext.isArray(j)){var g=[];
for(var h=0,a=j.length;
h<a;
h++){g.push(this.addButton(j[h]))
}return g
}return this.add(this.constructButton(j))
},addText:function(a){return this.addItem(new b.TextItem(a))
},addDom:function(a){return this.add(new b.Item({autoEl:a}))
},addField:function(a){return this.add(a)
},insertButton:function(l,h){if(Ext.isArray(h)){var j=[];
for(var k=0,a=h.length;
k<a;
k++){j.push(this.insertButton(l+k,h[k]))
}return j
}return Ext.Toolbar.superclass.insert.call(this,l,h)
},trackMenu:function(g,a){if(this.trackMenus&&g.menu){var e=a?"mun":"mon";
this[e](g,"menutriggerover",this.onButtonTriggerOver,this);
this[e](g,"menushow",this.onButtonMenuShow,this);
this[e](g,"menuhide",this.onButtonMenuHide,this)
}},constructButton:function(a){var e=a.events?a:this.createComponent(a,a.split?"splitbutton":this.defaultType);
return e
},onAdd:function(a){Ext.Toolbar.superclass.onAdd.call(this);
this.trackMenu(a)
},onRemove:function(a){Ext.Toolbar.superclass.onRemove.call(this);
this.trackMenu(a,true)
},onDisable:function(){this.items.each(function(a){if(a.disable){a.disable()
}})
},onEnable:function(){this.items.each(function(a){if(a.enable){a.enable()
}})
},onButtonTriggerOver:function(a){if(this.activeMenuBtn&&this.activeMenuBtn!=a){this.activeMenuBtn.hideMenu();
a.showMenu();
this.activeMenuBtn=a
}},onButtonMenuShow:function(a){this.activeMenuBtn=a
},onButtonMenuHide:function(a){delete this.activeMenuBtn
}});
Ext.reg("toolbar",Ext.Toolbar);
b.Item=Ext.extend(Ext.BoxComponent,{hideParent:true,enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});
Ext.reg("tbitem",b.Item);
b.Separator=Ext.extend(b.Item,{onRender:function(d,a){this.el=d.createChild({tag:"span",cls:"xtb-sep"},a)
}});
Ext.reg("tbseparator",b.Separator);
b.Spacer=Ext.extend(b.Item,{onRender:function(d,a){this.el=d.createChild({tag:"div",cls:"xtb-spacer",style:this.width?"width:"+this.width+"px":""},a)
}});
Ext.reg("tbspacer",b.Spacer);
b.Fill=Ext.extend(b.Item,{render:Ext.emptyFn,isFill:true});
Ext.reg("tbfill",b.Fill);
b.TextItem=Ext.extend(b.Item,{constructor:function(a){b.TextItem.superclass.constructor.call(this,Ext.isString(a)?{text:a}:a)
},onRender:function(d,a){this.autoEl={cls:"xtb-text",html:this.text||""};
b.TextItem.superclass.onRender.call(this,d,a)
},setText:function(a){if(this.rendered){this.el.update(a)
}else{this.text=a
}}});
Ext.reg("tbtext",b.TextItem);
b.Button=Ext.extend(Ext.Button,{});
b.SplitButton=Ext.extend(Ext.SplitButton,{});
Ext.reg("tbbutton",b.Button);
Ext.reg("tbsplit",b.SplitButton)
})();
Ext.ButtonGroup=Ext.extend(Ext.Panel,{baseCls:"x-btn-group",layout:"table",defaultType:"button",frame:true,internalDefaults:{removeMode:"container",hideParent:true},initComponent:function(){this.layoutConfig=this.layoutConfig||{};
Ext.applyIf(this.layoutConfig,{columns:this.columns});
if(!this.title){this.addClass("x-btn-group-notitle")
}this.on("afterlayout",this.onAfterLayout,this);
Ext.ButtonGroup.superclass.initComponent.call(this)
},applyDefaults:function(c){c=Ext.ButtonGroup.superclass.applyDefaults.call(this,c);
var d=this.internalDefaults;
if(c.events){Ext.applyIf(c.initialConfig,d);
Ext.apply(c,d)
}else{Ext.applyIf(c,d)
}return c
},onAfterLayout:function(){var b=this.body.getFrameWidth("lr")+this.body.dom.firstChild.offsetWidth;
this.body.setWidth(b);
this.el.setWidth(b+this.getFrameWidth())
}});
Ext.reg("buttongroup",Ext.ButtonGroup);
(function(){var b=Ext.Toolbar;
Ext.PagingToolbar=Ext.extend(Ext.Toolbar,{pageSize:20,displayMsg:"Displaying {0} - {1} of {2}",emptyMsg:"No data to display",beforePageText:"Page",afterPageText:"of {0}",firstText:"First Page",prevText:"Previous Page",nextText:"Next Page",lastText:"Last Page",refreshText:"Refresh",initComponent:function(){var d=[this.first=new b.Button({tooltip:this.firstText,overflowText:this.firstText,iconCls:"x-tbar-page-first",disabled:true,handler:this.moveFirst,scope:this}),this.prev=new b.Button({tooltip:this.prevText,overflowText:this.prevText,iconCls:"x-tbar-page-prev",disabled:true,handler:this.movePrevious,scope:this}),"-",this.beforePageText,this.inputItem=new Ext.form.NumberField({cls:"x-tbar-page-number",allowDecimals:false,allowNegative:false,enableKeyEvents:true,selectOnFocus:true,submitValue:false,listeners:{scope:this,keydown:this.onPagingKeyDown,blur:this.onPagingBlur}}),this.afterTextItem=new b.TextItem({text:String.format(this.afterPageText,1)}),"-",this.next=new b.Button({tooltip:this.nextText,overflowText:this.nextText,iconCls:"x-tbar-page-next",disabled:true,handler:this.moveNext,scope:this}),this.last=new b.Button({tooltip:this.lastText,overflowText:this.lastText,iconCls:"x-tbar-page-last",disabled:true,handler:this.moveLast,scope:this}),"-",this.refresh=new b.Button({tooltip:this.refreshText,overflowText:this.refreshText,iconCls:"x-tbar-loading",handler:this.doRefresh,scope:this})];
var a=this.items||this.buttons||[];
if(this.prependButtons){this.items=a.concat(d)
}else{this.items=d.concat(a)
}delete this.buttons;
if(this.displayInfo){this.items.push("->");
this.items.push(this.displayItem=new b.TextItem({}))
}Ext.PagingToolbar.superclass.initComponent.call(this);
this.addEvents("change","beforechange");
this.on("afterlayout",this.onFirstLayout,this,{single:true});
this.cursor=0;
this.bindStore(this.store,true)
},onFirstLayout:function(){if(this.dsLoaded){this.onLoad.apply(this,this.dsLoaded)
}},updateInfo:function(){if(this.displayItem){var a=this.store.getCount();
var d=a==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,this.cursor+a,this.store.getTotalCount());
this.displayItem.setText(d)
}},onLoad:function(a,o,d){if(!this.rendered){this.dsLoaded=[a,o,d];
return
}var n=this.getParams();
this.cursor=(d.params&&d.params[n.start])?d.params[n.start]:0;
var l=this.getPageData(),p=l.activePage,m=l.pages;
this.afterTextItem.setText(String.format(this.afterPageText,l.pages));
this.inputItem.setValue(p);
this.first.setDisabled(p==1);
this.prev.setDisabled(p==1);
this.next.setDisabled(p==m);
this.last.setDisabled(p==m);
this.refresh.enable();
this.updateInfo();
this.fireEvent("change",this,l)
},getPageData:function(){var a=this.store.getTotalCount();
return{total:a,activePage:Math.ceil((this.cursor+this.pageSize)/this.pageSize),pages:a<this.pageSize?1:Math.ceil(a/this.pageSize)}
},changePage:function(a){this.doLoad(((a-1)*this.pageSize).constrain(0,this.store.getTotalCount()))
},onLoadError:function(){if(!this.rendered){return
}this.refresh.enable()
},readPage:function(d){var a=this.inputItem.getValue(),g;
if(!a||isNaN(g=parseInt(a,10))){this.inputItem.setValue(d.activePage);
return false
}return g
},onPagingFocus:function(){this.inputItem.select()
},onPagingBlur:function(a){this.inputItem.setValue(this.getPageData().activePage)
},onPagingKeyDown:function(e,k){var n=k.getKey(),d=this.getPageData(),m;
if(n==k.RETURN){k.stopEvent();
m=this.readPage(d);
if(m!==false){m=Math.min(Math.max(1,m),d.pages)-1;
this.doLoad(m*this.pageSize)
}}else{if(n==k.HOME||n==k.END){k.stopEvent();
m=n==k.HOME?1:d.pages;
e.setValue(m)
}else{if(n==k.UP||n==k.PAGEUP||n==k.DOWN||n==k.PAGEDOWN){k.stopEvent();
if((m=this.readPage(d))){var a=k.shiftKey?10:1;
if(n==k.DOWN||n==k.PAGEDOWN){a*=-1
}m+=a;
if(m>=1&m<=d.pages){e.setValue(m)
}}}}}},getParams:function(){return this.paramNames||this.store.paramNames
},beforeLoad:function(){if(this.rendered&&this.refresh){this.refresh.disable()
}},doLoad:function(e){var g={},a=this.getParams();
g[a.start]=e;
g[a.limit]=this.pageSize;
if(this.fireEvent("beforechange",this,g)!==false){this.store.load({params:g})
}},moveFirst:function(){this.doLoad(0)
},movePrevious:function(){this.doLoad(Math.max(0,this.cursor-this.pageSize))
},moveNext:function(){this.doLoad(this.cursor+this.pageSize)
},moveLast:function(){var d=this.store.getTotalCount(),a=d%this.pageSize;
this.doLoad(a?(d-a):d-this.pageSize)
},doRefresh:function(){this.doLoad(this.cursor)
},bindStore:function(g,e){var a;
if(!e&&this.store){if(g!==this.store&&this.store.autoDestroy){this.store.destroy()
}else{this.store.un("beforeload",this.beforeLoad,this);
this.store.un("load",this.onLoad,this);
this.store.un("exception",this.onLoadError,this)
}if(!g){this.store=null
}}if(g){g=Ext.StoreMgr.lookup(g);
g.on({scope:this,beforeload:this.beforeLoad,load:this.onLoad,exception:this.onLoadError});
a=true
}this.store=g;
if(a){this.onLoad(g,null,{})
}},unbind:function(a){this.bindStore(null)
},bind:function(a){this.bindStore(a)
},onDestroy:function(){this.bindStore(null);
Ext.PagingToolbar.superclass.onDestroy.call(this)
}})
})();
Ext.reg("paging",Ext.PagingToolbar);
Ext.History=(function(){var r,t;
var m=false;
var s;
function q(){var a=top.location.href,b=a.indexOf("#");
return b>=0?a.substr(b+1):null
}function v(){t.value=s
}function p(a){s=a;
Ext.History.fireEvent("change",a)
}function o(d){var a=['<html><body><div id="state">',Ext.util.Format.htmlEncode(d),"</div></body></html>"].join("");
try{var b=r.contentWindow.document;
b.open();
b.write(a);
b.close();
return true
}catch(c){return false
}}function u(){if(!r.contentWindow||!r.contentWindow.document){setTimeout(u,10);
return
}var b=r.contentWindow.document;
var d=b.getElementById("state");
var a=d?d.innerText:null;
var c=q();
setInterval(function(){b=r.contentWindow.document;
d=b.getElementById("state");
var e=d?d.innerText:null;
var g=q();
if(e!==a){a=e;
p(a);
top.location.hash=a;
c=a;
v()
}else{if(g!==c){c=g;
o(g)
}}},50);
m=true;
Ext.History.fireEvent("ready",Ext.History)
}function n(){s=t.value?t.value:q();
if(Ext.isIE){u()
}else{var a=q();
setInterval(function(){var b=q();
if(b!==a){a=b;
p(a);
v()
}},50);
m=true;
Ext.History.fireEvent("ready",Ext.History)
}}return{fieldId:"x-history-field",iframeId:"x-history-frame",events:{},init:function(b,a){if(m){Ext.callback(b,a,[this]);
return
}if(!Ext.isReady){Ext.onReady(function(){Ext.History.init(b,a)
});
return
}t=Ext.getDom(Ext.History.fieldId);
if(Ext.isIE){r=Ext.getDom(Ext.History.iframeId)
}this.addEvents("ready","change");
if(b){this.on("ready",b,a,{single:true})
}n()
},add:function(a,b){if(b!==false){if(this.getToken()==a){return true
}}if(Ext.isIE){return o(a)
}else{top.location.hash=a;
return true
}},back:function(){history.go(-1)
},forward:function(){history.go(1)
},getToken:function(){return m?s:q()
}}
})();
Ext.apply(Ext.History,new Ext.util.Observable());
Ext.Tip=Ext.extend(Ext.Panel,{minWidth:40,maxWidth:300,shadow:"sides",defaultAlign:"tl-bl?",autoRender:true,quickShowInterval:250,frame:true,hidden:true,baseCls:"x-tip",floating:{shadow:true,shim:true,useDisplay:true,constrain:false},autoHeight:true,closeAction:"hide",initComponent:function(){Ext.Tip.superclass.initComponent.call(this);
if(this.closable&&!this.title){this.elements+=",header"
}},afterRender:function(){Ext.Tip.superclass.afterRender.call(this);
if(this.closable){this.addTool({id:"close",handler:this[this.closeAction],scope:this})
}},showAt:function(b){Ext.Tip.superclass.show.call(this);
if(this.measureWidth!==false&&(!this.initialConfig||typeof this.initialConfig.width!="number")){this.doAutoWidth()
}if(this.constrainPosition){b=this.el.adjustForConstraints(b)
}this.setPagePosition(b[0],b[1])
},doAutoWidth:function(d){d=d||0;
var c=this.body.getTextWidth();
if(this.title){c=Math.max(c,this.header.child("span").getTextWidth(this.title))
}c+=this.getFrameWidth()+(this.closable?20:0)+this.body.getPadding("lr")+d;
this.setWidth(c.constrain(this.minWidth,this.maxWidth));
if(Ext.isIE7&&!this.repainted){this.el.repaint();
this.repainted=true
}},showBy:function(d,c){if(!this.rendered){this.render(Ext.getBody())
}this.showAt(this.el.getAlignToXY(d,c||this.defaultAlign))
},initDraggable:function(){this.dd=new Ext.Tip.DD(this,typeof this.draggable=="boolean"?null:this.draggable);
this.header.addClass("x-tip-draggable")
}});
Ext.reg("tip",Ext.Tip);
Ext.Tip.DD=function(c,d){Ext.apply(this,d);
this.tip=c;
Ext.Tip.DD.superclass.constructor.call(this,c.el.id,"WindowDD-"+c.id);
this.setHandleElId(c.header.id);
this.scroll=false
};
Ext.extend(Ext.Tip.DD,Ext.dd.DD,{moveOnly:true,scroll:false,headerOffsets:[100,25],startDrag:function(){this.tip.el.disableShadow()
},endDrag:function(b){this.tip.el.enableShadow(true)
}});
Ext.ToolTip=Ext.extend(Ext.Tip,{showDelay:500,hideDelay:200,dismissDelay:5000,trackMouse:false,anchorToTarget:true,anchorOffset:0,targetCounter:0,constrainPosition:false,initComponent:function(){Ext.ToolTip.superclass.initComponent.call(this);
this.lastActive=new Date();
this.initTarget(this.target);
this.origAnchor=this.anchor
},onRender:function(c,d){Ext.ToolTip.superclass.onRender.call(this,c,d);
this.anchorCls="x-tip-anchor-"+this.getAnchorPosition();
this.anchorEl=this.el.createChild({cls:"x-tip-anchor "+this.anchorCls})
},afterRender:function(){Ext.ToolTip.superclass.afterRender.call(this);
this.anchorEl.setStyle("z-index",this.el.getZIndex()+1)
},initTarget:function(g){var e;
if((e=Ext.get(g))){if(this.target){var d=Ext.get(this.target);
this.mun(d,"mouseover",this.onTargetOver,this);
this.mun(d,"mouseout",this.onTargetOut,this);
this.mun(d,"mousemove",this.onMouseMove,this)
}this.mon(e,{mouseover:this.onTargetOver,mouseout:this.onTargetOut,mousemove:this.onMouseMove,scope:this});
this.target=e
}if(this.anchor){this.anchorTarget=this.target
}},onMouseMove:function(c){var d=this.delegate?c.getTarget(this.delegate):this.triggerElement=true;
if(d){this.targetXY=c.getXY();
if(d===this.triggerElement){if(!this.hidden&&this.trackMouse){this.setPagePosition(this.getTargetXY())
}}else{this.hide();
this.lastActive=new Date(0);
this.onTargetOver(c)
}}else{if(!this.closable&&this.isVisible()){this.hide()
}}},getTargetXY:function(){if(this.delegate){this.anchorTarget=this.triggerElement
}if(this.anchor){this.targetCounter++;
var t=this.getOffsets(),m=(this.anchorToTarget&&!this.trackMouse)?this.el.getAlignToXY(this.anchorTarget,this.getAnchorAlign()):this.targetXY,v=Ext.lib.Dom.getViewWidth()-5,q=Ext.lib.Dom.getViewHeight()-5,p=document.documentElement,r=document.body,n=(p.scrollLeft||r.scrollLeft||0)+5,o=(p.scrollTop||r.scrollTop||0)+5,u=[m[0]+t[0],m[1]+t[1]];
sz=this.getSize();
this.anchorEl.removeClass(this.anchorCls);
if(this.targetCounter<2){if(u[0]<n){if(this.anchorToTarget){this.defaultAlign="l-r";
if(this.mouseOffset){this.mouseOffset[0]*=-1
}}this.anchor="left";
return this.getTargetXY()
}if(u[0]+sz.width>v){if(this.anchorToTarget){this.defaultAlign="r-l";
if(this.mouseOffset){this.mouseOffset[0]*=-1
}}this.anchor="right";
return this.getTargetXY()
}if(u[1]<o){if(this.anchorToTarget){this.defaultAlign="t-b";
if(this.mouseOffset){this.mouseOffset[1]*=-1
}}this.anchor="top";
return this.getTargetXY()
}if(u[1]+sz.height>q){if(this.anchorToTarget){this.defaultAlign="b-t";
if(this.mouseOffset){this.mouseOffset[1]*=-1
}}this.anchor="bottom";
return this.getTargetXY()
}}this.anchorCls="x-tip-anchor-"+this.getAnchorPosition();
this.anchorEl.addClass(this.anchorCls);
this.targetCounter=0;
return u
}else{var s=this.getMouseOffset();
return[this.targetXY[0]+s[0],this.targetXY[1]+s[1]]
}},getMouseOffset:function(){var b=this.anchor?[0,0]:[15,18];
if(this.mouseOffset){b[0]+=this.mouseOffset[0];
b[1]+=this.mouseOffset[1]
}return b
},getAnchorPosition:function(){if(this.anchor){this.tipAnchor=this.anchor.charAt(0)
}else{var b=this.defaultAlign.match(/^([a-z]+)-([a-z]+)(\?)?$/);
if(!b){throw"AnchorTip.defaultAlign is invalid"
}this.tipAnchor=b[1].charAt(0)
}switch(this.tipAnchor){case"t":return"top";
case"b":return"bottom";
case"r":return"right"
}return"left"
},getAnchorAlign:function(){switch(this.anchor){case"top":return"tl-bl";
case"left":return"tl-tr";
case"right":return"tr-tl";
default:return"bl-tl"
}},getOffsets:function(){var d,e=this.getAnchorPosition().charAt(0);
if(this.anchorToTarget&&!this.trackMouse){switch(e){case"t":d=[0,9];
break;
case"b":d=[0,-13];
break;
case"r":d=[-13,0];
break;
default:d=[9,0];
break
}}else{switch(e){case"t":d=[-15-this.anchorOffset,30];
break;
case"b":d=[-19-this.anchorOffset,-13-this.el.dom.offsetHeight];
break;
case"r":d=[-15-this.el.dom.offsetWidth,-13-this.anchorOffset];
break;
default:d=[25,-13-this.anchorOffset];
break
}}var g=this.getMouseOffset();
d[0]+=g[0];
d[1]+=g[1];
return d
},onTargetOver:function(c){if(this.disabled||c.within(this.target.dom,true)){return
}var d=c.getTarget(this.delegate);
if(d){this.triggerElement=d;
this.clearTimer("hide");
this.targetXY=c.getXY();
this.delayShow()
}},delayShow:function(){if(this.hidden&&!this.showTimer){if(this.lastActive.getElapsed()<this.quickShowInterval){this.show()
}else{this.showTimer=this.show.defer(this.showDelay,this)
}}else{if(!this.hidden&&this.autoHide!==false){this.show()
}}},onTargetOut:function(b){if(this.disabled||b.within(this.target.dom,true)){return
}this.clearTimer("show");
if(this.autoHide!==false){this.delayHide()
}},delayHide:function(){if(!this.hidden&&!this.hideTimer){this.hideTimer=this.hide.defer(this.hideDelay,this)
}},hide:function(){this.clearTimer("dismiss");
this.lastActive=new Date();
if(this.anchorEl){this.anchorEl.hide()
}Ext.ToolTip.superclass.hide.call(this);
delete this.triggerElement
},show:function(){if(this.anchor){this.showAt([-1000,-1000]);
this.origConstrainPosition=this.constrainPosition;
this.constrainPosition=false;
this.anchor=this.origAnchor
}this.showAt(this.getTargetXY());
if(this.anchor){this.syncAnchor();
this.anchorEl.show();
this.constrainPosition=this.origConstrainPosition
}else{this.anchorEl.hide()
}},showAt:function(b){this.lastActive=new Date();
this.clearTimers();
Ext.ToolTip.superclass.showAt.call(this,b);
if(this.dismissDelay&&this.autoHide!==false){this.dismissTimer=this.hide.defer(this.dismissDelay,this)
}if(this.anchor&&!this.anchorEl.isVisible()){this.syncAnchor();
this.anchorEl.show()
}},syncAnchor:function(){var e,d,g;
switch(this.tipAnchor.charAt(0)){case"t":e="b";
d="tl";
g=[20+this.anchorOffset,2];
break;
case"r":e="l";
d="tr";
g=[-2,11+this.anchorOffset];
break;
case"b":e="t";
d="bl";
g=[20+this.anchorOffset,-2];
break;
default:e="r";
d="tl";
g=[2,11+this.anchorOffset];
break
}this.anchorEl.alignTo(this.el,e+"-"+d,g)
},setPagePosition:function(d,c){Ext.ToolTip.superclass.setPagePosition.call(this,d,c);
if(this.anchor){this.syncAnchor()
}},clearTimer:function(b){b=b+"Timer";
clearTimeout(this[b]);
delete this[b]
},clearTimers:function(){this.clearTimer("show");
this.clearTimer("dismiss");
this.clearTimer("hide")
},onShow:function(){Ext.ToolTip.superclass.onShow.call(this);
Ext.getDoc().on("mousedown",this.onDocMouseDown,this)
},onHide:function(){Ext.ToolTip.superclass.onHide.call(this);
Ext.getDoc().un("mousedown",this.onDocMouseDown,this)
},onDocMouseDown:function(b){if(this.autoHide!==true&&!this.closable&&!b.within(this.el.dom)){this.disable();
this.enable.defer(100,this)
}},onDisable:function(){this.clearTimers();
this.hide()
},adjustPosition:function(g,h){if(this.contstrainPosition){var j=this.targetXY[1],e=this.getSize().height;
if(h<=j&&(h+e)>=j){h=j-e-5
}}return{x:g,y:h}
},beforeDestroy:function(){this.clearTimers();
Ext.destroy(this.anchorEl);
delete this.anchorEl;
delete this.target;
delete this.anchorTarget;
delete this.triggerElement;
Ext.ToolTip.superclass.beforeDestroy.call(this)
},onDestroy:function(){Ext.getDoc().un("mousedown",this.onDocMouseDown,this);
Ext.ToolTip.superclass.onDestroy.call(this)
}});
Ext.reg("tooltip",Ext.ToolTip);
Ext.QuickTip=Ext.extend(Ext.ToolTip,{interceptTitles:false,tagConfig:{namespace:"ext",attribute:"qtip",width:"qwidth",target:"target",title:"qtitle",hide:"hide",cls:"qclass",align:"qalign",anchor:"anchor"},initComponent:function(){this.target=this.target||Ext.getDoc();
this.targets=this.targets||{};
Ext.QuickTip.superclass.initComponent.call(this)
},register:function(q){var o=Ext.isArray(q)?q:arguments;
for(var p=0,m=o.length;
p<m;
p++){var j=o[p];
var n=j.target;
if(n){if(Ext.isArray(n)){for(var r=0,c=n.length;
r<c;
r++){this.targets[Ext.id(n[r])]=j
}}else{this.targets[Ext.id(n)]=j
}}}},unregister:function(b){delete this.targets[Ext.id(b)]
},cancelShow:function(c){var d=this.activeTarget;
c=Ext.get(c).dom;
if(this.isVisible()){if(d&&d.el==c){this.hide()
}}else{if(d&&d.el==c){this.clearTimer("show")
}}},getTipCfg:function(h){var e=h.getTarget(),j,g;
if(this.interceptTitles&&e.title&&Ext.isString(e.title)){j=e.title;
e.qtip=j;
e.removeAttribute("title");
h.preventDefault()
}else{g=this.tagConfig;
j=e.qtip||Ext.fly(e).getAttribute(g.attribute,g.namespace)
}return j
},onTargetOver:function(l){if(this.disabled){return
}this.targetXY=l.getXY();
var p=l.getTarget();
if(!p||p.nodeType!==1||p==document||p==document.body){return
}if(this.activeTarget&&((p==this.activeTarget.el)||Ext.fly(this.activeTarget.el).contains(p))){this.clearTimer("hide");
this.show();
return
}if(p&&this.targets[p.id]){this.activeTarget=this.targets[p.id];
this.activeTarget.el=p;
this.anchor=this.activeTarget.anchor;
if(this.anchor){this.anchorTarget=p
}this.delayShow();
return
}var n,m=Ext.fly(p),e=this.tagConfig,o=e.namespace;
if(n=this.getTipCfg(l)){var k=m.getAttribute(e.hide,o);
this.activeTarget={el:p,text:n,width:m.getAttribute(e.width,o),autoHide:k!="user"&&k!=="false",title:m.getAttribute(e.title,o),cls:m.getAttribute(e.cls,o),align:m.getAttribute(e.align,o)};
this.anchor=m.getAttribute(e.anchor,o);
if(this.anchor){this.anchorTarget=p
}this.delayShow()
}},onTargetOut:function(b){if(this.activeTarget&&b.within(this.activeTarget.el)&&!this.getTipCfg(b)){return
}this.clearTimer("show");
if(this.autoHide!==false){this.delayHide()
}},showAt:function(c){var d=this.activeTarget;
if(d){if(!this.rendered){this.render(Ext.getBody());
this.activeTarget=d
}if(d.width){this.setWidth(d.width);
this.body.setWidth(this.adjustBodyWidth(d.width-this.getFrameWidth()));
this.measureWidth=false
}else{this.measureWidth=true
}this.setTitle(d.title||"");
this.body.update(d.text);
this.autoHide=d.autoHide;
this.dismissDelay=d.dismissDelay||this.dismissDelay;
if(this.lastCls){this.el.removeClass(this.lastCls);
delete this.lastCls
}if(d.cls){this.el.addClass(d.cls);
this.lastCls=d.cls
}if(this.anchor){this.constrainPosition=false
}else{if(d.align){c=this.el.getAlignToXY(d.el,d.align);
this.constrainPosition=false
}else{this.constrainPosition=true
}}}Ext.QuickTip.superclass.showAt.call(this,c)
},hide:function(){delete this.activeTarget;
Ext.QuickTip.superclass.hide.call(this)
}});
Ext.reg("quicktip",Ext.QuickTip);
Ext.QuickTips=function(){var c,d=[];
return{init:function(a){if(!c){if(!Ext.isReady){Ext.onReady(function(){Ext.QuickTips.init(a)
});
return
}c=new Ext.QuickTip({elements:"header,body"});
if(a!==false){c.render(Ext.getBody())
}}},enable:function(){if(c){d.pop();
if(d.length<1){c.enable()
}}},disable:function(){if(c){c.disable()
}d.push(1)
},isEnabled:function(){return c!==undefined&&!c.disabled
},getQuickTip:function(){return c
},register:function(){c.register.apply(c,arguments)
},unregister:function(){c.unregister.apply(c,arguments)
},tips:function(){c.register.apply(c,arguments)
}}
}();
Ext.tree.TreePanel=Ext.extend(Ext.Panel,{rootVisible:true,animate:Ext.enableFx,lines:true,enableDD:false,hlDrop:Ext.enableFx,pathSeparator:"/",bubbleEvents:[],initComponent:function(){Ext.tree.TreePanel.superclass.initComponent.call(this);
if(!this.eventModel){this.eventModel=new Ext.tree.TreeEventModel(this)
}var d=this.loader;
if(!d){d=new Ext.tree.TreeLoader({dataUrl:this.dataUrl,requestMethod:this.requestMethod})
}else{if(Ext.isObject(d)&&!d.load){d=new Ext.tree.TreeLoader(d)
}}this.loader=d;
this.nodeHash={};
if(this.root){var c=this.root;
delete this.root;
this.setRootNode(c)
}this.addEvents("append","remove","movenode","insert","beforeappend","beforeremove","beforemovenode","beforeinsert","beforeload","load","textchange","beforeexpandnode","beforecollapsenode","expandnode","disabledchange","collapsenode","beforeclick","click","containerclick","checkchange","beforedblclick","dblclick","containerdblclick","contextmenu","containercontextmenu","beforechildrenrendered","startdrag","enddrag","dragdrop","beforenodedrop","nodedrop","nodedragover");
if(this.singleExpand){this.on("beforeexpandnode",this.restrictExpand,this)
}},proxyNodeEvent:function(p,j,k,l,m,n,o){if(p=="collapse"||p=="expand"||p=="beforecollapse"||p=="beforeexpand"||p=="move"||p=="beforemove"){p=p+"node"
}return this.fireEvent(p,j,k,l,m,n,o)
},getRootNode:function(){return this.root
},setRootNode:function(c){Ext.destroy(this.root);
if(!c.render){c=this.loader.createNode(c)
}this.root=c;
c.ownerTree=this;
c.isRoot=true;
this.registerNode(c);
if(!this.rootVisible){var d=c.attributes.uiProvider;
c.ui=d?new d(c):new Ext.tree.RootTreeNodeUI(c)
}if(this.innerCt){this.innerCt.update("");
this.afterRender()
}return c
},getNodeById:function(b){return this.nodeHash[b]
},registerNode:function(b){this.nodeHash[b.id]=b
},unregisterNode:function(b){delete this.nodeHash[b.id]
},toString:function(){return"[Tree"+(this.id?" "+this.id:"")+"]"
},restrictExpand:function(d){var c=d.parentNode;
if(c){if(c.expandedChild&&c.expandedChild.parentNode==c){c.expandedChild.collapse()
}c.expandedChild=d
}},getChecked:function(a,j){j=j||this.root;
var h=[];
var g=function(){if(this.attributes.checked){h.push(!a?this:(a=="id"?this.id:this.attributes[a]))
}};
j.cascade(g);
return h
},getLoader:function(){return this.loader
},expandAll:function(){this.root.expand(true)
},collapseAll:function(){this.root.collapse(true)
},getSelectionModel:function(){if(!this.selModel){this.selModel=new Ext.tree.DefaultSelectionModel()
}return this.selModel
},expandPath:function(m,k,l){k=k||"id";
var o=m.split(this.pathSeparator);
var p=this.root;
if(p.attributes[k]!=o[1]){if(l){l(false,null)
}return
}var j=1;
var n=function(){if(++j==o.length){if(l){l(true,p)
}return
}var a=p.findChild(k,o[j]);
if(!a){if(l){l(false,p)
}return
}p=a;
a.expand(false,false,n)
};
p.expand(false,false,n)
},selectPath:function(l,j,k){j=j||"id";
var n=l.split(this.pathSeparator),h=n.pop();
if(n.length>1){var m=function(b,c){if(b&&c){var a=c.findChild(j,h);
if(a){a.select();
if(k){k(true,a)
}}else{if(k){k(false,a)
}}}else{if(k){k(false,a)
}}};
this.expandPath(n.join(this.pathSeparator),j,m)
}else{this.root.select();
if(k){k(true,this.root)
}}},getTreeEl:function(){return this.body
},onRender:function(c,d){Ext.tree.TreePanel.superclass.onRender.call(this,c,d);
this.el.addClass("x-tree");
this.innerCt=this.body.createChild({tag:"ul",cls:"x-tree-root-ct "+(this.useArrows?"x-tree-arrows":this.lines?"x-tree-lines":"x-tree-no-lines")})
},initEvents:function(){Ext.tree.TreePanel.superclass.initEvents.call(this);
if(this.containerScroll){Ext.dd.ScrollManager.register(this.body)
}if((this.enableDD||this.enableDrop)&&!this.dropZone){this.dropZone=new Ext.tree.TreeDropZone(this,this.dropConfig||{ddGroup:this.ddGroup||"TreeDD",appendOnly:this.ddAppendOnly===true})
}if((this.enableDD||this.enableDrag)&&!this.dragZone){this.dragZone=new Ext.tree.TreeDragZone(this,this.dragConfig||{ddGroup:this.ddGroup||"TreeDD",scroll:this.ddScroll})
}this.getSelectionModel().init(this)
},afterRender:function(){Ext.tree.TreePanel.superclass.afterRender.call(this);
this.root.render();
if(!this.rootVisible){this.root.renderChildren()
}},beforeDestroy:function(){if(this.rendered){Ext.dd.ScrollManager.unregister(this.body);
Ext.destroy(this.dropZone,this.dragZone)
}Ext.destroy(this.root,this.loader);
this.nodeHash=this.root=this.loader=null;
Ext.tree.TreePanel.superclass.beforeDestroy.call(this)
}});
Ext.tree.TreePanel.nodeTypes={};
Ext.reg("treepanel",Ext.tree.TreePanel);
Ext.tree.TreeEventModel=function(b){this.tree=b;
this.tree.on("render",this.initEvents,this)
};
Ext.tree.TreeEventModel.prototype={initEvents:function(){var b=this.tree;
if(b.trackMouseOver!==false){b.mon(b.innerCt,{scope:this,mouseover:this.delegateOver,mouseout:this.delegateOut})
}b.mon(b.getTreeEl(),{scope:this,click:this.delegateClick,dblclick:this.delegateDblClick,contextmenu:this.delegateContextMenu})
},getNode:function(d){var e;
if(e=d.getTarget(".x-tree-node-el",10)){var g=Ext.fly(e,"_treeEvents").getAttribute("tree-node-id","ext");
if(g){return this.tree.getNodeById(g)
}}return null
},getNodeTarget:function(c){var d=c.getTarget(".x-tree-node-icon",1);
if(!d){d=c.getTarget(".x-tree-node-el",6)
}return d
},delegateOut:function(d,e){if(!this.beforeEvent(d)){return
}if(d.getTarget(".x-tree-ec-icon",1)){var g=this.getNode(d);
this.onIconOut(d,g);
if(g==this.lastEcOver){delete this.lastEcOver
}}if((e=this.getNodeTarget(d))&&!d.within(e,true)){this.onNodeOut(d,this.getNode(d))
}},delegateOver:function(c,d){if(!this.beforeEvent(c)){return
}if(Ext.isGecko&&!this.trackingDoc){Ext.getBody().on("mouseover",this.trackExit,this);
this.trackingDoc=true
}if(this.lastEcOver){this.onIconOut(c,this.lastEcOver);
delete this.lastEcOver
}if(c.getTarget(".x-tree-ec-icon",1)){this.lastEcOver=this.getNode(c);
this.onIconOver(c,this.lastEcOver)
}if(d=this.getNodeTarget(c)){this.onNodeOver(c,this.getNode(c))
}},trackExit:function(b){if(this.lastOverNode&&!b.within(this.lastOverNode.ui.getEl())){this.onNodeOut(b,this.lastOverNode);
delete this.lastOverNode;
Ext.getBody().un("mouseover",this.trackExit,this);
this.trackingDoc=false
}},delegateClick:function(c,d){if(this.beforeEvent(c)){if(c.getTarget("input[type=checkbox]",1)){this.onCheckboxClick(c,this.getNode(c))
}else{if(c.getTarget(".x-tree-ec-icon",1)){this.onIconClick(c,this.getNode(c))
}else{if(this.getNodeTarget(c)){this.onNodeClick(c,this.getNode(c))
}else{this.onContainerEvent(c,"click")
}}}}},delegateDblClick:function(c,d){if(this.beforeEvent(c)){if(this.getNodeTarget(c)){this.onNodeDblClick(c,this.getNode(c))
}else{this.onContainerEvent(c,"dblclick")
}}},delegateContextMenu:function(c,d){if(this.beforeEvent(c)){if(this.getNodeTarget(c)){this.onNodeContextMenu(c,this.getNode(c))
}else{this.onContainerEvent(c,"contextmenu")
}}},onContainerEvent:function(c,d){this.tree.fireEvent("container"+d,this.tree,c)
},onNodeClick:function(c,d){d.ui.onClick(c)
},onNodeOver:function(c,d){this.lastOverNode=d;
d.ui.onOver(c)
},onNodeOut:function(c,d){d.ui.onOut(c)
},onIconOver:function(c,d){d.ui.addClass("x-tree-ec-over")
},onIconOut:function(c,d){d.ui.removeClass("x-tree-ec-over")
},onIconClick:function(c,d){d.ui.ecClick(c)
},onCheckboxClick:function(c,d){d.ui.onCheckChange(c)
},onNodeDblClick:function(c,d){d.ui.onDblClick(c)
},onNodeContextMenu:function(c,d){d.ui.onContextMenu(c)
},beforeEvent:function(b){if(this.disabled){b.stopEvent();
return false
}return true
},disable:function(){this.disabled=true
},enable:function(){this.disabled=false
}};
Ext.tree.DefaultSelectionModel=function(b){this.selNode=null;
this.addEvents("selectionchange","beforeselect");
Ext.apply(this,b);
Ext.tree.DefaultSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.tree.DefaultSelectionModel,Ext.util.Observable,{init:function(b){this.tree=b;
b.mon(b.getTreeEl(),"keydown",this.onKeyDown,this);
b.on("click",this.onNodeClick,this)
},onNodeClick:function(d,c){this.select(d)
},select:function(g,e){if(!Ext.fly(g.ui.wrap).isVisible()&&e){return e.call(this,g)
}var d=this.selNode;
if(g==d){g.ui.onSelectedChange(true)
}else{if(this.fireEvent("beforeselect",this,g,d)!==false){if(d&&d.ui){d.ui.onSelectedChange(false)
}this.selNode=g;
g.ui.onSelectedChange(true);
this.fireEvent("selectionchange",this,g,d)
}}return g
},unselect:function(c,d){if(this.selNode==c){this.clearSelections(d)
}},clearSelections:function(d){var c=this.selNode;
if(c){c.ui.onSelectedChange(false);
this.selNode=null;
if(d!==true){this.fireEvent("selectionchange",this,null)
}}return c
},getSelectedNode:function(){return this.selNode
},isSelected:function(b){return this.selNode==b
},selectPrevious:function(e){if(!(e=e||this.selNode||this.lastSelNode)){return null
}var g=e.previousSibling;
if(g){if(!g.isExpanded()||g.childNodes.length<1){return this.select(g,this.selectPrevious)
}else{var d=g.lastChild;
while(d&&d.isExpanded()&&Ext.fly(d.ui.wrap).isVisible()&&d.childNodes.length>0){d=d.lastChild
}return this.select(d,this.selectPrevious)
}}else{if(e.parentNode&&(this.tree.rootVisible||!e.parentNode.isRoot)){return this.select(e.parentNode,this.selectPrevious)
}}return null
},selectNext:function(c){if(!(c=c||this.selNode||this.lastSelNode)){return null
}if(c.firstChild&&c.isExpanded()&&Ext.fly(c.ui.wrap).isVisible()){return this.select(c.firstChild,this.selectNext)
}else{if(c.nextSibling){return this.select(c.nextSibling,this.selectNext)
}else{if(c.parentNode){var d=null;
c.parentNode.bubble(function(){if(this.nextSibling){d=this.getOwnerTree().selModel.select(this.nextSibling,this.selectNext);
return false
}});
return d
}}}return null
},onKeyDown:function(j){var e=this.selNode||this.lastSelNode;
var h=this;
if(!e){return
}var g=j.getKey();
switch(g){case j.DOWN:j.stopEvent();
this.selectNext();
break;
case j.UP:j.stopEvent();
this.selectPrevious();
break;
case j.RIGHT:j.preventDefault();
if(e.hasChildNodes()){if(!e.isExpanded()){e.expand()
}else{if(e.firstChild){this.select(e.firstChild,j)
}}}break;
case j.LEFT:j.preventDefault();
if(e.hasChildNodes()&&e.isExpanded()){e.collapse()
}else{if(e.parentNode&&(this.tree.rootVisible||e.parentNode!=this.tree.getRootNode())){this.select(e.parentNode,j)
}}break
}}});
Ext.tree.MultiSelectionModel=function(b){this.selNodes=[];
this.selMap={};
this.addEvents("selectionchange");
Ext.apply(this,b);
Ext.tree.MultiSelectionModel.superclass.constructor.call(this)
};
Ext.extend(Ext.tree.MultiSelectionModel,Ext.util.Observable,{init:function(b){this.tree=b;
b.mon(b.getTreeEl(),"keydown",this.onKeyDown,this);
b.on("click",this.onNodeClick,this)
},onNodeClick:function(d,c){if(c.ctrlKey&&this.isSelected(d)){this.unselect(d)
}else{this.select(d,c,c.ctrlKey)
}},select:function(e,g,d){if(d!==true){this.clearSelections(true)
}if(this.isSelected(e)){this.lastSelNode=e;
return e
}this.selNodes.push(e);
this.selMap[e.id]=e;
this.lastSelNode=e;
e.ui.onSelectedChange(true);
this.fireEvent("selectionchange",this,this.selNodes);
return e
},unselect:function(d){if(this.selMap[d.id]){d.ui.onSelectedChange(false);
var g=this.selNodes;
var e=g.indexOf(d);
if(e!=-1){this.selNodes.splice(e,1)
}delete this.selMap[d.id];
this.fireEvent("selectionchange",this,this.selNodes)
}},clearSelections:function(e){var h=this.selNodes;
if(h.length>0){for(var j=0,g=h.length;
j<g;
j++){h[j].ui.onSelectedChange(false)
}this.selNodes=[];
this.selMap={};
if(e!==true){this.fireEvent("selectionchange",this,this.selNodes)
}}},isSelected:function(b){return this.selMap[b.id]?true:false
},getSelectedNodes:function(){return this.selNodes
},onKeyDown:Ext.tree.DefaultSelectionModel.prototype.onKeyDown,selectNext:Ext.tree.DefaultSelectionModel.prototype.selectNext,selectPrevious:Ext.tree.DefaultSelectionModel.prototype.selectPrevious});
Ext.data.Tree=function(b){this.nodeHash={};
this.root=null;
if(b){this.setRootNode(b)
}this.addEvents("append","remove","move","insert","beforeappend","beforeremove","beforemove","beforeinsert");
Ext.data.Tree.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Tree,Ext.util.Observable,{pathSeparator:"/",proxyNodeEvent:function(){return this.fireEvent.apply(this,arguments)
},getRootNode:function(){return this.root
},setRootNode:function(b){this.root=b;
b.ownerTree=this;
b.isRoot=true;
this.registerNode(b);
return b
},getNodeById:function(b){return this.nodeHash[b]
},registerNode:function(b){this.nodeHash[b.id]=b
},unregisterNode:function(b){delete this.nodeHash[b.id]
},toString:function(){return"[Tree"+(this.id?" "+this.id:"")+"]"
}});
Ext.data.Node=function(b){this.attributes=b||{};
this.leaf=this.attributes.leaf;
this.id=this.attributes.id;
if(!this.id){this.id=Ext.id(null,"xnode-");
this.attributes.id=this.id
}this.childNodes=[];
if(!this.childNodes.indexOf){this.childNodes.indexOf=function(e){for(var g=0,a=this.length;
g<a;
g++){if(this[g]==e){return g
}}return -1
}
}this.parentNode=null;
this.firstChild=null;
this.lastChild=null;
this.previousSibling=null;
this.nextSibling=null;
this.addEvents({append:true,remove:true,move:true,insert:true,beforeappend:true,beforeremove:true,beforemove:true,beforeinsert:true});
this.listeners=this.attributes.listeners;
Ext.data.Node.superclass.constructor.call(this)
};
Ext.extend(Ext.data.Node,Ext.util.Observable,{fireEvent:function(c){if(Ext.data.Node.superclass.fireEvent.apply(this,arguments)===false){return false
}var d=this.getOwnerTree();
if(d){if(d.proxyNodeEvent.apply(d,arguments)===false){return false
}}return true
},isLeaf:function(){return this.leaf===true
},setFirstChild:function(b){this.firstChild=b
},setLastChild:function(b){this.lastChild=b
},isLast:function(){return(!this.parentNode?true:this.parentNode.lastChild==this)
},isFirst:function(){return(!this.parentNode?true:this.parentNode.firstChild==this)
},hasChildNodes:function(){return !this.isLeaf()&&this.childNodes.length>0
},isExpandable:function(){return this.attributes.expandable||this.hasChildNodes()
},appendChild:function(n){var m=false;
if(Ext.isArray(n)){m=n
}else{if(arguments.length>1){m=arguments
}}if(m){for(var o=0,k=m.length;
o<k;
o++){this.appendChild(m[o])
}}else{if(this.fireEvent("beforeappend",this.ownerTree,this,n)===false){return false
}var j=this.childNodes.length;
var p=n.parentNode;
if(p){if(n.fireEvent("beforemove",n.getOwnerTree(),n,p,this,j)===false){return false
}p.removeChild(n)
}j=this.childNodes.length;
if(j===0){this.setFirstChild(n)
}this.childNodes.push(n);
n.parentNode=this;
var l=this.childNodes[j-1];
if(l){n.previousSibling=l;
l.nextSibling=n
}else{n.previousSibling=null
}n.nextSibling=null;
this.setLastChild(n);
n.setOwnerTree(this.getOwnerTree());
this.fireEvent("append",this.ownerTree,this,n,j);
if(p){n.fireEvent("move",this.ownerTree,n,p,this,j)
}return n
}},removeChild:function(g,d){var e=this.childNodes.indexOf(g);
if(e==-1){return false
}if(this.fireEvent("beforeremove",this.ownerTree,this,g)===false){return false
}this.childNodes.splice(e,1);
if(g.previousSibling){g.previousSibling.nextSibling=g.nextSibling
}if(g.nextSibling){g.nextSibling.previousSibling=g.previousSibling
}if(this.firstChild==g){this.setFirstChild(g.nextSibling)
}if(this.lastChild==g){this.setLastChild(g.previousSibling)
}g.clear();
this.fireEvent("remove",this.ownerTree,this,g);
if(d){g.destroy()
}return g
},clear:function(b){this.setOwnerTree(null,b);
this.parentNode=this.previousSibling=this.nextSibling=null;
if(b){this.firstChild=this.lastChild=null
}},destroy:function(){this.purgeListeners();
this.clear(true);
Ext.each(this.childNodes,function(b){b.destroy()
});
this.childNodes=null
},insertBefore:function(m,j){if(!j){return this.appendChild(m)
}if(m==j){return false
}if(this.fireEvent("beforeinsert",this.ownerTree,this,m,j)===false){return false
}var h=this.childNodes.indexOf(j);
var n=m.parentNode;
var l=h;
if(n==this&&this.childNodes.indexOf(m)<h){l--
}if(n){if(m.fireEvent("beforemove",m.getOwnerTree(),m,n,this,h,j)===false){return false
}n.removeChild(m)
}if(l===0){this.setFirstChild(m)
}this.childNodes.splice(l,0,m);
m.parentNode=this;
var k=this.childNodes[l-1];
if(k){m.previousSibling=k;
k.nextSibling=m
}else{m.previousSibling=null
}m.nextSibling=j;
j.previousSibling=m;
m.setOwnerTree(this.getOwnerTree());
this.fireEvent("insert",this.ownerTree,this,m,j);
if(n){m.fireEvent("move",this.ownerTree,m,n,this,l,j)
}return m
},remove:function(b){this.parentNode.removeChild(this,b);
return this
},item:function(b){return this.childNodes[b]
},replaceChild:function(e,g){var d=g?g.nextSibling:null;
this.removeChild(g);
this.insertBefore(e,d);
return g
},indexOf:function(b){return this.childNodes.indexOf(b)
},getOwnerTree:function(){if(!this.ownerTree){var b=this;
while(b){if(b.ownerTree){this.ownerTree=b.ownerTree;
break
}b=b.parentNode
}}return this.ownerTree
},getDepth:function(){var c=0;
var d=this;
while(d.parentNode){++c;
d=d.parentNode
}return c
},setOwnerTree:function(d,c){if(d!=this.ownerTree){if(this.ownerTree){this.ownerTree.unregisterNode(this)
}this.ownerTree=d;
if(c!==true){Ext.each(this.childNodes,function(a){a.setOwnerTree(d)
})
}if(d){d.registerNode(this)
}}},setId:function(c){if(c!==this.id){var d=this.ownerTree;
if(d){d.unregisterNode(this)
}this.id=this.attributes.id=c;
if(d){d.registerNode(this)
}this.onIdChange(c)
}},onIdChange:Ext.emptyFn,getPath:function(j){j=j||"id";
var g=this.parentNode;
var b=[this.attributes[j]];
while(g){b.unshift(g.attributes[j]);
g=g.parentNode
}var h=this.getOwnerTree().pathSeparator;
return h+b.join(h)
},bubble:function(j,e,g){var h=this;
while(h){if(j.apply(e||h,g||[h])===false){break
}h=h.parentNode
}},cascade:function(k,l,h){if(k.apply(l||this,h||[this])!==false){var m=this.childNodes;
for(var n=0,j=m.length;
n<j;
n++){m[n].cascade(k,l,h)
}}},eachChild:function(k,l,h){var m=this.childNodes;
for(var n=0,j=m.length;
n<j;
n++){if(k.apply(l||this,h||[m[n]])===false){break
}}},findChild:function(k,j){var l=this.childNodes;
for(var g=0,h=l.length;
g<h;
g++){if(l[g].attributes[k]==j){return l[g]
}}return null
},findChildBy:function(j,k){var l=this.childNodes;
for(var g=0,h=l.length;
g<h;
g++){if(j.call(k||l[g],l[g])===true){return l[g]
}}return null
},sort:function(n,o){var p=this.childNodes;
var k=p.length;
if(k>0){var m=o?function(){n.apply(o,arguments)
}:n;
p.sort(m);
for(var j=0;
j<k;
j++){var l=p[j];
l.previousSibling=p[j-1];
l.nextSibling=p[j+1];
if(j===0){this.setFirstChild(l)
}if(j==k-1){this.setLastChild(l)
}}}},contains:function(b){return b.isAncestor(this)
},isAncestor:function(d){var c=this.parentNode;
while(c){if(c==d){return true
}c=c.parentNode
}return false
},toString:function(){return"[Node"+(this.id?" "+this.id:"")+"]"
}});
Ext.tree.TreeNode=function(d){d=d||{};
if(Ext.isString(d)){d={text:d}
}this.childrenRendered=false;
this.rendered=false;
Ext.tree.TreeNode.superclass.constructor.call(this,d);
this.expanded=d.expanded===true;
this.isTarget=d.isTarget!==false;
this.draggable=d.draggable!==false&&d.allowDrag!==false;
this.allowChildren=d.allowChildren!==false&&d.allowDrop!==false;
this.text=d.text;
this.disabled=d.disabled===true;
this.hidden=d.hidden===true;
this.addEvents("textchange","beforeexpand","beforecollapse","expand","disabledchange","collapse","beforeclick","click","checkchange","beforedblclick","dblclick","contextmenu","beforechildrenrendered");
var c=this.attributes.uiProvider||this.defaultUI||Ext.tree.TreeNodeUI;
this.ui=new c(this)
};
Ext.extend(Ext.tree.TreeNode,Ext.data.Node,{preventHScroll:true,isExpanded:function(){return this.expanded
},getUI:function(){return this.ui
},getLoader:function(){var b;
return this.loader||((b=this.getOwnerTree())&&b.loader?b.loader:(this.loader=new Ext.tree.TreeLoader()))
},setFirstChild:function(d){var c=this.firstChild;
Ext.tree.TreeNode.superclass.setFirstChild.call(this,d);
if(this.childrenRendered&&c&&d!=c){c.renderIndent(true,true)
}if(this.rendered){this.renderIndent(true,true)
}},setLastChild:function(c){var d=this.lastChild;
Ext.tree.TreeNode.superclass.setLastChild.call(this,c);
if(this.childrenRendered&&d&&c!=d){d.renderIndent(true,true)
}if(this.rendered){this.renderIndent(true,true)
}},appendChild:function(c){if(!c.render&&!Ext.isArray(c)){c=this.getLoader().createNode(c)
}var d=Ext.tree.TreeNode.superclass.appendChild.call(this,c);
if(d&&this.childrenRendered){d.render()
}this.ui.updateExpandIcon();
return d
},removeChild:function(c,d){this.ownerTree.getSelectionModel().unselect(c);
Ext.tree.TreeNode.superclass.removeChild.apply(this,arguments);
if(c.ui.rendered){c.ui.remove()
}if(this.childNodes.length<1){this.collapse(false,false)
}else{this.ui.updateExpandIcon()
}if(!this.firstChild&&!this.isHiddenRoot()){this.childrenRendered=false
}return c
},insertBefore:function(g,e){if(!g.render){g=this.getLoader().createNode(g)
}var d=Ext.tree.TreeNode.superclass.insertBefore.call(this,g,e);
if(d&&e&&this.childrenRendered){g.render()
}this.ui.updateExpandIcon();
return d
},setText:function(c){var d=this.text;
this.text=this.attributes.text=c;
if(this.rendered){this.ui.onTextChange(this,c,d)
}this.fireEvent("textchange",this,c,d)
},select:function(){var b=this.getOwnerTree();
if(b){b.getSelectionModel().select(this)
}},unselect:function(d){var c=this.getOwnerTree();
if(c){c.getSelectionModel().unselect(this,d)
}},isSelected:function(){var b=this.getOwnerTree();
return b?b.getSelectionModel().isSelected(this):false
},expand:function(g,j,h,e){if(!this.expanded){if(this.fireEvent("beforeexpand",this,g,j)===false){return
}if(!this.childrenRendered){this.renderChildren()
}this.expanded=true;
if(!this.isHiddenRoot()&&(this.getOwnerTree().animate&&j!==false)||j){this.ui.animExpand(function(){this.fireEvent("expand",this);
this.runCallback(h,e||this,[this]);
if(g===true){this.expandChildNodes(true)
}}.createDelegate(this));
return
}else{this.ui.expand();
this.fireEvent("expand",this);
this.runCallback(h,e||this,[this])
}}else{this.runCallback(h,e||this,[this])
}if(g===true){this.expandChildNodes(true)
}},runCallback:function(e,g,d){if(Ext.isFunction(e)){e.apply(g,d)
}},isHiddenRoot:function(){return this.isRoot&&!this.getOwnerTree().rootVisible
},collapse:function(j,m,l,n){if(this.expanded&&!this.isHiddenRoot()){if(this.fireEvent("beforecollapse",this,j,m)===false){return
}this.expanded=false;
if((this.getOwnerTree().animate&&m!==false)||m){this.ui.animCollapse(function(){this.fireEvent("collapse",this);
this.runCallback(l,n||this,[this]);
if(j===true){this.collapseChildNodes(true)
}}.createDelegate(this));
return
}else{this.ui.collapse();
this.fireEvent("collapse",this);
this.runCallback(l,n||this,[this])
}}else{if(!this.expanded){this.runCallback(l,n||this,[this])
}}if(j===true){var o=this.childNodes;
for(var p=0,k=o.length;
p<k;
p++){o[p].collapse(true,false)
}}},delayedExpand:function(b){if(!this.expandProcId){this.expandProcId=this.expand.defer(b,this)
}},cancelExpand:function(){if(this.expandProcId){clearTimeout(this.expandProcId)
}this.expandProcId=false
},toggle:function(){if(this.expanded){this.collapse()
}else{this.expand()
}},ensureVisible:function(g,d){var e=this.getOwnerTree();
e.expandPath(this.parentNode?this.parentNode.getPath():this.getPath(),false,function(){var a=e.getNodeById(this.id);
e.getTreeEl().scrollChildIntoView(a.ui.anchor);
this.runCallback(g,d||this,[this])
}.createDelegate(this))
},expandChildNodes:function(e){var h=this.childNodes;
for(var j=0,g=h.length;
j<g;
j++){h[j].expand(e)
}},collapseChildNodes:function(e){var h=this.childNodes;
for(var j=0,g=h.length;
j<g;
j++){h[j].collapse(e)
}},disable:function(){this.disabled=true;
this.unselect();
if(this.rendered&&this.ui.onDisableChange){this.ui.onDisableChange(this,true)
}this.fireEvent("disabledchange",this,true)
},enable:function(){this.disabled=false;
if(this.rendered&&this.ui.onDisableChange){this.ui.onDisableChange(this,false)
}this.fireEvent("disabledchange",this,false)
},renderChildren:function(e){if(e!==false){this.fireEvent("beforechildrenrendered",this)
}var h=this.childNodes;
for(var j=0,g=h.length;
j<g;
j++){h[j].render(true)
}this.childrenRendered=true
},sort:function(j,k){Ext.tree.TreeNode.superclass.sort.apply(this,arguments);
if(this.childrenRendered){var l=this.childNodes;
for(var g=0,h=l.length;
g<h;
g++){l[g].render(true)
}}},render:function(b){this.ui.render(b);
if(!this.rendered){this.getOwnerTree().registerNode(this);
this.rendered=true;
if(this.expanded){this.expanded=false;
this.expand(false,false)
}}},renderIndent:function(g,j){if(j){this.ui.childIndent=null
}this.ui.renderIndent();
if(g===true&&this.childrenRendered){var k=this.childNodes;
for(var l=0,h=k.length;
l<h;
l++){k[l].renderIndent(true,j)
}}},beginUpdate:function(){this.childrenRendered=false
},endUpdate:function(){if(this.expanded&&this.rendered){this.renderChildren()
}},destroy:function(){this.unselect(true);
Ext.tree.TreeNode.superclass.destroy.call(this);
Ext.destroy(this.ui,this.loader);
this.ui=this.loader=null
},onIdChange:function(b){this.ui.onIdChange(b)
}});
Ext.tree.TreePanel.nodeTypes.node=Ext.tree.TreeNode;
Ext.tree.AsyncTreeNode=function(b){this.loaded=b&&b.loaded===true;
this.loading=false;
Ext.tree.AsyncTreeNode.superclass.constructor.apply(this,arguments);
this.addEvents("beforeload","load")
};
Ext.extend(Ext.tree.AsyncTreeNode,Ext.tree.TreeNode,{expand:function(j,n,l,p){if(this.loading){var m;
var o=function(){if(!this.loading){clearInterval(m);
this.expand(j,n,l,p)
}}.createDelegate(this);
m=setInterval(o,200);
return
}if(!this.loaded){if(this.fireEvent("beforeload",this)===false){return
}this.loading=true;
this.ui.beforeLoad(this);
var k=this.loader||this.attributes.loader||this.getOwnerTree().getLoader();
if(k){k.load(this,this.loadComplete.createDelegate(this,[j,n,l,p]),this);
return
}}Ext.tree.AsyncTreeNode.superclass.expand.call(this,j,n,l,p)
},isLoading:function(){return this.loading
},loadComplete:function(g,j,h,e){this.loading=false;
this.loaded=true;
this.ui.afterLoad(this);
this.fireEvent("load",this);
this.expand(g,j,h,e)
},isLoaded:function(){return this.loaded
},hasChildNodes:function(){if(!this.isLeaf()&&!this.loaded){return true
}else{return Ext.tree.AsyncTreeNode.superclass.hasChildNodes.call(this)
}},reload:function(c,d){this.collapse(false,false);
while(this.firstChild){this.removeChild(this.firstChild).destroy()
}this.childrenRendered=false;
this.loaded=false;
if(this.isHiddenRoot()){this.expanded=false
}this.expand(false,false,c,d)
}});
Ext.tree.TreePanel.nodeTypes.async=Ext.tree.AsyncTreeNode;
Ext.tree.TreeNodeUI=function(b){this.node=b;
this.rendered=false;
this.animating=false;
this.wasLeaf=true;
this.ecc="x-tree-ec-icon x-tree-elbow";
this.emptyIcon=Ext.BLANK_IMAGE_URL
};
Ext.tree.TreeNodeUI.prototype={removeChild:function(b){if(this.rendered){this.ctNode.removeChild(b.ui.getEl())
}},beforeLoad:function(){this.addClass("x-tree-node-loading")
},afterLoad:function(){this.removeClass("x-tree-node-loading")
},onTextChange:function(d,g,e){if(this.rendered){this.textNode.innerHTML=g
}},onDisableChange:function(d,c){this.disabled=c;
if(this.checkbox){this.checkbox.disabled=c
}if(c){this.addClass("x-tree-node-disabled")
}else{this.removeClass("x-tree-node-disabled")
}},onSelectedChange:function(b){if(b){this.focus();
this.addClass("x-tree-selected")
}else{this.removeClass("x-tree-selected")
}},onMove:function(l,n,p,o,q,k){this.childIndent=null;
if(this.rendered){var m=o.ui.getContainer();
if(!m){this.holder=document.createElement("div");
this.holder.appendChild(this.wrap);
return
}var r=k?k.ui.getEl():null;
if(r){m.insertBefore(this.wrap,r)
}else{m.appendChild(this.wrap)
}this.node.renderIndent(true,p!=o)
}},addClass:function(b){if(this.elNode){Ext.fly(this.elNode).addClass(b)
}},removeClass:function(b){if(this.elNode){Ext.fly(this.elNode).removeClass(b)
}},remove:function(){if(this.rendered){this.holder=document.createElement("div");
this.holder.appendChild(this.wrap)
}},fireEvent:function(){return this.node.fireEvent.apply(this.node,arguments)
},initEvents:function(){this.node.on("move",this.onMove,this);
if(this.node.disabled){this.onDisableChange(this.node,true)
}if(this.node.hidden){this.hide()
}var c=this.node.getOwnerTree();
var d=c.enableDD||c.enableDrag||c.enableDrop;
if(d&&(!this.node.isRoot||c.rootVisible)){Ext.dd.Registry.register(this.elNode,{node:this.node,handles:this.getDDHandles(),isHandle:false})
}},getDDHandles:function(){return[this.iconNode,this.textNode,this.elNode]
},hide:function(){this.node.hidden=true;
if(this.wrap){this.wrap.style.display="none"
}},show:function(){this.node.hidden=false;
if(this.wrap){this.wrap.style.display=""
}},onContextMenu:function(b){if(this.node.hasListener("contextmenu")||this.node.getOwnerTree().hasListener("contextmenu")){b.preventDefault();
this.focus();
this.fireEvent("contextmenu",this.node,b)
}},onClick:function(d){if(this.dropping){d.stopEvent();
return
}if(this.fireEvent("beforeclick",this.node,d)!==false){var a=d.getTarget("a");
if(!this.disabled&&this.node.attributes.href&&a){this.fireEvent("click",this.node,d);
return
}else{if(a&&d.ctrlKey){d.stopEvent()
}}d.preventDefault();
if(this.disabled){return
}if(this.node.attributes.singleClickExpand&&!this.animating&&this.node.isExpandable()){this.node.toggle()
}this.fireEvent("click",this.node,d)
}else{d.stopEvent()
}},onDblClick:function(b){b.preventDefault();
if(this.disabled){return
}if(this.fireEvent("beforedblclick",this.node,b)!==false){if(this.checkbox){this.toggleCheck()
}if(!this.animating&&this.node.isExpandable()){this.node.toggle()
}this.fireEvent("dblclick",this.node,b)
}},onOver:function(b){this.addClass("x-tree-node-over")
},onOut:function(b){this.removeClass("x-tree-node-over")
},onCheckChange:function(){var b=this.checkbox.checked;
this.checkbox.defaultChecked=b;
this.node.attributes.checked=b;
this.fireEvent("checkchange",this.node,b)
},ecClick:function(b){if(!this.animating&&this.node.isExpandable()){this.node.toggle()
}},startDrop:function(){this.dropping=true
},endDrop:function(){setTimeout(function(){this.dropping=false
}.createDelegate(this),50)
},expand:function(){this.updateExpandIcon();
this.ctNode.style.display=""
},focus:function(){if(!this.node.preventHScroll){try{this.anchor.focus()
}catch(g){}}else{try{var d=this.node.getOwnerTree().getTreeEl().dom;
var e=d.scrollLeft;
this.anchor.focus();
d.scrollLeft=e
}catch(g){}}},toggleCheck:function(c){var d=this.checkbox;
if(d){d.checked=(c===undefined?!d.checked:c);
this.onCheckChange()
}},blur:function(){try{this.anchor.blur()
}catch(b){}},animExpand:function(c){var d=Ext.get(this.ctNode);
d.stopFx();
if(!this.node.isExpandable()){this.updateExpandIcon();
this.ctNode.style.display="";
Ext.callback(c);
return
}this.animating=true;
this.updateExpandIcon();
d.slideIn("t",{callback:function(){this.animating=false;
Ext.callback(c)
},scope:this,duration:this.node.ownerTree.duration||0.25})
},highlight:function(){var b=this.node.getOwnerTree();
Ext.fly(this.wrap).highlight(b.hlColor||"C3DAF9",{endColor:b.hlBaseColor})
},collapse:function(){this.updateExpandIcon();
this.ctNode.style.display="none"
},animCollapse:function(c){var d=Ext.get(this.ctNode);
d.enableDisplayMode("block");
d.stopFx();
this.animating=true;
this.updateExpandIcon();
d.slideOut("t",{callback:function(){this.animating=false;
Ext.callback(c)
},scope:this,duration:this.node.ownerTree.duration||0.25})
},getContainer:function(){return this.ctNode
},getEl:function(){return this.wrap
},appendDDGhost:function(b){b.appendChild(this.elNode.cloneNode(true))
},getDDRepairXY:function(){return Ext.lib.Dom.getXY(this.iconNode)
},onRender:function(){this.render()
},render:function(j){var g=this.node,a=g.attributes;
var h=g.parentNode?g.parentNode.ui.getContainer():g.ownerTree.innerCt.dom;
if(!this.rendered){this.rendered=true;
this.renderElements(g,a,h,j);
if(a.qtip){if(this.textNode.setAttributeNS){this.textNode.setAttributeNS("ext","qtip",a.qtip);
if(a.qtipTitle){this.textNode.setAttributeNS("ext","qtitle",a.qtipTitle)
}}else{this.textNode.setAttribute("ext:qtip",a.qtip);
if(a.qtipTitle){this.textNode.setAttribute("ext:qtitle",a.qtipTitle)
}}}else{if(a.qtipCfg){a.qtipCfg.target=Ext.id(this.textNode);
Ext.QuickTips.register(a.qtipCfg)
}}this.initEvents();
if(!this.node.expanded){this.updateExpandIcon(true)
}}else{if(j===true){h.appendChild(this.wrap)
}}},renderElements:function(s,n,o,a){this.indentMarkup=s.parentNode?s.parentNode.ui.getChildIndent():"";
var r=Ext.isBoolean(n.checked),v,u=n.href?n.href:Ext.isGecko?"":"#",t=['<li class="x-tree-node"><div ext:tree-node-id="',s.id,'" class="x-tree-node-el x-tree-node-leaf x-unselectable ',n.cls,'" unselectable="on">','<span class="x-tree-node-indent">',this.indentMarkup,"</span>",'<img src="',this.emptyIcon,'" class="x-tree-ec-icon x-tree-elbow" />','<img src="',n.icon||this.emptyIcon,'" class="x-tree-node-icon',(n.icon?" x-tree-node-inline-icon":""),(n.iconCls?" "+n.iconCls:""),'" unselectable="on" />',r?('<input class="x-tree-node-cb" type="checkbox" '+(n.checked?'checked="checked" />':"/>")):"",'<a hidefocus="on" class="x-tree-node-anchor" href="',u,'" tabIndex="1" ',n.hrefTarget?' target="'+n.hrefTarget+'"':"",'><span unselectable="on">',s.text,"</span></a></div>",'<ul class="x-tree-node-ct" style="display:none;"></ul>',"</li>"].join("");
if(a!==true&&s.nextSibling&&(v=s.nextSibling.ui.getEl())){this.wrap=Ext.DomHelper.insertHtml("beforeBegin",v,t)
}else{this.wrap=Ext.DomHelper.insertHtml("beforeEnd",o,t)
}this.elNode=this.wrap.childNodes[0];
this.ctNode=this.wrap.childNodes[1];
var p=this.elNode.childNodes;
this.indentNode=p[0];
this.ecNode=p[1];
this.iconNode=p[2];
var q=3;
if(r){this.checkbox=p[3];
this.checkbox.defaultChecked=this.checkbox.checked;
q++
}this.anchor=p[q];
this.textNode=p[q].firstChild
},getAnchor:function(){return this.anchor
},getTextEl:function(){return this.textNode
},getIconEl:function(){return this.iconNode
},isChecked:function(){return this.checkbox?this.checkbox.checked:false
},updateExpandIcon:function(){if(this.rendered){var k=this.node,m,n,j=k.isLast()?"x-tree-elbow-end":"x-tree-elbow",l=k.hasChildNodes();
if(l||k.attributes.expandable){if(k.expanded){j+="-minus";
m="x-tree-node-collapsed";
n="x-tree-node-expanded"
}else{j+="-plus";
m="x-tree-node-expanded";
n="x-tree-node-collapsed"
}if(this.wasLeaf){this.removeClass("x-tree-node-leaf");
this.wasLeaf=false
}if(this.c1!=m||this.c2!=n){Ext.fly(this.elNode).replaceClass(m,n);
this.c1=m;
this.c2=n
}}else{if(!this.wasLeaf){Ext.fly(this.elNode).replaceClass("x-tree-node-expanded","x-tree-node-leaf");
delete this.c1;
delete this.c2;
this.wasLeaf=true
}}var h="x-tree-ec-icon "+j;
if(this.ecc!=h){this.ecNode.className=h;
this.ecc=h
}}},onIdChange:function(b){if(this.rendered){this.elNode.setAttribute("ext:tree-node-id",b)
}},getChildIndent:function(){if(!this.childIndent){var d=[],c=this.node;
while(c){if(!c.isRoot||(c.isRoot&&c.ownerTree.rootVisible)){if(!c.isLast()){d.unshift('<img src="'+this.emptyIcon+'" class="x-tree-elbow-line" />')
}else{d.unshift('<img src="'+this.emptyIcon+'" class="x-tree-icon" />')
}}c=c.parentNode
}this.childIndent=d.join("")
}return this.childIndent
},renderIndent:function(){if(this.rendered){var d="",c=this.node.parentNode;
if(c){d=c.ui.getChildIndent()
}if(this.indentMarkup!=d){this.indentNode.innerHTML=d;
this.indentMarkup=d
}this.updateExpandIcon()
}},destroy:function(){if(this.elNode){Ext.dd.Registry.unregister(this.elNode.id)
}Ext.each(["textnode","anchor","checkbox","indentNode","ecNode","iconNode","elNode","ctNode","wrap","holder"],function(b){if(this[b]){Ext.fly(this[b]).remove();
delete this[b]
}},this);
delete this.node
}};
Ext.tree.RootTreeNodeUI=Ext.extend(Ext.tree.TreeNodeUI,{render:function(){if(!this.rendered){var b=this.node.ownerTree.innerCt.dom;
this.node.expanded=true;
b.innerHTML='<div class="x-tree-root-node"></div>';
this.wrap=this.ctNode=b.firstChild
}},collapse:Ext.emptyFn,expand:Ext.emptyFn});
Ext.tree.TreeLoader=function(b){this.baseParams={};
Ext.apply(this,b);
this.addEvents("beforeload","load","loadexception");
Ext.tree.TreeLoader.superclass.constructor.call(this);
if(Ext.isString(this.paramOrder)){this.paramOrder=this.paramOrder.split(/[\s,|]/)
}};
Ext.extend(Ext.tree.TreeLoader,Ext.util.Observable,{uiProviders:{},clearOnLoad:true,paramOrder:undefined,paramsAsHash:false,nodeParameter:"node",directFn:undefined,load:function(d,g,e){if(this.clearOnLoad){while(d.firstChild){d.removeChild(d.firstChild)
}}if(this.doPreload(d)){this.runCallback(g,e||d,[d])
}else{if(this.directFn||this.dataUrl||this.url){this.requestData(d,g,e||d)
}}},doPreload:function(k){if(k.attributes.children){if(k.childNodes.length<1){var l=k.attributes.children;
k.beginUpdate();
for(var g=0,h=l.length;
g<h;
g++){var j=k.appendChild(this.createNode(l[g]));
if(this.preloadChildren){this.doPreload(j)
}}k.endUpdate()
}return true
}return false
},getParams:function(l){var h=[],m=this.baseParams;
if(this.directFn){h.push(l.id);
if(m){if(this.paramOrder){for(var n=0,j=this.paramOrder.length;
n<j;
n++){h.push(m[this.paramOrder[n]])
}}else{if(this.paramsAsHash){h.push(m)
}}}return h
}else{var k=Ext.apply({},m);
k[this.nodeParameter]=l.id;
return k
}},requestData:function(j,h,e){if(this.fireEvent("beforeload",this,j,h)!==false){if(this.directFn){var g=this.getParams(j);
g.push(this.processDirectResponse.createDelegate(this,[{callback:h,node:j,scope:e}],true));
this.directFn.apply(window,g)
}else{this.transId=Ext.Ajax.request({method:this.requestMethod,url:this.dataUrl||this.url,success:this.handleResponse,failure:this.handleFailure,scope:this,argument:{callback:h,node:j,scope:e},params:this.getParams(j)})
}}else{this.runCallback(h,e||j,[])
}},processDirectResponse:function(e,d,g){if(d.status){this.handleResponse({responseData:Ext.isArray(e)?e:null,responseText:e,argument:g})
}else{this.handleFailure({argument:g})
}},runCallback:function(e,g,d){if(Ext.isFunction(e)){e.apply(g,d)
}},isLoading:function(){return !!this.transId
},abort:function(){if(this.isLoading()){Ext.Ajax.abort(this.transId)
}},createNode:function(attr){if(this.baseAttrs){Ext.applyIf(attr,this.baseAttrs)
}if(this.applyLoader!==false&&!attr.loader){attr.loader=this
}if(Ext.isString(attr.uiProvider)){attr.uiProvider=this.uiProviders[attr.uiProvider]||eval(attr.uiProvider)
}if(attr.nodeType){return new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr)
}else{return attr.leaf?new Ext.tree.TreeNode(attr):new Ext.tree.AsyncTreeNode(attr)
}},processResponse:function(s,t,o,n){var e=s.responseText;
try{var v=s.responseData||Ext.decode(e);
t.beginUpdate();
for(var r=0,q=v.length;
r<q;
r++){var u=this.createNode(v[r]);
if(u){t.appendChild(u)
}}t.endUpdate();
this.runCallback(o,n||t,[t])
}catch(p){this.handleFailure(s)
}},handleResponse:function(d){this.transId=false;
var a=d.argument;
this.processResponse(d,a.node,a.callback,a.scope);
this.fireEvent("load",this,a.node,d)
},handleFailure:function(d){this.transId=false;
var a=d.argument;
this.fireEvent("loadexception",this,a.node,d);
this.runCallback(a.callback,a.scope||a.node,[a.node])
},destroy:function(){this.purgeListeners()
}});
Ext.tree.TreeFilter=function(d,c){this.tree=d;
this.filtered={};
Ext.apply(this,c)
};
Ext.tree.TreeFilter.prototype={clearBlank:false,reverse:false,autoClear:false,remove:false,filter:function(k,h,g){h=h||"text";
var l;
if(typeof k=="string"){var j=k.length;
if(j==0&&this.clearBlank){this.clear();
return
}k=k.toLowerCase();
l=function(a){return a.attributes[h].substr(0,j).toLowerCase()==k
}
}else{if(k.exec){l=function(a){return k.test(a.attributes[h])
}
}else{throw"Illegal filter type, must be string or regex"
}}this.filterBy(l,null,g)
},filterBy:function(q,r,k){k=k||this.tree.root;
if(this.autoClear){this.clear()
}var l=this.filtered,m=this.reverse;
var p=function(a){if(a==k){return true
}if(l[a.id]){return false
}var b=q.call(r||a,a);
if(!b||m){l[a.id]=a;
a.ui.hide();
return false
}return true
};
k.cascade(p);
if(this.remove){for(var n in l){if(typeof n!="function"){var o=l[n];
if(o&&o.parentNode){o.parentNode.removeChild(o)
}}}}},clear:function(){var e=this.tree;
var g=this.filtered;
for(var h in g){if(typeof h!="function"){var j=g[h];
if(j){j.ui.show()
}}}this.filtered={}
}};
Ext.tree.TreeSorter=function(k,r){Ext.apply(this,r);
k.on("beforechildrenrendered",this.doSort,this);
k.on("append",this.updateSort,this);
k.on("insert",this.updateSort,this);
k.on("textchange",this.updateSortParent,this);
var p=this.dir&&this.dir.toLowerCase()=="desc";
var o=this.property||"text";
var n=this.sortType;
var l=this.folderSort;
var q=this.caseSensitive===true;
var m=this.leafAttr||"leaf";
this.sortFn=function(b,c){if(l){if(b.attributes[m]&&!c.attributes[m]){return 1
}if(!b.attributes[m]&&c.attributes[m]){return -1
}}var d=n?n(b.attributes[o]):(q?b.attributes[o]:b.attributes[o].toUpperCase());
var a=n?n(c.attributes[o]):(q?c.attributes[o]:c.attributes[o].toUpperCase());
if(d<a){return p?+1:-1
}else{if(d>a){return p?-1:+1
}else{return 0
}}}
};
Ext.tree.TreeSorter.prototype={doSort:function(b){b.sort(this.sortFn)
},compareNodes:function(c,d){return(c.text.toUpperCase()>d.text.toUpperCase()?1:-1)
},updateSort:function(d,c){if(c.childrenRendered){this.doSort.defer(1,this,[c])
}},updateSortParent:function(d){var c=d.parentNode;
if(c&&c.childrenRendered){this.doSort.defer(1,this,[c])
}}};
if(Ext.dd.DropZone){Ext.tree.TreeDropZone=function(d,c){this.allowParentInsert=c.allowParentInsert||false;
this.allowContainerDrop=c.allowContainerDrop||false;
this.appendOnly=c.appendOnly||false;
Ext.tree.TreeDropZone.superclass.constructor.call(this,d.getTreeEl(),c);
this.tree=d;
this.dragOverData={};
this.lastInsertClass="x-tree-no-status"
};
Ext.extend(Ext.tree.TreeDropZone,Ext.dd.DropZone,{ddGroup:"TreeDD",expandDelay:1000,expandNode:function(b){if(b.hasChildNodes()&&!b.isExpanded()){b.expand(false,null,this.triggerCacheRefresh.createDelegate(this))
}},queueExpand:function(b){this.expandProcId=this.expandNode.defer(this.expandDelay,this,[b])
},cancelExpand:function(){if(this.expandProcId){clearTimeout(this.expandProcId);
this.expandProcId=false
}},isValidDropPoint:function(t,e,n,q,r){if(!t||!r){return false
}var p=t.node;
var o=r.node;
if(!(p&&p.isTarget&&e)){return false
}if(e=="append"&&p.allowChildren===false){return false
}if((e=="above"||e=="below")&&(p.parentNode&&p.parentNode.allowChildren===false)){return false
}if(o&&(p==o||o.contains(p))){return false
}var s=this.dragOverData;
s.tree=this.tree;
s.target=p;
s.data=r;
s.point=e;
s.source=n;
s.rawEvent=q;
s.dropNode=o;
s.cancel=false;
var m=this.tree.fireEvent("nodedragover",s);
return s.cancel===false&&m!==false
},getDropPoint:function(t,u,n){var e=u.node;
if(e.isRoot){return e.allowChildren!==false?"append":false
}var w=u.ddel;
var b=Ext.lib.Dom.getY(w),r=b+w.offsetHeight;
var s=Ext.lib.Event.getPageY(t);
var q=e.allowChildren===false||e.isLeaf();
if(this.appendOnly||e.parentNode.allowChildren===false){return q?false:"append"
}var v=false;
if(!this.allowParentInsert){v=e.hasChildNodes()&&e.isExpanded()
}var x=(r-b)/(q?2:3);
if(s>=b&&s<(b+x)){return"above"
}else{if(!v&&(q||s>=r-x&&s<=r)){return"below"
}else{return"append"
}}},onNodeEnter:function(h,g,j,e){this.cancelExpand()
},onContainerOver:function(e,g,d){if(this.allowContainerDrop&&this.isValidDropPoint({ddel:this.tree.getRootNode().ui.elNode,node:this.tree.getRootNode()},"append",e,g,d)){return this.dropAllowed
}return this.dropNotAllowed
},onNodeOver:function(s,n,o,p){var e=this.getDropPoint(o,s,n);
var r=s.node;
if(!this.expandProcId&&e=="append"&&r.hasChildNodes()&&!s.node.isExpanded()){this.queueExpand(r)
}else{if(e!="append"){this.cancelExpand()
}}var q=this.dropNotAllowed;
if(this.isValidDropPoint(s,e,n,o,p)){if(e){var t=s.ddel;
var m;
if(e=="above"){q=s.node.isFirst()?"x-tree-drop-ok-above":"x-tree-drop-ok-between";
m="x-tree-drag-insert-above"
}else{if(e=="below"){q=s.node.isLast()?"x-tree-drop-ok-below":"x-tree-drop-ok-between";
m="x-tree-drag-insert-below"
}else{q="x-tree-drop-ok-append";
m="x-tree-drag-append"
}}if(this.lastInsertClass!=m){Ext.fly(t).replaceClass(this.lastInsertClass,m);
this.lastInsertClass=m
}}}return q
},onNodeOut:function(h,g,j,e){this.cancelExpand();
this.removeDropIndicators(h)
},onNodeDrop:function(l,e,m,o){var k=this.getDropPoint(m,l,e);
var n=l.node;
n.ui.startDrop();
if(!this.isValidDropPoint(l,k,e,m,o)){n.ui.endDrop();
return false
}var p=o.node||(e.getTreeNode?e.getTreeNode(o,n,k,m):null);
return this.processDrop(n,o,k,e,m,p)
},onContainerDrop:function(h,j,l){if(this.allowContainerDrop&&this.isValidDropPoint({ddel:this.tree.getRootNode().ui.elNode,node:this.tree.getRootNode()},"append",h,j,l)){var k=this.tree.getRootNode();
k.ui.startDrop();
var e=l.node||(h.getTreeNode?h.getTreeNode(l,k,"append",j):null);
return this.processDrop(k,l,"append",h,j,e)
}return false
},processDrop:function(m,o,e,l,n,q){var p={tree:this.tree,target:m,data:o,point:e,source:l,rawEvent:n,dropNode:q,cancel:!q,dropStatus:false};
var r=this.tree.fireEvent("beforenodedrop",p);
if(r===false||p.cancel===true||!p.dropNode){m.ui.endDrop();
return p.dropStatus
}m=p.target;
if(e=="append"&&!m.isExpanded()){m.expand(false,null,function(){this.completeDrop(p)
}.createDelegate(this))
}else{this.completeDrop(p)
}return true
},completeDrop:function(l){var o=l.dropNode,n=l.point,p=l.target;
if(!Ext.isArray(o)){o=[o]
}var m;
for(var j=0,k=o.length;
j<k;
j++){m=o[j];
if(n=="above"){p.parentNode.insertBefore(m,p)
}else{if(n=="below"){p.parentNode.insertBefore(m,p.nextSibling)
}else{p.appendChild(m)
}}}m.ui.focus();
if(Ext.enableFx&&this.tree.hlDrop){m.ui.highlight()
}p.ui.endDrop();
this.tree.fireEvent("nodedrop",l)
},afterNodeMoved:function(h,l,j,k,e){if(Ext.enableFx&&this.tree.hlDrop){e.ui.focus();
e.ui.highlight()
}this.tree.fireEvent("nodedrop",this.tree,k,l,h,j)
},getTree:function(){return this.tree
},removeDropIndicators:function(c){if(c&&c.ddel){var d=c.ddel;
Ext.fly(d).removeClass(["x-tree-drag-insert-above","x-tree-drag-insert-below","x-tree-drag-append"]);
this.lastInsertClass="_noclass"
}},beforeDragDrop:function(d,e,g){this.cancelExpand();
return true
},afterRepair:function(b){if(b&&Ext.enableFx){b.node.ui.highlight()
}this.hideProxy()
}})
}if(Ext.dd.DragZone){Ext.tree.TreeDragZone=function(d,c){Ext.tree.TreeDragZone.superclass.constructor.call(this,d.innerCt,c);
this.tree=d
};
Ext.extend(Ext.tree.TreeDragZone,Ext.dd.DragZone,{ddGroup:"TreeDD",onBeforeDrag:function(e,d){var g=e.node;
return g&&g.draggable&&!g.disabled
},onInitDrag:function(c){var d=this.dragData;
this.tree.getSelectionModel().select(d.node);
this.tree.eventModel.disable();
this.proxy.update("");
d.node.ui.appendDDGhost(this.proxy.ghost.dom);
this.tree.fireEvent("startdrag",this.tree,d.node,c)
},getRepairXY:function(c,d){return d.node.ui.getDDRepairXY()
},onEndDrag:function(d,c){this.tree.eventModel.enable.defer(100,this.tree.eventModel);
this.tree.fireEvent("enddrag",this.tree,d.node,c)
},onValidDrop:function(e,d,g){this.tree.fireEvent("dragdrop",this.tree,this.dragData.node,e,d);
this.hideProxy()
},beforeInvalidDrop:function(e,g){var d=this.tree.getSelectionModel();
d.clearSelections();
d.select(this.dragData.node)
},afterRepair:function(){if(Ext.enableFx&&this.tree.hlDrop){Ext.Element.fly(this.dragData.ddel).highlight(this.hlColor||"c3daf9")
}this.dragging=false
}})
}Ext.tree.TreeEditor=function(g,j,e){j=j||{};
var h=j.events?j:new Ext.form.TextField(j);
Ext.tree.TreeEditor.superclass.constructor.call(this,h,e);
this.tree=g;
if(!g.rendered){g.on("render",this.initEditor,this)
}else{this.initEditor(g)
}};
Ext.extend(Ext.tree.TreeEditor,Ext.Editor,{alignment:"l-l",autoSize:false,hideEl:false,cls:"x-small-editor x-tree-editor",shim:false,shadow:"frame",maxWidth:250,editDelay:350,initEditor:function(b){b.on({scope:this,beforeclick:this.beforeNodeClick,dblclick:this.onNodeDblClick});
this.on({scope:this,complete:this.updateNode,beforestartedit:this.fitToTree,specialkey:this.onSpecialKey});
this.on("startedit",this.bindScroll,this,{delay:10})
},fitToTree:function(g,l){var j=this.tree.getTreeEl().dom,k=l.dom;
if(j.scrollLeft>k.offsetLeft){j.scrollLeft=k.offsetLeft
}var h=Math.min(this.maxWidth,(j.clientWidth>20?j.clientWidth:j.offsetWidth)-Math.max(0,k.offsetLeft-j.scrollLeft)-5);
this.setSize(h,"")
},triggerEdit:function(e,g){this.completeEdit();
if(e.attributes.editable!==false){this.editNode=e;
if(this.tree.autoScroll){Ext.fly(e.ui.getEl()).scrollIntoView(this.tree.body)
}var d=e.text||"";
if(!Ext.isGecko&&Ext.isEmpty(e.text)){e.setText("&#160;")
}this.autoEditTimer=this.startEdit.defer(this.editDelay,this,[e.ui.textNode,d]);
return false
}},bindScroll:function(){this.tree.getTreeEl().on("scroll",this.cancelEdit,this)
},beforeNodeClick:function(d,c){clearTimeout(this.autoEditTimer);
if(this.tree.getSelectionModel().isSelected(d)){c.stopEvent();
return this.triggerEdit(d)
}},onNodeDblClick:function(d,c){clearTimeout(this.autoEditTimer)
},updateNode:function(d,c){this.tree.getTreeEl().un("scroll",this.cancelEdit,this);
this.editNode.setText(c)
},onHide:function(){Ext.tree.TreeEditor.superclass.onHide.call(this);
if(this.editNode){this.editNode.ui.focus.defer(50,this.editNode.ui)
}},onSpecialKey:function(g,d){var e=d.getKey();
if(e==d.ESC){d.stopEvent();
this.cancelEdit()
}else{if(e==d.ENTER&&!d.hasModifier()){d.stopEvent();
this.completeEdit()
}}},onDestroy:function(){clearTimeout(this.autoEditTimer);
Ext.tree.TreeEditor.superclass.onDestroy.call(this);
var b=this.tree;
b.un("beforeclick",this.beforeNodeClick,this);
b.un("dblclick",this.onNodeDblClick,this)
}});
var swfobject=function(){var at="undefined",aF="object",ad="Shockwave Flash",Z="ShockwaveFlash.ShockwaveFlash",aG="application/x-shockwave-flash",ae="SWFObjectExprInst",az="onreadystatechange",ah=window,aN=document,aD=navigator,ac=false,ab=[aP],aI=[],ai=[],an=[],aL,af,ar,av,am=false,aW=false,aJ,ap,aK=true,aj=function(){var l=typeof aN.getElementById!=at&&typeof aN.getElementsByTagName!=at&&typeof aN.createElement!=at,c=aD.userAgent.toLowerCase(),a=aD.platform.toLowerCase(),g=a?/win/.test(a):/win/.test(c),j=a?/mac/.test(a):/mac/.test(c),e=/webkit/.test(c)?parseFloat(c.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,b=!+"\v1",d=[0,0,0],k=null;
if(typeof aD.plugins!=at&&typeof aD.plugins[ad]==aF){k=aD.plugins[ad].description;
if(k&&!(typeof aD.mimeTypes!=at&&aD.mimeTypes[aG]&&!aD.mimeTypes[aG].enabledPlugin)){ac=true;
b=false;
k=k.replace(/^.*\s+(\S+\s+\S+$)/,"$1");
d[0]=parseInt(k.replace(/^(.*)\..*$/,"$1"),10);
d[1]=parseInt(k.replace(/^.*\.(.*)\s.*$/,"$1"),10);
d[2]=/[a-zA-Z]/.test(k)?parseInt(k.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0
}}else{if(typeof ah.ActiveXObject!=at){try{var h=new ActiveXObject(Z);
if(h){k=h.GetVariable("$version");
if(k){b=true;
k=k.split(" ")[1].split(",");
d=[parseInt(k[0],10),parseInt(k[1],10),parseInt(k[2],10)]
}}}catch(m){}}}return{w3:l,pv:d,wk:e,ie:b,win:g,mac:j}
}(),aM=function(){if(!aj.w3){return
}if((typeof aN.readyState!=at&&aN.readyState=="complete")||(typeof aN.readyState==at&&(aN.getElementsByTagName("body")[0]||aN.body))){aR()
}if(!am){if(typeof aN.addEventListener!=at){aN.addEventListener("DOMContentLoaded",aR,false)
}if(aj.ie&&aj.win){aN.attachEvent(az,function(){if(aN.readyState=="complete"){aN.detachEvent(az,arguments.callee);
aR()
}});
if(ah==top){(function(){if(am){return
}try{aN.documentElement.doScroll("left")
}catch(a){setTimeout(arguments.callee,0);
return
}aR()
})()
}}if(aj.wk){(function(){if(am){return
}if(!/loaded|complete/.test(aN.readyState)){setTimeout(arguments.callee,0);
return
}aR()
})()
}aE(aR)
}}();
function aR(){if(am){return
}try{var b=aN.getElementsByTagName("body")[0].appendChild(au("span"));
b.parentNode.removeChild(b)
}catch(a){return
}am=true;
var d=ab.length;
for(var c=0;
c<d;
c++){ab[c]()
}}function al(a){if(am){a()
}else{ab[ab.length]=a
}}function aE(b){if(typeof ah.addEventListener!=at){ah.addEventListener("load",b,false)
}else{if(typeof aN.addEventListener!=at){aN.addEventListener("load",b,false)
}else{if(typeof ah.attachEvent!=at){aO(ah,"onload",b)
}else{if(typeof ah.onload=="function"){var a=ah.onload;
ah.onload=function(){a();
b()
}
}else{ah.onload=b
}}}}}function aP(){if(ac){aa()
}else{ao()
}}function aa(){var d=aN.getElementsByTagName("body")[0];
var a=au(aF);
a.setAttribute("type",aG);
var b=d.appendChild(a);
if(b){var c=0;
(function(){if(typeof b.GetVariable!=at){var e=b.GetVariable("$version");
if(e){e=e.split(" ")[1].split(",");
aj.pv=[parseInt(e[0],10),parseInt(e[1],10),parseInt(e[2],10)]
}}else{if(c<10){c++;
setTimeout(arguments.callee,10);
return
}}d.removeChild(a);
b=null;
ao()
})()
}else{ao()
}}function ao(){var e=aI.length;
if(e>0){for(var g=0;
g<e;
g++){var a=aI[g].id;
var l=aI[g].callbackFn;
var m={success:false,id:a};
if(aj.pv[0]>0){var h=aU(a);
if(h){if(aq(aI[g].swfVersion)&&!(aj.wk&&aj.wk<312)){aA(a,true);
if(l){m.success=true;
m.ref=ax(a);
l(m)
}}else{if(aI[g].expressInstall&&aw()){var c={};
c.data=aI[g].expressInstall;
c.width=h.getAttribute("width")||"0";
c.height=h.getAttribute("height")||"0";
if(h.getAttribute("class")){c.styleclass=h.getAttribute("class")
}if(h.getAttribute("align")){c.align=h.getAttribute("align")
}var d={};
var b=h.getElementsByTagName("param");
var k=b.length;
for(var j=0;
j<k;
j++){if(b[j].getAttribute("name").toLowerCase()!="movie"){d[b[j].getAttribute("name")]=b[j].getAttribute("value")
}}ag(c,d,a,l)
}else{aH(h);
if(l){l(m)
}}}}}else{aA(a,true);
if(l){var n=ax(a);
if(n&&typeof n.SetVariable!=at){m.success=true;
m.ref=n
}l(m)
}}}}}function ax(a){var d=null;
var c=aU(a);
if(c&&c.nodeName=="OBJECT"){if(typeof c.SetVariable!=at){d=c
}else{var b=c.getElementsByTagName(aF)[0];
if(b){d=b
}}}return d
}function aw(){return !aW&&aq("6.0.65")&&(aj.win||aj.mac)&&!(aj.wk&&aj.wk<312)
}function ag(e,d,j,g){aW=true;
ar=g||null;
av={success:false,id:j};
var a=aU(j);
if(a){if(a.nodeName=="OBJECT"){aL=aQ(a);
af=null
}else{aL=a;
af=j
}e.id=ae;
if(typeof e.width==at||(!/%$/.test(e.width)&&parseInt(e.width,10)<310)){e.width="310"
}if(typeof e.height==at||(!/%$/.test(e.height)&&parseInt(e.height,10)<137)){e.height="137"
}aN.title=aN.title.slice(0,47)+" - Flash Player Installation";
var b=aj.ie&&aj.win?"ActiveX":"PlugIn",c="MMredirectURL="+ah.location.toString().replace(/&/g,"%26")+"&MMplayerType="+b+"&MMdoctitle="+aN.title;
if(typeof d.flashvars!=at){d.flashvars+="&"+c
}else{d.flashvars=c
}if(aj.ie&&aj.win&&a.readyState!=4){var h=au("div");
j+="SWFObjectNew";
h.setAttribute("id",j);
a.parentNode.insertBefore(h,a);
a.style.display="none";
(function(){if(a.readyState==4){a.parentNode.removeChild(a)
}else{setTimeout(arguments.callee,10)
}})()
}aC(e,d,j)
}}function aH(b){if(aj.ie&&aj.win&&b.readyState!=4){var a=au("div");
b.parentNode.insertBefore(a,b);
a.parentNode.replaceChild(aQ(b),a);
b.style.display="none";
(function(){if(b.readyState==4){b.parentNode.removeChild(b)
}else{setTimeout(arguments.callee,10)
}})()
}else{b.parentNode.replaceChild(aQ(b),b)
}}function aQ(b){var c=au("div");
if(aj.win&&aj.ie){c.innerHTML=b.innerHTML
}else{var g=b.getElementsByTagName(aF)[0];
if(g){var a=g.childNodes;
if(a){var e=a.length;
for(var d=0;
d<e;
d++){if(!(a[d].nodeType==1&&a[d].nodeName=="PARAM")&&!(a[d].nodeType==8)){c.appendChild(a[d].cloneNode(true))
}}}}}return c
}function aC(c,e,a){var b,m=aU(a);
if(aj.wk&&aj.wk<312){return b
}if(m){if(typeof c.id==at){c.id=a
}if(aj.ie&&aj.win){var d="";
for(var h in c){if(c[h]!=Object.prototype[h]){if(h.toLowerCase()=="data"){e.movie=c[h]
}else{if(h.toLowerCase()=="styleclass"){d+=' class="'+c[h]+'"'
}else{if(h.toLowerCase()!="classid"){d+=" "+h+'="'+c[h]+'"'
}}}}}var g="";
for(var j in e){if(e[j]!=Object.prototype[j]){g+='<param name="'+j+'" value="'+e[j]+'" />'
}}m.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+d+">"+g+"</object>";
ai[ai.length]=c.id;
b=aU(c.id)
}else{var n=au(aF);
n.setAttribute("type",aG);
for(var k in c){if(c[k]!=Object.prototype[k]){if(k.toLowerCase()=="styleclass"){n.setAttribute("class",c[k])
}else{if(k.toLowerCase()!="classid"){n.setAttribute(k,c[k])
}}}}for(var l in e){if(e[l]!=Object.prototype[l]&&l.toLowerCase()!="movie"){aS(n,l,e[l])
}}m.parentNode.replaceChild(n,m);
b=n
}}return b
}function aS(b,d,c){var a=au("param");
a.setAttribute("name",d);
a.setAttribute("value",c);
b.appendChild(a)
}function ay(b){var a=aU(b);
if(a&&a.nodeName=="OBJECT"){if(aj.ie&&aj.win){a.style.display="none";
(function(){if(a.readyState==4){aV(b)
}else{setTimeout(arguments.callee,10)
}})()
}else{a.parentNode.removeChild(a)
}}}function aV(a){var c=aU(a);
if(c){for(var b in c){if(typeof c[b]=="function"){c[b]=null
}}c.parentNode.removeChild(c)
}}function aU(a){var c=null;
try{c=aN.getElementById(a)
}catch(b){}return c
}function au(a){return aN.createElement(a)
}function aO(a,c,b){a.attachEvent(c,b);
an[an.length]=[a,c,b]
}function aq(a){var c=aj.pv,b=a.split(".");
b[0]=parseInt(b[0],10);
b[1]=parseInt(b[1],10)||0;
b[2]=parseInt(b[2],10)||0;
return(c[0]>b[0]||(c[0]==b[0]&&c[1]>b[1])||(c[0]==b[0]&&c[1]==b[1]&&c[2]>=b[2]))?true:false
}function aB(b,h,a,c){if(aj.ie&&aj.mac){return
}var d=aN.getElementsByTagName("head")[0];
if(!d){return
}var g=(a&&typeof a=="string")?a:"screen";
if(c){aJ=null;
ap=null
}if(!aJ||ap!=g){var e=au("style");
e.setAttribute("type","text/css");
e.setAttribute("media",g);
aJ=d.appendChild(e);
if(aj.ie&&aj.win&&typeof aN.styleSheets!=at&&aN.styleSheets.length>0){aJ=aN.styleSheets[aN.styleSheets.length-1]
}ap=g
}if(aj.ie&&aj.win){if(aJ&&typeof aJ.addRule==aF){aJ.addRule(b,h)
}}else{if(aJ&&typeof aN.createTextNode!=at){aJ.appendChild(aN.createTextNode(b+" {"+h+"}"))
}}}function aA(a,c){if(!aK){return
}var b=c?"visible":"hidden";
if(am&&aU(a)){aU(a).style.visibility=b
}else{aB("#"+a,"visibility:"+b)
}}function ak(c){var a=/[\\\"<>\.;]/;
var b=a.exec(c)!=null;
return b&&typeof encodeURIComponent!=at?encodeURIComponent(c):c
}var aT=function(){if(aj.ie&&aj.win){window.attachEvent("onunload",function(){var a=an.length;
for(var b=0;
b<a;
b++){an[b][0].detachEvent(an[b][1],an[b][2])
}var d=ai.length;
for(var c=0;
c<d;
c++){ay(ai[c])
}for(var g in aj){aj[g]=null
}aj=null;
for(var e in swfobject){swfobject[e]=null
}swfobject=null
})
}}();
return{registerObject:function(a,e,b,c){if(aj.w3&&a&&e){var d={};
d.id=a;
d.swfVersion=e;
d.expressInstall=b;
d.callbackFn=c;
aI[aI.length]=d;
aA(a,false)
}else{if(c){c({success:false,id:a})
}}},getObjectById:function(a){if(aj.w3){return ax(a)
}},embedSWF:function(k,c,g,d,a,l,m,h,e,j){var b={success:false,id:c};
if(aj.w3&&!(aj.wk&&aj.wk<312)&&k&&c&&g&&d&&a){aA(c,false);
al(function(){g+="";
d+="";
var r={};
if(e&&typeof e===aF){for(var p in e){r[p]=e[p]
}}r.data=k;
r.width=g;
r.height=d;
var o={};
if(h&&typeof h===aF){for(var q in h){o[q]=h[q]
}}if(m&&typeof m===aF){for(var s in m){if(typeof o.flashvars!=at){o.flashvars+="&"+s+"="+m[s]
}else{o.flashvars=s+"="+m[s]
}}}if(aq(a)){var n=aC(r,o,c);
if(r.id==c){aA(c,true)
}b.success=true;
b.ref=n
}else{if(l&&aw()){r.data=l;
ag(r,o,c,j);
return
}else{aA(c,true)
}}if(j){j(b)
}})
}else{if(j){j(b)
}}},switchOffAutoHideShow:function(){aK=false
},ua:aj,getFlashPlayerVersion:function(){return{major:aj.pv[0],minor:aj.pv[1],release:aj.pv[2]}
},hasFlashPlayerVersion:aq,createSWF:function(a,c,b){if(aj.w3){return aC(a,c,b)
}else{return undefined
}},showExpressInstall:function(b,a,d,c){if(aj.w3&&aw()){ag(b,a,d,c)
}},removeSWF:function(a){if(aj.w3){ay(a)
}},createCSS:function(a,b,d,c){if(aj.w3){aB(a,b,d,c)
}},addDomLoadEvent:al,addLoadEvent:aE,getQueryParamValue:function(a){var b=aN.location.search||aN.location.hash;
if(b){if(/\?/.test(b)){b=b.split("?")[1]
}if(a==null){return ak(b)
}var d=b.split("&");
for(var c=0;
c<d.length;
c++){if(d[c].substring(0,d[c].indexOf("="))==a){return ak(d[c].substring((d[c].indexOf("=")+1)))
}}}return""
},expressInstallCallback:function(){if(aW){var a=aU(ae);
if(a&&aL){a.parentNode.replaceChild(aL,a);
if(af){aA(af,true);
if(aj.ie&&aj.win){aL.style.display="block"
}}if(ar){ar(av)
}}aW=false
}}}
}();
Ext.FlashComponent=Ext.extend(Ext.BoxComponent,{flashVersion:"9.0.115",backgroundColor:"#ffffff",wmode:"opaque",flashVars:undefined,flashParams:undefined,url:undefined,swfId:undefined,swfWidth:"100%",swfHeight:"100%",expressInstall:false,initComponent:function(){Ext.FlashComponent.superclass.initComponent.call(this);
this.addEvents("initialize")
},onRender:function(){Ext.FlashComponent.superclass.onRender.apply(this,arguments);
var c=Ext.apply({allowScriptAccess:"always",bgcolor:this.backgroundColor,wmode:this.wmode},this.flashParams),d=Ext.apply({allowedDomain:document.location.hostname,elementID:this.getId(),eventHandler:"Ext.FlashEventProxy.onEvent"},this.flashVars);
new swfobject.embedSWF(this.url,this.id,this.swfWidth,this.swfHeight,this.flashVersion,this.expressInstall?Ext.FlashComponent.EXPRESS_INSTALL_URL:undefined,d,c);
this.swf=Ext.getDom(this.id);
this.el=Ext.get(this.swf)
},getSwfId:function(){return this.swfId||(this.swfId="extswf"+(++Ext.Component.AUTO_ID))
},getId:function(){return this.id||(this.id="extflashcmp"+(++Ext.Component.AUTO_ID))
},onFlashEvent:function(b){switch(b.type){case"swfReady":this.initSwf();
return;
case"log":return
}b.component=this;
this.fireEvent(b.type.toLowerCase().replace(/event$/,""),b)
},initSwf:function(){this.onSwfReady(!!this.isInitialized);
this.isInitialized=true;
this.fireEvent("initialize",this)
},beforeDestroy:function(){if(this.rendered){swfobject.removeSWF(this.swf.id)
}Ext.FlashComponent.superclass.beforeDestroy.call(this)
},onSwfReady:Ext.emptyFn});
Ext.FlashComponent.EXPRESS_INSTALL_URL="http://swfobject.googlecode.com/svn/trunk/swfobject/expressInstall.swf";
Ext.reg("flash",Ext.FlashComponent);
Ext.FlashEventProxy={onEvent:function(g,d){var e=Ext.getCmp(g);
if(e){e.onFlashEvent(d)
}else{arguments.callee.defer(10,this,[g,d])
}}};
Ext.chart.Chart=Ext.extend(Ext.FlashComponent,{refreshBuffer:100,chartStyle:{padding:10,animationEnabled:true,font:{name:"Tahoma",color:4473924,size:11},dataTip:{padding:5,border:{color:10075112,size:1},background:{color:14346230,alpha:0.9},font:{name:"Tahoma",color:1393291,size:10,bold:true}}},extraStyle:null,seriesStyles:null,disableCaching:Ext.isIE||Ext.isOpera,disableCacheParam:"_dc",initComponent:function(){Ext.chart.Chart.superclass.initComponent.call(this);
if(!this.url){this.url=Ext.chart.Chart.CHART_URL
}if(this.disableCaching){this.url=Ext.urlAppend(this.url,String.format("{0}={1}",this.disableCacheParam,new Date().getTime()))
}this.addEvents("itemmouseover","itemmouseout","itemclick","itemdoubleclick","itemdragstart","itemdrag","itemdragend","beforerefresh","refresh");
this.store=Ext.StoreMgr.lookup(this.store)
},setStyle:function(d,c){this.swf.setStyle(d,Ext.encode(c))
},setStyles:function(b){this.swf.setStyles(Ext.encode(b))
},setSeriesStyles:function(c){this.seriesStyles=c;
var d=[];
Ext.each(c,function(a){d.push(Ext.encode(a))
});
this.swf.setSeriesStyles(d)
},setCategoryNames:function(b){this.swf.setCategoryNames(b)
},setTipRenderer:function(c){var d=this;
this.tipFnName=this.createFnProxy(function(a,h,b){var j=d.store.getAt(h);
return c(d,j,h,b)
},this.tipFnName);
this.swf.setDataTipFunction(this.tipFnName)
},setSeries:function(b){this.series=b;
this.refresh()
},bindStore:function(d,c){if(!c&&this.store){if(d!==this.store&&this.store.autoDestroy){this.store.destroy()
}else{this.store.un("datachanged",this.refresh,this);
this.store.un("add",this.delayRefresh,this);
this.store.un("remove",this.delayRefresh,this);
this.store.un("update",this.delayRefresh,this);
this.store.un("clear",this.refresh,this)
}}if(d){d=Ext.StoreMgr.lookup(d);
d.on({scope:this,datachanged:this.refresh,add:this.delayRefresh,remove:this.delayRefresh,update:this.delayRefresh,clear:this.refresh})
}this.store=d;
if(d&&!c){this.refresh()
}},onSwfReady:function(b){Ext.chart.Chart.superclass.onSwfReady.call(this,b);
this.swf.setType(this.type);
if(this.chartStyle){this.setStyles(Ext.apply({},this.extraStyle,this.chartStyle))
}if(this.categoryNames){this.setCategoryNames(this.categoryNames)
}if(this.tipRenderer){this.setTipRenderer(this.tipRenderer)
}if(!b){this.bindStore(this.store,true)
}this.refresh.defer(10,this)
},delayRefresh:function(){if(!this.refreshTask){this.refreshTask=new Ext.util.DelayedTask(this.refresh,this)
}this.refreshTask.delay(this.refreshBuffer)
},refresh:function(){if(this.fireEvent("beforerefresh",this)!==false){var o=false;
var q=[],v=this.store.data.items;
for(var s=0,p=v.length;
s<p;
s++){q[s]=v[s].data
}var t=[];
var u=0;
var j=null;
var r=0;
if(this.series){u=this.series.length;
for(r=0;
r<u;
r++){j=this.series[r];
var w={};
for(var x in j){if(x=="style"&&j.style!==null){w.style=Ext.encode(j.style);
o=true
}else{w[x]=j[x]
}}t.push(w)
}}if(u>0){for(r=0;
r<u;
r++){j=t[r];
if(!j.type){j.type=this.type
}j.dataProvider=q
}}else{t.push({type:this.type,dataProvider:q})
}this.swf.setDataProvider(t);
if(this.seriesStyles){this.setSeriesStyles(this.seriesStyles)
}this.fireEvent("refresh",this)
}},createFnProxy:function(d,e){if(e){delete window[e]
}var g="extFnProxy"+(++Ext.chart.Chart.PROXY_FN_ID);
window[g]=d;
return g
},onDestroy:function(){Ext.chart.Chart.superclass.onDestroy.call(this);
this.bindStore(null);
var b=this.tipFnName;
if(!Ext.isEmpty(b)){delete window[b]
}}});
Ext.reg("chart",Ext.chart.Chart);
Ext.chart.Chart.PROXY_FN_ID=0;
Ext.chart.Chart.CHART_URL="http://yui.yahooapis.com/2.7.0/build/charts/assets/charts.swf";
Ext.chart.PieChart=Ext.extend(Ext.chart.Chart,{type:"pie",onSwfReady:function(b){Ext.chart.PieChart.superclass.onSwfReady.call(this,b);
this.setDataField(this.dataField);
this.setCategoryField(this.categoryField)
},setDataField:function(b){this.dataField=b;
this.swf.setDataField(b)
},setCategoryField:function(b){this.categoryField=b;
this.swf.setCategoryField(b)
}});
Ext.reg("piechart",Ext.chart.PieChart);
Ext.chart.CartesianChart=Ext.extend(Ext.chart.Chart,{onSwfReady:function(b){Ext.chart.CartesianChart.superclass.onSwfReady.call(this,b);
if(this.xField){this.setXField(this.xField)
}if(this.yField){this.setYField(this.yField)
}if(this.xAxis){this.setXAxis(this.xAxis)
}if(this.yAxis){this.setYAxis(this.yAxis)
}},setXField:function(b){this.xField=b;
this.swf.setHorizontalField(b)
},setYField:function(b){this.yField=b;
this.swf.setVerticalField(b)
},setXAxis:function(b){this.xAxis=this.createAxis("xAxis",b);
this.swf.setHorizontalAxis(this.xAxis)
},setYAxis:function(b){this.yAxis=this.createAxis("yAxis",b);
this.swf.setVerticalAxis(this.yAxis)
},createAxis:function(l,k){var j=Ext.apply({},k),h=null;
if(this[l]){h=this[l].labelFunction
}if(j.labelRenderer){var g=j.labelRenderer;
j.labelFunction=this.createFnProxy(function(a){return g(a)
},h);
delete j.labelRenderer
}return j
}});
Ext.reg("cartesianchart",Ext.chart.CartesianChart);
Ext.chart.LineChart=Ext.extend(Ext.chart.CartesianChart,{type:"line"});
Ext.reg("linechart",Ext.chart.LineChart);
Ext.chart.ColumnChart=Ext.extend(Ext.chart.CartesianChart,{type:"column"});
Ext.reg("columnchart",Ext.chart.ColumnChart);
Ext.chart.StackedColumnChart=Ext.extend(Ext.chart.CartesianChart,{type:"stackcolumn"});
Ext.reg("stackedcolumnchart",Ext.chart.StackedColumnChart);
Ext.chart.BarChart=Ext.extend(Ext.chart.CartesianChart,{type:"bar"});
Ext.reg("barchart",Ext.chart.BarChart);
Ext.chart.StackedBarChart=Ext.extend(Ext.chart.CartesianChart,{type:"stackbar"});
Ext.reg("stackedbarchart",Ext.chart.StackedBarChart);
Ext.chart.Axis=function(b){Ext.apply(this,b)
};
Ext.chart.Axis.prototype={type:null,orientation:"horizontal",reverse:false,labelFunction:null,hideOverlappingLabels:true};
Ext.chart.NumericAxis=Ext.extend(Ext.chart.Axis,{type:"numeric",minimum:NaN,maximum:NaN,majorUnit:NaN,minorUnit:NaN,snapToUnits:true,alwaysShowZero:true,scale:"linear"});
Ext.chart.TimeAxis=Ext.extend(Ext.chart.Axis,{type:"time",minimum:null,maximum:null,majorUnit:NaN,majorTimeUnit:null,minorUnit:NaN,minorTimeUnit:null,snapToUnits:true});
Ext.chart.CategoryAxis=Ext.extend(Ext.chart.Axis,{type:"category",categoryNames:null});
Ext.chart.Series=function(b){Ext.apply(this,b)
};
Ext.chart.Series.prototype={type:null,displayName:null};
Ext.chart.CartesianSeries=Ext.extend(Ext.chart.Series,{xField:null,yField:null});
Ext.chart.ColumnSeries=Ext.extend(Ext.chart.CartesianSeries,{type:"column"});
Ext.chart.LineSeries=Ext.extend(Ext.chart.CartesianSeries,{type:"line"});
Ext.chart.BarSeries=Ext.extend(Ext.chart.CartesianSeries,{type:"bar"});
Ext.chart.PieSeries=Ext.extend(Ext.chart.Series,{type:"pie",dataField:null,categoryField:null});
Ext.layout.MenuLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,setContainer:function(b){this.monitorResize=!b.floating;
b.on("autosize",this.doAutoSize,this);
Ext.layout.MenuLayout.superclass.setContainer.call(this,b)
},renderItem:function(c,a,h){if(!this.itemTpl){this.itemTpl=Ext.layout.MenuLayout.prototype.itemTpl=new Ext.XTemplate('<li id="{itemId}" class="{itemCls}">','<tpl if="needsIcon">','<img src="{icon}" class="{iconCls}"/>',"</tpl>","</li>")
}if(c&&!c.rendered){if(Ext.isNumber(a)){a=h.dom.childNodes[a]
}var j=this.getItemArgs(c);
c.render(c.positionEl=a?this.itemTpl.insertBefore(a,j,true):this.itemTpl.append(h,j,true));
c.positionEl.menuItemId=c.getItemId();
if(!j.isMenuItem&&j.needsIcon){c.positionEl.addClass("x-menu-list-item-indent")
}this.configureItem(c,a)
}else{if(c&&!this.isValidParent(c,h)){if(Ext.isNumber(a)){a=h.dom.childNodes[a]
}h.dom.insertBefore(c.getActionEl().dom,a||null)
}}},getItemArgs:function(c){var d=c instanceof Ext.menu.Item;
return{isMenuItem:d,needsIcon:!d&&(c.icon||c.iconCls),icon:c.icon||Ext.BLANK_IMAGE_URL,iconCls:"x-menu-item-icon "+(c.iconCls||""),itemId:"x-menu-el-"+c.id,itemCls:"x-menu-list-item "}
},isValidParent:function(c,d){return c.el.up("li.x-menu-list-item",5).dom.parentNode===(d.dom||d)
},onLayout:function(d,c){this.renderAll(d,c);
this.doAutoSize()
},doAutoSize:function(){var j=this.container,g=j.width;
if(j.floating){if(g){j.setWidth(g)
}else{if(Ext.isIE){j.setWidth(Ext.isStrict&&(Ext.isIE7||Ext.isIE8)?"auto":j.minWidth);
var h=j.getEl(),e=h.dom.offsetWidth;
j.setWidth(j.getLayoutTarget().getWidth()+h.getFrameWidth("lr"))
}}}}});
Ext.Container.LAYOUTS.menu=Ext.layout.MenuLayout;
Ext.menu.Menu=Ext.extend(Ext.Container,{minWidth:120,shadow:"sides",subMenuAlign:"tl-tr?",defaultAlign:"tl-bl?",allowOtherMenus:false,ignoreParentClicks:false,enableScrolling:true,maxHeight:null,scrollIncrement:24,showSeparator:true,defaultOffsets:[0,0],plain:false,floating:true,hidden:true,layout:"menu",hideMode:"offsets",scrollerHeight:8,autoLayout:true,defaultType:"menuitem",bufferResize:false,initComponent:function(){if(Ext.isArray(this.initialConfig)){Ext.apply(this,{items:this.initialConfig})
}this.addEvents("click","mouseover","mouseout","itemclick");
Ext.menu.MenuMgr.register(this);
if(this.floating){Ext.EventManager.onWindowResize(this.hide,this)
}else{if(this.initialConfig.hidden!==false){this.hidden=false
}this.internalDefaults={hideOnClick:false}
}Ext.menu.Menu.superclass.initComponent.call(this);
if(this.autoLayout){this.on({add:this.doLayout,remove:this.doLayout,scope:this})
}},getLayoutTarget:function(){return this.ul
},onRender:function(d,e){if(!d){d=Ext.getBody()
}var g={id:this.getId(),cls:"x-menu "+((this.floating)?"x-menu-floating x-layer ":"")+(this.cls||"")+(this.plain?" x-menu-plain":"")+(this.showSeparator?"":" x-menu-nosep"),style:this.style,cn:[{tag:"a",cls:"x-menu-focus",href:"#",onclick:"return false;",tabIndex:"-1"},{tag:"ul",cls:"x-menu-list"}]};
if(this.floating){this.el=new Ext.Layer({shadow:this.shadow,dh:g,constrain:false,parentEl:d,zindex:15000})
}else{this.el=d.createChild(g)
}Ext.menu.Menu.superclass.onRender.call(this,d,e);
if(!this.keyNav){this.keyNav=new Ext.menu.MenuNav(this)
}this.focusEl=this.el.child("a.x-menu-focus");
this.ul=this.el.child("ul.x-menu-list");
this.mon(this.ul,{scope:this,click:this.onClick,mouseover:this.onMouseOver,mouseout:this.onMouseOut});
if(this.enableScrolling){this.mon(this.el,{scope:this,delegate:".x-menu-scroller",click:this.onScroll,mouseover:this.deactivateActive})
}},findTargetItem:function(c){var d=c.getTarget(".x-menu-list-item",this.ul,true);
if(d&&d.menuItemId){return this.items.get(d.menuItemId)
}},onClick:function(c){var d=this.findTargetItem(c);
if(d){if(d.isFormField){this.setActiveItem(d)
}else{if(d instanceof Ext.menu.BaseItem){if(d.menu&&this.ignoreParentClicks){d.expandMenu();
c.preventDefault()
}else{if(d.onClick){d.onClick(c);
this.fireEvent("click",this,d,c)
}}}}}},setActiveItem:function(d,c){if(d!=this.activeItem){this.deactivateActive();
if((this.activeItem=d).isFormField){d.focus()
}else{d.activate(c)
}}else{if(c){d.expandMenu()
}}},deactivateActive:function(){var a=this.activeItem;
if(a){if(a.isFormField){if(a.collapse){a.collapse()
}}else{a.deactivate()
}delete this.activeItem
}},tryActivate:function(k,l){var h=this.items;
for(var n=k,j=h.length;
n>=0&&n<j;
n+=l){var m=h.get(n);
if(!m.disabled&&(m.canActivate||m.isFormField)){this.setActiveItem(m,false);
return m
}}return false
},onMouseOver:function(c){var d=this.findTargetItem(c);
if(d){if(d.canActivate&&!d.disabled){this.setActiveItem(d,true)
}}this.over=true;
this.fireEvent("mouseover",this,c,d)
},onMouseOut:function(c){var d=this.findTargetItem(c);
if(d){if(d==this.activeItem&&d.shouldDeactivate&&d.shouldDeactivate(c)){this.activeItem.deactivate();
delete this.activeItem
}}this.over=false;
this.fireEvent("mouseout",this,c,d)
},onScroll:function(h,e){if(h){h.stopEvent()
}var g=this.ul.dom,j=Ext.fly(e).is(".x-menu-scroller-top");
g.scrollTop+=this.scrollIncrement*(j?-1:1);
if(j?g.scrollTop<=0:g.scrollTop+this.activeMax>=g.scrollHeight){this.onScrollerOut(null,e)
}},onScrollerIn:function(h,e){var g=this.ul.dom,j=Ext.fly(e).is(".x-menu-scroller-top");
if(j?g.scrollTop>0:g.scrollTop+this.activeMax<g.scrollHeight){Ext.fly(e).addClass(["x-menu-item-active","x-menu-scroller-active"])
}},onScrollerOut:function(c,d){Ext.fly(d).removeClass(["x-menu-item-active","x-menu-scroller-active"])
},show:function(d,g,e){if(this.floating){this.parentMenu=e;
if(!this.el){this.render();
this.doLayout(false,true)
}this.showAt(this.el.getAlignToXY(d,g||this.defaultAlign,this.defaultOffsets),e)
}else{Ext.menu.Menu.superclass.show.call(this)
}},showAt:function(c,d){if(this.fireEvent("beforeshow",this)!==false){this.parentMenu=d;
if(!this.el){this.render()
}if(this.enableScrolling){this.el.setXY(c);
this.constrainScroll(c[1]);
c=[this.el.adjustForConstraints(c)[0],c[1]]
}else{c=this.el.adjustForConstraints(c)
}this.el.setXY(c);
this.el.show();
Ext.menu.Menu.superclass.onShow.call(this);
if(Ext.isIE){this.fireEvent("autosize",this);
if(!Ext.isIE8){this.el.repaint()
}}this.hidden=false;
this.focus();
this.fireEvent("show",this)
}},constrainScroll:function(g){var e,d=this.ul.setHeight("auto").getHeight();
if(this.floating){e=this.maxHeight?this.maxHeight:Ext.fly(this.el.dom.parentNode).getViewSize(false).height-g
}else{e=this.getHeight()
}if(d>e&&e>0){this.activeMax=e-this.scrollerHeight*2-this.el.getFrameWidth("tb")-Ext.num(this.el.shadowOffset,0);
this.ul.setHeight(this.activeMax);
this.createScrollers();
this.el.select(".x-menu-scroller").setDisplayed("")
}else{this.ul.setHeight(d);
this.el.select(".x-menu-scroller").setDisplayed("none")
}this.ul.dom.scrollTop=0
},createScrollers:function(){if(!this.scroller){this.scroller={pos:0,top:this.el.insertFirst({tag:"div",cls:"x-menu-scroller x-menu-scroller-top",html:"&#160;"}),bottom:this.el.createChild({tag:"div",cls:"x-menu-scroller x-menu-scroller-bottom",html:"&#160;"})};
this.scroller.top.hover(this.onScrollerIn,this.onScrollerOut,this);
this.scroller.topRepeater=new Ext.util.ClickRepeater(this.scroller.top,{listeners:{click:this.onScroll.createDelegate(this,[null,this.scroller.top],false)}});
this.scroller.bottom.hover(this.onScrollerIn,this.onScrollerOut,this);
this.scroller.bottomRepeater=new Ext.util.ClickRepeater(this.scroller.bottom,{listeners:{click:this.onScroll.createDelegate(this,[null,this.scroller.bottom],false)}})
}},onLayout:function(){if(this.isVisible()){if(this.enableScrolling){this.constrainScroll(this.el.getTop())
}if(this.floating){this.el.sync()
}}},focus:function(){if(!this.hidden){this.doFocus.defer(50,this)
}},doFocus:function(){if(!this.hidden){this.focusEl.focus()
}},hide:function(b){this.deepHide=b;
Ext.menu.Menu.superclass.hide.call(this);
delete this.deepHide
},onHide:function(){Ext.menu.Menu.superclass.onHide.call(this);
this.deactivateActive();
if(this.el&&this.floating){this.el.hide()
}var b=this.parentMenu;
if(this.deepHide===true&&b){if(b.floating){b.hide(true)
}else{b.deactivateActive()
}}},lookupComponent:function(b){if(Ext.isString(b)){b=(b=="separator"||b=="-")?new Ext.menu.Separator():new Ext.menu.TextItem(b);
this.applyDefaults(b)
}else{if(Ext.isObject(b)){b=this.getMenuItem(b)
}else{if(b.tagName||b.el){b=new Ext.BoxComponent({el:b})
}}}return b
},applyDefaults:function(c){if(!Ext.isString(c)){c=Ext.menu.Menu.superclass.applyDefaults.call(this,c);
var d=this.internalDefaults;
if(d){if(c.events){Ext.applyIf(c.initialConfig,d);
Ext.apply(c,d)
}else{Ext.applyIf(c,d)
}}}return c
},getMenuItem:function(b){if(!b.isXType){if(!b.xtype&&Ext.isBoolean(b.checked)){return new Ext.menu.CheckItem(b)
}return Ext.create(b,this.defaultType)
}return b
},addSeparator:function(){return this.add(new Ext.menu.Separator())
},addElement:function(b){return this.add(new Ext.menu.BaseItem(b))
},addItem:function(b){return this.add(b)
},addMenuItem:function(b){return this.add(this.getMenuItem(b))
},addText:function(b){return this.add(new Ext.menu.TextItem(b))
},onDestroy:function(){var d=this.parentMenu;
if(d&&d.activeChild==this){delete d.activeChild
}delete this.parentMenu;
Ext.menu.Menu.superclass.onDestroy.call(this);
Ext.menu.MenuMgr.unregister(this);
Ext.EventManager.removeResizeListener(this.hide,this);
if(this.keyNav){this.keyNav.disable()
}var c=this.scroller;
if(c){Ext.destroy(c.topRepeater,c.bottomRepeater,c.top,c.bottom)
}Ext.destroy(this.el,this.focusEl,this.ul)
}});
Ext.reg("menu",Ext.menu.Menu);
Ext.menu.MenuNav=Ext.extend(Ext.KeyNav,function(){function d(a,b){if(!b.tryActivate(b.items.indexOf(b.activeItem)-1,-1)){b.tryActivate(b.items.length-1,-1)
}}function c(a,b){if(!b.tryActivate(b.items.indexOf(b.activeItem)+1,1)){b.tryActivate(0,1)
}}return{constructor:function(a){Ext.menu.MenuNav.superclass.constructor.call(this,a.el);
this.scope=this.menu=a
},doRelay:function(a,b){var e=a.getKey();
if(this.menu.activeItem&&this.menu.activeItem.isFormField&&e!=a.TAB){return false
}if(!this.menu.activeItem&&a.isNavKeyPress()&&e!=a.SPACE&&e!=a.RETURN){this.menu.tryActivate(0,1);
return false
}return b.call(this.scope||this,a,this.menu)
},tab:function(a,b){a.stopEvent();
if(a.shiftKey){d(a,b)
}else{c(a,b)
}},up:d,down:c,right:function(a,b){if(b.activeItem){b.activeItem.expandMenu(true)
}},left:function(a,b){b.hide();
if(b.parentMenu&&b.parentMenu.activeItem){b.parentMenu.activeItem.activate()
}},enter:function(a,b){if(b.activeItem){a.stopPropagation();
b.activeItem.onClick(a);
b.fireEvent("click",this,b.activeItem);
return true
}}}
}());
Ext.menu.MenuMgr=function(){var w,y,z={},B=false,r=new Date();
function p(){w={};
y=new Ext.util.MixedCollection();
Ext.getDoc().addKeyListener(27,function(){if(y.length>0){u()
}})
}function u(){if(y&&y.length>0){var a=y.clone();
a.each(function(b){b.hide()
});
return true
}return false
}function x(a){y.remove(a);
if(y.length<1){Ext.getDoc().un("mousedown",q);
B=false
}}function s(b){var a=y.last();
r=new Date();
y.add(b);
if(!B){Ext.getDoc().on("mousedown",q);
B=true
}if(b.parentMenu){b.getEl().setZIndex(parseInt(b.parentMenu.getEl().getStyle("z-index"),10)+3);
b.parentMenu.activeChild=b
}else{if(a&&a.isVisible()){b.getEl().setZIndex(parseInt(a.getEl().getStyle("z-index"),10)+3)
}}}function A(a){if(a.activeChild){a.activeChild.hide()
}if(a.autoHideTimer){clearTimeout(a.autoHideTimer);
delete a.autoHideTimer
}}function v(b){var a=b.parentMenu;
if(!a&&!b.allowOtherMenus){u()
}else{if(a&&a.activeChild){a.activeChild.hide()
}}}function q(a){if(r.getElapsed()>50&&y.length>0&&!a.getTarget(".x-menu")){u()
}}function t(d,a){if(a){var b=z[d.group];
for(var c=0,e=b.length;
c<e;
c++){if(b[c]!=d){b[c].setChecked(false)
}}}}return{hideAll:function(){return u()
},register:function(a){if(!w){p()
}w[a.id]=a;
a.on({beforehide:A,hide:x,beforeshow:v,show:s})
},get:function(a){if(typeof a=="string"){if(!w){return null
}return w[a]
}else{if(a.events){return a
}else{if(typeof a.length=="number"){return new Ext.menu.Menu({items:a})
}else{return Ext.create(a,"menu")
}}}},unregister:function(a){delete w[a.id];
a.un("beforehide",A);
a.un("hide",x);
a.un("beforeshow",v);
a.un("show",s)
},registerCheckable:function(b){var a=b.group;
if(a){if(!z[a]){z[a]=[]
}z[a].push(b);
b.on("beforecheckchange",t)
}},unregisterCheckable:function(b){var a=b.group;
if(a){z[a].remove(b);
b.un("beforecheckchange",t)
}},getCheckedItem:function(b){var a=z[b];
if(a){for(var c=0,d=a.length;
c<d;
c++){if(a[c].checked){return a[c]
}}}return null
},setCheckedItem:function(c,a){var b=z[c];
if(b){for(var d=0,e=b.length;
d<e;
d++){if(b[d].id==a){b[d].setChecked(true)
}}}return null
}}
}();
Ext.menu.BaseItem=Ext.extend(Ext.Component,{canActivate:false,activeClass:"x-menu-item-active",hideOnClick:true,clickHideDelay:1,ctype:"Ext.menu.BaseItem",actionMode:"container",initComponent:function(){Ext.menu.BaseItem.superclass.initComponent.call(this);
this.addEvents("click","activate","deactivate");
if(this.handler){this.on("click",this.handler,this.scope)
}},onRender:function(c,d){Ext.menu.BaseItem.superclass.onRender.apply(this,arguments);
if(this.ownerCt&&this.ownerCt instanceof Ext.menu.Menu){this.parentMenu=this.ownerCt
}else{this.container.addClass("x-menu-list-item");
this.mon(this.el,{scope:this,click:this.onClick,mouseenter:this.activate,mouseleave:this.deactivate})
}},setHandler:function(c,d){if(this.handler){this.un("click",this.handler,this.scope)
}this.on("click",this.handler=c,this.scope=d)
},onClick:function(b){if(!this.disabled&&this.fireEvent("click",this,b)!==false&&(this.parentMenu&&this.parentMenu.fireEvent("itemclick",this,b)!==false)){this.handleClick(b)
}else{b.stopEvent()
}},activate:function(){if(this.disabled){return false
}var b=this.container;
b.addClass(this.activeClass);
this.region=b.getRegion().adjust(2,2,-2,-2);
this.fireEvent("activate",this);
return true
},deactivate:function(){this.container.removeClass(this.activeClass);
this.fireEvent("deactivate",this)
},shouldDeactivate:function(b){return !this.region||!this.region.contains(b.getPoint())
},handleClick:function(c){var d=this.parentMenu;
if(this.hideOnClick){if(d.floating){d.hide.defer(this.clickHideDelay,d,[true])
}else{d.deactivateActive()
}}},expandMenu:Ext.emptyFn,hideMenu:Ext.emptyFn});
Ext.reg("menubaseitem",Ext.menu.BaseItem);
Ext.menu.TextItem=Ext.extend(Ext.menu.BaseItem,{hideOnClick:false,itemCls:"x-menu-text",constructor:function(b){if(typeof b=="string"){b={text:b}
}Ext.menu.TextItem.superclass.constructor.call(this,b)
},onRender:function(){var b=document.createElement("span");
b.className=this.itemCls;
b.innerHTML=this.text;
this.el=b;
Ext.menu.TextItem.superclass.onRender.apply(this,arguments)
}});
Ext.reg("menutextitem",Ext.menu.TextItem);
Ext.menu.Separator=Ext.extend(Ext.menu.BaseItem,{itemCls:"x-menu-sep",hideOnClick:false,activeClass:"",onRender:function(d){var c=document.createElement("span");
c.className=this.itemCls;
c.innerHTML="&#160;";
this.el=c;
d.addClass("x-menu-sep-li");
Ext.menu.Separator.superclass.onRender.apply(this,arguments)
}});
Ext.reg("menuseparator",Ext.menu.Separator);
Ext.menu.Item=Ext.extend(Ext.menu.BaseItem,{itemCls:"x-menu-item",canActivate:true,showDelay:200,hideDelay:200,ctype:"Ext.menu.Item",initComponent:function(){Ext.menu.Item.superclass.initComponent.call(this);
if(this.menu){this.menu=Ext.menu.MenuMgr.get(this.menu);
this.menu.ownerCt=this
}},onRender:function(e,a){if(!this.itemTpl){this.itemTpl=Ext.menu.Item.prototype.itemTpl=new Ext.XTemplate('<a id="{id}" class="{cls}" hidefocus="true" unselectable="on" href="{href}"','<tpl if="hrefTarget">',' target="{hrefTarget}"',"</tpl>",">",'<img src="{icon}" class="x-menu-item-icon {iconCls}"/>','<span class="x-menu-item-text">{text}</span>',"</a>")
}var g=this.getTemplateArgs();
this.el=a?this.itemTpl.insertBefore(a,g,true):this.itemTpl.append(e,g,true);
this.iconEl=this.el.child("img.x-menu-item-icon");
this.textEl=this.el.child(".x-menu-item-text");
if(!this.href){this.mon(this.el,"click",Ext.emptyFn,null,{preventDefault:true})
}Ext.menu.Item.superclass.onRender.call(this,e,a)
},getTemplateArgs:function(){return{id:this.id,cls:this.itemCls+(this.menu?" x-menu-item-arrow":"")+(this.cls?" "+this.cls:""),href:this.href||"#",hrefTarget:this.hrefTarget,icon:this.icon||Ext.BLANK_IMAGE_URL,iconCls:this.iconCls||"",text:this.itemText||this.text||"&#160;"}
},setText:function(b){this.text=b||"&#160;";
if(this.rendered){this.textEl.update(this.text);
this.parentMenu.layout.doAutoSize()
}},setIconClass:function(d){var c=this.iconCls;
this.iconCls=d;
if(this.rendered){this.iconEl.replaceClass(c,this.iconCls)
}},beforeDestroy:function(){if(this.menu){delete this.menu.ownerCt;
this.menu.destroy()
}Ext.menu.Item.superclass.beforeDestroy.call(this)
},handleClick:function(b){if(!this.href){b.stopEvent()
}Ext.menu.Item.superclass.handleClick.apply(this,arguments)
},activate:function(b){if(Ext.menu.Item.superclass.activate.apply(this,arguments)){this.focus();
if(b){this.expandMenu()
}}return true
},shouldDeactivate:function(b){if(Ext.menu.Item.superclass.shouldDeactivate.call(this,b)){if(this.menu&&this.menu.isVisible()){return !this.menu.getEl().getRegion().contains(b.getPoint())
}return true
}return false
},deactivate:function(){Ext.menu.Item.superclass.deactivate.apply(this,arguments);
this.hideMenu()
},expandMenu:function(b){if(!this.disabled&&this.menu){clearTimeout(this.hideTimer);
delete this.hideTimer;
if(!this.menu.isVisible()&&!this.showTimer){this.showTimer=this.deferExpand.defer(this.showDelay,this,[b])
}else{if(this.menu.isVisible()&&b){this.menu.tryActivate(0,1)
}}}},deferExpand:function(b){delete this.showTimer;
this.menu.show(this.container,this.parentMenu.subMenuAlign||"tl-tr?",this.parentMenu);
if(b){this.menu.tryActivate(0,1)
}},hideMenu:function(){clearTimeout(this.showTimer);
delete this.showTimer;
if(!this.hideTimer&&this.menu&&this.menu.isVisible()){this.hideTimer=this.deferHide.defer(this.hideDelay,this)
}},deferHide:function(){delete this.hideTimer;
if(this.menu.over){this.parentMenu.setActiveItem(this,false)
}else{this.menu.hide()
}}});
Ext.reg("menuitem",Ext.menu.Item);
Ext.menu.CheckItem=Ext.extend(Ext.menu.Item,{itemCls:"x-menu-item x-menu-check-item",groupClass:"x-menu-group-item",checked:false,ctype:"Ext.menu.CheckItem",initComponent:function(){Ext.menu.CheckItem.superclass.initComponent.call(this);
this.addEvents("beforecheckchange","checkchange");
if(this.checkHandler){this.on("checkchange",this.checkHandler,this.scope)
}Ext.menu.MenuMgr.registerCheckable(this)
},onRender:function(b){Ext.menu.CheckItem.superclass.onRender.apply(this,arguments);
if(this.group){this.el.addClass(this.groupClass)
}if(this.checked){this.checked=false;
this.setChecked(true,true)
}},destroy:function(){Ext.menu.MenuMgr.unregisterCheckable(this);
Ext.menu.CheckItem.superclass.destroy.apply(this,arguments)
},setChecked:function(c,d){if(this.checked!=c&&this.fireEvent("beforecheckchange",this,c)!==false){if(this.container){this.container[c?"addClass":"removeClass"]("x-menu-item-checked")
}this.checked=c;
if(d!==true){this.fireEvent("checkchange",this,c)
}}},handleClick:function(b){if(!this.disabled&&!(this.checked&&this.group)){this.setChecked(!this.checked)
}Ext.menu.CheckItem.superclass.handleClick.apply(this,arguments)
}});
Ext.reg("menucheckitem",Ext.menu.CheckItem);
Ext.menu.DateMenu=Ext.extend(Ext.menu.Menu,{enableScrolling:false,hideOnClick:true,pickerId:null,cls:"x-date-menu",initComponent:function(){this.on("beforeshow",this.onBeforeShow,this);
if(this.strict=(Ext.isIE7&&Ext.isStrict)){this.on("show",this.onShow,this,{single:true,delay:20})
}Ext.apply(this,{plain:true,showSeparator:false,items:this.picker=new Ext.DatePicker(Ext.applyIf({internalRender:this.strict||!Ext.isIE,ctCls:"x-menu-date-item",id:this.pickerId},this.initialConfig))});
this.picker.purgeListeners();
Ext.menu.DateMenu.superclass.initComponent.call(this);
this.relayEvents(this.picker,["select"]);
this.on("show",this.picker.focus,this.picker);
this.on("select",this.menuHide,this);
if(this.handler){this.on("select",this.handler,this.scope||this)
}},menuHide:function(){if(this.hideOnClick){this.hide(true)
}},onBeforeShow:function(){if(this.picker){this.picker.hideMonthPicker(true)
}},onShow:function(){var b=this.picker.getEl();
b.setWidth(b.getWidth())
}});
Ext.reg("datemenu",Ext.menu.DateMenu);
Ext.menu.ColorMenu=Ext.extend(Ext.menu.Menu,{enableScrolling:false,hideOnClick:true,cls:"x-color-menu",paletteId:null,initComponent:function(){Ext.apply(this,{plain:true,showSeparator:false,items:this.palette=new Ext.ColorPalette(Ext.applyIf({id:this.paletteId},this.initialConfig))});
this.palette.purgeListeners();
Ext.menu.ColorMenu.superclass.initComponent.call(this);
this.relayEvents(this.palette,["select"]);
this.on("select",this.menuHide,this);
if(this.handler){this.on("select",this.handler,this.scope||this)
}},menuHide:function(){if(this.hideOnClick){this.hide(true)
}}});
Ext.reg("colormenu",Ext.menu.ColorMenu);
Ext.form.Field=Ext.extend(Ext.BoxComponent,{invalidClass:"x-form-invalid",invalidText:"The value in this field is invalid",focusClass:"x-form-focus",validationEvent:"keyup",validateOnBlur:true,validationDelay:250,defaultAutoCreate:{tag:"input",type:"text",size:"20",autocomplete:"off"},fieldClass:"x-form-field",msgTarget:"qtip",msgFx:"normal",readOnly:false,disabled:false,submitValue:true,isFormField:true,msgDisplay:"",hasFocus:false,initComponent:function(){Ext.form.Field.superclass.initComponent.call(this);
this.addEvents("focus","blur","specialkey","change","invalid","valid")
},getName:function(){return this.rendered&&this.el.dom.name?this.el.dom.name:this.name||this.id||""
},onRender:function(j,g){if(!this.el){var e=this.getAutoCreate();
if(!e.name){e.name=this.name||this.id
}if(this.inputType){e.type=this.inputType
}this.autoEl=e
}Ext.form.Field.superclass.onRender.call(this,j,g);
if(this.submitValue===false){this.el.dom.removeAttribute("name")
}var h=this.el.dom.type;
if(h){if(h=="password"){h="text"
}this.el.addClass("x-form-"+h)
}if(this.readOnly){this.setReadOnly(true)
}if(this.tabIndex!==undefined){this.el.dom.setAttribute("tabIndex",this.tabIndex)
}this.el.addClass([this.fieldClass,this.cls])
},getItemCt:function(){return this.itemCt
},initValue:function(){if(this.value!==undefined){this.setValue(this.value)
}else{if(!Ext.isEmpty(this.el.dom.value)&&this.el.dom.value!=this.emptyText){this.setValue(this.el.dom.value)
}}this.originalValue=this.getValue()
},isDirty:function(){if(this.disabled||!this.rendered){return false
}return String(this.getValue())!==String(this.originalValue)
},setReadOnly:function(b){if(this.rendered){this.el.dom.readOnly=b
}this.readOnly=b
},afterRender:function(){Ext.form.Field.superclass.afterRender.call(this);
this.initEvents();
this.initValue()
},fireKey:function(b){if(b.isSpecialKey()){this.fireEvent("specialkey",this,b)
}},reset:function(){this.setValue(this.originalValue);
this.clearInvalid()
},initEvents:function(){this.mon(this.el,Ext.EventManager.useKeydown?"keydown":"keypress",this.fireKey,this);
this.mon(this.el,"focus",this.onFocus,this);
this.mon(this.el,"blur",this.onBlur,this,this.inEditor?{buffer:10}:null)
},preFocus:Ext.emptyFn,onFocus:function(){this.preFocus();
if(this.focusClass){this.el.addClass(this.focusClass)
}if(!this.hasFocus){this.hasFocus=true;
this.startValue=this.getValue();
this.fireEvent("focus",this)
}},beforeBlur:Ext.emptyFn,onBlur:function(){this.beforeBlur();
if(this.focusClass){this.el.removeClass(this.focusClass)
}this.hasFocus=false;
if(this.validationEvent!==false&&(this.validateOnBlur||this.validationEvent=="blur")){this.validate()
}var b=this.getValue();
if(String(b)!==String(this.startValue)){this.fireEvent("change",this,b,this.startValue)
}this.fireEvent("blur",this);
this.postBlur()
},postBlur:Ext.emptyFn,isValid:function(e){if(this.disabled){return true
}var g=this.preventMark;
this.preventMark=e===true;
var d=this.validateValue(this.processValue(this.getRawValue()));
this.preventMark=g;
return d
},validate:function(){if(this.disabled||this.validateValue(this.processValue(this.getRawValue()))){this.clearInvalid();
return true
}return false
},processValue:function(b){return b
},validateValue:function(b){return true
},getActiveError:function(){return this.activeError||""
},markInvalid:function(g){if(!this.rendered||this.preventMark){return
}g=g||this.invalidText;
var e=this.getMessageHandler();
if(e){e.mark(this,g)
}else{if(this.msgTarget){this.el.addClass(this.invalidClass);
var d=Ext.getDom(this.msgTarget);
if(d){d.innerHTML=g;
d.style.display=this.msgDisplay
}}}this.activeError=g;
this.fireEvent("invalid",this,g)
},clearInvalid:function(){if(!this.rendered||this.preventMark){return
}this.el.removeClass(this.invalidClass);
var d=this.getMessageHandler();
if(d){d.clear(this)
}else{if(this.msgTarget){this.el.removeClass(this.invalidClass);
var c=Ext.getDom(this.msgTarget);
if(c){c.innerHTML="";
c.style.display="none"
}}}delete this.activeError;
this.fireEvent("valid",this)
},getMessageHandler:function(){return Ext.form.MessageTargets[this.msgTarget]
},getErrorCt:function(){return this.el.findParent(".x-form-element",5,true)||this.el.findParent(".x-form-field-wrap",5,true)
},alignErrorIcon:function(){this.errorIcon.alignTo(this.el,"tl-tr",[2,0])
},getRawValue:function(){var b=this.rendered?this.el.getValue():Ext.value(this.value,"");
if(b===this.emptyText){b=""
}return b
},getValue:function(){if(!this.rendered){return this.value
}var b=this.el.getValue();
if(b===this.emptyText||b===undefined){b=""
}return b
},setRawValue:function(b){return this.rendered?(this.el.dom.value=(Ext.isEmpty(b)?"":b)):""
},setValue:function(b){this.value=b;
if(this.rendered){this.el.dom.value=(Ext.isEmpty(b)?"":b);
this.validate()
}return this
},append:function(b){this.setValue([this.getValue(),b].join(""))
}});
Ext.form.MessageTargets={qtip:{mark:function(d,c){d.el.addClass(d.invalidClass);
d.el.dom.qtip=c;
d.el.dom.qclass="x-form-invalid-tip";
if(Ext.QuickTips){Ext.QuickTips.enable()
}},clear:function(b){b.el.removeClass(b.invalidClass);
b.el.dom.qtip=""
}},title:{mark:function(d,c){d.el.addClass(d.invalidClass);
d.el.dom.title=c
},clear:function(b){b.el.dom.title=""
}},under:{mark:function(d,g){d.el.addClass(d.invalidClass);
if(!d.errorEl){var e=d.getErrorCt();
if(!e){d.el.dom.title=g;
return
}d.errorEl=e.createChild({cls:"x-form-invalid-msg"});
d.errorEl.setWidth(e.getWidth(true)-20)
}d.errorEl.update(g);
Ext.form.Field.msgFx[d.msgFx].show(d.errorEl,d)
},clear:function(b){b.el.removeClass(b.invalidClass);
if(b.errorEl){Ext.form.Field.msgFx[b.msgFx].hide(b.errorEl,b)
}else{b.el.dom.title=""
}}},side:{mark:function(d,g){d.el.addClass(d.invalidClass);
if(!d.errorIcon){var e=d.getErrorCt();
if(!e){d.el.dom.title=g;
return
}d.errorIcon=e.createChild({cls:"x-form-invalid-icon"})
}d.alignErrorIcon();
d.errorIcon.dom.qtip=g;
d.errorIcon.dom.qclass="x-form-invalid-tip";
d.errorIcon.show();
d.on("resize",d.alignErrorIcon,d)
},clear:function(b){b.el.removeClass(b.invalidClass);
if(b.errorIcon){b.errorIcon.dom.qtip="";
b.errorIcon.hide();
b.un("resize",b.alignErrorIcon,b)
}else{b.el.dom.title=""
}}}};
Ext.form.Field.msgFx={normal:{show:function(d,c){d.setDisplayed("block")
},hide:function(d,c){d.setDisplayed(false).update("")
}},slide:{show:function(d,c){d.slideIn("t",{stopFx:true})
},hide:function(d,c){d.slideOut("t",{stopFx:true,useDisplay:true})
}},slideRight:{show:function(d,c){d.fixDisplay();
d.alignTo(c.el,"tl-tr");
d.slideIn("l",{stopFx:true})
},hide:function(d,c){d.slideOut("l",{stopFx:true,useDisplay:true})
}}};
Ext.reg("field",Ext.form.Field);
Ext.form.TextField=Ext.extend(Ext.form.Field,{grow:false,growMin:30,growMax:800,vtype:null,maskRe:null,disableKeyFilter:false,allowBlank:true,minLength:0,maxLength:Number.MAX_VALUE,minLengthText:"The minimum length for this field is {0}",maxLengthText:"The maximum length for this field is {0}",selectOnFocus:false,blankText:"This field is required",validator:null,regex:null,regexText:"",emptyText:null,emptyClass:"x-form-empty-field",initComponent:function(){Ext.form.TextField.superclass.initComponent.call(this);
this.addEvents("autosize","keydown","keyup","keypress")
},initEvents:function(){Ext.form.TextField.superclass.initEvents.call(this);
if(this.validationEvent=="keyup"){this.validationTask=new Ext.util.DelayedTask(this.validate,this);
this.mon(this.el,"keyup",this.filterValidation,this)
}else{if(this.validationEvent!==false&&this.validationEvent!="blur"){this.mon(this.el,this.validationEvent,this.validate,this,{buffer:this.validationDelay})
}}if(this.selectOnFocus||this.emptyText){this.mon(this.el,"mousedown",this.onMouseDown,this);
if(this.emptyText){this.applyEmptyText()
}}if(this.maskRe||(this.vtype&&this.disableKeyFilter!==true&&(this.maskRe=Ext.form.VTypes[this.vtype+"Mask"]))){this.mon(this.el,"keypress",this.filterKeys,this)
}if(this.grow){this.mon(this.el,"keyup",this.onKeyUpBuffered,this,{buffer:50});
this.mon(this.el,"click",this.autoSize,this)
}if(this.enableKeyEvents){this.mon(this.el,{scope:this,keyup:this.onKeyUp,keydown:this.onKeyDown,keypress:this.onKeyPress})
}},onMouseDown:function(b){if(!this.hasFocus){this.mon(this.el,"mouseup",Ext.emptyFn,this,{single:true,preventDefault:true})
}},processValue:function(d){if(this.stripCharsRe){var c=d.replace(this.stripCharsRe,"");
if(c!==d){this.setRawValue(c);
return c
}}return d
},filterValidation:function(b){if(!b.isNavKeyPress()){this.validationTask.delay(this.validationDelay)
}},onDisable:function(){Ext.form.TextField.superclass.onDisable.call(this);
if(Ext.isIE){this.el.dom.unselectable="on"
}},onEnable:function(){Ext.form.TextField.superclass.onEnable.call(this);
if(Ext.isIE){this.el.dom.unselectable=""
}},onKeyUpBuffered:function(b){if(this.doAutoSize(b)){this.autoSize()
}},doAutoSize:function(b){return !b.isNavKeyPress()
},onKeyUp:function(b){this.fireEvent("keyup",this,b)
},onKeyDown:function(b){this.fireEvent("keydown",this,b)
},onKeyPress:function(b){this.fireEvent("keypress",this,b)
},reset:function(){Ext.form.TextField.superclass.reset.call(this);
this.applyEmptyText()
},applyEmptyText:function(){if(this.rendered&&this.emptyText&&this.getRawValue().length<1&&!this.hasFocus){this.setRawValue(this.emptyText);
this.el.addClass(this.emptyClass)
}},preFocus:function(){var b=this.el;
if(this.emptyText){if(b.dom.value==this.emptyText){this.setRawValue("")
}b.removeClass(this.emptyClass)
}if(this.selectOnFocus){b.dom.select()
}},postBlur:function(){this.applyEmptyText()
},filterKeys:function(d){if(d.ctrlKey){return
}var e=d.getKey();
if(Ext.isGecko&&(d.isNavKeyPress()||e==d.BACKSPACE||(e==d.DELETE&&d.button==-1))){return
}var g=String.fromCharCode(d.getCharCode());
if(!Ext.isGecko&&d.isSpecialKey()&&!g){return
}if(!this.maskRe.test(g)){d.stopEvent()
}},setValue:function(b){if(this.emptyText&&this.el&&!Ext.isEmpty(b)){this.el.removeClass(this.emptyClass)
}Ext.form.TextField.superclass.setValue.apply(this,arguments);
this.applyEmptyText();
this.autoSize();
return this
},validateValue:function(e){if(Ext.isFunction(this.validator)){var g=this.validator(e);
if(g!==true){this.markInvalid(g);
return false
}}if(e.length<1||e===this.emptyText){if(this.allowBlank){this.clearInvalid();
return true
}else{this.markInvalid(this.blankText);
return false
}}if(e.length<this.minLength){this.markInvalid(String.format(this.minLengthText,this.minLength));
return false
}if(e.length>this.maxLength){this.markInvalid(String.format(this.maxLengthText,this.maxLength));
return false
}if(this.vtype){var d=Ext.form.VTypes;
if(!d[this.vtype](e,this)){this.markInvalid(this.vtypeText||d[this.vtype+"Text"]);
return false
}}if(this.regex&&!this.regex.test(e)){this.markInvalid(this.regexText);
return false
}return true
},selectText:function(k,j){var n=this.getRawValue();
var m=false;
if(n.length>0){k=k===undefined?0:k;
j=j===undefined?n.length:j;
var l=this.el.dom;
if(l.setSelectionRange){l.setSelectionRange(k,j)
}else{if(l.createTextRange){var d=l.createTextRange();
d.moveStart("character",k);
d.moveEnd("character",j-n.length);
d.select()
}}m=Ext.isGecko||Ext.isOpera
}else{m=true
}if(m){this.focus()
}},autoSize:function(){if(!this.grow||!this.rendered){return
}if(!this.metrics){this.metrics=Ext.util.TextMetrics.createInstance(this.el)
}var j=this.el;
var d=j.dom.value;
var h=document.createElement("div");
h.appendChild(document.createTextNode(d));
d=h.innerHTML;
Ext.removeNode(h);
h=null;
d+="&#160;";
var g=Math.min(this.growMax,Math.max(this.metrics.getWidth(d)+10,this.growMin));
this.el.setWidth(g);
this.fireEvent("autosize",this,g)
},onDestroy:function(){if(this.validationTask){this.validationTask.cancel();
this.validationTask=null
}Ext.form.TextField.superclass.onDestroy.call(this)
}});
Ext.reg("textfield",Ext.form.TextField);
Ext.form.TriggerField=Ext.extend(Ext.form.TextField,{defaultAutoCreate:{tag:"input",type:"text",size:"16",autocomplete:"off"},hideTrigger:false,editable:true,readOnly:false,wrapFocusClass:"x-trigger-wrap-focus",autoSize:Ext.emptyFn,monitorTab:true,deferHeight:true,mimicing:false,actionMode:"wrap",removeMode:"container",defaultTriggerWidth:17,onResize:function(e,g){Ext.form.TriggerField.superclass.onResize.call(this,e,g);
var d=this.getTriggerWidth();
if(Ext.isNumber(e)){this.el.setWidth(e-d)
}this.wrap.setWidth(this.el.getWidth()+d)
},getTriggerWidth:function(){var b=this.trigger.getWidth();
if(!this.hideTrigger&&b===0){b=this.defaultTriggerWidth
}return b
},alignErrorIcon:function(){if(this.wrap){this.errorIcon.alignTo(this.wrap,"tl-tr",[2,0])
}},onRender:function(c,d){this.doc=Ext.isIE?Ext.getBody():Ext.getDoc();
Ext.form.TriggerField.superclass.onRender.call(this,c,d);
this.wrap=this.el.wrap({cls:"x-form-field-wrap x-form-field-trigger-wrap"});
this.trigger=this.wrap.createChild(this.triggerConfig||{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.triggerClass});
this.initTrigger();
if(!this.width){this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth())
}this.resizeEl=this.positionEl=this.wrap;
this.updateEditState()
},updateEditState:function(){if(this.rendered){if(this.readOnly){this.el.dom.readOnly=true;
this.el.addClass("x-trigger-noedit");
this.mun(this.el,"click",this.onTriggerClick,this);
this.trigger.setDisplayed(false)
}else{if(!this.editable){this.el.dom.readOnly=true;
this.el.addClass("x-trigger-noedit");
this.mon(this.el,"click",this.onTriggerClick,this)
}else{this.el.dom.readOnly=false;
this.el.removeClass("x-trigger-noedit");
this.mun(this.el,"click",this.onTriggerClick,this)
}this.trigger.setDisplayed(!this.hideTrigger)
}this.onResize(this.width||this.wrap.getWidth())
}},setHideTrigger:function(b){if(b!=this.hideTrigger){this.hideTrigger=b;
this.updateEditState()
}},setEditable:function(b){if(b!=this.editable){this.editable=b;
this.updateEditState()
}},setReadOnly:function(b){if(b!=this.readOnly){this.readOnly=b;
this.updateEditState()
}},afterRender:function(){Ext.form.TriggerField.superclass.afterRender.call(this)
},initTrigger:function(){this.mon(this.trigger,"click",this.onTriggerClick,this,{preventDefault:true});
this.trigger.addClassOnOver("x-form-trigger-over");
this.trigger.addClassOnClick("x-form-trigger-click")
},onDestroy:function(){Ext.destroy(this.trigger,this.wrap);
if(this.mimicing){this.doc.un("mousedown",this.mimicBlur,this)
}delete this.doc;
Ext.form.TriggerField.superclass.onDestroy.call(this)
},onFocus:function(){Ext.form.TriggerField.superclass.onFocus.call(this);
if(!this.mimicing){this.wrap.addClass(this.wrapFocusClass);
this.mimicing=true;
this.doc.on("mousedown",this.mimicBlur,this,{delay:10});
if(this.monitorTab){this.on("specialkey",this.checkTab,this)
}}},checkTab:function(d,c){if(c.getKey()==c.TAB){this.triggerBlur()
}},onBlur:Ext.emptyFn,mimicBlur:function(b){if(!this.isDestroyed&&!this.wrap.contains(b.target)&&this.validateBlur(b)){this.triggerBlur()
}},triggerBlur:function(){this.mimicing=false;
this.doc.un("mousedown",this.mimicBlur,this);
if(this.monitorTab&&this.el){this.un("specialkey",this.checkTab,this)
}Ext.form.TriggerField.superclass.onBlur.call(this);
if(this.wrap){this.wrap.removeClass(this.wrapFocusClass)
}},beforeBlur:Ext.emptyFn,validateBlur:function(b){return true
},onTriggerClick:Ext.emptyFn});
Ext.form.TwinTriggerField=Ext.extend(Ext.form.TriggerField,{initComponent:function(){Ext.form.TwinTriggerField.superclass.initComponent.call(this);
this.triggerConfig={tag:"span",cls:"x-form-twin-triggers",cn:[{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger1Class},{tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.trigger2Class}]}
},getTrigger:function(b){return this.triggers[b]
},initTrigger:function(){var d=this.trigger.select(".x-form-trigger",true);
var c=this;
d.each(function(h,a,j){var b="Trigger"+(j+1);
h.hide=function(){var e=c.wrap.getWidth();
this.dom.style.display="none";
c.el.setWidth(e-c.trigger.getWidth());
this["hidden"+b]=true
};
h.show=function(){var e=c.wrap.getWidth();
this.dom.style.display="";
c.el.setWidth(e-c.trigger.getWidth());
this["hidden"+b]=false
};
if(this["hide"+b]){h.dom.style.display="none";
this["hidden"+b]=true
}this.mon(h,"click",this["on"+b+"Click"],this,{preventDefault:true});
h.addClassOnOver("x-form-trigger-over");
h.addClassOnClick("x-form-trigger-click")
},this);
this.triggers=d.elements
},getTriggerWidth:function(){var b=0;
Ext.each(this.triggers,function(h,j){var g="Trigger"+(j+1),a=h.getWidth();
if(a===0&&!this["hidden"+g]){b+=this.defaultTriggerWidth
}else{b+=a
}},this);
return b
},onDestroy:function(){Ext.destroy(this.triggers);
Ext.form.TwinTriggerField.superclass.onDestroy.call(this)
},onTrigger1Click:Ext.emptyFn,onTrigger2Click:Ext.emptyFn});
Ext.reg("trigger",Ext.form.TriggerField);
Ext.form.TextArea=Ext.extend(Ext.form.TextField,{growMin:60,growMax:1000,growAppend:"&#160;\n&#160;",enterIsSpecial:false,preventScrollbars:false,onRender:function(c,d){if(!this.el){this.defaultAutoCreate={tag:"textarea",style:"width:100px;height:60px;",autocomplete:"off"}
}Ext.form.TextArea.superclass.onRender.call(this,c,d);
if(this.grow){this.textSizeEl=Ext.DomHelper.append(document.body,{tag:"pre",cls:"x-form-grow-sizer"});
if(this.preventScrollbars){this.el.setStyle("overflow","hidden")
}this.el.setHeight(this.growMin)
}},onDestroy:function(){Ext.removeNode(this.textSizeEl);
Ext.form.TextArea.superclass.onDestroy.call(this)
},fireKey:function(b){if(b.isSpecialKey()&&(this.enterIsSpecial||(b.getKey()!=b.ENTER||b.hasModifier()))){this.fireEvent("specialkey",this,b)
}},doAutoSize:function(b){return !b.isNavKeyPress()||b.getKey()==b.ENTER
},autoSize:function(){if(!this.grow||!this.textSizeEl){return
}var j=this.el,g=Ext.util.Format.htmlEncode(j.dom.value),h=this.textSizeEl,e;
Ext.fly(h).setWidth(this.el.getWidth());
if(g.length<1){g="&#160;&#160;"
}else{g+=this.growAppend;
if(Ext.isIE){g=g.replace(/\n/g,"&#160;<br />")
}}h.innerHTML=g;
e=Math.min(this.growMax,Math.max(h.offsetHeight,this.growMin));
if(e!=this.lastHeight){this.lastHeight=e;
this.el.setHeight(e);
this.fireEvent("autosize",this,e)
}}});
Ext.reg("textarea",Ext.form.TextArea);
Ext.form.NumberField=Ext.extend(Ext.form.TextField,{fieldClass:"x-form-field x-form-num-field",allowDecimals:true,decimalSeparator:".",decimalPrecision:2,allowNegative:true,minValue:Number.NEGATIVE_INFINITY,maxValue:Number.MAX_VALUE,minText:"The minimum value for this field is {0}",maxText:"The maximum value for this field is {0}",nanText:"{0} is not a valid number",baseChars:"0123456789",initEvents:function(){var b=this.baseChars+"";
if(this.allowDecimals){b+=this.decimalSeparator
}if(this.allowNegative){b+="-"
}this.maskRe=new RegExp("["+Ext.escapeRe(b)+"]");
Ext.form.NumberField.superclass.initEvents.call(this)
},validateValue:function(c){if(!Ext.form.NumberField.superclass.validateValue.call(this,c)){return false
}if(c.length<1){return true
}c=String(c).replace(this.decimalSeparator,".");
if(isNaN(c)){this.markInvalid(String.format(this.nanText,c));
return false
}var d=this.parseValue(c);
if(d<this.minValue){this.markInvalid(String.format(this.minText,this.minValue));
return false
}if(d>this.maxValue){this.markInvalid(String.format(this.maxText,this.maxValue));
return false
}return true
},getValue:function(){return this.fixPrecision(this.parseValue(Ext.form.NumberField.superclass.getValue.call(this)))
},setValue:function(b){b=Ext.isNumber(b)?b:parseFloat(String(b).replace(this.decimalSeparator,"."));
b=isNaN(b)?"":String(b).replace(".",this.decimalSeparator);
return Ext.form.NumberField.superclass.setValue.call(this,b)
},setMinValue:function(b){this.minValue=Ext.num(b,Number.NEGATIVE_INFINITY)
},setMaxValue:function(b){this.maxValue=Ext.num(b,Number.MAX_VALUE)
},parseValue:function(b){b=parseFloat(String(b).replace(this.decimalSeparator,"."));
return isNaN(b)?"":b
},fixPrecision:function(c){var d=isNaN(c);
if(!this.allowDecimals||this.decimalPrecision==-1||d||!c){return d?"":c
}return parseFloat(parseFloat(c).toFixed(this.decimalPrecision))
},beforeBlur:function(){var b=this.parseValue(this.getRawValue());
if(!Ext.isEmpty(b)){this.setValue(this.fixPrecision(b))
}}});
Ext.reg("numberfield",Ext.form.NumberField);
Ext.form.DateField=Ext.extend(Ext.form.TriggerField,{format:"m/d/Y",altFormats:"m/d/Y|n/j/Y|n/j/y|m/j/y|n/d/y|m/j/Y|n/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d",disabledDaysText:"Disabled",disabledDatesText:"Disabled",minText:"The date in this field must be equal to or after {0}",maxText:"The date in this field must be equal to or before {0}",invalidText:"{0} is not a valid date - it must be in the format {1}",triggerClass:"x-form-date-trigger",showToday:true,defaultAutoCreate:{tag:"input",type:"text",size:"10",autocomplete:"off"},initComponent:function(){Ext.form.DateField.superclass.initComponent.call(this);
this.addEvents("select");
if(Ext.isString(this.minValue)){this.minValue=this.parseDate(this.minValue)
}if(Ext.isString(this.maxValue)){this.maxValue=this.parseDate(this.maxValue)
}this.disabledDatesRE=null;
this.initDisabledDays()
},initEvents:function(){Ext.form.DateField.superclass.initEvents.call(this);
this.keyNav=new Ext.KeyNav(this.el,{down:function(b){this.onTriggerClick()
},scope:this,forceKeyDown:true})
},initDisabledDays:function(){if(this.disabledDates){var d=this.disabledDates,e=d.length-1,g="(?:";
Ext.each(d,function(a,b){g+=Ext.isDate(a)?"^"+Ext.escapeRe(a.dateFormat(this.format))+"$":d[b];
if(b!=e){g+="|"
}},this);
this.disabledDatesRE=new RegExp(g+")")
}},setDisabledDates:function(b){this.disabledDates=b;
this.initDisabledDays();
if(this.menu){this.menu.picker.setDisabledDates(this.disabledDatesRE)
}},setDisabledDays:function(b){this.disabledDays=b;
if(this.menu){this.menu.picker.setDisabledDays(b)
}},setMinValue:function(b){this.minValue=(Ext.isString(b)?this.parseDate(b):b);
if(this.menu){this.menu.picker.setMinDate(this.minValue)
}},setMaxValue:function(b){this.maxValue=(Ext.isString(b)?this.parseDate(b):b);
if(this.menu){this.menu.picker.setMaxDate(this.maxValue)
}},validateValue:function(l){l=this.formatDate(l);
if(!Ext.form.DateField.superclass.validateValue.call(this,l)){return false
}if(l.length<1){return true
}var n=l;
l=this.parseDate(l);
if(!l){this.markInvalid(String.format(this.invalidText,n,this.format));
return false
}var k=l.getTime();
if(this.minValue&&k<this.minValue.getTime()){this.markInvalid(String.format(this.minText,this.formatDate(this.minValue)));
return false
}if(this.maxValue&&k>this.maxValue.getTime()){this.markInvalid(String.format(this.maxText,this.formatDate(this.maxValue)));
return false
}if(this.disabledDays){var j=l.getDay();
for(var h=0;
h<this.disabledDays.length;
h++){if(j===this.disabledDays[h]){this.markInvalid(this.disabledDaysText);
return false
}}}var m=this.formatDate(l);
if(this.disabledDatesRE&&this.disabledDatesRE.test(m)){this.markInvalid(String.format(this.disabledDatesText,m));
return false
}return true
},validateBlur:function(){return !this.menu||!this.menu.isVisible()
},getValue:function(){return this.parseDate(Ext.form.DateField.superclass.getValue.call(this))||""
},setValue:function(b){return Ext.form.DateField.superclass.setValue.call(this,this.formatDate(this.parseDate(b)))
},parseDate:function(h){if(!h||Ext.isDate(h)){return h
}var e=Date.parseDate(h,this.format);
if(!e&&this.altFormats){if(!this.altFormatsArray){this.altFormatsArray=this.altFormats.split("|")
}for(var j=0,g=this.altFormatsArray.length;
j<g&&!e;
j++){e=Date.parseDate(h,this.altFormatsArray[j])
}}return e
},onDestroy:function(){Ext.destroy(this.menu,this.keyNav);
Ext.form.DateField.superclass.onDestroy.call(this)
},formatDate:function(b){return Ext.isDate(b)?b.dateFormat(this.format):b
},onTriggerClick:function(){if(this.disabled){return
}if(this.menu==null){this.menu=new Ext.menu.DateMenu({hideOnClick:false,focusOnSelect:false})
}this.onFocus();
Ext.apply(this.menu.picker,{minDate:this.minValue,maxDate:this.maxValue,disabledDatesRE:this.disabledDatesRE,disabledDatesText:this.disabledDatesText,disabledDays:this.disabledDays,disabledDaysText:this.disabledDaysText,format:this.format,showToday:this.showToday,minText:String.format(this.minText,this.formatDate(this.minValue)),maxText:String.format(this.maxText,this.formatDate(this.maxValue))});
this.menu.picker.setValue(this.getValue()||new Date());
this.menu.show(this.el,"tl-bl?");
this.menuEvents("on")
},menuEvents:function(b){this.menu[b]("select",this.onSelect,this);
this.menu[b]("hide",this.onMenuHide,this);
this.menu[b]("show",this.onFocus,this)
},onSelect:function(d,c){this.setValue(c);
this.fireEvent("select",this,c);
this.menu.hide()
},onMenuHide:function(){this.focus(false,60);
this.menuEvents("un")
},beforeBlur:function(){var b=this.parseDate(this.getRawValue());
if(b){this.setValue(b)
}}});
Ext.reg("datefield",Ext.form.DateField);
Ext.form.DisplayField=Ext.extend(Ext.form.Field,{validationEvent:false,validateOnBlur:false,defaultAutoCreate:{tag:"div"},fieldClass:"x-form-display-field",htmlEncode:false,initEvents:Ext.emptyFn,isValid:function(){return true
},validate:function(){return true
},getRawValue:function(){var b=this.rendered?this.el.dom.innerHTML:Ext.value(this.value,"");
if(b===this.emptyText){b=""
}if(this.htmlEncode){b=Ext.util.Format.htmlDecode(b)
}return b
},getValue:function(){return this.getRawValue()
},getName:function(){return this.name
},setRawValue:function(b){if(this.htmlEncode){b=Ext.util.Format.htmlEncode(b)
}return this.rendered?(this.el.dom.innerHTML=(Ext.isEmpty(b)?"":b)):(this.value=b)
},setValue:function(b){this.setRawValue(b);
return this
}});
Ext.reg("displayfield",Ext.form.DisplayField);
Ext.form.ComboBox=Ext.extend(Ext.form.TriggerField,{defaultAutoCreate:{tag:"input",type:"text",size:"24",autocomplete:"off"},listClass:"",selectedClass:"x-combo-selected",listEmptyText:"",triggerClass:"x-form-arrow-trigger",shadow:"sides",listAlign:"tl-bl?",maxHeight:300,minHeight:90,triggerAction:"query",minChars:4,typeAhead:false,queryDelay:500,pageSize:0,selectOnFocus:false,queryParam:"query",loadingText:"Loading...",resizable:false,handleHeight:8,allQuery:"",mode:"remote",minListWidth:70,forceSelection:false,typeAheadDelay:250,lazyInit:true,clearFilterOnReset:true,submitValue:undefined,initComponent:function(){Ext.form.ComboBox.superclass.initComponent.call(this);
this.addEvents("expand","collapse","beforeselect","select","beforequery");
if(this.transform){var p=Ext.getDom(this.transform);
if(!this.hiddenName){this.hiddenName=p.name
}if(!this.store){this.mode="local";
var l=[],o=p.options;
for(var d=0,k=o.length;
d<k;
d++){var m=o[d],n=(m.hasAttribute?m.hasAttribute("value"):m.getAttributeNode("value").specified)?m.value:m.text;
if(m.selected&&Ext.isEmpty(this.value,true)){this.value=n
}l.push([n,m.text])
}this.store=new Ext.data.ArrayStore({id:0,fields:["value","text"],data:l,autoDestroy:true});
this.valueField="value";
this.displayField="text"
}p.name=Ext.id();
if(!this.lazyRender){this.target=true;
this.el=Ext.DomHelper.insertBefore(p,this.autoCreate||this.defaultAutoCreate);
this.render(this.el.parentNode,p)
}Ext.removeNode(p)
}else{if(this.store){this.store=Ext.StoreMgr.lookup(this.store);
if(this.store.autoCreated){this.displayField=this.valueField="field1";
if(!this.store.expandData){this.displayField="field2"
}this.mode="local"
}}}this.selectedIndex=-1;
if(this.mode=="local"){if(!Ext.isDefined(this.initialConfig.queryDelay)){this.queryDelay=10
}if(!Ext.isDefined(this.initialConfig.minChars)){this.minChars=0
}}},onRender:function(c,d){if(this.hiddenName&&!Ext.isDefined(this.submitValue)){this.submitValue=false
}Ext.form.ComboBox.superclass.onRender.call(this,c,d);
if(this.hiddenName){this.hiddenField=this.el.insertSibling({tag:"input",type:"hidden",name:this.hiddenName,id:(this.hiddenId||this.hiddenName)},"before",true)
}if(Ext.isGecko){this.el.dom.setAttribute("autocomplete","off")
}if(!this.lazyInit){this.initList()
}else{this.on("focus",this.initList,this,{single:true})
}},initValue:function(){Ext.form.ComboBox.superclass.initValue.call(this);
if(this.hiddenField){this.hiddenField.value=Ext.isDefined(this.hiddenValue)?this.hiddenValue:Ext.isDefined(this.value)?this.value:""
}},initList:function(){if(!this.list){var d="x-combo-list";
this.list=new Ext.Layer({parentEl:this.getListParent(),shadow:this.shadow,cls:[d,this.listClass].join(" "),constrain:false,zindex:12000});
var c=this.listWidth||Math.max(this.wrap.getWidth(),this.minListWidth);
this.list.setSize(c,0);
this.list.swallowEvent("mousewheel");
this.assetHeight=0;
if(this.syncFont!==false){this.list.setStyle("font-size",this.el.getStyle("font-size"))
}if(this.title){this.header=this.list.createChild({cls:d+"-hd",html:this.title});
this.assetHeight+=this.header.getHeight()
}this.innerList=this.list.createChild({cls:d+"-inner"});
this.mon(this.innerList,"mouseover",this.onViewOver,this);
this.mon(this.innerList,"mousemove",this.onViewMove,this);
this.innerList.setWidth(c-this.list.getFrameWidth("lr"));
if(this.pageSize){this.footer=this.list.createChild({cls:d+"-ft"});
this.pageTb=new Ext.PagingToolbar({store:this.store,pageSize:this.pageSize,renderTo:this.footer});
this.assetHeight+=this.footer.getHeight()
}if(!this.tpl){this.tpl='<tpl for="."><div class="'+d+'-item">{'+this.displayField+"}</div></tpl>"
}this.view=new Ext.DataView({applyTo:this.innerList,tpl:this.tpl,singleSelect:true,selectedClass:this.selectedClass,itemSelector:this.itemSelector||"."+d+"-item",emptyText:this.listEmptyText});
this.mon(this.view,"click",this.onViewClick,this);
this.bindStore(this.store,true);
if(this.resizable){this.resizer=new Ext.Resizable(this.list,{pinned:true,handles:"se"});
this.mon(this.resizer,"resize",function(a,g,b){this.maxHeight=b-this.handleHeight-this.list.getFrameWidth("tb")-this.assetHeight;
this.listWidth=g;
this.innerList.setWidth(g-this.list.getFrameWidth("lr"));
this.restrictHeight()
},this);
this[this.pageSize?"footer":"innerList"].setStyle("margin-bottom",this.handleHeight+"px")
}}},getListParent:function(){return document.body
},getStore:function(){return this.store
},bindStore:function(d,c){if(this.store&&!c){if(this.store!==d&&this.store.autoDestroy){this.store.destroy()
}else{this.store.un("beforeload",this.onBeforeLoad,this);
this.store.un("load",this.onLoad,this);
this.store.un("exception",this.collapse,this)
}if(!d){this.store=null;
if(this.view){this.view.bindStore(null)
}if(this.pageTb){this.pageTb.bindStore(null)
}}}if(d){if(!c){this.lastQuery=null;
if(this.pageTb){this.pageTb.bindStore(d)
}}this.store=Ext.StoreMgr.lookup(d);
this.store.on({scope:this,beforeload:this.onBeforeLoad,load:this.onLoad,exception:this.collapse});
if(this.view){this.view.bindStore(d)
}}},reset:function(){Ext.form.ComboBox.superclass.reset.call(this);
if(this.clearFilterOnReset&&this.mode=="local"){this.store.clearFilter()
}},initEvents:function(){Ext.form.ComboBox.superclass.initEvents.call(this);
this.keyNav=new Ext.KeyNav(this.el,{up:function(b){this.inKeyMode=true;
this.selectPrev()
},down:function(b){if(!this.isExpanded()){this.onTriggerClick()
}else{this.inKeyMode=true;
this.selectNext()
}},enter:function(b){this.onViewClick()
},esc:function(b){this.collapse()
},tab:function(b){this.onViewClick(false);
return true
},scope:this,doRelay:function(j,e,g){if(g=="down"||this.scope.isExpanded()){var h=Ext.KeyNav.prototype.doRelay.apply(this,arguments);
if(!Ext.isIE&&Ext.EventManager.useKeydown){this.scope.fireKey(j)
}return h
}return true
},forceKeyDown:true,defaultEventAction:"stopEvent"});
this.queryDelay=Math.max(this.queryDelay||10,this.mode=="local"?10:250);
this.dqTask=new Ext.util.DelayedTask(this.initQuery,this);
if(this.typeAhead){this.taTask=new Ext.util.DelayedTask(this.onTypeAhead,this)
}if(!this.enableKeyEvents){this.mon(this.el,"keyup",this.onKeyUp,this)
}},onDestroy:function(){if(this.dqTask){this.dqTask.cancel();
this.dqTask=null
}this.bindStore(null);
Ext.destroy(this.resizer,this.view,this.pageTb,this.list);
Ext.destroyMembers(this,"hiddenField");
Ext.form.ComboBox.superclass.onDestroy.call(this)
},fireKey:function(b){if(!this.isExpanded()){Ext.form.ComboBox.superclass.fireKey.call(this,b)
}},onResize:function(d,c){Ext.form.ComboBox.superclass.onResize.apply(this,arguments);
if(this.isVisible()&&this.list){this.doResize(d)
}else{this.bufferSize=d
}},doResize:function(d){if(!Ext.isDefined(this.listWidth)){var c=Math.max(d,this.minListWidth);
this.list.setWidth(c);
this.innerList.setWidth(c-this.list.getFrameWidth("lr"))
}},onEnable:function(){Ext.form.ComboBox.superclass.onEnable.apply(this,arguments);
if(this.hiddenField){this.hiddenField.disabled=false
}},onDisable:function(){Ext.form.ComboBox.superclass.onDisable.apply(this,arguments);
if(this.hiddenField){this.hiddenField.disabled=true
}},onBeforeLoad:function(){if(!this.hasFocus){return
}this.innerList.update(this.loadingText?'<div class="loading-indicator">'+this.loadingText+"</div>":"");
this.restrictHeight();
this.selectedIndex=-1
},onLoad:function(){if(!this.hasFocus){return
}if(this.store.getCount()>0||this.listEmptyText){this.expand();
this.restrictHeight();
if(this.lastQuery==this.allQuery){if(this.editable){this.el.dom.select()
}if(!this.selectByValue(this.value,true)){this.select(0,true)
}}else{this.selectNext();
if(this.typeAhead&&this.lastKey!=Ext.EventObject.BACKSPACE&&this.lastKey!=Ext.EventObject.DELETE){this.taTask.delay(this.typeAheadDelay)
}}}else{this.onEmptyResults()
}},onTypeAhead:function(){if(this.store.getCount()>0){var e=this.store.getAt(0);
var j=e.data[this.displayField];
var g=j.length;
var h=this.getRawValue().length;
if(h!=g){this.setRawValue(j);
this.selectText(h,j.length)
}}},onSelect:function(d,c){if(this.fireEvent("beforeselect",this,d,c)!==false){this.setValue(d.data[this.valueField||this.displayField]);
this.collapse();
this.fireEvent("select",this,d,c)
}},getName:function(){var b=this.hiddenField;
return b&&b.name?b.name:this.hiddenName||Ext.form.ComboBox.superclass.getName.call(this)
},getValue:function(){if(this.valueField){return Ext.isDefined(this.value)?this.value:""
}else{return Ext.form.ComboBox.superclass.getValue.call(this)
}},clearValue:function(){if(this.hiddenField){this.hiddenField.value=""
}this.setRawValue("");
this.lastSelectionText="";
this.applyEmptyText();
this.value=""
},setValue:function(e){var g=e;
if(this.valueField){var d=this.findRecord(this.valueField,e);
if(d){g=d.data[this.displayField]
}else{if(Ext.isDefined(this.valueNotFoundText)){g=this.valueNotFoundText
}}}this.lastSelectionText=g;
if(this.hiddenField){this.hiddenField.value=e
}Ext.form.ComboBox.superclass.setValue.call(this,g);
this.value=e;
return this
},findRecord:function(g,d){var e;
if(this.store.getCount()>0){this.store.each(function(a){if(a.data[g]==d){e=a;
return false
}})
}return e
},onViewMove:function(c,d){this.inKeyMode=false
},onViewOver:function(h,e){if(this.inKeyMode){return
}var j=this.view.findItemFromChild(e);
if(j){var g=this.view.indexOf(j);
this.select(g,false)
}},onViewClick:function(e){var g=this.view.getSelectedIndexes()[0],j=this.store,h=j.getAt(g);
if(h){this.onSelect(h,g)
}else{if(j.getCount()===0){this.onEmptyResults()
}}if(e!==false){this.el.focus()
}},restrictHeight:function(){this.innerList.dom.style.height="";
var h=this.innerList.dom,l=this.list.getFrameWidth("tb")+(this.resizable?this.handleHeight:0)+this.assetHeight,n=Math.max(h.clientHeight,h.offsetHeight,h.scrollHeight),j=this.getPosition()[1]-Ext.getBody().getScroll().top,k=Ext.lib.Dom.getViewHeight()-j-this.getSize().height,m=Math.max(j,k,this.minHeight||0)-this.list.shadowOffset-l-5;
n=Math.min(n,m,this.maxHeight);
this.innerList.setHeight(n);
this.list.beginUpdate();
this.list.setHeight(n+l);
this.list.alignTo(this.wrap,this.listAlign);
this.list.endUpdate()
},onEmptyResults:function(){this.collapse()
},isExpanded:function(){return this.list&&this.list.isVisible()
},selectByValue:function(e,g){if(!Ext.isEmpty(e,true)){var d=this.findRecord(this.valueField||this.displayField,e);
if(d){this.select(this.store.indexOf(d),g);
return true
}}return false
},select:function(e,g){this.selectedIndex=e;
this.view.select(e);
if(g!==false){var d=this.view.getNode(e);
if(d){this.innerList.scrollChildIntoView(d,false)
}}},selectNext:function(){var b=this.store.getCount();
if(b>0){if(this.selectedIndex==-1){this.select(0)
}else{if(this.selectedIndex<b-1){this.select(this.selectedIndex+1)
}}}},selectPrev:function(){var b=this.store.getCount();
if(b>0){if(this.selectedIndex==-1){this.select(0)
}else{if(this.selectedIndex!==0){this.select(this.selectedIndex-1)
}}}},onKeyUp:function(c){var d=c.getKey();
if(this.editable!==false&&this.readOnly!==true&&(d==c.BACKSPACE||!c.isSpecialKey())){this.lastKey=d;
this.dqTask.delay(this.queryDelay)
}Ext.form.ComboBox.superclass.onKeyUp.call(this,c)
},validateBlur:function(){return !this.list||!this.list.isVisible()
},initQuery:function(){this.doQuery(this.getRawValue())
},beforeBlur:function(){var c=this.getRawValue(),d=this.findRecord(this.displayField,c);
if(!d&&this.forceSelection){if(c.length>0&&c!=this.emptyText){this.el.dom.value=Ext.isEmpty(this.lastSelectionText)?"":this.lastSelectionText;
this.applyEmptyText()
}else{this.clearValue()
}}else{if(d){c=d.get(this.valueField||this.displayField)
}this.setValue(c)
}},doQuery:function(g,d){g=Ext.isEmpty(g)?"":g;
var e={query:g,forceAll:d,combo:this,cancel:false};
if(this.fireEvent("beforequery",e)===false||e.cancel){return false
}g=e.query;
d=e.forceAll;
if(d===true||(g.length>=this.minChars)){if(this.lastQuery!==g){this.lastQuery=g;
if(this.mode=="local"){this.selectedIndex=-1;
if(d){this.store.clearFilter()
}else{this.store.filter(this.displayField,g)
}this.onLoad()
}else{this.store.baseParams[this.queryParam]=g;
this.store.load({params:this.getParams(g)});
this.expand()
}}else{this.selectedIndex=-1;
this.onLoad()
}}},getParams:function(d){var c={};
if(this.pageSize){c.start=0;
c.limit=this.pageSize
}return c
},collapse:function(){if(!this.isExpanded()){return
}this.list.hide();
Ext.getDoc().un("mousewheel",this.collapseIf,this);
Ext.getDoc().un("mousedown",this.collapseIf,this);
this.fireEvent("collapse",this)
},collapseIf:function(b){if(!b.within(this.wrap)&&!b.within(this.list)){this.collapse()
}},expand:function(){if(this.isExpanded()||!this.hasFocus){return
}if(this.bufferSize){this.doResize(this.bufferSize);
delete this.bufferSize
}this.list.alignTo(this.wrap,this.listAlign);
this.list.show();
if(Ext.isGecko2){this.innerList.setOverflow("auto")
}this.mon(Ext.getDoc(),{scope:this,mousewheel:this.collapseIf,mousedown:this.collapseIf});
this.fireEvent("expand",this)
},onTriggerClick:function(){if(this.readOnly||this.disabled){return
}if(this.isExpanded()){this.collapse();
this.el.focus()
}else{this.onFocus({});
if(this.triggerAction=="all"){this.doQuery(this.allQuery,true)
}else{this.doQuery(this.getRawValue())
}this.el.focus()
}}});
Ext.reg("combo",Ext.form.ComboBox);
Ext.form.Checkbox=Ext.extend(Ext.form.Field,{focusClass:undefined,fieldClass:"x-form-field",checked:false,defaultAutoCreate:{tag:"input",type:"checkbox",autocomplete:"off"},actionMode:"wrap",initComponent:function(){Ext.form.Checkbox.superclass.initComponent.call(this);
this.addEvents("check")
},onResize:function(){Ext.form.Checkbox.superclass.onResize.apply(this,arguments);
if(!this.boxLabel&&!this.fieldLabel){this.el.alignTo(this.wrap,"c-c")
}},initEvents:function(){Ext.form.Checkbox.superclass.initEvents.call(this);
this.mon(this.el,{scope:this,click:this.onClick,change:this.onClick})
},markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn,onRender:function(c,d){Ext.form.Checkbox.superclass.onRender.call(this,c,d);
if(this.inputValue!==undefined){this.el.dom.value=this.inputValue
}this.wrap=this.el.wrap({cls:"x-form-check-wrap"});
if(this.boxLabel){this.wrap.createChild({tag:"label",htmlFor:this.el.id,cls:"x-form-cb-label",html:this.boxLabel})
}if(this.checked){this.setValue(true)
}else{this.checked=this.el.dom.checked
}if(Ext.isIE){this.wrap.repaint()
}this.resizeEl=this.positionEl=this.wrap
},onDestroy:function(){Ext.destroy(this.wrap);
Ext.form.Checkbox.superclass.onDestroy.call(this)
},initValue:function(){this.originalValue=this.getValue()
},getValue:function(){if(this.rendered){return this.el.dom.checked
}return this.checked
},onClick:function(){if(this.el.dom.checked!=this.checked){this.setValue(this.el.dom.checked)
}},setValue:function(d){var c=this.checked;
this.checked=(d===true||d==="true"||d=="1"||String(d).toLowerCase()=="on");
if(this.rendered){this.el.dom.checked=this.checked;
this.el.dom.defaultChecked=this.checked
}if(c!=this.checked){this.fireEvent("check",this,this.checked);
if(this.handler){this.handler.call(this.scope||this,this,this.checked)
}}return this
}});
Ext.reg("checkbox",Ext.form.Checkbox);
Ext.form.CheckboxGroup=Ext.extend(Ext.form.Field,{columns:"auto",vertical:false,allowBlank:true,blankText:"You must select at least one item in this group",defaultType:"checkbox",groupCls:"x-form-check-group",initComponent:function(){this.addEvents("change");
this.on("change",this.validate,this);
Ext.form.CheckboxGroup.superclass.initComponent.call(this)
},onRender:function(y,A){if(!this.el){var t={autoEl:{id:this.id},cls:this.groupCls,layout:"column",renderTo:y,bufferResize:false};
var F={xtype:"container",defaultType:this.defaultType,layout:"form",defaults:{hideLabel:true,anchor:"100%"}};
if(this.items[0].items){Ext.apply(t,{layoutConfig:{columns:this.items.length},defaults:this.defaults,items:this.items});
for(var B=0,w=this.items.length;
B<w;
B++){Ext.applyIf(this.items[B],F)
}}else{var C,v=[];
if(typeof this.columns=="string"){this.columns=this.items.length
}if(!Ext.isArray(this.columns)){var x=[];
for(var B=0;
B<this.columns;
B++){x.push((100/this.columns)*0.01)
}this.columns=x
}C=this.columns.length;
for(var B=0;
B<C;
B++){var E=Ext.apply({items:[]},F);
E[this.columns[B]<=1?"columnWidth":"width"]=this.columns[B];
if(this.defaults){E.defaults=Ext.apply(E.defaults||{},this.defaults)
}v.push(E)
}if(this.vertical){var l=Math.ceil(this.items.length/C),u=0;
for(var B=0,w=this.items.length;
B<w;
B++){if(B>0&&B%l==0){u++
}if(this.items[B].fieldLabel){this.items[B].hideLabel=false
}v[u].items.push(this.items[B])
}}else{for(var B=0,w=this.items.length;
B<w;
B++){var s=B%C;
if(this.items[B].fieldLabel){this.items[B].hideLabel=false
}v[s].items.push(this.items[B])
}}Ext.apply(t,{layoutConfig:{columns:C},items:v})
}this.panel=new Ext.Container(t);
this.panel.ownerCt=this;
this.el=this.panel.getEl();
if(this.forId&&this.itemCls){var D=this.el.up(this.itemCls).child("label",true);
if(D){D.setAttribute("htmlFor",this.forId)
}}var z=this.panel.findBy(function(a){return a.isFormField
},this);
this.items=new Ext.util.MixedCollection();
this.items.addAll(z)
}Ext.form.CheckboxGroup.superclass.onRender.call(this,y,A)
},initValue:function(){if(this.value){this.setValue.apply(this,this.buffered?this.value:[this.value]);
delete this.buffered;
delete this.value
}},afterRender:function(){Ext.form.CheckboxGroup.superclass.afterRender.call(this);
this.eachItem(function(b){b.on("check",this.fireChecked,this);
b.inGroup=true
})
},doLayout:function(){if(this.rendered){this.panel.forceLayout=this.ownerCt.forceLayout;
this.panel.doLayout()
}},fireChecked:function(){var b=[];
this.eachItem(function(a){if(a.checked){b.push(a)
}});
this.fireEvent("change",this,b)
},validateValue:function(d){if(!this.allowBlank){var c=true;
this.eachItem(function(a){if(a.checked){return(c=false)
}});
if(c){this.markInvalid(this.blankText);
return false
}}return true
},isDirty:function(){if(this.disabled||!this.rendered){return false
}var b=false;
this.eachItem(function(a){if(a.isDirty()){b=true;
return false
}});
return b
},onDisable:function(){this.eachItem(function(b){b.disable()
})
},onEnable:function(){this.eachItem(function(b){b.enable()
})
},doLayout:function(){if(this.rendered){this.panel.forceLayout=this.ownerCt.forceLayout;
this.panel.doLayout()
}},onResize:function(d,c){this.panel.setSize(d,c);
this.panel.doLayout()
},reset:function(){this.eachItem(function(b){if(b.reset){b.reset()
}});
(function(){this.clearInvalid()
}).defer(50,this)
},setValue:function(){if(this.rendered){this.onSetValue.apply(this,arguments)
}else{this.buffered=true;
this.value=arguments
}return this
},onSetValue:function(h,j){if(arguments.length==1){if(Ext.isArray(h)){Ext.each(h,function(a,c){var b=this.items.itemAt(c);
if(b){b.setValue(a)
}},this)
}else{if(Ext.isObject(h)){for(var g in h){var e=this.getBox(g);
if(e){e.setValue(h[g])
}}}else{this.setValueForItem(h)
}}}else{var e=this.getBox(h);
if(e){e.setValue(j)
}}},beforeDestroy:function(){Ext.destroy(this.panel);
Ext.form.CheckboxGroup.superclass.beforeDestroy.call(this)
},setValueForItem:function(b){b=String(b).split(",");
this.eachItem(function(a){if(b.indexOf(a.inputValue)>-1){a.setValue(true)
}})
},getBox:function(c){var d=null;
this.eachItem(function(a){if(c==a||a.dataIndex==c||a.id==c||a.getName()==c){d=a;
return false
}});
return d
},getValue:function(){var b=[];
this.eachItem(function(a){if(a.checked){b.push(a)
}});
return b
},eachItem:function(b){if(this.items&&this.items.each){this.items.each(b,this)
}},getRawValue:Ext.emptyFn,setRawValue:Ext.emptyFn});
Ext.reg("checkboxgroup",Ext.form.CheckboxGroup);
Ext.form.Radio=Ext.extend(Ext.form.Checkbox,{inputType:"radio",markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn,getGroupValue:function(){var d=this.el.up("form")||Ext.getBody();
var c=d.child("input[name="+this.el.dom.name+"]:checked",true);
return c?c.value:null
},onClick:function(){if(this.el.dom.checked!=this.checked){var b=this.getCheckEl().select("input[name="+this.el.dom.name+"]");
b.each(function(a){if(a.dom.id==this.id){this.setValue(true)
}else{Ext.getCmp(a.dom.id).setValue(false)
}},this)
}},setValue:function(d){if(typeof d=="boolean"){Ext.form.Radio.superclass.setValue.call(this,d)
}else{var c=this.getCheckEl().child("input[name="+this.el.dom.name+"][value="+d+"]",true);
if(c){Ext.getCmp(c.id).setValue(true)
}}return this
},getCheckEl:function(){if(this.inGroup){return this.el.up(".x-form-radio-group")
}return this.el.up("form")||Ext.getBody()
}});
Ext.reg("radio",Ext.form.Radio);
Ext.form.RadioGroup=Ext.extend(Ext.form.CheckboxGroup,{allowBlank:true,blankText:"You must select one item in this group",defaultType:"radio",groupCls:"x-form-radio-group",getValue:function(){var b=null;
this.eachItem(function(a){if(a.checked){b=a;
return false
}});
return b
},onSetValue:function(g,d){if(arguments.length>1){var e=this.getBox(g);
if(e){e.setValue(d);
if(e.checked){this.eachItem(function(a){if(a!==e){a.setValue(false)
}})
}}}else{this.setValueForItem(g)
}},setValueForItem:function(b){b=String(b).split(",")[0];
this.eachItem(function(a){a.setValue(b==a.inputValue)
})
},fireChecked:function(){if(!this.checkTask){this.checkTask=new Ext.util.DelayedTask(this.bufferChecked,this)
}this.checkTask.delay(10)
},bufferChecked:function(){var b=null;
this.eachItem(function(a){if(a.checked){b=a;
return false
}});
this.fireEvent("change",this,b)
},onDestroy:function(){if(this.checkTask){this.checkTask.cancel();
this.checkTask=null
}Ext.form.RadioGroup.superclass.onDestroy.call(this)
}});
Ext.reg("radiogroup",Ext.form.RadioGroup);
Ext.form.Hidden=Ext.extend(Ext.form.Field,{inputType:"hidden",onRender:function(){Ext.form.Hidden.superclass.onRender.apply(this,arguments)
},initEvents:function(){this.originalValue=this.getValue()
},setSize:Ext.emptyFn,setWidth:Ext.emptyFn,setHeight:Ext.emptyFn,setPosition:Ext.emptyFn,setPagePosition:Ext.emptyFn,markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn});
Ext.reg("hidden",Ext.form.Hidden);
Ext.form.BasicForm=function(c,d){Ext.apply(this,d);
if(Ext.isString(this.paramOrder)){this.paramOrder=this.paramOrder.split(/[\s,|]/)
}this.items=new Ext.util.MixedCollection(false,function(a){return a.getItemId()
});
this.addEvents("beforeaction","actionfailed","actioncomplete");
if(c){this.initEl(c)
}Ext.form.BasicForm.superclass.constructor.call(this)
};
Ext.extend(Ext.form.BasicForm,Ext.util.Observable,{timeout:30,paramOrder:undefined,paramsAsHash:false,waitTitle:"Please Wait...",activeAction:null,trackResetOnLoad:false,initEl:function(b){this.el=Ext.get(b);
this.id=this.el.id||Ext.id();
if(!this.standardSubmit){this.el.on("submit",this.onSubmit,this)
}this.el.addClass("x-form")
},getEl:function(){return this.el
},onSubmit:function(b){b.stopEvent()
},destroy:function(){this.items.each(function(b){Ext.destroy(b)
});
if(this.el){this.el.removeAllListeners();
this.el.remove()
}this.purgeListeners()
},isValid:function(){var b=true;
this.items.each(function(a){if(!a.validate()){b=false
}});
return b
},isDirty:function(){var b=false;
this.items.each(function(a){if(a.isDirty()){b=true;
return false
}});
return b
},doAction:function(c,d){if(Ext.isString(c)){c=new Ext.form.Action.ACTION_TYPES[c](this,d)
}if(this.fireEvent("beforeaction",this,c)!==false){this.beforeAction(c);
c.run.defer(100,c)
}return this
},submit:function(e){if(this.standardSubmit){var g=this.isValid();
if(g){var j=this.el.dom;
if(this.url&&Ext.isEmpty(j.action)){j.action=this.url
}j.submit()
}return g
}var h=String.format("{0}submit",this.api?"direct":"");
this.doAction(h,e);
return this
},load:function(d){var c=String.format("{0}load",this.api?"direct":"");
this.doAction(c,d);
return this
},updateRecord:function(c){c.beginEdit();
var d=c.fields;
d.each(function(b){var a=this.findField(b.name);
if(a){c.set(b.name,a.getValue())
}},this);
c.endEdit();
return this
},loadRecord:function(b){this.setValues(b.data);
return this
},beforeAction:function(d){var c=d.options;
if(c.waitMsg){if(this.waitMsgTarget===true){this.el.mask(c.waitMsg,"x-mask-loading")
}else{if(this.waitMsgTarget){this.waitMsgTarget=Ext.get(this.waitMsgTarget);
this.waitMsgTarget.mask(c.waitMsg,"x-mask-loading")
}else{Ext.MessageBox.wait(c.waitMsg,c.waitTitle||this.waitTitle)
}}}},afterAction:function(e,g){this.activeAction=null;
var d=e.options;
if(d.waitMsg){if(this.waitMsgTarget===true){this.el.unmask()
}else{if(this.waitMsgTarget){this.waitMsgTarget.unmask()
}else{Ext.MessageBox.updateProgress(1);
Ext.MessageBox.hide()
}}}if(g){if(d.reset){this.reset()
}Ext.callback(d.success,d.scope,[this,e]);
this.fireEvent("actioncomplete",this,e)
}else{Ext.callback(d.failure,d.scope,[this,e]);
this.fireEvent("actionfailed",this,e)
}},findField:function(c){var d=this.items.get(c);
if(!Ext.isObject(d)){this.items.each(function(a){if(a.isFormField&&(a.dataIndex==c||a.id==c||a.getName()==c)){d=a;
return false
}})
}return d||null
},markInvalid:function(l){if(Ext.isArray(l)){for(var p=0,k=l.length;
p<k;
p++){var j=l[p];
var o=this.findField(j.id);
if(o){o.markInvalid(j.msg)
}}}else{var n,m;
for(m in l){if(!Ext.isFunction(l[m])&&(n=this.findField(m))){n.markInvalid(l[m])
}}}return this
},setValues:function(p){if(Ext.isArray(p)){for(var o=0,k=p.length;
o<k;
o++){var j=p[o];
var n=this.findField(j.id);
if(n){n.setValue(j.value);
if(this.trackResetOnLoad){n.originalValue=n.getValue()
}}}}else{var m,l;
for(l in p){if(!Ext.isFunction(p[l])&&(m=this.findField(l))){m.setValue(p[l]);
if(this.trackResetOnLoad){m.originalValue=m.getValue()
}}}}return this
},getValues:function(c){var d=Ext.lib.Ajax.serializeForm(this.el.dom);
if(c===true){return d
}return Ext.urlDecode(d)
},getFieldValues:function(h){var k={},j,g,l;
this.items.each(function(a){if(h!==true||a.isDirty()){j=a.getName();
g=k[j];
l=a.getValue();
if(Ext.isDefined(g)){if(Ext.isArray(g)){k[j].push(l)
}else{k[j]=[g,l]
}}else{k[j]=l
}}});
return k
},clearInvalid:function(){this.items.each(function(b){b.clearInvalid()
});
return this
},reset:function(){this.items.each(function(b){b.reset()
});
return this
},add:function(){this.items.addAll(Array.prototype.slice.call(arguments,0));
return this
},remove:function(b){this.items.remove(b);
return this
},render:function(){this.items.each(function(b){if(b.isFormField&&!b.rendered&&document.getElementById(b.id)){b.applyToMarkup(b.id)
}});
return this
},applyToFields:function(b){this.items.each(function(a){Ext.apply(a,b)
});
return this
},applyIfToFields:function(b){this.items.each(function(a){Ext.applyIf(a,b)
});
return this
},callFieldMethod:function(c,d){d=d||[];
this.items.each(function(a){if(Ext.isFunction(a[c])){a[c].apply(a,d)
}});
return this
}});
Ext.BasicForm=Ext.form.BasicForm;
Ext.FormPanel=Ext.extend(Ext.Panel,{minButtonWidth:75,labelAlign:"left",monitorValid:false,monitorPoll:200,layout:"form",initComponent:function(){this.form=this.createForm();
Ext.FormPanel.superclass.initComponent.call(this);
this.bodyCfg={tag:"form",cls:this.baseCls+"-body",method:this.method||"POST",id:this.formId||Ext.id()};
if(this.fileUpload){this.bodyCfg.enctype="multipart/form-data"
}this.initItems();
this.addEvents("clientvalidation");
this.relayEvents(this.form,["beforeaction","actionfailed","actioncomplete"])
},createForm:function(){var b=Ext.applyIf({listeners:{}},this.initialConfig);
return new Ext.form.BasicForm(null,b)
},initFields:function(){var g=this.form;
var e=this;
var d=function(a){if(e.isField(a)){g.add(a)
}else{if(a.findBy&&a!=e){e.applySettings(a);
if(a.items&&a.items.each){a.items.each(d,this)
}}}};
this.items.each(d,this)
},applySettings:function(c){var d=c.ownerCt;
Ext.applyIf(c,{labelAlign:d.labelAlign,labelWidth:d.labelWidth,itemCls:d.itemCls})
},getLayoutTarget:function(){return this.form.el
},getForm:function(){return this.form
},onRender:function(c,d){this.initFields();
Ext.FormPanel.superclass.onRender.call(this,c,d);
this.form.initEl(this.body)
},beforeDestroy:function(){this.stopMonitoring();
Ext.destroy(this.form);
this.form.items.clear();
Ext.FormPanel.superclass.beforeDestroy.call(this)
},isField:function(b){return !!b.setValue&&!!b.getValue&&!!b.markInvalid&&!!b.clearInvalid
},initEvents:function(){Ext.FormPanel.superclass.initEvents.call(this);
this.on({scope:this,add:this.onAddEvent,remove:this.onRemoveEvent});
if(this.monitorValid){this.startMonitoring()
}},onAdd:function(b){Ext.FormPanel.superclass.onAdd.call(this,b);
this.processAdd(b)
},onAddEvent:function(d,c){if(d!==this){this.processAdd(c)
}},processAdd:function(b){if(this.isField(b)){this.form.add(b)
}else{if(b.findBy){this.applySettings(b);
this.form.add.apply(this.form,b.findBy(this.isField))
}}},onRemove:function(b){Ext.FormPanel.superclass.onRemove.call(this,b);
this.processRemove(b)
},onRemoveEvent:function(d,c){if(d!==this){this.processRemove(c)
}},processRemove:function(c){if(this.isField(c)){this.form.remove(c)
}else{if(c.findBy){var d=function(a){return !!a.isDestroyed
};
this.form.items.filterBy(d,this.form).each(this.form.remove,this.form)
}}},startMonitoring:function(){if(!this.validTask){this.validTask=new Ext.util.TaskRunner();
this.validTask.start({run:this.bindHandler,interval:this.monitorPoll||200,scope:this})
}},stopMonitoring:function(){if(this.validTask){this.validTask.stopAll();
this.validTask=null
}},load:function(){this.form.load.apply(this.form,arguments)
},onDisable:function(){Ext.FormPanel.superclass.onDisable.call(this);
if(this.form){this.form.items.each(function(){this.disable()
})
}},onEnable:function(){Ext.FormPanel.superclass.onEnable.call(this);
if(this.form){this.form.items.each(function(){this.enable()
})
}},bindHandler:function(){var j=true;
this.form.items.each(function(a){if(!a.isValid(true)){j=false;
return false
}});
if(this.fbar){var g=this.fbar.items.items;
for(var k=0,h=g.length;
k<h;
k++){var l=g[k];
if(l.formBind===true&&l.disabled===j){l.setDisabled(!j)
}}}this.fireEvent("clientvalidation",this,j)
}});
Ext.reg("form",Ext.FormPanel);
Ext.form.FormPanel=Ext.FormPanel;
Ext.form.FieldSet=Ext.extend(Ext.Panel,{baseCls:"x-fieldset",layout:"form",animCollapse:false,onRender:function(d,e){if(!this.el){this.el=document.createElement("fieldset");
this.el.id=this.id;
if(this.title||this.header||this.checkboxToggle){this.el.appendChild(document.createElement("legend")).className="x-fieldset-header"
}}Ext.form.FieldSet.superclass.onRender.call(this,d,e);
if(this.checkboxToggle){var g=typeof this.checkboxToggle=="object"?this.checkboxToggle:{tag:"input",type:"checkbox",name:this.checkboxName||this.id+"-checkbox"};
this.checkbox=this.header.insertFirst(g);
this.checkbox.dom.checked=!this.collapsed;
this.mon(this.checkbox,"click",this.onCheckClick,this)
}},onCollapse:function(d,c){if(this.checkbox){this.checkbox.dom.checked=false
}Ext.form.FieldSet.superclass.onCollapse.call(this,d,c)
},onExpand:function(d,c){if(this.checkbox){this.checkbox.dom.checked=true
}Ext.form.FieldSet.superclass.onExpand.call(this,d,c)
},onCheckClick:function(){this[this.checkbox.dom.checked?"expand":"collapse"]()
}});
Ext.reg("fieldset",Ext.form.FieldSet);
Ext.form.HtmlEditor=Ext.extend(Ext.form.Field,{enableFormat:true,enableFontSize:true,enableColors:true,enableAlignments:true,enableLists:true,enableSourceEdit:true,enableLinks:true,enableFont:true,createLinkText:"Please enter the URL for the link:",defaultLinkValue:"http://",fontFamilies:["Arial","Courier New","Tahoma","Times New Roman","Verdana"],defaultFont:"tahoma",defaultValue:(Ext.isOpera||Ext.isIE6)?"&#160;":"&#8203;",actionMode:"wrap",validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Ext.emptyFn,iframePad:3,hideMode:"offsets",defaultAutoCreate:{tag:"textarea",style:"width:500px;height:300px;",autocomplete:"off"},initComponent:function(){this.addEvents("initialize","activate","beforesync","beforepush","sync","push","editmodechange")
},createFontOptions:function(){var m=[],h=this.fontFamilies,n,k;
for(var l=0,j=h.length;
l<j;
l++){n=h[l];
k=n.toLowerCase();
m.push('<option value="',k,'" style="font-family:',n,';"',(this.defaultFont==k?' selected="true">':">"),n,"</option>")
}return m.join("")
},createToolbar:function(l){var n=[];
var j=Ext.QuickTips&&Ext.QuickTips.isEnabled();
function m(a,c,b){return{itemId:a,cls:"x-btn-icon",iconCls:"x-edit-"+a,enableToggle:c!==false,scope:l,handler:b||l.relayBtnCmd,clickEvent:"mousedown",tooltip:j?l.buttonTips[a]||undefined:undefined,overflowText:l.buttonTips[a].title||undefined,tabIndex:-1}
}if(this.enableFont&&!Ext.isSafari2){var k=new Ext.Toolbar.Item({autoEl:{tag:"select",cls:"x-font-select",html:this.createFontOptions()}});
n.push(k,"-")
}if(this.enableFormat){n.push(m("bold"),m("italic"),m("underline"))
}if(this.enableFontSize){n.push("-",m("increasefontsize",false,this.adjustFont),m("decreasefontsize",false,this.adjustFont))
}if(this.enableColors){n.push("-",{itemId:"forecolor",cls:"x-btn-icon",iconCls:"x-edit-forecolor",clickEvent:"mousedown",tooltip:j?l.buttonTips.forecolor||undefined:undefined,tabIndex:-1,menu:new Ext.menu.ColorMenu({allowReselect:true,focus:Ext.emptyFn,value:"000000",plain:true,listeners:{scope:this,select:function(a,b){this.execCmd("forecolor",Ext.isWebKit||Ext.isIE?"#"+b:b);
this.deferFocus()
}},clickEvent:"mousedown"})},{itemId:"backcolor",cls:"x-btn-icon",iconCls:"x-edit-backcolor",clickEvent:"mousedown",tooltip:j?l.buttonTips.backcolor||undefined:undefined,tabIndex:-1,menu:new Ext.menu.ColorMenu({focus:Ext.emptyFn,value:"FFFFFF",plain:true,allowReselect:true,listeners:{scope:this,select:function(a,b){if(Ext.isGecko){this.execCmd("useCSS",false);
this.execCmd("hilitecolor",b);
this.execCmd("useCSS",true);
this.deferFocus()
}else{this.execCmd(Ext.isOpera?"hilitecolor":"backcolor",Ext.isWebKit||Ext.isIE?"#"+b:b);
this.deferFocus()
}}},clickEvent:"mousedown"})})
}if(this.enableAlignments){n.push("-",m("justifyleft"),m("justifycenter"),m("justifyright"))
}if(!Ext.isSafari2){if(this.enableLinks){n.push("-",m("createlink",false,this.createLink))
}if(this.enableLists){n.push("-",m("insertorderedlist"),m("insertunorderedlist"))
}if(this.enableSourceEdit){n.push("-",m("sourceedit",true,function(a){this.toggleSourceEdit(!this.sourceEditMode)
}))
}}var h=new Ext.Toolbar({renderTo:this.wrap.dom.firstChild,items:n});
if(k){this.fontSelect=k.el;
this.mon(this.fontSelect,"change",function(){var a=this.fontSelect.dom.value;
this.relayCmd("fontname",a);
this.deferFocus()
},this)
}this.mon(h.el,"click",function(a){a.preventDefault()
});
this.tb=h
},onDisable:function(){this.wrap.mask();
Ext.form.HtmlEditor.superclass.onDisable.call(this)
},onEnable:function(){this.wrap.unmask();
Ext.form.HtmlEditor.superclass.onEnable.call(this)
},setReadOnly:function(g){if(this.initialized){var e=g?"off":"on",d=this.getDoc();
if(String(d.designMode).toLowerCase()!=e){d.designMode=e
}this.disableItems(!g)
}Ext.form.HtmlEditor.superclass.setReadOnly.call(this,g)
},getDocMarkup:function(){return'<html><head><style type="text/css">body{border:0;margin:0;padding:3px;height:98%;cursor:text;}</style></head><body></body></html>'
},getEditorBody:function(){var b=this.getDoc();
return b.body||b.documentElement
},getDoc:function(){return Ext.isIE?this.getWin().document:(this.iframe.contentDocument||this.getWin().document)
},getWin:function(){return Ext.isIE?this.iframe.contentWindow:window.frames[this.iframe.name]
},onRender:function(d,e){Ext.form.HtmlEditor.superclass.onRender.call(this,d,e);
this.el.dom.style.border="0 none";
this.el.dom.setAttribute("tabIndex",-1);
this.el.addClass("x-hidden");
if(Ext.isIE){this.el.applyStyles("margin-top:-1px;margin-bottom:-1px;")
}this.wrap=this.el.wrap({cls:"x-html-editor-wrap",cn:{cls:"x-html-editor-tb"}});
this.createToolbar(this);
this.disableItems(true);
this.createIFrame();
if(!this.width){var g=this.el.getSize();
this.setSize(g.width,this.height||g.height)
}this.resizeEl=this.positionEl=this.wrap
},createIFrame:function(){var b=document.createElement("iframe");
b.name=Ext.id();
b.frameBorder="0";
b.src=Ext.SSL_SECURE_URL;
this.wrap.dom.appendChild(b);
this.iframe=b;
this.monitorTask=Ext.TaskMgr.start({run:this.checkDesignMode,scope:this,interval:100})
},initFrame:function(){Ext.TaskMgr.stop(this.monitorTask);
var c=this.getDoc();
this.win=this.getWin();
c.open();
c.write(this.getDocMarkup());
c.close();
var d={run:function(){var a=this.getDoc();
if(a.body||a.readyState=="complete"){Ext.TaskMgr.stop(d);
a.designMode="on";
this.initEditor.defer(10,this)
}},interval:10,duration:10000,scope:this};
Ext.TaskMgr.start(d)
},checkDesignMode:function(){if(this.wrap&&this.wrap.dom.offsetWidth){var b=this.getDoc();
if(!b){return
}if(!b.editorInitialized||String(b.designMode).toLowerCase()!="on"){this.initFrame()
}}},disableItems:function(b){if(this.fontSelect){this.fontSelect.dom.disabled=b
}this.tb.items.each(function(a){if(a.getItemId()!="sourceedit"){a.setDisabled(b)
}})
},onResize:function(g,l){Ext.form.HtmlEditor.superclass.onResize.apply(this,arguments);
if(this.el&&this.iframe){if(Ext.isNumber(g)){var j=g-this.wrap.getFrameWidth("lr");
this.el.setWidth(j);
this.tb.setWidth(j);
this.iframe.style.width=Math.max(j,0)+"px"
}if(Ext.isNumber(l)){var h=l-this.wrap.getFrameWidth("tb")-this.tb.el.getHeight();
this.el.setHeight(h);
this.iframe.style.height=Math.max(h,0)+"px";
var k=this.getEditorBody();
if(k){k.style.height=Math.max((h-(this.iframePad*2)),0)+"px"
}}}},toggleSourceEdit:function(e){if(e===undefined){e=!this.sourceEditMode
}this.sourceEditMode=e===true;
var g=this.tb.getComponent("sourceedit");
if(g.pressed!==this.sourceEditMode){g.toggle(this.sourceEditMode);
if(!g.xtbHidden){return
}}if(this.sourceEditMode){this.disableItems(true);
this.syncValue();
this.iframe.className="x-hidden";
this.el.removeClass("x-hidden");
this.el.dom.removeAttribute("tabIndex");
this.el.focus()
}else{if(this.initialized&&!this.readOnly){this.disableItems(false)
}this.pushValue();
this.iframe.className="";
this.el.addClass("x-hidden");
this.el.dom.setAttribute("tabIndex",-1);
this.deferFocus()
}var d=this.lastSize;
if(d){delete this.lastSize;
this.setSize(d)
}this.fireEvent("editmodechange",this,this.sourceEditMode)
},createLink:function(){var b=prompt(this.createLinkText,this.defaultLinkValue);
if(b&&b!="http://"){this.relayCmd("createlink",b)
}},initEvents:function(){this.originalValue=this.getValue()
},markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn,setValue:function(b){Ext.form.HtmlEditor.superclass.setValue.call(this,b);
this.pushValue();
return this
},cleanHtml:function(b){b=String(b);
if(Ext.isWebKit){b=b.replace(/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi,"")
}if(b.charCodeAt(0)==this.defaultValue.replace(/\D/g,"")){b=b.substring(1)
}return b
},syncValue:function(){if(this.initialized){var h=this.getEditorBody();
var j=h.innerHTML;
if(Ext.isWebKit){var e=h.getAttribute("style");
var g=e.match(/text-align:(.*?);/i);
if(g&&g[1]){j='<div style="'+g[0]+'">'+j+"</div>"
}}j=this.cleanHtml(j);
if(this.fireEvent("beforesync",this,j)!==false){this.el.dom.value=j;
this.fireEvent("sync",this,j)
}}},getValue:function(){this[this.sourceEditMode?"pushValue":"syncValue"]();
return Ext.form.HtmlEditor.superclass.getValue.call(this)
},pushValue:function(){if(this.initialized){var e=this.el.dom.value;
if(!this.activated&&e.length<1){e=this.defaultValue
}if(this.fireEvent("beforepush",this,e)!==false){this.getEditorBody().innerHTML=e;
if(Ext.isGecko){var g=this.getDoc(),d=g.designMode.toLowerCase();
g.designMode=d.toggle("on","off");
g.designMode=d
}this.fireEvent("push",this,e)
}}},deferFocus:function(){this.focus.defer(10,this)
},focus:function(){if(this.win&&!this.sourceEditMode){this.win.focus()
}else{this.el.focus()
}},initEditor:function(){try{var l=this.getEditorBody(),h=this.el.getStyles("font-size","font-family","background-image","background-repeat"),j,e;
h["background-attachment"]="fixed";
l.bgProperties="fixed";
Ext.DomHelper.applyStyles(l,h);
j=this.getDoc();
if(j){try{Ext.EventManager.removeAll(j)
}catch(k){}}e=this.onEditorEvent.createDelegate(this);
Ext.EventManager.on(j,{mousedown:e,dblclick:e,click:e,keyup:e,buffer:100});
if(Ext.isGecko){Ext.EventManager.on(j,"keypress",this.applyCommand,this)
}if(Ext.isIE||Ext.isWebKit||Ext.isOpera){Ext.EventManager.on(j,"keydown",this.fixKeys,this)
}j.editorInitialized=true;
this.initialized=true;
this.pushValue();
this.setReadOnly(this.readOnly);
this.fireEvent("initialize",this)
}catch(k){}},onDestroy:function(){if(this.monitorTask){Ext.TaskMgr.stop(this.monitorTask)
}if(this.rendered){Ext.destroy(this.tb);
var d=this.getDoc();
if(d){try{Ext.EventManager.removeAll(d);
for(var g in d){delete d[g]
}}catch(e){}}if(this.wrap){this.wrap.dom.innerHTML="";
this.wrap.remove()
}}if(this.el){this.el.removeAllListeners();
this.el.remove()
}this.purgeListeners()
},onFirstFocus:function(){this.activated=true;
this.disableItems(false);
if(Ext.isGecko){this.win.focus();
var e=this.win.getSelection();
if(!e.focusNode||e.focusNode.nodeType!=3){var d=e.getRangeAt(0);
d.selectNodeContents(this.getEditorBody());
d.collapse(true);
this.deferFocus()
}try{this.execCmd("useCSS",true);
this.execCmd("styleWithCSS",false)
}catch(g){}}this.fireEvent("activate",this)
},adjustFont:function(e){var h=e.getItemId()=="increasefontsize"?1:-1,j=this.getDoc(),g=parseInt(j.queryCommandValue("FontSize")||2,10);
if((Ext.isSafari&&!Ext.isSafari2)||Ext.isChrome||Ext.isAir){if(g<=10){g=1+h
}else{if(g<=13){g=2+h
}else{if(g<=16){g=3+h
}else{if(g<=18){g=4+h
}else{if(g<=24){g=5+h
}else{g=6+h
}}}}}g=g.constrain(1,6)
}else{if(Ext.isSafari){h*=2
}g=Math.max(1,g+h)+(Ext.isSafari?"px":0)
}this.execCmd("FontSize",g)
},onEditorEvent:function(b){this.updateToolbar()
},updateToolbar:function(){if(this.readOnly){return
}if(!this.activated){this.onFirstFocus();
return
}var d=this.tb.items.map,g=this.getDoc();
if(this.enableFont&&!Ext.isSafari2){var e=(g.queryCommandValue("FontName")||this.defaultFont).toLowerCase();
if(e!=this.fontSelect.dom.value){this.fontSelect.dom.value=e
}}if(this.enableFormat){d.bold.toggle(g.queryCommandState("bold"));
d.italic.toggle(g.queryCommandState("italic"));
d.underline.toggle(g.queryCommandState("underline"))
}if(this.enableAlignments){d.justifyleft.toggle(g.queryCommandState("justifyleft"));
d.justifycenter.toggle(g.queryCommandState("justifycenter"));
d.justifyright.toggle(g.queryCommandState("justifyright"))
}if(!Ext.isSafari2&&this.enableLists){d.insertorderedlist.toggle(g.queryCommandState("insertorderedlist"));
d.insertunorderedlist.toggle(g.queryCommandState("insertunorderedlist"))
}Ext.menu.MenuMgr.hideAll();
this.syncValue()
},relayBtnCmd:function(b){this.relayCmd(b.getItemId())
},relayCmd:function(c,d){(function(){this.focus();
this.execCmd(c,d);
this.updateToolbar()
}).defer(10,this)
},execCmd:function(d,e){var g=this.getDoc();
g.execCommand(d,false,e===undefined?null:e);
this.syncValue()
},applyCommand:function(c){if(c.ctrlKey){var g=c.getCharCode(),e;
if(g>0){g=String.fromCharCode(g);
switch(g){case"b":e="bold";
break;
case"i":e="italic";
break;
case"u":e="underline";
break
}if(e){this.win.focus();
this.execCmd(e);
this.deferFocus();
c.preventDefault()
}}}},insertAtCursor:function(g){if(!this.activated){return
}if(Ext.isIE){this.win.focus();
var d=this.getDoc(),e=d.selection.createRange();
if(e){e.pasteHTML(g);
this.syncValue();
this.deferFocus()
}}else{this.win.focus();
this.execCmd("InsertHTML",g);
this.deferFocus()
}},fixKeys:function(){if(Ext.isIE){return function(j){var h=j.getKey(),k=this.getDoc(),e;
if(h==j.TAB){j.stopEvent();
e=k.selection.createRange();
if(e){e.collapse(true);
e.pasteHTML("&nbsp;&nbsp;&nbsp;&nbsp;");
this.deferFocus()
}}else{if(h==j.ENTER){e=k.selection.createRange();
if(e){var l=e.parentElement();
if(!l||l.tagName.toLowerCase()!="li"){j.stopEvent();
e.pasteHTML("<br />");
e.collapse(false);
e.select()
}}}}}
}else{if(Ext.isOpera){return function(c){var d=c.getKey();
if(d==c.TAB){c.stopEvent();
this.win.focus();
this.execCmd("InsertHTML","&nbsp;&nbsp;&nbsp;&nbsp;");
this.deferFocus()
}}
}else{if(Ext.isWebKit){return function(c){var d=c.getKey();
if(d==c.TAB){c.stopEvent();
this.execCmd("InsertText","\t");
this.deferFocus()
}else{if(d==c.ENTER){c.stopEvent();
this.execCmd("InsertHtml","<br /><br />");
this.deferFocus()
}}}
}}}}(),getToolbar:function(){return this.tb
},buttonTips:{bold:{title:"Bold (Ctrl+B)",text:"Make the selected text bold.",cls:"x-html-editor-tip"},italic:{title:"Italic (Ctrl+I)",text:"Make the selected text italic.",cls:"x-html-editor-tip"},underline:{title:"Underline (Ctrl+U)",text:"Underline the selected text.",cls:"x-html-editor-tip"},increasefontsize:{title:"Grow Text",text:"Increase the font size.",cls:"x-html-editor-tip"},decreasefontsize:{title:"Shrink Text",text:"Decrease the font size.",cls:"x-html-editor-tip"},backcolor:{title:"Text Highlight Color",text:"Change the background color of the selected text.",cls:"x-html-editor-tip"},forecolor:{title:"Font Color",text:"Change the color of the selected text.",cls:"x-html-editor-tip"},justifyleft:{title:"Align Text Left",text:"Align text to the left.",cls:"x-html-editor-tip"},justifycenter:{title:"Center Text",text:"Center text in the editor.",cls:"x-html-editor-tip"},justifyright:{title:"Align Text Right",text:"Align text to the right.",cls:"x-html-editor-tip"},insertunorderedlist:{title:"Bullet List",text:"Start a bulleted list.",cls:"x-html-editor-tip"},insertorderedlist:{title:"Numbered List",text:"Start a numbered list.",cls:"x-html-editor-tip"},createlink:{title:"Hyperlink",text:"Make the selected text a hyperlink.",cls:"x-html-editor-tip"},sourceedit:{title:"Source Edit",text:"Switch to source editing mode.",cls:"x-html-editor-tip"}}});
Ext.reg("htmleditor",Ext.form.HtmlEditor);
Ext.form.TimeField=Ext.extend(Ext.form.ComboBox,{minValue:undefined,maxValue:undefined,minText:"The time in this field must be equal to or after {0}",maxText:"The time in this field must be equal to or before {0}",invalidText:"{0} is not a valid time",format:"g:i A",altFormats:"g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H",increment:15,mode:"local",triggerAction:"all",typeAhead:false,initDate:"1/1/2008",initComponent:function(){if(Ext.isDefined(this.minValue)){this.setMinValue(this.minValue,true)
}if(Ext.isDefined(this.maxValue)){this.setMaxValue(this.maxValue,true)
}if(!this.store){this.generateStore(true)
}Ext.form.TimeField.superclass.initComponent.call(this)
},setMinValue:function(c,d){this.setLimit(c,true,d);
return this
},setMaxValue:function(c,d){this.setLimit(c,false,d);
return this
},generateStore:function(e){var j=this.minValue||new Date(this.initDate).clearTime(),g=this.maxValue||new Date(this.initDate).clearTime().add("mi",(24*60)-1),h=[];
while(j<=g){h.push(j.dateFormat(this.format));
j=j.add("mi",this.increment)
}this.bindStore(h,e)
},setLimit:function(d,j,h){var k;
if(Ext.isString(d)){k=this.parseDate(d)
}else{if(Ext.isDate(d)){k=d
}}if(k){var l=new Date(this.initDate).clearTime();
l.setHours(k.getHours(),k.getMinutes(),j?0:59,0);
this[j?"minValue":"maxValue"]=l;
if(!h){this.generateStore()
}}},getValue:function(){var b=Ext.form.TimeField.superclass.getValue.call(this);
return this.formatDate(this.parseDate(b))||""
},setValue:function(b){return Ext.form.TimeField.superclass.setValue.call(this,this.formatDate(this.parseDate(b)))
},validateValue:Ext.form.DateField.prototype.validateValue,parseDate:Ext.form.DateField.prototype.parseDate,formatDate:Ext.form.DateField.prototype.formatDate,beforeBlur:function(){var b=this.parseDate(this.getRawValue());
if(b){this.setValue(b.dateFormat(this.format))
}Ext.form.TimeField.superclass.beforeBlur.call(this)
}});
Ext.reg("timefield",Ext.form.TimeField);
Ext.form.Label=Ext.extend(Ext.BoxComponent,{onRender:function(c,d){if(!this.el){this.el=document.createElement("label");
this.el.id=this.getId();
this.el.innerHTML=this.text?Ext.util.Format.htmlEncode(this.text):(this.html||"");
if(this.forId){this.el.setAttribute("for",this.forId)
}}Ext.form.Label.superclass.onRender.call(this,c,d)
},setText:function(e,d){var g=d===false;
this[!g?"text":"html"]=e;
delete this[g?"text":"html"];
if(this.rendered){this.el.dom.innerHTML=d!==false?Ext.util.Format.htmlEncode(e):e
}return this
}});
Ext.reg("label",Ext.form.Label);
Ext.form.Action=function(c,d){this.form=c;
this.options=d||{}
};
Ext.form.Action.CLIENT_INVALID="client";
Ext.form.Action.SERVER_INVALID="server";
Ext.form.Action.CONNECT_FAILURE="connect";
Ext.form.Action.LOAD_FAILURE="load";
Ext.form.Action.prototype={type:"default",run:function(b){},success:function(b){},handleResponse:function(b){},failure:function(b){this.response=b;
this.failureType=Ext.form.Action.CONNECT_FAILURE;
this.form.afterAction(this,false)
},processResponse:function(b){this.response=b;
if(!b.responseText&&!b.responseXML){return true
}this.result=this.handleResponse(b);
return this.result
},getUrl:function(g){var e=this.options.url||this.form.url||this.form.el.dom.action;
if(g){var d=this.getParams();
if(d){e=Ext.urlAppend(e,d)
}}return e
},getMethod:function(){return(this.options.method||this.form.method||this.form.el.dom.method||"POST").toUpperCase()
},getParams:function(){var d=this.form.baseParams;
var c=this.options.params;
if(c){if(typeof c=="object"){c=Ext.urlEncode(Ext.applyIf(c,d))
}else{if(typeof c=="string"&&d){c+="&"+Ext.urlEncode(d)
}}}else{if(d){c=Ext.urlEncode(d)
}}return c
},createCallback:function(b){var b=b||{};
return{success:this.success,failure:this.failure,scope:this,timeout:(b.timeout*1000)||(this.form.timeout*1000),upload:this.form.fileUpload?this.success:undefined}
}};
Ext.form.Action.Submit=function(c,d){Ext.form.Action.Submit.superclass.constructor.call(this,c,d)
};
Ext.extend(Ext.form.Action.Submit,Ext.form.Action,{type:"submit",run:function(){var d=this.options;
var g=this.getMethod();
var e=g=="GET";
if(d.clientValidation===false||this.form.isValid()){Ext.Ajax.request(Ext.apply(this.createCallback(d),{form:this.form.el.dom,url:this.getUrl(e),method:g,headers:d.headers,params:!e?this.getParams():null,isUpload:this.form.fileUpload}))
}else{if(d.clientValidation!==false){this.failureType=Ext.form.Action.CLIENT_INVALID;
this.form.afterAction(this,false)
}}},success:function(c){var d=this.processResponse(c);
if(d===true||d.success){this.form.afterAction(this,true);
return
}if(d.errors){this.form.markInvalid(d.errors)
}this.failureType=Ext.form.Action.SERVER_INVALID;
this.form.afterAction(this,false)
},handleResponse:function(n){if(this.form.errorReader){var h=this.form.errorReader.read(n);
var k=[];
if(h.records){for(var m=0,j=h.records.length;
m<j;
m++){var l=h.records[m];
k[m]=l.data
}}if(k.length<1){k=null
}return{success:h.success,errors:k}
}return Ext.decode(n.responseText)
}});
Ext.form.Action.Load=function(c,d){Ext.form.Action.Load.superclass.constructor.call(this,c,d);
this.reader=this.form.reader
};
Ext.extend(Ext.form.Action.Load,Ext.form.Action,{type:"load",run:function(){Ext.Ajax.request(Ext.apply(this.createCallback(this.options),{method:this.getMethod(),url:this.getUrl(false),headers:this.options.headers,params:this.getParams()}))
},success:function(c){var d=this.processResponse(c);
if(d===true||!d.success||!d.data){this.failureType=Ext.form.Action.LOAD_FAILURE;
this.form.afterAction(this,false);
return
}this.form.clearInvalid();
this.form.setValues(d.data);
this.form.afterAction(this,true)
},handleResponse:function(d){if(this.form.reader){var e=this.form.reader.read(d);
var g=e.records&&e.records[0]?e.records[0].data:null;
return{success:e.success,data:g}
}return Ext.decode(d.responseText)
}});
Ext.form.Action.DirectLoad=Ext.extend(Ext.form.Action.Load,{constructor:function(c,d){Ext.form.Action.DirectLoad.superclass.constructor.call(this,c,d)
},type:"directload",run:function(){var b=this.getParams();
b.push(this.success,this);
this.form.api.load.apply(window,b)
},getParams:function(){var p=[],l={};
var n=this.form.baseParams;
var m=this.options.params;
Ext.apply(l,m,n);
var j=this.form.paramOrder;
if(j){for(var o=0,k=j.length;
o<k;
o++){p.push(l[j[o]])
}}else{if(this.form.paramsAsHash){p.push(l)
}}return p
},processResponse:function(b){this.result=b;
return b
},success:function(d,c){if(c.type==Ext.Direct.exceptions.SERVER){d={}
}Ext.form.Action.DirectLoad.superclass.success.call(this,d)
}});
Ext.form.Action.DirectSubmit=Ext.extend(Ext.form.Action.Submit,{constructor:function(c,d){Ext.form.Action.DirectSubmit.superclass.constructor.call(this,c,d)
},type:"directsubmit",run:function(){var b=this.options;
if(b.clientValidation===false||this.form.isValid()){this.success.params=this.getParams();
this.form.api.submit(this.form.el.dom,this.success,this)
}else{if(b.clientValidation!==false){this.failureType=Ext.form.Action.CLIENT_INVALID;
this.form.afterAction(this,false)
}}},getParams:function(){var g={};
var e=this.form.baseParams;
var d=this.options.params;
Ext.apply(g,d,e);
return g
},processResponse:function(b){this.result=b;
return b
},success:function(d,c){if(c.type==Ext.Direct.exceptions.SERVER){d={}
}Ext.form.Action.DirectSubmit.superclass.success.call(this,d)
}});
Ext.form.Action.ACTION_TYPES={load:Ext.form.Action.Load,submit:Ext.form.Action.Submit,directload:Ext.form.Action.DirectLoad,directsubmit:Ext.form.Action.DirectSubmit};
Ext.form.VTypes=function(){var j=/^[a-zA-Z_]+$/,h=/^[a-zA-Z0-9_]+$/,e=/^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,g=/(((^https?)|(^ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
return{email:function(a){return e.test(a)
},emailText:'This field should be an e-mail address in the format "user@example.com"',emailMask:/[a-z0-9_\.\-@]/i,url:function(a){return g.test(a)
},urlText:'This field should be a URL in the format "http://www.example.com"',alpha:function(a){return j.test(a)
},alphaText:"This field should only contain letters and _",alphaMask:/[a-z_]/i,alphanum:function(a){return h.test(a)
},alphanumText:"This field should only contain letters, numbers and _",alphanumMask:/[a-z0-9_]/i}
}();
Ext.grid.GridPanel=Ext.extend(Ext.Panel,{autoExpandColumn:false,autoExpandMax:1000,autoExpandMin:50,columnLines:false,ddText:"{0} selected row{1}",deferRowRender:true,enableColumnHide:true,enableColumnMove:true,enableDragDrop:false,enableHdMenu:true,loadMask:false,minColumnWidth:25,stripeRows:false,trackMouseOver:true,stateEvents:["columnmove","columnresize","sortchange"],view:null,bubbleEvents:[],rendered:false,viewReady:false,initComponent:function(){Ext.grid.GridPanel.superclass.initComponent.call(this);
if(this.columnLines){this.cls=(this.cls||"")+" x-grid-with-col-lines"
}this.autoScroll=false;
this.autoWidth=false;
if(Ext.isArray(this.columns)){this.colModel=new Ext.grid.ColumnModel(this.columns);
delete this.columns
}if(this.ds){this.store=this.ds;
delete this.ds
}if(this.cm){this.colModel=this.cm;
delete this.cm
}if(this.sm){this.selModel=this.sm;
delete this.sm
}this.store=Ext.StoreMgr.lookup(this.store);
this.addEvents("click","dblclick","contextmenu","mousedown","mouseup","mouseover","mouseout","keypress","keydown","cellmousedown","rowmousedown","headermousedown","groupmousedown","rowbodymousedown","containermousedown","cellclick","celldblclick","rowclick","rowdblclick","headerclick","headerdblclick","groupclick","groupdblclick","containerclick","containerdblclick","rowbodyclick","rowbodydblclick","rowcontextmenu","cellcontextmenu","headercontextmenu","groupcontextmenu","containercontextmenu","rowbodycontextmenu","bodyscroll","columnresize","columnmove","sortchange","reconfigure","viewready")
},onRender:function(j,g){Ext.grid.GridPanel.superclass.onRender.apply(this,arguments);
var h=this.getGridEl();
this.el.addClass("x-grid-panel");
this.mon(h,{scope:this,mousedown:this.onMouseDown,click:this.onClick,dblclick:this.onDblClick,contextmenu:this.onContextMenu});
this.relayEvents(h,["mousedown","mouseup","mouseover","mouseout","keypress","keydown"]);
var c=this.getView();
c.init(this);
c.render();
this.getSelectionModel().init(this)
},initEvents:function(){Ext.grid.GridPanel.superclass.initEvents.call(this);
if(this.loadMask){this.loadMask=new Ext.LoadMask(this.bwrap,Ext.apply({store:this.store},this.loadMask))
}},initStateEvents:function(){Ext.grid.GridPanel.superclass.initStateEvents.call(this);
this.mon(this.colModel,"hiddenchange",this.saveState,this,{delay:100})
},applyState:function(t){var m=this.colModel,q=t.columns;
if(q){for(var r=0,p=q.length;
r<p;
r++){var c=q[r],o=m.getColumnById(c.id);
if(o){o.hidden=c.hidden;
o.width=c.width;
var n=m.getIndexById(c.id);
if(n!=r){m.moveColumn(n,r)
}}}}if(t.sort&&this.store){this.store[this.store.remoteSort?"setDefaultSort":"sort"](t.sort.field,t.sort.direction)
}var s=Ext.apply({},t);
delete s.columns;
delete s.sort;
Ext.grid.GridPanel.superclass.applyState.call(this,s)
},getState:function(){var j={columns:[]};
for(var c=0,h;
(h=this.colModel.config[c]);
c++){j.columns[c]={id:h.id,width:h.width};
if(h.hidden){j.columns[c].hidden=true
}}if(this.store){var g=this.store.getSortState();
if(g){j.sort=g
}}return j
},afterRender:function(){Ext.grid.GridPanel.superclass.afterRender.call(this);
var b=this.view;
this.on("bodyresize",b.layout,b);
b.layout();
if(this.deferRowRender){b.afterRender.defer(10,this.view)
}else{b.afterRender()
}this.viewReady=true
},reconfigure:function(e,d){var g=this.rendered;
if(g){if(this.loadMask){this.loadMask.destroy();
this.loadMask=new Ext.LoadMask(this.bwrap,Ext.apply({},{store:e},this.initialConfig.loadMask))
}}if(this.view){this.view.initData(e,d)
}this.store=e;
this.colModel=d;
if(g){this.view.refresh(true)
}this.fireEvent("reconfigure",this,e,d)
},onDestroy:function(){if(this.rendered){Ext.destroy(this.view,this.loadMask)
}else{if(this.store&&this.store.autoDestroy){this.store.destroy()
}}Ext.destroy(this.colModel,this.selModel);
this.store=this.selModel=this.colModel=this.view=this.loadMask=null;
Ext.grid.GridPanel.superclass.onDestroy.call(this)
},processEvent:function(q,o){this.fireEvent(q,o);
var p=o.getTarget(),r=this.view,m=r.findHeaderIndex(p);
if(m!==false){this.fireEvent("header"+q,this,m,o)
}else{var n=r.findRowIndex(p),e,l;
if(n!==false){this.fireEvent("row"+q,this,n,o);
e=r.findCellIndex(p);
l=r.findRowBody(p);
if(e!==false){this.fireEvent("cell"+q,this,n,e,o)
}if(l){this.fireEvent("rowbody"+q,this,n,o)
}}else{this.fireEvent("container"+q,this,o)
}}this.view.processEvent(q,o)
},onClick:function(b){this.processEvent("click",b)
},onMouseDown:function(b){this.processEvent("mousedown",b)
},onContextMenu:function(c,d){this.processEvent("contextmenu",c)
},onDblClick:function(b){this.processEvent("dblclick",b)
},walkCells:function(m,t,u,r,n){var o=this.colModel,q=o.getColumnCount(),v=this.store,p=v.getCount(),s=true;
if(u<0){if(t<0){m--;
s=false
}while(m>=0){if(!s){t=q-1
}s=false;
while(t>=0){if(r.call(n||this,m,t,o)===true){return[m,t]
}t--
}m--
}}else{if(t>=q){m++;
s=false
}while(m<p){if(!s){t=0
}s=false;
while(t<q){if(r.call(n||this,m,t,o)===true){return[m,t]
}t++
}m++
}}return null
},onResize:function(){Ext.grid.GridPanel.superclass.onResize.apply(this,arguments);
if(this.viewReady){this.view.layout()
}},getGridEl:function(){return this.body
},stopEditing:Ext.emptyFn,getSelectionModel:function(){if(!this.selModel){this.selModel=new Ext.grid.RowSelectionModel(this.disableSelection?{selectRow:Ext.emptyFn}:null)
}return this.selModel
},getStore:function(){return this.store
},getColumnModel:function(){return this.colModel
},getView:function(){if(!this.view){this.view=new Ext.grid.GridView(this.viewConfig)
}return this.view
},getDragDropText:function(){var b=this.selModel.getCount();
return String.format(this.ddText,b,b==1?"":"s")
}});
Ext.reg("grid",Ext.grid.GridPanel);
Ext.grid.GridView=Ext.extend(Ext.util.Observable,{deferEmptyText:true,scrollOffset:undefined,autoFill:false,forceFit:false,sortClasses:["sort-asc","sort-desc"],sortAscText:"Sort Ascending",sortDescText:"Sort Descending",columnsText:"Columns",selectedRowClass:"x-grid3-row-selected",borderWidth:2,tdClass:"x-grid3-cell",hdCls:"x-grid3-hd",markDirty:true,cellSelectorDepth:4,rowSelectorDepth:10,rowBodySelectorDepth:10,cellSelector:"td.x-grid3-cell",rowSelector:"div.x-grid3-row",rowBodySelector:"div.x-grid3-row-body",firstRowCls:"x-grid3-row-first",lastRowCls:"x-grid3-row-last",rowClsRe:/(?:^|\s+)x-grid3-row-(first|last|alt)(?:\s+|$)/g,constructor:function(b){Ext.apply(this,b);
this.addEvents("beforerowremoved","beforerowsinserted","beforerefresh","rowremoved","rowsinserted","rowupdated","refresh");
Ext.grid.GridView.superclass.constructor.call(this)
},initTemplates:function(){var g=this.templates||{};
if(!g.master){g.master=new Ext.Template('<div class="x-grid3" hidefocus="true">','<div class="x-grid3-viewport">','<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>','<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',"</div>",'<div class="x-grid3-resize-marker">&#160;</div>','<div class="x-grid3-resize-proxy">&#160;</div>',"</div>")
}if(!g.header){g.header=new Ext.Template('<table border="0" cellspacing="0" cellpadding="0" style="{tstyle}">','<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>',"</table>")
}if(!g.hcell){g.hcell=new Ext.Template('<td class="x-grid3-hd x-grid3-cell x-grid3-td-{id} {css}" style="{style}"><div {tooltip} {attr} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',this.grid.enableHdMenu?'<a class="x-grid3-hd-btn" href="#"></a>':"",'{value}<img class="x-grid3-sort-icon" src="',Ext.BLANK_IMAGE_URL,'" />',"</div></td>")
}if(!g.body){g.body=new Ext.Template("{rows}")
}if(!g.row){g.row=new Ext.Template('<div class="x-grid3-row {alt}" style="{tstyle}"><table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',"<tbody><tr>{cells}</tr>",(this.enableRowBody?'<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>':""),"</tbody></table></div>")
}if(!g.cell){g.cell=new Ext.Template('<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}" tabIndex="0" {cellAttr}>','<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on" {attr}>{value}</div>',"</td>")
}for(var e in g){var d=g[e];
if(d&&Ext.isFunction(d.compile)&&!d.compiled){d.disableFormats=true;
d.compile()
}}this.templates=g;
this.colRe=new RegExp("x-grid3-td-([^\\s]+)","")
},fly:function(b){if(!this._flyweight){this._flyweight=new Ext.Element.Flyweight(document.body)
}this._flyweight.dom=b;
return this._flyweight
},getEditorParent:function(){return this.scroller.dom
},initElements:function(){var g=Ext.Element;
var d=this.grid.getGridEl().dom.firstChild;
var e=d.childNodes;
this.el=new g(d);
this.mainWrap=new g(e[0]);
this.mainHd=new g(this.mainWrap.dom.firstChild);
if(this.grid.hideHeaders){this.mainHd.setDisplayed(false)
}this.innerHd=this.mainHd.dom.firstChild;
this.scroller=new g(this.mainWrap.dom.childNodes[1]);
if(this.forceFit){this.scroller.setStyle("overflow-x","hidden")
}this.mainBody=new g(this.scroller.dom.firstChild);
this.focusEl=new g(this.scroller.dom.childNodes[1]);
this.focusEl.swallowEvent("click",true);
this.resizeMarker=new g(e[1]);
this.resizeProxy=new g(e[2])
},getRows:function(){return this.hasRows()?this.mainBody.dom.childNodes:[]
},findCell:function(b){if(!b){return false
}return this.fly(b).findParent(this.cellSelector,this.cellSelectorDepth)
},findCellIndex:function(g,d){var e=this.findCell(g);
if(e&&(!d||this.fly(e).hasClass(d))){return this.getCellIndex(e)
}return false
},getCellIndex:function(c){if(c){var d=c.className.match(this.colRe);
if(d&&d[1]){return this.cm.getIndexById(d[1])
}}return false
},findHeaderCell:function(c){var d=this.findCell(c);
return d&&this.fly(d).hasClass(this.hdCls)?d:null
},findHeaderIndex:function(b){return this.findCellIndex(b,this.hdCls)
},findRow:function(b){if(!b){return false
}return this.fly(b).findParent(this.rowSelector,this.rowSelectorDepth)
},findRowIndex:function(d){var c=this.findRow(d);
return c?c.rowIndex:false
},findRowBody:function(b){if(!b){return false
}return this.fly(b).findParent(this.rowBodySelector,this.rowBodySelectorDepth)
},getRow:function(b){return this.getRows()[b]
},getCell:function(c,d){return this.getRow(c).getElementsByTagName("td")[d]
},getHeaderCell:function(b){return this.mainHd.dom.getElementsByTagName("td")[b]
},addRowClass:function(g,e){var d=this.getRow(g);
if(d){this.fly(d).addClass(e)
}},removeRowClass:function(g,e){var d=this.getRow(g);
if(d){this.fly(d).removeClass(e)
}},removeRow:function(b){Ext.removeNode(this.getRow(b));
this.syncFocusEl(b)
},removeRows:function(j,g){var e=this.mainBody.dom;
for(var h=j;
h<=g;
h++){Ext.removeNode(e.childNodes[j])
}this.syncFocusEl(j)
},getScrollState:function(){var b=this.scroller.dom;
return{left:b.scrollLeft,top:b.scrollTop}
},restoreScroll:function(d){var c=this.scroller.dom;
c.scrollLeft=d.left;
c.scrollTop=d.top
},scrollToTop:function(){this.scroller.dom.scrollTop=0;
this.scroller.dom.scrollLeft=0
},syncScroll:function(){this.syncHeaderScroll();
var b=this.scroller.dom;
this.grid.fireEvent("bodyscroll",b.scrollLeft,b.scrollTop)
},syncHeaderScroll:function(){var b=this.scroller.dom;
this.innerHd.scrollLeft=b.scrollLeft;
this.innerHd.scrollLeft=b.scrollLeft
},updateSortIcon:function(e,g){var h=this.sortClasses;
var j=this.mainHd.select("td").removeClass(h);
j.item(e).addClass(h[g=="DESC"?1:0])
},updateAllColumnWidths:function(){var s=this.getTotalWidth(),n=this.cm.getColumnCount(),q=[],r,u;
for(u=0;
u<n;
u++){q[u]=this.getColumnWidth(u)
}this.innerHd.firstChild.style.width=this.getOffsetWidth();
this.innerHd.firstChild.firstChild.style.width=s;
this.mainBody.dom.style.width=s;
for(u=0;
u<n;
u++){var t=this.getHeaderCell(u);
t.style.width=q[u]
}var o=this.getRows(),j,p;
for(u=0,r=o.length;
u<r;
u++){j=o[u];
j.style.width=s;
if(j.firstChild){j.firstChild.style.width=s;
p=j.firstChild.rows[0];
for(var v=0;
v<n;
v++){p.childNodes[v].style.width=q[v]
}}}this.onAllColumnWidthsUpdated(q,s)
},updateColumnWidth:function(s,t){var m=this.getColumnWidth(s);
var p=this.getTotalWidth();
this.innerHd.firstChild.style.width=this.getOffsetWidth();
this.innerHd.firstChild.firstChild.style.width=p;
this.mainBody.dom.style.width=p;
var q=this.getHeaderCell(s);
q.style.width=m;
var n=this.getRows(),l;
for(var r=0,o=n.length;
r<o;
r++){l=n[r];
l.style.width=p;
if(l.firstChild){l.firstChild.style.width=p;
l.firstChild.rows[0].childNodes[s].style.width=m
}}this.onColumnWidthUpdated(s,m,p)
},updateColumnHidden:function(t,p){var q=this.getTotalWidth();
this.innerHd.firstChild.style.width=this.getOffsetWidth();
this.innerHd.firstChild.firstChild.style.width=q;
this.mainBody.dom.style.width=q;
var n=p?"none":"";
var r=this.getHeaderCell(t);
r.style.display=n;
var m=this.getRows(),l;
for(var s=0,o=m.length;
s<o;
s++){l=m[s];
l.style.width=q;
if(l.firstChild){l.firstChild.style.width=q;
l.firstChild.rows[0].childNodes[t].style.display=n
}}this.onColumnHiddenUpdated(t,p,q);
delete this.lastViewWidth;
this.layout()
},doRender:function(P,N,F,T,H,r){var S=this.templates,Q=S.cell,O=S.row,M=H-1;
var R="width:"+this.getTotalWidth()+";";
var c=[],E,I,D={},L={tstyle:R},J;
for(var C=0,j=N.length;
C<j;
C++){J=N[C];
E=[];
var K=(C+T);
for(var p=0;
p<H;
p++){I=P[p];
D.id=I.id;
D.css=p===0?"x-grid3-cell-first ":(p==M?"x-grid3-cell-last ":"");
D.attr=D.cellAttr="";
D.value=I.renderer.call(I.scope,J.data[I.name],D,J,K,p,F);
D.style=I.style;
if(Ext.isEmpty(D.value)){D.value="&#160;"
}if(this.markDirty&&J.dirty&&Ext.isDefined(J.modified[I.name])){D.css+=" x-grid3-dirty-cell"
}E[E.length]=Q.apply(D)
}var G=[];
if(r&&((K+1)%2===0)){G[0]="x-grid3-row-alt"
}if(J.dirty){G[1]=" x-grid3-dirty-row"
}L.cols=H;
if(this.getRowClass){G[2]=this.getRowClass(J,K,L,F)
}L.alt=G.join(" ");
L.cells=E.join("");
c[c.length]=O.apply(L)
}return c.join("")
},processRows:function(h,k){if(!this.ds||this.ds.getCount()<1){return
}var l=this.getRows(),j=l.length,n,m;
k=k||!this.grid.stripeRows;
h=h||0;
for(n=0;
n<j;
n++){m=l[n];
if(m){m.rowIndex=n;
if(!k){m.className=m.className.replace(this.rowClsRe," ");
if((n+1)%2===0){m.className+=" x-grid3-row-alt"
}}}}if(h===0){Ext.fly(l[0]).addClass(this.firstRowCls)
}Ext.fly(l[l.length-1]).addClass(this.lastRowCls)
},afterRender:function(){if(!this.ds||!this.cm){return
}this.mainBody.dom.innerHTML=this.renderRows()||"&#160;";
this.processRows(0,true);
if(this.deferEmptyText!==true){this.applyEmptyText()
}this.grid.fireEvent("viewready",this.grid)
},renderUI:function(){var h=this.renderHeaders();
var g=this.templates.body.apply({rows:"&#160;"});
var e=this.templates.master.apply({body:g,header:h,ostyle:"width:"+this.getOffsetWidth()+";",bstyle:"width:"+this.getTotalWidth()+";"});
var j=this.grid;
j.getGridEl().dom.innerHTML=e;
this.initElements();
Ext.fly(this.innerHd).on("click",this.handleHdDown,this);
this.mainHd.on({scope:this,mouseover:this.handleHdOver,mouseout:this.handleHdOut,mousemove:this.handleHdMove});
this.scroller.on("scroll",this.syncScroll,this);
if(j.enableColumnResize!==false){this.splitZone=new Ext.grid.GridView.SplitDragZone(j,this.mainHd.dom)
}if(j.enableColumnMove){this.columnDrag=new Ext.grid.GridView.ColumnDragZone(j,this.innerHd);
this.columnDrop=new Ext.grid.HeaderDropZone(j,this.mainHd.dom)
}if(j.enableHdMenu!==false){this.hmenu=new Ext.menu.Menu({id:j.id+"-hctx"});
this.hmenu.add({itemId:"asc",text:this.sortAscText,cls:"xg-hmenu-sort-asc"},{itemId:"desc",text:this.sortDescText,cls:"xg-hmenu-sort-desc"});
if(j.enableColumnHide!==false){this.colMenu=new Ext.menu.Menu({id:j.id+"-hcols-menu"});
this.colMenu.on({scope:this,beforeshow:this.beforeColMenuShow,itemclick:this.handleHdMenuClick});
this.hmenu.add("-",{itemId:"columns",hideOnClick:false,text:this.columnsText,menu:this.colMenu,iconCls:"x-cols-icon"})
}this.hmenu.on("itemclick",this.handleHdMenuClick,this)
}if(j.trackMouseOver){this.mainBody.on({scope:this,mouseover:this.onRowOver,mouseout:this.onRowOut})
}if(j.enableDragDrop||j.enableDrag){this.dragZone=new Ext.grid.GridDragZone(j,{ddGroup:j.ddGroup||"GridDD"})
}this.updateHeaderSortState()
},processEvent:Ext.emptyFn,layout:function(){if(!this.mainBody){return
}var n=this.grid;
var k=n.getGridEl();
var g=k.getSize(true);
var c=g.width;
if(!n.hideHeaders&&(c<20||g.height<20)){return
}if(n.autoHeight){this.scroller.dom.style.overflow="visible";
if(Ext.isWebKit){this.scroller.dom.style.position="static"
}}else{this.el.setSize(g.width,g.height);
var l=this.mainHd.getHeight();
var m=g.height-(l);
this.scroller.setSize(c,m);
if(this.innerHd){this.innerHd.style.width=(c)+"px"
}}if(this.forceFit){if(this.lastViewWidth!=c){this.fitColumns(false,false);
this.lastViewWidth=c
}}else{this.autoExpand();
this.syncHeaderScroll()
}this.onLayout(c,m)
},onLayout:function(d,c){},onColumnWidthUpdated:function(g,e,d){},onAllColumnWidthsUpdated:function(d,c){},onColumnHiddenUpdated:function(d,g,e){},updateColumnText:function(d,c){},afterMove:function(b){},init:function(b){this.grid=b;
this.initTemplates();
this.initData(b.store,b.colModel);
this.initUI(b)
},getColumnId:function(b){return this.cm.getColumnId(b)
},getOffsetWidth:function(){return(this.cm.getTotalWidth()+this.getScrollOffset())+"px"
},getScrollOffset:function(){return Ext.num(this.scrollOffset,Ext.getScrollBarWidth())
},renderHeaders:function(){var r=this.cm,n=this.templates,p=n.hcell,k=[],m={},l=r.getColumnCount(),o=l-1;
for(var q=0;
q<l;
q++){m.id=r.getColumnId(q);
m.value=r.getColumnHeader(q)||"";
m.style=this.getColumnStyle(q,true);
m.tooltip=this.getColumnTooltip(q);
m.css=q===0?"x-grid3-cell-first ":(q==o?"x-grid3-cell-last ":"");
if(r.config[q].align=="right"){m.istyle="padding-right:16px"
}else{delete m.istyle
}k[k.length]=p.apply(m)
}return n.header.apply({cells:k.join(""),tstyle:"width:"+this.getTotalWidth()+";"})
},getColumnTooltip:function(d){var c=this.cm.getColumnTooltip(d);
if(c){if(Ext.QuickTips.isEnabled()){return'ext:qtip="'+c+'"'
}else{return'title="'+c+'"'
}}return""
},beforeUpdate:function(){this.grid.stopEditing(true)
},updateHeaders:function(){this.innerHd.firstChild.innerHTML=this.renderHeaders();
this.innerHd.firstChild.style.width=this.getOffsetWidth();
this.innerHd.firstChild.firstChild.style.width=this.getTotalWidth()
},focusRow:function(b){this.focusCell(b,0,false)
},focusCell:function(g,e,d){this.syncFocusEl(this.ensureVisible(g,e,d));
if(Ext.isGecko){this.focusEl.focus()
}else{this.focusEl.focus.defer(1,this.focusEl)
}},resolveCell:function(l,o,m){if(!Ext.isNumber(l)){l=l.rowIndex
}if(!this.ds){return null
}if(l<0||l>=this.ds.getCount()){return null
}o=(o!==undefined?o:0);
var p=this.getRow(l),k=this.cm,n=k.getColumnCount(),j;
if(!(m===false&&o===0)){while(o<n&&k.isHidden(o)){o++
}j=this.getCell(l,o)
}return{row:p,cell:j}
},getResolvedXY:function(g){if(!g){return null
}var c=this.scroller.dom,h=g.cell,j=g.row;
return h?Ext.fly(h).getXY():[this.el.getX(),Ext.fly(j).getY()]
},syncFocusEl:function(h,g,j){var e=h;
if(!Ext.isArray(e)){h=Math.min(h,Math.max(0,this.getRows().length-1));
e=this.getResolvedXY(this.resolveCell(h,g,j))
}this.focusEl.setXY(e||this.scroller.getXY())
},ensureVisible:function(H,C,D){var J=this.resolveCell(H,C,D);
if(!J||!J.row){return
}var y=J.row,B=J.cell,v=this.scroller.dom,I=0,E=y,p=this.el.dom;
while(E&&E!=p){I+=E.offsetTop;
E=E.offsetParent
}I-=this.mainHd.dom.offsetHeight;
p=parseInt(v.scrollTop,10);
var c=I+y.offsetHeight,G=v.clientHeight,w=p+G;
if(I<p){v.scrollTop=I
}else{if(c>w){v.scrollTop=c-G
}}if(D!==false){var x=parseInt(B.offsetLeft,10);
var z=x+B.offsetWidth;
var A=parseInt(v.scrollLeft,10);
var F=A+v.clientWidth;
if(x<A){v.scrollLeft=x
}else{if(z>F){v.scrollLeft=z-v.clientWidth
}}}return this.getResolvedXY(J)
},insertRows:function(l,m,p,n){var q=l.getCount()-1;
if(!n&&m===0&&p>=q){this.fireEvent("beforerowsinserted",this,m,p);
this.refresh();
this.fireEvent("rowsinserted",this,m,p)
}else{if(!n){this.fireEvent("beforerowsinserted",this,m,p)
}var k=this.renderRows(m,p),o=this.getRow(m);
if(o){if(m===0){Ext.fly(this.getRow(0)).removeClass(this.firstRowCls)
}Ext.DomHelper.insertHtml("beforeBegin",o,k)
}else{var r=this.getRow(q-1);
if(r){Ext.fly(r).removeClass(this.lastRowCls)
}Ext.DomHelper.insertHtml("beforeEnd",this.mainBody.dom,k)
}if(!n){this.fireEvent("rowsinserted",this,m,p);
this.processRows(m)
}else{if(m===0||m>=q){Ext.fly(this.getRow(m)).addClass(m===0?this.firstRowCls:this.lastRowCls)
}}}this.syncFocusEl(m)
},deleteRows:function(e,g,d){if(e.getRowCount()<1){this.refresh()
}else{this.fireEvent("beforerowsdeleted",this,g,d);
this.removeRows(g,d);
this.processRows(g);
this.fireEvent("rowsdeleted",this,g,d)
}},getColumnStyle:function(g,j){var e=!j?(this.cm.config[g].css||""):"";
e+="width:"+this.getColumnWidth(g)+";";
if(this.cm.isHidden(g)){e+="display:none;"
}var h=this.cm.config[g].align;
if(h){e+="text-align:"+h+";"
}return e
},getColumnWidth:function(c){var d=this.cm.getColumnWidth(c);
if(Ext.isNumber(d)){return(Ext.isBorderBox||(Ext.isWebKit&&!Ext.isSafari2)?d:(d-this.borderWidth>0?d-this.borderWidth:0))+"px"
}return d
},getTotalWidth:function(){return this.cm.getTotalWidth()+"px"
},fitColumns:function(F,C,B){var u=this.cm,A;
var z=u.getTotalWidth(false);
var I=this.grid.getGridEl().getWidth(true)-this.getScrollOffset();
if(I<20){return
}var E=I-z;
if(E===0){return false
}var y=u.getColumnCount(true);
var J=y-(Ext.isNumber(B)?1:0);
if(J===0){J=1;
B=undefined
}var t=u.getColumnCount();
var w=[];
var x=0;
var G=0;
var v;
for(A=0;
A<t;
A++){if(!u.isHidden(A)&&!u.isFixed(A)&&A!==B){v=u.getColumnWidth(A);
w.push(A);
x=A;
w.push(v);
G+=v
}}var H=(I-u.getTotalWidth())/G;
while(w.length){v=w.pop();
A=w.pop();
u.setColumnWidth(A,Math.max(this.grid.minColumnWidth,Math.floor(v+v*H)),true)
}if((z=u.getTotalWidth(false))>I){var D=J!=y?B:x;
u.setColumnWidth(D,Math.max(1,u.getColumnWidth(D)-(z-I)),true)
}if(F!==true){this.updateAllColumnWidths()
}return true
},autoExpand:function(g){var n=this.grid,l=this.cm;
if(!this.userResized&&n.autoExpandColumn){var q=l.getTotalWidth(false);
var m=this.grid.getGridEl().getWidth(true)-this.getScrollOffset();
if(q!=m){var o=l.getIndexById(n.autoExpandColumn);
var p=l.getColumnWidth(o);
var r=Math.min(Math.max(((m-q)+p),n.autoExpandMin),n.autoExpandMax);
if(r!=p){l.setColumnWidth(o,r,true);
if(g!==true){this.updateColumnWidth(o,r)
}}}}},getColumnData:function(){var k=[],h=this.cm,j=h.getColumnCount();
for(var l=0;
l<j;
l++){var g=h.getDataIndex(l);
k[l]={name:(!Ext.isDefined(g)?this.ds.fields.get(l).name:g),renderer:h.getRenderer(l),scope:h.getRendererScope(l),id:h.getColumnId(l),style:this.getColumnStyle(l)}
}return k
},renderRows:function(m,r){var q=this.grid,o=q.colModel,t=q.store,g=q.stripeRows;
var n=o.getColumnCount();
if(t.getCount()<1){return""
}var p=this.getColumnData();
m=m||0;
r=!Ext.isDefined(r)?t.getCount()-1:r;
var s=t.getRange(m,r);
return this.doRender(p,s,t,m,n,g)
},renderBody:function(){var b=this.renderRows()||"&#160;";
return this.templates.body.apply({rows:b})
},refreshRow:function(e){var g=this.ds,d;
if(Ext.isNumber(e)){d=e;
e=g.getAt(d);
if(!e){return
}}else{d=g.indexOf(e);
if(d<0){return
}}this.insertRows(g,d,d,true);
this.getRow(d).rowIndex=d;
this.onRemove(g,e,d+1,true);
this.fireEvent("rowupdated",this,d,e)
},refresh:function(c){this.fireEvent("beforerefresh",this);
this.grid.stopEditing(true);
var d=this.renderBody();
this.mainBody.update(d).setWidth(this.getTotalWidth());
if(c===true){this.updateHeaders();
this.updateHeaderSortState()
}this.processRows(0,true);
this.layout();
this.applyEmptyText();
this.fireEvent("refresh",this)
},applyEmptyText:function(){if(this.emptyText&&!this.hasRows()){this.mainBody.update('<div class="x-grid-empty">'+this.emptyText+"</div>")
}},updateHeaderSortState:function(){var d=this.ds.getSortState();
if(!d){return
}if(!this.sortState||(this.sortState.field!=d.field||this.sortState.direction!=d.direction)){this.grid.fireEvent("sortchange",this.grid,d)
}this.sortState=d;
var g=this.cm.findColumnIndex(d.field);
if(g!=-1){var e=d.direction;
this.updateSortIcon(g,e)
}},clearHeaderSortState:function(){if(!this.sortState){return
}this.grid.fireEvent("sortchange",this.grid,null);
this.mainHd.select("td").removeClass(this.sortClasses);
delete this.sortState
},destroy:function(){if(this.colMenu){Ext.menu.MenuMgr.unregister(this.colMenu);
this.colMenu.destroy();
delete this.colMenu
}if(this.hmenu){Ext.menu.MenuMgr.unregister(this.hmenu);
this.hmenu.destroy();
delete this.hmenu
}this.initData(null,null);
this.purgeListeners();
Ext.fly(this.innerHd).un("click",this.handleHdDown,this);
if(this.grid.enableColumnMove){Ext.destroy(this.columnDrag.el,this.columnDrag.proxy.ghost,this.columnDrag.proxy.el,this.columnDrop.el,this.columnDrop.proxyTop,this.columnDrop.proxyBottom,this.columnDrag.dragData.ddel,this.columnDrag.dragData.header);
if(this.columnDrag.proxy.anim){Ext.destroy(this.columnDrag.proxy.anim)
}delete this.columnDrag.proxy.ghost;
delete this.columnDrag.dragData.ddel;
delete this.columnDrag.dragData.header;
this.columnDrag.destroy();
delete Ext.dd.DDM.locationCache[this.columnDrag.id];
delete this.columnDrag._domRef;
delete this.columnDrop.proxyTop;
delete this.columnDrop.proxyBottom;
this.columnDrop.destroy();
delete Ext.dd.DDM.locationCache["gridHeader"+this.grid.getGridEl().id];
delete this.columnDrop._domRef;
delete Ext.dd.DDM.ids[this.columnDrop.ddGroup]
}if(this.splitZone){this.splitZone.destroy();
delete this.splitZone._domRef;
delete Ext.dd.DDM.ids["gridSplitters"+this.grid.getGridEl().id]
}Ext.fly(this.innerHd).removeAllListeners();
Ext.removeNode(this.innerHd);
delete this.innerHd;
Ext.destroy(this.el,this.mainWrap,this.mainHd,this.scroller,this.mainBody,this.focusEl,this.resizeMarker,this.resizeProxy,this.activeHdBtn,this.dragZone,this.splitZone,this._flyweight);
delete this.grid.container;
if(this.dragZone){this.dragZone.destroy()
}Ext.dd.DDM.currentTarget=null;
delete Ext.dd.DDM.locationCache[this.grid.getGridEl().id];
Ext.EventManager.removeResizeListener(this.onWindowResize,this)
},onDenyColumnHide:function(){},render:function(){if(this.autoFill){var b=this.grid.ownerCt;
if(b&&b.getLayout()){b.on("afterlayout",function(){this.fitColumns(true,true);
this.updateHeaders()
},this,{single:true})
}else{this.fitColumns(true,true)
}}else{if(this.forceFit){this.fitColumns(true,false)
}else{if(this.grid.autoExpandColumn){this.autoExpand(true)
}}}this.renderUI()
},initData:function(c,d){if(this.ds){this.ds.un("load",this.onLoad,this);
this.ds.un("datachanged",this.onDataChange,this);
this.ds.un("add",this.onAdd,this);
this.ds.un("remove",this.onRemove,this);
this.ds.un("update",this.onUpdate,this);
this.ds.un("clear",this.onClear,this);
if(this.ds!==c&&this.ds.autoDestroy){this.ds.destroy()
}}if(c){c.on({scope:this,load:this.onLoad,datachanged:this.onDataChange,add:this.onAdd,remove:this.onRemove,update:this.onUpdate,clear:this.onClear})
}this.ds=c;
if(this.cm){this.cm.un("configchange",this.onColConfigChange,this);
this.cm.un("widthchange",this.onColWidthChange,this);
this.cm.un("headerchange",this.onHeaderChange,this);
this.cm.un("hiddenchange",this.onHiddenChange,this);
this.cm.un("columnmoved",this.onColumnMove,this)
}if(d){delete this.lastViewWidth;
d.on({scope:this,configchange:this.onColConfigChange,widthchange:this.onColWidthChange,headerchange:this.onHeaderChange,hiddenchange:this.onHiddenChange,columnmoved:this.onColumnMove})
}this.cm=d
},onDataChange:function(){this.refresh();
this.updateHeaderSortState();
this.syncFocusEl(0)
},onClear:function(){this.refresh();
this.syncFocusEl(0)
},onUpdate:function(c,d){this.refreshRow(d)
},onAdd:function(g,e,d){this.insertRows(g,d,d+(e.length-1))
},onRemove:function(h,g,e,j){if(j!==true){this.fireEvent("beforerowremoved",this,e,g)
}this.removeRow(e);
if(j!==true){this.processRows(e);
this.applyEmptyText();
this.fireEvent("rowremoved",this,e,g)
}},onLoad:function(){this.scrollToTop.defer(Ext.isGecko?1:0,this)
},onColWidthChange:function(e,d,g){this.updateColumnWidth(d,g)
},onHeaderChange:function(e,d,g){this.updateHeaders()
},onHiddenChange:function(e,d,g){this.updateColumnHidden(d,g)
},onColumnMove:function(g,h,e){this.indexMap=null;
var j=this.getScrollState();
this.refresh(true);
this.restoreScroll(j);
this.afterMove(e);
this.grid.fireEvent("columnmove",h,e)
},onColConfigChange:function(){delete this.lastViewWidth;
this.indexMap=null;
this.refresh(true)
},initUI:function(b){b.on("headerclick",this.onHeaderClick,this)
},initEvents:function(){},onHeaderClick:function(c,d){if(this.headersDisabled||!this.cm.isSortable(d)){return
}c.stopEditing(true);
c.store.sort(this.cm.getDataIndex(d))
},onRowOver:function(d,e){var g;
if((g=this.findRowIndex(e))!==false){this.addRowClass(g,"x-grid3-row-over")
}},onRowOut:function(d,e){var g;
if((g=this.findRowIndex(e))!==false&&!d.within(this.getRow(g),true)){this.removeRowClass(g,"x-grid3-row-over")
}},handleWheel:function(b){b.stopPropagation()
},onRowSelect:function(b){this.addRowClass(b,this.selectedRowClass)
},onRowDeselect:function(b){this.removeRowClass(b,this.selectedRowClass)
},onCellSelect:function(g,d){var e=this.getCell(g,d);
if(e){this.fly(e).addClass("x-grid3-cell-selected")
}},onCellDeselect:function(g,d){var e=this.getCell(g,d);
if(e){this.fly(e).removeClass("x-grid3-cell-selected")
}},onColumnSplitterMoved:function(g,d){this.userResized=true;
var e=this.grid.colModel;
e.setColumnWidth(g,d,true);
if(this.forceFit){this.fitColumns(true,false,g);
this.updateAllColumnWidths()
}else{this.updateColumnWidth(g,d);
this.syncHeaderScroll()
}this.grid.fireEvent("columnresize",g,d)
},handleHdMenuClick:function(l){var g=this.hdCtxIndex,h=this.cm,k=this.ds,j=l.getItemId();
switch(j){case"asc":k.sort(h.getDataIndex(g),"ASC");
break;
case"desc":k.sort(h.getDataIndex(g),"DESC");
break;
default:g=h.getIndexById(j.substr(4));
if(g!=-1){if(l.checked&&h.getColumnsBy(this.isHideableColumn,this).length<=1){this.onDenyColumnHide();
return false
}h.setHidden(g,l.checked)
}}return true
},isHideableColumn:function(b){return !b.hidden&&!b.fixed
},beforeColMenuShow:function(){var e=this.cm,g=e.getColumnCount();
this.colMenu.removeAll();
for(var d=0;
d<g;
d++){if(e.config[d].fixed!==true&&e.config[d].hideable!==false){this.colMenu.add(new Ext.menu.CheckItem({itemId:"col-"+e.getColumnId(d),text:e.getColumnHeader(d),checked:!e.isHidden(d),hideOnClick:false,disabled:e.config[d].hideable===false}))
}}},handleHdDown:function(k,m){if(Ext.fly(m).hasClass("x-grid3-hd-btn")){k.stopEvent();
var l=this.findHeaderCell(m);
Ext.fly(l).addClass("x-grid3-hd-menu-open");
var n=this.getCellIndex(l);
this.hdCtxIndex=n;
var e=this.hmenu.items,j=this.cm;
e.get("asc").setDisabled(!j.isSortable(n));
e.get("desc").setDisabled(!j.isSortable(n));
this.hmenu.on("hide",function(){Ext.fly(l).removeClass("x-grid3-hd-menu-open")
},this,{single:true});
this.hmenu.show(m,"tl-bl?")
}},handleHdOver:function(h,g){var j=this.findHeaderCell(g);
if(j&&!this.headersDisabled){this.activeHdRef=g;
this.activeHdIndex=this.getCellIndex(j);
var e=this.fly(j);
this.activeHdRegion=e.getRegion();
if(!this.cm.isMenuDisabled(this.activeHdIndex)){e.addClass("x-grid3-hd-over");
this.activeHdBtn=e.child(".x-grid3-hd-btn");
if(this.activeHdBtn){this.activeHdBtn.dom.style.height=(j.firstChild.offsetHeight-1)+"px"
}}}},handleHdMove:function(n,q){var o=this.findHeaderCell(this.activeHdRef);
if(o&&!this.headersDisabled){var e=this.splitHandleWidth||5,p=this.activeHdRegion,l=n.getPageX(),r=o.style,m="";
if(this.grid.enableColumnResize!==false){if(l-p.left<=e&&this.cm.isResizable(this.activeHdIndex-1)){m=Ext.isAir?"move":Ext.isWebKit?"e-resize":"col-resize"
}else{if(p.right-l<=(!this.activeHdBtn?e:2)&&this.cm.isResizable(this.activeHdIndex)){m=Ext.isAir?"move":Ext.isWebKit?"w-resize":"col-resize"
}}}r.cursor=m
}},handleHdOut:function(g,e){var d=this.findHeaderCell(e);
if(d&&(!Ext.isIE||!g.within(d,true))){this.activeHdRef=null;
this.fly(d).removeClass("x-grid3-hd-over");
d.style.cursor=""
}},hasRows:function(){var b=this.mainBody.dom.firstChild;
return b&&b.nodeType==1&&b.className!="x-grid-empty"
},bind:function(d,c){this.initData(d,c)
}});
Ext.grid.GridView.SplitDragZone=function(d,c){this.grid=d;
this.view=d.getView();
this.marker=this.view.resizeMarker;
this.proxy=this.view.resizeProxy;
Ext.grid.GridView.SplitDragZone.superclass.constructor.call(this,c,"gridSplitters"+this.grid.getGridEl().id,{dragElId:Ext.id(this.proxy.dom),resizeFrame:false});
this.scroll=false;
this.hw=this.view.splitHandleWidth||5
};
Ext.extend(Ext.grid.GridView.SplitDragZone,Ext.dd.DDProxy,{b4StartDrag:function(h,j){this.view.headersDisabled=true;
var k=this.view.mainWrap.getHeight();
this.marker.setHeight(k);
this.marker.show();
this.marker.alignTo(this.view.getHeaderCell(this.cellIndex),"tl-tl",[-2,0]);
this.proxy.setHeight(k);
var g=this.cm.getColumnWidth(this.cellIndex);
var l=Math.max(g-this.grid.minColumnWidth,0);
this.resetConstraints();
this.setXConstraint(l,1000);
this.setYConstraint(0,0);
this.minX=h-l;
this.maxX=h+1000;
this.startPos=h;
Ext.dd.DDProxy.prototype.b4StartDrag.call(this,h,j)
},allowHeaderDrag:function(b){return true
},handleMouseDown:function(v){var p=this.view.findHeaderCell(v.getTarget());
if(p&&this.allowHeaderDrag(v)){var e=this.view.fly(p).getXY(),s=e[0],t=e[1];
var o=v.getXY(),u=o[0];
var q=p.offsetWidth,r=false;
if((u-s)<=this.hw){r=-1
}else{if((s+q)-u<=this.hw){r=0
}}if(r!==false){this.cm=this.grid.colModel;
var n=this.view.getCellIndex(p);
if(r==-1){if(n+r<0){return
}while(this.cm.isHidden(n+r)){--r;
if(n+r<0){return
}}}this.cellIndex=n+r;
this.split=p.dom;
if(this.cm.isResizable(this.cellIndex)&&!this.cm.isFixed(this.cellIndex)){Ext.grid.GridView.SplitDragZone.superclass.handleMouseDown.apply(this,arguments)
}}else{if(this.view.columnDrag){this.view.columnDrag.callHandleMouseDown(v)
}}}},endDrag:function(h){this.marker.hide();
var g=this.view;
var e=Math.max(this.minX,h.getPageX());
var j=e-this.startPos;
g.onColumnSplitterMoved(this.cellIndex,this.cm.getColumnWidth(this.cellIndex)+j);
setTimeout(function(){g.headersDisabled=false
},50)
},autoOffset:function(){this.setDelta(0,0)
}});
Ext.grid.HeaderDragZone=Ext.extend(Ext.dd.DragZone,{maxDragWidth:120,constructor:function(e,g,d){this.grid=e;
this.view=e.getView();
this.ddGroup="gridHeader"+this.grid.getGridEl().id;
Ext.grid.HeaderDragZone.superclass.constructor.call(this,g);
if(d){this.setHandleElId(Ext.id(g));
this.setOuterHandleElId(Ext.id(d))
}this.scroll=false
},getDragData:function(g){var e=Ext.lib.Event.getTarget(g);
var d=this.view.findHeaderCell(e);
if(d){return{ddel:d.firstChild,header:d}
}return false
},onInitDrag:function(d){this.view.headersDisabled=true;
var c=this.dragData.ddel.cloneNode(true);
c.id=Ext.id();
c.style.width=Math.min(this.dragData.header.offsetWidth,this.maxDragWidth)+"px";
this.proxy.update(c);
return true
},afterValidDrop:function(){var b=this.view;
setTimeout(function(){b.headersDisabled=false
},50)
},afterInvalidDrop:function(){var b=this.view;
setTimeout(function(){b.headersDisabled=false
},50)
}});
Ext.grid.HeaderDropZone=Ext.extend(Ext.dd.DropZone,{proxyOffsets:[-4,-9],fly:Ext.Element.fly,constructor:function(e,g,d){this.grid=e;
this.view=e.getView();
this.proxyTop=Ext.DomHelper.append(document.body,{cls:"col-move-top",html:"&#160;"},true);
this.proxyBottom=Ext.DomHelper.append(document.body,{cls:"col-move-bottom",html:"&#160;"},true);
this.proxyTop.hide=this.proxyBottom.hide=function(){this.setLeftTop(-100,-100);
this.setStyle("visibility","hidden")
};
this.ddGroup="gridHeader"+this.grid.getGridEl().id;
Ext.grid.HeaderDropZone.superclass.constructor.call(this,e.getGridEl().dom)
},getTargetFromEvent:function(g){var e=Ext.lib.Event.getTarget(g);
var d=this.view.findCellIndex(e);
if(d!==false){return this.view.getHeaderCell(d)
}},nextVisible:function(g){var d=this.view,e=this.grid.colModel;
g=g.nextSibling;
while(g){if(!e.isHidden(d.getCellIndex(g))){return g
}g=g.nextSibling
}return null
},prevVisible:function(g){var d=this.view,e=this.grid.colModel;
g=g.prevSibling;
while(g){if(!e.isHidden(d.getCellIndex(g))){return g
}g=g.prevSibling
}return null
},positionIndicator:function(q,m,n){var h=Ext.lib.Event.getPageX(n);
var p=Ext.lib.Dom.getRegion(m.firstChild);
var r,o,e=p.top+this.proxyOffsets[1];
if((p.right-h)<=(p.right-p.left)/2){r=p.right+this.view.borderWidth;
o="after"
}else{r=p.left;
o="before"
}if(this.grid.colModel.isFixed(this.view.getCellIndex(m))){return false
}r+=this.proxyOffsets[0];
this.proxyTop.setLeftTop(r,e);
this.proxyTop.show();
if(!this.bottomOffset){this.bottomOffset=this.view.mainHd.getHeight()
}this.proxyBottom.setLeftTop(r,e+this.proxyTop.dom.offsetHeight+this.bottomOffset);
this.proxyBottom.show();
return o
},onNodeEnter:function(h,g,j,e){if(e.header!=h){this.positionIndicator(e.header,h,j)
}},onNodeOver:function(j,e,k,l){var h=false;
if(l.header!=j){h=this.positionIndicator(l.header,j,k)
}if(!h){this.proxyTop.hide();
this.proxyBottom.hide()
}return h?this.dropAllowed:this.dropNotAllowed
},onNodeOut:function(h,g,j,e){this.proxyTop.hide();
this.proxyBottom.hide()
},onNodeDrop:function(w,h,t,v){var u=v.header;
if(u!=w){var q=this.grid.colModel;
var r=Ext.lib.Event.getPageX(t);
var x=Ext.lib.Dom.getRegion(w.firstChild);
var e=(x.right-r)<=((x.right-x.left)/2)?"after":"before";
var s=this.view.getCellIndex(u);
var n=this.view.getCellIndex(w);
if(e=="after"){n++
}if(s<n){n--
}q.moveColumn(s,n);
return true
}return false
}});
Ext.grid.GridView.ColumnDragZone=Ext.extend(Ext.grid.HeaderDragZone,{constructor:function(d,c){Ext.grid.GridView.ColumnDragZone.superclass.constructor.call(this,d,c,null);
this.proxy.el.addClass("x-grid3-col-dd")
},handleMouseDown:function(b){},callHandleMouseDown:function(b){Ext.grid.GridView.ColumnDragZone.superclass.handleMouseDown.call(this,b)
}});
Ext.grid.SplitDragZone=Ext.extend(Ext.dd.DDProxy,{fly:Ext.Element.fly,constructor:function(e,g,d){this.grid=e;
this.view=e.getView();
this.proxy=this.view.resizeProxy;
Ext.grid.SplitDragZone.superclass.constructor.call(this,g,"gridSplitters"+this.grid.getGridEl().id,{dragElId:Ext.id(this.proxy.dom),resizeFrame:false});
this.setHandleElId(Ext.id(g));
this.setOuterHandleElId(Ext.id(d));
this.scroll=false
},b4StartDrag:function(g,h){this.view.headersDisabled=true;
this.proxy.setHeight(this.view.mainWrap.getHeight());
var e=this.cm.getColumnWidth(this.cellIndex);
var j=Math.max(e-this.grid.minColumnWidth,0);
this.resetConstraints();
this.setXConstraint(j,1000);
this.setYConstraint(0,0);
this.minX=g-j;
this.maxX=g+1000;
this.startPos=g;
Ext.dd.DDProxy.prototype.b4StartDrag.call(this,g,h)
},handleMouseDown:function(g){var d=Ext.EventObject.setEvent(g);
var e=this.fly(d.getTarget());
if(e.hasClass("x-grid-split")){this.cellIndex=this.view.getCellIndex(e.dom);
this.split=e.dom;
this.cm=this.grid.colModel;
if(this.cm.isResizable(this.cellIndex)&&!this.cm.isFixed(this.cellIndex)){Ext.grid.SplitDragZone.superclass.handleMouseDown.apply(this,arguments)
}}},endDrag:function(g){this.view.headersDisabled=false;
var e=Math.max(this.minX,Ext.lib.Event.getPageX(g));
var d=e-this.startPos;
this.view.onColumnSplitterMoved(this.cellIndex,this.cm.getColumnWidth(this.cellIndex)+d)
},autoOffset:function(){this.setDelta(0,0)
}});
Ext.grid.GridDragZone=function(c,d){this.view=c.getView();
Ext.grid.GridDragZone.superclass.constructor.call(this,this.view.mainBody.dom,d);
this.scroll=false;
this.grid=c;
this.ddel=document.createElement("div");
this.ddel.className="x-grid-dd-wrap"
};
Ext.extend(Ext.grid.GridDragZone,Ext.dd.DragZone,{ddGroup:"GridDD",getDragData:function(e){var g=Ext.lib.Event.getTarget(e);
var h=this.view.findRowIndex(g);
if(h!==false){var j=this.grid.selModel;
if(!j.isSelected(h)||e.hasModifier()){j.handleMouseDown(this.grid,h,e)
}return{grid:this.grid,ddel:this.ddel,rowIndex:h,selections:j.getSelections()}
}return false
},onInitDrag:function(c){var d=this.dragData;
this.ddel.innerHTML=this.grid.getDragDropText();
this.proxy.update(this.ddel)
},afterRepair:function(){this.dragging=false
},getRepairXY:function(c,d){return false
},onEndDrag:function(d,c){},onValidDrop:function(e,d,g){this.hideProxy()
},beforeInvalidDrop:function(d,c){}});
Ext.grid.ColumnModel=Ext.extend(Ext.util.Observable,{defaultWidth:100,defaultSortable:false,constructor:function(b){if(b.columns){Ext.apply(this,b);
this.setConfig(b.columns,true)
}else{this.setConfig(b,true)
}this.addEvents("widthchange","headerchange","hiddenchange","columnmoved","configchange");
Ext.grid.ColumnModel.superclass.constructor.call(this)
},getColumnId:function(b){return this.config[b].id
},getColumnAt:function(b){return this.config[b]
},setConfig:function(n,c){var m,k,j;
if(!c){delete this.totalWidth;
for(m=0,j=this.config.length;
m<j;
m++){k=this.config[m];
if(k.editor){k.editor.destroy()
}}}this.defaults=Ext.apply({width:this.defaultWidth,sortable:this.defaultSortable},this.defaults);
this.config=n;
this.lookup={};
for(m=0,j=n.length;
m<j;
m++){k=Ext.applyIf(n[m],this.defaults);
if(typeof k.id=="undefined"){k.id=m
}if(!k.isColumn){var l=Ext.grid.Column.types[k.xtype||"gridcolumn"];
k=new l(k);
n[m]=k
}this.lookup[k.id]=k
}if(!c){this.fireEvent("configchange",this)
}},getColumnById:function(b){return this.lookup[b]
},getIndexById:function(g){for(var d=0,e=this.config.length;
d<e;
d++){if(this.config[d].id==g){return d
}}return -1
},moveColumn:function(g,e){var c=this.config[g];
this.config.splice(g,1);
this.config.splice(e,0,c);
this.dataMap=null;
this.fireEvent("columnmoved",this,g,e)
},getColumnCount:function(j){if(j===true){var h=0;
for(var c=0,g=this.config.length;
c<g;
c++){if(!this.isHidden(c)){h++
}}return h
}return this.config.length
},getColumnsBy:function(m,n){var l=[];
for(var c=0,j=this.config.length;
c<j;
c++){var k=this.config[c];
if(m.call(n||this,k,c)===true){l[l.length]=k
}}return l
},isSortable:function(b){return !!this.config[b].sortable
},isMenuDisabled:function(b){return !!this.config[b].menuDisabled
},getRenderer:function(b){if(!this.config[b].renderer){return Ext.grid.ColumnModel.defaultRenderer
}return this.config[b].renderer
},getRendererScope:function(b){return this.config[b].scope
},setRenderer:function(d,c){this.config[d].renderer=c
},getColumnWidth:function(b){return this.config[b].width
},setColumnWidth:function(d,g,e){this.config[d].width=g;
this.totalWidth=null;
if(!e){this.fireEvent("widthchange",this,d,g)
}},getTotalWidth:function(d){if(!this.totalWidth){this.totalWidth=0;
for(var g=0,e=this.config.length;
g<e;
g++){if(d||!this.isHidden(g)){this.totalWidth+=this.getColumnWidth(g)
}}}return this.totalWidth
},getColumnHeader:function(b){return this.config[b].header
},setColumnHeader:function(d,c){this.config[d].header=c;
this.fireEvent("headerchange",this,d,c)
},getColumnTooltip:function(b){return this.config[b].tooltip
},setColumnTooltip:function(d,c){this.config[d].tooltip=c
},getDataIndex:function(b){return this.config[b].dataIndex
},setDataIndex:function(d,c){this.config[d].dataIndex=c
},findColumnIndex:function(j){var h=this.config;
for(var c=0,g=h.length;
c<g;
c++){if(h[c].dataIndex==j){return c
}}return -1
},isCellEditable:function(d,c){return(this.config[d].editable||(typeof this.config[d].editable=="undefined"&&this.config[d].editor))?true:false
},getCellEditor:function(d,c){return this.config[d].getCellEditor(c)
},setEditable:function(d,c){this.config[d].editable=c
},isHidden:function(b){return !!this.config[b].hidden
},isFixed:function(b){return !!this.config[b].fixed
},isResizable:function(b){return b>=0&&this.config[b].resizable!==false&&this.config[b].fixed!==true
},setHidden:function(e,c){var g=this.config[e];
if(g.hidden!==c){g.hidden=c;
this.totalWidth=null;
this.fireEvent("hiddenchange",this,e,c)
}},setEditor:function(d,c){Ext.destroy(this.config[d].editor);
this.config[d].editor=c
},destroy:function(){for(var c=0,g=this.config,e=g.length;
c<e;
c++){Ext.destroy(g[c].editor)
}this.purgeListeners()
}});
Ext.grid.ColumnModel.defaultRenderer=function(b){if(typeof b=="string"&&b.length<1){return"&#160;"
}return b
};
Ext.grid.AbstractSelectionModel=Ext.extend(Ext.util.Observable,{constructor:function(){this.locked=false;
Ext.grid.AbstractSelectionModel.superclass.constructor.call(this)
},init:function(b){this.grid=b;
this.initEvents()
},lock:function(){this.locked=true
},unlock:function(){this.locked=false
},isLocked:function(){return this.locked
},destroy:function(){this.purgeListeners()
}});
Ext.grid.RowSelectionModel=Ext.extend(Ext.grid.AbstractSelectionModel,{singleSelect:false,constructor:function(b){Ext.apply(this,b);
this.selections=new Ext.util.MixedCollection(false,function(a){return a.id
});
this.last=false;
this.lastActive=false;
this.addEvents("selectionchange","beforerowselect","rowselect","rowdeselect");
Ext.grid.RowSelectionModel.superclass.constructor.call(this)
},initEvents:function(){if(!this.grid.enableDragDrop&&!this.grid.enableDrag){this.grid.on("rowmousedown",this.handleMouseDown,this)
}this.rowNav=new Ext.KeyNav(this.grid.getGridEl(),{up:function(c){if(!c.shiftKey||this.singleSelect){this.selectPrevious(false)
}else{if(this.last!==false&&this.lastActive!==false){var d=this.last;
this.selectRange(this.last,this.lastActive-1);
this.grid.getView().focusRow(this.lastActive);
if(d!==false){this.last=d
}}else{this.selectFirstRow()
}}},down:function(c){if(!c.shiftKey||this.singleSelect){this.selectNext(false)
}else{if(this.last!==false&&this.lastActive!==false){var d=this.last;
this.selectRange(this.last,this.lastActive+1);
this.grid.getView().focusRow(this.lastActive);
if(d!==false){this.last=d
}}else{this.selectFirstRow()
}}},scope:this});
this.grid.getView().on({scope:this,refresh:this.onRefresh,rowupdated:this.onRowUpdated,rowremoved:this.onRemove})
},onRefresh:function(){var k=this.grid.store,h;
var m=this.getSelections();
this.clearSelections(true);
for(var n=0,j=m.length;
n<j;
n++){var l=m[n];
if((h=k.indexOfId(l.id))!=-1){this.selectRow(h,true)
}}if(m.length!=this.selections.getCount()){this.fireEvent("selectionchange",this)
}},onRemove:function(e,d,g){if(this.selections.remove(g)!==false){this.fireEvent("selectionchange",this)
}},onRowUpdated:function(e,d,g){if(this.isSelected(g)){e.onRowSelect(d)
}},selectRecords:function(g,j){if(!j){this.clearSelections()
}var k=this.grid.store;
for(var l=0,h=g.length;
l<h;
l++){this.selectRow(k.indexOf(g[l]),true)
}},getCount:function(){return this.selections.length
},selectFirstRow:function(){this.selectRow(0)
},selectLastRow:function(b){this.selectRow(this.grid.store.getCount()-1,b)
},selectNext:function(b){if(this.hasNext()){this.selectRow(this.last+1,b);
this.grid.getView().focusRow(this.last);
return true
}return false
},selectPrevious:function(b){if(this.hasPrevious()){this.selectRow(this.last-1,b);
this.grid.getView().focusRow(this.last);
return true
}return false
},hasNext:function(){return this.last!==false&&(this.last+1)<this.grid.store.getCount()
},hasPrevious:function(){return !!this.last
},getSelections:function(){return[].concat(this.selections.items)
},getSelected:function(){return this.selections.itemAt(0)
},each:function(j,k){var l=this.getSelections();
for(var g=0,h=l.length;
g<h;
g++){if(j.call(k||this,l[g],g)===false){return false
}}return true
},clearSelections:function(e){if(this.isLocked()){return
}if(e!==true){var g=this.grid.store;
var d=this.selections;
d.each(function(a){this.deselectRow(g.indexOfId(a.id))
},this);
d.clear()
}else{this.selections.clear()
}this.last=false
},selectAll:function(){if(this.isLocked()){return
}this.selections.clear();
for(var c=0,d=this.grid.store.getCount();
c<d;
c++){this.selectRow(c,true)
}},hasSelection:function(){return this.selections.length>0
},isSelected:function(d){var c=Ext.isNumber(d)?this.grid.store.getAt(d):d;
return(c&&this.selections.key(c.id)?true:false)
},isIdSelected:function(b){return(this.selections.key(b)?true:false)
},handleMouseDown:function(m,k,l){if(l.button!==0||this.isLocked()){return
}var g=this.grid.getView();
if(l.shiftKey&&!this.singleSelect&&this.last!==false){var n=this.last;
this.selectRange(n,k,l.ctrlKey);
this.last=n;
g.focusRow(k)
}else{var e=this.isSelected(k);
if(l.ctrlKey&&e){this.deselectRow(k)
}else{if(!e||this.getCount()>1){this.selectRow(k,l.ctrlKey||l.shiftKey);
g.focusRow(k)
}}}},selectRows:function(j,h){if(!h){this.clearSelections()
}for(var e=0,g=j.length;
e<g;
e++){this.selectRow(j[e],true)
}},selectRange:function(e,g,h){var j;
if(this.isLocked()){return
}if(!h){this.clearSelections()
}if(e<=g){for(j=e;
j<=g;
j++){this.selectRow(j,true)
}}else{for(j=e;
j>=g;
j--){this.selectRow(j,true)
}}},deselectRange:function(j,e,g){if(this.isLocked()){return
}for(var h=j;
h<=e;
h++){this.deselectRow(h,g)
}},selectRow:function(e,h,g){if(this.isLocked()||(e<0||e>=this.grid.store.getCount())||(h&&this.isSelected(e))){return
}var j=this.grid.store.getAt(e);
if(j&&this.fireEvent("beforerowselect",this,e,h,j)!==false){if(!h||this.singleSelect){this.clearSelections()
}this.selections.add(j);
this.last=this.lastActive=e;
if(!g){this.grid.getView().onRowSelect(e)
}this.fireEvent("rowselect",this,e,j);
this.fireEvent("selectionchange",this)
}},deselectRow:function(d,e){if(this.isLocked()){return
}if(this.last==d){this.last=false
}if(this.lastActive==d){this.lastActive=false
}var g=this.grid.store.getAt(d);
if(g){this.selections.remove(g);
if(!e){this.grid.getView().onRowDeselect(d)
}this.fireEvent("rowdeselect",this,d,g);
this.fireEvent("selectionchange",this)
}},restoreLast:function(){if(this._last){this.last=this._last
}},acceptsNav:function(g,d,e){return !e.isHidden(d)&&e.isCellEditable(d,g)
},onEditorKey:function(g,r){var v=r.getKey(),u,t=this.grid,e=t.lastEdit,s=t.activeEditor,c,e,x,k;
var w=r.shiftKey;
if(v==r.TAB){r.stopEvent();
s.completeEdit();
if(w){u=t.walkCells(s.row,s.col-1,-1,this.acceptsNav,this)
}else{u=t.walkCells(s.row,s.col+1,1,this.acceptsNav,this)
}}else{if(v==r.ENTER){if(this.moveEditorOnEnter!==false){if(w){u=t.walkCells(e.row-1,e.col,-1,this.acceptsNav,this)
}else{u=t.walkCells(e.row+1,e.col,1,this.acceptsNav,this)
}}}}if(u){x=u[0];
k=u[1];
if(e.row!=x){this.selectRow(x)
}if(t.isEditor&&t.editing){c=t.activeEditor;
if(c&&c.field.triggerBlur){c.field.triggerBlur()
}}t.startEditing(x,k)
}},destroy:function(){if(this.rowNav){this.rowNav.disable();
this.rowNav=null
}Ext.grid.RowSelectionModel.superclass.destroy.call(this)
}});
Ext.grid.Column=Ext.extend(Object,{isColumn:true,constructor:function(b){Ext.apply(this,b);
if(Ext.isString(this.renderer)){this.renderer=Ext.util.Format[this.renderer]
}else{if(Ext.isObject(this.renderer)){this.scope=this.renderer.scope;
this.renderer=this.renderer.fn
}}if(!this.scope){this.scope=this
}if(this.editor){this.editor=Ext.create(this.editor,"textfield")
}},renderer:function(b){if(Ext.isString(b)&&b.length<1){return"&#160;"
}return b
},getEditor:function(b){return this.editable!==false?this.editor:null
},getCellEditor:function(c){var d=this.getEditor(c);
if(d){if(!d.startEdit){if(!d.gridEditor){d.gridEditor=new Ext.grid.GridEditor(d)
}return d.gridEditor
}else{if(d.startEdit){return d
}}}return null
}});
Ext.grid.BooleanColumn=Ext.extend(Ext.grid.Column,{trueText:"true",falseText:"false",undefinedText:"&#160;",constructor:function(g){Ext.grid.BooleanColumn.superclass.constructor.call(this,g);
var j=this.trueText,h=this.falseText,e=this.undefinedText;
this.renderer=function(a){if(a===undefined){return e
}if(!a||a==="false"){return h
}return j
}
}});
Ext.grid.NumberColumn=Ext.extend(Ext.grid.Column,{format:"0,000.00",constructor:function(b){Ext.grid.NumberColumn.superclass.constructor.call(this,b);
this.renderer=Ext.util.Format.numberRenderer(this.format)
}});
Ext.grid.DateColumn=Ext.extend(Ext.grid.Column,{format:"m/d/Y",constructor:function(b){Ext.grid.DateColumn.superclass.constructor.call(this,b);
this.renderer=Ext.util.Format.dateRenderer(this.format)
}});
Ext.grid.TemplateColumn=Ext.extend(Ext.grid.Column,{constructor:function(d){Ext.grid.TemplateColumn.superclass.constructor.call(this,d);
var c=(!Ext.isPrimitive(this.tpl)&&this.tpl.compile)?this.tpl:new Ext.XTemplate(this.tpl);
this.renderer=function(b,a,g){return c.apply(g.data)
};
this.tpl=c
}});
Ext.grid.Column.types={gridcolumn:Ext.grid.Column,booleancolumn:Ext.grid.BooleanColumn,numbercolumn:Ext.grid.NumberColumn,datecolumn:Ext.grid.DateColumn,templatecolumn:Ext.grid.TemplateColumn};
Ext.grid.RowNumberer=Ext.extend(Object,{header:"",width:23,sortable:false,constructor:function(b){Ext.apply(this,b);
if(this.rowspan){this.renderer=this.renderer.createDelegate(this)
}},fixed:true,menuDisabled:true,dataIndex:"",id:"numberer",rowspan:undefined,renderer:function(e,j,g,h){if(this.rowspan){j.cellAttr='rowspan="'+this.rowspan+'"'
}return h+1
}});
Ext.grid.CheckboxSelectionModel=Ext.extend(Ext.grid.RowSelectionModel,{header:'<div class="x-grid3-hd-checker">&#160;</div>',width:20,sortable:false,menuDisabled:true,fixed:true,dataIndex:"",id:"checker",constructor:function(){Ext.grid.CheckboxSelectionModel.superclass.constructor.apply(this,arguments);
if(this.checkOnly){this.handleMouseDown=Ext.emptyFn
}},initEvents:function(){Ext.grid.CheckboxSelectionModel.superclass.initEvents.call(this);
this.grid.on("render",function(){var b=this.grid.getView();
b.mainBody.on("mousedown",this.onMouseDown,this);
Ext.fly(b.innerHd).on("mousedown",this.onHdMouseDown,this)
},this)
},onMouseDown:function(j,e){if(j.button===0&&e.className=="x-grid3-row-checker"){j.stopEvent();
var h=j.getTarget(".x-grid3-row");
if(h){var g=h.rowIndex;
if(this.isSelected(g)){this.deselectRow(g)
}else{this.selectRow(g,true)
}}}},onHdMouseDown:function(j,g){if(g.className=="x-grid3-hd-checker"){j.stopEvent();
var e=Ext.fly(g.parentNode);
var h=e.hasClass("x-grid3-hd-checker-on");
if(h){e.removeClass("x-grid3-hd-checker-on");
this.clearSelections()
}else{e.addClass("x-grid3-hd-checker-on");
this.selectAll()
}}},renderer:function(d,g,e){return'<div class="x-grid3-row-checker">&#160;</div>'
}});
Ext.grid.CellSelectionModel=Ext.extend(Ext.grid.AbstractSelectionModel,{constructor:function(b){Ext.apply(this,b);
this.selection=null;
this.addEvents("beforecellselect","cellselect","selectionchange");
Ext.grid.CellSelectionModel.superclass.constructor.call(this)
},initEvents:function(){this.grid.on("cellmousedown",this.handleMouseDown,this);
this.grid.on(Ext.EventManager.useKeydown?"keydown":"keypress",this.handleKeyDown,this);
this.grid.getView().on({scope:this,refresh:this.onViewChange,rowupdated:this.onRowUpdated,beforerowremoved:this.clearSelections,beforerowsinserted:this.clearSelections});
if(this.grid.isEditor){this.grid.on("beforeedit",this.beforeEdit,this)
}},beforeEdit:function(b){this.select(b.row,b.column,false,true,b.record)
},onRowUpdated:function(e,d,g){if(this.selection&&this.selection.record==g){e.onCellSelect(d,this.selection.cell[1])
}},onViewChange:function(){this.clearSelections(true)
},getSelectedCell:function(){return this.selection?this.selection.cell:null
},clearSelections:function(c){var d=this.selection;
if(d){if(c!==true){this.grid.view.onCellDeselect(d.cell[0],d.cell[1])
}this.selection=null;
this.fireEvent("selectionchange",this,null)
}},hasSelection:function(){return this.selection?true:false
},handleMouseDown:function(e,h,g,j){if(j.button!==0||this.isLocked()){return
}this.select(h,g)
},select:function(k,n,h,l,m){if(this.fireEvent("beforecellselect",this,k,n)!==false){this.clearSelections();
m=m||this.grid.store.getAt(k);
this.selection={record:m,cell:[k,n]};
if(!h){var j=this.grid.getView();
j.onCellSelect(k,n);
if(l!==true){j.focusCell(k,n)
}}this.fireEvent("cellselect",this,k,n);
this.fireEvent("selectionchange",this,this.selection)
}},isSelectable:function(g,d,e){return !e.isHidden(d)
},onEditorKey:function(c,d){if(d.getKey()==d.TAB){this.handleKeyDown(d)
}},handleKeyDown:function(s){if(!s.isNavKeyPress()){return
}var v=s.getKey(),t=this.grid,c=this.selection,w=this,k=function(a,d,b){return t.walkCells(a,d,b,t.isEditor&&t.editing?w.acceptsNav:w.isSelectable,w)
},e,u,x,r,g;
switch(v){case s.ESC:case s.PAGE_UP:case s.PAGE_DOWN:break;
default:s.stopEvent();
break
}if(!c){e=k(0,0,1);
if(e){this.select(e[0],e[1])
}return
}e=c.cell;
x=e[0];
r=e[1];
switch(v){case s.TAB:if(s.shiftKey){u=k(x,r-1,-1)
}else{u=k(x,r+1,1)
}break;
case s.DOWN:u=k(x+1,r,1);
break;
case s.UP:u=k(x-1,r,-1);
break;
case s.RIGHT:u=k(x,r+1,1);
break;
case s.LEFT:u=k(x,r-1,-1);
break;
case s.ENTER:if(t.isEditor&&!t.editing){t.startEditing(x,r);
return
}break
}if(u){x=u[0];
r=u[1];
this.select(x,r);
if(t.isEditor&&t.editing){g=t.activeEditor;
if(g&&g.field.triggerBlur){g.field.triggerBlur()
}t.startEditing(x,r)
}}},acceptsNav:function(g,d,e){return !e.isHidden(d)&&e.isCellEditable(d,g)
}});
Ext.grid.EditorGridPanel=Ext.extend(Ext.grid.GridPanel,{clicksToEdit:2,forceValidation:false,isEditor:true,detectEdit:false,autoEncode:false,trackMouseOver:false,initComponent:function(){Ext.grid.EditorGridPanel.superclass.initComponent.call(this);
if(!this.selModel){this.selModel=new Ext.grid.CellSelectionModel()
}this.activeEditor=null;
this.addEvents("beforeedit","afteredit","validateedit")
},initEvents:function(){Ext.grid.EditorGridPanel.superclass.initEvents.call(this);
this.getGridEl().on("mousewheel",this.stopEditing.createDelegate(this,[true]),this);
this.on("columnresize",this.stopEditing,this,[true]);
if(this.clicksToEdit==1){this.on("cellclick",this.onCellDblClick,this)
}else{var b=this.getView();
if(this.clicksToEdit=="auto"&&b.mainBody){b.mainBody.on("mousedown",this.onAutoEditClick,this)
}this.on("celldblclick",this.onCellDblClick,this)
}},onResize:function(){Ext.grid.EditorGridPanel.superclass.onResize.apply(this,arguments);
var b=this.activeEditor;
if(this.editing&&b){b.realign(true)
}},onCellDblClick:function(d,g,e){this.startEditing(g,e)
},onAutoEditClick:function(l,e){if(l.button!==0){return
}var j=this.view.findRowIndex(e),h=this.view.findCellIndex(e);
if(j!==false&&h!==false){this.stopEditing();
if(this.selModel.getSelectedCell){var k=this.selModel.getSelectedCell();
if(k&&k[0]===j&&k[1]===h){this.startEditing(j,h)
}}else{if(this.selModel.isSelected(j)){this.startEditing(j,h)
}}}},onEditComplete:function(e,m,j){this.editing=false;
this.activeEditor=null;
var n=e.record,k=this.colModel.getDataIndex(e.col);
m=this.postEditValue(m,j,n,k);
if(this.forceValidation===true||String(m)!==String(j)){var l={grid:this,record:n,field:k,originalValue:j,value:m,row:e.row,column:e.col,cancel:false};
if(this.fireEvent("validateedit",l)!==false&&!l.cancel&&String(m)!==String(j)){n.set(k,l.value);
delete l.cancel;
this.fireEvent("afteredit",l)
}}this.view.focusCell(e.row,e.col)
},startEditing:function(l,p){this.stopEditing();
if(this.colModel.isCellEditable(p,l)){this.view.ensureVisible(l,p,true);
var o=this.store.getAt(l),m=this.colModel.getDataIndex(p),n={grid:this,record:o,field:m,value:o.data[m],row:l,column:p,cancel:false};
if(this.fireEvent("beforeedit",n)!==false&&!n.cancel){this.editing=true;
var e=this.colModel.getCellEditor(p,l);
if(!e){return
}if(!e.rendered){e.parentEl=this.view.getEditorParent(e);
e.on({scope:this,render:{fn:function(a){a.field.focus(false,true)
},single:true,scope:this},specialkey:function(a,b){this.getSelectionModel().onEditorKey(a,b)
},complete:this.onEditComplete,canceledit:this.stopEditing.createDelegate(this,[true])})
}Ext.apply(e,{row:l,col:p,record:o});
this.lastEdit={row:l,col:p};
this.activeEditor=e;
var k=this.preEditValue(o,m);
e.startEdit(this.view.getCell(l,p).firstChild,Ext.isDefined(k)?k:"")
}}},preEditValue:function(e,g){var d=e.data[g];
return this.autoEncode&&Ext.isString(d)?Ext.util.Format.htmlDecode(d):d
},postEditValue:function(j,g,e,h){return this.autoEncode&&Ext.isString(j)?Ext.util.Format.htmlEncode(j):j
},stopEditing:function(c){if(this.editing){var d=this.activeEditor;
if(d){d[c===true?"cancelEdit":"completeEdit"]();
this.view.focusCell(d.row,d.col)
}this.activeEditor=null
}this.editing=false
}});
Ext.reg("editorgrid",Ext.grid.EditorGridPanel);
Ext.grid.GridEditor=function(c,d){Ext.grid.GridEditor.superclass.constructor.call(this,c,d);
c.monitorTab=false
};
Ext.extend(Ext.grid.GridEditor,Ext.Editor,{alignment:"tl-tl",autoSize:"width",hideEl:false,cls:"x-small-editor x-grid-editor",shim:false,shadow:false});
Ext.grid.PropertyRecord=Ext.data.Record.create([{name:"name",type:"string"},"value"]);
Ext.grid.PropertyStore=Ext.extend(Ext.util.Observable,{constructor:function(d,c){this.grid=d;
this.store=new Ext.data.Store({recordType:Ext.grid.PropertyRecord});
this.store.on("update",this.onUpdate,this);
if(c){this.setSource(c)
}Ext.grid.PropertyStore.superclass.constructor.call(this)
},setSource:function(g){this.source=g;
this.store.removeAll();
var d=[];
for(var e in g){if(this.isEditableValue(g[e])){d.push(new Ext.grid.PropertyRecord({name:e,value:g[e]},e))
}}this.store.loadRecords({records:d},{},true)
},onUpdate:function(j,h,k){if(k==Ext.data.Record.EDIT){var g=h.data.value;
var l=h.modified.value;
if(this.grid.fireEvent("beforepropertychange",this.source,h.id,g,l)!==false){this.source[h.id]=g;
h.commit();
this.grid.fireEvent("propertychange",this.source,h.id,g,l)
}else{h.reject()
}}},getProperty:function(b){return this.store.getAt(b)
},isEditableValue:function(b){return Ext.isPrimitive(b)||Ext.isDate(b)
},setValue:function(c,d){this.source[c]=d;
this.store.getById(c).set("value",d)
},getSource:function(){return this.source
}});
Ext.grid.PropertyColumnModel=Ext.extend(Ext.grid.ColumnModel,{nameText:"Name",valueText:"Value",dateFormat:"m/j/Y",constructor:function(l,g){var k=Ext.grid,j=Ext.form;
this.grid=l;
k.PropertyColumnModel.superclass.constructor.call(this,[{header:this.nameText,width:50,sortable:true,dataIndex:"name",id:"name",menuDisabled:true},{header:this.valueText,width:50,resizable:false,dataIndex:"value",id:"value",menuDisabled:true}]);
this.store=g;
var h=new j.Field({autoCreate:{tag:"select",children:[{tag:"option",value:"true",html:"true"},{tag:"option",value:"false",html:"false"}]},getValue:function(){return this.el.dom.value=="true"
}});
this.editors={date:new k.GridEditor(new j.DateField({selectOnFocus:true})),string:new k.GridEditor(new j.TextField({selectOnFocus:true})),number:new k.GridEditor(new j.NumberField({selectOnFocus:true,style:"text-align:left;"})),"boolean":new k.GridEditor(h,{autoSize:"both"})};
this.renderCellDelegate=this.renderCell.createDelegate(this);
this.renderPropDelegate=this.renderProp.createDelegate(this)
},renderDate:function(b){return b.dateFormat(this.dateFormat)
},renderBool:function(b){return b?"true":"false"
},isCellEditable:function(d,c){return d==1
},getRenderer:function(b){return b==1?this.renderCellDelegate:this.renderPropDelegate
},renderProp:function(b){return this.getPropertyName(b)
},renderCell:function(d){var c=d;
if(Ext.isDate(d)){c=this.renderDate(d)
}else{if(typeof d=="boolean"){c=this.renderBool(d)
}}return Ext.util.Format.htmlEncode(c)
},getPropertyName:function(c){var d=this.grid.propertyNames;
return d&&d[c]?d[c]:c
},getCellEditor:function(h,j){var g=this.store.getProperty(j),k=g.data.name,l=g.data.value;
if(this.grid.customEditors[k]){return this.grid.customEditors[k]
}if(Ext.isDate(l)){return this.editors.date
}else{if(typeof l=="number"){return this.editors.number
}else{if(typeof l=="boolean"){return this.editors["boolean"]
}else{return this.editors.string
}}}},destroy:function(){Ext.grid.PropertyColumnModel.superclass.destroy.call(this);
for(var b in this.editors){Ext.destroy(this.editors[b])
}}});
Ext.grid.PropertyGrid=Ext.extend(Ext.grid.EditorGridPanel,{enableColumnMove:false,stripeRows:false,trackMouseOver:false,clicksToEdit:1,enableHdMenu:false,viewConfig:{forceFit:true},initComponent:function(){this.customEditors=this.customEditors||{};
this.lastEditRow=null;
var c=new Ext.grid.PropertyStore(this);
this.propStore=c;
var d=new Ext.grid.PropertyColumnModel(this,c);
c.store.sort("name","ASC");
this.addEvents("beforepropertychange","propertychange");
this.cm=d;
this.ds=c.store;
Ext.grid.PropertyGrid.superclass.initComponent.call(this);
this.mon(this.selModel,"beforecellselect",function(a,b,g){if(g===0){this.startEditing.defer(200,this,[b,1]);
return false
}},this)
},onRender:function(){Ext.grid.PropertyGrid.superclass.onRender.apply(this,arguments);
this.getGridEl().addClass("x-props-grid")
},afterRender:function(){Ext.grid.PropertyGrid.superclass.afterRender.apply(this,arguments);
if(this.source){this.setSource(this.source)
}},setSource:function(b){this.propStore.setSource(b)
},getSource:function(){return this.propStore.getSource()
}});
Ext.reg("propertygrid",Ext.grid.PropertyGrid);
Ext.grid.GroupingView=Ext.extend(Ext.grid.GridView,{groupByText:"Group By This Field",showGroupsText:"Show in Groups",hideGroupedColumn:false,showGroupName:true,startCollapsed:false,enableGrouping:true,enableGroupingMenu:true,enableNoGroups:true,emptyGroupText:"(None)",ignoreAdd:false,groupTextTpl:"{text}",groupMode:"value",gidSeed:1000,initTemplates:function(){Ext.grid.GroupingView.superclass.initTemplates.call(this);
this.state={};
var b=this.grid.getSelectionModel();
b.on(b.selectRow?"beforerowselect":"beforecellselect",this.onBeforeRowSelect,this);
if(!this.startGroup){this.startGroup=new Ext.XTemplate('<div id="{groupId}" class="x-grid-group {cls}">','<div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div class="x-grid-group-title">',this.groupTextTpl,"</div></div>",'<div id="{groupId}-bd" class="x-grid-group-body">')
}this.startGroup.compile();
if(!this.endGroup){this.endGroup="</div></div>"
}this.endGroup="</div></div>"
},findGroup:function(b){return Ext.fly(b).up(".x-grid-group",this.mainBody.dom)
},getGroups:function(){return this.hasRows()?this.mainBody.dom.childNodes:[]
},onAdd:function(){if(this.enableGrouping&&!this.ignoreAdd){var b=this.getScrollState();
this.refresh();
this.restoreScroll(b)
}else{if(!this.enableGrouping){Ext.grid.GroupingView.superclass.onAdd.apply(this,arguments)
}}},onRemove:function(j,h,g,k){Ext.grid.GroupingView.superclass.onRemove.apply(this,arguments);
var l=document.getElementById(h._groupId);
if(l&&l.childNodes[1].childNodes.length<1){Ext.removeNode(l)
}this.applyEmptyText()
},refreshRow:function(b){if(this.ds.getCount()==1){this.refresh()
}else{this.isUpdating=true;
Ext.grid.GroupingView.superclass.refreshRow.apply(this,arguments);
this.isUpdating=false
}},beforeMenuShow:function(){var g,e=this.hmenu.items,d=this.cm.config[this.hdCtxIndex].groupable===false;
if((g=e.get("groupBy"))){g.setDisabled(d)
}if((g=e.get("showGroups"))){g.setDisabled(d);
g.setChecked(this.enableGrouping,true)
}},renderUI:function(){Ext.grid.GroupingView.superclass.renderUI.call(this);
this.mainBody.on("mousedown",this.interceptMouse,this);
if(this.enableGroupingMenu&&this.hmenu){this.hmenu.add("-",{itemId:"groupBy",text:this.groupByText,handler:this.onGroupByClick,scope:this,iconCls:"x-group-by-icon"});
if(this.enableNoGroups){this.hmenu.add({itemId:"showGroups",text:this.showGroupsText,checked:true,checkHandler:this.onShowGroupsClick,scope:this})
}this.hmenu.on("beforeshow",this.beforeMenuShow,this)
}},processEvent:function(e,k){var l=k.getTarget(".x-grid-group-hd",this.mainBody);
if(l){var m=this.getGroupField(),n=this.getPrefix(m),j=l.id.substring(n.length);
j=j.substr(0,j.length-3);
if(j){this.grid.fireEvent("group"+e,this.grid,m,j,k)
}}},onGroupByClick:function(){this.enableGrouping=true;
this.grid.store.groupBy(this.cm.getDataIndex(this.hdCtxIndex));
this.beforeMenuShow();
this.refresh()
},onShowGroupsClick:function(d,c){this.enableGrouping=c;
if(c){this.onGroupByClick()
}else{this.grid.store.clearGrouping()
}},toggleRowIndex:function(g,e){if(!this.enableGrouping){return
}var d=this.getRow(g);
if(d){this.toggleGroup(this.findGroup(d),e)
}},toggleGroup:function(g,d){var e=Ext.get(g);
d=Ext.isDefined(d)?d:e.hasClass("x-grid-group-collapsed");
if(this.state[e.id]!==d){this.grid.stopEditing(true);
this.state[e.id]=d;
e[d?"removeClass":"addClass"]("x-grid-group-collapsed")
}},toggleAllGroups:function(j){var e=this.getGroups();
for(var h=0,g=e.length;
h<g;
h++){this.toggleGroup(e[h],j)
}},expandAllGroups:function(){this.toggleAllGroups(true)
},collapseAllGroups:function(){this.toggleAllGroups(false)
},interceptMouse:function(c){var d=c.getTarget(".x-grid-group-hd",this.mainBody);
if(d){c.stopEvent();
this.toggleGroup(d.parentNode)
}},getGroup:function(k,o,m,l,g,n){var p=m?m(k,{},o,l,g,n):String(k);
if(p===""||p==="&#160;"){p=this.cm.config[g].emptyGroupText||this.emptyGroupText
}return p
},getGroupField:function(){return this.grid.store.getGroupState()
},afterRender:function(){Ext.grid.GroupingView.superclass.afterRender.call(this);
if(this.grid.deferRowRender){this.updateGroupWidths()
}},renderRows:function(){var h=this.getGroupField();
var j=!!h;
if(this.hideGroupedColumn){var g=this.cm.findColumnIndex(h),k=Ext.isDefined(this.lastGroupField);
if(!j&&k){this.mainBody.update("");
this.cm.setHidden(this.cm.findColumnIndex(this.lastGroupField),false);
delete this.lastGroupField
}else{if(j&&!k){this.lastGroupField=h;
this.cm.setHidden(g,true)
}else{if(j&&k&&h!==this.lastGroupField){this.mainBody.update("");
var l=this.cm.findColumnIndex(this.lastGroupField);
this.cm.setHidden(l,false);
this.lastGroupField=h;
this.cm.setHidden(g,true)
}}}}return Ext.grid.GroupingView.superclass.renderRows.apply(this,arguments)
},doRender:function(R,O,G,T,H,F){if(O.length<1){return""
}var g=this.getGroupField(),I=this.cm.findColumnIndex(g),B;
this.enableGrouping=(this.enableGrouping===false)?false:!!g;
if(!this.enableGrouping||this.isUpdating){return Ext.grid.GroupingView.superclass.doRender.apply(this,arguments)
}var N="width:"+this.getTotalWidth()+";",P=this.cm.config[I],S=P.groupRenderer||P.renderer,E=this.showGroupName?(P.groupName||P.header)+": ":"",r=[],L,D,C,J;
for(D=0,C=O.length;
D<C;
D++){var M=T+D,K=O[D],Q=K.data[g];
B=this.getGroup(Q,K,S,M,I,G);
if(!L||L.group!=B){J=this.constructId(Q,g,I);
this.state[J]=!(Ext.isDefined(this.state[J])?!this.state[J]:this.startCollapsed);
L={group:B,gvalue:Q,text:E+B,groupId:J,startRow:M,rs:[K],cls:this.state[J]?"":"x-grid-group-collapsed",style:N};
r.push(L)
}else{L.rs.push(K)
}K._groupId=J
}var A=[];
for(D=0,C=r.length;
D<C;
D++){B=r[D];
this.doGroupStart(A,B,R,G,H);
A[A.length]=Ext.grid.GroupingView.superclass.doRender.call(this,R,B.rs,G,B.startRow,H,F);
this.doGroupEnd(A,B,R,G,H)
}return A.join("")
},getGroupId:function(d){var c=this.getGroupField();
return this.constructId(d,c,this.cm.findColumnIndex(c))
},constructId:function(n,l,j){var h=this.cm.config[j],m=h.groupRenderer||h.renderer,k=(this.groupMode=="value")?n:this.getGroup(n,{data:{}},m,0,j,this.ds);
return this.getPrefix(l)+Ext.util.Format.htmlEncode(k)
},getPrefix:function(b){return this.grid.getGridEl().id+"-gp-"+b+"-"
},doGroupStart:function(h,k,g,j,l){h[h.length]=this.startGroup.apply(k)
},doGroupEnd:function(h,k,g,j,l){h[h.length]=this.endGroup
},getRows:function(){if(!this.enableGrouping){return Ext.grid.GroupingView.superclass.getRows.call(this)
}var l=[];
var m,p=this.getGroups();
for(var n=0,j=p.length;
n<j;
n++){m=p[n].childNodes[1].childNodes;
for(var o=0,g=m.length;
o<g;
o++){l[l.length]=m[o]
}}return l
},updateGroupWidths:function(){if(!this.enableGrouping||!this.hasRows()){return
}var j=Math.max(this.cm.getTotalWidth(),this.el.dom.offsetWidth-this.getScrollOffset())+"px";
var e=this.getGroups();
for(var h=0,g=e.length;
h<g;
h++){e[h].firstChild.style.width=j
}},onColumnWidthUpdated:function(g,e,d){Ext.grid.GroupingView.superclass.onColumnWidthUpdated.call(this,g,e,d);
this.updateGroupWidths()
},onAllColumnWidthsUpdated:function(d,c){Ext.grid.GroupingView.superclass.onAllColumnWidthsUpdated.call(this,d,c);
this.updateGroupWidths()
},onColumnHiddenUpdated:function(d,g,e){Ext.grid.GroupingView.superclass.onColumnHiddenUpdated.call(this,d,g,e);
this.updateGroupWidths()
},onLayout:function(){this.updateGroupWidths()
},onBeforeRowSelect:function(c,d){this.toggleRowIndex(d,true)
}});
Ext.grid.GroupingView.GROUP_ID=1000;