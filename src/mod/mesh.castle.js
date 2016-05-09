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
        roughness: 1,
        map: texGrass/*,
        bumpMap: texGrassBump,
        bumpMapScale: 0*/
    });

    var texWall = new THREE.TextureLoader().load( "css/gfx/wall2.jpg" );
    texWall.wrapS = THREE.RepeatWrapping;
    texWall.wrapT = THREE.RepeatWrapping;
    var texWallBump = new THREE.TextureLoader().load( "css/gfx/wall2-bump.jpg" );
    texWallBump.wrapS = THREE.RepeatWrapping;
    texWallBump.wrapT = THREE.RepeatWrapping;
    var matWall = new THREE.MeshStandardMaterial({
        metalness: 0,
        roughness: .5,
        map: texWall,
        bumpMap: texWallBump,
        bumpMapScale: .4
    });

    var material = new THREE.MultiMaterial([ matRoof, matWall ]);
    var geometry = new Geo( castle );
    var mesh = geometry.createMesh( material );
    
    return mesh;
};
