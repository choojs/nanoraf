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
  // obj -> null
  return function frame (state) {
    assert.equal(typeof state, 'object', 'nanoraf: data should be an object')
    assert.ifError(inRenderingTransaction, 'nanoraf: infinite loop detected')

    // request a redraw for next frame
    if (currentState === null && !redrawScheduled) {
      redrawScheduled = true

      window.requestAnimationFrame(function redraw () {
        redrawScheduled = false
        if (!currentState) return

        inRenderingTransaction = true
        render(currentState)
        inRenderingTransaction = false

        currentState = null
      })
    }

    // update data for redraw
    currentState = state
  }
}
