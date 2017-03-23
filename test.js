var test = require('tape')
var window = require('global/window')
var nanoraf = require('./')
function noop () {}

test('should assert input types', function (t) {
  t.plan(2)
  t.throws(nanoraf.bind(null), /function/)
  t.throws(nanoraf.bind(null, noop, 123), /function/)
})

test('should request a frame', function (t) {
  t.plan(2)
  var currentState = { status: 'currentState' }
  var previousState = { status: 'previousState' }
  window.requestAnimationFrame = function (fn) { t.fail() }
  var frame = nanoraf(render, function (fn) { setImmediate(fn) })
  frame(currentState, previousState)
  function render (curr, prev) {
    t.same(curr, currentState)
    t.same(prev, previousState)
  }
})
