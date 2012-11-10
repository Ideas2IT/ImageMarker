(function(a){a.widget("ui.resizable",a.extend({},a.ui.mouse,{_init:function(){var p=this,q=this.options;
var t=this.element.css("position");
this.originalElement=this.element;
this.element.addClass("ui-resizable").css({position:/static/.test(t)?"relative":t});
a.extend(q,{_aspectRatio:!!(q.aspectRatio),helper:q.helper||q.ghost||q.animate?q.helper||"proxy":null,knobHandles:q.knobHandles===true?"ui-resizable-knob-handle":q.knobHandles});
var h="1px solid #DEDEDE";
q.defaultTheme={"ui-resizable":{display:"block"},"ui-resizable-handle":{position:"absolute",background:"#F2F2F2",fontSize:"0.1px"},"ui-resizable-n":{cursor:"n-resize",height:"4px",left:"0px",right:"0px",borderTop:h},"ui-resizable-s":{cursor:"s-resize",height:"4px",left:"0px",right:"0px",borderBottom:h},"ui-resizable-e":{cursor:"e-resize",width:"4px",top:"0px",bottom:"0px",borderRight:h},"ui-resizable-w":{cursor:"w-resize",width:"4px",top:"0px",bottom:"0px",borderLeft:h},"ui-resizable-se":{cursor:"se-resize",width:"4px",height:"4px",borderRight:h,borderBottom:h},"ui-resizable-sw":{cursor:"sw-resize",width:"4px",height:"4px",borderBottom:h,borderLeft:h},"ui-resizable-ne":{cursor:"ne-resize",width:"4px",height:"4px",borderRight:h,borderTop:h},"ui-resizable-nw":{cursor:"nw-resize",width:"4px",height:"4px",borderLeft:h,borderTop:h}};
q.knobTheme={"ui-resizable-handle":{background:"#F2F2F2",border:"1px solid #808080",height:"8px",width:"8px"},"ui-resizable-n":{cursor:"n-resize",top:"0px",left:"45%"},"ui-resizable-s":{cursor:"s-resize",bottom:"0px",left:"45%"},"ui-resizable-e":{cursor:"e-resize",right:"0px",top:"45%"},"ui-resizable-w":{cursor:"w-resize",left:"0px",top:"45%"},"ui-resizable-se":{cursor:"se-resize",right:"0px",bottom:"0px"},"ui-resizable-sw":{cursor:"sw-resize",left:"0px",bottom:"0px"},"ui-resizable-nw":{cursor:"nw-resize",left:"0px",top:"0px"},"ui-resizable-ne":{cursor:"ne-resize",right:"0px",top:"0px"}};
q._nodeName=this.element[0].nodeName;
if(q._nodeName.match(/canvas|textarea|input|select|button|img/i)){var b=this.element;
if(/relative/.test(b.css("position"))&&a.browser.opera){b.css({position:"relative",top:"auto",left:"auto"})
}b.wrap(a('<div class="ui-wrapper"	style="overflow: hidden;"></div>').css({position:b.css("position"),width:b.outerWidth(),height:b.outerHeight(),top:b.css("top"),left:b.css("left")}));
var k=this.element;
this.element=this.element.parent();
this.element.data("resizable",this);
this.element.css({marginLeft:k.css("marginLeft"),marginTop:k.css("marginTop"),marginRight:k.css("marginRight"),marginBottom:k.css("marginBottom")});
k.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});
if(a.browser.safari&&q.preventDefault){k.css("resize","none")
}q.proportionallyResize=k.css({position:"static",zoom:1,display:"block"});
this.element.css({margin:k.css("margin")});
this._proportionallyResize()
}if(!q.handles){q.handles=!a(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}
}if(q.handles.constructor==String){q.zIndex=q.zIndex||1000;
if(q.handles=="all"){q.handles="n,e,s,w,se,sw,ne,nw"
}var r=q.handles.split(",");
q.handles={};
var g={handle:"position: absolute; display: none; overflow:hidden;",n:"top: 0pt; width:100%;",e:"right: 0pt; height:100%;",s:"bottom: 0pt; width:100%;",w:"left: 0pt; height:100%;",se:"bottom: 0pt; right: 0px;",sw:"bottom: 0pt; left: 0px;",ne:"top: 0pt; right: 0px;",nw:"top: 0pt; left: 0px;"};
for(var u=0;
u<r.length;
u++){var v=a.trim(r[u]),m=q.defaultTheme,f="ui-resizable-"+v,c=!a.ui.css(f)&&!q.knobHandles,s=a.ui.css("ui-resizable-knob-handle"),w=a.extend(m[f],m["ui-resizable-handle"]),d=a.extend(q.knobTheme[f],!s?q.knobTheme["ui-resizable-handle"]:{});
var l=/sw|se|ne|nw/.test(v)?{zIndex:++q.zIndex}:{};
var j=(c?g[v]:""),e=a(['<div class="ui-resizable-handle ',f,'" style="',j,g.handle,'"></div>'].join("")).css(l);
q.handles[v]=".ui-resizable-"+v;
this.element.append(e.css(c?w:{}).css(q.knobHandles?d:{}).addClass(q.knobHandles?"ui-resizable-knob-handle":"").addClass(q.knobHandles))
}if(q.knobHandles){this.element.addClass("ui-resizable-knob").css(!a.ui.css("ui-resizable-knob")?{}:{})
}}this._renderAxis=function(z){z=z||this.element;
for(var o in q.handles){if(q.handles[o].constructor==String){q.handles[o]=a(q.handles[o],this.element).show()
}if(q.transparent){q.handles[o].css({opacity:0})
}if(this.element.is(".ui-wrapper")&&q._nodeName.match(/textarea|input|select|button/i)){var x=a(q.handles[o],this.element),y=0;
y=/sw|ne|nw|se|n|s/.test(o)?x.outerHeight():x.outerWidth();
var n=["padding",/ne|nw|n/.test(o)?"Top":/se|sw|s/.test(o)?"Bottom":/^e$/.test(o)?"Right":"Left"].join("");
if(!q.transparent){z.css(n,y)
}this._proportionallyResize()
}if(!a(q.handles[o]).length){continue
}}};
this._renderAxis(this.element);
q._handles=a(".ui-resizable-handle",p.element);
if(q.disableSelection){q._handles.each(function(n,o){a.ui.disableSelection(o)
})
}q._handles.mouseover(function(){if(!q.resizing){if(this.className){var i=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
}p.axis=q.axis=i&&i[1]?i[1]:"se"
}});
if(q.autoHide){q._handles.hide();
a(p.element).addClass("ui-resizable-autohide").hover(function(){a(this).removeClass("ui-resizable-autohide");
q._handles.show()
},function(){if(!q.resizing){a(this).addClass("ui-resizable-autohide");
q._handles.hide()
}})
}this._mouseInit()
},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,options:this.options,originalSize:this.originalSize,originalPosition:this.originalPosition}
},_propagate:function(c,b){a.ui.plugin.call(this,c,[b,this.ui()]);
if(c!="resize"){this.element.triggerHandler(["resize",c].join(""),[b,this.ui()],this.options[c])
}},destroy:function(){var d=this.element,c=d.children(".ui-resizable").get(0);
this._mouseDestroy();
var b=function(e){a(e).removeClass("ui-resizable ui-resizable-disabled").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
};
b(d);
if(d.is(".ui-wrapper")&&c){d.parent().append(a(c).css({position:d.css("position"),width:d.outerWidth(),height:d.outerHeight(),top:d.css("top"),left:d.css("left")})).end().remove();
b(c)
}},_mouseCapture:function(d){if(this.options.disabled){return false
}var c=false;
for(var b in this.options.handles){if(a(this.options.handles[b])[0]==d.target){c=true
}}if(!c){return false
}return true
},_mouseStart:function(j){var c=this.options,b=this.element.position(),d=this.element,i=function(e){return parseInt(e,10)||0
},h=a.browser.msie&&a.browser.version<7;
c.resizing=true;
c.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()};
if(d.is(".ui-draggable")||(/absolute/).test(d.css("position"))){var k=a.browser.msie&&!c.containment&&(/absolute/).test(d.css("position"))&&!(/relative/).test(d.parent().css("position"));
var l=k?c.documentScroll.top:0,g=k?c.documentScroll.left:0;
d.css({position:"absolute",top:(b.top+l),left:(b.left+g)})
}if(a.browser.opera&&/relative/.test(d.css("position"))){d.css({position:"relative",top:"auto",left:"auto"})
}this._renderProxy();
var m=i(this.helper.css("left")),f=i(this.helper.css("top"));
if(c.containment){m+=a(c.containment).scrollLeft()||0;
f+=a(c.containment).scrollTop()||0
}this.offset=this.helper.offset();
this.position={left:m,top:f};
this.size=c.helper||h?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};
this.originalSize=c.helper||h?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};
this.originalPosition={left:m,top:f};
this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};
this.originalMousePosition={left:j.pageX,top:j.pageY};
c.aspectRatio=(typeof c.aspectRatio=="number")?c.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);
if(c.preserveCursor){a("body").css("cursor",this.axis+"-resize")
}this._propagate("start",j);
return true
},_mouseDrag:function(j){var d=this.helper,c=this.options,k={},n=this,g=this.originalMousePosition,l=this.axis;
var p=(j.pageX-g.left)||0,m=(j.pageY-g.top)||0;
var f=this._change[l];
if(!f){return false
}var i=f.apply(this,[j,p,m]),h=a.browser.msie&&a.browser.version<7,b=this.sizeDiff;
if(c._aspectRatio||j.shiftKey){i=this._updateRatio(i,j)
}i=this._respectSize(i,j);
this._propagate("resize",j);
d.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});
if(!c.helper&&c.proportionallyResize){this._proportionallyResize()
}this._updateCache(i);
this.element.triggerHandler("resize",[j,this.ui()],this.options.resize);
return false
},_mouseStop:function(j){this.options.resizing=false;
var f=this.options,i=function(e){return parseInt(e,10)||0
},l=this;
if(f.helper){var d=f.proportionallyResize,b=d&&(/textarea/i).test(d.get(0).nodeName),c=b&&a.ui.hasScroll(d.get(0),"left")?0:l.sizeDiff.height,h=b?0:l.sizeDiff.width;
var m={width:(l.size.width-h),height:(l.size.height-c)},g=(parseInt(l.element.css("left"),10)+(l.position.left-l.originalPosition.left))||null,k=(parseInt(l.element.css("top"),10)+(l.position.top-l.originalPosition.top))||null;
if(!f.animate){this.element.css(a.extend(m,{top:k,left:g}))
}if(f.helper&&!f.animate){this._proportionallyResize()
}}if(f.preserveCursor){a("body").css("cursor","auto")
}this._propagate("stop",j);
if(f.helper){this.helper.remove()
}return false
},_updateCache:function(b){var c=this.options;
this.offset=this.helper.offset();
if(b.left){this.position.left=b.left
}if(b.top){this.position.top=b.top
}if(b.height){this.size.height=b.height
}if(b.width){this.size.width=b.width
}},_updateRatio:function(d,f){var g=this.options,h=this.position,c=this.size,b=this.axis;
if(d.height){d.width=(c.height*g.aspectRatio)
}else{if(d.width){d.height=(c.width/g.aspectRatio)
}}if(b=="sw"){d.left=h.left+(c.width-d.width);
d.top=null
}if(b=="nw"){d.top=h.top+(c.height-d.height);
d.left=h.left+(c.width-d.width)
}return d
},_respectSize:function(i,j){var g=this.helper,f=this.options,p=f._aspectRatio||j.shiftKey,n=this.axis,r=i.width&&f.maxWidth&&f.maxWidth<i.width,k=i.height&&f.maxHeight&&f.maxHeight<i.height,d=i.width&&f.minWidth&&f.minWidth>i.width,q=i.height&&f.minHeight&&f.minHeight>i.height;
if(d){i.width=f.minWidth
}if(q){i.height=f.minHeight
}if(r){i.width=f.maxWidth
}if(k){i.height=f.maxHeight
}var c=this.originalPosition.left+this.originalSize.width,m=this.position.top+this.size.height;
var h=/sw|nw|w/.test(n),b=/nw|ne|n/.test(n);
if(d&&h){i.left=c-f.minWidth
}if(r&&h){i.left=c-f.maxWidth
}if(q&&b){i.top=m-f.minHeight
}if(k&&b){i.top=m-f.maxHeight
}var l=!i.width&&!i.height;
if(l&&!i.left&&i.top){i.top=null
}else{if(l&&!i.top&&i.left){i.left=null
}}return i
},_proportionallyResize:function(){var g=this.options;
if(!g.proportionallyResize){return
}var e=g.proportionallyResize,d=this.helper||this.element;
if(!g.borderDif){var c=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],f=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];
g.borderDif=a.map(c,function(b,j){var h=parseInt(b,10)||0,k=parseInt(f[j],10)||0;
return h+k
})
}e.css({height:(d.height()-g.borderDif[0]-g.borderDif[2])+"px",width:(d.width()-g.borderDif[1]-g.borderDif[3])+"px"})
},_renderProxy:function(){var c=this.element,f=this.options;
this.elementOffset=c.offset();
if(f.helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');
var b=a.browser.msie&&a.browser.version<7,d=(b?1:0),e=(b?2:-1);
this.helper.addClass(f.helper).css({width:c.outerWidth()+e,height:c.outerHeight()+e,position:"absolute",left:this.elementOffset.left-d+"px",top:this.elementOffset.top-d+"px",zIndex:++f.zIndex});
this.helper.appendTo("body");
if(f.disableSelection){a.ui.disableSelection(this.helper.get(0))
}}else{this.helper=c
}},_change:{e:function(d,c,b){return{width:this.originalSize.width+c}
},w:function(g,c,b){var h=this.options,d=this.originalSize,f=this.originalPosition;
return{left:f.left+c,width:d.width-c}
},n:function(g,c,b){var h=this.options,d=this.originalSize,f=this.originalPosition;
return{top:f.top+b,height:d.height-b}
},s:function(d,c,b){return{height:this.originalSize.height+b}
},se:function(d,c,b){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[d,c,b]))
},sw:function(d,c,b){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[d,c,b]))
},ne:function(d,c,b){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[d,c,b]))
},nw:function(d,c,b){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[d,c,b]))
}}}));
a.extend(a.ui.resizable,{defaults:{cancel:":input",distance:1,delay:0,preventDefault:true,transparent:false,minWidth:10,minHeight:10,aspectRatio:false,disableSelection:true,preserveCursor:true,autoHide:false,knobHandles:false}});
a.ui.plugin.add("resizable","containment",{start:function(j,l){var f=l.options,n=a(this).data("resizable"),h=n.element;
var c=f.containment,g=(c instanceof a)?c.get(0):(/parent/.test(c))?h.parent().get(0):c;
if(!g){return
}n.containerElement=a(g);
if(/document/.test(c)||c==document){n.containerOffset={left:0,top:0};
n.containerPosition={left:0,top:0};
n.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight}
}else{n.containerOffset=a(g).offset();
n.containerPosition=a(g).position();
n.containerSize={height:a(g).innerHeight(),width:a(g).innerWidth()};
var k=n.containerOffset,b=n.containerSize.height,i=n.containerSize.width,d=(a.ui.hasScroll(g,"left")?g.scrollWidth:i),m=(a.ui.hasScroll(g)?g.scrollHeight:b);
n.parentData={element:g,left:k.left,top:k.top,width:d,height:m}
}},resize:function(i,l){var f=l.options,p=a(this).data("resizable"),c=p.containerSize,k=p.containerOffset,h=p.size,j=p.position,m=f._aspectRatio||i.shiftKey,b={top:0,left:0},d=p.containerElement;
if(d[0]!=document&&/static/.test(d.css("position"))){b=p.containerPosition
}if(j.left<(f.helper?k.left:b.left)){p.size.width=p.size.width+(f.helper?(p.position.left-k.left):(p.position.left-b.left));
if(m){p.size.height=p.size.width/f.aspectRatio
}p.position.left=f.helper?k.left:b.left
}if(j.top<(f.helper?k.top:0)){p.size.height=p.size.height+(f.helper?(p.position.top-k.top):p.position.top);
if(m){p.size.width=p.size.height*f.aspectRatio
}p.position.top=f.helper?k.top:0
}var g=(f.helper?p.offset.left-k.left:(p.position.left-b.left))+p.sizeDiff.width,n=(f.helper?p.offset.top-k.top:p.position.top)+p.sizeDiff.height;
if(g+p.size.width>=p.parentData.width){p.size.width=p.parentData.width-g;
if(m){p.size.height=p.size.width/f.aspectRatio
}}if(n+p.size.height>=p.parentData.height){p.size.height=p.parentData.height-n;
if(m){p.size.width=p.size.height*f.aspectRatio
}}},stop:function(i,l){var c=l.options,n=a(this).data("resizable"),j=n.position,k=n.containerOffset,b=n.containerPosition,d=n.containerElement;
var f=a(n.helper),p=f.offset(),m=f.innerWidth(),g=f.innerHeight();
if(c.helper&&!c.animate&&/relative/.test(d.css("position"))){a(this).css({left:(p.left-k.left),top:(p.top-k.top),width:m,height:g})
}if(c.helper&&!c.animate&&/static/.test(d.css("position"))){a(this).css({left:b.left+(p.left-k.left),top:b.top+(p.top-k.top),width:m,height:g})
}}});
a.ui.plugin.add("resizable","grid",{resize:function(i,k){var d=k.options,m=a(this).data("resizable"),h=m.size,f=m.originalSize,g=m.originalPosition,l=m.axis,j=d._aspectRatio||i.shiftKey;
d.grid=typeof d.grid=="number"?[d.grid,d.grid]:d.grid;
var c=Math.round((h.width-f.width)/(d.grid[0]||1))*(d.grid[0]||1),b=Math.round((h.height-f.height)/(d.grid[1]||1))*(d.grid[1]||1);
if(/^(se|s|e)$/.test(l)){m.size.width=f.width+c;
m.size.height=f.height+b
}else{if(/^(ne)$/.test(l)){m.size.width=f.width+c;
m.size.height=f.height+b;
m.position.top=g.top-b
}else{if(/^(sw)$/.test(l)){m.size.width=f.width+c;
m.size.height=f.height+b;
m.position.left=g.left-c
}else{m.size.width=f.width+c;
m.size.height=f.height+b;
m.position.top=g.top-b;
m.position.left=g.left-c
}}}}});
a.ui.plugin.add("resizable","animate",{stop:function(j,l){var g=l.options,m=a(this).data("resizable");
var f=g.proportionallyResize,b=f&&(/textarea/i).test(f.get(0).nodeName),c=b&&a.ui.hasScroll(f.get(0),"left")?0:m.sizeDiff.height,i=b?0:m.sizeDiff.width;
var d={width:(m.size.width-i),height:(m.size.height-c)},h=(parseInt(m.element.css("left"),10)+(m.position.left-m.originalPosition.left))||null,k=(parseInt(m.element.css("top"),10)+(m.position.top-m.originalPosition.top))||null;
m.element.animate(a.extend(d,k&&h?{top:k,left:h}:{}),{duration:g.animateDuration||"slow",easing:g.animateEasing||"swing",step:function(){var e={width:parseInt(m.element.css("width"),10),height:parseInt(m.element.css("height"),10),top:parseInt(m.element.css("top"),10),left:parseInt(m.element.css("left"),10)};
if(f){f.css({width:e.width,height:e.height})
}m._updateCache(e);
m._propagate("animate",j)
}})
}});
a.ui.plugin.add("resizable","ghost",{start:function(f,d){var g=d.options,b=a(this).data("resizable"),h=g.proportionallyResize,c=b.size;
if(!h){b.ghost=b.element.clone()
}else{b.ghost=h.clone()
}b.ghost.css({opacity:0.25,display:"block",position:"relative",height:c.height,width:c.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof g.ghost=="string"?g.ghost:"");
b.ghost.appendTo(b.helper)
},resize:function(d,c){var f=c.options,b=a(this).data("resizable"),g=f.proportionallyResize;
if(b.ghost){b.ghost.css({position:"relative",height:b.size.height,width:b.size.width})
}},stop:function(d,c){var f=c.options,b=a(this).data("resizable"),g=f.proportionallyResize;
if(b.ghost&&b.helper){b.helper.get(0).removeChild(b.ghost.get(0))
}}});
a.ui.plugin.add("resizable","alsoResize",{start:function(f,c){var g=c.options,b=a(this).data("resizable"),d=function(e){a(e).each(function(){a(this).data("resizable-alsoresize",{width:parseInt(a(this).width(),10),height:parseInt(a(this).height(),10),left:parseInt(a(this).css("left"),10),top:parseInt(a(this).css("top"),10)})
})
};
if(typeof(g.alsoResize)=="object"){if(g.alsoResize.length){g.alsoResize=g.alsoResize[0];
d(g.alsoResize)
}else{a.each(g.alsoResize,function(e,h){d(e)
})
}}else{d(g.alsoResize)
}},resize:function(g,f){var h=f.options,c=a(this).data("resizable"),d=c.originalSize,j=c.originalPosition;
var i={height:(c.size.height-d.height)||0,width:(c.size.width-d.width)||0,top:(c.position.top-j.top)||0,left:(c.position.left-j.left)||0},b=function(e,k){a(e).each(function(){var n=a(this).data("resizable-alsoresize"),m={},l=k&&k.length?k:["width","height","top","left"];
a.each(l||["width","height","top","left"],function(o,q){var p=(n[q]||0)+(i[q]||0);
if(p&&p>=0){m[q]=p||null
}});
a(this).css(m)
})
};
if(typeof(h.alsoResize)=="object"){a.each(h.alsoResize,function(e,k){b(e,k)
})
}else{b(h.alsoResize)
}},stop:function(c,b){a(this).removeData("resizable-alsoresize-start")
}})
})(jQuery);