/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.StatusBar=Ext.extend(Ext.Toolbar,{cls:"x-statusbar",busyIconCls:"x-status-busy",busyText:"Loading...",autoClear:5000,emptyText:"&nbsp;",activeThreadId:0,initComponent:function(){if(this.statusAlign=="right"){this.cls+=" x-status-right"
}Ext.ux.StatusBar.superclass.initComponent.call(this)
},afterRender:function(){Ext.ux.StatusBar.superclass.afterRender.call(this);
var a=this.statusAlign=="right";
this.currIconCls=this.iconCls||this.defaultIconCls;
this.statusEl=new Ext.Toolbar.TextItem({cls:"x-status-text "+(this.currIconCls||""),text:this.text||this.defaultText||""});
if(a){this.add("->");
this.add(this.statusEl)
}else{this.insert(0,this.statusEl);
this.insert(1,"->")
}},setStatus:function(d){d=d||{};
if(typeof d=="string"){d={text:d}
}if(d.text!==undefined){this.setText(d.text)
}if(d.iconCls!==undefined){this.setIcon(d.iconCls)
}if(d.clear){var e=d.clear,b=this.autoClear,a={useDefaults:true,anim:true};
if(typeof e=="object"){e=Ext.applyIf(e,a);
if(e.wait){b=e.wait
}}else{if(typeof e=="number"){b=e;
e=a
}else{if(typeof e=="boolean"){e=a
}}}e.threadId=this.activeThreadId;
this.clearStatus.defer(b,this,[e])
}return this
},clearStatus:function(c){c=c||{};
if(c.threadId&&c.threadId!==this.activeThreadId){return this
}var b=c.useDefaults?this.defaultText:this.emptyText,a=c.useDefaults?(this.defaultIconCls?this.defaultIconCls:""):"";
if(c.anim){this.statusEl.el.fadeOut({remove:false,useDisplay:true,scope:this,callback:function(){this.setStatus({text:b,iconCls:a});
this.statusEl.el.show()
}})
}else{this.statusEl.hide();
this.setStatus({text:b,iconCls:a});
this.statusEl.show()
}return this
},setText:function(a){this.activeThreadId++;
this.text=a||"";
if(this.rendered){this.statusEl.setText(this.text)
}return this
},getText:function(){return this.text
},setIcon:function(a){this.activeThreadId++;
a=a||"";
if(this.rendered){if(this.currIconCls){this.statusEl.removeClass(this.currIconCls);
this.currIconCls=null
}if(a.length>0){this.statusEl.addClass(a);
this.currIconCls=a
}}else{this.currIconCls=a
}return this
},showBusy:function(a){if(typeof a=="string"){a={text:a}
}a=Ext.applyIf(a||{},{text:this.busyText,iconCls:this.busyIconCls});
return this.setStatus(a)
}});
Ext.reg("statusbar",Ext.ux.StatusBar);