(function(a){a.widget("ui.draggable",a.extend({},a.ui.mouse,{getHandle:function(c){var b=!this.options.handle||!a(this.options.handle,this.element).length?true:false;
a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==c.target){b=true
}});
return b
},createHelper:function(){var c=this.options;
var b=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[e])):(c.helper=="clone"?this.element.clone():this.element);
if(!b.parents("body").length){b.appendTo((c.appendTo=="parent"?this.element[0].parentNode:c.appendTo))
}if(b[0]!=this.element[0]&&!(/(fixed|absolute)/).test(b.css("position"))){b.css("position","absolute")
}return b
},_init:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"
}(this.options.cssNamespace&&this.element.addClass(this.options.cssNamespace+"-draggable"));
(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));
this._mouseInit()
},_mouseCapture:function(b){var c=this.options;
if(this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")){return false
}this.handle=this.getHandle(b);
if(!this.handle){return false
}return true
},_mouseStart:function(d){var f=this.options;
this.helper=this.createHelper();
if(a.ui.ddmanager){a.ui.ddmanager.current=this
}this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)};
this.cssPosition=this.helper.css("position");
this.offset=this.element.offset();
this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};
this.offset.click={left:d.pageX-this.offset.left,top:d.pageY-this.offset.top};
this.cacheScrollParents();
this.offsetParent=this.helper.offsetParent();
var b=this.offsetParent.offset();
if(this.offsetParent[0]==document.body&&a.browser.mozilla){b={top:0,left:0}
}this.offset.parent={top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)};
if(this.cssPosition=="relative"){var c=this.element.position();
this.offset.relative={top:c.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollTopParent.scrollTop(),left:c.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollLeftParent.scrollLeft()}
}else{this.offset.relative={top:0,left:0}
}this.originalPosition=this._generatePosition(d);
this.cacheHelperProportions();
if(f.cursorAt){this.adjustOffsetFromHelper(f.cursorAt)
}a.extend(this,{PAGEY_INCLUDES_SCROLL:(this.cssPosition=="absolute"&&(!this.scrollTopParent[0].tagName||(/(html|body)/i).test(this.scrollTopParent[0].tagName))),PAGEX_INCLUDES_SCROLL:(this.cssPosition=="absolute"&&(!this.scrollLeftParent[0].tagName||(/(html|body)/i).test(this.scrollLeftParent[0].tagName))),OFFSET_PARENT_NOT_SCROLL_PARENT_Y:this.scrollTopParent[0]!=this.offsetParent[0]&&!(this.scrollTopParent[0]==document&&(/(body|html)/i).test(this.offsetParent[0].tagName)),OFFSET_PARENT_NOT_SCROLL_PARENT_X:this.scrollLeftParent[0]!=this.offsetParent[0]&&!(this.scrollLeftParent[0]==document&&(/(body|html)/i).test(this.offsetParent[0].tagName))});
if(f.containment){this.setContainment()
}this._propagate("start",d);
this.cacheHelperProportions();
if(a.ui.ddmanager&&!f.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,d)
}this.helper.addClass("ui-draggable-dragging");
this._mouseDrag(d);
return true
},cacheScrollParents:function(){this.scrollTopParent=function(b){do{if(/auto|scroll/.test(b.css("overflow"))||(/auto|scroll/).test(b.css("overflow-y"))){return b
}b=b.parent()
}while(b[0].parentNode);
return a(document)
}(this.helper);
this.scrollLeftParent=function(b){do{if(/auto|scroll/.test(b.css("overflow"))||(/auto|scroll/).test(b.css("overflow-x"))){return b
}b=b.parent()
}while(b[0].parentNode);
return a(document)
}(this.helper)
},adjustOffsetFromHelper:function(b){if(b.left!=undefined){this.offset.click.left=b.left+this.margins.left
}if(b.right!=undefined){this.offset.click.left=this.helperProportions.width-b.right+this.margins.left
}if(b.top!=undefined){this.offset.click.top=b.top+this.margins.top
}if(b.bottom!=undefined){this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top
}},cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}
},setContainment:function(){var f=this.options;
if(f.containment=="parent"){f.containment=this.helper[0].parentNode
}if(f.containment=="document"||f.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(f.containment=="document"?document:window).width()-this.offset.relative.left-this.offset.parent.left-this.helperProportions.width-this.margins.left-(parseInt(this.element.css("marginRight"),10)||0),(a(f.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.offset.relative.top-this.offset.parent.top-this.helperProportions.height-this.margins.top-(parseInt(this.element.css("marginBottom"),10)||0)]
}if(!(/^(document|window|parent)$/).test(f.containment)){var c=a(f.containment)[0];
var d=a(f.containment).offset();
var b=(a(c).css("overflow")!="hidden");
this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)-this.offset.relative.left-this.offset.parent.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)-this.offset.relative.top-this.offset.parent.top,d.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-this.offset.relative.left-this.offset.parent.left-this.helperProportions.width-this.margins.left-(parseInt(this.element.css("marginRight"),10)||0),d.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-this.offset.relative.top-this.offset.parent.top-this.helperProportions.height-this.margins.top-(parseInt(this.element.css("marginBottom"),10)||0)]
}},_convertPositionTo:function(c,f){if(!f){f=this.position
}var b=c=="absolute"?1:-1;
return{top:(f.top+this.offset.relative.top*b+this.offset.parent.top*b-(this.cssPosition=="fixed"||this.PAGEY_INCLUDES_SCROLL||this.OFFSET_PARENT_NOT_SCROLL_PARENT_Y?0:this.scrollTopParent.scrollTop())*b+(this.cssPosition=="fixed"?a(document).scrollTop():0)*b+this.margins.top*b),left:(f.left+this.offset.relative.left*b+this.offset.parent.left*b-(this.cssPosition=="fixed"||this.PAGEX_INCLUDES_SCROLL||this.OFFSET_PARENT_NOT_SCROLL_PARENT_X?0:this.scrollLeftParent.scrollLeft())*b+(this.cssPosition=="fixed"?a(document).scrollLeft():0)*b+this.margins.left*b)}
},_generatePosition:function(f){var g=this.options;
var b={top:(f.pageY-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(this.cssPosition=="fixed"||this.PAGEY_INCLUDES_SCROLL||this.OFFSET_PARENT_NOT_SCROLL_PARENT_Y?0:this.scrollTopParent.scrollTop())-(this.cssPosition=="fixed"?a(document).scrollTop():0)),left:(f.pageX-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(this.cssPosition=="fixed"||this.PAGEX_INCLUDES_SCROLL||this.OFFSET_PARENT_NOT_SCROLL_PARENT_X?0:this.scrollLeftParent.scrollLeft())-(this.cssPosition=="fixed"?a(document).scrollLeft():0))};
if(!this.originalPosition){return b
}if(this.containment){if(b.left<this.containment[0]){b.left=this.containment[0]
}if(b.top<this.containment[1]){b.top=this.containment[1]
}if(b.left>this.containment[2]){b.left=this.containment[2]
}if(b.top>this.containment[3]){b.top=this.containment[3]
}}if(g.grid){var d=this.originalPosition.top+Math.round((b.top-this.originalPosition.top)/g.grid[1])*g.grid[1];
b.top=this.containment?(!(d<this.containment[1]||d>this.containment[3])?d:(!(d<this.containment[1])?d-g.grid[1]:d+g.grid[1])):d;
var c=this.originalPosition.left+Math.round((b.left-this.originalPosition.left)/g.grid[0])*g.grid[0];
b.left=this.containment?(!(c<this.containment[0]||c>this.containment[2])?c:(!(c<this.containment[0])?c-g.grid[0]:c+g.grid[0])):c
}return b
},_mouseDrag:function(b){this.position=this._generatePosition(b);
this.positionAbs=this._convertPositionTo("absolute");
this.position=this._propagate("drag",b)||this.position;
if(this.position.top<0){this.position.top=0
}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"
}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"
}if(a.ui.ddmanager){a.ui.ddmanager.drag(this,b)
}return false
},_mouseStop:function(c){var d=false;
if(a.ui.ddmanager&&!this.options.dropBehaviour){var d=a.ui.ddmanager.drop(this,c)
}if((this.options.revert=="invalid"&&!d)||(this.options.revert=="valid"&&d)||this.options.revert===true||(a.isFunction(this.options.revert)&&this.options.revert.call(this.element,d))){var b=this;
a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10)||500,function(){b._propagate("stop",c);
b._clear()
})
}else{this._propagate("stop",c);
this._clear()
}return false
},_clear:function(){this.helper.removeClass("ui-draggable-dragging");
if(this.options.helper!="original"&&!this.cancelHelperRemoval){this.helper.remove()
}this.helper=null;
this.cancelHelperRemoval=false
},plugins:{},uiHash:function(b){return{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,options:this.options}
},_propagate:function(c,b){a.ui.plugin.call(this,c,[b,this.uiHash()]);
if(c=="drag"){this.positionAbs=this._convertPositionTo("absolute")
}return this.element.triggerHandler(c=="drag"?c:"drag"+c,[b,this.uiHash()],this.options[c])
},destroy:function(){if(!this.element.data("draggable")){return
}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
this._mouseDestroy()
}}));
a.extend(a.ui.draggable,{defaults:{appendTo:"parent",axis:false,cancel:":input",delay:0,distance:1,helper:"original",scope:"default",cssNamespace:"ui"}});
a.ui.plugin.add("draggable","cursor",{start:function(d,c){var b=a("body");
if(b.css("cursor")){c.options._cursor=b.css("cursor")
}b.css("cursor",c.options.cursor)
},stop:function(c,b){if(b.options._cursor){a("body").css("cursor",b.options._cursor)
}}});
a.ui.plugin.add("draggable","zIndex",{start:function(d,c){var b=a(c.helper);
if(b.css("zIndex")){c.options._zIndex=b.css("zIndex")
}b.css("zIndex",c.options.zIndex)
},stop:function(c,b){if(b.options._zIndex){a(b.helper).css("zIndex",b.options._zIndex)
}}});
a.ui.plugin.add("draggable","opacity",{start:function(d,c){var b=a(c.helper);
if(b.css("opacity")){c.options._opacity=b.css("opacity")
}b.css("opacity",c.options.opacity)
},stop:function(c,b){if(b.options._opacity){a(b.helper).css("opacity",b.options._opacity)
}}});
a.ui.plugin.add("draggable","iframeFix",{start:function(c,b){a(b.options.iframeFix===true?"iframe":b.options.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(a(this).offset()).appendTo("body")
})
},stop:function(c,b){a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)
})
}});
a.ui.plugin.add("draggable","scroll",{start:function(d,c){var f=c.options;
var b=a(this).data("draggable");
f.scrollSensitivity=f.scrollSensitivity||20;
f.scrollSpeed=f.scrollSpeed||20;
b.overflowY=function(g){do{if(/auto|scroll/.test(g.css("overflow"))||(/auto|scroll/).test(g.css("overflow-y"))){return g
}g=g.parent()
}while(g[0].parentNode);
return a(document)
}(this);
b.overflowX=function(g){do{if(/auto|scroll/.test(g.css("overflow"))||(/auto|scroll/).test(g.css("overflow-x"))){return g
}g=g.parent()
}while(g[0].parentNode);
return a(document)
}(this);
if(b.overflowY[0]!=document&&b.overflowY[0].tagName!="HTML"){b.overflowYOffset=b.overflowY.offset()
}if(b.overflowX[0]!=document&&b.overflowX[0].tagName!="HTML"){b.overflowXOffset=b.overflowX.offset()
}},drag:function(f,d){var g=d.options,b=false;
var c=a(this).data("draggable");
if(c.overflowY[0]!=document&&c.overflowY[0].tagName!="HTML"){if((c.overflowYOffset.top+c.overflowY[0].offsetHeight)-f.pageY<g.scrollSensitivity){c.overflowY[0].scrollTop=b=c.overflowY[0].scrollTop+g.scrollSpeed
}if(f.pageY-c.overflowYOffset.top<g.scrollSensitivity){c.overflowY[0].scrollTop=b=c.overflowY[0].scrollTop-g.scrollSpeed
}}else{if(f.pageY-a(document).scrollTop()<g.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()-g.scrollSpeed)
}if(a(window).height()-(f.pageY-a(document).scrollTop())<g.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()+g.scrollSpeed)
}}if(c.overflowX[0]!=document&&c.overflowX[0].tagName!="HTML"){if((c.overflowXOffset.left+c.overflowX[0].offsetWidth)-f.pageX<g.scrollSensitivity){c.overflowX[0].scrollLeft=b=c.overflowX[0].scrollLeft+g.scrollSpeed
}if(f.pageX-c.overflowXOffset.left<g.scrollSensitivity){c.overflowX[0].scrollLeft=b=c.overflowX[0].scrollLeft-g.scrollSpeed
}}else{if(f.pageX-a(document).scrollLeft()<g.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()-g.scrollSpeed)
}if(a(window).width()-(f.pageX-a(document).scrollLeft())<g.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()+g.scrollSpeed)
}}if(b!==false){a.ui.ddmanager.prepareOffsets(c,f)
}}});
a.ui.plugin.add("draggable","snap",{start:function(d,c){var b=a(this).data("draggable");
b.snapElements=[];
a(c.options.snap.constructor!=String?(c.options.snap.items||":data(draggable)"):c.options.snap).each(function(){var g=a(this);
var f=g.offset();
if(this!=b.element[0]){b.snapElements.push({item:this,width:g.outerWidth(),height:g.outerHeight(),top:f.top,left:f.left})
}})
},drag:function(w,p){var h=a(this).data("draggable");
var x=p.options.snapTolerance||20;
var v=p.absolutePosition.left,u=v+h.helperProportions.width,g=p.absolutePosition.top,f=g+h.helperProportions.height;
for(var s=h.snapElements.length-1;
s>=0;
s--){var q=h.snapElements[s].left,o=q+h.snapElements[s].width,n=h.snapElements[s].top,z=n+h.snapElements[s].height;
if(!((q-x<v&&v<o+x&&n-x<g&&g<z+x)||(q-x<v&&v<o+x&&n-x<f&&f<z+x)||(q-x<u&&u<o+x&&n-x<g&&g<z+x)||(q-x<u&&u<o+x&&n-x<f&&f<z+x))){if(h.snapElements[s].snapping){(h.options.snap.release&&h.options.snap.release.call(h.element,null,a.extend(h.uiHash(),{snapItem:h.snapElements[s].item})))
}h.snapElements[s].snapping=false;
continue
}if(p.options.snapMode!="inner"){var c=Math.abs(n-f)<=x;
var y=Math.abs(z-g)<=x;
var k=Math.abs(q-u)<=x;
var m=Math.abs(o-v)<=x;
if(c){p.position.top=h._convertPositionTo("relative",{top:n-h.helperProportions.height,left:0}).top
}if(y){p.position.top=h._convertPositionTo("relative",{top:z,left:0}).top
}if(k){p.position.left=h._convertPositionTo("relative",{top:0,left:q-h.helperProportions.width}).left
}if(m){p.position.left=h._convertPositionTo("relative",{top:0,left:o}).left
}}var j=(c||y||k||m);
if(p.options.snapMode!="outer"){var c=Math.abs(n-g)<=x;
var y=Math.abs(z-f)<=x;
var k=Math.abs(q-v)<=x;
var m=Math.abs(o-u)<=x;
if(c){p.position.top=h._convertPositionTo("relative",{top:n,left:0}).top
}if(y){p.position.top=h._convertPositionTo("relative",{top:z-h.helperProportions.height,left:0}).top
}if(k){p.position.left=h._convertPositionTo("relative",{top:0,left:q}).left
}if(m){p.position.left=h._convertPositionTo("relative",{top:0,left:o-h.helperProportions.width}).left
}}if(!h.snapElements[s].snapping&&(c||y||k||m||j)){(h.options.snap.snap&&h.options.snap.snap.call(h.element,null,a.extend(h.uiHash(),{snapItem:h.snapElements[s].item})))
}h.snapElements[s].snapping=(c||y||k||m||j)
}}});
a.ui.plugin.add("draggable","connectToSortable",{start:function(d,c){var b=a(this).data("draggable");
b.sortables=[];
a(c.options.connectToSortable).each(function(){if(a.data(this,"sortable")){var f=a.data(this,"sortable");
b.sortables.push({instance:f,shouldRevert:f.options.revert});
f._refreshItems();
f._propagate("activate",d,b)
}})
},stop:function(d,c){var b=a(this).data("draggable");
a.each(b.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;
b.cancelHelperRemoval=true;
this.instance.cancelHelperRemoval=false;
if(this.shouldRevert){this.instance.options.revert=true
}this.instance._mouseStop(d);
this.instance.element.triggerHandler("sortreceive",[d,a.extend(this.instance.ui(),{sender:b.element})],this.instance.options.receive);
this.instance.options.helper=this.instance.options._helper
}else{this.instance._propagate("deactivate",d,b)
}})
},drag:function(g,f){var d=a(this).data("draggable"),b=this;
var c=function(m){var i=m.left,k=i+m.width,j=m.top,h=j+m.height;
return(i<(this.positionAbs.left+this.offset.click.left)&&(this.positionAbs.left+this.offset.click.left)<k&&j<(this.positionAbs.top+this.offset.click.top)&&(this.positionAbs.top+this.offset.click.top)<h)
};
a.each(d.sortables,function(h){if(c.call(d,this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;
this.instance.currentItem=a(b).clone().appendTo(this.instance.element).data("sortable-item",true);
this.instance.options._helper=this.instance.options.helper;
this.instance.options.helper=function(){return f.helper[0]
};
g.target=this.instance.currentItem[0];
this.instance._mouseCapture(g,true);
this.instance._mouseStart(g,true,true);
this.instance.offset.click.top=d.offset.click.top;
this.instance.offset.click.left=d.offset.click.left;
this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left;
this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top;
d._propagate("toSortable",g)
}if(this.instance.currentItem){this.instance._mouseDrag(g)
}}else{if(this.instance.isOver){this.instance.isOver=0;
this.instance.cancelHelperRemoval=true;
this.instance.options.revert=false;
this.instance._mouseStop(g,true);
this.instance.options.helper=this.instance.options._helper;
this.instance.currentItem.remove();
if(this.instance.placeholder){this.instance.placeholder.remove()
}d._propagate("fromSortable",g)
}}})
}});
a.ui.plugin.add("draggable","stack",{start:function(d,b){var c=a.makeArray(a(b.options.stack.group)).sort(function(g,f){return(parseInt(a(g).css("zIndex"),10)||b.options.stack.min)-(parseInt(a(f).css("zIndex"),10)||b.options.stack.min)
});
a(c).each(function(f){this.style.zIndex=b.options.stack.min+f
});
this[0].style.zIndex=b.options.stack.min+c.length
}})
})(jQuery);