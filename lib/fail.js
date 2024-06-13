"use strict";

import { postPublish } from "./post-publish.js";

export function fail(opts, context) {
  return postPublish(opts, context);
}
