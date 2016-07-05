const test = require('tape')
const nanoraf = require('./')

test('should assert input types', function (t) {
  t.plan(1)
  t.throws(nanoraf)
})
