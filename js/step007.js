require( 'step007', function(exports, module) {  "use strict";
var Lights = require("lights");
var Castles = require("castles");
var MeshCastle = require("mesh.castle");
var MeshHero = require("mesh.hero");
var Controls = require("controls");
var Mover = require("mover");
var Follower = require("follower");


var ThreeCanvas = require("three.canvas");

var COLOR_GREEN = new THREE.Color( 0x00ff00 );
var COLOR_MAROON = new THREE.Color( 0x905000 );
var COLOR_BLUE = new THREE.Color( 0x0000ff );

var Step006 = function( args ) {
    // Initialize a ThreeJS canvas.
    ThreeCanvas.call( this, args );

    Lights.default( this.scene );

    var castleIndex = parseInt( args.castle );
    if( isNaN( castleIndex ) ) castleIndex = 0;
    var castle = Castles.getCopyOfCastle( castleIndex );
    var mesh = MeshCastle( castle );

    this.setCamera(
        args.cameraX || 4, args.cameraY || 4, args.cameraZ || 0,
        args.lookAtX || 0, args.lookAtY || 3, args.lookAtZ || 0
    );
    this._speed1 = 0.0003;

    var hero = new MeshHero();
    hero.position.x = - castle.cols / 2;
    hero.position.y = castle.heights[0];
    hero.position.z = - castle.rows / 2;
    this._mover = new Mover({
        mesh: hero,
        castle: castle,
        col: 0,
        row: 0
    });
    this._follower = new Follower({
        mesh: hero,
        camera: this.camera,
        castle: castle 
    });
    
    var grp = new THREE.Group();
    grp.add( mesh, hero );
    this._grp = grp;
    this.scene.add( grp );
    
    this.start();
};

// Extension of ThreeCanvas.
Step006.prototype = Object.create(ThreeCanvas.prototype);
Step006.prototype.constructor = Step006;


Step006.prototype.onRender = function( time, delta ) {
    var mover = this._mover;
    mover.move( time );
    var dir = mover.getDir();
    var pos = mover.getPos();

    this._follower.look( time );
    /*
    this.camera.position.x = pos.x - 4 * dir[0] + Math.cos( time * 0.001 ) * .1;
    this.camera.position.y = pos.y + 2;
    this.camera.position.z = pos.z - 4 * dir[1] + Math.sin( time * 0.001 ) * .1;
    this.camera.lookAt( new THREE.Vector3( pos.x, pos.y + 1, pos.z ) );
   */
    if( Controls.left === true ) {
        mover.left();
    }
    else if( Controls.right === true ) {
        mover.right();
    }
    else if( Controls.forward === true ) {
        mover.forward();
    }
    else {
        mover.stop();
    }
};


module.exports = Step006;
 });
