
var headHeight = $('.ui-slider').height();
/*
 * 创建 slider 动效容器
 */
var sliderCover = document.createElement("div");
sliderCover.setAttribute('class','slider-cover');
$('body').append( sliderCover );

var $content = $(".content"),
    target = $content[0];
var $copyslider = $(".slider-cover"),
    copyslider = $copyslider[0];
var $headImg = $(".sticky-head").eq(0);
var $boteffect = $('.bottom-effect'),
    boteffect = $('.bottom-effect')[0]

Transform(target);
Transform(copyslider);
Transform(boteffect);

// tab 固定
$(window).scroll(function(){
    if(document.body.scrollTop  >= headHeight){
        // $('.index-nav.sticky').addClass('show');
    }else{
        // $('.index-nav.sticky').removeClass('show');
    }
});
$navHtml = $('.index-nav')[0].cloneNode(true);
$('body').append( $navHtml );
$('.index-nav').eq(1).addClass('sticky');
/*
 * 菜单切换
 */
var currentPage = $('.ui-tab-nav li.current').index();
var tabLength = $('.ui-tab-nav li').length - 1;
tabLength = (tabLength-1) /2;
var left = 0.5 / tabLength * (2 * currentPage + 1) * 3.75 + 'rem';

$('.current-bg').css('-webkit-transform', 'translate3d('+ left +', 0, 0)');

$('.ui-tab-content>li:not(.current)').hide();
$('.ui-tab-nav li').tap(function(e) {
    if ($(this).hasClass('current')) return;
    currentPage = $(this).index();
    setTimeout(function() {
        $('.ui-tab-nav li').eq(currentPage).removeClass('active');
    }, 300);

    $('.ui-tab-nav>li.current').removeClass('current');
    $('.ui-tab-nav li').eq(currentPage).addClass('current');
    $('.ui-tab-content>li.current').hide().removeClass('current');
    $('.ui-tab-content>li').eq(currentPage).show().addClass('current');

    left = 0.5 / tabLength * (2 * currentPage + 1) * 3.75 + 'rem';
    currentWidth = $(this).find('p').width()+10;
    $('.current-bg').css({
        width: currentWidth+'px',
        marginLeft: -currentWidth/2 + 'px',
        '-webkit-transform': 'translate3d(' + left + ', 0, 0)'
    });
});

/*
 * slider
 */
$('.ui-slider-content li').eq(0).addClass('current');
$('.ui-slider-indicators li').eq(0).addClass('current');
$('.ui-slider-content li').eq(0).find('.figure').show().addClass('animated');
/*
 * 下拉动效：插入slider
 */
$sliderHtml = $('.ui-slider')[0].cloneNode(true);
$(".slider-cover").html( $sliderHtml );
$(".slider-cover .current .figure").removeClass('animated').removeClass('slideInRight');

seajs.use(["../../js/slip","../../js/zepto"],function(Slip,$) {
    var ban = $('.ui-slider-content'); //banner容器的dom
    var focus = $('.ui-slider-indicators').eq(0); //右下角的点点点
    var picCount = 4; //banner的图片数量
    var _banWidth = ban.width()  / picCount;
    var bannerSlip=Slip("page",ban.get(0),{
        change_time:10000,
        num:picCount,
        wide_high:_banWidth,
        parent_wide_high:_banWidth,
        endFun:function(){
            var p = this.page;
            $('.ui-slider-content li').removeClass('current').eq(p).addClass('current');

            $('.ui-slider-content li').eq(p-1).find('.figure').hide().removeClass('animated');
            $('.ui-slider-content li').eq(p+1).find('.figure').hide().removeClass('animated');

            setTimeout(function(){
                $('.ui-slider-content li').eq(p).find('.figure').show().addClass('animated');
            }, 0)
            focus.find('li').removeClass('current').eq(p).addClass('current');

            $sliderHtml = $('.ui-slider')[0].cloneNode(true);
            $(".slider-cover").html( $sliderHtml );
            $(".slider-cover .current .figure").show().removeClass('animated').removeClass('slideInRight');
        },
        startFun: function(i){
            var p = this.page;
        },
        moveFun: function(){
        },
        touchEndFun: function(e){
        }
    });
    bannerSlip.toPage(0);
});
/*
 * 模拟点击态
 */
$('.ui-slider-content,.cover-list,.update-list,.hot-banner,.ui-row').delegate("li", "click", function(e) {
    var item = $(this);
    item.addClass('active');
    setTimeout(function() {
        item.removeClass('active');
    }, 300)
});
$('section').delegate(".end-notice,.ui-arrowlink", "click", function(e) {
    var item = $(this);
    item.addClass('active');
    setTimeout(function() {
        item.removeClass('active');
    }, 300)
});
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() > $('.tag-pop').offset().top + 30) {
        $('.tag-pop').addClass('show');
    }
});

/*
 * touch
 */
$(window).scroll(function(e) {

});

var bottomTop = $content.height() - $(window).height();
var startY,lastY,
    sliderHeight = $('.ui-slider').height(),
    isScale = false,
    isTouchStart = false,
    direction;

$('body').on('touchstart', function (e) {
    if($(window).scrollTop()<= 0){
        direction = 'up'
    } else if($(window).scrollTop()>= (bottomTop-10)) {
        direction = 'down';
    } else {
        direction = null
    }
    console.log(direction);
    if(direction){
        isTouchStart = true;
        isScale = true;
        startY = e.changedTouches[0].pageY;
        startX = e.changedTouches[0].pageX;
    } else {
        //
    }
});
$('body').on('touchmove',function (e) {
    if ( isTouchStart ){
        var dDis=Math.abs(e.touches[0].pageX - startX) - Math.abs(e.touches[0].pageY - startY);
        if(dDis>0) return;
        if(e.changedTouches[0].pageY - startY > 0 && isScale && direction=='up'){
            // 下滑
            e.preventDefault();
            lastY = e.changedTouches[0].pageY;
            var scale = (1 + (lastY - startY)/(2*sliderHeight)).toFixed(2);
            $copyslider.addClass('show');
            copyslider.scaleX = copyslider.scaleY = scale;
            target.translateY = sliderHeight * (scale - 1);
        } else if(e.changedTouches[0].pageY - startY < 0 && isScale && direction=='down'){
            // 上滑
            e.preventDefault();
            var currentY = -(startY-e.changedTouches[0].pageY)/2
            if (currentY<-120){
                currentY = -120
            }
            target.translateY = boteffect.translateY = currentY;
        }
    }
});
$('body').on('touchend',function (e) {
    var dis = e.changedTouches[0].pageY - startY;
    var time = dis;
    if ( time<150 ) {
        time = 150;
    } else if( time>250 ) {
        time = 250;
    }
    console.log(time);
    if(isTouchStart && isScale){
        to(target, 'translateY', 0, time, iosEase, onChange, function(){
            // 动画结束回调
            $copyslider.removeClass('show');
            $content.attr('style','');
        });
        to(boteffect, 'translateY', 0, time, iosEase);
        isScale = false;
    }
});

function onChange(value){
    if(direction=='up'){
        copyslider.scaleX = copyslider.scaleY = (headHeight+value)/headHeight;
    } else if(direction=='down') {

    }

}

function iosEase(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}

var tickID = 0
function to(el, property, value, time, ease, onChange, onEnd) {
    var current = el[property];
    var dv = value - current;
    var beginTime = new Date();
    var toTick = function () {

        var dt = new Date() - beginTime;
        if (dt >= time) {
            el[property] = value;
            onChange && onChange(value);
            onEnd && onEnd(value);
            return;
        }
        el[property] = dv * ease(dt / time) + current;
        tickID = requestAnimationFrame(toTick);
        //cancelAnimationFrame必须在 tickID = requestAnimationFrame(toTick);的后面
        onChange && onChange(el[property]);
    }
    toTick();
};


(function () {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

