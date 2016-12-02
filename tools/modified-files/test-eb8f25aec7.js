// __VERSION__
var fs = require('fs');
var through = require('through2');
var crypto = require('crypto');

var hash = crypto.createHash('md5');

var buffer = fs.createReadStream('./prefixer.js')
    .pipe(hash.update)
    .pipe(hash.digest);
// var buffer = fs.readFile('./prefixer.js',function(err,data) {
//     console.log(data);
//     var str = data.toString();
// });
