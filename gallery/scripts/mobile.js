(function($) {
    var _body = $(document.body),
        _height = _body.height(),
        _width = _body.width(),
        _$poster = $('#poster');


    _$poster.on('tap',function() {
        posterTransition(setPosterPosition());
    });

    function random(min, max) {
        return Math.ceil(Math.random() * (max - min) + min);
    }

    function setPosterPosition() {
        return {
            left : random(-50,_width - 50),
            top : random(-75, _height -75),
            range: random(0, 360)
        }
    }

    function posterTransition(options) {
        _$poster.css({
           'left': options.left + 'px',
           'top': options.top + 'px',
           'transform':'rotate('+ options.range + 'deg)'
        });

    }

})(Zepto);