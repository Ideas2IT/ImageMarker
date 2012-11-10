(function(d){var c=d.fn.remove;
d.fn.remove=function(){d("*",this).add(this).triggerHandler("remove");
return c.apply(this,arguments)
};
function b(e){function g(h){var i=h.style;
return(i.display!="none"&&i.visibility!="hidden")
}var f=g(e);
(f&&d.each(d.dir(e,"parentNode"),function(){return(f=g(this))
}));
return f
}d.extend(d.expr[":"],{data:function(f,g,e){return d.data(f,e[3])
},tabbable:function(f,g,e){var h=f.nodeName.toLowerCase();
return(f.tabIndex>=0&&(("a"==h&&f.href)||(/input|select|textarea|button/.test(h)&&"hidden"!=f.type&&!f.disabled))&&b(f))
}});
d.keyCode={BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38};
function a(h,i,j,g){function f(l){var k=d[h][i][l]||[];
return(typeof k=="string"?k.split(/,?\s+/):k)
}var e=f("getter");
if(g.length==1&&typeof g[0]=="string"){e=e.concat(f("getterSetter"))
}return(d.inArray(j,e)!=-1)
}d.widget=function(f,e){var g=f.split(".")[0];
f=f.split(".")[1];
d.fn[f]=function(k){var i=(typeof k=="string"),j=Array.prototype.slice.call(arguments,1);
if(i&&k.substring(0,1)=="_"){return this
}if(i&&a(g,f,k,j)){var h=d.data(this[0],f);
return(h?h[k].apply(h,j):undefined)
}return this.each(function(){var l=d.data(this,f);
(!l&&!i&&d.data(this,f,new d[g][f](this,k)));
(l&&i&&d.isFunction(l[k])&&l[k].apply(l,j))
})
};
d[g][f]=function(j,i){var h=this;
this.widgetName=f;
this.widgetEventPrefix=d[g][f].eventPrefix||f;
this.widgetBaseClass=g+"-"+f;
this.options=d.extend({},d.widget.defaults,d[g][f].defaults,d.metadata&&d.metadata.get(j)[f],i);
this.element=d(j).bind("setData."+f,function(m,k,l){return h._setData(k,l)
}).bind("getData."+f,function(l,k){return h._getData(k)
}).bind("remove",function(){return h.destroy()
});
this._init()
};
d[g][f].prototype=d.extend({},d.widget.prototype,e);
d[g][f].getterSetter="option"
};
d.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName)
},option:function(g,h){var f=g,e=this;
if(typeof g=="string"){if(h===undefined){return this._getData(g)
}f={};
f[g]=h
}d.each(f,function(i,j){e._setData(i,j)
})
},_getData:function(e){return this.options[e]
},_setData:function(e,f){this.options[e]=f;
if(e=="disabled"){this.element[f?"addClass":"removeClass"](this.widgetBaseClass+"-disabled")
}},enable:function(){this._setData("disabled",false)
},disable:function(){this._setData("disabled",true)
},_trigger:function(g,i,h){var f=(g==this.widgetEventPrefix?g:this.widgetEventPrefix+g);
i=i||d.event.fix({type:f,target:this.element[0]});
return this.element.triggerHandler(f,[i,h],this.options[g])
}};
d.widget.defaults={disabled:false};
d.ui={plugin:{add:function(f,g,j){var h=d.ui[f].prototype;
for(var e in j){h.plugins[e]=h.plugins[e]||[];
h.plugins[e].push([g,j[e]])
}},call:function(e,g,f){var j=e.plugins[g];
if(!j){return
}for(var h=0;
h<j.length;
h++){if(e.options[j[h][0]]){j[h][1].apply(e.element,f)
}}}},cssCache:{},css:function(f){if(d.ui.cssCache[f]){return d.ui.cssCache[f]
}var g=d('<div class="ui-gen">').addClass(f).css({position:"absolute",top:"-5000px",left:"-5000px",display:"block"}).appendTo("body");
d.ui.cssCache[f]=!!((!(/auto|default/).test(g.css("cursor"))||(/^[1-9]/).test(g.css("height"))||(/^[1-9]/).test(g.css("width"))||!(/none/).test(g.css("backgroundImage"))||!(/transparent|rgba\(0, 0, 0, 0\)/).test(g.css("backgroundColor"))));
try{d("body").get(0).removeChild(g.get(0))
}catch(h){}return d.ui.cssCache[f]
},disableSelection:function(e){return d(e).attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false
})
},enableSelection:function(e){return d(e).attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")
},hasScroll:function(i,g){if(d(i).css("overflow")=="hidden"){return false
}var f=(g&&g=="left")?"scrollLeft":"scrollTop",h=false;
if(i[f]>0){return true
}i[f]=1;
h=(i[f]>0);
i[f]=0;
return h
}};
d.ui.mouse={_mouseInit:function(){var e=this;
this.element.bind("mousedown."+this.widgetName,function(f){return e._mouseDown(f)
});
if(d.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");
this.element.attr("unselectable","on")
}this.started=false
},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);
(d.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))
},_mouseDown:function(h){(this._mouseStarted&&this._mouseUp(h));
this._mouseDownEvent=h;
var g=this,i=(h.which==1),f=(typeof this.options.cancel=="string"?d(h.target).parents().add(h.target).filter(this.options.cancel).length:false);
if(!i||f||!this._mouseCapture(h)){return true
}this.mouseDelayMet=!this.options.delay;
if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){g.mouseDelayMet=true
},this.options.delay)
}if(this._mouseDistanceMet(h)&&this._mouseDelayMet(h)){this._mouseStarted=(this._mouseStart(h)!==false);
if(!this._mouseStarted){h.preventDefault();
return true
}}this._mouseMoveDelegate=function(j){return g._mouseMove(j)
};
this._mouseUpDelegate=function(j){return g._mouseUp(j)
};
d(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);
return false
},_mouseMove:function(f){if(d.browser.msie&&!f.button){return this._mouseUp(f)
}if(this._mouseStarted){this._mouseDrag(f);
return false
}if(this._mouseDistanceMet(f)&&this._mouseDelayMet(f)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,f)!==false);
(this._mouseStarted?this._mouseDrag(f):this._mouseUp(f))
}return !this._mouseStarted
},_mouseUp:function(f){d(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);
if(this._mouseStarted){this._mouseStarted=false;
this._mouseStop(f)
}return false
},_mouseDistanceMet:function(f){return(Math.max(Math.abs(this._mouseDownEvent.pageX-f.pageX),Math.abs(this._mouseDownEvent.pageY-f.pageY))>=this.options.distance)
},_mouseDelayMet:function(f){return this.mouseDelayMet
},_mouseStart:function(f){},_mouseDrag:function(f){},_mouseStop:function(f){},_mouseCapture:function(f){return true
}};
d.ui.mouse.defaults={cancel:null,distance:1,delay:0}
})(jQuery);