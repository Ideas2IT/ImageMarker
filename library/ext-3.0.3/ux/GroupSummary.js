/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.grid");
Ext.ux.grid.GroupSummary=Ext.extend(Ext.util.Observable,{constructor:function(a){Ext.apply(this,a);
Ext.ux.grid.GroupSummary.superclass.constructor.call(this)
},init:function(b){this.grid=b;
var a=this.view=b.getView();
a.doGroupEnd=this.doGroupEnd.createDelegate(this);
a.afterMethod("onColumnWidthUpdated",this.doWidth,this);
a.afterMethod("onAllColumnWidthsUpdated",this.doAllWidths,this);
a.afterMethod("onColumnHiddenUpdated",this.doHidden,this);
a.afterMethod("onUpdate",this.doUpdate,this);
a.afterMethod("onRemove",this.doRemove,this);
if(!this.rowTpl){this.rowTpl=new Ext.Template('<div class="x-grid3-summary-row" style="{tstyle}">','<table class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',"<tbody><tr>{cells}</tr></tbody>","</table></div>");
this.rowTpl.disableFormats=true
}this.rowTpl.compile();
if(!this.cellTpl){this.cellTpl=new Ext.Template('<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}">','<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on">{value}</div>',"</td>");
this.cellTpl.disableFormats=true
}this.cellTpl.compile()
},toggleSummaries:function(b){var a=this.grid.getGridEl();
if(a){if(b===undefined){b=a.hasClass("x-grid-hide-summary")
}a[b?"removeClass":"addClass"]("x-grid-hide-summary")
}},renderSummary:function(d,h){h=h||this.view.getColumnData();
var j=this.grid.getColumnModel().config,e=[],k,a={},b,l=h.length-1;
for(var f=0,g=h.length;
f<g;
f++){k=h[f];
b=j[f];
a.id=k.id;
a.style=k.style;
a.css=f==0?"x-grid3-cell-first ":(f==l?"x-grid3-cell-last ":"");
if(b.summaryType||b.summaryRenderer){a.value=(b.summaryRenderer||k.renderer)(d.data[k.name],a,d)
}else{a.value=""
}if(a.value==undefined||a.value===""){a.value="&#160;"
}e[e.length]=this.cellTpl.apply(a)
}return this.rowTpl.apply({tstyle:"width:"+this.view.getTotalWidth()+";",cells:e.join("")})
},calculate:function(d,k){var g={},a,m,l=this.grid.getColumnModel().config,b;
for(var e=0,n=d.length;
e<n;
e++){a=d[e];
for(var f=0,h=k.length;
f<h;
f++){m=k[f];
b=l[f];
if(b.summaryType){g[m.name]=Ext.ux.grid.GroupSummary.Calculations[b.summaryType](g[m.name]||0,a,m.name,g)
}}}return g
},doGroupEnd:function(a,d,b,f,c){var e=this.calculate(d.rs,b);
a.push("</div>",this.renderSummary({data:e},b),"</div>")
},doWidth:function(e,b,d){var c=this.view.getGroups(),g;
for(var f=0,a=c.length;
f<a;
f++){g=c[f].childNodes[2];
g.style.width=d;
g.firstChild.style.width=d;
g.firstChild.rows[0].childNodes[e].style.width=b
}},doAllWidths:function(g,d){var a=this.view.getGroups(),k,h,e=g.length;
for(var c=0,f=a.length;
c<f;
c++){k=a[c].childNodes[2];
k.style.width=d;
k.firstChild.style.width=d;
h=k.firstChild.rows[0].childNodes;
for(var b=0;
b<e;
b++){h[b].style.width=g[b]
}}},doHidden:function(d,g,c){var b=this.view.getGroups(),f,h=g?"none":"";
for(var e=0,a=b.length;
e<a;
e++){f=b[e].childNodes[2];
f.style.width=c;
f.firstChild.style.width=c;
f.firstChild.rows[0].childNodes[d].style.display=h
}},refreshSummary:function(a){return this.refreshSummaryById(this.view.getGroupId(a))
},getSummaryNode:function(a){var b=Ext.fly(a,"_gsummary");
if(b){return b.down(".x-grid3-summary-row",true)
}return null
},refreshSummaryById:function(d){var f=Ext.getDom(d);
if(!f){return false
}var b=[];
this.grid.getStore().each(function(g){if(g._groupId==d){b[b.length]=g
}});
var c=this.view.getColumnData(),h=this.calculate(b,c),a=this.renderSummary({data:h},c),e=this.getSummaryNode(d);
if(e){f.removeChild(e)
}Ext.DomHelper.append(f,a);
return true
},doUpdate:function(b,a){this.refreshSummaryById(a._groupId)
},doRemove:function(d,a,b,c){if(!c){this.refreshSummaryById(a._groupId)
}},showSummaryMsg:function(a,d){var b=this.view.getGroupId(a),c=this.getSummaryNode(b);
if(c){c.innerHTML='<div class="x-grid3-summary-msg">'+d+"</div>"
}}});
Ext.grid.GroupSummary=Ext.ux.grid.GroupSummary;
Ext.ux.grid.GroupSummary.Calculations={sum:function(b,a,c){return b+(a.data[c]||0)
},count:function(b,a,d,c){return c[d+"count"]?++c[d+"count"]:(c[d+"count"]=1)
},max:function(c,b,e,d){var c=b.data[e];
var a=d[e+"max"]===undefined?(d[e+"max"]=c):d[e+"max"];
return c>a?(d[e+"max"]=c):a
},min:function(b,a,e,d){var b=a.data[e];
var c=d[e+"min"]===undefined?(d[e+"min"]=b):d[e+"min"];
return b<c?(d[e+"min"]=b):c
},average:function(b,a,f,e){var g=e[f+"count"]?++e[f+"count"]:(e[f+"count"]=1);
var d=(e[f+"total"]=((e[f+"total"]||0)+(a.data[f]||0)));
return d===0?0:d/g
}};
Ext.grid.GroupSummary.Calculations=Ext.ux.grid.GroupSummary.Calculations;
Ext.ux.grid.HybridSummary=Ext.extend(Ext.ux.grid.GroupSummary,{calculate:function(b,d){var a=this.view.getGroupField(),c=b[0].data[a],e=this.getSummaryData(c);
return e||Ext.ux.grid.HybridSummary.superclass.calculate.call(this,b,d)
},updateSummaryData:function(a,d,c){var b=this.grid.getStore().reader.jsonData;
if(!b.summaryData){b.summaryData={}
}b.summaryData[a]=d;
if(!c){this.refreshSummary(a)
}},getSummaryData:function(a){var b=this.grid.getStore().reader.jsonData;
if(b&&b.summaryData){return b.summaryData[a]
}return null
}});
Ext.grid.HybridSummary=Ext.ux.grid.HybridSummary;