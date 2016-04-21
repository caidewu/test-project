'use strict';
(function() {
    var _data = window.GALLERY_DATA,
        _body = $(document.body),
        _wrapper = $('#photo_wrapper'),
        _navWrapper = $('#nav_wrapper'),
        _photoTpl = $('#photo_tpl').children(),
        _photos,
        _i =1,
        _range = range();


    $.each(_data, function(k,v) {
        var photo = _photoTpl.clone();
        photo.attr('id', 'photo_'+ k);

        photo.find('p img').attr('src', v.image);
        photo.find('p.js-caption').html(v.caption);
        photo.find('p.js-desc').html(v.desc);
        _wrapper.append(photo);
        _navWrapper.append('<span id="nav_' + k + '"></span>');


    });


    _photos = _wrapper.children();
    setTimeout(function() {
        allResort(random(0,_data.length-1));
    });



    _photos.on('click', choosePhoto);
    _navWrapper.children().on('click',choosePhoto);

    function choosePhoto() {
        var photo,nav;
        var tmp = this.id.split('_');
        if (tmp[0] == 'photo') {
            photo = $(this);
            nav = $('#nav_' + tmp[1]);
        } else {
            nav = $(this);
            photo = $('#photo_' + tmp[1]);
        }
        if (photo.hasClass('photo_center')) {
            if (photo.hasClass('photo_back')) {
                photo.removeClass('photo_back').addClass('photo_front');
                nav.removeClass('back');
            } else {
                photo.removeClass('photo_front').addClass('photo_back');
                nav.addClass('back');
            }
        } else {
            allResort(this.id.split('_')[1]);
        }
    }

    function allResort(id) {
        _photos.removeClass('photo_center photo_back');
        _navWrapper.children().removeClass('current back');
        $('.js-photo').each(function(k) {
            var photo = $(this);
            if (this.id != id) {
                resort(photo,k>_data.length/2? 'right':'left');
            }
        });
        $('#photo_' + id).css({ transform: 'rotate(0deg) scale(1.3)',  top: '50%', left: '50%' , margin: '-160px 0 0 -130px'}).addClass('photo_center');
        $('#nav_' + id).addClass('current');
    }

    function resort(photo,side) {
        var left,top;
        left = random(_range.x[side].min,_range.x[side].max);
        top = random(_range.y.min,_range.y.max);
        photo.css({left: left + 'px', top: top + 'px', transform: 'rotate(' + random(0,360) + 'deg) scale(1)', margin:0});
    }

    function range() {
        var wh = _wrapper.height();
        var ww = _wrapper.width();
        var ph = _photoTpl.height();
        var pw = _photoTpl.width();
        var margin = -pw/2;
        var marginCenter = pw/2;

        return {
                x: {
                    left : {
                        min : margin,
                        max : ww/2 + marginCenter
                    },
                    right : {
                        min : ww/2 - marginCenter,
                        max : ww - pw - margin
                    }
                },
                y: {
                    min : margin,
                    max : wh - ph - margin
                }
        }
    }

    function random(min,max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }
})();