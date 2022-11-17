import Experience from "../experience.js";
import * as THREE from 'three';
import GUI from 'lil-gui'; 
import GSAP from 'gsap';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        //this.gui = new GUI();
        this.obj = {
            colorObj: {r:0,g:0,b:0},
            intensity: 3,
        };

        this.setSunLight();
        //this.setGUI();

    }
   
    /*
    setGUI() {
        this.gui.addColor(this.obj, "colorObj").onChange(() => {
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.color);
        });
        this.gui.add(this.obj,"intensity",0,10).onChange(() => {
            this.sunLight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        });
    }
    */
  

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.lookAt(0,0,0);
        /*
        // Check Light Positioning
        const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        this.scene.add(helper);
        */
        this.sunLight.position.set(0,2,4.5);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight('#ffffff', 1);
        this.ambientLight.position.set(0,3,0);
        this.scene.add(this.ambientLight);

    }

    switchTheme(theme) {
        if(theme === "dark"){
            GSAP.to(this.sunLight.color, {
                r: 0.5,
                g: 0.2,
                b: 0.8,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.2,
                g: 0.2,
                b: 0.8,
            });
            GSAP.to(this.sunLight, {
                intensity: 0.5,
            })
            GSAP.to(this.ambientLight, {
                intensity: 0.5,
            })
        }else{
            GSAP.to(this.sunLight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.sunLight, {
                intensity: 3,
            })
            GSAP.to(this.ambientLight, {
                intensity: 2,
            })
        }
    }

   resize() {

   }

    update() {
    }
}