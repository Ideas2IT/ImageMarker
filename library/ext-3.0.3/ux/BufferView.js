/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.grid");
Ext.ux.grid.BufferView=Ext.extend(Ext.grid.GridView,{rowHeight:19,borderHeight:2,scrollDelay:100,cacheSize:20,cleanDelay:500,initTemplates:function(){Ext.ux.grid.BufferView.superclass.initTemplates.call(this);
var a=this.templates;
a.rowHolder=new Ext.Template('<div class="x-grid3-row {alt}" style="{tstyle}"></div>');
a.rowHolder.disableFormats=true;
a.rowHolder.compile();
a.rowBody=new Ext.Template('<table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',"<tbody><tr>{cells}</tr>",(this.enableRowBody?'<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>':""),"</tbody></table>");
a.rowBody.disableFormats=true;
a.rowBody.compile()
},getStyleRowHeight:function(){return Ext.isBorderBox?(this.rowHeight+this.borderHeight):this.rowHeight
},getCalculatedRowHeight:function(){return this.rowHeight+this.borderHeight
},getVisibleRowCount:function(){var b=this.getCalculatedRowHeight();
var a=this.scroller.dom.clientHeight;
return(a<1)?0:Math.ceil(a/b)
},getVisibleRows:function(){var a=this.getVisibleRowCount();
var b=this.scroller.dom.scrollTop;
var c=(b==0?0:Math.floor(b/this.getCalculatedRowHeight())-1);
return{first:Math.max(c,0),last:Math.min(c+a+2,this.ds.getCount()-1)}
},doRender:function(g,k,u,a,s,A,l){var b=this.templates,f=b.cell,h=b.row,x=b.rowBody,n=s-1;
var t=this.getStyleRowHeight();
var z=this.getVisibleRows();
var d="width:"+this.getTotalWidth()+";height:"+t+"px;";
var D=[],w,E,v={},m={tstyle:d},q;
for(var y=0,C=k.length;
y<C;
y++){q=k[y];
w=[];
var o=(y+a);
var e=o>=z.first&&o<=z.last;
if(e){for(var B=0;
B<s;
B++){E=g[B];
v.id=E.id;
v.css=B==0?"x-grid3-cell-first ":(B==n?"x-grid3-cell-last ":"");
v.attr=v.cellAttr="";
v.value=E.renderer(q.data[E.name],v,q,o,B,u);
v.style=E.style;
if(v.value==undefined||v.value===""){v.value="&#160;"
}if(q.dirty&&typeof q.modified[E.name]!=="undefined"){v.css+=" x-grid3-dirty-cell"
}w[w.length]=f.apply(v)
}}var F=[];
if(A&&((o+1)%2==0)){F[0]="x-grid3-row-alt"
}if(q.dirty){F[1]=" x-grid3-dirty-row"
}m.cols=s;
if(this.getRowClass){F[2]=this.getRowClass(q,o,m,u)
}m.alt=F.join(" ");
m.cells=w.join("");
D[D.length]=!e?b.rowHolder.apply(m):(l?x.apply(m):h.apply(m))
}return D.join("")
},isRowRendered:function(a){var b=this.getRow(a);
return b&&b.childNodes.length>0
},syncScroll:function(){Ext.ux.grid.BufferView.superclass.syncScroll.apply(this,arguments);
this.update()
},update:function(){if(this.scrollDelay){if(!this.renderTask){this.renderTask=new Ext.util.DelayedTask(this.doUpdate,this)
}this.renderTask.delay(this.scrollDelay)
}else{this.doUpdate()
}},onRemove:function(d,a,b,c){Ext.ux.grid.BufferView.superclass.onRemove.apply(this,arguments);
if(c!==true){this.update()
}},doUpdate:function(){if(this.getVisibleRowCount()>0){var f=this.grid,b=f.colModel,h=f.store;
var e=this.getColumnData();
var a=this.getVisibleRows();
for(var d=a.first;
d<=a.last;
d++){if(!this.isRowRendered(d)){var c=this.doRender(e,[h.getAt(d)],h,d,b.getColumnCount(),f.stripeRows,true);
this.getRow(d).innerHTML=c
}}this.clean()
}},clean:function(){if(!this.cleanTask){this.cleanTask=new Ext.util.DelayedTask(this.doClean,this)
}this.cleanTask.delay(this.cleanDelay)
},doClean:function(){if(this.getVisibleRowCount()>0){var b=this.getVisibleRows();
b.first-=this.cacheSize;
b.last+=this.cacheSize;
var c=0,d=this.getRows();
if(b.first<=0){c=b.last+1
}for(var a=this.ds.getCount();
c<a;
c++){if((c<b.first||c>b.last)&&d[c].innerHTML){d[c].innerHTML=""
}}}},layout:function(){Ext.ux.grid.BufferView.superclass.layout.call(this);
this.update()
}});