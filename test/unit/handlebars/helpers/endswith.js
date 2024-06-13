"use strict";

import tap, { test } from "tap";
const threw = tap.threw;
import { endsWith } from "../../../../lib/handlebars/helpers/index.js";

test("handlebars helpers", async (t) => {
  t.test("endswith", async (t) => {
    t.equal(endsWith("foobar", "bar"), true, "foobar endswith bar");
    t.equal(endsWith("foobar", "foo"), false, "foobar not endswith foo");
    t.equal(endsWith([], "Array]"), false, "false with not a string");
  });
}).catch(threw);
