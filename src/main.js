import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { World } from './World.js';


//---------------------------- STATS ZONE -------------------------------//
const stats = new Stats();
document.body.appendChild(stats.dom);
//------------------------- END OF STATS ZONE --------------------------//


//============================== PROVISIONING ZONE ==============================//

//---------------------------- RENDERER ZONE -------------------------------//
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
//------------------------- END OF RENDERER ZONE --------------------------//   


//---------------------------- SCENE ZONE -------------------------------//
const scene = new THREE.Scene();
//------------------------- END OF SCENE ZONE --------------------------//

//---------------------------- CAMERA ZONE -------------------------------//
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
//const d = 20;
// switch to orthographic camera for debugging:
//const camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 1000);
camera.position.set(10, 10, 10,);
//------------------------- END OF CAMERA ZONE --------------------------// 


//---------------------------- CONTROLS ZONE -------------------------------//
const controls = new OrbitControls(camera, renderer.domElement);
//------------------------- END OF CONTROLS ZONE --------------------------//


//---------------------------- TERRAIN ZONE -------------------------------//
const world = new World(10, 10);

const sun = new THREE.DirectionalLight();
sun.position.set(10, 2, 10);
sun.intensity = 3;

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.8;
//------------------------- END OF TERRAIN ZONE --------------------------//

//============================== END OF PROVISIONING ZONE ==============================//

scene.add(world);
scene.add(ambient);
scene.add(sun);

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

const worldFolder = gui.addFolder('World');
worldFolder.add(world, 'width', 1, 20, 1).name('Width');
worldFolder.add(world, 'height', 1, 20, 1).name('Height');
worldFolder.add(world, 'treeCount', 1, 100, 1).name('Tree Count');
worldFolder.add(world, 'rockCount', 1, 100, 1).name('Rock Count');
worldFolder.add(world, 'bushCount', 1, 100, 1).name('Bush Count');
worldFolder.add(world, 'generate').name('Generate');
//------------------------- END OF GUI ZONE --------------------------//