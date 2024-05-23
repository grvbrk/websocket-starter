import http from "http";

const server = http.createServer((req, res) => {
  console.log(
    `Request came from " ${req.url} " at ${new Date().toLocaleString()}`
  );
  return res.end("Hi From Server");
});

server.listen(3000, () => console.log("Server is listening on port 3000"));
