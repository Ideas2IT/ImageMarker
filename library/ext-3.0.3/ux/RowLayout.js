/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.layout");
Ext.ux.layout.RowLayout=Ext.extend(Ext.layout.ContainerLayout,{monitorResize:true,isValidParent:function(b,a){return b.getEl().dom.parentNode==this.innerCt.dom
},onLayout:function(f,j){var b=f.items.items,g=b.length,a,c;
if(!this.innerCt){j.addClass("ux-row-layout-ct");
this.innerCt=j.createChild({cls:"x-row-inner"})
}this.renderAll(f,this.innerCt);
var k=j.getViewSize(true);
if(k.width<1&&k.height<1){return
}var d=k.height,e=d;
this.innerCt.setSize({height:d});
for(c=0;
c<g;
c++){a=b[c];
if(!a.rowHeight){e-=(a.getSize().height+a.getEl().getMargins("tb"))
}}e=e<0?0:e;
for(c=0;
c<g;
c++){a=b[c];
if(a.rowHeight){a.setSize({height:Math.floor(a.rowHeight*e)-a.getEl().getMargins("tb")})
}}}});
Ext.Container.LAYOUTS["ux.row"]=Ext.ux.layout.RowLayout;