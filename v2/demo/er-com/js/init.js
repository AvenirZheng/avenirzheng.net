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
	
	//by default, the scroll is only done vertically ('y'), change it to both.
	$.scrollTo.defaults.axis = 'xy'; 			
	//this one is important, many browsers don't reset scroll on refreshes
	$('div.pane').scrollTo( 0 );//reset all scrollable panes to (0,0)
	$.scrollTo( 0 );//reset the screen to (0,0)
	//Target examples bindings
	var $paneTarget = $('#pane-target');		
	
	
	$('.innerContent2').scrollTo( 0 );
	//Target examples bindings
	var $paneTarget2 = $('#pane-target2');		
	$('#menuWeb').hover(function(){
		$paneTarget2.stop().scrollTo( 'ul:eq(0)', 1000 ,{ easing:'elasout' });
	});
	$('#menuMail').hover(function(){
		$paneTarget2.stop().scrollTo( 'ul:eq(1)', 1000 ,{ easing:'elasout' });
	});
	$('#menuServer').hover(function(){
		$paneTarget2.stop().scrollTo( '#server', 1000 ,{ easing:'elasout' });
	});
	
	$('#about .content').scrollTo( 0 );
	//Target examples bindings
	var $paneTarget3 = $('#pane-target3');		
	$('#about .about a').click(function(){
		$paneTarget3.stop().scrollTo( '#inner1', 500 );
	});
	$('#about .service a ').click(function(){
		$paneTarget3.stop().scrollTo( '#inner2', 500);
	});
	$('#about .speedTest a').click(function(){
		$paneTarget3.stop().scrollTo( '#inner3', 500);
	});
	$('#about .contactUs a').click(function(){
		$paneTarget3.stop().scrollTo( '#inner4', 500);
	});
	
	
	$('#plan #page2Content').scrollTo( 0 );
	//Target examples bindings
	var $paneTarget4 = $('#page2Content');		
	$('#plan .menu li:eq(0)').click(function(){
		$paneTarget4.stop().scrollTo( '#page2-1', 500 );
	});
	$('#plan .menu li:eq(1)').click(function(){
		$paneTarget4.stop().scrollTo( '#page2-2', 500);
	});
	$('#plan .menu li:eq(2)').click(function(){
		$paneTarget4.stop().scrollTo( '#page2-3', 500);
	});
	$('#plan .menu li:eq(3)').click(function(){
		$paneTarget4.stop().scrollTo( '#page2-4', 500);
	});
	$('#plan .menu li:eq(4)').click(function(){
		$paneTarget4.stop().scrollTo( '#page2-5', 500);
	});
	$('#plan .menu li:eq(5)').click(function(){
		$paneTarget4.stop().scrollTo( '#page2-6', 500);
	});
	
	
});
	
	$(document).ready(function() {
		$("#nav1>li").hover(function(){
			 $(this).children("ul").css("display","block");
			 $(this).children("ul").animate({top:"40px"},"fast");
		},function(){ 
			 $(this).children("ul").animate({top:"80px"},"fast");
		});
	
	});




(function($){
$.fn.extend({
        Scroll:function(opt,callback){
                //参数初始化
                if(!opt) var opt={};
                var _btnUp = $("#"+ opt.up);//Shawphy:向上按钮
                var _btnDown = $("#"+ opt.down);//Shawphy:向下按钮
                var timerID;
                var _this=this.eq(0).find("ul:first");
                var     lineH=_this.find("li:first").height(), //获取行高
                        line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), //每次滚动的行数，默认为一屏，即父容器高度
                        speed=opt.speed?parseInt(opt.speed,10):600; //卷动速度，数值越大，速度越慢（毫秒）
                        timer=opt.timer //?parseInt(opt.timer,10):3000; //滚动的时间间隔（毫秒）
                if(line==0) line=1;
                var upHeight=0-line*lineH;
                //滚动函数
                var scrollUp=function(){
                        _btnUp.unbind("click",scrollUp); //Shawphy:取消向上按钮的函数绑定
                        _this.animate({
                                marginTop:upHeight
                        },speed,function(){
                                for(i=1;i<=line;i++){
                                        _this.find("li:first").appendTo(_this);
                                }
                                _this.css({marginTop:0});
                                _btnUp.bind("click",scrollUp); //Shawphy:绑定向上按钮的点击事件
                        });

                }
                //Shawphy:向下翻页函数
                var scrollDown=function(){
                        _btnDown.unbind("click",scrollDown);
                        for(i=1;i<=line;i++){
                                _this.find("li:last").show().prependTo(_this);
                        }
                        _this.css({marginTop:upHeight});
                        _this.animate({
                                marginTop:0
                        },speed,function(){
                                _btnDown.bind("click",scrollDown);
                        });
                }
               //Shawphy:自动播放
                var autoPlay = function(){
                        if(timer)timerID = window.setInterval(scrollUp,timer);
                };
                var autoStop = function(){
                        if(timer)window.clearInterval(timerID);
                };
                 //鼠标事件绑定
                _this.hover(autoStop,autoPlay).mouseout();
                _btnUp.css("cursor","pointer").click( scrollUp ).hover(autoStop,autoPlay);//Shawphy:向上向下鼠标事件绑定
                _btnDown.css("cursor","pointer").click( scrollDown ).hover(autoStop,autoPlay);

        }       
})
})(jQuery);

$(document).ready(function(){
        $("#news").Scroll({line:1,speed:100,timer:5000,up:"next",down:"pre"});
});


// content2 current
$(document).ready(function() {
    $("#menuWeb a").hover(function(){
    	$("a.menuList").removeClass("current");
       $(this).addClass("current");
    });
	 $("#menuMail a").hover(function(){
    	$("a.menuList").removeClass("current");
       $(this).addClass("current");
    });
	  $("#menuServer a").hover(function(){
    	$("a.menuList").removeClass("current");
       $(this).addClass("current");
    });
});

$(document).ready(function() {
    $(".menu a").click(function(){
    	 $(".menu a").removeClass("current");
       $(this).addClass("current");
    });
});

$(document).ready(function() {
    $("#plan .menu li").click(function(){
    	 $("#plan .menu li").removeClass("current");
       $(this).addClass("current");
    });
});


$(document).ready(function() {
    $("#plan .menu li").hover(function(){
     $(this).children("a").addClass("hover");
	 },function(){ 
	 $(this).children("a").removeClass("hover");

    });
});

// contact footer
$(document).ready(function() {
 $(".contact a").click(function(){
		$(".contact").toggleClass("accordion");
       $("#contactForm").slideToggle("fast",function(){});
    });
});


