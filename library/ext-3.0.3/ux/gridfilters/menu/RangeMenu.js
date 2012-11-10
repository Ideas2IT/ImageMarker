/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.menu");
Ext.ux.menu.RangeMenu=Ext.extend(Ext.menu.Menu,{constructor:function(c){Ext.ux.menu.RangeMenu.superclass.constructor.call(this,c);
this.addEvents("update");
this.updateTask=new Ext.util.DelayedTask(this.fireUpdate,this);
var d,a,e,b,f;
for(d=0,a=this.menuItems.length;
d<a;
d++){e=this.menuItems[d];
if(e!=="-"){b={itemId:"range-"+e,enableKeyEvents:true,iconCls:this.iconCls[e]||"no-icon",listeners:{scope:this,keyup:this.onInputKeyUp}};
Ext.apply(b,Ext.applyIf(this.fields[e]||{},this.fieldCfg[e]),this.menuItemCfgs);
f=b.fieldCls||this.fieldCls;
e=this.fields[e]=new f(b)
}this.add(e)
}},fireUpdate:function(){this.fireEvent("update",this)
},getValue:function(){var a={},b,c;
for(b in this.fields){c=this.fields[b];
if(c.isValid()&&String(c.getValue()).length>0){a[b]=c.getValue()
}}return a
},setValue:function(b){var a;
for(a in this.fields){this.fields[a].setValue(b[a]!==undefined?b[a]:"")
}this.fireEvent("update",this)
},onInputKeyUp:function(c,b){var a=b.getKey();
if(a==b.RETURN&&c.isValid()){b.stopEvent();
this.hide(true);
return
}if(c==this.fields.eq){if(this.fields.gt){this.fields.gt.setValue(null)
}if(this.fields.lt){this.fields.lt.setValue(null)
}}else{this.fields.eq.setValue(null)
}this.updateTask.delay(this.updateBuffer)
}});