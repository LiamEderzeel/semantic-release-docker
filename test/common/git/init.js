'use strict'

import path from 'path'
import os from 'os'
import fs from 'node:fs/promises'
import { execa } from 'execa'

export async function init(dir, branch = 'main') {
  const cwd = dir || await fs.mkdtemp(path.join(os.tmpdir(), path.sep))
  await execa('git', ['init', cwd])
  await execa('git', ['checkout', '-b', branch], { cwd: cwd })
  await execa('git', ['config', '--add', 'commit.gpgsign', false])
  await execa('git', ['config', '--add', 'pull.default', 'current'], { cwd })
  await execa('git', ['config', '--add', 'push.default', 'current'], { cwd })
  await execa('git', ['config', '--add', 'user.name', 'secretsquirrel'], { cwd })
  await execa('git', ['config', '--add', 'user.email', 'secret@mail.com'], { cwd })
  return cwd
}
