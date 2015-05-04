/* BitArrayTools / test / basic.js
 * basic test
 * (c) 2015 David (daXXog) Volm ><> + + + <><
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

var vows = require('vows'),
    assert = require('assert'),
    BitArrayTools = require('../bit-array-tools.min.js');

vows.describe('basic').addBatch({
    'typeof BitArrayTools': {
        topic: function() {
        	return typeof BitArrayTools;
        },
        'is an object': function(topic) {
            assert.equal(topic, 'object');
        },
    },
    'typeof BitArrayTools.convert': {
        topic: function() {
        	return typeof BitArrayTools.convert;
        },
        'is a function': function(topic) {
            assert.equal(topic, 'function');
        },
    },
    'can convert from a string': {
    	topic: function() {
    		return BitArrayTools.convert('hello world', 'utf8');
    	},
    	'to utf8 array': function(topic) {
    		assert.deepEqual(topic, [ 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 ]);
    	}
    },
    'can convert from a utf8 array': {
    	topic: function() {
    		return BitArrayTools.convert([ 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 ], 'bitArray');
    	},
    	'to a bitArray': function(topic) {
    		assert.deepEqual(topic, [ 1751477356, 1864398703, 26390198772736 ]);
    	}
    },
    'can convert from a utf8 array (default)': {
        topic: function() {
            return BitArrayTools.convert([ 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 ]);
        },
        'to a bitArray': function(topic) {
            assert.deepEqual(topic, [ 1751477356, 1864398703, 26390198772736 ]);
        }
    },
    'can convert from a bitArray': {
    	topic: function() {
    		return BitArrayTools.convert([ 1751477356, 1864398703, 26390198772736 ], 'utf8');
    	},
    	'to a utf8 array': function(topic) {
    		assert.deepEqual(topic, [ 104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100 ]);
    	}
    }
}).export(module);