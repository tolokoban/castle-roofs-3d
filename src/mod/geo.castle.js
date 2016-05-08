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
        var row = (idx - col) / castle.rows;
        var x = col - castle.cols / 2;
        var y = h; //H2Y( h );
        var z = row - castle.rows / 2;
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
        z = row - rows / 2;
        for( col=0 ; col<cols ; col++ ) {
            h2 = castle.heights[col + row * cols];
            x = col - cols / 2;
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
        z = row - rows / 2;
        for( col=cols - 1 ; col>=0 ; col-- ) {
            h2 = castle.heights[col + row * cols];
            x = col - cols / 2;
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
        x = col - cols / 2;
        for( row=0 ; row<rows ; row++ ) {
            h2 = castle.heights[col + row * cols];
            z = row - rows / 2;
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
        x = col - cols / 2;
        for( row=rows-1 ; row>=0 ; row-- ) {
            h2 = castle.heights[col + row * cols];
            z = row - rows / 2;
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
    if( col < 0 || row < 0 || col >= c.cols || row >= c.rows ) return 0;
    return c.heights[col + row * c.cols];
};


function createBattlements() {
    var row, col, h, x, y, z;
    var N, S, E, W;  // North, South, East, West.
    for( row=0 ; row<this._castle.rows ; row++ ) {
        z = row - this._castle.rows / 2;
        for( col=this._castle.cols - 1 ; col>=0 ; col-- ) {
            h = this.getH( col, row );
console.info("[geo.castle] h=...", h);
            x = col - this._castle.cols / 2;
            N = h > .3 + this.getH( col + 1, row );
            S = h > .3 + this.getH( col - 1, row );
            E = h > .3 + this.getH( col, row + 1 );
            W = h > .3 + this.getH( col, row - 1 );
            if( N ) {
                this.addQuad({
                    materialIndex: 1,
                    vertices: [
                        [ x + .5, h - .1, z - .5],
                        [ x + .5, h - .1, z + .5],
                        [ x + .7, h + .2, z + .5],
                        [ x + .7, h + .2, z - .5]
                    ],
                    uvs: [[1,0], [0,0], [0,.3], [1,.3]]                    
                });
                this.addQuad({
                    materialIndex: 1,
                    vertices: [
                        [ x + .5, h -  0, z - .5],
                        [ x + .5, h + .2, z - .5],
                        [ x + .5, h + .2, z + .5],
                        [ x + .5, h -  0, z + .5]
                    ],
                    uvs: [[1,0], [1,.2], [0,.2], [0,0]]                    
                });
                this.addQuad({
                    materialIndex: 1,
                    vertices: [
                        [ x + .7, h + .2, z + .5],
                        [ x + .5, h + .2, z + .5],
                        [ x + .5, h + .2, z - .5],
                        [ x + .7, h + .2, z - .5]
                    ],
                    uvs: [[1,0], [1,.2], [0,.2], [0,0]]
                });
                this.addTri({
                    materialIndex: 1,
                    vertices: [
                        [ x + .5, h - .1, z + .5],
                        [ x + .7, h + .2, z + .5],
                        [ x + .5, h + .2, z + .5]
                    ],
                    uvs: [[.2, h - .1], [0, h + .2], [.2, h + .2]]                    
                });
                this.addTri({
                    materialIndex: 1,
                    vertices: [
                        [ x + .5, h - .1, z - .5],
                        [ x + .5, h + .2, z - .5],
                        [ x + .7, h + .2, z - .5]
                    ],
                    uvs: [[.2, h - .1], [.2, h + .2], [0, h + .2]]                    
                });
            }
            if( S ) {
                this.addQuad({
                    materialIndex: 1,
                    vertices: [
                        [ x - .5, h - .1, z + .5],
                        [ x - .5, h - .1, z - .5],
                        [ x - .7, h + .2, z - .5],
                        [ x - .7, h + .2, z + .5]
                    ],
                    uvs: [[1,0], [0,0], [0,.3], [1,.3]]                    
                });
                this.addQuad({
                    materialIndex: 1,
                    vertices: [
                        [ x - .5, h -  0, z + .5],
                        [ x - .5, h + .2, z + .5],
                        [ x - .5, h + .2, z - .5],
                        [ x - .5, h -  0, z - .5]
                    ],
                    uvs: [[1,0], [1,.2], [0,.2], [0,0]]                    
                });
                this.addQuad({
                    materialIndex: 1,
                    vertices: [
                        [ x - .7, h + .2, z - .5],
                        [ x - .5, h + .2, z - .5],
                        [ x - .5, h + .2, z + .5],
                        [ x - .7, h + .2, z + .5]
                    ],
                    uvs: [[1,0], [1,.2], [0,.2], [0,0]]
                });
                this.addTri({
                    materialIndex: 1,
                    vertices: [
                        [ x - .5, h - .1, z - .5],
                        [ x - .7, h + .2, z - .5],
                        [ x - .5, h + .2, z - .5]
                    ],
                    uvs: [[.2, h - .1], [0, h + .2], [.2, h + .2]]                    
                });
                this.addTri({
                    materialIndex: 1,
                    vertices: [
                        [ x - .5, h - .1, z + .5],
                        [ x - .5, h + .2, z + .5],
                        [ x - .7, h + .2, z + .5]
                    ],
                    uvs: [[.2, h - .1], [.2, h + .2], [0, h + .2]]                    
                });
            }
        }
    }
}


module.exports = Castle;
