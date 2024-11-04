'use strict'

import crypto from 'crypto'
import { dockerPrepare } from './lib/prepare.js'
import { verify as dockerVerify } from './lib/verify.js'
import { publish as dockerPublish } from './lib/publish.js'
import { buildConfig } from './lib/build-config.js'
import { success as dockerSuccess } from './lib/success.js'
import { fail as dockerFail } from './lib/fail.js'
const build_id = crypto.randomBytes(10).toString('hex')

export {
  buildConfig
  , fail
  , prepare
  , publish
  , success
  , verifyConditions
}

async function fail(config, context) {
  return dockerFail(await buildConfig(build_id, config, context), context)
}

async function prepare(config, context) {
  return dockerPrepare(await buildConfig(build_id, config, context), context)
}

async function publish(config, context) {
  return dockerPublish(await buildConfig(build_id, config, context), context)
}

async function success(config, context) {
  return dockerSuccess(await buildConfig(build_id, config, context), context)
}

async function verifyConditions(config, context) {
  return dockerVerify(await buildConfig(build_id, config, context), context)
}
