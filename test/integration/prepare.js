'use strict'

import path from 'path'
import crypto from 'crypto'
import { execa } from 'execa'
import { test } from 'tap'
import { buildConfig } from '../../lib/build-config.js'
import { verify } from '../../lib/verify.js'
import { dockerPrepare as prepare } from '../../lib/prepare.js'
const __dirname = import.meta.dirname
const DOCKER_REGISTRY_HOST = process.env.TEST_DOCKER_REGISTRY || 'localhost:5000'
const fixturedir = path.join(__dirname, '..', 'fixture')
const DATE_REGEX = new RegExp(
  '^[\\d]{4}-[\\d]{2}-[\\d]{2}T[\\d]{2}:[\\d]{2}:[\\d]{2}'
  + '(\.[\\d]{1,6})?(Z|[\\+\\-][\\d]{2}:[\\d]{2})$' // eslint-disable-line no-useless-escape
)

function noop() { }

const logger = {
  success: noop
  , info: noop
  , debug: noop
  , fatal: noop
}

test('steps::prepare', async (t) => {
  t.test('build image created', async (tt) => {
    const build_id = crypto.randomBytes(5).toString('hex')
    const context = {
      env: {
        ...process.env
        , DOCKER_REGISTRY_USER: 'iamweasel'
        , DOCKER_REGISTRY_PASSWORD: 'secretsquirrel'
      }
      , cwd: fixturedir
      , nextRelease: {
        version: '2.1.2'
        , gitTag: 'v2.1.2'
        , gitHead: 'abacadaba'
      }
      , logger: logger
    }

    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
      , dockerProject: 'docker-prepare'
      , dockerImage: 'fake'
      , dockerVerifyCmd: ['date', '+\'%x\'']
      , dockerBuildCacheFrom: 'test'
      , dockerArgs: {
        MY_VARIABLE: '1'
        , TAG_TEMPLATE: '{{git_tag}}'
        , MAJOR_TEMPLATE: '{{major}}'
        , GIT_REF: '{{git_sha}}'
        , BUILD_DATE: '{{now}}'
      }
      , dockerFile: 'docker/Dockerfile.prepare'
      , dockerContext: 'docker'
    }, { ...context, dryRun: true })

    tt.match(
      await verify(config, context)
      , /\d{2}\/\d{2}\/\d{2}/
      , 'verify command executed'
    )

    const image = await prepare(config, context)

    tt.on('end', () => {
      image.clean()
    })

    tt.equal(image.opts.args.get('TAG_TEMPLATE'), 'v2.1.2', 'TAG_TEMPLATE value')
    tt.equal(image.opts.args.get('MAJOR_TEMPLATE'), '2', 'MAJOR_TEMPLATE value')
    tt.equal(image.opts.args.get('GIT_REF'), 'abacadaba', 'GIT_REF value')
    tt.match(image.opts.args.get('BUILD_DATE'), DATE_REGEX, 'BUILD_DATE value')
    tt.equal(image.context, path.join(context.cwd, config.context), 'docker context path')

    const { stdout } = await execa('docker', [
      'images', image.name
      , '-q', '--format={{ .Tag }}'
    ])
    tt.equal(stdout, build_id, 'build image fully built')
  })

  t.test('build image created - progress plain', async (tt) => {
    const build_id = crypto.randomBytes(5).toString('hex')
    const context = {
      env: {
        ...process.env
        , DOCKER_REGISTRY_USER: 'iamweasel'
        , DOCKER_REGISTRY_PASSWORD: 'secretsquirrel'
      }
      , cwd: fixturedir
      , nextRelease: {
        version: '2.1.2'
        , gitTag: 'v2.1.2'
        , gitHead: 'abacadaba'
      }
      , logger: logger
    }

    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
      , dockerProject: 'docker-prepare'
      , dockerImage: 'alternate'
      , dockerBuildQuiet: false
      , dockerBuildFlags: {
        progress: 'plain'
        , 'no-cache': null
      }
      , dockerArgs: {
        MY_VARIABLE: '1'
        , TAG_TEMPLATE: '{{git_tag}}'
        , MAJOR_TEMPLATE: '{{major}}'
        , GIT_REF: '{{git_sha}}'
        , BUILD_DATE: '{{now}}'
      }
      , dockerFile: 'docker/Dockerfile.prepare'
      , dockerContext: 'docker'
    }, context)

    const image = await prepare(config, context)

    tt.on('end', () => {
      image.clean()
    })

    tt.equal(image.opts.args.get('TAG_TEMPLATE'), 'v2.1.2', 'TAG_TEMPLATE value')
    tt.equal(image.opts.args.get('MAJOR_TEMPLATE'), '2', 'MAJOR_TEMPLATE value')
    tt.equal(image.opts.args.get('GIT_REF'), 'abacadaba', 'GIT_REF value')
    tt.match(image.opts.args.get('BUILD_DATE'), DATE_REGEX, 'BUILD_DATE value')
    tt.equal(image.context, path.join(context.cwd, config.context), 'docker context path')

    const { stdout } = await execa('docker', [
      'images', image.name
      , '-q', '--format={{ .Tag }}:{{ .ID}}'
    ])
    const [tag, id] = stdout.split(':')
    tt.equal(image.id, id, 'captured id matches docker image id')
    tt.equal(tag, build_id, 'build image fully built')
  })
})
