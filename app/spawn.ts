import { $ } from "bun";
import { cpus } from "os";

const total = cpus().length - 1;
const ops = [];

for (let i = 0; i < total; i++)
  ops.push($`NODE_ENV=production bun src/index.ts`);

await Promise.all(ops);
