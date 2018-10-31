$(document).ready(function() {
    $(".nav li:not(.current)").hover(function(){
		$(this).addClass("current");							 
},function(){ 
		$(this).removeClass("current");		
    });
});	
$(document).ready(function() {
    $(".nav li:not(.current)").hover(function(){
		$(this).addClass("hover");							 
},function(){ 
		$(this).removeClass("hover");		
    });	
	
});

/*banner*/
$(document).ready(function(){
		$("#banner").picSwitch({
						imgs: "images/banner1.jpg,images/banner2.jpg,images/banner3.jpg,images/banner4.jpg",
						links: "index.html,index.html,index.html,index.html",
						holdTime: 4
					});
	});


(function( $ ){
	var ids = {
		s: 'pic-switch-box',// s -> switch box
		i: 'pic-images-box',// i -> images box
		b: 'pic-bar-box',   // b -> bar box
		a: 'pic-bar-a_',    // a -> bar link
		m: 'pic-move',		// m -> move
		gs:'pic-go_stop'	// gs-> go_stop
	};
	var styles = {
		currentLinkClass: 'link-current-class',
		goClass: 'pic-go-class',
		stopClass: 'pic-stop-class',
		moveClass: 'pic-move-class'
	};
	var info = {
		go:   'Started automatically switch.',
		stop: 'Stop automatically switch.',
		move: 'Click me!'
	};

	var holdTime = 4;// For autoPlay() time
	var arrLen = 0;  // Record the length of Array list for autoPlay()
	
	$.fn.extend({
		/* Create a new Array list to store imgs,links and one-to-one */
		picArr: function(imgs,links){
			var picList = new Array();
			for(var i=0;i<imgs.length;i++){
				picList[i] = new Array();
				
				picList[i][0] = imgs[i];
				picList[i][1] = links[i];
			}
			return picList;
		},
		/* Create show elements into the obj<banner> */
		newContainer: function(getArr){
			var elems = "<div id='"+ids.s+"'>";
			
				/* <image box> */
				elems+= "<span id='"+ids.i+"'>";
				for(var i=0;i<getArr.length;i++){
					elems+= "<a href='"+getArr[i][1]+"'><img src='"+getArr[i][0]+"' onfocus='this.blur();' /></a>";
				}
				elems+= "</span>"; 
				/* </image box> */
				
				/* <bar box> */
				elems+= "<span id='"+ids.b+"'>";
				
				elems+= "<a id='"+ids.m+"' class='"+styles.moveClass+"' title='"+info.move+"'></a>";
				elems+= "<a id='"+ids.gs+"' class='"+styles.stopClass+"' title='"+info.stop+"' onclick='$.startStop(this);'></a>";
				
				for(var j=0;j<getArr.length;j++){
					elems+= "<a id='"+ids.a+(j+1)+"' href='javascript:;' onclick='$.clickSwitch(this);' onfocus='this.blur();'>"+(j+1)+"</a>";
				}
				elems+= "</span>";
				/* </bar box> */
				
				elems+= "</div>";
			$(this).append(elems);
			/* Set the styles of elements */
			this.setCss();
		},
		/* Style of elements */
		setCss: function(){
			var h = $(this).height();
			var w = $(this).width();
			$("#"+ids.s+",#"+ids.i+",#"+ids.i+">a").css({"width": w+"px", "height": h+"px"});
		},
		
		/* Start here */
		picSwitch: function(options){
			options = $.extend({ imgs:  '', links: '', holdTime: 4 }, options);
			
			parseInt(options.holdTime) > 0? 
				holdTime=options.holdTime: holdTime;
			
			/* Check the imgs & links */
			if(options.imgs != ''){
				if(options.links == ''){
					for(var k=0;k<options.imgs.length-1;k++)
						options.links += 'javascript:;,';
				}
				imgs  = options.imgs.split(",");
				links = options.links.split(",");
				/* Put into the Array list */
				getArr = this.picArr(imgs, links);
				
				/* Set style after create elements */
				this.newContainer(getArr);
				
				/* arrLen for autoPlay() */
				arrLen = getArr.length;
				$.autoPlay();
				
				/* Move bar event */
				$("#"+ids.m).toggle(
					function(){
						$("#"+ids.b).animate({"top": $("#"+ids.s).height()-3+ "px"});
					},
					function(){
						$("#"+ids.b).animate({"top": "0px"});
					}
				);
				
			}else{ 
				return;  
			}
		}
	});
	
	var autoNum = 0;// 
	var storeTimer = ''; // Store the setTimeout
	$.extend({
		/* auto move */
		autoPlay: function(){
			if(autoNum >= arrLen){
				autoNum = 1;
			}else{
				autoNum ++;
			}
			/* autoPlay now */
			$.startPlay(autoNum);
			//alert($('#pic-switch-box').css('top'));
			
		},
		/* Bar click event */
		clickSwitch: function(obj){
			var currentId = $(obj).attr("id").split("_")[1];
			autoNum = currentId;
			
			if($(obj).attr("class") != styles.currentLinkClass) {
				/* autoPlay now */
				$.startPlay(currentId);
			}
		},
		/* clearTimeout after setTimeout */
		startPlay: function(currentId){
			/* ClearTimeout first */
			clearTimeout(storeTimer);
			
			/* Is auto or click */
			var moveHei;
			currentId == 'undefined'?
				moveHei = -( ($("#"+ids.s).height()) * autoNum):
				moveHei = -( ($("#"+ids.s).height()) * (currentId-1) );
			
			/* This is set the class of bar > a */
			$("#"+ids.b+">a").removeClass(styles.currentLinkClass);
			$("#"+ids.a+autoNum).addClass(styles.currentLinkClass);
			
			/* Switch picture --! */
			$("#"+ids.i).animate({"top": moveHei+ "px"});
			
			/* If stop */
			if($("#"+ids.gs).attr("class") != styles.goClass){
				storeTimer = setTimeout("$.autoPlay()", holdTime*1000);
			}
		}
	});
	
})(jQuery);

