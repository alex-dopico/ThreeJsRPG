import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


//---------------------------- STATS ZONE -------------------------------//
const stats = new Stats();
document.body.appendChild(stats.dom);
//------------------------- END OF STATS ZONE --------------------------//

//---------------------------- GUI ZONE -------------------------------//
const gui = new GUI();
//------------------------- END OF GUI ZONE --------------------------//

//------------------------- PROVISIONING ZONE --------------------------//
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const controls = new OrbitControls(camera, renderer.domElement);

const sun = new THREE.DirectionalLight();
sun.position.set(1, 2, 3);

const ambient = new THREE.AmbientLight();
ambient.intensity = 0.5;

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshStandardMaterial({color: 0x00ff00});

const cube = new THREE.Mesh(geometry, material);
//--------------------- END OF PROVISIONING ZONE ---------------------//

scene.add(sun);
scene.add(ambient);
scene.add(cube);

camera.position.z = 5;
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

const folder = gui.addFolder('Cube');
folder.add(cube.position, 'x', -2, 2, 0.01).name('X Position');
folder.addColor(cube.material, 'color');
