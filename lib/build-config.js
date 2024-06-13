"use strict";

import path from "path";
import { getPkg as readPkg } from "./read-pkg.js";
import object from "./lang/object/index.js";
import array from "./lang/array/index.js";
import { parsePkgName } from "./parse-pkg-name.js";
import { typeCast } from "./lang/string/typecast.js";
const PWD = ".";

export async function buildConfig(build_id, config, context) {
  const {
    dockerFile: dockerfile = "Dockerfile",
    dockerNoCache: nocache = false,
    dockerTags: tags = ["latest", "{{major}}-latest", "{{version}}"],
    dockerArgs: args = {},
    dockerBuildFlags: build_flags = {},
    dockerBuildCacheFrom: cache_from,
    dockerRegistry: registry = null,
    dockerLogin: login = true,
    dockerImage: image,
    dockerPlatform: platform = null,
    dockerPublish: publish = true,
    dockerContext = ".",
    dockerVerifyCmd: verifycmd = null,
    dockerNetwork: network = "default",
    dockerAutoClean: clean = true,
    dockerBuildQuiet: quiet = true,
    dryRun: dry_run = false,
  } = config;

  let name = null;
  let scope = null;
  let pkg = {};
  try {
    pkg = await readPkg({ cwd: context.cwd });
    const parsed = parsePkgName(pkg.name);
    name = parsed.name;
    scope = parsed.scope;
  } catch (_) {}

  const project = object.has(config, "dockerProject")
    ? config.dockerProject
    : scope;
  const root = object.get(context, "options.root");
  const target = path.relative(root || context.cwd, context.cwd) || PWD;
  const { nextRelease = {} } = context;

  if (cache_from) build_flags.cache_from = array.toArray(cache_from);

  return {
    registry,
    dockerfile,
    nocache,
    build_flags,
    pkg,
    project,
    publish,
    tags: array.toArray(tags),
    verifycmd,
    dry_run: !!typeCast(dry_run || context.dryRun),
    args: {
      SRC_DIRECTORY: path.basename(context.cwd),
      TARGET_PATH: target,
      NPM_PACKAGE_NAME: object.get(pkg, "name"),
      NPM_PACKAGE_SCOPE: scope,
      CONFIG_NAME: image || name,
      CONFIG_PROJECT: project,
      GIT_SHA: nextRelease.gitHead || "",
      GIT_TAG: nextRelease.gitTag || "",
      ...(args || {}),
    },
    name: image || name,
    build: build_id,
    login: login,
    env: context.env,
    context: dockerContext,
    network: network,
    quiet: typeCast(quiet) === true,
    clean: typeCast(clean) === true,
    platform: array.toArray(platform),
  };
}
