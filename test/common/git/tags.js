'use strict'

import os from 'os'
import { execa } from 'execa'

export async function tags(cwd, hash) {
  const cmd = hash
    ? ['describe', '--tags', '--exact-match', hash]
    : ['tag', '-l', '--sort', 'v:refname']
  const { stdout } = await execa('git', cmd, { cwd: cwd })
  return stdout.split(os.EOL).filter(Boolean)
}
