/**********************************************************************
 require( 'object' )
 -----------------------------------------------------------------------

 **********************************************************************/


function Object3D( material ) {
    this._vertices = {};
    this._uvs = {};

    var geometry = new THREE.Geometry();
    this._geometry = geometry;

    Object.defineProperty( this, 'mesh', {
        value: new THREE.Mesh( geometry, material ),
        writable: false
    });
}




/**
 * @param args
 * * __vertices__:
 * * __uvs__:
 */
Object3D.prototype.addQuad = function( args ) {
    if( typeof args.uvs === 'undefined' ) {
        args.uvs = [
            [0, 0], [1, 0], [1, 1], [0, 1]
        ];
    }

    var uvs = [];
    args.uvs.forEach(function ( uv ) {
        uvs.push( addUV.call( this, uv[0], uv[1] ) );
    }, this);

    var vertices = [];
    args.vertices.forEach(function ( vertex ) {
        vertices.push( addVertex.call( this, vertex[0], vertex[1], vertex[2] ) );
    }, this);

    var f1 = new THREE.Face3( vertices[0], vertices[3], vertices[2] );
    var f2 = new THREE.Face3( vertices[0], vertices[2], vertices[1] );

    if( args.color ) {
        f1.vertexColors[0] = f1.vertexColors[1] = f1.vertexColors[2] = args.color;
        f2.vertexColors[0] = f2.vertexColors[1] = f2.vertexColors[2] = args.color;
    }
    this._geometry.faceVertexUvs[0].push(
        [uvs[0], uvs[3], uvs[2]],
        [uvs[0], uvs[1], uvs[2]]
    );
    this._geometry.faces.push( f1, f2 );
};



function addVertex( x, y, z ) {
    var k = key3( x, y, z );
    var i = this._vertices[k];
    if( typeof i === 'undefined') {
        this._geometry.vertices.push( new THREE.Vector3( x, y, z ) );
        i = this._geometry.vertices.length - 1;
        this._vertices[k] = i;
        return i;
    }
    return i;
};


function addUV( u, v ) {
    var k = key2( u, v );
    var uv = this._uvs[k];
    if( typeof uv === 'undefined') {
        uv = new THREE.Vector2( u, v );
        this._uvs[k] = uv;
    }
    return uv;
};


function key3( x, y, z ) {
    return x.toFixed(3) + "," + y.toFixed(3) + "," + z.toFixed(3);
}

function key2( u, v ) {
    return u.toFixed(4) + "," + v.toFixed(4);
}


module.exports = Object3D;
