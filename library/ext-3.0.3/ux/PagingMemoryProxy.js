/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
if(!Array.prototype.map){Array.prototype.map=function(b){var a=this.length;
if(typeof b!="function"){throw new TypeError()
}var e=new Array(a);
var d=arguments[1];
for(var c=0;
c<a;
c++){if(c in this){e[c]=b.call(d,this[c],c,this)
}}return e
}
}Ext.ns("Ext.ux.data");
Ext.ux.data.PagingMemoryProxy=Ext.extend(Ext.data.MemoryProxy,{constructor:function(a){Ext.ux.data.PagingMemoryProxy.superclass.constructor.call(this);
this.data=a
},doRequest:function(c,d,b,f,i,j,k){b=b||{};
var l;
try{l=f.readRecords(this.data)
}catch(g){this.fireEvent("loadexception",this,k,null,g);
i.call(j,null,k,false);
return
}if(b.filter!==undefined){l.records=l.records.filter(function(m){if(typeof(m)=="object"){var e=b.filterCol||0;
return String(m.data[e]).match(b.filter)?true:false
}else{return String(m).match(b.filter)?true:false
}});
l.totalRecords=l.records.length
}if(b.sort!==undefined){var a=String(b.dir).toUpperCase()=="DESC"?-1:1;
var h=function(m,e){return m>e?1:(m<e?-1:0)
};
l.records.sort(function(m,e){var n=0;
if(typeof(m)=="object"){n=h(m.data[b.sort],e.data[b.sort])*a
}else{n=h(m,e)*a
}if(n==0){n=(m.index<e.index?-1:1)
}return n
})
}if(b.start!==undefined&&b.limit!==undefined){l.records=l.records.slice(b.start,b.start+b.limit)
}i.call(j,l,k,true)
}});
Ext.data.PagingMemoryProxy=Ext.ux.data.PagingMemoryProxy;