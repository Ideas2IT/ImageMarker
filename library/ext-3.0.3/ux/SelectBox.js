/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.form");
Ext.ux.form.SelectBox=Ext.extend(Ext.form.ComboBox,{constructor:function(a){this.searchResetDelay=1000;
a=a||{};
a=Ext.apply(a||{},{editable:false,forceSelection:true,rowHeight:false,lastSearchTerm:false,triggerAction:"all",mode:"local"});
Ext.ux.form.SelectBox.superclass.constructor.apply(this,arguments);
this.lastSelectedIndex=this.selectedIndex||0
},initEvents:function(){Ext.ux.form.SelectBox.superclass.initEvents.apply(this,arguments);
this.el.on("keydown",this.keySearch,this,true);
this.cshTask=new Ext.util.DelayedTask(this.clearSearchHistory,this)
},keySearch:function(f,d,b){var a=f.getKey();
var c=String.fromCharCode(a);
var g=0;
if(!this.store.getCount()){return
}switch(a){case Ext.EventObject.HOME:f.stopEvent();
this.selectFirst();
return;
case Ext.EventObject.END:f.stopEvent();
this.selectLast();
return;
case Ext.EventObject.PAGEDOWN:this.selectNextPage();
f.stopEvent();
return;
case Ext.EventObject.PAGEUP:this.selectPrevPage();
f.stopEvent();
return
}if((f.hasModifier()&&!f.shiftKey)||f.isNavKeyPress()||f.isSpecialKey()){return
}if(this.lastSearchTerm==c){g=this.lastSelectedIndex
}this.search(this.displayField,c,g);
this.cshTask.delay(this.searchResetDelay)
},onRender:function(b,a){this.store.on("load",this.calcRowsPerPage,this);
Ext.ux.form.SelectBox.superclass.onRender.apply(this,arguments);
if(this.mode=="local"){this.initList();
this.calcRowsPerPage()
}},onSelect:function(a,c,b){if(this.fireEvent("beforeselect",this,a,c)!==false){this.setValue(a.data[this.valueField||this.displayField]);
if(!b){this.collapse()
}this.lastSelectedIndex=c+1;
this.fireEvent("select",this,a,c)
}},afterRender:function(){Ext.ux.form.SelectBox.superclass.afterRender.apply(this,arguments);
if(Ext.isWebKit){this.el.swallowEvent("mousedown",true)
}this.el.unselectable();
this.innerList.unselectable();
this.trigger.unselectable();
this.innerList.on("mouseup",function(c,b,a){if(b.id&&b.id==this.innerList.id){return
}this.onViewClick()
},this);
this.innerList.on("mouseover",function(c,b,a){if(b.id&&b.id==this.innerList.id){return
}this.lastSelectedIndex=this.view.getSelectedIndexes()[0]+1;
this.cshTask.delay(this.searchResetDelay)
},this);
this.trigger.un("click",this.onTriggerClick,this);
this.trigger.on("mousedown",function(c,b,a){c.preventDefault();
this.onTriggerClick()
},this);
this.on("collapse",function(c,b,a){Ext.getDoc().un("mouseup",this.collapseIf,this)
},this,true);
this.on("expand",function(c,b,a){Ext.getDoc().on("mouseup",this.collapseIf,this)
},this,true)
},clearSearchHistory:function(){this.lastSelectedIndex=0;
this.lastSearchTerm=false
},selectFirst:function(){this.focusAndSelect(this.store.data.first())
},selectLast:function(){this.focusAndSelect(this.store.data.last())
},selectPrevPage:function(){if(!this.rowHeight){return
}var a=Math.max(this.selectedIndex-this.rowsPerPage,0);
this.focusAndSelect(this.store.getAt(a))
},selectNextPage:function(){if(!this.rowHeight){return
}var a=Math.min(this.selectedIndex+this.rowsPerPage,this.store.getCount()-1);
this.focusAndSelect(this.store.getAt(a))
},search:function(c,b,d){c=c||this.displayField;
this.lastSearchTerm=b;
var a=this.store.find.apply(this.store,arguments);
if(a!==-1){this.focusAndSelect(a)
}},focusAndSelect:function(a){var b=Ext.isNumber(a)?a:this.store.indexOf(a);
this.select(b,this.isExpanded());
this.onSelect(this.store.getAt(b),b,this.isExpanded())
},calcRowsPerPage:function(){if(this.store.getCount()){this.rowHeight=Ext.fly(this.view.getNode(0)).getHeight();
this.rowsPerPage=this.maxHeight/this.rowHeight
}else{this.rowHeight=false
}}});
Ext.reg("selectbox",Ext.ux.form.SelectBox);
Ext.ux.SelectBox=Ext.ux.form.SelectBox;