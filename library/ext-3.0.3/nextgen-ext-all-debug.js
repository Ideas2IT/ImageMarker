function getGridName(){return document.getElementById("gridId").value
}Ext.override(Ext.EventManager,{onWindowResize:function(c,b,a){if(!resizeEvent){resizeEvent=new Ext.util.Event();
resizeTask=new Ext.util.DelayedTask(this.doResizeEvent)
}}});
Ext.override(Ext.layout.BorderLayout.Region,{floatable:false,onCollapse:function(a){gridResizeOnCollapse(this.position);
this.panel.el.setStyle("z-index",1);
if(this.lastAnim===false||this.panel.animCollapse===false){this.getCollapsedEl().dom.style.visibility="visible"
}else{this.getCollapsedEl().slideIn(this.panel.slideAnchor,{duration:0.2})
}this.state.collapsed=true;
this.panel.saveState()
},beforeExpand:function(a){if(this.isSlid){this.afterSlideIn()
}var b=this.getCollapsedEl();
this.el.show();
if(this.position=="east"){this.panel.setSize(Ext.getCmp("east-panel").width,b.getHeight())
}else{if(this.position=="west"){this.panel.setSize(Ext.getCmp("west-panel").width,b.getHeight())
}else{this.panel.setSize(b.getWidth(),undefined)
}}b.hide();
b.dom.style.visibility="hidden";
this.panel.el.setStyle("z-index",this.floatingZIndex)
},onExpand:function(){this.isCollapsed=false;
if(this.splitEl){this.splitEl.show()
}if(this.position=="east"){onExpandEastPanel()
}this.layout.layout();
this.panel.el.setStyle("z-index",this.originalZIndex);
this.state.collapsed=false;
this.panel.saveState()
}});
Ext.override(Ext.layout.AccordionLayout,{setActive:function(c,b){if(document.getElementById("formId")!=null){var d=document.getElementById("formId").value
}if(this.container.getComponent(c).id){if(this.container.getComponent(c).id=="specificapp"){javascript:execute("show_specificField_grid","form","gridName=SPECIFIC_FIELD_GRID&gridDivName=specificFieldDiv&checkbox=false&toolbar=specificFieldTool&formName="+d)
}if(this.container.getComponent(c).id=="commonapp"){javascript:execute("show_commonField_grid","form","gridName=COMMON_FIELD_GRID&gridRenderDiv=SideMenuGrid&isToolBarNeeded=false&isCheckItemNeeded=false&isHeaderNeeded=false&gridWidth=197&gridHeight=300&isPaginationNeeded=false&formName="+d)
}}var a=this.activeItem;
c=this.container.getComponent(c);
if(a!=c){if(c.rendered&&c.collapsed&&b){c.expand()
}else{if(a){a.fireEvent("deactivate",a)
}this.activeItem=c;
c.fireEvent("activate",c)
}}}});
Ext.override(Ext.data.Store,{setGridObject:function(a){this.grid=a
},getGridObject:function(){return this.grid
}});
Ext.override(Ext.PagingToolbar,{rowsPerPageText:"Rows per Page",doLoad:function(c){var b={},a=this.getParams();
b[a.start]=c;
b[a.limit]=this.pageSize;
if(document.getElementById("cboTicketStatus")!=null){b.ticketStatus=document.getElementById("cboTicketStatus").value
}if(document.getElementById("mytagId")!=null){if(document.getElementById("mytagId").value!=""){b.tagId=document.getElementById("mytagId").value
}}if(document.getElementById("sharedId")!=null){if(document.getElementById("sharedId").value!=""){b.tagId=document.getElementById("sharedId").value
}}if(this.fireEvent("beforechange",this,b)!==false){this.store.load({params:b})
}}});
Ext.override(Ext.grid.HeaderDropZone,{onNodeDrop:function(c,p,j,d){var f=d.header;
if(f!=c){var m=this.grid.colModel;
var l=Ext.lib.Event.getPageX(j);
var a=Ext.lib.Dom.getRegion(c.firstChild);
var q=(a.right-l)<=((a.right-a.left)/2)?"after":"before";
var k=this.view.getCellIndex(f);
var o=this.view.getCellIndex(c);
if(q=="after"){o++
}if(k<o){o--
}var b="Image Column Cannot be moved In-between or Beyond Data Column";
var g="Data Column Cannot be moved In-between or Before Image Column";
if(getGridName()=="DATA_APP"){if((k<6&&o>=6)){alert(b);
return false
}if((k>=6&&o<6)){alert(g);
return false
}}else{if(getGridName()=="CHANGE_CONTROL_CONSOLE"){if((k<3&&o>=3)){alert(b);
return false
}if((k>=3&&o<3)){alert(g);
return false
}}else{if((k<1&&o>=1)){alert(b);
return false
}if((k>=1&&o<1)){alert(g);
return false
}}}m.moveColumn(k,o);
return true
}return false
}});
Ext.data.DynamicJsonReader=function(a){Ext.data.DynamicJsonReader.superclass.constructor.call(this,a,[])
};
Ext.extend(Ext.data.DynamicJsonReader,Ext.data.JsonReader,{getRecordType:function(d){var c=0,a=[];
for(var b in d[0]){a[c++]=b
}this.recordType=Ext.data.Record.create(a);
return this.recordType
},readRecords:function(o){this.jsonData=o;
var s=this.meta;
var sid=s.id;
var totalRecords=0;
if(s.totalProperty){var v=parseInt(eval("o."+s.totalProperty),10);
if(!isNaN(v)){totalRecords=v
}}var root=s.root?eval("o."+s.root):o;
var recordType=this.getRecordType(root);
var fields=recordType.prototype.fields;
var records=[];
for(var i=0;
i<root.length;
i++){var n=root[i];
var values={};
var id=(n[sid]!==undefined&&n[sid]!==""?n[sid]:null);
for(var j=0,jlen=fields.length;
j<jlen;
j++){var f=fields.items[j];
var map=f.mapping||f.name;
var v=n[map]!==undefined?n[map]:f.defaultValue;
v=f.convert(v);
values[f.name]=v
}var record=new recordType(values,id);
record.json=n;
records[records.length]=record
}return{records:records,totalRecords:totalRecords||records.length}
}});
function change(a){if(a>0){return'<span style="color:green;">'+a+"</span>"
}else{if(a<0){return'<span style="color:red;">'+a+"</span>"
}}return a
}function renderTopic(b,c,a){return String.format('<a href="javascript:void(0);" onclick="checkValue()">{0}</a>',b,a.data.forumtitle,a.id,a.data.forumid)
}Ext.grid.DynamicColumnModel=function(b){var e=[];
var g=b.recordType;
var a=g.prototype.fields;
for(var c=0;
c<a.keys.length;
c++){var f=a.keys[c];
var d=g.getField(f);
if(c==0){e[c]={header:d.name,dataIndex:d.name,renderer:renderTopic,width:300,editor:false}
}else{e[c]={header:d.name,dataIndex:d.name,width:300,editor:new Ext.form.TextField({allowBlank:false})}
}}Ext.grid.DynamicColumnModel.superclass.constructor.call(this,e)
};
Ext.extend(Ext.grid.DynamicColumnModel,Ext.grid.ColumnModel,{});
Ext.grid.PrimayColumnModel=function(b){var e=[];
var f=b.recordType;
var a=f.prototype.fields;
var d;
for(var c=0;
c<a.keys.length;
c++){d=a.keys[1]
}return d
};
function executeHost(a,e,c){$("#message_label").html("Script Executing . . .");
var d=null;
if(e.length>0){if(c=="multiple"){for(i=0;
i<e.length;
i++){aRecord=e[i];
d=d+","+aRecord.get("id")
}}else{if(c=="single"){var b=grid.getSelectionModel().getSelected();
d=b.get("id")
}}Ext.Ajax.request({url:"grid/eventConsole.action",params:{method:"excecuteScript",action:a,actionType:"script",totalVal:d,type:c},failure:function(f,g){Ext.MessageBox.alert("Warning","Oops...")
},success:function(f,g){$("#message_label").html("Script Executed successfully   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
grid.getStore().reload()
}})
}else{$("#message_label").html("No Events selected    <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
grid.getStore().reload()
}}function hideMessage(){$("#message_label").html("");
$("#message_label").hide()
}function hidePopUpMessage(){$("#popup_message_label").html("");
$("#popup_message_label").hide()
}function executeExport(d,c,j,h,g,k,e){var f=getExtGridSelectedColumns(e);
var a=null;
var b="";
if(document.getElementById("tagName")){a=document.getElementById("tagName").value
}if(c=="TICKET_TAG_GRID"){if(a==null){b=document.getElementById("mytagId").value;
if(b==""){b=document.getElementById("sharedId").value
}}}document.location.href="grid/radaptiveGrid.action?method=exportGridData&tagId="+b+"&gridName="+c+"&formName="+j+"&applicationName="+h+"&sort="+g+"&dir="+k+"&start=0&limit=0&exportType="+d+"&tag="+a+"&selectedColumns="+f
}function getExtGridSelectedColumns(g){var b=g.getColumnModel();
var f=b.getColumnCount();
var c=new Array();
var d=0;
for(var e=0;
e<f;
e++){if(!b.isHidden(e)){if(b.getColumnHeader(e).indexOf("<")==-1){c[d]=b.getColumnHeader(e);
d++
}}}var a="";
for(var e=0;
e<c.length;
e++){a=a+c[e]+","
}return a
}function executeExportSearch(d,b,j,h,a,g,k,c,f){var e=getExtGridSelectedColumns(f);
document.location.href="grid/radaptiveGrid.action?method=exportGridData&gridName="+b+"&formName="+j+"&applicationName="+h+"&queryId="+a+"&sort="+g+"&dir="+k+"&start=0&limit=0&exportType="+d+c+"&selectedColumns="+e
}function saveSearch(c){var b=new Ext.form.FormPanel({baseCls:"x-plain",buttonAlign:"center",monitorValid:true,labelWidth:90,url:"grid/radaptiveGrid.action?method=savedSearchMenu"+c,defaultType:"textfield",items:[{fieldLabel:"Save Name",name:"saveName",allowBlank:false,minLength:3,maxLength:25,anchor:"90%"}],buttons:[{text:"Save",formBind:true,handler:function(){b.getForm().submit({reset:false,failure:function(){showSavedSearch();
a.close()
}})
}}]});
var a=new Ext.Window({title:"Saved Search",width:250,height:100,minWidth:250,minHeight:100,layout:"fit",plain:true,bodyStyle:"padding:5px;",buttonAlign:"center",items:b});
a.show(this)
}function showSavedSearch(){try{$.getJSON("grid/radaptiveGrid.action?method=showSavedSearchNames",{ajax:"true"},function(b){if(b&&b.CONTENT_HTML&&document.getElementById("SavedSearches")){document.getElementById("SavedSearches").innerHTML=b.CONTENT_HTML;
setOnclickEventToAnchorsForHistory()
}initMenuContainer()
})
}catch(a){}}function linkCreator(d,g,a,f){var c="";
if(a.get("ApplicationName")){c=a.get("ApplicationName")
}else{if(a.get("APPLICATIONNAME")){c=a.get("APPLICATIONNAME")
}else{c=a.get("applicationName")
}}var b='\'javascript:loadTab("show_tab_menu_grid","form","gridName=OPEN_DATAS&ticketId='+d+"&formName="+c.replace(/\s/g," ")+'","","'+d+":"+c.replace(/\s/g," ")+"\")'";
if(d.indexOf("PR-")!=-1){return"<a href=\"javascript:exportPRReportPDF('"+d+"')\" >"+d+"</a>"
}return'<a href="javascript:void(0);" onclick='+b+">"+d+"</a>"
}function exportPRReportPDF(c){var a=contextPath+"report/report.action?method=exportPDFReport&ticketId="+c;
var b=window.open(a,"_blank");
b.focus()
}function renderTooltip(c,f,a,d){if(c!=null){for(var b=0;
b<c.length;
b++){if(c.charAt(b)==">"){c=c.replace(/>/g,"&gt;")
}if(c.charAt(b)=="<"){c=c.replace(/</g,"&lt;")
}if(c.charAt(b)=="'"){c=c.replace("'","")
}}}f.attr="ext:qtip="+c+' title="'+c+'"';
return c
}function checkValue(a){var c=grid.getSelectionModel().getSelections();
var b=null;
for(i=0;
i<c.length;
i++){aRecord=c[i];
filedValue=aRecord.get("id");
b=b+","+aRecord.get("id")
}Ext.Ajax.request({url:"grid/eventConsole.action",params:{method:"attachIncidentAndEvent",action:"attach",statusId:document.getElementById("statusId").value,totalVal:b},failure:function(d,e){Ext.MessageBox.alert("Warning","Oops...")
},success:function(d,e){if(c!=""){$("#message_label").html("Selected values are attached successfully    <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
grid.getStore().reload()
}else{$("#grid_message").css("display","block");
$("#message_label").html("No events are selected for Attach   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>").css("display","block");
grid.getStore().reload()
}}})
}function incidentFragment(){var f=document.createElement("select");
f.setAttribute("name","statusId");
f.setAttribute("id","statusId");
var c=document.createElement("input");
c.setAttribute("type","button");
c.setAttribute("name","add");
c.setAttribute("value","Attach");
c.setAttribute("class","button");
c.setAttribute("onclick","checkValue('attach')");
var a=document.createElement("input");
a.setAttribute("type","button");
a.setAttribute("name","add");
a.setAttribute("value","View");
a.setAttribute("class","button");
a.setAttribute("onclick","openIncident()");
var b=document.createElement("select");
b.setAttribute("name","eventID");
b.setAttribute("id","eventID");
var e=document.createElement("input");
e.setAttribute("type","button");
e.setAttribute("name","add");
e.setAttribute("value","Acknowledge");
e.setAttribute("class","button");
e.setAttribute("onclick","executeAcknowledge()");
var d=document.createElement("input");
d.setAttribute("type","button");
d.setAttribute("name","add");
d.setAttribute("value","Filter");
d.setAttribute("class","button");
d.setAttribute("onclick","showPanel()");
$(document).ready(function(){$("#select_label").html("Incident Event")
})
}function toolFragment(){var a=document.createElement("input");
a.setAttribute("type","button");
a.setAttribute("name","add");
a.setAttribute("value","Acknowledgement");
a.setAttribute("class","button");
var c=document.createElement("input");
c.setAttribute("type","button");
c.setAttribute("name","add");
c.setAttribute("value","Filter");
c.setAttribute("class","button");
c.setAttribute("onclick","showPanel()");
var b=document.createElement("input");
b.setAttribute("type","button");
b.setAttribute("name","add");
b.setAttribute("value","ShowAll");
b.setAttribute("class","button");
$(document).ready(function(){$("#select_label").html("Issue Tracking Events")
})
}function showPanel(){$("#search-panel").show();
$("#filter").attr("disabled","true")
}function closeBar(){$("#filter").removeAttr("disabled");
$("#search-panel").hide()
}function filterGrid(){var c=new Array();
var b=0;
if(document.getElementById("fid").value.length>0){c[b]="fetchInfo.id,"+document.getElementById("fid").value;
b++
}if(document.getElementById("ftitle").value.length>0){c[b]="title,"+document.getElementById("ftitle").value;
b++
}if(document.getElementById("fstatus").value.length>0){c[b]="status,"+document.getElementById("fstatus").value;
b++
}if(document.getElementById("fapplicationName").value.length>0){c[b]="applicationName,"+document.getElementById("fapplicationName").value;
b++
}if(document.getElementById("fpriority").value.length>0){c[b]="priority,"+document.getElementById("fpriority").value;
b++
}if(document.getElementById("fassignee").value.length>0){c[b]="assignee,"+document.getElementById("fassignee").value;
b++
}grid.getStore().baseParams={filterValues:c};
var a=bbarObj.pageSize;
grid.getStore().load({params:{start:0,limit:a}})
}function showAllValues(){var b=new Array();
document.getElementById("fid").value="";
document.getElementById("ftitle").value="";
document.getElementById("fstatus").value="";
document.getElementById("fapplicationName").value="";
document.getElementById("fpriority").value="";
document.getElementById("fassignee").value="";
grid.getStore().baseParams={filterValues:b};
var a=bbarObj.pageSize;
grid.getStore().load({params:{start:0,limit:a}})
}function openIncident(){var a=document.getElementById("statusId").value;
if(a!=""){$("#message_label").html("Selected values are attached successfully ");
var c=a;
var b="/login.action?method=postLogin#'show_tab_menu_grid','form','tabIndex=0&module=formdetails&ticketId="+c+"&formName=Incident'";
window.open(b,"_blank")
}else{$("#grid_message").css("display","block");
$("#message_label").html("No Incident selected for view");
grid.getStore().reload()
}setTimeout(function(){$("#grid_message").fadeOut()
},3000)
}function executeAcknowledge(b){var e=grid.getSelectionModel().getSelections();
var d=document.getElementById("assigneeId").value;
var c=null;
if(null!=b&&b=="multiple"){for(i=0;
i<e.length;
i++){aRecord=e[i];
filedValue=aRecord.get("id");
if(aRecord.get("id")!=null){c=c+","+aRecord.get("id")
}}}else{if(null!=b&&b=="single"){var a=grid.getSelectionModel().getSelected();
c=a.get("id")
}}if(d!=""){Ext.Ajax.request({url:"grid/eventConsole.action",params:{method:"executeAcknowledge",assigneeId:document.getElementById("assigneeId").value,ticketId:c,type:b},failure:function(f,g){$("#message_label").css("color","red");
$("#message_label").html("No ticket selected for Acknowledge!");
setTimeout(function(){$("#grid_message").fadeOut()
},3000)
},success:function(g,h){if(g.responseText!=""){$("#message_label").html("Selected Ticket and Assignee acknowledged successfully    <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
var j=g.responseText;
var f="/login.action?method=postLogin#'show_tab_menu_grid','form','tabIndex=0&module=formdetails&ticketId="+j+"&formName=Incident'";
window.open(f,"_blank")
}else{$("#grid_message").css("display","block");
$("#message_label").html("No event selected for Acknowledge   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>")
}grid.getStore().reload()
}})
}else{$("#message_label").html("No Assignee selected for Acknowledge   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
grid.getStore().reload()
}}function dateTime(){var b=new Date();
hour=b.getHours();
min=b.getMinutes();
sec=b.getSeconds();
if(min<=9){min="0"+min
}if(sec<=9){sec="0"+sec
}if(hour>12){hour=hour-12;
add=" PM"
}else{hour=hour;
add=" AM"
}if(hour==12){add=" PM"
}if(hour==0){hour="12"
}var a=hour+":"+min+":"+sec+" "+add;
return a
}function filterByHour(){lowcount=0;
highcount=0;
mediumcount=0;
criticalcount=0;
var b=document.getElementById("hour").value;
grid.getStore().baseParams={hour:b};
var a=bbarObj.pageSize;
grid.getStore().load({params:{start:0,limit:a}})
}function clearTag(){return'<img src="'+contextPath+'/13899/images/clear16.gif" width="16px" height="16px" onclick="clearStatus(\'single\')" title="Clear Status" style="cursor:pointer"/>'
}function clearHeaderTag(){return'<img src="'+contextPath+'/13899/images/clear16.gif" width="16px" height="16px" title="Clear Status" style="cursor:pointer"/>'
}function clearTagForTagConsole(){return'<img src="'+contextPath+'/13899/images/clear16.gif" width="16px" height="16px" onclick="removeTickets()" title="Remove Ticket" style="cursor:pointer"/>'
}function executeTag(){return'<img src="'+contextPath+'/13899/images/ping16.gif" width="16px" height="16px" onclick="executeHost(\'host\',\'grid.getSelectionModel().getSelections()\',\'single\')" title="Ping Device" style="cursor:pointer"/>'
}function bookTag(){return'<img src="'+contextPath+'/13899/images/ack16.gif" width="16px" height="16px" onclick="executeAcknowledge(\'single\')" title="Create Ticket" style="cursor:pointer"/>'
}function bookHeaderTag(){return'<img src="'+contextPath+'/13899/images/ack16.gif" width="16px" height="16px"  title="Create Ticket" style="cursor:pointer"/>'
}function historyTag(b,d,a,c){return'<img src="'+contextPath+'/13899/images/device_ticket_history.gif" width="16px" height="16px" onmouseout="javascript:xstooltip_hide(\'tooltipDiv\');"   onclick="javascript:showOctaneGrid();//ext_show(\'tooltipDiv\',this,\'trsd\');" title="TSG Match" style="cursor:pointer"/>'
}function historyHeaderTag(b,d,a,c){return'<img src="'+contextPath+'/13899/images/device_ticket_history.gif" width="16px" height="16px" onmouseout="javascript:xstooltip_hide(\'tooltipDiv\');"   title="TSG Match" style="cursor:pointer"/>'
}function historyTagForTagConsole(b,d,a,c){return'<img src="'+contextPath+'/13899/images/device_ticket_history.gif" width="16px" height="16px" onmouseout="javascript:xstooltip_hide(\'tooltipDiv\');"   onclick="javascript:ext_show_Tag(\'tooltipDiv\',this,\'trsd\');" title="Messages" style="cursor:pointer"/>'
}function messageTag(){return'<img src="'+contextPath+'/13899/images/messages.gif" width="16px" height="16px" onmouseout="javascript:xstooltip_hide(\'tooltipDiv\');" onclick="showLastMessage(\'tooltipDiv\',this,\'trsd\')" title="Messages" style="cursor:pointer"/>'
}function closeTag(){return'<img src="'+contextPath+'/13899/images/clear16.gif" width="16px" height="16px" onclick="closeStatus()" title="Close Status" style="cursor:pointer"/>'
}function clearStatus(){var b=grid.getSelectionModel().getSelected();
var a=b.get("id");
Ext.Ajax.request({url:"grid/eventConsole.action",params:{method:"clearStatus",ticketId:a},failure:function(c,d){$("#message_label").css("color","red");
$("#message_label").html("No ticket selected for clear!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
grid.getStore().reload()
},success:function(c,d){$("#message_label").html("Status value updated successfully    <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
grid.getStore().reload()
}})
}function executeAck(){var c=grid.getSelectionModel().getSelected();
var b=document.getElementById("assigneeId").value;
var a=c.get("id");
if(b!=""){Ext.Ajax.request({url:"grid/eventConsole.action",params:{method:"executeAck",assigneeId:b,ticketId:a},failure:function(d,e){$("#message_label").css("color","red");
$("#message_label").html("No ticket selected for Acknowledge!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>")
},success:function(e,f){if(e.responseText!=""){$("#message_label").html("Selected Ticket and Assignee acknowledged successfully    <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
var g=e.responseText;
var d="/login.action?method=postLogin#'show_tab_menu_grid','form','tabIndex=0&module=formdetails&ticketId="+g+"&formName=Incident'";
window.open(d,"_blank")
}else{$("#grid_message").css("display","block");
$("#message_label").html("No event selected for Acknowledge   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>")
}grid.getStore().reload()
}})
}else{$("#message_label").html("No event selected for Acknowledge   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
grid.getStore().reload()
}}function executePingScript(){var b=grid.getSelectionModel().getSelected();
var a=b.get("id");
Ext.Ajax.request({url:"grid/eventConsole.action",params:{method:"executePingScript",ticketId:a},failure:function(c,d){$("#message_label").css("color","red");
$("#message_label").html("No ticket selected !   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>")
},success:function(c,d){$("#message_label").html("Ping script executed successfully   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
grid.getStore().reload()
}})
}function removeTickets(){var d="";
var b=0;
var e=grid.getSelectionModel().getSelections();
b=e.length;
for(i=0;
i<b;
i++){aRecord=e[i];
filedValue=aRecord.get("ID");
if(aRecord.get("ID")!=null){if(d==""){d=aRecord.get("ID")
}else{d=d+","+aRecord.get("ID")
}}}if(b!=0){var c=document.getElementById("mytagId").value;
if(c==""){c=document.getElementById("sharedId").value
}var a=bbarObj.pageSize;
Ext.Ajax.request({url:"grid/tagConsole.action",params:{method:"removeTickets",multiValue:d,tagId:c},success:function(f,g){$("#message_label").html(" Ticket removed successfully    <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show();
grid.getStore().load({params:{tagId:c,start:0,limit:a}})
}})
}else{$("#message_label").html("No Tickets selected for Remove   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}}function userGridLayoutSave(b){var k=grid.getColumnModel();
var l=k.getColumnCount();
var g=bbarObj.pageSize;
var h="";
var f="";
var d="";
var a="";
var j="";
var m="";
var e=new Array();
for(var c=1;
c<l;
c++){if(!k.isHidden(c)){e[c]=k.getColumnHeader(c)+","+k.getColumnWidth(c)+","+c+",true"
}else{e[c]=k.getColumnHeader(c)+","+k.getColumnWidth(c)+","+c+",false"
}}if(grid.getStore().getSortState()!=undefined){j=grid.getStore().getSortState().direction;
m=grid.getStore().getSortState().field
}else{j="";
m=""
}Ext.Ajax.request({url:"grid/radaptiveGrid.action",params:{method:"showUserPreferencesGrid",columnArray:e,pageSize:g,sortfield:m,sortdirection:j,gridName:b,action:"showUserPreferencesGrid"},failure:function(n,o){$("#message_label").html("Problem on save Layout   <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
},success:function(n,o){$("#message_label").html("Layout saved successfully  <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}})
}function userGridLayoutClear(a){Ext.Ajax.request({url:"grid/radaptiveGrid.action",params:{method:"deleteUserPreferencesGrid",gridName:a,action:"deleteUserPreferencesGrid"},failure:function(b,c){$("#message_label").html("Problem on clear saved Layout   <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
},success:function(b,c){$("#message_label").html("Layout cleared successfully  <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}})
}function checkHandler(b,c){var a;
if(c==true){a=false
}else{a=true
}value=(b.value+4);
grid.getColumnModel().setHidden(value,a)
}function checkHandlerForGrid(a,b){if(b==true){grid.getColumnModel().setHidden(a.value,false)
}else{grid.getColumnModel().setHidden(a.value,true)
}}function checkHandlerForIMConsole(b,c){var a;
if(c==true){a=false
}else{a=true
}value=(b.value+1);
grid.getColumnModel().setHidden(value,a)
}function userEventConsoleSave(b){var k=grid.getColumnModel();
var l=k.getColumnCount();
var g=bbarObj.pageSize;
var h="";
var f="";
var d="";
var a="";
var j;
var m;
var e=new Array();
for(var c=4;
c<l;
c++){if(!k.isHidden(c)){e[c]=k.getColumnHeader(c)+","+k.getColumnWidth(c)+","+c+",true"
}else{e[c]=k.getColumnHeader(c)+","+k.getColumnWidth(c)+","+c+",false"
}}if(grid.getStore().getSortState()!=undefined){j=grid.getStore().getSortState().direction;
m=grid.getStore().getSortState().field
}else{j="";
m=""
}Ext.Ajax.request({url:"grid/radaptiveGrid.action",params:{method:"showUserPreferencesGrid",columnArray:e,pageSize:g,sortfield:m,sortdirection:j,gridName:b,action:"showUserPreferencesGrid"},failure:function(n,o){$("#message_label").html("Problem on save Layout   <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
},success:function(n,o){$("#message_label").html("Layout saved successfully  <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}})
}function updateMessage(c,a){var d;
var b="";
for(i=0;
i<c.length;
i++){d=c[i];
b=b+d.get("Id")+","
}Ext.Ajax.request({url:"grid/changeControlConsole.action",params:{method:"updateMessage",action:name,ticketids:b,lastmessage:a},failure:function(e,f){Ext.MessageBox.alert("Warning","Oops...")
},success:function(e,f){$("#message_label").html("Message Updated successfully  <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show();
grid.getStore().reload()
}})
}function updateTicketStatus(d,b,a){var f;
var c="";
var e="Message OR Status ";
for(i=0;
i<d.length;
i++){f=d[i];
c=c+f.get("Id")+","
}if(b=="nothing"){e="Status "
}Ext.Ajax.request({url:"grid/changeControlConsole.action",params:{method:"updateTicketStatus",action:name,ticketids:c,lastmessage:b,status:a},failure:function(g,h){Ext.MessageBox.show({title:"Warning Icon",msg:g.responseText,buttons:Ext.MessageBox.OK,animEl:"samplebutton",icon:Ext.MessageBox.WARNING})
},success:function(g,h){$("#message_label").html(e+g.responseText+"  <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show();
refreshStatusCounter();
grid.getStore().reload()
}})
}function setStatusApproved(){return'<img src="'+contextPath+'/13899/images/clear16.gif" width="16px" height="16px" onclick="updateStatusApproved()" title="Move Back" style="cursor:pointer"/>'
}function setStatusInProgress(){return'<img src="'+contextPath+'/13899/images/ack16.gif" width="16px" height="16px" onclick="updateStatusInProgress()" title="Go Ahead" style="cursor:pointer"/>'
}function updateStatusApproved(c){var b="nothing";
var a=grid.getSelectionModel().getSelections();
if(a[0].get("Status")!="Scheduled/Approved"){var c="Scheduled/Approved";
updateTicketStatus(a,b,c);
refreshStatusCounter()
}else{var d="Already Status in "+a[0].get("Status");
$("#message_label").html(d+"   <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}}function updateStatusInProgress(){var c="nothing";
var b=grid.getSelectionModel().getSelections();
if(b[0].get("Status")!="WIP"){var a="WIP";
updateTicketStatus(b,c,a);
refreshStatusCounter()
}else{var d="Already Status in "+b[0].get("Status");
$("#message_label").html(d+"   <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}}function filterChangeRequest(){var c=new Array();
var b=0;
if(document.getElementById("id").value.length>0){if(document.getElementById("id").defaultValue==document.getElementById("id").value){c[b]=""
}else{c[b]="id,"+document.getElementById("id").value;
b++
}}if(document.getElementById("status").value.length>0){if(document.getElementById("status").defaultValue==document.getElementById("status").value){c[b]=""
}else{c[b]="status,"+document.getElementById("status").value;
b++
}}if(document.getElementById("summary").value.length>0){if(document.getElementById("summary").defaultValue==document.getElementById("summary").value){c[b]=""
}else{c[b]="summary,"+documentdateTime.getElementById("summary").value;
b++
}}if(document.getElementById("location").value.length>0){if(document.getElementById("location").defaultValue==document.getElementById("location").value){c[b]=""
}else{c[b]="location,"+document.getElementById("location").value;
b++
}}if(document.getElementById("priority").value.length>0){if(document.getElementById("priority").defaultValue==document.getElementById("priority").value){c[b]=""
}else{c[b]="priority,"+document.getElementById("priority").value;
b++
}}if(document.getElementById("assignee").value.length>0){if(document.getElementById("assignee").defaultValue==document.getElementById("assignee").value){c[b]=""
}else{c[b]="assignee,"+document.getElementById("assignee").value;
b++
}}grid.getStore().baseParams={filterValues:c};
var a=bbarObj.pageSize;
grid.getStore().load({params:{start:0,limit:a,searchChangeRequest:1}})
}function clearDiv(){var d=new Array();
$("#search-div input[type=text]").each(function(e){$(this).val("");
$(this).val($(this).attr("defaultValue"))
});
grid.getStore().baseParams={filterValues:d};
var b=bbarObj.pageSize;
var a=null;
if(document.getElementById("cboTicketStatus")!=null){a=document.getElementById("cboTicketStatus").value
}var c=null;
if(document.getElementById("mytagId")!=null){if(document.getElementById("mytagId").value!=""){c=document.getElementById("mytagId").value
}else{c=document.getElementById("sharedId").value
}}grid.getStore().load({params:{start:0,limit:b,ticketStatus:a,tagId:c}})
}function closeDiv(){if(document.getElementById("mytagId")!=null){var a=new Array();
$("#search-div input[type=text]").each(function(b){$(this).val("");
$(this).val($(this).attr("defaultValue"))
});
grid.getStore().baseParams={filterValues:a}
}$("#search-main").hide()
}function checkListener(b,c){value=b.value+3;
var a;
if(c==true){a=false
}else{a=true
}grid.getColumnModel().setHidden(value,a)
}$("#search-div input[type=text]").focus(function(){$("#search-div input[type=text]").val("")
});
function changeControlGridLayoutSave(b){var j=grid.getColumnModel();
var k=j.getColumnCount();
var g=bbarObj.pageSize;
var h="";
var f="";
var d="";
var a="";
var e=new Array();
for(var c=3;
c<k;
c++){if(!j.isHidden(c)){e[c]=j.getColumnHeader(c)+","+j.getColumnWidth(c)+","+c+",true"
}else{e[c]=j.getColumnHeader(c)+","+j.getColumnWidth(c)+","+c+",false"
}}Ext.Ajax.request({url:"grid/radaptiveGrid.action",params:{method:"showUserPreferencesGrid",columnArray:e,pageSize:g,gridName:b,action:"showUserPreferencesGrid"},failure:function(l,m){$("#message_label").html("Problem on save Layout   <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
},success:function(l,m){$("#message_label").html("Layout saved successfully  <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}})
}function clearField(a){if(a.defaultValue==a.value){a.value=""
}}function setFilterFieldValue(a){if(a.value==""){a.value=a.defaultValue
}}var time=dateTime();
var lblTime=new Ext.form.Label({text:time,style:"margin-left:10px;color:blue"});
var refreshStore=new Ext.data.ArrayStore({fields:["isRefreshOn","isRefreshOff"],data:[["On","On"],["Off","Off"]]});
var refreshCombo=new Ext.form.ComboBox({store:refreshStore,displayField:"isRefreshOn",width:50,mode:"local",listWidth:50,triggerAction:"all",selectOnFocus:false,value:"On",valueField:"isRefreshOn",editable:false,forceSelection:false});
function changeTime(){Ext.Ajax.request({url:"grid/radaptiveGrid.action",params:{method:"getTimeZoneRefershTime"},failure:function(b,d,c){var a=b.responseText;
if(b.status==0){$("#message_label").html("<p style='color:red;font-size: 10pt;'>Your Session is Offline.    <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font-size: 10pt;'>Hide</a></p>")
}else{if(b.status==404){$("#message_label").html("<p style='color:red;font-size: 10pt;'>Requested URL Not Found.   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font-size: 10pt;'>Hide</a></p>")
}else{if(b.status==500){$("#message_label").html("<p style='color:red;font-size: 10pt;'>Internal Server Error.   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font-size: 10pt;'>Hide</a></p>")
}else{if(d=="parsererror"){$("#message_label").html("<p style='color:red;font-size: 10pt;'>Request Failed.   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font-size: 10pt;'>Hide</a></p>")
}else{if(d=="timeout"){$("#message_label").html("<p style='color:red;font-size: 10pt;'>Request Time Out.   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font-size: 10pt;'>Hide</a></p>")
}else{$("#message_label").html("<p style='color:red;font-size: 10pt;'>You are in Offline!!\n Please Check Your Application Network."+b.responseText+"   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font-size: 10pt;'>Hide</a></p>")
}}}}}},success:function(a,c){var a=a.responseText;
var b=a.split('"');
if(b[1]=="refreshTime"){lblTime.setText(b[3],true)
}}})
}var refreshCounter=setInterval(function(){if(null!==document.getElementById("gridId")){if(getGridName().indexOf("DATA_APP")!=-1){refreshIncidentCombo();
refreshSeverityCounter(Ext.getCmp("severityCounter").getValue())
}}},60000);
function refreshIncidentCombo(){if(incidentStore!=null){incidentStore.load()
}if(statusField!=null){statusField.store.load()
}}var incidentStore=null;
function refreshIncidentStore(){incidentStore=new Ext.data.Store({autoLoad:true,proxy:new Ext.data.HttpProxy({url:"grid/eventConsole.action?method=refreshIncidentCombo"}),reader:new Ext.data.JsonReader({root:"statusList"},[{name:"value"},{name:"label"}])})
}var statusField=null;
function refreshIncident(){var a=new Ext.form.ComboBox({id:"statusField",store:incidentStore,name:"status",valueField:"value",displayField:"label",hiddenName:"statusId",bodyStyle:"padding-top: 5px 5px 5px",typeAhead:false,mode:"local",triggerAction:"all",emptyText:"Select a ticket...",selectOnFocus:false,applyTo:"incidentStatus"});
a.doQuery=function(d,c){d=Ext.isEmpty(d)?"":d;
var b={query:d,forceAll:c,combo:this,cancel:false};
if(this.fireEvent("beforequery",b)===false||b.cancel){return false
}d=b.query;
c=b.forceAll;
if(c===true||(d.length>=this.minChars)){if(this.lastQuery!==d){this.lastQuery=d;
if(this.mode=="local"){this.selectedIndex=-1;
if(c){this.store.clearFilter()
}else{this.store.filter(this.displayField,d,true)
}this.onLoad()
}else{this.store.baseParams[this.queryParam]=d;
this.store.load({params:this.getParams(d)});
this.expand()
}}else{this.selectedIndex=-1;
this.onLoad()
}}}
}function refreshSeverityCounter(a){var b="grid/eventConsole.action?method=severityCounter&gridName="+a;
$.getJSON(b,function(c){$("#criticalcounter").html(c.Critical.toString());
$("#warningcounter").html(c.Warning.toString());
$("#informationcounter").html(c.Information.toString())
})
}function autoSizeColumn(){}function autoSizeColumn2EC(){var e=grid.getColumnModel().getColumnCount();
for(var c=0;
c<=(e-1);
c++){var b=grid.view.getHeaderCell(c).firstChild.scrollWidth;
for(var d=0,a=grid.getStore().getCount();
d<a;
d++){b=Math.min(b,grid.view.getCell(d,c).firstChild.scrollWidth)
}b+=2;
grid.colModel.setColumnWidth(c,b)
}}function refreshStatusCounter(){Ext.Ajax.request({url:"grid/changeControlConsole.action",params:{method:"countStatus",gridName:"CHANGE_CONTROL_CONSOLE"},success:function(a,c){var a=a.responseText;
var b=a.split(",");
$("#readytostart").html("RTS "+b[0]);
$("#scheduledapproved").html("PLAN "+b[1]);
$("#completed").html("RC "+b[2]);
$("#workinprogress").html("WIP "+b[3])
}})
}function handleError(b,a){switch(b){case"remote":alert(a.raw.errors);
break;
case"response":if((a.status!==0)&&(a.status===0)){alert("The request has timed out. Please try again.")
}else{$("#extgrid").html(a.responseText);
$("#extgrid").css("color","red")
}break
}}function linkToBuggerDetails(f,a,b,h,e,c){var b=grid.getStore().getAt(h);
var g="";
if(b.get("BuggerID")){g=b.get("BuggerID")
}else{if(b.get("buggerid")){g=b.get("buggerid")
}else{if(b.get("BuggerId")){g=b.get("BuggerId")
}else{g=b.get("BuggerID")
}}}var d="http://bugger.danger.com/bug.detail.html?pkey="+g;
return"<a href="+d+' onclick="window.open(this.href);return false;">'+g+"</a>"
}function closeStatus(){var b=grid.getSelectionModel().getSelected();
var a=b.get("ID");
Ext.Ajax.request({url:"grid/iMConsole.action",params:{method:"closeStatus",ticketId:a},failure:function(c,d){$("#message_label").html("No ticket selected for clear!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show();
grid.getStore().reload()
},success:function(c,d){$("#message_label").html("Status value updated successfully    <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show();
grid.getStore().reload()
}})
}function filterIncident(){var b=document.getElementById("status").value;
grid.getStore().baseParams={status:b};
var a=bbarObj.pageSize;
grid.getStore().load({params:{start:0,limit:a}})
}function reloadGrid(){grid.getStore().reload()
}function renderIcon(d,g,b,f){var c="";
var a=b.get("Status");
var j=b.get("PostMortemRequest");
var h="";
if(j=="Yes"&&(a=="Open"||a=="WIP"||a=="Needs Ack"||a=="Reopened"||a=="Escalated")){if(d=="Sev - 0"||d=="Sev - 1"||d=="Sev - 2"){h="s0_s2_p_open.gif"
}else{if(d=="Sev - 3"){h="s3_p_open.gif"
}else{if(d=="Sev - 4"||d=="Sev - 5"){h="s4_p_open.gif"
}else{if(d=="Investigation"){h="Investigation.gif"
}}}}}else{if(j=="Yes"&&(a=="Closed"||a=="Cancelled")){if(d=="Sev - 0"||d=="Sev - 1"||d=="Sev - 2"){h="s0_s2_p_closed.gif"
}else{if(d=="Sev - 3"){h="s3_p_closed.gif"
}else{if(d=="Sev - 4"||d=="Sev - 5"){h="s4_p_closed.gif"
}else{if(d=="Investigation"){h="Investigation.gif"
}}}}}else{if(a=="Open"||a=="WIP"||a=="Needs Ack"||a=="Reopened"||a=="Escalated"){if(d=="Sev - 0"||d=="Sev - 1"||d=="Sev - 2"){h="s0_s2_open.gif"
}else{if(d=="Sev - 3"){h="s3_open.gif"
}else{if(d=="Sev - 4"||d=="Sev - 5"){h="s4_open.gif"
}else{if(d=="Investigation"){h="Investigation.gif"
}}}}}else{if(a=="Closed"||a=="Cancelled"){if(d=="Sev - 0"||d=="Sev - 1"||d=="Sev - 2"){h="s0_s2_closed.gif"
}else{if(d=="Sev - 3"){h="s3_closed.gif"
}else{if(d=="Sev - 4"||d=="Sev - 5"){h="s4_closed.gif"
}else{if(d=="Investigation"){h="Investigation.gif"
}}}}}else{return d
}}}}return'<img src="'+contextPath+"/13899/newui/images/imConsole/"+h+'" width="18px" height="18px" title="'+d+'"/>'
}function change(){var a;
a=document.getElementById("functionEvent").value;
if(a=="renderer"){content="Renderer - An Existing Ext Element will be the container to render this component into forms or grids"
}else{content="Handler - Handler executes the code inside the function according to the specified actions or events."
}}function renderAppGenIcon(b,d,a,c){var f=b;
if(b==true){return'<center><img src="'+contextPath+'/13899/newui/images/ack16.gif" width="16px" height="16px" style="cursor:pointer" title="Deployed"/></center>'
}else{return'<center><img src="'+contextPath+'/13899/newui/images/clear16.gif" width="16px" height="16px" style="cursor:pointer" title="UnDeployed"/></center>'
}}function renderAppGenServiceDirEntry(b){var a=b;
if(a==true){return'<center><img src="'+contextPath+'/13899/newui/images/ack16.gif" width="16px" height="16px" style="cursor:pointer" title="Yes"/></center>'
}else{return'<center><img src="'+contextPath+'/13899/newui/images/clear16.gif" width="16px" height="16px" style="cursor:pointer" title="No"/></center>'
}}function renderAppGenStatus(a){var b=a;
if(b==true){return"Modified"
}else{return"New"
}}function linkAppGenCreator(b){var a="javascript:execute('show_edit_appgenform2','appgen','isFromUpdate=true&isFromRadaptive=true&formId="+b+"')";
return'<a href="javascript:void(0);" onclick='+a+">"+b+"</a>"
}function showOctaneGrid(){var b=grid.getSelectionModel().getSelected();
var a=b.get("Id");
var c=b.get("SourceSystem");
execute("show_octane_console","form","title=TSG Match&ticketID="+a)
}function executeOctaneAction(a){dirtyFlag=false;
execute("show_octane_console","form","title=TSG Match&ticketID="+a)
}function removeApplication(){var b=null;
var a=0;
var c=grid.getSelectionModel().getSelections();
a=c.length;
for(i=0;
i<a;
i++){aRecord=c[i];
filedValue=aRecord.get("Id");
if(aRecord.get("Id")!=null){b=b+","+aRecord.get("Id")
}}if(a!=0){Ext.Ajax.request({url:"/appGen2/showAppGen.action",params:{method:"deleteForm",formId:b},failure:function(d,e){$("#message_label").html("No Applications selected for Remove!");
$("#message_label").show()
},success:function(d,e){$("#message_label").html("Selected Applications are Removed successfully    <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show();
grid.getStore().reload()
}})
}else{$("#message_label").html("No Applications selected for Remove   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show();
grid.getStore().reload()
}}function linkGroupCreator(b){var a='javascript:loadTab("show_edit_group","admin","id='+b+'&title=EditWorkGroup&isFromAdmin=true")';
return'<a href="javascript:void(0);" onclick='+a+">"+b+"</a>"
}function renderCheckBox(b,d,a,c){var f=a.get("GroupName");
if(b==true){return'<input type="checkbox" onclick="setStatus(\''+f+"','"+b+'\');" value="inactive" checked>'
}else{return'<input type="checkbox" onclick="setStatus(\''+f+"','"+b+'\');" value="active" unchecked>'
}}function getCreatedTag(){var a=document.getElementById("newTag").value;
$.ajaxSettings.cache=false;
$.ajax({url:"/grid/tagConsole.action?method=insertCombo&newTag="+a,async:false,success:function(h){$tagdialog.dialog("close");
var d=h;
var b=d.indexOf("tagName");
if(b==-1){$("#message_label").css("color","red");
$("#message_label").html(d+"   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}else{if(d.length>0){$("#message_label").html("Tag is Copied successfully!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show();
var c=d.split(",");
var g=c[0];
var f=c[1];
var e=c[2];
g=g.substr(3,g.length);
f=f.substr(8,f.length);
e=e.substr(7,e.length);
if(e=="true"){$("#sharedId").append($("<option></option>").attr("value",g).text(f))
}$("#mytagId").append($("<option></option>").attr("value",g).text(f))
}}}})
}function callPopupForShowUrl(){var d=window.location.href;
var a=d.indexOf("&tagId");
if(a!=-1){d=d.substr(0,a)
}for(var b=0;
b<d.length;
b++){d=d.replace("%27","'");
d=d.replace("%20"," ")
}var c=document.getElementById("sharedId").value;
if(c==""){c=document.getElementById("mytagId").value
}if(c==""){$("#message_label").html("Select tag to show url!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}else{if(document.getElementById("sharedId").value==""){d=d+"&tagId=my"+c
}else{d=d+"&tagId=share"+c
}document.getElementById("dialogUrl").style.display="block";
$("#url").val(d);
jQuery(document).ready(function(){$urldialog=jQuery("#dialogUrl");
$urldialog.dialog({bgiframe:true,autoOpen:false,height:300,width:700,modal:true,position:[550,109]});
$urldialog.dialog("open")
})
}}function closeUrlDialog(){$urldialog.dialog("close")
}function callPopupforTagCopy(){document.getElementById("newTag").value="";
document.getElementById("dialogTag").style.display="block";
jQuery(document).ready(function(){$tagdialog=jQuery("#dialogTag");
$tagdialog.dialog({bgiframe:true,autoOpen:false,height:200,modal:true,position:[550,109]});
$tagdialog.dialog("open")
})
}function closeTagDialog(){$tagdialog.dialog("close")
}function ext_show_Tag(e,b,a){var d=grid.getSelectionModel().getSelected();
var c=d.get("ID");
Ext.Ajax.request({url:"grid/tagConsole.action",params:{method:"getMessage",ticketId:c},failure:function(f,g){$("#"+e).html("Problem on loading...").show()
},success:function(f,g){a=a.replaceAll(">","&gt;");
a=a.replaceAll("<","&lt;");
if(a){it=document.getElementById(e);
x=xstooltip_findPosX(b);
y=xstooltip_findPosY(b);
it.style.top=y+"px";
if(b.width){it.style.left=(x+10+b.width)+"px";
it.style.width="250px"
}else{it.style.left=(x+100)+"px"
}$("#"+e).html(f.responseText).show()
}}})
}function myTagChange(){var b=document.getElementById("mytagId").value;
var a=bbarObj.pageSize;
grid.getStore().load({params:{start:0,limit:a,tagId:b}});
$.ajaxSettings.cache=false;
$.ajax({url:"/grid/tagConsole.action?method=checkShared&tagId="+b,async:false,success:function(c){var d=c;
if(d=="true"){document.getElementById("shared").disabled=true;
document.getElementById("unshared").disabled=false;
document.getElementById("unshared").style.color="black";
document.getElementById("shared").style.color="gray"
}else{document.getElementById("unshared").disabled=true;
document.getElementById("shared").disabled=false;
document.getElementById("unshared").style.color="gray";
document.getElementById("shared").style.color="black"
}}});
obj=document.getElementById("sharedId");
obj.value=""
}function sharedTagChange(){var b=document.getElementById("sharedId").value;
var a=bbarObj.pageSize;
grid.getStore().load({params:{start:0,limit:a,tagId:b}});
obj=document.getElementById("mytagId");
obj.value=""
}function onUnSharedClick(){var d=$("#mytagId :selected").text();
var b=$("#mytagId :selected").val();
$("#sharedId option[value='"+b+"']").remove();
var e=document.getElementById("unshared").value;
var c=document.getElementById("mytagId").value;
var a=bbarObj.pageSize;
if(c==""){$("#message_label").html("Select the Tag to be Unshared!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}else{grid.getStore().load({params:{unshared:e,tagId:c,start:0,limit:a}})
}document.getElementById("unshared").disabled=true;
document.getElementById("shared").disabled=false;
document.getElementById("unshared").style.color="gray";
document.getElementById("shared").style.color="black"
}function onSharedClick(){var d=$("#mytagId :selected").text();
var b=$("#mytagId :selected").val();
$("#sharedId").append($("<option></option>").attr("value",b).text(d));
var e=document.getElementById("shared").value;
var c=document.getElementById("mytagId").value;
var a=bbarObj.pageSize;
if(c==""){$("#message_label").html("Select the Tag to be shared!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}else{grid.getStore().load({params:{shared:e,tagId:c,start:0,limit:a}})
}document.getElementById("shared").disabled=true;
document.getElementById("unshared").disabled=false;
document.getElementById("shared").style.color="gray";
document.getElementById("unshared").style.color="black"
}function toTagCopy(){var c="";
c=document.getElementById("sharedId").value;
if(c==""){c=document.getElementById("mytagId").value
}if(c==""){$("#message_label").css("color","red");
$("#message_label").html("Select Tag to be Copy!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}else{var b=document.getElementById("newTag").value;
if(b==""){$("#message_label").css("color","red");
$("#message_label").html("Tag Name should not be empty!   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}else{var a=bbarObj.pageSize;
grid.getStore().load({params:{tagId:c,newTag:b,start:0,limit:a}});
setTimeout("getCreatedTag()",100)
}}}function setStatus(b,a){Ext.Ajax.request({url:"admin/userQueue.action",params:{method:"setGroupStatus",groupName:b,value:a},failure:function(c,d){$("#message_label").html("Problem while setting group status   <a href='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
},success:function(c,d){execute("manage_group_grid","admin","gridName=MANAGE_GROUP_GRID&formName=Group&title=Manage Groups&sortField=&sortDirection=")
}})
}Ext.data.Connection.prototype.handleFailure=Ext.data.Connection.prototype.handleFailure.createInterceptor(function(b,c){var a=Ext.DomQuery.selectValue("Reason/Text",b.responseXML,"The server taking too long to load data");
if(b.isTimeout){$("#message_label").html(a+"   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
$("#message_label").show()
}});
function formNameChange(){var b=$("#selectedForm").val();
$("#formId").val(b);
var a=gridbbarObj.pageSize;
var c="grid/radaptiveGrid.action?method=showExtSecuredGrid&gridName="+$("#gridId").val()+"&formName="+b+"&isForm=false";
grid.getStore().proxy.setApi("read",c);
grid.getStore().load({params:{start:0,limit:a}})
}function activeTrigger(a){$.ajax({url:a,success:function(c){var b=gridbbarObj.pageSize;
var d={};
d.start=0;
d.limit=b;
if($("#formId")!=null){d.formId=$("#formId").val()
}grid.getStore().load({params:d})
}})
}function activeSideMenu(a){$.ajax({url:a,success:function(c){var b=gridbbarObj.pageSize;
var d={};
d.start=0;
d.limit=b;
if($("#formId")!=null){d.formId=$("#formId").val()
}relogin()
}})
}function restartMessageTopicChannel(){Ext.Ajax.request({url:"messageTopic/messageTopicAction.action",params:{method:"restartTopicChannel"},failure:function(a,b){alert("Action failed.")
},success:function(a,b){}})
}function getSelectedRowsId(c){var d=grid.getSelectionModel().getSelections();
var b=new Array();
var a=0;
for(a=0;
a<d.length;
a++){b[a]=d[a].get("Id")
}$("#selectedId").val(b);
addRelatedItems(c)
}function reportType(a){$.ajax({url:a,success:function(c){var b=gridbbarObj.pageSize;
var d={};
d.start=0;
d.limit=b;
grid.getStore().load({params:d})
}})
}function report(a){$.ajax({url:a,success:function(c){var b=gridbbarObj.pageSize;
var d={};
d.start=0;
d.limit=b;
REPORTS_GRID.getStore().load({params:d})
}})
}function getContextPath(){return contextPath
}function deleteRelatedItemsFromCache(c,l,d,h,e,k,f){var j=d.get("Application");
var a=d.get("Id");
var b=d.get("relationId");
var g="\"javascript:removeRelation('"+j+"','"+a+"','"+b+"','"+f+"','"+k.gridObjectName+"')\"";
return'<img src="'+contextPath+'/13899/images/clear16.gif" width="16px" height="16px" onclick='+g+' title="Remove"  style="cursor:pointer"/>'
}function deleteRelatedTicket(g,a,c,h,f,e){var b=c.get("relationId");
var d="\"deleteRelatedTicketById('"+b+"','"+e.gridObjectName+"')\"";
return'<img src="'+contextPath+'/13899/images/clear16.gif" width="16px" height="16px" onclick='+d+' title="Remove"  style="cursor:pointer"/>'
}function deleteRelatedTicketById(relationshipId,grid){$.ajax({url:"relationship/relationship.action?method=deleteRelationshipObjectById&relationshipId="+relationshipId,success:function(response){var gridObject=eval(grid);
var bbarObject=eval(grid+"bbarObj");
var pageSize=bbarObject.pageSize;
if(gridObject&&gridObject.store){__showProgressForOverview();
gridObject.store.load({params:{start:0,limit:pageSize},callback:function(rec,options,success){setGridBottomBarVisiblity(gridObject);
setGridMargin(gridObject);
setGridVisbilty(gridObject);
if(gridObject.getStore().getTotalCount()>20){gridObject.bbar.show()
}else{gridObject.bbar.hide()
}if(gridObject.getStore().getTotalCount()>0){$("#"+gridObject.getStore().gridObjectName).hide();
$("#"+gridObject.getStore().gridDiv).show()
}else{$("#"+gridObject.getStore().gridDiv).hide();
$("#"+gridObject.getStore().gridObjectName).show()
}__hideProgressForOverview()
}})
}},error:function(response){alert("Can't delete Ticket .")
}})
}function refreshGrid(gridObjectName){var gridObject=eval(gridObjectName);
gridObject.getStore().reload()
}function hideGrid(a){$("#"+a.getStore().gridDiv).hide()
}function showGrid(a){$("#"+a.getStore().gridDiv).show()
}function setTitleEastPanel(a){var b=a;
Ext.getCmp("east-panel").setTitle(b)
}function setTitleWestPanel(a){var b=a;
Ext.getCmp("west-panel").setTitle(b)
}function setTitleCenterPanel(a){var b=a;
Ext.getCmp("center-panel").setTitle(b)
}function setGridTitleCenterPanel(){var d=grid.getSelectionModel().getSelections();
var b="";
var a="";
var c="";
if(d){var e=d[0];
b=e.get("Id");
a=e.get("Title");
c=""+b+" - "+a
}}function showDetailPanelTicketId(){var e=grid.getSelectionModel().getSelections();
var c="";
var a="";
var b="";
var d="";
var f=e[0];
c=f.get("Id");
fieldTitle=f.get("Title");
b=f.get("ApplicationName");
loadTab("show_tab_menu_grid","form","ticketId="+c+"&formName="+b+"","","")
}function mainContainerShow(){hideEastPanel();
Ext.getCmp("west-panel").expand();
showContainerCenterPanel();
clearEastPanel();
Ext.getCmp("maincontainer").show()
}function disableGridDetailMenu(){}function enableGridDetailMenu(){}function gridContainerShow(){Ext.getCmp("west-panel").expand();
clearEastPanel();
if(document.getElementById("gridId")!=null){}}function backToGrid(){Ext.getCmp("west-panel").expand();
clearEastPanel();
hideEastPanel();
showGridListPanel()
}function toggle_button(b,a){b.setDisabled(a)
}function hidePanels(){Ext.getCmp("west-panel").collapse();
document.getElementById("logo").style.display="none";
document.getElementById("rightTd").style.display="none"
}function destroyPanels(){Ext.getCmp("west-panel").collapse();
document.getElementById("west-panel-xcollapsed").style.display="none";
document.getElementById("east-panel-xcollapsed").style.display="none";
document.getElementById("logo").style.display="none";
document.getElementById("rightTd").style.display="none"
}function hideEastPanel(){var a=Ext.getCmp("east-panel");
a.collapse()
}function showEastPanel(){Ext.getCmp("east-panel").show();
var a=Ext.getCmp("east-panel");
if(a.collapsed){a.expand()
}}function clearEastPanel(){if(document.getElementById("sd_menu_container_east")!=null){document.getElementById("sd_menu_container_east").innerHTML=""
}}function onExpandEastPanel(){var b=Ext.getCmp("east-panel");
var a=b.getWidth();
b.setWidth(a);
setEastContainerHeight()
}function showGridDetailPanel(){Ext.getCmp("maincontainer").hide();
Ext.getCmp("maindetail").hide();
Ext.getCmp("mainmessage").hide()
}function showGridListPanel(){Ext.getCmp("maincontainer").hide();
Ext.getCmp("maindetail").hide();
Ext.getCmp("mainmessage").hide()
}function showContainerCenterPanel(){Ext.getCmp("maincontainer").show();
$("#container").show();
Ext.getCmp("maindetail").hide();
Ext.getCmp("mainmessage").hide()
}function showDetailContainerCenterPanel(){Ext.getCmp("maindetail").show();
$("#detail").show();
Ext.getCmp("maincontainer").hide();
Ext.getCmp("mainmessage").hide();
$("#container").hide()
}function showDetailPanelSelect(){}function setTicketContainerWidth(){var b=document.getElementById("center-panel");
if(b!==null||b!==""){var a=document.getElementById("message_menu_tab").style.width;
document.getElementById("operation_overview").width=a
}}function setAppfactoryWidth(){var a=document.getElementById("center-panel");
if(a!==null||a!==""){split_width=(a.style.width).split("p");
document.getElementById("leftDivContainer").width=split_width[0]-3
}}function setTicketContainerHeight(){}function setTemplateScreenHeight(){var a=document.getElementById("template");
var b=parseInt(findInnerHightForCenterPanal())-18;
if(a!==null||a!==""){a.style.height=b+"px"
}}function setTabContainerHeightDetail(){var a=document.getElementById("tab_content_container");
var b=parseInt(findInnerHightForCenterPanal())-38;
if(a!==null&&a!==""){a.style.height=b+"px"
}}function setEastContainerHeight(){var b=document.getElementById("sd_menu_container_east");
var a=b.parentNode.id;
document.getElementById(a).style.overflow="auto";
b.style.width=parseInt(document.getElementById(a).style.width)-34
}function setCenterContainerHeight(){var a=parseInt(findInnerHightForCenterPanal())-6;
document.getElementById("container").style.height=a+"px"
}function setCenterContainerHeightAndWidth(){var a=parseInt(findInnerHightForCenterPanal())-6;
document.getElementById("container").style.height=a+"px";
Ext.getCmp("maincontainer").setWidth(821)
}function setCenterContainerWidth(){var a=document.getElementById("center_container").nextSibling;
a.style.width=""
}function setCenterContainerSize(){var a=parseInt(findInnerHightForCenterPanal())-6;
document.getElementById("container").style.height=a+"px";
Ext.getCmp("maincontainer").setWidth(821)
}function setCenterContainerSizeForBilling(){var a=parseInt(findInnerHightForCenterPanal())-6;
document.getElementById("container").style.height=a+"px";
var b=parseInt(findInnerWidthForCenterPanel());
if(b>1000){Ext.getCmp("maincontainer").setWidth(1000)
}else{Ext.getCmp("maincontainer").setWidth(b)
}}function setMainContainerSize(){var a=parseInt(findInnerHightForCenterPanal());
var b=parseInt(findInnerWidthForCenterPanel());
Ext.getCmp("maincontainer").setHeight(a-4);
Ext.getCmp("maincontainer").setWidth(b)
}function setMainDetailContainerSize(){var a=parseInt(findInnerHightForCenterPanal());
Ext.getCmp("maindetail").setWidth(839);
Ext.getCmp("maindetail").setHeight(a-3);
setCenterContainerWidth()
}function setListContainerHeightSearchOverview(){var a=parseInt(findInnerHightForCenterPanal())
}function setListSearchContainerHeight(){var a=parseInt(findInnerHightForCenterPanal())
}function setGridDetailMenuSize(){var a=parseInt(findInnerWidthForCenterPanel())
}function setEventConsoleGridDetailMenuSize(){var a=parseInt(findInnerHightForCenterPanal());
var b=parseInt(findInnerWidthForCenterPanel())
}function setEventConsoleGridSizeCenterPanel(b){document.getElementById("container").style.height="";
var d="#"+b;
var a=parseInt(findInnerHightForCenterPanal())-84;
var c=parseInt(findInnerWidthForCenterPanel())-3;
grid.setHeight(a);
$(d).height(a);
grid.setWidth(c);
$(d).width(c)
}function setGridSizeForCenterPanel(a){document.getElementById("container").style.height=""
}function setGridWidthForMessagesPanel(){var c=document.getElementById("sd_menu_container_east");
var b=c.parentNode.id;
var a=c.style.width=parseInt(document.getElementById(b).style.width)-3;
return a
}function setGridSizeForIMConsolePanel(b){document.getElementById("container").style.height="";
var d="#"+b;
var a=parseInt(findInnerHightForCenterPanal())-64;
var c=parseInt(findInnerWidthForCenterPanel())-4;
grid.setHeight(a);
$(d).height(a);
grid.setWidth(c);
$(d).width(c)
}function setGridSizeForManageGroupGrid(b){document.getElementById("container").style.height="";
var d="#"+b;
var a=parseInt(findInnerHightForCenterPanal())-28;
var c=parseInt(findInnerWidthForCenterPanel())-4;
grid.setHeight(a);
$(d).height(a);
grid.setWidth(c);
$(d).width(c)
}function findInnerHightForCenterPanal(){return parseInt(getWidnowHeight())-62
}function findInnerWidthForCenterPanel(){var a=getWindowWidth();
var d=Ext.getCmp("east-panel");
var b=Ext.getCmp("west-panel");
var c;
if((!b.collapsed)&&(!d.collapsed)){c=a-$("#east-panel").width()-$("#west-panel").width()-10
}else{if((b.collapsed)&&(!d.collapsed)){c=a-$("#east-panel").width()-30
}else{if((d.collapsed)&&(!b.collapsed)){c=a-$("#west-panel").width()-30
}else{c=a-10
}}}return parseInt(c)
}function gridResize(){var width=0;
$.each($(".gridObjectName"),function(index,object){var objectName=$(object).val();
if($("#"+objectName).length>0){var panelPosition=$(object).attr("id");
var object=eval(objectName);
if(object.getStore().isGridResize){if(panelPosition=="east"){object.setWidth($("#east-panel").width())
}else{var columnCount=object.getColumnModel().getColumnCount(true);
var columnRatioArray=new Array();
var gridWidth=object.getWidth();
if(gridWidth!=0){for(var i=0;
i<columnCount;
i++){var columnRatio=parseFloat(parseInt(object.getColumnModel().getColumnWidth(i))/parseInt(object.getWidth()))*100;
columnRatioArray[i]=columnRatio
}}object.setWidth($("#center-panel").width());
Ext.getCmp("maincontainer").setWidth($("#center-panel").width());
if(gridWidth!=0){for(var i=0;
i<columnCount;
i++){var columnWidth=parseFloat(parseFloat(columnRatioArray[i])*parseInt($("#center-panel").width()))/100;
if(!object.getColumnModel().isFixed(i)){if(columnWidth!=0){object.getColumnModel().setColumnWidth(i,columnWidth,true)
}}}}}}}})
}function gridResizeOnCollapse(position){var eastpanel=Ext.getCmp("east-panel");
var westpanel=Ext.getCmp("west-panel");
$.each($(".gridObjectName"),function(index,object){var objectName=$(object).val();
if($("#"+objectName).length>0){var object=eval(objectName);
if(position=="east"){if(westpanel.collapsed){var _common_width_center=document.getElementById("center_container").nextSibling;
_common_width_center.style.width=window.innerWidth-30+"px";
setGridDetailMenuSize();
object.setWidth(window.innerWidth-46)
}else{object.setWidth(window.innerWidth-$("#west-panel").width()-33)
}}else{if(eastpanel.collapsed){var _common_width_center=document.getElementById("center_container").nextSibling;
_common_width_center.style.width=window.innerWidth-30+"px";
setGridDetailMenuSize();
object.setWidth(window.innerWidth-47)
}else{object.setWidth(window.innerWidth-$("#east-panel").width()-30)
}}}})
}function addNewWidget(){var d=new Ext.form.TextField({mode:"local",id:"title",fieldLabel:"Title",width:200,height:20});
var c=new Ext.form.TextField({mode:"local",id:"renderURL",fieldLabel:"Render URL",width:200,height:20});
var b=new Ext.form.FormPanel({baseCls:"x-plain",buttonAlign:"center",monitorValid:true,labelWidth:200,defaultType:"textfield",items:[d,c],buttons:[{text:"Ok",formBind:true,handler:function(){onClick:createNewWidget()
}},{text:"Cancel",formBind:true,handler:function(){Ext.getCmp("portalWidetWindow").close()
}}]});
var a=new Ext.Window({title:"Add New Protal Wiget",width:450,id:"portalWidetWindow",height:150,minWidth:250,minHeight:100,layout:"fit",plain:true,bodyStyle:"padding:5px;",buttonAlign:"center",items:b,modal:true});
a.show(this)
}function createNewWidget(){var b=document.getElementById("title").value;
var a=document.getElementById("renderURL").value;
$("#message_label").show();
__showProgress();
Ext.Ajax.request({url:"applicationadmin/portalWidget.action",params:{method:"saveWidget",title:b,renderURL:a},success:function(c,d){__hideProgress();
var e=c.responseText;
var f=Ext.util.JSON.decode(e);
if(f.error==""){$("#message_label").html(f.message+"   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
setTimeout(function(){$("#message_label").hide()
},2500)
}else{$("#message_label").html(f.message+f.ticketid+"   <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'>Hide</a>");
setTimeout(function(){$("#message_label").hide()
},2500)
}},failure:function(c,d){__hideProgress()
}});
Ext.getCmp("portalWidetWindow").close()
}Ext.override(Ext.form.ComboBox,{onSelect:Ext.form.ComboBox.prototype.onSelect.createSequence(function(){if(this.editable&&this.clearFilterOnReset&&this.store.isFiltered()){this.store.clearFilter()
}})});
Ext.override(Ext.form.ComboBox,{postBlur:Ext.form.ComboBox.prototype.postBlur.createSequence(function(){if(this.editable&&this.clearFilterOnReset&&this.store.isFiltered()){this.store.clearFilter()
}})});
Ext.override(Ext.form.Field,{isLayoutFit:false});
Ext.override(Ext.grid.EditorGridPanel,{startEditing:function(h,c){this.stopEditing();
if(this.colModel.isCellEditable(c,h)){this.view.ensureVisible(h,c,true);
var d=this.store.getAt(h),g=this.colModel.getDataIndex(c),f={grid:this,record:d,field:g,value:d.data[g],row:h,column:c,cancel:false};
if(this.fireEvent("beforeedit",f)!==false&&!f.cancel){this.editing=true;
var b=this.colModel.getCellEditor(c,h);
if(!b){return
}if(!b.rendered){b.parentEl=this.view.getEditorParent(b);
b.on({scope:this,render:{fn:function(e){e.field.focus(false,true)
},single:true,scope:this},specialkey:function(k,j){this.getSelectionModel().onEditorKey(k,j)
},complete:this.onEditComplete,canceledit:this.stopEditing.createDelegate(this,[true])})
}Ext.apply(b,{row:h,col:c,record:d});
this.lastEdit={row:h,col:c};
this.activeEditor=b;
b.selectSameEditor=(this.activeEditor==this.lastActiveEditor);
var a=this.preEditValue(d,g);
b.startEdit(this.view.getCell(h,c).firstChild,Ext.isDefined(a)?a:"");
if(b.field.isLayoutFit){b.setSize($(this.view.getCell(h,c)).width(),$(this.view.getCell(h,c)).height())
}(function(){delete b.selectSameEditor
}).defer(50)
}}}});
Ext.override(Ext.grid.CheckboxSelectionModel,{onMouseDown:function(f,c){if(f.button===0){var d=this.singleSelect;
var a=false;
if(this.grid.getStore().isEditableNeeded&&c.className!="x-grid3-row-checker"&&!d){this.singleSelect=true;
a=true
}f.stopEvent();
var g=f.getTarget(".x-grid3-row");
if(g){var b=g.rowIndex;
if(this.isSelected(b)){if(!this.grid.enableDragDrop||!this.deselectingFlag){if(!a){this.deselectRow(b)
}else{this.deselectingFlag=true
}}}else{if(this.grid.enableDragDrop){this.deselectingFlag=false
}this.selectRow(b,true)
}}this.singleSelect=d
}this.mouseHandled=false
}});
var centerPanelMinimumWidth=825;
var gridPanelMinimumWidth=800;
var collapsedEastPanelWidth=25;
var collapsedWestPanelWidth=5;
var splitRegionWidth=5;
var rightMargin=5;
var scrollBarSize=18;
var headContainerHeight=20;
var titleContainerHeight=40;
var menuTabHeight=$("#container-2").height();
var adjustDivMinWidth=400;
function getCenterPanelHeight(){return parseInt(getWindowHeight()-(headContainerHeight+titleContainerHeight))
}function getWindowWidth(){var a=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
if(a){return a
}return 0
}function getWindowHeight(){var a=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
if(a){return a
}return 0
}function setContentContainerSize(b,a){setContentContainerWidth(b);
setContentContainerHeight(a)
}function setContentContainerWidth(a){if(centerContentPanel!=null){if(centerPanelResizable==false&&a>centerPanelWidth){a=centerPanelWidth
}centerContentPanel.setWidth(a)
}}function getContentContainerWidth(a){if(centerPanelResizable==true){if(centerPanelMaxWidth!=null&&a>centerPanelMaxWidth){a=centerPanelMaxWidth
}}else{a=centerPanelWidth
}return a
}function setContentContainerHeight(a){if(centerContentPanel!=null){centerContentPanel.setHeight(a)
}}function setCenterPanelSize(b,a){setCenterPanelWidth(b);
setCenterPanelHeight(a)
}function setCenterPanelWidth(a){if(centerPanelResizable==true){Ext.getCmp("maincontainer").setWidth(a);
Ext.getCmp("maindetail").setWidth(a);
Ext.getCmp("mainmessage").setWidth(a)
}if(a<gridPanelMinimumWidth){a=gridPanelMinimumWidth
}}function getCenterPanelWidth(){var a=0;
if(isWestPanelCollapsed()){a=getWindowWidth()-(collapsedWestPanelWidth+rightMargin)
}else{a=getWindowWidth()-(getWestPanelWidth()+splitRegionWidth+rightMargin)
}return parseInt(a)
}function setCenterPanelHeight(a){Ext.getCmp("maincontainer").setHeight(a);
Ext.getCmp("maindetail").setHeight(a);
Ext.getCmp("mainmessage").setHeight(a);
setContentContainerHeight(a-menuBarHeight)
}function getCenterPanelHeight(){return parseInt(getWindowHeight()-(headContainerHeight+titleContainerHeight))
}function settitleContainerWidth(a){Ext.getCmp("center-panel").setWidth(a);
$("center-panel").width(a)
}function windowOnChange(){var a=getCenterPanelHeight();
var b=getCenterPanelWidth();
setWestPanelHeight(a);
setContentContainerSize(b,getCenterPanelHeight()-menuBarHeight);
b=getContentContainerWidth(b);
setCenterPanelSize(b,a)
}function isWestPanelCollapsed(){return Ext.getCmp("west-panel").collapsed
}function setWestPanelHeight(a){Ext.getCmp("west-panel").setHeight(a)
}function getWestPanelHeight(){return Ext.getCmp("west-panel").getHeight()
}function getWestPanelWidth(){return Ext.getCmp("west-panel").getWidth()
}function renderRemoveIcon(c,j,d,g,e,h){var a=d.get("Step Id");
var b=h.gridObjectName;
var f="\"deleteWorkflowStep('"+a+"','"+h.gridObjectName+"')\"";
return'<center><img src="'+contextPath+'/13899/images/clear16.gif" onclick='+f+' width="16px" height="16px" style="cursor:pointer" title="Remove"/></center>'
}function deleteExistRow(e,a,b,f,d,c){return'<img src="'+contextPath+'/13899/images/clear16.gif" width="16px" height="16px" onclick="javascript:removeRowIn'+c.gridObjectName+"('"+b.id+'\');" title="Remove"  style="cursor:pointer"/>'
}function InsertNewRow(e,a,b,f,d,c){return'<img src="'+contextPath+'/13899/newui/images/default/dd/drop-add.gif" width="16px" height="16px" onclick="javascript:addRowIn'+c.gridObjectName+'();" title="Add"  style="cursor:pointer"/>'
}function linkWorkflow(b){var a="javascript:execute('show_edit_workflow','appgen','isFromUpdate=true&isFromRadaptive=true&workflowId="+b+"')";
return'<a href="javascript:void(0);" onclick='+a+">"+b+"</a>"
}function linkForReportType(c){var a=document.getElementById("gridId").value;
var b="javascript:execute('show_edit_reportType_form','admin','isFromUpdate=true&gridName="+a+"&isFromRadaptive=true&typeId="+c+"')";
return'<a href="javascript:void(0);" onclick='+b+">"+c+"</a>"
}function showManageReportType(a){execute("show_request_ticket","form","gridName="+a+"&title=Manage Report Type&isForm=false&isCheckItemNeeded=false&isExportNeeded=false&isToolBarNeeded=false&gridHeight="+setGridHeightWithOutExtToolbar()+"&gridWidth="+setGridWidthForCenterPanel())
}function textAreaColumnWrap(a){if(a==null||a=="null"){a=" "
}return'<div class="x-grid3-cell-inner-textarea">'+a+"</div>"
}function setGridVisbilty(d){var e=d.getStore().label+"DivHeader";
var b=d.getStore().gridDiv+"Label";
if(d.getStore().getTotalCount()>0){$("#"+d.getStore().gridDiv).show();
if($("#"+e).length>0){$("#"+e).show()
}if($("#"+b).length>0){$("#"+b).hide()
}}else{$("#"+d.getStore().gridDiv).hide();
var c=d.getStore().label+"Grid";
var a="true";
$.each($("."+c),function(g,f){if($(f).is(":visible")){a="false"
}});
if(a=="true"&&$("#"+e).length>0){$("#"+e).hide()
}if($("#"+b).length>0){$("#"+b).show()
}}}function setGridMargin(b){var d=b.getStore().gridDiv;
if(b.getStore().getTotalCount()==0){var c=b.getStore().label+"DivHeader";
if($("#"+c).length>0){$("#"+c).css("margin-bottom","20px")
}}else{var a="0px";
if(b.getStore().getTotalCount()>parseInt(b.getStore().pageSize)){a="30px"
}if($("#"+d).length>0){$("#"+d).css("margin-bottom",a)
}}}function showCreateAccount(){document.getElementById("createAccount").style.display="block"
}function setGridBottomBarVisiblity(a){var b=a.getStore().gridDiv;
if(a.getStore().getTotalCount()>parseInt(a.getStore().pageSize)){a.bbar.show()
}else{a.bbar.hide()
}}function addEmailId(){var c=grid.getSelectionModel().getSelections();
var b=new Ext.form.FormPanel({baseCls:"x-plain",buttonAlign:"center",monitorValid:true,labelWidth:200,defaultType:"textfield",items:[{fieldLabel:"Enter Email Id",name:"mailId",id:"mailId",value:"",allowBlank:false,minLength:1,maxLength:500,anchor:"90%"}],buttons:[{text:"Submit",formBind:true,handler:function(){onClick:addEmailIdAndCloseWindow()
}}]});
var a=new Ext.Window({title:"New Email Id",width:550,id:"emailIdWindow",height:100,minWidth:250,minHeight:100,layout:"fit",plain:true,bodyStyle:"padding:5px;",buttonAlign:"center",items:b});
a.show(this)
}function addEmailIdAndCloseWindow(){var a=document.getElementById("mailId").value;
var b=document.getElementById("accountId").value;
if(isValidEmailId(a)){$.ajax({url:"/accountadmin/account.action?method=addEmailInAccount&accountId="+b+"&emailId="+a,async:false,success:function(c){if(c!="SUCCESS"){$("#error_div").show();
$("#error_div").html(c)
}refreshGrid("grid")
}});
Ext.getCmp("emailIdWindow").close()
}else{alert("Enter a valid Email Id")
}}function isValidEmailId(a){return(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(a))
}function renderComboValue(a){return function(d){var b=a.findRecord(a.valueField,d);
if(!b&&selectedValueStore){var c=selectedValueStore.findExact("id",d);
b=selectedValueStore.getAt(c)
}return b?b.get(a.displayField):d
}
}function updateTicket(gridObj,params){if(gridObj!=null){var gridObj=eval(gridObj);
Ext.Ajax.request({waitMsg:"Saving changes...",url:"grid/radaptiveGrid.action?method=editExtSecuredGrid&"+params,failure:function(response,options){var response=JSON.parse(response.responseText);
$("#message_label").html('<p style="color: red; font-size: 10pt;">'+response.MESSAGE+' <a style="color: blue;" onclick="hideMessage()" href="javascript:void(0)">Hide</a></p>');
$("#message_label").show();
gridObj.getStore().rejectChanges()
},success:function(response,options){var responseJSON=JSON.parse(response.responseText);
if(responseJSON&&responseJSON.STATUS=="SUCCESS"){$("#message_label").html('<p style="color: red; font-size: 10pt;">Successfully Updated.<a style="color: blue;" onclick="hideMessage()" href="javascript:void(0)">Hide</a></p>');
$("#message_label").show();
gridObj.getStore().reload()
}else{if(responseJSON&&responseJSON.STATUS=="ERROR"){$("#message_label").html('<p style="color: red; font-size: 10pt;">'+responseJSON.MESSAGE+' <a style="color: blue;" onclick="hideMessage()" href="javascript:void(0)">Hide</a></p>');
$("#message_label").show();
gridObj.getStore().rejectChanges()
}}}})
}}function showSideMenuConsole(){execute("show_request_ticket","form","gridName=GET_ALL_SIDE_MENU_GRID&formName=0&isForm=false&isExportNeeded=false&isToolBarNeeded=false&title=Manage%20Side%20Menu&gridHeight="+setGridHeightWithOutExtToolbar()+"&gridWidth="+setGridWidthForCenterPanel())
}function editToolbarButtonAction(){var b=$("#selectedForm").val();
$("#formId").val(b);
var a=gridbbarObj.pageSize;
var d="";
d="toolbarButtonActionForm.formID,"+b;
if(b!="ALL"){var c="grid/radaptiveGrid.action?method=showExtSecuredGrid&gridName="+$("#gridId").val()+"&isForm=false&filterValues="+d
}else{var c="grid/radaptiveGrid.action?method=showExtSecuredGrid&gridName="+$("#gridId").val()+"&isForm=false"
}grid.getStore().proxy.setApi("read",c);
grid.getStore().load({params:{start:0,limit:a}})
}function deleteEmailIdFromAccount(c,l,d,j,e,k,g){var b=d.get("MailId");
var f=document.getElementById("accountId").value;
var a=d.get("Source");
if(a=="radaptive"){var h="\"deleteUserEmail('"+f+"','"+b+"','"+k.gridObjectName+"')\"";
return'<img src="'+contextPath+'/13899/images/clear16.gif" width="16px" height="16px" onclick='+h+' title="Remove"  style="cursor:pointer"/>'
}else{return"No Action"
}}function alertMessage(){alert("You cannot delete the AD EmailId")
}function deleteUserEmail(c,a,b){if(c==""){c=document.getElementById("accountId").value
}$.ajax({url:"/accountadmin/account.action?method=deleteEmailInAccount&accountId="+c+"&emailId="+a,async:false,success:function(d){if(d!="SUCCESS"){$("#error_div").show();
$("#error_div").html(d)
}refreshGrid(b)
}})
}function setCenterContainerSizeForSummary(){var a=parseInt(findInnerHightForCenterPanal())-6;
document.getElementById("container").style.height=a+"px";
Ext.getCmp("maincontainer").setWidth(1375)
};