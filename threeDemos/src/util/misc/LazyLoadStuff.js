import React, { ReactDOM, useEffect, useState } from 'react';
import './Miew.css'
import devProjCSS from './devProject.module.css'
import { GlowingInfo } from './SvgImageHelper.js';

/* WARNING: OMITTING BRACKETS GIVES THIS MISLEADING ERROR:
   "Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function..." */
import { Popup_molinfo } from './Popup_molinfo.tsx'
// dont import three here; import only when needed.

/** test of lazy load aka dynamic loading of module, and code splitting.
 *  To verify code splitting works, use browser debug mode, network:
 *    - choose disable cache
 *    - refresh on a non-3d page; it shows the network downloads
 *    - then choose this demo; you should see the separate bundle for three.js
 */
function Three3D_demo_using_lazyload() {
    import('three').then(threeImportObj => {
        // Use the dynamically imported module, but wait asynchronously, maybe for 
        // a while for it to load because it may be big. 
        // The "then" runs when loading finished, whenever that is.
        console.log('threejs loaded')
        doThreeDemo(threeImportObj, document.getElementById('threeDemo'))
    }).catch(err => {
        console.log('Error loading moduleA:', err);
    });
    return(<>this is Three3D_demo_using_lazyload<div id='threeDemo'></div></>)
}

/** put demo inside targetDiv */
function doThreeDemo(THREE, targetDiv) {
    // Basic Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    targetDiv.appendChild(renderer.domElement);
  
    // Create a cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  
    camera.position.z = 5;
  
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
  }
  
  function MIEW_3D_moleculeViewTest(props) {
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    import('miew').then(Miew => {
        // Use the dynamically imported module, but wait asynchronously, maybe for 
        // a while for it to load because it may be big. 
        // The "then" runs when loading finished, whenever that is.
        // looks like MIEW puts stuff in class="miew-container"
        var viewer = new Miew.default({ load: props.mwmLeaf.mwmkey });
        if (viewer.init()) {
            viewer.run();
        }
        setTimeout(() => {
            console.log('rotate test'); viewer.rotate(45, 0, 0); }, 3333);
        setTimeout(() => {
            console.log('rotate test'); viewer.rotate(0, 45, 0); }, 4444);
        
        //  ref https://miew.opensource.epam.com/examples/api.js
    }).catch(err => {
        console.log('Error loading moduleA:', err);
    });
    // MIEW puts its stuff in class="miew-container"
    return(<><div className='miew-container' >
        <div className={devProjCSS.divInMiddle}> 
            npmjs package "MIEW" and pdb file from<br/>
            <div style={{fontSize:'0.5em'}}>
                https://files.rcsb.org/download/*.pdb</div>
            is loading (1.4 MB)...</div></div>
          <Popup_molinfo 
            LEAF={ props.mwmLeaf.LEAF }
            mwmkey={props.mwmLeaf.mwmkey}
            isVisible={ isInfoPopupOpen } 
            txtdesc={ props.mwmLeaf.txtdesc }
            callBackCloseMe={(isOpen)=> { setIsInfoPopupOpen(isOpen) } } />    
        
            <div id='attribution' style={{ position:'absolute', bottom:'0em', textSize:'0.7em',
            right:'15%', zIndex:'100', color:'#218a87', fontWeight:'500'}}>Credit: MIEW visualizer</div>
            <div style={{ position:'absolute', bottom:'0em'}}
            onClick={ () => { setIsInfoPopupOpen(true) }}>
            <GlowingInfo fontSize='2.0em'/>
            </div>   
        </> 
    )
  }
  
  function zzzMIEW_3D_moleculeViewTest(props) {
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    import('miew').then(Miew => {
        // Use the dynamically imported module, but wait asynchronously, maybe for 
        // a while for it to load because it may be big. 
        // The "then" runs when loading finished, whenever that is.
        // looks like MIEW puts stuff in class="miew-container"
        var viewer = new Miew.default({ load: props.mwmLeaf.mwmkey });
        if (viewer.init()) {
            viewer.run();
        }
        setTimeout(() => {
            console.log('rotate test'); viewer.rotate(45, 0, 0); }, 3333);
        setTimeout(() => {
            console.log('rotate test'); viewer.rotate(0, 45, 0); }, 4444);
        
        //  ref https://miew.opensource.epam.com/examples/api.js
    }).catch(err => {
        console.log('Error loading moduleA:', err);
    });
    // MIEW puts its stuff in class="miew-container"
    return(<><div className='miew-container' >
        <div className={devProjCSS.divInMiddle}> 
            npmjs package "MIEW" and pdb file from<br/>
            <div style={{fontSize:'0.5em'}}>
                https://files.rcsb.org/download/*.pdb</div>
            is loading (1.4 MB)...</div></div>
          <Popup_molinfo 
            LEAF={ props.mwmLeaf.LEAF }
            mwmkey={props.mwmLeaf.mwmkey}
            isVisible={ isInfoPopupOpen } 
            txtdesc={ props.mwmLeaf.txtdesc }
            callBackCloseMe={(isOpen)=> { setIsInfoPopupOpen(isOpen) } } />    
        
            <div id='attribution' style={{ position:'absolute', bottom:'0em', textSize:'0.7em',
            right:'15%', zIndex:'100', color:'#218a87', fontWeight:'500'}}>Credit: MIEW visualizer</div>
            <div style={{ position:'absolute', bottom:'0em'}}
            onClick={ () => { setIsInfoPopupOpen(true) }}>
            <GlowingInfo fontSize='2.0em'/>
            </div>   
        </> 
    )
  }


export { Three3D_demo_using_lazyload, MIEW_3D_moleculeViewTest }
/*
SAVE
from Miew.js source:
 * Rotate object by Euler angles
 * @param {number} x - rotation angle around X axis in radians
 * @param {number} y - rotation angle around Y axis in radians
 * @param {number} z - rotation angle around Z axis in radians
 *    /
Miew.prototype.rotate = function (x, y, z) {
    this._objectControls.rotate(new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z, 'XYZ')));
    this.dispatchEvent({ type: 'transform' });
    this._needRender = true;
  };
*/  
// SAVE to combine:  <div className={'miew-container ' + devProjCSS.divInMiddle }>
    


