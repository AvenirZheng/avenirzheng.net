<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>������<?php echo $_GET['key'] ?></title>
</head>
<?php
include_once('../lib/simple_html_dom.php');

$url='http://search.dangdang.com/search_pub.php?key='.$_GET['key'];
$html=file_get_html($url);
$name=$html->find('ul[class=tiplist] li[class=maintitle] a');
$author=$html->find('ul[class=tiplist] li[class=publicer_info]');
$press=$html->find('ul[class=tiplist] li[class=publicer_info] a[name=Publishing]');
$price=$html->find('ul[class=tiplist] div[class=panel price] span[class=price_m] span');
$price_dang=$html->find('ul[class=tiplist] div[class=panel price] span[class=price_d] span');
$pic_list=$html->find('div[class=listitem pic] img');
//dangdang-detail
//$url=$name[0]->href;
//$html=file_get_html($url);
//$pic_detail=$html->find('div[class=show book] img');
//$pic_open=$html->find('div[class=show book] a');
//dangdang-open
//$url="http://product.dangdang.com/".$pic_open[0]->href;
//$html=file_get_html($url);
//$pic_large=$html->find('div[class=pic] img');

//amazon
//$url='http://www.amazon.cn/mn/searchApp?keywords='.$_GET['key'];
//$html=file_get_html($url);
//echo $html;
//$link=$html->find('td[id=search:Td:0] a');
//amazon-detail
//$url=$link[0]->href;
//echo $url;
//$html=file_get_html($url);
//$price_amazon=$html->find('b[class="priceLarge"]');
//$price_vip=$html->find('td[class="vipPriLinPadd"] span[class=price]');
//$des=$html->find('span[id=content]');

echo "<p><strong>������</strong><br />".$_GET['key']."<p />";
echo "<p><strong>������</strong><br />".$name[0]->plaintext."<p />";
echo "<p><strong>���ߣ�</strong><br />".$author[0]->plaintext."<br />";
echo "<p><strong>�����磺</strong><br />".$press[1]->plaintext."<br />";
echo "<p><strong>С/��/��ͼ l/b/e��</strong><br />".$pic_list[0]->src."<br />";
//echo "<p><strong>��ͼ��</strong><br />".$pic_detail[0]->src."<br />";
//echo "<p><strong>��ͼ��</strong><br />".$pic_large[0]->src."<br />";
echo "<p><strong>���ۣ�</strong><br />".$price[0]->plaintext."<br />";
echo "<p><strong>�����ۣ�</strong><br />".$price_dang[0]->plaintext."<br />";
echo "<p><strong>Amazon�ۣ�</strong><br />".$price_amazon[0]->plaintext."<br />";
echo "<p><strong>fishVIP�ۣ�</strong><br />".$price_vip[0]->plaintext."<br />";
echo "<p><strong>��飺</strong><br />".$des[0]->plaintext."<br />";
?>
<body>
</body>
</html>
