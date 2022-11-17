import Experience from "../experience.js";
import * as THREE from 'three';
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.onMouseMove();

    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                }); 
            }
            // Glass Desk
            if(child.name === "desk") {
                child.children[1].material = new THREE.MeshPhysicalMaterial();
                child.children[1].material.roughness = 0;
                child.children[1].material.color.set(0x00d4ff);
                child.children[1].material.ior = 3;
                child.children[1].material.transmission = 1;
                child.children[1].material.opacity = 1;
            }
            // Glass Window
            /*
            if(child.name === "body") {
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0;
                child.children[0].material.color.set(0x00d4ff);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
            }
            */
           if(child.name === "file-cabinet"){
            child.position.x = 17;
            child.position.z = -12;
           }
           /*
           if(child.name === "file-cabinet-objects"){
            child.scale.set(0,0,0);
           }*/

           child.scale.set(0,0,0);
           if(child.name === "introcube") {
            //child.scale.set(1.4,1.4,1.4);
            child.position.set(0,0,0);
           }

           this.roomChildren[child.name] = child;

        });

        const width = 1;
        const height = 1;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set( 0, 0, 0 );
        this.actualRoom.add( rectLight )

        //const rectLightHelper = new RectAreaLightHelper( rectLight );
        //rectLight.add( this.rectLightHelper );

        this.scene.add(this.actualRoom);
        this.roomChildren['rectLight'] = rectLight;
        //this.actualRoom.scale.set(0.07,0.07,0.07)
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX-window.innerWidth / 2)*2) / window.innerWidth;
            this.lerp.target = this.rotation*0.4;
        }); 
    }

   resize() {

   }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );
        this.actualRoom.rotation.y = this.lerp.current;
    }
}