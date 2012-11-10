jQuery.FBBorderLayout=function(e){var h={spacing:5,north_collapsable:true,east_width:200,east_collapsable:true,south_collapsable:true,west_width:200,west_collapsable:true};
var b=function(y,z){return parseInt(jQuery.curCSS(y[0],z,true),10)||0
};
var a=function(){c.css("top",v.spacing);
k.css("top",v.spacing);
g.css("top",v.spacing);
jQuery(".fbbl_north_collapser").css("top",0);
f.css({zIndex:1000}).hide();
m()
};
var q=function(){c.css("right",v.spacing);
jQuery(".fbbl_east_collapser").css("right",0);
k.css({zIndex:1000}).hide();
m()
};
var r=function(){c.css("bottom",v.spacing);
k.css("bottom",v.spacing);
g.css("bottom",v.spacing);
jQuery(".fbbl_south_collapser").css("bottom",0);
d.css({zIndex:1000}).hide();
m()
};
var l=function(){c.css("left",v.spacing);
jQuery(".fbbl_west_collapser").css("left",0);
g.css({zIndex:1000}).hide();
m()
};
var w=function(){if(f.is(":visible")){return
}f.show();
m()
};
var x=function(){if(k.is(":visible")){return
}k.show();
m()
};
var p=function(){if(d.is(":visible")){return
}d.show();
m()
};
var t=function(){if(g.is(":visible")){return
}g.show();
m()
};
var m=function(){u=v.spacing;
s=v.spacing;
o=v.spacing;
j=v.spacing;
n.css({position:"relative",overflow:"hidden",height:"100%",margin:0,padding:0});
if(f.length){if(f.is(":visible")){f.css({zIndex:0});
u+=f.outerHeight()
}if(v.north_collapsable){jQuery(".fbbl_north_collapser").css({position:"absolute",cursor:"pointer",fontSize:"1px",width:50,height:v.spacing,top:u-v.spacing,left:(i.width()-50)/2}).appendTo(n).toggle(a,w)
}}if(d.length){if(d.is(":visible")){d.css({position:"absolute",zIndex:0,bottom:0,left:0,right:0});
o+=d.outerHeight();
if($.browser.msie){d.width("100%")
}}if(v.south_collapsable){jQuery(".fbbl_south_collapser").css({position:"absolute",cursor:"pointer",fontSize:"1px",width:50,height:v.spacing,bottom:o-v.spacing,left:(i.width()-50)/2}).appendTo(n).toggle(r,p)
}}if(g.length){if(g.is(":visible")){g.css({position:"absolute",overflow:"auto",zIndex:0,top:u,bottom:o,left:0,width:v.west_width-b(g,"borderLeftWidth")-b(g,"borderRightWidth")-b(g,"paddingLeft")-b(g,"paddingRight")});
if($.browser.msie){g.width(v.west_width).height(i.height()-u-o)
}else{if($.browser.opera){g.height(i.height()-u-o-b(g,"borderTopWidth")-b(g,"borderBottomWidth")-b(g,"paddingTop")-b(g,"paddingBottom"))
}}j+=g.outerWidth()
}if(v.west_collapsable){jQuery(".fbbl_west_collapser").css({position:"absolute",cursor:"pointer",width:v.spacing,height:50,top:(i.height()-50)/2,left:j-v.spacing}).appendTo(n).toggle(l,t)
}}if(k.length){if(k.is(":visible")){k.css({position:"absolute",overflow:"auto",zIndex:0,top:u,bottom:o,right:0,width:v.east_width-b(k,"borderLeftWidth")-b(k,"borderRightWidth")-b(k,"paddingLeft")-b(k,"paddingRight")});
if($.browser.msie){k.width(v.east_width).css({left:i.width()-k.outerWidth(),height:i.height()-u-o})
}else{if($.browser.opera){k.height(i.height()-u-o-b(k,"borderTopWidth")-b(k,"borderBottomWidth")-b(k,"paddingTop")-b(k,"paddingBottom"))
}}s+=k.outerWidth()
}if(v.west_collapsable){jQuery(".fbbl_east_collapser").css({position:"absolute",cursor:"pointer",width:v.spacing,height:50,top:(i.height()-50)/2,right:s-v.spacing}).appendTo(n).toggle(q,x)
}}if(c.length){c.css({position:"absolute",zIndex:0,top:u,right:s,bottom:o,left:j,overflow:"auto"});
if($.browser.msie){c.width(i.width()-j-s);
c.height(i.height()-u-o)
}}};
var i=jQuery(window);
var n=jQuery("body");
var v=$.extend(h,e);
var f=jQuery("body > .fbbl_north");
var k=jQuery("body > .fbbl_east");
var d=jQuery("body > .fbbl_south");
var g=jQuery("body > .fbbl_west");
var c=jQuery("body > .fbbl_center");
var u=v.spacing;
var s=v.spacing;
var o=v.spacing;
var j=v.spacing;
i.resize(m);
if(v.north_collapsable&&f.length){jQuery("<div class='fbbl_north_collapser'></div>").appendTo(n)
}if(v.east_collapsable&&k.length){jQuery("<div class='fbbl_east_collapser'></div>").appendTo(n)
}if(v.south_collapsable&&d.length){jQuery("<div class='fbbl_south_collapser'></div>").appendTo(n)
}if(v.west_collapsable&&g.length){jQuery("<div class='fbbl_west_collapser'></div>").appendTo(n)
}m()
};