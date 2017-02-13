import o from 'ospec'
import { merge } from './index.js'

o.spec('utils - merge', () => {

  o.spec('throws when target is not an object', () => {
    o('null', (done) => {
      try {
        merge(null)
      } catch (e) {
        done()
      }
    })

    o('undefined', (done) => {
      try {
        merge(undefined)
      } catch (e) {
        done()
      }
    })
  })

  o('does not throw on null or undefined sources', (done) => {
    try {
      merge({}, '', null)
      merge({}, '', undefined)
      merge({}, '', undefined, null)
      done()
    } catch (e) { /* will fail with timeout */ }
  })

  o('assigns own enumerable properties from source to target', () => {
    o(merge({ foo : 0 }, '', { bar : 1 })).deepEquals({ foo : 0, bar : 1 })
    o(merge({ foo : 0 }, '', null, undefined)).deepEquals({ foo : 0 })
    o(merge({ foo : 0 }, '', null, undefined, { bar : 1 }, null)).deepEquals({ foo : 0, bar : 1 })
  })

  o('supports multiple sources', () => {
    o(merge({ foo : 0 }, '', { bar : 1 }, { bar : 2 })).deepEquals({ foo : 0, bar : 2 })
    o(merge({}, '', {}, { bar : 2 })).deepEquals({ bar : 2 })
  })

  o('only iterates own keys', () => {
    const Unicorn = function() {}
    Unicorn.prototype.rainbows = 'double'
    const unicorn = new Unicorn()
    unicorn.bar = 1

    o(merge({ foo : 0 }, '', unicorn)).deepEquals({ foo : 0, bar : 1 })
  })

  o('returns the modified target object', () => {
    const target = {}
    const returned = merge(target, '', { a : 1 })
    o(target === returned).equals(true)
  })

  o('supports Object.create(null) objects', () => {
    const obj = Object.create(null)
    obj.foo = true
    o(merge({}, '', obj)).deepEquals({ foo : true })
  })

  o('preserves property order', () => {
    const letters = 'abcdefghijklmnopqrst'
    const source  = {}

    letters.split('').forEach((letter) => source[letter] = letter)
    const target = merge({}, '', source)
    o(Object.keys(target).join('') === letters).equals(true)
  })

  o('accepts primitives as target', () => {
    const target = merge('abcdefg', '', { foo : 'bar' })
    const strObj = Object('abcdefg')
    strObj.foo = 'bar'
    o(target).deepEquals(strObj)
  })
})
