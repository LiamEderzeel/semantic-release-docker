'use strict'

import path from 'path'
import os from 'os'
import fs from 'node:fs/promises'
import { execa } from 'execa'

export async function initRemote(branch = 'main') {
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), path.sep))
  await execa('git', [
    'init', '--bare', `--initial-branch=${branch}`
  ], { cwd: cwd })
  return `file://${cwd}`
}
