'use strict'

import { test } from 'tap'
import { pick } from '../../../../lib/handlebars/helpers/index.js'

test('handlebars helpers', async (t) => {
  t.test('pick', async (t) => {
    t.same(pick(null, undefined, []), [], 'Should return empty array')
    t.same(pick(null, undefined, '', [], 100), [], 'Should return empty array')
    t.equal(pick(null, 0, undefined, []), 0, 'Should return 0')
    t.equal(pick(null, undefined, 'null', []), 'null', 'Should return "null"')
  })
})
