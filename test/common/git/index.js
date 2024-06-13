"use strict";

export * from "./add.js";
export * from "./commit.js";
export * from "./head.js";
export * from "./init-origin.js";
export * from "./init-remote.js";
export * from "./init.js";
export * from "./push.js";
export * from "./tag.js";
export * from "./tags.js";

import { add } from "./add.js";
import { commit } from "./commit.js";
import { head } from "./head.js";
import { initOrigin } from "./init-origin.js";
import { initRemote } from "./init-remote.js";
import { init } from "./init.js";
import { push } from "./push.js";
import { tag } from "./tag.js";
import { tags } from "./tags.js";

export default {
  add,
  commit,
  head,
  initOrigin,
  initRemote,
  init,
  push,
  tag,
  tags,
};
