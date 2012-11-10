/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.grid");
Ext.ux.grid.RowEditor=Ext.extend(Ext.Panel,{floating:true,shadow:false,layout:"hbox",cls:"x-small-editor",buttonAlign:"center",baseCls:"x-row-editor",elements:"header,footer,body",frameWidth:5,buttonPad:3,clicksToEdit:"auto",monitorValid:true,focusDelay:250,errorSummary:true,saveText:"Save",cancelText:"Cancel",commitChangesText:"You need to commit or cancel your changes",errorText:"Errors",defaults:{normalWidth:true},initComponent:function(){Ext.ux.grid.RowEditor.superclass.initComponent.call(this);
this.addEvents("beforeedit","canceledit","validateedit","afteredit")
},init:function(a){this.grid=a;
this.ownerCt=a;
if(this.clicksToEdit===2){a.on("rowdblclick",this.onRowDblClick,this)
}else{a.on("rowclick",this.onRowClick,this);
if(Ext.isIE){a.on("rowdblclick",this.onRowDblClick,this)
}}a.getStore().on("remove",function(){this.stopEditing(false)
},this);
a.on({scope:this,keydown:this.onGridKey,columnresize:this.verifyLayout,columnmove:this.refreshFields,reconfigure:this.refreshFields,beforedestroy:this.beforedestroy,destroy:this.destroy,bodyscroll:{buffer:250,fn:this.positionButtons}});
a.getColumnModel().on("hiddenchange",this.verifyLayout,this,{delay:1});
a.getView().on("refresh",this.stopEditing.createDelegate(this,[]))
},beforedestroy:function(){this.grid.getStore().un("remove",this.onStoreRemove,this);
this.stopEditing(false);
Ext.destroy(this.btns)
},refreshFields:function(){this.initFields();
this.verifyLayout()
},isDirty:function(){var a;
this.items.each(function(b){if(String(this.values[b.id])!==String(b.getValue())){a=true;
return false
}},this);
return a
},startEditing:function(k,p){if(this.editing&&this.isDirty()){this.showTooltip(this.commitChangesText);
return
}if(Ext.isObject(k)){k=this.grid.getStore().indexOf(k)
}if(this.fireEvent("beforeedit",this,k)!==false){this.editing=true;
var e=this.grid,l=e.getView(),o=l.getRow(k),c=e.store.getAt(k);
this.record=c;
this.rowIndex=k;
this.values={};
if(!this.rendered){this.render(l.getEditorParent())
}var m=Ext.fly(o).getWidth();
this.setSize(m);
if(!this.initialized){this.initFields()
}var n=e.getColumnModel(),d=this.items.items,j,a;
for(var b=0,h=n.getColumnCount();
b<h;
b++){a=this.preEditValue(c,n.getDataIndex(b));
j=d[b];
j.setValue(a);
j.setDisabled(!n.isCellEditable(b,k));
this.values[j.id]=Ext.isEmpty(a)?"":a
}this.verifyLayout(true);
if(!this.isVisible()){this.setPagePosition(Ext.fly(o).getXY())
}else{this.el.setXY(Ext.fly(o).getXY(),{duration:0.15})
}if(!this.isVisible()){this.show().doLayout()
}if(p!==false){this.doFocus.defer(this.focusDelay,this)
}}},stopEditing:function(l){this.editing=false;
if(!this.isVisible()){return
}if(l===false||!this.isValid()){this.hide();
this.fireEvent("canceledit",this,l===false);
return
}var g={},b=this.record,h=false,k=this.grid.colModel,e=this.items.items;
for(var d=0,f=k.getColumnCount();
d<f;
d++){if(!k.isHidden(d)){var c=k.getDataIndex(d);
if(!Ext.isEmpty(c)){var a=b.data[c],j=this.postEditValue(e[d].getValue(),a,b,c);
if(String(a)!==String(j)){g[c]=j;
h=true
}}}}if(h&&this.fireEvent("validateedit",this,g,b,this.rowIndex)!==false){b.beginEdit();
Ext.iterate(g,function(i,m){b.set(i,m)
});
b.endEdit();
this.fireEvent("afteredit",this,g,b,this.rowIndex)
}this.hide()
},verifyLayout:function(e){if(this.el&&(this.isVisible()||e===true)){var g=this.grid.getView().getRow(this.rowIndex);
this.setSize(Ext.fly(g).getWidth(),Ext.fly(g).getHeight()+9);
var c=this.grid.colModel,b=this.items.items;
for(var d=0,a=c.getColumnCount();
d<a;
d++){if(!c.isHidden(d)){var f=0;
if(d===(a-1)){f+=3
}else{f+=1
}b[d].show();
b[d].setWidth(c.getColumnWidth(d)-f)
}else{b[d].hide()
}}this.doLayout();
this.positionButtons()
}},slideHide:function(){this.hide()
},initFields:function(){var b=this.grid.getColumnModel(),f=Ext.layout.ContainerLayout.prototype.parseMargins;
this.removeAll(false);
for(var e=0,a=b.getColumnCount();
e<a;
e++){var g=b.getColumnAt(e),d=g.getEditor();
if(!d){d=g.displayEditor||new Ext.form.DisplayField()
}if(e==0){d.margins=f("0 1 2 1")
}else{if(e==a-1){d.margins=f("0 0 2 1")
}else{d.margins=f("0 1 2")
}}d.setWidth(b.getColumnWidth(e));
d.column=g;
if(d.ownerCt!==this){d.on("focus",this.ensureVisible,this);
d.on("specialkey",this.onKey,this)
}this.insert(e,d)
}this.initialized=true
},onKey:function(a,b){if(b.getKey()===b.ENTER){this.stopEditing(true);
b.stopPropagation()
}},onGridKey:function(c){if(c.getKey()===c.ENTER&&!this.isVisible()){var b=this.grid.getSelectionModel().getSelected();
if(b){var a=this.grid.store.indexOf(b);
this.startEditing(a);
c.stopPropagation()
}}},ensureVisible:function(a){if(this.isVisible()){this.grid.getView().ensureVisible(this.rowIndex,this.grid.colModel.getIndexById(a.column.id),true)
}},onRowClick:function(b,d,c){if(this.clicksToEdit=="auto"){var a=this.lastClickIndex;
this.lastClickIndex=d;
if(a!=d&&!this.isVisible()){return
}}this.startEditing(d,false);
this.doFocus.defer(this.focusDelay,this,[c.getPoint()])
},onRowDblClick:function(a,c,b){this.startEditing(c,false);
this.doFocus.defer(this.focusDelay,this,[b.getPoint()])
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
},positionButtons:function(){if(this.btns){var e=this.grid,d=this.el.dom.clientHeight,b=e.getView(),a=b.scroller.dom.scrollLeft,f=this.btns.getWidth(),c=Math.min(e.getWidth(),e.getColumnModel().getTotalWidth());
this.btns.el.shift({left:(c/2)-(f/2)+a,top:d-2,stopFx:true,duration:0.2})
}},preEditValue:function(a,c){var b=a.data[c];
return this.autoEncode&&typeof b==="string"?Ext.util.Format.htmlDecode(b):b
},postEditValue:function(c,a,b,d){return this.autoEncode&&typeof c=="string"?Ext.util.Format.htmlEncode(c):c
},doFocus:function(f){if(this.isVisible()){var d=0,b=this.grid.getColumnModel(),g;
if(f){d=this.getTargetColumnIndex(f)
}for(var e=d||0,a=b.getColumnCount();
e<a;
e++){g=b.getColumnAt(e);
if(!g.hidden&&g.getEditor()){g.getEditor().focus();
break
}}}},getTargetColumnIndex:function(k){var a=this.grid,j=a.view,h=k.left,f=a.colModel.config,b=0,d=false;
for(var e=f.length,g;
g=f[b];
b++){if(!g.hidden){if(Ext.fly(j.getHeaderCell(b)).getRegion().right>=h){d=b;
break
}}}return d
},startMonitoring:function(){if(!this.bound&&this.monitorValid){this.bound=true;
Ext.TaskMgr.start({run:this.bindHandler,interval:this.monitorPoll||200,scope:this})
}},stopMonitoring:function(){this.bound=false;
if(this.tooltip){this.tooltip.hide()
}},isValid:function(){var a=true;
this.items.each(function(b){if(!b.isValid(true)){a=false;
return false
}});
return a
},bindHandler:function(){if(!this.bound){return false
}var a=this.isValid();
if(!a&&this.errorSummary){this.showTooltip(this.getErrorText().join(""))
}this.btns.saveBtn.setDisabled(!a);
this.fireEvent("validation",this,a)
},showTooltip:function(f){var c=this.tooltip;
if(!c){c=this.tooltip=new Ext.ToolTip({maxWidth:600,cls:"errorTip",width:300,title:this.errorText,autoHide:false,anchor:"left",anchorToTarget:true,mouseOffset:[40,0]})
}var b=this.grid.getView(),e=parseInt(this.el.dom.style.top,10),a=b.scroller.dom.scrollTop,d=this.el.getHeight();
if(e+d>=a){c.initTarget(this.items.last().getEl());
if(!c.rendered){c.show();
c.hide()
}c.body.update(f);
c.doAutoWidth(20);
c.show()
}else{if(c.rendered){c.hide()
}}},getErrorText:function(){var a=["<ul>"];
this.items.each(function(b){if(!b.isValid(true)){a.push("<li>",b.getActiveError(),"</li>")
}});
a.push("</ul>");
return a
}});
Ext.preg("roweditor",Ext.ux.grid.RowEditor);