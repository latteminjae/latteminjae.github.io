import gsap, { TweenMax } from "gsap";

export function animate(elem: HTMLElement) {
    const tweens = elem.querySelectorAll(".tween1") as NodeListOf<HTMLElement>;
    const tweens2 = elem.querySelectorAll(".tween2") as NodeListOf<HTMLElement>;

    TweenMax.staggerTo(
        tweens,
        0.7,
        {
            opacity: 1,
            top: 0,
        },
        0.3
    );
    TweenMax.staggerTo(
        tweens2,
        0.7,
        {
            opacity: 1,
            delay: 0.5,
        },
        0.3
    );
}

export function scrollDirectionIsUp(event: any) {
    if (event.wheelDelta) return event.wheelDelta > 0;
    return event.deltaY < 0;
}

function tweenInit() {
    const wrap = document.getElementById("ms_ray-launching-wrap") as HTMLElement;
    const tweens = wrap.querySelectorAll(".sectionSlideBox .tween1") as NodeListOf<HTMLElement>;
    if (!tweens) return;
    tweens.forEach((v) => v.setAttribute("style", ""));
}

let isSliding = false;
export function slideUp(sections: NodeListOf<HTMLElement>, listItems: NodeListOf<HTMLElement>): void {
    if (isSliding) return;

    const length = sections.length;
    if (sections[1].classList.contains("top")) return;

    isSliding = true;
    let index: number = 0;
    for (let i = 0; i < length; i++) {
        if (sections[i].classList.contains("top")) {
            index = i - 1;
            break;
        }
    }

    listItems.forEach((v) => {
        v.classList.remove("on");
    });

    if (index === 0) {
        sections[length - 1 - index].classList.add("top");
        tweenInit();
        animate(sections[length - 2 - index]);
    } else if (index > 0) {
        sections[index].classList.add("top");
        tweenInit();
        animate(sections[index - 1]);
    }

    if (index === 0) {
        listItems[1].classList.add("on");
    } else {
        listItems[length - index].classList.add("on");
    }

    setTimeout(() => {
        isSliding = false;
    }, 1000);
}

export function slideDown(sections: NodeListOf<HTMLElement>, listItems: NodeListOf<HTMLElement>): void {
    if (isSliding) return;

    const length = sections.length;
    if (!sections[length - 1].classList.contains("top")) return;

    isSliding = true;
    let index: number = 0;
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].classList.contains("top")) {
            index = i;
            break;
        }
    }

    listItems.forEach((v) => {
        v.classList.remove("on");
    });

    if (!sections[length - 1].classList.contains("top")) {
        listItems[0].classList.add("on");
    } else {
        listItems[length - index - 1].classList.add("on");
    }

    sections[index].classList.remove("top");
    tweenInit();
    animate(sections[index]);

    setTimeout(() => {
        isSliding = false;
    }, 1000);
}

export function slideTo(sections: NodeListOf<HTMLElement>, listItems: NodeListOf<HTMLElement>, index: number): void {
    if (isSliding) return;

    isSliding = true;
    const sectionIndex = sections.length - 1 - index;

    tweenInit();

    sections.forEach((v, i) => {
        if (i <= sectionIndex) {
            v.classList.remove("top");
        } else {
            v.classList.add("top");
        }
    });

    listItems.forEach((v, i) => {
        if (i === index) {
            v.classList.add("on");
        } else {
            v.classList.remove("on");
        }
    });

    animate(sections[sectionIndex]);

    setTimeout(() => {
        isSliding = false;
    }, 1000);
}
