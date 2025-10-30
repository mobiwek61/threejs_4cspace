import * as THREE from 'three';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
// import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';// import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';


export interface XYZ {  x: number;   y: number;   z: number }

export class ThreeHelper {

    
    static DoCamOrbit(lookFrom:THREE.Quaternion, orbitAlt:number, width, height) {
        const vectorA = new THREE.Vector3(0, 0, orbitAlt); 
        //quatTHREE.slerp(new THREE.Quaternion(1, 0, 0), 1)  for slowly moving to final location?
        // quaternion rotates the vector, including its distance from origin. 
        vectorA.applyQuaternion(lookFrom); 
        // translate newly aimed vector to its offset x, y, z position
        // vectorA.x += Xofst; vectorA.y += Yofst; vectorA.z += Zofst
        var cam1 = new THREE.OrthographicCamera(-width, width, 
                    height, -height, 0.1, 2000); // top, bottom, near, far
        cam1.position.copy(vectorA)
        cam1.lookAt(0,0,0)
        return cam1
    }
    
    /** orbit light according to quaternion. jsdoc made by copilot!
     * @param lightA Light. @param orbitAlt Altitude. @param pos XYZ center. @param lightSourceQuat Orientation. 
     * data from Web Api AbsoluteOrientationSensor   
     * which has been transformed to landscape space if necessary. Typically inverted also.  
     **/
    static orbitLight(lightA:THREE.Light, orbitAlt, pos:XYZ, 
           lightSourceQuat:THREE.Quaternion) {
        // start with light on z axis overhead, at orbitAlt units from origin. 
        // in THREE.js, Mesh objects by default point along z (straight up) 
        const vectorA = new THREE.Vector3(0, 0, orbitAlt); 
        //quatTHREE.slerp(new THREE.Quaternion(1, 0, 0), 1)  for slowly moving to final location?
        // quaternion rotates the vector, including its distance from origin. 
        vectorA.applyQuaternion(lightSourceQuat); 
        // translate newly aimed vector to its offset x, y, z position
        vectorA.add(new THREE.Vector3(pos.x, pos.y, pos.z))
        //vectorA.x += Xofst; vectorA.y += Yofst; vectorA.z += Zofst
        lightA.position.copy(vectorA); // apply vecgtor to the light
        lightA.lookAt(pos.x, pos.y, pos.z) // "aim" the light direction
        return lightA
    }

    /** makes square plane edge edgeLen long, on xy axis */
    static squarePlaneXY(matl:THREE.Material, edgeLen:number) {
        const meshA = new THREE.Mesh( new THREE.PlaneGeometry( edgeLen, edgeLen ), matl );
        return meshA
    }
    
    static cylinderPlaneDemo(cylLength:number, angleRads:number, materialB:THREE.Material):THREE.Group {
        var group = new THREE.Group()
        var quatA = new THREE.Quaternion() // now rotate around z axis:
        // cylinder initially pointing up y axis
        // rotate about z axix; right-handed coordinate system Three.js uses rotates LEFT
        quatA.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angleRads); 
        const length = cylLength
        const radius = length/10
        group.add(ThreeHelper.drawCylinderQ(materialB, radius, length, 
            quatA, true, {x:0, y:110, z:0})) // fun using lightSrcQuat also
        group.add(ThreeHelper.drawCylinderQ(materialB, radius, length, 
            quatA, false, { x:111, y:110, z:-radius * .88 } )) // fun using lightSrcQuat also
        return group
    }

    
    // to copilot: "do docs terse on single line"
    /** Draws cylinder. 
     */
    static drawCylinderQ(matl:THREE.Material, radius, length,
            quat:THREE.Quaternion, doPlane:boolean, pos:XYZ,  )
            :THREE.Group {
        const group = new THREE.Group();
        const meshA = new THREE.Mesh(
            new THREE.CylinderGeometry(radius, radius, length), matl);
        // SAVE: cylinder is centered on xy axis (passes thru cylinder center) 
        // pointing up positive y. Verified by experiment.  
        meshA.quaternion.copy(quat); // same result->  meshA.quaternion.multiplyQuaternions(meshA.quaternion, quat);
        // mesh.lookAt(targetVector) // mesh.rotation
        // In Three.js, mesh.position is location in 3D space
        meshA.position.copy(new THREE.Vector3(pos.x, pos.y, pos.z))
        group.add(meshA)
        return group
    }

    static drawBall(matl:THREE.Material, pos:XYZ, radius):THREE.Mesh {
        const ballMesh = new THREE.Mesh(new THREE.SphereGeometry(radius), matl);
        ballMesh.position.set(pos.x, pos.y, pos.z)
        return ballMesh
    }

    
    static drawCrossXY(size, lnwidth, color): THREE.Group {
        const material = new LineMaterial( { color:color, linewidth: lnwidth})
        const group = new THREE.Group(); 
        var geomX = new LineGeometry();
        geomX.setPositions([-size, 0, 0, size, 0, 0]); const xLine = new Line2(geomX, material);
        group.add(xLine);
        var geomY = new LineGeometry();
        geomY.setPositions([0, -size, 0, 0, size, 0]); const yline = new Line2(geomY, material);
        group.add(yline);
        return group;
    }

        /**
     * Converted to return promise by Copilot
     * @param webGLRenderCanvas for setting up stuff
     * @returns Promise when font has been loaded (may take some time). It has an object as   
     * parameter, holding newly loaded THREE.Scene, font and texture (see fn-Promise declaration above)
     */
    static fetchFontNtextures(): 
                Promise<{ textureA: THREE.Texture, fontA: any }> {
        // NOTE: does NOT return any data: returns a Promise (callback) to invoke when completed
        console.log('fetchFontNtextures called')
        return new Promise((resolve, reject) => {
            // here is anonymous (no name) promise function
            const fontLoader = new FontLoader();
            fontLoader.load(  // asynchronous. Returns immediately without doing work. Invokes callback when loaded.
                '/public/fonts/helvetiker_regular.typeface.json', // url param for load
                (loadedFont: any) => {  // define onLoad param function. We have the font. Now load the Texture.
                    // now do the asynchronous thing again for THREE.TextureLoader
                    new THREE.TextureLoader().load( // another asynchronous function
                        '/jpeg/circle.svg',
                        (loadedTexture: THREE.Texture) => {  // here's the callback for the load() fcn
                            loadedTexture.wrapS = THREE.RepeatWrapping;
                            loadedTexture.wrapT = THREE.RepeatWrapping;
                            loadedTexture.repeat.set(22, 22);
                            // return the promised data // asynchronous successful. OR reject()
                            resolve({ textureA:loadedTexture, fontA:loadedFont }); 
                        },
                        undefined, // onProgress
                        (err) => { console.error('Texture load error:', err); reject(err); } // reject()
                    ); // TextureLoader.load
                },  // FontLoader onLoad function
            undefined, // onProgress
            (err) => { console.error('Font load error:', err); reject(err); }
            ); // fontLoader.load
        });
    }
}

