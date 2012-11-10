var Base64=(function(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
function b(e){e=e.replace(/\r\n/g,"\n");
var d="";
for(var g=0;
g<e.length;
g++){var f=e.charCodeAt(g);
if(f<128){d+=String.fromCharCode(f)
}else{if((f>127)&&(f<2048)){d+=String.fromCharCode((f>>6)|192);
d+=String.fromCharCode((f&63)|128)
}else{d+=String.fromCharCode((f>>12)|224);
d+=String.fromCharCode(((f>>6)&63)|128);
d+=String.fromCharCode((f&63)|128)
}}}return d
}return{encode:function(e){var c="";
var m,k,h,l,j,g,f;
var d=0;
e=b(e);
while(d<e.length){m=e.charCodeAt(d++);
k=e.charCodeAt(d++);
h=e.charCodeAt(d++);
l=m>>2;
j=((m&3)<<4)|(k>>4);
g=((k&15)<<2)|(h>>6);
f=h&63;
if(isNaN(k)){g=f=64
}else{if(isNaN(h)){f=64
}}c=c+a.charAt(l)+a.charAt(j)+a.charAt(g)+a.charAt(f)
}return c
}}
})();
Ext.ux.Exporter=function(){return{exportGrid:function(c,b,a){a=a||{};
b=b||new Ext.ux.Exporter.ExcelFormatter();
Ext.applyIf(a,{title:c.title,columns:c.getColumnModel().config});
return Base64.encode(b.format(c.store,a))
},exportStore:function(a,c,b){b=b||{};
c=c||new Ext.ux.Exporter.ExcelFormatter();
Ext.applyIf(b,{columns:b.store.fields.items});
return Base64.encode(c.format(a,b))
},exportTree:function(a,d,c){c=c||{};
d=d||new Ext.ux.Exporter.ExcelFormatter();
var b=a.store||c.store;
Ext.applyIf(c,{title:a.title});
return Base64.encode(d.format(b,c))
}}
}();
Ext.ux.Exporter.Button=Ext.extend(Ext.Button,{constructor:function(b){b=b||{};
Ext.applyIf(b,{exportFunction:"exportGrid",disabled:true,text:"Download",cls:"download"});
if(b.store==undefined&&b.component!=undefined){Ext.applyIf(b,{store:b.component.store})
}else{Ext.applyIf(b,{component:{store:b.store}})
}Ext.ux.Exporter.Button.superclass.constructor.call(this,b);
if(this.store&&Ext.isFunction(this.store.on)){var a=function(){alert(this.store);
this.getEl().child("a",true).href="data:application/vnd.ms-excel;base64,"+Ext.ux.Exporter[b.exportFunction](this.component,null,b);
this.enable()
};
if(this.el){a.call(this)
}else{this.on("render",a,this)
}this.store.on("load",a,this)
}},template:new Ext.Template('<table border="0" cellpadding="0" cellspacing="0" class="x-btn-wrap"><tbody><tr>','<td class="x-btn-left"><i> </i></td><td class="x-btn-center"><a class="x-btn-text" href="{1}" target="{2}">{0}</a></td><td class="x-btn-right"><i> </i></td>',"</tr></tbody></table>"),onRender:function(c,a){var b,e=[this.text||" ",this.href,this.target||"_self"];
if(a){b=this.template.insertBefore(a,e,true)
}else{b=this.template.append(c,e,true)
}var d=b.child("a:first");
d.on("focus",this.onFocus,this);
d.on("blur",this.onBlur,this);
this.initButtonEl(b,d);
Ext.ButtonToggleMgr.register(this)
},onClick:function(a){if(a.button!=0){return
}if(!this.disabled){this.fireEvent("click",this,a);
if(this.handler){this.handler.call(this.scope||this,this,a)
}}}});
Ext.reg("exportbutton",Ext.ux.Exporter.Button);
Ext.ux.Exporter.Formatter=function(a){a=a||{};
Ext.applyIf(a,{})
};
Ext.ux.Exporter.Formatter.prototype={format:Ext.emptyFn};
Ext.ux.Exporter.ExcelFormatter=Ext.extend(Ext.ux.Exporter.Formatter,{format:function(b,c){var a=new Ext.ux.Exporter.ExcelFormatter.Workbook(c);
a.addWorksheet(b,c||{});
return a.render()
}});
Ext.ux.Exporter.ExcelFormatter.Workbook=Ext.extend(Object,{constructor:function(a){a=a||{};
Ext.apply(this,a,{title:"Workbook",worksheets:[],compiledWorksheets:[],cellBorderColor:"#e4e4e4",styles:[],compiledStyles:[],hasDefaultStyle:true,hasStripeStyles:true,windowHeight:9000,windowWidth:50000,protectStructure:false,protectWindows:false});
if(this.hasDefaultStyle){this.addDefaultStyle()
}if(this.hasStripeStyles){this.addStripedStyles()
}this.addTitleStyle();
this.addHeaderStyle()
},render:function(){this.compileStyles();
this.joinedCompiledStyles=this.compiledStyles.join("");
this.compileWorksheets();
this.joinedWorksheets=this.compiledWorksheets.join("");
return this.tpl.apply(this)
},addWorksheet:function(a,b){var c=new Ext.ux.Exporter.ExcelFormatter.Worksheet(a,b);
this.worksheets.push(c);
return c
},addStyle:function(a){var b=new Ext.ux.Exporter.ExcelFormatter.Style(a||{});
this.styles.push(b);
return b
},compileStyles:function(){this.compiledStyles=[];
Ext.each(this.styles,function(a){this.compiledStyles.push(a.render())
},this);
return this.compiledStyles
},compileWorksheets:function(){this.compiledWorksheets=[];
Ext.each(this.worksheets,function(a){this.compiledWorksheets.push(a.render())
},this);
return this.compiledWorksheets
},tpl:new Ext.XTemplate('<?xml version="1.0" encoding="utf-8"?>','<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:o="urn:schemas-microsoft-com:office:office">',"<o:DocumentProperties>","<o:Title>{title}</o:Title>","</o:DocumentProperties>","<ss:ExcelWorkbook>","<ss:WindowHeight>{windowHeight}</ss:WindowHeight>","<ss:WindowWidth>{windowWidth}</ss:WindowWidth>","<ss:ProtectStructure>{protectStructure}</ss:ProtectStructure>","<ss:ProtectWindows>{protectWindows}</ss:ProtectWindows>","</ss:ExcelWorkbook>","<ss:Styles>","{joinedCompiledStyles}","</ss:Styles>","{joinedWorksheets}","</ss:Workbook>"),addDefaultStyle:function(){var a=[{name:"Color",value:this.cellBorderColor},{name:"Weight",value:"1"},{name:"LineStyle",value:"Continuous"}];
this.addStyle({id:"Default",attributes:[{name:"Alignment",properties:[{name:"Vertical",value:"Top"},{name:"WrapText",value:"1"}]},{name:"Font",properties:[{name:"FontName",value:"arial"},{name:"Size",value:"10"}]},{name:"Interior"},{name:"NumberFormat"},{name:"Protection"},{name:"Borders",children:[{name:"Border",properties:[{name:"Position",value:"Top"}].concat(a)},{name:"Border",properties:[{name:"Position",value:"Bottom"}].concat(a)},{name:"Border",properties:[{name:"Position",value:"Left"}].concat(a)},{name:"Border",properties:[{name:"Position",value:"Right"}].concat(a)}]}]})
},addTitleStyle:function(){this.addStyle({id:"title",attributes:[{name:"Borders"},{name:"Font"},{name:"NumberFormat",properties:[{name:"Format",value:"@"}]},{name:"Alignment",properties:[{name:"WrapText",value:"1"},{name:"Horizontal",value:"Center"},{name:"Vertical",value:"Center"}]}]})
},addHeaderStyle:function(){this.addStyle({id:"headercell",attributes:[{name:"Font",properties:[{name:"Bold",value:"1"},{name:"Size",value:"10"}]},{name:"Interior",properties:[{name:"Pattern",value:"Solid"},{name:"Color",value:"#A3C9F1"}]},{name:"Alignment",properties:[{name:"WrapText",value:"1"},{name:"Horizontal",value:"Center"}]}]})
},addStripedStyles:function(){this.addStyle({id:"even",attributes:[{name:"Interior",properties:[{name:"Pattern",value:"Solid"},{name:"Color",value:"#CCFFFF"}]}]});
this.addStyle({id:"odd",attributes:[{name:"Interior",properties:[{name:"Pattern",value:"Solid"},{name:"Color",value:"#CCCCFF"}]}]});
Ext.each(["even","odd"],function(a){this.addChildNumberFormatStyle(a,a+"date","[ENG][$-409]dd-mmm-yyyy;@");
this.addChildNumberFormatStyle(a,a+"int","0");
this.addChildNumberFormatStyle(a,a+"float","0.00")
},this)
},addChildNumberFormatStyle:function(a,c,b){this.addStyle({id:c,parentStyle:"even",attributes:[{name:"NumberFormat",properties:[{name:"Format",value:b}]}]})
}});
Ext.ux.Exporter.ExcelFormatter.Worksheet=Ext.extend(Object,{constructor:function(a,b){b=b||{};
this.store=a;
Ext.applyIf(b,{hasTitle:true,hasHeadings:true,stripeRows:true,title:"Workbook",columns:a.fields==undefined?{}:a.fields.items});
Ext.apply(this,b);
Ext.ux.Exporter.ExcelFormatter.Worksheet.superclass.constructor.apply(this,arguments)
},dateFormatString:"Y-m-d",worksheetTpl:new Ext.XTemplate('<ss:Worksheet ss:Name="{title}">',"<ss:Names>",'<ss:NamedRange ss:Name="Print_Titles" ss:RefersTo="=\'{title}\'!R1:R2" />',"</ss:Names>",'<ss:Table x:FullRows="1" x:FullColumns="1" ss:ExpandedColumnCount="{colCount}" ss:ExpandedRowCount="{rowCount}">',"{columns}",'<ss:Row ss:Height="38">','<ss:Cell ss:StyleID="title" ss:MergeAcross="{colCount - 1}">','<ss:Data xmlns:html="http://www.w3.org/TR/REC-html40" ss:Type="String">','<html:B><html:U><html:Font html:Size="15">{title}','</html:Font></html:U></html:B></ss:Data><ss:NamedCell ss:Name="Print_Titles" />',"</ss:Cell>","</ss:Row>",'<ss:Row ss:AutoFitHeight="1">',"{header}","</ss:Row>","{rows}","</ss:Table>","<x:WorksheetOptions>","<x:PageSetup>",'<x:Layout x:CenterHorizontal="1" x:Orientation="Landscape" />','<x:Footer x:Data="Page &amp;P of &amp;N" x:Margin="0.5" />','<x:PageMargins x:Top="0.5" x:Right="0.5" x:Left="0.5" x:Bottom="0.8" />',"</x:PageSetup>","<x:FitToPage />","<x:Print>","<x:PrintErrors>Blank</x:PrintErrors>","<x:FitWidth>1</x:FitWidth>","<x:FitHeight>32767</x:FitHeight>","<x:ValidPrinterInfo />","<x:VerticalResolution>600</x:VerticalResolution>","</x:Print>","<x:Selected />","<x:DoNotDisplayGridlines />","<x:ProtectObjects>False</x:ProtectObjects>","<x:ProtectScenarios>False</x:ProtectScenarios>","</x:WorksheetOptions>","</ss:Worksheet>"),render:function(a){return this.worksheetTpl.apply({header:this.buildHeader(),columns:this.buildColumns().join(""),rows:this.buildRows().join(""),colCount:this.columns.length,rowCount:this.store.getCount()+2,title:this.title})
},buildColumns:function(){var a=[];
Ext.each(this.columns,function(b){a.push(this.buildColumn())
},this);
return a
},buildColumn:function(a){return String.format('<ss:Column ss:AutoFitWidth="1" ss:Width="{0}" />',a||164)
},buildRows:function(){var a=[];
this.store.each(function(b,c){a.push(this.buildRow(b,c))
},this);
return a
},buildHeader:function(){var a=[];
Ext.each(this.columns,function(b){var c;
if(b.header!=undefined){c=b.header
}else{c=b.name.replace(/_/g," ");
c=c.charAt(0).toUpperCase()+c.substr(1).toLowerCase()
}a.push(String.format('<ss:Cell ss:StyleID="headercell"><ss:Data ss:Type="String">{0}</ss:Data><ss:NamedCell ss:Name="Print_Titles" /></ss:Cell>',c))
},this);
return a.join("")
},buildRow:function(a,c){var d,b=[];
if(this.stripeRows===true){d=c%2==0?"even":"odd"
}Ext.each(this.columns,function(f){var e=f.name||f.dataIndex;
if(Ext.isFunction(f.renderer)){var h=f.renderer(a.get(e),null,a),g="String"
}else{var h=a.get(e),g=this.typeMappings[f.type||a.fields.item(e).type]
}b.push(this.buildCell(h,g,d).render())
},this);
return String.format("<ss:Row>{0}</ss:Row>",b.join(""))
},buildCell:function(c,b,a){if(b=="DateTime"&&Ext.isFunction(c.format)){c=c.format(this.dateFormatString)
}return new Ext.ux.Exporter.ExcelFormatter.Cell({value:c,type:b,style:a})
},typeMappings:{"int":"Number",string:"String","float":"Number",date:"DateTime"}});
Ext.ux.Exporter.ExcelFormatter.Cell=Ext.extend(Object,{constructor:function(a){Ext.applyIf(a,{type:"String"});
Ext.apply(this,a);
Ext.ux.Exporter.ExcelFormatter.Cell.superclass.constructor.apply(this,arguments)
},render:function(){return this.tpl.apply(this)
},tpl:new Ext.XTemplate('<ss:Cell ss:StyleID="{style}">','<ss:Data ss:Type="{type}">{value}</ss:Data>',"</ss:Cell>")});
Ext.ux.Exporter.ExcelFormatter.Style=Ext.extend(Object,{constructor:function(a){a=a||{};
Ext.apply(this,a,{parentStyle:"",attributes:[]});
Ext.ux.Exporter.ExcelFormatter.Style.superclass.constructor.apply(this,arguments);
if(this.id==undefined){throw new Error("An ID must be provided to Style")
}this.preparePropertyStrings()
},preparePropertyStrings:function(){Ext.each(this.attributes,function(a,b){this.attributes[b].propertiesString=this.buildPropertyString(a);
this.attributes[b].children=a.children||[];
Ext.each(a.children,function(d,c){this.attributes[b].children[c].propertiesString=this.buildPropertyString(d)
},this)
},this)
},buildPropertyString:function(b){var a="";
Ext.each(b.properties||[],function(c){a+=String.format('ss:{0}="{1}" ',c.name,c.value)
},this);
return a
},render:function(){return this.tpl.apply(this)
},tpl:new Ext.XTemplate('<tpl if="parentStyle.length == 0">','<ss:Style ss:ID="{id}">',"</tpl>",'<tpl if="parentStyle.length != 0">','<ss:Style ss:ID="{id}" ss:Parent="{parentStyle}">',"</tpl>",'<tpl for="attributes">','<tpl if="children.length == 0">',"<ss:{name} {propertiesString} />","</tpl>",'<tpl if="children.length > 0">',"<ss:{name} {propertiesString}>",'<tpl for="children">',"<ss:{name} {propertiesString} />","</tpl>","</ss:{name}>","</tpl>","</tpl>","</ss:Style>")});