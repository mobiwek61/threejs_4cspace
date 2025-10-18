import * as THREE from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let textureA: THREE.Texture;

function doAllWork(args:Object): HTMLElement {
  // const params = Object.fromEntries(new URLSearchParams(window.location.search));
  //const aniso: number = args.anisotropic // Number.parseInt(params.anisotropic || '1');
  const outerFrameDiv: HTMLDivElement = document.createElement('div');
  const msg: HTMLDivElement = document.createElement('div');
  Object.assign(msg.style, { fontSize:'1.9em', position: 'absolute', bottom: '0', color:'#00ffff' });
  msg.textContent = `aniso from url: ${args.anisotropic}`; 
  outerFrameDiv.appendChild(msg);
  //const tspec = params.textureSpec ? params.textureSpec : 'star';
  new THREE.TextureLoader().load(
    '\/' + args.textureSpec + '.svg', // '/star.svg',
    (loadedTexture: THREE.Texture) => {
      console.log('got it');
      loadedTexture.wrapS = THREE.RepeatWrapping;
      loadedTexture.wrapT = THREE.RepeatWrapping;
      loadedTexture.repeat.set(11, 11);
      loadedTexture.anisotropy = args.anisotropic;

      textureA = loadedTexture;
      doWhenStuffLoaded(outerFrameDiv);
    },
    undefined,
    (err: ErrorEvent) => {
      console.error('Texture load error:', err);
    }
  );
  // warning! div does not have content yet, is waiting for texture to load.
  return outerFrameDiv;
}

function doWhenStuffLoaded(frameElem:HTMLElement): void {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  frameElem.appendChild(renderer.domElement);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 10, 10);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const material = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    map: textureA,
    side: THREE.DoubleSide,
    roughness: 0.5,
    metalness: 0.1,
  });

  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const plane = new THREE.Mesh(planeGeometry, material);
  plane.rotation.x = Math.PI * 0.55;
  plane.position.x = -5;
  scene.add(plane);

  const sphereGeometry = new THREE.SphereGeometry(5, 64, 64);
  const sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.x = -4;
  scene.add(sphere);

  animate();
  //return renderer.domElement
}

function animate(): void {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

export { doAllWork };
