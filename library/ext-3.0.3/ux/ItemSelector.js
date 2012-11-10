/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.form");
Ext.ux.form.ItemSelector=Ext.extend(Ext.form.Field,{hideNavIcons:false,imagePath:"",iconUp:"up2.gif",iconDown:"down2.gif",iconLeft:"left2.gif",iconRight:"right2.gif",iconTop:"top2.gif",iconBottom:"bottom2.gif",drawUpIcon:true,drawDownIcon:true,drawLeftIcon:true,drawRightIcon:true,drawTopIcon:true,drawBotIcon:true,delimiter:",",bodyStyle:null,border:false,defaultAutoCreate:{tag:"div"},multiselects:null,initComponent:function(){Ext.ux.form.ItemSelector.superclass.initComponent.call(this);
this.addEvents({rowdblclick:true,change:true})
},onRender:function(d,a){Ext.ux.form.ItemSelector.superclass.onRender.call(this,d,a);
var h=[{legend:"Available",draggable:true,droppable:true,width:100,height:100},{legend:"Selected",droppable:true,draggable:true,width:100,height:100}];
this.fromMultiselect=new Ext.ux.form.MultiSelect(Ext.applyIf(this.multiselects[0],h[0]));
this.fromMultiselect.on("dblclick",this.onRowDblClick,this);
this.toMultiselect=new Ext.ux.form.MultiSelect(Ext.applyIf(this.multiselects[1],h[1]));
this.toMultiselect.on("dblclick",this.onRowDblClick,this);
var g=new Ext.Panel({bodyStyle:this.bodyStyle,border:this.border,layout:"table",layoutConfig:{columns:3}});
g.add(this.fromMultiselect);
var c=new Ext.Panel({header:false});
g.add(c);
g.add(this.toMultiselect);
g.render(this.el);
c.el.down("."+c.bwrapCls).remove();
if(this.imagePath!=""&&this.imagePath.charAt(this.imagePath.length-1)!="/"){this.imagePath+="/"
}this.iconUp=this.imagePath+(this.iconUp||"up2.gif");
this.iconDown=this.imagePath+(this.iconDown||"down2.gif");
this.iconLeft=this.imagePath+(this.iconLeft||"left2.gif");
this.iconRight=this.imagePath+(this.iconRight||"right2.gif");
this.iconTop=this.imagePath+(this.iconTop||"top2.gif");
this.iconBottom=this.imagePath+(this.iconBottom||"bottom2.gif");
var f=c.getEl();
this.toTopIcon=f.createChild({tag:"img",src:this.iconTop,style:{cursor:"pointer",margin:"2px"}});
f.createChild({tag:"br"});
this.upIcon=f.createChild({tag:"img",src:this.iconUp,style:{cursor:"pointer",margin:"2px"}});
f.createChild({tag:"br"});
this.addIcon=f.createChild({tag:"img",src:this.iconRight,style:{cursor:"pointer",margin:"2px"}});
f.createChild({tag:"br"});
this.removeIcon=f.createChild({tag:"img",src:this.iconLeft,style:{cursor:"pointer",margin:"2px"}});
f.createChild({tag:"br"});
this.downIcon=f.createChild({tag:"img",src:this.iconDown,style:{cursor:"pointer",margin:"2px"}});
f.createChild({tag:"br"});
this.toBottomIcon=f.createChild({tag:"img",src:this.iconBottom,style:{cursor:"pointer",margin:"2px"}});
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
}var b=g.body.first();
this.el.setWidth(g.body.first().getWidth());
g.body.removeClass();
this.hiddenName=this.name;
var e={tag:"input",type:"hidden",value:"",name:this.name};
this.hiddenField=this.el.createChild(e)
},doLayout:function(){if(this.rendered){this.fromMultiselect.fs.doLayout();
this.toMultiselect.fs.doLayout()
}},afterRender:function(){Ext.ux.form.ItemSelector.superclass.afterRender.call(this);
this.toStore=this.toMultiselect.store;
this.toStore.on("add",this.valueChanged,this);
this.toStore.on("remove",this.valueChanged,this);
this.toStore.on("load",this.valueChanged,this);
this.valueChanged(this.toStore)
},toTop:function(){var c=this.toMultiselect.view.getSelectedIndexes();
var a=[];
if(c.length>0){c.sort();
for(var b=0;
b<c.length;
b++){record=this.toMultiselect.view.store.getAt(c[b]);
a.push(record)
}c=[];
for(var b=a.length-1;
b>-1;
b--){record=a[b];
this.toMultiselect.view.store.remove(record);
this.toMultiselect.view.store.insert(0,record);
c.push(((a.length-1)-b))
}}this.toMultiselect.view.refresh();
this.toMultiselect.view.select(c)
},toBottom:function(){var c=this.toMultiselect.view.getSelectedIndexes();
var a=[];
if(c.length>0){c.sort();
for(var b=0;
b<c.length;
b++){record=this.toMultiselect.view.store.getAt(c[b]);
a.push(record)
}c=[];
for(var b=0;
b<a.length;
b++){record=a[b];
this.toMultiselect.view.store.remove(record);
this.toMultiselect.view.store.add(record);
c.push((this.toMultiselect.view.store.getCount())-(a.length-b))
}}this.toMultiselect.view.refresh();
this.toMultiselect.view.select(c)
},up:function(){var a=null;
var c=this.toMultiselect.view.getSelectedIndexes();
c.sort();
var d=[];
if(c.length>0){for(var b=0;
b<c.length;
b++){a=this.toMultiselect.view.store.getAt(c[b]);
if((c[b]-1)>=0){this.toMultiselect.view.store.remove(a);
this.toMultiselect.view.store.insert(c[b]-1,a);
d.push(c[b]-1)
}}this.toMultiselect.view.refresh();
this.toMultiselect.view.select(d)
}},down:function(){var a=null;
var c=this.toMultiselect.view.getSelectedIndexes();
c.sort();
c.reverse();
var d=[];
if(c.length>0){for(var b=0;
b<c.length;
b++){a=this.toMultiselect.view.store.getAt(c[b]);
if((c[b]+1)<this.toMultiselect.view.store.getCount()){this.toMultiselect.view.store.remove(a);
this.toMultiselect.view.store.insert(c[b]+1,a);
d.push(c[b]+1)
}}this.toMultiselect.view.refresh();
this.toMultiselect.view.select(d)
}},fromTo:function(){var e=this.fromMultiselect.view.getSelectedIndexes();
var b=[];
if(e.length>0){for(var d=0;
d<e.length;
d++){record=this.fromMultiselect.view.store.getAt(e[d]);
b.push(record)
}if(!this.allowDup){e=[]
}for(var d=0;
d<b.length;
d++){record=b[d];
if(this.allowDup){var a=new Ext.data.Record();
record.id=a.id;
delete a;
this.toMultiselect.view.store.add(record)
}else{this.fromMultiselect.view.store.remove(record);
this.toMultiselect.view.store.add(record);
e.push((this.toMultiselect.view.store.getCount()-1))
}}}this.toMultiselect.view.refresh();
this.fromMultiselect.view.refresh();
var c=this.toMultiselect.store.sortInfo;
if(c){this.toMultiselect.store.sort(c.field,c.direction)
}this.toMultiselect.view.select(e)
},toFrom:function(){var d=this.toMultiselect.view.getSelectedIndexes();
var a=[];
if(d.length>0){for(var c=0;
c<d.length;
c++){record=this.toMultiselect.view.store.getAt(d[c]);
a.push(record)
}d=[];
for(var c=0;
c<a.length;
c++){record=a[c];
this.toMultiselect.view.store.remove(record);
if(!this.allowDup){this.fromMultiselect.view.store.add(record);
d.push((this.fromMultiselect.view.store.getCount()-1))
}}}this.fromMultiselect.view.refresh();
this.toMultiselect.view.refresh();
var b=this.fromMultiselect.store.sortInfo;
if(b){this.fromMultiselect.store.sort(b.field,b.direction)
}this.fromMultiselect.view.select(d)
},valueChanged:function(c){var a=null;
var b=[];
for(var d=0;
d<c.getCount();
d++){a=c.getAt(d);
b.push(a.get(this.toMultiselect.valueField))
}this.hiddenField.dom.value=b.join(this.delimiter);
this.fireEvent("change",this,this.getValue(),this.hiddenField.dom.value)
},getValue:function(){return this.hiddenField.dom.value
},onRowDblClick:function(c,a,b,d){if(c==this.toMultiselect.view){this.toFrom()
}else{if(c==this.fromMultiselect.view){this.fromTo()
}}return this.fireEvent("rowdblclick",c,a,b,d)
},reset:function(){range=this.toMultiselect.store.getRange();
this.toMultiselect.store.removeAll();
this.fromMultiselect.store.add(range);
var a=this.fromMultiselect.store.sortInfo;
if(a){this.fromMultiselect.store.sort(a.field,a.direction)
}this.valueChanged(this.toMultiselect.store)
}});
Ext.reg("itemselector",Ext.ux.form.ItemSelector);
Ext.ux.ItemSelector=Ext.ux.form.ItemSelector;