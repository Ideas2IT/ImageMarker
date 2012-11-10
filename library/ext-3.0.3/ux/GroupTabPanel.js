/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux");
Ext.ux.GroupTabPanel=Ext.extend(Ext.TabPanel,{tabPosition:"left",alternateColor:false,alternateCls:"x-grouptabs-panel-alt",defaultType:"grouptab",deferredRender:false,activeGroup:null,initComponent:function(){Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
this.addEvents("beforegroupchange","groupchange");
this.elements="body,header";
this.stripTarget="header";
this.tabPosition=this.tabPosition=="right"?"right":"left";
this.addClass("x-grouptabs-panel");
if(this.tabStyle&&this.tabStyle!=""){this.addClass("x-grouptabs-panel-"+this.tabStyle)
}if(this.alternateColor){this.addClass(this.alternateCls)
}this.on("beforeadd",function(b,c,a){this.initGroup(c,a)
})
},initEvents:function(){this.mon(this.strip,"mousedown",this.onStripMouseDown,this)
},onRender:function(c,a){Ext.TabPanel.superclass.onRender.call(this,c,a);
if(this.plain){var f=this.tabPosition=="top"?"header":"footer";
this[f].addClass("x-tab-panel-"+f+"-plain")
}var b=this[this.stripTarget];
this.stripWrap=b.createChild({cls:"x-tab-strip-wrap ",cn:{tag:"ul",cls:"x-grouptabs-strip x-grouptabs-tab-strip-"+this.tabPosition}});
var e=(this.tabPosition=="bottom"?this.stripWrap:null);
this.strip=new Ext.Element(this.stripWrap.dom.firstChild);
this.header.addClass("x-grouptabs-panel-header");
this.bwrap.addClass("x-grouptabs-bwrap");
this.body.addClass("x-tab-panel-body-"+this.tabPosition+" x-grouptabs-panel-body");
if(!this.groupTpl){var d=new Ext.Template('<li class="{cls}" id="{id}">','<a class="x-grouptabs-expand" onclick="return false;"></a>','<a class="x-grouptabs-text {iconCls}" href="#" onclick="return false;">',"<span>{text}</span></a>","</li>");
d.disableFormats=true;
d.compile();
Ext.ux.GroupTabPanel.prototype.groupTpl=d
}this.items.each(this.initGroup,this)
},afterRender:function(){Ext.ux.GroupTabPanel.superclass.afterRender.call(this);
this.tabJoint=Ext.fly(this.body.dom.parentNode).createChild({cls:"x-tab-joint"});
this.addClass("x-tab-panel-"+this.tabPosition);
this.header.setWidth(this.tabWidth);
if(this.activeGroup!==undefined){var a=(typeof this.activeGroup=="object")?this.activeGroup:this.items.get(this.activeGroup);
delete this.activeGroup;
this.setActiveGroup(a);
a.setActiveTab(a.getMainItem())
}},getGroupEl:Ext.TabPanel.prototype.getTabEl,findTargets:function(c){var b=null,a=c.getTarget("li",this.strip);
if(a){b=this.findById(a.id.split(this.idDelimiter)[1]);
if(b.disabled){return{expand:null,item:null,el:null}
}}return{expand:c.getTarget(".x-grouptabs-expand",this.strip),isGroup:!c.getTarget("ul.x-grouptabs-sub",this.strip),item:b,el:a}
},onStripMouseDown:function(b){if(b.button!=0){return
}b.preventDefault();
var a=this.findTargets(b);
if(a.expand){this.toggleGroup(a.el)
}else{if(a.item){if(a.isGroup){a.item.setActiveTab(a.item.getMainItem())
}else{a.item.ownerCt.setActiveTab(a.item)
}}}},expandGroup:function(a){if(a.isXType){a=this.getGroupEl(a)
}Ext.fly(a).addClass("x-grouptabs-expanded");
this.syncTabJoint()
},toggleGroup:function(a){if(a.isXType){a=this.getGroupEl(a)
}Ext.fly(a).toggleClass("x-grouptabs-expanded");
this.syncTabJoint()
},collapseGroup:function(a){if(a.isXType){a=this.getGroupEl(a)
}Ext.fly(a).removeClass("x-grouptabs-expanded");
this.syncTabJoint()
},syncTabJoint:function(b){if(!this.tabJoint){return
}b=b||this.getGroupEl(this.activeGroup);
if(b){this.tabJoint.setHeight(Ext.fly(b).getHeight()-2);
var a=Ext.isGecko2?0:1;
if(this.tabPosition=="left"){this.tabJoint.alignTo(b,"tl-tr",[-2,a])
}else{this.tabJoint.alignTo(b,"tr-tl",[1,a])
}}else{this.tabJoint.hide()
}},getActiveTab:function(){if(!this.activeGroup){return null
}return this.activeGroup.getTabEl(this.activeGroup.activeTab)||null
},onResize:function(){Ext.ux.GroupTabPanel.superclass.onResize.apply(this,arguments);
this.syncTabJoint()
},createCorner:function(a,b){return Ext.fly(a).createChild({cls:"x-grouptabs-corner x-grouptabs-corner-"+b})
},initGroup:function(f,b){var d=this.strip.dom.childNodes[b],e=this.getTemplateArgs(f);
if(b===0){e.cls+=" x-tab-first"
}e.cls+=" x-grouptabs-main";
e.text=f.getMainItem().title;
var c=d?this.groupTpl.insertBefore(d,e):this.groupTpl.append(this.strip,e),a=this.createCorner(c,"top-"+this.tabPosition),g=this.createCorner(c,"bottom-"+this.tabPosition);
f.tabEl=c;
if(f.expanded){this.expandGroup(c)
}if(Ext.isIE6||(Ext.isIE&&!Ext.isStrict)){g.setLeft("-10px");
g.setBottom("-5px");
a.setLeft("-10px");
a.setTop("-5px")
}this.mon(f,{scope:this,changemainitem:this.onGroupChangeMainItem,beforetabchange:this.onGroupBeforeTabChange})
},setActiveGroup:function(b){b=this.getComponent(b);
if(!b){return false
}if(!this.rendered){this.activeGroup=b;
return true
}if(this.activeGroup!=b&&this.fireEvent("beforegroupchange",this,b,this.activeGroup)!==false){if(this.activeGroup){var a=this.getGroupEl(this.activeGroup);
if(a){Ext.fly(a).removeClass("x-grouptabs-strip-active")
}}var c=this.getGroupEl(b);
Ext.fly(c).addClass("x-grouptabs-strip-active");
this.activeGroup=b;
this.stack.add(b);
this.layout.setActiveItem(b);
this.syncTabJoint(c);
this.fireEvent("groupchange",this,b);
return true
}return false
},onGroupBeforeTabChange:function(a,c,b){if(a!==this.activeGroup||c!==b){this.strip.select(".x-grouptabs-sub > li.x-grouptabs-strip-active",true).removeClass("x-grouptabs-strip-active")
}this.expandGroup(this.getGroupEl(a));
if(a!==this.activeGroup){return this.setActiveGroup(a)
}},getFrameHeight:function(){var a=this.el.getFrameWidth("tb");
a+=(this.tbar?this.tbar.getHeight():0)+(this.bbar?this.bbar.getHeight():0);
return a
},adjustBodyWidth:function(a){return a-this.tabWidth
}});
Ext.reg("grouptabpanel",Ext.ux.GroupTabPanel);