"use strict";

import tap, { test } from "tap";
const threw = tap.threw;
import { neq } from "../../../../lib/handlebars/helpers/index.js";

test("handlebars helpers", async (t) => {
  t.test("neq", async (t) => {
    t.equal(neq(30, 30), false, "30 is not equal to 30)");
    t.equal(neq(40, 30), true, "40 is equal to 30)");
  });
}).catch(threw);
