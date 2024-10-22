import * as THREE from 'three';


export class World extends THREE.Mesh {
#objectMap = new Map();

    constructor(width, height) {
        super();

        this.width = width;
        this.height = height;
        this.treeCount = 20;
        this.rockCount = 10;
        this.bushCount = 10;

        this.trees = new THREE.Group();
        this.add(this.trees);

        this.rocks = new THREE.Group();
        this.add(this.rocks);

        this.bushes = new THREE.Group();
        this.add(this.bushes);
    }

    generate() {
        this.clear();
        this.createTerrain();
        this.createTrees();
        this.createRocks();
        this.createBushes();
    }

    clear() {
        if (this.Terrain) {
            this.Terrain.geometry.dispose();
            this.Terrain.material.dispose();
            this.remove(this.Terrain);
        }

        if (this.trees) {
            this.trees.children.forEach((tree) => {
                tree.geometry?.dispose();
                tree.material?.dispose();
            });
            this.trees.clear();
        }

        if (this.rocks) {
            this.rocks.children.forEach((rock) => {
                rock.geometry?.dispose();
                rock.material?.dispose();
            });
            this.rocks.clear();
        }

        if (this.bushes) {
            this.bushes.children.forEach((bush) => {
                bush.geometry?.dispose();
                bush.material?.dispose();
            });
            this.bushes.clear();
        }

        this.#objectMap.clear();
    }

    createTerrain() {
        const TerrainMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x50a000
         });

        const TerrainGeometry = new THREE.PlaneGeometry(
            this.width,
            this.height,

        );
        this.Terrain = new THREE.Mesh(TerrainGeometry, TerrainMaterial);
        this.Terrain.rotation.x = -Math.PI / 2;
        this.Terrain.position.set(this.width / 2, this.height / 2);
        this.add(this.Terrain);
    }

    createTrees() {
        const treeRadius = 0.2;
        const treeHeight = 1;

        const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
        const treeMaterial = new THREE.MeshStandardMaterial({
            color: 0x305010,
            flatShading: true
        });

        for (let i = 0; i < this.treeCount; i++) {
            const treeMesh = new THREE.Mesh(treeGeometry, treeMaterial);
            const coords = new THREE.Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random())
            );

            if (this.#objectMap.has(`${coords.x}-${coords.y}`)) continue;

            treeMesh.position.set(
                coords.x,
                treeHeight / 2,
                coords.y
            );

            this.trees.add(treeMesh);

            this.#objectMap.set(`${coords.x}-${coords.y}`, treeMesh);
        }
    }

    createRocks() {
        const minRockRadius = 0.1;
        const maxRockRadius = 0.3;
        const minRockHeight = 0.5;
        const maxRockHeight = 0.8;

        const rockMaterial = new THREE.MeshStandardMaterial({
            color: 0xb0b0b0,
            flatShading: true
        });

        for (let i = 0; i < this.rockCount; i++) {
            const rockRadius = minRockRadius + (Math.random() * (maxRockRadius - minRockRadius));
            const rockHeight = minRockHeight + (Math.random() * (maxRockHeight - minRockHeight));
            const rockGeometry = new THREE.SphereGeometry(rockRadius, 6, 5);
            const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);
            const coords = new THREE.Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random())
            );

            if (this.#objectMap.has(`${coords.x}-${coords.y}`)) continue;
            
            rockMesh.position.set(
                coords.x - 4.5,
                rockRadius,
                coords.y - 4.5
            );

            rockMesh.scale.y = rockHeight;
            this.rocks.add(rockMesh);

            this.#objectMap.set(`${coords.x}-${coords.y}`, rockMesh);
        }
    }

    createBushes() {
        const minBushkRadius = 0.1;
        const maxBushRadius = 0.3;

        const bushMaterial = new THREE.MeshStandardMaterial({
            color: 0x80a040,
            flatShading: true
        });

        for (let i = 0; i < this.bushCount; i++) {
            const bushRadius = minBushkRadius + (Math.random() * (maxBushRadius - minBushkRadius));
            const bushGeometry = new THREE.SphereGeometry(bushRadius, 8, 8);
            const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);
            const coords = new THREE.Vector2(
                Math.floor(this.width * Math.random()),
                Math.floor(this.height * Math.random())
            );

            if (this.#objectMap.has(`${coords.x}-${coords.y}`)) continue;
            
            bushMesh.position.set(
                coords.x - 4.5,
                bushRadius,
                coords.y - 4.5
            );

            this.bushes.add(bushMesh);

            this.#objectMap.set(`${coords.x}-${coords.y}`, bushMesh)
        }
    }
}

// This builds:
// World
//  - World Mesh
//  - Trees Group
//      - Tree1
//      - Tree2
//      - ...