var shading = THREE.FlatShading;//THREE.SmoothShading//
var shininess = 50;

var sphere, sphere2, plane, title;
var start = Date.now();
var geoms = [];
var materials = [];
var meshFaceMaterial;
var Seed;
var rolloverMesh;
var sampleMat;
var rollOverObject, rollOverObject2;
var timer = 0;

var size = 0.5;

function bugGlobals() {
    generateGeometries();

    rollOverObject = new THREE.Group();
    rollOverObject2 = new THREE.Group();
    scene.add(rollOverObject);
    scene.add(rollOverObject2);

    for (var i = 0; i < TYPES.length; i++) {
        var greymat = new THREE.MeshPhongMaterial({color: 0, shininess: shininess, shading: shading, wireframe: wireframe, wireframeLinewidth: 15,
            side: THREE.DoubleSide});

        setColor(greymat, i);
        materials.push(greymat);
    }
    meshFaceMaterial = new THREE.MeshFaceMaterial(materials);

    sampleMat = new THREE.MeshPhongMaterial({color: 0xffffff, shininess: shininess, shading: shading, wireframe: wireframe, wireframeLinewidth: 15,
        side: THREE.DoubleSide});
}

function setColor(sampleMat, id) {
    sampleMat.color.setHSL(Math.cos(id * 4.1) / 2 + 0.5, 0.8, 0.6);
}

function generateGeometries() {
    addGeom(new THREE.TetrahedronGeometry(20, 1), [0, 0, 0], [40, 0, 0], [1, 1, 1]);

    // TEST AREA
    for (var i = 0; i < 100; i++) {
        //addGeom(Minerals(new THREE.CircleGeometry(15, 6)), [0, 0, 0], [0, 20, 0], [2, 1, 1])

    }

    // MINERALS PETTLE
    addGeom(Minerals(Pettle()), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(Pettle()), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.CircleGeometry(15, 6)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.CircleGeometry(15, 6)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

    // MINERALS HORNS
    addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.CylinderGeometry(3, 10, 20, 3, 1)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

    // BUBBLES
    addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.SphereGeometry(4, 6, 4)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // MINERALS TRIANGLES
    addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TetrahedronGeometry(20, 0)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

    // SPIKES
    addGeom(new THREE.CylinderGeometry(0, 6, 60, 5), [-Math.PI / 2, 0, 0], [0, 0, -30], [1.5, 0.7, 1]);
    addGeom(new THREE.CylinderGeometry(0, 6, 60, 5), [-Math.PI / 2, 0, 0], [0, 0, -30], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(0, 6, 60, 5), [-Math.PI / 2, 0, 0], [20, 20, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(0, 6, 70, 4), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(0, 6, 80, 4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

    // MINERALS DIAMONDS
    addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.OctahedronGeometry(15, 0)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

    // GRID CUBES
    addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.CylinderGeometry(5, 5, 7, 4, 1)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // GRID TRIANGLES
    addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TetrahedronGeometry(6, 0)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // SINGLE ROCKS
    addGeom(new THREE.OctahedronGeometry(15, 0), [0, 0, 0], [0, -40, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(15, 15, 20, 4, 1), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TetrahedronGeometry(20, 0), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TetrahedronGeometry(20, 0), [0, 0, 0], [20, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TetrahedronGeometry(20, 0), [0, 0, 0], [0, -40, 0], [1, 1, 1]);

    // CINDER BLOCKS
    addGeom(new THREE.CylinderGeometry(7, 7, 40, 3, 1), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(7, 7, 40, 3, 1), [0, 0, Math.PI / 2], [30, 0, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(3, 10, 40, 3, 1), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(10, 3, 40, 4, 1), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(new THREE.CylinderGeometry(10, 10, 40, 4, 1), [0, 0, 0], [0, -40, 30], [1, 1, 1]);

    // PETTLES
    addGeom(Pettle(), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Pettle(), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(new THREE.CircleGeometry(20, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.CircleGeometry(30, 10), [0, 0, 0], [0, -30, 0], [1, 1, 1]);
    addGeom(new THREE.PlaneGeometry(30, 30), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(new THREE.PlaneGeometry(40, 30), [0, 0, 0], [30, -30, 0], [1, 1, 1]);
    addGeom(Pettle(), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Pettle(), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // MINERAL ANTENNAS
    addGeom(Minerals(Antenna(2)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(Antenna(2)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);

    // DOUGHNUTS
    addGeom(new THREE.TorusGeometry(20, 7, 4, 10), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 7, 4, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 7, 10, 10), [0, 0, 0], [20, 10, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 5, 4, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 5, 4, 5), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 2, 4, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusGeometry(20, 4, 4, 10), [0, 0, 0], [40, 0, 0], [1, 1, 1]);

    // TENTACLES
    addGeom(Tentacle(4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Tentacle(5), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Tentacle(6), [0, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

    // LEGS
    addGeom(Leg(4, 3), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(4, 6), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(5, 3), [0, 0, Math.PI / 2], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(6, 4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(7, 3), [0, Math.PI / 2, Math.PI / 2], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(8, 5), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(9, 2), [0, 0, Math.PI / 2], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(10, 6), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Leg(11, 3), [0, Math.PI / 2, Math.PI / 2], [0, 0, 0], [1, 1, 1]);

    // ANTENNAS
    addGeom(Antenna(4), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Antenna(5), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Antenna(6), [0, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(Antenna(7), [Math.PI / 2, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

    // GRID EMPTY TRIANGLES
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 3)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // GRID CIRCLES
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [-Math.PI / 2, 0, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [0, Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(10, 2, 4, 5)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);
    addGeom(Grid(new THREE.TorusGeometry(13, 3, 3, 5)), [0, -Math.PI / 2, 0], [30, 0, 0], [1, 1, 1]);

    // MINERALS EMPTY TRIANGLES
    addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(new THREE.TorusGeometry(10, 2, 4, 3)), [0, 0, 0], [30, 0, 0], [1, 1, 1]);

    // LONG STRAIGHT LINES
    addGeom(TentacleStraight(), [0, 0, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(TentacleStraight(), [0, -Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);
    addGeom(TentacleStraight(), [0, Math.PI / 2, 0], [0, 0, 0], [1, 1, 1]);

    // PRETZELS
    addGeom(new THREE.TorusKnotGeometry(15, 3, 13, 3), [0, Math.PI / 2, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusKnotGeometry(15, 3, 10, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusKnotGeometry(15, 3, 6, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);
    addGeom(new THREE.TorusKnotGeometry(15, 3, 13, 3), [0, 0, 0], [40, 0, 0], [1, 1, 1]);

    // MINERALS LINES
    addGeom(Minerals(TentacleStraight()), [0, 0, 0], [0, 20, 0], [1, 1, 1]);
    addGeom(Minerals(TentacleStraight()), [0, 0, -Math.PI / 2], [20, 0, 0], [1, 1, 1]);
    addGeom(Minerals(TentacleStraight()), [0, 0, Math.PI / 2], [40, 0, 0], [1, 1, 1]);
    addGeom(Minerals(TentacleStraight()), [0, 0, 0], [30, 0, 0], [1, 1, 1]);
}

function addGeom(geom, rotationArray, translationArray, scaleArray) {
    geom.applyMatrix(new THREE.Matrix4().scale(new THREE.Vector3(scaleArray[0], scaleArray[1], scaleArray[2])));
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(rotationArray[0]));
    geom.applyMatrix(new THREE.Matrix4().makeRotationY(rotationArray[1]));
    geom.applyMatrix(new THREE.Matrix4().makeRotationZ(rotationArray[2]));
    geom.applyMatrix(new THREE.Matrix4().makeTranslation(translationArray[0], translationArray[1], translationArray[2]));
    geoms.push(geom);
}

function bug(scene, db) {
    for (var i = 0; i < 1; i++) {
        var geometry = new THREE.Geometry();

        var globalSize = 0;

        for (var j = 0; j < db.files.length; j++) {
            var id = j % db.files.length;
            var type = db.files[id].type;
            var pregeom = geoms[type];
            var mat = materials[type];
            createPregeom(geometry, db.files[id].size, pregeom, type);
            globalSize += db.files[id].size;
        }

        var sizePerc = globalSize / 1000000;
        if (sizePerc > 1)
            sizePerc = 1;
        db.speed = 0.001 + (1 - sizePerc) * 0.01;

        db.object = new THREE.Mesh(geometry, meshFaceMaterial);
        scene.add(db.object);

        db.object2 = new THREE.Mesh(geometry, meshFaceMaterial);
        db.object2.scale.x = -db.object.scale.x;
        scene.add(db.object2);

    }
}

function createPregeom(geometry, size, pregeom, type) {
    var fileScale = 0.1;
    var fileScaleOrg = 0.1;
    if (size) {
        fileScale = size / 300000;
        fileScaleOrg = size / 300000;
    }
    if (fileScale < 0.4) {
        fileScale = 0.4;
    }
    if (fileScale > 1) {
        fileScale = 1;
    }

    for (var k = 0; k < fileScale * 4; k++) {
        var submesh = new THREE.Mesh(pregeom, null);

        submesh.scale.x *= fileScale * 4;
        submesh.scale.y *= fileScale * 4;
        submesh.scale.z *= fileScale * 4;

        var randoms = [Math.sin((-1 + k * 0.3) * fileScaleOrg * 687 + 0.1) / 2 + 0.5, Math.sin((2 + k * 0.9) * fileScaleOrg * 456 + 0.2) / 2 + 0.5, Math.sin((1 + k) * fileScaleOrg * 546 + 0.3) / 2 + 0.5];

        submesh.rotation.set(randoms[0] * 7, randoms[1] * 7, randoms[2] * 7);

        var randoms2 = [Math.sin((2 + k) * fileScaleOrg * 413 + 0.1) / 2 + 0.5, Math.sin((2 + k) * fileScaleOrg * 543 + 0.2) / 2 + 0.5, Math.sin((2 + k) * fileScaleOrg * 123 + 0.3) / 2 + 0.5];

        submesh.position.x = (randoms2[1] - 0.5) * 100 * fileScale;
        submesh.position.y = (randoms2[0] - 0.5) * 100 * fileScale;
        submesh.position.z = (randoms2[2] - 0.5) * 100 * fileScale;

        submesh.updateMatrix();
        if (pregeom) {
            geometry.merge(pregeom, submesh.matrix, type);
        }
    }
}

function rolloverLanguage(language) {
    var o = [rollOverObject, rollOverObject2];
    if (!language) {
        if (rolloverMesh) {
            o[0].remove(rolloverMesh[0]);
            o[1].remove(rolloverMesh[1]);
        }
        rolloverMesh = null;
        return;
    }
    var id = analyze(language);
    var pregeom = new THREE.Geometry();
    var size = 200000;
    if (globalDB[selected]) {
        for (var i = 0; i < globalDB[selected].files.length; i++) {
            if (globalDB[selected].files[i].type == id) {
                size = globalDB[selected].files[i].size;
            }
        }
    }
    createPregeom(pregeom, size, geoms[id], id);
    var mat = sampleMat;
    setColor(sampleMat, id);
    rolloverMesh = [];
    for (var i = 0; i < 2; i++) {
        rolloverMesh[i] = new THREE.Mesh(pregeom, mat);
        rolloverMesh[i].scale.set(1 - 2 * i, 1, 1);
        o[i].add(rolloverMesh[i]);
    }
}

function Pettle() {
    var tentacleGeom = new THREE.SphereGeometry(15, 3, 4);
    var mesh = new THREE.Mesh(tentacleGeom, null);
    mesh.scale.z = 0.2;
    mesh.updateMatrix();
    mesh.geometry.applyMatrix(mesh.matrix);
    return(mesh.geometry);
}

function Minerals(geom, max) {
    if (!max)
        max = 4;
    var tentacleGeom = new THREE.Geometry();
    var dis = 0;
    for (var j = 0; j < max; j++) {
        var mesh = new THREE.Mesh(geom.clone(), null);
        mesh.position.set((25 - dis) / 3, dis / 2, 0);
        dis += 25 * (1 - (j + 1) / max);
        mesh.scale.set(1 - j / max, 1 - j / max, 1 - j / max);
        mesh.rotation.set(0, 0, 1.5 * j / max);
        mesh.updateMatrix();
        tentacleGeom.merge(mesh.geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function Leg(num, radius) {
    var tentacleGeom = new THREE.Geometry();
    for (var j = 0; j < 2; j++) {
        var randomPoints = [];
        for (var i = 0; i < num; i++) {
            randomPoints.push(new THREE.Vector3(-30 * i, -40 * Math.sin(i * 2), 0));
        }
        var randomSpline = new THREE.SplineCurve3(randomPoints);
        var geometry = new THREE.TubeGeometry(randomSpline, 3, radius, 7);
        var mesh = new THREE.Mesh(geometry, null);
        mesh.rotation.set(Math.sin(j), Math.sin(j + 1), Math.sin(j + 0.5));
        mesh.updateMatrix();
        tentacleGeom.merge(geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function Antenna(num) {
    var tentacleGeom = new THREE.Geometry();
    for (var j = 0; j < 2; j++) {
        var randomPoints = [];
        for (var i = 0; i < num; i++) {
            randomPoints.push(new THREE.Vector3(20 * i, 15 * Math.sin(j+i * num), 0));
        }
        var randomSpline = new THREE.SplineCurve3(randomPoints);
        var geometry = new THREE.TubeGeometry(randomSpline, 5, 2, 5);
        var mesh = new THREE.Mesh(geometry, null);
        mesh.rotation.set(Math.sin(j), Math.sin(j + 1), Math.sin(j + 0.5));
        mesh.updateMatrix();
        tentacleGeom.merge(geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function Tentacle(num) {
    var tentacleGeom = new THREE.Geometry();
    for (var j = 0; j < 2; j++) {
        var randomPoints = [];
        for (var i = 0; i < num; i++) {
            randomPoints.push(new THREE.Vector3(20 * i, 15 * Math.sin(j+i * num / 2), 0));
        }
        var randomSpline = new THREE.SplineCurve3(randomPoints);
        var geometry = new THREE.TubeGeometry(randomSpline, 5, 2, 5);
        var mesh = new THREE.Mesh(geometry, null);
        mesh.rotation.set(Math.sin(j), Math.sin(j + 1), Math.sin(j + 0.5));
        mesh.updateMatrix();
        tentacleGeom.merge(geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function TentacleStraight() {
    var tentacleGeom = new THREE.Geometry();
    for (var j = 0; j < 1; j++) {
        var randomPoints = [];
        randomPoints.push(new THREE.Vector3(0, 0, 0));
        for (var i = 0; i < 2; i++) {
            randomPoints.push(new THREE.Vector3(0, 0 - 300 * i, 0));
        }
        var randomSpline = new THREE.SplineCurve3(randomPoints);
        var geometry = new THREE.TubeGeometry(randomSpline, 2, 3, 2);
        var mesh = new THREE.Mesh(geometry, null);
        mesh.position.set(10 * Math.sin(j), 10 * Math.sin(j + 1), 10 * Math.sin(j + 0.5));
        mesh.updateMatrix();
        tentacleGeom.merge(geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function Grid(geom) {
    var tentacleGeom = new THREE.Geometry();
    for (var j = 0; j < 4; j++) {
        var geometry = geom;
        var mesh = new THREE.Mesh(geometry, null);
        mesh.position.set(10 * Math.sin(j), 10 * Math.sin(j + 1), 10 * Math.sin(j + 0.5));
        mesh.updateMatrix();
        tentacleGeom.merge(geometry, mesh.matrix);
    }
    return(tentacleGeom);
}

function updateBug(db, offset) {
    if (!movement || !db || !db.object || !db.object2)
        return;
    var object = db.object;
    var object2 = db.object2;
    timer += 0.6;

    object.rotation.z = Math.sin(timer * db.speed + offset) / 10;
    object2.rotation.z = -Math.sin(timer * db.speed + offset) / 10;

    object.position.y = Math.sin(timer * db.speed + offset) * 10 / 2;
    object2.position.y = Math.sin(timer * db.speed + offset) * 10 / 2;

    if (offset == selected || offset === 0) {
        rollOverObject.rotation.z = object.rotation.z;
        rollOverObject2.rotation.z = object2.rotation.z;

        rollOverObject.position.y = object.position.y;
        rollOverObject2.position.y = object2.position.y;
    }
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(Math.floor(r)) + componentToHex(Math.floor(g)) + componentToHex(Math.floor(b));
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJvYmplY3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBzaGFkaW5nID0gVEhSRUUuRmxhdFNoYWRpbmc7Ly9USFJFRS5TbW9vdGhTaGFkaW5nLy9cclxudmFyIHNoaW5pbmVzcyA9IDUwO1xyXG5cclxudmFyIHNwaGVyZSwgc3BoZXJlMiwgcGxhbmUsIHRpdGxlO1xyXG52YXIgc3RhcnQgPSBEYXRlLm5vdygpO1xyXG52YXIgZ2VvbXMgPSBbXTtcclxudmFyIG1hdGVyaWFscyA9IFtdO1xyXG52YXIgbWVzaEZhY2VNYXRlcmlhbDtcclxudmFyIFNlZWQ7XHJcbnZhciByb2xsb3Zlck1lc2g7XHJcbnZhciBzYW1wbGVNYXQ7XHJcbnZhciByb2xsT3Zlck9iamVjdCwgcm9sbE92ZXJPYmplY3QyO1xyXG52YXIgdGltZXIgPSAwO1xyXG5cclxudmFyIHNpemUgPSAwLjU7XHJcblxyXG5mdW5jdGlvbiBidWdHbG9iYWxzKCkge1xyXG4gICAgZ2VuZXJhdGVHZW9tZXRyaWVzKCk7XHJcblxyXG4gICAgcm9sbE92ZXJPYmplY3QgPSBuZXcgVEhSRUUuR3JvdXAoKTtcclxuICAgIHJvbGxPdmVyT2JqZWN0MiA9IG5ldyBUSFJFRS5Hcm91cCgpO1xyXG4gICAgc2NlbmUuYWRkKHJvbGxPdmVyT2JqZWN0KTtcclxuICAgIHNjZW5lLmFkZChyb2xsT3Zlck9iamVjdDIpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgVFlQRVMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgZ3JleW1hdCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7Y29sb3I6IDAsIHNoaW5pbmVzczogc2hpbmluZXNzLCBzaGFkaW5nOiBzaGFkaW5nLCB3aXJlZnJhbWU6IHdpcmVmcmFtZSwgd2lyZWZyYW1lTGluZXdpZHRoOiAxNSxcclxuICAgICAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZX0pO1xyXG5cclxuICAgICAgICBzZXRDb2xvcihncmV5bWF0LCBpKTtcclxuICAgICAgICBtYXRlcmlhbHMucHVzaChncmV5bWF0KTtcclxuICAgIH1cclxuICAgIG1lc2hGYWNlTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEZhY2VNYXRlcmlhbChtYXRlcmlhbHMpO1xyXG5cclxuICAgIHNhbXBsZU1hdCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7Y29sb3I6IDB4ZmZmZmZmLCBzaGluaW5lc3M6IHNoaW5pbmVzcywgc2hhZGluZzogc2hhZGluZywgd2lyZWZyYW1lOiB3aXJlZnJhbWUsIHdpcmVmcmFtZUxpbmV3aWR0aDogMTUsXHJcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZX0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDb2xvcihzYW1wbGVNYXQsIGlkKSB7XHJcbiAgICBzYW1wbGVNYXQuY29sb3Iuc2V0SFNMKE1hdGguY29zKGlkICogNC4xKSAvIDIgKyAwLjUsIDAuOCwgMC42KTtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2VuZXJhdGVHZW9tZXRyaWVzKCkge1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSgyMCwgMSksIFswLCAwLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuXHJcbiAgICAvLyBURVNUIEFSRUFcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcclxuICAgICAgICAvL2FkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLkNpcmNsZUdlb21ldHJ5KDE1LCA2KSksIFswLCAwLCAwXSwgWzAsIDIwLCAwXSwgWzIsIDEsIDFdKVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvLyBNSU5FUkFMUyBQRVRUTEVcclxuICAgIGFkZEdlb20oTWluZXJhbHMoUGV0dGxlKCkpLCBbMCwgMCwgMF0sIFswLCAyMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKFBldHRsZSgpKSwgWzAsIDAsIC1NYXRoLlBJIC8gMl0sIFsyMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgxNSwgNikpLCBbMCwgMCwgTWF0aC5QSSAvIDJdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShNaW5lcmFscyhuZXcgVEhSRUUuQ2lyY2xlR2VvbWV0cnkoMTUsIDYpKSwgWzAsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIE1JTkVSQUxTIEhPUk5TXHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDMsIDEwLCAyMCwgMywgMSkpLCBbMCwgMCwgMF0sIFswLCAyMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDMsIDEwLCAyMCwgMywgMSkpLCBbMCwgMCwgLU1hdGguUEkgLyAyXSwgWzIwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMywgMTAsIDIwLCAzLCAxKSksIFswLCAwLCBNYXRoLlBJIC8gMl0sIFs0MCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDMsIDEwLCAyMCwgMywgMSkpLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gQlVCQkxFU1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSg0LCA2LCA0KSksIFswLCAwLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoNCwgNiwgNCkpLCBbLU1hdGguUEkgLyAyLCAwLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoNCwgNiwgNCkpLCBbMCwgTWF0aC5QSSAvIDIsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSg0LCA2LCA0KSksIFswLCAtTWF0aC5QSSAvIDIsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIE1JTkVSQUxTIFRSSUFOR0xFU1xyXG4gICAgYWRkR2VvbShNaW5lcmFscyhuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSgyMCwgMCkpLCBbMCwgMCwgMF0sIFswLCAyMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5UZXRyYWhlZHJvbkdlb21ldHJ5KDIwLCAwKSksIFswLCAwLCAtTWF0aC5QSSAvIDJdLCBbMjAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShNaW5lcmFscyhuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSgyMCwgMCkpLCBbMCwgMCwgTWF0aC5QSSAvIDJdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShNaW5lcmFscyhuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSgyMCwgMCkpLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gU1BJS0VTXHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAsIDYsIDYwLCA1KSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFswLCAwLCAtMzBdLCBbMS41LCAwLjcsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMCwgNiwgNjAsIDUpLCBbLU1hdGguUEkgLyAyLCAwLCAwXSwgWzAsIDAsIC0zMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAsIDYsIDYwLCA1KSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFsyMCwgMjAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLCA2LCA3MCwgNCksIFswLCAwLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLCA2LCA4MCwgNCksIFswLCAtTWF0aC5QSSAvIDIsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gTUlORVJBTFMgRElBTU9ORFNcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLk9jdGFoZWRyb25HZW9tZXRyeSgxNSwgMCkpLCBbMCwgMCwgMF0sIFswLCAyMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5PY3RhaGVkcm9uR2VvbWV0cnkoMTUsIDApKSwgWzAsIDAsIC1NYXRoLlBJIC8gMl0sIFsyMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKG5ldyBUSFJFRS5PY3RhaGVkcm9uR2VvbWV0cnkoMTUsIDApKSwgWzAsIDAsIE1hdGguUEkgLyAyXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLk9jdGFoZWRyb25HZW9tZXRyeSgxNSwgMCkpLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gR1JJRCBDVUJFU1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDUsIDUsIDcsIDQsIDEpKSwgWzAsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDUsIDUsIDcsIDQsIDEpKSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEdyaWQobmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoNSwgNSwgNywgNCwgMSkpLCBbMCwgTWF0aC5QSSAvIDIsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDUsIDUsIDcsIDQsIDEpKSwgWzAsIC1NYXRoLlBJIC8gMiwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gR1JJRCBUUklBTkdMRVNcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSg2LCAwKSksIFswLCAwLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSg2LCAwKSksIFstTWF0aC5QSSAvIDIsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShHcmlkKG5ldyBUSFJFRS5UZXRyYWhlZHJvbkdlb21ldHJ5KDYsIDApKSwgWzAsIE1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSg2LCAwKSksIFswLCAtTWF0aC5QSSAvIDIsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIFNJTkdMRSBST0NLU1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuT2N0YWhlZHJvbkdlb21ldHJ5KDE1LCAwKSwgWzAsIDAsIDBdLCBbMCwgLTQwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMTUsIDE1LCAyMCwgNCwgMSksIFswLCAwLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVGV0cmFoZWRyb25HZW9tZXRyeSgyMCwgMCksIFswLCAwLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLlRldHJhaGVkcm9uR2VvbWV0cnkoMjAsIDApLCBbMCwgMCwgMF0sIFsyMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5UZXRyYWhlZHJvbkdlb21ldHJ5KDIwLCAwKSwgWzAsIDAsIDBdLCBbMCwgLTQwLCAwXSwgWzEsIDEsIDFdKTtcclxuXHJcbiAgICAvLyBDSU5ERVIgQkxPQ0tTXHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDcsIDcsIDQwLCAzLCAxKSwgWzAsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSg3LCA3LCA0MCwgMywgMSksIFswLCAwLCBNYXRoLlBJIC8gMl0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDMsIDEwLCA0MCwgMywgMSksIFswLCAwLCAwXSwgWzAsIDIwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMTAsIDMsIDQwLCA0LCAxKSwgWzAsIDAsIDBdLCBbMCwgMjAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgxMCwgMTAsIDQwLCA0LCAxKSwgWzAsIDAsIDBdLCBbMCwgLTQwLCAzMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gUEVUVExFU1xyXG4gICAgYWRkR2VvbShQZXR0bGUoKSwgWzAsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShQZXR0bGUoKSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgyMCwgMTApLCBbMCwgMCwgMF0sIFs0MCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgzMCwgMTApLCBbMCwgMCwgMF0sIFswLCAtMzAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgzMCwgMzApLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDQwLCAzMCksIFswLCAwLCAwXSwgWzMwLCAtMzAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShQZXR0bGUoKSwgWzAsIE1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oUGV0dGxlKCksIFswLCAtTWF0aC5QSSAvIDIsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIE1JTkVSQUwgQU5URU5OQVNcclxuICAgIGFkZEdlb20oTWluZXJhbHMoQW50ZW5uYSgyKSksIFswLCAwLCAwXSwgWzAsIDIwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMoQW50ZW5uYSgyKSksIFswLCAwLCAtTWF0aC5QSSAvIDJdLCBbMjAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIERPVUdITlVUU1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgyMCwgNywgNCwgMTApLCBbMCwgMCwgMF0sIFswLCAyMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5Ub3J1c0dlb21ldHJ5KDIwLCA3LCA0LCAxMCksIFswLCAwLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMjAsIDcsIDEwLCAxMCksIFswLCAwLCAwXSwgWzIwLCAxMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKG5ldyBUSFJFRS5Ub3J1c0dlb21ldHJ5KDIwLCA1LCA0LCAzKSwgWzAsIDAsIDBdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgyMCwgNSwgNCwgNSksIFswLCAwLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMjAsIDIsIDQsIDEwKSwgWzAsIDAsIDBdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgyMCwgNCwgNCwgMTApLCBbMCwgMCwgMF0sIFs0MCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gVEVOVEFDTEVTXHJcbiAgICBhZGRHZW9tKFRlbnRhY2xlKDQpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShUZW50YWNsZSg1KSwgWzAsIDAsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKFRlbnRhY2xlKDYpLCBbMCwgTWF0aC5QSSAvIDIsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gTEVHU1xyXG4gICAgYWRkR2VvbShMZWcoNCwgMyksIFswLCAwLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShMZWcoNCwgNiksIFswLCAwLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShMZWcoNSwgMyksIFswLCAwLCBNYXRoLlBJIC8gMl0sIFswLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTGVnKDYsIDQpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShMZWcoNywgMyksIFswLCBNYXRoLlBJIC8gMiwgTWF0aC5QSSAvIDJdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKExlZyg4LCA1KSwgWzAsIDAsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKExlZyg5LCAyKSwgWzAsIDAsIE1hdGguUEkgLyAyXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShMZWcoMTAsIDYpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShMZWcoMTEsIDMpLCBbMCwgTWF0aC5QSSAvIDIsIE1hdGguUEkgLyAyXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIEFOVEVOTkFTXHJcbiAgICBhZGRHZW9tKEFudGVubmEoNCksIFswLCAtTWF0aC5QSSAvIDIsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEFudGVubmEoNSksIFswLCAwLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShBbnRlbm5hKDYpLCBbMCwgTWF0aC5QSSAvIDIsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEFudGVubmEoNyksIFtNYXRoLlBJIC8gMiwgTWF0aC5QSSAvIDIsIDBdLCBbMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcblxyXG4gICAgLy8gR1JJRCBFTVBUWSBUUklBTkdMRVNcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMCwgMiwgNCwgMykpLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEdyaWQobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDMpKSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEdyaWQobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDMpKSwgWzAsIE1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMCwgMiwgNCwgMykpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuXHJcbiAgICAvLyBHUklEIENJUkNMRVNcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMCwgMiwgNCwgNSkpLCBbMCwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEdyaWQobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDUpKSwgWy1NYXRoLlBJIC8gMiwgMCwgMF0sIFszMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKEdyaWQobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDUpKSwgWzAsIE1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMCwgMiwgNCwgNSkpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oR3JpZChuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMywgMywgMywgNSkpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuXHJcbiAgICAvLyBNSU5FUkFMUyBFTVBUWSBUUklBTkdMRVNcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDMpKSwgWzAsIDAsIDBdLCBbMCwgMjAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShNaW5lcmFscyhuZXcgVEhSRUUuVG9ydXNHZW9tZXRyeSgxMCwgMiwgNCwgMykpLCBbMCwgMCwgLU1hdGguUEkgLyAyXSwgWzIwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDMpKSwgWzAsIDAsIE1hdGguUEkgLyAyXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMTAsIDIsIDQsIDMpKSwgWzAsIDAsIDBdLCBbMzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIExPTkcgU1RSQUlHSFQgTElORVNcclxuICAgIGFkZEdlb20oVGVudGFjbGVTdHJhaWdodCgpLCBbMCwgMCwgMF0sIFswLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oVGVudGFjbGVTdHJhaWdodCgpLCBbMCwgLU1hdGguUEkgLyAyLCAwXSwgWzAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShUZW50YWNsZVN0cmFpZ2h0KCksIFswLCBNYXRoLlBJIC8gMiwgMF0sIFswLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuXHJcbiAgICAvLyBQUkVUWkVMU1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVG9ydXNLbm90R2VvbWV0cnkoMTUsIDMsIDEzLCAzKSwgWzAsIE1hdGguUEkgLyAyLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLlRvcnVzS25vdEdlb21ldHJ5KDE1LCAzLCAxMCwgMyksIFswLCAwLCAwXSwgWzQwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20obmV3IFRIUkVFLlRvcnVzS25vdEdlb21ldHJ5KDE1LCAzLCA2LCAzKSwgWzAsIDAsIDBdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG4gICAgYWRkR2VvbShuZXcgVEhSRUUuVG9ydXNLbm90R2VvbWV0cnkoMTUsIDMsIDEzLCAzKSwgWzAsIDAsIDBdLCBbNDAsIDAsIDBdLCBbMSwgMSwgMV0pO1xyXG5cclxuICAgIC8vIE1JTkVSQUxTIExJTkVTXHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKFRlbnRhY2xlU3RyYWlnaHQoKSksIFswLCAwLCAwXSwgWzAsIDIwLCAwXSwgWzEsIDEsIDFdKTtcclxuICAgIGFkZEdlb20oTWluZXJhbHMoVGVudGFjbGVTdHJhaWdodCgpKSwgWzAsIDAsIC1NYXRoLlBJIC8gMl0sIFsyMCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKFRlbnRhY2xlU3RyYWlnaHQoKSksIFswLCAwLCBNYXRoLlBJIC8gMl0sIFs0MCwgMCwgMF0sIFsxLCAxLCAxXSk7XHJcbiAgICBhZGRHZW9tKE1pbmVyYWxzKFRlbnRhY2xlU3RyYWlnaHQoKSksIFswLCAwLCAwXSwgWzMwLCAwLCAwXSwgWzEsIDEsIDFdKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkR2VvbShnZW9tLCByb3RhdGlvbkFycmF5LCB0cmFuc2xhdGlvbkFycmF5LCBzY2FsZUFycmF5KSB7XHJcbiAgICBnZW9tLmFwcGx5TWF0cml4KG5ldyBUSFJFRS5NYXRyaXg0KCkuc2NhbGUobmV3IFRIUkVFLlZlY3RvcjMoc2NhbGVBcnJheVswXSwgc2NhbGVBcnJheVsxXSwgc2NhbGVBcnJheVsyXSkpKTtcclxuICAgIGdlb20uYXBwbHlNYXRyaXgobmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlUm90YXRpb25YKHJvdGF0aW9uQXJyYXlbMF0pKTtcclxuICAgIGdlb20uYXBwbHlNYXRyaXgobmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlUm90YXRpb25ZKHJvdGF0aW9uQXJyYXlbMV0pKTtcclxuICAgIGdlb20uYXBwbHlNYXRyaXgobmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlUm90YXRpb25aKHJvdGF0aW9uQXJyYXlbMl0pKTtcclxuICAgIGdlb20uYXBwbHlNYXRyaXgobmV3IFRIUkVFLk1hdHJpeDQoKS5tYWtlVHJhbnNsYXRpb24odHJhbnNsYXRpb25BcnJheVswXSwgdHJhbnNsYXRpb25BcnJheVsxXSwgdHJhbnNsYXRpb25BcnJheVsyXSkpO1xyXG4gICAgZ2VvbXMucHVzaChnZW9tKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVnKHNjZW5lLCBkYikge1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxOyBpKyspIHtcclxuICAgICAgICB2YXIgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuXHJcbiAgICAgICAgdmFyIGdsb2JhbFNpemUgPSAwO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRiLmZpbGVzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9IGogJSBkYi5maWxlcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gZGIuZmlsZXNbaWRdLnR5cGU7XHJcbiAgICAgICAgICAgIHZhciBwcmVnZW9tID0gZ2VvbXNbdHlwZV07XHJcbiAgICAgICAgICAgIHZhciBtYXQgPSBtYXRlcmlhbHNbdHlwZV07XHJcbiAgICAgICAgICAgIGNyZWF0ZVByZWdlb20oZ2VvbWV0cnksIGRiLmZpbGVzW2lkXS5zaXplLCBwcmVnZW9tLCB0eXBlKTtcclxuICAgICAgICAgICAgZ2xvYmFsU2l6ZSArPSBkYi5maWxlc1tpZF0uc2l6ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBzaXplUGVyYyA9IGdsb2JhbFNpemUgLyAxMDAwMDAwO1xyXG4gICAgICAgIGlmIChzaXplUGVyYyA+IDEpXHJcbiAgICAgICAgICAgIHNpemVQZXJjID0gMTtcclxuICAgICAgICBkYi5zcGVlZCA9IDAuMDAxICsgKDEgLSBzaXplUGVyYykgKiAwLjAxO1xyXG5cclxuICAgICAgICBkYi5vYmplY3QgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWVzaEZhY2VNYXRlcmlhbCk7XHJcbiAgICAgICAgc2NlbmUuYWRkKGRiLm9iamVjdCk7XHJcblxyXG4gICAgICAgIGRiLm9iamVjdDIgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWVzaEZhY2VNYXRlcmlhbCk7XHJcbiAgICAgICAgZGIub2JqZWN0Mi5zY2FsZS54ID0gLWRiLm9iamVjdC5zY2FsZS54O1xyXG4gICAgICAgIHNjZW5lLmFkZChkYi5vYmplY3QyKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVByZWdlb20oZ2VvbWV0cnksIHNpemUsIHByZWdlb20sIHR5cGUpIHtcclxuICAgIHZhciBmaWxlU2NhbGUgPSAwLjE7XHJcbiAgICB2YXIgZmlsZVNjYWxlT3JnID0gMC4xO1xyXG4gICAgaWYgKHNpemUpIHtcclxuICAgICAgICBmaWxlU2NhbGUgPSBzaXplIC8gMzAwMDAwO1xyXG4gICAgICAgIGZpbGVTY2FsZU9yZyA9IHNpemUgLyAzMDAwMDA7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsZVNjYWxlIDwgMC40KSB7XHJcbiAgICAgICAgZmlsZVNjYWxlID0gMC40O1xyXG4gICAgfVxyXG4gICAgaWYgKGZpbGVTY2FsZSA+IDEpIHtcclxuICAgICAgICBmaWxlU2NhbGUgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZmlsZVNjYWxlICogNDsgaysrKSB7XHJcbiAgICAgICAgdmFyIHN1Ym1lc2ggPSBuZXcgVEhSRUUuTWVzaChwcmVnZW9tLCBudWxsKTtcclxuXHJcbiAgICAgICAgc3VibWVzaC5zY2FsZS54ICo9IGZpbGVTY2FsZSAqIDQ7XHJcbiAgICAgICAgc3VibWVzaC5zY2FsZS55ICo9IGZpbGVTY2FsZSAqIDQ7XHJcbiAgICAgICAgc3VibWVzaC5zY2FsZS56ICo9IGZpbGVTY2FsZSAqIDQ7XHJcblxyXG4gICAgICAgIHZhciByYW5kb21zID0gW01hdGguc2luKCgtMSArIGsgKiAwLjMpICogZmlsZVNjYWxlT3JnICogNjg3ICsgMC4xKSAvIDIgKyAwLjUsIE1hdGguc2luKCgyICsgayAqIDAuOSkgKiBmaWxlU2NhbGVPcmcgKiA0NTYgKyAwLjIpIC8gMiArIDAuNSwgTWF0aC5zaW4oKDEgKyBrKSAqIGZpbGVTY2FsZU9yZyAqIDU0NiArIDAuMykgLyAyICsgMC41XTtcclxuXHJcbiAgICAgICAgc3VibWVzaC5yb3RhdGlvbi5zZXQocmFuZG9tc1swXSAqIDcsIHJhbmRvbXNbMV0gKiA3LCByYW5kb21zWzJdICogNyk7XHJcblxyXG4gICAgICAgIHZhciByYW5kb21zMiA9IFtNYXRoLnNpbigoMiArIGspICogZmlsZVNjYWxlT3JnICogNDEzICsgMC4xKSAvIDIgKyAwLjUsIE1hdGguc2luKCgyICsgaykgKiBmaWxlU2NhbGVPcmcgKiA1NDMgKyAwLjIpIC8gMiArIDAuNSwgTWF0aC5zaW4oKDIgKyBrKSAqIGZpbGVTY2FsZU9yZyAqIDEyMyArIDAuMykgLyAyICsgMC41XTtcclxuXHJcbiAgICAgICAgc3VibWVzaC5wb3NpdGlvbi54ID0gKHJhbmRvbXMyWzFdIC0gMC41KSAqIDEwMCAqIGZpbGVTY2FsZTtcclxuICAgICAgICBzdWJtZXNoLnBvc2l0aW9uLnkgPSAocmFuZG9tczJbMF0gLSAwLjUpICogMTAwICogZmlsZVNjYWxlO1xyXG4gICAgICAgIHN1Ym1lc2gucG9zaXRpb24ueiA9IChyYW5kb21zMlsyXSAtIDAuNSkgKiAxMDAgKiBmaWxlU2NhbGU7XHJcblxyXG4gICAgICAgIHN1Ym1lc2gudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgaWYgKHByZWdlb20pIHtcclxuICAgICAgICAgICAgZ2VvbWV0cnkubWVyZ2UocHJlZ2VvbSwgc3VibWVzaC5tYXRyaXgsIHR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcm9sbG92ZXJMYW5ndWFnZShsYW5ndWFnZSkge1xyXG4gICAgdmFyIG8gPSBbcm9sbE92ZXJPYmplY3QsIHJvbGxPdmVyT2JqZWN0Ml07XHJcbiAgICBpZiAoIWxhbmd1YWdlKSB7XHJcbiAgICAgICAgaWYgKHJvbGxvdmVyTWVzaCkge1xyXG4gICAgICAgICAgICBvWzBdLnJlbW92ZShyb2xsb3Zlck1lc2hbMF0pO1xyXG4gICAgICAgICAgICBvWzFdLnJlbW92ZShyb2xsb3Zlck1lc2hbMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByb2xsb3Zlck1lc2ggPSBudWxsO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciBpZCA9IGFuYWx5emUobGFuZ3VhZ2UpO1xyXG4gICAgdmFyIHByZWdlb20gPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuICAgIHZhciBzaXplID0gMjAwMDAwO1xyXG4gICAgaWYgKGdsb2JhbERCW3NlbGVjdGVkXSkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ2xvYmFsREJbc2VsZWN0ZWRdLmZpbGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChnbG9iYWxEQltzZWxlY3RlZF0uZmlsZXNbaV0udHlwZSA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IGdsb2JhbERCW3NlbGVjdGVkXS5maWxlc1tpXS5zaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY3JlYXRlUHJlZ2VvbShwcmVnZW9tLCBzaXplLCBnZW9tc1tpZF0sIGlkKTtcclxuICAgIHZhciBtYXQgPSBzYW1wbGVNYXQ7XHJcbiAgICBzZXRDb2xvcihzYW1wbGVNYXQsIGlkKTtcclxuICAgIHJvbGxvdmVyTWVzaCA9IFtdO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyOyBpKyspIHtcclxuICAgICAgICByb2xsb3Zlck1lc2hbaV0gPSBuZXcgVEhSRUUuTWVzaChwcmVnZW9tLCBtYXQpO1xyXG4gICAgICAgIHJvbGxvdmVyTWVzaFtpXS5zY2FsZS5zZXQoMSAtIDIgKiBpLCAxLCAxKTtcclxuICAgICAgICBvW2ldLmFkZChyb2xsb3Zlck1lc2hbaV0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBQZXR0bGUoKSB7XHJcbiAgICB2YXIgdGVudGFjbGVHZW9tID0gbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDE1LCAzLCA0KTtcclxuICAgIHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2godGVudGFjbGVHZW9tLCBudWxsKTtcclxuICAgIG1lc2guc2NhbGUueiA9IDAuMjtcclxuICAgIG1lc2gudXBkYXRlTWF0cml4KCk7XHJcbiAgICBtZXNoLmdlb21ldHJ5LmFwcGx5TWF0cml4KG1lc2gubWF0cml4KTtcclxuICAgIHJldHVybihtZXNoLmdlb21ldHJ5KTtcclxufVxyXG5cclxuZnVuY3Rpb24gTWluZXJhbHMoZ2VvbSwgbWF4KSB7XHJcbiAgICBpZiAoIW1heClcclxuICAgICAgICBtYXggPSA0O1xyXG4gICAgdmFyIHRlbnRhY2xlR2VvbSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xyXG4gICAgdmFyIGRpcyA9IDA7XHJcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1heDsgaisrKSB7XHJcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tLmNsb25lKCksIG51bGwpO1xyXG4gICAgICAgIG1lc2gucG9zaXRpb24uc2V0KCgyNSAtIGRpcykgLyAzLCBkaXMgLyAyLCAwKTtcclxuICAgICAgICBkaXMgKz0gMjUgKiAoMSAtIChqICsgMSkgLyBtYXgpO1xyXG4gICAgICAgIG1lc2guc2NhbGUuc2V0KDEgLSBqIC8gbWF4LCAxIC0gaiAvIG1heCwgMSAtIGogLyBtYXgpO1xyXG4gICAgICAgIG1lc2gucm90YXRpb24uc2V0KDAsIDAsIDEuNSAqIGogLyBtYXgpO1xyXG4gICAgICAgIG1lc2gudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgdGVudGFjbGVHZW9tLm1lcmdlKG1lc2guZ2VvbWV0cnksIG1lc2gubWF0cml4KTtcclxuICAgIH1cclxuICAgIHJldHVybih0ZW50YWNsZUdlb20pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBMZWcobnVtLCByYWRpdXMpIHtcclxuICAgIHZhciB0ZW50YWNsZUdlb20gPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjsgaisrKSB7XHJcbiAgICAgICAgdmFyIHJhbmRvbVBvaW50cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoLTMwICogaSwgLTQwICogTWF0aC5zaW4oaSAqIDIpLCAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByYW5kb21TcGxpbmUgPSBuZXcgVEhSRUUuU3BsaW5lQ3VydmUzKHJhbmRvbVBvaW50cyk7XHJcbiAgICAgICAgdmFyIGdlb21ldHJ5ID0gbmV3IFRIUkVFLlR1YmVHZW9tZXRyeShyYW5kb21TcGxpbmUsIDMsIHJhZGl1cywgNyk7XHJcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbnVsbCk7XHJcbiAgICAgICAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5zaW4oaiksIE1hdGguc2luKGogKyAxKSwgTWF0aC5zaW4oaiArIDAuNSkpO1xyXG4gICAgICAgIG1lc2gudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgdGVudGFjbGVHZW9tLm1lcmdlKGdlb21ldHJ5LCBtZXNoLm1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4odGVudGFjbGVHZW9tKTtcclxufVxyXG5cclxuZnVuY3Rpb24gQW50ZW5uYShudW0pIHtcclxuICAgIHZhciB0ZW50YWNsZUdlb20gPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcclxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjsgaisrKSB7XHJcbiAgICAgICAgdmFyIHJhbmRvbVBvaW50cyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtOyBpKyspIHtcclxuICAgICAgICAgICAgcmFuZG9tUG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoMjAgKiBpLCAxNSAqIE1hdGguc2luKGoraSAqIG51bSksIDApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJhbmRvbVNwbGluZSA9IG5ldyBUSFJFRS5TcGxpbmVDdXJ2ZTMocmFuZG9tUG9pbnRzKTtcclxuICAgICAgICB2YXIgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuVHViZUdlb21ldHJ5KHJhbmRvbVNwbGluZSwgNSwgMiwgNSk7XHJcbiAgICAgICAgdmFyIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbnVsbCk7XHJcbiAgICAgICAgbWVzaC5yb3RhdGlvbi5zZXQoTWF0aC5zaW4oaiksIE1hdGguc2luKGogKyAxKSwgTWF0aC5zaW4oaiArIDAuNSkpO1xyXG4gICAgICAgIG1lc2gudXBkYXRlTWF0cml4KCk7XHJcbiAgICAgICAgdGVudGFjbGVHZW9tLm1lcmdlKGdlb21ldHJ5LCBtZXNoLm1hdHJpeCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4odGVudGFjbGVHZW9tKTtcclxufVxyXG5cclxuZnVuY3Rpb24gVGVudGFjbGUobnVtKSB7XHJcbiAgICB2YXIgdGVudGFjbGVHZW9tID0gbmV3IFRIUkVFLkdlb21ldHJ5KCk7XHJcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IDI7IGorKykge1xyXG4gICAgICAgIHZhciByYW5kb21Qb2ludHMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhbmRvbVBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKDIwICogaSwgMTUgKiBNYXRoLnNpbihqK2kgKiBudW0gLyAyKSwgMCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmFuZG9tU3BsaW5lID0gbmV3IFRIUkVFLlNwbGluZUN1cnZlMyhyYW5kb21Qb2ludHMpO1xyXG4gICAgICAgIHZhciBnZW9tZXRyeSA9IG5ldyBUSFJFRS5UdWJlR2VvbWV0cnkocmFuZG9tU3BsaW5lLCA1LCAyLCA1KTtcclxuICAgICAgICB2YXIgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBudWxsKTtcclxuICAgICAgICBtZXNoLnJvdGF0aW9uLnNldChNYXRoLnNpbihqKSwgTWF0aC5zaW4oaiArIDEpLCBNYXRoLnNpbihqICsgMC41KSk7XHJcbiAgICAgICAgbWVzaC51cGRhdGVNYXRyaXgoKTtcclxuICAgICAgICB0ZW50YWNsZUdlb20ubWVyZ2UoZ2VvbWV0cnksIG1lc2gubWF0cml4KTtcclxuICAgIH1cclxuICAgIHJldHVybih0ZW50YWNsZUdlb20pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBUZW50YWNsZVN0cmFpZ2h0KCkge1xyXG4gICAgdmFyIHRlbnRhY2xlR2VvbSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCAxOyBqKyspIHtcclxuICAgICAgICB2YXIgcmFuZG9tUG9pbnRzID0gW107XHJcbiAgICAgICAgcmFuZG9tUG9pbnRzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMoMCwgMCwgMCkpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJhbmRvbVBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDAgLSAzMDAgKiBpLCAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByYW5kb21TcGxpbmUgPSBuZXcgVEhSRUUuU3BsaW5lQ3VydmUzKHJhbmRvbVBvaW50cyk7XHJcbiAgICAgICAgdmFyIGdlb21ldHJ5ID0gbmV3IFRIUkVFLlR1YmVHZW9tZXRyeShyYW5kb21TcGxpbmUsIDIsIDMsIDIpO1xyXG4gICAgICAgIHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG51bGwpO1xyXG4gICAgICAgIG1lc2gucG9zaXRpb24uc2V0KDEwICogTWF0aC5zaW4oaiksIDEwICogTWF0aC5zaW4oaiArIDEpLCAxMCAqIE1hdGguc2luKGogKyAwLjUpKTtcclxuICAgICAgICBtZXNoLnVwZGF0ZU1hdHJpeCgpO1xyXG4gICAgICAgIHRlbnRhY2xlR2VvbS5tZXJnZShnZW9tZXRyeSwgbWVzaC5tYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuKHRlbnRhY2xlR2VvbSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEdyaWQoZ2VvbSkge1xyXG4gICAgdmFyIHRlbnRhY2xlR2VvbSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xyXG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCA0OyBqKyspIHtcclxuICAgICAgICB2YXIgZ2VvbWV0cnkgPSBnZW9tO1xyXG4gICAgICAgIHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG51bGwpO1xyXG4gICAgICAgIG1lc2gucG9zaXRpb24uc2V0KDEwICogTWF0aC5zaW4oaiksIDEwICogTWF0aC5zaW4oaiArIDEpLCAxMCAqIE1hdGguc2luKGogKyAwLjUpKTtcclxuICAgICAgICBtZXNoLnVwZGF0ZU1hdHJpeCgpO1xyXG4gICAgICAgIHRlbnRhY2xlR2VvbS5tZXJnZShnZW9tZXRyeSwgbWVzaC5tYXRyaXgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuKHRlbnRhY2xlR2VvbSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUJ1ZyhkYiwgb2Zmc2V0KSB7XHJcbiAgICBpZiAoIW1vdmVtZW50IHx8ICFkYiB8fCAhZGIub2JqZWN0IHx8ICFkYi5vYmplY3QyKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIHZhciBvYmplY3QgPSBkYi5vYmplY3Q7XHJcbiAgICB2YXIgb2JqZWN0MiA9IGRiLm9iamVjdDI7XHJcbiAgICB0aW1lciArPSAwLjY7XHJcblxyXG4gICAgb2JqZWN0LnJvdGF0aW9uLnogPSBNYXRoLnNpbih0aW1lciAqIGRiLnNwZWVkICsgb2Zmc2V0KSAvIDEwO1xyXG4gICAgb2JqZWN0Mi5yb3RhdGlvbi56ID0gLU1hdGguc2luKHRpbWVyICogZGIuc3BlZWQgKyBvZmZzZXQpIC8gMTA7XHJcblxyXG4gICAgb2JqZWN0LnBvc2l0aW9uLnkgPSBNYXRoLnNpbih0aW1lciAqIGRiLnNwZWVkICsgb2Zmc2V0KSAqIDEwIC8gMjtcclxuICAgIG9iamVjdDIucG9zaXRpb24ueSA9IE1hdGguc2luKHRpbWVyICogZGIuc3BlZWQgKyBvZmZzZXQpICogMTAgLyAyO1xyXG5cclxuICAgIGlmIChvZmZzZXQgPT0gc2VsZWN0ZWQgfHwgb2Zmc2V0ID09PSAwKSB7XHJcbiAgICAgICAgcm9sbE92ZXJPYmplY3Qucm90YXRpb24ueiA9IG9iamVjdC5yb3RhdGlvbi56O1xyXG4gICAgICAgIHJvbGxPdmVyT2JqZWN0Mi5yb3RhdGlvbi56ID0gb2JqZWN0Mi5yb3RhdGlvbi56O1xyXG5cclxuICAgICAgICByb2xsT3Zlck9iamVjdC5wb3NpdGlvbi55ID0gb2JqZWN0LnBvc2l0aW9uLnk7XHJcbiAgICAgICAgcm9sbE92ZXJPYmplY3QyLnBvc2l0aW9uLnkgPSBvYmplY3QyLnBvc2l0aW9uLnk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcclxuICAgIHJldHVybiBcIiNcIiArIGNvbXBvbmVudFRvSGV4KE1hdGguZmxvb3IocikpICsgY29tcG9uZW50VG9IZXgoTWF0aC5mbG9vcihnKSkgKyBjb21wb25lbnRUb0hleChNYXRoLmZsb29yKGIpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xyXG4gICAgdmFyIGhleCA9IGMudG9TdHJpbmcoMTYpO1xyXG4gICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/IFwiMFwiICsgaGV4IDogaGV4O1xyXG59Il0sImZpbGUiOiJvYmplY3RzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
