/**********************************************************************
 require( 'keyboard' )
 -----------------------------------------------------------------------
 
 **********************************************************************/


exports.forward = false;
exports.right = false;
exports.left = false;
exports.fire = false;
exports.jump = false;

var KEYS = {
    "38": "forward",
    "39": "right",
    "37": "left",
    "32": "fire"
};


window.addEventListener('keyup', function( evt ) {
    var action = KEYS["" + evt.keyCode];
    if( action ) {
        evt.preventDefault();
        evt.stopPropagation();
        exports[action] = false;
    }
}, true);


window.addEventListener('keydown', function( evt ) {
    var action = KEYS["" + evt.keyCode];
    if( action ) {
        evt.preventDefault();
        evt.stopPropagation();
        console.info("[controls] action=...", action);
        exports[action] = true;
    }
}, true);
