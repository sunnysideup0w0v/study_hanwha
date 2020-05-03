let pagination = document.querySelectorAll("#mainVisual .pagination li");
let mainVisualContent = document.querySelector("#mainVisual");
let body = document.body;

let getSiblings = function(elem){
    let siblings = [];
    let sibling = elem.parent.firstChild;
    while(sibling){
        if(sibling.nodeType === 1 && sibling!==elem){
            siblings.push(sibling);
        }
        sibling = sibling.NextSibling;
    }
    return siblings;
}

let mainVisual  = new Swiper( "#mainVisual  .mask",{
    effect:"fade",
    speed:1000,
    loop: true,
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
                document.querySelector("#mainVisual .mask .swiper-slide-active").classList.add("old");
            }
        },
        slideChange: function () {
            // for(i=0;i<pagination.length;i++){
            //     pagination[i].classList.remove("active");               
            // }
            // function indexInParent(node) {
            //     var children = node.parentNode.childNodes;
            //     var num = 0;
            //     for (var i=0; i<children.length; i++) {
            //         if (children[i]==node) return num;
            //         if (children[i].nodeType==1) num++;
            //     }
            //     return -1;
            // }
            // let index = indexInParent(document.querySelector("#mainVisual .mask .swiper-slide-active"));
            // pagination[index+1].classList.add("active")
            $("#mainVisual .pagination li").removeClass("active");
            $("#mainVisual .pagination li").eq(this.realIndex).addClass("active");
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

let gnbLi =  document.querySelectorAll("#gnb .gnbList > li");
    // getElementByClassName("only")
$("#gnb .gnbList > li:not(.only)").on("mouseenter",function() {
    $("#header").addClass("hover");
})
$("#gnb .gnbList > li:not(.only)").on("mouseleave",function() {
    $("#header").removeClass("hover");
})

console.log(gnbLi.includes("on"))


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
    console.log("st",st)
    if(st<1000) {
        if(document.querySelector("#mainVisual").classList.contains("scroll")){
            document.querySelector("#mainVisual").classList.remove("scroll");
        }
    }
});

mainVisualContent.addEventListener('wheel',function(e){
    let wheel = e.deltaY;
    console.log("innerHiehgt",window.innerHeight)
    console.log(wheel)
    if(wheel>0){
        if(!mainVisualContent.classList.contains("scroll")){
            mainVisualContent.classList.add("scroll");
            console.log("aaaa");
            gsap.to(document.querySelector("body"),{
                scrollTop:$(window).height(),
                duration:1
            })
        }
    }
})

// $("#mainVisual").on("mousewheel",function(e) {
//     console.log("wheeled")
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

let challengeDt = document.querySelectorAll("#challenge li dt");
let challengeLi = document.querySelectorAll("#challenge li a")
let slideUp = function(elem){
    elem.nextSibling.nextSibling.style.display = "none"
}
let sliideDown = function(elem){
    elem.nextSibling.nextSibling.style.display = "block"
    elem.nextSibling.nextSibling.style.height = "150px";
}
for(j=0;j<challengeLi.length;j++){
    challengeLi[j].addEventListener("click",function(e){
        e.preventDefault();
    })
}
for(i=0;i<challengeDt.length;i++){
    challengeDt[i].addEventListener("click",function(e){
        this.closest("li").classList.toggle("on");
    })
}