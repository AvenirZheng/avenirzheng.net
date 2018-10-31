---
title: '{ hide_text } CSS文字隐藏总结报告'
url: 1346.html
id: 1346
date: 2010-04-26 09:57:28
tags:
---

[![hide_text](http://caib.me/wp-content/uploads/2010/04/hide_text_thumb.jpg "hide_text")](http://caib.me/wp-content/uploads/2010/04/hide_text.jpg) 最近整理的一份CSS文字隐藏的demo，总结了几种方法，希望得出一种最完美的方案放进自己的代码片段，可是，到最后却陷入一种重复不断地推翻结论的境地。因为需要考虑的应用场景和元素实在太多，放下浏览器不谈，不同的应用终端，不同的标签结构会有不一样的最优方案，因此，与其希望在工作上多“偷一些懒”，不如平常多巩固积累基础的知识，在需要权衡的时候，便能更加得心应手。  因为自己经验尚浅，demo部分难免会有错漏情况，如发现问题，望大家能指出。 [方法列表](http://demo.adriancheng.name/css_demo/hide/) [demo](http://demo.adriancheng.name/css_demo/hide/demo.html)

1.  毫无保留：**display:none**
    ---------------------
    
    *   ### 代码片段：
        
        #### (x)HTML
        
        \[xml\] <p class="hide_display">我是打酱油的文本</p> \[/xml\]
        
        #### CSS
        
        \[css\] /* 暴力隐藏 */ .hide_display{display:none;} \[/css\]
    *   ### 兼容性：
        
        浏览器兼容性
        
        CHROME
        
        FIREFOX
        
        OPERA
        
        SAFARI
        
        IE
        
        版本
        
        5
        
        3.6
        
        10.10
        
        4
        
        6
        
        7
        
        8
        
        支持情况
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
    *   ### 优点：
        
        1.  方便、快捷
        2.  兼容性好
    *   ### 缺点：
        
        1.  屏幕阅读器无法阅读
        2.  超链接不适用
        3.  图片替代文本需要其他标签的背景
        4.  影响搜索排名
        5.  大量使用容易被认为是SEO作弊
2.  折中选择：**overflow:hidden/position:absolute/visibility:hidden**
    ------------------------------------------------------------
    
    *   ### 代码片段：
        
        #### (x)HTML
        
        \[xml\] <span class="hide\_overflow">我是一号打酱油的文本</span> <p class="hide\_position">我是二号打酱油的文本</p> <p class="hide_visibility">我是三号打酱油的文本</p> \[/xml\]
        
        #### CSS
        
        \[css\] /* 隐藏元素，脱离文本流，使元素不影响其他元素 */ .hide\_overflow{ height:0px; overflow:hidden; display:block;/* 行内元素需要 */ float:left; /* 脱离文档流 或者position:absolute;*/ } /* 定位在可视范围外，脱离文本流，使元素不影响其他元素 */ .hide\_position{ position:absolute; left:-32767px; } /* 原理与.hide\_position一样*/ .hide\_visibility{ visibility:hidden; position:absolute; /* 脱离文档流 */ margin-left:-32767px; } \[/css\]
    *   ### 兼容性：
        
        浏览器兼容性
        
        CHROME
        
        FIREFOX
        
        OPERA
        
        SAFARI
        
        IE
        
        版本
        
        5
        
        3.6
        
        10.10
        
        4
        
        6
        
        7
        
        8
        
        支持情况
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
    *   ### 优点：
        
        1.  方便、快捷
        2.  不希望屏幕阅读器读取的内容可以使用visibility
    *   ### 缺点：
        
        1.  超链接不适用
        2.  图片替代文本需要其他标签的背景
        3.  overflow:hidden;被认为有害体验
3.  体验损失：**text-indent负值**
    ----------------------
    
    *   ### 代码片段：
        
        #### (x)HTML
        
        \[xml\] <p class="hide\_tex"><a href="#">我是打酱油的超链接一号</a></p> <a class="hide\_tex\_span" href="#"><span>我是打酱油的超链接二号</span></a> <!--全英文字符在IE下不能被隐藏 --> <input class="hide\_tex\_input" type="submit" /> <input class="hide\_tex\_input" type="submit" /> <button class="hide\_tex_input">我是打酱油的文本btn</button> \[/xml\]
        
        #### CSS
        
        \[css\] .hide\_tex a, .hide\_tex\_span{ text-indent:-32767px; display:block; /* text-indent适用块状元素中行内元素和文本节点 */ /* 演示需要 */ width:200px; height:20px; margin-left:300px; background-color:#ccc; /* outline:none; 不建议隐藏outline，键盘流选手无法操作 */ } .hide\_tex_input{ text-indent:-32767px; width:200px; height:50px; display:block; } \[/css\]
    *   ### 兼容性：
        
        浏览器兼容性
        
        CHROME
        
        FIREFOX
        
        OPERA
        
        SAFARI
        
        IE
        
        版本
        
        5
        
        3.6
        
        10.10
        
        4
        
        6
        
        7
        
        8
        
        支持情况
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
    *   ### 优点：
        
        1.  适用超链接的图片替代
    *   ### 缺点：
        
        1.  FF的虚边问题
        2.  text-indent容易产生bug
4.  牛皮癣：**font-size设零**
    -------------------
    
    *   ### 代码片段：
        
        #### (x)HTML
        
        \[xml\] <p class="hide\_fs">我是擦不掉牛皮癣</p> <button class="hide\_fs">我是打酱油的文本btn</button> <input class="hide_fs" type="submit" /> \[/xml\]
        
        #### CSS
        
        \[css\] .hide_fs{ font-size:0; } \[/css\]
    *   ### 兼容性：
        
        浏览器兼容性
        
        CHROME
        
        FIREFOX
        
        OPERA
        
        SAFARI
        
        IE
        
        版本
        
        5
        
        3.6
        
        10.10
        
        4
        
        6
        
        7
        
        8
        
        支持情况
        
        N
        
        Y
        
        Y
        
        N
        
        N
        
        N
        
        N
        
    *   ### 优点：
        
        1.  方便、快捷
    *   ### 缺点：
        
        1.  浏览器表现不一致，ie,safari有最小字号，chrome最小12px，ff不显示文本
        2.  适用环境少
5.  强强联合：**line-height三倍**
    ----------------------
    
    *   ### 代码片段：
        
        #### (x)HTML
        
        \[xml\] <p class="hide\_lh"><a href="#">目前为止被正常人类普遍接受的疑似最完美隐藏文字方案，传说是tommy发明的</a></p> <!-- line-height在ff3.6的button无法隐藏文本，需要配合其他方式 --> <button class="hide\_lh\_btn">我是打酱油的文本btn</button> <!-- line-height在ff3.6、opera的input无法隐藏文本，需要配合其他方式 --> <input class="hide\_lh\_btn" type="submit" /> <!-- 目前比较完善的方案 --> <input class="hide\_lh\_btn\_final" type="submit" /> \[/xml\]
        
        #### CSS
        
        \[css\] /* 设定高度，利用行高将文本撑到容器可视范围外 */ .hide\_lh a, .hide\_lh\_btn{ width:200px; height:20px; overflow:hidden; line-height: 60px;/* 行高最好设3倍或以上，chrome容易后漏 */ display:block;/* 行内元素需要 */ /* 演示需要 */ background-color:#ccc; margin-left:300px; } .hide\_lh\_btn\_final{ width:200px; height:20px; overflow:hidden; line-height:60px; display:block; font-size:0px; /* opera和ff支持 */ } \[/css\]
    *   ### 兼容性：
        
        浏览器兼容性
        
        CHROME
        
        FIREFOX
        
        OPERA
        
        SAFARI
        
        IE
        
        版本
        
        5
        
        3.6
        
        10.10
        
        4
        
        6
        
        7
        
        8
        
        支持情况
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
    *   ### 优点：
        
        1.  兼容性好
        2.  超链接和图片替代文本可用
    *   ### 缺点：
        
        1.  使用限制较大，需要定宽高
6.  多一丁点：**前置背景遮挡**
    ---------------
    
    *   ### 代码片段：
        
        #### (x)HTML
        
        \[xml\] <!-- 在css无效和css有效图片无效都适用 --> <a class="hide\_bg" href="#"><span class="front\_bg"></span>我是可访问性的化身</a> \[/xml\]
        
        #### CSS
        
        \[css\] .hide\_bg{ width:200px; height:20px; position:relative; display:block;/* 行内元素需要 */ } .hide\_bg .front\_bg{ background:url('bg\_text.png') no-repeat; /* 背景内容等于或大于容器大小 */ position:absolute; /* 绝对定位，不影响文本 */ left:0px; top:0px; width:200px;/* 与父元素等宽高 */ height:20px; display:block; /* cursor:pointer; ie6和链接需要用 */ } \[/css\]
    *   ### 兼容性：
        
        浏览器兼容性
        
        CHROME
        
        FIREFOX
        
        OPERA
        
        SAFARI
        
        IE
        
        版本
        
        5
        
        3.6
        
        10.10
        
        4
        
        6
        
        7
        
        8
        
        支持情况
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
        Y
        
    *   ### 优点：
        
        1.  兼容性好
        2.  超链接和图片替代文本可用
        3.  可访问性强
    *   ### 缺点：
        
        1.  使用限制较大，需要定宽高
        2.  代码冗余，需要空标签
7.  另辟蹊径：**content:""**
    -------------------
    
    *   ### 代码片段：
        
        #### (x)HTML
        
        \[xml\] <!--只有opera支持，按定义只能用在:before 和:after--> <a class="hide_ct" href="#">也许我才是最合适的，谁知道呢，内容表现分离。只有opera支持</a> \[/xml\]
        
        #### CSS
        
        \[css\] .hide_ct{ content:&quot;&quot;; } \[/css\]
    *   ### 兼容性：
        
        浏览器兼容性
        
        CHROME
        
        FIREFOX
        
        OPERA
        
        SAFARI
        
        IE
        
        版本
        
        5
        
        3.6
        
        10.10
        
        4
        
        6
        
        7
        
        8
        
        支持情况
        
        N
        
        N
        
        Y
        
        N
        
        N
        
        N
        
        N
        
    *   ### 优点：
        
        1.  简单
    *   ### 缺点：
        
        1.  内容样式分离
        2.  不实用