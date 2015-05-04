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
    'BitArrayTools': {
        topic: BitArrayTools,
        'is undefined': function(topic) {
            assert.equal(topic, undefined);
        },
    }
}).export(module);