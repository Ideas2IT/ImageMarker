/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ns("Ext.ux.tree");
Ext.ux.tree.ColumnTree=Ext.extend(Ext.tree.TreePanel,{lines:false,borderWidth:Ext.isBorderBox?0:2,cls:"x-column-tree",onRender:function(){Ext.tree.ColumnTree.superclass.onRender.apply(this,arguments);
this.headers=this.header.createChild({cls:"x-tree-headers"});
var f=this.columns,g;
var b=0;
var d=19;
for(var e=0,a=f.length;
e<a;
e++){g=f[e];
b+=g.width;
this.headers.createChild({cls:"x-tree-hd "+(g.cls?g.cls+"-hd":""),cn:{cls:"x-tree-hd-text",html:g.header},style:"width:"+(g.width-this.borderWidth)+"px;"})
}this.headers.createChild({cls:"x-clear"});
this.headers.setWidth(b+d);
this.innerCt.setWidth(b)
}});
Ext.reg("columntree",Ext.ux.tree.ColumnTree);
Ext.tree.ColumnTree=Ext.ux.tree.ColumnTree;
Ext.ux.tree.ColumnNodeUI=Ext.extend(Ext.tree.TreeNodeUI,{focus:Ext.emptyFn,renderElements:function(d,m,h,o){this.indentMarkup=d.parentNode?d.parentNode.ui.getChildIndent():"";
var p=d.getOwnerTree();
var l=p.columns;
var k=p.borderWidth;
var j=l[0];
var b=['<li class="x-tree-node"><div ext:tree-node-id="',d.id,'" class="x-tree-node-el x-tree-node-leaf ',m.cls,'">','<div class="x-tree-col" style="width:',j.width-k,'px;">','<span class="x-tree-node-indent">',this.indentMarkup,"</span>",'<img src="',this.emptyIcon,'" class="x-tree-ec-icon x-tree-elbow">','<img src="',m.icon||this.emptyIcon,'" class="x-tree-node-icon',(m.icon?" x-tree-node-inline-icon":""),(m.iconCls?" "+m.iconCls:""),'" unselectable="on">','<a hidefocus="on" class="x-tree-node-anchor" href="',m.href?m.href:"#",'" tabIndex="1" ',m.hrefTarget?' target="'+m.hrefTarget+'"':"",">",'<span unselectable="on">',d.text||(j.renderer?j.renderer(m[j.dataIndex],d,m):m[j.dataIndex]),"</span></a>","</div>"];
for(var e=1,g=l.length;
e<g;
e++){j=l[e];
b.push('<div class="x-tree-col ',(j.cls?j.cls:""),'" style="width:',j.width-k,'px;">','<div class="x-tree-col-text">',(j.renderer?j.renderer(m[j.dataIndex],d,m):m[j.dataIndex]),"</div>","</div>")
}b.push('<div class="x-clear"></div></div>','<ul class="x-tree-node-ct" style="display:none;"></ul>',"</li>");
if(o!==true&&d.nextSibling&&d.nextSibling.ui.getEl()){this.wrap=Ext.DomHelper.insertHtml("beforeBegin",d.nextSibling.ui.getEl(),b.join(""))
}else{this.wrap=Ext.DomHelper.insertHtml("beforeEnd",h,b.join(""))
}this.elNode=this.wrap.childNodes[0];
this.ctNode=this.wrap.childNodes[1];
var f=this.elNode.firstChild.childNodes;
this.indentNode=f[0];
this.ecNode=f[1];
this.iconNode=f[2];
this.anchor=f[3];
this.textNode=f[3].firstChild
}});
Ext.tree.ColumnNodeUI=Ext.ux.tree.ColumnNodeUI;