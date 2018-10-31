/**  
 * @author Zhongjin.Chai  
 *   
 * this js is used to fix IE6 not support css style position:fixed bug,  
 * it will not take effect in IE7 or FF, please set div style "postion:fixed;" directly.  
 *   
 * el is the element position fixed  
 * top is the element initialized value of top(unit is px)  
 * left is the element initialized value of left  
 *   
 * demo: position_fixed(document.getElementById("div1"), 170);  
*/  
function position_fixed(el, eltop, elleft){   
    // check is IE6   
    if(!window.XMLHttpRequest)   
    window.onscroll = function(){   
        el.style.top = (document.documentElement.scrollTop + eltop)+"px";   
        el.style.left = (document.documentElement.scrollLeft + elleft)+"px";   
    }   
    else el.style.position = "fixed";   
}  
