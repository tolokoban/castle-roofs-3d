/**********************************************************************
 require( 'geo.castle' )
 -----------------------------------------------------------------------

 **********************************************************************/
"use strict";
var Geo = require("geo");

var Castle = function( castle ) {
    Geo.call( this );

    this._castle = castle;

    castle.heights.forEach(function( h, idx ) {
        // Do not create boxes of height lesser than 1.
        if( h < 1 ) return;
        var col = idx % castle.cols;
        var row = (idx - col) / castle.cols;
        var x = castle.col2x( col );
        var y = h;
        var z = castle.row2z( row );
        this.addQuad({
            vertices: [
                [ x - .5, y, z - .5],
                [ x + .5, y, z - .5],
                [ x + .5, y, z + .5],
                [ x - .5, y, z + .5]
            ]
        });
    }, this);

    var rows = castle.rows;
    var cols = castle.cols;
    var row, col, h1, h2, x, z;

    for( row=0 ; row<rows ; row++ ) {
        h1 = 0;
        z = castle.row2z( row );
        for( col=0 ; col<cols ; col++ ) {
            h2 = castle.getHeight( col, row );
            x = castle.col2x( col );
            if( h2 > h1 ) {
                this.addQuad({
                    materialIndex: 1,
                    vertices: [
                        [ x - .5, h1, z + .5],
                        [ x - .5, h1, z - .5],
                        [ x - .5, h2, z - .5],
                        [ x - .5, h2, z + .5]
                    ],
                    uvs: [[1,h1], [0,h1], [0,h2], [1,h2]]
                });

            }
            h1 = h2;
        }
    }

    for( row=0 ; row<rows ; row++ ) {
        h1 = 0;
        z = castle.row2z( row );
        for( col=cols - 1 ; col>=0 ; col-- ) {
            h2 = castle.heights[col + row * cols];
            x = castle.col2x( col );
            if( h2 > h1 ) {
                this.addQuad({
                    materialIndex: 1,
                    vertices: [
                        [ x + .5, h1, z - .5],
                        [ x + .5, h1, z + .5],
                        [ x + .5, h2, z + .5],
                        [ x + .5, h2, z - .5]
                    ],
                    uvs: [[1,h1], [0,h1], [0,h2], [1,h2]]
                });

            }
            h1 = h2;
        }
    }

    for( col=0 ; col<cols ; col++ ) {
        h1 = 0;
        x = castle.col2x( col );
        for( row=0 ; row<rows ; row++ ) {
            h2 = castle.heights[col + row * cols];
            z = castle.row2z( row );
            if( h2 > h1 ) {
                this.addQuad({
                    materialIndex: 1,
                    vertices: [
                        [ x + .5, h1, z - .5],
                        [ x + .5, h2, z - .5],
                        [ x - .5, h2, z - .5],
                        [ x - .5, h1, z - .5]
                    ],
                    uvs: [[1,h1], [1,h2], [0,h2], [0,h1]]
                });

            }
            h1 = h2;
        }
    }

    for( col=0 ; col<cols ; col++ ) {
        h1 = 0;
        x = castle.col2x( col );
        for( row=rows-1 ; row>=0 ; row-- ) {
            h2 = castle.heights[col + row * cols];
            z = castle.row2z( row );
            if( h2 > h1 ) {
                this.addQuad({
                    materialIndex: 1,
                    vertices: [
                        [ x + .5, h1, z + .5],
                        [ x - .5, h1, z + .5],
                        [ x - .5, h2, z + .5],
                        [ x + .5, h2, z + .5]
                    ],
                    uvs: [[1,h1], [0,h1], [0,h2], [1,h2]]
                });

            }
            h1 = h2;
        }
    }

    // Create battlements.
    createBattlements.call( this );
};


// Extension of Geo.
Castle.prototype = Object.create(Geo.prototype);
Castle.prototype.constructor = Geo;


/**
 * @return void
 */
Castle.prototype.getH = function( col, row ) {
    var c = this._castle;
    return c.getHeight( col, row );
    /*
    if( col < 0 || row < 0 || col >= c.cols || row >= c.rows ) return 0;
    return c.heights[col + row * c.cols];
*/
};


function createBattlements() {
    var castle = this._castle;
    var row, col, h, x, y, z;
    var N, S, E, W;  // North, South, East, West.
    for( row=0 ; row<this._castle.rows ; row++ ) {
        z = castle.row2z( row );
        for( col=this._castle.cols - 1 ; col>=0 ; col-- ) {
            h = this.getH( col, row );
            y = h;
            x = castle.col2x( col );
            N = h > .33 + this.getH( col + 1, row );
            S = h > .33 + this.getH( col - 1, row );
            E = h > .33 + this.getH( col, row + 1 );
            W = h > .33 + this.getH( col, row - 1 );
            if( N ) addBattlementWall.call( this, x, y, z, 0 );
            if( E ) addBattlementWall.call( this, x, y, z, 1 );
            if( S ) addBattlementWall.call( this, x, y, z, 2 );
            if( W ) addBattlementWall.call( this, x, y, z, 3 );
            if( N && E ) addBattlementCorner.call( this, x, y, z, 0 );
            if( E && S ) addBattlementCorner.call( this, x, y, z, 1 );
            if( S && W ) addBattlementCorner.call( this, x, y, z, 2 );
            if( W && N ) addBattlementCorner.call( this, x, y, z, 3 );
        }
    }
}


function rotate0( x, z, arr ) {
    return arr;
}

function rotate1( x, z, arr ) {
    var out = [];
    arr.forEach(function (itm) {
        out.push([x + z - itm[2], itm[1], z - x + itm[0]]);
    });

    return out;
}

function rotate2( x, z, arr ) {
    var out = [];
    arr.forEach(function (itm) {
        out.push([2 * x - itm[0], itm[1], 2 * z - itm[2]]);
    });

    return out;
}

function rotate3( x, z, arr ) {
    var out = [];
    arr.forEach(function (itm) {
        out.push([x - z + itm[2], itm[1], z + x - itm[0]]);
    });

    return out;
}

var ROTATES = [rotate0, rotate1, rotate2, rotate3];

function addBattlementCorner( x, y, z, angle ) {
    var rot = ROTATES[angle];
    
    this.addTri({
        materialIndex: 1,
        vertices: rot( x, z, [
            [ x + .5, y - .1, z + .5 ],
            [ x + .7, y + .2, z + .5 ],
            [ x + .5, y + .2, z + .7 ]
        ]),
        uvs: [
            [ x + .6, y - .1 ],
            [ x + .7, y + .2 ],
            [ x + .5, y + .2 ]
        ]
    });
    this.addQuad({
        materialIndex: 1,
        vertices: rot( x, z, [
            [ x + .7, y + .2, z + .5 ],
            [ x + .5, y + .2, z + .7 ],
            [ x + .5, y + .4, z + .7 ],
            [ x + .7, y + .4, z + .5 ]
        ]),
        uvs: [
            [ x + .7, y + .2 ],
            [ x + .5, y + .2 ],
            [ x + .5, y + .4 ],
            [ x + .7, y + .4 ]
        ]
    });
    this.addTri({
        materialIndex: 1,
        vertices: rot( x, z, [
            [ x + .7, y + .4, z + .5 ],
            [ x + .5, y + .4, z + .5 ],
            [ x + .5, y + .4, z + .7 ]
        ]),
        uvs: [
            [ x + .7, z + .5 ],
            [ x + .5, z + .5 ],
            [ x + .5, z + .7 ]
        ]
    });
}

function addBattlementWall( x, y, z, angle ) {
    var rot = ROTATES[angle];
    
    this.addQuad({
        materialIndex: 1,
        vertices: rot( x, z, [
            [ x + .5, y - .1, z - .5],
            [ x + .5, y - .1, z + .5],
            [ x + .7, y + .2, z + .5],
            [ x + .7, y + .2, z - .5]
        ]),
        uvs: [[1,0], [0,0], [0,.3], [1,.3]]
    });
    this.addQuad({
        materialIndex: 1,
        vertices: rot( x, z, [
            [ x + .5, y -  0, z - .5],
            [ x + .5, y + .2, z - .5],
            [ x + .5, y + .2, z + .5],
            [ x + .5, y -  0, z + .5]
        ]),
        uvs: [[1,0], [1,.2], [0,.2], [0,0]]
    });
    this.addQuad({
        materialIndex: 1,
        vertices: rot( x, z, [
            [ x + .7, y + .2, z + .5],
            [ x + .5, y + .2, z + .5],
            [ x + .5, y + .2, z - .5],
            [ x + .7, y + .2, z - .5]
        ]),
        uvs: [[1,0], [1,.2], [0,.2], [0,0]]
    });
    this.addTri({
        materialIndex: 1,
        vertices: rot( x, z, [
            [ x + .5, y - .1, z + .5],
            [ x + .7, y + .2, z + .5],
            [ x + .5, y + .2, z + .5]
        ]),
        uvs: [[.2, y - .1], [0, y + .2], [.2, y + .2]]
    });
    this.addTri({
        materialIndex: 1,
        vertices: rot( x, z, [
            [ x + .5, y - .1, z - .5],
            [ x + .5, y + .2, z - .5],
            [ x + .7, y + .2, z - .5]
        ]),
        uvs: [[.2, y - .1], [.2, y + .2], [0, y + .2]]
    });
    // Add boxes on top of small walls.
    [
        {shift: -.5, width: .15},
        {shift: -.15, width: .3},
        {shift: .35, width: .15}
    ].forEach(function (itm) {
        this.addQuad({
            materialIndex: 1,
            vertices: rot( x, z, [
                [ x + .5, y + .2, z + itm.shift + itm.width],
                [ x + .5, y + .2, z + itm.shift],
                [ x + .5, y + .4, z + itm.shift],
                [ x + .5, y + .4, z + itm.shift + itm.width]
            ]),
            uvs: [
                [ y + .2, z + itm.shift],
                [ y + .4, z + itm.shift],
                [ y + .4, z + itm.shift + itm.width],
                [ y + .2, z + itm.shift + itm.width]
            ]
        });
        this.addQuad({
            materialIndex: 1,
            vertices: rot( x, z, [
                [ x + .7, y + .2, z + itm.shift + itm.width],
                [ x + .7, y + .4, z + itm.shift + itm.width],
                [ x + .7, y + .4, z + itm.shift],
                [ x + .7, y + .2, z + itm.shift]
            ]),
            uvs: [
                [ y + .2, z + itm.shift],
                [ y + .4, z + itm.shift],
                [ y + .4, z + itm.shift + itm.width],
                [ y + .2, z + itm.shift + itm.width]
            ]
        });
        this.addQuad({
            materialIndex: 1,
            vertices: rot( x, z, [
                [ x + .7, y + .4, z + itm.shift + itm.width],
                [ x + .5, y + .4, z + itm.shift + itm.width],
                [ x + .5, y + .4, z + itm.shift],
                [ x + .7, y + .4, z + itm.shift]
            ]),
            uvs: [
                [ y + .2, z + itm.shift],
                [ y + .4, z + itm.shift],
                [ y + .4, z + itm.shift + itm.width],
                [ y + .2, z + itm.shift + itm.width]
            ]
        });
        this.addQuad({
            materialIndex: 1,
            vertices: rot( x, z, [
                [ x + .7, y + .2, z + itm.shift],
                [ x + .7, y + .4, z + itm.shift],
                [ x + .5, y + .4, z + itm.shift],
                [ x + .5, y + .2, z + itm.shift]
            ]),
            uvs: [
                [ x + .7, y + .2],
                [ x + .7, y + .4],
                [ x + .5, y + .4],
                [ x + .5, y + .2]
            ]
        });
        this.addQuad({
            materialIndex: 1,
            vertices: rot( x, z, [
                [ x + .7, y + .2, z + itm.shift + itm.width],
                [ x + .5, y + .2, z + itm.shift + itm.width],
                [ x + .5, y + .4, z + itm.shift + itm.width],
                [ x + .7, y + .4, z + itm.shift + itm.width]
            ]),
            uvs: [
                [ x + .7, y + .2],
                [ x + .5, y + .2],
                [ x + .5, y + .4],
                [ x + .7, y + .4]
            ]
        });
    }, this);

}


module.exports = Castle;
