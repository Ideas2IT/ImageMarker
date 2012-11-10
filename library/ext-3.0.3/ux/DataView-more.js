/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.DataView.LabelEditor=Ext.extend(Ext.Editor,{alignment:"tl-tl",hideEl:false,cls:"x-small-editor",shim:false,completeOnEnter:true,cancelOnEsc:true,labelSelector:"span.x-editable",constructor:function(a,b){Ext.DataView.LabelEditor.superclass.constructor.call(this,b||new Ext.form.TextField({allowBlank:false,growMin:90,growMax:240,grow:true,selectOnFocus:true}),a)
},init:function(a){this.view=a;
a.on("render",this.initEditor,this);
this.on("complete",this.onSave,this)
},initEditor:function(){this.view.on({scope:this,containerclick:this.doBlur,click:this.doBlur});
this.view.getEl().on("mousedown",this.onMouseDown,this,{delegate:this.labelSelector})
},doBlur:function(){if(this.editing){this.field.blur()
}},onMouseDown:function(d,c){if(!d.ctrlKey&&!d.shiftKey){var b=this.view.findItemFromChild(c);
d.stopEvent();
var a=this.view.store.getAt(this.view.indexOf(b));
this.startEdit(c,a.data[this.dataIndex]);
this.activeRecord=a
}else{d.preventDefault()
}},onSave:function(a,b){this.activeRecord.set(this.dataIndex,b)
}});
Ext.DataView.DragSelector=function(f){f=f||{};
var i,h,k;
var d,j,l=new Ext.lib.Region(0,0,0,0);
var b=f.dragSafe===true;
this.init=function(p){i=p;
i.on("render",o)
};
function m(){d=[];
i.all.each(function(p){d[d.length]=p.getRegion()
});
j=i.el.getRegion()
}function e(){return false
}function g(p){return !b||p.target==i.el.dom
}function n(p){i.on("containerclick",e,i,{single:true});
if(!h){h=i.el.createChild({cls:"x-view-selector"})
}else{if(h.dom.parentNode!==i.el.dom){i.el.dom.appendChild(h.dom)
}h.setDisplayed("block")
}m();
i.clearSelections()
}function c(v){var z=k.startXY;
var D=k.getXY();
var B=Math.min(z[0],D[0]);
var A=Math.min(z[1],D[1]);
var C=Math.abs(z[0]-D[0]);
var t=Math.abs(z[1]-D[1]);
l.left=B;
l.top=A;
l.right=B+C;
l.bottom=A+t;
l.constrainTo(j);
h.setRegion(l);
for(var s=0,u=d.length;
s<u;
s++){var p=d[s],q=l.intersect(p);
if(q&&!p.selected){p.selected=true;
i.select(s,true)
}else{if(!q&&p.selected){p.selected=false;
i.deselect(s)
}}}}function a(p){if(!Ext.isIE){i.un("containerclick",e,i)
}if(h){h.setDisplayed(false)
}}function o(p){k=new Ext.dd.DragTracker({onBeforeStart:g,onStart:n,onDrag:c,onEnd:a});
k.initEl(p.el)
}};