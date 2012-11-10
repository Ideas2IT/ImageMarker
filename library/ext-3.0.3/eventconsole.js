function attachIncident(a,f,b){var c=document.getElementById(f).value;
var e=grid.getSelectionModel().getSelections();
if(e.length==0||c==""){$("#message_label").show();
$("#message_label").html("No Alarm(s)/Incident selected for attach!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
return
}var d=null;
for(i=0;
i<e.length;
i++){aRecord=e[i];
filedValue=aRecord.get("Id");
d=d+","+aRecord.get("Id")
}$("#message_label").show();
$("#message_label").html("Processing....please wait");
Ext.Ajax.request({url:"grid/eventConsole.action",params:{method:"attachIncidentAndEvent",action:"attach",statusId:c,status:b,totalVal:d},failure:function(g,h){var j=g.responseText;
var k=Ext.util.JSON.decode(j);
$("#message_label").html(k.ticketid+" "+k.errormessage);
setTimeout(function(){$("#grid_message").fadeOut()
},3000)
},success:function(g,h){if(g.responseText!=""){var k=g.responseText;
var l=Ext.util.JSON.decode(k);
var j=l.ticketid;
if(l.error==""){$("#message_label").html(l.message+"   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>")
}else{$("#message_label").html(l.message+l.ticketid+"   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>")
}grid.getStore().reload();
refreshIncidentCombo();
refreshSeverityCounter(Ext.getCmp("severityCounter").getValue());
changeTime()
}else{$("#grid_message").css("display","block");
$("#message_label").html("No event selected for Attach   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>").css("display","block");
grid.getStore().reload()
}}})
}function executeHost(a,f,c){var e=null;
if(f.length>0){if(null!=c&&c=="multiple"){for(i=0;
i<f.length;
i++){aRecord=f[i];
e=e+","+aRecord.get("Id");
if((aRecord.get("Monitored Object"))==null){if(f.length==1){$("#message_label").html("No Monitored Object Found   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
return
}else{$("#message_label").html("No Monitored Object Found for Some Device(s)   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
return
}}}}else{if(null!=c&&c=="single"){var b=grid.getSelectionModel().getSelected();
var d=grid.getSelectionModel().getSelected().get("Monitored Object");
e=b.get("Id");
if(d==null){$("#message_label").show();
$("#message_label").html("No Monitored Object Found   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
return
}}}$("#message_label").show();
$("#message_label").html("Script Executing . . .");
Ext.Ajax.request({url:"grid/eventConsole.action",params:{method:"executeScript",action:a,actionType:"script",totalVal:e,type:c},failure:function(g,h){var j=g.responseText;
var k=Ext.util.JSON.decode(j);
$("#message_label").html(k.ticketid+" "+k.errormessage);
setTimeout(function(){$("#grid_message").fadeOut()
},3000)
},success:function(g,h){$("#message_label").html("Script Executed successfully   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
grid.getStore().reload()
}})
}else{$("#message_label").html("No Events selected    <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
grid.getStore().reload()
}}function openIncident(c,e){var b=document.getElementById(c).value;
var a=5;
windowId=new Date().getTime();
if(b!=""){$("#message_label").html("Selected values are attached successfully ");
var f=b;
var d="/login.action?method=postLogin#'show_tab_menu','form','tabIndex=0&module=formdetails&ticketId="+f+"&formName="+e+"&windowId="+windowId+"'";
window.open(d,"_blank")
}else{$("#grid_message").css("display","block");
$("#message_label").html("No Incident selected for view");
grid.getStore().reload()
}setTimeout(function(){$("#grid_message").fadeOut()
},3000)
}function executeConsoleOperations(e,b,d,a){var c=e;
if(c==""||c==null){$("#message_label").show();
$("#message_label").html("No Row(s) selected")
}else{if(userPrefersPopup=="true"||userPrefersPopup==true){$("#message_label").hide()
}else{$("#message_label").show();
$("#message_label").html("Processing....Please wait...");
setTimeout(function(){$("#message_label").hide()
},2500)
}javascript:loadTab("show_create_tab_menu_east","form","childTicketId="+c+"&formName="+b+"&parentCoreType=Ticket&parentApplicationName="+d+"&operationName="+a+"&relationshipType=Child-Parent&isSpawn=true")
}}function executeAcknowledge(b){var e=grid.getSelectionModel().getSelections();
var d="";
if(null!=b&&b=="multiple"){for(i=0;
i<e.length;
i++){aRecord=e[i];
filedValue=aRecord.get("Id");
d=d+aRecord.get("Id")+"@"
}var c=d.length;
if(c>0){d=d.slice(0,c-1)
}}else{if(null!=b&&b=="single"){var a=grid.getSelectionModel().getSelected();
d=a.get("Id")
}}if(d==""||d==null){$("#message_label").show();
$("#message_label").html("No Alarm(s) selected")
}else{if(userPrefersPopup=="true"||userPrefersPopup==true){$("#message_label").hide()
}else{$("#message_label").show();
$("#message_label").html("Processing....Please wait...")
}if(null!=b&&b=="single"){javascript:loadTab("show_create_tab_menu","form","childTicketId="+d+"&formName=Incident&parentCoreType=Ticket&parentApplicationName=Actionable Event&operationName=Spawn Incident Request&relationshipType=Child-Parent&isSpawn=true")
}else{javascript:loadTab("show_create_tab_menu","form","childTicketId="+d+"&formName=Incident&parentCoreType=Ticket&parentApplicationName=Actionable Event&operationName=Spawn Incident Request&relationshipType=Child-Parent&isSpawn=true")
}}}function ext_show(c,b,a){a=a.replaceAll(">","&gt;");
a=a.replaceAll("<","&lt;");
if(a){it=document.getElementById(c);
x=xstooltip_findPosX(b);
y=xstooltip_findPosY(b);
it.style.top=y+"px";
if(b.width){it.style.left=(x+10+b.width)+"px";
it.style.width="250px"
}else{it.style.left=(x+40)+"px"
}$("#"+c).html(a).show()
}}function showLastMessage(e,b,a){var d=grid.getSelectionModel().getSelected();
var c=d.get("ID");
Ext.Ajax.request({url:"grid/eventConsole.action",params:{method:"getLatestMessage",ticketId:c},failure:function(f,g){$("#message_label").html("Problem on loading... <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>")
},success:function(f,g){a=a.replaceAll(">","&gt;");
a=a.replaceAll("<","&lt;");
if(a){it=document.getElementById(e);
x=xstooltip_findPosX(b);
y=xstooltip_findPosY(b);
it.style.top=y+"px";
if(b.width){it.style.left=(x+10+b.width)+"px";
it.style.width="350px"
}else{it.style.left=(x+100)+"px"
}$("#"+e).html(f.responseText).show()
}}})
}function clearStatus(a){var d=grid.getSelectionModel().getSelections();
if(null!=a&&a=="multiple"){if(d.length==0){$("#message_label").show();
$("#message_label").html("No Alarms selected for clear!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
return
}}$("#message_label").show();
var c=new Ext.form.FormPanel({baseCls:"x-plain",buttonAlign:"center",monitorValid:true,labelWidth:200,defaultType:"textfield",items:[{fieldLabel:"Reason for Clearing Alarm(s)",name:"clearingReason",id:"clearingReason",value:"",allowBlank:false,minLength:1,maxLength:500,anchor:"90%"}],buttons:[{text:"Submit",formBind:true,handler:function(){onClick:clearAlarm(a)
}}]});
var b=new Ext.Window({title:"Clearing the Alarm(s)",width:550,id:"alarmClearingWindow",height:100,minWidth:250,minHeight:100,layout:"fit",plain:true,modal:true,bodyStyle:"padding:5px;",buttonAlign:"center",items:c});
b.show(this)
}function clearAlarm(c){var e=grid.getSelectionModel().getSelections();
var d="";
if(null!=c&&c=="multiple"){if(e.length==0){$("#message_label").show();
$("#message_label").html("No Alarms selected for clear!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
return
}for(i=0;
i<e.length;
i++){aRecord=e[i];
filedValue=aRecord.get("Id");
if(aRecord.get("Id")!=""){if((e.length-1)==i){d=d+aRecord.get("Id")
}else{d=d+aRecord.get("Id")+","
}}}}else{if(null!=c&&c=="single"){var b=grid.getSelectionModel().getSelected();
d=b.get("Id")
}}var a=document.getElementById("clearingReason").value;
Ext.getCmp("alarmClearingWindow").close();
__showProgress();
$("#message_label").show();
$("#message_label").html("Processing....please wait");
Ext.Ajax.request({url:"grid/eventConsole.action",params:{method:"clearStatus",ticketId:d,reasonForClosed:a,type:c},success:function(f,g){__hideProgress();
var j=f.responseText;
var k=Ext.util.JSON.decode(j);
var h=k.ticketid;
if(k.error==""){$("#message_label").html(k.message+"   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>")
}else{$("#message_label").html(k.message+k.ticketid+"   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>")
}grid.getStore().reload();
refreshIncidentCombo();
refreshSeverityCounter(Ext.getCmp("severityCounter").getValue());
changeTime()
},failure:function(f,g){}})
};