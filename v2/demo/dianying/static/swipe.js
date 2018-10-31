// JavaScript Document
/**
 * swipe.js - JavaScript to swipe navigation
 */
(function($, window, document, undefined){

var
    // the usual suspects
    round = window.Math.round,
	status= 'ture',
    // page state
    offset = 0,
    startX = null,
    startY = null,
	sectionNum = 6,
    
    // trigger type
    trigger = null,
    
    // cached jQuery resultsets
    $wrapper = $('.moives_warp'),
    $content = $wrapper.find('.moives_list'),
	$contentHtml = $wrapper.innerHTML,
    $sections = $content.find('li'),
	$link = $sections.find('a'),
    
    // minimum offset
    minoffset = -100 * ($sections.length - 1);

/**
 * find the position of an event
 */
function position(event) {
    
    var
        touch,
        x,
        y;

    if (event.touches && event.touches.length) {
        touch = event.touches[0];
        x = touch.pageX;
        y = touch.pageY;
    } else if (event.changedTouches && event.changedTouches.length) {
        touch = event.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
    } else if (event.pageX !== undefined && event.pageY !== undefined) {
        x = event.pageX;
        y = event.pageY;
    } else if (event.clientX !== undefined && event.clientY !== undefined) {
        x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    
    return { x: x, y: y };
}

/**
 * handler for the initial interaction
 */
function contact(event) {
	var status=false;
    // set up trigger type
    if (!trigger) {
        trigger = event.type;
    }
    
    // only interact with triggered events
    if (trigger === event.type) {
        
        event.preventDefault();
        // record the starting position
        var pos = position(event);
        startX = pos.x;
        startY = pos.y;
        
        // stop the content from animating
        $content.stop();
        
    }
    
}

/**
 * handler for the intermediate action
 */
function move(event) {
    // only interact if after contact
    if (startX !== null && startY !== null) {
    
        event.preventDefault();

        // calculate the new offset    
        var
            
            pos = position(event),
            width = $(document).width(),
            delta = 100 * (pos.x - startX) / width,
            newoffset = offset + delta;
			
		if(delta<10&&delta>-10){
			return	
		}
        // bound by high and low values
        if (newoffset > 0) {
            newoffset = 0;
        }
        if (newoffset < minoffset) {
            newoffset = minoffset;
        }
       
        // move content
        $content.css('left', newoffset + '%');
		status= false;
    }

}

/**
 * handler for the release
 */
function release(event) {
    
    // only interact if after contact
    if (startX !== null && startY !== null) {
        
        // calculate delta
        var
            
            pos = position(event),
            width = $(document).width(),
            delta =100 * (pos.x - startX) / width,
            newoffset = offset+delta;
            
        // reset offset, bounded by high and low values
		if(delta<10&&delta>-10){
			startX = null;
       		startY = null;
			status= 'ture';
			return	
		}
        if (newoffset > 0) {
            newoffset = 0;
        }
        if (newoffset < minoffset) {
            newoffset = minoffset;
        }
        offset = newoffset;
        
        // animate towards offset
        $content.animate({
            left: offset + '%'
        }, 'slow');
        // reset markers and state
        startX = null;
        startY = null;
		status= false;
    }
    
}

/**
 * preventDefault implementation for IE
 */
function preventDefault() {
    this.returnValue = false;
}

/**
 * addEvent - I'd rather not, but jQuery seems to drop 'touches' :/
 * Note: This is my own take on a currying addEvent implementation.
 */
function addEvent(elem) {
    function bind(type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            function callback() {
                var e = window.event;
                e.preventDefault = preventDefault;
                return handler.call(elem, e);
            }
            function remove(){
                elem.detachEvent("on" + type, callback);
                window.detachEvent("onunload", remove);
            }
            elem.attachEvent("on" + type, callback);
            window.attachEvent("onunload", remove);
        }
        return bind;
    }
    return bind;
}

// bind handlers

addEvent($wrapper[0])
    ('mousedown', contact)
    ('touchstart', contact)
    ('MozTouchDown', contact)
    ('mousemove', move)
    ('touchmove', move)
    ('MozTouchMove', move);
addEvent(document)
    ('mouseup', release)
    ('touchend', release)
    ('MozTouchRelease', release);

$link.click(function() {
	if(status){
	}
	else{
		return false
	}
});
})(window.jQuery, window, window.document);