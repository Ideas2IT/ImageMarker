(function(b){function a(){this._curHash="";
this._callback=function(c){}
}b.extend(a.prototype,{init:function(d){this._callback=d;
this._curHash=location.hash;
if(this._curHash==""){this._curHash="#'show_service_directory','admin','coreType=Ticket&title=Service Directory'";
location.hash=this._curHash
}if(b.browser.msie){if(this._curHash==""){this._curHash="#"
}b("body").prepend('<iframe id="jQuery_history" style="display: none;"></iframe>');
var c=b("#jQuery_history")[0].contentWindow.document;
c.open();
c.close();
c.location.hash=this._curHash
}else{if(b.browser.safari){this._historyBackStack=[];
this._historyBackStack.length=history.length;
this._historyForwardStack=[];
this._isFirst=true;
this._dontCheck=false
}}this._callback(this._curHash.replace(/^#/,""),true);
setInterval(this._check,100)
},add:function(c){this._historyBackStack.push(c);
this._historyForwardStack.length=0;
this._isFirst=true
},_check:function(){if(b.browser.msie){var c=b("#jQuery_history")[0];
var g=c.contentDocument||c.contentWindow.document;
var k=g.location.hash;
location.hash=k;
b.history._curHash=k;
this._callback(k.replace(/^#/,""),false)
}else{if(b.browser.safari){if(!b.history._dontCheck){var e=history.length-b.history._historyBackStack.length;
if(e){b.history._isFirst=false;
if(e<0){for(var f=0;
f<Math.abs(e);
f++){b.history._historyForwardStack.unshift(b.history._historyBackStack.pop())
}}else{for(var f=0;
f<e;
f++){b.history._historyBackStack.push(b.history._historyForwardStack.shift())
}}var h=b.history._historyBackStack[b.history._historyBackStack.length-1];
if(h!=undefined){b.history._curHash=location.hash;
b.history._callback(h,false)
}}else{if(b.history._historyBackStack[b.history._historyBackStack.length-1]==undefined&&!b.history._isFirst){if(document.URL.indexOf("#")>=0){b.history._callback(document.URL.split("#")[1],false)
}else{b.history._callback("",false)
}b.history._isFirst=true
}}}}else{var k=location.hash;
k=k.replaceAll(" ","%20");
var d=b.history._curHash.replaceAll(" ","%20");
if(k!=d){b.history._curHash=k;
b.history._callback(k.replace(/^#/,""),false)
}}}},load:function(f){var g;
if(f.indexOf("(")>0){f=f.substring(f.indexOf("(")+1,f.indexOf(")"))
}if(b.browser.safari){g=f
}else{g="#"+f;
location.hash=g
}this._curHash=g;
if(b.browser.msie){var c=b("#jQuery_history")[0];
var e=c.contentWindow.document;
e.open();
e.close();
e.location.hash=g;
this._callback(f,false)
}else{if(b.browser.safari){this._dontCheck=true;
this.add(f);
var d=function(){b.history._dontCheck=false
};
window.setTimeout(d,200);
this._callback(f,false);
location.hash=g
}else{this._callback(f,false)
}}}});
b(document).ready(function(){b.history=new a()
})
})(jQuery);
(function(a){this.version="(beta)(0.0.1)";
this.maxSize=10;
this.keys=new Array();
this.cache_length=0;
this.items=new Array();
this.setItem=function(c,b){if(typeof(b)!="undefined"){if(typeof(this.items[c])=="undefined"){this.cache_length++
}this.keys.push(c);
this.items[c]=b;
if(this.cache_length>this.maxSize){this.removeOldestItem()
}}return b
};
this.removeItem=function(c){var b;
if(typeof(this.items[c])!="undefined"){this.cache_length--;
var b=this.items[c];
delete this.items[c]
}return b
};
this.getItem=function(b){return this.items[b]
};
this.hasItem=function(b){return typeof(this.items[b])!="undefined"
};
this.removeOldestItem=function(){this.removeItem(this.keys.shift())
};
this.clear=function(){var b=this.cache_length;
this.keys=new Array();
this.cache_length=0;
this.items=new Array();
return b
};
a.jCache=this;
return a
})(jQuery);
(function(a){a.extend({manageAjax:function(b){b=a.extend({manageType:"normal",maxReq:0,blockSameRequest:false,global:true},b);
return new a.ajaxManager(b)
},ajaxManager:function(b){this.opt=b;
this.queue=[]
}});
a.extend(a.ajaxManager.prototype,{add:function(c){var d=this.queue.length,m=this.opt,b=this.queue,l=this,f,e;
var g=(c.data&&typeof c.data!="string")?a.param(c.data):c.data;
if(m.blockSameRequest){var k=false;
for(f=0;
f<d;
f++){if(b[f]&&b[f].data===g&&b[f].url===c.url&&b[f].type===c.type){k=true;
break
}}if(k){return false
}}b[d]={fnError:c.error,fnSuccess:c.success,fnComplete:c.complete,fnAbort:c.abort,error:[],success:[],complete:[],done:false,queued:false,data:g,url:c.url,type:c.type,xhr:null};
c.error=function(){if(b[d]){b[d].error=arguments
}};
c.success=function(){if(b[d]){b[d].success=arguments
}};
c.abort=function(){if(b[d]){b[d].abort=arguments
}};
function h(n){if(b[n].fnError){b[n].fnError.apply(a,b[n].error)
}if(b[n].fnSuccess){b[n].fnSuccess.apply(a,b[n].success)
}if(b[n].fnComplete){b[n].fnComplete.apply(a,b[n].complete)
}l.abort(n,true)
}c.complete=function(){if(!b[d]){return
}b[d].complete=arguments;
b[d].done=true;
switch(m.manageType){case"sync":if(d===0||!b[d-1]){var n=b.length;
for(f=d;
f<n;
f++){if(b[f]){if(b[f].done){h(f)
}else{break
}}}}break;
case"queue":if(d===0||!b[d-1]){var n=b.length;
for(f=0,e=0;
f<n;
f++){if(b[f]&&b[f].queued){b[f].xhr=jQuery.ajax(b[f].xhr);
b[f].queued=false;
break
}}}h(d);
break;
case"abortOld":h(d);
for(f=d;
f>=0;
f--){if(b[f]){l.abort(f)
}}break;
default:h(d);
break
}};
if(m.maxReq){if(m.manageType!="queue"){for(f=d,e=0;
f>=0;
f--){if(e>=m.maxReq){this.abort(f)
}if(b[f]){e++
}}}else{for(f=0,e=0;
f<=d&&!b[d].queued;
f++){if(b[f]&&!b[f].queued){e++
}if(e>m.maxReq){b[d].queued=true
}}}}b[d].xhr=(b[d].queued)?c:jQuery.ajax(c);
return d
},cleanUp:function(){this.queue=[]
},abort:function(f,d){var c=this.queue.length,l=this.opt,b=this.queue,k=this,e;
function h(m){if(!b[m]){return
}(!d&&b[m].fnAbort)&&b[m].fnAbort.apply(a,[m]);
if(!b[m]){return
}if(b[m].xhr){if(typeof b[m].xhr.abort!="undefined"){b[m].xhr.abort()
}if(typeof b[m].xhr.close!="undefined"){b[m].xhr.close()
}b[m].xhr=null
}if(l.global&&a.active&&!--a.active){a.event.trigger("ajaxStop")
}b[m]=null
}if(!f&&f!==0){for(e=0;
e<c;
e++){h(e)
}this.cleanUp()
}else{h(f);
var g=true;
for(e=c;
e>=0;
e--){if(b[e]){g=false;
break
}}if(g){this.cleanUp()
}}}})
})(jQuery);
(function(){$.fn.dataTable=function(q){var N={bPaginate:true,bLengthChange:true,bFilter:true,bSort:true,bInfo:true,bInfoContainer:null,bProcessing:true,bAutoWidth:true};
var p=null;
var C=null;
var M=null;
var ab=null;
var d=null;
var aa=null;
if(q.gridAction!=null&&q.gridModule!=null){if(typeof q.gridAction!="undefined"){p=q.gridAction
}if(typeof q.gridParam!="undefined"){d=q.gridParam
}if(typeof q.gridModule!="undefined"){C=q.gridModule
}if(typeof q.exportAction!="undefined"){M=q.exportAction
}if(typeof q.exportModule!="undefined"){ab=q.exportModule
}var Y="<a href=javascript:execute('"+p+"','"+C+"','"+escape(d)+"')>Reload</a> | <a id='autoRefreshLink' href='javascript:setRefreshInterval();'>AutoRefreshOff</a> | <b><font style='font-size:11px'>Total Records : _TOTAL_ </font></b>";
if(p=="show_search_asset_results"){p="show_search_asset_results";
if(d.indexOf("applicationName")!=-1&&d.lastIndexOf("applicationName")!=-1&&(d.indexOf("applicationName")==d.lastIndexOf("applicationName"))){var Z=d.split("&");
d=Z[0];
d=escape(d);
Y="<a href=javascript:openFormForBulkUpdate('"+d+"');>Bulk Update</a> | <a href=javascript:saveSearch();>SaveSearch</a> |  <b><font style='font-size:11px'>Total Records : _TOTAL_ </font></b>"
}else{Y="<a href=javascript:saveSearch();>SaveSearch</a> |  <b><font style='font-size:11px'>Total Records : _TOTAL_ </font></b>"
}}if(p=="show_ticket_tags"||p=="un_tag_ticket_grid"){p="show_ticket_tags";
Y="<a href=javascript:execute('delete_tag_from_title','form','"+escape(d)+"');>Delete Tag</a> | <a href=javascript:execute('"+p+"','"+C+"','"+escape(d)+"')>Reload</a> | <a id='autoRefreshLink' href='javascript:setRefreshInterval();'>AutoRefreshOff</a> | <b><font style='font-size:11px'>Total Records : _TOTAL_ </font></b>"
}if(p=="show_data_tags"||p=="un_tag_data_grid"){p="show_data_tags";
Y="<a href=javascript:execute('delete_tag_from_title','form','"+escape(d)+"');>Delete Tag</a> | <a href=javascript:execute('"+p+"','"+C+"','"+escape(d)+"')>Reload</a> | <a id='autoRefreshLink' href='javascript:setRefreshInterval();'>AutoRefreshOff</a> | <b><font style='font-size:11px'>Total Records : _TOTAL_ </font></b>"
}if(p=="show_search_results"||p=="show_form_for_bulk_update"){p="show_search_results";
if(d.indexOf("applicationName")!=-1&&d.lastIndexOf("applicationName")!=-1&&(d.indexOf("applicationName")==d.lastIndexOf("applicationName"))){var Z=d.split("&");
d=Z[0];
d=escape(d);
Y="<a href=javascript:openFormForBulkUpdate('"+d+"');>Bulk Update</a> | <a href=javascript:saveSearch();>SaveSearch</a> |  <b><font style='font-size:11px'>Total Records : _TOTAL_ </font></b>"
}else{Y="<a href=javascript:saveSearch();>SaveSearch</a> |  <b><font style='font-size:11px'>Total Records : _TOTAL_ </font></b>"
}}aa={sProcessing:"Processing...",sLengthMenu:"Show _MENU_ entries",sZeroRecords:"No matching records found",sInfo:Y,sInfoEmtpy:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sSearch:"Search:",sUrl:""}
}else{aa={sProcessing:"Processing...",sLengthMenu:"Show _MENU_ entries",sZeroRecords:"No matching records found",sInfo:"Total Records : _TOTAL_ ",sInfoEmtpy:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sSearch:"Search:",sUrl:""}
}var ac=new Array();
var B=new Array();
var U=new Array();
var l=new Array();
var S="";
var L=null;
var b=null;
var k=10;
var t=0;
var f=10;
var P=null;
var c=0;
var e=new Array();
var W=null;
var a=null;
var V=null;
var Q=true;
var A=true;
var o=null;
var J=null;
var af=true;
var u=false;
var K="";
var h=null;
var R=0;
var y=false;
this.fnDraw=function(){ad();
D(this)
};
this.getAutoRefresh=function(){return V
};
this.setAutoRefresh=function(ag){V=ag;
E();
return
};
function g(){if(myInterval){window.clearInterval(myInterval)
}myInterval=null
}function E(){g();
if(V&&parseInt(V)!=0){myInterval=window.setInterval(function(){execute(p,C,d)
},V)
}}this.fnFilter=function(ag){X(this,ag,1)
};
this.fnSort=function(ag){_fnSort(this,ag)
};
this.fnAddData=function(ag){if(typeof ag[0]=="object"){if(ag[0].length!=ac.length){return 1
}else{U=U.concat(ag.slice())
}}else{if(ag.length!=ac.length){return 1
}else{U[U.length++]=ag.slice()
}}B=U.slice();
I(1);
_fnSort(this,P,true);
if(N.bFilter){X(this,S)
}else{t=0;
ad();
D(this)
}return 0
};
this.fnAddRow=function(ag){this.fnAddData(ag)
};
this.fnAddArray=function(ag){this.fnAddData(aData)
};
this.fnDeleteRow=function(ai,ah){if(U.length==B.length){iIndexAAMaster=ai
}else{iIndexAAMaster=x(ai)
}var ag=U[iIndexAAMaster].slice();
U.splice(iIndexAAMaster,1);
B.splice(ai,1);
I(1);
if(typeof ah=="function"){ah.call(this)
}if(t>B.length){t-=k
}ad();
D(this);
return ag
};
this.fnClearTable=function(){U.length=0;
B.length=0;
ad();
D(this)
};
this.fnOpen=function(aj,ai,ak){this.fnClose();
var ag=document.createElement("tr");
var ah=document.createElement("td");
ag.appendChild(ah);
ag.setAttribute("id",K+"_opened_row");
ag.className=ak;
ah.colSpan=ac.length;
ah.innerHTML=ai;
$(ag).insertAfter(aj);
u=true
};
this.fnClose=function(){$("#"+K+"_opened_row").remove();
u=false
};
this.fnDecrement=function(ai,ah){if(typeof ah=="undefined"){ah=0
}for(var ag=0;
ag<U.length;
ag++){if(U[ag][ah]*1>ai){U[ag][ah]=(U[ag][ah]*1)-1
}}};
function G(ag){ac[ac.length++]={sType:null,bVisible:true,bSearchable:true,bSortable:true,sTitle:null,sWidth:null,sClass:null,fnRender:null,fnSort:null};
if(typeof ag!="undefined"&&ag!=null){if(typeof ag.sType!="undefined"){ac[ac.length-1].sType=ag.sType
}if(typeof ag.bVisible!="undefined"){ac[ac.length-1].bVisible=ag.bVisible
}if(typeof ag.bSearchable!="undefined"){ac[ac.length-1].bSearchable=ag.bSearchable
}if(typeof ag.bSortable!="undefined"){ac[ac.length-1].bSortable=ag.bSortable
}if(typeof ag.sTitle!="undefined"){ac[ac.length-1].sTitle=ag.sTitle
}if(typeof ag.sWidth!="undefined"){ac[ac.length-1].sWidth=ag.sWidth
}if(typeof ag.sClass!="undefined"){ac[ac.length-1].sClass=ag.sClass
}if(typeof ag.fnRender!="undefined"){ac[ac.length-1].fnRender=ag.fnRender
}if(typeof ag.fnSort!="undefined"){ac[ac.length-1].fnSort=ag.fnSort
}}}function O(ag){var ai;
if($("thead th",ag).length!=ac.length){alert("Warning - columns do not match")
}for(var ah=0;
ah<ac.length;
ah++){if(ac[ah].sTitle==null){ac[ah].sTitle=$("thead th:nth-child("+(ah+1)+")",ag).text()
}if(ac[ah].sClass==null){ac[ah].sClass=$("tbody td:nth-child("+(ah+1)+")",ag).attr("class")
}$("tbody td:nth-child("+ac.length+"n+"+(ah+1)+")",ag).each(function(aj){if(typeof B[aj]!="object"){B[aj]=new Array()
}B[aj][ah]=this.innerHTML;
if(ac[ah].sType==null){ac[ah].sType=m(B[aj][ah])
}else{if(ac[ah].sType=="date"||ac[ah].sType=="numeric"){ac[ah].sType=m(B[aj][ah])
}}})
}}function m(ag){if(s(ag)){return"numeric"
}else{if(!isNaN(Date.parse(ag))){return"date"
}else{return"string"
}}}function s(ah){var aj="0123456789.";
var ag;
var ai=0;
for(i=0;
i<ah.length;
i++){ag=ah.charAt(i);
if(ag=="."){ai++
}if(aj.indexOf(ag)==-1){return false
}}if(ai>1){return false
}else{return true
}}function T(ah,aj){var am=document.createElement("tr");
var al;
for(var ai=0;
ai<ac.length;
ai++){if(ac[ai].bVisible){al=document.createElement("th");
var ak="";
if(ac[ai].sWidth!=null){al.style.width=ac[ai].sWidth
}if(ai==aj){al.innerHTML="<a class='sorting_asc'></a>"+ac[ai].sTitle
}else{al.innerHTML=ac[ai].sTitle
}al.className=ac[ai].sClass;
am.appendChild(al)
}}if(A==true){am.className="gridTable"
}else{if(A!=false){am.className=A
}}$("thead",ah).html("")[0].appendChild(am);
if(ah.getElementsByTagName("tfoot").length!=0){var ag=am.cloneNode(true);
$("th",ag).removeClass("sorting_asc");
$("tfoot",ah).html("")[0].appendChild(ag)
}if(N.bSort){$("thead th",ah).click(function(){if(N.bProcessing){n(true)
}var an=$("thead th",ah).index(this);
var aq="";
var ap=0;
$("thead th",ah).each(function(){this.innerHTML=ac[ap].sTitle;
ap++
});
for(var ao=0;
ao<ac.length;
ao++){if(an==ao){aq=ac[ao].sTitle;
break
}}_fnSort(ah,an);
$("thead th",ah).removeClass("sorting_asc").removeClass("sorting_desc");
if(c==0){this.innerHTML="<a class='sorting_asc'></a>"+aq
}else{this.innerHTML="<a class='sorting_desc'></a>"+aq
}if(N.bProcessing){n(false)
}})
}ah.style.width=ah.offsetWidth+"px"
}function D(ar){var an=new Array();
var aq="";
var ap=0;
var ak;
var am;
if(B.length!=0){for(var al=t;
al<f;
al++){an[ap]=document.createElement("tr");
if(e.length>0){an[ap].className=e[ap%e.length]
}for(am=0;
am<ac.length;
am++){if(ac[am].bVisible){ak=document.createElement("td");
ak.setAttribute("valign","top");
if(P==am&&ac[am].sClass!=null){ak.className=ac[am].sClass+" sorting"
}else{if(P==am){ak.className="sorting"
}else{if(ac[am].sClass!=null){ak.className=ac[am].sClass
}}}if(typeof ac[am].fnRender=="function"){ak.innerHTML=ac[am].fnRender({iDataRow:al,iDataColumn:am,aData:B})
}else{if(B[al]){var aj=false;
if(am==0){var ag="";
if(B[al][am].indexOf("<")!=-1){ag=B[al][am].substring(0,B[al][am].lastIndexOf("</a>"));
ag=ag.substring(ag.lastIndexOf(">")+1);
ag=ag.replace(/\&nbsp;/,"")
}else{ag=B[al][am]
}var ai=getSelectedRows();
for(var ao=0;
ao<ai.length;
ao++){if(ag==ai[ao]){aj=true
}}}ak.innerHTML=B[al][am];
if(!Q){}else{ak.onclick=new Function("_fnChangeRowStyle('"+J+"',"+ap+","+al+")")
}}}if(aj){if(an[ap].className=="odd"){an[ap].className="odd_selected"
}else{if(an[ap].className=="even"){an[ap].className="even_selected"
}}}an[ap].appendChild(ak)
}}if(typeof a=="string"){var ag="";
if(B[al][0].indexOf("<")!=-1){ag=B[al][0].substring(0,B[al][0].lastIndexOf("</a>"));
ag=ag.substring(ag.lastIndexOf(">")+1);
ag=ag.replace(/\&nbsp;/,"")
}else{ag=B[al][0]
}an[ap].onclick=new Function(a+'("'+J+'",'+ap+',"'+ag+'")')
}if(typeof W=="function"){an[ap]=W(an[ap],B[al],ap,al)
}ap++
}E()
}else{an[0]=document.createElement("tr");
ak=document.createElement("td");
ak.setAttribute("valign","top");
ak.colSpan=ac.length;
ak.style.textAlign="center";
ak.innerHTML=aa.sZeroRecords;
an[ap].appendChild(ak)
}var ah=$("tbody",ar);
ah.html("");
for(am=0;
am<an.length;
am++){ah[0].appendChild(an[am])
}if(N.bPaginate){document.getElementById(K+"_previous").className=(t==0)?"paginate_previous":"paginate_previous";
document.getElementById(K+"_next").className=(f==B.length)?"paginate_next":"paginate_next"
}if(N.bInfo){if(B.length==0&&B.length==U.length){L.innerHTML=aa.sInfoEmtpy+" "+aa.sInfoPostFix
}else{if(B.length==0){L.innerHTML=aa.sInfoEmtpy+" "+aa.sInfoFiltered.replace("_MAX_",U.length)+" "+aa.sInfoPostFix
}else{if(B.length==U.length){L.innerHTML=aa.sInfo.replace("_START_",t+1).replace("_END_",f).replace("_TOTAL_",B.length)+" "+aa.sInfoPostFix
}else{L.innerHTML=aa.sInfo.replace("_START_",t+1).replace("_END_",f).replace("_TOTAL_",B.length)+" "+aa.sInfoFiltered.replace("_MAX_",U.length)+" "+aa.sInfoPostFix
}}}}}function ae(aj){if(N.bFilter){var an=document.createElement("div");
an.setAttribute("id",K+"_filter");
an.className="dataTables_filter";
an.innerHTML=aa.sSearch+' <input type="text" name="'+K+'_filter">';
aj.parentNode.insertBefore(an,aj);
$("input[name='"+K+"_filter']").keyup(function(){X(aj,this.value)
})
}if(N.bInfo){L=document.getElementById(N.bInfoContainer);
L.className="_info"
}if(N.bPaginate){var ak=document.createElement("div");
ak.setAttribute("id",K+"_paginate");
ak.className="dataTables_paginate";
if(B.length<k){ak.style.display="none"
}var ap=document.createElement("div");
var ah=document.createElement("div");
var ai=document.createElement("div");
var ag=document.createElement("div");
ai.setAttribute("id",K+"_previous");
ag.setAttribute("id",K+"_next");
ap.setAttribute("id",K+"_first");
ah.setAttribute("id",K+"_last");
ai.className="paginate_previous";
ag.className="paginate_next";
ap.className="paginate_first";
ah.className="paginate_last";
ak.appendChild(ap);
ak.appendChild(ai);
ak.appendChild(ag);
ak.appendChild(ah);
$(ak).insertAfter(aj);
$(ai).click(function(){t-=k;
if(t<0){t=0
}ad();
D(aj)
});
$(ap).click(function(){t=0;
ad();
D(aj)
});
$(ag).click(function(){if(t+k<B.length){t+=k
}ad();
D(aj)
});
$(ah).click(function(){while(t+k<B.length){t+=k
}ad();
D(aj)
});
if(N.bLengthChange){var al='<select size="1" name="'+K+'_length"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select>';
var ao=document.createElement("div");
ao.setAttribute("id",K+"_length");
ao.className="dataTables_length";
ao.innerHTML=aa.sLengthMenu.replace("_MENU_",al);
aj.parentNode.insertBefore(ao,aj);
$("select",ao).change(function(){k=parseInt($(this).val());
ad();
D(aj);
if(B.length<k){ak.style.display="none"
}})
}var am=document.createElement("div");
am.setAttribute("id",K+"_wrapper");
am.className="dataTables_wrapper";
aj.parentNode.insertBefore(am,aj);
am.appendChild(aj)
}if(N.bProcessing){b=document.createElement("div");
b.setAttribute("id",K+"_processing");
b.appendChild(document.createTextNode(aa.sProcessing));
b.className="dataTables_processing";
b.style.visibility="hidden";
aj.parentNode.insertBefore(b,aj)
}}function n(ag){if(ag){b.style.visibility="visible"
}else{b.style.visibility="hidden"
}}function z(aj,ah){if(!aj||aj==null||aj==""){return 0
}if(typeof ah=="undefined"){ah=document.getElementsByTagName("body")[0]
}var ai;
var ag=document.createElement("div");
ag.style.width=aj;
ah.appendChild(ag);
ai=ag.offsetWidth;
ah.removeChild(ag);
return(ai)
}function X(ap,aq,ag){var ao,an,al;
var am=new Array();
if(typeof ag=="undefined"||ag==null){ag=0
}var ai=aq.split(" ");
var aj="^(?=.*?"+ai.join(")(?=.*?")+").*$";
var ak=new RegExp(aj,"i");
if(aq.length<=0){B.splice(0,B.length);
B=U.slice()
}else{if(B.length==U.length||S.length>aq.length||ag==1){am.splice(0,am.length);
I(1);
for(an=0;
an<U.length;
an++){if(ak.test(l[an])){am[am.length++]=U[an]
}}B=am
}else{var ah=0;
for(an=0;
an<B.length;
an++){if(!ak.test(l[an])){B.splice(an-ah,1);
ah++
}}}S=aq
}t=0;
ad();
D(ap);
I(0)
}function ad(){if(N.bPaginate==false){f=B.length
}else{if(t+k>B.length){f=B.length
}else{f=t+k
}}}_fnSort=function(ai,ah,aj){var ag=null;
$("th").each(function(ak){if(ak==ah){ag=$(this).html()
}});
if(!ac[ah].bSortable){return
}if(typeof aj=="undefined"){aj=false
}if(ah==P&&!aj){U.reverse();
c=(c==0)?1:0
}else{P=ah;
c=0;
if(typeof ac[ah].fnSort=="function"){U.sort(ac[ah].fnSort)
}else{if(ac[ah].sType=="numeric"){U.sort(function(al,ak){return al[ah]-ak[ah]
})
}else{if(ac[ah].sType=="date"){U.sort(function(am,al){var ak=Date.parse(am[ah]);
var an=Date.parse(al[ah]);
return ak-an
})
}else{U.sort(function(an,am){var al=an[ah].toLowerCase();
var ap=am[ah].toLowerCase();
if(ag!=null&&(ag=="id"||ag=="Id"||ag=="ID")){var ak=an[ah].substring(an[ah].indexOf(">")+1,an[ah].lastIndexOf("<"));
var ao=am[ah].substring(am[ah].indexOf(">")+1,am[ah].lastIndexOf("<"));
ak=ak.substring(ak.indexOf("-")+1);
ao=ao.substring(ao.indexOf("-")+1);
return parseInt(ak)-parseInt(ao)
}else{if((al.charAt(0)>0&&al.charAt(0)<=9)&&(ap.charAt(0)>0&&ap.charAt(0)<=9)){return parseInt(an[ah])-parseInt(am[ah])
}else{return((al<ap)?-1:((al>ap)?1:0))
}}})
}}}}if(N.bFilter){X(ai,S,1)
}else{B=U.slice()
}ad();
D(ai)
};
function I(ag){l.splice(0,l.length);
var ah=(typeof ag!="undefined"&&ag==1)?U:B;
for(i=0;
i<ah.length;
i++){l[i]="";
for(j=0;
j<ac.length;
j++){if(ac[j].bSearchable){l[i]+=ah[i][j]+" "
}}}}function H(ak){var ar=ak.offsetWidth;
var an=0;
var ap;
var ah=0;
var aj;
var at=$("thead th",ak);
for(var aj=0;
aj<ac.length;
aj++){if(ac[aj].bVisible){ah++;
if(ac[aj].sWidth!=null){ap=z(ac[aj].sWidth,ak.parentNode);
an+=ap;
ac[aj].sWidth=ap+"px"
}}}if(ac.length==at.length&&an==0){for(aj=0;
aj<ac.length;
aj++){ac[aj].sWidth=at[aj].offsetWidth+"px"
}}else{var am=ak.cloneNode(false);
am.setAttribute("id","");
var au='<table class="'+am.className+'">';
var ag="<tr>";
var ao="<tr>";
for(var aj=0;
aj<ac.length;
aj++){if(ac[aj].bVisible){ag+="<th>"+ac[aj].sTitle+"</th>";
if(ac[aj].sWidth!=null){var ai="";
if(ac[aj].sWidth!=null){ai=' style="width:'+ac[aj].sWidth+';"'
}ao+="<td"+ai+' tag_index="'+aj+'">'+F(aj)+"</td>"
}else{ao+='<td tag_index="'+aj+'">'+F(aj)+"</td>"
}}}ag+="</tr>";
ao+="</tr>";
am=$(au+ag+ao+"</table>")[0];
am.style.width=ar+"px";
am.style.visibility="hidden";
am.style.position="absolute";
ak.parentNode.appendChild(am);
var aq=$("td",am);
var al;
for(aj=0;
aj<aq.length;
aj++){al=aq[aj].getAttribute("tag_index");
ac[al].sWidth=$("td",am)[aj].offsetWidth+"px"
}ak.parentNode.removeChild(am)
}}function F(ah){var ag=0;
var aj=-1;
for(var ai=0;
ai<U.length;
ai++){if(U[ai][ah].length>ag){ag=U[ai][ah].length;
aj=ai
}}if(aj>=0){return U[aj][ah]
}else{return""
}}function r(ai,ah){if(ai.length!=ah.length){return 1
}for(var ag=0;
ag<ai.length;
ag++){if(ai[ag]!=ah[ag]){return 2
}}return 0
}function x(ah){var ag=0;
while(r(U[ag],B[ah])!=0){ag++
}return ag
}function v(ag){if(typeof ag.sProcessing!="undefined"){aa.sProcessing=ag.sProcessing
}if(typeof ag.sLengthMenu!="undefined"){aa.sLengthMenu=ag.sLengthMenu
}if(typeof ag.sZeroRecords!="undefined"){aa.sZeroRecords=ag.sZeroRecords
}if(typeof ag.sInfo!="undefined"){aa.sInfo=ag.sInfo
}if(typeof ag.sInfoEmtpy!="undefined"){aa.sInfoEmtpy=ag.sInfoEmtpy
}if(typeof ag.sInfoFiltered!="undefined"){aa.sInfoFiltered=ag.sInfoFiltered
}if(typeof ag.sInfoPostFix!="undefined"){aa.sInfoPostFix=ag.sInfoPostFix
}if(typeof ag.sSearch!="undefined"){aa.sSearch=ag.sSearch
}w()
}function w(){if(y==false){setTimeout(function(){w()
},2000)
}ae(h);
T(h,R);
if(N.bSort){if(af){_fnSort(h,R)
}else{ad();
D(h)
}}else{D(h)
}}return this.each(function(){var ai=false;
var ah=false;
if(typeof q!="undefined"&&q!=null){if(typeof q.bPaginate!="undefined"){N.bPaginate=q.bPaginate
}if(typeof q.bLengthChange!="undefined"){N.bLengthChange=q.bLengthChange
}if(typeof q.bFilter!="undefined"){N.bFilter=q.bFilter
}if(typeof q.bSort!="undefined"){N.bSort=q.bSort
}if(typeof q.bInfo!="undefined"){N.bInfo=q.bInfo
}if(typeof q.bInfoContainer!="undefined"){N.bInfoContainer=q.bInfoContainer
}if(typeof q.bProcessing!="undefined"){N.bProcessing=q.bProcessing
}if(typeof q.bAutoWidth!="undefined"){N.bAutoWidth=q.bAutoWidth
}if(typeof q.aaData!="undefined"){ah=true
}if(typeof q.iDisplayLength!="undefined"){k=q.iDisplayLength
}if(typeof q.asStripClasses!="undefined"){e=q.asStripClasses
}else{e=["odd","even"]
}if(typeof q.fnRowCallback!="undefined"){W=q.fnRowCallback
}if(typeof q.onRowClickEvent!="undefined"){a=q.onRowClickEvent
}if(typeof q.autoRefresh!="undefined"){V=q.autoRefresh
}if(typeof q.multiSelect!="undefined"){Q=q.multiSelect
}if(typeof q.applyTableHeadTheme!="undefined"){A=q.applyTableHeadTheme
}if(typeof q.tableContainer!="undefined"){J=q.tableContainer
}if(typeof q.defaultSort!="undefined"){af=q.defaultSort
}if(typeof q.iDefaultSortIndex!="undefined"){R=q.iDefaultSortIndex
}if(typeof q!="undefined"&&typeof q.aoData!="undefined"){q.aoColumns=q.aoData
}if(typeof q.oLanguage!="undefined"){ai=true;
if(q.oLanguage.sUrl!="undefined"){aa.sUrl=q.oLanguage.sUrl;
$.getJSON(aa.sUrl,null,v)
}else{v(q.oLanguage)
}}}K=this.getAttribute("id");
h=this;
if(typeof q!="undefined"&&typeof q.aoColumns!="undefined"){for(var ag=0;
ag<q.aoColumns.length;
ag++){G(q.aoColumns[ag])
}}else{$("thead th",this).each(function(){G(null)
})
}if(ah){U=q.aaData.slice();
$(this).html("<thead></thead><tbody></tbody>")
}else{O(this);
U=B.slice()
}if(N.bAutoWidth){H(this)
}y=true;
if(ai==false){w()
}})
}
})(jQuery);
jQuery.fn.createAppend=function(e,c,f){var a=this[0];
if(jQuery.browser.msie&&e=="input"&&c.type){var e=document.createElement("<"+e+' type="'+c.type+'" />')
}else{var e=document.createElement(e)
}if(jQuery.browser.msie&&a.nodeName.toLowerCase()=="table"&&e.nodeName.toLowerCase()=="tr"){if(a.parentNode.getElementsByTagName("tbody")[0]){var b=a.getElementsByTagName("tbody")[0]
}else{var b=a.appendChild(document.createElement("tbody"))
}var e=b.appendChild(e)
}else{var e=a.appendChild(e)
}e=__FlyDOM_parseAttrs(e,c);
if(typeof f=="object"&&f!=null){for(var d=0;
d<f.length;
d=d+3){jQuery(e).createAppend(f[d],f[d+1]||{},f[d+2]||[])
}}else{if(f!=null){e=__FlyDOM_setText(e,f)
}}return jQuery(e)
};
jQuery.fn.createPrepend=function(c,a,d){var c=document.createElement(c);
if(this[0].hasChildNodes()==false){var c=this[0].appendChild(c)
}c=__FlyDOM_parseAttrs(c,a);
if(typeof d=="object"&&d!=null){for(var b=0;
b<d.length;
b=b+3){jQuery(c).createAppend(d[b],d[b+1]||{},d[b+2]||[])
}}else{if(d!=null){c=__FlyDOM_setText(c,d)
}}if(this[0].hasChildNodes()==true){var c=this[0].insertBefore(c,this[0].firstChild)
}return jQuery(c)
};
jQuery.fn.tplAppend=function(e,b){if(e.constructor!=Array){e=[e]
}if(e.length==0){return false
}for(var d=0;
d<e.length;
d++){var c=b.apply(e[d]);
for(var a=0;
a<c.length;
a=a+3){jQuery(this).createAppend(c[a],c[a+1],c[a+2])
}}return self
};
jQuery.fn.tplPrepend=function(g,d){var b=this[0];
if(g.constructor!=Array){g=[g]
}if(g.length==0){return false
}var h=document.createElement("div");
for(var f=0;
f<g.length;
f++){var e=d.apply(g[f]);
for(var c=0;
c<e.length;
c=c+3){jQuery(h).createAppend(e[c],e[c+1],e[c+2])
}}for(f=h.childNodes.length-1;
f>=0;
f--){if(jQuery.browser.msie&&b.nodeName.toLowerCase()=="table"&&h.childNodes[f].nodeName.toLowerCase()=="tr"){if(b.getElementsByTagName("tbody")[0]){var a=b.getElementsByTagName("tbody")[0];
a.insertBefore(h.childNodes[f],a.firstChild)
}else{var a=b.insertBefore(document.createElement("tbody"),b.firstChild);
a.appendChild(a.appendChild(h.childNodes[f]))
}}else{b.insertBefore(h.childNodes[f],b.firstChild)
}}return jQuery(b)
};
String.prototype.toCamelCase=function(){var a=this;
if(a.indexOf("-")>0){var b=a.split("-");
a=b[0];
for(i=1;
i<b.length;
i++){a+=b[i].substr(0,1).toUpperCase()+b[i].substr(1).toLowerCase()
}}return a
};
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")
};
__FlyDOM_parseAttrs=function(element,attrs){for(attr in attrs){var attrName=attr;
var attrValue=attrs[attr];
switch(attrName){case"style":if(typeof attrValue=="string"){var params=attrValue.split(";");
for(var i=0;
i<params.length;
i++){if(params[i].trim()!=""){var styleName=params[i].split(":")[0].trim();
var styleValue=params[i].split(":")[1].trim();
styleName=styleName.toCamelCase();
if(styleName!=""){element.style[styleName]=styleValue
}}}}else{if(typeof attrValue=="object"){for(styleName in attrValue){var styleNameCamel=styleName.toCamelCase();
if(styleName.trim()!=""){element.style[styleNameCamel]=attrValue[styleName]
}}}}break;
default:if(attrName.substr(0,2)=="on"){var event=attrName.substr(2);
attrValue=(typeof attrValue!="function")?eval("function() { "+attrValue+"}"):attrValue;
jQuery(element).bind(event,attrValue)
}else{element[attrName.toCamelCase()]=attrValue
}}}return element
};
__FlyDOM_setText=function(a,c){var b=/(<\S[^><]*>)|(&.+;)/g;
if(c.match(b)!=null&&a.tagName.toUpperCase()!="TEXTAREA"){a.innerHTML=c
}else{var d=document.createTextNode(c);
a.appendChild(d)
}return a
};
/*!
 * jQuery Form Plugin
 * version: 3.09 (16-APR-2012)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses:
 *    http://malsup.github.com/mit-license.txt
 *    http://malsup.github.com/gpl-license-v2.txt
 */
(function(e){var c={};
c.fileapi=e("<input type='file'/>").get(0).files!==undefined;
c.formdata=window.FormData!==undefined;
e.fn.ajaxSubmit=function(g){if(!this.length){d("ajaxSubmit: skipping submit process - no element selected");
return this
}var f,y,l,n=this;
if(typeof g=="function"){g={success:g}
}f=this.attr("method");
y=this.attr("action");
l=(typeof y==="string")?e.trim(y):"";
l=l||window.location.href||"";
if(l){l=(l.match(/^([^#]+)/)||[])[1]
}g=e.extend(true,{url:l,success:e.ajaxSettings.success,type:f||"GET",iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},g);
var t={};
this.trigger("form-pre-serialize",[this,g,t]);
if(t.veto){d("ajaxSubmit: submit vetoed via form-pre-serialize trigger");
return this
}if(g.beforeSerialize&&g.beforeSerialize(this,g)===false){d("ajaxSubmit: submit aborted via beforeSerialize callback");
return this
}var m=g.traditional;
if(m===undefined){m=e.ajaxSettings.traditional
}var r=[];
var B,C=this.formToArray(g.semantic,r);
if(g.data){g.extraData=g.data;
B=e.param(g.data,m)
}if(g.beforeSubmit&&g.beforeSubmit(C,this,g)===false){d("ajaxSubmit: submit aborted via beforeSubmit callback");
return this
}this.trigger("form-submit-validate",[C,this,g,t]);
if(t.veto){d("ajaxSubmit: submit vetoed via form-submit-validate trigger");
return this
}var w=e.param(C,m);
if(B){w=(w?(w+"&"+B):B)
}if(g.type.toUpperCase()=="GET"){g.url+=(g.url.indexOf("?")>=0?"&":"?")+w;
g.data=null
}else{g.data=w
}var E=[];
if(g.resetForm){E.push(function(){n.resetForm()
})
}if(g.clearForm){E.push(function(){n.clearForm(g.includeHidden)
})
}if(!g.dataType&&g.target){var h=g.success||function(){};
E.push(function(q){var k=g.replaceTarget?"replaceWith":"html";
e(g.target)[k](q).each(h,arguments)
})
}else{if(g.success){E.push(g.success)
}}g.success=function(H,q,I){var G=g.context||g;
for(var F=0,k=E.length;
F<k;
F++){E[F].apply(G,[H,q,I||n,n])
}};
var A=e("input:file:enabled[value]",this);
var o=A.length>0;
var z="multipart/form-data";
var v=(n.attr("enctype")==z||n.attr("encoding")==z);
var u=c.fileapi&&c.formdata;
d("fileAPI :"+u);
var p=(o||v)&&!u;
if(g.iframe!==false&&(g.iframe||p)){if(g.closeKeepAlive){e.get(g.closeKeepAlive,function(){D(C)
})
}else{D(C)
}}else{if((o||v)&&u){s(C)
}else{e.ajax(g)
}}for(var x=0;
x<r.length;
x++){r[x]=null
}this.trigger("form-submit-notify",[this,g]);
return this;
function s(q){var k=new FormData();
for(var F=0;
F<q.length;
F++){k.append(q[F].name,q[F].value)
}if(g.extraData){for(var I in g.extraData){if(g.extraData.hasOwnProperty(I)){k.append(I,g.extraData[I])
}}}g.data=null;
var H=e.extend(true,{},e.ajaxSettings,g,{contentType:false,processData:false,cache:false,type:"POST"});
if(g.uploadProgress){H.xhr=function(){var J=jQuery.ajaxSettings.xhr();
if(J.upload){J.upload.onprogress=function(N){var M=0;
var K=N.loaded||N.position;
var L=N.total;
if(N.lengthComputable){M=Math.ceil(K/L*100)
}g.uploadProgress(N,K,L,M)
}
}return J
}
}H.data=null;
var G=H.beforeSend;
H.beforeSend=function(K,J){J.data=k;
if(G){G.call(J,K,g)
}};
e.ajax(H)
}function D(ad){var I=n[0],H,Z,T,ab,W,K,O,M,N,X,aa,R;
var L=!!e.fn.prop;
if(e(":input[name=submit],:input[id=submit]",I).length){alert('Error: Form elements must not have name or id of "submit".');
return
}if(ad){for(Z=0;
Z<r.length;
Z++){H=e(r[Z]);
if(L){H.prop("disabled",false)
}else{H.removeAttr("disabled")
}}}T=e.extend(true,{},e.ajaxSettings,g);
T.context=T.context||T;
W="jqFormIO"+(new Date().getTime());
if(T.iframeTarget){K=e(T.iframeTarget);
X=K.attr("name");
if(!X){K.attr("name",W)
}else{W=X
}}else{K=e('<iframe name="'+W+'" src="'+T.iframeSrc+'" />');
K.css({position:"absolute",top:"-1000px",left:"-1000px"})
}O=K[0];
M={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(ag){var ah=(ag==="timeout"?"timeout":"aborted");
d("aborting upload... "+ah);
this.aborted=1;
K.attr("src",T.iframeSrc);
M.error=ah;
if(T.error){T.error.call(T.context,M,ah,ag)
}if(ab){e.event.trigger("ajaxError",[M,T,ah])
}if(T.complete){T.complete.call(T.context,M,ah)
}}};
ab=T.global;
if(ab&&0===e.active++){e.event.trigger("ajaxStart")
}if(ab){e.event.trigger("ajaxSend",[M,T])
}if(T.beforeSend&&T.beforeSend.call(T.context,M,T)===false){if(T.global){e.active--
}return
}if(M.aborted){return
}N=I.clk;
if(N){X=N.name;
if(X&&!N.disabled){T.extraData=T.extraData||{};
T.extraData[X]=N.value;
if(N.type=="image"){T.extraData[X+".x"]=I.clk_x;
T.extraData[X+".y"]=I.clk_y
}}}var S=1;
var P=2;
function Q(ah){var ag=ah.contentWindow?ah.contentWindow.document:ah.contentDocument?ah.contentDocument:ah.document;
return ag
}var G=e("meta[name=csrf-token]").attr("content");
var F=e("meta[name=csrf-param]").attr("content");
if(F&&G){T.extraData=T.extraData||{};
T.extraData[F]=G
}function Y(){var ai=n.attr("target"),ag=n.attr("action");
I.setAttribute("target",W);
if(!f){I.setAttribute("method","POST")
}if(ag!=T.url){I.setAttribute("action",T.url)
}if(!T.skipEncodingOverride&&(!f||/post/i.test(f))){n.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"})
}if(T.timeout){R=setTimeout(function(){aa=true;
V(S)
},T.timeout)
}function aj(){try{var al=Q(O).readyState;
d("state = "+al);
if(al&&al.toLowerCase()=="uninitialized"){setTimeout(aj,50)
}}catch(am){d("Server abort: ",am," (",am.name,")");
V(P);
if(R){clearTimeout(R)
}R=undefined
}}var ah=[];
try{if(T.extraData){for(var ak in T.extraData){if(T.extraData.hasOwnProperty(ak)){ah.push(e('<input type="hidden" name="'+ak+'">').attr("value",T.extraData[ak]).appendTo(I)[0])
}}}if(!T.iframeTarget){K.appendTo("body");
if(O.attachEvent){O.attachEvent("onload",V)
}else{O.addEventListener("load",V,false)
}}setTimeout(aj,15);
I.submit()
}finally{I.setAttribute("action",ag);
if(ai){I.setAttribute("target",ai)
}else{n.removeAttr("target")
}e(ah).remove()
}}if(T.forceSync){Y()
}else{setTimeout(Y,10)
}var ae,af,ac=50,J;
function V(al){if(M.aborted||J){return
}try{af=Q(O)
}catch(ao){d("cannot access response document: ",ao);
al=P
}if(al===S&&M){M.abort("timeout");
return
}else{if(al==P&&M){M.abort("server abort");
return
}}if(!af||af.location.href==T.iframeSrc){if(!aa){return
}}if(O.detachEvent){O.detachEvent("onload",V)
}else{O.removeEventListener("load",V,false)
}var aj="success",an;
try{if(aa){throw"timeout"
}var ai=T.dataType=="xml"||af.XMLDocument||e.isXMLDoc(af);
d("isXml="+ai);
if(!ai&&window.opera&&(af.body===null||!af.body.innerHTML)){if(--ac){d("requeing onLoad callback, DOM not available");
setTimeout(V,250);
return
}}var ap=af.body?af.body:af.documentElement;
M.responseText=ap?ap.innerHTML:null;
M.responseXML=af.XMLDocument?af.XMLDocument:af;
if(ai){T.dataType="xml"
}M.getResponseHeader=function(at){var ar={"content-type":T.dataType};
return ar[at]
};
if(ap){M.status=Number(ap.getAttribute("status"))||M.status;
M.statusText=ap.getAttribute("statusText")||M.statusText
}var ag=(T.dataType||"").toLowerCase();
var am=/(json|script|text)/.test(ag);
if(am||T.textarea){var ak=af.getElementsByTagName("textarea")[0];
if(ak){M.responseText=ak.value;
M.status=Number(ak.getAttribute("status"))||M.status;
M.statusText=ak.getAttribute("statusText")||M.statusText
}else{if(am){var ah=af.getElementsByTagName("pre")[0];
var aq=af.getElementsByTagName("body")[0];
if(ah){M.responseText=ah.textContent?ah.textContent:ah.innerText
}else{if(aq){M.responseText=aq.textContent?aq.textContent:aq.innerText
}}}}}else{if(ag=="xml"&&!M.responseXML&&M.responseText){M.responseXML=U(M.responseText)
}}try{ae=k(M,ag,T)
}catch(al){aj="parsererror";
M.error=an=(al||aj)
}}catch(al){d("error caught: ",al);
aj="error";
M.error=an=(al||aj)
}if(M.aborted){d("upload aborted");
aj=null
}if(M.status){aj=(M.status>=200&&M.status<300||M.status===304)?"success":"error"
}if(aj==="success"){if(T.success){T.success.call(T.context,ae,"success",M)
}if(ab){e.event.trigger("ajaxSuccess",[M,T])
}}else{if(aj){if(an===undefined){an=M.statusText
}if(T.error){T.error.call(T.context,M,aj,an)
}if(ab){e.event.trigger("ajaxError",[M,T,an])
}}}if(ab){e.event.trigger("ajaxComplete",[M,T])
}if(ab&&!--e.active){e.event.trigger("ajaxStop")
}if(T.complete){T.complete.call(T.context,M,aj)
}J=true;
if(T.timeout){clearTimeout(R)
}setTimeout(function(){if(!T.iframeTarget){K.remove()
}M.responseXML=null
},100)
}var U=e.parseXML||function(ag,ah){if(window.ActiveXObject){ah=new ActiveXObject("Microsoft.XMLDOM");
ah.async="false";
ah.loadXML(ag)
}else{ah=(new DOMParser()).parseFromString(ag,"text/xml")
}return(ah&&ah.documentElement&&ah.documentElement.nodeName!="parsererror")?ah:null
};
var q=e.parseJSON||function(ag){return window["eval"]("("+ag+")")
};
var k=function(al,aj,ai){var ah=al.getResponseHeader("content-type")||"",ag=aj==="xml"||!aj&&ah.indexOf("xml")>=0,ak=ag?al.responseXML:al.responseText;
if(ag&&ak.documentElement.nodeName==="parsererror"){if(e.error){e.error("parsererror")
}}if(ai&&ai.dataFilter){ak=ai.dataFilter(ak,aj)
}if(typeof ak==="string"){if(aj==="json"||!aj&&ah.indexOf("json")>=0){ak=q(ak)
}else{if(aj==="script"||!aj&&ah.indexOf("javascript")>=0){e.globalEval(ak)
}}}return ak
}
}};
e.fn.ajaxForm=function(f){f=f||{};
f.delegation=f.delegation&&e.isFunction(e.fn.on);
if(!f.delegation&&this.length===0){var g={s:this.selector,c:this.context};
if(!e.isReady&&g.s){d("DOM not ready, queuing ajaxForm");
e(function(){e(g.s,g.c).ajaxForm(f)
});
return this
}d("terminating; zero elements found by selector"+(e.isReady?"":" (DOM not ready)"));
return this
}if(f.delegation){e(document).off("submit.form-plugin",this.selector,b).off("click.form-plugin",this.selector,a).on("submit.form-plugin",this.selector,f,b).on("click.form-plugin",this.selector,f,a);
return this
}return this.ajaxFormUnbind().bind("submit.form-plugin",f,b).bind("click.form-plugin",f,a)
};
function b(g){var f=g.data;
if(!g.isDefaultPrevented()){g.preventDefault();
e(this).ajaxSubmit(f)
}}function a(l){var k=l.target;
var g=e(k);
if(!(g.is(":submit,input:image"))){var f=g.closest(":submit");
if(f.length===0){return
}k=f[0]
}var h=this;
h.clk=k;
if(k.type=="image"){if(l.offsetX!==undefined){h.clk_x=l.offsetX;
h.clk_y=l.offsetY
}else{if(typeof e.fn.offset=="function"){var m=g.offset();
h.clk_x=l.pageX-m.left;
h.clk_y=l.pageY-m.top
}else{h.clk_x=l.pageX-k.offsetLeft;
h.clk_y=l.pageY-k.offsetTop
}}}setTimeout(function(){h.clk=h.clk_x=h.clk_y=null
},100)
}e.fn.ajaxFormUnbind=function(){return this.unbind("submit.form-plugin click.form-plugin")
};
e.fn.formToArray=function(w,f){var u=[];
if(this.length===0){return u
}var k=this[0];
var o=w?k.getElementsByTagName("*"):k.elements;
if(!o){return u
}var q,p,m,x,l,s,h;
for(q=0,s=o.length;
q<s;
q++){l=o[q];
m=l.name;
if(!m){continue
}if(w&&k.clk&&l.type=="image"){if(!l.disabled&&k.clk==l){u.push({name:m,value:e(l).val(),type:l.type});
u.push({name:m+".x",value:k.clk_x},{name:m+".y",value:k.clk_y})
}continue
}x=e.fieldValue(l,true);
if(x&&x.constructor==Array){if(f){f.push(l)
}for(p=0,h=x.length;
p<h;
p++){u.push({name:m,value:x[p]})
}}else{if(c.fileapi&&l.type=="file"&&!l.disabled){if(f){f.push(l)
}var g=l.files;
if(g.length){for(p=0;
p<g.length;
p++){u.push({name:m,value:g[p],type:l.type})
}}else{u.push({name:m,value:"",type:l.type})
}}else{if(x!==null&&typeof x!="undefined"){if(f){f.push(l)
}u.push({name:m,value:x,type:l.type,required:l.required})
}}}}if(!w&&k.clk){var r=e(k.clk),t=r[0];
m=t.name;
if(m&&!t.disabled&&t.type=="image"){u.push({name:m,value:r.val()});
u.push({name:m+".x",value:k.clk_x},{name:m+".y",value:k.clk_y})
}}return u
};
e.fn.formSerialize=function(f){return e.param(this.formToArray(f))
};
e.fn.fieldSerialize=function(g){var f=[];
this.each(function(){var m=this.name;
if(!m){return
}var k=e.fieldValue(this,g);
if(k&&k.constructor==Array){for(var l=0,h=k.length;
l<h;
l++){f.push({name:m,value:k[l]})
}}else{if(k!==null&&typeof k!="undefined"){f.push({name:this.name,value:k})
}}});
return e.param(f)
};
e.fn.fieldValue=function(m){for(var l=[],h=0,f=this.length;
h<f;
h++){var k=this[h];
var g=e.fieldValue(k,m);
if(g===null||typeof g=="undefined"||(g.constructor==Array&&!g.length)){continue
}if(g.constructor==Array){e.merge(l,g)
}else{l.push(g)
}}return l
};
e.fieldValue=function(f,o){var h=f.name,u=f.type,w=f.tagName.toLowerCase();
if(o===undefined){o=true
}if(o&&(!h||f.disabled||u=="reset"||u=="button"||(u=="checkbox"||u=="radio")&&!f.checked||(u=="submit"||u=="image")&&f.form&&f.form.clk!=f||w=="select"&&f.selectedIndex==-1)){return null
}if(w=="select"){var p=f.selectedIndex;
if(p<0){return null
}var r=[],g=f.options;
var l=(u=="select-one");
var q=(l?p+1:g.length);
for(var k=(l?p:0);
k<q;
k++){var m=g[k];
if(m.selected){var s=m.value;
if(!s){s=(m.attributes&&m.attributes.value&&!(m.attributes.value.specified))?m.text:m.value
}if(l){return s
}r.push(s)
}}return r
}return e(f).val()
};
e.fn.clearForm=function(f){return this.each(function(){e("input,select,textarea",this).clearFields(f)
})
};
e.fn.clearFields=e.fn.clearInputs=function(f){var g=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
return this.each(function(){var k=this.type,h=this.tagName.toLowerCase();
if(g.test(k)||h=="textarea"){this.value=""
}else{if(k=="checkbox"||k=="radio"){this.checked=false
}else{if(h=="select"){this.selectedIndex=-1
}else{if(f){if((f===true&&/hidden/.test(k))||(typeof f=="string"&&e(this).is(f))){this.value=""
}}}}}})
};
e.fn.resetForm=function(){return this.each(function(){if(typeof this.reset=="function"||(typeof this.reset=="object"&&!this.reset.nodeType)){this.reset()
}})
};
e.fn.enable=function(f){if(f===undefined){f=true
}return this.each(function(){this.disabled=!f
})
};
e.fn.selected=function(f){if(f===undefined){f=true
}return this.each(function(){var g=this.type;
if(g=="checkbox"||g=="radio"){this.checked=f
}else{if(this.tagName.toLowerCase()=="option"){var h=e(this).parent("select");
if(f&&h[0]&&h[0].type=="select-one"){h.find("option").selected(false)
}this.selected=f
}}})
};
e.fn.ajaxSubmit.debug=false;
function d(){if(!e.fn.ajaxSubmit.debug){return
}var f="[jquery.form] "+Array.prototype.join.call(arguments,"");
if(window.console&&window.console.log){window.console.log(f)
}else{if(window.opera&&window.opera.postError){window.opera.postError(f)
}}}})(jQuery);
(function(c){var a=(c.browser.msie?"paste":"input")+".mask";
var b=(window.orientation!=undefined);
c.mask={definitions:{"9":"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"}};
c.fn.extend({caret:function(f,d){if(this.length==0){return
}if(typeof f=="number"){d=(typeof d=="number")?d:f;
return this.each(function(){if(this.setSelectionRange){this.focus();
this.setSelectionRange(f,d)
}else{if(this.createTextRange){var g=this.createTextRange();
g.collapse(true);
g.moveEnd("character",d);
g.moveStart("character",f);
g.select()
}}})
}else{if(this[0].setSelectionRange){f=this[0].selectionStart;
d=this[0].selectionEnd
}else{if(document.selection&&document.selection.createRange){var e=document.selection.createRange();
f=0-e.duplicate().moveStart("character",-100000);
d=f+e.text.length
}}return{begin:f,end:d}
}},unmask:function(){return this.trigger("unmask")
},mask:function(f,l){if(!f&&this.length>0){var g=c(this[0]);
var k=g.data("tests");
return c.map(g.data("buffer"),function(o,n){return k[n]?o:null
}).join("")
}l=c.extend({placeholder:"_",completed:null},l);
var e=c.mask.definitions;
var k=[];
var m=f.length;
var h=null;
var d=f.length;
c.each(f.split(""),function(n,o){if(o=="?"){d--;
m=n
}else{k.push(e[o]?new RegExp(e[o]):null);
if(k[k.length-1]&&h==null){h=k.length-1
}}});
return this.each(function(){var w=c(this);
var r=c.map(f.split(""),function(B,A){if(B!="?"){return e[B]?l.placeholder:B
}});
var u=false;
var z=w.val();
w.data("buffer",r).data("tests",k);
function v(A){while(++A<d){if(k[A]){return A
}}return d
}function q(C){while(!k[C]&&C>=0){C--
}for(var B=C;
B<d;
B++){if(k[B]){r[B]=l.placeholder;
var A=v(B);
if(A<d&&k[B].test(r[A])){r[B]=r[A]
}else{break
}}}t();
w.caret(Math.max(h,C))
}function n(E){for(var C=E,D=l.placeholder;
C<d;
C++){if(k[C]){var A=v(C);
var B=r[C];
r[C]=D;
if(A<d&&k[A].test(B)){D=B
}else{break
}}}}function s(B){var C=c(this).caret();
var A=B.keyCode;
u=(A<16||(A>16&&A<32)||(A>32&&A<41));
if((C.begin-C.end)!=0&&(!u||A==8||A==46)){o(C.begin,C.end)
}if(A==8||A==46||(b&&A==127)){q(C.begin+(A==46?0:-1));
return false
}else{if(A==27){o(0,d);
t();
c(this).caret(h);
return false
}}}function y(D){if(u){u=false;
return(D.keyCode==8)?false:null
}D=D||window.event;
var A=D.charCode||D.keyCode||D.which;
var F=c(this).caret();
if(D.ctrlKey||D.altKey){return true
}else{if((A>=41&&A<=122)||A==32||A>186){var C=v(F.begin-1);
if(C<d){var E=String.fromCharCode(A);
if(k[C].test(E)){n(C);
r[C]=E;
t();
var B=v(C);
c(this).caret(B);
if(l.completed&&B==d){l.completed.call(w)
}}}}}return false
}function o(C,A){for(var B=C;
B<A&&B<d;
B++){if(k[B]){r[B]=l.placeholder
}}}function t(){return w.val(r.join("")).val()
}function p(B){var F=w.val();
var E=-1;
for(var A=0,D=0;
A<d;
A++){if(k[A]){r[A]=l.placeholder;
while(D++<F.length){var C=F.charAt(D-1);
if(k[A].test(C)){r[A]=C;
E=A;
break
}}if(D>F.length){break
}}}if(!B&&E+1<m){w.val("");
o(0,d)
}else{if(B||E+1>=m){t();
if(!B){w.val(w.val().substring(0,E+1))
}}}return(m?A:h)
}function x(B){var F=w.val();
var E=-1;
for(var A=0,D=0;
A<d;
A++){if(k[A]){r[A]=l.placeholder;
while(D++<F.length){var C=F.charAt(D-1);
if(k[A].test(C)){r[A]=C;
E=A;
break
}}if(D>F.length){break
}}}if(!B&&E+1<m){if(w.val()){t()
}else{}}else{if(B||E+1>=m){t();
if(!B){w.val(w.val().substring(0,E+1))
}}}return(m?A:h)
}w.one("unmask",function(){w.unbind(".mask").removeData("buffer").removeData("tests")
}).bind("focus.mask",function(){z=w.val();
var A=x();
t();
setTimeout(function(){w.caret(A)
},0)
}).bind("blur.mask",function(){p();
if(w.val()!=z){w.change()
}}).bind("keydown.mask",s).bind("keypress.mask",y).bind(a,function(){setTimeout(function(){w.caret(p(true))
},0)
});
x()
})
}})
})(jQuery);
jQuery.tableDnD={currentTable:null,dragObject:null,mouseOffset:null,oldY:0,build:function(a){this.each(function(){this.tableDnDConfig=$.extend({onDragStyle:null,onDropStyle:null,onDragClass:"tDnD_whileDrag",onDrop:null,onDragStart:null,scrollAmount:5,serializeRegexp:/[^\-]*$/,serializeParamName:null,dragHandle:null},a||{});
jQuery.tableDnD.makeDraggable(this)
});
jQuery(document).bind("mousemove",jQuery.tableDnD.mousemove).bind("mouseup",jQuery.tableDnD.mouseup);
return this
},makeDraggable:function(c){var b=c.tableDnDConfig;
if(c.tableDnDConfig.dragHandle){var a=$("td."+c.tableDnDConfig.dragHandle,c);
a.each(function(){jQuery(this).mousedown(function(e){jQuery.tableDnD.dragObject=this.parentNode;
jQuery.tableDnD.currentTable=c;
jQuery.tableDnD.mouseOffset=jQuery.tableDnD.getMouseOffset(this,e);
if(b.onDragStart){b.onDragStart(c,this)
}return false
})
})
}else{var d=jQuery("tr",c);
d.each(function(){var e=$(this);
if(!e.hasClass("nodrag")){e.mousedown(function(f){if(f.target.tagName=="TD"){jQuery.tableDnD.dragObject=this;
jQuery.tableDnD.currentTable=c;
jQuery.tableDnD.mouseOffset=jQuery.tableDnD.getMouseOffset(this,f);
if(b.onDragStart){b.onDragStart(c,this)
}return false
}}).css("cursor","move")
}})
}},updateTables:function(){this.each(function(){if(this.tableDnDConfig){jQuery.tableDnD.makeDraggable(this)
}})
},mouseCoords:function(a){if(a.pageX||a.pageY){return{x:a.pageX,y:a.pageY}
}return{x:a.clientX+document.body.scrollLeft-document.body.clientLeft,y:a.clientY+document.body.scrollTop-document.body.clientTop}
},getMouseOffset:function(d,c){c=c||window.event;
var b=this.getPosition(d);
var a=this.mouseCoords(c);
return{x:a.x-b.x,y:a.y-b.y}
},getPosition:function(c){var b=0;
var a=0;
if(c.offsetHeight==0){c=c.firstChild
}while(c.offsetParent){b+=c.offsetLeft;
a+=c.offsetTop;
c=c.offsetParent
}b+=c.offsetLeft;
a+=c.offsetTop;
return{x:b,y:a}
},mousemove:function(g){if(jQuery.tableDnD.dragObject==null){return
}var d=jQuery(jQuery.tableDnD.dragObject);
var b=jQuery.tableDnD.currentTable.tableDnDConfig;
var k=jQuery.tableDnD.mouseCoords(g);
var f=k.y-jQuery.tableDnD.mouseOffset.y;
var c=window.pageYOffset;
if(document.all){if(typeof document.compatMode!="undefined"&&document.compatMode!="BackCompat"){c=document.documentElement.scrollTop
}else{if(typeof document.body!="undefined"){c=document.body.scrollTop
}}}if(k.y-c<b.scrollAmount){window.scrollBy(0,-b.scrollAmount)
}else{var a=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight;
if(a-(k.y-c)<b.scrollAmount){window.scrollBy(0,b.scrollAmount)
}}if(f!=jQuery.tableDnD.oldY){var e=f>jQuery.tableDnD.oldY;
jQuery.tableDnD.oldY=f;
if(b.onDragClass){d.addClass(b.onDragClass)
}else{d.css(b.onDragStyle)
}var h=jQuery.tableDnD.findDropTargetRow(d,f);
if(h){if(e&&jQuery.tableDnD.dragObject!=h){jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject,h.nextSibling)
}else{if(!e&&jQuery.tableDnD.dragObject!=h){jQuery.tableDnD.dragObject.parentNode.insertBefore(jQuery.tableDnD.dragObject,h)
}}}}return false
},findDropTargetRow:function(f,g){var k=jQuery.tableDnD.currentTable.rows;
for(var e=0;
e<k.length;
e++){var h=k[e];
var b=this.getPosition(h).y;
var a=parseInt(h.offsetHeight)/2;
if(h.offsetHeight==0){b=this.getPosition(h.firstChild).y;
a=parseInt(h.firstChild.offsetHeight)/2
}if((g>b-a)&&(g<(b+a))){if(h==f){return null
}var c=jQuery.tableDnD.currentTable.tableDnDConfig;
if(c.onAllowDrop){if(c.onAllowDrop(f,h)){return h
}else{return null
}}else{var d=$(h).hasClass("nodrop");
if(!d){return h
}else{return null
}}return h
}}return null
},mouseup:function(c){if(jQuery.tableDnD.currentTable&&jQuery.tableDnD.dragObject){var b=jQuery.tableDnD.dragObject;
var a=jQuery.tableDnD.currentTable.tableDnDConfig;
if(a.onDragClass){jQuery(b).removeClass(a.onDragClass)
}else{jQuery(b).css(a.onDropStyle)
}jQuery.tableDnD.dragObject=null;
if(a.onDrop){a.onDrop(jQuery.tableDnD.currentTable,b)
}jQuery.tableDnD.currentTable=null
}},serialize:function(){if(jQuery.tableDnD.currentTable){return jQuery.tableDnD.serializeTable(jQuery.tableDnD.currentTable)
}else{return"Error: No Table id set, you need to set an id on your table and every row"
}},serializeTable:function(d){var a="";
var c=d.id;
var e=d.rows;
for(var b=0;
b<e.length;
b++){if(a.length>0){a+="&"
}var f=e[b].id;
if(f&&f&&d.tableDnDConfig&&d.tableDnDConfig.serializeRegexp){f=f.match(d.tableDnDConfig.serializeRegexp)[0]
}a+=c+"[]="+e[b].id
}return a
},serializeTables:function(){var a="";
this.each(function(){a+=jQuery.tableDnD.serializeTable(this)
});
return a
}};
jQuery.fn.extend({tableDnD:jQuery.tableDnD.build,tableDnDUpdate:jQuery.tableDnD.updateTables,tableDnDSerialize:jQuery.tableDnD.serializeTables});
jQuery.extend(jQuery.easing,{easein:function(e,f,a,h,g){return h*(f/=g)*f+a
},easeinout:function(e,f,a,k,h){if(f<h/2){return 2*k*f*f/(h*h)+a
}var g=f-h/2;
return -2*k*g*g/(h*h)+2*k*g/h+k/2+a
},easeout:function(e,f,a,h,g){return -h*f*f/(g*g)+2*h*f/g+a
},expoin:function(e,f,a,k,h){var g=1;
if(k<0){g*=-1;
k*=-1
}return g*(Math.exp(Math.log(k)/h*f))+a
},expoout:function(e,f,a,k,h){var g=1;
if(k<0){g*=-1;
k*=-1
}return g*(-Math.exp(-Math.log(k)/h*(f-h))+k+1)+a
},expoinout:function(e,f,a,k,h){var g=1;
if(k<0){g*=-1;
k*=-1
}if(f<h/2){return g*(Math.exp(Math.log(k/2)/(h/2)*f))+a
}return g*(-Math.exp(-2*Math.log(k/2)/h*(f-h))+k+1)+a
},bouncein:function(e,f,a,h,g){return h-jQuery.easing.bounceout(e,g-f,0,h,g)+a
},bounceout:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a
}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a
}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a
}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a
}}}},bounceinout:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.bouncein(e,f*2,0,h,g)*0.5+a
}return jQuery.easing.bounceout(e,f*2-g,0,h,g)*0.5+h*0.5+a
},elasin:function(f,h,e,n,m){var k=1.70158;
var l=0;
var g=n;
if(h==0){return e
}if((h/=m)==1){return e+n
}if(!l){l=m*0.3
}if(g<Math.abs(n)){g=n;
var k=l/4
}else{var k=l/(2*Math.PI)*Math.asin(n/g)
}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*m-k)*(2*Math.PI)/l))+e
},elasout:function(f,h,e,n,m){var k=1.70158;
var l=0;
var g=n;
if(h==0){return e
}if((h/=m)==1){return e+n
}if(!l){l=m*0.3
}if(g<Math.abs(n)){g=n;
var k=l/4
}else{var k=l/(2*Math.PI)*Math.asin(n/g)
}return g*Math.pow(2,-10*h)*Math.sin((h*m-k)*(2*Math.PI)/l)+n+e
},elasinout:function(f,h,e,n,m){var k=1.70158;
var l=0;
var g=n;
if(h==0){return e
}if((h/=m/2)==2){return e+n
}if(!l){l=m*(0.3*1.5)
}if(g<Math.abs(n)){g=n;
var k=l/4
}else{var k=l/(2*Math.PI)*Math.asin(n/g)
}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*m-k)*(2*Math.PI)/l))+e
}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*m-k)*(2*Math.PI)/l)*0.5+n+e
},backin:function(e,f,a,k,h){var g=1.70158;
return k*(f/=h)*f*((g+1)*f-g)+a
},backout:function(e,f,a,k,h){var g=1.70158;
return k*((f=f/h-1)*f*((g+1)*f+g)+1)+a
},backinout:function(e,f,a,k,h){var g=1.70158;
if((f/=h/2)<1){return k/2*(f*f*(((g*=(1.525))+1)*f-g))+a
}return k/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a
}});
(function(b){b.dimensions={version:"@VERSION"};
b.each(["Height","Width"],function(d,c){b.fn["inner"+c]=function(){if(!this[0]){return
}var f=c=="Height"?"Top":"Left",e=c=="Height"?"Bottom":"Right";
return a(this,c.toLowerCase())+a(this,"padding"+f)+a(this,"padding"+e)
};
b.fn["outer"+c]=function(f){if(!this[0]){return
}var g=c=="Height"?"Top":"Left",e=c=="Height"?"Bottom":"Right";
f=b.extend({margin:false},f||{});
return a(this,c.toLowerCase())+a(this,"border"+g+"Width")+a(this,"border"+e+"Width")+a(this,"padding"+g)+a(this,"padding"+e)+(f.margin?(a(this,"margin"+g)+a(this,"margin"+e)):0)
}
});
b.each(["Left","Top"],function(d,c){b.fn["scroll"+c]=function(e){if(!this[0]){return
}return e!=undefined?this.each(function(){this==window||this==document?window.scrollTo(c=="Left"?e:b(window)["scrollLeft"](),c=="Top"?e:b(window)["scrollTop"]()):this["scroll"+c]=e
}):this[0]==window||this[0]==document?self[(c=="Left"?"pageXOffset":"pageYOffset")]||b.boxModel&&document.documentElement["scroll"+c]||document.body["scroll"+c]:this[0]["scroll"+c]
}
});
b.fn.extend({position:function(){var h=0,g=0,f=this[0],k,c,e,d;
if(f){e=this.offsetParent();
k=this.offset();
c=e.offset();
k.top-=a(f,"marginTop");
k.left-=a(f,"marginLeft");
c.top+=a(e,"borderTopWidth");
c.left+=a(e,"borderLeftWidth");
d={top:k.top-c.top,left:k.left-c.left}
}return d
},offsetParent:function(){var c=this[0].offsetParent;
while(c&&(!/^body|html$/i.test(c.tagName)&&b.css(c,"position")=="static")){c=c.offsetParent
}return b(c)
}});
function a(c,d){return parseInt(b.css(c.jquery?c[0]:c,d))||0
}})(jQuery);