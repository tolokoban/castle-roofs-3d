"use strict";
var Lights = require("lights");
var Castles = require("castles");
var ObjectCastle = require("object.castle");


var ThreeCanvas = require("three.canvas");

var COLOR_GREEN = new THREE.Color( 0x00ff00 );
var COLOR_MAROON = new THREE.Color( 0x905000 );
var COLOR_BLUE = new THREE.Color( 0x0000ff );

var MATERIAL = new THREE.MeshStandardMaterial({
    metalness: 0.1,
    roughness: 0.5,
    vertexColors: THREE.VertexColors
});

var Step006 = function( args ) {
    // Initialize a ThreeJS canvas.
    ThreeCanvas.call( this, args );

    Lights.default( this.scene );

    var grp = new THREE.Group();
    this.scene.add( grp );
    this._grp = grp;

    var castleIndex = parseInt( args.castle );
    if( isNaN( castleIndex ) ) castleIndex = 0;
    var castle = Castles.getCopyOfCastle( castleIndex );
    var objCastle = new ObjectCastle( castle );

    grp.add( objCastle.mesh );

    this.setCamera(
        args.cameraX || 4, args.cameraY || 4, args.cameraZ || 0,
        0, 3, 0
    );
    this._speed1 = 0.0003;
    this.start();
};

// Extension of ThreeCanvas.
Step006.prototype = Object.create(ThreeCanvas.prototype);
Step006.prototype.constructor = Step006;


Step006.prototype.onRender = function( time, delta ) {
    this._grp.rotation.y = time * this._speed1;
};


module.exports = Step006;
