/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.PanelResizer=Ext.extend(Ext.util.Observable,{minHeight:0,maxHeight:10000000,constructor:function(a){Ext.apply(this,a);
this.events={};
Ext.ux.PanelResizer.superclass.constructor.call(this,a)
},init:function(a){this.panel=a;
if(this.panel.elements.indexOf("footer")==-1){a.elements+=",footer"
}a.on("render",this.onRender,this)
},onRender:function(a){this.handle=a.footer.createChild({cls:"x-panel-resize"});
this.tracker=new Ext.dd.DragTracker({onStart:this.onDragStart.createDelegate(this),onDrag:this.onDrag.createDelegate(this),onEnd:this.onDragEnd.createDelegate(this),tolerance:3,autoStart:300});
this.tracker.initEl(this.handle);
a.on("beforedestroy",this.tracker.destroy,this.tracker)
},onDragStart:function(a){this.dragging=true;
this.startHeight=this.panel.el.getHeight();
this.fireEvent("dragstart",this,a)
},onDrag:function(a){this.panel.setHeight((this.startHeight-this.tracker.getOffset()[1]).constrain(this.minHeight,this.maxHeight));
this.fireEvent("drag",this,a)
},onDragEnd:function(a){this.dragging=false;
this.fireEvent("dragend",this,a)
}});
Ext.preg("panelresizer",Ext.ux.PanelResizer);