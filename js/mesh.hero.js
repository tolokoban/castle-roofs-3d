require( 'mesh.hero', function(exports, module) {  /**********************************************************************
 require( 'mesh.castle' )
 -----------------------------------------------------------------------
 
 **********************************************************************/

var Geo = require("geo.hero");


module.exports = function() {
    var material = new THREE.MultiMaterial([new THREE.MeshStandardMaterial({
        metalness: .8,
        roughness: .5,
        vertexColors: THREE.VertexColors
    })]);
    var geometry = new Geo();
    var mesh = geometry.createMesh( material );
    var grp = new THREE.Group();
    grp.add( mesh );
    return grp;
};
 });
