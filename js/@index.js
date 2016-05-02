/**********************************************************************
 require( 'require' )
 -----------------------------------------------------------------------
 @example

 var Path = require("node://path");  // Only in NodeJS/NW.js environment.
 var Button = require("tfw.button");

 **********************************************************************/

var require = function() {
    var modules = {};
    var definitions = {};
    var nodejs_require = typeof window.require === 'function' ? window.require : null;

    var f = function(id, body) {
        if( id.substr( 0, 7 ) == 'node://' ) {
            // Calling for a NodeJS module.
            if( !nodejs_require ) {
                throw Error( "[require] NodeJS is not available to load module `" + id + "`!" );
            }
            return nodejs_require( id.substr( 7 ) );
        }

        if( typeof body === 'function' ) {
            definitions[id] = body;
            return;
        }
        var mod;
        body = definitions[id];
        if (typeof body === 'undefined') {
            var err = new Error("Required module is missing: " + id);   
            console.error(err.stack);
            throw err;
        }
        mod = modules[id];
        if (typeof mod === 'undefined') {
            mod = {exports: {}};
            var exports = mod.exports;
            body(exports, mod);
            modules[id] = mod.exports;
            mod = mod.exports;
            //console.log("Module initialized: " + id);
        }
        return mod;
    };
    return f;
}();
function addListener(e,l) {
    if (window.addEventListener) {
        window.addEventListener(e,l,false);
    } else {
        window.attachEvent('on' + e, l);
    }
};

addListener(
    'DOMContentLoaded',
    function() {
        document.body.parentNode.$data = {};
        // Attach controllers.
        APP = require('app');
setTimeout(function (){if(typeof APP.start==='function')APP.start()});
    }
);
require("$",function(n,r){n.config={name:"castle-roofs-3d",description:"Tutorial: making a simple 3D game",author:"tolokoban",version:"0.0.1",major:0,minor:0,revision:1,date:new Date(2016,4,2,11,51,54)};var a=null;n.lang=function(n){return void 0===n&&(n=window.localStorage.getItem("Language"),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n="fr"))),n=n.substr(0,2).toLowerCase()),a=n,window.localStorage.setItem("Language",n),n},n.intl=function(r,a){var t,e,o,i,g,u,l=r[n.lang()],s=a[0];if(!l)return s;if(t=l[s],!t)return s;if(a.length>1){for(e="",g=0,o=0;o<t.length;o++)i=t.charAt(o),"$"===i?(e+=t.substring(g,o),o++,u=t.charCodeAt(o)-48,e+=0>u||u>=a.length?"$"+t.charAt(o):a[u],g=o+1):"\\"===i&&(e+=t.substring(g,o),o++,e+=t.charAt(o),g=o+1);e+=t.substr(g),t=e}return t}});
//# sourceMappingURL=$.js.map
require("app",function(n,t){n.start=function(){}});
//# sourceMappingURL=app.js.map
