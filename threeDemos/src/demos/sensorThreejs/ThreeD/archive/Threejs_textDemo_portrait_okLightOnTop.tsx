import React, { ReactDOM, useEffect, useState, useRef } from 'react';
import devProjCSS from './devProject.module.css'
/**
 * this one shows the THREE.RectAreaLight always above in every orientaiton
 */
import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';// import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
// to get intellisense to work: npm install --save-dev @types/three
var theFont, theMaterialTexture
var sceneA:THREE.Scene
var theThreejsRenderer:THREE.WebGLRenderer
var theThreejsCam:THREE.Camera

const cameraZ = 444

/** because dispSpec is a useState thing in caller, and this component
 *  has it as a param, it gets redrawn upon any change.
 *  WARNING: THREE.quaterion is w, x, y z unlike web sensor api which is x, y, z, w  
 *  new THREE.Quaternion() gives w:1, x:0, y:0, z:0
 */
function DoThreejs_textDemoA(props3) {
    /** !!! useEffect() !!! is React's lifecycle event, like onLoad(), onRefresh() etc. 
     *  It runs depending on the second arg:
     *  missing -> run once when page loads
     *  [props3.flavor] -> runs only when props3.flavor changes value
     *  [] -> run every time
    */
    useEffect(() => { 
        if (sceneA) {
            // const quat3JS = new THREE.Quaternion(props3.quat[0], props3.quat[1], props3.quat[2], props3.quat[3])
            doDraw(theFont, props3.dispSpec, props3.quat)
            // z3dText(theCanvas.current, '123')
            //doDraw(theFont, 'bbbb'+props3.txt)
        }
    }, [props3.dispSpec]); 
    useEffect(() => { 
        if (!theCanvas.current) return;
        // switched to useRef for canvas instead of querySelector(). Its a pain..
        // without using ref var theCanvas:HTMLCanvasElement = document.querySelector('#threeDemoA') as HTMLCanvasElement// todo replace with hook thing
        ////sizeCanvasToParent_shrinkInsideBorder_rotate90_setCamAspectRatio();
        sizeCanvasToParent_shrinkInsideBorder_setCamAspectRatio()
        setupFontNScene(theCanvas.current, props3.dispSpec, props3.quat)
        canvWidth.current = Number.parseInt(theCanvas.current!.style.width)
        canvHeight.current = Number.parseInt(theCanvas.current!.style.height)
    }, []); 
    var canvHeight = useRef(), canvWidth = useRef();
    const orlCt = useRef(0)
    const bwidth = '11px'
    const theCanvas = useRef<HTMLCanvasElement>(null)
    /**
     * the canvas object is where THREE.JS does its thing. 
     * Setting the css "transform" of the canvas to 90 deg rotate resets the entire
     * THREE.JS world on its side. does this so phone length is width, y axis this way too.
     */
    
    return <canvas ref={theCanvas}
        style={{border:bwidth + ' solid red'}}>this is DoThreejs_textDemoA!</canvas>


function toRads(deg) { return  deg * (Math.PI / 180)}

function doDraw(theFont, dispSpec, quat) {
        while (sceneA.children.length > 0) 
            sceneA.remove(sceneA.children[0]);

        // const THREE_material = new THREE.MeshPhongMaterial ({ 
        //          color: 0xffffff, specular: 0x00ff00, shininess: .001, 
        //          reflectivity: .8, transparent: false })     
        //  const THREE_material = new THREE.MeshStandardMaterial()
        const THREE_material = new THREE.MeshStandardMaterial({
            color: 0xffffff, roughness: .5, metalness: .8, map: theMaterialTexture 
        });
        const textGeometry = new TextGeometry(' '+ dispSpec.text, // sensorPitch, 
            {   font: theFont, size: 180, 
                depth: 88, // how thick each 3d character is
                curveSegments: 22, bevelEnabled: true, bevelThickness: 9, bevelSize: 9    
            }
        )
        const textMesh = new THREE.Mesh(textGeometry, THREE_material);
        textMesh.position.set(-338, 0, 0)
        // tilt the mesh--no longer done tilt cam instead .... textMesh.rotation.set(0, -Math.PI/8, 0)
        sceneA.add(textMesh)
        //earthLites(theThreejsScene, dispSpec.elevation, 222, -333, 0, 300) 

        const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(88), THREE_material);
        const ballX = 0 // 222
        const ballY = -55
        ballMesh.position.set(ballX, ballY, 0)
        sceneA.add(ballMesh)
        // sceneA.add(orbitPointLight(dispSpec.elevation, 0xFCE570, 5, 2222, ballX, 0, 1110))
        //theThreejsScene.add(new THREE.DirectionalLightHelper(movingLightA))
        var foo
        sceneA.add(foo = orbitRectLight(0xffff00, 222, 111, ballX, ballY, 33, quat))
        // sceneA.add(foo = orbitRectLight_euler(
        //     dispSpec.elevation, 0xffff00, 5, 333, ballX, ballY, 33))
        sceneA.add(new RectAreaLightHelper(foo))
        // CAMERA!, tilted to get 3d effect
        theThreejsCam = DoCamWithAngle(canvWidth.current, canvHeight.current, 1)
 
        // LIGHTS!
        sceneA.add(new THREE.AmbientLight(0xffffff, 1));
        sceneA.add(new THREE.HemisphereLight(0xFCE570, 0x9B7653, 10));
        sceneA.background = new THREE.Color( 0x000022 )
        // fixes pixelly appearance
        theThreejsRenderer.setPixelRatio(window.devicePixelRatio);

        // ACTION!
        theThreejsRenderer.render(sceneA, theThreejsCam);
    }

    /** orbit light according to quaternion. jsdoc made by copilot!
     * @param {string} color - The color of the light (e.g., hex or CSS color name).
     * @param {number} intensity - The brightness or intensity of the light.
     * @param {number} orbitAlt - The altitude of the orbit path.
     * @param {number} centerX - X-coordinate of the orbit center.
     * @param {number} centerY - Y-coordinate of the orbit center.
     * @param {number} centerZ - Z-coordinate of the orbit center.
     * @param {Float32Array} quat - data from Web Api AbsoluteOrientationSensor 
     **/
    function orbitRectLight(color, intensity, orbitAlt, centerX, centerY, centerZ, quat:Float32Array[3]) {
        if (Math.floor(orlCt.current += 1 / 5) % 2 === 0) color=0x00ffff // flashes!
        const movingLightA = new THREE.RectAreaLight(color, intensity,  99, 99 );
        /* start with light on y axis overhead. Then use quaternion to rotate the vector.
           Quaternions can only do orientation, not absolute location! */
        const vecLightPosition = new THREE.Vector3(0, 0, orbitAlt); // initial position
        
        // var quatTHREE:THREE.Quaternion = new THREE.Quaternion(quat[1], quat[2], quat[3], quat[0])
        var quatTHREE:THREE.Quaternion = new THREE.Quaternion(quat[0], quat[1], quat[2], quat[3])

        // converts to elevation only:
        // var quatTHREE:THREE.Quaternion = new THREE.Quaternion(quat[2], quat[1], 0, 0) 
        quatTHREE.normalize()
        // const zRotateQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI); // deg z axis rotate
        // quatTHREE.multiply(zRotateQ); 
        // const yRotateQ = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2); // 90 deg z axis rotate
        // quatTHREE.multiply(yRotateQ); 
        //quatTHREE.slerp(new THREE.Quaternion(1, 0, 0), 1)
        
        vecLightPosition.applyQuaternion(quatTHREE.invert()); // rotate from 0, 0 based on sensor
        // bump the newly aimed vector to its actual position
        vecLightPosition.x += centerX; vecLightPosition.y += centerY; vecLightPosition.z += centerZ
        movingLightA.position.copy(vecLightPosition); // apply vecgtor to the light
        /* now move the light to proper "center" location */
        //movingLightA.position.set(centerX - orbitAlt, centerY, centerZ)
        movingLightA.lookAt(centerX, centerY, centerZ)
        return movingLightA
    }

            // quat = new THREE.Quaternion() // override for  debug
        // const a = new THREE.Euler( 0, 0, .7, 'XYZ' );
        // quat.setFromEuler(a)

    /** first try before using quaternion. This only goes by elevation. */
    function orbitRectLight_euler(elevation, color, intensity, orbitAlt, centerX, centerY, centerZ) {
        if (Math.floor(orlCt.current += 1 / 5) % 2 === 0) color=0x00ffff // flashes!
        const movingLightA = new THREE.RectAreaLight(color, 999,  99, 99 );
        // using euler move light on xy plane only.
        movingLightA.position.set(
            centerX - orbitAlt * Math.sin(toRads(elevation)), 
            centerY + orbitAlt * Math.cos(toRads(elevation)), centerZ)
        movingLightA.lookAt(centerX, centerY, 0)
        return movingLightA
    }

    /** lights fixed to earth frame of reference. Their position in the scene
     *  changes when the scene (ie the phone) tilts.
     *  0 elevation: in degrees  
     *  - orbitAlt: lenght of orbit as phone tilts
     *  - centerX/Y/Z center of orbit  */
    function orbitPointLight(elevation, color, intensity, orbitAlt, centerX, centerY, centerZ) {
        //const movingLightA = new THREE.DirectionalLight(0xFCE570, 22);
        // WARNING: default decay of 2 must be overridden or not visible!
        const movingLightA = new THREE.PointLight(color, intensity, 0, 0);
        // using euler
        movingLightA.position.set(
            // ofstX, orbitAlt, ofstZ)
            centerX - orbitAlt * Math.sin(toRads(elevation)), 
            centerY + orbitAlt * Math.cos(toRads(elevation)), centerZ)
        return movingLightA
    }

    function DoCamWithAngle(width, height, horizStretch) {
        var cam1 = new THREE.OrthographicCamera(
            -width*horizStretch, width*horizStretch, 
            height, -height, 0.1, 2000); // top, bottom, near, far
        cam1.rotation.set(0, Math.PI/22, 0); 
        cam1.position.set( width!/3, -height!/5, cameraZ );
        return cam1
    }

    function sizeCanvasToParent_shrinkInsideBorder_rotate90_setCamAspectRatio() {
        var bwidth:number = Number.parseInt(theCanvas.current!.style.borderWidth)
        theCanvas.current!.style.width = 
            // to get rid of TS warnings, use the non-null assertion operator (!)
            (theCanvas.current!.parentElement!.clientHeight - bwidth*2) + 'px'
        theCanvas.current!.style.height = 
            (theCanvas.current!.parentElement!.clientWidth - bwidth*2) + 'px'
        var xform = 'translate(-50%, -50%) ' + 
                'rotateZ(90deg) ' 
                + 'translate(50%, -50%) ' 
        theCanvas.current!.style.transform = xform;
    }

    function sizeCanvasToParent_shrinkInsideBorder_setCamAspectRatio() {
        var bwidth:number = Number.parseInt(theCanvas.current!.style.borderWidth)
        theCanvas.current!.style.width = 
            // to get rid of TS warnings, use the non-null assertion operator (!)
            (theCanvas.current!.parentElement!.clientWidth - bwidth*2) + 'px'
        theCanvas.current!.style.height = 
            (theCanvas.current!.parentElement!.clientHeight - bwidth*2) + 'px'
    }

    function setupFontNScene(canvasA:HTMLCanvasElement, dispSpec:Object, quat:THREE.Quaternion) {
        console.log('init')
        sceneA = new THREE.Scene();
        theThreejsRenderer = new THREE.WebGLRenderer({canvas:canvasA, antialias: true});
        //renderer.setSize(cwidth, cheight);
        //renderer.setPixelRatio(5) //cheight/cwidth) //window.devicePixelRatio);
        const fontLoader = new FontLoader();
        //fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', 
        /* this is asynchronous, so it wont FREEZE up the UI thread while page loads */
        fontLoader.load( '/fonts/helvetiker_regular.typeface.json',
            (newlyLoadedFont) => { 
                theFont = newlyLoadedFont;  
                new THREE.TextureLoader().load('/jpeg/circle.svg',
                function ( texture:THREE.Texture ) {
                    theMaterialTexture = texture;
                    theMaterialTexture.wrapS = THREE.RepeatWrapping;
                    theMaterialTexture.wrapT = THREE.RepeatWrapping;
                    theMaterialTexture.repeat.set(22, 22);
                    doDraw(theFont, dispSpec, quat) 
                }, undefined, function ( err ) { console.error( 'error loading texture.' + err );	});
            },
            ( progress ) => { /* console.log( (progress.loaded / progress.total * 100) + '% zzloaded' ); */ },
            ( err ) => { console.log( 'An error happened ' + err ); }       )            
    }

}

export { DoThreejs_textDemoA }

/*
$('#x').draggable();
$('#c').droppable({
*/
