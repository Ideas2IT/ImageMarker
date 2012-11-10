/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.GroupTab=Ext.extend(Ext.Container,{mainItem:0,expanded:true,deferredRender:true,activeTab:null,idDelimiter:"__",headerAsText:false,frame:false,hideBorders:true,initComponent:function(a){Ext.apply(this,a);
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
if(this.mainItem!==undefined){var b=(typeof this.mainItem=="object")?this.mainItem:this.items.get(this.mainItem);
delete this.mainItem;
this.setMainItem(b)
}},setActiveTab:function(c){c=this.getComponent(c);
if(!c){return false
}if(!this.rendered){this.activeTab=c;
return true
}if(this.activeTab!=c&&this.fireEvent("beforetabchange",this,c,this.activeTab)!==false){if(this.activeTab&&this.activeTab!=this.mainItem){var a=this.getTabEl(this.activeTab);
if(a){Ext.fly(a).removeClass("x-grouptabs-strip-active")
}}var b=this.getTabEl(c);
Ext.fly(b).addClass("x-grouptabs-strip-active");
this.activeTab=c;
this.stack.add(c);
this.layout.setActiveItem(c);
if(this.layoutOnTabChange&&c.doLayout){c.doLayout()
}if(this.scrolling){this.scrollToTab(c,this.animScroll)
}this.fireEvent("tabchange",this,c);
return true
}return false
},getTabEl:function(a){if(a==this.mainItem){return this.groupEl
}return Ext.TabPanel.prototype.getTabEl.call(this,a)
},onRender:function(b,a){Ext.ux.GroupTab.superclass.onRender.call(this,b,a);
this.strip=Ext.fly(this.groupEl).createChild({tag:"ul",cls:"x-grouptabs-sub"});
this.tooltip=new Ext.ToolTip({target:this.groupEl,delegate:"a.x-grouptabs-text",trackMouse:true,renderTo:document.body,listeners:{beforeshow:function(e){var d=(e.triggerElement.parentNode===this.mainItem.tabEl)?this.mainItem:this.findById(e.triggerElement.parentNode.id.split(this.idDelimiter)[1]);
if(!d.tabTip){return false
}e.body.dom.innerHTML=d.tabTip
},scope:this}});
if(!this.itemTpl){var c=new Ext.Template('<li class="{cls}" id="{id}">','<a onclick="return false;" class="x-grouptabs-text {iconCls}">{text}</a>',"</li>");
c.disableFormats=true;
c.compile();
Ext.ux.GroupTab.prototype.itemTpl=c
}this.items.each(this.initTab,this)
},afterRender:function(){Ext.ux.GroupTab.superclass.afterRender.call(this);
if(this.activeTab!==undefined){var a=(typeof this.activeTab=="object")?this.activeTab:this.items.get(this.activeTab);
delete this.activeTab;
this.setActiveTab(a)
}},initTab:function(c,a){var d=this.strip.dom.childNodes[a];
var e=Ext.TabPanel.prototype.getTemplateArgs.call(this,c);
if(c===this.mainItem){c.tabEl=this.groupEl;
e.cls+=" x-grouptabs-main-item"
}var b=d?this.itemTpl.insertBefore(d,e):this.itemTpl.append(this.strip,e);
c.tabEl=c.tabEl||b;
c.on("disable",this.onItemDisabled,this);
c.on("enable",this.onItemEnabled,this);
c.on("titlechange",this.onItemTitleChanged,this);
c.on("iconchange",this.onItemIconChanged,this);
c.on("beforeshow",this.onBeforeShowItem,this)
},setMainItem:function(a){a=this.getComponent(a);
if(!a||this.fireEvent("changemainitem",this,a,this.mainItem)===false){return
}this.mainItem=a
},getMainItem:function(){return this.mainItem||null
},onBeforeShowItem:function(a){if(a!=this.activeTab){this.setActiveTab(a);
return false
}},onAdd:function(a,c,b){if(this.rendered){this.initTab.call(this,c,b)
}},onRemove:function(c,b){Ext.destroy(Ext.get(this.getTabEl(b)));
this.stack.remove(b);
b.un("disable",this.onItemDisabled,this);
b.un("enable",this.onItemEnabled,this);
b.un("titlechange",this.onItemTitleChanged,this);
b.un("iconchange",this.onItemIconChanged,this);
b.un("beforeshow",this.onBeforeShowItem,this);
if(b==this.activeTab){var a=this.stack.next();
if(a){this.setActiveTab(a)
}else{if(this.items.getCount()>0){this.setActiveTab(0)
}else{this.activeTab=null
}}}},onBeforeAdd:function(b){var a=b.events?(this.items.containsKey(b.getItemId())?b:null):this.items.get(b);
if(a){this.setActiveTab(b);
return false
}Ext.TabPanel.superclass.onBeforeAdd.apply(this,arguments);
var c=b.elements;
b.elements=c?c.replace(",header",""):c;
b.border=(b.border===true)
},onItemDisabled:Ext.TabPanel.prototype.onItemDisabled,onItemEnabled:Ext.TabPanel.prototype.onItemEnabled,onItemTitleChanged:function(b){var a=this.getTabEl(b);
if(a){Ext.fly(a).child("a.x-grouptabs-text",true).innerHTML=b.title
}},onItemIconChanged:function(d,a,c){var b=this.getTabEl(d);
if(b){Ext.fly(b).child("a.x-grouptabs-text").replaceClass(c,a)
}},beforeDestroy:function(){Ext.TabPanel.prototype.beforeDestroy.call(this);
this.tooltip.destroy()
}});
Ext.reg("grouptab",Ext.ux.GroupTab);