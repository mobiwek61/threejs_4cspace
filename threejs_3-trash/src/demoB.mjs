import * as THREE from "three";

/** index.mjs for codesandbox to demo three.js stuff.
 *  This project was made by codesandbox as:
 *  javascript-devbox.
 */
// this file called as script from html, so any code gets run at that time.
// in this case its a local function call.
// Scene setup
var renderer
var scene
var camera
var textureA


function doAllWork() {
  console.log('asdfas')
  var aniso = Number.parseInt((Object.fromEntries(new URLSearchParams(window.location.search))).anisotropic);
  const newDiv = document.createElement("div");newDiv.textContent = "aniso=" + aniso;document.body.appendChild(newDiv);

  new THREE.TextureLoader().load(
    // another asynchronous function
    "/star.svg",
    (loadedTexture) => {
      // here's the callback for the load() fcn
      console.log("got it");
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.wrapT = THREE.RepeatWrapping;
      loadedTexture.repeat.set(11, 11);
      // anisotropy: 1-no detail, 3-blurry, 16-very clear. Affects plane, not sphere so much
      // "In 3D graphics, UV coordinates map a 2D texture onto a 3D surface. Think of UVs as instructions that tell the texture how to wrap around the geometry."
      loadedTexture.anisotropy = aniso;
      // return the promised data // asynchronous successful. OR reject()
      //resolve({ textureA:loadedTexture, fontA:loadedFont });
      textureA = loadedTexture
      doWhenStuffLoaded()
    },
    undefined, // onProgress
    (err) => {
      console.error("Texture load error:", err);
    }
  ); // reject())
}

function doWhenStuffLoaded() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // X-axis: Points to the right. Y-axis: Points up. Z-axis: Points out of the screen (towards the viewer).
  camera.position.set(0, 0, 10); 
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Lighting
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);
  
  // Texture loader
  //const loader = new THREE.TextureLoader();
  // const texture = loader.load(
  //   "https://threejsfundamentals.org/threejs/resources/images/checker.png",
  //   () => {
  //     texture.anisotropy = 16; //renderer.capabilities.getMaxAnisotropy();
  //     texture.wrapS = THREE.RepeatWrapping;
  //     texture.wrapT = THREE.RepeatWrapping;
  //     texture.repeat.set(4, 4);

      const material = new THREE.MeshStandardMaterial({
        color: 0xffff00,
        map: textureA,
        side: THREE.DoubleSide,
        roughness: 0.5,
        metalness: 0.1,
      });

      // Plane
      const planeGeometry = new THREE.PlaneGeometry(10, 10);
      const plane = new THREE.Mesh(planeGeometry, material);
      // no rotation: plane on xy axis where y points up and z points to viewer
      plane.rotation.x = Math.PI * 0.55;
      //plane.rotation.y = -Math.PI * (3.5 / 2);
      plane.position.x = -5;
      scene.add(plane);

      // Sphere
      const sphereGeometry = new THREE.SphereGeometry(5, 64, 64);
      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.position.x = 6;
      scene.add(sphere);

      animate();
   // }
  //);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

export { doAllWork }