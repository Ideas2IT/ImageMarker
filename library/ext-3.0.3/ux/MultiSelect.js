/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.form");
Ext.ux.form.MultiSelect=Ext.extend(Ext.form.Field,{ddReorder:false,appendOnly:false,width:100,height:100,displayField:0,valueField:1,allowBlank:true,minSelections:0,maxSelections:Number.MAX_VALUE,blankText:Ext.form.TextField.prototype.blankText,minSelectionsText:"Minimum {0} item(s) required",maxSelectionsText:"Maximum {0} item(s) allowed",delimiter:",",defaultAutoCreate:{tag:"div"},initComponent:function(){Ext.ux.form.MultiSelect.superclass.initComponent.call(this);
if(Ext.isArray(this.store)){if(Ext.isArray(this.store[0])){this.store=new Ext.data.ArrayStore({fields:["value","text"],data:this.store});
this.valueField="value"
}else{this.store=new Ext.data.ArrayStore({fields:["text"],data:this.store,expandData:true});
this.valueField="text"
}this.displayField="text"
}else{this.store=Ext.StoreMgr.lookup(this.store)
}this.addEvents({dblclick:true,click:true,change:true,drop:true})
},onRender:function(c,b){Ext.ux.form.MultiSelect.superclass.onRender.call(this,c,b);
var a=this.fs=new Ext.form.FieldSet({renderTo:this.el,title:this.legend,height:this.height,width:this.width,style:"padding:0;",tbar:this.tbar});
a.body.addClass("ux-mselect");
this.view=new Ext.ListView({multiSelect:true,store:this.store,columns:[{header:"Value",width:1,dataIndex:this.displayField}],hideHeaders:true});
a.add(this.view);
this.view.on("click",this.onViewClick,this);
this.view.on("beforeclick",this.onViewBeforeClick,this);
this.view.on("dblclick",this.onViewDblClick,this);
this.hiddenName=this.name||Ext.id();
var d={tag:"input",type:"hidden",value:"",name:this.hiddenName};
this.hiddenField=this.el.createChild(d);
this.hiddenField.dom.disabled=this.hiddenName!=this.name;
a.doLayout()
},afterRender:function(){Ext.ux.form.MultiSelect.superclass.afterRender.call(this);
if(this.ddReorder&&!this.dragGroup&&!this.dropGroup){this.dragGroup=this.dropGroup="MultiselectDD-"+Ext.id()
}if(this.draggable||this.dragGroup){this.dragZone=new Ext.ux.form.MultiSelect.DragZone(this,{ddGroup:this.dragGroup})
}if(this.droppable||this.dropGroup){this.dropZone=new Ext.ux.form.MultiSelect.DropZone(this,{ddGroup:this.dropGroup})
}},onViewClick:function(c,a,b,d){this.fireEvent("change",this,this.getValue(),this.hiddenField.dom.value);
this.hiddenField.dom.value=this.getValue();
this.fireEvent("click",this,d);
this.validate()
},onViewBeforeClick:function(c,a,b,d){if(this.disabled){return false
}},onViewDblClick:function(c,a,b,d){return this.fireEvent("dblclick",c,a,b,d)
},getValue:function(a){var d=[];
var c=this.view.getSelectedIndexes();
if(c.length==0){return""
}for(var b=0;
b<c.length;
b++){d.push(this.store.getAt(c[b]).get((a!=null)?a:this.valueField))
}return d.join(this.delimiter)
},setValue:function(a){var b;
var d=[];
this.view.clearSelections();
this.hiddenField.dom.value="";
if(!a||(a=="")){return
}if(!Ext.isArray(a)){a=a.split(this.delimiter)
}for(var c=0;
c<a.length;
c++){b=this.view.store.indexOf(this.view.store.query(this.valueField,new RegExp("^"+a[c]+"$","i")).itemAt(0));
d.push(b)
}this.view.select(d);
this.hiddenField.dom.value=this.getValue();
this.validate()
},reset:function(){this.setValue("")
},getRawValue:function(a){var b=this.getValue(a);
if(b.length){b=b.split(this.delimiter)
}else{b=[]
}return b
},setRawValue:function(a){setValue(a)
},validateValue:function(a){if(a.length<1){if(this.allowBlank){this.clearInvalid();
return true
}else{this.markInvalid(this.blankText);
return false
}}if(a.length<this.minSelections){this.markInvalid(String.format(this.minSelectionsText,this.minSelections));
return false
}if(a.length>this.maxSelections){this.markInvalid(String.format(this.maxSelectionsText,this.maxSelections));
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
Ext.ux.form.MultiSelect.DragZone=function(d,c){this.ms=d;
this.view=d.view;
var b=c.ddGroup||"MultiselectDD";
var a;
if(Ext.isArray(b)){a=b.shift()
}else{a=b;
b=null
}Ext.ux.form.MultiSelect.DragZone.superclass.constructor.call(this,this.ms.fs.body,{containerScroll:true,ddGroup:a});
this.setDraggable(b)
};
Ext.extend(Ext.ux.form.MultiSelect.DragZone,Ext.dd.DragZone,{onInitDrag:function(a,c){var b=Ext.get(this.dragData.ddel.cloneNode(true));
this.proxy.update(b.dom);
b.setWidth(b.child("em").getWidth());
this.onStartDrag(a,c);
return true
},collectSelection:function(b){b.repairXY=Ext.fly(this.view.getSelectedNodes()[0]).getXY();
var a=0;
this.view.store.each(function(d){if(this.view.isSelected(a)){var e=this.view.getNode(a);
var c=e.cloneNode(true);
c.id=Ext.id();
b.ddel.appendChild(c);
b.records.push(this.view.store.getAt(a));
b.viewNodes.push(e)
}a++
},this)
},onEndDrag:function(a,b){var c=Ext.get(this.dragData.ddel);
if(c&&c.hasClass("multi-proxy")){c.remove()
}},getDragData:function(d){var c=this.view.findItemFromChild(d.getTarget());
if(c){if(!this.view.isSelected(c)&&!d.ctrlKey&&!d.shiftKey){this.view.select(c);
this.ms.setValue(this.ms.getValue())
}if(this.view.getSelectionCount()==0||d.ctrlKey||d.shiftKey){return false
}var b={sourceView:this.view,viewNodes:[],records:[]};
if(this.view.getSelectionCount()==1){var a=this.view.getSelectedIndexes()[0];
var f=this.view.getNode(a);
b.viewNodes.push(b.ddel=f);
b.records.push(this.view.store.getAt(a));
b.repairXY=Ext.fly(f).getXY()
}else{b.ddel=document.createElement("div");
b.ddel.className="multi-proxy";
this.collectSelection(b)
}return b
}return false
},getRepairXY:function(a){return this.dragData.repairXY
},setDraggable:function(a){if(!a){return
}if(Ext.isArray(a)){Ext.each(a,this.setDraggable,this);
return
}this.addToGroup(a)
}});
Ext.ux.form.MultiSelect.DropZone=function(d,c){this.ms=d;
this.view=d.view;
var b=c.ddGroup||"MultiselectDD";
var a;
if(Ext.isArray(b)){a=b.shift()
}else{a=b;
b=null
}Ext.ux.form.MultiSelect.DropZone.superclass.constructor.call(this,this.ms.fs.body,{containerScroll:true,ddGroup:a});
this.setDroppable(b)
};
Ext.extend(Ext.ux.form.MultiSelect.DropZone,Ext.dd.DropZone,{getTargetFromEvent:function(b){var a=b.getTarget();
return a
},getDropPoint:function(g,j,d){if(j==this.ms.fs.body.dom){return"below"
}var f=Ext.lib.Dom.getY(j),a=f+j.offsetHeight;
var i=f+(a-f)/2;
var h=Ext.lib.Event.getPageY(g);
if(h<=i){return"above"
}else{return"below"
}},isValidDropPoint:function(b,e,a){if(!a.viewNodes||(a.viewNodes.length!=1)){return true
}var c=a.viewNodes[0];
if(c==e){return false
}if((b=="below")&&(e.nextSibling==c)){return false
}if((b=="above")&&(e.previousSibling==c)){return false
}return true
},onNodeEnter:function(d,a,c,b){return false
},onNodeOver:function(h,a,g,d){var b=this.dropNotAllowed;
var f=this.getDropPoint(g,h,a);
if(this.isValidDropPoint(f,h,d)){if(this.ms.appendOnly){return"x-tree-drop-ok-below"
}if(f){var c;
if(f=="above"){b=h.previousSibling?"x-tree-drop-ok-between":"x-tree-drop-ok-above";
c="x-view-drag-insert-above"
}else{b=h.nextSibling?"x-tree-drop-ok-between":"x-tree-drop-ok-below";
c="x-view-drag-insert-below"
}if(this.lastInsertClass!=c){Ext.fly(h).replaceClass(this.lastInsertClass,c);
this.lastInsertClass=c
}}}return b
},onNodeOut:function(d,a,c,b){this.removeDropIndicators(d)
},onNodeDrop:function(b,k,j,g){if(this.ms.fireEvent("drop",this,b,k,j,g)===false){return false
}var l=this.getDropPoint(j,b,k);
if(b!=this.ms.fs.body.dom){b=this.view.findItemFromChild(b)
}var c=(this.ms.appendOnly||(b==this.ms.fs.body.dom))?this.view.store.getCount():this.view.indexOf(b);
if(l=="below"){c++
}var d=false;
if(g.sourceView==this.view){if(l=="below"){if(g.viewNodes[0]==b){g.viewNodes.shift()
}}else{if(g.viewNodes[g.viewNodes.length-1]==b){g.viewNodes.pop()
}}if(!g.viewNodes.length){return false
}if(c>this.view.store.indexOf(g.records[0])){d="down";
c--
}}for(var h=0;
h<g.records.length;
h++){var a=g.records[h];
if(g.sourceView){g.sourceView.store.remove(a)
}this.view.store.insert(d=="down"?c:c++,a);
var f=this.view.store.sortInfo;
if(f){this.view.store.sort(f.field,f.direction)
}}return true
},removeDropIndicators:function(a){if(a){Ext.fly(a).removeClass(["x-view-drag-insert-above","x-view-drag-insert-left","x-view-drag-insert-right","x-view-drag-insert-below"]);
this.lastInsertClass="_noclass"
}},setDroppable:function(a){if(!a){return
}if(Ext.isArray(a)){Ext.each(a,this.setDroppable,this);
return
}this.addToGroup(a)
}});