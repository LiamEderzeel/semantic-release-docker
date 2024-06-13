"use strict";

export * from "./get.js";
export * from "./has.js";

import { getProperty as get } from "./get.js";
import { hasProperty as has } from "./has.js";

export default {
  get,
  has,
};
