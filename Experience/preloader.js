import { EventEmitter } from "events";
import Experience from "./experience.js";
import GSAP from "gsap";
import convert from "./utils/convertdivstospans.js";

export default class Preloader extends EventEmitter{
    constructor() {
        super();

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;

        this.world = this.experience.world;

        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        })

    }

    setAssets() {
        convert(document.querySelector(".intro-text" ))
        convert(document.querySelector(".hero-main-title" ))
        convert(document.querySelector(".hero-main-description" ))
        convert(document.querySelector(".hero-second-subheading" ))
        convert(document.querySelector(".second-sub " ))
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }
    
    firstIntro () {
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", {
                y:0,
                yPercent: 100,
            });
            this.timeline.to(".preloader", {
                delay: 1,
                opacity: 0,
                onComplete: () => {
                    document.querySelector(".preloader").classList.add("hidden");
                }
            });

            if(this.device === "desktop"){

                this.timeline.to(this.roomChildren.introcube.scale, {
                    x:0.1,
                    y:0.1,
                    z:0.1,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1, 
                    ease: "power1.out",
                    duration: 0.7,

                });
            }else{
                this.timeline.to(this.roomChildren.introcube.scale, {
                    x:0.055,
                    y:0.055,
                    z:0.055,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: 0,
                    z: -1,
                    ease: "power1.out",
                    duration: 0.7,

                });
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back-out(1.2)",
            }).to(".arrow-svg-wrapper", {
                opacity: 1,
            }, "same").to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve,
            }, "same");
        });
        
    }

    
        secondIntro () {
            return new Promise ((resolve) => {
                this.secondTimeline = new GSAP.timeline();

                this.roomChildren.introcube.scale.set(1.4,1.4,1.4);
                this.roomChildren.rectLight.scale.set(1,1,1);

                this.secondTimeline.to(".intro-text .animatedis", {
                    yPercent: -100,
                    stagger: 0.05,
                    ease: "back-in(1.7)",
                }, "fadeout").to(".arrow-svg-wrapper", {
                    opacity: 0,
                }, "fadeout").to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                    duration: 2,

                }, "same").to(this.roomChildren.introcube.rotation,{
                    y: 4* Math.PI,
                    duration: 2,    
                }, "same").to(this.roomChildren.introcube.scale, {
                    x:20,
                    y:20,
                    z:30,
                    duration: 2,
                }, "same").to(this.camera.orthographicCamera.position, {
                    y: 4,
                    duration: 2,
                }, "same").to(this.roomChildren.introcube.position, {
                    x:0,
                    y:7.5,
                    z: 0,
                    duration: 2,
                }, "same").to(this.roomChildren.body.scale, {
                    x: 11.505,
                    y: 9,
                    z: 0.3,
                }).to(this.roomChildren.introcube.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                }).to(".hero-main-title .animatedis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back-out(1.2)",
                }, "same").to(".hero-main-description .animatedis", {
                    yPercent: 0 ,
                    stagger: 0.07,
                    ease: "back-out(1.2)",
                }, "same").to(".first-sub .animatedis", {
                    yPercent: 0 ,
                    stagger: 0.07,
                    ease: "back-out(1.2)",
                }, "same").to(".second-sub .animatedis", {
                    yPercent: 0 ,
                    stagger: 0.07,
                    ease: "back-out(1.2)",
                }, "same").to(this.roomChildren.sofa.scale, {
                    x:1, 
                    y:1,
                    z:1,

                }).to(this.roomChildren.bookshelf.scale, {
                    x:1,
                    y:1,
                    z:1,

                }).to(this.roomChildren.filecabinet.scale, {
                    x:0.09,
                    y:1.9,
                    z:0.09,

                }).to(this.roomChildren.filecabinet.position, {
                    x:16.51,
                    y:12.4,
                    z:-11.8,

                }).to(this.roomChildren.filecabinetobjects.position, {
                    x:14,
                    y:12,
                    z:-1,

                }).to(this.roomChildren.desk.scale, {
                    x:1,
                    y:1,
                    z:1,

                })
                .to(this.roomChildren.deskstuff.scale, {
                    x:1,
                    y:1,
                    z:1,

                }).to(this.roomChildren.computer.scale, {
                    x:1,
                    y:1,
                    z:1,

                })
                .to(this.roomChildren.artframes.scale, {
                    x:1,
                    y:1,
                    z:1,

                }).to(this.roomChildren.flooritems.scale, {
                    x:1,
                    y:1,
                    z:1,

                }).to(this.roomChildren.bed.scale, {
                    x:1,
                    y:1,
                    z:1,

                }).to(".arrow-svg-wrapper", {
                    opacity: 1,
                    onComplete: resolve, 
                }, );

        });
    }

    onScroll(e) {
        if(e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if(difference> 0 ){
            this.playSecondIntro();
            this.removeEventListeners();
        }
        this.initialY = null;
    }

    removeEventListeners () {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.scrollOnceEvent);
        window.removeEventListener("touchmove", this.scrollOnceEvent);
        
    }   

    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.scrollOnceEvent);
        window.addEventListener("touchmove", this.scrollOnceEvent);
    }

    resize() {

    }

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }


    move() {
        if(this.device == "desktop"){
            this.room.position.set(-1,0,0);
        }else{
            this.room.position.set(0,0,-1);
        }
    }

    scale() {
        //this.roomChildren.rectLight.width = 0;
        //this.roomChildren.rectLight.height = 0;
        if(this.device == "desktop"){
            this.room.scale.set(0.07,0.07,0.07);
        }else{
            this.room.scale.set(0.04,0.04,0.04);
        }
    }

    update() {
        if(this.moveFlag){
            this.move();
        }

        if(this.scaleFlag){
            this.scale();
        }
    }
}