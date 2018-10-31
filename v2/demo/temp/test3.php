<?php
$url='http://www.amazon.cn/mn/detailApp/ref=sr_1_1?_encoding=UTF8&s=books&qid=1285500604&asin=B003IURKAM&sr=1-1';
include_once('lib/simple_html_dom.php');
$html=file_get_html($url);
$name=$html->find('span[id=btAsinTitle]');
$author=$html->find('div[class=buying] a');
$pic=$html->find('img[id=prodImage]');
$price=$html->find('b[class="priceLarge"]');
$pricevip=$html->find('td[class="vipPriLinPadd"] span[class=price]');
$des=$html->find('div[class=productDescriptionWrapper]');
echo "<p><strong>书名：</strong><br />".$name[0]->plaintext."<p />";
echo "<p><strong>作者：</strong><br />".$author[0]->plaintext."<br />";
echo "<p><strong>图片：</strong><br />".$pic[0]->src."<br />";
echo "<p><strong>价格：</strong><br />".$price[0]->plaintext."<br />";
echo "<p><strong>VIP：</strong><br />".$pricevip[0]->plaintext."<br />";
echo "<p><strong>简介：</strong><br />".$des[0]->plaintext."<br />";
?>
