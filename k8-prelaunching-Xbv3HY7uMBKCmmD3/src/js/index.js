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

let contentWraps;
let scrollOn = true;
let youtubeIframe;
let section0;
let section1;
let modalWrapper;
let section0BgVideo;
let section0NavBtnBtns;
let section0rightNum;
let section0BrandingOpenBtns;
let section0NavBoxBtns;
let section1MovieBtns;
let section1CloseBtn;
let section1ContentBoxes;
let section1ContentBoxesLength;
let section1NavBox;
let section1NavNames;
let section1NavBar;
let galleryScrollBox;
let galleryFixedBox;

// functions --------------------------------------------------------------

// section0 scroll
function section0Scroll(direction) {
	// (direction : boolean) : void
	// true -> scroll down(swipe up), false -> scroll up(swipe down)

	if (!scrollOn) {
		return;
	}
	scrollOn = false;

	for (let i = 0; i < contentWraps.length; i++) {
		switch (contentWraps[i].classList[1]) {
			case 'top':
				contentWraps[i].classList.remove('top');
				contentWraps[i].classList.add(direction ? 'none' : 'center');
				if (!direction) {
					itemAnimation(contentWraps[i]);
				}
				break;
			case 'center':
				contentWraps[i].classList.remove('center');
				contentWraps[i].classList.add(direction ? 'top' : 'bottom');
				break;
			case 'bottom':
				contentWraps[i].classList.remove('bottom');
				contentWraps[i].classList.add(direction ? 'center' : 'none');
				if (direction) {
					itemAnimation(contentWraps[i]);
				}
				break;
			case 'none':
				contentWraps[i].classList.remove('none');
				contentWraps[i].classList.add(direction ? 'bottom' : 'top');
				break;
			default:
				break;
		}
	}

	// 애니메이션
	itemAnimation('section0');

	// 영상 처음부터 시작
	for (let i = 0; i < section0BgVideo.length; i++) {
		section0BgVideo[i].load();
	}

	// 우측 네비
	for (let i = 0; i < section0NavBtnBtns.length; i++) {
		if (section0NavBtnBtns[i].classList.contains('on')) {
			section0NavBtnBtns[i].classList.remove('on');
		} else {
			section0NavBtnBtns[i].classList.add('on');
		}
	}

	// 우측 넘버
	for (let i = 0; i < section0rightNum.length; i++) {
		if (section0rightNum[i].classList.contains('on')) {
			section0rightNum[i].classList.remove('on');
		} else {
			section0rightNum[i].classList.add('on');
		}
	}

	setTimeout(function () {
		scrollOn = true;
	}, 1500);
}

// item animation
function itemAnimation(section) {
	// (section : section0 || section1 || gallery) :void

	if (section === 'section0') {
		TweenMax.fromTo(
			'.ms_k8-section-wrap .msSection0 .contentWrap.center .bgWrap',
			2,
			{ opacity: 0 },
			{ opacity: 1, delay: 0.3 }
		);
		TweenMax.staggerFromTo(
			[
				'.ms_k8-section-wrap .msSection0 .contentWrap.center .p1',
				'.ms_k8-section-wrap .msSection0 .contentWrap.center .p2',
				'.ms_k8-section-wrap .msSection0 .contentWrap.center .p3',
				'.ms_k8-section-wrap .msSection0 .contentWrap.center .btn-1',
			],
			0.5,
			{
				opacity: 0,
				top: '-10px',
			},
			{
				opacity: 1,
				top: 0,
				delay: 0.3,
			},
			0.15
		);
	} else if (section === 'section1') {
		let arr = [];

		if (window.screen.width > 1024) {
			arr = [
				'.ms_k8-section-wrap .msSection1 .contentBox.center .head',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .body .em',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .bold p',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .regular p:nth-child(1)',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .regular p:nth-child(2)',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .regular p:nth-child(3)',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .movieBtn',
			];
		} else {
			arr = [
				'.ms_k8-section-wrap .msSection1 .contentBox.center .movieBtn',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .body .em',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .bold p:nth-child(1)',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .bold p:nth-child(2)',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .regular p:nth-child(1)',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .regular p:nth-child(2)',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .regular p:nth-child(3)',
				'.ms_k8-section-wrap .msSection1 .contentBox.center .head',
			];
		}
		TweenMax.staggerFromTo(
			arr,
			0.4,
			{
				opacity: 0,
				top: '-10px',
			},
			{
				opacity: 1,
				top: 0,
				delay: 0.5,
			},
			0.2
		);
	} else if (section === 'gallery') {
		let arr = [];

		if (window.screen.width > 1024) {
			arr = [
				'.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .fixedDiv .head',
				'.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .fixedDiv .body .em',
				'.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .fixedDiv .bold p:first-child',
				'.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .fixedDiv .bold p:last-child',
				'.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .fixedDiv .regular img',
			];
		} else {
			arr = [
				'.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .fixedDiv .footer',
				'.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .fixedDiv .bold p:first-child',
				'.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .fixedDiv .bold p:last-child',
				'.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .fixedDiv .head',
			];
		}
		// fixedDiv
		TweenMax.staggerFromTo(
			arr,
			0.4,
			{
				opacity: 0,
				top: '-10px',
			},
			{
				opacity: 1,
				top: 0,
				delay: 0.5,
			},
			0.2
		);

		// gallery item
		TweenMax.staggerFromTo(
			'.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .gridBox .rowBox>div',
			1,
			{
				opacity: 0,
				top: '50px',
			},
			{
				opacity: 1,
				top: 0,
				delay: 0.5,
			},
			0.2
		);
	}
}

// section0 navBtn
function section0Nav(e) {
	if (!scrollOn) {
		return;
	}

	if (e.target.classList.contains('on')) {
		return;
	}

	section0Scroll(true);
}

// section0 movieBtn event - open youbute iframe section
function movieSectionOnOff(open, movie) {
	// (open : boolean, movie : ) : void

	if (open) {
		modalWrapper.classList.add('on');
		youtubeOn(movie);
	} else {
		section1.classList.remove('hide');
		modalWrapper.classList.add('on');
		section1.classList.add('on');
		youtubeIframe.src = '';
	}
}

// section1 on off
function section1OnOff(open) {
	// (open : boolean) : void

	if (open) {
		section1.classList.add('on');
		if (section1ContentBoxes[section1ContentBoxesLength - 1].classList.contains('center')) {
			itemAnimation('gallery');
		} else {
			itemAnimation('section1');
		}
	} else if (!open) {
		section1.classList.remove('on');
	}
}

// youtube section on
function youtubeOn(movie) {
	// (movie : "design" || "teaser") : void

	// TODO 유튜브링크
	switch (movie) {
		case 'asdf':
			youtubeIframe.src =
				'https://www.youtube.com/embed/99kK628Umw8?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer';
			break;
		default:
	}
}

// section2 sectionBtn
function section2Btn(e) {
	if (e.target.classList.contains('on')) {
		return;
	}

	e.target.classList.add('on');
	if (e.target.classList.contains('designSection')) {
		section2SectionBtns[1].classList.remove('on');
		for (let j = 0; j < section2ImagesDesign.length; j++) {
			section2ImagesDesign[j].classList.add('on');
			section2ImagesTeaser[j].classList.remove('on');
		}
	} else if (e.target.classList.contains('teaserSection')) {
		section2SectionBtns[0].classList.remove('on');
		for (let j = 0; j < section2ImagesDesign.length; j++) {
			section2ImagesDesign[j].classList.remove('on');
			section2ImagesTeaser[j].classList.add('on');
		}
	}
}

// section1 scroll
function section1Scroll(direction, e) {
	// (direction : boolean, e : event) : void
	// true -> scroll down(swipe up), false -> scroll up(swipe down)

	if (!scrollOn) {
		return;
	}
	scrollOn = false;

	let nowCenterNum = 0;
	for (let i = 0; i < section1ContentBoxes.length; i++) {
		if (section1ContentBoxes[i].classList.contains('center')) {
			nowCenterNum = i;
		}
	}

	if (direction) {
		if (nowCenterNum === section1ContentBoxesLength - 2) {
			// gallery open
			section1ContentBoxes[nowCenterNum].classList.remove('center');
			section1ContentBoxes[nowCenterNum].classList.add('top');
			section1ContentBoxes[nowCenterNum + 1].classList.remove('bottom');
			section1ContentBoxes[nowCenterNum + 1].classList.add('center');

			itemAnimation('gallery');

			section1NavBox.classList.remove('on');
		} else if (nowCenterNum !== section1ContentBoxesLength - 1) {
			// none gallery 0 ~ 3
			e.preventDefault();
			section1ContentBoxes[nowCenterNum].classList.remove('center');
			section1ContentBoxes[nowCenterNum].classList.add('top');
			section1ContentBoxes[nowCenterNum + 1].classList.remove('bottom');
			section1ContentBoxes[nowCenterNum + 1].classList.add('center');

			itemAnimation('section1');

			section1NavBar.classList.remove(section1NavBar.classList[1]);
			section1NavBar.classList.add('top' + (nowCenterNum + 1));
			section1NavNames[nowCenterNum].classList.remove('on');
			section1NavNames[nowCenterNum + 1].classList.add('on');
		}
	} else if (!direction) {
		e.preventDefault();
		if (nowCenterNum === 0) {
			// 0 일때. 아무런 동작x out은 closebtn으로
		} else if (nowCenterNum === section1ContentBoxesLength - 1) {
			if (section1ContentBoxes[nowCenterNum].children[1].scrollTop === 0) {
				// gallery close
				section1NavBox.classList.add('on');
				section1ContentBoxes[nowCenterNum].classList.remove('center');
				section1ContentBoxes[nowCenterNum].classList.add('bottom');
				section1ContentBoxes[nowCenterNum - 1].classList.remove('top');
				section1ContentBoxes[nowCenterNum - 1].classList.add('center');

				itemAnimation('section1');

				section1NavNames[nowCenterNum - 1].classList.add('on');
				section1NavBar.classList.remove(section1NavBar.classList[1]);
				section1NavBar.classList.add('top' + (nowCenterNum - 1));
			}
		} else {
			section1ContentBoxes[nowCenterNum].classList.remove('center');
			section1ContentBoxes[nowCenterNum].classList.add('bottom');
			section1ContentBoxes[nowCenterNum - 1].classList.remove('top');
			section1ContentBoxes[nowCenterNum - 1].classList.add('center');

			itemAnimation('section1');

			section1NavNames[nowCenterNum].classList.remove('on');
			section1NavNames[nowCenterNum - 1].classList.add('on');

			section1NavBar.classList.remove(section1NavBar.classList[1]);
			section1NavBar.classList.add('top' + (nowCenterNum - 1));
		}
	}

	setTimeout(function () {
		scrollOn = true;
	}, 1500);
}

// section1 navBtn
function section1NavBtnClick(index) {
	if (!scrollOn) {
		return;
	}
	scrollOn = false;

	let nowCenterNum = 0;
	for (let i = 0; i < section1ContentBoxes.length; i++) {
		if (section1ContentBoxes[i].classList.contains('center')) {
			nowCenterNum = i;
		}
	}

	if (nowCenterNum > index) {
		section1ContentBoxes[nowCenterNum].classList.remove('center');
		section1ContentBoxes[nowCenterNum].classList.add('bottom');
		section1ContentBoxes[index].classList.remove('top');
		section1ContentBoxes[index].classList.add('center');

		itemAnimation('section1');

		setTimeout(function () {
			for (let i = index + 1; i < nowCenterNum; i++) {
				section1ContentBoxes[i].classList.remove('top');
				section1ContentBoxes[i].classList.add('bottom');
			}
		}, 400);

		section1NavBar.classList.remove(section1NavBar.classList[1]);
		section1NavBar.classList.add('top' + index);
		section1NavNames[nowCenterNum].classList.remove('on');
		section1NavNames[index].classList.add('on');
	} else if (nowCenterNum < index) {
		section1ContentBoxes[nowCenterNum].classList.remove('center');
		section1ContentBoxes[nowCenterNum].classList.add('top');
		section1ContentBoxes[index].classList.remove('bottom');
		section1ContentBoxes[index].classList.add('center');

		itemAnimation('section1');

		setTimeout(function () {
			for (let i = nowCenterNum + 1; i < index; i++) {
				section1ContentBoxes[i].classList.remove('bottom');
				section1ContentBoxes[i].classList.add('top');
			}
		}, 400);

		section1NavBar.classList.remove(section1NavBar.classList[1]);
		section1NavBar.classList.add('top' + index);
		section1NavNames[nowCenterNum].classList.remove('on');

		if (index !== section1ContentBoxesLength - 1) {
			section1NavNames[index].classList.add('on');
		}
		if (index === section1ContentBoxesLength - 1) {
			// gallery open
			section1NavBox.classList.remove('on');
			itemAnimation('gallery');
		}
	}

	setTimeout(function () {
		scrollOn = true;
	}, 1500);
}

// 갤러리 링크 함수 - #gallery 로 접근
function openGallery() {
	// .navBox.on
	//      자식들 5번째 on
	// contentBox top 등등..
	section1OnOff(true);
	section1NavBtnClick(4);
}

// youtube open
function youtubeOn(movie) {
	// (movie : close || item1...6 ) : void
	if (movie === 'close') {
		modalWrapper.classList.remove('on');
		youtubeIframe.src = '';

		return;
	}

	modalWrapper.classList.add('on');

	switch (movie) {
		// TODO youtube link 추가
		case 'item1':
			youtubeIframe.src =
				'https://www.youtube.com/embed/TWX7xL-nRb4?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer';
			break;
		default:
			youtubeIframe.src =
				'https://www.youtube.com/embed/TWX7xL-nRb4?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer';
	}
}

// start ----------------------------------------------------------------
$(document).ready(function () {
	// dom declaration ------------------------------------------------------------
	contentWraps = document.querySelectorAll('.ms_k8-section-wrap .msSection0 .contentWrap');
	youtubeIframe = document.querySelector('.ms_k8-section-wrap #iframeDiv');
	section0 = document.querySelector('.ms_k8-section-wrap .msSection0');
	section1 = document.querySelector('.ms_k8-section-wrap .msSection1');
	modalWrapper = document.querySelector('.ms_k8-section-wrap .modalWrapper');
	section0NavBtnBtns = document.querySelectorAll('.ms_k8-section-wrap .msSection0 .navBox li');
	section0rightNum = document.querySelectorAll('.ms_k8-section-wrap .msSection0 .rightBox span:not(.em)');
	section0BgVideo = document.querySelectorAll('.ms_k8-section-wrap .msSection0 .bgWrap video');
	section0BrandingOpenBtns = document.querySelectorAll('.ms_k8-section-wrap .msSection0 .brandingBtn');
	section1CloseBtn = document.querySelector('.ms_k8-section-wrap .msSection1 > .fixedBox .closeBtn');
	section1ContentBoxes = document.querySelectorAll('.ms_k8-section-wrap .msSection1 .contentBox');
	section1ContentBoxesLength = section1ContentBoxes.length;
	section1NavBox = document.querySelector('.ms_k8-section-wrap .msSection1 .navBox');
	section1NavNames = document.querySelectorAll('.ms_k8-section-wrap .msSection1 .navNames li');
	section1NavBar = document.querySelector('.ms_k8-section-wrap .msSection1 .navBar');
	section1MovieBtns = document.querySelectorAll('.ms_k8-section-wrap .msSection1 .movieBtn');
	galleryScrollBox = document.querySelector('.ms_k8-section-wrap .msSection1 .contentBox.galleryBox .scrollBox');
	galleryFixedBox = document.querySelector('.ms_k8-section-wrap .msSection1 .contentBox.galleryBox>.fixedDiv');

	// add event listeners -------------------------------------------

	// section0 scroll - mouse wheel
	section0.addEventListener('wheel', function (e) {
		e.preventDefault();
		if (e.wheelDelta < 0) {
			section0Scroll(true);
		} else {
			section0Scroll(false);
		}
	});

	// section0 scroll - mobile swipe
	const mc = new Hammer(section0);
	mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	mc.on('swipeup', function () {
		section0Scroll(true);
	});
	mc.on('swipedown', function () {
		section0Scroll(false);
	});

	// section0 branding open
	for (let i = 0; i < section0BrandingOpenBtns.length; i++) {
		section0BrandingOpenBtns[i].addEventListener('click', function () {
			section1OnOff(true);
		});
	}

	// section0 우측상단 navBtn click
	for (let i = 0; i < section0NavBtnBtns.length; i++) {
		section0NavBtnBtns[i].addEventListener('click', function (e) {
			section0Nav(e);
		});
	}

	// section1 closeBtn
	section1CloseBtn.addEventListener('click', function () {
		section1OnOff(false);
	});

	// section1 navBtn click
	for (let i = 0; i < section1NavNames.length; i++) {
		section1NavNames[i].addEventListener('click', function (e) {
			(function (index) {
				section1NavBtnClick(index);
			})(i);
		});
	}

	// section1 movieBtns
	for (let i = 0; i < section1MovieBtns.length; i++) {
		section1MovieBtns[i].addEventListener('click', function (e) {
			youtubeOn(e.target.dataset);
		});
	}

	// modalWrapper bg click - modalOff
	document.querySelector('.modalWrapper .bgDiv').addEventListener('click', function () {
		youtubeOn('close');
	});

	// gallery text wheel
	galleryFixedBox.addEventListener('wheel', function (e) {
		if (e.deltaY > 0) {
			galleryScrollBox.scrollTop = galleryScrollBox.scrollTop + 100;
		} else {
			galleryScrollBox.scrollTop = galleryScrollBox.scrollTop - 100;
		}
	});

	// section1 swipe
	const mc2 = new Hammer(section1);
	mc2.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	mc2.on('swipeup', function (e) {
		e.preventDefault();
		section1Scroll(true, e);
	});
	mc2.on('swipedown', function (e) {
		e.preventDefault();
		section1Scroll(false, e);
	});

	// section1 scroll
	section1.addEventListener('wheel', function (e) {
		if (e.wheelDelta < 0) {
			section1Scroll(true, e);
		} else {
			section1Scroll(false, e);
		}
	});

	// gallery swipe
	const mc3 = new Hammer(galleryScrollBox);
	mc3.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	mc3.on('swipeup', function (e) {
		galleryScrollBox.scrollTop = galleryScrollBox.scrollTop + e.deltaY * -1;
	});
	mc3.on('swipedown', function (e) {
		if (galleryScrollBox.scrollTop === 0) {
			e.preventDefault();
			section1Scroll(false, e);
		} else {
			galleryScrollBox.scrollTop = galleryScrollBox.scrollTop + e.deltaY * -1;
		}
	});

	// gallery text swipe
	const mc1 = new Hammer(galleryFixedBox);
	mc1.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	mc1.on('swipeup', function (e) {
		galleryScrollBox.scrollTop = galleryScrollBox.scrollTop + e.deltaY * -1;
	});
	mc1.on('swipedown', function (e) {
		galleryScrollBox.scrollTop = galleryScrollBox.scrollTop + e.deltaY * -1;
	});

	// open animation ------------------------------------------------------------
	itemAnimation('section0');

	if (window.location.hash === '#gallery') {
		openGallery();
	}
});

// TODO section1 close -> open contentBox 1 open 하도록
// section0 pBox, 우측 넘버박스 중간에 오도록

