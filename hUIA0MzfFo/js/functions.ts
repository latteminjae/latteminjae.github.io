import gsap, { TweenMax } from "gsap";

export function animate(elem: HTMLElement, index?: number) {
    const tweens = elem.querySelectorAll(".tween1") as NodeListOf<HTMLElement>;

    TweenMax.staggerTo(
        tweens,
        0.7,
        {
            opacity: 1,
            top: 0,
            delay: 0.5,
        },
        0.45
    );

    if (elem.classList.contains("section1")) {
        setTimeout(() => {
            elem.querySelector(".divider")?.classList.add("on");
        }, 2200);

        const tweens2 = elem.querySelectorAll(".tween2") as NodeListOf<HTMLElement>;
        TweenMax.to(tweens2[0], 0.7, {
            opacity: 1,
            top: 0,
            delay: 2.9,
        });
    }

    if (elem.classList.contains("section2")) {
        const tweens2 = elem.querySelectorAll(".tween2") as NodeListOf<HTMLElement>;

        TweenMax.staggerTo(
            tweens2,
            0.7,
            {
                opacity: 1,
                top: 0,
            },
            0.4
        );

        const dividers = elem.querySelectorAll(".divider") as NodeListOf<HTMLElement>;
        dividers.forEach((v, i) => {
            setTimeout(() => {
                v.classList.add("on");
            }, 1500 + i * 350);
        });
    }
}
