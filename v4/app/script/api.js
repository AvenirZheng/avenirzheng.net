var globalDB = [];
var id = -1;
var featured = false;
var currentLocation = "/";



function preload(author, project) {
    
    loading = true;
    featured = false;
    loadingFeatured = false;
    var url = SERVER + "api/repos.json";

    loadingFeatured = true;
  
    $.getJSON(url, function (data) {
        loading = false;
		
        if (data.items.message) {
            // no results
            hidePreloader();
            console.log(data.items.message)
            return;
        }


        globalDB = data.items;
        featured = loadingFeatured;

		
        for (var i = 0; i < globalDB.length; i++) {
            if (project && globalDB[i] && globalDB[i].link) {
                var last = globalDB[i].link.split('/');
                last = last[last.length - 1].toLowerCase();
                if (last == project && !MOBILE_VERSION) {
                    selected = i;
                }
            }

            var p = globalDB[i].languages;
			
			
            if (p.length === 0 || p.message == "Repository access blocked") {
                p = {
                    unknown: 1000
                };
            }
            var converted = [];
            for (var key in p) {
                if (p.hasOwnProperty(key)) {
                    converted.push({
                        type: analyze(key),
                        size: p[key],
                        name: key
                    });
                }
            }
            globalDB[i].files = converted;
        }

        for (var j = 0; j < viewsNum; j++) {
            prepare(j, j);
        }
		hidePreloader();

    });
}



function analyze(extension) {
    var type = 0;

    for (var i = 0; i < TYPES.length; i++)
        if (TYPES[i] == extension)
            type = i;

    // if (type === 0 && extension != 'unknown')
    //     console.log('ANALYZE: ' + extension + ' not found');

    return type;
}





function prepare(id, staticid) {

    var db = globalDB[id];
    
    
    
    var prevScale = 1;
    if (groups[staticid]) {
        var obj, i;
        for (i = groups[staticid].children.length - 1; i >= 0; i--) {
            obj = groups[staticid].children[i];
            groups[staticid].remove(obj);

        }
        prevScale = groups[staticid].scale.x;
        scene.remove(groups[staticid]);
        groups[staticid] = null;
    }

    if (db) {
        groups[staticid] = new THREE.Group();
        groups[staticid].scale.x = groups[staticid].scale.y = groups[staticid].scale.z = prevScale;
        TweenMax.killDelayedCallsTo(groups[staticid]);
        TweenMax.killTweensOf(groups[staticid]);
        TweenMax.to(groups[staticid].scale, 0.3, {delay: 0.5 * Math.random(), x: 1, y: 1, z: 1, ease: Back.easeOut});
        scene.add(groups[staticid]);

        bug(groups[staticid], db);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcGkuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGdsb2JhbERCID0gW107XHJcbnZhciBpZCA9IC0xO1xyXG52YXIgZmVhdHVyZWQgPSBmYWxzZTtcclxudmFyIGN1cnJlbnRMb2NhdGlvbiA9IFwiL1wiO1xyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBwcmVsb2FkKGF1dGhvciwgcHJvamVjdCkge1xyXG4gICAgXHJcbiAgICBsb2FkaW5nID0gdHJ1ZTtcclxuICAgIGZlYXR1cmVkID0gZmFsc2U7XHJcbiAgICBsb2FkaW5nRmVhdHVyZWQgPSBmYWxzZTtcclxuICAgIHZhciB1cmwgPSBTRVJWRVIgKyBcImFwaS9yZXBvcy5qc29uXCI7XHJcblxyXG4gICAgbG9hZGluZ0ZlYXR1cmVkID0gdHJ1ZTtcclxuICBcclxuICAgICQuZ2V0SlNPTih1cmwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgbG9hZGluZyA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5pdGVtcy5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIC8vIG5vIHJlc3VsdHNcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5pdGVtcy5tZXNzYWdlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgZ2xvYmFsREIgPSBkYXRhLml0ZW1zO1xyXG4gICAgICAgIGZlYXR1cmVkID0gbG9hZGluZ0ZlYXR1cmVkO1xyXG5cclxuXHRcdFxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ2xvYmFsREIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHByb2plY3QgJiYgZ2xvYmFsREJbaV0gJiYgZ2xvYmFsREJbaV0ubGluaykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSBnbG9iYWxEQltpXS5saW5rLnNwbGl0KCcvJyk7XHJcbiAgICAgICAgICAgICAgICBsYXN0ID0gbGFzdFtsYXN0Lmxlbmd0aCAtIDFdLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdCA9PSBwcm9qZWN0ICYmICFNT0JJTEVfVkVSU0lPTikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIHAgPSBnbG9iYWxEQltpXS5sYW5ndWFnZXM7XHJcblx0XHRcdFxyXG5cdFx0XHRcclxuICAgICAgICAgICAgaWYgKHAubGVuZ3RoID09PSAwIHx8IHAubWVzc2FnZSA9PSBcIlJlcG9zaXRvcnkgYWNjZXNzIGJsb2NrZWRcIikge1xyXG4gICAgICAgICAgICAgICAgcCA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1bmtub3duOiAxMDAwXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjb252ZXJ0ZWQgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHApIHtcclxuICAgICAgICAgICAgICAgIGlmIChwLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb252ZXJ0ZWQucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGFuYWx5emUoa2V5KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogcFtrZXldLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBrZXlcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnbG9iYWxEQltpXS5maWxlcyA9IGNvbnZlcnRlZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmlld3NOdW07IGorKykge1xyXG4gICAgICAgICAgICBwcmVwYXJlKGosIGopO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gYW5hbHl6ZShleHRlbnNpb24pIHtcclxuICAgIHZhciB0eXBlID0gMDtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFRZUEVTLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGlmIChUWVBFU1tpXSA9PSBleHRlbnNpb24pXHJcbiAgICAgICAgICAgIHR5cGUgPSBpO1xyXG5cclxuICAgIC8vIGlmICh0eXBlID09PSAwICYmIGV4dGVuc2lvbiAhPSAndW5rbm93bicpXHJcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ0FOQUxZWkU6ICcgKyBleHRlbnNpb24gKyAnIG5vdCBmb3VuZCcpO1xyXG5cclxuICAgIHJldHVybiB0eXBlO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gcHJlcGFyZShpZCwgc3RhdGljaWQpIHtcclxuXHJcbiAgICB2YXIgZGIgPSBnbG9iYWxEQltpZF07XHJcbiAgICBcclxuICAgIFxyXG4gICAgXHJcbiAgICB2YXIgcHJldlNjYWxlID0gMTtcclxuICAgIGlmIChncm91cHNbc3RhdGljaWRdKSB7XHJcbiAgICAgICAgdmFyIG9iaiwgaTtcclxuICAgICAgICBmb3IgKGkgPSBncm91cHNbc3RhdGljaWRdLmNoaWxkcmVuLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIG9iaiA9IGdyb3Vwc1tzdGF0aWNpZF0uY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGdyb3Vwc1tzdGF0aWNpZF0ucmVtb3ZlKG9iaik7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBwcmV2U2NhbGUgPSBncm91cHNbc3RhdGljaWRdLnNjYWxlLng7XHJcbiAgICAgICAgc2NlbmUucmVtb3ZlKGdyb3Vwc1tzdGF0aWNpZF0pO1xyXG4gICAgICAgIGdyb3Vwc1tzdGF0aWNpZF0gPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkYikge1xyXG4gICAgICAgIGdyb3Vwc1tzdGF0aWNpZF0gPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgICAgICBncm91cHNbc3RhdGljaWRdLnNjYWxlLnggPSBncm91cHNbc3RhdGljaWRdLnNjYWxlLnkgPSBncm91cHNbc3RhdGljaWRdLnNjYWxlLnogPSBwcmV2U2NhbGU7XHJcbiAgICAgICAgVHdlZW5NYXgua2lsbERlbGF5ZWRDYWxsc1RvKGdyb3Vwc1tzdGF0aWNpZF0pO1xyXG4gICAgICAgIFR3ZWVuTWF4LmtpbGxUd2VlbnNPZihncm91cHNbc3RhdGljaWRdKTtcclxuICAgICAgICBUd2Vlbk1heC50byhncm91cHNbc3RhdGljaWRdLnNjYWxlLCAwLjMsIHtkZWxheTogMC41ICogTWF0aC5yYW5kb20oKSwgeDogMSwgeTogMSwgejogMSwgZWFzZTogQmFjay5lYXNlT3V0fSk7XHJcbiAgICAgICAgc2NlbmUuYWRkKGdyb3Vwc1tzdGF0aWNpZF0pO1xyXG5cclxuICAgICAgICBidWcoZ3JvdXBzW3N0YXRpY2lkXSwgZGIpO1xyXG4gICAgfVxyXG59XHJcbiJdLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
