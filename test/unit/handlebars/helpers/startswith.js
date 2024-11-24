'use strict'

import { test } from 'tap'
import { startswith } from '../../../../lib/handlebars/helpers/index.js'

test('handlebars helpers', async (t) => {
  t.test('startswith', async (t) => {
    t.equal(startswith('foobar', 'bar'), false, 'foobar not startswith bar')
    t.equal(startswith('foobar', 'foo'), true, 'foobar startswith foo')
    t.equal(startswith([], 'Array]'), false, 'false with not a string')
  })
})
