/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.grid.filter.DateFilter=Ext.extend(Ext.ux.grid.filter.Filter,{afterText:"After",beforeText:"Before",compareMap:{before:"lt",after:"gt",on:"eq"},dateFormat:"m/d/Y",menuItems:["before","after","-","on"],menuItemCfgs:{selectOnFocus:true,width:125},onText:"On",pickerOpts:{},init:function(c){var g,d,a,e,b,f;
g=Ext.apply(this.pickerOpts,{minDate:this.minDate,maxDate:this.maxDate,format:this.dateFormat,listeners:{scope:this,select:this.onMenuSelect}});
this.fields={};
for(d=0,a=this.menuItems.length;
d<a;
d++){e=this.menuItems[d];
if(e!=="-"){b={itemId:"range-"+e,text:this[e+"Text"],menu:new Ext.menu.DateMenu(Ext.apply(g,{itemId:e})),listeners:{scope:this,checkchange:this.onCheckChange}};
f=Ext.menu.CheckItem;
e=this.fields[e]=new f(b)
}this.menu.add(e)
}},onCheckChange:function(){this.setActive(this.isActivatable());
this.fireEvent("update",this)
},onInputKeyUp:function(c,b){var a=b.getKey();
if(a==b.RETURN&&c.isValid()){b.stopEvent();
this.menu.hide(true);
return
}},onMenuSelect:function(c,d,b){var a=this.fields,e=this.fields[c.itemId];
e.setChecked(true);
if(e==a.on){a.before.setChecked(false,true);
a.after.setChecked(false,true)
}else{a.on.setChecked(false,true);
if(e==a.after&&a.before.menu.picker.value<d){a.before.setChecked(false,true)
}else{if(e==a.before&&a.after.menu.picker.value>d){a.after.setChecked(false,true)
}}}this.fireEvent("update",this)
},getValue:function(){var b,a={};
for(b in this.fields){if(this.fields[b].checked){a[b]=this.fields[b].menu.picker.getValue()
}}return a
},setValue:function(c,b){var a;
for(a in this.fields){if(c[a]){this.fields[a].menu.picker.setValue(c[a]);
this.fields[a].setChecked(true)
}else{if(!b){this.fields[a].setChecked(false)
}}}this.fireEvent("update",this)
},isActivatable:function(){var a;
for(a in this.fields){if(this.fields[a].checked){return true
}}return false
},getSerialArgs:function(){var a=[];
for(var b in this.fields){if(this.fields[b].checked){a.push({type:"date",comparison:this.compareMap[b],value:this.getFieldValue(b).format(this.dateFormat)})
}}return a
},getFieldValue:function(a){return this.fields[a].menu.picker.getValue()
},getPicker:function(a){return this.fields[a].menu.picker
},validateRecord:function(a){var b,d,c=a.get(this.dataIndex);
if(!Ext.isDate(c)){return false
}c=c.clearTime(true).getTime();
for(b in this.fields){if(this.fields[b].checked){d=this.getFieldValue(b).clearTime(true).getTime();
if(b=="before"&&d<=c){return false
}if(b=="after"&&d>=c){return false
}if(b=="on"&&d!=c){return false
}}}return true
}});