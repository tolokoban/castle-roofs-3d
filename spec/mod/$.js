require("$",function(n,r){n.config={name:"castle-roofs-3d",description:"Tutorial: making a simple 3D game",author:"tolokoban",version:"0.0.2",major:0,minor:0,revision:2,date:new Date(2016,4,8,18,9,45)};var a=null;n.lang=function(n){return void 0===n&&(n=window.localStorage.getItem("Language"),n||(n=window.navigator.language,n||(n=window.navigator.browserLanguage,n||(n="fr"))),n=n.substr(0,2).toLowerCase()),a=n,window.localStorage.setItem("Language",n),n},n.intl=function(r,a){var t,e,o,i,g,u,l=r[n.lang()],s=a[0];if(!l)return s;if(t=l[s],!t)return s;if(a.length>1){for(e="",g=0,o=0;o<t.length;o++)i=t.charAt(o),"$"===i?(e+=t.substring(g,o),o++,u=t.charCodeAt(o)-48,e+=0>u||u>=a.length?"$"+t.charAt(o):a[u],g=o+1):"\\"===i&&(e+=t.substring(g,o),o++,e+=t.charAt(o),g=o+1);e+=t.substr(g),t=e}return t}});
//# sourceMappingURL=$.js.map