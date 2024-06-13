"use strict";

import tap, { test } from "tap";
const threw = tap.threw;
import { upper } from "../../../../lib/handlebars/helpers/index.js";

test("handlebars helpers", async (t) => {
  t.test("upper", async (t) => {
    t.equal(upper("Hello World"), "HELLO WORLD", "upper cases input");
    t.equal(upper(null), "", "returns empty string on non string input");
  });
}).catch(threw);
