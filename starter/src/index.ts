import http from "http";
import { WebSocketServer, WebSocket } from "ws";

const server = http.createServer((req, res) => {
  console.log(
    `Request came from " ${req.url} " at ${new Date().toLocaleString()}`
  );
  return res.end("Hi From Server");
});

const wss = new WebSocketServer({ server });
wss.on("connection", (socket) => {
  socket.on("error", (err) => console.log("Error from socket", err));

  socket.on("message", (data, isBinary) => {
    console.log(data.toString());
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  socket.send("Hello from websocket server");
});

server.listen(3000, () => console.log("Server is listening on port 3000"));
