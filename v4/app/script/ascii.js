var alphabetTexture;
var fontWidth = 10;
var fontHeight = 14;
var uniforms;
var alphabetCanvas;
var dpr = 1;
var charNum = 128;
var renderWindow = {width: window.innerWidth, height: window.innerHeight};
var asciiMode = 0;

function initPostprocessing() {

    var image = new Image(), texture = new THREE.Texture(image);
    var hash = document.createElement("canvas");
    hash.style.opacity = 0;
    image.onload = function () {
        texture.needsUpdate = true;
    };
    image.src = hash.toDataURL();

    var alphabetImage = new Image();
    alphabetCanvas = document.createElement('canvas');
    alphabetCanvas.setAttribute("id", "alphabetCanvas");

    alphabetTexture = new THREE.Texture(alphabetCanvas);
    alphabetTexture.needsUpdate = true;
    alphabetTexture.minFilter = THREE.NearestFilter;

    updateAlphabet();

    asciiShader.scene = new THREE.Scene();
    asciiShader.camera = new THREE.OrthographicCamera(renderWindow.width / -2, renderWindow.width / 2, renderWindow.height / 2, renderWindow.height / -2, -10000, 10000);
    asciiShader.camera.position.z = 100;

    var pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat};
    asciiShader.rtTextureDepth = new THREE.WebGLRenderTarget(renderWindow.width, renderWindow.height, pars);
    asciiShader.rtTextureColor = new THREE.WebGLRenderTarget(renderWindow.width, renderWindow.height, pars);
    asciiShader.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), null);
    asciiShader.quad.position.z = -500;
    asciiShader.scene.add(asciiShader.quad);
}

function updateAlphabet(string) {
    if (!string || string === "")
        string = '.\'`^",:;Il!i~+_-?][}{1)(/tfjrxnuvczmwqpdbkhaoXYUJCLQ0OZ#MW&8%B@$';
    alphabetCanvas.width = charNum * fontWidth * dpr;
    alphabetCanvas.height = fontHeight * dpr;
    var ctx = alphabetCanvas.getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, alphabetCanvas.width, alphabetCanvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 3 * dpr;
    ctx.font = fontHeight * 1.0 * dpr + "px arial";
    ctx.scale(1, -1);
    ctx.textAlign = 'center';
    for (var i = 0; i < charNum; i++) {
        var id = Math.floor(string.length * (1 - (i + 1) / (charNum)));
        var letter = string.substr(id, 1);
        for (var j = 0; j < 3; j++) {
            ctx.fillText(letter, (0.5 + i * fontWidth + fontWidth / 2 - 0.5) * dpr, -2.5 * dpr);
        }
    }
    alphabetTexture.needsUpdate = true;
}

function resizePostprocessing() {
    if (!asciiShader.camera)
        return;
    renderer.setSize(windowWidth, windowHeight);
    //renderer.domElement.style.position = "absolute";
    //renderer.domElement.style.top = headerHeight + "px";

    renderWindow = {width: windowWidth, height: windowHeight};

    asciiShader.camera.left = renderWindow.width / -2;
    asciiShader.camera.right = renderWindow.width / 2;
    asciiShader.camera.top = renderWindow.height / 2;
    asciiShader.camera.bottom = renderWindow.height / -2;
    asciiShader.camera.updateProjectionMatrix();

    asciiShader.quad.scale.x = renderWindow.width;
    asciiShader.quad.scale.y = renderWindow.height;

    var pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat};
    asciiShader.rtTextureColor = new THREE.WebGLRenderTarget(renderWindow.width, renderWindow.height, pars);
    asciiShader.material = new THREE.ShaderMaterial({
        uniforms: {
            inputTexture: {type: 't', value: asciiShader.rtTextureColor},
            asciiTexture: {type: 't', value: alphabetTexture},
            hashTexture: {type: 't', value: THREE.ImageUtils.loadTexture("/assets/images/fontHash.png")}, //
            mode: {type: 'f', value: asciiMode},
            numChars: {type: 'f', value: charNum},
            rx: {type: 'f', value: renderWindow.width},
            ry: {type: 'f', value: renderWindow.height},
            charMapSize: {type: 'f', value: charNum * fontWidth},
            fontSize: {type: 'v2', value: new THREE.Vector2(fontWidth, fontHeight)}

        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        side: THREE.DoubleSide
    });

    uniforms = asciiShader.material.uniforms;

    var material = new THREE.ShaderMaterial({
        fragmentShader: asciiShader.material.fragmentShader,
        vertexShader: asciiShader.material.vertexShader,
        uniforms: uniforms
    });

    asciiShader.quad.material = material;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhc2NpaS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYWxwaGFiZXRUZXh0dXJlO1xyXG52YXIgZm9udFdpZHRoID0gMTA7XHJcbnZhciBmb250SGVpZ2h0ID0gMTQ7XHJcbnZhciB1bmlmb3JtcztcclxudmFyIGFscGhhYmV0Q2FudmFzO1xyXG52YXIgZHByID0gMTtcclxudmFyIGNoYXJOdW0gPSAxMjg7XHJcbnZhciByZW5kZXJXaW5kb3cgPSB7d2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLCBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodH07XHJcbnZhciBhc2NpaU1vZGUgPSAwO1xyXG5cclxuZnVuY3Rpb24gaW5pdFBvc3Rwcm9jZXNzaW5nKCkge1xyXG5cclxuICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpLCB0ZXh0dXJlID0gbmV3IFRIUkVFLlRleHR1cmUoaW1hZ2UpO1xyXG4gICAgdmFyIGhhc2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gICAgaGFzaC5zdHlsZS5vcGFjaXR5ID0gMDtcclxuICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcclxuICAgIH07XHJcbiAgICBpbWFnZS5zcmMgPSBoYXNoLnRvRGF0YVVSTCgpO1xyXG5cclxuICAgIHZhciBhbHBoYWJldEltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICBhbHBoYWJldENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgYWxwaGFiZXRDYW52YXMuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJhbHBoYWJldENhbnZhc1wiKTtcclxuXHJcbiAgICBhbHBoYWJldFRleHR1cmUgPSBuZXcgVEhSRUUuVGV4dHVyZShhbHBoYWJldENhbnZhcyk7XHJcbiAgICBhbHBoYWJldFRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG4gICAgYWxwaGFiZXRUZXh0dXJlLm1pbkZpbHRlciA9IFRIUkVFLk5lYXJlc3RGaWx0ZXI7XHJcblxyXG4gICAgdXBkYXRlQWxwaGFiZXQoKTtcclxuXHJcbiAgICBhc2NpaVNoYWRlci5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xyXG4gICAgYXNjaWlTaGFkZXIuY2FtZXJhID0gbmV3IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYShyZW5kZXJXaW5kb3cud2lkdGggLyAtMiwgcmVuZGVyV2luZG93LndpZHRoIC8gMiwgcmVuZGVyV2luZG93LmhlaWdodCAvIDIsIHJlbmRlcldpbmRvdy5oZWlnaHQgLyAtMiwgLTEwMDAwLCAxMDAwMCk7XHJcbiAgICBhc2NpaVNoYWRlci5jYW1lcmEucG9zaXRpb24ueiA9IDEwMDtcclxuXHJcbiAgICB2YXIgcGFycyA9IHttaW5GaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlciwgbWFnRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsIGZvcm1hdDogVEhSRUUuUkdCRm9ybWF0fTtcclxuICAgIGFzY2lpU2hhZGVyLnJ0VGV4dHVyZURlcHRoID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0KHJlbmRlcldpbmRvdy53aWR0aCwgcmVuZGVyV2luZG93LmhlaWdodCwgcGFycyk7XHJcbiAgICBhc2NpaVNoYWRlci5ydFRleHR1cmVDb2xvciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlclRhcmdldChyZW5kZXJXaW5kb3cud2lkdGgsIHJlbmRlcldpbmRvdy5oZWlnaHQsIHBhcnMpO1xyXG4gICAgYXNjaWlTaGFkZXIucXVhZCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KDEsIDEpLCBudWxsKTtcclxuICAgIGFzY2lpU2hhZGVyLnF1YWQucG9zaXRpb24ueiA9IC01MDA7XHJcbiAgICBhc2NpaVNoYWRlci5zY2VuZS5hZGQoYXNjaWlTaGFkZXIucXVhZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUFscGhhYmV0KHN0cmluZykge1xyXG4gICAgaWYgKCFzdHJpbmcgfHwgc3RyaW5nID09PSBcIlwiKVxyXG4gICAgICAgIHN0cmluZyA9ICcuXFwnYF5cIiw6O0lsIWl+K18tP11bfXsxKSgvdGZqcnhudXZjem13cXBkYmtoYW9YWVVKQ0xRME9aI01XJjglQkAkJztcclxuICAgIGFscGhhYmV0Q2FudmFzLndpZHRoID0gY2hhck51bSAqIGZvbnRXaWR0aCAqIGRwcjtcclxuICAgIGFscGhhYmV0Q2FudmFzLmhlaWdodCA9IGZvbnRIZWlnaHQgKiBkcHI7XHJcbiAgICB2YXIgY3R4ID0gYWxwaGFiZXRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xyXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGFscGhhYmV0Q2FudmFzLndpZHRoLCBhbHBoYWJldENhbnZhcy5oZWlnaHQpO1xyXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRkZGRlwiO1xyXG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJyNGRkZGRkYnO1xyXG4gICAgY3R4LnNoYWRvd09mZnNldFggPSAwO1xyXG4gICAgY3R4LnNoYWRvd09mZnNldFkgPSAwO1xyXG4gICAgY3R4LnNoYWRvd0JsdXIgPSAzICogZHByO1xyXG4gICAgY3R4LmZvbnQgPSBmb250SGVpZ2h0ICogMS4wICogZHByICsgXCJweCBCVE1vbm9cIjtcclxuICAgIGN0eC5zY2FsZSgxLCAtMSk7XHJcbiAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJOdW07IGkrKykge1xyXG4gICAgICAgIHZhciBpZCA9IE1hdGguZmxvb3Ioc3RyaW5nLmxlbmd0aCAqICgxIC0gKGkgKyAxKSAvIChjaGFyTnVtKSkpO1xyXG4gICAgICAgIHZhciBsZXR0ZXIgPSBzdHJpbmcuc3Vic3RyKGlkLCAxKTtcclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDM7IGorKykge1xyXG4gICAgICAgICAgICBjdHguZmlsbFRleHQobGV0dGVyLCAoMC41ICsgaSAqIGZvbnRXaWR0aCArIGZvbnRXaWR0aCAvIDIgLSAwLjUpICogZHByLCAtMi41ICogZHByKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhbHBoYWJldFRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNpemVQb3N0cHJvY2Vzc2luZygpIHtcclxuICAgIGlmICghYXNjaWlTaGFkZXIuY2FtZXJhKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHJlbmRlcmVyLnNldFNpemUod2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XHJcbiAgICByZW5kZXJlci5kb21FbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgcmVuZGVyZXIuZG9tRWxlbWVudC5zdHlsZS50b3AgPSBoZWFkZXJIZWlnaHQgKyBcInB4XCI7XHJcblxyXG4gICAgcmVuZGVyV2luZG93ID0ge3dpZHRoOiB3aW5kb3dXaWR0aCwgaGVpZ2h0OiB3aW5kb3dIZWlnaHR9O1xyXG5cclxuICAgIGFzY2lpU2hhZGVyLmNhbWVyYS5sZWZ0ID0gcmVuZGVyV2luZG93LndpZHRoIC8gLTI7XHJcbiAgICBhc2NpaVNoYWRlci5jYW1lcmEucmlnaHQgPSByZW5kZXJXaW5kb3cud2lkdGggLyAyO1xyXG4gICAgYXNjaWlTaGFkZXIuY2FtZXJhLnRvcCA9IHJlbmRlcldpbmRvdy5oZWlnaHQgLyAyO1xyXG4gICAgYXNjaWlTaGFkZXIuY2FtZXJhLmJvdHRvbSA9IHJlbmRlcldpbmRvdy5oZWlnaHQgLyAtMjtcclxuICAgIGFzY2lpU2hhZGVyLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XHJcblxyXG4gICAgYXNjaWlTaGFkZXIucXVhZC5zY2FsZS54ID0gcmVuZGVyV2luZG93LndpZHRoO1xyXG4gICAgYXNjaWlTaGFkZXIucXVhZC5zY2FsZS55ID0gcmVuZGVyV2luZG93LmhlaWdodDtcclxuXHJcbiAgICB2YXIgcGFycyA9IHttaW5GaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlciwgbWFnRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsIGZvcm1hdDogVEhSRUUuUkdCRm9ybWF0fTtcclxuICAgIGFzY2lpU2hhZGVyLnJ0VGV4dHVyZUNvbG9yID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0KHJlbmRlcldpbmRvdy53aWR0aCwgcmVuZGVyV2luZG93LmhlaWdodCwgcGFycyk7XHJcbiAgICBhc2NpaVNoYWRlci5tYXRlcmlhbCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCh7XHJcbiAgICAgICAgdW5pZm9ybXM6IHtcclxuICAgICAgICAgICAgaW5wdXRUZXh0dXJlOiB7dHlwZTogJ3QnLCB2YWx1ZTogYXNjaWlTaGFkZXIucnRUZXh0dXJlQ29sb3J9LFxyXG4gICAgICAgICAgICBhc2NpaVRleHR1cmU6IHt0eXBlOiAndCcsIHZhbHVlOiBhbHBoYWJldFRleHR1cmV9LFxyXG4gICAgICAgICAgICBoYXNoVGV4dHVyZToge3R5cGU6ICd0JywgdmFsdWU6IFRIUkVFLkltYWdlVXRpbHMubG9hZFRleHR1cmUoXCIvYXNzZXRzL2ltYWdlcy9mb250SGFzaC5wbmdcIil9LCAvL1xyXG4gICAgICAgICAgICBtb2RlOiB7dHlwZTogJ2YnLCB2YWx1ZTogYXNjaWlNb2RlfSxcclxuICAgICAgICAgICAgbnVtQ2hhcnM6IHt0eXBlOiAnZicsIHZhbHVlOiBjaGFyTnVtfSxcclxuICAgICAgICAgICAgcng6IHt0eXBlOiAnZicsIHZhbHVlOiByZW5kZXJXaW5kb3cud2lkdGh9LFxyXG4gICAgICAgICAgICByeToge3R5cGU6ICdmJywgdmFsdWU6IHJlbmRlcldpbmRvdy5oZWlnaHR9LFxyXG4gICAgICAgICAgICBjaGFyTWFwU2l6ZToge3R5cGU6ICdmJywgdmFsdWU6IGNoYXJOdW0gKiBmb250V2lkdGh9LFxyXG4gICAgICAgICAgICBmb250U2l6ZToge3R5cGU6ICd2MicsIHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMihmb250V2lkdGgsIGZvbnRIZWlnaHQpfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHZlcnRleFNoYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZlcnRleFNoYWRlcicpLnRleHRDb250ZW50LFxyXG4gICAgICAgIGZyYWdtZW50U2hhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnJhZ21lbnRTaGFkZXInKS50ZXh0Q29udGVudCxcclxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlXHJcbiAgICB9KTtcclxuXHJcbiAgICB1bmlmb3JtcyA9IGFzY2lpU2hhZGVyLm1hdGVyaWFsLnVuaWZvcm1zO1xyXG5cclxuICAgIHZhciBtYXRlcmlhbCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCh7XHJcbiAgICAgICAgZnJhZ21lbnRTaGFkZXI6IGFzY2lpU2hhZGVyLm1hdGVyaWFsLmZyYWdtZW50U2hhZGVyLFxyXG4gICAgICAgIHZlcnRleFNoYWRlcjogYXNjaWlTaGFkZXIubWF0ZXJpYWwudmVydGV4U2hhZGVyLFxyXG4gICAgICAgIHVuaWZvcm1zOiB1bmlmb3Jtc1xyXG4gICAgfSk7XHJcblxyXG4gICAgYXNjaWlTaGFkZXIucXVhZC5tYXRlcmlhbCA9IG1hdGVyaWFsO1xyXG59Il0sImZpbGUiOiJhc2NpaS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
