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
}if(ai==aj){al.innerHTML="<a class='sorting_asc'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>"+ac[ai].sTitle
}else{al.innerHTML=ac[ai].sTitle
}am.appendChild(al)
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
if(c==0){this.innerHTML="<a class='sorting_asc'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>"+aq
}else{this.innerHTML="<a class='sorting_desc'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>"+aq
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
}}}_fnSort=function(ah,ag,ai){if(!ac[ag].bSortable){return
}if(typeof ai=="undefined"){ai=false
}if(ag==P&&!ai){U.reverse();
c=(c==0)?1:0
}else{P=ag;
c=0;
if(typeof ac[ag].fnSort=="function"){U.sort(ac[ag].fnSort)
}else{if(ac[ag].sType=="numeric"){U.sort(function(ak,aj){return ak[ag]-aj[ag]
})
}else{if(ac[ag].sType=="date"){U.sort(function(al,ak){var aj=Date.parse(al[ag]);
var am=Date.parse(ak[ag]);
return aj-am
})
}else{if(af){U.sort(function(al,ak){var aj=al[ag];
var am=ak[ag];
return((aj<am)?-1:((aj>am)?1:0))
})
}}}}}if(N.bFilter){X(ah,S,1)
}else{B=U.slice()
}ad();
D(ah)
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
if(N.bSort){_fnSort(h,R)
}else{D(h)
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