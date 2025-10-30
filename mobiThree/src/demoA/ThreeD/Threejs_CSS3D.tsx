import React, { ReactDOM, useEffect, useState } from 'react';
import devProjCSS from './devProject.module.css'

/**
 * demo of CSS3DRenderer from Three.js
 * it doesnt seem to do anything other than setting the css transform property
 * ie: transform: translate(-50%, -50%) 
 *                matrix3d(1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
 * I see no reason to use instead of setting css transform directly, as
 * done in CSS_perspective_transform.tsx
 * ...transform: "rotateZ(90deg) rotateY(33deg)",...
 */

import * as THREE from 'three';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
//import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';



// to get intellisense to work: npm install --save-dev @types/three


function Threejs_CSS3D_demo() {
    /* !!! useEffect() !!! is React's lifecycle event, like onLoad(), onRefresh() etc. */
    useEffect(() => { 
        // z3dText()
        CSS3Dtext()
    }); //, []); 
    return <div id='threeDemoA' 
            style={{ 
                //width:'60vw', height:'60vw', 
                width:'60vw', height:'60vw', background:'#333333', 
                border:'5px solid red'}}>this is DoTextTest!</div>
}

function CSS3Dtext() {
    console.log('init css3d')
    //const container = document.getElementById("threeDemoA") as HTMLDivElement;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
    camera.position.set( 88, 0, 155 );
    camera.rotateY(Math.PI/6)

    const CSS3Dscene = new THREE.Scene();
    // const theDiv = document.getElementById("threeDemoA")!
    // const CSS3DRenderer1 = new CSS3DRenderer({element:theDiv});
    
    const CSS3DRenderer1 = new CSS3DRenderer();
    CSS3DRenderer1.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(CSS3DRenderer1.domElement);

    const element = document.createElement("div");
    element.innerHTML = "CSS3D_HERE";
    element.style.color = "#00ff00"; element.style.fontSize = "22px";
    element.style.fontWeight='700'
    const CSS3DObject1 = new CSS3DObject(element);
    CSS3DObject1.position.set(0, 0, 0);
    CSS3Dscene.add(CSS3DObject1);

    CSS3DRenderer1.render(CSS3Dscene, camera);
}

export { Threejs_CSS3D_demo }

