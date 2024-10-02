import * as THREE from 'three';


export class Terrain extends THREE.Mesh {
    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;

        this.geometry = new THREE.PlaneGeometry(width, height);
        this.material = new THREE.MeshStandardMaterial({ color: 0x50a000 });

        this.rotation.x = -Math.PI / 2;
    }
}