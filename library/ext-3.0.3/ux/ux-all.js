Ext.ns("Ext.ux.grid");
Ext.ux.grid.BufferView=Ext.extend(Ext.grid.GridView,{rowHeight:19,borderHeight:2,scrollDelay:100,cacheSize:20,cleanDelay:500,initTemplates:function(){Ext.ux.grid.BufferView.superclass.initTemplates.call(this);
var b=this.templates;
b.rowHolder=new Ext.Template('<div class="x-grid3-row {alt}" style="{tstyle}"></div>');
b.rowHolder.disableFormats=true;
b.rowHolder.compile();
b.rowBody=new Ext.Template('<table class="x-grid3-row-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',"<tbody><tr>{cells}</tr>",(this.enableRowBody?'<tr class="x-grid3-row-body-tr" style="{bodyStyle}"><td colspan="{cols}" class="x-grid3-body-cell" tabIndex="0" hidefocus="on"><div class="x-grid3-row-body">{body}</div></td></tr>':""),"</tbody></table>");
b.rowBody.disableFormats=true;
b.rowBody.compile()
},getStyleRowHeight:function(){return Ext.isBorderBox?(this.rowHeight+this.borderHeight):this.rowHeight
},getCalculatedRowHeight:function(){return this.rowHeight+this.borderHeight
},getVisibleRowCount:function(){var c=this.getCalculatedRowHeight();
var d=this.scroller.dom.clientHeight;
return(d<1)?0:Math.ceil(d/c)
},getVisibleRows:function(){var e=this.getVisibleRowCount();
var d=this.scroller.dom.scrollTop;
var f=(d==0?0:Math.floor(d/this.getCalculatedRowHeight())-1);
return{first:Math.max(f,0),last:Math.min(f+e+2,this.ds.getCount()-1)}
},doRender:function(X,V,I,ac,L,Q,U){var ab=this.templates,Y=ab.cell,W=ab.row,p=ab.rowBody,S=L-1;
var K=this.getStyleRowHeight();
var c=this.getVisibleRows();
var aa="width:"+this.getTotalWidth()+";height:"+K+"px;";
var M=[],r,J,G={},T={tstyle:aa},P;
for(var j=0,N=V.length;
j<N;
j++){P=V[j];
r=[];
var R=(j+ac);
var Z=R>=c.first&&R<=c.last;
if(Z){for(var O=0;
O<L;
O++){J=X[O];
G.id=J.id;
G.css=O==0?"x-grid3-cell-first ":(O==S?"x-grid3-cell-last ":"");
G.attr=G.cellAttr="";
G.value=J.renderer(P.data[J.name],G,P,R,O,I);
G.style=J.style;
if(G.value==undefined||G.value===""){G.value="&#160;"
}if(P.dirty&&typeof P.modified[J.name]!=="undefined"){G.css+=" x-grid3-dirty-cell"
}r[r.length]=Y.apply(G)
}}var H=[];
if(Q&&((R+1)%2==0)){H[0]="x-grid3-row-alt"
}if(P.dirty){H[1]=" x-grid3-dirty-row"
}T.cols=L;
if(this.getRowClass){H[2]=this.getRowClass(P,R,T,I)
}T.alt=H.join(" ");
T.cells=r.join("");
M[M.length]=!Z?ab.rowHolder.apply(T):(U?p.apply(T):W.apply(T))
}return M.join("")
},isRowRendered:function(d){var c=this.getRow(d);
return c&&c.childNodes.length>0
},syncScroll:function(){Ext.ux.grid.BufferView.superclass.syncScroll.apply(this,arguments);
this.update()
},update:function(){if(this.scrollDelay){if(!this.renderTask){this.renderTask=new Ext.util.DelayedTask(this.doUpdate,this)
}this.renderTask.delay(this.scrollDelay)
}else{this.doUpdate()
}},onRemove:function(g,f,e,h){Ext.ux.grid.BufferView.superclass.onRemove.apply(this,arguments);
if(h!==true){this.update()
}},doUpdate:function(){if(this.getVisibleRowCount()>0){var l=this.grid,g=l.colModel,k=l.store;
var m=this.getColumnData();
var j=this.getVisibleRows();
for(var n=j.first;
n<=j.last;
n++){if(!this.isRowRendered(n)){var o=this.doRender(m,[k.getAt(n)],k,n,g.getColumnCount(),l.stripeRows,true);
this.getRow(n).innerHTML=o
}}this.clean()
}},clean:function(){if(!this.cleanTask){this.cleanTask=new Ext.util.DelayedTask(this.doClean,this)
}this.cleanTask.delay(this.cleanDelay)
},doClean:function(){if(this.getVisibleRowCount()>0){var e=this.getVisibleRows();
e.first-=this.cacheSize;
e.last+=this.cacheSize;
var h=0,g=this.getRows();
if(e.first<=0){h=e.last+1
}for(var f=this.ds.getCount();
h<f;
h++){if((h<e.first||h>e.last)&&g[h].innerHTML){g[h].innerHTML=""
}}}},layout:function(){Ext.ux.grid.BufferView.superclass.layout.call(this);
this.update()
}});
Ext.ns("Ext.ux.layout");
Ext.ux.layout.CenterLayout=Ext.extend(Ext.layout.FitLayout,{setItemSize:function(c,d){this.container.addClass("ux-layout-center");
c.addClass("ux-layout-center-item");
if(c&&d.height>0){if(c.width){d.width=c.width
}c.setSize(d)
}}});
Ext.Container.LAYOUTS["ux.center"]=Ext.ux.layout.CenterLayout;
Ext.ns("Ext.ux.grid");
Ext.ux.grid.CheckColumn=function(b){Ext.apply(this,b);
if(!this.id){this.id=Ext.id()
}this.renderer=this.renderer.createDelegate(this)
};
Ext.ux.grid.CheckColumn.prototype={init:function(b){this.grid=b;
this.grid.on("render",function(){var a=this.grid.getView();
a.mainBody.on("mousedown",this.onMouseDown,this)
},this)
},onMouseDown:function(g,h){if(h.className&&h.className.indexOf("x-grid3-cc-"+this.id)!=-1){g.stopEvent();
var e=this.grid.getView().findRowIndex(h);
var f=this.grid.store.getAt(e);
f.set(this.dataIndex,!f.data[this.dataIndex])
}},renderer:function(d,f,e){f.css+=" x-grid3-check-col-td";
return'<div class="x-grid3-check-col'+(d?"-on":"")+" x-grid3-cc-"+this.id+'">&#160;</div>'
}};
Ext.preg("checkcolumn",Ext.ux.grid.CheckColumn);
Ext.grid.CheckColumn=Ext.ux.grid.CheckColumn;
Ext.ns("Ext.ux.grid");
if(Ext.isWebKit){Ext.grid.GridView.prototype.borderWidth=0
}Ext.ux.grid.ColumnHeaderGroup=Ext.extend(Ext.util.Observable,{constructor:function(b){this.config=b
},init:function(b){Ext.applyIf(b.colModel,this.config);
Ext.apply(b.getView(),this.viewConfig)
},viewConfig:{initTemplates:function(){this.constructor.prototype.initTemplates.apply(this,arguments);
var b=this.templates||{};
if(!b.gcell){b.gcell=new Ext.XTemplate('<td class="x-grid3-hd x-grid3-gcell x-grid3-td-{id} ux-grid-hd-group-row-{row} {cls}" style="{style}">','<div {tooltip} class="x-grid3-hd-inner x-grid3-hd-{id}" unselectable="on" style="{istyle}">',this.grid.enableHdMenu?'<a class="x-grid3-hd-btn" href="#"></a>':"","{value}</div></td>")
}this.templates=b;
this.hrowRe=new RegExp("ux-grid-hd-group-row-(\\d+)","")
},renderHeaders:function(){var x=this.templates,B=[],u=this.cm,q=u.rows,w="width:"+this.getTotalWidth()+";";
for(var r=0,v=q.length;
r<v;
r++){var E=q[r],s=[];
for(var z=0,A=0,y=E.length;
z<y;
z++){var t=E[z];
t.colspan=t.colspan||1;
var D=this.getColumnId(t.dataIndex?u.findColumnIndex(t.dataIndex):A),C=Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupStyle.call(this,t,A);
s[z]=x.gcell.apply({cls:"ux-grid-hd-group-cell",id:D,row:r,style:"width:"+C.width+";"+(C.hidden?"display:none;":"")+(t.align?"text-align:"+t.align+";":""),tooltip:t.tooltip?(Ext.QuickTips.isEnabled()?"ext:qtip":"title")+'="'+t.tooltip+'"':"",istyle:t.align=="right"?"padding-right:16px":"",btn:this.grid.enableHdMenu&&t.header,value:t.header||"&nbsp;"});
A+=t.colspan
}B[r]=x.header.apply({tstyle:w,cells:s.join("")})
}B.push(this.constructor.prototype.renderHeaders.apply(this,arguments));
return B.join("")
},onColumnWidthUpdated:function(){this.constructor.prototype.onColumnWidthUpdated.apply(this,arguments);
Ext.ux.grid.ColumnHeaderGroup.prototype.updateGroupStyles.call(this)
},onAllColumnWidthsUpdated:function(){this.constructor.prototype.onAllColumnWidthsUpdated.apply(this,arguments);
Ext.ux.grid.ColumnHeaderGroup.prototype.updateGroupStyles.call(this)
},onColumnHiddenUpdated:function(){this.constructor.prototype.onColumnHiddenUpdated.apply(this,arguments);
Ext.ux.grid.ColumnHeaderGroup.prototype.updateGroupStyles.call(this)
},getHeaderCell:function(b){return this.mainHd.query(this.cellSelector)[b]
},findHeaderCell:function(b){return b?this.fly(b).findParent("td.x-grid3-hd",this.cellSelectorDepth):false
},findHeaderIndex:function(c){var d=this.findHeaderCell(c);
return d?this.getCellIndex(d):false
},updateSortIcon:function(e,f){var g=this.sortClasses,h=this.mainHd.select(this.cellSelector).removeClass(g);
h.item(e).addClass(g[f=="DESC"?1:0])
},handleHdDown:function(k,n){var m=Ext.get(n);
if(m.hasClass("x-grid3-hd-btn")){k.stopEvent();
var l=this.findHeaderCell(n);
Ext.fly(l).addClass("x-grid3-hd-menu-open");
var o=this.getCellIndex(l);
this.hdCtxIndex=o;
var e=this.hmenu.items,j=this.cm;
e.get("asc").setDisabled(!j.isSortable(o));
e.get("desc").setDisabled(!j.isSortable(o));
this.hmenu.on("hide",function(){Ext.fly(l).removeClass("x-grid3-hd-menu-open")
},this,{single:true});
this.hmenu.show(n,"tl-bl?")
}else{if(m.hasClass("ux-grid-hd-group-cell")||Ext.fly(n).up(".ux-grid-hd-group-cell")){k.stopEvent()
}}},handleHdMove:function(m,p){var n=this.findHeaderCell(this.activeHdRef);
if(n&&!this.headersDisabled&&!Ext.fly(n).hasClass("ux-grid-hd-group-cell")){var e=this.splitHandleWidth||5,o=this.activeHdRegion,k=m.getPageX(),q=n.style,l="";
if(this.grid.enableColumnResize!==false){if(k-o.left<=e&&this.cm.isResizable(this.activeHdIndex-1)){l=Ext.isAir?"move":Ext.isWebKit?"e-resize":"col-resize"
}else{if(o.right-k<=(!this.activeHdBtn?e:2)&&this.cm.isResizable(this.activeHdIndex)){l=Ext.isAir?"move":Ext.isWebKit?"w-resize":"col-resize"
}}}q.cursor=l
}},handleHdOver:function(g,f){var h=this.findHeaderCell(f);
if(h&&!this.headersDisabled){this.activeHdRef=f;
this.activeHdIndex=this.getCellIndex(h);
var e=this.fly(h);
this.activeHdRegion=e.getRegion();
if(!(this.cm.isMenuDisabled(this.activeHdIndex)||e.hasClass("ux-grid-hd-group-cell"))){e.addClass("x-grid3-hd-over");
this.activeHdBtn=e.child(".x-grid3-hd-btn");
if(this.activeHdBtn){this.activeHdBtn.dom.style.height=(h.firstChild.offsetHeight-1)+"px"
}}}},handleHdOut:function(f,e){var d=this.findHeaderCell(e);
if(d&&(!Ext.isIE||!f.within(d,true))){this.activeHdRef=null;
this.fly(d).removeClass("x-grid3-hd-over");
d.style.cursor=""
}},handleHdMenuClick:function(r){var x=this.hdCtxIndex,u=this.cm,E=this.ds,G=r.getItemId();
switch(G){case"asc":E.sort(u.getDataIndex(x),"ASC");
break;
case"desc":E.sort(u.getDataIndex(x),"DESC");
break;
default:if(G.substr(0,5)=="group"){var A=G.split("-"),I=parseInt(A[1],10),D=parseInt(A[2],10),H=this.cm.rows[I],t,C=0;
for(var A=0,y=H.length;
A<y;
A++){t=H[A];
if(D>=C&&D<C+t.colspan){break
}C+=t.colspan
}if(r.checked){var w=u.getColumnsBy(this.isHideableColumn,this).length;
for(var A=C,y=C+t.colspan;
A<y;
A++){if(!u.isHidden(A)){w--
}}if(w<1){this.onDenyColumnHide();
return false
}}for(var A=C,y=C+t.colspan;
A<y;
A++){if(u.config[A].fixed!==true&&u.config[A].hideable!==false){u.setHidden(A,r.checked)
}}}else{x=u.getIndexById(G.substr(4));
if(x!=-1){if(r.checked&&u.getColumnsBy(this.isHideableColumn,this).length<=1){this.onDenyColumnHide();
return false
}u.setHidden(x,r.checked)
}}r.checked=!r.checked;
if(r.menu){var z=function(a){a.items.each(function(b){if(!b.disabled){b.setChecked(r.checked,false);
if(b.menu){z(b.menu)
}}})
};
z(r.menu)
}var B=r,F;
while(B=B.parentMenu){if(!B.parentMenu||!(F=B.parentMenu.items.get(B.getItemId()))||!F.setChecked){break
}var v=B.items.findIndexBy(function(a){return a.checked
})>=0;
F.setChecked(v,true)
}r.checked=!r.checked
}return true
},beforeColMenuShow:function(){var K=this.cm,J=this.cm.rows;
this.colMenu.removeAll();
for(var O=0,G=K.getColumnCount();
O<G;
O++){var Q=this.colMenu,c=K.getColumnHeader(O),H=[];
if(K.config[O].fixed!==true&&K.config[O].hideable!==false){for(var N=0,B=J.length;
N<B;
N++){var F=J[N],L,D=0;
for(var A=0,z=F.length;
A<z;
A++){L=F[A];
if(O>=D&&O<D+L.colspan){break
}D+=L.colspan
}if(L&&L.header){if(K.hierarchicalColMenu){var E="group-"+N+"-"+D;
var y=Q.items.item(E);
var I=y?y.menu:null;
if(!I){I=new Ext.menu.Menu({itemId:E});
I.on("itemclick",this.handleHdMenuClick,this);
var M=false,P=true;
for(var r=D,C=D+L.colspan;
r<C;
r++){if(!K.isHidden(r)){M=true
}if(K.config[r].hideable!==false){P=false
}}Q.add({itemId:E,text:L.header,menu:I,hideOnClick:false,checked:M,disabled:P})
}Q=I
}else{H.push(L.header)
}}}H.push(c);
Q.add(new Ext.menu.CheckItem({itemId:"col-"+K.getColumnId(O),text:H.join(" "),checked:!K.isHidden(O),hideOnClick:false,disabled:K.config[O].hideable===false}))
}}},renderUI:function(){this.constructor.prototype.renderUI.apply(this,arguments);
Ext.apply(this.columnDrop,Ext.ux.grid.ColumnHeaderGroup.prototype.columnDropConfig);
Ext.apply(this.splitZone,Ext.ux.grid.ColumnHeaderGroup.prototype.splitZoneConfig)
}},splitZoneConfig:{allowHeaderDrag:function(b){return !b.getTarget(null,null,true).hasClass("ux-grid-hd-group-cell")
}},columnDropConfig:{getTargetFromEvent:function(c){var d=Ext.lib.Event.getTarget(c);
return this.view.findHeaderCell(d)
},positionIndicator:function(e,h,j){var k=Ext.ux.grid.ColumnHeaderGroup.prototype.getDragDropData.call(this,e,h,j);
if(k===false){return false
}var g=k.px+this.proxyOffsets[0];
this.proxyTop.setLeftTop(g,k.r.top+this.proxyOffsets[1]);
this.proxyTop.show();
this.proxyBottom.setLeftTop(g,k.r.bottom);
this.proxyBottom.show();
return k.pt
},onNodeDrop:function(M,K,n,H){var r=H.header;
if(r!=M){var e=Ext.ux.grid.ColumnHeaderGroup.prototype.getDragDropData.call(this,r,M,n);
if(e===false){return false
}var Q=this.grid.colModel,c=e.oldIndex<e.newIndex,P=Q.rows;
for(var S=e.row,L=P.length;
S<L;
S++){var O=P[S],E=O.length,I=0,J=1,G=E;
for(var F=0,N=0;
F<E;
F++){var R=O[F];
if(e.oldIndex>=N&&e.oldIndex<N+R.colspan){I=F
}if(e.oldIndex+e.colspan-1>=N&&e.oldIndex+e.colspan-1<N+R.colspan){J=F-I+1
}if(e.newIndex>=N&&e.newIndex<N+R.colspan){G=F
}N+=R.colspan
}var h=O.splice(I,J);
P[S]=O.splice(0,G-(c?J:0)).concat(h).concat(O)
}for(var d=0;
d<e.colspan;
d++){var T=e.oldIndex+(c?0:d),U=e.newIndex+(c?-1:d);
Q.moveColumn(T,U);
this.grid.fireEvent("columnmove",T,U)
}return true
}return false
}},getGroupStyle:function(k,o){var m=0,l=true;
for(var n=o,j=o+k.colspan;
n<j;
n++){if(!this.cm.isHidden(n)){var h=this.cm.getColumnWidth(n);
if(typeof h=="number"){m+=h
}l=false
}}return{width:(Ext.isBorderBox?m:Math.max(m-this.borderWidth,0))+"px",hidden:l}
},updateGroupStyles:function(t){var o=this.mainHd.query(".x-grid3-header-offset > table"),q=this.getTotalWidth(),l=this.cm.rows;
for(var m=0;
m<o.length;
m++){o[m].style.width=q;
if(m<l.length){var n=o[m].firstChild.firstChild.childNodes;
for(var r=0,s=0;
r<n.length;
r++){var p=l[m][r];
if((typeof t!="number")||(t>=s&&t<s+p.colspan)){var u=Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupStyle.call(this,p,s);
n[r].style.width=u.width;
n[r].style.display=u.hidden?"none":""
}s+=p.colspan
}}}},getGroupRowIndex:function(c){if(c){var d=c.className.match(this.hrowRe);
if(d&&d[1]){return parseInt(d[1],10)
}}return this.cm.rows.length
},getGroupSpan:function(k,o){if(k<0){return{col:0,colspan:this.cm.getColumnCount()}
}var m=this.cm.rows[k];
if(m){for(var n=0,h=0,j=m.length;
n<j;
n++){var l=m[n];
if(o>=h&&o<h+l.colspan){return{col:h,colspan:l.colspan}
}h+=l.colspan
}return{col:h,colspan:0}
}return{col:o,colspan:1}
},getDragDropData:function(x,y,w){if(x.parentNode!=y.parentNode){return false
}var n=this.grid.colModel,t=Ext.lib.Event.getPageX(w),B=Ext.lib.Dom.getRegion(y.firstChild),r,C;
if((B.right-t)<=(B.right-B.left)/2){r=B.right+this.view.borderWidth;
C="after"
}else{r=B.left;
C="before"
}var u=this.view.getCellIndex(x),h=this.view.getCellIndex(y);
if(n.isFixed(h)){return false
}var e=Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupRowIndex.call(this.view,x),A=Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupSpan.call(this.view,e,u),z=Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupSpan.call(this.view,e,h),u=A.col;
h=z.col+(C=="after"?z.colspan:0);
if(h>=A.col&&h<=A.col+A.colspan){return false
}var v=Ext.ux.grid.ColumnHeaderGroup.prototype.getGroupSpan.call(this.view,e-1,u);
if(h<v.col||h>v.col+v.colspan){return false
}return{r:B,px:r,pt:C,row:e,oldIndex:u,newIndex:h,colspan:A.colspan}
}});
Ext.ns("Ext.ux.tree");
Ext.ux.tree.ColumnTree=Ext.extend(Ext.tree.TreePanel,{lines:false,borderWidth:Ext.isBorderBox?0:2,cls:"x-column-tree",onRender:function(){Ext.tree.ColumnTree.superclass.onRender.apply(this,arguments);
this.headers=this.header.createChild({cls:"x-tree-headers"});
var k=this.columns,j;
var c=0;
var m=19;
for(var l=0,h=k.length;
l<h;
l++){j=k[l];
c+=j.width;
this.headers.createChild({cls:"x-tree-hd "+(j.cls?j.cls+"-hd":""),cn:{cls:"x-tree-hd-text",html:j.header},style:"width:"+(j.width-this.borderWidth)+"px;"})
}this.headers.createChild({cls:"x-clear"});
this.headers.setWidth(c+m);
this.innerCt.setWidth(c)
}});
Ext.reg("columntree",Ext.ux.tree.ColumnTree);
Ext.tree.ColumnTree=Ext.ux.tree.ColumnTree;
Ext.ux.tree.ColumnNodeUI=Ext.extend(Ext.tree.TreeNodeUI,{focus:Ext.emptyFn,renderElements:function(x,n,t,c){this.indentMarkup=x.parentNode?x.parentNode.ui.getChildIndent():"";
var a=x.getOwnerTree();
var q=a.columns;
var r=a.borderWidth;
var s=q[0];
var y=['<li class="x-tree-node"><div ext:tree-node-id="',x.id,'" class="x-tree-node-el x-tree-node-leaf ',n.cls,'">','<div class="x-tree-col" style="width:',s.width-r,'px;">','<span class="x-tree-node-indent">',this.indentMarkup,"</span>",'<img src="',this.emptyIcon,'" class="x-tree-ec-icon x-tree-elbow">','<img src="',n.icon||this.emptyIcon,'" class="x-tree-node-icon',(n.icon?" x-tree-node-inline-icon":""),(n.iconCls?" "+n.iconCls:""),'" unselectable="on">','<a hidefocus="on" class="x-tree-node-anchor" href="',n.href?n.href:"#",'" tabIndex="1" ',n.hrefTarget?' target="'+n.hrefTarget+'"':"",">",'<span unselectable="on">',x.text||(s.renderer?s.renderer(n[s.dataIndex],x,n):n[s.dataIndex]),"</span></a>","</div>"];
for(var w=1,u=q.length;
w<u;
w++){s=q[w];
y.push('<div class="x-tree-col ',(s.cls?s.cls:""),'" style="width:',s.width-r,'px;">','<div class="x-tree-col-text">',(s.renderer?s.renderer(n[s.dataIndex],x,n):n[s.dataIndex]),"</div>","</div>")
}y.push('<div class="x-clear"></div></div>','<ul class="x-tree-node-ct" style="display:none;"></ul>',"</li>");
if(c!==true&&x.nextSibling&&x.nextSibling.ui.getEl()){this.wrap=Ext.DomHelper.insertHtml("beforeBegin",x.nextSibling.ui.getEl(),y.join(""))
}else{this.wrap=Ext.DomHelper.insertHtml("beforeEnd",t,y.join(""))
}this.elNode=this.wrap.childNodes[0];
this.ctNode=this.wrap.childNodes[1];
var v=this.elNode.firstChild.childNodes;
this.indentNode=v[0];
this.ecNode=v[1];
this.iconNode=v[2];
this.anchor=v[3];
this.textNode=v[3].firstChild
}});
Ext.tree.ColumnNodeUI=Ext.ux.tree.ColumnNodeUI;
Ext.DataView.LabelEditor=Ext.extend(Ext.Editor,{alignment:"tl-tl",hideEl:false,cls:"x-small-editor",shim:false,completeOnEnter:true,cancelOnEsc:true,labelSelector:"span.x-editable",constructor:function(d,c){Ext.DataView.LabelEditor.superclass.constructor.call(this,c||new Ext.form.TextField({allowBlank:false,growMin:90,growMax:240,grow:true,selectOnFocus:true}),d)
},init:function(b){this.view=b;
b.on("render",this.initEditor,this);
this.on("complete",this.onSave,this)
},initEditor:function(){this.view.on({scope:this,containerclick:this.doBlur,click:this.doBlur});
this.view.getEl().on("mousedown",this.onMouseDown,this,{delegate:this.labelSelector})
},doBlur:function(){if(this.editing){this.field.blur()
}},onMouseDown:function(g,h){if(!g.ctrlKey&&!g.shiftKey){var e=this.view.findItemFromChild(h);
g.stopEvent();
var f=this.view.store.getAt(this.view.indexOf(e));
this.startEdit(h,f.data[this.dataIndex]);
this.activeRecord=f
}else{g.preventDefault()
}},onSave:function(d,c){this.activeRecord.set(this.dataIndex,c)
}});
Ext.DataView.DragSelector=function(z){z=z||{};
var w,x,u;
var B,v,t=new Ext.lib.Region(0,0,0,0);
var D=z.dragSafe===true;
this.init=function(a){w=a;
w.on("render",q)
};
function s(){B=[];
w.all.each(function(a){B[B.length]=a.getRegion()
});
v=w.el.getRegion()
}function A(){return false
}function y(a){return !D||a.target==w.el.dom
}function r(a){w.on("containerclick",A,w,{single:true});
if(!x){x=w.el.createChild({cls:"x-view-selector"})
}else{if(x.dom.parentNode!==w.el.dom){w.el.dom.appendChild(x.dom)
}x.setDisplayed("block")
}s();
w.clearSelections()
}function C(f){var e=u.startXY;
var l=u.getXY();
var c=Math.min(e[0],l[0]);
var d=Math.min(e[1],l[1]);
var a=Math.abs(e[0]-l[0]);
var h=Math.abs(e[1]-l[1]);
t.left=c;
t.top=d;
t.right=c+a;
t.bottom=d+h;
t.constrainTo(v);
x.setRegion(t);
for(var j=0,g=B.length;
j<g;
j++){var b=B[j],k=t.intersect(b);
if(k&&!b.selected){b.selected=true;
w.select(j,true)
}else{if(!k&&b.selected){b.selected=false;
w.deselect(j)
}}}}function E(a){if(!Ext.isIE){w.un("containerclick",A,w)
}if(x){x.setDisplayed(false)
}}function q(a){u=new Ext.dd.DragTracker({onBeforeStart:y,onStart:r,onDrag:C,onEnd:E});
u.initEl(a.el)
}};
Ext.ns("Ext.ux.form");
Ext.ux.form.FileUploadField=Ext.extend(Ext.form.TextField,{buttonText:"Browse...",buttonOnly:false,buttonOffset:3,readOnly:true,autoSize:Ext.emptyFn,initComponent:function(){Ext.ux.form.FileUploadField.superclass.initComponent.call(this);
this.addEvents("fileselected")
},onRender:function(f,e){Ext.ux.form.FileUploadField.superclass.onRender.call(this,f,e);
this.wrap=this.el.wrap({cls:"x-form-field-wrap x-form-file-wrap"});
this.el.addClass("x-form-file-text");
this.el.dom.removeAttribute("name");
this.createFileInput();
var d=Ext.applyIf(this.buttonCfg||{},{text:this.buttonText});
this.button=new Ext.Button(Ext.apply(d,{renderTo:this.wrap,cls:"x-form-file-btn"+(d.iconCls?" x-btn-icon":"")}));
if(this.buttonOnly){this.el.hide();
this.wrap.setWidth(this.button.getEl().getWidth())
}this.bindListeners();
this.resizeEl=this.positionEl=this.wrap
},bindListeners:function(){this.fileInput.on({scope:this,mouseenter:function(){this.button.addClass(["x-btn-over","x-btn-focus"])
},mouseleave:function(){this.button.removeClass(["x-btn-over","x-btn-focus","x-btn-click"])
},mousedown:function(){this.button.addClass("x-btn-click")
},mouseup:function(){this.button.removeClass(["x-btn-over","x-btn-focus","x-btn-click"])
},change:function(){var b=this.fileInput.dom.value;
this.setValue(b);
this.fireEvent("fileselected",this,b)
}})
},createFileInput:function(){this.fileInput=this.wrap.createChild({id:this.getFileInputId(),name:this.name||this.getId(),cls:"x-form-file",tag:"input",type:"file",size:1})
},reset:function(){this.fileInput.remove();
this.createFileInput();
this.bindListeners();
Ext.ux.form.FileUploadField.superclass.reset.call(this)
},getFileInputId:function(){return this.id+"-file"
},onResize:function(d,c){Ext.ux.form.FileUploadField.superclass.onResize.call(this,d,c);
this.wrap.setWidth(d);
if(!this.buttonOnly){var d=this.wrap.getWidth()-this.button.getEl().getWidth()-this.buttonOffset;
this.el.setWidth(d)
}},onDestroy:function(){Ext.ux.form.FileUploadField.superclass.onDestroy.call(this);
Ext.destroy(this.fileInput,this.button,this.wrap)
},onDisable:function(){Ext.ux.form.FileUploadField.superclass.onDisable.call(this);
this.doDisable(true)
},onEnable:function(){Ext.ux.form.FileUploadField.superclass.onEnable.call(this);
this.doDisable(false)
},doDisable:function(b){this.fileInput.dom.disabled=b;
this.button.setDisabled(b)
},preFocus:Ext.emptyFn,alignErrorIcon:function(){this.errorIcon.alignTo(this.wrap,"tl-tr",[2,0])
}});
Ext.reg("fileuploadfield",Ext.ux.form.FileUploadField);
Ext.form.FileUploadField=Ext.ux.form.FileUploadField;
Ext.ux.GMapPanel=Ext.extend(Ext.Panel,{initComponent:function(){var b={plain:true,zoomLevel:3,yaw:180,pitch:0,zoom:0,gmapType:"map",border:false};
Ext.applyIf(this,b);
Ext.ux.GMapPanel.superclass.initComponent.call(this)
},afterRender:function(){var c=this.ownerCt.getSize();
Ext.applyIf(this,c);
Ext.ux.GMapPanel.superclass.afterRender.call(this);
if(this.gmapType==="map"){this.gmap=new GMap2(this.body.dom)
}if(this.gmapType==="panorama"){this.gmap=new GStreetviewPanorama(this.body.dom)
}if(typeof this.addControl=="object"&&this.gmapType==="map"){this.gmap.addControl(this.addControl)
}if(typeof this.setCenter==="object"){if(typeof this.setCenter.geoCodeAddr==="string"){this.geoCodeLookup(this.setCenter.geoCodeAddr)
}else{if(this.gmapType==="map"){var d=new GLatLng(this.setCenter.lat,this.setCenter.lng);
this.gmap.setCenter(d,this.zoomLevel)
}if(typeof this.setCenter.marker==="object"&&typeof d==="object"){this.addMarker(d,this.setCenter.marker,this.setCenter.marker.clear)
}}if(this.gmapType==="panorama"){this.gmap.setLocationAndPOV(new GLatLng(this.setCenter.lat,this.setCenter.lng),{yaw:this.yaw,pitch:this.pitch,zoom:this.zoom})
}}GEvent.bind(this.gmap,"load",this,function(){this.onMapReady()
})
},onMapReady:function(){this.addMarkers(this.markers);
this.addMapControls();
this.addOptions()
},onResize:function(d,c){if(typeof this.getMap()=="object"){this.gmap.checkResize()
}Ext.ux.GMapPanel.superclass.onResize.call(this,d,c)
},setSize:function(f,e,d){if(typeof this.getMap()=="object"){this.gmap.checkResize()
}Ext.ux.GMapPanel.superclass.setSize.call(this,f,e,d)
},getMap:function(){return this.gmap
},getCenter:function(){return this.getMap().getCenter()
},getCenterLatLng:function(){var b=this.getCenter();
return{lat:b.lat(),lng:b.lng()}
},addMarkers:function(f){if(Ext.isArray(f)){for(var d=0;
d<f.length;
d++){var e=new GLatLng(f[d].lat,f[d].lng);
this.addMarker(e,f[d].marker,false,f[d].setCenter,f[d].listeners)
}}},addMarker:function(m,l,g,h,k){Ext.applyIf(l,G_DEFAULT_ICON);
if(g===true){this.getMap().clearOverlays()
}if(h===true){this.getMap().setCenter(m,this.zoomLevel)
}var j=new GMarker(m,l);
if(typeof k==="object"){for(evt in k){GEvent.bind(j,evt,this,k[evt])
}}this.getMap().addOverlay(j)
},addMapControls:function(){if(this.gmapType==="map"){if(Ext.isArray(this.mapControls)){for(i=0;
i<this.mapControls.length;
i++){this.addMapControl(this.mapControls[i])
}}else{if(typeof this.mapControls==="string"){this.addMapControl(this.mapControls)
}else{if(typeof this.mapControls==="object"){this.getMap().addControl(this.mapControls)
}}}}},addMapControl:function(c){var d=window[c];
if(typeof d==="function"){this.getMap().addControl(new d())
}},addOptions:function(){if(Ext.isArray(this.mapConfOpts)){var b;
for(i=0;
i<this.mapConfOpts.length;
i++){this.addOption(this.mapConfOpts[i])
}}else{if(typeof this.mapConfOpts==="string"){this.addOption(this.mapConfOpts)
}}},addOption:function(c){var d=this.getMap()[c];
if(typeof d==="function"){this.getMap()[c]()
}},geoCodeLookup:function(b){this.geocoder=new GClientGeocoder();
this.geocoder.getLocations(b,this.addAddressToMap.createDelegate(this))
},addAddressToMap:function(b){if(!b||b.Status.code!=200){Ext.MessageBox.alert("Error","Code "+b.Status.code+" Error Returned")
}else{place=b.Placemark[0];
addressinfo=place.AddressDetails;
accuracy=addressinfo.Accuracy;
if(accuracy===0){Ext.MessageBox.alert("Unable to Locate Address","Unable to Locate the Address you provided")
}else{if(accuracy<7){Ext.MessageBox.alert("Address Accuracy","The address provided has a low accuracy.<br><br>Level "+accuracy+" Accuracy (8 = Exact Match, 1 = Vague Match)")
}else{point=new GLatLng(place.Point.coordinates[1],place.Point.coordinates[0]);
if(typeof this.setCenter.marker==="object"&&typeof point==="object"){this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear,true,this.setCenter.listeners)
}}}}}});
Ext.reg("gmappanel",Ext.ux.GMapPanel);
Ext.namespace("Ext.ux.grid");
Ext.ux.grid.GridFilters=Ext.extend(Ext.util.Observable,{autoReload:true,filterCls:"ux-filtered-column",local:false,menuFilterText:"Filters",paramPrefix:"filter",showMenu:true,stateId:undefined,updateBuffer:500,constructor:function(b){b=b||{};
this.deferredUpdate=new Ext.util.DelayedTask(this.reload,this);
this.filters=new Ext.util.MixedCollection();
this.filters.getKey=function(a){return a?a.dataIndex:null
};
this.addFilters(b.filters);
delete b.filters;
Ext.apply(this,b)
},init:function(b){if(b instanceof Ext.grid.GridPanel){this.grid=b;
this.bindStore(this.grid.getStore(),true);
if(this.filters.getCount()==0){this.addFilters(this.grid.getColumnModel())
}this.grid.filters=this;
this.grid.addEvents({filterupdate:true});
b.on({scope:this,beforestaterestore:this.applyState,beforestatesave:this.saveState,beforedestroy:this.destroy,reconfigure:this.onReconfigure});
if(b.rendered){this.onRender()
}else{b.on({scope:this,single:true,render:this.onRender})
}}else{if(b instanceof Ext.PagingToolbar){this.toolbar=b
}}},applyState:function(e,g){var f,h;
this.applyingState=true;
this.clearFilters();
if(g.filters){for(f in g.filters){h=this.filters.get(f);
if(h){h.setValue(g.filters[f]);
h.setActive(true)
}}}this.deferredUpdate.cancel();
if(this.local){this.reload()
}delete this.applyingState
},saveState:function(e,f){var d={};
this.filters.each(function(a){if(a.active){d[a.dataIndex]=a.getValue()
}});
return(f.filters=d)
},onRender:function(){this.grid.getView().on("refresh",this.onRefresh,this);
this.createMenu()
},destroy:function(){this.removeAll();
this.purgeListeners();
if(this.filterMenu){Ext.menu.MenuMgr.unregister(this.filterMenu);
this.filterMenu.destroy();
this.filterMenu=this.menu.menu=null
}},removeAll:function(){if(this.filters){Ext.destroy.apply(Ext,this.filters.items);
this.filters.clear()
}},bindStore:function(d,c){if(!c&&this.store){if(this.local){d.un("load",this.onLoad,this)
}else{d.un("beforeload",this.onBeforeLoad,this)
}}if(d){if(this.local){d.on("load",this.onLoad,this)
}else{d.on("beforeload",this.onBeforeLoad,this)
}}this.store=d
},onReconfigure:function(){this.bindStore(this.grid.getStore());
this.store.clearFilter();
this.removeAll();
this.addFilters(this.grid.getColumnModel());
this.updateColumnHeadings()
},createMenu:function(){var d=this.grid.getView(),c=d.hmenu;
if(this.showMenu&&c){this.sep=c.addSeparator();
this.filterMenu=new Ext.menu.Menu({id:this.grid.id+"-filters-menu"});
this.menu=c.add({checked:false,itemId:"filters",text:this.menuFilterText,menu:this.filterMenu});
this.menu.on({scope:this,checkchange:this.onCheckChange,beforecheckchange:this.onBeforeCheck});
c.on("beforeshow",this.onMenu,this)
}this.updateColumnHeadings()
},getMenuFilter:function(){var b=this.grid.getView();
if(!b||b.hdCtxIndex===undefined){return null
}return this.filters.get(b.cm.config[b.hdCtxIndex].dataIndex)
},onMenu:function(c){var d=this.getMenuFilter();
if(d){this.menu.menu=d.menu;
this.menu.setChecked(d.active,false);
this.menu.setDisabled(d.disabled===true)
}this.menu.setVisible(d!==undefined);
this.sep.setVisible(d!==undefined)
},onCheckChange:function(d,c){this.getMenuFilter().setActive(c)
},onBeforeCheck:function(d,c){return !c||this.getMenuFilter().isActivatable()
},onStateChange:function(c,d){if(c==="serialize"){return
}if(d==this.getMenuFilter()){this.menu.setChecked(d.active,false)
}if((this.autoReload||this.local)&&!this.applyingState){this.deferredUpdate.delay(this.updateBuffer)
}this.updateColumnHeadings();
if(!this.applyingState){this.grid.saveState()
}this.grid.fireEvent("filterupdate",this,d)
},onBeforeLoad:function(e,d){d.params=d.params||{};
this.cleanParams(d.params);
var f=this.buildQuery(this.getFilterData());
Ext.apply(d.params,f)
},onLoad:function(d,c){d.filterBy(this.getRecordFilter())
},onRefresh:function(){this.updateColumnHeadings()
},updateColumnHeadings:function(){var f=this.grid.getView(),h,k,g,j;
if(f.mainHd){h=f.mainHd.select("td").removeClass(this.filterCls);
for(k=0,g=f.cm.config.length;
k<g;
k++){j=this.getFilter(f.cm.config[k].dataIndex);
if(j&&j.active){h.item(k).addClass(this.filterCls)
}}}},reload:function(){if(this.local){this.grid.store.clearFilter(true);
this.grid.store.filterBy(this.getRecordFilter())
}else{var c,d=this.grid.store;
this.deferredUpdate.cancel();
if(this.toolbar){c=d.paramNames.start;
if(d.lastOptions&&d.lastOptions.params&&d.lastOptions.params[c]){d.lastOptions.params[c]=0
}}d.reload()
}},getRecordFilter:function(){var f=[],e,d;
this.filters.each(function(a){if(a.active){f.push(a)
}});
e=f.length;
return function(a){for(d=0;
d<e;
d++){if(!f[d].validateRecord(a)){return false
}}return true
}
},addFilter:function(e){var f=this.getFilterClass(e.type),d=e.menu?e:(new f(e));
this.filters.add(d);
Ext.util.Observable.capture(d,this.onStateChange,this);
return d
},addFilters:function(j){if(j){var m,g,k,h=false,l;
if(j instanceof Ext.grid.ColumnModel){j=j.config;
h=true
}for(m=0,g=j.length;
m<g;
m++){k=false;
if(h){l=j[m].dataIndex;
k=j[m].filter||j[m].filterable;
if(k){k=(k===true)?{}:k;
Ext.apply(k,{dataIndex:l});
k.type=k.type||this.store.fields.get(l).type
}}else{k=j[m]
}if(k){this.addFilter(k)
}}}},getFilter:function(b){return this.filters.get(b)
},clearFilters:function(){this.filters.each(function(b){b.setActive(false)
})
},getFilterData:function(){var f=[],d,e;
this.filters.each(function(b){if(b.active){var a=[].concat(b.serialize());
for(d=0,e=a.length;
d<e;
d++){f.push({field:b.dataIndex,data:a[d]})
}}});
return f
},buildQuery:function(r){var s={},q,m,l,o,f,p,n=r.length;
if(!this.encode){for(q=0;
q<n;
q++){m=r[q];
l=[this.paramPrefix,"[",q,"]"].join("");
s[l+"[field]"]=m.field;
o=l+"[data]";
for(f in m.data){s[[o,"[",f,"]"].join("")]=m.data[f]
}}}else{p=[];
for(q=0;
q<n;
q++){m=r[q];
p.push(Ext.apply({},{field:m.field},m.data))
}if(p.length>0){s[this.paramPrefix]=Ext.util.JSON.encode(p)
}}return s
},cleanParams:function(f){if(this.encode){delete f[this.paramPrefix]
}else{var d,e;
d=new RegExp("^"+this.paramPrefix+"[[0-9]+]");
for(e in f){if(d.test(e)){delete f[e]
}}}},getFilterClass:function(b){switch(b){case"auto":b="string";
break;
case"int":case"float":b="numeric";
break
}return Ext.ux.grid.filter[b.substr(0,1).toUpperCase()+b.substr(1)+"Filter"]
}});
Ext.preg("gridfilters",Ext.ux.grid.GridFilters);
Ext.namespace("Ext.ux.grid.filter");
Ext.ux.grid.filter.Filter=Ext.extend(Ext.util.Observable,{active:false,dataIndex:null,menu:null,updateBuffer:500,constructor:function(b){Ext.apply(this,b);
this.addEvents("activate","deactivate","serialize","update");
Ext.ux.grid.filter.Filter.superclass.constructor.call(this);
this.menu=new Ext.menu.Menu();
this.init(b);
if(b&&b.value){this.setValue(b.value);
this.setActive(b.active!==false,true);
delete b.value
}},destroy:function(){if(this.menu){this.menu.destroy()
}this.purgeListeners()
},init:Ext.emptyFn,getValue:Ext.emptyFn,setValue:Ext.emptyFn,isActivatable:function(){return true
},getSerialArgs:Ext.emptyFn,validateRecord:function(){return true
},serialize:function(){var b=this.getSerialArgs();
this.fireEvent("serialize",b,this);
return b
},fireUpdate:function(){if(this.active){this.fireEvent("update",this)
}this.setActive(this.isActivatable())
},setActive:function(c,d){if(this.active!=c){this.active=c;
if(d!==true){this.fireEvent(c?"activate":"deactivate",this)
}}}});
Ext.ux.grid.filter.BooleanFilter=Ext.extend(Ext.ux.grid.filter.Filter,{defaultValue:false,yesText:"Yes",noText:"No",init:function(e){var f=Ext.id();
this.options=[new Ext.menu.CheckItem({text:this.yesText,group:f,checked:this.defaultValue===true}),new Ext.menu.CheckItem({text:this.noText,group:f,checked:this.defaultValue===false})];
this.menu.add(this.options[0],this.options[1]);
for(var d=0;
d<this.options.length;
d++){this.options[d].on("click",this.fireUpdate,this);
this.options[d].on("checkchange",this.fireUpdate,this)
}},getValue:function(){return this.options[0].checked
},setValue:function(b){this.options[b?0:1].setChecked(true)
},getSerialArgs:function(){var b={type:"boolean",value:this.getValue()};
return b
},validateRecord:function(b){return b.get(this.dataIndex)==this.getValue()
}});
Ext.ux.grid.filter.DateFilter=Ext.extend(Ext.ux.grid.filter.Filter,{afterText:"After",beforeText:"Before",compareMap:{before:"lt",after:"gt",on:"eq"},dateFormat:"m/d/Y",menuItems:["before","after","-","on"],menuItemCfgs:{selectOnFocus:true,width:125},onText:"On",pickerOpts:{},init:function(o){var k,n,j,m,h,l;
k=Ext.apply(this.pickerOpts,{minDate:this.minDate,maxDate:this.maxDate,format:this.dateFormat,listeners:{scope:this,select:this.onMenuSelect}});
this.fields={};
for(n=0,j=this.menuItems.length;
n<j;
n++){m=this.menuItems[n];
if(m!=="-"){h={itemId:"range-"+m,text:this[m+"Text"],menu:new Ext.menu.DateMenu(Ext.apply(k,{itemId:m})),listeners:{scope:this,checkchange:this.onCheckChange}};
l=Ext.menu.CheckItem;
m=this.fields[m]=new l(h)
}this.menu.add(m)
}},onCheckChange:function(){this.setActive(this.isActivatable());
this.fireEvent("update",this)
},onInputKeyUp:function(f,d){var e=d.getKey();
if(e==d.RETURN&&f.isValid()){d.stopEvent();
this.menu.hide(true);
return
}},onMenuSelect:function(k,j,f){var g=this.fields,h=this.fields[k.itemId];
h.setChecked(true);
if(h==g.on){g.before.setChecked(false,true);
g.after.setChecked(false,true)
}else{g.on.setChecked(false,true);
if(h==g.after&&g.before.menu.picker.value<j){g.before.setChecked(false,true)
}else{if(h==g.before&&g.after.menu.picker.value>j){g.after.setChecked(false,true)
}}}this.fireEvent("update",this)
},getValue:function(){var c,d={};
for(c in this.fields){if(this.fields[c].checked){d[c]=this.fields[c].menu.picker.getValue()
}}return d
},setValue:function(f,d){var e;
for(e in this.fields){if(f[e]){this.fields[e].menu.picker.setValue(f[e]);
this.fields[e].setChecked(true)
}else{if(!d){this.fields[e].setChecked(false)
}}}this.fireEvent("update",this)
},isActivatable:function(){var b;
for(b in this.fields){if(this.fields[b].checked){return true
}}return false
},getSerialArgs:function(){var d=[];
for(var c in this.fields){if(this.fields[c].checked){d.push({type:"date",comparison:this.compareMap[c],value:this.getFieldValue(c).format(this.dateFormat)})
}}return d
},getFieldValue:function(b){return this.fields[b].menu.picker.getValue()
},getPicker:function(b){return this.fields[b].menu.picker
},validateRecord:function(f){var e,g,h=f.get(this.dataIndex);
if(!Ext.isDate(h)){return false
}h=h.clearTime(true).getTime();
for(e in this.fields){if(this.fields[e].checked){g=this.getFieldValue(e).clearTime(true).getTime();
if(e=="before"&&g<=h){return false
}if(e=="after"&&g>=h){return false
}if(e=="on"&&g!=h){return false
}}}return true
}});
Ext.ux.grid.filter.ListFilter=Ext.extend(Ext.ux.grid.filter.Filter,{phpMode:false,init:function(b){this.dt=new Ext.util.DelayedTask(this.fireUpdate,this);
if(this.menu){this.menu.destroy()
}this.menu=new Ext.ux.menu.ListMenu(b);
this.menu.on("checkchange",this.onCheckChange,this)
},getValue:function(){return this.menu.getSelected()
},setValue:function(b){this.menu.setSelected(b);
this.fireEvent("update",this)
},isActivatable:function(){return this.getValue().length>0
},getSerialArgs:function(){var b={type:"list",value:this.phpMode?this.getValue().join(","):this.getValue()};
return b
},onCheckChange:function(){this.dt.delay(this.updateBuffer)
},validateRecord:function(b){return this.getValue().indexOf(b.get(this.dataIndex))>-1
}});
Ext.ux.grid.filter.NumericFilter=Ext.extend(Ext.ux.grid.filter.Filter,{fieldCls:Ext.form.NumberField,iconCls:{gt:"ux-rangemenu-gt",lt:"ux-rangemenu-lt",eq:"ux-rangemenu-eq"},menuItemCfgs:{emptyText:"Enter Filter Text...",selectOnFocus:true,width:125},menuItems:["lt","gt","-","eq"],init:function(b){if(this.menu){this.menu.destroy()
}this.menu=new Ext.ux.menu.RangeMenu(Ext.apply(b,{fieldCfg:this.fieldCfg||{},fieldCls:this.fieldCls,fields:this.fields||{},iconCls:this.iconCls,menuItemCfgs:this.menuItemCfgs,menuItems:this.menuItems,updateBuffer:this.updateBuffer}));
this.menu.on("update",this.fireUpdate,this)
},getValue:function(){return this.menu.getValue()
},setValue:function(b){this.menu.setValue(b)
},isActivatable:function(){var b=this.getValue();
for(key in b){if(b[key]!==undefined){return true
}}return false
},getSerialArgs:function(){var f,d=[],e=this.menu.getValue();
for(f in e){d.push({type:"numeric",comparison:f,value:e[f]})
}return d
},validateRecord:function(e){var f=e.get(this.dataIndex),d=this.getValue();
if(d.eq!==undefined&&f!=d.eq){return false
}if(d.lt!==undefined&&f>=d.lt){return false
}if(d.gt!==undefined&&f<=d.gt){return false
}return true
}});
Ext.ux.grid.filter.StringFilter=Ext.extend(Ext.ux.grid.filter.Filter,{iconCls:"ux-gridfilter-text-icon",emptyText:"Enter Filter Text...",selectOnFocus:true,width:125,init:function(b){Ext.applyIf(b,{enableKeyEvents:true,iconCls:this.iconCls,listeners:{scope:this,keyup:this.onInputKeyUp}});
this.inputItem=new Ext.form.TextField(b);
this.menu.add(this.inputItem);
this.updateTask=new Ext.util.DelayedTask(this.fireUpdate,this)
},getValue:function(){return this.inputItem.getValue()
},setValue:function(b){this.inputItem.setValue(b);
this.fireEvent("update",this)
},isActivatable:function(){return this.inputItem.getValue().length>0
},getSerialArgs:function(){return{type:"string",value:this.getValue()}
},validateRecord:function(d){var c=d.get(this.dataIndex);
if(typeof c!="string"){return(this.getValue().length===0)
}return c.toLowerCase().indexOf(this.getValue().toLowerCase())>-1
},onInputKeyUp:function(f,d){var e=d.getKey();
if(e==d.RETURN&&f.isValid()){d.stopEvent();
this.menu.hide(true);
return
}this.updateTask.delay(this.updateBuffer)
}});
Ext.namespace("Ext.ux.menu");
Ext.ux.menu.ListMenu=Ext.extend(Ext.menu.Menu,{labelField:"text",loadingText:"Loading...",loadOnShow:true,single:false,constructor:function(f){this.selected=[];
this.addEvents("checkchange");
Ext.ux.menu.ListMenu.superclass.constructor.call(this,f=f||{});
if(!f.store&&f.options){var k=[];
for(var j=0,g=f.options.length;
j<g;
j++){var h=f.options[j];
switch(Ext.type(h)){case"array":k.push(h);
break;
case"object":k.push([h.id,h[this.labelField]]);
break;
case"string":k.push([h,h]);
break
}}this.store=new Ext.data.Store({reader:new Ext.data.ArrayReader({id:0},["id",this.labelField]),data:k,listeners:{load:this.onLoad,scope:this}});
this.loaded=true
}else{this.add({text:this.loadingText,iconCls:"loading-indicator"});
this.store.on("load",this.onLoad,this)
}},destroy:function(){if(this.store){this.store.destroy()
}Ext.ux.menu.ListMenu.superclass.destroy.call(this)
},show:function(){var b=null;
return function(){if(arguments.length===0){Ext.ux.menu.ListMenu.superclass.show.apply(this,b)
}else{b=arguments;
if(this.loadOnShow&&!this.loaded){this.store.load()
}Ext.ux.menu.ListMenu.superclass.show.apply(this,arguments)
}}
}(),onLoad:function(o,h){var k=this.isVisible();
this.hide(false);
this.removeAll(true);
var m=this.single?Ext.id():null;
for(var n=0,j=h.length;
n<j;
n++){var l=new Ext.menu.CheckItem({text:h[n].get(this.labelField),group:m,checked:this.selected.indexOf(h[n].id)>-1,hideOnClick:false});
l.itemId=h[n].id;
l.on("checkchange",this.checkChange,this);
this.add(l)
}this.loaded=true;
if(k){this.show()
}this.fireEvent("load",this,h)
},getSelected:function(){return this.selected
},setSelected:function(b){b=this.selected=[].concat(b);
if(this.loaded){this.items.each(function(e){e.setChecked(false,true);
for(var f=0,a=b.length;
f<a;
f++){if(e.itemId==b[f]){e.setChecked(true,true)
}}},this)
}},checkChange:function(d,e){var f=[];
this.items.each(function(a){if(a.checked){f.push(a.itemId)
}},this);
this.selected=f;
this.fireEvent("checkchange",d,e)
}});
Ext.ns("Ext.ux.menu");
Ext.ux.menu.RangeMenu=Ext.extend(Ext.menu.Menu,{constructor:function(m){Ext.ux.menu.RangeMenu.superclass.constructor.call(this,m);
this.addEvents("update");
this.updateTask=new Ext.util.DelayedTask(this.fireUpdate,this);
var l,h,k,g,j;
for(l=0,h=this.menuItems.length;
l<h;
l++){k=this.menuItems[l];
if(k!=="-"){g={itemId:"range-"+k,enableKeyEvents:true,iconCls:this.iconCls[k]||"no-icon",listeners:{scope:this,keyup:this.onInputKeyUp}};
Ext.apply(g,Ext.applyIf(this.fields[k]||{},this.fieldCfg[k]),this.menuItemCfgs);
j=g.fieldCls||this.fieldCls;
k=this.fields[k]=new j(g)
}this.add(k)
}},fireUpdate:function(){this.fireEvent("update",this)
},getValue:function(){var e={},d,f;
for(d in this.fields){f=this.fields[d];
if(f.isValid()&&String(f.getValue()).length>0){e[d]=f.getValue()
}}return e
},setValue:function(c){var d;
for(d in this.fields){this.fields[d].setValue(c[d]!==undefined?c[d]:"")
}this.fireEvent("update",this)
},onInputKeyUp:function(f,d){var e=d.getKey();
if(e==d.RETURN&&f.isValid()){d.stopEvent();
this.hide(true);
return
}if(f==this.fields.eq){if(this.fields.gt){this.fields.gt.setValue(null)
}if(this.fields.lt){this.fields.lt.setValue(null)
}}else{this.fields.eq.setValue(null)
}this.updateTask.delay(this.updateBuffer)
}});
Ext.ns("Ext.ux.grid");
Ext.ux.grid.GroupSummary=Ext.extend(Ext.util.Observable,{constructor:function(b){Ext.apply(this,b);
Ext.ux.grid.GroupSummary.superclass.constructor.call(this)
},init:function(c){this.grid=c;
var d=this.view=c.getView();
d.doGroupEnd=this.doGroupEnd.createDelegate(this);
d.afterMethod("onColumnWidthUpdated",this.doWidth,this);
d.afterMethod("onAllColumnWidthsUpdated",this.doAllWidths,this);
d.afterMethod("onColumnHiddenUpdated",this.doHidden,this);
d.afterMethod("onUpdate",this.doUpdate,this);
d.afterMethod("onRemove",this.doRemove,this);
if(!this.rowTpl){this.rowTpl=new Ext.Template('<div class="x-grid3-summary-row" style="{tstyle}">','<table class="x-grid3-summary-table" border="0" cellspacing="0" cellpadding="0" style="{tstyle}">',"<tbody><tr>{cells}</tr></tbody>","</table></div>");
this.rowTpl.disableFormats=true
}this.rowTpl.compile();
if(!this.cellTpl){this.cellTpl=new Ext.Template('<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} {css}" style="{style}">','<div class="x-grid3-cell-inner x-grid3-col-{id}" unselectable="on">{value}</div>',"</td>");
this.cellTpl.disableFormats=true
}this.cellTpl.compile()
},toggleSummaries:function(c){var d=this.grid.getGridEl();
if(d){if(c===undefined){c=d.hasClass("x-grid-hide-summary")
}d[c?"removeClass":"addClass"]("x-grid-hide-summary")
}},renderSummary:function(s,o){o=o||this.view.getColumnData();
var n=this.grid.getColumnModel().config,r=[],m,u={},t,c=o.length-1;
for(var q=0,p=o.length;
q<p;
q++){m=o[q];
t=n[q];
u.id=m.id;
u.style=m.style;
u.css=q==0?"x-grid3-cell-first ":(q==c?"x-grid3-cell-last ":"");
if(t.summaryType||t.summaryRenderer){u.value=(t.summaryRenderer||m.renderer)(s.data[m.name],u,s)
}else{u.value=""
}if(u.value==undefined||u.value===""){u.value="&#160;"
}r[r.length]=this.cellTpl.apply(u)
}return this.rowTpl.apply({tstyle:"width:"+this.view.getTotalWidth()+";",cells:r.join("")})
},calculate:function(u,p){var r={},w,j,o=this.grid.getColumnModel().config,v;
for(var t=0,c=u.length;
t<c;
t++){w=u[t];
for(var s=0,q=p.length;
s<q;
s++){j=p[s];
v=o[s];
if(v.summaryType){r[j.name]=Ext.ux.grid.GroupSummary.Calculations[v.summaryType](r[j.name]||0,w,j.name,r)
}}}return r
},doGroupEnd:function(h,l,g,j,m){var k=this.calculate(l.rs,g);
h.push("</div>",this.renderSummary({data:k},g),"</div>")
},doWidth:function(m,h,n){var o=this.view.getGroups(),k;
for(var l=0,j=o.length;
l<j;
l++){k=o[l].childNodes[2];
k.style.width=n;
k.firstChild.style.width=n;
k.firstChild.rows[0].childNodes[m].style.width=h
}},doAllWidths:function(m,p){var s=this.view.getGroups(),j,l,o=m.length;
for(var q=0,n=s.length;
q<n;
q++){j=s[q].childNodes[2];
j.style.width=p;
j.firstChild.style.width=p;
l=j.firstChild.rows[0].childNodes;
for(var r=0;
r<o;
r++){l[r].style.width=m[r]
}}},doHidden:function(p,m,q){var j=this.view.getGroups(),n,l=m?"none":"";
for(var o=0,k=j.length;
o<k;
o++){n=j[o].childNodes[2];
n.style.width=q;
n.firstChild.style.width=q;
n.firstChild.rows[0].childNodes[p].style.display=l
}},refreshSummary:function(b){return this.refreshSummaryById(this.view.getGroupId(b))
},getSummaryNode:function(d){var c=Ext.fly(d,"_gsummary");
if(c){return c.down(".x-grid3-summary-row",true)
}return null
},refreshSummaryById:function(n){var l=Ext.getDom(n);
if(!l){return false
}var g=[];
this.grid.getStore().each(function(a){if(a._groupId==n){g[g.length]=a
}});
var o=this.view.getColumnData(),k=this.calculate(g,o),j=this.renderSummary({data:k},o),m=this.getSummaryNode(n);
if(m){l.removeChild(m)
}Ext.DomHelper.append(l,j);
return true
},doUpdate:function(c,d){this.refreshSummaryById(d._groupId)
},doRemove:function(g,f,e,h){if(!h){this.refreshSummaryById(f._groupId)
}},showSummaryMsg:function(f,g){var e=this.view.getGroupId(f),h=this.getSummaryNode(e);
if(h){h.innerHTML='<div class="x-grid3-summary-msg">'+g+"</div>"
}}});
Ext.grid.GroupSummary=Ext.ux.grid.GroupSummary;
Ext.ux.grid.GroupSummary.Calculations={sum:function(d,e,f){return d+(e.data[f]||0)
},count:function(e,f,g,h){return h[g+"count"]?++h[g+"count"]:(h[g+"count"]=1)
},max:function(k,f,h,j){var k=f.data[h];
var g=j[h+"max"]===undefined?(j[h+"max"]=k):j[h+"max"];
return k>g?(j[h+"max"]=k):g
},min:function(f,g,h,j){var f=g.data[h];
var k=j[h+"min"]===undefined?(j[h+"min"]=f):j[h+"min"];
return f<k?(j[h+"min"]=f):k
},average:function(c,h,k,l){var j=l[k+"count"]?++l[k+"count"]:(l[k+"count"]=1);
var m=(l[k+"total"]=((l[k+"total"]||0)+(h.data[k]||0)));
return m===0?0:m/j
}};
Ext.grid.GroupSummary.Calculations=Ext.ux.grid.GroupSummary.Calculations;
Ext.ux.grid.HybridSummary=Ext.extend(Ext.ux.grid.GroupSummary,{calculate:function(f,j){var g=this.view.getGroupField(),k=f[0].data[g],h=this.getSummaryData(k);
return h||Ext.ux.grid.HybridSummary.superclass.calculate.call(this,f,j)
},updateSummaryData:function(f,g,h){var e=this.grid.getStore().reader.jsonData;
if(!e.summaryData){e.summaryData={}
}e.summaryData[f]=g;
if(!h){this.refreshSummary(f)
}},getSummaryData:function(d){var c=this.grid.getStore().reader.jsonData;
if(c&&c.summaryData){return c.summaryData[d]
}return null
}});
Ext.grid.HybridSummary=Ext.ux.grid.HybridSummary;
Ext.ux.GroupTab=Ext.extend(Ext.Container,{mainItem:0,expanded:true,deferredRender:true,activeTab:null,idDelimiter:"__",headerAsText:false,frame:false,hideBorders:true,initComponent:function(d){Ext.apply(this,d);
this.frame=false;
Ext.ux.GroupTab.superclass.initComponent.call(this);
this.addEvents("activate","deactivate","changemainitem","beforetabchange","tabchange");
this.setLayout(new Ext.layout.CardLayout({deferredRender:this.deferredRender}));
if(!this.stack){this.stack=Ext.TabPanel.AccessStack()
}this.initItems();
this.on("beforerender",function(){this.groupEl=this.ownerCt.getGroupEl(this)
},this);
this.on("add",this.onAdd,this,{target:this});
this.on("remove",this.onRemove,this,{target:this});
if(this.mainItem!==undefined){var c=(typeof this.mainItem=="object")?this.mainItem:this.items.get(this.mainItem);
delete this.mainItem;
this.setMainItem(c)
}},setActiveTab:function(f){f=this.getComponent(f);
if(!f){return false
}if(!this.rendered){this.activeTab=f;
return true
}if(this.activeTab!=f&&this.fireEvent("beforetabchange",this,f,this.activeTab)!==false){if(this.activeTab&&this.activeTab!=this.mainItem){var e=this.getTabEl(this.activeTab);
if(e){Ext.fly(e).removeClass("x-grouptabs-strip-active")
}}var d=this.getTabEl(f);
Ext.fly(d).addClass("x-grouptabs-strip-active");
this.activeTab=f;
this.stack.add(f);
this.layout.setActiveItem(f);
if(this.layoutOnTabChange&&f.doLayout){f.doLayout()
}if(this.scrolling){this.scrollToTab(f,this.animScroll)
}this.fireEvent("tabchange",this,f);
return true
}return false
},getTabEl:function(b){if(b==this.mainItem){return this.groupEl
}return Ext.TabPanel.prototype.getTabEl.call(this,b)
},onRender:function(d,e){Ext.ux.GroupTab.superclass.onRender.call(this,d,e);
this.strip=Ext.fly(this.groupEl).createChild({tag:"ul",cls:"x-grouptabs-sub"});
this.tooltip=new Ext.ToolTip({target:this.groupEl,delegate:"a.x-grouptabs-text",trackMouse:true,renderTo:document.body,listeners:{beforeshow:function(a){var b=(a.triggerElement.parentNode===this.mainItem.tabEl)?this.mainItem:this.findById(a.triggerElement.parentNode.id.split(this.idDelimiter)[1]);
if(!b.tabTip){return false
}a.body.dom.innerHTML=b.tabTip
},scope:this}});
if(!this.itemTpl){var f=new Ext.Template('<li class="{cls}" id="{id}">','<a onclick="return false;" class="x-grouptabs-text {iconCls}">{text}</a>',"</li>");
f.disableFormats=true;
f.compile();
Ext.ux.GroupTab.prototype.itemTpl=f
}this.items.each(this.initTab,this)
},afterRender:function(){Ext.ux.GroupTab.superclass.afterRender.call(this);
if(this.activeTab!==undefined){var b=(typeof this.activeTab=="object")?this.activeTab:this.items.get(this.activeTab);
delete this.activeTab;
this.setActiveTab(b)
}},initTab:function(k,g){var j=this.strip.dom.childNodes[g];
var h=Ext.TabPanel.prototype.getTemplateArgs.call(this,k);
if(k===this.mainItem){k.tabEl=this.groupEl;
h.cls+=" x-grouptabs-main-item"
}var f=j?this.itemTpl.insertBefore(j,h):this.itemTpl.append(this.strip,h);
k.tabEl=k.tabEl||f;
k.on("disable",this.onItemDisabled,this);
k.on("enable",this.onItemEnabled,this);
k.on("titlechange",this.onItemTitleChanged,this);
k.on("iconchange",this.onItemIconChanged,this);
k.on("beforeshow",this.onBeforeShowItem,this)
},setMainItem:function(b){b=this.getComponent(b);
if(!b||this.fireEvent("changemainitem",this,b,this.mainItem)===false){return
}this.mainItem=b
},getMainItem:function(){return this.mainItem||null
},onBeforeShowItem:function(b){if(b!=this.activeTab){this.setActiveTab(b);
return false
}},onAdd:function(e,f,d){if(this.rendered){this.initTab.call(this,f,d)
}},onRemove:function(f,d){Ext.destroy(Ext.get(this.getTabEl(d)));
this.stack.remove(d);
d.un("disable",this.onItemDisabled,this);
d.un("enable",this.onItemEnabled,this);
d.un("titlechange",this.onItemTitleChanged,this);
d.un("iconchange",this.onItemIconChanged,this);
d.un("beforeshow",this.onBeforeShowItem,this);
if(d==this.activeTab){var e=this.stack.next();
if(e){this.setActiveTab(e)
}else{if(this.items.getCount()>0){this.setActiveTab(0)
}else{this.activeTab=null
}}}},onBeforeAdd:function(d){var e=d.events?(this.items.containsKey(d.getItemId())?d:null):this.items.get(d);
if(e){this.setActiveTab(d);
return false
}Ext.TabPanel.superclass.onBeforeAdd.apply(this,arguments);
var f=d.elements;
d.elements=f?f.replace(",header",""):f;
d.border=(d.border===true)
},onItemDisabled:Ext.TabPanel.prototype.onItemDisabled,onItemEnabled:Ext.TabPanel.prototype.onItemEnabled,onItemTitleChanged:function(c){var d=this.getTabEl(c);
if(d){Ext.fly(d).child("a.x-grouptabs-text",true).innerHTML=c.title
}},onItemIconChanged:function(g,f,h){var e=this.getTabEl(g);
if(e){Ext.fly(e).child("a.x-grouptabs-text").replaceClass(h,f)
}},beforeDestroy:function(){Ext.TabPanel.prototype.beforeDestroy.call(this);
this.tooltip.destroy()
}});
Ext.reg("grouptab",Ext.ux.GroupTab);
Ext.ns("Ext.ux");
Ext.ux.GroupTabPanel=Ext.extend(Ext.TabPanel,{tabPosition:"left",alternateColor:false,alternateCls:"x-grouptabs-panel-alt",defaultType:"grouptab",deferredRender:false,activeGroup:null,initComponent:function(){Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
this.addEvents("beforegroupchange","groupchange");
this.elements="body,header";
this.stripTarget="header";
this.tabPosition=this.tabPosition=="right"?"right":"left";
this.addClass("x-grouptabs-panel");
if(this.tabStyle&&this.tabStyle!=""){this.addClass("x-grouptabs-panel-"+this.tabStyle)
}if(this.alternateColor){this.addClass(this.alternateCls)
}this.on("beforeadd",function(d,f,e){this.initGroup(f,e)
})
},initEvents:function(){this.mon(this.strip,"mousedown",this.onStripMouseDown,this)
},onRender:function(m,h){Ext.TabPanel.superclass.onRender.call(this,m,h);
if(this.plain){var j=this.tabPosition=="top"?"header":"footer";
this[j].addClass("x-tab-panel-"+j+"-plain")
}var g=this[this.stripTarget];
this.stripWrap=g.createChild({cls:"x-tab-strip-wrap ",cn:{tag:"ul",cls:"x-grouptabs-strip x-grouptabs-tab-strip-"+this.tabPosition}});
var k=(this.tabPosition=="bottom"?this.stripWrap:null);
this.strip=new Ext.Element(this.stripWrap.dom.firstChild);
this.header.addClass("x-grouptabs-panel-header");
this.bwrap.addClass("x-grouptabs-bwrap");
this.body.addClass("x-tab-panel-body-"+this.tabPosition+" x-grouptabs-panel-body");
if(!this.groupTpl){var l=new Ext.Template('<li class="{cls}" id="{id}">','<a class="x-grouptabs-expand" onclick="return false;"></a>','<a class="x-grouptabs-text {iconCls}" href="#" onclick="return false;">',"<span>{text}</span></a>","</li>");
l.disableFormats=true;
l.compile();
Ext.ux.GroupTabPanel.prototype.groupTpl=l
}this.items.each(this.initGroup,this)
},afterRender:function(){Ext.ux.GroupTabPanel.superclass.afterRender.call(this);
this.tabJoint=Ext.fly(this.body.dom.parentNode).createChild({cls:"x-tab-joint"});
this.addClass("x-tab-panel-"+this.tabPosition);
this.header.setWidth(this.tabWidth);
if(this.activeGroup!==undefined){var b=(typeof this.activeGroup=="object")?this.activeGroup:this.items.get(this.activeGroup);
delete this.activeGroup;
this.setActiveGroup(b);
b.setActiveTab(b.getMainItem())
}},getGroupEl:Ext.TabPanel.prototype.getTabEl,findTargets:function(f){var d=null,e=f.getTarget("li",this.strip);
if(e){d=this.findById(e.id.split(this.idDelimiter)[1]);
if(d.disabled){return{expand:null,item:null,el:null}
}}return{expand:f.getTarget(".x-grouptabs-expand",this.strip),isGroup:!f.getTarget("ul.x-grouptabs-sub",this.strip),item:d,el:e}
},onStripMouseDown:function(c){if(c.button!=0){return
}c.preventDefault();
var d=this.findTargets(c);
if(d.expand){this.toggleGroup(d.el)
}else{if(d.item){if(d.isGroup){d.item.setActiveTab(d.item.getMainItem())
}else{d.item.ownerCt.setActiveTab(d.item)
}}}},expandGroup:function(b){if(b.isXType){b=this.getGroupEl(b)
}Ext.fly(b).addClass("x-grouptabs-expanded");
this.syncTabJoint()
},toggleGroup:function(b){if(b.isXType){b=this.getGroupEl(b)
}Ext.fly(b).toggleClass("x-grouptabs-expanded");
this.syncTabJoint()
},collapseGroup:function(b){if(b.isXType){b=this.getGroupEl(b)
}Ext.fly(b).removeClass("x-grouptabs-expanded");
this.syncTabJoint()
},syncTabJoint:function(c){if(!this.tabJoint){return
}c=c||this.getGroupEl(this.activeGroup);
if(c){this.tabJoint.setHeight(Ext.fly(c).getHeight()-2);
var d=Ext.isGecko2?0:1;
if(this.tabPosition=="left"){this.tabJoint.alignTo(c,"tl-tr",[-2,d])
}else{this.tabJoint.alignTo(c,"tr-tl",[1,d])
}}else{this.tabJoint.hide()
}},getActiveTab:function(){if(!this.activeGroup){return null
}return this.activeGroup.getTabEl(this.activeGroup.activeTab)||null
},onResize:function(){Ext.ux.GroupTabPanel.superclass.onResize.apply(this,arguments);
this.syncTabJoint()
},createCorner:function(d,c){return Ext.fly(d).createChild({cls:"x-grouptabs-corner x-grouptabs-corner-"+c})
},initGroup:function(l,h){var n=this.strip.dom.childNodes[h],m=this.getTemplateArgs(l);
if(h===0){m.cls+=" x-tab-first"
}m.cls+=" x-grouptabs-main";
m.text=l.getMainItem().title;
var o=n?this.groupTpl.insertBefore(n,m):this.groupTpl.append(this.strip,m),j=this.createCorner(o,"top-"+this.tabPosition),k=this.createCorner(o,"bottom-"+this.tabPosition);
l.tabEl=o;
if(l.expanded){this.expandGroup(o)
}if(Ext.isIE6||(Ext.isIE&&!Ext.isStrict)){k.setLeft("-10px");
k.setBottom("-5px");
j.setLeft("-10px");
j.setTop("-5px")
}this.mon(l,{scope:this,changemainitem:this.onGroupChangeMainItem,beforetabchange:this.onGroupBeforeTabChange})
},setActiveGroup:function(d){d=this.getComponent(d);
if(!d){return false
}if(!this.rendered){this.activeGroup=d;
return true
}if(this.activeGroup!=d&&this.fireEvent("beforegroupchange",this,d,this.activeGroup)!==false){if(this.activeGroup){var e=this.getGroupEl(this.activeGroup);
if(e){Ext.fly(e).removeClass("x-grouptabs-strip-active")
}}var f=this.getGroupEl(d);
Ext.fly(f).addClass("x-grouptabs-strip-active");
this.activeGroup=d;
this.stack.add(d);
this.layout.setActiveItem(d);
this.syncTabJoint(f);
this.fireEvent("groupchange",this,d);
return true
}return false
},onGroupBeforeTabChange:function(e,f,d){if(e!==this.activeGroup||f!==d){this.strip.select(".x-grouptabs-sub > li.x-grouptabs-strip-active",true).removeClass("x-grouptabs-strip-active")
}this.expandGroup(this.getGroupEl(e));
if(e!==this.activeGroup){return this.setActiveGroup(e)
}},getFrameHeight:function(){var b=this.el.getFrameWidth("tb");
b+=(this.tbar?this.tbar.getHeight():0)+(this.bbar?this.bbar.getHeight():0);
return b
},adjustBodyWidth:function(b){return b-this.tabWidth
}});
Ext.reg("grouptabpanel",Ext.ux.GroupTabPanel);
Ext.ux.form.ItemSelector=Ext.extend(Ext.form.Field,{hideNavIcons:false,imagePath:"",iconUp:"up2.gif",iconDown:"down2.gif",iconLeft:"left2.gif",iconRight:"right2.gif",iconTop:"top2.gif",iconBottom:"bottom2.gif",drawUpIcon:true,drawDownIcon:true,drawLeftIcon:true,drawRightIcon:true,drawTopIcon:true,drawBotIcon:true,delimiter:",",bodyStyle:null,border:false,defaultAutoCreate:{tag:"div"},multiselects:null,initComponent:function(){Ext.ux.form.ItemSelector.superclass.initComponent.call(this);
this.addEvents({rowdblclick:true,change:true})
},onRender:function(p,k){Ext.ux.form.ItemSelector.superclass.onRender.call(this,p,k);
var l=[{legend:"Available",draggable:true,droppable:true,width:100,height:100},{legend:"Selected",droppable:true,draggable:true,width:100,height:100}];
this.fromMultiselect=new Ext.ux.form.MultiSelect(Ext.applyIf(this.multiselects[0],l[0]));
this.fromMultiselect.on("dblclick",this.onRowDblClick,this);
this.toMultiselect=new Ext.ux.form.MultiSelect(Ext.applyIf(this.multiselects[1],l[1]));
this.toMultiselect.on("dblclick",this.onRowDblClick,this);
var m=new Ext.Panel({bodyStyle:this.bodyStyle,border:this.border,layout:"table",layoutConfig:{columns:3}});
m.add(this.fromMultiselect);
var q=new Ext.Panel({header:false});
m.add(q);
m.add(this.toMultiselect);
m.render(this.el);
q.el.down("."+q.bwrapCls).remove();
if(this.imagePath!=""&&this.imagePath.charAt(this.imagePath.length-1)!="/"){this.imagePath+="/"
}this.iconUp=this.imagePath+(this.iconUp||"up2.gif");
this.iconDown=this.imagePath+(this.iconDown||"down2.gif");
this.iconLeft=this.imagePath+(this.iconLeft||"left2.gif");
this.iconRight=this.imagePath+(this.iconRight||"right2.gif");
this.iconTop=this.imagePath+(this.iconTop||"top2.gif");
this.iconBottom=this.imagePath+(this.iconBottom||"bottom2.gif");
var n=q.getEl();
this.toTopIcon=n.createChild({tag:"img",src:this.iconTop,style:{cursor:"pointer",margin:"2px"}});
n.createChild({tag:"br"});
this.upIcon=n.createChild({tag:"img",src:this.iconUp,style:{cursor:"pointer",margin:"2px"}});
n.createChild({tag:"br"});
this.addIcon=n.createChild({tag:"img",src:this.iconRight,style:{cursor:"pointer",margin:"2px"}});
n.createChild({tag:"br"});
this.removeIcon=n.createChild({tag:"img",src:this.iconLeft,style:{cursor:"pointer",margin:"2px"}});
n.createChild({tag:"br"});
this.downIcon=n.createChild({tag:"img",src:this.iconDown,style:{cursor:"pointer",margin:"2px"}});
n.createChild({tag:"br"});
this.toBottomIcon=n.createChild({tag:"img",src:this.iconBottom,style:{cursor:"pointer",margin:"2px"}});
this.toTopIcon.on("click",this.toTop,this);
this.upIcon.on("click",this.up,this);
this.downIcon.on("click",this.down,this);
this.toBottomIcon.on("click",this.toBottom,this);
this.addIcon.on("click",this.fromTo,this);
this.removeIcon.on("click",this.toFrom,this);
if(!this.drawUpIcon||this.hideNavIcons){this.upIcon.dom.style.display="none"
}if(!this.drawDownIcon||this.hideNavIcons){this.downIcon.dom.style.display="none"
}if(!this.drawLeftIcon||this.hideNavIcons){this.addIcon.dom.style.display="none"
}if(!this.drawRightIcon||this.hideNavIcons){this.removeIcon.dom.style.display="none"
}if(!this.drawTopIcon||this.hideNavIcons){this.toTopIcon.dom.style.display="none"
}if(!this.drawBotIcon||this.hideNavIcons){this.toBottomIcon.dom.style.display="none"
}var j=m.body.first();
this.el.setWidth(m.body.first().getWidth());
m.body.removeClass();
this.hiddenName=this.name;
var o={tag:"input",type:"hidden",value:"",name:this.name};
this.hiddenField=this.el.createChild(o)
},doLayout:function(){if(this.rendered){this.fromMultiselect.fs.doLayout();
this.toMultiselect.fs.doLayout()
}},afterRender:function(){Ext.ux.form.ItemSelector.superclass.afterRender.call(this);
this.toStore=this.toMultiselect.store;
this.toStore.on("add",this.valueChanged,this);
this.toStore.on("remove",this.valueChanged,this);
this.toStore.on("load",this.valueChanged,this);
this.valueChanged(this.toStore)
},toTop:function(){var f=this.toMultiselect.view.getSelectedIndexes();
var e=[];
if(f.length>0){f.sort();
for(var d=0;
d<f.length;
d++){record=this.toMultiselect.view.store.getAt(f[d]);
e.push(record)
}f=[];
for(var d=e.length-1;
d>-1;
d--){record=e[d];
this.toMultiselect.view.store.remove(record);
this.toMultiselect.view.store.insert(0,record);
f.push(((e.length-1)-d))
}}this.toMultiselect.view.refresh();
this.toMultiselect.view.select(f)
},toBottom:function(){var f=this.toMultiselect.view.getSelectedIndexes();
var e=[];
if(f.length>0){f.sort();
for(var d=0;
d<f.length;
d++){record=this.toMultiselect.view.store.getAt(f[d]);
e.push(record)
}f=[];
for(var d=0;
d<e.length;
d++){record=e[d];
this.toMultiselect.view.store.remove(record);
this.toMultiselect.view.store.add(record);
f.push((this.toMultiselect.view.store.getCount())-(e.length-d))
}}this.toMultiselect.view.refresh();
this.toMultiselect.view.select(f)
},up:function(){var f=null;
var h=this.toMultiselect.view.getSelectedIndexes();
h.sort();
var g=[];
if(h.length>0){for(var e=0;
e<h.length;
e++){f=this.toMultiselect.view.store.getAt(h[e]);
if((h[e]-1)>=0){this.toMultiselect.view.store.remove(f);
this.toMultiselect.view.store.insert(h[e]-1,f);
g.push(h[e]-1)
}}this.toMultiselect.view.refresh();
this.toMultiselect.view.select(g)
}},down:function(){var f=null;
var h=this.toMultiselect.view.getSelectedIndexes();
h.sort();
h.reverse();
var g=[];
if(h.length>0){for(var e=0;
e<h.length;
e++){f=this.toMultiselect.view.store.getAt(h[e]);
if((h[e]+1)<this.toMultiselect.view.store.getCount()){this.toMultiselect.view.store.remove(f);
this.toMultiselect.view.store.insert(h[e]+1,f);
g.push(h[e]+1)
}}this.toMultiselect.view.refresh();
this.toMultiselect.view.select(g)
}},fromTo:function(){var h=this.fromMultiselect.view.getSelectedIndexes();
var f=[];
if(h.length>0){for(var j=0;
j<h.length;
j++){record=this.fromMultiselect.view.store.getAt(h[j]);
f.push(record)
}if(!this.allowDup){h=[]
}for(var j=0;
j<f.length;
j++){record=f[j];
if(this.allowDup){var g=new Ext.data.Record();
record.id=g.id;
delete g;
this.toMultiselect.view.store.add(record)
}else{this.fromMultiselect.view.store.remove(record);
this.toMultiselect.view.store.add(record);
h.push((this.toMultiselect.view.store.getCount()-1))
}}}this.toMultiselect.view.refresh();
this.fromMultiselect.view.refresh();
var k=this.toMultiselect.store.sortInfo;
if(k){this.toMultiselect.store.sort(k.field,k.direction)
}this.toMultiselect.view.select(h)
},toFrom:function(){var g=this.toMultiselect.view.getSelectedIndexes();
var f=[];
if(g.length>0){for(var h=0;
h<g.length;
h++){record=this.toMultiselect.view.store.getAt(g[h]);
f.push(record)
}g=[];
for(var h=0;
h<f.length;
h++){record=f[h];
this.toMultiselect.view.store.remove(record);
if(!this.allowDup){this.fromMultiselect.view.store.add(record);
g.push((this.fromMultiselect.view.store.getCount()-1))
}}}this.fromMultiselect.view.refresh();
this.toMultiselect.view.refresh();
var e=this.fromMultiselect.store.sortInfo;
if(e){this.fromMultiselect.store.sort(e.field,e.direction)
}this.fromMultiselect.view.select(g)
},valueChanged:function(h){var f=null;
var e=[];
for(var g=0;
g<h.getCount();
g++){f=h.getAt(g);
e.push(f.get(this.toMultiselect.valueField))
}this.hiddenField.dom.value=e.join(this.delimiter);
this.fireEvent("change",this,this.getValue(),this.hiddenField.dom.value)
},getValue:function(){return this.hiddenField.dom.value
},onRowDblClick:function(h,f,e,g){if(h==this.toMultiselect.view){this.toFrom()
}else{if(h==this.fromMultiselect.view){this.fromTo()
}}return this.fireEvent("rowdblclick",h,f,e,g)
},reset:function(){range=this.toMultiselect.store.getRange();
this.toMultiselect.store.removeAll();
this.fromMultiselect.store.add(range);
var b=this.fromMultiselect.store.sortInfo;
if(b){this.fromMultiselect.store.sort(b.field,b.direction)
}this.valueChanged(this.toMultiselect.store)
}});
Ext.reg("itemselector",Ext.ux.form.ItemSelector);
Ext.ux.ItemSelector=Ext.ux.form.ItemSelector;
Ext.ns("Ext.ux.grid");
Ext.ux.grid.LockingGridView=Ext.extend(Ext.grid.GridView,{lockText:"Lock",unlockText:"Unlock",rowBorderWidth:1,lockedBorderWidth:1,syncHeights:false,initTemplates:function(){var b=this.templates||{};
if(!b.master){b.master=new Ext.Template('<div class="x-grid3" hidefocus="true">','<div class="x-grid3-locked">','<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{lstyle}">{lockedHeader}</div></div><div class="x-clear"></div></div>','<div class="x-grid3-scroller"><div class="x-grid3-body" style="{lstyle}">{lockedBody}</div><div class="x-grid3-scroll-spacer"></div></div>',"</div>",'<div class="x-grid3-viewport x-grid3-unlocked">','<div class="x-grid3-header"><div class="x-grid3-header-inner"><div class="x-grid3-header-offset" style="{ostyle}">{header}</div></div><div class="x-clear"></div></div>','<div class="x-grid3-scroller"><div class="x-grid3-body" style="{bstyle}">{body}</div><a href="#" class="x-grid3-focus" tabIndex="-1"></a></div>',"</div>",'<div class="x-grid3-resize-marker">&#160;</div>','<div class="x-grid3-resize-proxy">&#160;</div>',"</div>")
}this.templates=b;
Ext.ux.grid.LockingGridView.superclass.initTemplates.call(this)
},getEditorParent:function(b){return this.el.dom
},initElements:function(){var f=Ext.Element;
var d=this.grid.getGridEl().dom.firstChild;
var e=d.childNodes;
this.el=new f(d);
this.lockedWrap=new f(e[0]);
this.lockedHd=new f(this.lockedWrap.dom.firstChild);
this.lockedInnerHd=this.lockedHd.dom.firstChild;
this.lockedScroller=new f(this.lockedWrap.dom.childNodes[1]);
this.lockedBody=new f(this.lockedScroller.dom.firstChild);
this.mainWrap=new f(e[1]);
this.mainHd=new f(this.mainWrap.dom.firstChild);
if(this.grid.hideHeaders){this.lockedHd.setDisplayed(false);
this.mainHd.setDisplayed(false)
}this.innerHd=this.mainHd.dom.firstChild;
this.scroller=new f(this.mainWrap.dom.childNodes[1]);
if(this.forceFit){this.scroller.setStyle("overflow-x","hidden")
}this.mainBody=new f(this.scroller.dom.firstChild);
this.focusEl=new f(this.scroller.dom.childNodes[1]);
this.focusEl.swallowEvent("click",true);
this.resizeMarker=new f(e[2]);
this.resizeProxy=new f(e[3])
},getLockedRows:function(){return this.hasRows()?this.lockedBody.dom.childNodes:[]
},getLockedRow:function(b){return this.getLockedRows()[b]
},getCell:function(f,e){var d=this.cm.getLockedCount();
if(e<d){return this.getLockedRow(f).getElementsByTagName("td")[e]
}return Ext.ux.grid.LockingGridView.superclass.getCell.call(this,f,e-d)
},getHeaderCell:function(d){var c=this.cm.getLockedCount();
if(d<c){return this.lockedHd.dom.getElementsByTagName("td")[d]
}return Ext.ux.grid.LockingGridView.superclass.getHeaderCell.call(this,d-c)
},addRowClass:function(f,e){var d=this.getLockedRow(f);
if(d){this.fly(d).addClass(e)
}Ext.ux.grid.LockingGridView.superclass.addRowClass.call(this,f,e)
},removeRowClass:function(f,e){var d=this.getLockedRow(f);
if(d){this.fly(d).removeClass(e)
}Ext.ux.grid.LockingGridView.superclass.removeRowClass.call(this,f,e)
},removeRow:function(b){Ext.removeNode(this.getLockedRow(b));
Ext.ux.grid.LockingGridView.superclass.removeRow.call(this,b)
},removeRows:function(h,f){var e=this.lockedBody.dom;
for(var g=h;
g<=f;
g++){Ext.removeNode(e.childNodes[h])
}Ext.ux.grid.LockingGridView.superclass.removeRows.call(this,h,f)
},syncScroll:function(d){var c=this.scroller.dom;
this.lockedScroller.dom.scrollTop=c.scrollTop;
Ext.ux.grid.LockingGridView.superclass.syncScroll.call(this,d)
},updateSortIcon:function(o,h){var k=this.sortClasses,n=this.lockedHd.select("td").removeClass(k),l=this.mainHd.select("td").removeClass(k),m=this.cm.getLockedCount(),j=k[h=="DESC"?1:0];
if(o<m){n.item(o).addClass(j)
}else{l.item(o-m).addClass(j)
}},updateAllColumnWidths:function(){var u=this.getTotalWidth(),p=this.cm.getColumnCount(),z=this.getLockedWidth(),x=this.cm.getLockedCount(),s=[],t,w;
this.updateLockedWidth();
for(w=0;
w<p;
w++){s[w]=this.getColumnWidth(w);
var v=this.getHeaderCell(w);
v.style.width=s[w]
}var A=this.getLockedRows(),q=this.getRows(),j,r,y;
for(w=0,t=q.length;
w<t;
w++){j=A[w];
j.style.width=z;
if(j.firstChild){j.firstChild.style.width=z;
r=j.firstChild.rows[0];
for(y=0;
y<x;
y++){r.childNodes[y].style.width=s[y]
}}j=q[w];
j.style.width=u;
if(j.firstChild){j.firstChild.style.width=u;
r=j.firstChild.rows[0];
for(y=x;
y<p;
y++){r.childNodes[y-x].style.width=s[y]
}}}this.onAllColumnWidthsUpdated(s,u);
this.syncHeaderHeight()
},updateColumnWidth:function(u,w){var n=this.getColumnWidth(u),t=this.cm.getLockedCount(),o,v,p,c;
this.updateLockedWidth();
if(u<t){o=this.getLockedRows();
v=this.getLockedWidth();
p=u
}else{o=this.getRows();
v=this.getTotalWidth();
p=u-t
}var r=this.getHeaderCell(u);
r.style.width=n;
for(var s=0,q=o.length;
s<q;
s++){c=o[s];
c.style.width=v;
if(c.firstChild){c.firstChild.style.width=v;
c.firstChild.rows[0].childNodes[p].style.width=n
}}this.onColumnWidthUpdated(u,n,this.getTotalWidth());
this.syncHeaderHeight()
},updateColumnHidden:function(v,r){var u=this.cm.getLockedCount(),n,w,o,c,p=r?"none":"";
this.updateLockedWidth();
if(v<u){n=this.getLockedRows();
w=this.getLockedWidth();
o=v
}else{n=this.getRows();
w=this.getTotalWidth();
o=v-u
}var s=this.getHeaderCell(v);
s.style.display=p;
for(var t=0,q=n.length;
t<q;
t++){c=n[t];
c.style.width=w;
if(c.firstChild){c.firstChild.style.width=w;
c.firstChild.rows[0].childNodes[o].style.display=p
}}this.onColumnHiddenUpdated(v,r,this.getTotalWidth());
delete this.lastViewWidth;
this.layout()
},doRender:function(T,Q,G,Y,H,p){var W=this.templates,U=W.cell,S=W.row,O=H-1,V="width:"+this.getTotalWidth()+";",X="width:"+this.getLockedWidth()+";",M=[],I=[],E,R,L,F={},P={},K;
for(var r=0,c=Q.length;
r<c;
r++){K=Q[r];
E=[];
R=[];
var N=(r+Y);
for(var j=0;
j<H;
j++){L=T[j];
F.id=L.id;
F.css=(j===0?"x-grid3-cell-first ":(j==O?"x-grid3-cell-last ":""))+(this.cm.config[j].cellCls?" "+this.cm.config[j].cellCls:"");
F.attr=F.cellAttr="";
F.value=L.renderer(K.data[L.name],F,K,N,j,G);
F.style=L.style;
if(Ext.isEmpty(F.value)){F.value="&#160;"
}if(this.markDirty&&K.dirty&&Ext.isDefined(K.modified[L.name])){F.css+=" x-grid3-dirty-cell"
}if(L.locked){R[R.length]=U.apply(F)
}else{E[E.length]=U.apply(F)
}}var J=[];
if(p&&((N+1)%2===0)){J[0]="x-grid3-row-alt"
}if(K.dirty){J[1]=" x-grid3-dirty-row"
}P.cols=H;
if(this.getRowClass){J[2]=this.getRowClass(K,N,P,G)
}P.alt=J.join(" ");
P.cells=E.join("");
P.tstyle=V;
M[M.length]=S.apply(P);
P.cells=R.join("");
P.tstyle=X;
I[I.length]=S.apply(P)
}return[M.join(""),I.join("")]
},processRows:function(p,s){if(!this.ds||this.ds.getCount()<1){return
}var n=this.getRows(),u=this.getLockedRows(),o,q;
s=s||!this.grid.stripeRows;
p=p||0;
for(var w=0,v=n.length;
w<v;
++w){o=n[w];
q=u[w];
o.rowIndex=w;
q.rowIndex=w;
if(!s){o.className=o.className.replace(this.rowClsRe," ");
q.className=q.className.replace(this.rowClsRe," ");
if((idx+1)%2===0){o.className+=" x-grid3-row-alt";
q.className+=" x-grid3-row-alt"
}}if(this.syncHeights){var x=Ext.get(o),y=Ext.get(q),r=x.getHeight(),t=y.getHeight();
if(r>t){y.setHeight(r)
}else{if(t>r){x.setHeight(t)
}}}}if(p===0){Ext.fly(n[0]).addClass(this.firstRowCls);
Ext.fly(u[0]).addClass(this.firstRowCls)
}Ext.fly(n[n.length-1]).addClass(this.lastRowCls);
Ext.fly(u[u.length-1]).addClass(this.lastRowCls)
},afterRender:function(){if(!this.ds||!this.cm){return
}var b=this.renderRows()||["&#160;","&#160;"];
this.mainBody.dom.innerHTML=b[0];
this.lockedBody.dom.innerHTML=b[1];
this.processRows(0,true);
if(this.deferEmptyText!==true){this.applyEmptyText()
}},renderUI:function(){var g=this.renderHeaders();
var f=this.templates.body.apply({rows:"&#160;"});
var e=this.templates.master.apply({body:f,header:g[0],ostyle:"width:"+this.getOffsetWidth()+";",bstyle:"width:"+this.getTotalWidth()+";",lockedBody:f,lockedHeader:g[1],lstyle:"width:"+this.getLockedWidth()+";"});
var h=this.grid;
h.getGridEl().dom.innerHTML=e;
this.initElements();
Ext.fly(this.innerHd).on("click",this.handleHdDown,this);
Ext.fly(this.lockedInnerHd).on("click",this.handleHdDown,this);
this.mainHd.on({scope:this,mouseover:this.handleHdOver,mouseout:this.handleHdOut,mousemove:this.handleHdMove});
this.lockedHd.on({scope:this,mouseover:this.handleHdOver,mouseout:this.handleHdOut,mousemove:this.handleHdMove});
this.scroller.on("scroll",this.syncScroll,this);
if(h.enableColumnResize!==false){this.splitZone=new Ext.grid.GridView.SplitDragZone(h,this.mainHd.dom);
this.splitZone.setOuterHandleElId(Ext.id(this.lockedHd.dom));
this.splitZone.setOuterHandleElId(Ext.id(this.mainHd.dom))
}if(h.enableColumnMove){this.columnDrag=new Ext.grid.GridView.ColumnDragZone(h,this.innerHd);
this.columnDrag.setOuterHandleElId(Ext.id(this.lockedInnerHd));
this.columnDrag.setOuterHandleElId(Ext.id(this.innerHd));
this.columnDrop=new Ext.grid.HeaderDropZone(h,this.mainHd.dom)
}if(h.enableHdMenu!==false){this.hmenu=new Ext.menu.Menu({id:h.id+"-hctx"});
this.hmenu.add({itemId:"asc",text:this.sortAscText,cls:"xg-hmenu-sort-asc"},{itemId:"desc",text:this.sortDescText,cls:"xg-hmenu-sort-desc"});
if(this.grid.enableColLock!==false){this.hmenu.add("-",{itemId:"lock",text:this.lockText,cls:"xg-hmenu-lock"},{itemId:"unlock",text:this.unlockText,cls:"xg-hmenu-unlock"})
}if(h.enableColumnHide!==false){this.colMenu=new Ext.menu.Menu({id:h.id+"-hcols-menu"});
this.colMenu.on({scope:this,beforeshow:this.beforeColMenuShow,itemclick:this.handleHdMenuClick});
this.hmenu.add("-",{itemId:"columns",hideOnClick:false,text:this.columnsText,menu:this.colMenu,iconCls:"x-cols-icon"})
}this.hmenu.on("itemclick",this.handleHdMenuClick,this)
}if(h.trackMouseOver){this.mainBody.on({scope:this,mouseover:this.onRowOver,mouseout:this.onRowOut});
this.lockedBody.on({scope:this,mouseover:this.onRowOver,mouseout:this.onRowOut})
}if(h.enableDragDrop||h.enableDrag){this.dragZone=new Ext.grid.GridDragZone(h,{ddGroup:h.ddGroup||"GridDD"})
}this.updateHeaderSortState()
},layout:function(){if(!this.mainBody){return
}var m=this.grid;
var j=m.getGridEl();
var g=j.getSize(true);
var c=g.width;
if(!m.hideHeaders&&(c<20||g.height<20)){return
}this.syncHeaderHeight();
if(m.autoHeight){this.scroller.dom.style.overflow="visible";
this.lockedScroller.dom.style.overflow="visible";
if(Ext.isWebKit){this.scroller.dom.style.position="static";
this.lockedScroller.dom.style.position="static"
}}else{this.el.setSize(g.width,g.height);
var k=this.mainHd.getHeight();
var l=g.height-(k)
}this.updateLockedWidth();
if(this.forceFit){if(this.lastViewWidth!=c){this.fitColumns(false,false);
this.lastViewWidth=c
}}else{this.autoExpand();
this.syncHeaderScroll()
}this.onLayout(c,l)
},getOffsetWidth:function(){return(this.cm.getTotalWidth()-this.cm.getTotalLockedWidth()+this.getScrollOffset())+"px"
},renderHeaders:function(){var l=this.cm,n=this.templates,p=n.hcell,r=[],m=[],s={},o=l.getColumnCount(),k=o-1;
for(var q=0;
q<o;
q++){s.id=l.getColumnId(q);
s.value=l.getColumnHeader(q)||"";
s.style=this.getColumnStyle(q,true);
s.tooltip=this.getColumnTooltip(q);
s.css=(q===0?"x-grid3-cell-first ":(q==k?"x-grid3-cell-last ":""))+(l.config[q].headerCls?" "+l.config[q].headerCls:"");
if(l.config[q].align=="right"){s.istyle="padding-right:16px"
}else{delete s.istyle
}if(l.isLocked(q)){m[m.length]=p.apply(s)
}else{r[r.length]=p.apply(s)
}}return[n.header.apply({cells:r.join(""),tstyle:"width:"+this.getTotalWidth()+";"}),n.header.apply({cells:m.join(""),tstyle:"width:"+this.getLockedWidth()+";"})]
},updateHeaders:function(){var c=this.renderHeaders();
this.innerHd.firstChild.innerHTML=c[0];
this.innerHd.firstChild.style.width=this.getOffsetWidth();
this.innerHd.firstChild.firstChild.style.width=this.getTotalWidth();
this.lockedInnerHd.firstChild.innerHTML=c[1];
var d=this.getLockedWidth();
this.lockedInnerHd.firstChild.style.width=d;
this.lockedInnerHd.firstChild.firstChild.style.width=d
},getResolvedXY:function(e){if(!e){return null
}var f=e.cell,c=e.row;
return f?Ext.fly(f).getXY():[this.scroller.getX(),Ext.fly(c).getY()]
},syncFocusEl:function(f,e,d){Ext.ux.grid.LockingGridView.superclass.syncFocusEl.call(this,f,e,e<this.cm.getLockedCount()?false:d)
},ensureVisible:function(f,e,d){return Ext.ux.grid.LockingGridView.superclass.ensureVisible.call(this,f,e,e<this.cm.getLockedCount()?false:d)
},insertRows:function(j,k,n,l){var o=j.getCount()-1;
if(!l&&k===0&&n>=o){this.refresh()
}else{if(!l){this.fireEvent("beforerowsinserted",this,k,n)
}var h=this.renderRows(k,n),m=this.getRow(k);
if(m){if(k===0){this.removeRowClass(0,this.firstRowCls)
}Ext.DomHelper.insertHtml("beforeBegin",m,h[0]);
m=this.getLockedRow(k);
Ext.DomHelper.insertHtml("beforeBegin",m,h[1])
}else{this.removeRowClass(o-1,this.lastRowCls);
Ext.DomHelper.insertHtml("beforeEnd",this.mainBody.dom,h[0]);
Ext.DomHelper.insertHtml("beforeEnd",this.lockedBody.dom,h[1])
}if(!l){this.fireEvent("rowsinserted",this,k,n);
this.processRows(k)
}else{if(k===0||k>=o){this.addRowClass(k,k===0?this.firstRowCls:this.lastRowCls)
}}}this.syncFocusEl(k)
},getColumnStyle:function(f,h){var e=!h?this.cm.config[f].cellStyle||this.cm.config[f].css||"":this.cm.config[f].headerStyle||"";
e+="width:"+this.getColumnWidth(f)+";";
if(this.cm.isHidden(f)){e+="display:none;"
}var g=this.cm.config[f].align;
if(g){e+="text-align:"+g+";"
}return e
},getLockedWidth:function(){return this.cm.getTotalLockedWidth()+"px"
},getTotalWidth:function(){return(this.cm.getTotalWidth()-this.cm.getTotalLockedWidth())+"px"
},getColumnData:function(){var j=[],g=this.cm,h=g.getColumnCount();
for(var k=0;
k<h;
k++){var f=g.getDataIndex(k);
j[k]={name:(!Ext.isDefined(f)?this.ds.fields.get(k).name:f),renderer:g.getRenderer(k),id:g.getColumnId(k),style:this.getColumnStyle(k),locked:g.isLocked(k)}
}return j
},renderBody:function(){var b=this.renderRows()||["&#160;","&#160;"];
return[this.templates.body.apply({rows:b[0]}),this.templates.body.apply({rows:b[1]})]
},refreshRow:function(d){Ext.ux.grid.LockingGridView.superclass.refreshRow.call(this,d);
var c=Ext.isNumber(d)?d:this.ds.indexOf(d);
this.getLockedRow(c).rowIndex=c
},refresh:function(c){this.fireEvent("beforerefresh",this);
this.grid.stopEditing(true);
var d=this.renderBody();
this.mainBody.update(d[0]).setWidth(this.getTotalWidth());
this.lockedBody.update(d[1]).setWidth(this.getLockedWidth());
if(c===true){this.updateHeaders();
this.updateHeaderSortState()
}this.processRows(0,true);
this.layout();
this.applyEmptyText();
this.fireEvent("refresh",this)
},onDenyColumnLock:function(){},initData:function(c,d){if(this.cm){this.cm.un("columnlockchange",this.onColumnLock,this)
}Ext.ux.grid.LockingGridView.superclass.initData.call(this,c,d);
if(this.cm){this.cm.on("columnlockchange",this.onColumnLock,this)
}},onColumnLock:function(){this.refresh(true)
},handleHdMenuClick:function(j){var f=this.hdCtxIndex,g=this.cm,h=j.getItemId(),k=g.getLockedCount();
switch(h){case"lock":if(g.getColumnCount(true)<=k+1){this.onDenyColumnLock();
return
}if(k!=f){g.setLocked(f,true,true);
g.moveColumn(f,k);
this.grid.fireEvent("columnmove",f,k)
}else{g.setLocked(f,true)
}break;
case"unlock":if(k-1!=f){g.setLocked(f,false,true);
g.moveColumn(f,k-1);
this.grid.fireEvent("columnmove",f,k-1)
}else{g.setLocked(f,false)
}break;
default:return Ext.ux.grid.LockingGridView.superclass.handleHdMenuClick.call(this,j)
}return true
},handleHdDown:function(j,l){Ext.ux.grid.LockingGridView.superclass.handleHdDown.call(this,j,l);
if(this.grid.enableColLock!==false){if(Ext.fly(l).hasClass("x-grid3-hd-btn")){var k=this.findHeaderCell(l),m=this.getCellIndex(k),e=this.hmenu.items,h=this.cm;
e.get("lock").setDisabled(h.isLocked(m));
e.get("unlock").setDisabled(!h.isLocked(m))
}}},syncHeaderHeight:function(){this.innerHd.firstChild.firstChild.style.height="auto";
this.lockedInnerHd.firstChild.firstChild.style.height="auto";
var f=this.innerHd.firstChild.firstChild.offsetHeight,d=this.lockedInnerHd.firstChild.firstChild.offsetHeight,e=(d>f?d:f)+"px";
this.innerHd.firstChild.firstChild.style.height=e;
this.lockedInnerHd.firstChild.firstChild.style.height=e
},updateLockedWidth:function(){var m=this.cm.getTotalLockedWidth(),k=this.cm.getTotalWidth()-m,q=this.grid.getGridEl().getSize(true),j=Ext.isBorderBox?0:this.lockedBorderWidth,p=Ext.isBorderBox?0:this.rowBorderWidth,o=(q.width-m-j-p)+"px",n=this.getScrollOffset();
if(!this.grid.autoHeight){var l=(q.height-this.mainHd.getHeight())+"px";
this.lockedScroller.dom.style.height=l;
this.scroller.dom.style.height=l
}this.lockedWrap.dom.style.width=(m+p)+"px";
this.scroller.dom.style.width=o;
this.mainWrap.dom.style.left=(m+j+p)+"px";
if(this.innerHd){this.lockedInnerHd.firstChild.style.width=m+"px";
this.lockedInnerHd.firstChild.firstChild.style.width=m+"px";
this.innerHd.style.width=o;
this.innerHd.firstChild.style.width=(k+p+n)+"px";
this.innerHd.firstChild.firstChild.style.width=k+"px"
}if(this.mainBody){this.lockedBody.dom.style.width=(m+p)+"px";
this.mainBody.dom.style.width=(k+p)+"px"
}}});
Ext.ux.grid.LockingColumnModel=Ext.extend(Ext.grid.ColumnModel,{isLocked:function(b){return this.config[b].locked===true
},setLocked:function(d,f,e){if(this.isLocked(d)==f){return
}this.config[d].locked=f;
if(!e){this.fireEvent("columnlockchange",this,d,f)
}},getTotalLockedWidth:function(){var d=0;
for(var f=0,e=this.config.length;
f<e;
f++){if(this.isLocked(f)&&!this.isHidden(f)){d+=this.getColumnWidth(f)
}}return d
},getLockedCount:function(){for(var c=0,d=this.config.length;
c<d;
c++){if(!this.isLocked(c)){return c
}}},moveColumn:function(c,d){if(c<d&&this.isLocked(c)&&!this.isLocked(d)){this.setLocked(c,false,true)
}else{if(c>d&&!this.isLocked(c)&&this.isLocked(d)){this.setLocked(c,true,true)
}}Ext.ux.grid.LockingColumnModel.superclass.moveColumn.apply(this,arguments)
}});
Ext.ns("Ext.ux.form");
Ext.ux.form.MultiSelect=Ext.extend(Ext.form.Field,{ddReorder:false,appendOnly:false,width:100,height:100,displayField:0,valueField:1,allowBlank:true,minSelections:0,maxSelections:Number.MAX_VALUE,blankText:Ext.form.TextField.prototype.blankText,minSelectionsText:"Minimum {0} item(s) required",maxSelectionsText:"Maximum {0} item(s) allowed",delimiter:",",defaultAutoCreate:{tag:"div"},initComponent:function(){Ext.ux.form.MultiSelect.superclass.initComponent.call(this);
if(Ext.isArray(this.store)){if(Ext.isArray(this.store[0])){this.store=new Ext.data.ArrayStore({fields:["value","text"],data:this.store});
this.valueField="value"
}else{this.store=new Ext.data.ArrayStore({fields:["text"],data:this.store,expandData:true});
this.valueField="text"
}this.displayField="text"
}else{this.store=Ext.StoreMgr.lookup(this.store)
}this.addEvents({dblclick:true,click:true,change:true,drop:true})
},onRender:function(h,e){Ext.ux.form.MultiSelect.superclass.onRender.call(this,h,e);
var f=this.fs=new Ext.form.FieldSet({renderTo:this.el,title:this.legend,height:this.height,width:this.width,style:"padding:0;",tbar:this.tbar});
f.body.addClass("ux-mselect");
this.view=new Ext.ListView({multiSelect:true,store:this.store,columns:[{header:"Value",width:1,dataIndex:this.displayField}],hideHeaders:true});
f.add(this.view);
this.view.on("click",this.onViewClick,this);
this.view.on("beforeclick",this.onViewBeforeClick,this);
this.view.on("dblclick",this.onViewDblClick,this);
this.hiddenName=this.name||Ext.id();
var g={tag:"input",type:"hidden",value:"",name:this.hiddenName};
this.hiddenField=this.el.createChild(g);
this.hiddenField.dom.disabled=this.hiddenName!=this.name;
f.doLayout()
},afterRender:function(){Ext.ux.form.MultiSelect.superclass.afterRender.call(this);
if(this.ddReorder&&!this.dragGroup&&!this.dropGroup){this.dragGroup=this.dropGroup="MultiselectDD-"+Ext.id()
}if(this.draggable||this.dragGroup){this.dragZone=new Ext.ux.form.MultiSelect.DragZone(this,{ddGroup:this.dragGroup})
}if(this.droppable||this.dropGroup){this.dropZone=new Ext.ux.form.MultiSelect.DropZone(this,{ddGroup:this.dropGroup})
}},onViewClick:function(h,f,e,g){this.fireEvent("change",this,this.getValue(),this.hiddenField.dom.value);
this.hiddenField.dom.value=this.getValue();
this.fireEvent("click",this,g);
this.validate()
},onViewBeforeClick:function(h,f,e,g){if(this.disabled){return false
}},onViewDblClick:function(h,f,e,g){return this.fireEvent("dblclick",h,f,e,g)
},getValue:function(f){var g=[];
var h=this.view.getSelectedIndexes();
if(h.length==0){return""
}for(var e=0;
e<h.length;
e++){g.push(this.store.getAt(h[e]).get((f!=null)?f:this.valueField))
}return g.join(this.delimiter)
},setValue:function(f){var e;
var g=[];
this.view.clearSelections();
this.hiddenField.dom.value="";
if(!f||(f=="")){return
}if(!Ext.isArray(f)){f=f.split(this.delimiter)
}for(var h=0;
h<f.length;
h++){e=this.view.store.indexOf(this.view.store.query(this.valueField,new RegExp("^"+f[h]+"$","i")).itemAt(0));
g.push(e)
}this.view.select(g);
this.hiddenField.dom.value=this.getValue();
this.validate()
},reset:function(){this.setValue("")
},getRawValue:function(d){var c=this.getValue(d);
if(c.length){c=c.split(this.delimiter)
}else{c=[]
}return c
},setRawValue:function(b){setValue(b)
},validateValue:function(b){if(b.length<1){if(this.allowBlank){this.clearInvalid();
return true
}else{this.markInvalid(this.blankText);
return false
}}if(b.length<this.minSelections){this.markInvalid(String.format(this.minSelectionsText,this.minSelections));
return false
}if(b.length>this.maxSelections){this.markInvalid(String.format(this.maxSelectionsText,this.maxSelections));
return false
}return true
},disable:function(){this.disabled=true;
this.hiddenField.dom.disabled=true;
this.fs.disable()
},enable:function(){this.disabled=false;
this.hiddenField.dom.disabled=false;
this.fs.enable()
},destroy:function(){Ext.destroy(this.fs,this.dragZone,this.dropZone);
Ext.ux.form.MultiSelect.superclass.destroy.call(this)
}});
Ext.reg("multiselect",Ext.ux.form.MultiSelect);
Ext.ux.Multiselect=Ext.ux.form.MultiSelect;
Ext.ux.form.MultiSelect.DragZone=function(g,h){this.ms=g;
this.view=g.view;
var e=h.ddGroup||"MultiselectDD";
var f;
if(Ext.isArray(e)){f=e.shift()
}else{f=e;
e=null
}Ext.ux.form.MultiSelect.DragZone.superclass.constructor.call(this,this.ms.fs.body,{containerScroll:true,ddGroup:f});
this.setDraggable(e)
};
Ext.extend(Ext.ux.form.MultiSelect.DragZone,Ext.dd.DragZone,{onInitDrag:function(e,f){var d=Ext.get(this.dragData.ddel.cloneNode(true));
this.proxy.update(d.dom);
d.setWidth(d.child("em").getWidth());
this.onStartDrag(e,f);
return true
},collectSelection:function(c){c.repairXY=Ext.fly(this.view.getSelectedNodes()[0]).getXY();
var d=0;
this.view.store.each(function(b){if(this.view.isSelected(d)){var a=this.view.getNode(d);
var f=a.cloneNode(true);
f.id=Ext.id();
c.ddel.appendChild(f);
c.records.push(this.view.store.getAt(d));
c.viewNodes.push(a)
}d++
},this)
},onEndDrag:function(e,d){var f=Ext.get(this.dragData.ddel);
if(f&&f.hasClass("multi-proxy")){f.remove()
}},getDragData:function(j){var k=this.view.findItemFromChild(j.getTarget());
if(k){if(!this.view.isSelected(k)&&!j.ctrlKey&&!j.shiftKey){this.view.select(k);
this.ms.setValue(this.ms.getValue())
}if(this.view.getSelectionCount()==0||j.ctrlKey||j.shiftKey){return false
}var e={sourceView:this.view,viewNodes:[],records:[]};
if(this.view.getSelectionCount()==1){var g=this.view.getSelectedIndexes()[0];
var h=this.view.getNode(g);
e.viewNodes.push(e.ddel=h);
e.records.push(this.view.store.getAt(g));
e.repairXY=Ext.fly(h).getXY()
}else{e.ddel=document.createElement("div");
e.ddel.className="multi-proxy";
this.collectSelection(e)
}return e
}return false
},getRepairXY:function(b){return this.dragData.repairXY
},setDraggable:function(b){if(!b){return
}if(Ext.isArray(b)){Ext.each(b,this.setDraggable,this);
return
}this.addToGroup(b)
}});
Ext.ux.form.MultiSelect.DropZone=function(g,h){this.ms=g;
this.view=g.view;
var e=h.ddGroup||"MultiselectDD";
var f;
if(Ext.isArray(e)){f=e.shift()
}else{f=e;
e=null
}Ext.ux.form.MultiSelect.DropZone.superclass.constructor.call(this,this.ms.fs.body,{containerScroll:true,ddGroup:f});
this.setDroppable(e)
};
Ext.extend(Ext.ux.form.MultiSelect.DropZone,Ext.dd.DropZone,{getTargetFromEvent:function(c){var d=c.getTarget();
return d
},getDropPoint:function(m,c,o){if(c==this.ms.fs.body.dom){return"below"
}var n=Ext.lib.Dom.getY(c),b=n+c.offsetHeight;
var e=n+(b-n)/2;
var l=Ext.lib.Event.getPageY(m);
if(l<=e){return"above"
}else{return"below"
}},isValidDropPoint:function(d,g,f){if(!f.viewNodes||(f.viewNodes.length!=1)){return true
}var h=f.viewNodes[0];
if(h==g){return false
}if((d=="below")&&(g.nextSibling==h)){return false
}if((d=="above")&&(g.previousSibling==h)){return false
}return true
},onNodeEnter:function(g,f,h,e){return false
},onNodeOver:function(k,j,l,n){var e=this.dropNotAllowed;
var m=this.getDropPoint(l,k,j);
if(this.isValidDropPoint(m,k,n)){if(this.ms.appendOnly){return"x-tree-drop-ok-below"
}if(m){var o;
if(m=="above"){e=k.previousSibling?"x-tree-drop-ok-between":"x-tree-drop-ok-above";
o="x-view-drag-insert-above"
}else{e=k.nextSibling?"x-tree-drop-ok-between":"x-tree-drop-ok-below";
o="x-view-drag-insert-below"
}if(this.lastInsertClass!=o){Ext.fly(k).replaceClass(this.lastInsertClass,o);
this.lastInsertClass=o
}}}return e
},onNodeOut:function(g,f,h,e){this.removeDropIndicators(g)
},onNodeDrop:function(t,m,n,p){if(this.ms.fireEvent("drop",this,t,m,n,p)===false){return false
}var e=this.getDropPoint(n,t,m);
if(t!=this.ms.fs.body.dom){t=this.view.findItemFromChild(t)
}var s=(this.ms.appendOnly||(t==this.ms.fs.body.dom))?this.view.store.getCount():this.view.indexOf(t);
if(e=="below"){s++
}var r=false;
if(p.sourceView==this.view){if(e=="below"){if(p.viewNodes[0]==t){p.viewNodes.shift()
}}else{if(p.viewNodes[p.viewNodes.length-1]==t){p.viewNodes.pop()
}}if(!p.viewNodes.length){return false
}if(s>this.view.store.indexOf(p.records[0])){r="down";
s--
}}for(var o=0;
o<p.records.length;
o++){var u=p.records[o];
if(p.sourceView){p.sourceView.store.remove(u)
}this.view.store.insert(r=="down"?s:s++,u);
var q=this.view.store.sortInfo;
if(q){this.view.store.sort(q.field,q.direction)
}}return true
},removeDropIndicators:function(b){if(b){Ext.fly(b).removeClass(["x-view-drag-insert-above","x-view-drag-insert-left","x-view-drag-insert-right","x-view-drag-insert-below"]);
this.lastInsertClass="_noclass"
}},setDroppable:function(b){if(!b){return
}if(Ext.isArray(b)){Ext.each(b,this.setDroppable,this);
return
}this.addToGroup(b)
}});
if(!Array.prototype.map){Array.prototype.map=function(f){var g=this.length;
if(typeof f!="function"){throw new TypeError()
}var h=new Array(g);
var j=arguments[1];
for(var k=0;
k<g;
k++){if(k in this){h[k]=f.call(j,this[k],k,this)
}}return h
}
}Ext.ns("Ext.ux.data");
Ext.ux.data.PagingMemoryProxy=Ext.extend(Ext.data.MemoryProxy,{constructor:function(b){Ext.ux.data.PagingMemoryProxy.superclass.constructor.call(this);
this.data=b
},doRequest:function(u,t,v,s,p,o,n){v=v||{};
var e;
try{e=s.readRecords(this.data)
}catch(r){this.fireEvent("loadexception",this,n,null,r);
p.call(o,null,n,false);
return
}if(v.filter!==undefined){e.records=e.records.filter(function(b){if(typeof(b)=="object"){var a=v.filterCol||0;
return String(b.data[a]).match(v.filter)?true:false
}else{return String(b).match(v.filter)?true:false
}});
e.totalRecords=e.records.length
}if(v.sort!==undefined){var w=String(v.dir).toUpperCase()=="DESC"?-1:1;
var q=function(b,a){return b>a?1:(b<a?-1:0)
};
e.records.sort(function(c,a){var b=0;
if(typeof(c)=="object"){b=q(c.data[v.sort],a.data[v.sort])*w
}else{b=q(c,a)*w
}if(b==0){b=(c.index<a.index?-1:1)
}return b
})
}if(v.start!==undefined&&v.limit!==undefined){e.records=e.records.slice(v.start,v.start+v.limit)
}p.call(o,e,n,true)
}});
Ext.data.PagingMemoryProxy=Ext.ux.data.PagingMemoryProxy;
Ext.ux.PanelResizer=Ext.extend(Ext.util.Observable,{minHeight:0,maxHeight:10000000,constructor:function(b){Ext.apply(this,b);
this.events={};
Ext.ux.PanelResizer.superclass.constructor.call(this,b)
},init:function(b){this.panel=b;
if(this.panel.elements.indexOf("footer")==-1){b.elements+=",footer"
}b.on("render",this.onRender,this)
},onRender:function(b){this.handle=b.footer.createChild({cls:"x-panel-resize"});
this.tracker=new Ext.dd.DragTracker({onStart:this.onDragStart.createDelegate(this),onDrag:this.onDrag.createDelegate(this),onEnd:this.onDragEnd.createDelegate(this),tolerance:3,autoStart:300});
this.tracker.initEl(this.handle);
b.on("beforedestroy",this.tracker.destroy,this.tracker)
},onDragStart:function(b){this.dragging=true;
this.startHeight=this.panel.el.getHeight();
this.fireEvent("dragstart",this,b)
},onDrag:function(b){this.panel.setHeight((this.startHeight-this.tracker.getOffset()[1]).constrain(this.minHeight,this.maxHeight));
this.fireEvent("drag",this,b)
},onDragEnd:function(b){this.dragging=false;
this.fireEvent("dragend",this,b)
}});
Ext.preg("panelresizer",Ext.ux.PanelResizer);
Ext.ux.Portal=Ext.extend(Ext.Panel,{layout:"column",autoScroll:true,cls:"x-portal",defaultType:"portalcolumn",initComponent:function(){Ext.ux.Portal.superclass.initComponent.call(this);
this.addEvents({validatedrop:true,beforedragover:true,dragover:true,beforedrop:true,drop:true})
},initEvents:function(){Ext.ux.Portal.superclass.initEvents.call(this);
this.dd=new Ext.ux.Portal.DropZone(this,this.dropConfig)
},beforeDestroy:function(){if(this.dd){this.dd.unreg()
}Ext.ux.Portal.superclass.beforeDestroy.call(this)
}});
Ext.reg("portal",Ext.ux.Portal);
Ext.ux.Portal.DropZone=function(d,c){this.portal=d;
Ext.dd.ScrollManager.register(d.body);
Ext.ux.Portal.DropZone.superclass.constructor.call(this,d.bwrap.dom,c);
d.body.ddScrollConfig=this.ddScrollConfig
};
Ext.extend(Ext.ux.Portal.DropZone,Ext.dd.DropTarget,{ddScrollConfig:{vthresh:50,hthresh:-1,animate:true,increment:200},createEvent:function(e,l,m,c,j,k){return{portal:this.portal,panel:m.panel,columnIndex:c,column:j,position:k,data:m,source:e,rawEvent:l,status:this.dropAllowed}
},notifyOver:function(e,p,c){var J=p.getXY(),M=this.portal,C=e.proxy;
if(!this.grid){this.grid=this.getGrid()
}var L=M.body.dom.clientWidth;
if(!this.lastCW){this.lastCW=L
}else{if(this.lastCW!=L){this.lastCW=L;
M.doLayout();
this.grid=this.getGrid()
}}var K=0,E=this.grid.columnX,D=false;
for(var y=E.length;
K<y;
K++){if(J[0]<(E[K].x+E[K].w)){D=true;
break
}}if(!D){K--
}var A,F=false,H=0,h=M.items.itemAt(K),B=h.items.items,G=false;
for(var y=B.length;
H<y;
H++){A=B[H];
var z=A.el.getHeight();
if(z===0){G=true
}else{if((A.el.getY()+(z/2))>J[1]){F=true;
break
}}}H=(F&&A?H:h.items.getCount())+(G?-1:0);
var I=this.createEvent(e,p,c,K,h,H);
if(M.fireEvent("validatedrop",I)!==false&&M.fireEvent("beforedragover",I)!==false){C.getProxy().setWidth("auto");
if(A){C.moveProxy(A.el.dom.parentNode,F?A.el.dom:null)
}else{C.moveProxy(h.el.dom,null)
}this.lastPos={c:h,col:K,p:G||(F&&A)?H:false};
this.scrollPos=M.body.getScroll();
M.fireEvent("dragover",I);
return I.status
}else{return I.status
}},notifyOut:function(){delete this.grid
},notifyDrop:function(d,p,q){delete this.grid;
if(!this.lastPos){return
}var n=this.lastPos.c,r=this.lastPos.col,e=this.lastPos.p;
var s=this.createEvent(d,p,q,r,n,e!==false?e:n.items.getCount());
if(this.portal.fireEvent("validatedrop",s)!==false&&this.portal.fireEvent("beforedrop",s)!==false){d.proxy.getProxy().remove();
d.panel.el.dom.parentNode.removeChild(d.panel.el.dom);
if(e!==false){if(n==d.panel.ownerCt&&(n.items.items.indexOf(d.panel)<=e)){e++
}n.insert(e,d.panel)
}else{n.add(d.panel)
}n.doLayout();
this.portal.fireEvent("drop",s);
var c=this.scrollPos.top;
if(c){var o=this.portal.body.dom;
setTimeout(function(){o.scrollTop=c
},10)
}}delete this.lastPos
},getGrid:function(){var b=this.portal.bwrap.getBox();
b.columnX=[];
this.portal.items.each(function(a){b.columnX.push({x:a.el.getX(),w:a.el.getWidth()})
});
return b
},unreg:function(){Ext.ux.Portal.DropZone.superclass.unreg.call(this)
}});
Ext.ux.PortalColumn=Ext.extend(Ext.Container,{layout:"anchor",defaultType:"portlet",cls:"x-portal-column"});
Ext.reg("portalcolumn",Ext.ux.PortalColumn);
Ext.ux.Portlet=Ext.extend(Ext.Panel,{anchor:"100%",frame:true,collapsible:true,draggable:true,cls:"x-portlet"});
Ext.reg("portlet",Ext.ux.Portlet);
Ext.ux.ProgressBarPager=Ext.extend(Object,{progBarWidth:225,defaultText:"Loading...",defaultAnimCfg:{duration:1,easing:"bounceOut"},constructor:function(b){if(b){Ext.apply(this,b)
}},init:function(d){if(d.displayInfo){this.parent=d;
var c=d.items.indexOf(d.displayItem);
d.remove(d.displayItem,true);
this.progressBar=new Ext.ProgressBar({text:this.defaultText,width:this.progBarWidth,animate:this.defaultAnimCfg});
d.displayItem=this.progressBar;
d.add(d.displayItem);
d.doLayout();
Ext.apply(d,this.parentOverrides);
this.progressBar.on("render",function(a){a.mon(a.getEl().applyStyles("cursor:pointer"),"click",this.handleProgressBarClick,this)
},this,{single:true})
}},handleProgressBarClick:function(l){var p=this.parent,q=p.displayItem,o=this.progressBar.getBox(),m=l.getXY(),e=m[0]-o.x,k=Math.ceil(p.store.getTotalCount()/p.pageSize),n=Math.ceil(e/(q.width/k));
p.changePage(n)
},parentOverrides:{updateInfo:function(){if(this.displayItem){var f=this.store.getCount(),g=this.getPageData(),j=this.readPage(g),h=f==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,this.cursor+f,this.store.getTotalCount());
j=g.activePage;
var k=j/g.pages;
this.displayItem.updateProgress(k,h,this.animate||this.defaultAnimConfig)
}}}});
Ext.preg("progressbarpager",Ext.ux.ProgressBarPager);
Ext.ns("Ext.ux.grid");
Ext.ux.grid.RowEditor=Ext.extend(Ext.Panel,{floating:true,shadow:false,layout:"hbox",cls:"x-small-editor",buttonAlign:"center",baseCls:"x-row-editor",elements:"header,footer,body",frameWidth:5,buttonPad:3,clicksToEdit:"auto",monitorValid:true,focusDelay:250,errorSummary:true,saveText:"Save",cancelText:"Cancel",commitChangesText:"You need to commit or cancel your changes",errorText:"Errors",defaults:{normalWidth:true},initComponent:function(){Ext.ux.grid.RowEditor.superclass.initComponent.call(this);
this.addEvents("beforeedit","canceledit","validateedit","afteredit")
},init:function(b){this.grid=b;
this.ownerCt=b;
if(this.clicksToEdit===2){b.on("rowdblclick",this.onRowDblClick,this)
}else{b.on("rowclick",this.onRowClick,this);
if(Ext.isIE){b.on("rowdblclick",this.onRowDblClick,this)
}}b.getStore().on("remove",function(){this.stopEditing(false)
},this);
b.on({scope:this,keydown:this.onGridKey,columnresize:this.verifyLayout,columnmove:this.refreshFields,reconfigure:this.refreshFields,beforedestroy:this.beforedestroy,destroy:this.destroy,bodyscroll:{buffer:250,fn:this.positionButtons}});
b.getColumnModel().on("hiddenchange",this.verifyLayout,this,{delay:1});
b.getView().on("refresh",this.stopEditing.createDelegate(this,[]))
},beforedestroy:function(){this.grid.getStore().un("remove",this.onStoreRemove,this);
this.stopEditing(false);
Ext.destroy(this.btns)
},refreshFields:function(){this.initFields();
this.verifyLayout()
},isDirty:function(){var b;
this.items.each(function(a){if(String(this.values[a.id])!==String(a.getValue())){b=true;
return false
}},this);
return b
},startEditing:function(t,f){if(this.editing&&this.isDirty()){this.showTooltip(this.commitChangesText);
return
}if(Ext.isObject(t)){t=this.grid.getStore().indexOf(t)
}if(this.fireEvent("beforeedit",this,t)!==false){this.editing=true;
var w=this.grid,s=w.getView(),g=s.getRow(t),y=w.store.getAt(t);
this.record=y;
this.rowIndex=t;
this.values={};
if(!this.rendered){this.render(s.getEditorParent())
}var r=Ext.fly(g).getWidth();
this.setSize(r);
if(!this.initialized){this.initFields()
}var q=w.getColumnModel(),x=this.items.items,u,A;
for(var z=0,v=q.getColumnCount();
z<v;
z++){A=this.preEditValue(y,q.getDataIndex(z));
u=x[z];
u.setValue(A);
this.values[u.id]=Ext.isEmpty(A)?"":A
}this.verifyLayout(true);
if(!this.isVisible()){this.setPagePosition(Ext.fly(g).getXY())
}else{this.el.setXY(Ext.fly(g).getXY(),{duration:0.15})
}if(!this.isVisible()){this.show().doLayout()
}if(f!==false){this.doFocus.defer(this.focusDelay,this)
}}},stopEditing:function(m){this.editing=false;
if(!this.isVisible()){return
}if(m===false||!this.isValid()){this.hide();
this.fireEvent("canceledit",this,m===false);
return
}var q={},v=this.record,p=false,n=this.grid.colModel,s=this.items.items;
for(var t=0,r=n.getColumnCount();
t<r;
t++){if(!n.isHidden(t)){var u=n.getDataIndex(t);
if(!Ext.isEmpty(u)){var w=v.data[u],o=this.postEditValue(s[t].getValue(),w,v,u);
if(String(w)!==String(o)){q[u]=o;
p=true
}}}}if(p&&this.fireEvent("validateedit",this,q,v,this.rowIndex)!==false){v.beginEdit();
Ext.iterate(q,function(a,b){v.set(a,b)
});
v.endEdit();
this.fireEvent("afteredit",this,q,v,this.rowIndex)
}this.hide()
},verifyLayout:function(m){if(this.el&&(this.isVisible()||m===true)){var k=this.grid.getView().getRow(this.rowIndex);
this.setSize(Ext.fly(k).getWidth(),Ext.fly(k).getHeight()+9);
var o=this.grid.colModel,h=this.items.items;
for(var n=0,j=o.getColumnCount();
n<j;
n++){if(!o.isHidden(n)){var l=0;
if(n===(j-1)){l+=3
}else{l+=1
}h[n].show();
h[n].setWidth(o.getColumnWidth(n)-l)
}else{h[n].hide()
}}this.doLayout();
this.positionButtons()
}},slideHide:function(){this.hide()
},initFields:function(){var c=this.grid.getColumnModel(),k=Ext.layout.ContainerLayout.prototype.parseMargins;
this.removeAll(false);
for(var l=0,h=c.getColumnCount();
l<h;
l++){var j=c.getColumnAt(l),m=j.getEditor();
if(!m){m=j.displayEditor||new Ext.form.DisplayField()
}if(l==0){m.margins=k("0 1 2 1")
}else{if(l==h-1){m.margins=k("0 0 2 1")
}else{m.margins=k("0 1 2")
}}m.setWidth(c.getColumnWidth(l));
m.column=j;
if(m.ownerCt!==this){m.on("focus",this.ensureVisible,this);
m.on("specialkey",this.onKey,this)
}this.insert(l,m)
}this.initialized=true
},onKey:function(d,c){if(c.getKey()===c.ENTER){this.stopEditing(true);
c.stopPropagation()
}},onGridKey:function(f){if(f.getKey()===f.ENTER&&!this.isVisible()){var d=this.grid.getSelectionModel().getSelected();
if(d){var e=this.grid.store.indexOf(d);
this.startEditing(e);
f.stopPropagation()
}}},ensureVisible:function(b){if(this.isVisible()){this.grid.getView().ensureVisible(this.rowIndex,this.grid.colModel.getIndexById(b.column.id),true)
}},onRowClick:function(e,g,h){if(this.clicksToEdit=="auto"){var f=this.lastClickIndex;
this.lastClickIndex=g;
if(f!=g&&!this.isVisible()){return
}}this.startEditing(g,false);
this.doFocus.defer(this.focusDelay,this,[h.getPoint()])
},onRowDblClick:function(e,f,d){this.startEditing(f,false);
this.doFocus.defer(this.focusDelay,this,[d.getPoint()])
},onRender:function(){Ext.ux.grid.RowEditor.superclass.onRender.apply(this,arguments);
this.el.swallowEvent(["keydown","keyup","keypress"]);
this.btns=new Ext.Panel({baseCls:"x-plain",cls:"x-btns",elements:"body",layout:"table",width:(this.minButtonWidth*2)+(this.frameWidth*2)+(this.buttonPad*4),items:[{ref:"saveBtn",itemId:"saveBtn",xtype:"button",text:this.saveText,width:this.minButtonWidth,handler:this.stopEditing.createDelegate(this,[true])},{xtype:"button",text:this.cancelText,width:this.minButtonWidth,handler:this.stopEditing.createDelegate(this,[false])}]});
this.btns.render(this.bwrap)
},afterRender:function(){Ext.ux.grid.RowEditor.superclass.afterRender.apply(this,arguments);
this.positionButtons();
if(this.monitorValid){this.startMonitoring()
}},onShow:function(){if(this.monitorValid){this.startMonitoring()
}Ext.ux.grid.RowEditor.superclass.onShow.apply(this,arguments)
},onHide:function(){Ext.ux.grid.RowEditor.superclass.onHide.apply(this,arguments);
this.stopMonitoring();
this.grid.getView().focusRow(this.rowIndex)
},positionButtons:function(){if(this.btns){var k=this.grid,l=this.el.dom.clientHeight,g=k.getView(),h=g.scroller.dom.scrollLeft,j=this.btns.getWidth(),m=Math.min(k.getWidth(),k.getColumnModel().getTotalWidth());
this.btns.el.shift({left:(m/2)-(j/2)+h,top:l-2,stopFx:true,duration:0.2})
}},preEditValue:function(e,f){var d=e.data[f];
return this.autoEncode&&typeof d==="string"?Ext.util.Format.htmlDecode(d):d
},postEditValue:function(h,f,e,g){return this.autoEncode&&typeof h=="string"?Ext.util.Format.htmlEncode(h):h
},doFocus:function(k){if(this.isVisible()){var m=0,c=this.grid.getColumnModel(),j;
if(k){m=this.getTargetColumnIndex(k)
}for(var l=m||0,h=c.getColumnCount();
l<h;
l++){j=c.getColumnAt(l);
if(!j.hidden&&j.getEditor()){j.getEditor().focus();
break
}}}},getTargetColumnIndex:function(c){var s=this.grid,l=s.view,m=c.left,o=s.colModel.config,r=0,q=false;
for(var p=o.length,n;
n=o[r];
r++){if(!n.hidden){if(Ext.fly(l.getHeaderCell(r)).getRegion().right>=m){q=r;
break
}}}return q
},startMonitoring:function(){if(!this.bound&&this.monitorValid){this.bound=true;
Ext.TaskMgr.start({run:this.bindHandler,interval:this.monitorPoll||200,scope:this})
}},stopMonitoring:function(){this.bound=false;
if(this.tooltip){this.tooltip.hide()
}},isValid:function(){var b=true;
this.items.each(function(a){if(!a.isValid(true)){b=false;
return false
}});
return b
},bindHandler:function(){if(!this.bound){return false
}var b=this.isValid();
if(!b&&this.errorSummary){this.showTooltip(this.getErrorText().join(""))
}this.btns.saveBtn.setDisabled(!b);
this.fireEvent("validation",this,b)
},showTooltip:function(j){var m=this.tooltip;
if(!m){m=this.tooltip=new Ext.ToolTip({maxWidth:600,cls:"errorTip",width:300,title:this.errorText,autoHide:false,anchor:"left",anchorToTarget:true,mouseOffset:[40,0]})
}var g=this.grid.getView(),k=parseInt(this.el.dom.style.top,10),h=g.scroller.dom.scrollTop,l=this.el.getHeight();
if(k+l>=h){m.initTarget(this.items.last().getEl());
if(!m.rendered){m.show();
m.hide()
}m.body.update(j);
m.doAutoWidth(20);
m.show()
}else{if(m.rendered){m.hide()
}}},getErrorText:function(){var b=["<ul>"];
this.items.each(function(a){if(!a.isValid(true)){b.push("<li>",a.getActiveError(),"</li>")
}});
b.push("</ul>");
return b
}});
Ext.preg("roweditor",Ext.ux.grid.RowEditor);
Ext.ns("Ext.ux.grid");
Ext.ux.grid.RowExpander=Ext.extend(Ext.util.Observable,{expandOnEnter:true,expandOnDblClick:true,header:"",width:20,sortable:false,fixed:true,menuDisabled:true,dataIndex:"",id:"expander",lazyRender:true,enableCaching:true,constructor:function(b){Ext.apply(this,b);
this.addEvents({beforeexpand:true,expand:true,beforecollapse:true,collapse:true});
Ext.ux.grid.RowExpander.superclass.constructor.call(this);
if(this.tpl){if(typeof this.tpl=="string"){this.tpl=new Ext.Template(this.tpl)
}this.tpl.compile()
}this.state={};
this.bodyContent={}
},getRowClass:function(g,h,j,k){j.cols=j.cols-1;
var f=this.bodyContent[g.id];
if(!f&&!this.lazyRender){f=this.getBodyContent(g,h)
}if(f){j.body=f
}return this.state[g.id]?"x-grid3-row-expanded":"x-grid3-row-collapsed"
},init:function(c){this.grid=c;
var d=c.getView();
d.getRowClass=this.getRowClass.createDelegate(this);
d.enableRowBody=true;
c.on("render",this.onRender,this);
c.on("destroy",this.onDestroy,this)
},onRender:function(){var d=this.grid;
var c=d.getView().mainBody;
c.on("mousedown",this.onMouseDown,this,{delegate:".x-grid3-row-expander"});
if(this.expandOnEnter){this.keyNav=new Ext.KeyNav(this.grid.getGridEl(),{enter:this.onEnter,scope:this})
}if(this.expandOnDblClick){d.on("rowdblclick",this.onRowDblClick,this)
}},onDestroy:function(){if(this.keyNav){this.keyNav.disable();
delete this.keyNav
}var b=this.grid.getView().mainBody;
if(b){b.un("mousedown",this.onMouseDown,this)
}},onRowDblClick:function(e,d,f){this.toggleRow(d)
},onEnter:function(l){var m=this.grid;
var k=m.getSelectionModel();
var e=k.getSelections();
for(var o=0,g=e.length;
o<g;
o++){var n=m.getStore().indexOf(e[o]);
this.toggleRow(n)
}},getBodyContent:function(e,d){if(!this.enableCaching){return this.tpl.apply(e.data)
}var f=this.bodyContent[e.id];
if(!f){f=this.tpl.apply(e.data);
this.bodyContent[e.id]=f
}return f
},onMouseDown:function(d,e){d.stopEvent();
var f=d.getTarget(".x-grid3-row");
this.toggleRow(f)
},renderer:function(d,f,e){f.cellAttr='rowspan="2"';
return'<div class="x-grid3-row-expander">&#160;</div>'
},beforeExpand:function(d,e,f){if(this.fireEvent("beforeexpand",this,d,e,f)!==false){if(this.tpl&&this.lazyRender){e.innerHTML=this.getBodyContent(d,f)
}return true
}else{return false
}},toggleRow:function(b){if(typeof b=="number"){b=this.grid.view.getRow(b)
}this[Ext.fly(b).hasClass("x-grid3-row-collapsed")?"expandRow":"collapseRow"](b)
},expandRow:function(f){if(typeof f=="number"){f=this.grid.view.getRow(f)
}var d=this.grid.store.getAt(f.rowIndex);
var e=Ext.DomQuery.selectNode("tr:nth(2) div.x-grid3-row-body",f);
if(this.beforeExpand(d,e,f.rowIndex)){this.state[d.id]=true;
Ext.fly(f).replaceClass("x-grid3-row-collapsed","x-grid3-row-expanded");
this.fireEvent("expand",this,d,e,f.rowIndex)
}},collapseRow:function(f){if(typeof f=="number"){f=this.grid.view.getRow(f)
}var d=this.grid.store.getAt(f.rowIndex);
var e=Ext.fly(f).child("tr:nth(1) div.x-grid3-row-body",true);
if(this.fireEvent("beforecollapse",this,d,e,f.rowIndex)!==false){this.state[d.id]=false;
Ext.fly(f).replaceClass("x-grid3-row-expanded","x-grid3-row-collapsed");
this.fireEvent("collapse",this,d,e,f.rowIndex)
}}});
Ext.preg("rowexpander",Ext.ux.grid.RowExpander);
Ext.grid.RowExpander=Ext.ux.grid.RowExpander;
Ext.ns("Ext.ux.layout");
Ext.ux.layout.RowLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,isValidParent:function(c,d){return c.getEl().dom.parentNode==this.innerCt.dom
},onLayout:function(n,l){var r=n.items.items,m=r.length,s,q;
if(!this.innerCt){l.addClass("ux-row-layout-ct");
this.innerCt=l.createChild({cls:"x-row-inner"})
}this.renderAll(n,this.innerCt);
var h=l.getViewSize(true);
if(h.width<1&&h.height<1){return
}var p=h.height,o=p;
this.innerCt.setSize({height:p});
for(q=0;
q<m;
q++){s=r[q];
if(!s.rowHeight){o-=(s.getSize().height+s.getEl().getMargins("tb"))
}}o=o<0?0:o;
for(q=0;
q<m;
q++){s=r[q];
if(s.rowHeight){s.setSize({height:Math.floor(s.rowHeight*o)-s.getEl().getMargins("tb")})
}}}});
Ext.Container.LAYOUTS["ux.row"]=Ext.ux.layout.RowLayout;
Ext.ns("Ext.ux.form");
Ext.ux.form.SearchField=Ext.extend(Ext.form.TwinTriggerField,{initComponent:function(){Ext.ux.form.SearchField.superclass.initComponent.call(this);
this.on("specialkey",function(d,c){if(c.getKey()==c.ENTER){this.onTrigger2Click()
}},this)
},validationEvent:false,validateOnBlur:false,trigger1Class:"x-form-clear-trigger",trigger2Class:"x-form-search-trigger",hideTrigger1:true,width:180,hasSearch:false,paramName:"query",onTrigger1Click:function(){if(this.hasSearch){this.el.dom.value="";
var b={start:0};
this.store.baseParams=this.store.baseParams||{};
this.store.baseParams[this.paramName]="";
this.store.reload({params:b});
this.triggers[0].hide();
this.hasSearch=false
}},onTrigger2Click:function(){var d=this.getRawValue();
if(d.length<1){this.onTrigger1Click();
return
}var c={start:0};
this.store.baseParams=this.store.baseParams||{};
this.store.baseParams[this.paramName]=d;
this.store.reload({params:c});
this.hasSearch=true;
this.triggers[0].show()
}});
Ext.ns("Ext.ux.form");
Ext.ux.form.SelectBox=Ext.extend(Ext.form.ComboBox,{constructor:function(b){this.searchResetDelay=1000;
b=b||{};
b=Ext.apply(b||{},{editable:false,forceSelection:true,rowHeight:false,lastSearchTerm:false,triggerAction:"all",mode:"local"});
Ext.ux.form.SelectBox.superclass.constructor.apply(this,arguments);
this.lastSelectedIndex=this.selectedIndex||0
},initEvents:function(){Ext.ux.form.SelectBox.superclass.initEvents.apply(this,arguments);
this.el.on("keydown",this.keySearch,this,true);
this.cshTask=new Ext.util.DelayedTask(this.clearSearchHistory,this)
},keySearch:function(k,l,e){var h=k.getKey();
var m=String.fromCharCode(h);
var j=0;
if(!this.store.getCount()){return
}switch(h){case Ext.EventObject.HOME:k.stopEvent();
this.selectFirst();
return;
case Ext.EventObject.END:k.stopEvent();
this.selectLast();
return;
case Ext.EventObject.PAGEDOWN:this.selectNextPage();
k.stopEvent();
return;
case Ext.EventObject.PAGEUP:this.selectPrevPage();
k.stopEvent();
return
}if((k.hasModifier()&&!k.shiftKey)||k.isNavKeyPress()||k.isSpecialKey()){return
}if(this.lastSearchTerm==m){j=this.lastSelectedIndex
}this.search(this.displayField,m,j);
this.cshTask.delay(this.searchResetDelay)
},onRender:function(c,d){this.store.on("load",this.calcRowsPerPage,this);
Ext.ux.form.SelectBox.superclass.onRender.apply(this,arguments);
if(this.mode=="local"){this.initList();
this.calcRowsPerPage()
}},onSelect:function(e,f,d){if(this.fireEvent("beforeselect",this,e,f)!==false){this.setValue(e.data[this.valueField||this.displayField]);
if(!d){this.collapse()
}this.lastSelectedIndex=f+1;
this.fireEvent("select",this,e,f)
}},afterRender:function(){Ext.ux.form.SelectBox.superclass.afterRender.apply(this,arguments);
if(Ext.isWebKit){this.el.swallowEvent("mousedown",true)
}this.el.unselectable();
this.innerList.unselectable();
this.trigger.unselectable();
this.innerList.on("mouseup",function(f,d,e){if(d.id&&d.id==this.innerList.id){return
}this.onViewClick()
},this);
this.innerList.on("mouseover",function(f,d,e){if(d.id&&d.id==this.innerList.id){return
}this.lastSelectedIndex=this.view.getSelectedIndexes()[0]+1;
this.cshTask.delay(this.searchResetDelay)
},this);
this.trigger.un("click",this.onTriggerClick,this);
this.trigger.on("mousedown",function(f,d,e){f.preventDefault();
this.onTriggerClick()
},this);
this.on("collapse",function(f,d,e){Ext.getDoc().un("mouseup",this.collapseIf,this)
},this,true);
this.on("expand",function(f,d,e){Ext.getDoc().on("mouseup",this.collapseIf,this)
},this,true)
},clearSearchHistory:function(){this.lastSelectedIndex=0;
this.lastSearchTerm=false
},selectFirst:function(){this.focusAndSelect(this.store.data.first())
},selectLast:function(){this.focusAndSelect(this.store.data.last())
},selectPrevPage:function(){if(!this.rowHeight){return
}var b=Math.max(this.selectedIndex-this.rowsPerPage,0);
this.focusAndSelect(this.store.getAt(b))
},selectNextPage:function(){if(!this.rowHeight){return
}var b=Math.min(this.selectedIndex+this.rowsPerPage,this.store.getCount()-1);
this.focusAndSelect(this.store.getAt(b))
},search:function(h,e,g){h=h||this.displayField;
this.lastSearchTerm=e;
var f=this.store.find.apply(this.store,arguments);
if(f!==-1){this.focusAndSelect(f)
}},focusAndSelect:function(d){var c=Ext.isNumber(d)?d:this.store.indexOf(d);
this.select(c,this.isExpanded());
this.onSelect(this.store.getAt(c),c,this.isExpanded())
},calcRowsPerPage:function(){if(this.store.getCount()){this.rowHeight=Ext.fly(this.view.getNode(0)).getHeight();
this.rowsPerPage=this.maxHeight/this.rowHeight
}else{this.rowHeight=false
}}});
Ext.reg("selectbox",Ext.ux.form.SelectBox);
Ext.ux.SelectBox=Ext.ux.form.SelectBox;
Ext.ux.SliderTip=Ext.extend(Ext.Tip,{minWidth:10,offsets:[0,-10],init:function(b){b.on("dragstart",this.onSlide,this);
b.on("drag",this.onSlide,this);
b.on("dragend",this.hide,this);
b.on("destroy",this.destroy,this)
},onSlide:function(b){this.show();
this.body.update(this.getText(b));
this.doAutoWidth();
this.el.alignTo(b.thumb,"b-t?",this.offsets)
},getText:function(b){return String(b.getValue())
}});
Ext.ux.SlidingPager=Ext.extend(Object,{init:function(d){Ext.each(d.items.getRange(2,6),function(a){a.hide()
});
var c=new Ext.Slider({width:114,minValue:1,maxValue:1,plugins:new Ext.ux.SliderTip({getText:function(a){return String.format("Page <b>{0}</b> of <b>{1}</b>",a.value,a.maxValue)
}}),listeners:{changecomplete:function(a,b){d.changePage(b)
}}});
d.insert(5,c);
d.on({change:function(b,a){c.maxValue=a.pages;
c.setValue(a.activePage)
},beforedestroy:function(){c.destroy()
}})
}});
Ext.ns("Ext.ux.form");
Ext.ux.form.SpinnerField=Ext.extend(Ext.form.NumberField,{actionMode:"wrap",deferHeight:true,autoSize:Ext.emptyFn,onBlur:Ext.emptyFn,adjustSize:Ext.BoxComponent.prototype.adjustSize,constructor:function(h){var e=Ext.copyTo({},h,"incrementValue,alternateIncrementValue,accelerate,defaultValue,triggerClass,splitterClass");
var g=this.spinner=new Ext.ux.Spinner(e);
var f=h.plugins?(Ext.isArray(h.plugins)?h.plugins.push(g):[h.plugins,g]):g;
Ext.ux.form.SpinnerField.superclass.constructor.call(this,Ext.apply(h,{plugins:f}))
},getResizeEl:function(){return this.wrap
},getPositionEl:function(){return this.wrap
},alignErrorIcon:function(){if(this.wrap){this.errorIcon.alignTo(this.wrap,"tl-tr",[2,0])
}},validateBlur:function(){return true
}});
Ext.reg("spinnerfield",Ext.ux.form.SpinnerField);
Ext.form.SpinnerField=Ext.ux.form.SpinnerField;
Ext.ux.Spinner=Ext.extend(Ext.util.Observable,{incrementValue:1,alternateIncrementValue:5,triggerClass:"x-form-spinner-trigger",splitterClass:"x-form-spinner-splitter",alternateKey:Ext.EventObject.shiftKey,defaultValue:0,accelerate:false,constructor:function(b){Ext.ux.Spinner.superclass.constructor.call(this,b);
Ext.apply(this,b);
this.mimicing=false
},init:function(b){this.field=b;
b.afterMethod("onRender",this.doRender,this);
b.afterMethod("onEnable",this.doEnable,this);
b.afterMethod("onDisable",this.doDisable,this);
b.afterMethod("afterRender",this.doAfterRender,this);
b.afterMethod("onResize",this.doResize,this);
b.afterMethod("onFocus",this.doFocus,this);
b.beforeMethod("onDestroy",this.doDestroy,this)
},doRender:function(e,f){var h=this.el=this.field.getEl();
var g=this.field;
if(!g.wrap){g.wrap=this.wrap=h.wrap({cls:"x-form-field-wrap"})
}else{this.wrap=g.wrap.addClass("x-form-field-wrap")
}this.trigger=this.wrap.createChild({tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.triggerClass});
if(!g.width){this.wrap.setWidth(h.getWidth()+this.trigger.getWidth())
}this.splitter=this.wrap.createChild({tag:"div",cls:this.splitterClass,style:"width:13px; height:2px;"});
this.splitter.setRight((Ext.isIE)?1:2).setTop(10).show();
this.proxy=this.trigger.createProxy("",this.splitter,true);
this.proxy.addClass("x-form-spinner-proxy");
this.proxy.setStyle("left","0px");
this.proxy.setSize(14,1);
this.proxy.hide();
this.dd=new Ext.dd.DDProxy(this.splitter.dom.id,"SpinnerDrag",{dragElId:this.proxy.id});
this.initTrigger();
this.initSpinner()
},doAfterRender:function(){var b;
if(Ext.isIE&&this.el.getY()!=(b=this.trigger.getY())){this.el.position();
this.el.setY(b)
}},doEnable:function(){if(this.wrap){this.wrap.removeClass(this.field.disabledClass)
}},doDisable:function(){if(this.wrap){this.wrap.addClass(this.field.disabledClass);
this.el.removeClass(this.field.disabledClass)
}},doResize:function(d,c){if(typeof d=="number"){this.el.setWidth(d-this.trigger.getWidth())
}this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth())
},doFocus:function(){if(!this.mimicing){this.wrap.addClass("x-trigger-wrap-focus");
this.mimicing=true;
Ext.get(Ext.isIE?document.body:document).on("mousedown",this.mimicBlur,this,{delay:10});
this.el.on("keydown",this.checkTab,this)
}},checkTab:function(b){if(b.getKey()==b.TAB){this.triggerBlur()
}},mimicBlur:function(b){if(!this.wrap.contains(b.target)&&this.field.validateBlur(b)){this.triggerBlur()
}},triggerBlur:function(){this.mimicing=false;
Ext.get(Ext.isIE?document.body:document).un("mousedown",this.mimicBlur,this);
this.el.un("keydown",this.checkTab,this);
this.field.beforeBlur();
this.wrap.removeClass("x-trigger-wrap-focus");
this.field.onBlur.call(this.field)
},initTrigger:function(){this.trigger.addClassOnOver("x-form-trigger-over");
this.trigger.addClassOnClick("x-form-trigger-click")
},initSpinner:function(){this.field.addEvents({spin:true,spinup:true,spindown:true});
this.keyNav=new Ext.KeyNav(this.el,{up:function(b){b.preventDefault();
this.onSpinUp()
},down:function(b){b.preventDefault();
this.onSpinDown()
},pageUp:function(b){b.preventDefault();
this.onSpinUpAlternate()
},pageDown:function(b){b.preventDefault();
this.onSpinDownAlternate()
},scope:this});
this.repeater=new Ext.util.ClickRepeater(this.trigger,{accelerate:this.accelerate});
this.field.mon(this.repeater,"click",this.onTriggerClick,this,{preventDefault:true});
this.field.mon(this.trigger,{mouseover:this.onMouseOver,mouseout:this.onMouseOut,mousemove:this.onMouseMove,mousedown:this.onMouseDown,mouseup:this.onMouseUp,scope:this,preventDefault:true});
this.field.mon(this.wrap,"mousewheel",this.handleMouseWheel,this);
this.dd.setXConstraint(0,0,10);
this.dd.setYConstraint(1500,1500,10);
this.dd.endDrag=this.endDrag.createDelegate(this);
this.dd.startDrag=this.startDrag.createDelegate(this);
this.dd.onDrag=this.onDrag.createDelegate(this)
},onMouseOver:function(){if(this.disabled){return
}var b=this.getMiddle();
this.tmpHoverClass=(Ext.EventObject.getPageY()<b)?"x-form-spinner-overup":"x-form-spinner-overdown";
this.trigger.addClass(this.tmpHoverClass)
},onMouseOut:function(){this.trigger.removeClass(this.tmpHoverClass)
},onMouseMove:function(){if(this.disabled){return
}var b=this.getMiddle();
if(((Ext.EventObject.getPageY()>b)&&this.tmpHoverClass=="x-form-spinner-overup")||((Ext.EventObject.getPageY()<b)&&this.tmpHoverClass=="x-form-spinner-overdown")){}},onMouseDown:function(){if(this.disabled){return
}var b=this.getMiddle();
this.tmpClickClass=(Ext.EventObject.getPageY()<b)?"x-form-spinner-clickup":"x-form-spinner-clickdown";
this.trigger.addClass(this.tmpClickClass)
},onMouseUp:function(){this.trigger.removeClass(this.tmpClickClass)
},onTriggerClick:function(){if(this.disabled||this.el.dom.readOnly){return
}var c=this.getMiddle();
var d=(Ext.EventObject.getPageY()<c)?"Up":"Down";
this["onSpin"+d]()
},getMiddle:function(){var d=this.trigger.getTop();
var f=this.trigger.getHeight();
var e=d+(f/2);
return e
},isSpinnable:function(){if(this.disabled||this.el.dom.readOnly){Ext.EventObject.preventDefault();
return false
}return true
},handleMouseWheel:function(d){if(this.wrap.hasClass("x-trigger-wrap-focus")==false){return
}var c=d.getWheelDelta();
if(c>0){this.onSpinUp();
d.stopEvent()
}else{if(c<0){this.onSpinDown();
d.stopEvent()
}}},startDrag:function(){this.proxy.show();
this._previousY=Ext.fly(this.dd.getDragEl()).getTop()
},endDrag:function(){this.proxy.hide()
},onDrag:function(){if(this.disabled){return
}var c=Ext.fly(this.dd.getDragEl()).getTop();
var d="";
if(this._previousY>c){d="Up"
}if(this._previousY<c){d="Down"
}if(d!=""){this["onSpin"+d]()
}this._previousY=c
},onSpinUp:function(){if(this.isSpinnable()==false){return
}if(Ext.EventObject.shiftKey==true){this.onSpinUpAlternate();
return
}else{this.spin(false,false)
}this.field.fireEvent("spin",this);
this.field.fireEvent("spinup",this)
},onSpinDown:function(){if(this.isSpinnable()==false){return
}if(Ext.EventObject.shiftKey==true){this.onSpinDownAlternate();
return
}else{this.spin(true,false)
}this.field.fireEvent("spin",this);
this.field.fireEvent("spindown",this)
},onSpinUpAlternate:function(){if(this.isSpinnable()==false){return
}this.spin(false,true);
this.field.fireEvent("spin",this);
this.field.fireEvent("spinup",this)
},onSpinDownAlternate:function(){if(this.isSpinnable()==false){return
}this.spin(true,true);
this.field.fireEvent("spin",this);
this.field.fireEvent("spindown",this)
},spin:function(g,e){var f=parseFloat(this.field.getValue());
var h=(e==true)?this.alternateIncrementValue:this.incrementValue;
(g==true)?f-=h:f+=h;
f=(isNaN(f))?this.defaultValue:f;
f=this.fixBoundries(f);
this.field.setRawValue(f)
},fixBoundries:function(c){var d=c;
if(this.field.minValue!=undefined&&d<this.field.minValue){d=this.field.minValue
}if(this.field.maxValue!=undefined&&d>this.field.maxValue){d=this.field.maxValue
}return this.fixPrecision(d)
},fixPrecision:function(c){var d=isNaN(c);
if(!this.field.allowDecimals||this.field.decimalPrecision==-1||d||!c){return d?"":c
}return parseFloat(parseFloat(c).toFixed(this.field.decimalPrecision))
},doDestroy:function(){if(this.trigger){this.trigger.remove()
}if(this.wrap){this.wrap.remove();
delete this.field.wrap
}if(this.splitter){this.splitter.remove()
}if(this.dd){this.dd.unreg();
this.dd=null
}if(this.proxy){this.proxy.remove()
}if(this.repeater){this.repeater.purgeListeners()
}}});
Ext.form.Spinner=Ext.ux.Spinner;
Ext.ux.Spotlight=function(b){Ext.apply(this,b)
};
Ext.ux.Spotlight.prototype={active:false,animate:true,duration:0.25,easing:"easeNone",animated:false,createElements:function(){var b=Ext.getBody();
this.right=b.createChild({cls:"x-spotlight"});
this.left=b.createChild({cls:"x-spotlight"});
this.top=b.createChild({cls:"x-spotlight"});
this.bottom=b.createChild({cls:"x-spotlight"});
this.all=new Ext.CompositeElement([this.right,this.left,this.top,this.bottom])
},show:function(d,f,e){if(this.animated){this.show.defer(50,this,[d,f,e]);
return
}this.el=Ext.get(d);
if(!this.right){this.createElements()
}if(!this.active){this.all.setDisplayed("");
this.applyBounds(true,false);
this.active=true;
Ext.EventManager.onWindowResize(this.syncSize,this);
this.applyBounds(false,this.animate,false,f,e)
}else{this.applyBounds(false,false,false,f,e)
}},hide:function(c,d){if(this.animated){this.hide.defer(50,this,[c,d]);
return
}Ext.EventManager.removeResizeListener(this.syncSize,this);
this.applyBounds(true,this.animate,true,c,d)
},doHide:function(){this.active=false;
this.all.setDisplayed(false)
},syncSize:function(){this.applyBounds(false,false)
},applyBounds:function(r,s,m,n,c){var o=this.el.getRegion();
var u=Ext.lib.Dom.getViewWidth(true);
var p=Ext.lib.Dom.getViewHeight(true);
var q=0,t=false;
if(s){t={callback:function(){q++;
if(q==4){this.animated=false;
if(m){this.doHide()
}Ext.callback(n,c,[this])
}},scope:this,duration:this.duration,easing:this.easing};
this.animated=true
}this.right.setBounds(o.right,r?p:o.top,u-o.right,r?0:(p-o.top),t);
this.left.setBounds(0,0,o.left,r?0:o.bottom,t);
this.top.setBounds(r?u:o.left,0,r?0:u-o.left,o.top,t);
this.bottom.setBounds(0,o.bottom,r?0:o.right,p-o.bottom,t);
if(!s){if(m){this.doHide()
}if(n){Ext.callback(n,c,[this])
}}},destroy:function(){this.doHide();
Ext.destroy(this.right,this.left,this.top,this.bottom);
delete this.el;
delete this.all
}};
Ext.Spotlight=Ext.ux.Spotlight;
Ext.ux.StatusBar=Ext.extend(Ext.Toolbar,{cls:"x-statusbar",busyIconCls:"x-status-busy",busyText:"Loading...",autoClear:5000,emptyText:"&nbsp;",activeThreadId:0,initComponent:function(){if(this.statusAlign=="right"){this.cls+=" x-status-right"
}Ext.ux.StatusBar.superclass.initComponent.call(this)
},afterRender:function(){Ext.ux.StatusBar.superclass.afterRender.call(this);
var b=this.statusAlign=="right";
this.currIconCls=this.iconCls||this.defaultIconCls;
this.statusEl=new Ext.Toolbar.TextItem({cls:"x-status-text "+(this.currIconCls||""),text:this.text||this.defaultText||""});
if(b){this.add("->");
this.add(this.statusEl)
}else{this.insert(0,this.statusEl);
this.insert(1,"->")
}},setStatus:function(h){h=h||{};
if(typeof h=="string"){h={text:h}
}if(h.text!==undefined){this.setText(h.text)
}if(h.iconCls!==undefined){this.setIcon(h.iconCls)
}if(h.clear){var g=h.clear,c=this.autoClear,f={useDefaults:true,anim:true};
if(typeof g=="object"){g=Ext.applyIf(g,f);
if(g.wait){c=g.wait
}}else{if(typeof g=="number"){c=g;
g=f
}else{if(typeof g=="boolean"){g=f
}}}g.threadId=this.activeThreadId;
this.clearStatus.defer(c,this,[g])
}return this
},clearStatus:function(f){f=f||{};
if(f.threadId&&f.threadId!==this.activeThreadId){return this
}var d=f.useDefaults?this.defaultText:this.emptyText,e=f.useDefaults?(this.defaultIconCls?this.defaultIconCls:""):"";
if(f.anim){this.statusEl.el.fadeOut({remove:false,useDisplay:true,scope:this,callback:function(){this.setStatus({text:d,iconCls:e});
this.statusEl.el.show()
}})
}else{this.statusEl.hide();
this.setStatus({text:d,iconCls:e});
this.statusEl.show()
}return this
},setText:function(b){this.activeThreadId++;
this.text=b||"";
if(this.rendered){this.statusEl.setText(this.text)
}return this
},getText:function(){return this.text
},setIcon:function(b){this.activeThreadId++;
b=b||"";
if(this.rendered){if(this.currIconCls){this.statusEl.removeClass(this.currIconCls);
this.currIconCls=null
}if(b.length>0){this.statusEl.addClass(b);
this.currIconCls=b
}}else{this.currIconCls=b
}return this
},showBusy:function(b){if(typeof b=="string"){b={text:b}
}b=Ext.applyIf(b||{},{text:this.busyText,iconCls:this.busyIconCls});
return this.setStatus(b)
}});
Ext.reg("statusbar",Ext.ux.StatusBar);
Ext.ux.TabCloseMenu=function(){var f,h,e;
this.init=function(a){f=a;
f.on("contextmenu",g)
};
function g(c,d,b){if(!h){h=new Ext.menu.Menu({items:[{id:f.id+"-close",text:"Close Tab",handler:function(){f.remove(e)
}},{id:f.id+"-close-others",text:"Close Other Tabs",handler:function(){f.items.each(function(j){if(j.closable&&j!=e){f.remove(j)
}})
}}]})
}e=d;
var l=h.items;
l.get(f.id+"-close").setDisabled(!d.closable);
var a=true;
f.items.each(function(){if(this!=d&&this.closable){a=false;
return false
}});
l.get(f.id+"-close-others").setDisabled(a);
b.stopEvent();
h.showAt(b.getPoint())
}};
Ext.preg("tabclosemenu",Ext.ux.TabCloseMenu);
Ext.ns("Ext.ux.grid");
Ext.ux.grid.TableGrid=function(h,x){x=x||{};
Ext.apply(this,x);
var A=x.fields||[],C=x.columns||[];
h=Ext.get(h);
var u=h.insertSibling();
var t=[],s=[];
var y=h.query("thead th");
for(var w=0,v;
v=y[w];
w++){var q=v.innerHTML;
var B="tcol-"+w;
t.push(Ext.applyIf(A[w]||{},{name:B,mapping:"td:nth("+(w+1)+")/@innerHTML"}));
s.push(Ext.applyIf(C[w]||{},{header:q,dataIndex:B,width:v.offsetWidth,tooltip:v.title,sortable:true}))
}var z=new Ext.data.Store({reader:new Ext.data.XmlReader({record:"tbody tr"},t)});
z.loadData(h.dom);
var r=new Ext.grid.ColumnModel(s);
if(x.width||x.height){u.setSize(x.width||"auto",x.height||"auto")
}else{u.setWidth(h.getWidth())
}if(x.remove!==false){h.remove()
}Ext.applyIf(this,{ds:z,cm:r,sm:new Ext.grid.RowSelectionModel(),autoHeight:true,autoWidth:false});
Ext.ux.grid.TableGrid.superclass.constructor.call(this,u,{})
};
Ext.extend(Ext.ux.grid.TableGrid,Ext.grid.GridPanel);
Ext.grid.TableGrid=Ext.ux.grid.TableGrid;
Ext.ns("Ext.ux");
Ext.ux.TabScrollerMenu=Ext.extend(Object,{pageSize:10,maxText:15,menuPrefixText:"Items",constructor:function(b){b=b||{};
Ext.apply(this,b)
},init:function(c){Ext.apply(c,this.parentOverrides);
c.tabScrollerMenu=this;
var d=this;
c.on({render:{scope:c,single:true,fn:function(){var a=c.createScrollers.createSequence(d.createPanelsMenu,this);
c.createScrollers=a
}}})
},createPanelsMenu:function(){var h=this.stripWrap.dom.offsetHeight;
var e=this.header.dom.firstChild;
Ext.fly(e).applyStyles({right:"18px"});
var f=Ext.get(this.strip.dom.parentNode);
f.applyStyles({"margin-right":"36px"});
var g=this.header.insertFirst({cls:"x-tab-tabmenu-right"});
g.setHeight(h);
g.addClassOnOver("x-tab-tabmenu-over");
g.on("click",this.showTabsMenu,this);
this.scrollLeft.show=this.scrollLeft.show.createSequence(function(){g.show()
});
this.scrollLeft.hide=this.scrollLeft.hide.createSequence(function(){g.hide()
})
},getPageSize:function(){return this.pageSize
},setPageSize:function(b){this.pageSize=b
},getMaxText:function(){return this.maxText
},setMaxText:function(b){this.maxText=b
},getMenuPrefixText:function(){return this.menuPrefixText
},setMenuPrefixText:function(b){this.menuPrefixText=b
},parentOverrides:{showTabsMenu:function(f){if(this.tabsMenu){this.tabsMenu.destroy();
this.un("destroy",this.tabsMenu.destroy,this.tabsMenu);
this.tabsMenu=null
}this.tabsMenu=new Ext.menu.Menu();
this.on("destroy",this.tabsMenu.destroy,this.tabsMenu);
this.generateTabMenuItems();
var d=Ext.get(f.getTarget());
var e=d.getXY();
e[1]+=24;
this.tabsMenu.showAt(e)
},generateTabMenuItems:function(){var w=this.getActiveTab();
var m=this.items.getCount();
var q=this.tabScrollerMenu.getPageSize();
if(m>q){var t=Math.floor(m/q);
var o=m%q;
for(var s=0;
s<t;
s++){var r=(s+1)*q;
var v=[];
for(var p=0;
p<q;
p++){index=p+r-q;
var n=this.items.get(index);
v.push(this.autoGenMenuItem(n))
}this.tabsMenu.add({text:this.tabScrollerMenu.getMenuPrefixText()+" "+(r-q+1)+" - "+r,menu:v})
}if(o>0){var u=t*q;
v=[];
for(var s=u;
s<m;
s++){var n=this.items.get(s);
v.push(this.autoGenMenuItem(n))
}this.tabsMenu.add({text:this.tabScrollerMenu.menuPrefixText+" "+(u+1)+" - "+(u+v.length),menu:v})
}}else{this.items.each(function(a){if(a.id!=w.id&&!a.hidden){v.push(this.autoGenMenuItem(a))
}},this)
}},autoGenMenuItem:function(d){var e=this.tabScrollerMenu.getMaxText();
var f=Ext.util.Format.ellipsis(d.title,e);
return{text:f,handler:this.showTabFromMenu,scope:this,disabled:d.disabled,tabToShow:d,iconCls:d.iconCls}
},showTabFromMenu:function(b){this.setActiveTab(b.tabToShow)
}}});
Ext.reg("tabscrollermenu",Ext.ux.TabScrollerMenu);
Ext.ns("Ext.ux.tree");
Ext.ux.tree.XmlTreeLoader=Ext.extend(Ext.tree.TreeLoader,{XML_NODE_ELEMENT:1,XML_NODE_TEXT:3,processResponse:function(e,l,j){var m=e.responseXML;
var h=m.documentElement||m;
try{l.beginUpdate();
l.appendChild(this.parseXml(h));
l.endUpdate();
if(typeof j=="function"){j(this,l)
}}catch(k){this.handleFailure(e)
}},parseXml:function(c){var d=[];
Ext.each(c.childNodes,function(a){if(a.nodeType==this.XML_NODE_ELEMENT){var h=this.createNode(a);
if(a.childNodes.length>0){var b=this.parseXml(a);
if(typeof b=="string"){h.attributes.innerText=b
}else{h.appendChild(b)
}}d.push(h)
}else{if(a.nodeType==this.XML_NODE_TEXT){var g=a.nodeValue.trim();
if(g.length>0){return d=g
}}}},this);
return d
},createNode:function(c){var d={tagName:c.tagName};
Ext.each(c.attributes,function(a){d[a.nodeName]=a.nodeValue
});
this.processAttributes(d);
return Ext.ux.tree.XmlTreeLoader.superclass.createNode.call(this,d)
},processAttributes:Ext.emptyFn});
Ext.ux.XmlTreeLoader=Ext.ux.tree.XmlTreeLoader;
Ext.ux.ValidationStatus=Ext.extend(Ext.Component,{errorIconCls:"x-status-error",errorListCls:"x-status-error-list",validIconCls:"x-status-valid",showText:"The form has errors (click for details...)",hideText:"Click again to hide the error list",submitText:"Saving...",init:function(b){b.on("render",function(){this.statusBar=b;
this.monitor=true;
this.errors=new Ext.util.MixedCollection();
this.listAlign=(b.statusAlign=="right"?"br-tr?":"bl-tl?");
if(this.form){this.form=Ext.getCmp(this.form).getForm();
this.startMonitoring();
this.form.on("beforeaction",function(e,f){if(f.type=="submit"){this.monitor=false
}},this);
var a=function(){this.monitor=true
};
this.form.on("actioncomplete",a,this);
this.form.on("actionfailed",a,this)
}},this,{single:true});
b.on({scope:this,afterlayout:{single:true,fn:function(){b.statusEl.getEl().on("click",this.onStatusClick,this,{buffer:200})
}},beforedestroy:{single:true,fn:this.onDestroy}})
},startMonitoring:function(){this.form.items.each(function(b){b.on("invalid",this.onFieldValidation,this);
b.on("valid",this.onFieldValidation,this)
},this)
},stopMonitoring:function(){this.form.items.each(function(b){b.un("invalid",this.onFieldValidation,this);
b.un("valid",this.onFieldValidation,this)
},this)
},onDestroy:function(){this.stopMonitoring();
this.statusBar.statusEl.un("click",this.onStatusClick,this);
Ext.ux.ValidationStatus.superclass.onDestroy.call(this)
},onFieldValidation:function(d,c){if(!this.monitor){return false
}if(c){this.errors.add(d.id,{field:d,msg:c})
}else{this.errors.removeKey(d.id)
}this.updateErrorList();
if(this.errors.getCount()>0){if(this.statusBar.getText()!=this.showText){this.statusBar.setStatus({text:this.showText,iconCls:this.errorIconCls})
}}else{this.statusBar.clearStatus().setIcon(this.validIconCls)
}},updateErrorList:function(){if(this.errors.getCount()>0){var b="<ul>";
this.errors.each(function(a){b+=('<li id="x-err-'+a.field.id+'"><a href="#">'+a.msg+"</a></li>")
},this);
this.getMsgEl().update(b+"</ul>")
}else{this.getMsgEl().update("")
}},getMsgEl:function(){if(!this.msgEl){this.msgEl=Ext.DomHelper.append(Ext.getBody(),{cls:this.errorListCls+" x-hide-offsets"},true);
this.msgEl.on("click",function(c){var d=c.getTarget("li",10,true);
if(d){Ext.getCmp(d.id.split("x-err-")[1]).focus();
this.hideErrors()
}},this,{stopEvent:true})
}return this.msgEl
},showErrors:function(){this.updateErrorList();
this.getMsgEl().alignTo(this.statusBar.getEl(),this.listAlign).slideIn("b",{duration:0.3,easing:"easeOut"});
this.statusBar.setText(this.hideText);
this.form.getEl().on("click",this.hideErrors,this,{single:true})
},hideErrors:function(){var b=this.getMsgEl();
if(b.isVisible()){b.slideOut("b",{duration:0.2,easing:"easeIn"});
this.statusBar.setText(this.showText)
}this.form.getEl().un("click",this.hideErrors,this)
},onStatusClick:function(){if(this.getMsgEl().isVisible()){this.hideErrors()
}else{if(this.errors.getCount()>0){this.showErrors()
}}}});
(function(){Ext.override(Ext.list.Column,{init:function(){if(!this.type){this.type="auto"
}var b=Ext.data.SortTypes;
if(typeof this.sortType=="string"){this.sortType=b[this.sortType]
}if(!this.sortType){switch(this.type){case"string":this.sortType=b.asUCString;
break;
case"date":this.sortType=b.asDate;
break;
default:this.sortType=b.none
}}}});
Ext.tree.Column=Ext.extend(Ext.list.Column,{});
Ext.tree.NumberColumn=Ext.extend(Ext.list.NumberColumn,{});
Ext.tree.DateColumn=Ext.extend(Ext.list.DateColumn,{});
Ext.tree.BooleanColumn=Ext.extend(Ext.list.BooleanColumn,{});
Ext.reg("tgcolumn",Ext.tree.Column);
Ext.reg("tgnumbercolumn",Ext.tree.NumberColumn);
Ext.reg("tgdatecolumn",Ext.tree.DateColumn);
Ext.reg("tgbooleancolumn",Ext.tree.BooleanColumn)
})();
Ext.ux.tree.TreeGridNodeUI=Ext.extend(Ext.tree.TreeNodeUI,{isTreeGridNodeUI:true,renderElements:function(v,n,r,c){var a=v.getOwnerTree(),p=a.columns,q=p[0],u,w,s;
this.indentMarkup=v.parentNode?v.parentNode.ui.getChildIndent():"";
w=['<tbody class="x-tree-node">','<tr ext:tree-node-id="',v.id,'" class="x-tree-node-el ',n.cls,'">','<td class="x-treegrid-col">','<span class="x-tree-node-indent">',this.indentMarkup,"</span>",'<img src="',this.emptyIcon,'" class="x-tree-ec-icon x-tree-elbow">','<img src="',n.icon||this.emptyIcon,'" class="x-tree-node-icon',(n.icon?" x-tree-node-inline-icon":""),(n.iconCls?" "+n.iconCls:""),'" unselectable="on">','<a hidefocus="on" class="x-tree-node-anchor" href="',n.href?n.href:"#",'" tabIndex="1" ',n.hrefTarget?' target="'+n.hrefTarget+'"':"",">",'<span unselectable="on">',(q.tpl?q.tpl.apply(n):n[q.dataIndex]||q.text),"</span></a>","</td>"];
for(u=1,s=p.length;
u<s;
u++){q=p[u];
w.push('<td class="x-treegrid-col ',(q.cls?q.cls:""),'">','<div unselectable="on" class="x-treegrid-text"',(q.align?' style="text-align: '+q.align+';"':""),">",(q.tpl?q.tpl.apply(n):n[q.dataIndex]),"</div>","</td>")
}w.push('</tr><tr class="x-tree-node-ct"><td colspan="',p.length,'">','<table class="x-treegrid-node-ct-table" cellpadding="0" cellspacing="0" style="table-layout: fixed; display: none; width: ',a.innerCt.getWidth(),'px;"><colgroup>');
for(u=0,s=p.length;
u<s;
u++){w.push('<col style="width: ',(p[u].hidden?0:p[u].width),'px;" />')
}w.push("</colgroup></table></td></tr></tbody>");
if(c!==true&&v.nextSibling&&v.nextSibling.ui.getEl()){this.wrap=Ext.DomHelper.insertHtml("beforeBegin",v.nextSibling.ui.getEl(),w.join(""))
}else{this.wrap=Ext.DomHelper.insertHtml("beforeEnd",r,w.join(""))
}this.elNode=this.wrap.childNodes[0];
this.ctNode=this.wrap.childNodes[1].firstChild.firstChild;
var t=this.elNode.firstChild.childNodes;
this.indentNode=t[0];
this.ecNode=t[1];
this.iconNode=t[2];
this.anchor=t[3];
this.textNode=t[3].firstChild
},animExpand:function(b){this.ctNode.style.display="";
Ext.ux.tree.TreeGridNodeUI.superclass.animExpand.call(this,b)
}});
Ext.ux.tree.TreeGridRootNodeUI=Ext.extend(Ext.tree.TreeNodeUI,{isTreeGridNodeUI:true,render:function(){if(!this.rendered){this.wrap=this.ctNode=this.node.ownerTree.innerCt.dom;
this.node.expanded=true
}if(Ext.isWebKit){var b=this.ctNode;
b.style.tableLayout=null;
(function(){b.style.tableLayout="fixed"
}).defer(1)
}},destroy:function(){if(this.elNode){Ext.dd.Registry.unregister(this.elNode.id)
}delete this.node
},collapse:Ext.emptyFn,expand:Ext.emptyFn});
Ext.tree.ColumnResizer=Ext.extend(Ext.util.Observable,{minWidth:14,constructor:function(b){Ext.apply(this,b);
Ext.tree.ColumnResizer.superclass.constructor.call(this)
},init:function(b){this.tree=b;
b.on("render",this.initEvents,this)
},initEvents:function(b){b.mon(b.innerHd,"mousemove",this.handleHdMove,this);
this.tracker=new Ext.dd.DragTracker({onBeforeStart:this.onBeforeStart.createDelegate(this),onStart:this.onStart.createDelegate(this),onDrag:this.onDrag.createDelegate(this),onEnd:this.onEnd.createDelegate(this),tolerance:3,autoStart:300});
this.tracker.initEl(b.innerHd);
b.on("beforedestroy",this.tracker.destroy,this.tracker)
},handleHdMove:function(q,m){var p=5,n=q.getPageX(),r=q.getTarget(".x-treegrid-hd",3,true);
if(r){var t=r.getRegion(),e=r.dom.style,s=r.dom.parentNode;
if(n-t.left<=p&&r.dom!==s.firstChild){var u=r.dom.previousSibling;
while(u&&Ext.fly(u).hasClass("x-treegrid-hd-hidden")){u=u.previousSibling
}if(u){this.activeHd=Ext.get(u);
e.cursor=Ext.isWebKit?"e-resize":"col-resize"
}}else{if(t.right-n<=p){var o=r.dom;
while(o&&Ext.fly(o).hasClass("x-treegrid-hd-hidden")){o=o.previousSibling
}if(o){this.activeHd=Ext.get(o);
e.cursor=Ext.isWebKit?"w-resize":"col-resize"
}}else{delete this.activeHd;
e.cursor=""
}}}},onBeforeStart:function(b){this.dragHd=this.activeHd;
return !!this.dragHd
},onStart:function(c){this.tree.headersDisabled=true;
this.proxy=this.tree.body.createChild({cls:"x-treegrid-resizer"});
this.proxy.setHeight(this.tree.body.getHeight());
var d=this.tracker.getXY()[0];
this.hdX=this.dragHd.getX();
this.hdIndex=this.tree.findHeaderIndex(this.dragHd);
this.proxy.setX(this.hdX);
this.proxy.setWidth(d-this.hdX);
this.maxWidth=this.tree.outerCt.getWidth()-this.tree.innerBody.translatePoints(this.hdX).left
},onDrag:function(c){var d=this.tracker.getXY()[0];
this.proxy.setWidth((d-this.hdX).constrain(this.minWidth,this.maxWidth))
},onEnd:function(f){var d=this.proxy.getWidth(),e=this.tree;
this.proxy.remove();
delete this.dragHd;
e.columns[this.hdIndex].width=d;
e.updateColumnWidths();
setTimeout(function(){e.headersDisabled=false
},100)
}});
Ext.ns("Ext.ux.tree");
Ext.ux.tree.TreeGridSorter=Ext.extend(Ext.tree.TreeSorter,{sortClasses:["sort-asc","sort-desc"],sortAscText:"Sort Ascending",sortDescText:"Sort Descending",constructor:function(d,c){if(!Ext.isObject(c)){c={property:d.columns[0].dataIndex||"text",folderSort:true}
}Ext.ux.tree.TreeGridSorter.superclass.constructor.apply(this,arguments);
this.tree=d;
d.on("headerclick",this.onHeaderClick,this);
d.ddAppendOnly=true;
me=this;
this.defaultSortFn=function(n,o){var r=me.dir&&me.dir.toLowerCase()=="desc";
var u=me.property||"text";
var s=me.sortType;
var q=me.folderSort;
var p=me.caseSensitive===true;
var t=me.leafAttr||"leaf";
if(q){if(n.attributes[t]&&!o.attributes[t]){return 1
}if(!n.attributes[t]&&o.attributes[t]){return -1
}}var a=s?s(n.attributes[u]):(p?n.attributes[u]:n.attributes[u].toUpperCase());
var b=s?s(o.attributes[u]):(p?o.attributes[u]:o.attributes[u].toUpperCase());
if(a<b){return r?+1:-1
}else{if(a>b){return r?-1:+1
}else{return 0
}}};
d.on("afterrender",this.onAfterTreeRender,this,{single:true});
d.on("headermenuclick",this.onHeaderMenuClick,this)
},onAfterTreeRender:function(){var b=this.tree.hmenu;
b.insert(0,{itemId:"asc",text:this.sortAscText,cls:"xg-hmenu-sort-asc"},{itemId:"desc",text:this.sortDescText,cls:"xg-hmenu-sort-desc"});
this.updateSortIcon(0,"asc")
},onHeaderMenuClick:function(f,c,e){if(c==="asc"||c==="desc"){this.onHeaderClick(f,null,e);
return false
}},onHeaderClick:function(g,c,f){if(g&&!this.tree.headersDisabled){var h=this;
h.property=g.dataIndex;
h.dir=g.dir=(g.dir==="desc"?"asc":"desc");
h.sortType=g.sortType;
h.caseSensitive===Ext.isBoolean(g.caseSensitive)?g.caseSensitive:this.caseSensitive;
h.sortFn=g.sortFn||this.defaultSortFn;
this.tree.root.cascade(function(a){if(!a.isLeaf()){h.updateSort(h.tree,a)
}});
this.updateSortIcon(f,g.dir)
}},updateSortIcon:function(e,f){var g=this.sortClasses;
var h=this.tree.innerHd.select("td").removeClass(g);
h.item(e).addClass(g[f=="desc"?1:0])
}});
Ext.ux.tree.TreeGridLoader=Ext.extend(Ext.tree.TreeLoader,{createNode:function(b){if(!b.uiProvider){b.uiProvider=Ext.ux.tree.TreeGridNodeUI
}return Ext.tree.TreeLoader.prototype.createNode.call(this,b)
}});
Ext.ux.tree.TreeGrid=Ext.extend(Ext.tree.TreePanel,{rootVisible:false,useArrows:true,lines:false,borderWidth:Ext.isBorderBox?0:2,cls:"x-treegrid",columnResize:true,enableSort:true,reserveScrollOffset:true,enableHdMenu:true,columnsText:"Columns",initComponent:function(){if(!this.root){this.root=new Ext.tree.AsyncTreeNode({text:"Root"})
}var d=this.loader;
if(!d){d=new Ext.ux.tree.TreeGridLoader({dataUrl:this.dataUrl,requestMethod:this.requestMethod,store:this.store})
}else{if(Ext.isObject(d)&&!d.load){d=new Ext.ux.tree.TreeGridLoader(d)
}else{if(d){d.createNode=function(a){if(!a.uiProvider){a.uiProvider=Ext.ux.tree.TreeGridNodeUI
}return Ext.tree.TreeLoader.prototype.createNode.call(this,a)
}
}}}this.loader=d;
Ext.ux.tree.TreeGrid.superclass.initComponent.call(this);
this.initColumns();
if(this.enableSort){this.treeGridSorter=new Ext.ux.tree.TreeGridSorter(this,this.enableSort)
}if(this.columnResize){this.colResizer=new Ext.tree.ColumnResizer(this.columnResize);
this.colResizer.init(this)
}var c=this.columns;
if(!this.internalTpl){this.internalTpl=new Ext.XTemplate('<div class="x-grid3-header">','<div class="x-treegrid-header-inner">','<div class="x-grid3-header-offset">','<table cellspacing="0" cellpadding="0" border="0"><colgroup><tpl for="columns"><col /></tpl></colgroup>','<thead><tr class="x-grid3-hd-row">','<tpl for="columns">','<td class="x-grid3-hd x-grid3-cell x-treegrid-hd" style="text-align: {align};" id="',this.id,'-xlhd-{#}">','<div class="x-grid3-hd-inner x-treegrid-hd-inner" unselectable="on">',this.enableHdMenu?'<a class="x-grid3-hd-btn" href="#"></a>':"",'{header}<img class="x-grid3-sort-icon" src="',Ext.BLANK_IMAGE_URL,'" />',"</div>","</td></tpl>","</tr></thead>","</div></table>","</div></div>","</div>",'<div class="x-treegrid-root-node">','<table class="x-treegrid-root-table" cellpadding="0" cellspacing="0" style="table-layout: fixed;"></table>',"</div>")
}if(!this.colgroupTpl){this.colgroupTpl=new Ext.XTemplate('<colgroup><tpl for="columns"><col style="width: {width}px"/></tpl></colgroup>')
}},initColumns:function(){var j=this.columns,g=j.length,k=[],c,h;
for(c=0;
c<g;
c++){h=j[c];
if(!h.isColumn){h.xtype=h.xtype?(/^tg/.test(h.xtype)?h.xtype:"tg"+h.xtype):"tgcolumn";
h=Ext.create(h)
}h.init(this);
k.push(h);
if(this.enableSort!==false&&h.sortable!==false){h.sortable=true;
this.enableSort=true
}}this.columns=k
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
}}},setRootNode:function(b){b.attributes.uiProvider=Ext.ux.tree.TreeGridRootNodeUI;
b=Ext.ux.tree.TreeGrid.superclass.setRootNode.call(this,b);
if(this.innerCt){this.colgroupTpl.insertFirst(this.innerCt,{columns:this.columns})
}return b
},initEvents:function(){Ext.ux.tree.TreeGrid.superclass.initEvents.apply(this,arguments);
this.mon(this.innerBody,"scroll",this.syncScroll,this);
this.mon(this.innerHd,"click",this.handleHdDown,this);
this.mon(this.mainHd,{scope:this,mouseover:this.handleHdOver,mouseout:this.handleHdOut})
},onResize:function(g,m){Ext.ux.tree.TreeGrid.superclass.onResize.apply(this,arguments);
var k=this.innerBody.dom;
var j=this.innerHd.dom;
if(!k){return
}if(Ext.isNumber(m)){k.style.height=this.body.getHeight(true)-j.offsetHeight+"px"
}if(Ext.isNumber(g)){var h=Ext.num(this.scrollOffset,Ext.getScrollBarWidth());
if(this.reserveScrollOffset||((k.offsetWidth-k.clientWidth)>10)){this.setScrollOffset(h)
}else{var l=this;
setTimeout(function(){l.setScrollOffset(k.offsetWidth-k.clientWidth>10?h:0)
},10)
}}},updateColumnWidths:function(){var j=this.columns,c=j.length,s=this.outerCt.query("colgroup"),g=s.length,n,p,q,r;
for(q=0;
q<c;
q++){n=j[q];
for(r=0;
r<g;
r++){p=s[r];
p.childNodes[q].style.width=(n.hidden?0:n.width)+"px"
}}for(q=0,s=this.innerHd.query("td"),len=s.length;
q<len;
q++){n=Ext.fly(s[q]);
if(j[q]&&j[q].hidden){n.addClass("x-treegrid-hd-hidden")
}else{n.removeClass("x-treegrid-hd-hidden")
}}var o=this.getTotalColumnWidth();
Ext.fly(this.innerHd.dom.firstChild).setWidth(o+(this.scrollOffset||0));
this.outerCt.select("table").setWidth(o);
this.syncHeaderScroll()
},getVisibleColumns:function(){var h=[],g=this.columns,f=g.length,e;
for(e=0;
e<f;
e++){if(!g[e].hidden){h.push(g[e])
}}return h
},getTotalColumnWidth:function(){var g=0;
for(var e=0,h=this.getVisibleColumns(),f=h.length;
e<f;
e++){g+=h[e].width
}return g
},setScrollOffset:function(b){this.scrollOffset=b;
this.updateColumnWidths()
},handleHdDown:function(m,p){var n=m.getTarget(".x-treegrid-hd");
if(n&&Ext.fly(p).hasClass("x-grid3-hd-btn")){var c=this.hmenu.items,o=this.columns,e=this.findHeaderIndex(n),l=o[e],q=l.sortable;
m.stopEvent();
Ext.fly(n).addClass("x-grid3-hd-menu-open");
this.hdCtxIndex=e;
this.fireEvent("headerbuttonclick",c,l,n,e);
this.hmenu.on("hide",function(){Ext.fly(n).removeClass("x-grid3-hd-menu-open")
},this,{single:true});
this.hmenu.show(p,"tl-bl?")
}else{if(n){var e=this.findHeaderIndex(n);
this.fireEvent("headerclick",this.columns[e],n,e)
}}},handleHdOver:function(g,f){var h=g.getTarget(".x-treegrid-hd");
if(h&&!this.headersDisabled){index=this.findHeaderIndex(h);
this.activeHdRef=f;
this.activeHdIndex=index;
var e=Ext.get(h);
this.activeHdRegion=e.getRegion();
e.addClass("x-grid3-hd-over");
this.activeHdBtn=e.child(".x-grid3-hd-btn");
if(this.activeHdBtn){this.activeHdBtn.dom.style.height=(h.firstChild.offsetHeight-1)+"px"
}}},handleHdOut:function(f,e){var d=f.getTarget(".x-treegrid-hd");
if(d&&(!Ext.isIE||!f.within(d,true))){this.activeHdRef=null;
Ext.fly(d).removeClass("x-grid3-hd-over");
d.style.cursor=""
}},findHeaderIndex:function(h){h=h.dom||h;
var c=h.parentNode.childNodes;
for(var f=0,g;
g=c[f];
f++){if(g==h){return f
}}return -1
},beforeColMenuShow:function(){var h=this.columns,c=h.length,f,g;
this.colMenu.removeAll();
for(f=1;
f<c;
f++){g=h[f];
if(g.hideable!==false){this.colMenu.add(new Ext.menu.CheckItem({itemId:"col-"+f,text:g.header,checked:!g.hidden,hideOnClick:false,disabled:g.hideable===false}))
}}},handleHdMenuClick:function(d){var e=this.hdCtxIndex,f=d.getItemId();
if(this.fireEvent("headermenuclick",this.columns[e],f,e)!==false){e=f.substr(4);
if(e>0&&this.columns[e]){this.setColumnVisible(e,!d.checked)
}}return true
},setColumnVisible:function(d,c){this.columns[d].hidden=!c;
this.updateColumnWidths()
},scrollToTop:function(){this.innerBody.dom.scrollTop=0;
this.innerBody.dom.scrollLeft=0
},syncScroll:function(){this.syncHeaderScroll();
var b=this.innerBody.dom;
this.fireEvent("bodyscroll",b.scrollLeft,b.scrollTop)
},syncHeaderScroll:function(){var b=this.innerBody.dom;
this.innerHd.dom.scrollLeft=b.scrollLeft;
this.innerHd.dom.scrollLeft=b.scrollLeft
},registerNode:function(b){Ext.ux.tree.TreeGrid.superclass.registerNode.call(this,b);
if(!b.uiProvider&&!b.isRoot&&!b.ui.isTreeGridNodeUI){b.ui=new Ext.ux.tree.TreeGridNodeUI(b)
}}});
Ext.reg("treegrid",Ext.ux.tree.TreeGrid);