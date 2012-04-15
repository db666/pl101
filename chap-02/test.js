var assert = require('assert');
var compiler = require('./compiler.js')
var melody_mus = 
{ tag: 'seq',
    left: 
    { tag: 'par',
        left: { tag: 'note', pitch: 'c3', dur: 250 },
        right: { tag: 'note', pitch: 'g4', dur: 500 } },
    right:
    { tag: 'par',
        left: { tag: 'note', pitch: 'd3', dur: 500 },
        right: { tag: 'note', pitch: 'f4', dur: 250 } } };
var melody_note = [
    { tag: 'note', pitch: 'c3', start: 0, dur: 250 },
    { tag: 'note', pitch: 'g4', start: 0, dur: 500 },
    { tag: 'note', pitch: 'd3', start: 500, dur: 500 },
    { tag: 'note', pitch: 'f4', start: 500, dur: 250 } ];
var ans = compiler.compile(melody_mus);
console.log('Expected: ', melody_note);
console.log('Result: ', ans);
assert.deepEqual(ans, melody_note, "Compile function failed")
