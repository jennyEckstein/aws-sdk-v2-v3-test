"use strict";

const { SQSClient, CreateQueueCommand } = require("@aws-sdk/client-sqs");
const server = require("./server");

const port = Math.round(Math.random() * 5000 + 1000);
const endpoint = `http://localhost:${port}`;
let sqsLiteServer;
let client;

sqsLiteServer = server({ logger: false });
sqsLiteServer.listen(port, async (err) => {
  if (err) throw err;
  else {
    client = new SQSClient({
      credentials: {
        accessKeyId: "foo",
        secretAccessKey: "bar",
      },
      endpoint,
      region: "us-east-1",
    });

    console.log("V3:");
    const command = new CreateQueueCommand({ QueueName: "foo-bar" });
    await client.send(command);
    server.close();
  }
});
