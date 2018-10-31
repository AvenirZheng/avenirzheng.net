(function(){
randomBg ={
	bgNum:3,
	bgName:'bg',
	init:function(){
		var num = parseInt(Math.random()*randomBg.bgNum+1);
		var h = document.getElementsByTagName('html')[0];
		YI.addClass(h,randomBg.bgName+num);
	}
},
switchStyle = {
	defaultText:"DARK VERSION",
	defaultClass:'switch',
	dark:'dark',
	darkText:'LIGHT VERSION',
	target:'J_nav',
	init:function(){
		var target = YI.$(switchStyle.target); if(!target) return false;
		var switchContainer = document.createElement('li');
		YI.addClass(switchContainer,switchStyle.defaultClass);
		if (Modernizr.localstorage) {
			if(localStorage.getItem('themeVersion')===switchStyle.dark){
			YI.addClass(document.getElementsByTagName('body')[0],switchStyle.dark); 
			switchContainer.innerHTML=switchStyle.darkText;
			target.appendChild(switchContainer);
			}
			else{
				switchContainer.innerHTML=switchStyle.defaultText;
				target.appendChild(switchContainer);
			}
		} 
		YI.addEvent(switchContainer,'click',switchStyle.changeBodyClass)
	},
	changeBodyClass:function(){
		var b = document.getElementsByTagName('body')[0],
			orginalText = document.createTextNode(switchStyle.defaultText);
			text= document.createTextNode(switchStyle.darkText);
		if(YI.getClass(b)===switchStyle.dark){
			YI.removeClass(b,switchStyle.dark);
			this.replaceChild(orginalText,this.lastChild);
			if (Modernizr.localstorage) {localStorage.setItem('themeVersion', 'light');}
			
		} else{ 
			YI.addClass(b,switchStyle.dark); 
			this.replaceChild(text,this.lastChild);
			if (Modernizr.localstorage) {localStorage.setItem('themeVersion', 'dark');}
		}
	}
},
loadPage ={
	link:'J_nav',
	target:'J_mainContent',
	gotop:function(){
		var top = Math.max(document.documentElement.scrollTop ,document.body.scrollTop) ;
		var gotoTop = window.setInterval(function(){
			if(top>0){
				top-=Math.ceil(top/1.5);
				document.body.scrollTop=document.documentElement.scrollTop=top;
			} else{ document.documentElement ? document.documentElement.scrollTo = '0' :document.body.scrollTop=0; window.clearInterval(gotoTop)}
		},30);
	},
	init:function(){
		if(!this.target) return false;
		var link = YI.$(loadPage.link).getElementsByTagName('a'),l=link.length;
		if(!link) return false;
		var t=0;
		for(var i=l;i>0;i--){
			if(!link[i-1].getAttribute('rel')){
				link[i-1].onclick=function(){return false;}
				YI.addEvent(link[i-1],'click',function(){
					if(YI.getClass(this.parentNode)!=='current'){
						for(var i=l;i>0;i--){
							YI.removeClass(link[i-1].parentNode,'current');
						}
						YI.addClass(this.parentNode,'current');
							url=this.getAttribute('href').toString()
							if(url.indexOf(".")!= url.lastIndexOf(".")){
								//url=url.replace("http://[a-z,A-Z,0-9]*(\\.)", "");
								url=url.substring(url.lastIndexOf("/")+1, url.lastIndexOf("."));
							}
							else {
								url=url.replace("http://", ""); 
								url=url.substring(url.lastIndexOf("/")+1, url.indexOf("."));
								
							}
							url=url+'.xml';
							YI.ajax('get',url,function(){
								loadPage.gotop();
								if (xmlhttp.readyState==4 && xmlhttp.status==200){
									YI.$(loadPage.target).innerHTML=xmlhttp.responseText;
								}
								else{
									YI.$(loadPage.target).innerHTML='<div class="load"><img src="img/load.gif"></div>'
								}
							})
					}
				})
			}
		}
	}
},
flickrApi ={
	api:'http://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=48d891f95cb25c8ddb9ce365d48d52cc&user_id=51073381@N04&format=json&per_page=13',
	max:'10',
	init:function(){
			var s = document.createElement('script');
			s.src = flickrApi.api;
			document.getElementsByTagName('head')[0].appendChild(s);

	}
},
/*
getGeolocation = { // 利用HTML5 的geolocation属性和google map api,显示当前位置,sorry for chrome, you suck!
	title:'你的位置',
	copy:'Power by Geolocation and Google Map',
	init:function(){
		var sidebar = document.getElementById('J_sidebar'); if(!sidebar) return false;
		if(navigator.geolocation){
			var d = document,
				section = d.createElement('section'),
				h2 = d.createElement('h2'),
				title = d.createTextNode(getGeolocation.title);
				copy = d.createTextNode(getGeolocation.copy);
				h2.appendChild(title);
				section.appendChild(h2);
			section.setAttribute('id','g');	
			section.appendChild(copy);	
			navigator.geolocation.getCurrentPosition(getGeolocation.success, getGeolocation.error);
			sidebar.appendChild(section);
		}
	},
	success:function(position){
		var mapcanvas = document.createElement('div');
 		mapcanvas.setAttribute('id','mapcanvas');
 		mapcanvas.style.height = '200px';
  		mapcanvas.style.width = '230px';
  
  		YI.$('g').appendChild(mapcanvas);
  		
		// google为人们服务
  		var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 		var myOptions = {
			zoom: 15,
			center: latlng,
			mapTypeControl: false,
			navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
			mapTypeId: google.maps.MapTypeId.ROADMAP
  		};
  		var map = new google.maps.Map(YI.$('mapcanvas'), myOptions);
  
  		var marker = new google.maps.Marker({
		  position: latlng, 
		  map: map, 
		  title:"ghvfh"
  		});

	},
	error:function (){
	}
},
*/
YI = {
	compatible:function (other){
		if(other===false
		   ||!Array.prototype.YI
		   ||!Object.hasOwnProperty
		   ||!document.getElementById
		   ||!document.getElementsByTagName
		   ||!document.createElement
		   ||!document.createTextNode
		   ){
			   return false;
		}
		return true;
	},
	$:function (){
		var elements = new Array();
		for(var i=0; i<arguments.length;i++){
			var el=arguments[i];
			if(typeof el=='string'){
				el=document.getElementById(el);
			}
			if(arguments.length==1){
				return el;
			} else {elements.YI(el);}
		}
		return elements;
	}, 
	getClass:function(el){
		if(el.getAttribute('class')){return el.getAttribute('class')}
		else {return el.getAttribute('className')}
	},
	getElementsByClass:function (className, tag, parent){
		parent =parent || document;
		var allTags = (tag=="*"&& parent.all) ? parent.all:parent.getElementsByTagName(tag);
		var matchEls = new Array();
	
		className = className.replace(/\-/g,"\\-");
		var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
	
		var el;
		for(var i = 0; i<allTags.length; i++){
			el = allTags[i];
				if(regex.test(el.className)){
				matchEls.YI(el);
			}
		}
		return matchEls;
	},
	addClass:function (el,cl){
		if (!el.className){ el.className=cl; } //无类名则直接设类名
		else {
			var classes = el.className.replace(/\s+/,' ').split(' '); //分割类名
	
			for(var i=0,l=classes.length;i<l;++i){
			   if(classes[i]===cl){return false;} //若已存在,则不添加
			}
	
		   el.className=el.className+" " +cl; //在末尾添加类名
		}
	},
	removeClass:function (el,cl){
		if(el.className==cl){
			el.className="";
		} else{
			var arr=el.className.split(' ');
			var arrLen=arr.length;
			var newClass="";
			for(var i=0;i<arrLen;i++){
				if(arr[i]!=cl){
					if(i>0){newClass+=" ";}
					newClass +=arr[i];
					//alert(newClass);
				}
				el.className=newClass;
			}
		 }
	},
	getStyle:function (el,property){
		var value=el.style[camelize(property)];
		if(!value){
			if(document.defaultView && document.defaultView.getComputedStyle){
				var css = document.defaultView.getComputedStyle(el,null);
				value = css ? css.getPropertyValue(property):null;
			} else if (el.currentStyle){ value = el.currentStyle[camelize(property)];}    }
		return value=='auto' ? '' :value;
	},
	addLoadEvent:function (func){
		var oldonload = window.onload;
		if (typeof window.onload !='function'){
			window.onload = func;
		} else {
			window.onload = function(){
				oldonload();
				func();
			 }
		}
	},

	addEvent:function (node, type, listener){
		if(node.addEventListener){//WC3
			node.addEventListener(type, listener, false);
			return true; 
		} else if(node.attachEvent){//IE
			node['e'+type+listener] = listener;
			node[type+listener] = function(){
				node['e'+type+listener](window.event);
			}
			node.attachEvent('on'+type, node[type+listener]);
			return true;
			}
		return false;
	},

	removeEvent:function (node,type,listener){
		if(node.removeEventListener){//w3c
			node.removeEventListener(type,node,false);
			return true;
		} else if(node.detachEvent){
			node.detachEvent('on' + type, node[type+listener]);
			node[type+listener] = null;
			return true;
		}
		return false;
	},
	setCookies:function(name,value,day){
		var Days = day || 30; 
		var exp　　 = new Date();
　　 	exp.setTime(exp.getTime() + Days*24*60*60*1000);
　　 	document.cookie = name + "="+ escape(value)+"; expire="+exp.toGMTString();
	},
	getCookies:function(name){
	　　 var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	　　 if(arr != null) return unescape(arr[2]); return null;
	},
	delCookies:function (name){
	　　var date=new Date();
         date.setTime(date.getTime()-10000);
         document.cookie=name+"=v; expire="+date.toGMTString();
	},
	ajax:function(method,source,callback){
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}
		else{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=callback;
		xmlhttp.open(method,source,true);
		xmlhttp.send();
	}
}
 
YI.addLoadEvent(switchStyle.init);
YI.addLoadEvent(loadPage.init);
YI.addLoadEvent(randomBg.init);
//YI.addLoadEvent(flickrApi.init);
/*
YI.addLoadEvent(getGeolocation.init);
*/
})();

