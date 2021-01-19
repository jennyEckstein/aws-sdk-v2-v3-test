"use strict";

const fastify = require("fastify");
const fastifyFormBody = require("fastify-formbody");

module.exports = (opts) => {
  const app = fastify({
    logger: true,
    ...opts,
  });

  app.register(fastifyFormBody);

  app.post("/", async (request, reply) => {
    const { host } = request.headers;

    reply.header("Content-Type", "application/xml");
    try {
      console.log("\nhost:", host, "\n");
      return;
    } catch (err) {
      reply.status(400);
      return err.xml;
    }
  });

  return app;
};
