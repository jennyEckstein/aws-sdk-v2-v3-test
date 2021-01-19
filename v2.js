"use strict";

const { SQS } = require("aws-sdk");
const server = require("./server");

const port = Math.round(Math.random() * 5000 + 1000);
const endpoint = `http://localhost:${port}`;
let sqsLiteServer;
let client;

sqsLiteServer = server({ logger: false });
sqsLiteServer.listen(port, async (err) => {
  if (err) throw err;
  else {
    client = new SQS({
      accessKeyId: "foo",
      endpoint,
      region: "us-east-1",
      secretAccessKey: "bar",
    });

    console.log("V2:");
    await client.createQueue({ QueueName: "foo-bar" }).promise();
    server.close();
  }
});
