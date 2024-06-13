"use strict";

import tap, { test } from "tap";
const threw = tap.threw;
import { lower } from "../../../../lib/handlebars/helpers/index.js";

test("handlebars helpers", async (t) => {
  t.test("lower", async (t) => {
    t.equal(lower("Hello World"), "hello world", "lower cases input");
    t.equal(lower(null), "", "returns empty string on non string input");
  });
}).catch(threw);
