'use strict'

import { postPublish } from './post-publish.js'

export function success(opts, context) {
  return postPublish(opts, context)
}
