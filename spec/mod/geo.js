require("geo",function(e,t){"use strict";function r(e,t,r){var o=s(e,t,r),i=this._vertices[o];return"undefined"==typeof i?(this.vertices.push(new THREE.Vector3(e,t,r)),i=this.vertices.length-1,this._vertices[o]=i,i):i}function o(e,t){var r=i(e,t),o=this._uvs[r];return"undefined"==typeof o&&(o=new THREE.Vector2(e,t),this._uvs[r]=o),o}function s(e,t,r){return e.toFixed(3)+","+t.toFixed(3)+","+r.toFixed(3)}function i(e,t){return e.toFixed(4)+","+t.toFixed(4)}var n=function(){THREE.Geometry.call(this),this._vertices={},this._uvs={}};n.prototype=Object.create(THREE.Geometry.prototype),n.prototype.constructor=n,n.prototype.createMesh=function(e){return this.computeFaceNormals(),this.computeVertexNormals(),new THREE.Mesh(this,e)},n.prototype.addQuad=function(e){"undefined"==typeof e.uvs&&(e.uvs=[[1,0],[0,0],[0,1],[1,1]]);var t=[];e.uvs.forEach(function(e){t.push(o.call(this,e[0],e[1]))},this);var s=[];e.vertices.forEach(function(e){s.push(r.call(this,e[0],e[1],e[2]))},this);var i=new THREE.Face3(s[0],s[3],s[2]),n=new THREE.Face3(s[0],s[2],s[1]);e.color&&(i.vertexColors[0]=i.vertexColors[1]=i.vertexColors[2]=e.color,n.vertexColors[0]=n.vertexColors[1]=n.vertexColors[2]=e.color),"number"==typeof e.materialIndex&&(i.materialIndex=n.materialIndex=e.materialIndex),this.faceVertexUvs[0].push([t[0],t[3],t[2]],[t[0],t[2],t[1]]),this.faces.push(i,n)},n.prototype.addTri=function(e){"undefined"==typeof e.uvs&&(e.uvs=[[1,0],[0,1],[1,1]]);var t=[];e.uvs.forEach(function(e){t.push(o.call(this,e[0],e[1]))},this);var s=[];e.vertices.forEach(function(e){s.push(r.call(this,e[0],e[1],e[2]))},this);var i=new THREE.Face3(s[0],s[1],s[2]);e.color&&(i.vertexColors[0]=i.vertexColors[1]=i.vertexColors[2]=e.color),"number"==typeof e.materialIndex&&(i.materialIndex=e.materialIndex),this.faceVertexUvs[0].push([t[0],t[1],t[2]]),this.faces.push(i)},t.exports=n});
//# sourceMappingURL=geo.js.map