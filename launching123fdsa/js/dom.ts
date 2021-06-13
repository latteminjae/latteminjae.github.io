export interface Dom {
    // [propName: string]: NodeListOf<Element> | Element | null;
    wrap: HTMLElement;
    navBtn: HTMLElement;
    navBox: HTMLElement;
    sections: NodeListOf<HTMLElement>;
    sectionWrap: HTMLElement;
    sectionScrollBox: HTMLElement;
    laeyrBox: HTMLElement;
    fixedwrap: HTMLElement;
    fixedwrapLeft: HTMLElement;
    fixedwrapRight: HTMLElement;
    fixedwrapFoot: HTMLElement;
    fixedwrapLine: HTMLElement;
    modalWrapper: HTMLElement;
    modalWrapperBg: HTMLElement;
    youtubeIframe: HTMLIFrameElement;
    photoItems: NodeListOf<HTMLElement>;
    layerBtns: NodeListOf<HTMLElement>;
    gotoBtns: NodeListOf<HTMLElement>;
    movieBtns: NodeListOf<HTMLElement>;
    closeBtns: NodeListOf<HTMLElement>;
    tabBtns: NodeListOf<HTMLElement>;
    videos: NodeListOf<HTMLVideoElement>;
}

export function domInit(): Dom {
    const dom: Dom = {
        wrap: document.getElementById("ms_k9-launching-wrap") as HTMLElement,
        navBtn: document.querySelector("#ms_k9-launching-wrap .navBtn") as HTMLElement,
        navBox: document.querySelector("#ms_k9-launching-wrap .navBox") as HTMLElement,
        sections: document.querySelectorAll("#ms_k9-launching-wrap section"),
        sectionWrap: document.querySelector("#ms_k9-launching-wrap .sectionwrap") as HTMLElement,
        sectionScrollBox: document.querySelector("#ms_k9-launching-wrap .sectionScrollBox") as HTMLElement,
        laeyrBox: document.querySelector("#ms_k9-launching-wrap .layerBox") as HTMLElement,
        fixedwrap: document.querySelector("#ms_k9-launching-wrap .fixedwrap") as HTMLElement,
        fixedwrapLeft: document.querySelector("#ms_k9-launching-wrap .fixedwrap .topBox .leftBox") as HTMLElement,
        fixedwrapRight: document.querySelector("#ms_k9-launching-wrap .fixedwrap .topBox .rightBox") as HTMLElement,
        fixedwrapFoot: document.querySelector("#ms_k9-launching-wrap .fixedwrap .footBox") as HTMLElement,
        fixedwrapLine: document.querySelector("#ms_k9-launching-wrap .fixedwrap .lineBox") as HTMLElement,
        modalWrapper: document.querySelector("#ms_k9-launching-wrap .modalWrapper") as HTMLElement,
        modalWrapperBg: document.querySelector("#ms_k9-launching-wrap .modalWrapper .bgDiv") as HTMLElement,
        youtubeIframe: document.querySelector("#ms_k9-launching-wrap .modalWrapper #iframeDiv") as HTMLIFrameElement,
        photoItems: document.querySelectorAll("#ms_k9-launching-wrap .section0-1 .itemBox > li"),
        layerBtns: document.querySelectorAll("#ms_k9-launching-wrap .layerBtn"),
        gotoBtns: document.querySelectorAll("#ms_k9-launching-wrap .gotoBtn"),
        movieBtns: document.querySelectorAll("#ms_k9-launching-wrap .movieBtn"),
        closeBtns: document.querySelectorAll("#ms_k9-launching-wrap .closeBtn"),
        tabBtns: document.querySelectorAll("#ms_k9-launching-wrap .tabBtn"),
        videos: document.querySelectorAll("#ms_k9-launching-wrap video"),
    };

    return dom;
}
