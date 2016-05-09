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
        4, 3, 2, 3, 4
    ]
};

var castlePippin = {
    cols: 8,
    rows: 17,
    heights: [
        2.7, 2.7, 2.7, 2.7, 3.0, 3.2, 3.4, 3.6,
        2.7, 2.5, 1.0, 1.0, 1.0, 1.0, 1.0, 3.8,
        2.7, 2.2, 1.0, 6.4, 6.2, 6.0, 5.0, 4.0,
        2.7, 1.9, 1.0, 6.6, 8.2, 5.8, 5.0, 4.2,
        2.7, 1.6, 1.0, 6.8, 7.0, 5.6, 5.0, 4.4,
        2.7, 1.4, 1.2, 0.0, 0.0, 5.4, 5.0, 4.6,
        2.7, 1.2, 1.5, 1.8, 2.1, 5.2, 5.0, 4.8,
        2.4, 1.3, 3.6, 3.9, 2.4, 2.6, 2.8, 4.8,
        2.1, 1.4, 3.3, 3.6, 2.7, 5.2, 5.0, 5.0,
        1.8, 1.5, 3.0, 3.3, 3.0, 5.2, 5.0, 4.8,
        6.7, 1.6, 2.9, 3.1, 3.0, 5.2, 5.0, 4.6,
        6.7, 1.7, 2.8, 3.0, 3.0, 3.2, 3.0, 4.4,
        2.7, 1.8, 2.7, 2.7, 3.0, 3.2, 2.8, 4.2,
        2.6, 1.9, 2.6, 2.6, 3.0, 3.2, 2.8, 4.0,
        2.5, 2.0, 2.5, 2.4, 3.0, 3.2, 2.8, 3.8,
        2.4, 2.1, 2.4, 2.1, 3.0, 3.2, 2.8, 3.6,
        2.3, 2.2, 2.3, 2.2, 2.0, 2.2, 2.5, 4.8
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


function Castle( castle ) {
    Object.defineProperty( this, 'rows', {
        value: castle.rows,
        writable: false,
        configurable: true,
        enumerable: true
    });
    Object.defineProperty( this, 'cols', {
        value: castle.cols,
        writable: false,
        configurable: true,
        enumerable: true
    });
    Object.defineProperty( this, 'heights', {
        value: castle.heights.slice(),
        writable: false,
        configurable: true,
        enumerable: true
    });
    
}

/**
 * @return Height of a castle's cell. If the cell does not exists, return 0.
 */
Castle.prototype.getHeight = function( col, row ) {
    if( col < 0 || row < 0 || col >= this.cols || row >= this.rows ) return 0;
    return this.heights[col + row * this.cols];    
};


/**
 * @return Z from `row`.
 */
Castle.prototype.row2z = function( row ) {
    return row - this.rows / 2 + .5;
};

/**
 * @return X from `col`.
 */
Castle.prototype.col2x = function( col ) {
    return col - this.cols / 2 + .5;
};

/**
 * @return Row from `x`.
 */
Castle.prototype.z2row = function( z ) {
    return Math.floor( z + this.rows / 2 - .5 );
};

/**
 * @return Col from `x`.
 */
Castle.prototype.x2col = function( x ) {
    return Math.floor( x + this.cols / 2 - .5 );
};



exports.count = function() {
    return CASTLES.length;
};

exports.getCopyOfCastle = function( index ) {
    var castle = CASTLES[index];
    if( !castle ) castle = CASTLES[0];
    return new Castle( castle );
};

