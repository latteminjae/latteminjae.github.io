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
let player;

// sections
const sections = document.querySelectorAll('#content > section');

// 일부 p tag
const pBoxP = document.querySelectorAll('.ms-section1 .p-box p, .ms-section3 .p-box p');

// intro, outro Movie
const introMovies = document.querySelectorAll('.ms-section0 .bg-wrap .introMovie');
const outroMovies = document.querySelectorAll('.ms-section2 .bg-wrap .outroMovie');

// gate - 숫자패드 클릭 이벤트
let count = 0;
const nums = document.querySelectorAll('.num-pad>ul>li>button');
const numCursor = document.querySelector('.num-wrap .input-box>ul>li:nth-child(5)>img');

// section3 타이머
const timerP = document.querySelectorAll('.ms-section3 .timer-wrap>p:first-child span img');
const openDate = new Date('2021-03-10T00:00:00').getTime();

// section2 youtube iframe
const youtubeIframe = document.getElementById('iframe-div');

// functions ---------------------------------------------------------------------

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

// section class hide toggle
function sectionOpen(num) {
	// (num : number) : void
	for (let i = 0; i < sections.length; i++) {
		if (!sections[i].classList.contains('hide')) {
			sections[i].classList.add('hide');
		}
	}
	sections[num].classList.remove('hide');
}

// section on/off
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
			introMovies[0].play();
			introMovies[1].play();

			TweenMax.to('.ms-section0 .logo img', 0.8, { opacity: 1, delay: 1 });
			TweenMax.to('.ms-section0 .p-box p', 0.7, { top: 0, opacity: 1, delay: 1.5 });

			setTimeout(function () {
				sectionOnOff(0, false);
			}, 3000);
		} else {
			TweenMax.to('.ms-section0 .p-box p', 0.5, { top: '-20px', opacity: 0 });
			TweenMax.to('.ms-section0 .logo img', 0.5, { opacity: 0 });

			setTimeout(function () {
				sectionOnOff(1, true);
			}, 1200);
		}
	}
	// section1
	else if (num === 1) {
		if (on) {
			sections[1].classList.remove('hide');
			setTimeout(function () {
				sections[0].classList.add('hide');
			}, 1000);

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

			// bg, num, keypad
			TweenMax.staggerTo('.ms-section1 .bg-wrap img', 0.3, { top: '0', opacity: 1, delay: 1.5 }, 0.1);

			TweenMax.staggerTo('.ms-section1 .input-box>ul>li', 0.5, { opacity: 1, delay: 1.5 }, 0.1);
			TweenMax.staggerTo('.ms-section1 .num-pad>ul>li', 0.5, { opacity: 1, delay: 1.5 }, 0.1);
		} else {
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

			// 전체 화면
			TweenMax.to('.ms-section1', 0.8, { top: '100%', ease: 'ease-in-out', delay: 1.5 });

			// 초기화
			setTimeout(function () {
				document.querySelector('.num-wrap .input-box>ul>li:nth-child(5)>img').src = './static/img/num_q.png';
				TweenMax.to('.ms-section1 .p-box p:first-child span', 0, { opacity: 1 });
				TweenMax.to('.ms-section1 .p-box p', 0, { top: '-20px', opacity: 0 });
				if (numCursor.classList.contains('on')) {
					numCursor.classList.remove('on');
				}
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

			outroMovies[0].play();
			outroMovies[1].play();

			setTimeout(function () {
				TweenMax.to('.ms-section2 .bg-wrap video', 0.5, { opacity: 0 });
				TweenMax.to('.ms-section2 .center-wrap', 1, { display: 'block', opacity: 1, top: 0, delay: 0.4 });
				youtubeIframe.src =
					'https://www.youtube.com/embed/reQwksJ-yjU?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer';
			}, 2400);
		} else {
			sectionOnOff(3, true);
			youtubeIframe.src = '';
			TweenMax.to('.ms-section2 .bg-wrap video', 0, { opacity: 1 });
			TweenMax.to('.ms-section2 .center-wrap', 0, { display: 'none', opacity: 0, top: '-20px' });
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
			TweenMax.staggerTo('.ms-section3 .p-box p', 0.8, { opacity: 1, top: 0, delay: 1 }, 0.2);
			TweenMax.to('.ms-section3 .btn-wrap', 1, { opacity: 1, bottom: 0, delay: 1.1 });

			// FIXME AB테스트 끝나면 하나 삭제
			TweenMax.to('.ms-section3 .slick-carousel', 3, { opacity: 1, delay: 1.8 });
			TweenMax.to('.ms-section3 .owl-carousel', 3, { opacity: 1, delay: 1.8 });
			$('.slick-carousel').slick('slickGoTo', 0);
		} else {
			TweenMax.to('.ms-section3 .btn-wrap', 0.5, { opacity: 0, bottom: '-100px' });
			TweenMax.to('.ms-section3 .timer-wrap span', 0.3, { top: '30px', opacity: 0, delay: 0.3 });
			TweenMax.to('.ms-section3 .p-box p', 0.2, { opacity: 0, top: '20px', delay: 0.3 });

			// FIXME AB테스트 끝나면 하나 삭제
			TweenMax.to('.ms-section3 .slick-carousel', 0.5, { opacity: 0, delay: 0.7 });
			TweenMax.to('.ms-section3 .owl-carousel', 0.5, { opacity: 0, delay: 0.7 });
		}
	}
}

// section3 make timer text
function getDTime() {
	// () : void
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

// addEventListener -----------------------------------------------------------------

// 각 숫자패드 클릭 이벤트
for (let i = 0; i < nums.length; i++) {
	(function (ind) {
		nums[ind].addEventListener('click', function (e) {
			nums[ind].nextElementSibling.style.animation = '.7s alternate clickAni';
			setTimeout(function () {
				nums[ind].nextElementSibling.style.animation = '';
			}, 700);

			numCursor.classList.add('on');

			numCursor.src = nums[ind].children[0].src;
			nums[ind].children[0].src = './static/img/num_8.png';

			count++;

			// 숫자패드 클릭횟수 3번 이상일 경우 티저영상페이지로 넘어간다
			if (count >= 3) {
				sections[2].classList.remove('hide');
				sectionOnOff(1, false);
				count = 0;
				setTimeout(function () {
					sectionOnOff(2, true);
				}, 2200);
				return;
			}
		});
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
	sections[2].classList.remove('hide');
	setTimeout(function () {
		sectionOnOff(2, true);
	}, 2200);
});

// section2 close
document.querySelector('.ms-section2 button.top-left').addEventListener('click', function () {
	sectionOnOff(2, false);
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

// init ----------------------------------------------------------------------------

// 한글자씩 transition하기위해 글자마다 span을 입히는 작업
for (let i = 0; i < pBoxP.length; i++) {
	pBoxP[i].innerHTML = wrapSpan(pBoxP[i].innerHTML);
}

// section0 open, interval - section3 timer
window.onload = function () {
	sectionOnOff(0, true);
	setInterval(getDTime, 500);
};

// section3 slide
// 클라이언트에게 각 타입 테스트를 위해 index.html, index2.html에 스크립트를 각각 나누어 놓았음
