#!/usr/bin/env -S TS_NODE_TRANSPILE_ONLY=true npx ts-node

import { generate } from "../src/common/test/fakeConfig";

// console.log(generate(2500, 400));
console.log(generate(1, 400));
