<?php
$url='http://www.amazon.cn/mn/searchApp?keywords='.$_GET['keywords'];
include_once('lib/simple_html_dom.php');
$html=file_get_html($url);
$title=$html->find('title');
$link=$html->find('div[class=productTitle] a');

echo $title[0]->plaintext;
echo $link[0]->href;
?>
<?php
echo $_GET['keywords'];
?>
