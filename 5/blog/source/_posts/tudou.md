---
title: '{ Tudou } 土豆网前端概况[摘]'
url: 432.html
id: 432
date: 2008-02-12 02:18:32
tags:
---

作者：[Aether](http://www.blueidea.com/common/contact.asp?type=%E4%BD%9C%E8%80%85&username=Aether) 来自：[蓝色理想](http://www.blueidea.com/)  

一、分工和流程
-------

在土豆网，以项目开发为核心，谁都可以带项目，担任项目经理。 一个典型的土豆网项目中，当进入正式开发阶段，通常参与者包括：1名设计师，1-2名前端工程师，1到多名后台工程师，1-2名系统运维管理员。 其中，前三者的工作都是可以并发的，最终整合通常是前段工程师，对于复杂度较低的页面处理，一般工程师也可以直接参与。  
不管是设计师、前端和后台工程师，对于分离的领会和理解都非常重要，并且导致配合上，不同理解层次的人会产生不同的配合效果。 其中，设计师和前端工程师的配合无疑是最重要的，设计师的风格直接导致前端页面结构的简洁或者复杂，程序逻辑的简洁或者复杂。 一个卓越于设计并且理解W3C网页标准的设计师是珍稀而罕见的。  

二、基本架构（Architecture）
--------------------

架构的目标：可扩展性、可维护性、可复用性  
**1\. 内容（Infomation/Content）** 土豆网的内容结构，从模块来说，如中心橙色圈所区分出的九个大块： [![](http://www.blueidea.com/articleimg/2008/01/5298/01.jpg)](http://www.blueidea.com/articleimg/2008/01/5298/01.jpg "在新窗口打开图片")  
从其功用来说，则分为三个层次： [![](http://www.blueidea.com/articleimg/2008/01/5298/02.jpg)](http://www.blueidea.com/articleimg/2008/01/5298/02.jpg "在新窗口打开图片") 这些特性决定了后面所有前端架构的基调。  
**2\. 结构层（Structure）**  
A、 页面（Page）结构  
a) 概览 一个典型左右版式的页面样式： ![](http://www.blueidea.com/articleimg/2008/01/5298/03.jpg) 土豆网的所有页面都基于这个页面模型，分别是：上下导航、内容，内容分为贯穿版式或者左右版式。  
在左右区域中分别由盒状模型担任最终内容的承载结构。 解析如下： ![](http://www.blueidea.com/articleimg/2008/01/5298/04.jpg)  
HTML片段： ![](http://www.blueidea.com/articleimg/2008/01/5298/05.jpg)  
b) 导航  
i、 顶部导航 土豆网导航分为三种，常规导航、黑色小黑边导航，以及视频播放页面的专用导航。  
这三种导航使用的HTML是基本一致的，通过CSS来控制不同状态下的表现： [![](http://www.blueidea.com/articleimg/2008/01/5298/06.jpg)](http://www.blueidea.com/articleimg/2008/01/5298/06.jpg "在新窗口打开图片")  
模型解析： [![](http://www.blueidea.com/articleimg/2008/01/5298/07.jpg)](http://www.blueidea.com/articleimg/2008/01/5298/07.jpg "在新窗口打开图片")  
HTML片段： [![](http://www.blueidea.com/articleimg/2008/01/5298/08.jpg)](http://www.blueidea.com/articleimg/2008/01/5298/08.jpg "在新窗口打开图片")  
ii、 底部导航（从略）  
c)内容  
i、 贯穿版式：在个别页面，会出现没有左右布局的全页面横向贯穿版式，这时页面结构内只有Content，没有Main或者Side，此时盒状模型全部直接堆积在Content内。另外，除了全站首页以外的所有公共页面都是特制并保持风格统一的贯穿版式。  
ii、 左右侧栏：最常见的布局，存在于绝大部分页面。最主要应用在内页管理区域，首页也有用到。  
iii、 混合版式：只有视频播放页面用到。  
B、 盒状（box）模型结构 盒装模型是建立在页面布局的基础上，承载内容和数据的最直接页面基础结构，主要分为容器、标题、内容、底部三个部分。 一个典型的盒装模型效果分为侧栏效果和主栏效果两种风格，统一的HTML结构，通过CSS来控制样式上显示的不同，这一部分在样式层主要讨论。 在首页以及少量特殊页面上，会有额外的风格，但是依然以盒状模型为基础。 [![](http://www.blueidea.com/articleimg/2008/01/5298/09.jpg)](http://www.blueidea.com/articleimg/2008/01/5298/09.jpg "在新窗口打开图片")  
解析如下： ![](http://www.blueidea.com/articleimg/2008/01/5298/10.jpg)  
HTML片段如下： [![](http://www.blueidea.com/articleimg/2008/01/5298/11a.jpg)](http://www.blueidea.com/articleimg/2008/01/5298/11a.jpg "在新窗口打开图片")  
C、包装（pack）模型 对于站内存在的视频、豆单、播客、小组、话题讨论等等，都有既定的统一表现风格，因此在盒装模型以外，单独设立了面向这些常用内容的模型结构，因为是打包处理，所以称之为包装模型。 包装模型基本风格一致，但是在各处的显示略有不同，同时还会涉及在个人主页上自定义样式等，是需要符合全站出处可用的封装模型。  
常见的有： [![](http://www.blueidea.com/articleimg/2008/01/5298/11.jpg)](http://www.blueidea.com/articleimg/2008/01/5298/11.jpg "在新窗口打开图片") 包装模型最重要的变化来自于样式层的处理，其结构本身很简单，就不做解析了，以下是一个视频包的  
HTML片段范例： [![](http://www.blueidea.com/articleimg/2008/01/5298/12.jpg)](http://www.blueidea.com/articleimg/2008/01/5298/12.jpg "在新窗口打开图片")  

3.样式层（Style）
------------

  
**1、全局、模块和页面级**  
a）土豆网的所有页面都应用了全局样式global.css（简写为\_g.css），位于"/skin/g/\_g.css"；该样式文件包含了包括主要布局、导航条、盒状模型、包装模型以及常用工具类； b）所有位于一级导航以及类似风格的页面使用的是公众样式，位于"/skin/public/v.css"；所有内页管理使用的是内页样式，，位于"/skin/my/v.css"； c）所有独立页面使用自己独有的样式文件，命名以页面功能或所在模块为基准； d）页面样式的基本原则是：如果某一特定页面样式的代码超过整个文件的1/3，会被独立成为单个的样式文件。否则，通常会合并在其页面所在的模块中； c）特别少量的样式，可以写在页面HEAH区域，或者写在HTML，并没有特别苛刻的要求，这是出于对当前项目效率的考量。  
举一些例子： -首页 /skin/g/_g.css（全局风格） /skin/public/index.css（公众区域的首页风格）  
-视频首页 /skin/g/_g.css（全局风格） /skin/public/v.css（公众区域的模块风格）  
-我的视频 /skin/g/_g.css（全局风格） /skin/my/v.css（内页管理界面模块风格） /skin/my/clips.css（我的视频页面级风格） /skin/playlist/append.css（分享视频的Toolkit封装）  
-视频播放页面 /skin/video/v.css（重点独立页面，特殊优化，合并了_g.css等样式）  
**2、抽象与实例、继承和重载**  
a）全站级别的继承和重载机制； 因为涉及全局的样式都被封装在Global.css里，如果在模块级或者页面级需要对该样式加以调整，办法是重写相关的类；  
以下示例清晰地展示了一个视频包（Pack）在类的继承和重载的情况： ![](http://www.blueidea.com/articleimg/2008/01/5298/13.jpg) \* 是一个全局样式，规定了所有边距的重置；  
.pack 是一个抽象的包封装，该类记录了所有包的共性，其代码如下。空的类可能会在一些生僻的浏览器上造成意外的问题，但是通常不会，这里书写空类是为了保证在逻辑上的可阅读性。

> .pack { float:left; } .pack ul {} .pack li {list-style:none;} .pack b { font-weight:normal;color:#686868;font-size:11px;font-family:Arial; }

在.pack下，书写了所有包装模型的实力类：.pack\_clip, .pack\_user, .pack\_album, .pack\_list，等等； 以下是视频包和豆单包的例子：

> .pack\_clip { padding:12px 10px; color:#000;width:126px; } .pack\_list { padding:12px 3px; color:#000;width:144px; }

以上类的抽象和继承主要体现在对各自私有部分的派生。以实现代码的精简和复用性。 在一个HTML片段中，调用的方法是：首先应用抽象类或者父类，然后应用实力类或者子类，例如：

> <div class="pack pack_user director"></div>

在这个例子中，director代表豆角，这个类可能书写在某个模块中，也可能在页面级的样式中，对前面的类进一步重写和修正； 修正的时候只需要书写需要被修改或者重置的语句就可以了。  
在上面的示例中，因为页面的需要，模块级别的/skin/public/v.css重写了pack_clip的宽度：

> #programpage .pack_clip{width:167px;}

当父类和抽象类被修改的时候，全站的所有Pack模型都会被修正，但是不影响到子类所做出的私有派生或者复写，也就不会影响某一个特殊页面的独立样式； 关于类、抽象和继承的方法很多，考虑到命名方法和选择符，会有大量不同的处理风格。然而最主要的思想都在各种面向对象的编程书籍中有详细的技巧和说明，这里就不复述了。  
在土豆网的样式中，大量应用了类似的办法和技巧来处理可维护、可扩展和可复用性。  
**TIPS：** 前端开发眼下最好的开发工具是Firebug，很好，很强大； 样式命名很重要，优先考虑以类（class）为基础，轻易不使用标识（ID），标识（ID）通常用于页面级样式所需要的元素，乃至一个细节上最终端的元素； 元素选择符也很重要，".pack_clip ul li a img {}"有着很高的优先权，要慎用； 以上两点归纳起来说就是：尽量降低各种命名和选择符的优先权，越是全局和抽象优先权应该最低，在一个特定的微观元素部分，可以放心使用高优先权来复写；当出现三层甚至五层的集成和复写的时候，这就会显得相当重要，如果不能很好地重写，轻易不要使用important，而是想办法重构父类（的命名和选择符）； 为了处理可扩展性，会稍微增加HTML结构的冗余性，然而从整体上来看，是值得的； 最终管理、处置和使用这些架构的是人。  

4\. 行为层（Behavior）
-----------------

待续

Technorati : [Tudou](http://technorati.com/tag/Tudou), [Web Development](http://technorati.com/tag/Web%20Development), [css](http://technorati.com/tag/css), [div](http://technorati.com/tag/div)