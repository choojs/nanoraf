# nanoraf [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Only call RAF when needed.

## Usage
```js
var nanoraf = require('nanoraf')
var prev = null

var frame = nanoraf(function render (state) {
  console.log(state.now)
})

updateState({ now: date.now() })
updateState({ now: date.now() })
updateState({ now: date.now() })
updateState({ now: date.now() })

function updateState (state) {
  prev = prev || {}
  frame(state, prev)
  prev = state
}
```

## API
### frame = nanoraf(render, raf?)
Wrap a `render` function that is called on every `raf` tick. If no new state is
available, it will not tick. Passes the last version of the state on every tick.

Optionally, provide an implementation of `requestAnimationFrame` via the
`raf` parameter (for example, the one provided by the [raf
package](https://www.npmjs.com/package/raf)).  If omitted, `raf` defaults to
`window.requestAnimationFrame`.

### frame([arguments])
Pass arguments into the render function, to be called on a new tick.

## Installation
```sh
$ npm install nanoraf
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/nanoraf.svg?style=flat-square
[3]: https://npmjs.org/package/nanoraf
[4]: https://img.shields.io/travis/yoshuawuyts/nanoraf/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/nanoraf
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/nanoraf/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/nanoraf
[8]: http://img.shields.io/npm/dm/nanoraf.svg?style=flat-square
[9]: https://npmjs.org/package/nanoraf
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
