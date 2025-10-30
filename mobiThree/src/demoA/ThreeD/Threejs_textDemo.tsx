import React, { ReactDOM, useEffect, useState, useRef } from 'react';
//import devProjCSS from './devProject.module.css'

import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { QuatAreFun } from './quaternionsAreFun';
import { getSunHorizCords } from '../galactic/altAz'
import type { DisplaySpec } from '../Sensors.tsx';
import { ThreeHelper as ThrHp } from './ThreeHelper'
// to get intellisense to work: npm install --save-dev @types/three

// constants to set configuration when testing
enum FLIP { LANDSCAPE, PORTRAIT }; var FLIP_MODE:FLIP = FLIP.LANDSCAPE
const cameraZ = 444
// SAVE below vars are in module scope—not the component's render cycle cuz they're outside component.
// that's why useRef not needed to maintain their state.
var materialA; var materialAA; var materialB; var phongMatl;

function DoThreejs_textDemoA(props3) {
    /** !!! useEffect() !!! is React's lifecycle event, like onLoad(). It runs depending on the second arg to useEffect(): 
     *  **** missing: run After every render; 
     *  **** [props3.flavor, props3.color]: runs only when props3.flavor or color changes value;  
     *  **** []: empty array, run only once, after initial render (mount)   */
    useEffect(() => { // run this whenever "[props3.dispSpec]" changes
        if (!sceneA.current) return; // gets run when page loaded by the other useEffect here
        console.log('bbbaaa' + ct.current++)
        // const res = getSunHorizCords();
        //props3.dispSpec.text =+ 'asdf'
        doDraw(sceneA.current, loadedFontsTextures.current!.fontA, props3.dispSpec, 
                new THREE.Quaternion(...props3.deviceOrienQuatArray))
    }, [props3.dispSpec, props3.deviceOrienQuatArray]); 
    // }, [props3.dispSpec, doDraw, props3.deviceOrienQuatArray]); 
    useEffect(() => {  // run only on load
        if (!webGLRenderCanvasA.current) return; // DONT use querySelector() use useRef()...
        console.log('aaabb' + ct.current++)
        sizeCanvas_maybeRotate(FLIP_MODE);
        ThrHp.fetchFontNtextures().then((loadedData) => {
            console.log('font and texture loaded')
            theThreejsRenderer.current = new THREE.WebGLRenderer({ canvas:webGLRenderCanvasA.current!, antialias: true });
            // fixes pixelly appearance
            theThreejsRenderer.current.setPixelRatio(window.devicePixelRatio);
            loadedFontsTextures.current = loadedData;
            sceneA.current = new THREE.Scene()
            // Adjust material properties and see result at: https://threejs.org/docs/#api/en/materials/MeshStandardMaterial
            materialA = new THREE.MeshStandardMaterial({color: 0xffff00, roughness: .2, metalness: .2, map: loadedFontsTextures.current.textureA });
            materialAA = new THREE.MeshStandardMaterial({emissive:0x000000,color: 0xffff00, roughness: .4, metalness: .6, map: loadedFontsTextures.current.textureA });
            materialB = materialA.clone(); materialB.color.set(0x00ff00)
            // for phong to work, need THREE.PointLight, THREE.DirectionalLight, or THREE.SpotLight
            phongMatl = new THREE.MeshPhongMaterial ({ color: 0xffffff, specular: 0xffffff, shininess: 22, reflectivity: .6, transparent: false, map: loadedFontsTextures.current.textureA })     
            doDraw(sceneA.current, loadedFontsTextures.current.fontA, props3.dispSpec, 
                new THREE.Quaternion(...props3.deviceOrienQuatArray)) 
        })
        // const res = getSunHorizCords();
    }, []);  // "empty array, run only once, after initial render (mount)"
    var ct = useRef<number>(0)
    var theThreejsRenderer = useRef<THREE.WebGLRenderer>()
    var sceneA = useRef<THREE.Scene>()
    var loadedFontsTextures = useRef<{fontA:any; textureA:any; }>()
    var cheight = useRef<number>(), cWidth = useRef<number>(); 
    const borderWidth:number = 11
    const webGLRenderCanvasA = useRef<HTMLCanvasElement>(null)
    // here is what this React component returns...
    return <canvas ref={webGLRenderCanvasA}
        style={{border:borderWidth + 'px solid red'}}>this is DoThreejs_textDemoA!</canvas>

function doDraw(theScene, theFont, dispSpec:DisplaySpec, 
                lightSrcQuat:THREE.Quaternion) {
    while (theScene.children.length > 0) theScene.remove(theScene.children[0]); // cleanup  previous
    //doDrawSimple(theScene, FLIP_MODE)
    doDrawNotSimple(theScene, theFont, props3.dispSpec, new THREE.Quaternion(...props3.deviceOrienQuatArray), FLIP_MODE)
}

function doDrawSimple(theScene:THREE.Scene, flip:FLIP) {
        theScene.add(ThrHp.drawBall(materialA, {x:0, y:0, z:0 }, 66))
        theScene.add(ThrHp.drawBall(materialAA,{x:111, y:0, z:0 }, 33))
        theScene.add(ThrHp.drawCrossXY(999, 2, 0x00ffff))
        
        const theThreejsCam = DoCamFlat(cWidth.current, cheight.current, cameraZ)
 
        // LIGHTS!
        theScene.add(new THREE.AmbientLight(0xffffff, 1));
        theScene.add(new THREE.HemisphereLight(0xFCE570, 0x9B7653, 10));
        theScene.background = new THREE.Color( 0x000022 )

        // ACTION!
        theThreejsRenderer.current!.render(theScene, theThreejsCam);
    }

    /** 
     * @param theFont - A loaded Three.js font used to create the 3D text geometry.
     * @param dispSpec 
     * @param lightSrcQuat - Light source direction, typically updated to inverse device orientation  
     *        to simulate stationary light shining on moving device.  
     *        Needs to be already z-axis rotated 90 to conform to landscape
     * */
    function doDrawNotSimple(theScene:THREE.Scene, theFont, dispSpec:DisplaySpec, 
            lightSrcQuat:THREE.Quaternion, flip:FLIP) {
        // To align sensor space with landscape, rotate around the Z-axis by -90 degrees (Math.PI / 2 radians)
        if (flip == FLIP.LANDSCAPE) QuatAreFun.rotateOnZaxisBy90(lightSrcQuat)
        // to get earth-fixed location, invert device orientation
        var lightSrcInvertFromSensor = lightSrcQuat.clone().invert() 
        const textGeometry = new TextGeometry(' '+ dispSpec.text, // sensorPitch, 
            {   font: theFont, size: 180, 
                depth: 88, // how thick each 3d character is
                curveSegments: 22, bevelEnabled: true, bevelThickness: 9, bevelSize: 9    
            }
        )
        
        const textMesh = new THREE.Mesh(textGeometry, materialA);
        textMesh.position.set(-338, 0, 0)
        theScene.add(textMesh)

        const ballX = 0; const ballY = -55
        // inline directly into a function call:
        theScene.add(ThrHp.drawBall(materialA, {x:ballX - 188, y:ballY, z:0 }, 77))
        theScene.add(ThrHp.drawBall(materialAA, {x:ballX, y:ballY, z:0 }, 88))
        theScene.add(ThrHp.drawBall(phongMatl, {x:ballX + 188, y:ballY, z:0 }, 77))
        

        const cylinderGrp:THREE.Group = ThrHp.cylinderPlaneDemo(cheight.current!|0, Math.PI/4, materialB)
        cylinderGrp.position.copy({x:cWidth.current!/6, y:0, z:0}); theScene.add(cylinderGrp)

        //theScene.add(ThrHp.squarePlaneXY(new THREE.MeshStandardMaterial({color: 0x333333, roughness: .5, metalness: .8 }), 2222))
        
        theScene.add(ThrHp.drawCrossXY(999, 2, 0x00ffff))
        //theThreejsScene.add(new THREE.DirectionalLightHelper(movingLightA))
        var liteA, liteB, ptlt
        var color = 0x00ffff // (Math.floor(orlCt.current += 1 / 5) % 2 === 0) ? 0x00ffff : 0xff0000  // flashes!
        
        // SUNSHINE!
        // theScene.add(liteA 
        //     = ThrHp.orbitLight(new THREE.RectAreaLight(0x00ff00, 222, 99, 99 ), 
        //     111, { x:ballX, y:ballY, z:33 }, lightSrcInvertFromSensor))
        // theScene.add(new RectAreaLightHelper(liteA))

        ptlt = new THREE.PointLight(0xffff00, 4, 0, 0)
        theScene.add(ThrHp.orbitLight(ptlt, 333, { x:ballX, y:ballY, z:33 }, lightSrcInvertFromSensor))
        theScene.add(new THREE.PointLightHelper(ptlt))
        theScene.add(ptlt)

        // CAMERA!, tilted to get 3d effect
        //theThreejsCam = DoCamWithAngle2(canvWidth.current, canvHeight.current)
        
        // // right-handed coordinate system Three.js uses rotates LEFT
        // var quatA = new THREE.Quaternion()
        // quatA.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI/6); 
        // // SAVE move scene from gravity groovy!   quatA = lightSrcInvertFromSensor
        // theThreejsCam = ThrHp.DoCamOrbit(
        //     quatA, cameraZ, canvWidth.current, canvHeight.current)
        const theThreejsCam = DoCamFlat(cWidth.current, cheight.current, cameraZ)

        // LIGHTS!
        theScene.add(new THREE.AmbientLight(0xffffff, .2)); // high ambient lights up phong backside also
        //theScene.add(new THREE.HemisphereLight(0xFCE570, 0x9B7653, 1));
        theScene.background = new THREE.Color( 0x000022 )
        // ACTION!
        theThreejsRenderer.current!.render(theScene, theThreejsCam);
    }

    
    function DoCamWithAngle(width, height, horizStretch) {
        var cam1 = new THREE.OrthographicCamera(
            -width*horizStretch, width*horizStretch, 
            height, -height, 0.1, 2000); // top, bottom, near, far
        cam1.rotation.set(0, Math.PI/22, 0); 
        cam1.position.set( width!/3, -height!/5, cameraZ );
        return cam1
    }

    function DoCamWithAngle2(width, height) {
        var zoom = 0.3
        var cam1 = new THREE.OrthographicCamera(
            -width * zoom, width * zoom, height * zoom, -height * zoom, 0.1, 2000); // top, bottom, near, far
        cam1.rotation.set(-Math.PI/4, 0, 0); 
        cam1.position.set( width * .1, height * 3, height * 2.5 );
        //cam1.position.set( 0, 444, 444 );
        return cam1
    }

    function DoCamFlat(width, height, distance) {
        var cam1 = new THREE.OrthographicCamera(-width, width, 
            height, -height, 0.1, 2000); // top, bottom, near, far
        //cam1.position.set(width/2, height/2, distance );
        cam1.position.set(0, 0, distance );
        return cam1
    }

    /** 
     * Sizes canvas to be used for THREE 3D rendering, based on parent dims.  
     * - if (flip == FLIP.LANDSCAPE) uses CSS to 90 degree rotate the canvas to  
     * landscape format and sets width, height useRef() accordingly.  
     * - Note: 90° Transforms NOT needed for THREE.js to accommodate landscape format ie:  
     * the x axis becomes phone length and y is width.     
     * - Note: 90° Transforms ARE needed for data from orientation sensors to accommodate  
     * landscape format bc they are fixed to the phone frame.   
     * @param {FLIP} flip - enum specify portrait or landscape
     */
    
    function sizeCanvas_maybeRotate(flip:FLIP) {
        if (flip == FLIP.LANDSCAPE) {
            // swap width/height in css
            webGLRenderCanvasA.current!.style.height = 
                (webGLRenderCanvasA.current!.parentElement!.clientWidth - borderWidth*2) + 'px'
            webGLRenderCanvasA.current!.style.width = 
                (webGLRenderCanvasA.current!.parentElement!.clientHeight - borderWidth*2) + 'px'
            // do the move-rotate-move thing because axis of rotation is corner of screen
            // in DOM/CSS, the origin is the lower left corner? of screen. So to rotate around
            // the center, first translate center to corner. Then rotate and reposition in center.
            var xform = 'translate(-50%, -50%) ' + // move corner to origin
                    'rotateZ(90deg) ' // rotate around origin
                    + 'translate(50%, -50%) ' // move back into place
            webGLRenderCanvasA.current!.style.transform = xform;
        } else if (flip == FLIP.PORTRAIT) {
            // leave width/height to follow parent
            webGLRenderCanvasA.current!.style.height = 
                (webGLRenderCanvasA.current!.parentElement!.clientHeight - borderWidth*2) + 'px'
            webGLRenderCanvasA.current!.style.width = 
                (webGLRenderCanvasA.current!.parentElement!.clientWidth - borderWidth*2) + 'px'
        } else { console.log('flip not match'); throw Error }
        cWidth.current = Number.parseInt(webGLRenderCanvasA.current!.style.width)
        cheight.current = Number.parseInt(webGLRenderCanvasA.current!.style.height)
    }


}

export { DoThreejs_textDemoA }

// to get rid of TS warnings, use the non-null assertion operator (!)
/*
// this works but has discontinuities. Using quaterion instead of euler -> sceneA.add(foo = orbitRectLight_euler(dispSpec.elevation, 0xffff00, 5, 333, ballX, ballY, 33))
        
     first try before using quaternion. This only goes by elevation. 
    function orbitRectLight_euler(elevation, color, intensity, orbitAlt, centerX, centerY, centerZ) {
        if (Math.floor(orlCt.current += 1 / 5) % 2 === 0) color=0x00ffff // flashes!
        const movingLightA = new THREE.RectAreaLight(color, 999,  99, 99 );
        // using euler move light on xy plane only.
        movingLightA.position.set(
            centerX - orbitAlt * Math.sin(toRads(elevation)), 
            centerY + orbitAlt * Math.cos(toRads(elevation)), centerZ)
        movingLightA.lookAt(centerX, centerY, 0)
        return movingLightA
        // const a = new THREE.Euler( 0, 0, .7, 'XYZ' );
        // quat.setFromEuler(a)
    }


$('#x').draggable();
$('#c').droppable({

const quatParamFromWebApiSensor:number[] = [ props3.quat[0], props3.quat[1], props3.quat[2], props3.quat[3] ]
            
*/
