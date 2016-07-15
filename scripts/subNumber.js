(function() {
    function cutNumber(num) {
        var arr = [];
        if (num > 1e+15) {
            num = "" + num;
            var array = num.split('');
            return cut(array,1).join('');
        } else {
            while (true) {  // 以数字的形式处理
                var block = num % 1000;
                num = parseInt(num / 1000);
                if (block < 10 && num > 0) {
                    arr.push("00" + block);
                } else if (block < 100 && num > 0) {
                    arr.push("0" + block);
                } else {
                    arr.push("" + block);
                }
                if (num === 0) {
                    break;
                }
            }
            return arr.reverse().join(',');
        }
    }

    function cut(array,i) { // 以字符串的形式处理
        if (array.length < 4) {
            return array;
        } else {
            i-=4;
            array.splice(i,0,',');
            if (array[0] == ',') {
                array.shift();
                return array;
            } else {
                cut(array,i);
            }
        }
    }
})();