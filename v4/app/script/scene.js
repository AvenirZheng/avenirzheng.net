var camera, view, controls = [];
var selectedZoom = ZOOM_IN;
var deviceControlsEnabled = false;
var nextRenderScreenshot = {enabled: false};
var i, ii, min, max, newid;
var backgroundRocks, thisLoop;
var skipFPSCheck = false
var filterStrength = 2, dis = 300, spd = 5, animSpd = 5;
var frameTime = 80, lastLoop = new Date, slowCount = 0, tempPosition = new THREE.Vector3();

function setupScene() {

    container = document.getElementById('ascii-background');

    // multiple views
    for (ii = 0; ii < viewsNum; ii++) {
        var view = {};
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        view.camera = camera;
        view.width = 0;
        view.height = 0;
        view.left = 0;
        view.top = 0;
        view.topDiff = 0;
        if (!MOBILE_VERSION) {
            view.relativeDiff = -Math.floor(ii / 3) * 0.5;
        } else {
            view.relativeDiff = -ii - 1;
        }
        view.id = ii;
        view.i = ii;

        controls.push(new THREE.DeviceOrientationControls(camera, true));
        views.push(view);
    }

    // scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0, 0, 10000);

    scene.add(new THREE.AmbientLight(0x444444));

    light = new THREE.SpotLight(0xffffff, 2);
    light.position.set(0, 500, 2000);

    scene.add(light);

    // background rocks
    var greymat = new THREE.MeshBasicMaterial({color: 0x444444,
        side: THREE.DoubleSide});

    for (var i = 0; i < 1; i++) {
        var geometry = new THREE.Geometry();

        for (var j = 0; j < 30; j++) {
            var pregeom;
            if (j % 2 === 0)
                pregeom = new THREE.BoxGeometry(600, 600, 600);//
            if (j % 2 == 1)
                pregeom = new THREE.TetrahedronGeometry(600, 0);
            //change_uvs( pregeom, 1/zoom1, 1/zoom2, Math.floor(Math.random()*zoom1), Math.floor(Math.random()*zoom2) );
            var submesh = new THREE.Mesh(pregeom);
            submesh.scale.x = submesh.scale.y = submesh.scale.z = 0.2 + Math.random() * 1;
            submesh.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
            while (submesh.position.distanceTo(scene.position) < 2000) {
                submesh.position.x = (Math.random() - 0.5) * 6000;
                submesh.position.y = (Math.random() - 0.5) * 6000;
                submesh.position.z = (Math.random() - 0.5) * 6000;
            }
            submesh.updateMatrix();
            geometry.merge(pregeom, submesh.matrix);
        }
    }

    backgroundRocks = new THREE.Mesh(geometry, greymat);
    TweenMax.from(backgroundRocks.scale, 3, {delay: 1.5, x: 4, y: 4, z: 4});
    scene.add(backgroundRocks);

    // core
    renderer = new THREE.WebGLRenderer({antialias: false, alpha: false});
    //renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight - headerHeight);
    //renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = headerHeight + "px";
    container.appendChild(renderer.domElement);
    
    // events
    document.body.addEventListener('mousemove', onDocumentMouseMove, false);
    
   

   
    $(window).bind('DOMMouseScroll', function (event) {
        onMouseWheel(event.originalEvent);
    });

    document.body.addEventListener('touchstart', touchstart, false);
    document.body.addEventListener('touchend', touchend, false);
    document.body.addEventListener('touchmove', touchmove, false);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('deviceorientation', initControls, false);

    document.onkeydown = checkKey;

    onWindowResize();

    lastLoop = new Date;
}

function initControls(event) {
    if (event.alpha) {
        window.removeEventListener('deviceorientation', initControls, false);
        deviceControlsEnabled = true;
        controls.connect();
        controls.update();
    }
}


function updateSize() {
    if (windowWidth != window.innerWidth || windowHeight != window.innerHeight - headerHeight) {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight - headerHeight;
        renderer.setSize(windowWidth, windowHeight);
    }

}

function animate() {
    
    if (timer <= 20) {
        lastLoop = new Date();
    }
    if (timer > 20 && timer < 2000) {
        var thisFrameTime = (thisLoop = new Date()) - lastLoop;
        if (thisFrameTime < 10000) {
            frameTime += (thisFrameTime - frameTime) / filterStrength;
            lastLoop = thisLoop;

            fps = (1000 / frameTime);
            if (fps < MIN_FPS && !skipFPSCheck) {
                slowCount++;
                if (slowCount > 10) {
                    noWebGL();
                    return;
                }
            } else {
                slowCount = 0;
            }
        }
    }

    for (var i = 0; i < globalDB.length; i++) {
        updateBug(globalDB[i], i);
    }
    render();
    requestAnimationFrame(animate);
}

function render(fast) {
    rendertime -= mouseX / 80;

    updateSize();
    if (nextRenderScreenshot.enabled) {
        windowWidth = nextRenderScreenshot.width;
        windowHeight = nextRenderScreenshot.height;
        renderer.setSize(windowWidth, windowHeight);
        resizePostprocessing();
    }

    for (i = 0; i < viewsNum; i++) {
        if (groups[i])
            groups[i].visible = false;
    }

    topGlobal -= delta;

    min = 0;
    if (topGlobal < min)
        topGlobal -= (topGlobal - min) / 5;

    max = Math.floor(((globalDB.length / viewsNum * 3 / 2) - 1) * 2) / 2 + 0.5;
    if (globalDB.length % 3 === 0 )
        max -= 0.5;
    if (topGlobal > max) {
        topGlobal -= (topGlobal - max) / 5;
    }
    if (globalDB.length <= 6)
        topGlobal = min;

    renderer.clear();
    for (ii = 0; ii < viewsNum; ++ii) {

        view = views[ii];
        camera = view.camera;

        if (groups[ii] && !rolloverMesh) {
            groups[ii].visible = true;
        }
        if (i > 0 && groups[ii - 1])
            groups[ii - 1].visible = false;

        view.topDiff = 0;
        dis = topGlobal + view.relativeDiff;
        if (!MOBILE_VERSION) {
            while ((dis) > 0.5) {
                view.topDiff -= 1.5;
                dis -= 1.5;
            }
        } else {
            while ((dis) > 0) {
                view.topDiff -= 2;
                dis -= 2;
            }
        }
        newid = view.i + Math.floor(-view.topDiff / 1.5 * viewsNum);
        if (view.id != newid) {
            view.id = newid;
            TweenMax.delayedCall(view.i / 100, prepare, [view.id, view.i]);
        }

        if (!MOBILE_VERSION) {
            newWidth = {width: 0.333, height: 0.5, left: 0.333 * (ii % 3), top: topGlobal + view.topDiff + view.relativeDiff};
        } else {
            newWidth = {width: 1, height: 1, left: 0, top: topGlobal + view.topDiff + view.relativeDiff};
        }
        if (!loading) {
            backgroundRocks.material.color.setHSL(0.5 + Math.sin(ii), 0.10, 0.25);
        } else {
            backgroundRocks.material.color.setRGB(0, 0, 0);
        }
        light.color.setHSL(Math.sin(ii * 123.2) / 2 + 0.5, 1, 0.8);

        // renderer sizes
        if (aboutOpen) {
            if (ii === 0) {
                newWidth.width = 0.6;
                newWidth.height = 1;
                newWidth.left = 0.4;
                newWidth.top = -1;
            } else {
                newWidth.width = 0;
                if (ii % 3 == 1)
                    newWidth.width = 1;
                newWidth.height = 0;
                if (ii % 3 === 0 || ii % 3 == 2)
                    newWidth.height = 1;
                newWidth.left = 0;
                if (ii % 3 == 2)
                    newWidth.left = 1;
                newWidth.top = 1;
            }
        } else if (selected != -1) {
            if (selected == view.id) {
                newWidth.width = 1;
                newWidth.height = 1;
                newWidth.left = 0;
                newWidth.top = -1;
            } else {
                newWidth.width = 0;
                if (ii % 3 == 1)
                    newWidth.width = 1;
                newWidth.height = 0;
                if (ii % 3 === 0 || ii % 3 == 2)
                    newWidth.height = 1;
                newWidth.left = 0;
                if (ii % 3 == 2)
                    newWidth.left = 1;
                newWidth.top = 1;

            }
        }

        animSpd = 5;
        if (MOBILE_VERSION || nextRenderScreenshot.enabled || fast) {
            animSpd = 1;
        }
        
        // animate views
        view.width -= (view.width - newWidth.width) / animSpd;
        view.height -= (view.height - newWidth.height) / animSpd;
        view.left -= (view.left - newWidth.left) / animSpd;
        view.top -= (view.top - newWidth.top) / animSpd;
        if (view.height < 0.55) {
            view.top = newWidth.top;
        }

        

        // animate camera
        dis = 300;
        tempPosition = new THREE.Vector3();
        if (!MOBILE_VERSION && (view.id == selected || (-view.top < 0.5 + mouseY && -view.top + view.height > 0.5 + mouseY && view.left < 0.5 + mouseX && view.left + view.width > 0.5 + mouseX))) {
            if (view.id == selected)
                dis = selectedZoom;
            tempPosition.x = -Math.sin(ii + -mouseX * 5 + rendertime) * dis;
            tempPosition.y = -Math.sin(-mouseY * 2) * dis;
            tempPosition.z = -Math.cos(ii + -mouseX * 5 + rendertime) * dis;

            rolledover = view.id;
        } else {
            dis = 500;
            tempPosition.x = -Math.sin(ii + mouseX * 0 + rendertime) * dis;
            tempPosition.y = -Math.sin(mouseY * 0) * dis;
            tempPosition.z = -Math.cos(ii + mouseX * 0 + rendertime) * dis;
        }
        if (!deviceControlsEnabled) {
            camera.position.x -= (camera.position.x - tempPosition.x) / animSpd;
            camera.position.y -= (camera.position.y - tempPosition.y) / animSpd;
            camera.position.z -= (camera.position.z - tempPosition.z) / animSpd;
        } else {
            controls[ii].update();

            camera.position.set(0, 0, 0)
            camera.translateZ(cameraDistance);
        }
        if (nextRenderScreenshot.enabled) {
            if (nextRenderScreenshot.type == "wallpaper") {
                dis = ZOOM_IN_MIN + Math.random() * (ZOOM_IN_MAX - ZOOM_IN_MIN);
                camera.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
                camera.position.set(0, 0, 0);
                camera.translateZ(dis);
            } else if (nextRenderScreenshot.type == "gif") {
                dis = (ZOOM_IN_MIN + ZOOM_IN_MAX) / 2;
                camera.rotation.set(0, Math.PI * 2 * nextRenderScreenshot.id / nextRenderScreenshot.num, 0);
                camera.position.set(0, 0, 0);
                camera.translateZ(dis);
            } else if (nextRenderScreenshot.type == "thumbnail") {
                dis = ZOOM_IN_MIN;
                camera.rotation.set(-.1, .1, 0);
                camera.position.set(0, 0, 0);
                camera.translateZ(dis);
            }
        }
        camera.lookAt((scene.position));

        light.position.x = camera.position.x + 100;
        light.position.y = camera.position.y + 100;
        light.position.z = camera.position.z;

        //and render

        var left = Math.floor(windowWidth * view.left);
        var bottom = Math.floor((windowHeight) * (view.top + (view.height)));
        var width = Math.floor(windowWidth * view.width);
        var height = Math.floor(windowHeight * view.height);
        if (view.width > 0.1 && view.height > 0.1 && view.id < globalDB.length) {
            renderer.setViewport(left, bottom, width, height);
            renderer.setScissor(left, bottom, width, height);
            renderer.enableScissorTest(true);

            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            if (asciiShader.enabled) {
                renderer.render(scene, camera, asciiShader.rtTextureColor, true);
            } else {
                renderer.render(scene, camera);
            }
        }
    }

    // postprocessing
    if (asciiShader.enabled) {
        var size = (0.2 + 0.8 * windowHeight / 600 / 4) * 1.5;
        if (size < .5)
            size = .5;
        //if (window.devicePixelRatio)
        //    size /= window.devicePixelRatio
        if (selected != -1 && !MOBILE_VERSION) {
            size *= 1.3;
        }
        if (nextRenderScreenshot.enabled) {
            size *= 0.8;
            if (nextRenderScreenshot.type == "gif") {
                size *= 1.2;
            }
            if (nextRenderScreenshot.type == "thumbnail") {
                size *= 1.5;
            }
        }
        if (MOBILE_VERSION) {
            size *= 1.5;
        }
        uniforms[ 'fontSize'].value = new THREE.Vector2(Math.floor(size * fontWidth), Math.floor(size * fontHeight));
        uniforms[ 'charMapSize'].value = charNum * Math.floor(fontWidth * size);

        renderer.setViewport(0, 0, windowWidth, windowHeight);
        renderer.setScissor(0, 0, windowWidth, windowHeight);
        renderer.render(asciiShader.scene, asciiShader.camera);

        renderer.render(scene, camera, asciiShader.rtTextureColor, true);
    }
    
    
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY2VuZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY2FtZXJhLCB2aWV3LCBjb250cm9scyA9IFtdO1xyXG52YXIgc2VsZWN0ZWRab29tID0gWk9PTV9JTjtcclxudmFyIGRldmljZUNvbnRyb2xzRW5hYmxlZCA9IGZhbHNlO1xyXG52YXIgbmV4dFJlbmRlclNjcmVlbnNob3QgPSB7ZW5hYmxlZDogZmFsc2V9O1xyXG52YXIgaSwgaWksIG1pbiwgbWF4LCBuZXdpZDtcclxudmFyIGJhY2tncm91bmRSb2NrcywgdGhpc0xvb3A7XHJcbnZhciBza2lwRlBTQ2hlY2sgPSBmYWxzZVxyXG52YXIgZmlsdGVyU3RyZW5ndGggPSAyLCBkaXMgPSAzMDAsIHNwZCA9IDUsIGFuaW1TcGQgPSA1O1xyXG52YXIgZnJhbWVUaW1lID0gODAsIGxhc3RMb29wID0gbmV3IERhdGUsIHNsb3dDb3VudCA9IDAsIHRlbXBQb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcblxyXG5mdW5jdGlvbiBzZXR1cFNjZW5lKCkge1xyXG5cclxuICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKTtcclxuXHJcbiAgICAvLyBtdWx0aXBsZSB2aWV3c1xyXG4gICAgZm9yIChpaSA9IDA7IGlpIDwgdmlld3NOdW07IGlpKyspIHtcclxuICAgICAgICB2YXIgdmlldyA9IHt9O1xyXG4gICAgICAgIGNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg0NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDEsIDEwMDAwKTtcclxuICAgICAgICB2aWV3LmNhbWVyYSA9IGNhbWVyYTtcclxuICAgICAgICB2aWV3LndpZHRoID0gMDtcclxuICAgICAgICB2aWV3LmhlaWdodCA9IDA7XHJcbiAgICAgICAgdmlldy5sZWZ0ID0gMDtcclxuICAgICAgICB2aWV3LnRvcCA9IDA7XHJcbiAgICAgICAgdmlldy50b3BEaWZmID0gMDtcclxuICAgICAgICBpZiAoIU1PQklMRV9WRVJTSU9OKSB7XHJcbiAgICAgICAgICAgIHZpZXcucmVsYXRpdmVEaWZmID0gLU1hdGguZmxvb3IoaWkgLyAzKSAqIDAuNTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWV3LnJlbGF0aXZlRGlmZiA9IC1paSAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZpZXcuaWQgPSBpaTtcclxuICAgICAgICB2aWV3LmkgPSBpaTtcclxuXHJcbiAgICAgICAgY29udHJvbHMucHVzaChuZXcgVEhSRUUuRGV2aWNlT3JpZW50YXRpb25Db250cm9scyhjYW1lcmEsIHRydWUpKTtcclxuICAgICAgICB2aWV3cy5wdXNoKHZpZXcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNjZW5lIHNldHVwXHJcbiAgICBzY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG4gICAgc2NlbmUuZm9nID0gbmV3IFRIUkVFLkZvZygwLCAwLCAxMDAwMCk7XHJcblxyXG4gICAgc2NlbmUuYWRkKG5ldyBUSFJFRS5BbWJpZW50TGlnaHQoMHg0NDQ0NDQpKTtcclxuXHJcbiAgICBsaWdodCA9IG5ldyBUSFJFRS5TcG90TGlnaHQoMHhmZmZmZmYsIDIpO1xyXG4gICAgbGlnaHQucG9zaXRpb24uc2V0KDAsIDUwMCwgMjAwMCk7XHJcblxyXG4gICAgc2NlbmUuYWRkKGxpZ2h0KTtcclxuXHJcbiAgICAvLyBiYWNrZ3JvdW5kIHJvY2tzXHJcbiAgICB2YXIgZ3JleW1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7Y29sb3I6IDB4NDQ0NDQ0LFxyXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGV9KTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE7IGkrKykge1xyXG4gICAgICAgIHZhciBnZW9tZXRyeSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDMwOyBqKyspIHtcclxuICAgICAgICAgICAgdmFyIHByZWdlb207XHJcbiAgICAgICAgICAgIGlmIChqICUgMiA9PT0gMClcclxuICAgICAgICAgICAgICAgIHByZWdlb20gPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoNjAwLCA2MDAsIDYwMCk7Ly9cclxuICAgICAgICAgICAgaWYgKGogJSAyID09IDEpXHJcbiAgICAgICAgICAgICAgICBwcmVnZW9tID0gbmV3IFRIUkVFLlRldHJhaGVkcm9uR2VvbWV0cnkoNjAwLCAwKTtcclxuICAgICAgICAgICAgLy9jaGFuZ2VfdXZzKCBwcmVnZW9tLCAxL3pvb20xLCAxL3pvb20yLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqem9vbTEpLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqem9vbTIpICk7XHJcbiAgICAgICAgICAgIHZhciBzdWJtZXNoID0gbmV3IFRIUkVFLk1lc2gocHJlZ2VvbSk7XHJcbiAgICAgICAgICAgIHN1Ym1lc2guc2NhbGUueCA9IHN1Ym1lc2guc2NhbGUueSA9IHN1Ym1lc2guc2NhbGUueiA9IDAuMiArIE1hdGgucmFuZG9tKCkgKiAxO1xyXG4gICAgICAgICAgICBzdWJtZXNoLnJvdGF0aW9uLnNldChNYXRoLnJhbmRvbSgpICogMywgTWF0aC5yYW5kb20oKSAqIDMsIE1hdGgucmFuZG9tKCkgKiAzKTtcclxuICAgICAgICAgICAgd2hpbGUgKHN1Ym1lc2gucG9zaXRpb24uZGlzdGFuY2VUbyhzY2VuZS5wb3NpdGlvbikgPCAyMDAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtZXNoLnBvc2l0aW9uLnggPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA2MDAwO1xyXG4gICAgICAgICAgICAgICAgc3VibWVzaC5wb3NpdGlvbi55ID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNjAwMDtcclxuICAgICAgICAgICAgICAgIHN1Ym1lc2gucG9zaXRpb24ueiA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDYwMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VibWVzaC51cGRhdGVNYXRyaXgoKTtcclxuICAgICAgICAgICAgZ2VvbWV0cnkubWVyZ2UocHJlZ2VvbSwgc3VibWVzaC5tYXRyaXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBiYWNrZ3JvdW5kUm9ja3MgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgZ3JleW1hdCk7XHJcbiAgICBUd2Vlbk1heC5mcm9tKGJhY2tncm91bmRSb2Nrcy5zY2FsZSwgMywge2RlbGF5OiAxLjUsIHg6IDQsIHk6IDQsIHo6IDR9KTtcclxuICAgIHNjZW5lLmFkZChiYWNrZ3JvdW5kUm9ja3MpO1xyXG5cclxuICAgIC8vIGNvcmVcclxuICAgIHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe2FudGlhbGlhczogZmFsc2UsIGFscGhhOiBmYWxzZX0pO1xyXG4gICAgLy9yZW5kZXJlci5zZXRQaXhlbFJhdGlvKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKTtcclxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCAtIGhlYWRlckhlaWdodCk7XHJcbiAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS50b3AgPSBoZWFkZXJIZWlnaHQgKyBcInB4XCI7XHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocmVuZGVyZXIuZG9tRWxlbWVudCk7XHJcbiAgICBcclxuICAgIC8vIGV2ZW50c1xyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbkRvY3VtZW50TW91c2VNb3ZlLCBmYWxzZSk7XHJcbiAgICBcclxuICAgXHJcblxyXG4gICBcclxuICAgICQod2luZG93KS5iaW5kKCdET01Nb3VzZVNjcm9sbCcsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIG9uTW91c2VXaGVlbChldmVudC5vcmlnaW5hbEV2ZW50KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRvdWNoc3RhcnQsIGZhbHNlKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0b3VjaGVuZCwgZmFsc2UpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0b3VjaG1vdmUsIGZhbHNlKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgb25XaW5kb3dSZXNpemUsIGZhbHNlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VvcmllbnRhdGlvbicsIGluaXRDb250cm9scywgZmFsc2UpO1xyXG5cclxuICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGNoZWNrS2V5O1xyXG5cclxuICAgIG9uV2luZG93UmVzaXplKCk7XHJcblxyXG4gICAgbGFzdExvb3AgPSBuZXcgRGF0ZTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdENvbnRyb2xzKGV2ZW50KSB7XHJcbiAgICBpZiAoZXZlbnQuYWxwaGEpIHtcclxuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCBpbml0Q29udHJvbHMsIGZhbHNlKTtcclxuICAgICAgICBkZXZpY2VDb250cm9sc0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGNvbnRyb2xzLmNvbm5lY3QoKTtcclxuICAgICAgICBjb250cm9scy51cGRhdGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNpemUoKSB7XHJcbiAgICBpZiAod2luZG93V2lkdGggIT0gd2luZG93LmlubmVyV2lkdGggfHwgd2luZG93SGVpZ2h0ICE9IHdpbmRvdy5pbm5lckhlaWdodCAtIGhlYWRlckhlaWdodCkge1xyXG4gICAgICAgIHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IC0gaGVhZGVySGVpZ2h0O1xyXG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBhbmltYXRlKCkge1xyXG4gICAgXHJcbiAgICBpZiAodGltZXIgPD0gMjApIHtcclxuICAgICAgICBsYXN0TG9vcCA9IG5ldyBEYXRlKCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGltZXIgPiAyMCAmJiB0aW1lciA8IDIwMDApIHtcclxuICAgICAgICB2YXIgdGhpc0ZyYW1lVGltZSA9ICh0aGlzTG9vcCA9IG5ldyBEYXRlKCkpIC0gbGFzdExvb3A7XHJcbiAgICAgICAgaWYgKHRoaXNGcmFtZVRpbWUgPCAxMDAwMCkge1xyXG4gICAgICAgICAgICBmcmFtZVRpbWUgKz0gKHRoaXNGcmFtZVRpbWUgLSBmcmFtZVRpbWUpIC8gZmlsdGVyU3RyZW5ndGg7XHJcbiAgICAgICAgICAgIGxhc3RMb29wID0gdGhpc0xvb3A7XHJcblxyXG4gICAgICAgICAgICBmcHMgPSAoMTAwMCAvIGZyYW1lVGltZSk7XHJcbiAgICAgICAgICAgIGlmIChmcHMgPCBNSU5fRlBTICYmICFza2lwRlBTQ2hlY2spIHtcclxuICAgICAgICAgICAgICAgIHNsb3dDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNsb3dDb3VudCA+IDEwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9XZWJHTCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNsb3dDb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnbG9iYWxEQi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHVwZGF0ZUJ1ZyhnbG9iYWxEQltpXSwgaSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKTtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKGZhc3QpIHtcclxuICAgIHJlbmRlcnRpbWUgLT0gbW91c2VYIC8gODA7XHJcblxyXG4gICAgdXBkYXRlU2l6ZSgpO1xyXG4gICAgaWYgKG5leHRSZW5kZXJTY3JlZW5zaG90LmVuYWJsZWQpIHtcclxuICAgICAgICB3aW5kb3dXaWR0aCA9IG5leHRSZW5kZXJTY3JlZW5zaG90LndpZHRoO1xyXG4gICAgICAgIHdpbmRvd0hlaWdodCA9IG5leHRSZW5kZXJTY3JlZW5zaG90LmhlaWdodDtcclxuICAgICAgICByZW5kZXJlci5zZXRTaXplKHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpO1xyXG4gICAgICAgIHJlc2l6ZVBvc3Rwcm9jZXNzaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHZpZXdzTnVtOyBpKyspIHtcclxuICAgICAgICBpZiAoZ3JvdXBzW2ldKVxyXG4gICAgICAgICAgICBncm91cHNbaV0udmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHRvcEdsb2JhbCAtPSBkZWx0YTtcclxuXHJcbiAgICBtaW4gPSAwO1xyXG4gICAgaWYgKHRvcEdsb2JhbCA8IG1pbilcclxuICAgICAgICB0b3BHbG9iYWwgLT0gKHRvcEdsb2JhbCAtIG1pbikgLyA1O1xyXG5cclxuICAgIG1heCA9IE1hdGguZmxvb3IoKChnbG9iYWxEQi5sZW5ndGggLyB2aWV3c051bSAqIDMgLyAyKSAtIDEpICogMikgLyAyICsgMC41O1xyXG4gICAgaWYgKGdsb2JhbERCLmxlbmd0aCAlIDMgPT09IDAgJiYgIU1PQklMRV9WRVJTSU9OKVxyXG4gICAgICAgIG1heCAtPSAwLjU7XHJcbiAgICBpZiAodG9wR2xvYmFsID4gbWF4KSB7XHJcbiAgICAgICAgdG9wR2xvYmFsIC09ICh0b3BHbG9iYWwgLSBtYXgpIC8gNTtcclxuICAgIH1cclxuICAgIGlmIChnbG9iYWxEQi5sZW5ndGggPD0gNilcclxuICAgICAgICB0b3BHbG9iYWwgPSBtaW47XHJcblxyXG4gICAgcmVuZGVyZXIuY2xlYXIoKTtcclxuICAgIGZvciAoaWkgPSAwOyBpaSA8IHZpZXdzTnVtOyArK2lpKSB7XHJcblxyXG4gICAgICAgIHZpZXcgPSB2aWV3c1tpaV07XHJcbiAgICAgICAgY2FtZXJhID0gdmlldy5jYW1lcmE7XHJcblxyXG4gICAgICAgIGlmIChncm91cHNbaWldICYmICFyb2xsb3Zlck1lc2gpIHtcclxuICAgICAgICAgICAgZ3JvdXBzW2lpXS52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGkgPiAwICYmIGdyb3Vwc1tpaSAtIDFdKVxyXG4gICAgICAgICAgICBncm91cHNbaWkgLSAxXS52aXNpYmxlID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHZpZXcudG9wRGlmZiA9IDA7XHJcbiAgICAgICAgZGlzID0gdG9wR2xvYmFsICsgdmlldy5yZWxhdGl2ZURpZmY7XHJcbiAgICAgICAgaWYgKCFNT0JJTEVfVkVSU0lPTikge1xyXG4gICAgICAgICAgICB3aGlsZSAoKGRpcykgPiAwLjUpIHtcclxuICAgICAgICAgICAgICAgIHZpZXcudG9wRGlmZiAtPSAxLjU7XHJcbiAgICAgICAgICAgICAgICBkaXMgLT0gMS41O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2hpbGUgKChkaXMpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdmlldy50b3BEaWZmIC09IDI7XHJcbiAgICAgICAgICAgICAgICBkaXMgLT0gMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdpZCA9IHZpZXcuaSArIE1hdGguZmxvb3IoLXZpZXcudG9wRGlmZiAvIDEuNSAqIHZpZXdzTnVtKTtcclxuICAgICAgICBpZiAodmlldy5pZCAhPSBuZXdpZCkge1xyXG4gICAgICAgICAgICB2aWV3LmlkID0gbmV3aWQ7XHJcbiAgICAgICAgICAgIFR3ZWVuTWF4LmRlbGF5ZWRDYWxsKHZpZXcuaSAvIDEwMCwgcHJlcGFyZSwgW3ZpZXcuaWQsIHZpZXcuaV0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFNT0JJTEVfVkVSU0lPTikge1xyXG4gICAgICAgICAgICBuZXdXaWR0aCA9IHt3aWR0aDogMC4zMzMsIGhlaWdodDogMC41LCBsZWZ0OiAwLjMzMyAqIChpaSAlIDMpLCB0b3A6IHRvcEdsb2JhbCArIHZpZXcudG9wRGlmZiArIHZpZXcucmVsYXRpdmVEaWZmfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdXaWR0aCA9IHt3aWR0aDogMSwgaGVpZ2h0OiAxLCBsZWZ0OiAwLCB0b3A6IHRvcEdsb2JhbCArIHZpZXcudG9wRGlmZiArIHZpZXcucmVsYXRpdmVEaWZmfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFsb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmRSb2Nrcy5tYXRlcmlhbC5jb2xvci5zZXRIU0woMC41ICsgTWF0aC5zaW4oaWkpLCAwLjEwLCAwLjI1KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kUm9ja3MubWF0ZXJpYWwuY29sb3Iuc2V0UkdCKDAsIDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaWdodC5jb2xvci5zZXRIU0woTWF0aC5zaW4oaWkgKiAxMjMuMikgLyAyICsgMC41LCAxLCAwLjgpO1xyXG5cclxuICAgICAgICAvLyByZW5kZXJlciBzaXplc1xyXG4gICAgICAgIGlmIChhYm91dE9wZW4pIHtcclxuICAgICAgICAgICAgaWYgKGlpID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aC53aWR0aCA9IDAuNjtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aC5sZWZ0ID0gMC40O1xyXG4gICAgICAgICAgICAgICAgbmV3V2lkdGgudG9wID0gLTE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aC53aWR0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgJSAzID09IDEpXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3V2lkdGgud2lkdGggPSAxO1xyXG4gICAgICAgICAgICAgICAgbmV3V2lkdGguaGVpZ2h0ID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAlIDMgPT09IDAgfHwgaWkgJSAzID09IDIpXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3V2lkdGguaGVpZ2h0ID0gMTtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLmxlZnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICUgMyA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1dpZHRoLmxlZnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgbmV3V2lkdGgudG9wID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZWN0ZWQgIT0gLTEpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkID09IHZpZXcuaWQpIHtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLndpZHRoID0gMTtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aC5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLnRvcCA9IC0xO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3V2lkdGgud2lkdGggPSAwO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlpICUgMyA9PSAxKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1dpZHRoLndpZHRoID0gMTtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLmhlaWdodCA9IDA7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWkgJSAzID09PSAwIHx8IGlpICUgMyA9PSAyKVxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1dpZHRoLmhlaWdodCA9IDE7XHJcbiAgICAgICAgICAgICAgICBuZXdXaWR0aC5sZWZ0ID0gMDtcclxuICAgICAgICAgICAgICAgIGlmIChpaSAlIDMgPT0gMilcclxuICAgICAgICAgICAgICAgICAgICBuZXdXaWR0aC5sZWZ0ID0gMTtcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoLnRvcCA9IDE7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhbmltU3BkID0gNTtcclxuICAgICAgICBpZiAoTU9CSUxFX1ZFUlNJT04gfHwgbmV4dFJlbmRlclNjcmVlbnNob3QuZW5hYmxlZCB8fCBmYXN0KSB7XHJcbiAgICAgICAgICAgIGFuaW1TcGQgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyBhbmltYXRlIHZpZXdzXHJcbiAgICAgICAgdmlldy53aWR0aCAtPSAodmlldy53aWR0aCAtIG5ld1dpZHRoLndpZHRoKSAvIGFuaW1TcGQ7XHJcbiAgICAgICAgdmlldy5oZWlnaHQgLT0gKHZpZXcuaGVpZ2h0IC0gbmV3V2lkdGguaGVpZ2h0KSAvIGFuaW1TcGQ7XHJcbiAgICAgICAgdmlldy5sZWZ0IC09ICh2aWV3LmxlZnQgLSBuZXdXaWR0aC5sZWZ0KSAvIGFuaW1TcGQ7XHJcbiAgICAgICAgdmlldy50b3AgLT0gKHZpZXcudG9wIC0gbmV3V2lkdGgudG9wKSAvIGFuaW1TcGQ7XHJcbiAgICAgICAgaWYgKHZpZXcuaGVpZ2h0IDwgMC41NSkge1xyXG4gICAgICAgICAgICB2aWV3LnRvcCA9IG5ld1dpZHRoLnRvcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIFxyXG5cclxuICAgICAgICAvLyBhbmltYXRlIGNhbWVyYVxyXG4gICAgICAgIGRpcyA9IDMwMDtcclxuICAgICAgICB0ZW1wUG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgICAgIGlmICghTU9CSUxFX1ZFUlNJT04gJiYgKHZpZXcuaWQgPT0gc2VsZWN0ZWQgfHwgKC12aWV3LnRvcCA8IDAuNSArIG1vdXNlWSAmJiAtdmlldy50b3AgKyB2aWV3LmhlaWdodCA+IDAuNSArIG1vdXNlWSAmJiB2aWV3LmxlZnQgPCAwLjUgKyBtb3VzZVggJiYgdmlldy5sZWZ0ICsgdmlldy53aWR0aCA+IDAuNSArIG1vdXNlWCkpKSB7XHJcbiAgICAgICAgICAgIGlmICh2aWV3LmlkID09IHNlbGVjdGVkKVxyXG4gICAgICAgICAgICAgICAgZGlzID0gc2VsZWN0ZWRab29tO1xyXG4gICAgICAgICAgICB0ZW1wUG9zaXRpb24ueCA9IC1NYXRoLnNpbihpaSArIC1tb3VzZVggKiA1ICsgcmVuZGVydGltZSkgKiBkaXM7XHJcbiAgICAgICAgICAgIHRlbXBQb3NpdGlvbi55ID0gLU1hdGguc2luKC1tb3VzZVkgKiAyKSAqIGRpcztcclxuICAgICAgICAgICAgdGVtcFBvc2l0aW9uLnogPSAtTWF0aC5jb3MoaWkgKyAtbW91c2VYICogNSArIHJlbmRlcnRpbWUpICogZGlzO1xyXG5cclxuICAgICAgICAgICAgcm9sbGVkb3ZlciA9IHZpZXcuaWQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZGlzID0gNTAwO1xyXG4gICAgICAgICAgICB0ZW1wUG9zaXRpb24ueCA9IC1NYXRoLnNpbihpaSArIG1vdXNlWCAqIDAgKyByZW5kZXJ0aW1lKSAqIGRpcztcclxuICAgICAgICAgICAgdGVtcFBvc2l0aW9uLnkgPSAtTWF0aC5zaW4obW91c2VZICogMCkgKiBkaXM7XHJcbiAgICAgICAgICAgIHRlbXBQb3NpdGlvbi56ID0gLU1hdGguY29zKGlpICsgbW91c2VYICogMCArIHJlbmRlcnRpbWUpICogZGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWRldmljZUNvbnRyb2xzRW5hYmxlZCkge1xyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueCAtPSAoY2FtZXJhLnBvc2l0aW9uLnggLSB0ZW1wUG9zaXRpb24ueCkgLyBhbmltU3BkO1xyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueSAtPSAoY2FtZXJhLnBvc2l0aW9uLnkgLSB0ZW1wUG9zaXRpb24ueSkgLyBhbmltU3BkO1xyXG4gICAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueiAtPSAoY2FtZXJhLnBvc2l0aW9uLnogLSB0ZW1wUG9zaXRpb24ueikgLyBhbmltU3BkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnRyb2xzW2lpXS51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgMCwgMClcclxuICAgICAgICAgICAgY2FtZXJhLnRyYW5zbGF0ZVooY2FtZXJhRGlzdGFuY2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV4dFJlbmRlclNjcmVlbnNob3QuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAobmV4dFJlbmRlclNjcmVlbnNob3QudHlwZSA9PSBcIndhbGxwYXBlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBkaXMgPSBaT09NX0lOX01JTiArIE1hdGgucmFuZG9tKCkgKiAoWk9PTV9JTl9NQVggLSBaT09NX0lOX01JTik7XHJcbiAgICAgICAgICAgICAgICBjYW1lcmEucm90YXRpb24uc2V0KE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMiwgTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyLCBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDIpO1xyXG4gICAgICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgIGNhbWVyYS50cmFuc2xhdGVaKGRpcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV4dFJlbmRlclNjcmVlbnNob3QudHlwZSA9PSBcImdpZlwiKSB7XHJcbiAgICAgICAgICAgICAgICBkaXMgPSAoWk9PTV9JTl9NSU4gKyBaT09NX0lOX01BWCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgY2FtZXJhLnJvdGF0aW9uLnNldCgwLCBNYXRoLlBJICogMiAqIG5leHRSZW5kZXJTY3JlZW5zaG90LmlkIC8gbmV4dFJlbmRlclNjcmVlbnNob3QubnVtLCAwKTtcclxuICAgICAgICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoMCwgMCwgMCk7XHJcbiAgICAgICAgICAgICAgICBjYW1lcmEudHJhbnNsYXRlWihkaXMpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5leHRSZW5kZXJTY3JlZW5zaG90LnR5cGUgPT0gXCJ0aHVtYm5haWxcIikge1xyXG4gICAgICAgICAgICAgICAgZGlzID0gWk9PTV9JTl9NSU47XHJcbiAgICAgICAgICAgICAgICBjYW1lcmEucm90YXRpb24uc2V0KC0uMSwgLjEsIDApO1xyXG4gICAgICAgICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnNldCgwLCAwLCAwKTtcclxuICAgICAgICAgICAgICAgIGNhbWVyYS50cmFuc2xhdGVaKGRpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2FtZXJhLmxvb2tBdCgoc2NlbmUucG9zaXRpb24pKTtcclxuXHJcbiAgICAgICAgbGlnaHQucG9zaXRpb24ueCA9IGNhbWVyYS5wb3NpdGlvbi54ICsgMTAwO1xyXG4gICAgICAgIGxpZ2h0LnBvc2l0aW9uLnkgPSBjYW1lcmEucG9zaXRpb24ueSArIDEwMDtcclxuICAgICAgICBsaWdodC5wb3NpdGlvbi56ID0gY2FtZXJhLnBvc2l0aW9uLno7XHJcblxyXG4gICAgICAgIC8vYW5kIHJlbmRlclxyXG5cclxuICAgICAgICB2YXIgbGVmdCA9IE1hdGguZmxvb3Iod2luZG93V2lkdGggKiB2aWV3LmxlZnQpO1xyXG4gICAgICAgIHZhciBib3R0b20gPSBNYXRoLmZsb29yKCh3aW5kb3dIZWlnaHQpICogKHZpZXcudG9wICsgKHZpZXcuaGVpZ2h0KSkpO1xyXG4gICAgICAgIHZhciB3aWR0aCA9IE1hdGguZmxvb3Iod2luZG93V2lkdGggKiB2aWV3LndpZHRoKTtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gTWF0aC5mbG9vcih3aW5kb3dIZWlnaHQgKiB2aWV3LmhlaWdodCk7XHJcbiAgICAgICAgaWYgKHZpZXcud2lkdGggPiAwLjEgJiYgdmlldy5oZWlnaHQgPiAwLjEgJiYgdmlldy5pZCA8IGdsb2JhbERCLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRWaWV3cG9ydChsZWZ0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICByZW5kZXJlci5zZXRTY2lzc29yKGxlZnQsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgIHJlbmRlcmVyLmVuYWJsZVNjaXNzb3JUZXN0KHRydWUpO1xyXG5cclxuICAgICAgICAgICAgY2FtZXJhLmFzcGVjdCA9IHdpZHRoIC8gaGVpZ2h0O1xyXG4gICAgICAgICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGFzY2lpU2hhZGVyLmVuYWJsZWQpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlcmVyLnJlbmRlcihzY2VuZSwgY2FtZXJhLCBhc2NpaVNoYWRlci5ydFRleHR1cmVDb2xvciwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcG9zdHByb2Nlc3NpbmdcclxuICAgIGlmIChhc2NpaVNoYWRlci5lbmFibGVkKSB7XHJcbiAgICAgICAgdmFyIHNpemUgPSAoMC4yICsgMC44ICogd2luZG93SGVpZ2h0IC8gNjAwIC8gNCkgKiAxLjU7XHJcbiAgICAgICAgaWYgKHNpemUgPCAuNSlcclxuICAgICAgICAgICAgc2l6ZSA9IC41O1xyXG4gICAgICAgIC8vaWYgKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKVxyXG4gICAgICAgIC8vICAgIHNpemUgLz0gd2luZG93LmRldmljZVBpeGVsUmF0aW9cclxuICAgICAgICBpZiAoc2VsZWN0ZWQgIT0gLTEgJiYgIU1PQklMRV9WRVJTSU9OKSB7XHJcbiAgICAgICAgICAgIHNpemUgKj0gMS4zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV4dFJlbmRlclNjcmVlbnNob3QuZW5hYmxlZCkge1xyXG4gICAgICAgICAgICBzaXplICo9IDAuODtcclxuICAgICAgICAgICAgaWYgKG5leHRSZW5kZXJTY3JlZW5zaG90LnR5cGUgPT0gXCJnaWZcIikge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSAqPSAxLjI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5leHRSZW5kZXJTY3JlZW5zaG90LnR5cGUgPT0gXCJ0aHVtYm5haWxcIikge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSAqPSAxLjU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE1PQklMRV9WRVJTSU9OKSB7XHJcbiAgICAgICAgICAgIHNpemUgKj0gMS41O1xyXG4gICAgICAgIH1cclxuICAgICAgICB1bmlmb3Jtc1sgJ2ZvbnRTaXplJ10udmFsdWUgPSBuZXcgVEhSRUUuVmVjdG9yMihNYXRoLmZsb29yKHNpemUgKiBmb250V2lkdGgpLCBNYXRoLmZsb29yKHNpemUgKiBmb250SGVpZ2h0KSk7XHJcbiAgICAgICAgdW5pZm9ybXNbICdjaGFyTWFwU2l6ZSddLnZhbHVlID0gY2hhck51bSAqIE1hdGguZmxvb3IoZm9udFdpZHRoICogc2l6ZSk7XHJcblxyXG4gICAgICAgIHJlbmRlcmVyLnNldFZpZXdwb3J0KDAsIDAsIHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHQpO1xyXG4gICAgICAgIHJlbmRlcmVyLnNldFNjaXNzb3IoMCwgMCwgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XHJcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKGFzY2lpU2hhZGVyLnNjZW5lLCBhc2NpaVNoYWRlci5jYW1lcmEpO1xyXG5cclxuICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSwgYXNjaWlTaGFkZXIucnRUZXh0dXJlQ29sb3IsIHRydWUpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxuIl0sImZpbGUiOiJzY2VuZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
