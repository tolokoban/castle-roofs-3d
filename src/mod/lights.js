/**********************************************************************
 require( 'lights' )
 -----------------------------------------------------------------------
 predefined lights.
 **********************************************************************/



exports.default = function( scene ) {
    // Adding lights, because without light, nothing will be displayed.
    var light = new THREE.HemisphereLight( 0xcceeff, 0x999977, 0.1 ); // soft yellow light
    var light1 = new THREE.DirectionalLight( 0x777777, 2.5 );
    var light2 = new THREE.DirectionalLight( 0x777799, 1 );
    var light3 = new THREE.DirectionalLight( 0x887799, 1 );
    light1.position.set(230,2,150);
    light2.position.set(-200,1,100);
    light3.position.set(-2,100,1);

    scene.add( light1 );
    scene.add( light2 );
    scene.add( light3 );
    scene.add( light );

    return scene;
};
