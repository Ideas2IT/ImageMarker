/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.ValidationStatus=Ext.extend(Ext.Component,{errorIconCls:"x-status-error",errorListCls:"x-status-error-list",validIconCls:"x-status-valid",showText:"The form has errors (click for details...)",hideText:"Click again to hide the error list",submitText:"Saving...",init:function(a){a.on("render",function(){this.statusBar=a;
this.monitor=true;
this.errors=new Ext.util.MixedCollection();
this.listAlign=(a.statusAlign=="right"?"br-tr?":"bl-tl?");
if(this.form){this.form=Ext.getCmp(this.form).getForm();
this.startMonitoring();
this.form.on("beforeaction",function(d,c){if(c.type=="submit"){this.monitor=false
}},this);
var b=function(){this.monitor=true
};
this.form.on("actioncomplete",b,this);
this.form.on("actionfailed",b,this)
}},this,{single:true});
a.on({scope:this,afterlayout:{single:true,fn:function(){a.statusEl.getEl().on("click",this.onStatusClick,this,{buffer:200})
}},beforedestroy:{single:true,fn:this.onDestroy}})
},startMonitoring:function(){this.form.items.each(function(a){a.on("invalid",this.onFieldValidation,this);
a.on("valid",this.onFieldValidation,this)
},this)
},stopMonitoring:function(){this.form.items.each(function(a){a.un("invalid",this.onFieldValidation,this);
a.un("valid",this.onFieldValidation,this)
},this)
},onDestroy:function(){this.stopMonitoring();
this.statusBar.statusEl.un("click",this.onStatusClick,this);
Ext.ux.ValidationStatus.superclass.onDestroy.call(this)
},onFieldValidation:function(a,b){if(!this.monitor){return false
}if(b){this.errors.add(a.id,{field:a,msg:b})
}else{this.errors.removeKey(a.id)
}this.updateErrorList();
if(this.errors.getCount()>0){if(this.statusBar.getText()!=this.showText){this.statusBar.setStatus({text:this.showText,iconCls:this.errorIconCls})
}}else{this.statusBar.clearStatus().setIcon(this.validIconCls)
}},updateErrorList:function(){if(this.errors.getCount()>0){var a="<ul>";
this.errors.each(function(b){a+=('<li id="x-err-'+b.field.id+'"><a href="#">'+b.msg+"</a></li>")
},this);
this.getMsgEl().update(a+"</ul>")
}else{this.getMsgEl().update("")
}},getMsgEl:function(){if(!this.msgEl){this.msgEl=Ext.DomHelper.append(Ext.getBody(),{cls:this.errorListCls+" x-hide-offsets"},true);
this.msgEl.on("click",function(b){var a=b.getTarget("li",10,true);
if(a){Ext.getCmp(a.id.split("x-err-")[1]).focus();
this.hideErrors()
}},this,{stopEvent:true})
}return this.msgEl
},showErrors:function(){this.updateErrorList();
this.getMsgEl().alignTo(this.statusBar.getEl(),this.listAlign).slideIn("b",{duration:0.3,easing:"easeOut"});
this.statusBar.setText(this.hideText);
this.form.getEl().on("click",this.hideErrors,this,{single:true})
},hideErrors:function(){var a=this.getMsgEl();
if(a.isVisible()){a.slideOut("b",{duration:0.2,easing:"easeIn"});
this.statusBar.setText(this.showText)
}this.form.getEl().un("click",this.hideErrors,this)
},onStatusClick:function(){if(this.getMsgEl().isVisible()){this.hideErrors()
}else{if(this.errors.getCount()>0){this.showErrors()
}}}});