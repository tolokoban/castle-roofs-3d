require( 'step001', function(exports, module) {  "use strict";
var ThreeCanvas = require("three.canvas");

var COLOR_GREEN = new THREE.Color( 0x00ff00 );
var COLOR_MAROON = new THREE.Color( 0x905000 );

var Step001 = function( args ) {
    // Initialize a ThreeJS canvas.
    ThreeCanvas.call( this, args );

    var h = args.size;
    var vertices = [
        [ 1, 0, 1], [-1, 0, 1], [-1, 0,-1], [ 1, 0,-1],
        [ 1, h, 1], [-1, h, 1], [-1, h,-1], [ 1, h,-1]
    ];
    var faces = [
        [4,7,5], [7,6,5],
        [7,0,3], [7,4,0],
        [4,1,0], [4,5,1],
        [5,2,1], [5,6,2],
        [6,3,2], [6,7,3]
    ];
    var geometry = new THREE.Geometry();
    vertices.forEach(function( vertex ) {
        geometry.vertices.push( new THREE.Vector3( vertex[0], vertex[1], vertex[2] ) );
    });
    faces.forEach(function( face, idxFace ) {
        var face3 = new THREE.Face3( face[0], face[1], face[2] );
        var color = idxFace < 2 ? COLOR_GREEN : COLOR_MAROON;
        face3.vertexColors[0] = face3.vertexColors[1] = face3.vertexColors[2] = color;
        geometry.faces.push( face3 );
    });
    geometry.computeFaceNormals ();
    geometry.computeVertexNormals ();

    var material = new THREE.MeshStandardMaterial({
        metalness: 0.1,
        roughness: 0.5,
        vertexColors: THREE.VertexColors
    });

    this.box = new THREE.Mesh( geometry, material );
    this.scene.add( this.box );

    // Positionning camera.
    this.camera.position.x = args.cameraX || 2.5;
    this.camera.position.y = h;
    this.camera.position.z = args.cameraZ || 0;
    this.camera.lookAt( new THREE.Vector3( 0, h / 2, 0 ) );

    // Adding lights, because without light, nothing will be displayed.
    var light = new THREE.HemisphereLight( 0xcceeff, 0x990000, 0.6 ); // soft white light
    var light1 = new THREE.DirectionalLight( 0x997777, 0.5 );
    var light2 = new THREE.DirectionalLight( 0x777799, 0.2 );
    light1.position.set(43,13,5);
    light2.position.set(-20,5,1);

    this.scene.add( light1 );
    this.scene.add( light2 );
    this.scene.add( light );

    this._speed1 = 0.0005 + Math.random() * 0.001;
    this._speed2 = 0.00005 + Math.random() * 0.0001;
    this._cameraY = this.camera.position.y;

    this.start();
};

// Extension of ThreeCanvas.
Step001.prototype = Object.create(ThreeCanvas.prototype);
Step001.prototype.constructor = Step001;


/**
 * @return void
 */
Step001.prototype.onRender = function( time, delta ) {
    this.box.rotation.y = time * this._speed1;
    this.camera.position.y = Math.abs( 10 * Math.cos( time * this._speed2 ) );
    this.camera.position.x = Math.abs( 10 * Math.sin( time * this._speed2 ) );
    this.camera.lookAt( new THREE.Vector3( 0, this._cameraY / 2, 0 ) );
};


module.exports = Step001;
 });
