<!DOCTYPE html>
<html lang="en">
<head>
	<!--[if IE]>
	<meta http-equiv="X-UA-Compatible" content="chrome=1"> 
	<![endif]--> 
	<!-- chrome frame-->
	<meta charset="utf-8" />
	<meta name="description" content="Hey, dude, I'm Avenir, living in Shenzhen, CHINA. A Front-end developer at Tencent, Inc. Meanwhile, as the co-founder of I-Wui Team. You can reach me via twitter or simply drop me an e-mail."/>
	<meta name="keywords" content="web,desgin, web develop, w3c,standards,xhtml,网页设计,网页重构,郑焕义,实习,外包,网站项目,动画,div+css,网页标准"/>
	<link href="author" rel="http://avenirzheng.net/">
	<title><?php echo $this->config->item('lifestream_title')?></title>
	
	<link rel="stylesheet" href="<?php echo $this->config->item('theme_folder')?>css/global.css" media="screen"/>
	
	<!--
	<link rel="stylesheet" href="<?php echo $this->config->item('theme_folder')?>css/mobile.css" media="only screen and (max-device-width: 480px), all and (max-width: 800px) "/>
	<link rel="stylesheet" href="<?php echo $this->config->item('theme_folder')?>css/print.css" media="print"/>
	-->
	<!--[if lt IE 7]>
	<link rel="stylesheet" href="<?php echo $this->config->item('theme_folder')?>css/ltie7.css" />
	<![endif]-->
	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
    <script type="text/javascript" src="<?php echo $this->config->item('theme_folder')?>js/jquery-1.8.3.min.js"></script>
    <!--
    <script type="text/javascript" src="<?php echo $this->config->item('theme_folder')?>js/jquery.lazyload.min.js"></script>
    -->	
	<script type="text/javascript" src="<?php echo $this->config->item('theme_folder')?>js/jquery.tinycarousel.min.js"></script>
    <script type="text/javascript" src="<?php echo $this->config->item('theme_folder')?>js/jquery.xdomainajax.js"></script>	
    <!--
    <script type="text/javascript" charset="utf-8"> 
      $(function() {
         $("img").lazyload({ placeholder : "<?php echo $this->config->item('theme_folder')?>img/loading.gif"})
      });
  	</script> 
  	-->
    <script src="<?php echo $this->config->item('theme_folder')?>js/global.js"></script>
	<script>
    $(document).ready(function(){
        $('#slider').tinycarousel({duration: 500});	
        hoverContent($('#bio'));
        hoverContent($('#portfolio'));
		hoverContent($('#weibo'));
        hoverContent($('#weblog'));
        hoverContent($('#photo'));
		
        //getContent('.log_list a','.post');
        //getContent('.photo_list a','.photo-div');
    });
    </script>
</head>
	