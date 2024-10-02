import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { Terrain } from './terrain.js';


//---------------------------- STATS ZONE -------------------------------//
const stats = new Stats();
document.body.appendChild(stats.dom);
//------------------------- END OF STATS ZONE --------------------------//


//------------------------- PROVISIONING ZONE --------------------------//
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

const d = 20;
//const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
camera.position.set(20, 20, 20,);

const controls = new OrbitControls(camera, renderer.domElement);

const terrain = new Terrain(10, 10);

const ringMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
const ringGeometry = new THREE.RingGeometry(0.5, 1, 32, 1, 0, Math.PI * 2);
const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
ringMesh.position.y = -1.5;

const sun = new THREE.DirectionalLight();
sun.position.set(1, 2, 3);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;
//--------------------- END OF PROVISIONING ZONE ---------------------//

scene.add(sun);
scene.add(ambient);
scene.add(terrain);
scene.add(ringMesh);

camera.rotation.order = 'XYZ';
camera.rotation.y = -Math.PI/4;
camera.rotation.x = Math.atan(-1/Math.sqrt(2));
// camera.lookAt(scene.position);
// camera.position.z = 5;
controls.update();

// code here is executed once per frame
function animate() {
    stats.update();
    controls.update();
    renderer.render(scene,camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//---------------------------- GUI ZONE -------------------------------//
const gui = new GUI();

const terrainFolder = gui.addFolder('Terrain');
// folder.add(terrain.position, 'x', -2, 2, 0.01).name('X Position');
terrainFolder.add(terrain, 'width', 1, 20, 1).name('Width');
terrainFolder.add(terrain, 'height', 1, 20, 1).name('Height')
terrainFolder.addColor(terrain.material, 'color');

const ringFolder = gui.addFolder('Ring');
ringFolder.add(ringMesh.position, 'x', -2, 2, 0.01).name('X Position');
ringFolder.add(ringMesh.position, 'y', -2, 2, 0.01).name('Y Position');
ringFolder.add(ringMesh.position, 'z', -2, 2, 0.01).name('Z Position');
ringFolder.addColor(ringMaterial, 'color');
//------------------------- END OF GUI ZONE --------------------------//