"use strict";

import { execa } from "execa";

export async function push(cwd, remote = "origin", branch = "main") {
  await execa("git", ["push", "--tags", remote, `HEAD:${branch}`], {
    cwd: cwd,
  });
}
