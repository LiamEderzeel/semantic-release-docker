"use strict";

import tap, { test } from "tap";
const threw = tap.threw;
import hbs from "../../../../lib/handlebars/index.js";
import helpers from "../../../../lib/handlebars/helpers/index.js";

test("handlebars helpers", async (t) => {
  for (const [name, helper] of Object.entries(helpers)) {
    t.type(
      hbs.helpers[name],
      "function",
      `handle bars has helper named ${name}`,
    );
    t.equal(
      hbs.helpers[name],
      helper,
      `handlers function reference ${name} loaded`,
    );
  }
}).catch(threw);
