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
    const wrap = document.getElementById("ms_niro-prelaunching-wrap") as HTMLElement;

    // scrollmagic
    const controller = new ScrollMagic.Controller();

    const intro = wrap.querySelector(".introSection") as HTMLElement;
    const sections = wrap.querySelectorAll(".contentSection > .section") as NodeListOf<HTMLElement>;

    (
        new ScrollMagic.Scene({
            duration: 1,
            offset: -250,
            triggerElement: intro,
        }) as Scene_
    )
        .on("start", function (e) {
            func.animate("intro");
        })
        .addTo(controller);

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

    // contentBox up/down
    const introSection = wrap.querySelector(".introSection") as HTMLElement;
    const contentBox = wrap.querySelector(".contentBox") as HTMLElement;
    const contentSection = wrap.querySelector(".contentSection") as HTMLElement;
    const closeBtn = wrap.querySelectorAll(".closeBtn") as NodeListOf<HTMLElement>;

    function layerOpen() {
        if (!contentBox.classList.contains("on")) {
            contentBox.classList.add("on");
            contentSection.scrollTop = 0;
        }
    }

    function layerOff() {
        if (contentBox.classList.contains("on")) {
            contentBox.classList.remove("on");
        }
    }

    ["scroll", "mousewheel", "wheel", "touchmove"].forEach((v) => {
        introSection.addEventListener(v, (e) => {
            e.preventDefault();
            layerOpen();
        });
    });

    closeBtn.forEach((v) => {
        v.addEventListener("click", () => {
            layerOff();
        });
    });

    // feature 버튼 클릭 - 전환
    const featureBtns = wrap.querySelectorAll(".featureBox .toggleBtnBox button") as NodeListOf<HTMLElement>;
    const featureListPC = wrap.querySelectorAll(".featureBox .ms_nontab .featureList") as NodeListOf<HTMLElement>;
    const featureListMO = wrap.querySelectorAll(".featureBox .ms_tab .featureList") as NodeListOf<HTMLElement>;
    featureBtns.forEach((v, i) => {
        v.addEventListener("click", () => {
            if (v.classList.contains("on")) return;

            featureBtns.forEach((v1) => v1.classList.remove("on"));
            featureListPC.forEach((v1) => v1.classList.remove("on"));
            featureListMO.forEach((v1) => v1.classList.remove("on"));

            v.classList.add("on");
            featureListPC[i].classList.add("on");
            featureListMO[i].classList.add("on");
        });
    });

    // modal
    const modalWrapper = wrap.querySelector(".modalWrapper") as HTMLElement;
    const modalScrollBox = wrap.querySelector(".contentDiv") as HTMLElement;
    const modalImages = wrap.querySelectorAll(".modalWrapper .contentList img") as NodeListOf<HTMLImageElement>;
    const slideImages = wrap.querySelectorAll(".slideBox .slideItem > img") as NodeListOf<HTMLImageElement>;

    // modal open
    slideImages.forEach((v) => {
        v.addEventListener("click", () => {
            const index = Number(v.dataset.gallery as string);

            if (!modalWrapper.classList.contains("on")) {
                modalWrapper.classList.add("on");
                window.scrollTo({ top: 0 });
                modalScrollBox.scrollTop = modalImages[index].offsetTop - 100;
            }
        });
    });

    // modal close
    modalWrapper?.addEventListener("click", () => {
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

    // 앵커
    const hash = window.location.hash.slice(1);
    const sectionsName = ["film", "feature", "pillar", "gallery", "order"];
    if (sectionsName.some((v) => v === hash)) {
        layerOpen();

        const index = sectionsName.indexOf(hash);
        console.log(index);
        contentSection.scrollTop = sections[index].offsetTop - 42;

        console.log("asdf");
    }

    // 모바일 브라우저 상단 navigation공간까지 합해서 vh를 계산하기 위해 사용
    // css에서 다음과 같이 사용 -> height: var(--vh);
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
};
