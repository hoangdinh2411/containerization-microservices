const amqp = require("amqplib");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

// Mock menu data
const menu = [
  { id: 1, title: "Bryggkaffe", desc: "Bryggd på månadens bönor.", price: 39 },
  {
    id: 2,
    title: "Caffè Doppio",
    desc: "Bryggd på månadens bönor.",
    price: 49,
  },
  { id: 3, title: "Cappuccino", desc: "Bryggd på månadens bönor.", price: 49 },
  {
    id: 4,
    title: "Latte Macchiato",
    desc: "Bryggd på månadens bönor.",
    price: 49,
  },
  { id: 5, title: "Kaffe Latte", desc: "Bryggd på månadens bönor.", price: 54 },
  { id: 6, title: "Cortado", desc: "Bryggd på månadens bönor.", price: 39 },
  { id: 7, title: "Gustav Adolfsbakelse", price: 40 },
  {
    id: 8,
    title: "Chai Latte",
    desc: "Kryddig tebaserad latte med kanel och kardemumma.",
    price: 52,
  },
  {
    id: 9,
    title: "Matcha Latte",
    desc: "Krämig latte gjord på japanskt grönt te.",
    price: 56,
  },
  { id: 10, title: "Croissant", desc: "Nybakad smörig croissant.", price: 35 },
];

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
    const exchange = "menu_exchange";

    await channel.assertExchange(exchange, "fanout", { durable: true });

    channel.publish(exchange, "", Buffer.from(message));
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (err) {
    console.error("❌ RabbitMQ error:", err.message);
  }
}

// REST API
app.use(express.json());

app.get("/", (req, res) => {
  setLogs("GET /menu called on Menu Service");
  res.status(200).json({
    menu: menu,
  });
});

app.listen(PORT, () => {
  console.log(`🍽️ Menu Service started on PORT ${PORT}`);
  setLogs("Menu service connected");
});
