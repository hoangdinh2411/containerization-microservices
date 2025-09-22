const amqp = require("amqplib");
const express = require("express");
const { generateOrderNr, generateETA } = require("./utils/utils");

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

const orders = [];
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
async function setLogs(message) {
  try {
    const connection = await connectRabbit();
    const channel = await connection.createChannel();
    const exchange = "order_exchange";

    await channel.assertExchange(exchange, "fanout", { durable: true });

    channel.publish(exchange, "", Buffer.from(message));
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (err) {
    console.error("❌ RabbitMQ error:", err.message);
  }
}

// // Middleware
// app.get("/", (req, res) => {
//   setLogs("GET /order called on order Service");

//   res.json(orders);
// });
// API tạo order
app.post("/", (req, res) => {
  const newOrder = {
    ...req.body,
    order_number: generateOrderNr(),
    estimated_time: generateETA(),
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  setLogs(" POST /order called on order Service");
  res.status(201).json({ success: true, order: newOrder });
});

app.listen(PORT, () => {
  console.log(`📦 Order Service started on PORT : ${PORT}`);
  setLogs(" Order Service connected");
});
