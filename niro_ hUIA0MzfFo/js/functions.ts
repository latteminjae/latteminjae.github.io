import gsap, { TweenMax } from "gsap";

// type === "intro" && typeof index === "number" 인 케이스는 없다.
export function animate(type: "intro" | HTMLElement, index?: number) {
    if (type === "intro" && index === undefined) {
        const bg = document.querySelector("#ms_niro-prelaunching-wrap .mainBg .tween1") as HTMLElement;
        const tweens = document.querySelectorAll("#ms_niro-prelaunching-wrap .introSection .tween1");

        TweenMax.to(bg, 0.5, {
            opacity: 0.5,
            top: 0,
            delay: 0.25,
        });

        TweenMax.staggerTo(
            tweens,
            0.9,
            {
                opacity: 1,
                top: 0,
                delay: 1.2,
            },
            0.4
        );

        return;
    }

    if (type !== "intro") {
        let tweens = type.querySelectorAll(".tween1") as NodeListOf<HTMLElement>;

        // film 모바일의 경우 아이템 애니메이션 순서가 바뀌어서 별도분기 작성.
        if (type.querySelector(".movieBox") && window.innerWidth < 1025) {
            const title = ".sectionTitle.tween1";
            const lastItem = ".sectionContent > .flex > .row:last-of-type .tween1";
            const otherItem = ".sectionContent > .flex > .row:first-of-type .tween1";

            tweens = type.querySelectorAll(`${title}, ${lastItem}`);
            const tweens2 = type.querySelectorAll(otherItem);

            TweenMax.staggerTo(
                [tweens, tweens2],
                0.5,
                {
                    opacity: 1,
                    top: 0,
                },
                0.3
            );

            return;
        }

        TweenMax.staggerTo(
            tweens,
            0.5,
            {
                opacity: 1,
                top: 0,
            },
            0.3
        );
    }
}
