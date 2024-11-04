
'use strict'

import { test } from 'tap'
import { handlebars as hbs } from '../../../../lib/handlebars/index.js'
import * as helpers from '../../../../lib/handlebars/helpers/index.js'

test('handlebars helpers', async (t) => {
  for (const [name, helper] of Object.entries(helpers)) {
    t.type(hbs.helpers[name], 'function', `handle bars has helper named ${name}`)
    t.equal(hbs.helpers[name], helper, `handlers function reference ${name} loaded`)
  }
})
