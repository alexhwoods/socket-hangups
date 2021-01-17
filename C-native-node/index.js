const http = require("http");
const Agent = require("agentkeepalive");
const agent = new Agent({
  maxSockets: 1,
  maxFreeSockets: 1,
});

let count = 0;
const requestListener = function (req, res) {
  count++;
  console.log(`${formatDate(new Date())} | received request ${count}`);

  const options = {
    host: "localhost",
    port: 3302,
    path: "/",
    method: "GET",
    agent,
  };

  const request = http.request(options, (response) => {
    response.setEncoding("utf8");
    response.on("data", function (chunk) {
      console.log(`${formatDate(new Date())} | finished`);
      res.writeHead(200);
      res.end(chunk);
    });
  });

  request.on("error", (e) => {
    console.log("problem with request: " + e.message);
  });
  request.end();
};

const server = http.createServer(requestListener);
server.listen(3307);

function formatDate(date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
