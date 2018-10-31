<?php
$url='http://www.amazon.cn/mn/searchApp?keywords='.$_GET['keywords'];
//$url='http://localhost:8011/html/amazon-list.html?keywords='.$_GET['keywords'];
include_once('../lib/simple_html_dom.php');
$html=file_get_html($url);
//$link=$html->find('div[class=productTitle] a');
$link=$html->find('td[id=search:Td:0] a');
//$name=$html->find('div[class=productTitle] a');
$name=$html->find('td[id=search:Td:0] span[class=srTitle]');
//$author=$html->find('div[class=productTitle] span[class=ptBrand]');
//$press=$html->find('div[class=productTitle] span[class=ptBrand]');

$url_detail=$link[0]->href;

$html_detail=file_get_html($url_detail);
$pic=$html_detail->find('img[id=prodImage]');
$price=$html_detail->find('b[class="priceLarge"]');
$pricevip=$html_detail->find('td[class="vipPriLinPadd"] span[class=price]');
$des=$html_detail->find('div[class=productDescriptionWrapper]');

echo "<p><strong>搜索：</strong><br />".$_GET['keywords']."<p />";
echo "<p><strong>书名：</strong><br />".$name[0]->plaintext."<p />";
echo "<p><strong>作者：</strong><br />".$author[0]->plaintext."<br />";
echo "<p><strong>出版社：</strong><br />".$press[1]->plaintext."<br />";
echo "<p><strong>图片：</strong><br />".$pic[0]->src."<br />";
echo "<p><strong>价格：</strong><br />".$price[0]->plaintext."<br />";
echo "<p><strong>VIP：</strong><br />".$pricevip[0]->plaintext."<br />";
echo "<p><strong>简介：</strong><br />".$des[0]->plaintext."<br />";
?>
