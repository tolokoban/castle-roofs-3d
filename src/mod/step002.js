"use strict";
var Lights = require("lights");
var Castles = require("castles");

var ThreeCanvas = require("three.canvas");

var COLOR_GREEN = new THREE.Color( 0x00ff00 );
var COLOR_MAROON = new THREE.Color( 0x905000 );

var MATERIAL = new THREE.MeshStandardMaterial({
    metalness: 0.1,
    roughness: 0.5,
    vertexColors: THREE.VertexColors
});

var Step002 = function( args ) {
    // Initialize a ThreeJS canvas.
    ThreeCanvas.call( this, args );

    Lights.default( this.scene );

    var grp = new THREE.Group();
    this.scene.add( grp );
    this._grp = grp;

    var castleIndex = parseInt( args.castle );
    if( isNaN( castleIndex ) ) castleIndex = 0;
    var castle = Castles.getCopyOfCastle( castleIndex );
    castle.heights.forEach(function( h, idx ) {
        // Do not create boxes of height lesser than 1.
        if( h < 1 ) return;
        var col = idx % castle.cols;
        var row = (idx - col) / castle.rows;
        grp.add(
            createBox( col - castle.cols / 2, row - castle.rows / 2, h )
        );
    });

    this.setCamera( 
        args.cameraX || 6, args.cameraY || 10, args.cameraZ || 0, 
        0, 2, 0 
    );
    this._speed1 = 0.0005;
    this.start();
};

// Extension of ThreeCanvas.
Step002.prototype = Object.create(ThreeCanvas.prototype);
Step002.prototype.constructor = Step002;


Step002.prototype.onRender = function( time, delta ) {
    this._grp.rotation.y = time * this._speed1;
};


/**
 * Create a box centered in `(x, 0, y)` and of height `h`.
 */
function createBox( x, z, h ) {
    var vertices = [
        [ .5 + x, 0, .5 + z], [-.5 + x, 0, .5 + z], [-.5 + x, 0,-.5 + z], [ .5 + x, 0,-.5 + z],
        [ .5 + x, h, .5 + z], [-.5 + x, h, .5 + z], [-.5 + x, h,-.5 + z], [ .5 + x, h,-.5 + z]
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

    return new THREE.Mesh( geometry, MATERIAL );
}



module.exports = Step002;
