/*!
* ImageMarker Library JS
* Copyright(c) 2011-2012 Madan.
* madan.v@ideas2it.com
* http://key2start.wordpress.com
*/


// The basic variables that are necessary for image manipulations
var nextHistory;
var currentHistory;
var initialImage;
var currentPointsArray;
var poppedPointsArray;
var currentImage;
var currentImageId;
var isFundus = false; 
var currentFundusId = "";
var currentColorCode = "rgb(0,0,0)";


// For rendering save button for image using ExtJS
function renderSaveButton(){
	new Ext.Button({
		text: 'Save',
		width:'65px',
		height: '26px',	
		renderTo: 'save_img_btn',
		handler: function(){
			javascript:saveImage();
		}
	});
}

// For rendering update button for image using ExtJS
function renderUpdateButton(){
	if(document.getElementById("update_image").innerHTML==""){
		new Ext.Button({
			text: 'Update',
			width:'65px',
			height: '26px',
			id: 'update_img_button',	
			renderTo: 'update_image',
			handler: function(){
				javascript:updateHistory();
			}
		});
	}
}

// Gets the snapshot of current image as base64 code
// and saves it inside the imagehistory section
function saveImage(){
	var canvas = document.getElementById("imageView");
	var context = canvas.getContext("2d");
	var img = canvas.toDataURL("image/png");
	nextHistory+=1;
	var imgId="imageHistory_"+nextHistory+'';
	document.getElementById("prev_histories").innerHTML+="<div class='border'><div align='center'><input id='prev_history_original_"+nextHistory+"' value='"+currentImageId+"' type='hidden'/	><div><img class='edit' width='100%' height='78' src='"+img+"' id='"+imgId+"' onClick='loadFromHistory(this);'/><div></div></div>";
	scrollImagesLeft();
}

// Gets the snapshot of current state as base64 and updates the current 
// history of image in the image history panel
function updateHistory(){
	var canvas = document.getElementById("imageView");
	var context = canvas.getContext("2d");
	var img = canvas.toDataURL("image/png");
	var imgId="imageHistory_"+(currentHistory)+'';
	var currentImage = document.getElementById(imgId);
	var parContainer = currentImage.parentNode; 
	parContainer.innerHTML = "<img width='100%' height='78' class='edit' src='"+img+"' id='"+imgId+"' onClick='loadFromHistory(this);'/>";
}

// Loads the image state from bottom history panel into canvas
function loadFromHistory(image){
	renderUpdateButton();
	canvaso = document.getElementById('imageView');
	contexto = canvaso.getContext('2d'); 
	var canvas_container = canvaso.parentNode;
	var canvas = document.createElement('canvas');
	canvas.id = 'imageView';
	canvas.width= canvaso.width;
	canvas.height = canvaso.height;
	canvas_container.removeChild(canvaso);
	canvas_container.appendChild(canvas);
	var id = image.id.split("_")[1];
	currentHistory=id;
	currentImageId=document.getElementById("prev_history_original_"+id).value;
	loadImage(image);
}

// This method stores the current image state in a stack, useful for undo and redo
function savePoint(context){
	var canvas = document.getElementById("imageView");
	var context = canvas.getContext("2d");
	var img=canvaso.toDataURL("image/png");
	currentPointsArray.push(img);
} 

// Loads the image data as base64 into the canvas area for further edit
function loadImage(image){		
	currentImage = image.src;
	var imageNumber = image.id.split("_");
	if(imageNumber.length>2){
		currentImageId = document.getElementById("image_ticket_id_"+imageNumber[2]).value;
	}
	currentPointsArray = new Array();
	poppedPointsArray = new Array();
		
	canvaso = document.getElementById('imageView');

	contexto = canvaso.getContext('2d');
	var img = new Image();
	img.src = image.src;
	contexto.drawImage(img, 0, 0, canvaso.width, canvaso.height);
	savePoint(contexto);
	return;
}

// Apply various colors for the tools
function selectColorCode(colorElement){
	currentColorCode = colorElement.style.backgroundColor;
}

// For storing fundus images
function storeCurrentFundus(imageId){
	currentFundusId = imageId;
	isFundus = true;
}


// This section marks the coding for actual image marking tools

var canvas, context, canvaso, contexto;

// The active tool instance.
var tool;
var funds;
var tool_default = 'pencil';
var funds_default = 'fdefault';


// Initialize the image view canvas area with a blank state where we can use the draw tools
function initCanvas () {
	var tempImage =document.getElementById("img_menu_1");
	if (tempImage==null){
		if(document.getElementById("imageHistory_1") != null){
			initialImage = document.getElementById("imageHistory_1").src;
			currentImageId = document.getElementById("imageHistory_1").parentNode.parentNode.id;
		}
		document.getElementById("update_image").style.display="block";
	}else{
		initialImage = document.getElementById("img_menu_1").src;
		currentImageId = document.getElementById("image_ticket_id_1").value;
	}	
	
	currentPointsArray = new Array();
	poppedPointsArray = new Array();
	nextHistory = parseInt(document.getElementById("next_history").value);
	currentHistory = 0;
	canvaso = document.getElementById('imageView');
	contexto = canvaso.getContext('2d'); 
	var img = new Image();
	img.onload = function(){
		contexto.drawImage(img, 0, 0, canvaso.width, canvaso.height);
	}
	img.src = initialImage;
	currentImage = initialImage;
	var canvas_container = canvaso.parentNode;
	canvas = document.createElement('canvas');
	canvas.id = 'imageTemp';
	canvas.width= canvaso.width;
	canvas.height = canvaso.height;
	canvas_container.appendChild(canvas);
	context = canvas.getContext('2d');
	var tool_pencil = document.getElementById('pencil');
	var tool_rect = document.getElementById('rect');
	var tool_circle = document.getElementById('circle');
	var tool_line = document.getElementById('line');
	var tool_text = document.getElementById('text');
	var tool_undo = document.getElementById('undo');
	var tool_redo = document.getElementById('redo');
	var tool_stamp = document.getElementById('stamp');

	tool_pencil.addEventListener('click', ev_tool_click, false);
	tool_line.addEventListener('click', ev_tool_click, false);
	tool_circle.addEventListener('click', ev_tool_click, false);
	tool_rect.addEventListener('click', ev_tool_click, false);
	tool_text.addEventListener('click', ev_tool_click, false);
	tool_undo.addEventListener('click', ev_tool_click, false);
	tool_redo.addEventListener('click', ev_tool_click, false);

	// Activate the default tool.
	if (tools[tool_default]) {
		tool = new tools[tool_default]();
	}
	if (fundus[funds_default]) {
		funds = new fundus[funds_default]();
	}
	// Attach the mousedown, mousemove and mouseup event listeners.
	canvas.addEventListener('mousedown', ev_canvas, false);
	canvas.addEventListener('mousemove', ev_canvas, false);
	canvas.addEventListener('mouseup', ev_canvas, false);
}

// The general-purpose event handler. This function just determines the mouse 
// position relative to the canvas element.
function ev_canvas (ev) {
	if (ev.layerX || ev.layerX == 0) { 
		ev._x = ev.layerX;
		ev._y = ev.layerY;
	} else if (ev.offsetX || ev.offsetX == 0) { 
		ev._x = ev.offsetX;
		ev._y = ev.offsetY;
	}

	if(isFundus==true){
		var func = funds[ev.type];
		if (func) {
			func(ev);
		}
	}else{
		// Call the event handler of the tool.
		var func = tool[ev.type];
		if (func) {
			func(ev);
		}
	}
}


 


// The event handler for any changes made to the tool selector.
function ev_tool_change (ev) {isFundus==false;
if (tools[this.value]) {
tool = new tools[this.value]();
}
}

function ev_tool_click (ev,stamp) {
		isFundus=false;
		if(stamp=="true"){
			if (tools['stamp']) {
			tool = new tools['stamp']();
			}
		}else{
		if (tools[this.id]) {
		tool = new tools[this.id]();
		}
		}
	}

// Called each time after completing a drawing operation. Draws the #imageTemp canvas on top of #imageView, after which 
// #imageTemp is cleared.
function img_update () {
		contexto.drawImage(canvas, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
}

// Implementating each drawing tool.
var tools = {};
	var fundus={};

	fundus.fdefault=function(){
	

	this.mousedown = function (ev) {
	var img = new Image();
	var image = document.getElementById(currentFundusId);
	img.src = image.src;
	contexto.drawImage(img, ev._x, ev._y, image.width, image.height);
	img_update();
savePoint(contexto);
};
	
	 
	
};



// The drawing pencil.
tools.pencil = function () {
var tool = this;
this.started = false;

// This is called when you start holding down the mouse button.
// This starts the pencil drawing.
this.mousedown = function (ev) {
context.beginPath();
context.moveTo(ev._x, ev._y);
tool.started = true;
};

// This function is called every time you move the mouse. Obviously, it only 
// draws if the tool.started state is set to true (when you are holding down 
// the mouse button).
this.mousemove = function (ev) {
if (tool.started) {
context.lineTo(ev._x, ev._y);
	context.strokeStyle=currentColorCode;
context.stroke();
}
};

// This is called when you release the mouse button.
this.mouseup = function (ev) {
if (tool.started) {
tool.mousemove(ev);
tool.started = false;
img_update();
savePoint(contexto);
}
};
};

// The rectangle tool.
tools.rect = function () {
var tool = this;
this.started = false;

this.mousedown = function (ev) {
tool.started = true;
tool.x0 = ev._x;
tool.y0 = ev._y;
};

this.mousemove = function (ev) {
if (!tool.started) {
return;
}

var x = Math.min(ev._x,tool.x0),
y = Math.min(ev._y,tool.y0),
w = Math.abs(ev._x - tool.x0),
h = Math.abs(ev._y - tool.y0);

context.clearRect(0, 0, canvas.width, canvas.height);

if (!w || !h) {
return;
}
context.strokeStyle=currentColorCode;
context.strokeRect(x, y, w, h);
};

this.mouseup = function (ev) {
if (tool.started) {
tool.mousemove(ev);
tool.started = false;
img_update();savePoint(contexto);
}
};
};

// The line tool.
tools.line = function () {
var tool = this;
this.started = false;

this.mousedown = function (ev) {
tool.started = true;
tool.x0 = ev._x;
tool.y0 = ev._y;
};

this.mousemove = function (ev) {
if (!tool.started) {
return;
}

context.clearRect(0, 0, canvas.width, canvas.height);

context.beginPath();
context.moveTo(tool.x0, tool.y0);
context.lineTo(ev._x, ev._y);
context.strokeStyle=currentColorCode;
context.stroke();
context.closePath();
};

this.mouseup = function (ev) {
if (tool.started) {
tool.mousemove(ev);
tool.started = false;
img_update();savePoint(contexto);
}
};
};


tools.circle = function () {
var tool = this;
this.started = false;

this.mousedown = function (ev) {
tool.started = true;
 
 
tool.x0 = ev._x;
tool.y0 = ev._y;
};

this.mousemove = function (ev) {
if (!tool.started) {
return;
}
context.clearRect(0, 0, canvas.width, canvas.height);
var x = Math.min(ev._x,tool.x0),
y = Math.min(ev._y,tool.y0),
w = Math.abs(ev._x - tool.x0),
h = Math.abs(ev._y - tool.y0);

context.beginPath();
context.arc(x, y, w, h, Math.PI*2, true);
context.strokeStyle=currentColorCode;
context.closePath();
context.stroke();
};

this.mouseup = function (ev) {
if (tool.started) {
tool.mousemove(ev);
tool.started = false;
img_update();savePoint(contexto);
}
};
};


tools.text = function () {
this.mouseup = function (ev) {
tool.started = true;
tool.x0 = ev._x;
tool.y0 = ev._y;
var name = prompt("Enter the text", "Type you text here");
context.font = "bold 12px sans-serif";
context.fillStyle=currentColorCode;
context.fillText(name, tool.x0, tool.y0);
img_update();
savePoint(contexto);
};

};

tools.redo = function(){
	if(poppedPointsArray.length>0){
	var data = poppedPointsArray.pop();
	currentPointsArray.push(data);
	contexto.clearRect ( 0 , 0 , canvaso.width , canvaso.height );
	var img = new Image();
	img.onload = function(){
	contexto.drawImage(img, 0, 0, canvaso.width, canvaso.height);
	}
	img.src = data;
	}else{
	var img = new Image();
	img.onload = function(){
	contexto.drawImage(img, 0, 0, canvaso.width, canvaso.height);
	}
	img.src = currentImage;
	}
	};

	tools.undo = function(){
	if(currentPointsArray.length>0){
	poppedPointsArray.push(currentPointsArray.pop());
	var img = new Image();
	contexto.clearRect ( 0 , 0 , canvaso.width , canvaso.height );
	if(currentPointsArray.length>0){
	data = currentPointsArray.pop(); 
	img.onload = function(){
	contexto.drawImage(img, 0, 0, canvaso.width, canvaso.height);
	}
	img.src = data;
	currentPointsArray.push(data); 
	}else{
	img.onload = function(){
	contexto.drawImage(img, 0, 0, canvaso.width, canvaso.height);
	}
	img.src = currentImage;
	}
	}
	};

