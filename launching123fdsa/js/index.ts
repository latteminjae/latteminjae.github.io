import { domInit, Dom } from "./dom";
import func from "./functions";
import ScrollMagic, { Scene } from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { TweenMax, TimelineMax } from "gsap";
import Hammer from "hammerjs";
import Swiper from "swiper";
import SwiperCore, { Navigation, Pagination } from "swiper/core";
SwiperCore.use([Navigation, Pagination]);

export let dom_: Dom | null = null;

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

interface Scene_ extends Scene {
    setTween(tween: any): Scene_;
}

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

window.onload = function () {
    dom_ = domInit();

    const dom = dom_ as Dom;

    // add event

    // btns...
    dom.navBtn.addEventListener("click", () => {
        func.navToggle(dom);
    });

    dom.closeBtns.forEach((v) => {
        v.addEventListener("click", () => {
            func.closeNode(dom, v.dataset.close);
        });
    });

    dom.gotoBtns.forEach((v) => {
        v.addEventListener("click", () => {
            func.goto(dom, v.dataset.go);
        });
    });

    dom.tabBtns.forEach((v) => {
        v.addEventListener("click", () => {
            func.changeTab(dom, v.dataset.tab as string, v.dataset.tabnum as string);
        });
    });

    dom.layerBtns.forEach((v, i) => {
        v.addEventListener("click", () => {
            func.openLayer(dom, v.dataset.layer as string, i);
        });
    });

    dom.movieBtns.forEach((v) => {
        v.addEventListener("click", () => {
            func.movieOpen(dom, v as HTMLElement);
        });
    });

    // section0 scroll
    dom.sections[0].addEventListener("wheel", (e: WheelEvent) => {
        e.preventDefault();
        func.section0Scroll(dom);
    });

    dom.sectionScrollBox.addEventListener("wheel", (e: WheelEvent) => {
        if (e.deltaY < 0 && dom.sectionScrollBox.scrollTop === 0) {
            func.goto(dom, "0");
        }
    });

    const mc = new Hammer(dom.sections[0] as HTMLElement);
    mc.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });
    mc.on("swipeup", function (e) {
        e.preventDefault();
        func.section0Scroll(dom);
    });
    mc.on("swipedown", function (e) {
        e.preventDefault();
        func.section0Scroll(dom);
    });

    dom.sectionScrollBox.addEventListener("scroll", (e) => {
        func.scrollCheck(dom, (e.target as HTMLElement).scrollTop);
    });

    // slide
    const swiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        loop: true,
        pagination: {
            el: ".swiper-pagination",
        },
        slidesPerView: "auto",
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    const controller = new ScrollMagic.Controller({
        container: dom.wrap.querySelector(".sectionScrollBox") as Element,
    });

    dom.sections.forEach((v, i) => {
        if (i === 0 || i === 1) {
            return;
        }
        (
            new ScrollMagic.Scene({
                duration: 1,
                offset: -200,
                triggerElement: v,
            }) as Scene_
        )
            .on("start", function (e) {
                if ((e as any).scrollDirection === "FORWARD" || (e as any).scrollDirection === "PAUSED") {
                    func.animate(dom, `section${i}Open`);
                } else if ((e as any).scrollDirection === "REVERSE") {
                    func.animate(dom, `section${i}Close`);
                }
            })
            .addTo(controller);
    });

    func.animate(dom, "fixedwrap");
    func.animate(dom, "section0-0Open");
    // func.goto(dom, "4");

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    window.addEventListener("resize", () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    if (window.location.hash === "#collection") {
        func.goto(dom, "5");
    }
};
