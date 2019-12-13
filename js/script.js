/*--------------- menu / buttons ---------------*/

const topmenu = document.querySelector('#nav-toggle');
const menuElement = document.querySelector('.nav-wrapper');
topmenu.addEventListener('click', function(){
    // console.log(menuElement);
    menuElement.parentNode.classList.toggle('active');
    $('.sidemenu').hide();
});


/*--------------- popups ---------------*/
    /* horizontal scroll*/
   $('.shop-wrapper').on('mousewheel DOMMouseScroll', function(event){
    //return 1 or -1 tp determine whether the page is scrolled to the left /1/ or to the right /-1/
    var delta = Math.max(-1, Math.min(1, (event.originalEvent.wheelDelta || -event.originalEvent.detail))); 
    // console.log(delta);
    $(this).scrollLeft( $(this).scrollLeft() - ( delta * 30 ) ); // initial position + direction * speed
    event.preventDefault(); // prevent vertical scrolling which is default
    });


    const btnCancel = document.querySelector('#cancel-info');
    const infopopup = document.querySelector('#info-popup');


    $('#btn-info').on('click', function(){
        $('#info-popup').addClass('active');
        $('.info-wrapper').addClass('active');
    });

    btnCancel.addEventListener('click', function(){
        // console.log(menuElement);
        $('#info-popup').removeClass('active');
        $('.info-wrapper').removeClass('active');
    });

    $('.bg-text-2, #shoutout').click(function(){
        $('.form-wrapper').addClass('active');
    });

    // $('.form-wrapper').on('transitionend MSTransitionEnd webkitTransitionEnd oTransitionEnd', function(){
    //     $('.form').addClass('scrollable');
    // });

    $('#cancel-form').click(function(){
        $('.form-wrapper').removeClass('active');
        // $('.form').removeClass('.scrollable');
    });

// /*--------------- scroll to section on click ---------------*/
const section1 = $('#section-1');
const section2 = $('#section-2');
const sec2_sub1 = $('#sec2-sub-1');
const sec2_sub2 = $('#sec2-sub-2');
const sec2_sub3 = $('#sec2-sub-3');
const section3 = $('#section-3');
const sec3_sub2 = $('#sec3-sub-2');

const btn_anatomy = $('.anatomy-item');
const bottom_nav = $('.section-nav-item');


function scroll_into_view(e){
    let btn = e.target;

    // $(btn).siblings().removeClass('active');
    // $(btn).addClass("active");

    let index = btn.dataset.sectionIndex;
    let targetSection = document.querySelector(`section[data-section-index="${index}"]`);
    let targetSection_top = $(targetSection).offset().top;

    $('html, body').animate(
        {scrollTop: targetSection_top},
        750
    );
}

btn_anatomy.click(scroll_into_view);
bottom_nav.click(scroll_into_view);


/*--------------- animation on scroll ---------------*/

function check_if_in_view(e){
	var window_height = $(window).height();
	var window_top_position = $(window).scrollTop();
    var window_bottom_position = window_top_position + window_height;
    
    var offset = window_height; /*offset*/
    var element = $(e);
    var element_top_position = element.offset().top;
    var element_height = element.height();
    var element_bottom_position = element_top_position + element_height;

    if(((element_bottom_position - offset) >= window_top_position) && 
        (element_top_position <= window_bottom_position)){
		return true;
    }else{
        return false;}
	
}

/*------------------toggle topping image-------------------*/
const submenu_btn = $('.sub-menu-btn');
const submenu = $('.sub-menu');
const menudetail = $('.detail');
const toppingbtn = $('#topping-menu').children();
const toppingitem = $('.illo.topping');
const teabtn = $('#tea-menu').children();
const teaitem = $('.cls-9');
const milkbtn = $('#milk-menu').children();
const milkitem = $('#milk-halftone');



/*
function illoInit(){
    // reset
    btn_anatomy.removeClass('active');
    submenu.removeClass('visible');
    submenu_btn.removeClass('active');
    // define
    let first_menu = btn_anatomy.first();
    let first_category = first_menu.data().category;
    let first_submenu = $(`ul[data-category="${first_category}"]`);

    let first_topping_btn = toppingbtn.first();
    let first_milk_btn = milkbtn.first();
    let first_tea_btn = teabtn.first();

    // make the first menu active
    first_menu.addClass('active');  // !!!!!!! this is overwritten by scrollMagic
    
    first_submenu.addClass('visible');

    first_milk_btn.addClass('active');
    first_topping_btn.addClass('active');
    first_tea_btn.addClass('active');
}
*/


submenu_btn.click(submenu_btn_state);
function submenu_btn_state(e){
    let btn = e.target;

    let toppingCategory = $(btn).data().category;
    let category = $(btn).parent().data().category;   
    let thisSubmenu = $(`ul[data-category="${category}"]`); 
    let this_submenu_btn = thisSubmenu.children();

    thisSubmenu.children().removeClass('active');
    $(btn).addClass('active'); //toggle styling on button

    menudetail.removeClass('active');
    $(`.detail[data-category="${toppingCategory}"]`).addClass('active'); // toggle body text
}



toppingbtn.click(toggleTopping);
function toggleTopping(e){
    let btn = e.target;
    let category = btn.dataset.category;
    let thisTopping = $(`svg[data-category="${category}"]`);
    toppingitem.removeClass('active');
    thisTopping.addClass('active'); //toggle visibility on topping item
}

milkbtn.click(toggleMilk);
function toggleMilk(e){
    let btn = e.target;
    let category = btn.dataset.category; //milk option btn
    let newClass = `${category}` + ' cls-10';

    milkitem.removeAttr('class');
    milkitem.addClass(newClass); //toggle between different kinds of tea
}

teabtn.click(toggleTea);
function toggleTea(e){
    let btn = e.target;
    let category = btn.dataset.category;
    let newClass = `${category}` + ' cls-9';

    teaitem.removeAttr('class');
    teaitem.addClass(newClass); //toggle between different kinds of tea
}

// ------ GSAP amd ScrollMage -----
function scroll_Magic(){
var controller = new ScrollMagic.Controller();

//_[1]__section 0___intro type animation
        let scrolloffset_intro = $(window).height() / 2;
        let scrolloffset_intro_2 = $(window).height() * 4;
        let scrolloffset_bgtext_1 = $('#bg-text-1-A').width() * -1;
        let scrolloffset_bgtext_2 = $('#bg-text-1-B').width();

        var timelineIntro = new TimelineLite();
        var timelineIntro_2 = new TimelineLite();

        timelineIntro 
        // .from("#intro-span-1", {y:"50", opacity:'0'})
        .from("#intro-1", {y:"80"})
        .from("#intro-span-2", {y:"50", opacity:'0'}, 0)
        .from("#intro-span-3", {y:"50", opacity:'0'}, "+=0.1")
        .from("#intro-span-4", {y:"50", opacity:'0'}, "+=0.1");

        timelineIntro_2
        .to("#intro-1", {y:"-50", opacity:'0'},0)
        .from("#intro-2", {y:"50", opacity:'0'},.1)
        .to("#intro-2", {y:"-50", opacity:'0'},"+=.2")
        .from("#bg-text-1-B", {x:`${scrolloffset_bgtext_2}`},.9)
        .from("#bg-text-1-A", {x:`${scrolloffset_bgtext_1}`},.9)
        ;

        new ScrollMagic.Scene({triggerElement: "#section-0", duration: "300%"})
            .offset(scrolloffset_intro)
            .setTween(timelineIntro)
            // .addIndicators({name: "intro-1 (duration: 300%)"}) // add indicators
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#section-0", duration: "550%"})
            .offset(scrolloffset_intro_2)
            .setTween(timelineIntro_2)
            // .addIndicators({name: "intro-2 (duration: half%)"}) // add indicators
            .addTo(controller);


        new ScrollMagic.Scene({triggerElement: "#section-2", duration: "600%"})
            .offset(200)
            .on('enter leave', function(){
            $(".detail-wrapper").toggleClass('visible')})
            // .addIndicators({name: "section-2 offset:200 (duration: 200%)"}) // add indicators
            .addTo(controller);


//_[2]__section 1___type & cup animation   
        var timelineText = new TimelineLite();
        var timelineIllo = new TimelineLite();
        timelineText
                .to("#bg-text-1-A", {right: "-200vw"}, 0)
                .to("#bg-text-1-B", {left: "-100vw"}, 0);

        timelineIllo
                .to("#illo-cup-outline", {x:0, y:0}, 0)
                .to("#illo-cup-fill", {x:0, y:0}, 0)
                .to("#illo-tea", {x:0, y:0}, 0.1)
                .to("#illo-milk", {x:0, y:0}, 0.2)
                .to(".topping-wrapper-wrapper", {x:0, y:0}, 0.4)

                .call(function() {
                    $('#btn-info').toggleClass("move");
                    $('.nav-anatomy').toggleClass("move");
                    }, null, null)

                .to("#illo-straw", {x:0, y:0}, .5)

                // .from(".illo-wrapper-after", {boxShadow:"0 0 0 0 var(--dark)"}, 0)
                .from(".illo-wrapper-after", {height: "0%"}, .2)
                .from(".illo-wrapper-after", {width: "0%"}, .4)
                ;

                // .from("#btn-info", {x:"0", opacity:0}, .5)
                // .from(".nav-anatomy", {x:"50px", opacity:0},.5);


        new ScrollMagic.Scene({triggerElement: "#section-1-trigger", duration: "600%"})
            .setTween(timelineText)
            // .addIndicators({name: "#section-1-trigger / text (duration: 350%)"}) // add indicators
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#section-1-trigger", duration: "550%"})
            .setTween(timelineIllo)
            // .addIndicators({name: "illo (duration: 250%)"}) // add indicators
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#section-1", duration: "150%"})
            .setTween(".illo-wrapper-after", {boxShadow:"0 0 0 var(--strokeWidth) var(--dark)"})
            // .addIndicators({name: "#section-1 / illo (duration: 250%)"}) // add indicators
            .addTo(controller);


// buttom navigation status
        new ScrollMagic.Scene({triggerElement: "#section-0", duration: `${$('#section-0').height()}`})
            .setClassToggle(bottom_nav[0], "active")
            // .addIndicators({name: "#section-1 / illo (duration: 250%)"}) // add indicators
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#section-2", duration: `${$('#section-2').height()}`})
            .setClassToggle(bottom_nav[1], "active")
            // .addIndicators({name: "#section-1 / illo (duration: 250%)"}) // add indicators
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#sec3-sub-1", duration: `${$('#sec3-sub-1').height()}`})
            .setClassToggle(bottom_nav[2], "active")
            // .addIndicators({name: "#section-1 / illo (duration: 250%)"}) // add indicators
            .addTo(controller);
        
        new ScrollMagic.Scene({triggerElement: "#sec3-sub-2", duration: `${$('#sec3-sub-2').height()}`})
            .setClassToggle(bottom_nav[3], "active")
            // .addIndicators({name: "#section-1 / illo (duration: 250%)"}) // add indicators
            .addTo(controller);


//_[3]__section 2___customizaiton
        const category_1 = "topping";
        const category_2 = "milk";
        const category_3 = "tea";

        // sec2-sub-1
        new ScrollMagic.Scene({ triggerElement: '#sec2-sub-1', triggerHook: 'onLeave', duration: "200%" })
        .offset(-500)
        .on('enter leave', function () {
            $('#topping-menu').toggleClass('visible');
            $('#btn-topping').toggleClass('active');
            $(`.sub-menu-btn[date-parent-category="${category_1}"]`).first().toggleClass('active');
            $('.details[data-category="topping"]').toggleClass('visible');
            $('.detail[data-parent-category="topping"]').first().toggleClass('active');
            $('#div-bg').css("background-color", "var(--pink)");
        })
        // .addIndicators({name: "sub-1"})
        .addTo(controller);

        // sec2-sub-2
        new ScrollMagic.Scene({ triggerElement: '#sec2-sub-2', triggerHook: 'onLeave', duration: "200%"})
        .offset(-500)
        .on('enter leave', function () {
            $('#milk-menu').toggleClass('visible');
            $('#btn-milk').toggleClass('active');
            $(`.sub-menu-btn[date-parent-category="${category_2}"]`).first().toggleClass('active');
            $('.details[data-category="milk"]').toggleClass('visible');
            $('.detail[data-parent-category="milk"]').first().toggleClass('active');
            $('#div-bg').css("background-color", "var(--paleyellow)");
        })
        // .addIndicators({name: "sub-2"}) 
        .addTo(controller);

        // sec2-sub-3
        new ScrollMagic.Scene({ triggerElement: '#sec2-sub-3', triggerHook: 'onLeave', duration: "200%"})
        .offset(-500)
        .on('enter leave', function () {
            $('#tea-menu').toggleClass('visible');
            $('#btn-tea').toggleClass('active');
            $(`.sub-menu-btn[date-parent-category="${category_3}"]`).first().toggleClass('active');
            $('.details[data-category="tea"]').toggleClass('visible');
            $('.detail[data-parent-category="tea"]').first().toggleClass('active');
            $('#div-bg').css("background-color", "var(--green)");
        })
        // .addIndicators({name: "sub-3"})
        .addTo(controller);
        }




/*--------- dynamic sizing ---------*/

var d = $('.illo-wrapper').width() * 1.5;
var window_w = $(window).width();
const padding_r = d/6;
const padding_l = d/5 + 20;

let w = (window_w - d)/2 - padding_r - padding_l;
let offset = window_w/2 + d/2 + padding_r;

$('.detail-wrapper').css({"width":`${w}`, "right": `${offset}px`});


/*——————reload scrollMagic on resizing——————*/
scroll_Magic(); 

// $(window).on("resize", function(){
//     scroll_Magic();
// });





// about section toggle
$('.nav-item[data-menu="about"]').click(function(){
    $('.about-container').fadeIn(250);
})
$('.about-container').click(function(){
    $(this).fadeOut(250);
})

$('.nav-item[data-menu="social"]').click(function(){
    $('.social-container').fadeIn(250);
})
$('.social-container').click(function(){
    $(this).fadeOut(250);
})




$('#shoutout').hover(
    function(){$('.bg-text-2').toggleClass('active')}
);
$('.bg-text-2').hover(
    function(){$('#shoutout-fill').toggleClass('active')}
);




//form