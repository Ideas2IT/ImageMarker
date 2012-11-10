var foundTop=false;
var foundLeft=false;
var getTopScrollImgPositions=function(){foundTop=true;
var a=$("img","#top-scroll-gallery");
a.each(function(){var b=$(this);
b.data("pos",b.position().top)
})
};
var getLeftScrollImgPositions=function(){foundLeft=true;
var a=$("img","#left-scroll-gallery");
a.each(function(){var b=$(this);
b.data("pos",b.position().left)
})
};
var scrollImagesTop=function(){foundTop=false;
var a=$("#top-scroll-wrapper");
$("img","#top-scroll-wrapper").each(function(c){var b=$(this);
b.mouseover(function(){if(foundTop==false){getTopScrollImgPositions()
}if(c!=0){a.stop(true,true).animate({top:-(b.data("pos")/2)},"slow")
}else{a.stop(true,true).animate({top:0},"slow")
}})
})
};
var scrollImagesLeft=function(){foundLeft=false;
var a=$("#prev_histories");
$("img","#prev_histories").each(function(c){var b=$(this);
b.mouseover(function(){if(foundLeft==false){getLeftScrollImgPositions()
}if(c!=0){a.stop(true,true).animate({left:-(b.data("pos")/2)},"slow")
}else{a.stop(true,true).animate({left:0},"slow")
}})
})
};