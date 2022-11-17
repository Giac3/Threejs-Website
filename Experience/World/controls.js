import Experience from "../experience.js";
import * as THREE from 'three';
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js "
import ASScroll from '@ashthornton/asscroll'

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child => {
            if(child.type === "RectAreaLight"){
                this.rectLight = child;
            }
        });
        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience .world.floor.circleThird;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();

        this.setScrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 1,
          disableRaf: true });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 969px)": () => {

                //Reset Values

                this.rectLight.width = 1;
                this.rectLight.height = 1;
                this.room.scale.set(0.07,0.07,0.07);
                // First Section
                this.firstMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }});
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0013;
                    }
                });

                // Second Section
                this.secondMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }});
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 1;
                    },
                    z: () => {
                        return this.sizes.height * 0.0032
                    }
                }, "same").to(this.camera.orthographicCamera.position, {
                    y: 6,
                    x: 0,
                },"same");

                // Scale

                this.secondMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }}, "same");
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                }, "same");

                this.secondMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }}, "same");
                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.4*8,
                    height: 0.7*8,
                }, "same");

                // Third Section
                this.ThirdMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }},"same");
                this.ThirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                    y: 4.5,
                    x: 1,
                },"same");

            
            },
            // Mobile
            "(max-width: 968px)": () => {
                // Reset Values for Mobile
                this.room.scale.set(0.04,0.04,0.04);
                this.rectLight.width = 1;
                this.rectLight.height = 1;
                this.room.position.set(0,0,0);
                //First Section
                this.firstMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }}).to(this.room.scale, {
                    x:0.05,
                    y:0.05,
                    z:0.05,
                });
                //Second Section
                this.secondMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }}, "same").to(this.room.scale, {
                    x:0.15,
                    y:0.15,
                    z:0.15,
                }, "same").to(this.camera.orthographicCamera.position,{
                    x:-2,
                    y: 5,
                },"same").to(this.rectLight, {
                    height:0.9,
                    width:0.9,
                })
                //Third Section
                this.ThirdMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }}, "same").to(this.camera.orthographicCamera.position, {
                    y: 4.5,
                    x: 1,
                },"same");

            },

            all: () => {
                // Circle Animations
                // First Section
                this.firstMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }}).to(this.circleFirst.scale, {
                    x:3,
                    y:3,
                    z:3,
                });

                // Second Section
                this.secondMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }}).to(this.circleSecond.scale, {
                    x:3,
                    y:3,
                    z:3,
                },"same").to(this.room.position, {
                    y:0.7,
                 },"same").to(this.camera.orthographicCamera, {
                    y:0.7,
                 },"same")

                // Third Section
                this.ThirdMoveTimeline = new GSAP.timeline({scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }},"same").to(this.circleThird.scale, {
                    x:3,
                    y:3,
                    z:3,
                });

                // Filing Cabinet Animations
                this.secondPartTimeLine = new GSAP.timeline({scrollTrigger:{
                    trigger: ".third-move",
                    start: "center center",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            });
            this.room.children.forEach(child => {
                if(child.name === "filecabinet"){
                    this.first = GSAP.to(child.position, {
                        x: 12.8,
                        z: -11.8,
                        //z: 12.12,
                        duration: 1,
                    })
                }
            });
            this.room.children.forEach(child => {
                if(child.name === "filecabinetobjects"){
                    this.second = GSAP.to(child.scale, {
                        x: 1,
                        y:1,
                        z: 1,
                        //ease: "back.out(1)",
                        duration: 2,
                    });
                }
            });

            this.secondPartTimeLine.add(this.first);
            this.secondPartTimeLine.add(this.second);
            },
              
          });  
          
          
    }

   resize() {

   }

   update() {
   }
}