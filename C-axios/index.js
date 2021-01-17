const http = require("http");
const axios = require("axios");
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
    url: "http://localhost:3302",
    method: "GET",
    httpAgent: agent,
  };

  axios(options)
    .then((response) => {
      console.log(`${formatDate(new Date())} | finished`);

      res.writeHead(200);
      res.end(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const server = http.createServer(requestListener);
server.listen(3304);

function formatDate(date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
