"use strict";

import os from "os";
import crypto from "crypto";
import path from "path";
import sinon from "sinon";
import { execa } from "execa";
import tap, { test } from "tap";
const threw = tap.threw;
import { buildConfig } from "../../lib/build-config.js";
import { verify } from "../../lib/verify.js";
import { dockerPrepare as prepare } from "../../lib/prepare.js";
import { publish } from "../../lib/publish.js";
import { success } from "../../lib/success.js";
import { fail } from "../../lib/fail.js";
const __dirname = import.meta.dirname;
const fixturedir = path.join(__dirname, "..", "fixture");

const DOCKER_REGISTRY_HOST =
  process.env.TEST_DOCKER_REGISTRY || "localhost:5000";

const logger = {
  success: sinon.stub(),
  info: sinon.stub(),
  debug: sinon.stub(),
  fatal: sinon.stub(),
};
test("post publish", async (t) => {
  t.test("success", async (t) => {
    const build_id = crypto.randomBytes(5).toString("hex");
    const context = {
      env: {
        ...process.env,
        DOCKER_REGISTRY_USER: "iamweasel",
        DOCKER_REGISTRY_PASSWORD: "secretsquirrel",
      },
      cwd: fixturedir,
      nextRelease: { version: "2.0.0" },
      lastRelease: { version: "1.5.0" },
      logger: logger,
    };

    const opts = {
      dockerRegistry: DOCKER_REGISTRY_HOST,
      dockerProject: `postpublish-${build_id}`,
      dockerImage: "success",
      dockerTags: ["{{major}}", "{{major}}.{{minor}}"],
      dockerFile: "docker/Dockerfile.post",
      dockerAutoClean: false,
    };

    const config = await buildConfig(build_id, opts, context);
    const auth = await verify(config, context);
    t.ok(auth, `authentication to ${DOCKER_REGISTRY_HOST} suceeds`);

    const image = await prepare(config, context);

    await publish(config, context);

    // remove build tag
    await execa("docker", ["rmi", image.name]);

    {
      const { stdout } = await execa("docker", [
        "images",
        image.repo,
        "-q",
        "--format={{ .Tag }}",
      ]);
      const tags = stdout.split(os.EOL);

      t.same(tags, ["2", "2.0"], "expect tags exists before succes stage");
    }

    await success(config, context);

    {
      const { stdout } = await execa("docker", [
        "images",
        image.repo,
        "-q",
        "--format={{ .Tag }}",
      ]);

      t.same(
        stdout.split(os.EOL).filter(Boolean),
        ["2", "2.0"],
        "autoClean=false does not remove local tags with",
      );
    }

    await success(
      await buildConfig(
        build_id,
        {
          ...opts,
          dockerAutoClean: true,
        },
        context,
      ),
      context,
    );

    {
      const { stdout } = await execa("docker", [
        "images",
        image.repo,
        "-q",
        "--format={{ .Tag }}",
      ]);

      t.same(
        stdout.split(os.EOL).filter(Boolean),
        [],
        "autoClean=true removes local tags with",
      );
    }
  });

  t.test("fail", async (t) => {
    const build_id = crypto.randomBytes(5).toString("hex");
    const context = {
      env: {
        ...process.env,
        DOCKER_REGISTRY_USER: "iamweasel",
        DOCKER_REGISTRY_PASSWORD: "secretsquirrel",
      },
      cwd: fixturedir,
      nextRelease: { version: "3.0.0" },
      lastRelease: { version: "2.0.0" },
      logger: logger,
    };

    const opts = {
      dockerRegistry: DOCKER_REGISTRY_HOST,
      dockerProject: `postpublish-${build_id}`,
      dockerImage: "fail",
      dockerTags: ["{{major}}", "{{major}}.{{minor}}"],
      dockerFile: "docker/Dockerfile.post",
      dockerAutoClean: false,
    };

    const config = await buildConfig(build_id, opts, context);
    const auth = await verify(config, context);
    t.ok(auth, `authentication to ${DOCKER_REGISTRY_HOST} suceeds`);

    const image = await prepare(config, context);

    await publish(config, context);

    // remove build tag
    await execa("docker", ["rmi", image.name]);

    {
      const { stdout } = await execa("docker", [
        "images",
        image.repo,
        "-q",
        "--format={{ .Tag }}",
      ]);
      const tags = stdout.split(os.EOL);

      t.same(tags, ["3", "3.0"], "expect tags exists before succes stage");
    }

    await fail(config, context);

    {
      const { stdout } = await execa("docker", [
        "images",
        image.repo,
        "-q",
        "--format={{ .Tag }}",
      ]);

      t.same(
        stdout.split(os.EOL).filter(Boolean),
        ["3", "3.0"],
        "autoClean=false does not remove local tags with",
      );
    }

    await fail(
      await buildConfig(
        build_id,
        {
          ...opts,
          dockerAutoClean: true,
        },
        context,
      ),
      context,
    );

    {
      const { stdout } = await execa("docker", [
        "images",
        image.repo,
        "-q",
        "--format={{ .Tag }}",
      ]);

      t.same(
        stdout.split(os.EOL).filter(Boolean),
        [],
        "autoClean=true removes local tags with",
      );
    }
  });
}).catch(threw);
