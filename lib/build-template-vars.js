'use strict'

import semver from 'semver'
const now = new Date().toISOString()

export function buildTemplateVars(opts, context) {
  const { nextRelease = {}, lastRelease = {} } = context

  const versions = {
    next: semver.parse(nextRelease.version) || {}
    , previous: semver.parse(lastRelease.version) || {}
  }

  const { tags: _, ...rest } = opts
  return {
    ...versions.next
    , ...versions
    , ...nextRelease
    , ...rest
    , git_tag: nextRelease.gitTag
    , git_sha: nextRelease.gitHead
    , release_type: nextRelease.type
    , release_notes: nextRelease.notes
    , now: now
  }
}
