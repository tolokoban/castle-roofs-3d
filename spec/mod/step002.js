require("step002",function(e,r){"use strict";function t(e,r,t){var o=[[.5+e,0,.5+r],[-.5+e,0,.5+r],[-.5+e,0,-.5+r],[.5+e,0,-.5+r],[.5+e,t,.5+r],[-.5+e,t,.5+r],[-.5+e,t,-.5+r],[.5+e,t,-.5+r]],s=[[4,7,5],[7,6,5],[7,0,3],[7,4,0],[4,1,0],[4,5,1],[5,2,1],[5,6,2],[6,3,2],[6,7,3]],a=new THREE.Geometry;return o.forEach(function(e){a.vertices.push(new THREE.Vector3(e[0],e[1],e[2]))}),s.forEach(function(e,r){var t=new THREE.Face3(e[0],e[1],e[2]),o=2>r?n:c;t.vertexColors[0]=t.vertexColors[1]=t.vertexColors[2]=o,a.faces.push(t)}),a.computeFaceNormals(),a.computeVertexNormals(),new THREE.Mesh(a,i)}var o=require("lights"),s=require("castles"),a=require("three.canvas"),n=new THREE.Color(65280),c=new THREE.Color(9457664),i=new THREE.MeshStandardMaterial({metalness:.1,roughness:.5,vertexColors:THREE.VertexColors}),h=function(e){a.call(this,e),o["default"](this.scene);var r=new THREE.Group;this.scene.add(r),this._grp=r;var n=parseInt(e.castle);isNaN(n)&&(n=0);var c=s.getCopyOfCastle(n);c.heights.forEach(function(e,o){if(!(1>e)){var s=o%c.cols,a=(o-s)/c.rows;r.add(t(s-c.cols/2,a-c.rows/2,e))}}),this.setCamera(e.cameraX||6,e.cameraY||10,e.cameraZ||0,0,2,0),this._speed1=5e-4,this.start()};h.prototype=Object.create(a.prototype),h.prototype.constructor=h,h.prototype.onRender=function(e,r){this._grp.rotation.y=e*this._speed1},r.exports=h});
//# sourceMappingURL=step002.js.map