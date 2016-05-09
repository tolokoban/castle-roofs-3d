/**********************************************************************
 require( 'geo.hero' )
 -----------------------------------------------------------------------

 **********************************************************************/
"use strict";
var Geo = require("geo");

var Hero = function() {
    Geo.call( this );

    var orange = new THREE.Color( 0xff9900 );
    var steps = 60, height = 1, radius = .3;
    var i, ang1, ang2, r1, r2;
    for (i = 0 ; i < steps ; i++) {
        ang1 = i * 2 * Math.PI / steps;
        ang2 = (i + 1) * 2 * Math.PI / steps;
        r1 = radius;
        r2 = radius / 2;
        this.addTri({
            color: orange,
            vertices: [
                [radius * 1.5, height, 0],
                [radius * .4 + r2 * Math.cos( ang2 ), height / 2, r2 * Math.sin( ang2 )],
                [radius * .4 + r2 * Math.cos( ang1 ), height / 2, r2 * Math.sin( ang1 )]
            ]
        });
        this.addQuad({
            color: orange,
            vertices: [
                [r1 * Math.cos( ang1 ), 0, r1 * Math.sin( ang1 )],
                [r1 * Math.cos( ang2 ), 0, r1 * Math.sin( ang2 )],
                [radius * .4 + r2 * Math.cos( ang2 ), height / 2, r2 * Math.sin( ang2 )],
                [radius * .4 + r2 * Math.cos( ang1 ), height / 2, r2 * Math.sin( ang1 )]
            ]
        });
    }
};


// Extension of Geo.
Hero.prototype = Object.create(Geo.prototype);
Hero.prototype.constructor = Geo;



module.exports = Hero;
