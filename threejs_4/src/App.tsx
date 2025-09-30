import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MAT } from "./MyMaterialsNhelpers";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
////////// this code originally from DeepSeek
/* manually added to package.json to get intellisense for three.js:
  "@types/three": "^0.178.1" */
// github codespace A
export default function TwoSpheresWithMovingLight() {
  //const mountRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLCanvasElement>(null)
  var renderer: any;
  //var controls:OrbitControls;
  var camera: THREE.PerspectiveCamera;
  // RIGHT-CLICK STICKY SCROLL
  useEffect(() => {
    drawIt();
    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      //mountRef.current?.removeChild(renderer.domElement);
      //controls.dispose();
    };
  }, []); // "empty array, run only once, after initial render (mount)"

  // Handle window resize
  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function drawIt() {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue background
    scene.fog = new THREE.FogExp2(0x87ceeb, 0.0002);
    // the scene is actually on its side, with sky at y axis and near/far
    // along z axis. This is how hemispherelight wants it.
    // camera = new THREE.PerspectiveCamera(
    //   75, window.innerWidth / window.innerHeight, 0.1, 1000  );
    ///////
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = window.innerHeight / 4; // smaller is wider
    const camera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2, // right
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      1000
    );
    const df = 2;
    camera.position.x = df * 20;
    camera.position.z = df * 120;
    camera.position.y = df * 30;
    camera.lookAt(0, 0, 0);
    // how its done in other project. remove appendChild below. crashes! 
    renderer = new THREE.WebGLRenderer({ canvas:mountRef.current, antialias: true });
    // renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x87ceeb); // Match background
    //console.log('append')
    //mountRef.current.appendChild(renderer.domElement);

    const geometry1 = new THREE.SphereGeometry(10, 64, 64);
    const sphere1 = new THREE.Mesh(geometry1, MAT.mat1());
    sphere1.position.set(-15, 0, 0);  sphere1.castShadow = true;
    scene.add(sphere1);
    const sphere2 = new THREE.Mesh(geometry1, MAT.mat2());
    sphere2.position.set(15, 0, 0); sphere2.castShadow = true;
    scene.add(sphere2);
    const sphere3:THREE.Mesh = new THREE.Mesh(geometry1, MAT.mat3());
    sphere3.position.set(40, 0, 0);  sphere3.castShadow = true;
    scene.add(sphere3);

    // "By default, the light shines from above, along the positive Y-axis (0, 1, 0).
    // This represents the sky..""
    // const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1.9);
    const hemisphereLight = new THREE.HemisphereLight(0xdedede, 0x4a5f2f, 0.8);
    
    // const hemisphereLight = new THREE.HemisphereLight('red', 'green', 22);
    hemisphereLight.position.set(0, 500, 0);
    scene.add(hemisphereLight);

    ///// animate() calls this new doOrbit() to reposition light to new orbit position.
    interface OrbitingLight extends THREE.DirectionalLight { 
        /* ADD this fcn: */ doOrbit: (time: number) => void;  }
    const directionalLightOrbit:OrbitingLight = new THREE.DirectionalLight(0xffffff, 4)  as OrbitingLight;;
    directionalLightOrbit.doOrbit = (time:any) => {
      const orbitRadius = 55;  directionalLightOrbit.position.set(
          Math.cos(time) * orbitRadius, orbitRadius, Math.sin(time) * orbitRadius);
    }

    // position of this light gets set in animation
    directionalLightOrbit.castShadow = true;
    //"creating a 300×300 unit square centered at the origin, which determines the area where shadows are calculated"
    Object.assign(directionalLightOrbit.shadow.camera, {
      left: -150, right: 150, top: 150, bottom: -150 });
    scene.add(directionalLightOrbit);
    scene.add(new THREE.CameraHelper(directionalLightOrbit.shadow.camera));

    const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight,  5);
    scene.add(hemisphereLightHelper);
    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLightOrbit, 5 );
    scene.add(directionalLightHelper);

    // Add a ground plane with grass-like texture
    const planeGeometry = new THREE.PlaneGeometry(90, 50);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x3a5f0b,
      roughness: 0.8,
      metalness: 0.1,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -20;
    plane.position.z = -20;
    plane.receiveShadow = true;
    scene.add(plane);

    //scene.add(MAT.redXgreenYblueZaxes(11))
    scene.add(MAT.redXgreenYblueZaxesTube(33, 1, 44));
    const animate = () => {
      requestAnimationFrame(animate);
      // Move the directional light to simulate sun movement
      const time = Date.now() * 0.002;
      directionalLightOrbit.doOrbit(time)
      
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", handleResize);

    animate();
  }

  return <canvas ref={mountRef} ></canvas>;
}
