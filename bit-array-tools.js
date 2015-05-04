/* BitArrayTools
 * tools for sjcl.bitArray
 * (c) 2015 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

/* UMD LOADER: https://github.com/umdjs/umd/blob/master/returnExports.js */
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.BitArrayTools = factory();
  }
}(this, function() {
    var BitArrayTools = {};
    
    // convert between various formats [source data, dest format (default: 'bitArray')]
    BitArrayTools.convert = function(source, to) {
        switch(to) {
            case 'utf8':
                return BitArrayTools._utf8(source);
              break;
            case 'bitArray':
                return BitArrayTools._bitArray(source);
              break;
            default:
                return BitArrayTools._bitArray(source);
              break;
        }
    };

    // modified sjcl.codec.utf8String.fromBits
    BitArrayTools._utf8_bitArray = function(arr) {
        var out = [], bl = BitArrayTools._bitLength(arr), i, tmp;

        for (i=0; i<bl/8; i++) {
            if ((i&3) === 0) {
                tmp = arr[i/4];
            }

            out.push(tmp >>> 24);
            tmp <<= 8;
        }

        return out;
    };

    BitArrayTools._utf8_string = function(source) {
        var i,n,str=source.toString(); source=[];

        for(i=0; i<str.length; i++) {
            n = str.charCodeAt(i);

            if(n>=256) {
                source.push(n>>>8 & 0xFF);
            }

            source.push(n & 0xFF);
        }

        return source;
    };

    // Convert a sjcl.bitArray or a string into utf8 byte array
    BitArrayTools._utf8 = function(source) {
        if(Array.isArray(source)) {
            return BitArrayTools._utf8_bitArray(source);
        } else {
            return BitArrayTools._utf8_string(source);
        }
    }; 

    // modified sjcl.codec.utf8String.toBits
    BitArrayTools._bitArray_utf8 = function(source) {
        var out = [], tmp = 0, j = 0;

        var str = source.map(function(v) {
            return String.fromCharCode(v);
        }).join('');

        source.forEach(function(v, i) {
            tmp = tmp << 8 | v;

            if((i&3) === 3) {
                out.push(tmp);
                tmp = 0;
            }

            j = i;
        });

        j++;

        if(j&3) {
            out.push(BitArrayTools._partial(8*(j&3), tmp));
        }

        return out;
    };

    // sjcl.bitArray.bitLength
    BitArrayTools._bitLength = function (a) {
        var l = a.length, x;

        if (l === 0) {
            return 0;
        }

        x = a[l - 1];

        return (l-1) * 32 + (Math.round(x/0x10000000000) || 32);
    };

    BitArrayTools._bitArray = function(source) {
        if(Array.isArray(source)) {
            return BitArrayTools._bitArray_utf8(source);
        }
    };

    BitArrayTools._partial = function (len, x, _end) {
        if (len === 32) {
            return x;
        }

        return (_end ? x|0 : x << (32-len)) + len * 0x10000000000;
    };

    return BitArrayTools;
}));
