'use strict'

import Handlebars from 'handlebars'
import * as helpers from './helpers/index.js'

const handlebars = Handlebars.noConflict()

for (const [key, value] of Object.entries(helpers)) {
  handlebars.registerHelper(key, value)
}

export { handlebars }

