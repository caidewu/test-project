var commands = {        //命令集合
    blod: function () {
        console.log('blod');
    },
    font_family: function () {
        console.log('font_family');
    }
    ,
    font_color: function () {
        console.log('font_color');
    }
    ,
    code: function () {
        console.log('code');
    }

};

var Cmd = (function () {
    var track = [];
    return function (commands, type) {
        this.command = commands[type];
        this.exec = function () {
            var that = this;
            track.push(that.command);
            this.command();
        };
        this.undo = function () {
            var handle = track.pop();
            //do something;
        };
    }
})();

var blodCmd = new Cmd(commands, 'blod');//定义一个命令

// var menuItemBlod = new menuItem('blod', blodCmd);//一个菜单选项
