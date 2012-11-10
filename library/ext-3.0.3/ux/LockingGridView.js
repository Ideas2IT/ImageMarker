/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.grid");
Ext.ux.grid.LockingGridView=Ext.extend(Ext.grid.GridView,{lockText:"Lock",unlockText:"Unlock",rowBorderWidth:1,lockedBorderWidth:1,syncHeights:false,initTemplates:function(){var a=this.templates||{};
if(!a.master){a.master=new Ext.Template('<div class="x-grid3" hidefocus="true">','<div class="x-grid3-locked">','<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{lstyle}">{lockedHeader}</div></div><div class="x-clear"></div></div>','<div class="x-grid3-scroller"><div class="x-grid3-body" style="{lstyle}">{lockedBody}</div><div class="x-grid3-scroll-spacer"></div></div>',"</div>",'<div class="x-grid3-viewport x-grid3-unlocked">','<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>','<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',"</div>",'<div class="x-grid3-resize-marker">&#160;</div>','<div class="x-grid3-resize-proxy">&#160;</div>',"</div>")
}this.templates=a;
Ext.ux.grid.LockingGridView.superclass.initTemplates.call(this)
},getEditorParent:function(a){return this.el.dom
},initElements:function(){var c=Ext.Element;
var b=this.grid.getGridEl().dom.firstChild;
var a=b.childNodes;
this.el=new c(b);
this.lockedWrap=new c(a[0]);
this.lockedHd=new c(this.lockedWrap.dom.firstChild);
this.lockedInnerHd=this.lockedHd.dom.firstChild;
this.lockedScroller=new c(this.lockedWrap.dom.childNodes[1]);
this.lockedBody=new c(this.lockedScroller.dom.firstChild);
this.mainWrap=new c(a[1]);
this.mainHd=new c(this.mainWrap.dom.firstChild);
if(this.grid.hideHeaders){this.lockedHd.setDisplayed(false);
this.mainHd.setDisplayed(false)
}this.innerHd=this.mainHd.dom.firstChild;
this.scroller=new c(this.mainWrap.dom.childNodes[1]);
if(this.forceFit){this.scroller.setStyle("overflow-x","hidden")
}this.mainBody=new c(this.scroller.dom.firstChild);
this.focusEl=new c(this.scroller.dom.childNodes[1]);
this.focusEl.swallowEvent("click",true);
this.resizeMarker=new c(a[2]);
this.resizeProxy=new c(a[3])
},getLockedRows:function(){return this.hasRows()?this.lockedBody.dom.childNodes:[]
},getLockedRow:function(a){return this.getLockedRows()[a]
},getCell:function(c,a){var b=this.cm.getLockedCount();
if(a<b){return this.getLockedRow(c).getElementsByTagName("td")[a]
}return Ext.ux.grid.LockingGridView.superclass.getCell.call(this,c,a-b)
},getHeaderCell:function(a){var b=this.cm.getLockedCount();
if(a<b){return this.lockedHd.dom.getElementsByTagName("td")[a]
}return Ext.ux.grid.LockingGridView.superclass.getHeaderCell.call(this,a-b)
},addRowClass:function(c,a){var b=this.getLockedRow(c);
if(b){this.fly(b).addClass(a)
}Ext.ux.grid.LockingGridView.superclass.addRowClass.call(this,c,a)
},removeRowClass:function(c,a){var b=this.getLockedRow(c);
if(b){this.fly(b).removeClass(a)
}Ext.ux.grid.LockingGridView.superclass.removeRowClass.call(this,c,a)
},removeRow:function(a){Ext.removeNode(this.getLockedRow(a));
Ext.ux.grid.LockingGridView.superclass.removeRow.call(this,a)
},removeRows:function(c,a){var b=this.lockedBody.dom;
for(var d=c;
d<=a;
d++){Ext.removeNode(b.childNodes[c])
}Ext.ux.grid.LockingGridView.superclass.removeRows.call(this,c,a)
},syncScroll:function(a){var b=this.scroller.dom;
this.lockedScroller.dom.scrollTop=b.scrollTop;
Ext.ux.grid.LockingGridView.superclass.syncScroll.call(this,a)
},updateSortIcon:function(c,b){var g=this.sortClasses,d=this.lockedHd.select("td").removeClass(g),f=this.mainHd.select("td").removeClass(g),e=this.cm.getLockedCount(),a=g[b=="DESC"?1:0];
if(c<e){d.item(c).addClass(a)
}else{f.item(c-e).addClass(a)
}},updateAllColumnWidths:function(){var g=this.getTotalWidth(),n=this.cm.getColumnCount(),b=this.getLockedWidth(),d=this.cm.getLockedCount(),k=[],h,e;
this.updateLockedWidth();
for(e=0;
e<n;
e++){k[e]=this.getColumnWidth(e);
var f=this.getHeaderCell(e);
f.style.width=k[e]
}var a=this.getLockedRows(),m=this.getRows(),o,l,c;
for(e=0,h=m.length;
e<h;
e++){o=a[e];
o.style.width=b;
if(o.firstChild){o.firstChild.style.width=b;
l=o.firstChild.rows[0];
for(c=0;
c<d;
c++){l.childNodes[c].style.width=k[c]
}}o=m[e];
o.style.width=g;
if(o.firstChild){o.firstChild.style.width=g;
l=o.firstChild.rows[0];
for(c=d;
c<n;
c++){l.childNodes[c-d].style.width=k[c]
}}}this.onAllColumnWidthsUpdated(k,g);
this.syncHeaderHeight()
},updateColumnWidth:function(d,a){var l=this.getColumnWidth(d),e=this.cm.getLockedCount(),k,b,j,m;
this.updateLockedWidth();
if(d<e){k=this.getLockedRows();
b=this.getLockedWidth();
j=d
}else{k=this.getRows();
b=this.getTotalWidth();
j=d-e
}var g=this.getHeaderCell(d);
g.style.width=l;
for(var f=0,h=k.length;
f<h;
f++){m=k[f];
m.style.width=b;
if(m.firstChild){m.firstChild.style.width=b;
m.firstChild.rows[0].childNodes[j].style.width=l
}}this.onColumnWidthUpdated(d,l,this.getTotalWidth());
this.syncHeaderHeight()
},updateColumnHidden:function(b,g){var d=this.cm.getLockedCount(),l,a,k,m,j=g?"none":"";
this.updateLockedWidth();
if(b<d){l=this.getLockedRows();
a=this.getLockedWidth();
k=b
}else{l=this.getRows();
a=this.getTotalWidth();
k=b-d
}var f=this.getHeaderCell(b);
f.style.display=j;
for(var e=0,h=l.length;
e<h;
e++){m=l[e];
m.style.width=a;
if(m.firstChild){m.firstChild.style.width=a;
m.firstChild.rows[0].childNodes[k].style.display=j
}}this.onColumnHiddenUpdated(b,g,this.getTotalWidth());
delete this.lastViewWidth;
this.layout()
},doRender:function(g,l,t,a,s,x){var d=this.templates,f=d.cell,h=d.row,n=s-1,e="width:"+this.getTotalWidth()+";",b="width:"+this.getLockedWidth()+";",A=[],D=[],v,k,B,u={},m={},q;
for(var w=0,z=l.length;
w<z;
w++){q=l[w];
v=[];
k=[];
var o=(w+a);
for(var y=0;
y<s;
y++){B=g[y];
u.id=B.id;
u.css=(y===0?"x-grid3-cell-first ":(y==n?"x-grid3-cell-last ":""))+(this.cm.config[y].cellCls?" "+this.cm.config[y].cellCls:"");
u.attr=u.cellAttr="";
u.value=B.renderer(q.data[B.name],u,q,o,y,t);
u.style=B.style;
if(Ext.isEmpty(u.value)){u.value="&#160;"
}if(this.markDirty&&q.dirty&&Ext.isDefined(q.modified[B.name])){u.css+=" x-grid3-dirty-cell"
}if(B.locked){k[k.length]=f.apply(u)
}else{v[v.length]=f.apply(u)
}}var C=[];
if(x&&((o+1)%2===0)){C[0]="x-grid3-row-alt"
}if(q.dirty){C[1]=" x-grid3-dirty-row"
}m.cols=s;
if(this.getRowClass){C[2]=this.getRowClass(q,o,m,t)
}m.alt=C.join(" ");
m.cells=v.join("");
m.tstyle=e;
A[A.length]=h.apply(m);
m.cells=k.join("");
m.tstyle=b;
D[D.length]=h.apply(m)
}return[A.join(""),D.join("")]
},processRows:function(k,g){if(!this.ds||this.ds.getCount()<1){return
}var m=this.getRows(),e=this.getLockedRows(),l,j;
g=g||!this.grid.stripeRows;
k=k||0;
for(var c=0,d=m.length;
c<d;
++c){l=m[c];
j=e[c];
l.rowIndex=c;
j.rowIndex=c;
if(!g){l.className=l.className.replace(this.rowClsRe," ");
j.className=j.className.replace(this.rowClsRe," ");
if((idx+1)%2===0){l.className+=" x-grid3-row-alt";
j.className+=" x-grid3-row-alt"
}}if(this.syncHeights){var b=Ext.get(l),a=Ext.get(j),h=b.getHeight(),f=a.getHeight();
if(h>f){a.setHeight(h)
}else{if(f>h){b.setHeight(f)
}}}}if(k===0){Ext.fly(m[0]).addClass(this.firstRowCls);
Ext.fly(e[0]).addClass(this.firstRowCls)
}Ext.fly(m[m.length-1]).addClass(this.lastRowCls);
Ext.fly(e[e.length-1]).addClass(this.lastRowCls)
},afterRender:function(){if(!this.ds||!this.cm){return
}var a=this.renderRows()||["&#160;","&#160;"];
this.mainBody.dom.innerHTML=a[0];
this.lockedBody.dom.innerHTML=a[1];
this.processRows(0,true);
if(this.deferEmptyText!==true){this.applyEmptyText()
}},renderUI:function(){var d=this.renderHeaders();
var a=this.templates.body.apply({rows:"&#160;"});
var b=this.templates.master.apply({body:a,header:d[0],ostyle:"width:"+this.getOffsetWidth()+";",bstyle:"width:"+this.getTotalWidth()+";",lockedBody:a,lockedHeader:d[1],lstyle:"width:"+this.getLockedWidth()+";"});
var c=this.grid;
c.getGridEl().dom.innerHTML=b;
this.initElements();
Ext.fly(this.innerHd).on("click",this.handleHdDown,this);
Ext.fly(this.lockedInnerHd).on("click",this.handleHdDown,this);
this.mainHd.on({scope:this,mouseover:this.handleHdOver,mouseout:this.handleHdOut,mousemove:this.handleHdMove});
this.lockedHd.on({scope:this,mouseover:this.handleHdOver,mouseout:this.handleHdOut,mousemove:this.handleHdMove});
this.scroller.on("scroll",this.syncScroll,this);
if(c.enableColumnResize!==false){this.splitZone=new Ext.grid.GridView.SplitDragZone(c,this.mainHd.dom);
this.splitZone.setOuterHandleElId(Ext.id(this.lockedHd.dom));
this.splitZone.setOuterHandleElId(Ext.id(this.mainHd.dom))
}if(c.enableColumnMove){this.columnDrag=new Ext.grid.GridView.ColumnDragZone(c,this.innerHd);
this.columnDrag.setOuterHandleElId(Ext.id(this.lockedInnerHd));
this.columnDrag.setOuterHandleElId(Ext.id(this.innerHd));
this.columnDrop=new Ext.grid.HeaderDropZone(c,this.mainHd.dom)
}if(c.enableHdMenu!==false){this.hmenu=new Ext.menu.Menu({id:c.id+"-hctx"});
this.hmenu.add({itemId:"asc",text:this.sortAscText,cls:"xg-hmenu-sort-asc"},{itemId:"desc",text:this.sortDescText,cls:"xg-hmenu-sort-desc"});
if(this.grid.enableColLock!==false){this.hmenu.add("-",{itemId:"lock",text:this.lockText,cls:"xg-hmenu-lock"},{itemId:"unlock",text:this.unlockText,cls:"xg-hmenu-unlock"})
}if(c.enableColumnHide!==false){this.colMenu=new Ext.menu.Menu({id:c.id+"-hcols-menu"});
this.colMenu.on({scope:this,beforeshow:this.beforeColMenuShow,itemclick:this.handleHdMenuClick});
this.hmenu.add("-",{itemId:"columns",hideOnClick:false,text:this.columnsText,menu:this.colMenu,iconCls:"x-cols-icon"})
}this.hmenu.on("itemclick",this.handleHdMenuClick,this)
}if(c.trackMouseOver){this.mainBody.on({scope:this,mouseover:this.onRowOver,mouseout:this.onRowOut});
this.lockedBody.on({scope:this,mouseover:this.onRowOver,mouseout:this.onRowOut})
}if(c.enableDragDrop||c.enableDrag){this.dragZone=new Ext.grid.GridDragZone(c,{ddGroup:c.ddGroup||"GridDD"})
}this.updateHeaderSortState()
},layout:function(){if(!this.mainBody){return
}var d=this.grid;
var h=d.getGridEl();
var a=h.getSize(true);
var b=a.width;
if(!d.hideHeaders&&(b<20||a.height<20)){return
}this.syncHeaderHeight();
if(d.autoHeight){this.scroller.dom.style.overflow="visible";
this.lockedScroller.dom.style.overflow="visible";
if(Ext.isWebKit){this.scroller.dom.style.position="static";
this.lockedScroller.dom.style.position="static"
}}else{this.el.setSize(a.width,a.height);
var f=this.mainHd.getHeight();
var e=a.height-(f)
}this.updateLockedWidth();
if(this.forceFit){if(this.lastViewWidth!=b){this.fitColumns(false,false);
this.lastViewWidth=b
}}else{this.autoExpand();
this.syncHeaderScroll()
}this.onLayout(b,e)
},getOffsetWidth:function(){return(this.cm.getTotalWidth()-this.cm.getTotalLockedWidth()+this.getScrollOffset())+"px"
},renderHeaders:function(){var h=this.cm,f=this.templates,d=f.hcell,b=[],g=[],a={},e=h.getColumnCount(),j=e-1;
for(var c=0;
c<e;
c++){a.id=h.getColumnId(c);
a.value=h.getColumnHeader(c)||"";
a.style=this.getColumnStyle(c,true);
a.tooltip=this.getColumnTooltip(c);
a.css=(c===0?"x-grid3-cell-first ":(c==j?"x-grid3-cell-last ":""))+(h.config[c].headerCls?" "+h.config[c].headerCls:"");
if(h.config[c].align=="right"){a.istyle="padding-right:16px"
}else{delete a.istyle
}if(h.isLocked(c)){g[g.length]=d.apply(a)
}else{b[b.length]=d.apply(a)
}}return[f.header.apply({cells:b.join(""),tstyle:"width:"+this.getTotalWidth()+";"}),f.header.apply({cells:g.join(""),tstyle:"width:"+this.getLockedWidth()+";"})]
},updateHeaders:function(){var b=this.renderHeaders();
this.innerHd.firstChild.innerHTML=b[0];
this.innerHd.firstChild.style.width=this.getOffsetWidth();
this.innerHd.firstChild.firstChild.style.width=this.getTotalWidth();
this.lockedInnerHd.firstChild.innerHTML=b[1];
var a=this.getLockedWidth();
this.lockedInnerHd.firstChild.style.width=a;
this.lockedInnerHd.firstChild.firstChild.style.width=a
},getResolvedXY:function(a){if(!a){return null
}var d=a.cell,b=a.row;
return d?Ext.fly(d).getXY():[this.scroller.getX(),Ext.fly(b).getY()]
},syncFocusEl:function(c,a,b){Ext.ux.grid.LockingGridView.superclass.syncFocusEl.call(this,c,a,a<this.cm.getLockedCount()?false:b)
},ensureVisible:function(c,a,b){return Ext.ux.grid.LockingGridView.superclass.ensureVisible.call(this,c,a,a<this.cm.getLockedCount()?false:b)
},insertRows:function(a,g,d,f){var c=a.getCount()-1;
if(!f&&g===0&&d>=c){this.refresh()
}else{if(!f){this.fireEvent("beforerowsinserted",this,g,d)
}var b=this.renderRows(g,d),e=this.getRow(g);
if(e){if(g===0){this.removeRowClass(0,this.firstRowCls)
}Ext.DomHelper.insertHtml("beforeBegin",e,b[0]);
e=this.getLockedRow(g);
Ext.DomHelper.insertHtml("beforeBegin",e,b[1])
}else{this.removeRowClass(c-1,this.lastRowCls);
Ext.DomHelper.insertHtml("beforeEnd",this.mainBody.dom,b[0]);
Ext.DomHelper.insertHtml("beforeEnd",this.lockedBody.dom,b[1])
}if(!f){this.fireEvent("rowsinserted",this,g,d);
this.processRows(g)
}else{if(g===0||g>=c){this.addRowClass(g,g===0?this.firstRowCls:this.lastRowCls)
}}}this.syncFocusEl(g)
},getColumnStyle:function(a,c){var b=!c?this.cm.config[a].cellStyle||this.cm.config[a].css||"":this.cm.config[a].headerStyle||"";
b+="width:"+this.getColumnWidth(a)+";";
if(this.cm.isHidden(a)){b+="display:none;"
}var d=this.cm.config[a].align;
if(d){b+="text-align:"+d+";"
}return b
},getLockedWidth:function(){return this.cm.getTotalLockedWidth()+"px"
},getTotalWidth:function(){return(this.cm.getTotalWidth()-this.cm.getTotalLockedWidth())+"px"
},getColumnData:function(){var d=[],a=this.cm,e=a.getColumnCount();
for(var c=0;
c<e;
c++){var b=a.getDataIndex(c);
d[c]={name:(!Ext.isDefined(b)?this.ds.fields.get(c).name:b),renderer:a.getRenderer(c),id:a.getColumnId(c),style:this.getColumnStyle(c),locked:a.isLocked(c)}
}return d
},renderBody:function(){var a=this.renderRows()||["&#160;","&#160;"];
return[this.templates.body.apply({rows:a[0]}),this.templates.body.apply({rows:a[1]})]
},refreshRow:function(a){Ext.ux.grid.LockingGridView.superclass.refreshRow.call(this,a);
var b=Ext.isNumber(a)?a:this.ds.indexOf(a);
this.getLockedRow(b).rowIndex=b
},refresh:function(b){this.fireEvent("beforerefresh",this);
this.grid.stopEditing(true);
var a=this.renderBody();
this.mainBody.update(a[0]).setWidth(this.getTotalWidth());
this.lockedBody.update(a[1]).setWidth(this.getLockedWidth());
if(b===true){this.updateHeaders();
this.updateHeaderSortState()
}this.processRows(0,true);
this.layout();
this.applyEmptyText();
this.fireEvent("refresh",this)
},onDenyColumnLock:function(){},initData:function(b,a){if(this.cm){this.cm.un("columnlockchange",this.onColumnLock,this)
}Ext.ux.grid.LockingGridView.superclass.initData.call(this,b,a);
if(this.cm){this.cm.on("columnlockchange",this.onColumnLock,this)
}},onColumnLock:function(){this.refresh(true)
},handleHdMenuClick:function(d){var b=this.hdCtxIndex,a=this.cm,e=d.getItemId(),c=a.getLockedCount();
switch(e){case"lock":if(a.getColumnCount(true)<=c+1){this.onDenyColumnLock();
return
}if(c!=b){a.setLocked(b,true,true);
a.moveColumn(b,c);
this.grid.fireEvent("columnmove",b,c)
}else{a.setLocked(b,true)
}break;
case"unlock":if(c-1!=b){a.setLocked(b,false,true);
a.moveColumn(b,c-1);
this.grid.fireEvent("columnmove",b,c-1)
}else{a.setLocked(b,false)
}break;
default:return Ext.ux.grid.LockingGridView.superclass.handleHdMenuClick.call(this,d)
}return true
},handleHdDown:function(g,d){Ext.ux.grid.LockingGridView.superclass.handleHdDown.call(this,g,d);
if(this.grid.enableColLock!==false){if(Ext.fly(d).hasClass("x-grid3-hd-btn")){var f=this.findHeaderCell(d),c=this.getCellIndex(f),b=this.hmenu.items,a=this.cm;
b.get("lock").setDisabled(a.isLocked(c));
b.get("unlock").setDisabled(!a.isLocked(c))
}}},syncHeaderHeight:function(){this.innerHd.firstChild.firstChild.style.height="auto";
this.lockedInnerHd.firstChild.firstChild.style.height="auto";
var c=this.innerHd.firstChild.firstChild.offsetHeight,b=this.lockedInnerHd.firstChild.firstChild.offsetHeight,a=(b>c?b:c)+"px";
this.innerHd.firstChild.firstChild.style.height=a;
this.lockedInnerHd.firstChild.firstChild.style.height=a
},updateLockedWidth:function(){var g=this.cm.getTotalLockedWidth(),a=this.cm.getTotalWidth()-g,c=this.grid.getGridEl().getSize(true),b=Ext.isBorderBox?0:this.lockedBorderWidth,d=Ext.isBorderBox?0:this.rowBorderWidth,e=(c.width-g-b-d)+"px",f=this.getScrollOffset();
if(!this.grid.autoHeight){var h=(c.height-this.mainHd.getHeight())+"px";
this.lockedScroller.dom.style.height=h;
this.scroller.dom.style.height=h
}this.lockedWrap.dom.style.width=(g+d)+"px";
this.scroller.dom.style.width=e;
this.mainWrap.dom.style.left=(g+b+d)+"px";
if(this.innerHd){this.lockedInnerHd.firstChild.style.width=g+"px";
this.lockedInnerHd.firstChild.firstChild.style.width=g+"px";
this.innerHd.style.width=e;
this.innerHd.firstChild.style.width=(a+d+f)+"px";
this.innerHd.firstChild.firstChild.style.width=a+"px"
}if(this.mainBody){this.lockedBody.dom.style.width=(g+d)+"px";
this.mainBody.dom.style.width=(a+d)+"px"
}}});
Ext.ux.grid.LockingColumnModel=Ext.extend(Ext.grid.ColumnModel,{isLocked:function(a){return this.config[a].locked===true
},setLocked:function(b,c,a){if(this.isLocked(b)==c){return
}this.config[b].locked=c;
if(!a){this.fireEvent("columnlockchange",this,b,c)
}},getTotalLockedWidth:function(){var b=0;
for(var c=0,a=this.config.length;
c<a;
c++){if(this.isLocked(c)&&!this.isHidden(c)){b+=this.getColumnWidth(c)
}}return b
},getLockedCount:function(){for(var b=0,a=this.config.length;
b<a;
b++){if(!this.isLocked(b)){return b
}}},moveColumn:function(b,a){if(b<a&&this.isLocked(b)&&!this.isLocked(a)){this.setLocked(b,false,true)
}else{if(b>a&&!this.isLocked(b)&&this.isLocked(a)){this.setLocked(b,true,true)
}}Ext.ux.grid.LockingColumnModel.superclass.moveColumn.apply(this,arguments)
}});