
var wireframe = false;
var movement = true;
var delta = 0,deltaX = 0
var rendertime = 0
var groups = []
var container, stats;
var difference = 0;
var views, scene, renderer;
var mesh, light;
var mouseX = 0, mouseY = 0;
var windowWidth, windowHeight;
var selected = -1;
var rolledover = -1;
var views = [];
var topGlobal = 0;
var introPlayed = false;
var preloader;
var headerHeight = 0;

var viewsNum = 9;

var newWidth;


$(document).ready(function () {
    
     $.ajaxSetup({cache: true});

    FastClick.attach(document.body);

    if (!Detector.webgl) {
        noWebGL();
    }else{
	   preload();
	   selected = Math.floor(Math.random() * 6);
	   
	  
	   setupScene();
	   initPostprocessing();
	   resizePostprocessing();
	   bugGlobals();
	    
	   animate();
	   
	   $('#video-background').remove(); 
    }

    
});



function noWebGL() {
    $('#ascii-background').remove();
    hidePreloader();
    
    $('#video-rock').find('source').attr('src','assets/media/ink.mp4');
    $('#video-rock').load();
    
    $('#video-background').show();
}

window.addEventListener("load",function() {
  setTimeout(function(){
    window.scrollTo(0, 1); // Hide the address bar!
  }, 0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG52YXIgd2lyZWZyYW1lID0gZmFsc2U7XHJcbnZhciBtb3ZlbWVudCA9IHRydWU7XHJcbnZhciBkZWx0YSA9IDAsZGVsdGFYID0gMFxyXG52YXIgcmVuZGVydGltZSA9IDBcclxudmFyIGdyb3VwcyA9IFtdXHJcbnZhciBjb250YWluZXIsIHN0YXRzO1xyXG52YXIgZGlmZmVyZW5jZSA9IDA7XHJcbnZhciB2aWV3cywgc2NlbmUsIHJlbmRlcmVyO1xyXG52YXIgbWVzaCwgbGlnaHQ7XHJcbnZhciBtb3VzZVggPSAwLCBtb3VzZVkgPSAwO1xyXG52YXIgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodDtcclxudmFyIHNlbGVjdGVkID0gLTE7XHJcbnZhciByb2xsZWRvdmVyID0gLTE7XHJcbnZhciB2aWV3cyA9IFtdO1xyXG52YXIgdG9wR2xvYmFsID0gMDtcclxudmFyIGludHJvUGxheWVkID0gZmFsc2U7XHJcbnZhciBwcmVsb2FkZXI7XHJcbnZhciBoZWFkZXJIZWlnaHQgPSAwO1xyXG5cclxudmFyIHZpZXdzTnVtID0gOTtcclxuaWYgKE1PQklMRV9WRVJTSU9OKSB7XHJcbiAgICB2aWV3c051bSA9IDI7XHJcbn1cclxudmFyIG5ld1dpZHRoO1xyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAkLmFqYXhTZXR1cCh7Y2FjaGU6IHRydWV9KTtcclxuXHJcbiAgICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgIGlmICghRGV0ZWN0b3Iud2ViZ2wpIHtcclxuICAgICAgICBub1dlYkdMKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHJlbG9hZCgpO1xyXG4gICAgc2VsZWN0ZWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA2KTtcclxuICAgXHJcbiAgXHJcbiAgICBzZXR1cFNjZW5lKCk7XHJcbiAgICBpbml0UG9zdHByb2Nlc3NpbmcoKTtcclxuICAgIHJlc2l6ZVBvc3Rwcm9jZXNzaW5nKCk7XHJcbiAgICBidWdHbG9iYWxzKCk7XHJcbiAgICBcclxuICAgIGFuaW1hdGUoKTtcclxuICAgIFxyXG4gICAgXHJcbn0pO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBub1dlYkdMKCkge1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9lcnJvclwiO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixmdW5jdGlvbigpIHtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMSk7IC8vIEhpZGUgdGhlIGFkZHJlc3MgYmFyIVxyXG4gIH0sIDApO1xyXG59KTsiXSwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
