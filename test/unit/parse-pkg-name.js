"use strict";

import tap, { test } from "tap";
import { parsePkgName } from "../../lib/parse-pkg-name.js";

const threw = tap.threw;

test("parsePkgName", async (t) => {
  t.deepEqual(
    parsePkgName("test"),
    {
      scope: null,
      name: "test",
    },
    "non-scoped package name",
  );

  t.deepEqual(
    parsePkgName("@namespace/foobar"),
    {
      scope: "namespace",
      name: "foobar",
    },
    "scoped package name",
  );

  t.deepEqual(
    parsePkgName("nampace/foobar"),
    {
      name: null,
      scope: null,
    },
    "invalid package name",
  );

  t.deepEqual(
    parsePkgName(),
    {
      name: null,
      scope: null,
    },
    "no package name",
  );
}).catch(threw);
