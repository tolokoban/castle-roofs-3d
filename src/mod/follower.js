/**********************************************************************
 require( 'follower' )
 -----------------------------------------------------------------------
 
 **********************************************************************/


function Follower( args ) {
    this._args = args;

    this._x = this._z = 0;
    this._y = 20;
    this._time = 0;
    this._looks = [
        subjective.bind( this )
    ];
}

var DIRS = [[-1,0], [0,-1], [1,0], [0,1]];

function subjective( time1 ) {

}

/**
 * @return void
 */
Follower.prototype.look = function( time1 ) {
    var speed = .006;
    var camera = this._args.camera;
    var castle = this._args.castle;
    var newPos = this._args.mesh.position;
    var angle = this._args.mesh.rotation.y;    
    var time0 = this._time;
    var maxDist = 5;
    var orientation;
    var bestOrientation;
    var bestDist;
    var bestHeight;
    var bestCol, bestRow;

    var dist;
    var col, row;
    var vx, vy, vz;
    var r, k, h;
    var x, y, z;
    var slope;
    var bestSlope;
    if( time0 > 0 ) {
        col = castle.x2col( newPos.x );
        row = castle.z2row( newPos.z );
        var currentHeight = castle.getHeight( col, row );
        // Finding orientation. This will be a number between 0 and 3.
        bestDist = 0;
        bestHeight = currentHeight;
        orientation = Math.floor( angle + Math.PI / 8 ) % 4;
        if( orientation < 0 ) orientation += 4;
        [
            orientation,
            (orientation + 1) % 4,
            (orientation + 3) % 4,
            (orientation + 2) % 4,
        ].forEach(function( orient ) {
            var col2 = col, row2 = row;
            var dir = DIRS[orient];
//if( typeof dir === 'undefined' ) debugger;

            var height;
            var lastHeight = currentHeight;
            for( var dist = 1 ; dist < maxDist ; dist++ ) {
                col2 += dir[0];
                row2 += dir[1];
                height = Math.max( lastHeight, castle.getHeight( col2, row2 ) );
                if( Math.abs( height - lastHeight ) > .33 ) break;
                lastHeight = height;
                if( dist > bestDist ) {
                    bestDist = dist;
                    bestHeight = height;
                    bestCol = col2;
                    bestRow = row2;
                }
            }
        });

        var targetX = castle.col2x( bestCol );
        var targetY = bestHeight + 1.5;
        var targetZ = castle.row2z( bestRow );

        var time = time1 - time0;
        var shift = .1 * Math.cos( time1 * .0007 );

        targetX = newPos.x;
        targetY = newPos.y + .8;
        targetZ = newPos.z;

        // Let's go to the target.
        vx = targetX - camera.position.x;
        vy = targetY - camera.position.y;
        vz = targetZ - camera.position.z;
        r = Math.sqrt( vx * vx + vy * vy + vz * vz );

        if( r < time * speed ) {
            camera.position.x = targetX;
            camera.position.y = targetY;
            camera.position.z = targetZ;
        } else {
            var alpha = time * speed / r;
            camera.position.x += vx * alpha;
            camera.position.y += vy * alpha;
            camera.position.z += vz * alpha;
        }
    }
    this._time = time1;
   
    camera.position = new THREE.Vector3( newPos.x, newPos.y + .8, newPos.z );
    camera.lookAt( new THREE.Vector3( 
        newPos.x - Math.sin( angle - Math.PI / 2 ), 
        newPos.y + .8, 
        newPos.z - Math.cos( angle - Math.PI / 2 )
    ) );    
};



module.exports = Follower;
