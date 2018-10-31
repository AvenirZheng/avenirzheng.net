---
title: '{ Front-end } 改变世界的Web前端开发'
url: 850.html
id: 850
date: 2009-01-20 02:45:56
tags:
---

![front-end](http://cai13.info/blog_pic/2009/01/frontend1.jpg "front-end") 2008年，前端的关键词JS library(Jquery, Mootools)、CSS Frameworks、die of IE6、AIR、 Sliverlight、960 Grid等等。 而2009年，CSS3和HTML5能否再现曙光，Mobile Web Development和浏览器的群雄角逐同样值得期待。 文章转载至[lifesinger](http://lifesinger.org/blog/?p=956)。  乔布斯说：“活着就是为了改变世界，难道还有其它原因吗？” 2008年，在Web前端开发界，无论国外还是国内，都发生了不少事情，有哪些是改变世界或即将改变世界的大事件呢？

JavaScript游戏
------------

2 008年4月9日，Dion Almaer发现了一款非常经典的JavaScript游戏：Super Mario. 这款游戏由Jacob Seidelin开发，大小仅14k. ![mario](http://lifesinger.org/blog/wp-content/uploads/2009/01/mario.png "mario") (Super Mario JavaScript版本： [http://jsmario.com.ar](http://jsmario.com.ar)/) 不少Web开发者们大跌眼镜：这真的是用JavaScript开发出来的？答案是肯定的。这款游戏利用了Canvas元素（IE中用HTML模拟），图像存储在加密的字符串中，还用base64存储了MIDI背景音乐。除了这些技巧，其它代码就是我们熟悉的HTML、CSS和JavaScript. Super Mario JavaScript版本的横空出世（之前也出现过用JavaScript写的游戏，但没有像Super Mario一样引起大家的关注），激起了一股用JavaScript编写游戏的热潮： 许多经典的游戏都有了JavaScript版本：Pac-Man（经典的吃豆子游戏）， Space Invaders（太空入侵者），Spacius（百玩不厌的雷电）等等。 甚至还出现了一些比较复杂的角色扮演游戏：Andrew Wooldridge创造的Tombs of Asciiroth 和 CanvasQuest，Pierre Chassaing创造的ProtoRPG等。 伴随JavaScript游戏的热潮，还出现了不少专门用于游戏开发的JavaScript库。最突出的是GameJS（基于Canvas的一个2D游戏开发库） 和 GameQuery（这是jQuery的一个插件）。 除了用Canvas构建2D游戏，用JavaScript还可以构建3D游戏，还出现了非常出色的[Processing.js](http://dev.jquery.com/~john/processing.js/)，以及[JavaScript PlotTool](http://www.jslab.dk/plottool.htm)绘图工具等等。 _感慨：_JavaScript游戏一段时间内将还只是开发者们的“玩物”，要真正转换为商业应用，可能还有一段漫长的路要走。但是，**当Super Mario跳跃在Web网页上时，这昭示着JavaScript的时代已经到来了**。JavaScript能做什么？2008年的答案是：JavaScript连游戏都能做！

大放异彩的jQuery
-----------

2008年，无论对于jQuery的作者John Resig还是jQuery库本身来说，都是非常棒的一年。jQuery首页上有一行很明显的加粗文字：

> jQuery is designed to change the way that you write JavaScript. jQuery设计成可以改变你书写JavaScript的方式。

jQuery用数据和事实证明了它的魅力。一定程度上，甚至可以毫不夸张地说：jQuery改变了Web前端开发界。下面是用Google Trends统计的常用JavaScript库在2008年的搜索量曲线图： ![jslib_trend](http://lifesinger.org/blog/wp-content/uploads/2009/01/jslib_trend.png "jslib_trend") 2008年9月份，jQuery团队战绩斐然：Microsoft和Nokia正式将jQuery集成进他们的应用程序开发平台。此外，Google的部分应用里，也早就采纳了jQuery. 从jQuery的首页上还可以看出，DELL, Bank of America, Digg, Technorati, Mozzila等站点都在使用jQuery. 当然，除了jQuery，其它JavaScript在2008年也都有可圈可点的发展。YUI3的Preview版本，是我见过的最具有发展潜力的框架。ExtJS在国内的普及也非常迅猛，JavaEye社区里，ExtJS一定程度上成了Ajax的代名词，各种有关ExtJS的技术文章和书籍非常多（遗憾的是书籍的质量不高）。Prototype不温不火。Mootools则在低调中用其优雅的代码吸引了不少忠实用户。 _感慨：_上面提到的每个JavaScript库都是非常优秀的，掌握任何一个，对于我们的日常工作来说，都绰绰有余了。只是对于2008年来说，jQuery的表现太突出了，连我这个天天工作用YUI的人，在2008年，都不得不为jQuery鼓掌，为John Resig喝彩！各种JavaScript库的争奇斗艳，这是JavaScript时代已经到来的另一个标志。

蹒跚起步的网页工业化
----------

2008年，如果你是一名Web前端开发工程师，却没有听说过“栅格”两个字，那你一定是工作太忙太专心了。2008年10月份，在淘宝UED博客，出现了一篇“[960的秘密](http://lifesinger.org/blog/?p=375)”，揭开了网页栅格系统在国内的研究小热潮。 ![grid](http://lifesinger.org/blog/wp-content/uploads/2009/01/grid.png "grid") 伴随着栅格系统的争论，国内的前端技术博客里还出现不少对CSS框架和布局的探讨。这一切，所要解决的是以下两个问题：

1.  **网页的规范性**。随着站点的成长，页面会以几何级数的速度增加。面对成千上万个网页，如何保持风格的一致性是一个不小的挑战。
2.  **网页的工业化产出**。在遵守规范和保证质量的基础上，如何让页面制作容易，如何让运营人员能批量制造页面，这是目前许多大型站点面临的另一个问题。

国内站点中，淘宝、百度有啊、网易等站点的已逐步采用栅格系统。淘宝的首页和频道目前已经全部栅格化，同时尝试性开发了TMS（模板管理系统）来解决网页的工业化产出问题。 _感慨：_网页的高质量工业化产出，在国内很多公司才刚起步。2009年，我相信工业化将依旧是Web前端开发界的关键词。

这些也很出色
------

1.  **渐进增强**。2008年10月份，Aaron Gustafson在ALA网站上发表了一系列有关渐进增强的文章，探讨的核心问题是：JavaScript应该做什么以及Web前端开发的技术流程。JavaScript游戏让我们看到了JavaScript的魔力，Aaron提醒我们不能滥用JavaScript，我们要仔细考虑JavaScript的使用场景。可用性，无侵入性，可访问性等等，这些理念是每一个前端开发工程师需要好好思考的。
2.  **D2（前端技术论坛）**。 2008年，在北京和上海分别举办了两届D2，这是国内前端开发工程师们的两场盛会。前端工程师，这个新生的职位逐步被国内各大公司接受。D2的意义在于，我们聚集在一起，发出了自己的声音！
3.  **Google Chrome的诞生**。 2008年，Chrome， JS V8引擎，Google迫使各大浏览器厂商开始比拼JavaScript引擎速度，这是JavaScript时代已经到来的另一个标志。Google和Mozzila的努力，在年末的时候带来鼓舞人心的统计结果：IE的使用率跌破70%. 万恶的IE6，早点灭亡吧。2009年，Google的号角和淘宝网即将掀起的 NO IE6 活动，将加速IE6的灭亡

作者：[lifesinger](http://lifesinger.org/blog/) 原文：[http://lifesinger.org/blog/?p=956](http://lifesinger.org/blog/?p=956)