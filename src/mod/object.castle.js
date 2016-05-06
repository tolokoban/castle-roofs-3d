/**********************************************************************
 require( 'object.castle' )
 -----------------------------------------------------------------------
 
 **********************************************************************/
var Object3D = require("object");

var COLOR_GREEN = new THREE.Color( 0x00ff00 );
var COLOR_MAROON = new THREE.Color( 0x905000 );
var COLOR_BLUE = new THREE.Color( 0x0000ff );



function H2Y( h ) {
    if( h < 1 ) return 0;
    return 2 + h * .25;
}


function ObjectCastle( castle ) {
    this._vertices = {};

    var texGrass = new THREE.TextureLoader().load( "css/gfx/grass.jpg" );
    var texGrassBump = new THREE.TextureLoader().load( "css/gfx/grass-bump.jpg" );
    var matRoof = new THREE.MeshStandardMaterial({
        metalness: 0,
        roughness: .5,
        map: texGrass,
        bumpMap: texGrassBump
    });

    // Top faces.
    var objRoof = new Object3D( matRoof );

        var x = 0;
        var y = 3;
        var z = 0;        
        objRoof.addQuad({
            vertices: [
                [ x - .5, y, z - .5],
                [ x + .5, y, z - .5],
                [ x + .5, y, z + .5],
                [ x - .5, y, z + .5]
            ],
            color: COLOR_GREEN
        });

/*
    castle.heights.forEach(function( h, idx ) {
        // Do not create boxes of height lesser than 1.
        if( h < 1 ) return;
        var col = idx % castle.cols;
        var row = (idx - col) / castle.rows;
        var x = col - castle.cols / 2;
        var y = h; //H2Y( h );
        var z = row - castle.rows / 2;        
        objRoof.addQuad({
            vertices: [
                [ x - .5, y, z - .5],
                [ x + .5, y, z - .5],
                [ x + .5, y, z + .5],
                [ x - .5, y, z + .5]
            ],
            color: COLOR_GREEN
        });
    });
*/
    /*
    var texWall = new THREE.TextureLoader().load( "css/gfx/wall.jpg" );
    var texWallBump = new THREE.TextureLoader().load( "css/gfx/wall-bump.jpg" );
    var matWall = new THREE.MeshStandardMaterial({
        metalness: 0,
        roughness: .7,
        map: texWall,
        bumpMap: texWallBump
        //vertexColors: THREE.VertexColors
    });
*/
    var grp = new THREE.Group();
    grp.add( objRoof.mesh );
    Object.defineProperty( this, 'mesh', {
        value: grp,
        writable: false
    });
}

module.exports = ObjectCastle;
