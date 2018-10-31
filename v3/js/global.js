function hoverContent(hover,diretion){
	var clearTimeoutFun=null;
	var content = $('.hid_content');
	function init(){
		if($('.hid_content .btn_close').length==0){
			var b = '<button type="button" class="btn_close">X</button>';
			content.append(b);		
			var c = '<div class="body_mark"></div>';
			$('body').append(c);
		}	
	}
	function hidContent(target,events){
		target.bind(events, function() {
		 	content.hide("normal");
			$('.gb_box').css('z-index','3');
			return false;
		});
	}
	hover.find('hgroup').click(
		function () {
			var target = $(this).next('.hid_content');
			if(target.css('display')=='none'){
				content.hide("normal");
				$('.gb_box').css('z-index','3');
			}
			target.show('fast');
			$(this).parent().css('z-index','5');
			return false;
		}
	)

	init();
	hidContent($('.hid_content .btn_close'),'click');
	hidContent($('.body_mark'),'click');
}

function getContent(target,content){ 
	var linkTag = $(target);
	linkTag.click(function(){
		var src = $(this).attr('href');
		ajaxLink(src,'#get_content',content);
		return false;
	})		
}

function ajaxLink(source,contanier,content){
	init();
	$.ajax({
			url: source,
			cache: true,
			type: 'GET',
			error: function(){
				$(contanier).empty();
				$(contanier).append('<p class="error">真悲剧啊，约会请求失败了，再试试？');
			},
			success: function(res) {
				$('.loading').hide();
				$(contanier).empty();
				$(contanier).append($(res.responseText).find(content));
				$('.mod_popup').css({
					'margin-left':'-'+($('.mod_popup').innerWidth())/2+'px'
					//'margin-top':'-'+(($('.mod_popup').innerHeight())/2-90)+'px'
				})
				$('.mod_popup').show('normal');
				var hide = function (){
					if($('.mod_popup').css('display')=='block'){
						$('.mod_popup').hide('normal');	
						$('.popup_mark').fadeOut('normal');;
					}
				}
				$('.popup_mark').click(hide);
				$('.mod_popup_close').click(hide);
			}
	});	
	function init(){
		if($('.loading').length==0){
			var a = '<div class="loading"><img src="http://avenirzheng.net/system/application/views/themes/avenir/img/loading.gif"><p class="desc">跑，我跑啊，跑...</div><div class="popup_mark"></div><div class="mod_popup"><div id="get_content"></div><button type="button" class="mod_popup_close">X</button></div>';
			$('body').append(a);
		}
		if ($.browser.msie && $.browser.version <= 6 ){  
			$('.popup_mark').css({
				'height':$(document).height()+'px',
				'postion':'absolute',
				'z-index':'1000',
				'top':'0px'
			});
			$('.loading').css({
				'postion':'absolute',
				'z-index':'1001',
				'top':'0px'
			})
		}
		$('.loading').fadeIn('normal');
		$('.popup_mark').fadeIn('normal');
	}
}