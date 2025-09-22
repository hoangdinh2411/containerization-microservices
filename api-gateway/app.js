const express = require("express");
const cors = require("cors");

const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = process.env.PORT;

app.use(cors());

// Route tới Menu Service
app.use(
  "/api/menu",
  createProxyMiddleware({
    target: process.env.MENU_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/menu": "/menu" }, // rewrite /api/menu → /menu
    logLevel: "debug",
  })
);
app.use(
  "/api/orders",
  createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { "^/api/orders": "/orders" }, // rewrite /api/menu → /menu
    logLevel: "debug",
  })
);

app.listen(PORT, () =>
  console.log(`🚪 API Gateway running on http://localhost:${PORT}`)
);
