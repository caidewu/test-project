// __VERSION__
var fs = require('fs');
var through = require('through2');
var crypto = require('crypto');
var revHash = require('rev-hash');

var hash = crypto.createHash('md5');

fs.createReadStream('./prefixer.js')
    .pipe(through.obj(function(file, enc, cb) {
        console.log(hash.update(file).digest('hex'));
    }));



// var buffer = fs.readFile('./prefixer.js',function(err,data) {
//     console.log(data);
//     var str = data.toString();
// });
