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
let section2YoutubeBtn;
let section2SectionBtns;
let section2ImagesDesign;
let section2ImagesTeaser;
let galleryCloseBtn;

$(document).ready(function () {
	// dom declaration
	contentWraps = document.querySelectorAll('.ms_k8-section-wrap .msSection0 .contentWrap');
	galleryBtns = document.querySelectorAll('.ms_k8-section-wrap button.galleryBtn');
	movieBtns = document.querySelectorAll('.ms_k8-section-wrap .msSection0 button.movieBtn');
	galleryCloseBtn = document.querySelector('.ms_k8-section-wrap button.galleryCloseBtn');
	youtubeIframe = document.querySelector('.ms_k8-section-wrap #iframeDiv');
	section0 = document.querySelector('.ms_k8-section-wrap .msSection0');
	section1 = document.querySelector('.ms_k8-section-wrap .msSection1');
	section2 = document.querySelector('.ms_k8-section-wrap .msSection2');
	section2YoutubeBtn = document.querySelector('.ms_k8-section-wrap .msSection2 .movieBtn');
	section2SectionBtns = document.querySelectorAll('.ms_k8-section-wrap .msSection2 .btnBox button');
	section2ImagesDesign = document.querySelectorAll('.ms_k8-section-wrap .msSection2 .gridBox img.designImg');
	section2ImagesTeaser = document.querySelectorAll('.ms_k8-section-wrap .msSection2 .gridBox img.teaserImg');

	// add event listeners
	section0.addEventListener('wheel', function (e) {
		if (e.wheelDelta < 0) {
			slideContentWrap();
		}
	});

	const mc = new Hammer(section0);
	mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
	mc.on('swipe', function (ev) {
        alert(ev)
	});

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

	galleryCloseBtn.addEventListener('click', function () {
		galleryOnOff(false);
	});

	section2YoutubeBtn.addEventListener('click', function (e) {
		console.log(e.target.classList.contains('design'));
		if (e.target.classList.contains('design')) {
			openMovieSection('section2', 'design');
		} else if (e.target.classList.contains('teaser')) {
			openMovieSection('section2', 'teaser');
		}
	});

	for (let i = 0; i < section2SectionBtns.length; i++) {
		section2SectionBtns[i].addEventListener('click', function (e) {
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
		});
	}
});

// section0 scroll
function slideContentWrap() {
	// () : void

	if (!scrollOn) {
		return;
	}
	scrollOn = false;

	for (let i = 0; i < contentWraps.length; i++) {
		switch (contentWraps[i].classList[1]) {
			case 'center':
				contentWraps[i].classList.remove('center');
				contentWraps[i].classList.add('top');
				break;
			case 'bottom':
				contentWraps[i].classList.remove('bottom');
				contentWraps[i].classList.add('center');
				break;
			default:
				break;
		}
	}

	setTimeout(function () {
		for (let i = 0; i < contentWraps.length; i++) {
			if (contentWraps[i].classList[1] === 'top') {
				contentWraps[i].classList.remove('top');
				contentWraps[i].classList.add('bottom');
			}
		}
		setTimeout(function () {
			scrollOn = true;
		}, 500);
	}, 1000);
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
