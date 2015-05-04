/* BitArrayTools / make.js
 * echo 'make script for BitArrayTools' && node make
 * (c) 2015 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var bitfactory = require('bitfactory'),
    UglifyJS = require("uglify-js"),
    stoptime = require('stoptime'),
    fs = require('fs');

var watch = stoptime(),
    header = '';

bitfactory.make({ //routes
    "": function(err, results) {
        console.log('built BitArrayTools in ' + watch.elapsed() + 'ms.');
    }
}, { //dependencies
    "*": { //wildcard
        "header": function(cb) {
            fs.readFile('bit-array-tools.h', 'utf8', function(err, data) {
                header = data;
                cb(err);
            });
        },
        "bit-array-tools.min.js": ["header", function(cb) {
            fs.writeFileSync('bit-array-tools.min.js', header + UglifyJS.minify('bit-array-tools.js').code);
            cb();
        }]
    }
});