/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.tree.TreeGrid=Ext.extend(Ext.tree.TreePanel,{rootVisible:false,useArrows:true,lines:false,borderWidth:Ext.isBorderBox?0:2,cls:"x-treegrid",columnResize:true,enableSort:true,reserveScrollOffset:true,enableHdMenu:true,columnsText:"Columns",initComponent:function(){if(!this.root){this.root=new Ext.tree.AsyncTreeNode({text:"Root"})
}var a=this.loader;
if(!a){a=new Ext.ux.tree.TreeGridLoader({dataUrl:this.dataUrl,requestMethod:this.requestMethod,store:this.store})
}else{if(Ext.isObject(a)&&!a.load){a=new Ext.ux.tree.TreeGridLoader(a)
}else{if(a){a.createNode=function(c){if(!c.uiProvider){c.uiProvider=Ext.ux.tree.TreeGridNodeUI
}return Ext.tree.TreeLoader.prototype.createNode.call(this,c)
}
}}}this.loader=a;
Ext.ux.tree.TreeGrid.superclass.initComponent.call(this);
this.initColumns();
if(this.enableSort){this.treeGridSorter=new Ext.ux.tree.TreeGridSorter(this,this.enableSort)
}if(this.columnResize){this.colResizer=new Ext.tree.ColumnResizer(this.columnResize);
this.colResizer.init(this)
}var b=this.columns;
if(!this.internalTpl){this.internalTpl=new Ext.XTemplate('<div class="x-grid3-header">','<div class="x-treegrid-header-inner">','<div class="x-grid3-header-offset">','<table cellspacing="0" cellpadding="0" border="0"><colgroup><tpl for="columns"><col /></tpl></colgroup>','<thead><tr class="x-grid3-hd-row">','<tpl for="columns">','<td class="x-grid3-hd x-grid3-cell x-treegrid-hd" style="text-align: {align};" id="',this.id,'-xlhd-{#}">','<div class="x-grid3-hd-inner x-treegrid-hd-inner" unselectable="on">',this.enableHdMenu?'<a class="x-grid3-hd-btn" href="#"></a>':"",'{header}<img class="x-grid3-sort-icon" src="',Ext.BLANK_IMAGE_URL,'" />',"</div>","</td></tpl>","</tr></thead>","</div></table>","</div></div>","</div>",'<div class="x-treegrid-root-node">','<table class="x-treegrid-root-table" cellpadding="0" cellspacing="0" style="table-layout: fixed;"></table>',"</div>")
}if(!this.colgroupTpl){this.colgroupTpl=new Ext.XTemplate('<colgroup><tpl for="columns"><col style="width: {width}px"/></tpl></colgroup>')
}},initColumns:function(){var e=this.columns,a=e.length,d=[],b,f;
for(b=0;
b<a;
b++){f=e[b];
if(!f.isColumn){f.xtype=f.xtype?(/^tg/.test(f.xtype)?f.xtype:"tg"+f.xtype):"tgcolumn";
f=Ext.create(f)
}f.init(this);
d.push(f);
if(this.enableSort!==false&&f.sortable!==false){f.sortable=true;
this.enableSort=true
}}this.columns=d
},onRender:function(){Ext.tree.TreePanel.superclass.onRender.apply(this,arguments);
this.el.addClass("x-treegrid");
this.outerCt=this.body.createChild({cls:"x-tree-root-ct x-treegrid-ct "+(this.useArrows?"x-tree-arrows":this.lines?"x-tree-lines":"x-tree-no-lines")});
this.internalTpl.overwrite(this.outerCt,{columns:this.columns});
this.mainHd=Ext.get(this.outerCt.dom.firstChild);
this.innerHd=Ext.get(this.mainHd.dom.firstChild);
this.innerBody=Ext.get(this.outerCt.dom.lastChild);
this.innerCt=Ext.get(this.innerBody.dom.firstChild);
this.colgroupTpl.insertFirst(this.innerCt,{columns:this.columns});
if(this.hideHeaders){this.header.dom.style.display="none"
}else{if(this.enableHdMenu!==false){this.hmenu=new Ext.menu.Menu({id:this.id+"-hctx"});
if(this.enableColumnHide!==false){this.colMenu=new Ext.menu.Menu({id:this.id+"-hcols-menu"});
this.colMenu.on({scope:this,beforeshow:this.beforeColMenuShow,itemclick:this.handleHdMenuClick});
this.hmenu.add({itemId:"columns",hideOnClick:false,text:this.columnsText,menu:this.colMenu,iconCls:"x-cols-icon"})
}this.hmenu.on("itemclick",this.handleHdMenuClick,this)
}}},setRootNode:function(a){a.attributes.uiProvider=Ext.ux.tree.TreeGridRootNodeUI;
a=Ext.ux.tree.TreeGrid.superclass.setRootNode.call(this,a);
if(this.innerCt){this.colgroupTpl.insertFirst(this.innerCt,{columns:this.columns})
}return a
},initEvents:function(){Ext.ux.tree.TreeGrid.superclass.initEvents.apply(this,arguments);
this.mon(this.innerBody,"scroll",this.syncScroll,this);
this.mon(this.innerHd,"click",this.handleHdDown,this);
this.mon(this.mainHd,{scope:this,mouseover:this.handleHdOver,mouseout:this.handleHdOut})
},onResize:function(b,c){Ext.ux.tree.TreeGrid.superclass.onResize.apply(this,arguments);
var e=this.innerBody.dom;
var f=this.innerHd.dom;
if(!e){return
}if(Ext.isNumber(c)){e.style.height=this.body.getHeight(true)-f.offsetHeight+"px"
}if(Ext.isNumber(b)){var a=Ext.num(this.scrollOffset,Ext.getScrollBarWidth());
if(this.reserveScrollOffset||((e.offsetWidth-e.clientWidth)>10)){this.setScrollOffset(a)
}else{var d=this;
setTimeout(function(){d.setScrollOffset(e.offsetWidth-e.clientWidth>10?a:0)
},10)
}}},updateColumnWidths:function(){var k=this.columns,m=k.length,a=this.outerCt.query("colgroup"),l=a.length,h,e,d,b;
for(d=0;
d<m;
d++){h=k[d];
for(b=0;
b<l;
b++){e=a[b];
e.childNodes[d].style.width=(h.hidden?0:h.width)+"px"
}}for(d=0,a=this.innerHd.query("td"),len=a.length;
d<len;
d++){h=Ext.fly(a[d]);
if(k[d]&&k[d].hidden){h.addClass("x-treegrid-hd-hidden")
}else{h.removeClass("x-treegrid-hd-hidden")
}}var f=this.getTotalColumnWidth();
Ext.fly(this.innerHd.dom.firstChild).setWidth(f+(this.scrollOffset||0));
this.outerCt.select("table").setWidth(f);
this.syncHeaderScroll()
},getVisibleColumns:function(){var c=[],d=this.columns,a=d.length,b;
for(b=0;
b<a;
b++){if(!d[b].hidden){c.push(d[b])
}}return c
},getTotalColumnWidth:function(){var d=0;
for(var b=0,c=this.getVisibleColumns(),a=c.length;
b<a;
b++){d+=c[b].width
}return d
},setScrollOffset:function(a){this.scrollOffset=a;
this.updateColumnWidths()
},handleHdDown:function(i,f){var h=i.getTarget(".x-treegrid-hd");
if(h&&Ext.fly(f).hasClass("x-grid3-hd-btn")){var b=this.hmenu.items,g=this.columns,a=this.findHeaderIndex(h),j=g[a],d=j.sortable;
i.stopEvent();
Ext.fly(h).addClass("x-grid3-hd-menu-open");
this.hdCtxIndex=a;
this.fireEvent("headerbuttonclick",b,j,h,a);
this.hmenu.on("hide",function(){Ext.fly(h).removeClass("x-grid3-hd-menu-open")
},this,{single:true});
this.hmenu.show(f,"tl-bl?")
}else{if(h){var a=this.findHeaderIndex(h);
this.fireEvent("headerclick",this.columns[a],h,a)
}}},handleHdOver:function(d,a){var c=d.getTarget(".x-treegrid-hd");
if(c&&!this.headersDisabled){index=this.findHeaderIndex(c);
this.activeHdRef=a;
this.activeHdIndex=index;
var b=Ext.get(c);
this.activeHdRegion=b.getRegion();
b.addClass("x-grid3-hd-over");
this.activeHdBtn=b.child(".x-grid3-hd-btn");
if(this.activeHdBtn){this.activeHdBtn.dom.style.height=(c.firstChild.offsetHeight-1)+"px"
}}},handleHdOut:function(c,a){var b=c.getTarget(".x-treegrid-hd");
if(b&&(!Ext.isIE||!c.within(b,true))){this.activeHdRef=null;
Ext.fly(b).removeClass("x-grid3-hd-over");
b.style.cursor=""
}},findHeaderIndex:function(d){d=d.dom||d;
var b=d.parentNode.childNodes;
for(var a=0,e;
e=b[a];
a++){if(e==d){return a
}}return -1
},beforeColMenuShow:function(){var d=this.columns,b=d.length,a,e;
this.colMenu.removeAll();
for(a=1;
a<b;
a++){e=d[a];
if(e.hideable!==false){this.colMenu.add(new Ext.menu.CheckItem({itemId:"col-"+a,text:e.header,checked:!e.hidden,hideOnClick:false,disabled:e.hideable===false}))
}}},handleHdMenuClick:function(b){var a=this.hdCtxIndex,c=b.getItemId();
if(this.fireEvent("headermenuclick",this.columns[a],c,a)!==false){a=c.substr(4);
if(a>0&&this.columns[a]){this.setColumnVisible(a,!b.checked)
}}return true
},setColumnVisible:function(a,b){this.columns[a].hidden=!b;
this.updateColumnWidths()
},scrollToTop:function(){this.innerBody.dom.scrollTop=0;
this.innerBody.dom.scrollLeft=0
},syncScroll:function(){this.syncHeaderScroll();
var a=this.innerBody.dom;
this.fireEvent("bodyscroll",a.scrollLeft,a.scrollTop)
},syncHeaderScroll:function(){var a=this.innerBody.dom;
this.innerHd.dom.scrollLeft=a.scrollLeft;
this.innerHd.dom.scrollLeft=a.scrollLeft
},registerNode:function(a){Ext.ux.tree.TreeGrid.superclass.registerNode.call(this,a);
if(!a.uiProvider&&!a.isRoot&&!a.ui.isTreeGridNodeUI){a.ui=new Ext.ux.tree.TreeGridNodeUI(a)
}}});
Ext.reg("treegrid",Ext.ux.tree.TreeGrid);