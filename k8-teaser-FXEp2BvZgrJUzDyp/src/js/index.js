window.onload = function () {
	sectionOnOff(0, true);
	setTimeout(function () {
		sectionOnOff(0, false);
		setTimeout(function () {
			sectionOnOff(1, true);
		}, 2000);
	}, 9000);
};

// youtube
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('iframe-div', {
		height: '720',
		width: '1280',
		videoId: 'reQwksJ-yjU',
		events: {
			// onReady: onPlayerReady,
			// onStateChange: onPlayerStateChange,
		},
	});
}

// section on/off -----------------------------------------
const sections = document.querySelectorAll('#content > section');
function sectionOpen(num) {
	for (let i = 0; i < sections.length; i++) {
		if (!sections[i].classList.contains('hide')) {
			sections[i].classList.add('hide');
		}
	}
	sections[num].classList.remove('hide');
}

// text에 각 글자마다 span입히는 함수
// tweenMax로 한글자씩 transition하기 위해 span을 입힌다.
function wrapSpan(txt) {
	// (txt : String) : String {}
	return txt
		.split('')
		.map((v) => (v !== ' ' ? `<span>${v}</span>` : v))
		.join('');
}
const pBoxP = document.querySelectorAll('.ms-section0 .p-box p, .ms-section1 .p-box p, .ms-section3 .p-box p');
for (let i = 0; i < pBoxP.length; i++) {
	pBoxP[i].innerHTML = wrapSpan(pBoxP[i].innerHTML);
}

// section0 on/off ----------------------------------------
function sectionOnOff(num, on) {
	// (num : number 0 ~ 3, on : boolean) : void
	if (num > 3 || num < 0) {
		console.error('sectionOnOff - num의 숫자가 크거나 작음');
		return;
	}

	// section0
	if (num === 0) {
		if (on) {
			sectionOpen(0);
			TweenMax.to('.ms-section0 .logo img', 1, { opacity: '1' });
			TweenMax.staggerFromTo(
				'.ms-section0 .p-box p span',
				0.5,
				{ top: '-20px', opacity: 0 },
				{ top: 0, opacity: 1, delay: 1.2 },
				0.1
			);
			TweenMax.to('.ms-section0 .bg-wrap img', 2, { transform: 'translateZ(600px)', delay: 3 });
		} else {
			TweenMax.to('.ms-section0 .bg-wrap img', 1, { opacity: 0 });
			TweenMax.to('.ms-section0 .p-box p:last-child', 1, { left: '500px', opacity: 0 });
			TweenMax.to('.ms-section0 .p-box p:first-child', 1, { left: '-700px', opacity: 0 });
			TweenMax.to('.ms-section0 .logo img', 1, { opacity: 0 });
		}
	}
	// section1
	else if (num === 1) {
		if (on) {
			sectionOpen(1);

			// 전체 화면
			TweenMax.to('.ms-section1', 1.5, { top: 0, ease: 'ease-in' });

			// back, skip
			TweenMax.to('.ms-section1 .top-box', 0.5, { left: '0px', ease: 'ease-in', delay: 2 });
			TweenMax.to('.ms-section1 .bottom-box', 0.5, { right: '0px', ease: 'ease-in', delay: 2.3 });

			// p-box
			TweenMax.staggerTo('.ms-section1 .p-box p span', 0.5, { left: 0, opacity: 1, delay: 3 }, 0.1);

			// bg, num, keypad

			// FIXME 이거 pc, mobile 구분해서 좌우에서 이미지 들어오도록??
			TweenMax.staggerTo('.ms-section1 .bg-wrap img', 1, { top: '0', opacity: 1, delay: 6 }, 0.5);

			TweenMax.staggerTo('.ms-section1 .input-box>ul>li', 1, { opacity: 1, delay: 7 }, 0.2);
			TweenMax.staggerTo('.ms-section1 .num-pad>ul>li', 1, { delay: 10, opacity: 1 }, 0.1);
		} else {
			// back, skip 버튼
			TweenMax.to('.ms-section1 .top-box', 0.5, { left: '2000px', ease: 'ease-out' });
			TweenMax.to('.ms-section1 .bottom-box', 0.5, { right: '2000px', ease: 'ease-out' });

			// p-box
			TweenMax.to('.ms-section1 .p-box p:first-child', 0.5, { left: '1600px', ease: 'ease-out', delay: 0.5 });
			TweenMax.to('.ms-section1 .p-box p:last-child', 0.5, { left: '-1600px', ease: 'ease-out', delay: 0.5 });

			// num, keypad, bg
			TweenMax.staggerTo(
				'.ms-section1 .num-pad>ul>li, .ms-section1 .input-box>ul>li, .ms-section1 .bg-wrap img',
				1,
				{ opacity: 0, delay: 1.5 },
				0.1
			);
		}
	}
	// section2
	else if (num === 2) {
		if (on) {
			sectionOpen(2);
			playerplayVideo();
		} else {
			player.stopVideo();
		}
	}
	// section3
	else if (num === 3) {
		if (on) {
			sectionOpen(3);
			TweenMax.to('.ms-section3', 1, { top: 0, ease: 'ease-in' });
			TweenMax.staggerTo('.ms-section3 .timer-wrap span', 0.3, { bottom: 0, opacity: 1, ease: 'ease-in' }, -0.1);
			TweenMax.staggerTo('.ms-section3 .p-box span', 0.1, { opacity: 1, delay: 1.5 }, 0.1);
			TweenMax.to('.ms-section3 .owl-carousel', 2, { opacity: 1, delay: 5 });
			TweenMax.to('.ms-section3 .btn-wrap', 1, { opacity: 1, bottom: 0, delay: 4 });
		} else {
			TweenMax.to('.ms-section3 .btn-wrap', 0.5, { opacity: 0 });

			TweenMax.to('.ms-section3 .owl-carousel', 1, { opacity: 0, delay: 0.5 });

			TweenMax.to('.ms-section3', 1, { top: '200px', delay: 1 });
			TweenMax.to('.ms-section3 .timer-wrap, .ms-section3 .p-box', 1, { top: '30px', opacity: 0, delay: 1 });
		}
	}
}

// gate - 숫자패드 클릭 이벤트
let count = 0;
const nums = document.querySelectorAll('.num-pad>ul>li>button');
const numCursor = document.querySelector('.num-wrap .input-box>ul>li:nth-child(5)>span');

for (let i = 0; i < nums.length; i++) {
	(function (ind) {
		nums[ind].addEventListener('click', function (e) {
			if (e.target.classList.contains('on')) {
				return;
			} else {
				// e.target.classList.add('on')
				e.target.style.animation = '.7s alternate testAni ';
				setTimeout(function () {
					e.target.style.animation = '';
				}, 700);
			}

			// 8클릭시
			if (nums[ind].innerHTML === '8') {
				numCursor.innerHTML = '8';
				return;
			}

			count++;
			// 8이 4개 이상일 경우 티저영상페이지로 넘어가는 이벤트
			if (count >= 3) {
				sectionOnOff(1, false);
				setTimeout(function () {
					sectionOnOff(2, true);
				}, 2600);
				return;
			}

			// 좌측 커서엔 클릭한 숫자로, 클릭한 숫자패드는 8로 변경
			// TODO 좌측커서에 숫자바뀌는걸 이펙트를 줘야하나
			numCursor.innerHTML = nums[ind].innerHTML;
			e.target.innerHTML = '8';
		});

		// nums[ind].addEventListener('transitionend', function (e) {
		// e.target.
		// });
	})(i);
}

// section2 youtube

// TODO
// section1 back, skip
// section2 close mute
// section3 다시보기(section2로), 처음으로(section0으로)

// section2 mute btn
const muteBtn = document.querySelector('.ms-section2 button.bottom-right');
const muteBtnSpan = document.querySelector('.ms-section2 button.bottom-right span');
let muteBtnInterval = null;
function muteBtnFunc() {
	switch (muteBtn.children[0].style.backgroundPosition) {
		case 'left center':
			muteBtn.children[0].style.backgroundPosition = 'center center';
			break;
		case 'center center':
			muteBtn.children[0].style.backgroundPosition = 'right center';
			break;
		case 'right center':
			muteBtn.children[0].style.backgroundPosition = 'left center';
			break;
		default:
			muteBtn.children[0].style.backgroundPosition = 'right center';
	}
}
muteBtn.addEventListener('mouseover', function (e) {
	if (muteBtnSpan.classList.contains('off')) {
		return;
	}
	muteBtnSpan.style.backgroundPosition = 'left center';
	muteBtnInterval = setInterval(muteBtnFunc, 300);
});
muteBtn.addEventListener('mouseout', function (e) {
	if (muteBtnSpan.classList.contains('off')) {
		return;
	}

	muteBtnSpan.style.backgroundPosition = 'right';
	clearInterval(muteBtnInterval);
});
muteBtn.addEventListener('click', function (e) {
	// TODO mute off이미지 활성화, youtube api - sound off
});

// section3 타이머
const timerP = document.querySelectorAll('.ms-section3 .timer-wrap>p:first-child span');
const openDate = new Date('2021-03-10T00:00:00').getTime();
function getDTime() {
	const timer = (openDate - Date.now()) / 1000;

	let sec = Math.floor(timer % 60).toString();
	let min = Math.floor((timer / 60) % 60)
		.toString()
		.slice(0, 2);
	let hor = Math.floor((timer / 60 / 60) % 24)
		.toString()
		.slice(0, 2);
	const day = Math.floor(timer / 60 / 60 / 24);

	sec.length < 2 ? (sec = '0' + sec) : null;
	min.length < 2 ? (min = '0' + min) : null;
	hor.length < 2 ? (hor = '0' + hor) : null;

	timerP[0].innerHTML = day;
	timerP[1].innerHTML = hor;
	timerP[2].innerHTML = min;
	timerP[3].innerHTML = sec;
}
setInterval(getDTime, 500);

// section3 owl slide
$('.owl-carousel').owlCarousel({
	loop: true,
	margin: 80,
	center: true,
	nav: true,
	autoWidth: true,
	autoplay: true,
	autoplayTimeout: 6000,
	autoplaySpeed: 6000,
	slideTransition: 'linear',
	navSpeed: 2000,
	navText: ['<span class="slide-btn prev"></span>', '<span class="slide-btn next"></span>'],
	responsiveClass: true,
	responsive: {
		0: {
			items: 1,
		},
		1025: {
			items: 3,
		},
	},
});
