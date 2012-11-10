/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.SlidingPager=Ext.extend(Object,{init:function(a){Ext.each(a.items.getRange(2,6),function(d){d.hide()
});
var b=new Ext.Slider({width:114,minValue:1,maxValue:1,plugins:new Ext.ux.SliderTip({getText:function(c){return String.format("Page <b>{0}</b> of <b>{1}</b>",c.value,c.maxValue)
}}),listeners:{changecomplete:function(d,c){a.changePage(c)
}}});
a.insert(5,b);
a.on({change:function(c,d){b.maxValue=d.pages;
b.setValue(d.activePage)
},beforedestroy:function(){b.destroy()
}})
}});