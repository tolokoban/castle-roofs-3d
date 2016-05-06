/**********************************************************************
 require( 'mesh.castle' )
 -----------------------------------------------------------------------
 
 **********************************************************************/

var Geo = require("geo.castle");


module.exports = function( castle ) {
    var texGrass = new THREE.TextureLoader().load( "css/gfx/grass.jpg" );
    var texGrassBump = new THREE.TextureLoader().load( "css/gfx/grass-bump.jpg" );
    var matRoof = new THREE.MeshStandardMaterial({
        metalness: 0,
        roughness: .5,
        map: texGrass,
        bumpMap: texGrassBump
    });

    var material = new THREE.MultiMaterial([ matRoof ]);
    var geometry = new Geo( castle );
    var mesh = geometry.createMesh( material );
    
    return mesh;
};
