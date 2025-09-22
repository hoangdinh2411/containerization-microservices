const amqp = require("amqplib");
const fs = require("fs");

async function connectRabbit() {
  const url = process.env.RABBITMQ_URL;

  for (let i = 0; i < 10; i++) {
    try {
      const connection = await amqp.connect(url);
      console.log("✅ Connected to RabbitMQ");
      return connection;
    } catch (err) {
      console.error("⏳ RabbitMQ not ready, retrying in 5s...", err.message);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  throw new Error("❌ Could not connect to RabbitMQ after 10 tries");
}
async function startLogService() {
  const connection = await connectRabbit();
  const channel = await connection.createChannel();
  const exchanges = ["menu_exchange", "order_exchange"];

  for (const exchange of exchanges) {
    await channel.assertExchange(exchange, "fanout", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(q.queue, exchange, "");

    channel.consume(
      q.queue,
      (msg) => {
        const payload = msg.content;
        const logEntry = `[${new Date().toISOString()}] [${exchange}] ${payload}`;
        console.log("📝 Log:", logEntry.trim());
        fs.appendFileSync("events.log", logEntry);
      },
      {
        noAck: true,
      }
    );
  }
  console.log(
    "📡 Log Service is running and listening to exchanges:",
    exchanges
  );
}

startLogService();
