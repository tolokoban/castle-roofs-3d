"use strict";
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

    var castleIndex = parseInt( args.castle );
    if( isNaN( castleIndex ) ) castleIndex = 0;
    var mesh = new MeshFactory();
    var castle = Castles.getCopyOfCastle( castleIndex );
    var col, row, x, y, z, h, h1, h2;
    // Top faces.
    castle.heights.forEach(function( h, idx ) {
        // Do not create boxes of height lesser than 1.
        if( h < 1 ) return;
        var col = idx % castle.cols;
        var row = (idx - col) / castle.rows;
        mesh.addQuad({
            pos: [col - castle.cols / 2, h, row - castle.rows / 2],
            color: COLOR_GREEN,
            dir: "Y"
        });
    });
    // Front faces "X".
    for( row = 0 ; row < castle.rows ; row++ ) {
        z = row - castle.rows / 2;
        h1 = 0;
        for( col = 0 ; col < castle.cols ; col++ ) {
            x = col - castle.cols / 2;
            h2 = castle.heights[row * castle.cols + col];
            if( h2 > h1 ) {
                for( h = h1 + 1 ; h <= h2 ; h++ ) {
                    y = h - .5;
                    mesh.addQuad({
                        pos: [x, y, z],
                        color: COLOR_MAROON,
                        dir: "X"
                    });
                }
            }
            h1 = h2;
        }
    }
    // Front faces "x".
    for( row = 0 ; row < castle.rows ; row++ ) {
        z = row - castle.rows / 2;
        h1 = 0;
        for( col = castle.cols - 1 ; col >= 0 ; col-- ) {
            x = col - castle.cols / 2 + 1;
            h2 = castle.heights[row * castle.cols + col];
            if( h2 > h1 ) {
                for( h = h1 + 1 ; h <= h2 ; h++ ) {
                    y = h - .5;
                    mesh.addQuad({
                        pos: [x, y, z],
                        color: COLOR_MAROON,
                        dir: "x"
                    });
                }
            }
            h1 = h2;
        }
    }
    // Side faces "Z".
    for( col = 0 ; col < castle.cols ; col++ ) {
        x = col - castle.cols / 2;
        h1 = 0;
        for( row = castle.rows - 1 ; row >= 0 ; row-- ) {
            z = row - castle.rows / 2 + 1;
            h2 = castle.heights[row * castle.cols + col];
            if( h2 > h1 ) {
                for( h = h1 + 1 ; h <= h2 ; h++ ) {
                    y = h - .5;
                    mesh.addQuad({
                        pos: [x, y, z],
                        color: COLOR_MAROON,
                        dir: "Z"
                    });
                }
            }
            h1 = h2;
        }
    }
    // Side faces "z".
    for( col = 0 ; col < castle.cols ; col++ ) {
        x = col - castle.cols / 2;
        h1 = 0;
        for( row = 0 ; row < castle.rows ; row++ ) {
            z = row - castle.rows / 2;
            h2 = castle.heights[row * castle.cols + col];
            if( h2 > h1 ) {
                for( h = h1 + 1 ; h <= h2 ; h++ ) {
                    y = h - .5;
                    mesh.addQuad({
                        pos: [x, y, z],
                        color: COLOR_MAROON,
                        dir: "z"
                    });
                }
            }
            h1 = h2;
        }
    }

    grp.add( mesh.toMesh() );

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
