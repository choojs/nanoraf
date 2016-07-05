const window = require('global/window')
const assert = require('assert')

module.exports = nanoraf

// Only call RAF when needed
// fn -> fn
function nanoraf (render) {
  assert.equal(typeof render, 'function', 'nanoraf: render should be a function')

  var inRenderingTransaction = false
  var redrawScheduled = false
  var currentState = null

  // pass new state to be rendered
  // (obj, obj?) -> null
  return function frame (state, prev) {
    assert.equal(typeof state, 'object', 'nanoraf: state should be an object')
    assert.equal(typeof prev, 'object', 'nanoraf: prev should be an object')
    assert.ifError(inRenderingTransaction, 'nanoraf: infinite loop detected')

    // request a redraw for next frame
    if (currentState === null && !redrawScheduled) {
      redrawScheduled = true

      window.requestAnimationFrame(function redraw () {
        redrawScheduled = false
        if (!currentState) return

        inRenderingTransaction = true
        render(currentState, prev)
        inRenderingTransaction = false

        currentState = null
      })
    }

    // update data for redraw
    currentState = state
  }
}
