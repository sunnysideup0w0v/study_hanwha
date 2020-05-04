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
            // let realIndexArr = [];
            // for(i=0;i<pagination.length;i++){
            //     pagination[i].classList.remove("active");               
            // }
            // 
            // 문제점: eq realIndex??
            $("#mainVisual .pagination li").removeClass("active");
            $("#mainVisual .pagination li").eq(this.realIndex).addClass("active");
        },
    },
});

// for(i=0;i<pagination.length;i++){
//     pagination[i].addEventListener("click",function(){
//         if(!mainVisual.animating){
//             this.classList.add('active');
//         }
//     })
// }
// } 너도 좀 이따가.. 문제점: this.index()+1 여기
$("#mainVisual .pagination li").on("click",function(){
    if(!mainVisual.animating) {
        $(this).addClass("active");
        $(this).siblings("li").removeClass("active");
        console.log("$this",$(this))
        mainVisual.slideTo($(this).index()+1);
    }
    return false;
})

let gnbLi =  document.querySelectorAll("#gnb .gnbList > li");
let only = document.querySelector("#gnb .gnbList > li.only");
let notOnly = [];
for(i=0;i<gnbLi.length;i++){
    if(!gnbLi[i].classList.contains("only")){
        notOnly.push(gnbLi[i])
    }
}
for(i=0;i<notOnly.length;i++){
    notOnly[i].addEventListener("mouseover",function(){
        document.querySelector("#header").classList.add("hover");
    });
    notOnly[i].addEventListener("mouseleave",function(){
        document.querySelector("#header").classList.remove("hover");
    })
}

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
    if(wheel>0){
        if(!mainVisualContent.classList.contains("scroll")){
            mainVisualContent.classList.add("scroll");
            console.log("aaaa");
            gsap.to("html,body",{
                scrollTop: window.innerHeight,
                duration:1
            })
        }
    }
})

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
        console.log(this.closest("li"))
    })
}