"use strict";

import path from "path";
import { promises as fs } from "fs";

export async function getPkg(opts) {
  const { cwd = process.cwd() } = opts || {};
  const pkg = await fs.readFile(path.join(cwd, "package.json"), "utf8");
  return JSON.parse(pkg);
}
