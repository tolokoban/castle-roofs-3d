var MATERIAL = new THREE.MeshStandardMaterial({
    metalness: 0.1,
    roughness: 0.5,
    vertexColors: THREE.VertexColors
});




function MeshFactory( material ) {
    this._verticesMap = {};
    this.geometry = new THREE.Geometry();
    this.material = material || MATERIAL;
}


/**
 * @return void
 */
MeshFactory.prototype.toMesh = function() {
    this.geometry.computeFaceNormals();
    this.geometry.computeVertexNormals();

    return new THREE.Mesh( this.geometry, this.material );
};

/**
 * @param options - `{ pos: [], dir: "Y", color: ... }`
 */
MeshFactory.prototype.addQuad = function( options ) {
    var vertices;
    var x = options.pos[0];
    var y = options.pos[1];
    var z = options.pos[2];
    switch( options.dir ) {
    case "X":
        vertices = [
            this.addVertex( x - .5, y + .5, z + .5 ),
            this.addVertex( x - .5, y - .5, z + .5 ),
            this.addVertex( x - .5, y - .5, z - .5 ),
            this.addVertex( x - .5, y + .5, z - .5 )
        ];
        break;
    case "x":
        vertices = [
            this.addVertex( x - .5, y - .5, z - .5 ),
            this.addVertex( x - .5, y - .5, z + .5 ),
            this.addVertex( x - .5, y + .5, z + .5 ),
            this.addVertex( x - .5, y + .5, z - .5 )
        ];
        break;
    case "Z":
        vertices = [
            this.addVertex( x + .5, y + .5, z - .5 ),
            this.addVertex( x + .5, y - .5, z - .5 ),
            this.addVertex( x - .5, y - .5, z - .5 ),
            this.addVertex( x - .5, y + .5, z - .5 )
        ];
        break;
    case "z":
        vertices = [
            this.addVertex( x - .5, y - .5, z - .5 ),
            this.addVertex( x + .5, y - .5, z - .5 ),
            this.addVertex( x + .5, y + .5, z - .5 ),
            this.addVertex( x - .5, y + .5, z - .5 )
        ];
        break;
    default:
        // Pointing toward +Y.
        vertices = [
            this.addVertex( x + .5, y, z + .5 ),
            this.addVertex( x - .5, y, z + .5 ),
            this.addVertex( x - .5, y, z - .5 ),
            this.addVertex( x + .5, y, z - .5 )
        ];
    }

    var f1 = new THREE.Face3( vertices[0], vertices[3], vertices[2] );
    f1.vertexColors[0] = f1.vertexColors[1] = f1.vertexColors[2] = options.color;
    var f2 = new THREE.Face3( vertices[0], vertices[2], vertices[1] );
    f2.vertexColors[0] = f2.vertexColors[1] = f2.vertexColors[2] = options.color;

    this.geometry.faces.push( f1, f2 );
};

/**
 * @return void
 */
MeshFactory.prototype.addVertex = function( x, y, z ) {
    var k = key( x, y, z );
    var i = this._verticesMap[k];
    if( typeof i === 'undefined') {
        this.geometry.vertices.push( new THREE.Vector3( x, y, z ) );
        i = this.geometry.vertices.length - 1;
        this._verticesMap[k] = i;
        return i;
    }
    return i;
};



function key( x, y, z ) {
    return x.toFixed(3) + "," + y.toFixed(3) + "," + z.toFixed(3);
}


module.exports = MeshFactory;
