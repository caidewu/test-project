// __VERSION__
var File = require('vinyl');

var coffeeFile = new File({
    cwd: "/",
    base: "/test/",
    path: "/test/file.coffee",
    contents: new Buffer("test = 123")
});
console.log(coffeeFile);