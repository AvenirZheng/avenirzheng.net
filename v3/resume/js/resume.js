$(document).ready(function() {
	$("body>header").css('display','none').slideDown(1000);
	
	$(".description").css('display','none');
	var tempLink = document.createElement('a');
	tempLink.href='#';
	tempLink.className='anchorFoucs'; //使键盘能操作 提高可访问性，非语义。
	
	$("h2.summary").wrap(tempLink);
	$("h2.summary").css("cursor","pointer");
	$("h2.summary").hover(function(){$(this).addClass("hover");},function(){ $(this).removeClass("hover");});	
	
	$(".anchorFoucs").click(function(){
		$(this).children().toggleClass("click");
		//$(this).blur();
		$(this).nextAll(".description").toggle(300).css("background","#F6F6F6");
		return false;
	});;
	
	$(".anchorFoucs").focus(function(){
		$("h2.summary").removeClass("hover"); 
		$(this).children().addClass("hover");
		return false;
	});
	
	$("#tagCloud").hover(function(){
		$("#tagCloud>li").css('display','none');
		$(".core").fadeIn(1);
		$(".mastery").fadeIn(1000);
		$(".deeply").fadeIn(1800);
		$(".experienced").fadeIn(2300);
		$(".normal").fadeIn(3600);
		$(".know").fadeIn(5000);
	});	
	$("#tagCloud a").click(function(){ return false});

	var nameReplace = document.getElementById('J_nameReplace'); if (!nameReplace) return false; //使用dom做文字隐藏
	var namePlace = nameReplace.getElementsByTagName('span');
	var replaceImg = document.createElement('span');
	replaceImg.setAttribute('class','replaceImg');
	nameReplace.insertBefore(replaceImg, namePlace[0]);
	
	
	
	function editable(){//利用html5的local storage,使code标签内的内容可以编辑并保存, only safari support get local storage
			if(localStorage.getItem){
				var b = document.getElementsByTagName('body')[0];
				if(b.getAttribute('contenteditable')!='true'){
					b.setAttribute('contenteditable','true');
				};
				
				$(b).bind('blur', function(e){
					localStorage.setItem(this.getAttribute('id'), this.innerHTML);
					document.designMode = 'off';
				});
				$(b).bind('focus', function () {
						document.designMode = 'on';
					});
				if (localStorage.getItem(b.getAttribute('id'))){
					b.innerHTML = localStorage.getItem(b.getAttribute('id'));
					//alert('hey, i just use localstorage to store what you type, pretty cool function, thanks HTML5, haha')
				}
			}
	};
	//返回顶部;
	var backtopBtn = document.getElementById('J_backtop'); if(!backtopBtn) return false;
	backtopBtn.onclick=backtop;
	function backtop(){
		
		var top = Math.max(document.documentElement.scrollTop ,document.body.scrollTop) ;
		var gotoTop = window.setInterval(function(){
			if(top>0){
				top-=Math.ceil(top/2);
				document.body.scrollTop=document.documentElement.scrollTop=top;
				//document.documentElement.scrollTop=top;
			} else{ document.documentElement ? document.documentElement.scrollTo = '0' :document.body.scrollTop=0; window.clearInterval(gotoTop)}										  
		},100);
		return false;
	}
});

	