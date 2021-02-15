var isMobile =
	navigator.userAgent.match(/Android/i) ||
	navigator.userAgent.match(/webOS/i) ||
	navigator.userAgent.match(/iPhone/i) ||
	navigator.userAgent.match(/iPad/i) ||
	navigator.userAgent.match(/iPod/i) ||
	navigator.userAgent.match(/BlackBerry/i) ||
	navigator.userAgent.match(/Windows Phone/i)
		? true
		: false;

window.onload = function () {
	sectionOnOff(0, true);
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
		.map(function (v) {
			return v !== ' ' ? '<span>' + v + '</span>' : v;
		})
		.join('');
}
const pBoxP = document.querySelectorAll('.ms-section1 .p-box p, .ms-section3 .p-box p');
for (let i = 0; i < pBoxP.length; i++) {
	pBoxP[i].innerHTML = wrapSpan(pBoxP[i].innerHTML);
}

// section on/off ----------------------------------------
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
			TweenMax.to('.ms-section0 .logo img', 0.8, { opacity: 1 });
			TweenMax.to('.ms-section0 .p-box p', 0.7, { top: 0, opacity: 1, delay: 0.7 });
			TweenMax.to('.ms-section0 .bg-wrap img', 2, { transform: 'translateZ(600px)', delay: 2 });

			setTimeout(function () {
				sectionOnOff(0, false);
				setTimeout(function () {
					sectionOnOff(1, true);
				}, 1300);
			}, 6000);
		} else {
			TweenMax.to('.ms-section0 .bg-wrap img', 1, { opacity: 0 });
			TweenMax.to('.ms-section0 .p-box p:last-child', 0.5, { top: '-20px', opacity: 0 });
			TweenMax.to('.ms-section0 .p-box p:first-child', 0.5, { top: '-20px', opacity: 0, delay: 0.3 });
			TweenMax.to('.ms-section0 .logo img', 0.5, { opacity: 0 });
			setTimeout(function () {
				TweenMax.to('.ms-section0 .bg-wrap img', 0.1, { opacity: 1, transform: 'translateZ(0px)' });
			}, 1000);
		}
	}
	// section1
	else if (num === 1) {
		if (on) {
			sectionOpen(1);

			// 전체 화면
			TweenMax.fromTo('.ms-section1', 0.8, { top: '100%' }, { top: 0, ease: 'ease-in-out' });

			// back, skip
			TweenMax.fromTo(
				'.ms-section1 .top-box, .ms-section1 .bottom-box',
				0.5,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					ease: 'ease-in',
					delay: 0.8,
				}
			);

			// p-box
			TweenMax.staggerTo('.ms-section1 .p-box p', 0.5, { top: 0, opacity: 1, delay: 1 }, 0.2);

			// FIXME 아직 확정아님
			// TweenMax.staggerTo('.ms-section1 .p-box p:first-child span', 0.5, { top: 0, opacity: 1, delay: 1.2 }, 0.1);
			// TweenMax.to('.ms-section1 .p-box p:last-child', 0.8, { top: 0, opacity: 1, delay: 1.5 });

			// bg, num, keypad
			TweenMax.staggerTo('.ms-section1 .bg-wrap img', 0.3, { top: '0', opacity: 1, delay: 1.5 }, 0.1);

			TweenMax.staggerTo('.ms-section1 .input-box>ul>li', 0.5, { opacity: 1, delay: 1.5 }, 0.1);
			TweenMax.staggerTo('.ms-section1 .num-pad>ul>li', 0.5, { opacity: 1, delay: 1.5 }, 0.1);
		} else {
			// 전체 화면

			// back, skip 버튼
			TweenMax.to('.ms-section1 .top-box', 0.5, { opacity: 0, ease: 'ease-out' });
			TweenMax.to('.ms-section1 .bottom-box', 0.5, { opacity: 0, ease: 'ease-out' });

			// p-box
			TweenMax.staggerTo(
				'.ms-section1 .p-box p:first-child span',
				0.5,
				{ opacity: 0, ease: 'ease-out', delay: 0.3 },
				0.1
			);
			TweenMax.to('.ms-section1 .p-box p:last-child', 0.5, { opacity: 0, ease: 'ease-out', delay: 0.2 });

			// num, keypad, bg
			TweenMax.staggerTo('.ms-section1 .num-pad>ul>li', 1, { opacity: 0 }, 0.1);
			TweenMax.staggerTo('.ms-section1 .input-box>ul>li', 1, { opacity: 0 }, 0.1);
			TweenMax.staggerTo('.ms-section1 .bg-wrap img', 1, { opacity: 0 }, 0.1);

			TweenMax.to('.ms-section1', 0.8, { top: '100%', ease: 'ease-in-out', delay: 1.5 });

			setTimeout(function () {
				document.querySelector('.num-wrap .input-box>ul>li:nth-child(5)>img').src = './static/img/num_q.png';
				TweenMax.to('.ms-section1 .p-box p:first-child span', 0, { opacity: 1 });
				TweenMax.to('.ms-section1 .p-box p', 0, { top: '-20px', opacity: 0 });
				for (let i = 0; i < nums.length; i++) {
					nums[i].children[0].src = './static/img/num_' + (i + 1) + '.png';
				}
			}, 2000);
		}
	}
	// section2
	else if (num === 2) {
		if (on) {
			sectionOpen(2);
			if (!isMobile) {
				player.playVideo();
			}
			muteCheckInterval = setInterval(muteCheckFunc, 100);
		} else {
			sectionOnOff(3, true);
			if (!isMobile) {
				player.stopVideo();
			}
			clearInterval(muteCheckInterval);
		}
	}
	// section3
	else if (num === 3) {
		if (on) {
			sectionOpen(3);
			TweenMax.staggerTo(
				'.ms-section3 .timer-wrap p span',
				0.3,
				{ top: 0, opacity: 1, ease: 'ease-in', delay: 0.3 },
				0.1
			);
			TweenMax.staggerTo('.ms-section3 .p-box p', 0.2, { opacity: 1, top: 0, delay: 1 }, 0.2);
			TweenMax.to('.ms-section3 .btn-wrap', 1, { opacity: 1, bottom: 0, delay: 1.1 });
			TweenMax.to('.ms-section3 .owl-carousel', 3, { opacity: 1, delay: 1.8 });
		} else {
			TweenMax.to('.ms-section3 .btn-wrap', 0.5, { opacity: 0, bottom: '-100px' });
			TweenMax.to('.ms-section3 .timer-wrap span', 0.3, { top: '30px', opacity: 0, delay: 0.3 });
			TweenMax.to('.ms-section3 .p-box p', 0.2, { opacity: 0, top: '20px', delay: 0.3 });
			TweenMax.to('.ms-section3 .owl-carousel', 0.5, { opacity: 0, delay: 0.7 });
		}
	}
}

// gate - 숫자패드 클릭 이벤트
let count = 0;
const nums = document.querySelectorAll('.num-pad>ul>li>button');
const numCursor = document.querySelector('.num-wrap .input-box>ul>li:nth-child(5)>img');

for (let i = 0; i < nums.length; i++) {
	(function (ind) {
		nums[ind].addEventListener('click', function (e) {
			if (e.target.classList.contains('on')) {
				return;
			} else {
				// e.target.classList.add('on')
				nums[ind].style.animation = '.7s alternate testAni';
				setTimeout(function () {
					nums[ind].style.animation = '';
				}, 700);
			}

			// 8클릭시
			if (nums[ind].children[0].src.slice(-5, -4) === '8') {
				numCursor.src = './static/img/num_8.png';
				return;
			}

			count++;

			// 좌측 커서엔 클릭한 숫자로, 클릭한 숫자패드는 8로 변경
			// TODO 좌측커서에 숫자바뀌는걸 이펙트를 줘야하나
			numCursor.src = nums[ind].children[0].src;
			nums[ind].children[0].src = './static/img/num_8.png';

			// 8이 4개 이상일 경우 티저영상페이지로 넘어가는 이벤트
			if (count >= 3) {
				sectionOnOff(1, false);
				count = 0;
				setTimeout(function () {
					sectionOnOff(2, true);
					// FIXME timeout 시간 조정
				}, 2600);
				return;
			}
		});

		// nums[ind].addEventListener('transitionend', function (e) {
		// e.target.
		// });
	})(i);
}

// section1 back, skip
document.querySelector('.ms-section1 .top-box button').addEventListener('click', function () {
	sectionOnOff(1, false);
	setTimeout(function () {
		sectionOnOff(0, true);
	}, 3000);
});
document.querySelector('.ms-section1 .bottom-box button').addEventListener('click', function () {
	sectionOnOff(1, false);
	setTimeout(function () {
		sectionOnOff(2, true);
	}, 3000);
});
// section2 close
document.querySelector('.ms-section2 button.top-left').addEventListener('click', function () {
	sectionOnOff(2, false);
});
document.querySelector('.ms-section2 button.bottom-right').addEventListener('click', function (e) {});

// section2 mute btn
const muteBtn = document.querySelector('.ms-section2 button.bottom-right');
const muteBtnSpan = document.querySelector('.ms-section2 button.bottom-right span');

// muteBtn hover interaction
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

// youtube player mute 와 muteBtn 상태 동기화
let muteCheckInterval = null;
function muteCheckFunc() {
	if (player.isMuted() && !muteBtn.classList.contains('mute')) {
		muteBtn.classList.add('mute');
	} else if (!player.isMuted() && muteBtn.classList.contains('mute')) {
		muteBtn.classList.remove('mute');
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

// muteBtn 눌렀을때
muteBtn.addEventListener('click', function (e) {
	if (player.isMuted()) {
		player.unMute();
		muteBtn.classList.remove('mute');
	} else {
		player.mute();
		muteBtn.classList.add('mute');
	}
});

// section3 다시보기(section2로), 처음으로(section0으로)
document.querySelector('.ms-section3 .btn-wrap button.replay').addEventListener('click', function () {
	sectionOnOff(3, false);
	setTimeout(function () {
		sectionOnOff(2, true);
	}, 1500);
});

document.querySelector('.ms-section3 .btn-wrap button.goFirst').addEventListener('click', function () {
	sectionOnOff(3, false);
	setTimeout(function () {
		sectionOnOff(0, true);
	}, 1500);
});

// section3 타이머
const timerP = document.querySelectorAll('.ms-section3 .timer-wrap>p:first-child span img');
const openDate = new Date('2021-03-10T00:00:00').getTime();
function getDTime() {
	const timer = (openDate - Date.now()) / 1000;
	let timerTxt = '';

	let day = Math.floor(timer / 60 / 60 / 24).toString();
	let hor = Math.floor((timer / 60 / 60) % 24)
		.toString()
		.slice(0, 2);
	let min = Math.floor((timer / 60) % 60)
		.toString()
		.slice(0, 2);
	let sec = Math.floor(timer % 60).toString();

	sec.length < 2 ? (sec = '0' + sec) : null;
	min.length < 2 ? (min = '0' + min) : null;
	hor.length < 2 ? (hor = '0' + hor) : null;

	timerTxt = (day + hor + min + sec).split('');

	for (let i = 0; i < timerTxt.length; i++) {
		timerP[i].src = './static/img/num_' + timerTxt[i] + '.png';
	}
}
getDTime();
setInterval(getDTime, 500);

// section3 owl slide
$('.owl-carousel').owlCarousel({
	loop: true,
	margin: 80,
	center: true,
	nav: true,
	autoWidth: true,
	// autoplay: true,
	// autoplayTimeout: 6000,
	// autoplaySpeed: 6000,
	slideTransition: 'linear',
	navSpeed: 1000,
	navText: ['<span class="slide-btn prev"></span>', '<span class="slide-btn next"></span>'],
	responsiveClass: true,
	responsive: {
		0: {
			items: 1,
		},
		1025: {
			items: 1,
		},
	},
});
