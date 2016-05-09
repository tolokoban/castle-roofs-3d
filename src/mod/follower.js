/**********************************************************************
 require( 'follower' )
 -----------------------------------------------------------------------
 
 **********************************************************************/


function Follower( args ) {
    this._args = args;

    this._x = this._z = 0;
    this._y = 20;
    this._time = 0;
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
    var maxFar = 5;
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
        var time = time1 - time0;
        var shift = .1 * Math.cos( time1 * .0007 );
        var targetX = newPos.x - maxFar * Math.cos( angle );
        var targetZ = newPos.z + maxFar * Math.sin( angle );
        col = castle.z2row( targetX );
        row = castle.x2col( targetZ );
        var targetY = Math.max( currentHeight - .4, castle.getHeight( col, row ) );
        bestSlope = targetY - currentHeight;
        dist = maxFar;
        for( k = maxFar - 1 ; k > 0 ; k-- ) {
            x = newPos.x - k * Math.cos( angle );
            z = newPos.z + k * Math.sin( angle );
            col = castle.x2col( x );
            row = castle.z2row( z );
            h = castle.getHeight( col, row );
            if( h == 0 ) h = currentHeight;
            slope = (h - currentHeight) / k;
            if( slope > bestSlope ) {
                // There is a better spot for the camera.
                dist = k;
                bestSlope = slope;
                targetX = x;
                targetZ = z;
                targetY = h;
            }
        }

        dist -= .8;
        targetX = newPos.x - dist * Math.cos( angle + shift );
        targetZ = newPos.z + dist * Math.sin( angle + shift );
        targetY += 1.5;  //.2 * dist;
        vx = targetX - camera.position.x;
        vy = targetY - camera.position.y;
        vz = targetZ - camera.position.z;
        r = Math.sqrt( vx * vx + vy * vy + vz * vz );

        if( isNaN( r ) ) debugger;
        
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
   
    camera.lookAt( new THREE.Vector3( newPos.x, newPos.y + 1, newPos.z ) );    
};



module.exports = Follower;
