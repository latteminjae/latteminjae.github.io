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
    const wrap = document.getElementById("ms_ray-launching-wrap") as HTMLElement;
    const fixedBox = wrap.querySelector(".fixedBox") as HTMLElement;
    const sectionSlideBox = wrap.querySelector(".sectionSlideBox") as HTMLElement;
    const sections = sectionSlideBox.querySelectorAll(".section") as NodeListOf<HTMLElement>;

    const container = wrap.querySelector(".ms_container") as HTMLElement;
    const listItems = wrap.querySelectorAll(".fixedBox .listBox ul > li") as NodeListOf<HTMLElement>;

    // menuBtn
    const menuBtn = wrap.querySelector(".menuBtn") as HTMLElement;
    const menu = wrap.querySelector(".menuBox") as HTMLElement;
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("on");
        menuBtn.classList.toggle("on");
    });

    // menu item click -> slide
    const menuItems = wrap.querySelectorAll(".menuBox .menuList > li") as NodeListOf<HTMLElement>;
    menuItems.forEach((v, i) => {
        v.addEventListener("click", () => {
            func.slideTo(sections, listItems, i);
            menu.classList.toggle("on");
            menuBtn.classList.toggle("on");
        });
    });

    // sections 스크롤 슬라이드
    ["scroll", "mousewheel", "wheel"].forEach((v) => {
        container.addEventListener(v, (e) => {
            if (menu.classList.contains("on")) return;
            e.preventDefault();
            const isUp = func.scrollDirectionIsUp(e);
            if (isUp) {
                func.slideDown(sections, listItems);
            } else {
                func.slideUp(sections, listItems);
            }
        });
    });

    let startY = 0;
    container.addEventListener("touchstart", (e) => {
        startY = e.touches[0].clientY;
    });

    container.addEventListener("touchmove", (e) => {
        e.preventDefault();
    });

    container.addEventListener("touchend", (e) => {
        const endY = e.changedTouches[0].clientY;
        if (endY - startY > 50) {
            func.slideDown(sections, listItems);
        } else if (endY - startY < -50) {
            func.slideUp(sections, listItems);
        }
    });

    // section list click -> slide
    listItems.forEach((v, i) => {
        v.addEventListener("click", () => {
            func.slideTo(sections, listItems, i);
        });
    });

    // section1 followCursorBtn
    const followCursorBtn = wrap.querySelector(".followCursorBtn") as HTMLElement;
    const followCursorBtnCircle = followCursorBtn.querySelector(".circleBox") as HTMLElement;
    followCursorBtn.addEventListener("click", () => {
        // youtube open
    });

    wrap.addEventListener("mousemove", (e) => {
        if (window.innerWidth < 1024) return;
        followCursorBtn.style.top = `${e.clientY}px`;
        followCursorBtn.style.left = `${e.clientX}px`;
        followCursorBtnCircle.style.transform = `rotateZ(${e.clientY + e.clientX}deg)`;
    });

    // gallery
    const galleryDiv = wrap.querySelector(".galleryBox > div") as HTMLElement;
    const gallery = wrap.querySelector(".gallery") as HTMLElement;
    const galleryItems = gallery.querySelectorAll("li") as NodeListOf<HTMLElement>;

    // gallery position
    const galleryRangeStart = galleryItems[0].offsetWidth * 0.5;
    const galleryRangeEnd = gallery.offsetWidth - galleryItems[galleryItems.length - 1].offsetWidth * 0.5;
    const galleryRange = galleryRangeEnd - galleryRangeStart;

    gallery.style.transform = `translateX(-${galleryRangeStart}px)`;
    galleryDiv.style.transform = `translateY(-${gallery.offsetHeight * 0.5}px)`;

    // gallery interaction
    const controlBox = wrap.querySelector(".controlBox") as HTMLElement;
    const controller = wrap.querySelector(".controller") as HTMLElement;
    const dragIcon = controlBox.querySelector(".dragIcon") as HTMLElement;
    const galleryMainText = sections[0].querySelector(".copywritingBox .main") as HTMLElement;

    function controllerDrag(left: number) {
        const rangeEnd = controlBox.offsetWidth - controller.offsetWidth;
        const nextLeft = left > rangeEnd ? rangeEnd : left < 1 ? 0 : left;
        const percentage = Number((nextLeft / rangeEnd).toFixed(2));

        controller.style.left = `${nextLeft}px`;
        gallery.style.transform = `translateX(-${Math.floor(galleryRange * percentage) + galleryRangeStart}px)`;

        if (nextLeft === 0) {
            dragIcon.classList.add("on");
            galleryMainText.classList.add("on");
        } else {
            dragIcon.classList.remove("on");
            galleryMainText.classList.remove("on");
        }
    }

    controlBox.addEventListener("click", (e) => {
        controllerDrag(e.offsetX - controller.offsetWidth * 0.5);
    });

    let dragging = false;
    controlBox.addEventListener("mousedown", () => {
        dragging = true;
    });
    sections[0].addEventListener("mouseup", () => {
        dragging = false;
    });
    sections[0].addEventListener("mousemove", (e) => {
        if (!dragging) return;
        const left =
            e.clientX -
            ((controlBox.parentElement as HTMLElement).offsetLeft -
                (controlBox.parentElement as HTMLElement).offsetWidth * 0.5) -
            100 -
            controller.offsetWidth * 0.5;
        controllerDrag(left);
    });

    controlBox.addEventListener("touchstart", () => {
        dragging = true;
    });
    sections[0].addEventListener("touchend", () => {
        dragging = false;
    });
    sections[0].addEventListener("touchmove", (e) => {
        if (!dragging) return;
        const left =
            e.changedTouches[0].clientX -
            ((controlBox.parentElement as HTMLElement).offsetLeft -
                (controlBox.parentElement as HTMLElement).offsetWidth * 0.5) -
            100 -
            controller.offsetWidth * 0.5;
        controllerDrag(left);
    });

    // mobile section0 movieList touch
    const movieListItems = sections[2].querySelectorAll(".movieList > li") as NodeListOf<HTMLElement>;
    movieListItems.forEach((v) => {
        v.addEventListener("click", () => {
            movieListItems.forEach((v1) => {
                v1.classList.remove("on");
            });
            v.classList.add("on");
        });
    });

    // modal
    const movieBox = wrap.querySelector(".moviePopup") as HTMLElement;
    const movieBtns = wrap.querySelectorAll(".movieBtn") as NodeListOf<HTMLElement>;
    const movieIframe = document.getElementById("iframeDiv") as HTMLIFrameElement;
    const moviePopupCloseBtn = wrap.querySelector(".moviePopup .moviePopupCloseBtn") as HTMLIFrameElement;
    const movieDesBox = wrap.querySelector(".descriptionBox") as HTMLElement;
    const movieDes = wrap.querySelectorAll(
        ".moviePopup .descriptionTitle > div, .moviePopup .descriptionContent > div"
    ) as NodeListOf<HTMLElement>;

    movieBtns.forEach((v) => {
        v.addEventListener("click", () => {
            setTimeout(
                () => {
                    movieBox.classList.add("on");
                    const source = v.dataset.movie;
                    movieIframe.src = `https://www.youtube.com/embed/${source}?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer`;

                    movieDesBox.classList.remove("on");
                    movieDes.forEach((v) => {
                        v.classList.remove("on");
                        if (v.classList.contains(`${source}`)) {
                            v.classList.add("on");
                            movieDesBox.classList.add("on");
                        }
                    });
                },
                v.classList.contains("mo_delay") ? 400 : 0
            );
        });
    });

    moviePopupCloseBtn.addEventListener("click", () => {
        movieBox.classList.remove("on");
        movieIframe.src = "";
    });

    const modalWrapper = wrap.querySelector(".modalWrapper") as HTMLElement;
    const modalScrollBox = wrap.querySelector(".contentDiv") as HTMLElement;
    const galleryBtn = wrap.querySelector(".galleryBtn") as HTMLElement;

    // 모바일 브라우저 상단 navigation공간까지 합해서 vh를 계산하기 위해 사용
    // css에서 다음과 같이 사용 -> height: var(--vh);
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    // 앵커
    const hash = window.location.hash.slice(1);
    const sectionsName = ["tvc", "designFilm", "gallery"];
    if (sectionsName.some((v) => v === hash)) {
        const index = sectionsName.indexOf(hash);
        func.slideTo(sections, listItems, index);
    }

    // init animation
    func.animate(fixedBox);
    func.animate(sections[2]);
};
