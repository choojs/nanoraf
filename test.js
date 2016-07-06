const test = require('tape')
const window = require('global/window')
const nanoraf = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(nanoraf)
})

test('should default to window.requestAnimationFrame', function (t) {
  t.plan(2)
  const currentState = { status: 'currentState' }
  const previousState = { status: 'previousState' }
  window.requestAnimationFrame = function (fn) { setImmediate(fn) }
  const render = function (curr, prev) {
    t.same(curr, currentState)
    t.same(prev, previousState)
  }
  const frame = nanoraf(render)
  frame(currentState, previousState)
})

test('should use custom raf if provided', function (t) {
  t.plan(2)
  const currentState = { status: 'currentState' }
  const previousState = { status: 'previousState' }
  window.requestAnimationFrame = function (fn) { t.fail() }
  const render = function (curr, prev) {
    t.same(curr, currentState)
    t.same(prev, previousState)
  }
  const frame = nanoraf(render, function (fn) { setImmediate(fn) })
  frame(currentState, previousState)
})

test('should call render with newest "current" state and oldest "previous" state', function (t) {
  t.plan(2)
  const states = [
    {count: 0},
    {count: 1},
    {count: 2}
  ]

  window.requestAnimationFrame = function (fn) { setImmediate(fn) }
  const render = function (curr, prev) {
    t.same(curr, states[2])
    t.same(prev, states[0])
  }

  const frame = nanoraf(render)
  frame(states[1], states[0])
  frame(states[2], states[1])
})

