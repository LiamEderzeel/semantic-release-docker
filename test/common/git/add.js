"use strict";

import { execa } from "execa";

export async function add(cwd, file = ".") {
  await execa("git", ["add", file], { cwd: cwd });
}
