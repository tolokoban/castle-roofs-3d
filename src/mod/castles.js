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
        4.0, 2.6, 2.8, 3.0, 3.2, 3.4, 6.6,
        2.2, 0.0, 0.0, 0.0, 0.0, 0.0, 3.8,
        2.0, 0.0, 6.4, 6.2, 6.0, 0.0, 4.0,
        1.8, 0.0, 6.6, 8.2, 5.8, 0.0, 4.2,
        1.6, 0.0, 6.8, 7.0, 5.6, 0.0, 4.4,
        1.4, 0.0, 0.0, 0.0, 5.4, 0.0, 4.6,
        5.0, 1.0, 2.0, 3.0, 5.2, 5.0, 8.0
    ]
};

var castleHorty = {
    cols: 7,
    rows: 7,
    heights: [
        4, 3, 4, 3, 4, 3, 4,
        3, 0, 0, 0, 0, 0, 3,
        4, 0, 6, 6, 6, 0, 4,
        3, 0, 6, 7, 6, 0, 3,
        4, 0, 6, 6, 6, 0, 4,
        3, 0, 0, 0, 0, 0, 3,
        4, 9, 0, 0, 0, 9, 4
    ]
};

var CASTLES = [ castleMerry, castlePippin, castleHorty ];


exports.count = function() {
    return CASTLES.length;
};

exports.getCopyOfCastle = function( index ) {
    var castle = CASTLES[index];
    if( !castle ) return castle;
    var out = JSON.parse( JSON.stringify( castle ) );
    return out;
};

