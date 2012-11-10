/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.Spinner=Ext.extend(Ext.util.Observable,{incrementValue:1,alternateIncrementValue:5,triggerClass:"x-form-spinner-trigger",splitterClass:"x-form-spinner-splitter",alternateKey:Ext.EventObject.shiftKey,defaultValue:0,accelerate:false,constructor:function(a){Ext.ux.Spinner.superclass.constructor.call(this,a);
Ext.apply(this,a);
this.mimicing=false
},init:function(a){this.field=a;
a.afterMethod("onRender",this.doRender,this);
a.afterMethod("onEnable",this.doEnable,this);
a.afterMethod("onDisable",this.doDisable,this);
a.afterMethod("afterRender",this.doAfterRender,this);
a.afterMethod("onResize",this.doResize,this);
a.afterMethod("onFocus",this.doFocus,this);
a.beforeMethod("onDestroy",this.doDestroy,this)
},doRender:function(b,a){var c=this.el=this.field.getEl();
var d=this.field;
if(!d.wrap){d.wrap=this.wrap=c.wrap({cls:"x-form-field-wrap"})
}else{this.wrap=d.wrap.addClass("x-form-field-wrap")
}this.trigger=this.wrap.createChild({tag:"img",src:Ext.BLANK_IMAGE_URL,cls:"x-form-trigger "+this.triggerClass});
if(!d.width){this.wrap.setWidth(c.getWidth()+this.trigger.getWidth())
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
},doAfterRender:function(){var a;
if(Ext.isIE&&this.el.getY()!=(a=this.trigger.getY())){this.el.position();
this.el.setY(a)
}},doEnable:function(){if(this.wrap){this.wrap.removeClass(this.field.disabledClass)
}},doDisable:function(){if(this.wrap){this.wrap.addClass(this.field.disabledClass);
this.el.removeClass(this.field.disabledClass)
}},doResize:function(a,b){if(typeof a=="number"){this.el.setWidth(a-this.trigger.getWidth())
}this.wrap.setWidth(this.el.getWidth()+this.trigger.getWidth())
},doFocus:function(){if(!this.mimicing){this.wrap.addClass("x-trigger-wrap-focus");
this.mimicing=true;
Ext.get(Ext.isIE?document.body:document).on("mousedown",this.mimicBlur,this,{delay:10});
this.el.on("keydown",this.checkTab,this)
}},checkTab:function(a){if(a.getKey()==a.TAB){this.triggerBlur()
}},mimicBlur:function(a){if(!this.wrap.contains(a.target)&&this.field.validateBlur(a)){this.triggerBlur()
}},triggerBlur:function(){this.mimicing=false;
Ext.get(Ext.isIE?document.body:document).un("mousedown",this.mimicBlur,this);
this.el.un("keydown",this.checkTab,this);
this.field.beforeBlur();
this.wrap.removeClass("x-trigger-wrap-focus");
this.field.onBlur.call(this.field)
},initTrigger:function(){this.trigger.addClassOnOver("x-form-trigger-over");
this.trigger.addClassOnClick("x-form-trigger-click")
},initSpinner:function(){this.field.addEvents({spin:true,spinup:true,spindown:true});
this.keyNav=new Ext.KeyNav(this.el,{up:function(a){a.preventDefault();
this.onSpinUp()
},down:function(a){a.preventDefault();
this.onSpinDown()
},pageUp:function(a){a.preventDefault();
this.onSpinUpAlternate()
},pageDown:function(a){a.preventDefault();
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
}var a=this.getMiddle();
this.tmpHoverClass=(Ext.EventObject.getPageY()<a)?"x-form-spinner-overup":"x-form-spinner-overdown";
this.trigger.addClass(this.tmpHoverClass)
},onMouseOut:function(){this.trigger.removeClass(this.tmpHoverClass)
},onMouseMove:function(){if(this.disabled){return
}var a=this.getMiddle();
if(((Ext.EventObject.getPageY()>a)&&this.tmpHoverClass=="x-form-spinner-overup")||((Ext.EventObject.getPageY()<a)&&this.tmpHoverClass=="x-form-spinner-overdown")){}},onMouseDown:function(){if(this.disabled){return
}var a=this.getMiddle();
this.tmpClickClass=(Ext.EventObject.getPageY()<a)?"x-form-spinner-clickup":"x-form-spinner-clickdown";
this.trigger.addClass(this.tmpClickClass)
},onMouseUp:function(){this.trigger.removeClass(this.tmpClickClass)
},onTriggerClick:function(){if(this.disabled||this.el.dom.readOnly){return
}var b=this.getMiddle();
var a=(Ext.EventObject.getPageY()<b)?"Up":"Down";
this["onSpin"+a]()
},getMiddle:function(){var b=this.trigger.getTop();
var c=this.trigger.getHeight();
var a=b+(c/2);
return a
},isSpinnable:function(){if(this.disabled||this.el.dom.readOnly){Ext.EventObject.preventDefault();
return false
}return true
},handleMouseWheel:function(a){if(this.wrap.hasClass("x-trigger-wrap-focus")==false){return
}var b=a.getWheelDelta();
if(b>0){this.onSpinUp();
a.stopEvent()
}else{if(b<0){this.onSpinDown();
a.stopEvent()
}}},startDrag:function(){this.proxy.show();
this._previousY=Ext.fly(this.dd.getDragEl()).getTop()
},endDrag:function(){this.proxy.hide()
},onDrag:function(){if(this.disabled){return
}var b=Ext.fly(this.dd.getDragEl()).getTop();
var a="";
if(this._previousY>b){a="Up"
}if(this._previousY<b){a="Down"
}if(a!=""){this["onSpin"+a]()
}this._previousY=b
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
},spin:function(d,b){var a=parseFloat(this.field.getValue());
var c=(b==true)?this.alternateIncrementValue:this.incrementValue;
(d==true)?a-=c:a+=c;
a=(isNaN(a))?this.defaultValue:a;
a=this.fixBoundries(a);
this.field.setRawValue(a)
},fixBoundries:function(b){var a=b;
if(this.field.minValue!=undefined&&a<this.field.minValue){a=this.field.minValue
}if(this.field.maxValue!=undefined&&a>this.field.maxValue){a=this.field.maxValue
}return this.fixPrecision(a)
},fixPrecision:function(b){var a=isNaN(b);
if(!this.field.allowDecimals||this.field.decimalPrecision==-1||a||!b){return a?"":b
}return parseFloat(parseFloat(b).toFixed(this.field.decimalPrecision))
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