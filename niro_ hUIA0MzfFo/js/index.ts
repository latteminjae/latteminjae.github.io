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
    const wrap = document.getElementById("ms_niro-launching-wrap") as HTMLElement;

    const ms_container = wrap.querySelector(".ms_container") as HTMLElement;
    const sectionSlideBox = wrap.querySelector(".sectionSlideBox") as HTMLElement;
    const sections = sectionSlideBox.querySelectorAll(".section") as NodeListOf<HTMLElement>;
    const listItems = wrap.querySelectorAll(".fixedBox .listBox ul > li") as NodeListOf<HTMLElement>;

    // scrollmagic
    const controller = new ScrollMagic.Controller();

    // sections 스크롤 슬라이드
    ["scroll", "mousewheel", "wheel"].forEach((v) => {
        ms_container.addEventListener(v, (e) => {
            e.preventDefault();
            const isUp = func.scrollDirectionIsUp(e);
            if (isUp) {
                func.slideDown(sections, listItems);
            } else {
                func.slideUp(sections, listItems);
            }
        });
    });

    let lastY = 0;
    ms_container.addEventListener("touchmove", (e) => {
        const currentY = e.touches[0].clientY;
        if (currentY > lastY) {
            func.slideDown(sections, listItems);
        } else if (currentY < lastY) {
            func.slideUp(sections, listItems);
        }
        lastY = currentY;
    });

    // section list click -> slide
    listItems.forEach((v, i) => {
        v.addEventListener("click", () => {
            func.slideTo(sections, listItems, i);
        });
    });

    // modal
    const modalWrapper = wrap.querySelector(".modalWrapper") as HTMLElement;
    const modalScrollBox = wrap.querySelector(".contentDiv") as HTMLElement;
    const galleryBtn = wrap.querySelector(".galleryBtn") as HTMLElement;

    // modal open
    galleryBtn.addEventListener("click", () => {
        modalWrapper.classList.add("on");
        modalScrollBox.scrollTop = 0;
    });

    // modal close
    modalWrapper.addEventListener("click", () => {
        modalWrapper.classList.remove("on");
    });

    // movie
    const movieBox = wrap.querySelector(".moviePopup") as HTMLElement;
    const movieBtns = wrap.querySelectorAll(".movieBtn") as NodeListOf<HTMLElement>;
    const movieIframe = document.getElementById("iframeDiv") as HTMLIFrameElement;
    const moviePopupCloseBtn = wrap.querySelector(".moviePopup .moviePopupCloseBtn") as HTMLIFrameElement;

    movieBtns.forEach((v) => {
        v.addEventListener("click", () => {
            movieBox.classList.add("on");
            const source = v.dataset.movie;
            movieIframe.src = `https://www.youtube.com/embed/${source}?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer`;
        });
    });

    movieBox.addEventListener("click", () => {
        movieBox.classList.remove("on");
        movieIframe.src = "";
    });

    // 모바일 브라우저 상단 navigation공간까지 합해서 vh를 계산하기 위해 사용
    // css에서 다음과 같이 사용 -> height: var(--vh);
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    // init animation
    func.animate("intro");
};
