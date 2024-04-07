import cluster from "node:cluster";
import * as os from "os";
const numCPUs = os.cpus().length;

import Fastify from "fastify";

const numClusterWorkers = numCPUs;

if (cluster.isPrimary) {
  for (let i = 0; i < numClusterWorkers; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) =>
    console.log(`worker ${worker.process.pid} died`)
  );
} else {
  const fastify = Fastify({ logger: false });
  fastify.get("/", (request, reply) => {
    return "Hello world!";
  });

  fastify.listen({ port: 3000 });
}
