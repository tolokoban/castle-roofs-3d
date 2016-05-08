require("mesh-factory-005",function(e,t){function r(e){this._verticesMap={},this.geometry=new THREE.Geometry,this.material=e||o}function s(e,t,r){return e.toFixed(3)+","+t.toFixed(3)+","+r.toFixed(3)}var o=new THREE.MeshStandardMaterial({metalness:.1,roughness:.5,vertexColors:THREE.VertexColors}),a=new THREE.Vector2(1,1),d=new THREE.Vector2(0,1),i=new THREE.Vector2(0,0),h=new THREE.Vector2(1,0);new THREE.Color(255);r.prototype.toMesh=function(){return this.geometry.computeFaceNormals(),this.geometry.computeVertexNormals(),new THREE.Mesh(this.geometry,this.material)},r.prototype.addQuad=function(e){var t,r=e.pos[0],s=e.pos[1],o=e.pos[2];switch(e.dir){case"X":t=[this.addVertex(r-.5,s-.5,o+.5),this.addVertex(r-.5,s-.5,o-.5),this.addVertex(r-.5,s+.5,o-.5),this.addVertex(r-.5,s+.5,o+.5)];break;case"x":t=[this.addVertex(r-.5,s-.5,o-.5),this.addVertex(r-.5,s-.5,o+.5),this.addVertex(r-.5,s+.5,o+.5),this.addVertex(r-.5,s+.5,o-.5)];break;case"Z":t=[this.addVertex(r+.5,s-.5,o-.5),this.addVertex(r-.5,s-.5,o-.5),this.addVertex(r-.5,s+.5,o-.5),this.addVertex(r+.5,s+.5,o-.5)];break;case"z":t=[this.addVertex(r-.5,s-.5,o-.5),this.addVertex(r+.5,s-.5,o-.5),this.addVertex(r+.5,s+.5,o-.5),this.addVertex(r-.5,s+.5,o-.5)];break;default:t=[this.addVertex(r+.5,s,o+.5),this.addVertex(r-.5,s,o+.5),this.addVertex(r-.5,s,o-.5),this.addVertex(r+.5,s,o-.5)]}var x=new THREE.Face3(t[0],t[3],t[2]);x.vertexColors[0]=x.vertexColors[1]=x.vertexColors[2]=e.color;var n=new THREE.Face3(t[0],t[2],t[1]);n.vertexColors[0]=n.vertexColors[1]=n.vertexColors[2]=e.color,this.geometry.faceVertexUvs[0].push([a,h,i],[a,i,d]),this.geometry.faces.push(x,n)},r.prototype.addVertex=function(e,t,r){var o=s(e,t,r),a=this._verticesMap[o];return"undefined"==typeof a?(this.geometry.vertices.push(new THREE.Vector3(e,t,r)),a=this.geometry.vertices.length-1,this._verticesMap[o]=a,a):a},t.exports=r});
//# sourceMappingURL=mesh-factory-005.js.map