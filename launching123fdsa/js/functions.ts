import { Dom } from "./dom";
import gsap, { TweenMax } from "gsap";

const func = {
    goto: goto,
    navToggle: navToggle,
    closeNode: closeNode,
    section0Scroll: section0Scroll,
    changeTab: changeTab,
    openLayer: openLayer,
    movieOpen: movieOpen,
    animate: animate,
    scrollCheck: scrollCheck,
};

let interval: any = null;

function goto(dom: Dom, goto: string | undefined) {
    const num = Number(goto);
    if (num === 0) {
        dom.sectionWrap.classList.remove("on");
        dom.sections[0].classList.remove("on");
        dom.fixedwrapFoot.classList.add("off");
        dom.sectionScrollBox.scrollTop = 0;
        animate(dom, "section0-0Open");
    } else {
        dom.sectionWrap.classList.add("on");
        dom.fixedwrapFoot.classList.remove("off");
        const st = (dom.sections[num] as HTMLElement).offsetTop - (dom.sections[0] as HTMLElement).offsetHeight;
        dom.sectionScrollBox.scrollTop = st;
        func.animate(dom, "section1Open");
    }

    if (dom.navBox.classList.contains("on")) {
        navToggle(dom);
    }
}

function navToggle(dom: Dom) {
    dom.navBox.classList.toggle("on");
}

let animating = false;
function section0Scroll(dom: Dom) {
    if (animating) {
        return;
    }

    animating = true;

    if (dom.sections[0].classList.contains("on")) {
        dom.sectionWrap.classList.add("on");
        dom.fixedwrapFoot.classList.remove("off");
        func.animate(dom, "section1Open");
        itemMoveClear(dom);
    } else {
        dom.sections[0].classList.add("on");
        func.animate(dom, "section0-1Open");
        setTimeout(() => {
            itemMove(dom);
        }, 1800);
    }

    setTimeout(() => {
        animating = false;
    }, 2000);
}

function closeNode(dom: Dom, target: string | undefined) {
    switch (target) {
        case "nav":
            navToggle(dom);
            break;
        case "layer-0":
            dom.laeyrBox.classList.remove("on");
            break;
        case "modal":
            movieClose(dom);
            break;
    }
}

function changeTab(dom: Dom, tab: string, tabnum: string) {
    if (tab === "0") {
        const prevClass = dom.sections[4].classList[1];
        const nextClass = "open" + tabnum;
        dom.sections[4].classList.remove(prevClass);
        dom.sections[4].classList.add(nextClass);
    }
}

function openLayer(dom: Dom, layer: string, scrollElement: number) {
    dom.laeyrBox.classList.add("on");
    const box = dom.laeyrBox.querySelector(".scrollBox") as HTMLElement;
    const items = dom.laeyrBox.querySelectorAll(".scrollBox li") as NodeListOf<HTMLElement>;
    const scrollTop = items[scrollElement].offsetTop - box.offsetTop;
    box.scrollTop = scrollTop;
}

function animate(dom: Dom, type: string) {
    if (!dom.sectionWrap.classList.contains("on")) {
        if (type !== "section0-0Open" && type !== "section0-1Open" && type !== "fixedwrap") {
            return;
        }
    }
    switch (type) {
        case "fixedwrap":
            TweenMax.staggerTo(
                dom.fixedwrap.querySelectorAll(`
                    .leftBox, .rightBox, .footBox .imgBox, .footBox > p
                `),
                0.7,
                {
                    opacity: 1,
                    top: 0,
                },
                0.2
            );
        case "section0-0Open":
            dom.fixedwrapLeft.classList.remove("blackOn");
            dom.fixedwrapRight.classList.remove("blackOn");
            dom.fixedwrapLine.classList.remove("blackOn");
            dom.fixedwrapFoot.classList.add("off");
            TweenMax.staggerTo(
                (dom.sections[0].querySelector(".section0-0") as HTMLElement).querySelectorAll(`
                    .pBox p,
                    .btnBox a
                `),
                0.4,
                {
                    opacity: 1,
                    top: 0,
                },
                0.15
            );
            TweenMax.staggerTo(
                (dom.sections[0].querySelector(".section0-0") as HTMLElement).querySelectorAll(`
                    .tween2
                `),
                0.4,
                {
                    opacity: 1,
                },
                0.15
            );
            break;
        case "section0-1Open":
            dom.fixedwrapLeft.classList.remove("blackOn");
            dom.fixedwrapRight.classList.remove("blackOn");
            dom.fixedwrapLine.classList.remove("blackOn");
            dom.fixedwrapFoot.classList.remove("off");
            dom.fixedwrapFoot.classList.remove("blackOn");
            TweenMax.staggerTo(
                (dom.sections[0].querySelector(".section0-1") as HTMLElement).querySelectorAll(`
                    .tween1
                `),
                0.8,
                {
                    opacity: 1,
                    top: 0,
                    delay: 1.5,
                },
                0.3
            );
            TweenMax.staggerTo(
                (dom.sections[0].querySelector(".section0-1") as HTMLElement).querySelectorAll(`
                    .tween2
                `),
                0.8,
                {
                    opacity: 1,
                },
                0.15
            );
            TweenMax.staggerTo(
                (dom.sections[0].querySelector(".section0-1") as HTMLElement).querySelectorAll(`
                    .tween3
                `),
                1,
                {
                    opacity: 0.2,
                    delay: 0.5,
                },
                0.3
            );
            TweenMax.staggerTo(
                (dom.sections[0].querySelector(".section0-1") as HTMLElement).querySelectorAll(`
                    .tween4
                `),
                1,
                {
                    opacity: 0.2,
                    top: 0,
                    delay: 0.5,
                },
                0.25
            );
            break;
        case "section1Open":
            if (dom.sectionScrollBox.offsetWidth < 1025) {
                dom.fixedwrapLeft.classList.add("blackOn");
                dom.fixedwrapRight.classList.add("blackOn");
                dom.fixedwrapLine.classList.add("blackOn");
                dom.fixedwrapFoot.classList.remove("off");
            } else {
                dom.fixedwrapLeft.classList.add("blackOn");
                dom.fixedwrapRight.classList.remove("blackOn");
                dom.fixedwrapLine.classList.add("blackOn");
                dom.fixedwrapFoot.classList.remove("off");
            }

            TweenMax.staggerTo(
                dom.sections[1].querySelectorAll(`
                    .tween1
                `),
                0.8,
                {
                    opacity: 1,
                    top: 0,
                    delay: 0.5,
                },
                0.15
            );
            TweenMax.staggerTo(
                dom.sections[1].querySelectorAll(`
                    .tween2
                `),
                1.5,
                {
                    opacity: 1,
                    delay: 0.7,
                },
                0.15
            );
            break;
        case "section1Close":
            TweenMax.to(
                dom.sections[1].querySelectorAll(`
                    .tween1
                `),
                0.6,
                {
                    opacity: 1,
                    top: 0,
                }
            );
            TweenMax.to(
                dom.sections[1].querySelectorAll(`
                    .tween2
                `),
                0.6,
                {
                    opacity: 0,
                }
            );
            break;
        case "section2Open":
            TweenMax.staggerTo(
                dom.sections[2].querySelectorAll(`
                        .tween1
                    `),
                0.6,
                {
                    opacity: 1,
                    top: 0,
                },
                0.15
            );
            TweenMax.staggerTo(
                dom.sections[2].querySelectorAll(`
                        .tween2
                    `),
                0.6,
                {
                    opacity: 1,
                },
                0.15
            );
            break;
        case "section2Close":
            TweenMax.to(
                dom.sections[2].querySelectorAll(`
                        .tween1
                    `),
                0.6,
                {
                    opacity: 0,
                    top: -50,
                }
            );
            TweenMax.to(
                dom.sections[2].querySelectorAll(`
                        .tween2
                    `),
                0.6,
                {
                    opacity: 0,
                }
            );
            break;
        case "section3Open":
            TweenMax.staggerTo(
                dom.sections[3].querySelectorAll(`
                            .tween1
                        `),
                0.6,
                {
                    opacity: 1,
                    top: 0,
                },
                0.15
            );
            TweenMax.staggerTo(
                dom.sections[3].querySelectorAll(`
                            .tween2
                        `),
                0.7,
                {
                    opacity: 1,
                    delay: 1.1,
                },
                0.15
            );
            break;
        case "section3Close":
            TweenMax.to(
                dom.sections[3].querySelectorAll(`
                            .tween1
                        `),
                0.6,
                {
                    opacity: 0,
                    top: -50,
                }
            );
            TweenMax.to(
                dom.sections[3].querySelectorAll(`
                            .tween2
                        `),
                0.6,
                {
                    opacity: 0,
                }
            );
            break;
        case "section4Open":
            TweenMax.staggerTo(
                dom.sections[4].querySelectorAll(`
                                .tween1
                            `),
                0.6,
                {
                    opacity: 1,
                    top: 0,
                },
                0.15
            );
            TweenMax.staggerTo(
                dom.sections[4].querySelectorAll(`
                                .tween2
                            `),
                0.7,
                {
                    opacity: 1,
                    delay: 0.4,
                },
                0.15
            );
            break;
        case "section4Close":
            TweenMax.to(
                dom.sections[4].querySelectorAll(`
                                .tween1
                            `),
                0.6,
                {
                    opacity: 0,
                    top: -50,
                }
            );
            TweenMax.to(
                dom.sections[4].querySelectorAll(`
                                .tween2
                            `),
                0.6,
                {
                    opacity: 0,
                }
            );
            break;
        case "section5Open":
            TweenMax.staggerTo(
                dom.sections[5].querySelectorAll(`
                                    .tween1
                                `),
                0.6,
                {
                    opacity: 1,
                    top: 0,
                },
                0.15
            );
            TweenMax.staggerTo(
                dom.sections[5].querySelectorAll(`
                                    .tween2
                                `),
                0.7,
                {
                    opacity: 1,
                    delay: 0.6,
                },
                0.15
            );
            break;
        case "section5Close":
            TweenMax.to(
                dom.sections[5].querySelectorAll(`
                                    .tween1
                                `),
                0.6,
                {
                    opacity: 0,
                    top: -50,
                }
            );
            TweenMax.to(
                dom.sections[5].querySelectorAll(`
                                    .tween2
                                `),
                0.6,
                {
                    opacity: 0,
                }
            );
            break;
        case "section6Open":
            dom.fixedwrapFoot.classList.add("off");
            TweenMax.staggerTo(
                dom.sections[6].querySelectorAll(`
                                        .tween1
                                    `),
                0.6,
                {
                    opacity: 1,
                    top: 0,
                },
                0.15
            );
            TweenMax.staggerTo(
                dom.sections[6].querySelectorAll(`
                                        .tween2
                                    `),
                0.7,
                {
                    opacity: 1,
                },
                0.15
            );
            break;
        case "section6Close":
            TweenMax.to(
                dom.sections[6].querySelectorAll(`
                                        .tween1
                                    `),
                0.6,
                {
                    opacity: 0,
                    top: -50,
                }
            );
            TweenMax.to(
                dom.sections[6].querySelectorAll(`
                                        .tween2
                                    `),
                0.6,
                {
                    opacity: 0,
                }
            );
            break;
    }
}

function scrollCheck(dom: Dom, scrollTop: number) {
    if (dom.sectionScrollBox.offsetWidth < 1025) {
        return;
    }

    let i = 1;
    for (i = 1; i < dom.sections.length; i++) {
        if (scrollTop < dom.sections[i].offsetTop - dom.sectionScrollBox.offsetHeight) {
            i--;
            break;
        }
    }

    switch (i) {
        case 1:
            dom.fixedwrapLeft.classList.add("blackOn");
            dom.fixedwrapRight.classList.remove("blackOn");
            dom.fixedwrapLine.classList.add("blackOn");
            dom.fixedwrapFoot.classList.remove("blackOn");
            break;
        case 2:
            dom.fixedwrapLeft.classList.add("blackOn");
            dom.fixedwrapRight.classList.add("blackOn");
            dom.fixedwrapLine.classList.add("blackOn");
            dom.fixedwrapFoot.classList.remove("off");
            dom.fixedwrapFoot.classList.remove("blackOn");
            break;
        case 3:
            dom.fixedwrapLeft.classList.add("blackOn");
            dom.fixedwrapRight.classList.add("blackOn");
            dom.fixedwrapLine.classList.add("blackOn");
            dom.fixedwrapFoot.classList.remove("off");
            dom.fixedwrapFoot.classList.add("blackOn");
            dom.fixedwrapFoot.classList.add("blackOn");
            break;
        case 4:
            dom.fixedwrapLeft.classList.add("blackOn");
            dom.fixedwrapRight.classList.add("blackOn");
            dom.fixedwrapLine.classList.add("blackOn");
            dom.fixedwrapFoot.classList.add("blackOn");
            dom.fixedwrapFoot.classList.add("blackOn");
            break;
        case 5:
            dom.fixedwrapLeft.classList.add("blackOn");
            dom.fixedwrapRight.classList.add("blackOn");
            dom.fixedwrapLine.classList.add("blackOn");
            dom.fixedwrapFoot.classList.add("blackOn");
            dom.fixedwrapFoot.classList.add("blackOn");
            break;
        case 6:
            dom.fixedwrapLeft.classList.remove("blackOn");
            dom.fixedwrapRight.classList.remove("blackOn");
            dom.fixedwrapLine.classList.remove("blackOn");
            dom.fixedwrapFoot.classList.add("off");
            dom.fixedwrapFoot.classList.remove("blackOn");
            break;
    }
}

function movieOpen(dom: Dom, v: HTMLElement) {
    dom.modalWrapper.classList.add("on");

    const type = v.dataset.movie;
    switch (type) {
        case "launching1":
            dom.youtubeIframe.src =
                "https://www.youtube.com/embed/VQoLSaZwH20?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer";
            break;
    }
}

function movieClose(dom: Dom) {
    dom.modalWrapper.classList.remove("on");
    dom.youtubeIframe.src = "";
}

function itemMove(dom: Dom) {
    interval = setInterval(() => {
        dom.photoItems.forEach((v) => {
            const prev = Number(v.style.top.slice(0, -2));
            v.style.top = prev - 1 + "px";
        });
    }, 100);
}

function itemMoveClear(dom: Dom) {
    clearInterval(interval);
    dom.photoItems.forEach((v) => {
        v.style.top = "50px";
    });
}

export default func;
