---
title: '{ Adobe } Adobe前端开发——结构层概况 [摘]'
url: 445.html
id: 445
date: 2008-03-18 12:46:50
tags:
---

**一、概况** Adobe采用了每刷新一次页面，调用一款产品的方式，给访问者展示不同的内容。 ![](http://www.blueidea.com/articleimg/2008/03/5502/01.jpg)   
首页分成了4个区块： A.顶部导航区、B.产品展示区、C.产品列表及相关信息块、D.底部版权区 解析如下： ![](http://www.blueidea.com/articleimg/2008/03/5502/02.jpg)  
HTML片段： ![](http://www.blueidea.com/articleimg/2008/03/5502/3.gif)  
**二、顶部导航区** 导航区域，Adobe用"dt"和"dd"分出了4个小块： ![](http://www.blueidea.com/articleimg/2008/03/5502/4.gif)  
解析如下： ![](http://www.blueidea.com/articleimg/2008/03/5502/5.gif)  
不太符合国内开发习惯的是，他们采用了从右向左的写法，先给出了最右侧LOGO区域的<dt id="adobe-logo">标签，然后是<dd id="site-search">搜索区域，最后才是上下并列的两个左侧导航区域。值得借鉴的是，Adobe在导航区的下拉菜单运用了"dl"内嵌套"ul"的方法来实现效果，在国内的网站中这种写法目前尚不多见。 HTML片段： ![](http://www.blueidea.com/articleimg/2008/03/5502/6.gif)  
**三、产品展示区** 这个区块主要是通过FLASH来作为主要的表现形式 ![](http://www.blueidea.com/articleimg/2008/03/5502/7.jpg)  
通过JS中FMARotator参数对背景层及对应产品FLASH路径的指定，来实现每刷新一次页面，更换一下产品展示区域的内容。 HTML片段： ![](http://www.blueidea.com/articleimg/2008/03/5502/8.gif)  
**四、产品列表及相关信息块** 从直观上看，这是一个三列的布局： ![](http://www.blueidea.com/articleimg/2008/03/5502/9.jpg)  
但实际上Adobe只把这部分内容分成了两个大的块，<div id="contentBody">和<div id="contentPocket"> 解析如下： ![](http://www.blueidea.com/articleimg/2008/03/5502/10.gif)  
然后再用"columns-2-AB-A"和"columns-2-AB-B"这样的共用样式，分别切分出左右布局的结构，最后使用<br class="clear-both"/> 清除浮动，代码非常简洁。 HTML片段： ![](http://www.blueidea.com/articleimg/2008/03/5502/11.gif)  
**五、底部版权区** 相比较上边的内容，这里的结构比较简单 ![](http://www.blueidea.com/articleimg/2008/03/5502/12.gif)  
整体分成了上下两个块，上部的是站内的链接区域，下部的就是版权信息了 ![](http://www.blueidea.com/articleimg/2008/03/5502/13.gif)  
内部代码仍然采用了从右向左的写法。 HTML片段： ![](http://www.blueidea.com/articleimg/2008/03/5502/14.gif)