if(jQuery){(function(a){a.extend(a.fn,{fileTree:function(c,b){if(!c){var c={}
}if(c.root==undefined){c.root="/"
}if(c.script==undefined){c.script="/jsp2/trigger/scriptDescriptor.jsp"
}if(c.folderEvent==undefined){c.folderEvent="click"
}if(c.expandSpeed==undefined){c.expandSpeed=500
}if(c.collapseSpeed==undefined){c.collapseSpeed=500
}if(c.expandEasing==undefined){c.expandEasing=null
}if(c.collapseEasing==undefined){c.collapseEasing=null
}if(c.multiFolder==undefined){c.multiFolder=true
}if(c.loadMessage==undefined){c.loadMessage="Loading..."
}a(this).each(function(){function e(g,f){a(g).addClass("wait");
a(".jqueryFileTree.start").remove();
url="/applicationadmin/fileManager.action?method=showDirectory";
a.get(url,{dir:f},function(h){a(g).find(".start").html("");
a(g).removeClass("wait").append(h);
if(c.root==f){a(g).find(".jqueryFileTree").show()
}else{a(g).find(".jqueryFileTree").slideDown({duration:c.expandSpeed,easing:c.expandEasing})
}d(g)
})
}function d(f){a(f).find("LI A").bind(c.folderEvent,function(){if(a(this).parent().hasClass("directory")){if(a(this).parent().hasClass("collapsed")){if(!c.multiFolder){a(this).parent().parent().find("UL").slideUp({duration:c.collapseSpeed,easing:c.collapseEasing});
a(this).parent().parent().find("LI.directory").removeClass("expanded").addClass("collapsed")
}a(this).parent().find("UL").remove();
e(a(this).parent(),escape(a(this).attr("rel").match(/.*\//)));
a(this).parent().removeClass("collapsed").addClass("expanded")
}else{a(this).parent().find("UL").slideUp({duration:c.collapseSpeed,easing:c.collapseEasing});
a(this).parent().removeClass("expanded").addClass("collapsed")
}}else{b(a(this).attr("rel"))
}return false
});
if(c.folderEvent.toLowerCase!="click"){a(f).find("LI A").bind("click",function(){return false
})
}}a(this).html('<ul class="jqueryFileTree start"><li class="wait">'+c.loadMessage+"<li></ul>");
e(a(this),escape(c.root))
})
}})
})(jQuery)
};