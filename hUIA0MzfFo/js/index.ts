import "./polyfill";

import ScrollMagic, { Scene } from "scrollmagic";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import { TweenMax, TimelineMax } from "gsap";

import * as func from "./functions";

interface Scene_ extends Scene {
    setTween(tween: any): Scene_;
}

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

window.onload = function () {
    // scrollmagic
    const controller = new ScrollMagic.Controller();

    const wrap = document.getElementById("ms_ray-teaser-wrap") as HTMLElement;
    const sections = wrap.querySelectorAll(".container > div") as NodeListOf<HTMLElement>;

    sections.forEach((v, i) => {
        (
            new ScrollMagic.Scene({
                duration: 1,
                offset: v.getBoundingClientRect().height / 2,
                triggerElement: v,
                triggerHook: 1,
            }) as Scene_
        )
            .on("start", function (e) {
                func.animate(v, i);
            })
            .addTo(controller);
    });

    // 모바일 브라우저 상단 navigation공간까지 합해서 vh를 계산하기 위해 사용
    // css에서 다음과 같이 사용 -> height: var(--vh);
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
};
