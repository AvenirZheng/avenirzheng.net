---
title: '{ Jquery实战 } 带动画效果的锚点跳转'
url: 968.html
id: 968
date: 2009-04-24 02:15:04
tags:
---

[![jquery](http://cai13.info/blog_pic/2009/04/jquery-thumb.jpg "jquery")](http://cai13.info/blog_pic/2009/04/jquery.jpg)

实现的基本原理是利用Jquery的[scrollTo插件](http://flesler.blogspot.com/2007/10/jquerylocalscroll-10.html)，本人初学jq，只能抛砖引玉，做个简单的示例，希望大家能支持。

使用很简单，下载导[jquery库](http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js)文件和[scrollTo插件](http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.1-min.js)，编写合理的markup，使用<a id=”#></a>或任意ID作为锚点，编写3行js代码就可以实现效果！

[具体效果](http://www.adriancheng.name/)

1.在html中导入[jquery库](http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js)和[scrollTo插件](http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.1-min.js)

> <head>  
> <title>锚点跳转</title>
> 
> <script src="[http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js"](http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js") type="text/javascript"></script>
> 
> <script src="[http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.1-min.js](http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.1-min.js "http://flesler-plugins.googlecode.com/files/jquery.scrollTo-1.4.1-min.js")" type="text/javascript" ></script>
> 
> </head>

2.编写markup，简单做个示例

> <body>  
> <a href="#example"></a>  
> <div style="height:2000px"></div>
> 
> <div id="expamle"></div>  
> 我在这  
> </div>  
> </body>

3编写js代码。

> jQuery(function( $ ){  
>         $.easing.elasout = function(x, t, b, c, d) {  
>             var s=1.70158;var p=0;var a=c;  
>             if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;  
>             if (a < Math.abs(c)) { a=c; var s=p/4; }  
>             else var s = p/(2\*Math.PI) \* Math.asin (c/a);  
>             return a\*Math.pow(2,-10\*t) * Math.sin( (t\*d-s)\*(2*Math.PI)/p ) + c + b;  
>         };  
>     $.scrollTo.defaults.axis = 'xy';              
>     $.scrollTo( 0 );  
>     $('a').click(function(){  
>         $.scrollTo( this.hash, { duration: 1000 } );  
>         return false;  
>     });  
> });

$('a') 是选择符

$.scrollTo( 位置, 速度,{ 滑动方式 } );

效果很简单，也很实用，在FAQ页面或者应用到TOP按钮，能达到不错的效果。

注：代码中的删除线表示没必要删除或改动的代码部分。

如果觉得有点大才小用，请点击：[http://demos.flesler.com/jquery/scrollTo/](http://demos.flesler.com/jquery/scrollTo/) 查看全部效果。

不仅可以实现窗口范围内的滑动，还可以在html各个容器，各个位置中滑动。

效果也不仅仅只有平滑，还有加速，水平垂直移动，摇摆等等效果。

这样就可以应用到各种tab效果上，大家尽情发挥创意啦。