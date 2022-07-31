$(document).ready(function () {
    $(".slider-for").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: ".slider-nav",
    });

    $(".slider-nav").slick({
        slidesToScroll: 1,
        asNavFor: ".slider-for",
        centerMode: true,
        speed: 300,
        variableWidth: true,
        focusOnSelect: true,
    });
});
