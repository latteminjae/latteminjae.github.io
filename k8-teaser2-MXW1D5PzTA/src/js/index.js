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
let movieBtns;
let galleryBtns;
let youtubeIframe;
let section0;
let section1;
let section2;
let section0NavBtnBoxs;
let section0NavBtnBtns;
let section0BgVideo;
let section2YoutubeBtn;
let section2SectionBtns;
let section2ImagesDesign;
let section2ImagesTeaser;
let section2GalleryCloseBtn;
let section2GalleryGridBox;
let section2GalleryImgBox;

$(document).ready(function () {
	// dom declaration ------------------------------------------------------------
	contentWraps = document.querySelectorAll('.ms_k8-section-wrap .msSection0 .contentWrap');
	galleryBtns = document.querySelectorAll('.ms_k8-section-wrap button.galleryBtn');
	movieBtns = document.querySelectorAll('.ms_k8-section-wrap .msSection0 button.movieBtn');
	section2GalleryCloseBtn = document.querySelector('.ms_k8-section-wrap button.galleryCloseBtn');
	youtubeIframe = document.querySelector('.ms_k8-section-wrap #iframeDiv');
	section0 = document.querySelector('.ms_k8-section-wrap .msSection0');
	section1 = document.querySelector('.ms_k8-section-wrap .msSection1');
	section2 = document.querySelector('.ms_k8-section-wrap .msSection2');
	section0NavBtnBoxs = document.querySelectorAll('.ms_k8-section-wrap .msSection0 .navBox');
	section0NavBtnBtns = document.querySelectorAll('.ms_k8-section-wrap .msSection0 .navBox li');
	section0BgVideo = document.querySelectorAll('.ms_k8-section-wrap .msSection0 .bgWrap video');
	section2YoutubeBtn = document.querySelector('.ms_k8-section-wrap .msSection2 .movieBtn');
	section2SectionBtns = document.querySelectorAll('.ms_k8-section-wrap .msSection2 .btnBox button');
	section2ImagesDesign = document.querySelectorAll('.ms_k8-section-wrap .msSection2 .gridBox .designImg');
	section2ImagesTeaser = document.querySelectorAll('.ms_k8-section-wrap .msSection2 .gridBox .teaserImg');
	section2GalleryGridBox = document.querySelector('.ms_k8-section-wrap .msSection2 .gridBox');
	section2GalleryImgBox = document.querySelectorAll('.ms_k8-section-wrap .msSection2 .gridBox .imgBox');

	// add event listeners -------------------------------------------

	// section0 scroll - mouse wheel
	section0.addEventListener('wheel', function (e) {
		e.preventDefault();
		if (e.wheelDelta < 0) {
			slideContentWrap(true);
		} else {
			slideContentWrap(false);
		}
	});

	// section0 scroll - mobile swipe
	const mc = new Hammer(section0);
	mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	mc.on('swipeup', function () {
		slideContentWrap(true);
	});
	mc.on('swipedown', function () {
		slideContentWrap(false);
	});

	// section0 navBtn
	for (let i = 0; i < section0NavBtnBoxs.length; i++) {
		section0NavBtnBoxs[i].addEventListener('click', function (e) {});
	}

	for (let i = 0; i < movieBtns.length; i++) {
		movieBtns[i].addEventListener('click', function (e) {
			if (e.target.classList.contains('design')) {
				openMovieSection('section0', 'design');
			} else if (e.target.classList.contains('teaser')) {
				openMovieSection('section0', 'teaser');
			}
		});
	}
	for (let i = 0; i < galleryBtns.length; i++) {
		galleryBtns[i].addEventListener('click', function (e) {
			galleryOnOff(true);
		});
	}

	for (let i = 0; i < section0NavBtnBtns.length; i++) {
		section0NavBtnBtns[i].addEventListener('click', function (e) {
			section0Nav(e);
		});
	}

	section2GalleryCloseBtn.addEventListener('click', function () {
		galleryOnOff(false);
	});

	section2YoutubeBtn.addEventListener('click', function (e) {
		if (e.target.classList.contains('design')) {
			openMovieSection('section2', 'design');
		} else if (e.target.classList.contains('teaser')) {
			openMovieSection('section2', 'teaser');
		}
	});

	for (let i = 0; i < section2SectionBtns.length; i++) {
		section2SectionBtns[i].addEventListener('click', function (e) {
			section2Btn(e);
		});
	}

	// open animation ------------------------------------------------------------
	itemAnimation(contentWraps[1]);
});

// section0 scroll
function slideContentWrap(direction) {
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

	let section0NavBtnTeaserOn = section0NavBtnBoxs[0].children[1].classList.contains('on');
	for (let i = 0; i < section0NavBtnBoxs.length; i++) {
		section0NavBtnBoxs[i].children[section0NavBtnTeaserOn ? 1 : 2].classList.remove('on');
		section0NavBtnBoxs[i].children[!section0NavBtnTeaserOn ? 1 : 2].classList.add('on');
	}

	for (let i = 0; i < section0BgVideo.length; i++) {
		section0BgVideo[i].load();
	}

	setTimeout(function () {
		scrollOn = true;
	}, 1500);
}

function itemAnimation(parentEle) {
	if (parentEle.classList.contains('contentWrap')) {
		TweenMax.staggerFromTo(
			[
				parentEle.children[2].children[0].children[0],
				parentEle.children[2].children[0].children[1].children[0],
				parentEle.children[2].children[0].children[1].children[1],
				parentEle.children[2].children[1].children,
			],
			0.5,
			{ opacity: 0, top: -10, position: 'relative', delay: 0.5 },
			{ opacity: 1, top: 0, position: 'relative', delay: 0.5 },
			0.2
		);
	} else if (parentEle.classList.contains('gridBox')) {
		TweenMax.staggerFromTo(section2GalleryImgBox, 1, { opacity: 0, delay: 0.5 }, { opacity: 1, delay: 0.5 }, 0.1);
	}
}

// section0 movieBtn event - open youbute iframe section
function openMovieSection(from, movie) {
	// (from : section0 || section2, movie : design || teaser) : void

	if (from === 'section0') {
		section0.classList.add('fadeout');
		section1.classList.remove('hide');
		section1.classList.add('on');
	} else if (from === 'section2') {
		section2.classList.remove('on');
		section1.classList.remove('hide');
		section1.classList.add('on');
	}

	youtubeOn(movie);
}

// gallery on off
function galleryOnOff(open) {
	// (open : boolean) : void

	if (open) {
		section2.classList.add('on');
		youtubeIframe.src = '';

		itemAnimation(section2GalleryGridBox);
		setTimeout(function () {
			if (section1.classList.contains('on')) {
				section0.classList.remove('fadeout');
				section1.classList.remove('on');
				section1.classList.add('hide');
			}
		}, 500);
	} else {
		section2.classList.remove('on');
	}
}

// youtube section on
function youtubeOn(movie) {
	// (movie : "design" || "teaser") : void

	if (movie === 'design') {
		// TODO 유튜브링크 바꿔야함.
		youtubeIframe.src =
			'https://www.youtube.com/embed/99kK628Umw8?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer';
	} else if (movie === 'teaser') {
		youtubeIframe.src =
			'https://www.youtube.com/embed/99kK628Umw8?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer';
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

// section0 navBtn
function section0Nav(e) {
	if (e.target.classList.contains('on')) {
		return;
	}

	if (e.target.classList.contains('galleryBtn')) {
		galleryOnOff(true);
	} else {
		slideContentWrap(true);
	}
}
