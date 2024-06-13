"use strict";

import tap, { test } from "tap";
const threw = tap.threw;
import { gt } from "../../../../lib/handlebars/helpers/index.js";

test("handlebars helpers", async (t) => {
  t.test("gt", async (t) => {
    t.equal(gt(40, 30), true, "40 is greater than 30)");
    t.equal(gt(30, 40), false, "30 is not greater than 40)");
  });
}).catch(threw);
