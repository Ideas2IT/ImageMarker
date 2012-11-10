/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.tree.ColumnResizer=Ext.extend(Ext.util.Observable,{minWidth:14,constructor:function(a){Ext.apply(this,a);
Ext.tree.ColumnResizer.superclass.constructor.call(this)
},init:function(a){this.tree=a;
a.on("render",this.initEvents,this)
},initEvents:function(a){a.mon(a.innerHd,"mousemove",this.handleHdMove,this);
this.tracker=new Ext.dd.DragTracker({onBeforeStart:this.onBeforeStart.createDelegate(this),onStart:this.onStart.createDelegate(this),onDrag:this.onDrag.createDelegate(this),onEnd:this.onEnd.createDelegate(this),tolerance:3,autoStart:300});
this.tracker.initEl(a.innerHd);
a.on("beforedestroy",this.tracker.destroy,this.tracker)
},handleHdMove:function(f,j){var g=5,i=f.getPageX(),d=f.getTarget(".x-treegrid-hd",3,true);
if(d){var b=d.getRegion(),k=d.dom.style,c=d.dom.parentNode;
if(i-b.left<=g&&d.dom!==c.firstChild){var a=d.dom.previousSibling;
while(a&&Ext.fly(a).hasClass("x-treegrid-hd-hidden")){a=a.previousSibling
}if(a){this.activeHd=Ext.get(a);
k.cursor=Ext.isWebKit?"e-resize":"col-resize"
}}else{if(b.right-i<=g){var h=d.dom;
while(h&&Ext.fly(h).hasClass("x-treegrid-hd-hidden")){h=h.previousSibling
}if(h){this.activeHd=Ext.get(h);
k.cursor=Ext.isWebKit?"w-resize":"col-resize"
}}else{delete this.activeHd;
k.cursor=""
}}}},onBeforeStart:function(a){this.dragHd=this.activeHd;
return !!this.dragHd
},onStart:function(b){this.tree.headersDisabled=true;
this.proxy=this.tree.body.createChild({cls:"x-treegrid-resizer"});
this.proxy.setHeight(this.tree.body.getHeight());
var a=this.tracker.getXY()[0];
this.hdX=this.dragHd.getX();
this.hdIndex=this.tree.findHeaderIndex(this.dragHd);
this.proxy.setX(this.hdX);
this.proxy.setWidth(a-this.hdX);
this.maxWidth=this.tree.outerCt.getWidth()-this.tree.innerBody.translatePoints(this.hdX).left
},onDrag:function(b){var a=this.tracker.getXY()[0];
this.proxy.setWidth((a-this.hdX).constrain(this.minWidth,this.maxWidth))
},onEnd:function(c){var b=this.proxy.getWidth(),a=this.tree;
this.proxy.remove();
delete this.dragHd;
a.columns[this.hdIndex].width=b;
a.updateColumnWidths();
setTimeout(function(){a.headersDisabled=false
},100)
}});