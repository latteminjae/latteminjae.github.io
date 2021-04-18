import * as ScrollMagic from "scrollmagic";
import gsap, { TweenMax, TimelineMax, TweenLite } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
import Lozad from "lozad";
import "./polyfill";
declare var window: Window_;
gsap.registerPlugin(ScrollToPlugin);

TweenLite.defaultOverwrite = false;
ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

// variables --------------------------------------------------------------------
const isMobile =
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
        ? true
        : false;

let isIe = false;
const agent = navigator.userAgent.toLowerCase();
if (
    (navigator.appName == "Netscape" && agent.indexOf("trident") != -1) ||
    agent.indexOf("msie") != -1
) {
    // ie일 경우
    isIe = true;
}

let contentBox: HTMLElement;
let sections: NodeListOf<HTMLElement>;
let menuBox: HTMLElement;
let modalWrapper: HTMLElement;
let modalBg: HTMLElement;
let topstachBox: HTMLElement;

let youtubeIframe: HTMLIFrameElement;
let menuBtns: NodeListOf<HTMLElement>;
let menuItemBtns: NodeListOf<HTMLElement>;
let menuCloseBtn: HTMLElement;
let movieBtns: NodeListOf<HTMLElement>;
let section5Btns: NodeListOf<HTMLElement>;
let topBtn: HTMLElement;

// functions --------------------------------------------------------------

// 상단 메뉴소환탭 온오프
function topstachOnOff() {
    if (contentBox.scrollTop > sections[0].offsetHeight) {
        if (!topstachBox.classList.contains("on")) {
            topstachBox.classList.add("on");
        }
    } else {
        if (topstachBox.classList.contains("on")) {
            topstachBox.classList.remove("on");
        }
    }
}

// 스크롤 이동
function goScroll(sectionNum: number) {
    gsap.to(contentBox, {
        duration: 0.6,
        scrollTo: sections[sectionNum].offsetTop,
    });
    itemAnimation("section0");
}

// section5 컨텐츠 변경
function section5ChangeContent(mode: "mode1" | "mode2" | "mode3") {
    const classList1 = sections[5].classList[1];
    sections[5].classList.remove(classList1);
    sections[5].classList.add(mode);
    TweenMax.fromTo(
        [`#ms_k3-launching-wrap .msSection5 > .bgBox img.${mode}`],
        1.5,
        {
            opacity: 0,
        },
        {
            opacity: 1,
        }
    );
}

// item animation
function itemAnimation(section: string, direction?: boolean): void {
    // (section : section0 || section1 || gallery) :void

    // FIXME mo pc 체크

    if (section === "section0") {
        TweenMax.staggerFromTo(
            [
                "#ms_k3-launching-wrap .msSection0 .movieBox > img",
                "#ms_k3-launching-wrap .msSection0 .movieBox > p",
                "#ms_k3-launching-wrap .msSection0 .pBox .logo",
                "#ms_k3-launching-wrap .msSection0 .navBtn",
                "#ms_k3-launching-wrap .msSection0 .rightBox",
                "#ms_k3-launching-wrap .msSection0 .movieBox .scrollAniBox p",
                "#ms_k3-launching-wrap .msSection0 .movieBox .scrollAniBox span",
                "#ms_k3-launching-wrap .msSection0 .pBox .btnBox a",
            ],
            1,
            {
                opacity: 0,
                top: -20,
            },
            {
                opacity: 1,
                top: 0,
            },
            0.2
        );
    } else if (section === "section1") {
        if (direction) {
            TweenMax.staggerFromTo(
                ["#ms_k3-launching-wrap .msSection1 .bgBox p"],
                0.5,
                {
                    opacity: 0,
                    top: -140,
                },
                {
                    opacity: 1,
                    top: 0,
                },
                0.3
            );
            TweenMax.staggerFromTo(
                ["#ms_k3-launching-wrap .msSection1 .itemList .itemBox"],
                0.7,
                {
                    opacity: 0,
                    top: -40,
                },
                {
                    opacity: 1,
                    top: 0,
                    delay: 1.4,
                },
                0.4
            );
        } else {
            TweenMax.staggerFromTo(
                ["#ms_k3-launching-wrap .msSection1 .bgBox p"],
                1,
                {
                    opacity: 1,
                    top: 0,
                },
                {
                    opacity: 0,
                    top: -140,
                },
                0.4
            );
            TweenMax.staggerFromTo(
                ["#ms_k3-launching-wrap .msSection1 .itemList .itemBox"],
                1,
                {
                    opacity: 1,
                    top: 0,
                    delay: 0.4,
                },
                {
                    opacity: 0,
                    top: -40,
                },
                0.4
            );
        }
    } else if (
        section === "section2" ||
        section === "section3" ||
        section === "section4"
    ) {
        const sNum = section.slice(-1);
        if (direction) {
            TweenMax.fromTo(
                `#ms_k3-launching-wrap .msSection${sNum} .bgBox`,
                1,
                {
                    opacity: 0,
                    top: 400,
                },
                {
                    opacity: 1,
                    top: 0,
                }
            );
            TweenMax.staggerFromTo(
                [
                    `#ms_k3-launching-wrap .msSection${sNum} > .pBox p`,
                    `#ms_k3-launching-wrap .msSection${sNum} > .pBox img`,
                    `#ms_k3-launching-wrap .msSection${sNum} > .pBox button`,
                    `#ms_k3-launching-wrap .msSection${sNum} .itemList .itemBox`,
                ],
                1,
                {
                    opacity: 0,
                    top: -50,
                },
                {
                    opacity: 1,
                    top: 0,
                },
                0.2
            );
        } else {
            TweenMax.fromTo(
                `#ms_k3-launching-wrap .msSection${sNum} .bgBox`,
                1,
                {
                    opacity: 1,
                    top: 0,
                },
                {
                    opacity: 0,
                    top: 400,
                }
            );
            TweenMax.staggerFromTo(
                [
                    `#ms_k3-launching-wrap .msSection${sNum} > .pBox p`,
                    `#ms_k3-launching-wrap .msSection${sNum} > .pBox img`,
                    `#ms_k3-launching-wrap .msSection${sNum} > .pBox button`,
                    `#ms_k3-launching-wrap .msSection${sNum} .itemList .itemBox`,
                ],
                1,
                {
                    opacity: 1,
                    top: 0,
                },
                {
                    opacity: 0,
                    top: -50,
                },
                0.2
            );
        }
    } else if (section === "section5") {
        const mode = sections[5].classList[1];
        if (direction) {
            // TweenMax.fromTo(
            //     `#ms_k3-launching-wrap .msSection5 > .bgBox img.${mode}`,
            //     1,
            //     {
            //         opacity: 0,
            //         top: 400,
            //     },
            //     {
            //         opacity: 1,
            //         top: 0,
            //     }
            // );
            TweenMax.staggerFromTo(
                [
                    `#ms_k3-launching-wrap .msSection5 > .centerBox > .pBox p.${mode}`,
                    `#ms_k3-launching-wrap .msSection5 > .centerBox > .pBox p.p2`,
                    `#ms_k3-launching-wrap .msSection5 > .centerBox > .btnBox button`,
                    `#ms_k3-launching-wrap .msSection5 > .centerBox > .itemList.${mode} .itemBox`,
                ],
                1,
                {
                    opacity: 0,
                    top: -50,
                },
                {
                    opacity: 1,
                    top: 0,
                },
                0.2
            );
        } else {
            // TweenMax.fromTo(
            //     `#ms_k3-launching-wrap .msSection5 > .bgBox img.${mode}`,
            //     1,

            //     {
            //         opacity: 1,
            //         top: 0,
            //     },
            //     {
            //         opacity: 0,
            //         top: 400,
            //     }
            // );
            TweenMax.staggerFromTo(
                [
                    `#ms_k3-launching-wrap .msSection5 > .centerBox > .pBox p.${mode}`,
                    `#ms_k3-launching-wrap .msSection5 > .centerBox > .pBox p.p2`,
                    `#ms_k3-launching-wrap .msSection5 > .centerBox > .btnBox button`,
                    `#ms_k3-launching-wrap .msSection5 > .centerBox > .itemList.${mode} .itemBox`,
                ],
                1,
                {
                    opacity: 1,
                    top: 0,
                },
                {
                    opacity: 0,
                    top: -50,
                },
                0.2
            );
        }
    } else if (section === "section5ModeChange") {
        const mode = sections[5].classList[1];

        TweenMax.staggerFromTo(
            [
                `#ms_k3-launching-wrap .msSection5 > .centerBox > .pBox p.${mode}`,
                `#ms_k3-launching-wrap .msSection5 > .centerBox > .pBox p.p2`,
                `#ms_k3-launching-wrap .msSection5 > .centerBox > .itemList.${mode} .itemBox`,
            ],
            1,
            {
                opacity: 0,
                top: -50,
            },
            {
                opacity: 1,
                top: 0,
            },
            0.2
        );
    } else if (section === "modalWrap") {
    } else if (section === "init") {
        TweenMax.to(["#ms_k3-launching-wrap .msSection1 .bgBox p"], 0, {
            opacity: 0,
            top: -140,
        });
        TweenMax.to(
            ["#ms_k3-launching-wrap .msSection1 .itemList .itemBox"],
            0,
            {
                opacity: 0,
                top: -40,
            }
        );
        TweenMax.to(
            [
                `#ms_k3-launching-wrap .msSection2 .bgBox`,
                `#ms_k3-launching-wrap .msSection3 .bgBox`,
                `#ms_k3-launching-wrap .msSection4 .bgBox`,
            ],
            0,
            {
                opacity: 0,
                top: 400,
            }
        );
        TweenMax.to(
            [
                `#ms_k3-launching-wrap .msSection2 > .pBox p`,
                `#ms_k3-launching-wrap .msSection2 > .pBox img`,
                `#ms_k3-launching-wrap .msSection2 > .pBox button`,
                `#ms_k3-launching-wrap .msSection2 .itemList .itemBox`,
                `#ms_k3-launching-wrap .msSection3 > .pBox p`,
                `#ms_k3-launching-wrap .msSection3 > .pBox img`,
                `#ms_k3-launching-wrap .msSection3 > .pBox button`,
                `#ms_k3-launching-wrap .msSection3 .itemList .itemBox`,
                `#ms_k3-launching-wrap .msSection4 > .pBox p`,
                `#ms_k3-launching-wrap .msSection4 > .pBox img`,
                `#ms_k3-launching-wrap .msSection4 > .pBox button`,
                `#ms_k3-launching-wrap .msSection4 .itemList .itemBox`,
            ],
            0,
            {
                opacity: 0,
                top: -50,
            }
        );
        // TweenMax.to(`#ms_k3-launching-wrap .msSection5 > .bgBox img`, 1, {
        //     opacity: 0,
        //     top: 400,
        // });
        TweenMax.to(
            [
                `#ms_k3-launching-wrap .msSection5 > .centerBox > .pBox p`,
                `#ms_k3-launching-wrap .msSection5 > .centerBox > .pBox p.p2`,
                `#ms_k3-launching-wrap .msSection5 > .centerBox > .btnBox button`,
                `#ms_k3-launching-wrap .msSection5 > .centerBox > .itemList .itemBox`,
            ],
            0,
            {
                opacity: 0,
                top: -50,
            }
        );
    }
}

// 메뉴(nav) 온오프
function menuOnOff(direction: boolean): void {
    if (direction && !menuBox.classList.contains("on")) {
        menuBox.classList.add("on");
        return;
    }
    if (!direction) {
        menuBox.classList.remove("on");
        return;
    }
}

// 갤러리 링크 함수 - #gallery 로 접근
function openGallery() {
    // TODO 필요한가?
}

// youtube open
function youtubeOn(movie: string): void {
    // (movie : close || item1...6 ) : void
    if (movie === "close") {
        modalWrapper.classList.remove("on");
        youtubeIframe.src = "";
    } else {
        modalWrapper.classList.add("on");

        switch (movie) {
            case "prelaunching":
                youtubeIframe.src =
                    "https://www.youtube.com/embed/jpUtyTXFQ94?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer";
                break;
            default:
        }
    }
}

// start ----------------------------------------------------------------
$(document).ready(function (): void {
    // dom declaration ------------------------------------------------------------

    const isMac: boolean =
        navigator.userAgent.match(/Mac/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i)
            ? true
            : false;

    contentBox = document.getElementById("ms_k3-launching-wrap");
    sections = document.querySelectorAll(
        "#ms_k3-launching-wrap .sectionWrap > div"
    );
    topstachBox = document.querySelector(
        "#ms_k3-launching-wrap .menuWrapper .topstach"
    );
    youtubeIframe = document.querySelector("#ms_k3-launching-wrap #iframeDiv");
    menuBox = document.querySelector(
        "#ms_k3-launching-wrap .menuWrapper .menuBox"
    );
    menuCloseBtn = document.querySelector(
        "#ms_k3-launching-wrap .menuWrapper .menuBox .closeBtn"
    );
    topBtn = document.querySelector("#ms_k3-launching-wrap .footer .topBtn");

    menuBtns = document.querySelectorAll("#ms_k3-launching-wrap .menuBtn");
    menuItemBtns = document.querySelectorAll(
        "#ms_k3-launching-wrap .menuWrapper .menuDiv .itemBox"
    );
    modalWrapper = document.querySelector(
        "#ms_k3-launching-wrap .modalWrapper"
    );
    modalBg = document.querySelector(
        "#ms_k3-launching-wrap .modalWrapper .bgDiv"
    );

    movieBtns = document.querySelectorAll("#ms_k3-launching-wrap .movieBtn");
    section5Btns = document.querySelectorAll(
        "#ms_k3-launching-wrap .msSection5 .btnBox button"
    );

    // add event listeners -------------------------------------------
    contentBox.addEventListener("scroll", (e) => {
        topstachOnOff();
    });
    menuBtns.forEach((v) => {
        v.addEventListener("click", () => menuOnOff(true));
    });
    menuItemBtns.forEach((v) => {
        v.addEventListener("click", () => {
            menuOnOff(false);
            goScroll(Number(v.dataset.go));
            if (v.dataset.mode) {
                if (
                    v.dataset.mode === "mode1" ||
                    v.dataset.mode === "mode2" ||
                    v.dataset.mode === "mode3"
                ) {
                    section5ChangeContent(v.dataset.mode);
                }
            }
        });
    });

    let modeChange = false;
    section5Btns.forEach((v) => {
        v.addEventListener("click", () => {
            if (!modeChange) {
                modeChange = true;
                if (
                    v.dataset.mode === "mode1" ||
                    v.dataset.mode === "mode2" ||
                    v.dataset.mode === "mode3"
                ) {
                    section5ChangeContent(v.dataset.mode);
                    itemAnimation("section5ModeChange");
                }
            }
            setTimeout(() => {
                modeChange = false;
            }, 2000);
        });
    });

    menuCloseBtn.addEventListener("click", () => menuOnOff(false));
    topBtn.addEventListener("click", () => goScroll(0));

    modalBg.addEventListener("click", () => {
        youtubeOn("close");
    });

    movieBtns.forEach((v) => {
        v.addEventListener("click", () => {
            youtubeOn(v.dataset.movie);
        });
    });

    // scroll magic
    const smController = new ScrollMagic.Controller({
        container: "#ms_k3-launching-wrap",
    });

    for (let i = 1; i < sections.length; i++) {
        new ScrollMagic.Scene({
            duration: 0.3,
            triggerElement: sections[i],
        })
            .on("start", function (e) {
                if (
                    (e as any).scrollDirection === "FORWARD" ||
                    (e as any).scrollDirection === "PAUSED"
                ) {
                    itemAnimation(`section${i}`, true);
                } else if ((e as any).scrollDirection === "REVERSE") {
                    itemAnimation(`section${i}`, false);
                }
            })
            .addTo(smController);
    }

    // lazy loading --------------------------------------------
    const observer = Lozad();
    observer.observe();

    if (window.location.hash === "#gallery") {
        openGallery();
    } else {
        itemAnimation("init");
        itemAnimation("section0");
    }
});
