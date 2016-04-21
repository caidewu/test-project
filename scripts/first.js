(function ($){
  $.fn.maxHeight = function (){
    var max = 0;
    // 下面这个this，指的是jQuery对象实例
    this.each(function() {
        // 回调函数内部，this指的是DOM对象
        max = Math.max(max, $(this).height());
    });
    return max;
  };
  $.fn.showLinkLocation = function() {
        return this.filter('a').append(function(){
            return ' (' + this.href + ')';
        });
    };
})(jQuery);