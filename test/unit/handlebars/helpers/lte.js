"use strict";

import tap, { test } from "tap";
const threw = tap.threw;
import { lte } from "../../../../lib/handlebars/helpers/index.js";

test("handlebars helpers", async (t) => {
  t.test("gte", async (t) => {
    t.equal(lte(30, 40), true, "30 is less than or equal to 40");
    t.equal(lte(40, 30), false, "40 is not less than or equal to 30");
    t.equal(lte(50, 50), false, "50 is less than or equal to 50)");
  });
}).catch(threw);
