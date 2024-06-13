"use strict";

import { execa } from "execa";
import { head } from "./head.js";

export async function commit(cwd, message) {
  await execa("git", ["commit", "-m", message], { cwd: cwd });
  return head(cwd);
}
