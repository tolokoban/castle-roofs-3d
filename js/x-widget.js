require( 'x-widget', function(exports, module) {  "use strict";

var widgets = {};
// Used for `onWidgetCreation()`.
var slots = {};


var Widget = function(id, modName, args) {
    var dst = document.getElementById( id );
    if (!dst) {
        // This widget does not exist!
        return;
    }
    var module = require( modName );
    var wdg = new module( args );
    var elem = typeof wdg.element === 'function' ? wdg.element() : wdg.element;
    elem.setAttribute( 'id', id );
    dst.parentNode.replaceChild( elem, dst );
    register( id, wdg );
};

Widget.template = function( attribs ) {
    var key, val, id, name = '', args = {};
    for( key in attribs ) {
        val = attribs[key];
        if( key == 'name' ) {
            name = val;
        }
        else if( key == 'id' ) {
            id = val;
        }
        else if( key.charAt(0)=='$' ) {
            args[key.substr( 1 )] = val;
        }        
    }
    var module = require( name );
    var wdg = new module( args );
    if( id ) {
        register( id, wdg );
    }

    return typeof wdg.element === 'function' ? wdg.element() : (wdg.element || wdg);
};

function register( id, wdg ) {
    widgets[id] = wdg;
    var mySlots = slots[id];
    console.info("[x-widget] widget creation=...", id);
    if( typeof mySlots !== 'undefined' ) {
        window.setTimeout(function() {
            mySlots.forEach(function (slot) {
                slot( wdg );
            });
            delete slots[id];
        });        
    }
    return typeof wdg.element === 'function' ? wdg.element : (wdg.element || wdg);
};

Widget.getById = function( id ) {
    if( !widgets[id] ) throw Error( "[x-widget.getById()] ID not found: " + id + "!" );
    return widgets[id];
};

Widget.onWidgetCreation = function( id, slot ) {
    if( typeof widgets[id] === 'undefined' ) {
        if( typeof slots[id] === 'undefined' ) slots[id] = [slot];
        else slots[id].push( slot );
    } else {
        // Asynchronous call to the slot
        window.setTimeout(
            function() {
                slot( widgets[id] );
            }
        );
    }
};

module.exports = Widget;
 });
