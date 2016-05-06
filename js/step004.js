require( 'step004', function(exports, module) {  "use strict";
require("gfx");
var Lights = require("lights");
var Castles = require("castles");
var MeshFactory = require("mesh-factory");


var ThreeCanvas = require("three.canvas");

var COLOR_GREEN = new THREE.Color( 0x00ff00 );
var COLOR_MAROON = new THREE.Color( 0x905000 );
var COLOR_BLUE = new THREE.Color( 0x0000ff );

var MATERIAL = new THREE.MeshStandardMaterial({
    metalness: 0.1,
    roughness: 0.5,
    vertexColors: THREE.VertexColors
});

var Step003 = function( args ) {
    // Initialize a ThreeJS canvas.
    ThreeCanvas.call( this, args );

    Lights.default( this.scene );

    var grp = new THREE.Group();
    this.scene.add( grp );
    this._grp = grp;

    var texWall = new THREE.TextureLoader().load( "css/gfx/wall.jpg" );
    var texWallBump = new THREE.TextureLoader().load( "css/gfx/wall-bump.jpg" );
    /*
    texWall.wrapS = THREE.RepeatWrapping;
    texWall.wrapT = THREE.RepeatWrapping;
    texWall.magFilter = THREE.NearestFilter;
    texWall.minFilter = THREE.LinearMipMapLinearFilter;
     */
    var material = new THREE.MeshStandardMaterial({
        metalness: 0,
        roughness: 0.7,
        map: texWall,
        bumpMap: args.bump ? texWallBump : null
    });

    var geometry = new THREE.Geometry();
    var k = 5;
    geometry.vertices.push(
        new THREE.Vector3(  k, 0,  k ),
        new THREE.Vector3( -k, 0,  k ),
        new THREE.Vector3( -k, 0, -k ),
        new THREE.Vector3(  k, 0, -k )
    );
    geometry.faces.push(
        new THREE.Face3( 0, 3, 2 ),
        new THREE.Face3( 0, 2, 1 )
    );
    var uv0 = new THREE.Vector2( 1, 1 );
    var uv1 = new THREE.Vector2( 0, 1 );
    var uv2 = new THREE.Vector2( 0, 0 );
    var uv3 = new THREE.Vector2( 1, 0 );
    geometry.faceVertexUvs[0] = [
        [uv0, uv3, uv2],
        [uv0, uv2, uv1]
    ];
    
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    grp.add( new THREE.Mesh( geometry, material ) );

    this.setCamera(
        args.cameraX || 6, args.cameraY || 10, args.cameraZ || 0,
        0, 2, 0
    );
    this._speed1 = 0.0005;
    this.start();
};

// Extension of ThreeCanvas.
Step003.prototype = Object.create(ThreeCanvas.prototype);
Step003.prototype.constructor = Step003;


Step003.prototype.onRender = function( time, delta ) {
    this._grp.rotation.y = time * this._speed1;
};


module.exports = Step003;
 });
