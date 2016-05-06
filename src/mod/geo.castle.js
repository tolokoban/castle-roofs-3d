/**********************************************************************
 require( 'geo.castle' )
 -----------------------------------------------------------------------

 **********************************************************************/
"use strict";
var Geo = require("geo");

var Castle = function( castle ) {
    Geo.call( this );

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

};


// Extension of Geo.
Castle.prototype = Object.create(Geo.prototype);
Castle.prototype.constructor = Geo;




module.exports = Castle;
