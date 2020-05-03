let pagination = document.querySelectorAll("#mainVisual .pagination li");
let mainVisualContent = document.querySelector("#mainVisual");
let body = document.body;

let getSiblings = function(elem){
    let siblings = [];
    let sibling = elem.paretNode.firstChild;
    while(sibling){
        if(sibling.nodeType === 1 && sibling!==elem){
            siblings.push(sibling);
        }
        sibling = sibling.NextSibling;
    }
    return siblings;
};

let mainVisual  = new Swiper( "#mainVisual  .mask",{
    effect:"fade",
    speed:1000,
    simulateTouch:false,
    autoplay: {
        delay:3000,
        disableOnInteraction:false,
    },
    on: {
        slideChangeTransitionEnd:function() {
            let removeList = document.querySelectorAll("#mainVisual .swiper-slide");
            for(i=0;i<removeList.length;i++){
                removeList[i].classList.remove("old");
                console.log(this)
                document.querySelector("#mainVisual .mask .swiper-slide-active").classList.add("old");
            }
        },
        slideChange: function () {
            for(i=0;i<pagination.length;i++){
                pagination[i].classList.remove("active");               
            }
            let  indexInParent = function(node) {
                var children = node.parentNode.childNodes;
                var num = 0;
                for (var i=0; i<children.length; i++) {
                    if (children[i]==node) return num;
                    if (children[i].nodeType==1) num++;
                }
                return -1;
            };
            let index = indexInParent(document.querySelector("#mainVisual .mask .swiper-slide-active"));
            pagination[index+1].classList.add("active")
            // 1. loop가 true가 되면 작동을 안 함...
        },
    },
});

// for(i=0;i<pagination.length;i++){
//     pagination[i].addEventListener("click",function(){
//         if(!mainVisual.animating){
//             this.classList.add('active');
//             getSiblings(this).classList.remove('active');
//             mainVisual.slideTo()
//         }
//     })
// } 너도 좀 이따가..
$("#mainVisual .pagination li").on("click",function(){
    if(!mainVisual.animating) {
        $(this).addClass("active");
        $(this).siblings("li").removeClass("active");
        mainVisual.slideTo($(this).index()+1);
    }
    return false;
})

// let gnbLi =  document.querySelectorAll("#gnb .gnbList > li");
//     // getElementByClassName("only")
//     // filter
// for(i=0;i<gnbLi.length;i++){
//     let only = gnbLi.filter(x=>{
//         return x.className = "only"
//     });
//     console.log("only",only)
// }
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
});


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

window.addEventListener('scroll',function(){
    let st = window.scrollY;
    if(st<1000) {
        if(document.querySelector("#mainVisual").classList.contains("down")){
            document.querySelector("#mainVisual").classList.remove("down");
        }
    }
})

mainVisualContent.addEventListener('wheel',function(e){
    let wheel = e.deltaY;
    if(wheel>0){
        if(!mainVisualContent.classList.contains("down")){
            mainVisualContent.classList.add("down");
            // class도 안 붙고, gsap도 안 됨.. 대체 왜..
            gsap.to("#about",{
                // scrollTop: window.innerHeight,
                duration:1
            })
        }
    }
})
// $("#mainVisual").on("mousewheel",function(e) {
//     let wheel = e.originalEvent.deltaY;
//     if(wheel>0) {
//         if(!$("#mainVisual").hasClass("down")){
//             $("#mainVisual").addClass("down");
//                 console.log("aaaa");
//                 gsap.to($("html,body"),{
//                 scrollTop:$(window).height(),
//                 duration:1
//             })
//         }
//     }
// })

$("#challenge li dt").on("click",function() {
    $(this).parents("li").siblings().removeClass("on");
    $(this).parents("li").addClass("on");
    $(this).parents("li").siblings().find("dd").stop().slideUp();
    $(this).next("dd").stop().slideDown();
    return false;
})






