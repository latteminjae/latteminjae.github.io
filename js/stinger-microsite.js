var hashString = window.location.hash;
var initialPage = '';
var $win = $(window);
var $body = document.querySelector('body');
var $uspSection;
var windowWidth = $win.innerWidth();
var windowHeight = window.innerHeight;
var headerHeight = 90;
var debugMode = Boolean(location.hostname === 'localhost' || location.hostname === '127.0.0.1');
var ua = navigator.userAgent.toLowerCase();
var deviceType;
var isIE = ua.indexOf('trident') != -1 || ua.indexOf("msie") != -1;
var isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
var isIos = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) > -1 || (navigator.userAgent.indexOf("Mac") > -1 && "ontouchend" in document);
var isIosChrome = false;
var globalScrollTop = 0;
var userScroll = false;
var enableWheel = true;
var enableScroll = 'allow';
var reductionRate = 0.5;
var tvcAnchorList = ['roadmovie', 'familydrama', 'sportstar'];
var pageAnchorList = ['home', '', 'tvc', 'meisterof', 'meistersedan'];
var tvcYoutubeList = ['Iibq2DGF3_Q', 'vkXO-DaZjc0', 'KfpfV9ucv0M'];
var meisterYoutubeList = ['reQwksJ-yjU', 'e4OGVf_jpZ8'];
var currentSectionIdx = '';
var sectionIdxArray = [];
var parallaxCustom;
var controller;
var $canvas;

$(document).ready(function() {
    if (debugMode) document.body.classList.add('debug');
    if (isIE) document.body.classList.add('isIE');

    init();

    handleEvent();

    parallax();

    handleWheelEvent();
    
    bodyScrollLock.disableBodyScroll($body);

    handleScrollEvent();

    if (deviceType === 'mo') {
        canvas();
    }
});

function init() {
    deviceType = $win.width() > 1080 ? 'pc' : 'mo';

    $canvas = $('#ms-canvas');

    var windowHeightForIos;
    if (isIos) {
        if (window.location.hash.indexOf('#opener') > -1) {
            windowHeightForIos = window.location.hash.split('#opener=')[1] * 1;
        }
        if (windowHeightForIos && navigator.userAgent.indexOf('CriOS') > -1) {
            isIosChrome = true;
            $('body').addClass('isIosChrome');
            // var interval = setInterval(function() {
            //     if (window.innerHeight == windowHeightForIos) {
            //         $('body').removeClass('isIosChrome');
            //         clearInterval(interval);
            //     }
            // }, 100);
        }
    }

    var resize = function() {
        windowWidth = $win.innerWidth();
        if (windowHeightForIos) {
            windowHeight = windowHeightForIos;
        } else {
            windowHeight = window.innerHeight;
        }
        var doc = document.documentElement;
        doc.style.setProperty('--inner-height', windowHeight);
        
        var totalDataHeight = 0;
        $('.ms-section[data-height]').each(function(i, e) {
            var dataHeight = $(e).data('height');
            if (dataHeight) {
                totalDataHeight += dataHeight * 1;
                $(e).css('height', windowHeight * dataHeight);
            }
        });
        $('.full-height').css('height', windowHeight);
        if (deviceType === 'mo') {
            $canvas[0].setAttribute('width', windowWidth);
            $canvas[0].setAttribute('height', windowHeight);
        }
    };
    $win.on('resize', function() {
        if (deviceType !== 'mo' || windowWidth !== $win.innerWidth() || windowHeight < window.innerHeight) {
            resize();
        }
    });

    resize();

    if (hashString !== '') {
        if (history.scrollRestoration) {
            window.history.scrollRestoration = 'manual';
        }
        var str = hashString.split('#')[1];
        if (pageAnchorList.indexOf(str) > -1) {
            initialPage = str;
            var $initialPageAnchor = $('[data-anchor-flag="' + initialPage + '"]');
            if ($initialPageAnchor.length) {
                globalScrollTop = $initialPageAnchor.offset().top;
                $win.scrollTop($initialPageAnchor.offset().top);
            }
        }
    } else {
        $('.ms-section1').addClass('current-section');
    }

    if (isMac) {
        $('body').addClass('isMac');
    }
    if (isIos) {
        $('body').addClass('isIos');
    }
    if (isIE) {
        parallaxCustom = $('.parallax-section3-text-2, .ms-section3 > .ms-video-wrap .ms-video, .tvc-item');
    } else {
        parallaxCustom = $('.parallax-section3-text-2, .ms-section3 > .ms-video-wrap, .tvc-item');
    }
}

function handleEvent() {
    {
        var $progressBar = $('#ms-progress-bar');
        function setProgress() {
            var percentage = $win.scrollTop() / ($('body').height() - windowHeight);
            $progressBar.css('transform', 'scaleX(' + percentage + ')');
        }
        setProgress();
        
        $win.on('scroll', function() {
            setProgress();
        });
    }

    $('[data-anchor-target]').on('click', function(e) {
        e.preventDefault();
        var target = $(this).data('anchor-target');
        var $flag;
        var isTvcItem = tvcAnchorList.indexOf(target) > -1;
        var targetIdx = isTvcItem ? 3 : pageAnchorList.indexOf(target) + 1;
        if (isTvcItem) {
            $flag = $('[data-anchor-flag="tvc"]');
        } else {
            $flag = $('[data-anchor-flag="' + target + '"]');
        }
        if (targetIdx >= 4) {
            parallaxCustom.addClass('easeInOutQuart scrollUp');
        }
        if (currentSectionIdx >= 4 && targetIdx < 4) {
            parallaxCustom.removeClass('scrollUp easeInOutQuart');
        }
        if ($('#sales-popup').hasClass('show')) {
            $('#sales-popup').removeClass('show');
            $('#popup-bg').fadeOut(300, 'swing', function() {
                $('#popup-bg').css('z-index', '');
            });
        }
        if ($flag.length) {
            var flagTop = $flag.offset().top;
            // var speed = Math.abs(flagTop - $win.scrollTop()) / windowHeight * 1.5 * 100;
            scroll(flagTop, function() {
                if (isTvcItem) {
                    handleClickYoutubeItem(tvcYoutubeList[tvcAnchorList.indexOf(target)]);
                }
                menuClose();
            });
        }
    });

    function menuOpen() {
        $('#menu-popup').addClass('open');
        $('#popup-bg').fadeIn(300);
    }
    $('.gnb-menu').on('click', menuOpen);

    function menuClose() {
        $('#menu-popup').removeClass('open');
        $('#popup-bg').fadeOut(300);
    }
    $('#menu-popup .close-popup').on('click', menuClose);

    function handleClickYoutubeItem(youtubeTag) {
        $('#youtube-popup').fadeIn(300, function() {
            {
                var src = 'https://www.youtube.com/embed/' + youtubeTag + '?rel=0&autoplay=1&playsinline=1&enablejsapi=1&version=3&playerapiid=ytplayer'
                $('#tvc_ytplayer')[0].src = src;
            }
            // $('html, body').css('overflow', 'hidden');
        });
    }
    $('.tvc-item').on('click', function(e) {
        e.preventDefault();
        handleClickYoutubeItem(tvcYoutubeList[$(this).data('number') - 1]);
    });
    $('.tvc-item').hover(function() {
        $(this).find('video')[0].play();
        if ($(this).data('number') !== 1 && !$(this).hasClass('hover')) {
            $('.tvc-item.hover').removeClass('hover');
            $(this).addClass('hover');
        }
    }, function() {
        $(this).find('video')[0].pause();
    });

    $('.usp-item').on('click', function() {
        var num = $(this).data('number');
        if (num) {
            $('#usp-popup').fadeIn(300, function() {
                var $image = $('#usp-popup .usp-img-wrap img');
                $image.attr('src', 'img/' + deviceType + '/usp-popup-img-' + num + '.png');
                {
                    $image.fadeIn(300);
                }
                // $('html, body').css('overflow', 'hidden');
            });
        }
    });
    
    $('.meister-item').on('click', function(e) {
        e.preventDefault();
        handleClickYoutubeItem(meisterYoutubeList[$(this).data('number') - 1]);
    });

    $('.section-popup .close-popup').on('click', function() {
        $(this).parents('.section-popup').fadeOut(300, function() {
            if ($(this).is('#youtube-popup')) {
                $('#tvc_ytplayer')[0].src = '';
            }
            if ($(this).is('#usp-popup')) {
                $('#usp-popup .usp-img-wrap img').hide();
            }
            // $('html, body').css('overflow', '');
        });
    });
    
}

function parallax() {
    controller = new ScrollMagic.Controller();
    var fadeIn = { opacity: 1, display: '' };
    var fadeOut = { opacity: 0, display: 'none' };
    var duration = 1;

    { /* section1 - fadeout */
        var tween = TweenMax.to('.ms-section1 .ms-section-inner .section1-video-area', 0.5, {
            opacity: 0,
        });
        var sceneFadeOut = new ScrollMagic.Scene({
            triggerElement: '#parallax-trigger-section1-fadeout',
            duration: '50%',
            triggerHook: 0,
        }).setTween(tween).addTo(controller);
        if (debugMode) sceneFadeOut.addIndicators({name: 'section1 - fadeout'});
    }
    { /* section2 - article1 - typo1 */
        var number = 1;
        var target = '#parallax-target-' + number;
        var startTrigger = '#parallax-trigger-start-' + number;
        var endTrigger = '#parallax-trigger-end-' + number;
        var tweenFadeIn = TweenMax.to(target, duration, fadeIn);
        var sceneFadeIn = new ScrollMagic.Scene({
            triggerElement: startTrigger,
            duration: '25%',
        }).setTween(tweenFadeIn).addTo(controller);
        if (debugMode) sceneFadeIn.addIndicators({name: 'FadeIn' + number});
        var tweenFadeOut = TweenMax.to(target, duration, fadeOut);
        var sceneFadeOut = new ScrollMagic.Scene({
            triggerElement: endTrigger,
            duration: '25%',
        }).setTween(tweenFadeOut).addTo(controller);
        if (debugMode) sceneFadeOut.addIndicators({name: 'FadeOut' + number});
    }
    { /* section2 - article1 - typo2 */
        var number = 2;
        var target = '#parallax-target-' + number;
        var startTrigger = '#parallax-trigger-start-' + number;
        var endTrigger = '#parallax-trigger-end-' + number;
        var tweenFadeIn = TweenMax.to(target, duration, fadeIn);
        var sceneFadeIn = new ScrollMagic.Scene({
            triggerElement: startTrigger,
            duration: '25%',
        }).setTween(tweenFadeIn).addTo(controller);
        if (debugMode) sceneFadeIn.addIndicators({name: 'FadeIn' + number});
        var tweenFadeOut = TweenMax.to(target, duration, fadeOut);
        var sceneFadeOut = new ScrollMagic.Scene({
            triggerElement: endTrigger,
            duration: '25%',
        }).setTween(tweenFadeOut).addTo(controller);
        if (debugMode) sceneFadeOut.addIndicators({name: 'FadeOut' + number});
    }
    { /* section2 - article2 - logo */
        var number = 3;
        var target = '#parallax-target-' + number;
        var startTrigger = '#parallax-trigger-start-' + number;
        var endTrigger = '#parallax-trigger-end-' + number;
        var tweenFadeIn = TweenMax.to(target, duration, fadeIn);
        var sceneFadeIn = new ScrollMagic.Scene({
            triggerElement: startTrigger,
            duration: '25%',
        }).setTween(tweenFadeIn).addTo(controller);
        if (debugMode) sceneFadeIn.addIndicators({name: 'FadeIn' + number});
        var tweenFadeOut = TweenMax.to(target, duration, fadeOut);
        var sceneFadeOut = new ScrollMagic.Scene({
            triggerElement: endTrigger,
            duration: '25%',
        }).setTween(tweenFadeOut).addTo(controller);
        if (debugMode) sceneFadeOut.addIndicators({name: 'FadeOut' + number});
    }
    {
        { /* section2 - article3 - MEISTER > visible */
            var number = 'letter';
            var target = '#parallax-target-' + number;
            var startTrigger = '#parallax-trigger-start-' + number;
            var endTrigger = '#parallax-trigger-end-' + number;
            var tweenFadeIn = TweenMax.to(target, duration, {
                display: '',
                opacity: 1,
                ease: Power0.easeNone,
            });
            var sceneFadeIn = new ScrollMagic.Scene({
                triggerElement: startTrigger,
                duration: '25%',
            }).setTween(tweenFadeIn).addTo(controller);
            if (debugMode) sceneFadeIn.addIndicators({name: 'FadeIn' + number});
        }
        { /* section2 - article3 - MEISTER > fadeout letter */
            var tween4_m = TweenMax.to('#parallax-letter-m', duration, fadeOut);
            var tween4_e = TweenMax.to('#parallax-letter-e', duration, fadeOut);
            var tween4_i = TweenMax.to('#parallax-letter-i', duration, fadeOut);
            var tween4_t = TweenMax.to('#parallax-letter-t', duration, fadeOut);
            var tween4_e2 = TweenMax.to('#parallax-letter-e2', duration, fadeOut);
            var tween4_r = TweenMax.to('#parallax-letter-r', duration, fadeOut);
            new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-end-letter',
                duration: '32%'
            }).setTween(tween4_m).addTo(controller);
            
            new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-end-letter',
                duration: '34%'
            }).setTween(tween4_e).addTo(controller);
            
            new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-end-letter',
                duration: '106%'
            }).setTween(tween4_i).addTo(controller);
            
            new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-end-letter',
                duration: '14%'
            }).setTween(tween4_t).addTo(controller);
            
            new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-end-letter',
                duration: '28%'
            }).setTween(tween4_e2).addTo(controller);
            
            new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-end-letter',
                duration: '48%'
            }).setTween(tween4_r).addTo(controller);
            
        }
        { /* section2 - article3 - MEISTER- S(svg) > increase scale */
            if (deviceType === 'pc') {
                var scale = $win.width() / 3.84;
                var tween4_s = TweenMax.to('#parallax-letter-s', 0.5, {
                    // scale: $win.width() / 3.84,
                    width: 26 * scale + 'px',
                    height: 22 * scale + 'px',
                    top: '75%',
                    ease: Power1.easeIn,
                });
                var scene = new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger-letter-scale',
                    duration: '150%',
                }).setTween(tween4_s).setPin('#parallax-trigger-letter-scale').addTo(controller);
                if (debugMode) scene.addIndicators({name: 'letter s - scale'});
            }
        }
        { /* section2 - article3 - MEISTER- S(svg) > fill color */
            if (deviceType === 'pc') {
                var tl = new TimelineLite({
                    onComplete: onComplete,
                    onUpdate: checkDirection
                });
                var lastTime = 0;
                var forward = true;
                tl.to('#parallax-letter-s--g', 0.5, {
                    fill: 'rgba(0,0,0,0)',
                    ease: Power1.easeIn,
                    repeat: 0,
                });
                function onComplete() {
                    $('#parallax-target-letter').hide();
                    $('#parallax-letter-s').hide();
                    $('.scroll-content').addClass('white');
                    $('.ms-header').addClass('theme-white');
                }
                function onReverseStart() {
                    $('#parallax-target-letter').show();
                    $('#parallax-letter-s').show();
                    $('.scroll-content').removeClass('white');
                    $('.ms-header').removeClass('theme-white');
                }
                function checkDirection() {
                    var newTime = tl.time();
                    if ((forward && newTime < lastTime) || (!forward && newTime > lastTime)) {
                        forward = !forward;
                        if (!forward) {
                            onReverseStart();
                        }
                    }
                    lastTime = newTime;
                }
                var scene = new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger-letter-fill',
                    duration: '130%',
                }).setTween(tl).addTo(controller);
                if (debugMode) scene.addIndicators({name: 'letter s - fill'});
            }
        }
        {
            if (deviceType === 'mo') {
                new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger-letter-fill',
                }).setClassToggle('.scroll-content', 'white').addTo(controller);
                new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger-letter-fill',
                }).setClassToggle('.ms-mo.button-area', 'white').addTo(controller);
            }
        }
    }
    {
        { /* section3 - video > fixed position */
            var tween = TweenMax.to('.ms-section3 .ms-video-wrap', 1, {
                display: '',
            });
            var scene = new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-start-section3-video',
            }).setTween(tween).addTo(controller);
            if (debugMode) scene.addIndicators({name: 'video3 fixed position'});
        }
        { /* section3 - text > stagger */
            var tween = TweenMax.staggerFromTo('.parallax-section3-text-1-row span', 2, {
                opacity: 0.001,
            }, {
                opacity: 1,
            }, 300);
            var scene = new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-start-section3-text',
                duration: $('.parallax-section3-text-1-row').length * $('.parallax-section3-text-1-row').first().height() + 'px',
            }).setTween(tween).addTo(controller);
            if (debugMode) scene.addIndicators({name: 'section3 - text > stagger'});
        }
        { /* section3 - text english > stagger */
            var tween = TweenMax.staggerFromTo('.parallax-section3-text-1-eng span', 2, {
                opacity: 0.001,
            }, {
                opacity: 1,
            }, 300);
            var scene = new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-start-section3-text-eng',
                duration: $('.parallax-section3-text-1-row').first().height() + 'px',
            }).setTween(tween).addTo(controller);
            if (debugMode) scene.addIndicators({name: 'section3 - text english > stagger'});
        }
        { /* section3 - text english > line */
            var scene = new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-start-section3-text-line',
            }).setClassToggle('.parallax-section3-text-1-eng .ms-line', 'long').addTo(controller);
            if (debugMode) scene.addIndicators({name: 'section3 - text english > line'});
        }
        {
            if (deviceType === 'pc') {
                /* section3 - text2 > appear */
                var scene = new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger-end-section3-text-2-appear',
                }).setClassToggle('.parallax-section3-text-2', 'appear').addTo(controller);
                if (debugMode) scene.addIndicators({name: 'section3 - text2 > appear'});
            } else {
                /* section3 - text2 > stagger */
                var tween = TweenMax.staggerFromTo('.parallax-section3-text-2 span', 2, {
                    opacity: 0.001,
                }, {
                    opacity: 1,
                }, 300);
                var scene = new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger-end-section3-text-2-appear',
                    duration: $('.parallax-section3-text-2').first().height() + 'px',
                }).setTween(tween).addTo(controller);
                if (debugMode) scene.addIndicators({name: 'section3 - text2 > stagger'});
            }
        }
        { /* section3 - text2 > fixed */
            var scene = new ScrollMagic.Scene({
                triggerElement: '#parallax-trigger-end-section3-text-2-fixed',
            }).setClassToggle('.parallax-section3-text-2', 'fixed').addTo(controller);
            if (debugMode) scene.addIndicators({name: 'section3 - text2 > fixed'});
        }
        {
            var xValue = deviceType === 'pc' ? '-50%' : '0';
            { /* section3 - tvc > fixed */
                var scene = new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger-start-section3-tvc-show',
                }).setClassToggle('.tvc-wrap .tvc-item', 'show').addTo(controller);
                if (debugMode) scene.addIndicators({name: 'section3 - tvc > show'});
            }
            { /* section3 - tvc > appear 1 */
                var tween = TweenMax.fromTo('.ms-section3 .tvc-item-1', 1.5, {
                    force3D: true,
                    x: xValue,
                    y: '100vh',
                }, {
                    force3D: true,
                    x: xValue,
                    y: '0vh',
                });
                var scene = new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger-start-section3-tvc-appear',
                }).setTween(tween).addTo(controller);
                if (debugMode) scene.addIndicators({name: 'section3 - tvc > appear 1'});
            }
            { /* section3 - tvc > appear 2 */
                var tween = TweenMax.fromTo('.ms-section3 .tvc-item-2', 1.5, {
                    force3D: true,
                    x: xValue,
                    y: '150vh',
                }, {
                    force3D: true,
                    x: xValue,
                    y: '0vh',
                });
                var scene = new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger-start-section3-tvc-appear',
                }).setTween(tween).addTo(controller);
                if (debugMode) scene.addIndicators({name: 'section3 - tvc > appear 2'});
            }
            { /* section3 - tvc > appear 3 */
                var tween = TweenMax.fromTo('.ms-section3 .tvc-item-3', 2, {
                    force3D: true,
                    x: xValue,
                    y: '230vh',
                }, {
                    force3D: true,
                    x: xValue,
                    y: '0vh',
                });
                var scene = new ScrollMagic.Scene({
                    triggerElement: '#parallax-trigger-start-section3-tvc-appear',
                }).setTween(tween).addTo(controller);
                if (debugMode) scene.addIndicators({name: 'section3 - tvc > appear 2'});
            }
        }
    }
}
function wheelEvent(delta) {
    userScroll = true;
    $uspSection = $('.ms-section4');
    if (delta) {
        var startPagingOffsetTop = $uspSection.offset().top - windowHeight;
        var section3OffsetTop = startPagingOffsetTop - 1;
        var section4OffsetTop = $('.ms-section4').offset().top;
        var section5OffsetTop = $('.ms-section5').offset().top;
        if (deviceType == 'mo' && (currentSectionIdx == 4 || currentSectionIdx == 5) && delta < 0) {
            delta = -10;
        }
        globalScrollTop += delta * reductionRate;
        if (globalScrollTop >= startPagingOffsetTop) {
            if (currentSectionIdx == 3) { // 첫 진입 시 1초간 스크롤 막기
                if (delta > 0) {
                    if (enableScroll === 'deny') {
                        return;
                    } else if (enableScroll === 'allow') {
                        enableScroll = 'deny';
                        setTimeout(function() {
                            enableScroll = '';
                        }, 100);
                        return;
                    } else {
                        enableScroll = 'allow';
                    }
                } else {
                    enableScroll = 'allow';
                    scroll(startPagingOffsetTop - 1);
                }
            }

            var destination;
            var effect = '';
            if (delta > 0) {
                if (currentSectionIdx == 3) {
                    destination = section4OffsetTop;
                    effect = 'tvcFadeOut';
                } else if (currentSectionIdx == 4) {
                    destination = section5OffsetTop;
                } else if (currentSectionIdx == 5) {
                    $('#sales-popup').addClass('show');
                    $('#popup-bg').css('z-index', '10').fadeIn(300);
                }
            } else {
                if (currentSectionIdx == 4) {
                    destination = section3OffsetTop;
                    enableWheel = true;
                    effect = 'tvcFadeIn';
                } else if (currentSectionIdx == 5) {
                    if ($('#sales-popup').hasClass('show')) {
                        enableWheel = false;
                        $('#sales-popup').removeClass('show');
                        $('#popup-bg').fadeOut(300, 'swing', function() {
                            $('#popup-bg').css('z-index', '');
                        });
                        setTimeout(function() {
                            enableWheel = true;
                        }, 1100);
                        return;
                    } else {
                        destination = section4OffsetTop;
                    }
                }
            }
            if (destination) {
                enableWheel = false;
                scroll(destination);
                setTimeout(function() {
                    enableWheel = true;
                }, 1100);
                if (effect === 'tvcFadeOut') {
                    parallaxCustom.addClass('easeInOutQuart scrollUp');
                } else if (effect === 'tvcFadeIn') {
                    parallaxCustom.removeClass('scrollUp');
                    setTimeout(function() {
                        parallaxCustom.removeClass('easeInOutQuart');
                    }, 1000)
                }
                return;
            }
        } else {
            scroll(globalScrollTop);
        }
    }
}
function handleWheelEvent() {
    globalScrollTop = $(window).scrollTop();
    if (deviceType === 'pc') {
        $('#ms-stinger').on('wheel mousewheel', function(e) {
            e.preventDefault();
            if (!enableWheel) {
                return false;
            }
            var delta = -e.wheelDelta || e.originalEvent.detail || e.originalEvent.deltaY;
            if ((isIos || isMac) && Math.abs(delta) < 10) {
                return false;
            }
            wheelEvent(delta);
        });
    } else {
        var hammertime = new Hammer($('#ms-stinger')[0]);
        hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        hammertime.on('swipe', function(e) {
            if (!enableWheel) {
                return false;
            }
            wheelEvent(-e.deltaY * 5);
            if (isIosChrome) {
                if (-e.deltaY > 0) {
                    $('body').addClass('top-hidden');
                } else {
                    $('body').removeClass('top-hidden');
                }
            }
        });
        
    }
}
function scroll(sct, callback) {
    globalScrollTop = sct;
    ScrollEvent(sct);
    $('html, body').stop().animate({scrollTop: sct}, 1000, 'easeOutQuart', function() {
        userScroll = false;
        if (callback) {
            callback();
        }
    });
}
function ScrollEvent(sct) {
    var scrollTop = sct;
    var trigger = scrollTop + windowHeight/2;
    var newCurrent = sectionIdxArray[Math.floor(trigger/windowHeight)];
    if (currentSectionIdx !== newCurrent) {
        currentSectionIdx = newCurrent;
        $('.current-section').removeClass('current-section');
        $('.ms-section' + currentSectionIdx).addClass('current-section');
    }

}
function handleScrollEvent() {
    $('.ms-section').each(function(i, e) {
        var dataHeight = $(e).data('height');
        if (dataHeight) {
            for (var i=0; i<dataHeight; i++) {
                sectionIdxArray.push($(e).data('section-idx'));
            }
        }
    });

    ScrollEvent($(window).scrollTop());
    if (currentSectionIdx >= 4) {
        parallaxCustom.addClass('easeInOutQuart scrollUp');
    }

    $(window).on('scroll', function() {
        if (!userScroll) {
            globalScrollTop = $(window).scrollTop();
        }
    });
}

function canvas() {
    $('#parallax-letter-s--g').css('fill', 'transparent');
    var svg = document.querySelector('#ms-svg');
    var canvas = $canvas[0];
    var ctx = canvas.getContext('2d');
    var getInitialPosition = function() {
        $('.letter-meister').show();
        var rect = $('.letter-s.ms-mo')[0].getBoundingClientRect();
        var result = {
            'x': Math.round(rect.x),
            'y': Math.round(rect.y),
            'width': Math.round(rect.width),
            'height': Math.round(rect.height),
        };
        $('.letter-meister').hide();
        return result;
    };
    var blob = new Blob([svg.outerHTML], {type:"image/svg+xml"});
    var domURL = self.URL || self.webkitURL || self;
    var url = domURL.createObjectURL(blob);
    var img = new Image;
    var svgProps = getInitialPosition();

    var contWidth = svgProps.width;
    var contHeight = svgProps.height;
    var scaleX = $win.width() / (contWidth / 15.022104);
    var scaleY = windowHeight / (contHeight / 6);
    var scale = Math.max(scaleX, scaleY);
    contHeight = contWidth * 0.846153846;
    var finalX = Math.round(svgProps.x - (contWidth * (scale - 1)) / 2);
    var finalY = Math.round(svgProps.y - (contHeight * (scale - 1)) / 2) + windowHeight*0.272;
    var finalWidth = Math.round(contWidth * scale);
    var finalHeight = Math.round(contHeight * scale);

    var draw = function(x, y, w, h) {
        ctx.clearRect(0, 0, windowWidth, windowHeight);
        ctx.drawImage(img, x, y, w, h);
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.moveTo(0, 0);
        ctx.lineTo(x+w, 0);
        ctx.lineTo(x+w, y+1);
        ctx.lineTo(0, y+1);
        ctx.fill();
        ctx.moveTo(x+w-1, 0);
        ctx.lineTo(windowWidth, 0);
        ctx.lineTo(windowWidth, y+h);
        ctx.lineTo(x+w-1, y+h);
        ctx.fill();
        ctx.moveTo(x, y+h-1);
        ctx.lineTo(windowWidth, y+h-1);
        ctx.lineTo(windowWidth, windowHeight);
        ctx.lineTo(x, windowHeight);
        ctx.fill();
        ctx.moveTo(0, y);
        ctx.lineTo(x+1, y);
        ctx.lineTo(x+1, windowHeight);
        ctx.lineTo(0, windowHeight);
        ctx.fill();
        ctx.closePath();
    };
    img.onload = function () {
        ctx.imageSmoothingEnabled = false;
        domURL.revokeObjectURL(url);
        draw(svgProps.x, svgProps.y, svgProps.width, svgProps.height);
    };
    img.src = url;
    $(svg).remove();

    {
        var val = { opacity: 0, };
        var tween = TweenMax.to(val, 1, {
            opacity: 1,
            ease: Power0.easeNone,
            onUpdate: function() {
                var progress = this.progress();
                $canvas.css({
                    visibility: progress === 0 ? 'hidden' : '',
                });
            },
        });
        var scene = new ScrollMagic.Scene({
            triggerElement: '#parallax-trigger-start-letter',
            duration: '25%',
        }).setTween(tween).addTo(controller);
        if (debugMode) scene.addIndicators({name: 'FadeIn canvas'});
    }
    {
        var obj = svgProps;
        var tween4_s = TweenMax.to(obj, 0.5, {
            x: finalX,
            y: finalY,
            width: finalWidth,
            height: finalHeight,
            onStart: function() {
                // $('#ms-canvas').css('background', '#fff');
            },
            onUpdate: function() {
                var progress = this.progress();
                draw(obj.x, obj.y, obj.width, obj.height);
                if (progress === 0) {
                    $canvas.css('background-color', '#fff');
                    $('.letter-s.ms-mo').css('visibility', '');
                } else {
                    $canvas.css('background-color', 'rgba(0, 0, 0, ' + (1 - progress) + ')');
                    $('.letter-s.ms-mo').css('visibility', 'hidden');
                }
                if (progress == 1) {
                    $('#parallax-target-letter').hide();
                    $('#parallax-letter-s').hide();
                    $('.scroll-content').addClass('white');
                    $('.ms-header').addClass('theme-white');
                    $canvas.css('visibility', 'hidden');
                } else {
                    $('#parallax-target-letter').show();
                    $('#parallax-letter-s').show();
                    $('.scroll-content').removeClass('white');
                    $('.ms-header').removeClass('theme-white');
                    $canvas.css('visibility', '');
                }
            },
            ease: Power1.easeIn,
        });
        var scene = new ScrollMagic.Scene({
            triggerElement: '#parallax-trigger-letter-scale',
            duration: '150%',
        }).setTween(tween4_s).addTo(controller);
        if (debugMode) scene.addIndicators({name: 'letter s - scale'});
    }
}
