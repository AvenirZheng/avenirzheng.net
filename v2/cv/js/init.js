$(document).ready(function() {		   	
	//bookList hover
	$('<span class="space"></span>').appendTo("ul.bookList > li");	
    $(".bookList li").hover(function(){
		$(this).addClass("hover");							 
    	$(this).find("ul").slideDown("fast").animate({opacity:"0.9"},200);
		$(this).find("ul").css("z-index",1);
},function(){ 
		$(this).removeClass("hover");		
    	$(this).find("ul").slideUp("fast") 
    });
	
	//Articles a tittle	
	 $(".articles a").attr("title", function (arr) {
          return $(this).html();
        });
	 
	//current
	 $("#caseL a").click(function(){
    	$("#caseL a").removeClass("current");
       $(this).addClass("current");
    });
	$(".nav a").click(function(){
    	$(".nav a").removeClass("current");
       $(this).addClass("current");
    });
	
	// casePic magnifier
	$('<span class="mark"></span><span class="magnifier"></span>').appendTo("dt.casePic a");					   
    $("dt.casePic").hover(function(){
    	$(".magnifier").fadeIn(600); 
},function(){ 
    	$(".magnifier").fadeOut(600); 
    });
	
jQuery(function( $ ){
	/**
	 * Demo binding and preparation, no need to read this part
	 */
		//borrowed from jQuery easing plugin
		//http://gsgd.co.uk/sandbox/jquery.easing.php
		$.easing.elasout = function(x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		};
		$('a.back').click(function(){
			$(this).parents('div.pane').scrollTo( 0, 800, { queue:true } );
			$(this).parents('div.section').find('span.message').text( this.title );
			return false;
		});
		//just for the example, to stop the click on the links.
		$('ul.links').click(function(e){
			e.preventDefault();
			var link = e.target;
			link.blur();
			if( link.title )
				$(this).parent().find('span.message').text(link.title);
		});
	
	//by default, the scroll is only done vertically ('y'), change it to both.
	$.scrollTo.defaults.axis = 'xy'; 			
	//this one is important, many browsers don't reset scroll on refreshes
	$('div.pane').scrollTo( 0 );//reset all scrollable panes to (0,0)
	$.scrollTo( 0 );//reset the screen to (0,0)
	
	//TOC, shows how to scroll the whole window
	$('.nav a').click(function(){//$.scrollTo works EXACTLY the same way, but scrolls the whole screen
		$.scrollTo( this.hash, { duration: 1000 } );
		//return false;
	});
	$('#aboutContent .content p a').click(function(){//$.scrollTo works EXACTLY the same way, but scrolls the whole screen
		$.scrollTo( this.hash, 3000, { easing:'elasout' });
		return false;
	});
		$('p.topBtn a').click(function(){//$.scrollTo works EXACTLY the same way, but scrolls the whole screen
		$.scrollTo( this.hash, 1000);
		return false;
	});
	
	//Target examples bindings
	var $paneTarget = $('#pane-target');	
	$('div.pane').addClass("paneHeight");
	$('ul.caseList').addClass("show");
	
	
	$('.caseList li a').eq(0).click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(0)', 2000 ,{ easing:'elasout' } );
	});
	$('.caseList li a:eq(1)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(1)', 2000 ,{ easing:'elasout' } );
	});
	$('.caseList li a:eq(2)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(2)', 2000 ,{ easing:'elasout' });
	});
	$('.caseList li a:eq(3)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(3)', 2000,{ easing:'elasout' } );
	});
	$('.caseList li a:eq(4)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(4)', 2000 ,{ easing:'elasout' });
	});
	$('.caseList li a:eq(5)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(5)', 2000 ,{ easing:'elasout' });
	});
	$('.caseList li a:eq(6)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(6)', 2000 ,{ easing:'elasout' });
	});
	$('.caseList li a:eq(7)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(7)', 2000 ,{ easing:'elasout' });
	});	
	$('.caseList li a:eq(8)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(8)', 2000 ,{ easing:'elasout' });
	});	
	$('.caseList li a:eq(9)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(9)', 2000 ,{ easing:'elasout' });
	});	
		$('.caseList li a:eq(10)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(10)', 2000 ,{ easing:'elasout' });
	});	
		$('.caseList li a:eq(11)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(11)', 2000 ,{ easing:'elasout' });
	});	
		$('.caseList li a:eq(12)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(12)', 2000 ,{ easing:'elasout' });
	});	
		$('.caseList li a:eq(13)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(13)', 2000 ,{ easing:'elasout' });
	});		
		$('.caseList li a:eq(14)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(14)', 2000 ,{ easing:'elasout' });
	});		
		$('.caseList li a:eq(15)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(15)', 2000 ,{ easing:'elasout' });
	});		
		$('.caseList li a:eq(16)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(16)', 2000 ,{ easing:'elasout' });
	});
	$('.caseList li a:eq(17)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(17)', 2000 ,{ easing:'elasout' });
	});	
	$('.caseList li a:eq(18)').click(function(){
		$paneTarget.stop().scrollTo( 'dl:eq(18)', 2000 ,{ easing:'elasout' });
	});			
		$('.caseList li a').click(function(){ return false});
	$('#jquery-object').click(function(){
		var $target = $paneTarget.find('li:eq(3)');
		$paneTarget.stop().scrollTo( $target , 800 );
	});
});
	
});

