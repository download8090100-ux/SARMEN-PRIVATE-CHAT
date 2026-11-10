const express = require("express");
const { ExpressPeerServer } = require("peer");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("SARMEN SERVER ONLINE");
});

app.get("/healthz", (req, res) => {
  res.send("OK");
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("SARMEN SERVER STARTED ON PORT", PORT);
});

const peerServer = ExpressPeerServer(server, {
  path: "/",
  proxied: true,
  allow_discovery: false
});

app.use("/peerjs", peerServer);
