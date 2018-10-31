---
title: '{ Semantic } 从语义开始 – 概念、意义、实践'
url: 1529.html
id: 1529
date: 2009-08-17 23:23:37
tags:
---

09年写的文章，发现一直没在博客里发过，拷回来存档一下:) 随着WEB标准在国内的不断普及，结构表现行为分离、模块化、语义化、优雅退化等概念也成为考核一名前端人员对WEB标准理解的重要条目，其中，由于SEO背后的商业价值影响，“语义化”得到了突出的重视，作为一名刚入门的前端工作者，我也曾单纯地认为，“语义化”便是运用最有利搜索引擎权重的标签组织(x)HTML结构的方法。  
翻看了不少前端书籍和不少前辈的文章，我才开始认识到自己意识的浅薄，慢慢领悟“语义化”的价值。以下内容仅是个人在日常实践中的总结，集合了几个前辈的观点，站在巨人的肩膀之上，以求看得更远。  
  
**什么是“语义化”（Semantic）**  
“语义化”指的是机器在需要更少的人类干预的情况下能够研究和收集信息，让网页能够被机器理解，最终让人类受益。具体而言，借用BI论坛网友通俗的解释，“语义化意思就是不要把你女朋友当做一般的朋友看待”，下面是粗浅的XML形式实例：  
![p1](http://caib.me/wp-content/uploads/2009/08/p1.jpg "p1") ![p2](http://caib.me/wp-content/uploads/2009/08/p2.jpg "p2")  
然而，通过CSS控制，我们很容易就能将“女朋友”展示地跟“朋友”一样，只关注表现层的话，标签视乎只是一个“钩子（hook）”，提供给CSS和JS做处理，那为什么我们还要强调“语义化”呢，下面会详细谈到。  
  
**语义化的意义**  
  
1.       搜索引擎  
  
对于搜索引擎的优化，很多前辈都已经做了丰富的解释，关于Hx的权重，隐藏文本等等，在此便不再班门弄斧，前段时间，一款名为Wolfram（[http://www.wolframalpha.com/](http://www.wolframalpha.com/)）的搜索引擎引起了注意，我们知道，Google会根据对每个网站的PR值排序搜索结果，其他搜索引擎同样有自己独立的算法，而Wolfram则宣称是在“理解”用户输入内容的前提下作出判断，当输入“who is adrian”时，Wolfram给了我这样的反馈，虽然结果并不怎么精确。  
![p10](http://caib.me/wp-content/uploads/2009/08/p10.jpg "p10")  
联系到前端的工作，我们所推崇的“语义化”不就是让计算机读懂我们的内容吗？像这样一个简单的例子<acronym title=" World Wildlife Fund">WWF</acronym>，计算机便能明白WWF值得是World Wildlife Fund，而不是World Water Forum，让计算机完全读懂我们的内容是不现实的，纵使像Wolfram这样搜索引擎也许只是昙花一现，但其所追寻的愿景，Making the world's knowledge computable确值得我们追求。  
  
2.       用户体验  
先举一个例子，下面是当当网上的用户注册表单（[https://login.dangdang.com/Register.aspx](https://login.dangdang.com/Register.aspx)），截取其中的一部分XHTML结构。  
  
![p3](http://caib.me/wp-content/uploads/2009/08/p3.jpg "p3") ![p4](http://caib.me/wp-content/uploads/2009/08/p4.jpg "p4")  
  
我们来实验一下将其中的<span>设置昵称：</span>改为<label for="txtNickName">设置昵称：</label>会产生什么变化。  
![p5](http://caib.me/wp-content/uploads/2009/08/p5.jpg "p5")  
  
当鼠标点击“设置昵称”时，会自动使ID名为“txtNickName”的文本输入框获得焦点，label标签本身的定义便是向控件定义标注（标记）（[http://www.w3school.com.cn/tags/tag_label.asp](http://www.w3school.com.cn/tags/tag_label.asp)），各主流浏览器对labe的支持也是基本一致的，浏览器的表单控件本身就是非常成熟的交互控件，经CCS森林群里某大侠测试，label标签对声控操作也是具有非常良好的体验。   
同样是当当网，首页上的产品列表，还是其中的一小块XHTML代码  
![p6](http://caib.me/wp-content/uploads/2009/08/p6.jpg "p6")  
![](http://bbs.blueidea.com/attachment.php?aid=125072&k=e38b9dab777c5a3c84ac37156e573e44&t=1310743377&noupdate=yes)  
截取的是价格部分的代码，暂且不论class的命名，我们来实验一下如果将<span>￥94.00 </span>改成<del date=”” cite=””>￥94.00 </del> <ins>￥46.00</ins>，视觉上是没有任何变化的，但当我们裸奔一下页面。  
![p8](http://caib.me/wp-content/uploads/2009/08/p8.jpg "p8")![p9](http://caib.me/wp-content/uploads/2009/08/p9.jpg "p9")  
结果就显然易见了，作为前端工作者，我们也需要考虑到用户的网速可能过慢（也许他正在用迅雷BT呢）导致无法加载CSS的情况，还有手机用户的情况，选择合适的标签成本很低，只要补充点HTML的基础知识就可以了，另外date属性和cite属性都是非常有用的，试下把内容拷进WORD 2007中。  
同样还有abbr标签和img标签的alt属性对于屏幕阅读器的重要性，因条件不允许，所以无法亲身体验，在岸的另一边都已经有Section 508这样的东西保护残疾人不被gov网站鄙视了。  
  
3.       开发效率  
富含语义的网页结构对前期开发和后期修补bug都有显著作用，具体而言，像下面一段简单的产品列表代码。  
![p14](http://caib.me/wp-content/uploads/2009/08/p14-300x41.jpg "p14")  
通过“语义化”的标签，丰富了产品列表内的“钩子（hook）”，通过在父层添加id和class命名，便能控制产品列表内的全局表现，对于样式的修改，在理想状态下能避免通过后台开发人员改变网页结构的情况，节省人力成本，但回归现实情况，面对产品和老板的各种需求，想完全通过只修改CSS便能改变样式还是不现实的，面对大大小小的需求和bug，最好的方式还是在前期开发阶段为页面合理地预留“钩子”，方便后期修改使用，此时丰富的语义标签就显得相当实用了。  
对团队协作而言，充满语义的ID、Class命名能让团队里的所有人员对结构一目了然，试想一个class为red的标签因为需求的改变而换成蓝色，就能理解为什么要语义命名了。  
在过去对栅格化和框架的讨论中，引出了关于命名规范思考，以下只是对命名方式的讨论，并不包含其他因素的影响，最近接触到一套完善的布局规范，我想，大部分人刚接触时，都跟我一样，对这种命名感觉到头晕“area\_01” “layout\_01”等，因为从来没有经历过像现在团队所接手项目的庞大规模，所以说不准这种方式到底是否合适，但有一方面是可以肯定的，这确实是增加了新人的学习成本，而对于未来的开发，我认为这种方式也是可取的，毕竟从长远看，它目的也旨意为了提高团队中的开发效率和减少冲突，我想，像YUI 、Blueprint、960 Grid System也是这样应运而生的吧，这只是个人的臆想，希望未来能得到佐证。  
![stylesheet2 (1)](http://caib.me/wp-content/uploads/2009/08/stylesheet2-1.png "stylesheet2 (1)")  
  
  
4.       行业标准  
一千个人有一千个哈姆雷特，同样，一千个前端也能写出一千个表现一致但结构不同的页面，这正是页面重构中的现状，通过CSS我们能随意地摆弄页面的所有元素，但最基本的HTML结构却鲜有人关注，一方面原因是HTML标签语义上的不足， HTML5新增的标签在一定程度上解决了这部分问题，而进一步的原因，我想，还是前端工作者对HTML基础的漠视，像鬼哥所说的，“外行看门道，内行看热闹”，“如果你想在这个行业内有所建树，专业化是必须的。也就是说如果你不考虑自己的发展，也就不用讨论“语义化”的问题了。”   
“语义化”的目标在于实现统一标准，未来的互联网“一定是开放的互联网，不会像现在这样数据无法畅通无阻，存在大量的信息孤岛和信息盲点”，微格式正是一个很好的实践，开放的接口，共享的内容，下面会详细谈到。  
  
**语义化实践**  
在上面的内容中，已经穿插了大部分实践的内容，在此做总结性的介绍。  
  
1.       文档结构  
“语义化”最简单地还是从结构开始，选用最符合内容意义的标签，重新温习《HTML和XHTML权威指南》，多推敲内容的意义而不是仅仅根据页面效果图做出判断。很多时候，我们都会面临这样一个境地，看试简单的一个效果，为了追求语义的合理，偏要选择并不那么容易实现的方案，不是折腾自己么？我想，这也是一个前端工作者对WEB标准的良知和对工作的感悟吧，如何平衡取舍，也是一门学问，realazy有非常深刻的理解（[http://realazy.org/blog/2009/06/29/engineer-vs-scientist/](http://realazy.org/blog/2009/06/29/engineer-vs-scientist/)）。  
在前期制作阶段，也可以多考虑未来情况，根据内容语义，为页面预留钩子。当然具体问题具体分析，根据项目的要求不同，采取的开发应该灵活适应，例如，对于宣传专题页面，由于后期调整的需求并不大，在满足可用性、可访问性的基本前提之下，应采用快速开发模式，把主要精力集中在还原设计稿效果之上，而对于大型网站效果，要求就显然不一样了。  
  
2．命名规则  
对于ID和Class的规范的命名方案，网上时有出现，总体的原则还是根据内容的意义来做命名，语义化的命名优势显而易见，借用网上的一幅图。 ![sem_vs_struct](http://caib.me/wp-content/uploads/2009/08/sem_vs_struct.png "sem_vs_struct") ![sem_vs_struct2](http://caib.me/wp-content/uploads/2009/08/sem_vs_struct2.png "sem_vs_struct2")  
  
若要改变侧栏的位置，只需修改CSS即可，无需改动网页结构，对于经常出现的页面模块，个人推荐在开发过程中逐渐形成自己的命名规范，如header/footer/main/hd/bd/nav/box/mode等，使用连字符“-”或驼峰法形成更为复杂命名，如site-nav/quick-menu/secondaryContent/。  
但回到具体情况，不同的项目也应该根据具体情况对命名方式作出选择，不同方式的命名规则应该结合使用，大型网站，如淘宝，更适合使用栅格化和语义命名结合的方式，对于页面的样式修改，能快速敏捷地做出相应调整，对于制作，能快速地拼凑，而大部分宣称型的单页，个人更推荐使用结构化得命名方式，页面制作者能方便快速地完成页面，而不用多把时间陷近命名的考虑中，  
  
3.       微格式  
微格式（Microformat）是在标准 XHTML 代码中嵌入结构化数据的一种新方法，简单的说，就是通过一套已定的Class命名标准，来申明文档中的内容。大多数人了解的微格式都是从hCard开始， 以下是一段是简单的hCard实例（[http://www.oppenheim.com.au/](http://www.oppenheim.com.au/)），这是James Oppenheim应用到页脚的hCard。  
![p11](http://caib.me/wp-content/uploads/2009/08/p11.jpg "p11")  
其中，vcard url fn given-name given-name  adr locality region类名都是为了格式化微格式而产生的，大家也应该注意到，为了添加Class名，添加了数个span标签。那微格式的意义又在于什么地方呢？通过Firefox的Operator插件，我将自己的名片从简历中导出（[http://adriancheng.name/resume.html](http://adriancheng.name/resume.html)）  
![p12](http://caib.me/wp-content/uploads/2009/08/p12.jpg "p12")  
  
导出的vcf我可以随意导入到各个邮件客户端作为联系人信息，或者导入到手机内的通讯录（[http://tommyfan.com/blog/skill/add\_phone\_from_hcard/](http://tommyfan.com/blog/skill/add_phone_from_hcard/)），可见通过微格式的标准，可以方便于各种不同的用户端来处理网页中的数据，此时的微格式扮演的角色也类似于网页中的API，当然微格式有更恢弘的愿景，关于其他格式标准，可以浏览[http://microformats.org/](http://microformats.org/) 了解详细。  
  
**结语**  
“语义化”的实践非常简单，可以说是前端最基础的部分，但由于种种原因，或被误解，或被忽视，没有得到应有的重视，写这篇文章，旨在梳理自己过去一个阶段的学习积累，希望能带给所有读者对WEB标准的一点思考。  
  
  
参考文章：  
1.       Saturn：语义化：未来搜索引擎的发展方向  [http://www.cnsaturn.com/logs/2009/05/18/search-engine-semantic](http://www.cnsaturn.com/logs/2009/05/18/search-engine-semantic)  
2.       Ghost：页面重构中的语义化 [http://www.cssforest.org/blog/index.php?id=139](http://www.cssforest.org/blog/index.php?id=139)  
3.       Jack D Herrington 使用 microformats 分离数据与格式 [http://www.ibm.com/developerwork ... &S_CMP=08-w-cto](http://www.ibm.com/developerworks/cn/xml/x-microformats/index.html?S_TACT=105AGX52&S_CMP=08-w-cto)  
  
  
ps:文章本来是想投稿到团队杂志的，不过夭折了，有什么不对的地方，希望大家能指出，一起讨论。