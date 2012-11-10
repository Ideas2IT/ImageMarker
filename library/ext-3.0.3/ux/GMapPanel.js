/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.GMapPanel=Ext.extend(Ext.Panel,{initComponent:function(){var a={plain:true,zoomLevel:3,yaw:180,pitch:0,zoom:0,gmapType:"map",border:false};
Ext.applyIf(this,a);
Ext.ux.GMapPanel.superclass.initComponent.call(this)
},afterRender:function(){var b=this.ownerCt.getSize();
Ext.applyIf(this,b);
Ext.ux.GMapPanel.superclass.afterRender.call(this);
if(this.gmapType==="map"){this.gmap=new GMap2(this.body.dom)
}if(this.gmapType==="panorama"){this.gmap=new GStreetviewPanorama(this.body.dom)
}if(typeof this.addControl=="object"&&this.gmapType==="map"){this.gmap.addControl(this.addControl)
}if(typeof this.setCenter==="object"){if(typeof this.setCenter.geoCodeAddr==="string"){this.geoCodeLookup(this.setCenter.geoCodeAddr)
}else{if(this.gmapType==="map"){var a=new GLatLng(this.setCenter.lat,this.setCenter.lng);
this.gmap.setCenter(a,this.zoomLevel)
}if(typeof this.setCenter.marker==="object"&&typeof a==="object"){this.addMarker(a,this.setCenter.marker,this.setCenter.marker.clear)
}}if(this.gmapType==="panorama"){this.gmap.setLocationAndPOV(new GLatLng(this.setCenter.lat,this.setCenter.lng),{yaw:this.yaw,pitch:this.pitch,zoom:this.zoom})
}}GEvent.bind(this.gmap,"load",this,function(){this.onMapReady()
})
},onMapReady:function(){this.addMarkers(this.markers);
this.addMapControls();
this.addOptions()
},onResize:function(a,b){if(typeof this.getMap()=="object"){this.gmap.checkResize()
}Ext.ux.GMapPanel.superclass.onResize.call(this,a,b)
},setSize:function(c,a,b){if(typeof this.getMap()=="object"){this.gmap.checkResize()
}Ext.ux.GMapPanel.superclass.setSize.call(this,c,a,b)
},getMap:function(){return this.gmap
},getCenter:function(){return this.getMap().getCenter()
},getCenterLatLng:function(){var a=this.getCenter();
return{lat:a.lat(),lng:a.lng()}
},addMarkers:function(c){if(Ext.isArray(c)){for(var b=0;
b<c.length;
b++){var a=new GLatLng(c[b].lat,c[b].lng);
this.addMarker(a,c[b].marker,false,c[b].setCenter,c[b].listeners)
}}},addMarker:function(c,d,b,a,e){Ext.applyIf(d,G_DEFAULT_ICON);
if(b===true){this.getMap().clearOverlays()
}if(a===true){this.getMap().setCenter(c,this.zoomLevel)
}var f=new GMarker(c,d);
if(typeof e==="object"){for(evt in e){GEvent.bind(f,evt,this,e[evt])
}}this.getMap().addOverlay(f)
},addMapControls:function(){if(this.gmapType==="map"){if(Ext.isArray(this.mapControls)){for(i=0;
i<this.mapControls.length;
i++){this.addMapControl(this.mapControls[i])
}}else{if(typeof this.mapControls==="string"){this.addMapControl(this.mapControls)
}else{if(typeof this.mapControls==="object"){this.getMap().addControl(this.mapControls)
}}}}},addMapControl:function(b){var a=window[b];
if(typeof a==="function"){this.getMap().addControl(new a())
}},addOptions:function(){if(Ext.isArray(this.mapConfOpts)){var a;
for(i=0;
i<this.mapConfOpts.length;
i++){this.addOption(this.mapConfOpts[i])
}}else{if(typeof this.mapConfOpts==="string"){this.addOption(this.mapConfOpts)
}}},addOption:function(b){var a=this.getMap()[b];
if(typeof a==="function"){this.getMap()[b]()
}},geoCodeLookup:function(a){this.geocoder=new GClientGeocoder();
this.geocoder.getLocations(a,this.addAddressToMap.createDelegate(this))
},addAddressToMap:function(a){if(!a||a.Status.code!=200){Ext.MessageBox.alert("Error","Code "+a.Status.code+" Error Returned")
}else{place=a.Placemark[0];
addressinfo=place.AddressDetails;
accuracy=addressinfo.Accuracy;
if(accuracy===0){Ext.MessageBox.alert("Unable to Locate Address","Unable to Locate the Address you provided")
}else{if(accuracy<7){Ext.MessageBox.alert("Address Accuracy","The address provided has a low accuracy.<br><br>Level "+accuracy+" Accuracy (8 = Exact Match, 1 = Vague Match)")
}else{point=new GLatLng(place.Point.coordinates[1],place.Point.coordinates[0]);
if(typeof this.setCenter.marker==="object"&&typeof point==="object"){this.addMarker(point,this.setCenter.marker,this.setCenter.marker.clear,true,this.setCenter.listeners)
}}}}}});
Ext.reg("gmappanel",Ext.ux.GMapPanel);