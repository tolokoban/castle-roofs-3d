/**********************************************************************
 require( 'castles' )
 -----------------------------------------------------------------------
 Exports two functions:

* __count()__: return the number of available castles.
* __getCopyOfCastle( index )__: return a copy of the definition of the castle number `index`.
 **********************************************************************/

var castleMerry = {
    cols: 5,
    rows: 5,
    heights: [
        3, 3, 3, 3, 3,
        3, 1, 4, 1, 3,
        3, 1, 5, 1, 3,
        3, 1, 6, 1, 3,
        4, 3, 2, 3, 4,
    ]
};

var castlePippin = {
    cols: 7,
    rows: 7,
    heights: [
        4, 3, 3, 3, 3, 3, 4,
        3, 0, 0, 0, 0, 0, 3,
        3, 0, 5, 5, 5, 0, 3,
        3, 0, 5, 4, 5, 0, 3,
        3, 0, 5, 5, 5, 0, 3,
        3, 0, 0, 0, 0, 0, 3,
        4, 3, 3, 3, 3, 3, 4
    ]
};

var CASTLES = [ castleMerry, castlePippin ];


exports.count = function() {
    return CASTLES.length;
};

exports.getCopyOfCastle = function( index ) {
    var castle = CASTLES[index];
    if( !castle ) return castle;
    return JSON.parse( JSON.stringify( castle ) );
};

