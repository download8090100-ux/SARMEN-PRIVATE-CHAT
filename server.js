
const express = require("express");
const path = require("path");
const { ExpressPeerServer } = require("peer");

const app = express();
const PORT = process.env.PORT || 3000;

// نمایش صفحه اصلی SARMEN
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// تست سلامت سرور
app.get("/healthz", (req, res) => {
  res.send("SARMEN SERVER ONLINE");
});

// راه‌اندازی سرور
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("SARMEN SERVER STARTED:", PORT);
});

// سرور ارتباط PeerJS
const peerServer = ExpressPeerServer(server, {
  path: "/",
  proxied: true,
  allow_discovery: false
});

app.use("/peerjs", peerServer);
