/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.tree.TreeGridNodeUI=Ext.extend(Ext.tree.TreeNodeUI,{isTreeGridNodeUI:true,renderElements:function(d,l,h,m){var o=d.getOwnerTree(),k=o.columns,j=k[0],e,b,g;
this.indentMarkup=d.parentNode?d.parentNode.ui.getChildIndent():"";
b=['<tbody class="x-tree-node">','<tr ext:tree-node-id="',d.id,'" class="x-tree-node-el ',l.cls,'">','<td class="x-treegrid-col">','<span class="x-tree-node-indent">',this.indentMarkup,"</span>",'<img src="',this.emptyIcon,'" class="x-tree-ec-icon x-tree-elbow">','<img src="',l.icon||this.emptyIcon,'" class="x-tree-node-icon',(l.icon?" x-tree-node-inline-icon":""),(l.iconCls?" "+l.iconCls:""),'" unselectable="on">','<a hidefocus="on" class="x-tree-node-anchor" href="',l.href?l.href:"#",'" tabIndex="1" ',l.hrefTarget?' target="'+l.hrefTarget+'"':"",">",'<span unselectable="on">',(j.tpl?j.tpl.apply(l):l[j.dataIndex]||j.text),"</span></a>","</td>"];
for(e=1,g=k.length;
e<g;
e++){j=k[e];
b.push('<td class="x-treegrid-col ',(j.cls?j.cls:""),'">','<div unselectable="on" class="x-treegrid-text"',(j.align?' style="text-align: '+j.align+';"':""),">",(j.tpl?j.tpl.apply(l):l[j.dataIndex]),"</div>","</td>")
}b.push('</tr><tr class="x-tree-node-ct"><td colspan="',k.length,'">','<table class="x-treegrid-node-ct-table" cellpadding="0" cellspacing="0" style="table-layout: fixed; display: none; width: ',o.innerCt.getWidth(),'px;"><colgroup>');
for(e=0,g=k.length;
e<g;
e++){b.push('<col style="width: ',(k[e].hidden?0:k[e].width),'px;" />')
}b.push("</colgroup></table></td></tr></tbody>");
if(m!==true&&d.nextSibling&&d.nextSibling.ui.getEl()){this.wrap=Ext.DomHelper.insertHtml("beforeBegin",d.nextSibling.ui.getEl(),b.join(""))
}else{this.wrap=Ext.DomHelper.insertHtml("beforeEnd",h,b.join(""))
}this.elNode=this.wrap.childNodes[0];
this.ctNode=this.wrap.childNodes[1].firstChild.firstChild;
var f=this.elNode.firstChild.childNodes;
this.indentNode=f[0];
this.ecNode=f[1];
this.iconNode=f[2];
this.anchor=f[3];
this.textNode=f[3].firstChild
},animExpand:function(a){this.ctNode.style.display="";
Ext.ux.tree.TreeGridNodeUI.superclass.animExpand.call(this,a)
}});
Ext.ux.tree.TreeGridRootNodeUI=Ext.extend(Ext.tree.TreeNodeUI,{isTreeGridNodeUI:true,render:function(){if(!this.rendered){this.wrap=this.ctNode=this.node.ownerTree.innerCt.dom;
this.node.expanded=true
}if(Ext.isWebKit){var a=this.ctNode;
a.style.tableLayout=null;
(function(){a.style.tableLayout="fixed"
}).defer(1)
}},destroy:function(){if(this.elNode){Ext.dd.Registry.unregister(this.elNode.id)
}delete this.node
},collapse:Ext.emptyFn,expand:Ext.emptyFn});