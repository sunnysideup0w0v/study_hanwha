let mainVisual  = new Swiper( "#mainVisual  .mask",{
    effect:"fade",
    speed:1000,
    loop:true,
    simulateTouch:false,
    autoplay: {
        delay:3000,
        disableOnInteraction:false,
    },
    on: {
        slideChangeTransitionEnd:function() {
            $("#mainVisual .swiper-slide").removeClass("old");
            $("#mainVisual .swiper-slide").eq(this.activeIndex).addClass("old");	
        },
        slideChange: function () {
            $("#mainVisual .pagination li").removeClass("active");
            $("#mainVisual .pagination li").eq(this.realIndex).addClass("active");
        },
    },
});
$("#mainVisual .pagination li").on("click",function(){
    if(!mainVisual.animating) {
        $(this).addClass("active");
        $(this).siblings("li").removeClass("active");
        mainVisual.slideTo($(this).index()+1);
    }
    return false;
})


$("#gnb .gnbList > li:not(.only)").on("mouseenter",function() {
    $("#header").addClass("hover");
})
$("#gnb .gnbList > li:not(.only)").on("mouseleave",function() {
    $("#header").removeClass("hover");
})
let productInfo  = new Swiper( "#innovation  .infoBox",{
    effect:"fade",
    speed:1000,
    loop:true,
})

let product  = new Swiper( "#innovation  .mask",{
    speed:1000,
    loop:true,
    autoplay: {
        delay:3000,
        disableOnInteraction:false,
    },
    pagination: {
        el:"#innovation .mask .pagination",
        clickable:true

    },
    navigation: {
        prevEl:"#innovation  .infoBox .btnPrev",
        nextEl:"#innovation  .infoBox .btnNext",
    },
    on: {
        slideChange: function () {
            productInfo.slideTo(this.activeIndex);
        },
    },
});
;

$(window).on("scroll",function(){
    let st = $(window).scrollTop();
    if(st<1000) {
        if($("#mainVisual").hasClass("down")){
            $("#mainVisual").removeClass("down");
        }
    }
})

$("#mainVisual").on("mousewheel",function(e) {
    let wheel = e.originalEvent.deltaY;
    if(wheel>0) {
        if(!$("#mainVisual").hasClass("down")){
            $("#mainVisual").addClass("down");
                console.log("aaaa");
                gsap.to($("html,body"),{
                scrollTop:$(window).height(),
                duration:1
            })
        }
    }
})

$("#challenge li dt").on("click",function() {
    $(this).parents("li").siblings().removeClass("on");
    $(this).parents("li").addClass("on");
    $(this).parents("li").siblings().find("dd").stop().slideUp();
    $(this).next("dd").stop().slideDown();
    return false;
})