'use strict'

import { test } from 'tap'
import * as object from '../../../lib/lang/object/index.js'

test('object', async (t) => {
  const obj = {
    foo: {
      bar: {
        baz: {
          key: 'value'
          , test: null
        }
      }
      , value: 'foobar'
      , array: [1, 2, 3]
    }
    , bar: 0
    , baz: false
    , biff: null
  }

  t.test('get', async (tt) => {
    tt.match(object.get(obj, 'foo.bar'), {
      baz: {
        key: 'value'
        , test: null
      }
    })
    tt.same(object.get(obj, 'foo.array'), [1, 2, 3], 'foo.array')
    tt.equal(object.get(obj, 'foo.bar.baz.key'), 'value', 'foo.bar.baz.key')
    tt.equal(object.get(obj, 'foo|bar|baz|key', '|'), 'value', 'foo.bar.baz.key')
    tt.equal(object.get(obj, 'does.not.exist'), undefined, 'does.not.exist')
    tt.equal(object.get(obj, 'foo.bar.baz.test'), null, 'foo.bar.baz.test')
    tt.equal(object.get(null, 'foo.bar.baz'), null, 'null input')
  })

  t.test('has', async (t) => {
    t.ok(object.has(obj, 'bar'), 'key found')
    t.ok(object.has(obj, 'biff'), 'has key w/ null value')
    t.not(object.has(obj, 'whizbang'), 'key not found')
    t.not(object.has(undefined, 'whizbang'), 'undefined object')

  })
})
