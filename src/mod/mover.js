/**********************************************************************
 require( 'mover' )
 -----------------------------------------------------------------------

 **********************************************************************/

var DIRS = [ [1,0], [0,1], [-1,0], [0,-1] ];



/**
 * @param args - mesh, castle, durTranslate, durRotate
 */
function Mover( args ) {
    if( typeof args === 'undefined' ) args = {};
    if( typeof args.durTranslate === 'undefined' ) args.durTranslate = 500;
    if( typeof args.durRotate === 'undefined' ) args.durRotate = 700;
    if( typeof args.col === 'undefined' ) args.col = 0;
    if( typeof args.row === 'undefined' ) args.row = 0;

    this._durTranslate = args.durTranslate;
    this._durRotate = args.durRotate;
    this._mesh = args.mesh;
    this._castle = args.castle;
    this._action = null;
    this._rot = this._angle = 0;
    this._x = args.castle.col2x( args.col );
    this._y = args.castle.getHeight( args.col, args.row );
    this._z = args.castle.row2z( args.row );
    this._miniJump = 0;
}


/**
 * @return void
 */
Mover.prototype.getDir = function() {
    return DIRS[ this._rot ];
};

/**
 * @return void
 */
Mover.prototype.getPos = function() {
    return { x: this._x, y: this._y, z: this._z };
};


/**
 * @return void
 */
Mover.prototype.move = function( time ) {
    if( this._action ) {
        this._action( time );
    } else if( this._nextAction ) {
        var id = this._nextAction.id;
        if( id == 'teleport' ) {
            this._x = this._nextAction.x;
            this._y = this._nextAction.y;
            this._z = this._nextAction.z;
        }
        else if( id == 'forward' ) {
            actionForward.call( this, time );
        }
        else if( id == 'right' ) {
            actionRight.call( this, time );
        }
        else if( id == 'left' ) {
            actionLeft.call( this, time );
        }
        this._nextAction = null;
    }

    this._mesh.position.x = this._x;
    this._mesh.position.y = this._y;
    this._mesh.position.z = this._z;
    this._mesh.rotation.y = this._angle;
};

Mover.prototype.getCol = function() {
    return this._castle.x2col( this._x );
};

Mover.prototype.getRow = function() {
    return this._castle.z2row( this._z );
};


/**
 * @return void
 */
Mover.prototype.teleport = function( x, y, z ) {
    if( this._action ) {
        this._nextAction = {id: "teleport", x: x, y: y, z: z};
    } else {
        this._action = null;
        this._x = x;
        this._y = y;
        this._z = z;
    }
};


/**
 * @return void
 */
Mover.prototype.forward = function() {
    this._nextAction = {id: "forward"};
};

/**
 * @return void
 */
Mover.prototype.right = function() {
    this._nextAction = {id: "right"};
};

/**
 * @return void
 */
Mover.prototype.left = function() {
    this._nextAction = {id: "left"};
};

Mover.prototype.stop = function() {
    this._nextAction = null;
};


/**
 *
 */
function actionForward( time ) {
    var castle = this._castle;
    var dir = DIRS[this._rot];    
    var col0 = this.getCol();
    var row0 = this.getRow();
    var h0 = castle.getHeight( col0, row0 );
    var col1 = col0 + dir[0];
    var row1 = row0 + dir[1];
    var h1 = castle.getHeight( col1, row1 );

    // Is there an insurmountable wall?
    if( Math.abs( h1 - h0 ) > .33 ) return;
    
    var x0 = this._x;
    var y0 = this._y;
    var z0 = this._z;
    var x1 = castle.col2x( col1 );
    var y1 = h1;
    var z1 = castle.row2z( row1 );
    this._miniJump = Math.abs( y1 - y0 );
    if( this._miniJump > 0.001 ) this._miniJump += .1;
    
    var f = function( t ) {
        t -= time;
        if( t > this._durTranslate ) {
            // This is the end of the translation.
            this._action = null;
            this._x = x1;
            this._y = y1;
            this._z = z1;
        } else {
            t /= this._durTranslate;
            this._x = x0 * (1 - t) + x1 * t;
            this._y = y0 * (1 - t) + y1 * t + this._miniJump * Math.sin( Math.PI * t );
            this._z = z0 * (1 - t) + z1 * t;
        }
    };
    this._action = f.bind( this );
}


function actionRight( time ) {
    var f = function( t ) {
        t -= time;
        if( t > this._durRotate ) {
            this._action = null;
            this._rot = (this._rot + 1) % 4;
            this._angle = - this._rot * Math.PI / 2;
        } else {
            t /= this._durRotate;
            this._angle = - (this._rot + t) * Math.PI / 2;
        }
    };    
    this._action = f.bind( this );
}


function actionLeft( time ) {
    var f = function( t ) {
        t -= time;
        if( t > this._durRotate ) {
            this._action = null;
            this._rot = (this._rot + 3) % 4;
            this._angle = - this._rot * Math.PI / 2;
        } else {
            t /= this._durRotate;
            this._angle = - (this._rot - t) * Math.PI / 2;
        }
    };    
    this._action = f.bind( this );
}



module.exports = Mover;
