// JavaScript Document
<!-- Begin
var ie5=(document.getElementById && document.all);
var ns6=(document.getElementById && !document.all);

nPlus = 10  //the % of fading for each step
speed = 350  //速度

// You don't have to edit below this line
nOpac = 100
function FadeImg(){
    if(document.getElementById){
        document.getElementById('img1').style.visibility="visible";
        imgs = document.getElementById('img2');
	opacity = nOpac+nPlus;
	nOpac = opacity;
	setTimeout('FadeImg()',speed);
    if(opacity>100 || opacity<0){
        nPlus=-nPlus;
    }
    if(ie5){
        imgs.style.filter="alpha(opacity=0)";
	imgs.filters.alpha.opacity = opacity;
    }
    if(ns6){
        imgs.style.MozOpacity = 0 + '%';
	imgs.style.MozOpacity = opacity + '%';
    }
  }
}
onload=FadeImg;
//  End -->
