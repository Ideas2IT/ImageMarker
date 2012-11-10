if(!window.jQuery){throw ("jQuery must be referenced before using formValidation")
}else{(function(){jQuery.fn.formValidation=function(settings,err_msgs){var iForm=this;
var err_list="";
settings=jQuery.extend({version:"1.1.2",email:/^([\w.])+\@(([\w])+\.)[a-zA-Z0-9]{2,}/,domain:/^(http:\/\/)([\w]+\.){1,}[A-Z]{2,4}\b/gi,phone:/^\+[0-9]{1,3}\.[1-9]{1,2}\.[0-9]{6,}$/gi,zip:/^[0-9]{4,}$/gi,numeric:/^[0-9]+$/gi,image:/[\w]+\.(gif|jpg|bmp|png|jpeg)$/gi,ewvt:/[\w]+\.(htm|html|php|txt)$/gi,media:/[\w]+\.(avi|mov|mpeg|wmv)$/gi,pdf:/[\w]+\.(pdf)$/gi,enable:false,err_class:"invalidInput",err_list:false,alias:"name",required:"required",mask:"mask",equal:"equal",defval:"defval",callback:"",err_message:"Please fill all required fields! (Marked with red background colour)\n",display_alert:true},settings);
err_msgs=jQuery.extend({required:"is required",mask:"Invalid",equal:"is not equal to"},err_msgs);
return iForm.submit(function(){settings.enable=true;
err_list="";
var frm=true;
$(this).find("*").filter("input, select, textarea").each(function(){ret=isValid($(this));
if(!ret){frm=ret
}});
if(frm&&(typeof settings.callback=="string"&&eval("typeof "+settings.callback)=="function")){frm=eval(settings.callback+"()")
}else{if(settings.display_alert){alert(settings.err_message+err_list)
}}return frm
}).find("*").filter("input, select, textarea").each(function(){$(this).click(function(){isValid($(this))
}).change(function(){isValid($(this))
}).keyup(function(){isValid($(this))
}).focus(function(){isValid($(this))
}).blur(function(){isValid($(this))
})
});
function isValid(obj){if(!settings.enable){return true
}if(required(obj)&&mask(obj)&&equal(obj)){obj.removeClass(settings.err_class);
return true
}else{obj.addClass(settings.err_class);
return false
}}function required(obj){if(!(obj.attr(settings.required)=="true")){return true
}if(obj.is("input[@type=checkbox]")||obj.is("input[@type=radio]")){if(obj.attr("checked")){return true
}}else{if((obj.is("input")||obj.is("select")||obj.is("textarea"))&&(!obj.is("button"))){if(obj.val()!=""&&(!(defval(obj)))){return true
}}}if(settings.err_list){err_list+='- "'+obj.attr(settings.alias)+'" '+err_msgs.required+"\n"
}return false
}function mask(obj){tname=obj.attr("mask");
if(tname==undefined||obj.val()==""){return true
}tmask=settings[obj.attr(settings.mask)];
ret=tmask.test(obj.val());
ret1=tmask.exec(obj.val());
if(ret){return true
}if(settings.err_list){err_list+="- "+err_msgs.mask+' "'+obj.attr(settings.alias)+'"\n'
}return false
}function equal(obj){tname=obj.attr(settings.equal);
tval=$("#"+tname).val();
if(tname==undefined){return true
}if(tval==obj.val()){return true
}if(settings.err_list){err_list+='- "'+obj.attr(settings.alias)+'" '+err_msgs.equal+" "+$("#"+tname).attr("alias")+"\n"
}return false
}function defval(obj){tdefval=obj.attr(settings.defval);
tval=obj.val();
if(tdefval==undefined){return false
}if(tval!=tdefval){return false
}return true
}}
})(jQuery)
};