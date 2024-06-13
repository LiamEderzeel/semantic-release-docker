"use strict";

export function pick(...args) {
  return args.find((value) => {
     
    if (value == null) return false;
     
    if (value === "") return false;
    return true;
  });
}
