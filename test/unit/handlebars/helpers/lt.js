"use strict";

import tap, { test } from "tap";
const threw = tap.threw;
import { lt } from "../../../../lib/handlebars/helpers/index.js";

test("handlebars helpers", async (t) => {
  t.test("lt", async (t) => {
    t.equal(lt(40, 30), false, "40 is lower than 30)");
    t.equal(lt(30, 40), true, "30 is not lower than 40)");
  });
}).catch(threw);
