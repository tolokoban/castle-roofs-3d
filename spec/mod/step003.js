require("step003",function(o,r){"use strict";var s=require("lights"),e=require("castles"),t=require("mesh-factory"),a=require("three.canvas"),c=new THREE.Color(65280),i=new THREE.Color(9457664),l=(new THREE.Color(255),new THREE.MeshStandardMaterial({metalness:.1,roughness:.5,vertexColors:THREE.VertexColors}),function(o){a.call(this,o),s["default"](this.scene);var r=new THREE.Group;this.scene.add(r),this._grp=r;var l=parseInt(o.castle);isNaN(l)&&(l=0);var d,h,f,n,p,u,w,E,g=new t,C=e.getCopyOfCastle(l);for(C.heights.forEach(function(o,r){if(!(1>o)){var s=r%C.cols,e=(r-s)/C.cols;g.addQuad({pos:[s-C.cols/2,o,e-C.rows/2],color:c,dir:"Y"})}}),h=0;h<C.rows;h++)for(p=h-C.rows/2,w=0,d=0;d<C.cols;d++){if(f=d-C.cols/2,E=C.heights[h*C.cols+d],E>w)for(u=w+1;E>=u;u++)n=u-.5,g.addQuad({pos:[f,n,p],color:i,dir:"X"});w=E}for(h=0;h<C.rows;h++)for(p=h-C.rows/2,w=0,d=C.cols-1;d>=0;d--){if(f=d-C.cols/2+1,E=C.heights[h*C.cols+d],E>w)for(u=w+1;E>=u;u++)n=u-.5,g.addQuad({pos:[f,n,p],color:i,dir:"x"});w=E}for(d=0;d<C.cols;d++)for(f=d-C.cols/2,w=0,h=C.rows-1;h>=0;h--){if(p=h-C.rows/2+1,E=C.heights[h*C.cols+d],E>w)for(u=w+1;E>=u;u++)n=u-.5,g.addQuad({pos:[f,n,p],color:i,dir:"Z"});w=E}for(d=0;d<C.cols;d++)for(f=d-C.cols/2,w=0,h=0;h<C.rows;h++){if(p=h-C.rows/2,E=C.heights[h*C.cols+d],E>w)for(u=w+1;E>=u;u++)n=u-.5,g.addQuad({pos:[f,n,p],color:i,dir:"z"});w=E}r.add(g.toMesh()),this.setCamera(o.cameraX||6,o.cameraY||10,o.cameraZ||0,0,2,0),this._speed1=5e-4,this.start()});l.prototype=Object.create(a.prototype),l.prototype.constructor=l,l.prototype.onRender=function(o,r){this._grp.rotation.y=o*this._speed1},r.exports=l});
//# sourceMappingURL=step003.js.map