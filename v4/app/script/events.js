var state = 0;
var rotateStart = new THREE.Vector2();
var rotateEnd = new THREE.Vector2();

var dollyStart = new THREE.Vector2();
var dollyEnd = new THREE.Vector2();
var dollyDelta = new THREE.Vector2();

var cameraDistance = 650;

var touching = false;



function onMouseWheel(event) {
    if ($(event.target).closest('.has-scroll').length <= 0) {
        event.preventDefault();
        event.stopPropagation();

        if (event.wheelDelta !== undefined) {
            selectedZoom -= event.wheelDelta / 10;
        } else {
            selectedZoom -= event.detail / 10 * 20;
        }
        if (selectedZoom < ZOOM_IN_MIN)
            selectedZoom = ZOOM_IN_MIN;
        if (selectedZoom > ZOOM_IN_MAX)
            selectedZoom = ZOOM_IN_MAX;
        if (selected != -1)
            return;

        delta = 0;

        if (event.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9

            delta = event.wheelDelta;

        } else if (event.detail !== undefined) { // Firefox

            delta = -event.detail * 20;

        }

        if (window.devicePixelRatio)
            delta *= window.devicePixelRatio;

        delta /= 5000;
    }

}

function touchstart(event) {
    touching = !$(event.target).closest('.header').length && !$(event.target).closest('.popup').length;
    if (!!touching) {
        switch (event.touches.length) {
            case 1:
                state = 1;
                rotateStart.set(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
                break;
            case 2:
                state = 2;
                var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                dollyStart.set(0, distance);
                break;
            case 3:
                break;
            default:
                state = 0;
        }
    }

}

function touchmove(event) {
    if (!!touching) {
        event.preventDefault();
        event.stopPropagation();
        switch (event.touches.length) {
            case 1:
                if (state !== 1)
                    return;
                rotateEnd.set(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
                delta = -(rotateStart.y - rotateEnd.y) / 500;
                deltaX = (rotateStart.x - rotateEnd.x) / 500;
                rotateStart.set(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
                if (selected != -1)
                    delta = -delta;
                break;
            case 2:
                if (state !== 2)
                    return;
                var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
                var distance = Math.sqrt(dx * dx + dy * dy);
                dollyEnd.set(0, distance);
                dollyDelta.subVectors(dollyEnd, dollyStart);
                if (dollyDelta.y > 0) {
                    cameraDistance -= dollyDelta.y * cameraDistance / 100;
                } else if (dollyDelta.y < 0) {
                    cameraDistance -= dollyDelta.y * cameraDistance / 100;
                }
                if (cameraDistance < ZOOM_IN_MIN)
                    cameraDistance = ZOOM_IN_MIN;
                if (cameraDistance > ZOOM_IN_MAX)
                    cameraDistance = ZOOM_IN_MAX;
                dollyStart.copy(dollyEnd);
                break;
            case 3:
                break;
            default:
                state = 0;
        }
    }

}

function touchend( ) {
    state = 0;
}

function checkKey(e) {
    var keynum;
    if (window.event) { // IE					
        keynum = e.keyCode;
    } else
    if (e.which) { // Netscape/Firefox/Opera					
        keynum = e.which;
    }
    var k = String.fromCharCode(keynum).toLowerCase();
    if (Number(k) == k) {
        asciiMode = Number(k);
        asciiShader.enabled = true;
        uniforms[ 'mode' ].value = Number(k);
    }
    if (keynum == '192') {
        asciiShader.enabled = !asciiShader.enabled;
    }
    if (keynum == '191') {
        geoms = shuffle(geoms)
        var tempTopGlobal = topGlobal;
        topGlobal = 100;
        render(false)
        topGlobal = tempTopGlobal;

    }
    if (keynum == '38')
        prevSuggestion();
    else if (keynum == '40')
        nextSuggestion();
}

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowWidth / 2) / windowWidth;
    mouseY = ((event.clientY - headerHeight) - windowHeight / 2) / windowHeight;
}

function onWindowResize() {
    updateSize();
    resizePostprocessing();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJldmVudHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHN0YXRlID0gMDtcclxudmFyIHJvdGF0ZVN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxudmFyIHJvdGF0ZUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcblxyXG52YXIgZG9sbHlTdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcbnZhciBkb2xseUVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcbnZhciBkb2xseURlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxuXHJcbnZhciBjYW1lcmFEaXN0YW5jZSA9IDY1MDtcclxuXHJcbnZhciB0b3VjaGluZyA9IGZhbHNlO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBvbk1vdXNlV2hlZWwoZXZlbnQpIHtcclxuICAgIGlmICgkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLmhhcy1zY3JvbGwnKS5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmIChldmVudC53aGVlbERlbHRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRab29tIC09IGV2ZW50LndoZWVsRGVsdGEgLyAxMDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxlY3RlZFpvb20gLT0gZXZlbnQuZGV0YWlsIC8gMTAgKiAyMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkWm9vbSA8IFpPT01fSU5fTUlOKVxyXG4gICAgICAgICAgICBzZWxlY3RlZFpvb20gPSBaT09NX0lOX01JTjtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRab29tID4gWk9PTV9JTl9NQVgpXHJcbiAgICAgICAgICAgIHNlbGVjdGVkWm9vbSA9IFpPT01fSU5fTUFYO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZCAhPSAtMSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICBkZWx0YSA9IDA7XHJcblxyXG4gICAgICAgIGlmIChldmVudC53aGVlbERlbHRhICE9PSB1bmRlZmluZWQpIHsgLy8gV2ViS2l0IC8gT3BlcmEgLyBFeHBsb3JlciA5XHJcblxyXG4gICAgICAgICAgICBkZWx0YSA9IGV2ZW50LndoZWVsRGVsdGE7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZGV0YWlsICE9PSB1bmRlZmluZWQpIHsgLy8gRmlyZWZveFxyXG5cclxuICAgICAgICAgICAgZGVsdGEgPSAtZXZlbnQuZGV0YWlsICogMjA7XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKVxyXG4gICAgICAgICAgICBkZWx0YSAqPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcclxuXHJcbiAgICAgICAgZGVsdGEgLz0gNTAwMDtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvdWNoc3RhcnQoZXZlbnQpIHtcclxuICAgIHRvdWNoaW5nID0gISQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCcuaGVhZGVyJykubGVuZ3RoICYmICEkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnLnBvcHVwJykubGVuZ3RoO1xyXG4gICAgaWYgKCEhdG91Y2hpbmcpIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMTtcclxuICAgICAgICAgICAgICAgIHJvdGF0ZVN0YXJ0LnNldChldmVudC50b3VjaGVzWyAwIF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgc3RhdGUgPSAyO1xyXG4gICAgICAgICAgICAgICAgdmFyIGR4ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgdmFyIGR5ID0gZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZIC0gZXZlbnQudG91Y2hlc1sgMSBdLnBhZ2VZO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICAgICAgICAgICAgICAgIGRvbGx5U3RhcnQuc2V0KDAsIGRpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHN0YXRlID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiB0b3VjaG1vdmUoZXZlbnQpIHtcclxuICAgIGlmICghIXRvdWNoaW5nKSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvdWNoZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gMSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICByb3RhdGVFbmQuc2V0KGV2ZW50LnRvdWNoZXNbIDAgXS5wYWdlWCwgZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VZKTtcclxuICAgICAgICAgICAgICAgIGRlbHRhID0gLShyb3RhdGVTdGFydC55IC0gcm90YXRlRW5kLnkpIC8gNTAwO1xyXG4gICAgICAgICAgICAgICAgZGVsdGFYID0gKHJvdGF0ZVN0YXJ0LnggLSByb3RhdGVFbmQueCkgLyA1MDA7XHJcbiAgICAgICAgICAgICAgICByb3RhdGVTdGFydC5zZXQoZXZlbnQudG91Y2hlc1sgMCBdLnBhZ2VYLCBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9IC0xKVxyXG4gICAgICAgICAgICAgICAgICAgIGRlbHRhID0gLWRlbHRhO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPT0gMilcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB2YXIgZHggPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVggLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVg7XHJcbiAgICAgICAgICAgICAgICB2YXIgZHkgPSBldmVudC50b3VjaGVzWyAwIF0ucGFnZVkgLSBldmVudC50b3VjaGVzWyAxIF0ucGFnZVk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgICAgICAgICAgICAgZG9sbHlFbmQuc2V0KDAsIGRpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGRvbGx5RGVsdGEuc3ViVmVjdG9ycyhkb2xseUVuZCwgZG9sbHlTdGFydCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9sbHlEZWx0YS55ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbWVyYURpc3RhbmNlIC09IGRvbGx5RGVsdGEueSAqIGNhbWVyYURpc3RhbmNlIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkb2xseURlbHRhLnkgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhRGlzdGFuY2UgLT0gZG9sbHlEZWx0YS55ICogY2FtZXJhRGlzdGFuY2UgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FtZXJhRGlzdGFuY2UgPCBaT09NX0lOX01JTilcclxuICAgICAgICAgICAgICAgICAgICBjYW1lcmFEaXN0YW5jZSA9IFpPT01fSU5fTUlOO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbWVyYURpc3RhbmNlID4gWk9PTV9JTl9NQVgpXHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhRGlzdGFuY2UgPSBaT09NX0lOX01BWDtcclxuICAgICAgICAgICAgICAgIGRvbGx5U3RhcnQuY29weShkb2xseUVuZCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gdG91Y2hlbmQoICkge1xyXG4gICAgc3RhdGUgPSAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja0tleShlKSB7XHJcbiAgICB2YXIga2V5bnVtO1xyXG4gICAgaWYgKHdpbmRvdy5ldmVudCkgeyAvLyBJRVx0XHRcdFx0XHRcclxuICAgICAgICBrZXludW0gPSBlLmtleUNvZGU7XHJcbiAgICB9IGVsc2VcclxuICAgIGlmIChlLndoaWNoKSB7IC8vIE5ldHNjYXBlL0ZpcmVmb3gvT3BlcmFcdFx0XHRcdFx0XHJcbiAgICAgICAga2V5bnVtID0gZS53aGljaDtcclxuICAgIH1cclxuICAgIHZhciBrID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXludW0pLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAoTnVtYmVyKGspID09IGspIHtcclxuICAgICAgICBhc2NpaU1vZGUgPSBOdW1iZXIoayk7XHJcbiAgICAgICAgYXNjaWlTaGFkZXIuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgdW5pZm9ybXNbICdtb2RlJyBdLnZhbHVlID0gTnVtYmVyKGspO1xyXG4gICAgfVxyXG4gICAgaWYgKGtleW51bSA9PSAnMTkyJykge1xyXG4gICAgICAgIGFzY2lpU2hhZGVyLmVuYWJsZWQgPSAhYXNjaWlTaGFkZXIuZW5hYmxlZDtcclxuICAgIH1cclxuICAgIGlmIChrZXludW0gPT0gJzE5MScpIHtcclxuICAgICAgICBnZW9tcyA9IHNodWZmbGUoZ2VvbXMpXHJcbiAgICAgICAgdmFyIHRlbXBUb3BHbG9iYWwgPSB0b3BHbG9iYWw7XHJcbiAgICAgICAgdG9wR2xvYmFsID0gMTAwO1xyXG4gICAgICAgIHJlbmRlcihmYWxzZSlcclxuICAgICAgICB0b3BHbG9iYWwgPSB0ZW1wVG9wR2xvYmFsO1xyXG5cclxuICAgIH1cclxuICAgIGlmIChrZXludW0gPT0gJzM4JylcclxuICAgICAgICBwcmV2U3VnZ2VzdGlvbigpO1xyXG4gICAgZWxzZSBpZiAoa2V5bnVtID09ICc0MCcpXHJcbiAgICAgICAgbmV4dFN1Z2dlc3Rpb24oKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25Eb2N1bWVudE1vdXNlTW92ZShldmVudCkge1xyXG4gICAgbW91c2VYID0gKGV2ZW50LmNsaWVudFggLSB3aW5kb3dXaWR0aCAvIDIpIC8gd2luZG93V2lkdGg7XHJcbiAgICBtb3VzZVkgPSAoKGV2ZW50LmNsaWVudFkgLSBoZWFkZXJIZWlnaHQpIC0gd2luZG93SGVpZ2h0IC8gMikgLyB3aW5kb3dIZWlnaHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uV2luZG93UmVzaXplKCkge1xyXG4gICAgdXBkYXRlU2l6ZSgpO1xyXG4gICAgcmVzaXplUG9zdHByb2Nlc3NpbmcoKTtcclxufSJdLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
