/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux");
Ext.ux.FieldLabeler=(function(){function a(b){for(var c=this.ownerCt;
c;
c=c.ownerCt){if(c[b]){return c[b]
}}}return{init:function(b){b.onRender=b.onRender.createSequence(this.onRender);
b.onResize=this.onResize;
b.onDestroy=b.onDestroy.createSequence(this.onDestroy)
},onRender:function(){if(this.ownerCt){if(this.ownerCt.layout instanceof Ext.layout.FormLayout){return
}}this.resizeEl=(this.wrap||this.el).wrap({cls:"x-form-element",style:Ext.isIE?"position:absolute;top:0;left:0;overflow:visible":""});
this.positionEl=this.itemCt=this.resizeEl.wrap({cls:"x-form-item "});
if(this.nextSibling()){this.margins={top:0,right:0,bottom:this.positionEl.getMargins("b"),left:0}
}this.actionMode="itemCt";
if(!Ext.isDefined(this.hideLabels)){this.hideLabels=a.call(this,"hideLabels")
}if(this.hideLabels){this.resizeEl.setStyle("padding-left","0px");
return
}if(!Ext.isDefined(this.labelSeparator)){this.labelSeparator=a.call(this,"labelSeparator")
}if(!Ext.isDefined(this.labelPad)){this.labelPad=a.call(this,"labelPad")
}if(!Ext.isDefined(this.labelAlign)){this.labelAlign=a.call(this,"labelAlign")||"left"
}this.itemCt.addClass("x-form-label-"+this.labelAlign);
if(this.labelAlign=="top"){if(!this.labelWidth){this.labelWidth="auto"
}this.resizeEl.setStyle("padding-left","0px")
}else{if(!Ext.isDefined(this.labelWidth)){this.labelWidth=a.call(this,"labelWidth")||100
}this.resizeEl.setStyle("padding-left",(this.labelWidth+(this.labelPad||5))+"px");
this.labelWidth+="px"
}this.label=this.itemCt.insertFirst({tag:"label",cls:"x-form-item-label",style:{width:this.labelWidth},html:this.fieldLabel+(this.labelSeparator||":")})
},onResize:function(b,c){Ext.form.Field.prototype.onResize.apply(this,arguments);
b-=this.resizeEl.getPadding("l");
if(this.getTriggerWidth){this.wrap.setWidth(b);
this.el.setWidth(b-this.getTriggerWidth())
}else{this.el.setWidth(b)
}if(this.el.dom.tagName.toLowerCase()=="textarea"){var c=this.resizeEl.getHeight(true);
if(!this.hideLabels&&(this.labelAlign=="top")){c-=this.label.getHeight()
}this.el.setHeight(c)
}},onDestroy:function(){this.itemCt.remove()
}}
})();