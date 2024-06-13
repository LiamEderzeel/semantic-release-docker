"use strict";

import docker from "./docker/index.js";

export async function publish(opts, context) {
  const image = docker.Image.from(opts, context);
  await image.push();
}
