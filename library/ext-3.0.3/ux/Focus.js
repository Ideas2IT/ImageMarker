/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
(function(){Ext.ns("Ext.a11y");
Ext.a11y.Frame=Ext.extend(Object,{initialized:false,constructor:function(b,a){this.setSize(b||1);
this.setColor(a||"15428B")
},init:function(){if(!this.initialized){this.sides=[];
var b,a;
this.ct=Ext.DomHelper.append(document.body,{cls:"x-a11y-focusframe"},true);
for(a=0;
a<4;
a++){b=Ext.DomHelper.append(this.ct,{cls:"x-a11y-focusframe-side",style:"background-color: #"+this.color},true);
b.visibilityMode=Ext.Element.DISPLAY;
this.sides.push(b)
}this.frameTask=new Ext.util.DelayedTask(function(e){var f=Ext.get(e);
if(f!=this.curEl){var c=f.getWidth();
var d=f.getHeight();
this.sides[0].show().setSize(c,this.size).anchorTo(e,"tl",[0,-1]);
this.sides[2].show().setSize(c,this.size).anchorTo(e,"bl",[0,-1]);
this.sides[1].show().setSize(this.size,d).anchorTo(e,"tr",[-1,0]);
this.sides[3].show().setSize(this.size,d).anchorTo(e,"tl",[-1,0]);
this.curEl=f
}},this);
this.unframeTask=new Ext.util.DelayedTask(function(){if(this.initialized){this.sides[0].hide();
this.sides[1].hide();
this.sides[2].hide();
this.sides[3].hide();
this.curEl=null
}},this);
this.initialized=true
}},frame:function(a){this.init();
this.unframeTask.cancel();
this.frameTask.delay(2,false,false,[a])
},unframe:function(){this.init();
this.unframeTask.delay(2)
},setSize:function(a){this.size=a
},setColor:function(a){this.color=a
}});
Ext.a11y.FocusFrame=new Ext.a11y.Frame(2,"15428B");
Ext.a11y.RelayFrame=new Ext.a11y.Frame(1,"6B8CBF");
Ext.a11y.Focusable=Ext.extend(Ext.util.Observable,{constructor:function(b,d,c,a){Ext.a11y.Focusable.superclass.constructor.call(this);
this.addEvents("focus","blur","left","right","up","down","esc","enter","space");
if(b instanceof Ext.Component){this.el=b.el;
this.setComponent(b)
}else{this.el=Ext.get(b);
this.setComponent(null)
}this.setRelayTo(d);
this.setNoFrame(c);
this.setFrameEl(a);
this.init();
Ext.a11y.FocusMgr.register(this)
},init:function(){this.el.dom.tabIndex="1";
this.el.addClass("x-a11y-focusable");
this.el.on({focus:this.onFocus,blur:this.onBlur,keydown:this.onKeyDown,scope:this})
},setRelayTo:function(a){this.relayTo=a?Ext.a11y.FocusMgr.get(a):null
},setNoFrame:function(a){this.noFrame=(a===true)?true:false
},setFrameEl:function(a){this.frameEl=a&&Ext.get(a)||this.el
},setComponent:function(a){this.component=a||null
},onKeyDown:function(g,d){var b=g.getKey(),a=Ext.a11y.Focusable.SpecialKeys,c,f;
f=(d!==this.el.dom)?Ext.a11y.FocusMgr.get(d,true):this;
if(!f){f=Ext.a11y.FocusMgr.get(Ext.fly(d).parent(".x-a11y-focusable"))
}if(a[b]!==undefined){c=this.fireEvent(a[b],g,d,f,this)
}if(c===false||this.fireEvent("keydown",g,d,f,this)===false){g.stopEvent()
}},focus:function(){this.el.dom.focus()
},blur:function(){this.el.dom.blur()
},onFocus:function(b,a){this.el.addClass("x-a11y-focused");
if(this.relayTo){this.relayTo.el.addClass("x-a11y-focused-relay");
if(!this.relayTo.noFrame){Ext.a11y.FocusFrame.frame(this.relayTo.frameEl)
}if(!this.noFrame){Ext.a11y.RelayFrame.frame(this.frameEl)
}}else{if(!this.noFrame){Ext.a11y.FocusFrame.frame(this.frameEl)
}}this.fireEvent("focus",b,a,this)
},onBlur:function(b,a){if(this.relayTo){this.relayTo.el.removeClass("x-a11y-focused-relay");
Ext.a11y.RelayFrame.unframe()
}this.el.removeClass("x-a11y-focused");
Ext.a11y.FocusFrame.unframe();
this.fireEvent("blur",b,a,this)
},destroy:function(){this.el.un("keydown",this.onKeyDown);
this.el.un("focus",this.onFocus);
this.el.un("blur",this.onBlur);
this.el.removeClass("x-a11y-focusable");
this.el.removeClass("x-a11y-focused");
if(this.relayTo){this.relayTo.el.removeClass("x-a11y-focused-relay")
}}});
Ext.a11y.FocusItem=Ext.extend(Object,{constructor:function(b,a){Ext.a11y.FocusItem.superclass.constructor.call(this);
this.el=Ext.get(b);
this.fi=new Ext.a11y.Focusable(b);
this.fi.setComponent(this);
this.fi.on("tab",this.onTab,this);
this.enableTabbing=a===true?true:false
},getEnterItem:function(){if(this.enableTabbing){var a=this.getFocusItems();
if(a&&a.length){return a[0]
}}},getFocusItems:function(){if(this.enableTabbing){return this.el.query("a, button, input, select")
}return null
},onTab:function(d,c){var a=this.getFocusItems(),b;
if(a&&a.length&&(b=a.indexOf(c))!==-1){if(d.shiftKey&&b>0){d.stopEvent();
a[b-1].focus();
Ext.a11y.FocusFrame.frame.defer(20,Ext.a11y.FocusFrame,[this.el]);
return
}else{if(!d.shiftKey&&b<a.length-1){d.stopEvent();
a[b+1].focus();
Ext.a11y.FocusFrame.frame.defer(20,Ext.a11y.FocusFrame,[this.el]);
return
}}}},focus:function(){if(this.enableTabbing){var a=this.getFocusItems();
if(a&&a.length){a[0].focus();
Ext.a11y.FocusFrame.frame.defer(20,Ext.a11y.FocusFrame,[this.el]);
return
}}this.fi.focus()
},blur:function(){this.fi.blur()
}});
Ext.a11y.FocusMgr=function(){var a=new Ext.util.MixedCollection();
return{register:function(b){a.add(b.el&&Ext.id(b.el),b)
},unregister:function(b){a.remove(b)
},get:function(c,b){return a.get(Ext.id(c))||(b?false:new Ext.a11y.Focusable(c))
},all:a}
}();
Ext.a11y.Focusable.SpecialKeys={};
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.LEFT]="left";
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.RIGHT]="right";
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.DOWN]="down";
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.UP]="up";
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.ESC]="esc";
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.ENTER]="enter";
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.SPACE]="space";
Ext.a11y.Focusable.SpecialKeys[Ext.EventObjectImpl.prototype.TAB]="tab";
Ext.util.Observable.observeClass(Ext.Component);
Ext.Component.on("render",function(a){a.initFocus();
a.initARIA()
});
Ext.override(Ext.Component,{initFocus:Ext.emptyFn,initARIA:Ext.emptyFn});
Ext.override(Ext.Container,{isFocusable:true,noFocus:false,initFocus:function(){if(!this.fi&&!this.noFocus){this.fi=new Ext.a11y.Focusable(this)
}this.mon(this.fi,{focus:this.onFocus,blur:this.onBlur,tab:this.onTab,enter:this.onEnter,esc:this.onEsc,scope:this});
if(this.hidden){this.isFocusable=false
}this.on("show",function(){this.isFocusable=true
},this);
this.on("hide",function(){this.isFocusable=false
},this)
},focus:function(){this.fi.focus()
},blur:function(){this.fi.blur()
},enter:function(){var a=this.getEnterItem();
if(a){a.focus()
}},onFocus:Ext.emptyFn,onBlur:Ext.emptyFn,onTab:function(f,b,d){var a=d.relayTo||d;
if(a.component&&a.component!==this){f.stopEvent();
var c=f.shiftKey?this.getPreviousFocus(a.component):this.getNextFocus(a.component);
c.focus()
}},onEnter:function(c,a,b){if(b.component&&b.component===this){c.stopEvent();
this.enter()
}c.stopPropagation()
},onEsc:function(c,b){c.preventDefault();
if(b===this.el.dom){if(this.ownerCt){this.ownerCt.focus()
}}else{if(this.ownerCt&&this.ownerCt.isFocusable){var a=this.ownerCt.getFocusItems();
if(a&&a.getCount()>1){c.stopEvent()
}}this.focus()
}},getFocusItems:function(){return this.items&&this.items.filterBy(function(a){return a.isFocusable
})||null
},getEnterItem:function(){var a=this.getFocusItems(),b=a?a.getCount():0;
if(b===1){return a.first().getEnterItem&&a.first().getEnterItem()||a.first()
}else{if(b>1){return a.first()
}}},getNextFocus:function(e){var a=this.getFocusItems(),c=e,b=a.indexOf(e),d=a.getCount();
if(b===d-1){c=a.first()
}else{c=a.get(b+1)
}return c
},getPreviousFocus:function(e){var a=this.getFocusItems(),d=e,b=a.indexOf(e),c=a.getCount();
if(b===0){d=a.last()
}else{d=a.get(b-1)
}return d
},getFocusable:function(){return this.fi
}});
Ext.override(Ext.Panel,{getFocusItems:function(){var a=Ext.Panel.superclass.getFocusItems.call(this),b=null;
if(!a){a=new Ext.util.MixedCollection();
this.bodyFocus=this.bodyFocus||new Ext.a11y.FocusItem(this.body,this.enableTabbing);
a.add("body",this.bodyFocus)
}if(this.tbar&&this.topToolbar){a.insert(0,this.topToolbar)
}if(this.bbar&&this.bottomToolbar){a.add(this.bottomToolbar)
}if(this.fbar){a.add(this.fbar)
}return a
}});
Ext.override(Ext.TabPanel,{initFocus:function(){Ext.TabPanel.superclass.initFocus.call(this);
this.mon(this.fi,{left:this.onLeft,right:this.onRight,scope:this})
},onLeft:function(b){if(!this.activeTab){return
}b.stopEvent();
var a=this.items.itemAt(this.items.indexOf(this.activeTab)-1);
if(a){this.setActiveTab(a)
}return false
},onRight:function(b){if(!this.activeTab){return
}b.stopEvent();
var a=this.items.itemAt(this.items.indexOf(this.activeTab)+1);
if(a){this.setActiveTab(a)
}return false
}});
Ext.override(Ext.tree.TreeNodeUI,{focus:function(){this.node.getOwnerTree().bodyFocus.focus()
}});
Ext.override(Ext.tree.TreePanel,{afterRender:function(){Ext.tree.TreePanel.superclass.afterRender.call(this);
this.root.render();
if(!this.rootVisible){this.root.renderChildren()
}this.bodyFocus=new Ext.a11y.FocusItem(this.body.down(".x-tree-root-ct"));
this.bodyFocus.fi.setFrameEl(this.body)
}});
Ext.override(Ext.grid.GridPanel,{initFocus:function(){Ext.grid.GridPanel.superclass.initFocus.call(this);
this.bodyFocus=new Ext.a11y.FocusItem(this.view.focusEl);
this.bodyFocus.fi.setFrameEl(this.body)
}});
Ext.override(Ext.Button,{isFocusable:true,noFocus:false,initFocus:function(){Ext.Button.superclass.initFocus.call(this);
this.fi=this.fi||new Ext.a11y.Focusable(this.btnEl,null,null,this.el);
this.fi.setComponent(this);
this.mon(this.fi,{focus:this.onFocus,blur:this.onBlur,scope:this});
if(this.menu){this.mon(this.fi,"down",this.showMenu,this);
this.on("menuhide",this.focus,this)
}if(this.hidden){this.isFocusable=false
}this.on("show",function(){this.isFocusable=true
},this);
this.on("hide",function(){this.isFocusable=false
},this)
},focus:function(){this.fi.focus()
},blur:function(){this.fi.blur()
},onFocus:function(){if(!this.disabled){this.el.addClass("x-btn-focus")
}},onBlur:function(){this.el.removeClass("x-btn-focus")
}});
Ext.override(Ext.Toolbar,{initFocus:function(){Ext.Toolbar.superclass.initFocus.call(this);
this.mon(this.fi,{left:this.onLeft,right:this.onRight,scope:this});
this.on("focus",this.onButtonFocus,this,{stopEvent:true})
},add:function(){var a=Ext.Toolbar.superclass.add.apply(this,arguments);
if(!a||!a.events){return a
}if(a.rendered&&a.fi!==undefined){a.fi.setRelayTo(this.el);
this.relayEvents(a.fi,["focus"])
}else{a.on("render",function(){if(a.fi!==undefined){a.fi.setRelayTo(this.el);
this.relayEvents(a.fi,["focus"])
}},this,{single:true})
}return a
},onFocus:function(){var a=this.getFocusItems();
if(a&&a.getCount()>0){if(this.lastFocus&&a.indexOf(this.lastFocus)!==-1){this.lastFocus.focus()
}else{a.first().focus()
}}},onButtonFocus:function(c,a,b){this.lastFocus=b.component||null
},onLeft:function(c,a,b){c.stopEvent();
this.getPreviousFocus(b.component).focus()
},onRight:function(c,a,b){c.stopEvent();
this.getNextFocus(b.component).focus()
},getEnterItem:Ext.emptyFn,onTab:Ext.emptyFn,onEsc:Ext.emptyFn});
Ext.override(Ext.menu.BaseItem,{initFocus:function(){this.fi=new Ext.a11y.Focusable(this,this.parentMenu&&this.parentMenu.el||null,true)
}});
Ext.override(Ext.menu.Menu,{initFocus:function(){this.fi=new Ext.a11y.Focusable(this);
this.focusEl=this.fi
}});
Ext.a11y.WindowMgr=new Ext.WindowGroup();
Ext.apply(Ext.WindowMgr,{bringToFront:function(a){Ext.a11y.WindowMgr.bringToFront.call(this,a);
if(a.modal){a.enter()
}else{a.focus()
}}});
Ext.override(Ext.Window,{initFocus:function(){Ext.Window.superclass.initFocus.call(this);
this.on("beforehide",function(){Ext.a11y.RelayFrame.unframe();
Ext.a11y.FocusFrame.unframe()
})
}});
Ext.override(Ext.form.Field,{isFocusable:true,noFocus:false,initFocus:function(){this.fi=this.fi||new Ext.a11y.Focusable(this,null,true);
Ext.form.Field.superclass.initFocus.call(this);
if(this.hidden){this.isFocusable=false
}this.on("show",function(){this.isFocusable=true
},this);
this.on("hide",function(){this.isFocusable=false
},this)
}});
Ext.override(Ext.FormPanel,{initFocus:function(){Ext.FormPanel.superclass.initFocus.call(this);
this.on("focus",this.onFieldFocus,this,{stopEvent:true})
},createForm:function(){delete this.initialConfig.listeners;
var a=new Ext.form.BasicForm(null,this.initialConfig);
a.afterMethod("add",this.formItemAdd,this);
return a
},formItemAdd:function(a){a.on("render",function(b){b.fi.setRelayTo(this.el);
this.relayEvents(b.fi,["focus"])
},this,{single:true})
},onFocus:function(){var a=this.getFocusItems();
if(a&&a.getCount()>0){if(this.lastFocus&&a.indexOf(this.lastFocus)!==-1){this.lastFocus.focus()
}else{a.first().focus()
}}},onFieldFocus:function(c,a,b){this.lastFocus=b.component||null
},onTab:function(d,a,c){if(c.relayTo.component===this){var b=d.shiftKey?this.getPreviousFocus(c.component):this.getNextFocus(c.component);
if(b){ev.stopEvent();
b.focus();
return
}}Ext.FormPanel.superclass.onTab.apply(this,arguments)
},getNextFocus:function(d){var a=this.getFocusItems(),b=a.indexOf(d),c=a.getCount();
return(b<c-1)?a.get(b+1):false
},getPreviousFocus:function(d){var a=this.getFocusItems(),b=a.indexOf(d),c=a.getCount();
return(b>0)?a.get(b-1):false
}});
Ext.override(Ext.Viewport,{initFocus:function(){Ext.Viewport.superclass.initFocus.apply(this);
this.mon(Ext.get(document),"focus",this.focus,this);
this.mon(Ext.get(document),"blur",this.blur,this);
this.fi.setNoFrame(true)
},onTab:function(h,b,g,d){h.stopEvent();
if(g===d){items=this.getFocusItems();
if(items&&items.getCount()>0){items.first().focus()
}}else{var a=g.relayTo||g;
var c=h.shiftKey?this.getPreviousFocus(a.component):this.getNextFocus(a.component);
c.focus()
}}})
})();