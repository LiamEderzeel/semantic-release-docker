"use strict";

import tap, { test } from "tap";
const threw = tap.threw;
import { startsWith } from "../../../../lib/handlebars/helpers/index.js";

test("handlebars helpers", async (t) => {
  t.test("startswith", async (t) => {
    t.equal(startsWith("foobar", "bar"), false, "foobar not startswith bar");
    t.equal(startsWith("foobar", "foo"), true, "foobar startswith foo");
    t.equal(startsWith([], "Array]"), false, "false with not a string");
  });
}).catch(threw);
