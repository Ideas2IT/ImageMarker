(function(b){var a={dragStart:"start.draggable",drag:"drag.draggable",dragStop:"stop.draggable",maxHeight:"maxHeight.resizable",minHeight:"minHeight.resizable",maxWidth:"maxWidth.resizable",minWidth:"minWidth.resizable",resizeStart:"start.resizable",resize:"drag.resizable",resizeStop:"stop.resizable"};
b.widget("ui.dialog",{_init:function(){this.element.attr("style","display:block");
this.originalTitle=this.element.attr("title");
this.options.title=this.options.title||this.originalTitle;
var k=this,l=this.options,f=this.element.removeAttr("title").addClass("ui-dialog-content").wrap("<div/>").wrap("<div/>"),h=(this.uiDialogContainer=f.parent()).addClass("ui-dialog-container").css({position:"relative",width:"100%",height:"100%"}),e=(this.uiDialogTitlebar=b("<div/>")).addClass("ui-dialog-titlebar").append('<a href="#" class="ui-dialog-titlebar-close"><span>X</span></a>').prependTo(h),j=l.title||"&nbsp;",c=b.ui.dialog.getTitleId(this.element),d=b("<span/>").addClass("ui-dialog-title").attr("id",c).html(j).prependTo(e),i=(this.uiDialog=h.parent()).appendTo(document.body).hide().addClass("ui-dialog").addClass(l.dialogClass).addClass(f.attr("className")).removeClass("ui-dialog-content").css({position:"absolute",width:l.width,height:l.height,top:l.top,left:l.left,overflow:"hidden",zIndex:l.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(m){(l.closeOnEscape&&m.keyCode&&m.keyCode==b.keyCode.ESCAPE&&k.close())
}).mousedown(function(){k._moveToTop()
}),g=(this.uiDialogButtonPane=b("<div/>")).addClass("ui-dialog-buttonpane").css({position:"absolute",bottom:0}).appendTo(i);
this.uiDialogTitlebarClose=b(".ui-dialog-titlebar-close",e).hover(function(){b(this).addClass("ui-dialog-titlebar-close-hover")
},function(){b(this).removeClass("ui-dialog-titlebar-close-hover")
}).mousedown(function(m){m.stopPropagation()
}).click(function(){k.close();
this._isOpen=false;
return false
});
e.find("*").add(e).each(function(){b.ui.disableSelection(this)
});
(l.draggable&&b.fn.draggable&&this._makeDraggable());
(l.resizable&&b.fn.resizable&&this._makeResizable());
this._createButtons(l.buttons);
this._isOpen=false;
(l.bgiframe&&b.fn.bgiframe&&i.bgiframe());
(l.autoOpen&&this.open())
},destroy:function(){(this.overlay&&this.overlay.destroy());
this.uiDialog.hide();
this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content").hide().appendTo("body");
this.uiDialog.remove();
(this.originalTitle&&this.element.attr("title",this.originalTitle))
},close:function(){if(false===this._trigger("beforeclose",null,{options:this.options})){return
}(this.overlay&&this.overlay.destroy());
this.uiDialog.hide(this.options.hide).unbind("keypress.ui-dialog");
this._trigger("close",null,{options:this.options});
b.ui.dialog.overlay.resize();
this._isOpen=false;
this.destroy()
},isOpen:function(){return this._isOpen
},open:function(){if(this._isOpen){return
}this.overlay=this.options.modal?new b.ui.dialog.overlay(this):null;
(this.uiDialog.next().length&&this.uiDialog.appendTo("body"));
this._position(this.options.position);
this.uiDialog.show(this.options.show);
(this.options.autoResize&&this._size());
this._moveToTop(true);
(this.options.modal&&this.uiDialog.bind("keypress.ui-dialog",function(f){if(f.keyCode!=b.keyCode.TAB){return
}var d=b(":tabbable",this),g=d.filter(":first")[0],c=d.filter(":last")[0];
if(f.target==c&&!f.shiftKey){setTimeout(function(){g.focus()
},1)
}else{if(f.target==g&&f.shiftKey){setTimeout(function(){c.focus()
},1)
}}}));
this.uiDialog.find(":tabbable:first").focus();
this._trigger("open",null,{options:this.options});
this._isOpen=true
},_createButtons:function(f){var e=this,c=false,d=this.uiDialogButtonPane;
d.empty().hide();
b.each(f,function(){return !(c=true)
});
if(c){d.show();
b.each(f,function(g,h){b('<button type="button"></button>').text(g).click(function(){h.apply(e.element[0],arguments)
}).appendTo(d)
})
}},_makeDraggable:function(){var c=this,d=this.options;
this.uiDialog.draggable({cancel:".ui-dialog-content",helper:d.dragHelper,handle:".ui-dialog-titlebar",start:function(){c._moveToTop();
(d.dragStart&&d.dragStart.apply(c.element[0],arguments))
},drag:function(){(d.drag&&d.drag.apply(c.element[0],arguments))
},stop:function(){(d.dragStop&&d.dragStop.apply(c.element[0],arguments));
b.ui.dialog.overlay.resize()
}})
},_makeResizable:function(f){f=(f===undefined?this.options.resizable:f);
var c=this,e=this.options,d=typeof f=="string"?f:"n,e,s,w,se,sw,ne,nw";
this.uiDialog.resizable({cancel:".ui-dialog-content",helper:e.resizeHelper,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:e.minHeight,start:function(){(e.resizeStart&&e.resizeStart.apply(c.element[0],arguments))
},resize:function(){(e.autoResize&&c._size.apply(c));
(e.resize&&e.resize.apply(c.element[0],arguments))
},handles:d,stop:function(){(e.autoResize&&c._size.apply(c));
(e.resizeStop&&e.resizeStop.apply(c.element[0],arguments));
b.ui.dialog.overlay.resize()
}})
},_moveToTop:function(e){if((this.options.modal&&!e)||(!this.options.stack&&!this.options.modal)){return this._trigger("focus",null,{options:this.options})
}var d=this.options.zIndex,c=this.options;
b(".ui-dialog:visible").each(function(){d=Math.max(d,parseInt(b(this).css("z-index"),10)||c.zIndex)
});
(this.overlay&&this.overlay.$el.css("z-index",++d));
this.uiDialog.css("z-index",++d);
this._trigger("focus",null,{options:this.options})
},_position:function(h){var d=b(window),e=b(document),f=e.scrollTop(),c=e.scrollLeft(),g=f;
if(b.inArray(h,["center","top","right","bottom","left"])>=0){h=[h=="right"||h=="left"?h:"center",h=="top"||h=="bottom"?h:"middle"]
}if(h.constructor!=Array){h=["center","middle"]
}if(h[0].constructor==Number){c+=h[0]
}else{switch(h[0]){case"left":c+=0;
break;
case"right":c+=d.width()-this.uiDialog.width();
break;
default:case"center":c+=(d.width()-this.uiDialog.width())/2
}}if(h[1].constructor==Number){f+=h[1]
}else{switch(h[1]){case"top":f+=0;
break;
case"bottom":f+=d.height()-this.uiDialog.height();
break;
default:case"middle":f+=(d.height()-this.uiDialog.height())/2
}}f=Math.max(f,g);
f=this.options.top;
c=this.options.left;
this.uiDialog.css({top:f,left:c})
},_setData:function(d,e){(a[d]&&this.uiDialog.data(a[d],e));
switch(d){case"buttons":this._createButtons(e);
break;
case"draggable":(e?this._makeDraggable():this.uiDialog.draggable("destroy"));
break;
case"height":this.uiDialog.height(e);
break;
case"position":this._position(e);
break;
case"resizable":var c=this.uiDialog,f=this.uiDialog.is(":data(resizable)");
(f&&!e&&c.resizable("destroy"));
(f&&typeof e=="string"&&c.resizable("option","handles",e));
(f||this._makeResizable(e));
break;
case"title":b(".ui-dialog-title",this.uiDialogTitlebar).html(e||"&nbsp;");
break;
case"width":this.uiDialog.width(e);
break
}b.widget.prototype._setData.apply(this,arguments)
},_size:function(){var d=this.uiDialogContainer,g=this.uiDialogTitlebar,e=this.element,f=(parseInt(e.css("margin-top"),10)||0)+(parseInt(e.css("margin-bottom"),10)||0),c=(parseInt(e.css("margin-left"),10)||0)+(parseInt(e.css("margin-right"),10)||0);
e.height(d.height()-g.outerHeight()-f);
e.width(d.width()-c)
}});
b.extend(b.ui.dialog,{defaults:{autoOpen:true,autoResize:true,bgiframe:false,buttons:{},closeOnEscape:true,draggable:true,height:200,minHeight:100,minWidth:150,modal:false,overlay:{},position:"center",resizable:true,stack:true,width:300,zIndex:1000},getter:"isOpen",uuid:0,getTitleId:function(c){return"ui-dialog-title-"+(c.attr("id")||++this.uuid)
},overlay:function(c){this.$el=b.ui.dialog.overlay.create(c)
}});
b.extend(b.ui.dialog.overlay,{instances:[],events:b.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(c){return c+".dialog-overlay"
}).join(" "),create:function(d){if(this.instances.length===0){setTimeout(function(){b("a, :input").bind(b.ui.dialog.overlay.events,function(){var f=false;
var h=b(this).parents(".ui-dialog");
if(h.length){var e=b(".ui-dialog-overlay");
if(e.length){var g=parseInt(e.css("z-index"),10);
e.each(function(){g=Math.max(g,parseInt(b(this).css("z-index"),10))
});
f=parseInt(h.css("z-index"),10)>g
}else{f=true
}}return f
})
},1);
b(document).bind("keydown.dialog-overlay",function(f){(d.options.closeOnEscape&&f.keyCode&&f.keyCode==b.keyCode.ESCAPE&&d.close())
});
b(window).bind("resize.dialog-overlay",b.ui.dialog.overlay.resize)
}var c=b("<div/>").appendTo(document.body).addClass("ui-dialog-overlay").css(b.extend({borderWidth:0,margin:0,padding:0,position:"absolute",top:0,left:0,width:this.width(),height:this.height()},d.options.overlay));
(d.options.bgiframe&&b.fn.bgiframe&&c.bgiframe());
this.instances.push(c);
return c
},destroy:function(c){this.instances.splice(b.inArray(this.instances,c),1);
if(this.instances.length===0){b("a, :input").add([document,window]).unbind(".dialog-overlay")
}c.remove()
},height:function(){if(b.browser.msie&&b.browser.version<7){var d=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);
var c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);
if(d<c){return b(window).height()+"px"
}else{return d+"px"
}}else{if(b.browser.opera){return Math.max(window.innerHeight,b(document).height())+"px"
}else{return b(document).height()+"px"
}}},width:function(){if(b.browser.msie&&b.browser.version<7){var c=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);
var d=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);
if(c<d){return b(window).width()+"px"
}else{return c+"px"
}}else{if(b.browser.opera){return Math.max(window.innerWidth,b(document).width())+"px"
}else{return b(document).width()+"px"
}}},resize:function(){var c=b([]);
b.each(b.ui.dialog.overlay.instances,function(){c=c.add(this)
});
c.css({width:0,height:0}).css({width:b.ui.dialog.overlay.width(),height:b.ui.dialog.overlay.height()})
}});
b.extend(b.ui.dialog.overlay.prototype,{destroy:function(){b.ui.dialog.overlay.destroy(this.$el)
}})
})(jQuery);