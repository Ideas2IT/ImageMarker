/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.grid.filter.NumericFilter=Ext.extend(Ext.ux.grid.filter.Filter,{fieldCls:Ext.form.NumberField,iconCls:{gt:"ux-rangemenu-gt",lt:"ux-rangemenu-lt",eq:"ux-rangemenu-eq"},menuItemCfgs:{emptyText:"Enter Filter Text...",selectOnFocus:true,width:125},menuItems:["lt","gt","-","eq"],init:function(a){if(this.menu){this.menu.destroy()
}this.menu=new Ext.ux.menu.RangeMenu(Ext.apply(a,{fieldCfg:this.fieldCfg||{},fieldCls:this.fieldCls,fields:this.fields||{},iconCls:this.iconCls,menuItemCfgs:this.menuItemCfgs,menuItems:this.menuItems,updateBuffer:this.updateBuffer}));
this.menu.on("update",this.fireUpdate,this)
},getValue:function(){return this.menu.getValue()
},setValue:function(a){this.menu.setValue(a)
},isActivatable:function(){var a=this.getValue();
for(key in a){if(a[key]!==undefined){return true
}}return false
},getSerialArgs:function(){var c,b=[],a=this.menu.getValue();
for(c in a){b.push({type:"numeric",comparison:c,value:a[c]})
}return b
},validateRecord:function(a){var c=a.get(this.dataIndex),b=this.getValue();
if(b.eq!==undefined&&c!=b.eq){return false
}if(b.lt!==undefined&&c>=b.lt){return false
}if(b.gt!==undefined&&c<=b.gt){return false
}return true
}});