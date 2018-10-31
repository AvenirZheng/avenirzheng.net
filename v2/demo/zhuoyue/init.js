
$(document).ready(function() {
    $("ul.newsList>li:even").addClass("odd");
	$("ul.item>li").hover(function(){
    	 $(this).addClass("hover");
    },function(){ 
    	 $(this).removeClass("hover");
    });
});