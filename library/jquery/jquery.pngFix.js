(function(a){jQuery.fn.pngFix=function(d){d=jQuery.extend({blankgif:"blank.gif"},d);
var c=(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)==4&&navigator.appVersion.indexOf("MSIE 5.5")!=-1);
var b=(navigator.appName=="Microsoft Internet Explorer"&&parseInt(navigator.appVersion)==4&&navigator.appVersion.indexOf("MSIE 6.0")!=-1);
if(jQuery.browser.msie&&(c||b)){jQuery(this).find("img[src$=.png]").each(function(){jQuery(this).attr("width",jQuery(this).width());
jQuery(this).attr("height",jQuery(this).height());
var l="";
var g="";
var f=(jQuery(this).attr("id"))?'id="'+jQuery(this).attr("id")+'" ':"";
var m=(jQuery(this).attr("class"))?'class="'+jQuery(this).attr("class")+'" ':"";
var i=(jQuery(this).attr("title"))?'title="'+jQuery(this).attr("title")+'" ':"";
var j=(jQuery(this).attr("alt"))?'alt="'+jQuery(this).attr("alt")+'" ':"";
var h=(jQuery(this).attr("align"))?"float:"+jQuery(this).attr("align")+";":"";
var e=(jQuery(this).parent().attr("href"))?"cursor:hand;":"";
if(this.style.border){l+="border:"+this.style.border+";";
this.style.border=""
}if(this.style.padding){l+="padding:"+this.style.padding+";";
this.style.padding=""
}if(this.style.margin){l+="margin:"+this.style.margin+";";
this.style.margin=""
}var k=(this.style.cssText);
g+="<span "+f+m+i+j;
g+='style="position:relative;white-space:pre-line;display:inline-block;background:transparent;'+h+e;
g+="width:"+jQuery(this).width()+"px;height:"+jQuery(this).height()+"px;";
g+="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+jQuery(this).attr("src")+"', sizingMethod='scale');";
g+=k+'"></span>';
if(l!=""){g='<span style="position:relative;display:inline-block;'+l+e+"width:"+jQuery(this).width()+"px;height:"+jQuery(this).height()+'px;">'+g+"</span>"
}jQuery(this).hide();
jQuery(this).after(g)
});
jQuery(this).find("*").each(function(){var f=jQuery(this).css("background-image");
if(f.indexOf(".png")!=-1){var e=f.split('url("')[1].split('")')[0];
jQuery(this).css("background-image","none");
jQuery(this).get(0).runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+e+"',sizingMethod='scale')"
}});
jQuery(this).find("input[src$=.png]").each(function(){var e=jQuery(this).attr("src");
jQuery(this).get(0).runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+e+"', sizingMethod='scale');";
jQuery(this).attr("src",d.blankgif)
})
}return jQuery
}
})(jQuery);