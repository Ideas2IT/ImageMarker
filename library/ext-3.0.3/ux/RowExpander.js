/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.grid");
var gridobj=null;
Ext.ux.grid.RowExpander=Ext.extend(Ext.util.Observable,{expandOnEnter:true,expandOnDblClick:false,header:"",width:20,sortable:false,fixed:true,menuDisabled:true,dataIndex:"",id:"expander",lazyRender:true,enableCaching:true,constructor:function(a){Ext.apply(this,a);
this.addEvents({beforeexpand:true,expand:true,beforecollapse:true,collapse:true});
Ext.ux.grid.RowExpander.superclass.constructor.call(this);
if(this.tpl){if(typeof this.tpl=="string"){this.tpl=new Ext.Template(this.tpl)
}this.tpl.compile()
}this.state={};
this.bodyContent={}
},getRowClass:function(a,e,d,c){d.cols=d.cols-1;
var b=this.bodyContent[a.id];
if(!b&&!this.lazyRender){b=this.getBodyContent(a,e)
}if(b){d.body=b
}return this.state[a.id]?"x-grid3-row-expanded":"x-grid3-row-collapsed"
},init:function(b){this.grid=b;
var a=b.getView();
a.getRowClass=this.getRowClass.createDelegate(this);
a.enableRowBody=true;
b.on("render",this.onRender,this);
b.on("destroy",this.onDestroy,this)
},onRender:function(){var a=this.grid;
var b=a.getView().mainBody;
b.on("mousedown",this.onMouseDown,this,{delegate:".x-grid3-row-expander"});
if(this.expandOnEnter){this.keyNav=new Ext.KeyNav(this.grid.getGridEl(),{scope:this})
}if(this.expandOnDblClick){a.on("rowclick",this.onRowDblClick,this)
}},onDestroy:function(){if(this.keyNav){this.keyNav.disable();
delete this.keyNav
}var a=this.grid.getView().mainBody;
if(a){a.un("mousedown",this.onMouseDown,this)
}},onRowDblClick:function(a,b,c){this.toggleRow(b)
},onEnter:function(a){},getBodyContent:function(a,b){if(!this.enableCaching){return this.tpl.apply(a.data)
}var c=this.bodyContent[a.id];
if(!c){c=this.tpl.apply(a.data);
this.bodyContent[a.id]=c
}return c
},setRemoteDataMethod:function(a){this.remoteDataMethod=a
},getRemoteDataMethod:function(a,b){if(!this.remoteDataMethod){return
}return this.remoteDataMethod.call(this,a,b)
},onMouseDown:function(b,a){b.stopEvent();
var c=b.getTarget(".x-grid3-row");
this.toggleRow(c)
},renderer:function(b,c,a){c.cellAttr='rowspan="2"';
return'<div class="x-grid3-row-expander">&#160;</div>'
},beforeExpand:function(b,a,c){if(this.fireEvent("beforeexpand",this,b,a,c)!==false){if(this.remoteDataMethod){this.tpl=new Ext.Template("<div id='remData"+c+"' class='rem-data-expand'></div><div id='expandergrid'></div><input type='hidden' id='gridObjectName' class='gridObjectName' value='PMConsoleChild"+c+"'></input>")
}if(this.tpl&&this.lazyRender){a.innerHTML=this.getBodyContent(b,c)
}return true
}else{return false
}},toggleRow:function(a){if(typeof a=="number"){a=this.grid.view.getRow(a)
}this[Ext.fly(a).hasClass("x-grid3-row-collapsed")?"expandRow":"collapseRow"](a)
},expandRow:function(c){if(gridobj==null){gridobj=this.grid
}else{this.grid=gridobj
}if(typeof c=="number"){c=this.grid.view.getRow(c)
}var b=this.grid.store.getAt(c.rowIndex);
var a=Ext.DomQuery.selectNode("tr:nth(2) div.x-grid3-row-body",c);
if(this.beforeExpand(b,a,c.rowIndex)){this.state[b.id]=true;
Ext.fly(c).replaceClass("x-grid3-row-collapsed","x-grid3-row-expanded");
if(this.fireEvent("expand",this,b,a,c.rowIndex)!==false){this.getRemoteDataMethod(b,c.rowIndex)
}}this.grid=gridobj
},collapseRow:function(c){if(gridobj==null){gridobj=this.grid
}else{this.grid=gridobj
}if(typeof c=="number"){c=this.grid.view.getRow(c)
}var b=this.grid.store.getAt(c.rowIndex);
var a=Ext.fly(c).child("tr:nth(1) div.x-grid3-row-body",true);
if(this.fireEvent("beforecollapse",this,b,a,c.rowIndex)!==false){if(b!=null){this.state[b.id]=false;
Ext.fly(c).replaceClass("x-grid3-row-expanded","x-grid3-row-collapsed");
this.fireEvent("collapse",this,b,a,c.rowIndex)
}}this.grid=gridobj
}});
Ext.preg("rowexpander",Ext.ux.grid.RowExpander);
Ext.grid.RowExpander=Ext.ux.grid.RowExpander;
var expander=new Ext.ux.grid.RowExpander({remoteDataMethod:getRowExpandHTML});
function getRowExpandHTML(record,index){var id;
var expanderGridName=document.getElementById("expanderGridName").value;
var gridObject=null;
if($(".gridObjectName").length>0){$.each($(".gridObjectName"),function(index1,object){if(object){try{object=eval($(object).val());
if(object&&object.getStore()){var record1=object.getStore().getAt(index);
if(record==record1){gridObject=object
}}}catch(r){}}})
}if(gridObject){var url=gridObject.getStore().proxy.url;
if(record.get("Id")){id=record.get("Id")
}else{if(record.get("ID")){id=record.get("ID")
}else{id=record.get("id")
}}if(document.getElementById("gridId").value=="RUNTIME_LOGGER_GRID"){$("#remData"+index).load("grid/radaptiveGrid.action?method=getRuntimeLoggerHTML&id="+id+"&rowIndex="+index)
}else{var inner_width=parseInt(getCenterPanelWidth());
if(inner_width<gridPanelMinimumWidth){inner_width=gridPanelMinimumWidth
}document.getElementById("expanderType").value="gridType";
if((url.toLowerCase()).indexOf("&isform=false")>0){$("#remData"+index).load("grid/radaptiveGrid.action?method=getGridHTML&parentId="+escape(id)+"&rowIndex="+index+"&gridName="+expanderGridName+"&isForm=false&isGridColorNeeded=true&gridObject=PMConsoleChild"+index+"&gridWidth="+inner_width)
}else{$("#remData"+index).load("grid/radaptiveGrid.action?method=getGridHTML&parentId="+id+"&rowIndex="+index+"&gridName="+expanderGridName+"&formName=ticket&isGridColorNeeded=true&gridObject=PMConsoleChild"+index+"&gridWidth="+inner_width)
}}}}function onMessageClick(b,c){var a=document.getElementById("ticketmessage").value;
if(a==null||a==""){$("#message_label").html("Please Enter Message <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'> Hide</a>");
return
}else{$.ajaxSettings.cache=false;
Ext.Ajax.request({url:"grid/radaptiveGrid.action",params:{method:"addMessage",ticketId:b,message:a},failure:function(d,e){$("#message_label").html(d.responseText);
grid.getStore().reload()
},success:function(d,e){$("#remData"+c).load("grid/radaptiveGrid.action?method=getGridRowExpandHTML&ticketId="+b+"&rowIndex="+c);
$("#message_label").html("Message Saved Successfully <a href ='javascript:void(0)' onclick='hideMessage()' style='color:blue;font:bold;'> Hide</a>")
}})
}}function handleEnter(b,c,d,f){var a;
if(c&&c.which){a=c.which
}else{if(window.event){c=window.event;
a=c.keyCode
}}if(a==13){onMessageClick(d,f)
}}function clearGrid(){gridobj=null
};