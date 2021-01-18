const http = require("http");

const requestListener = function (req, res) {
  setTimeout(() => {
    res.writeHead(200);
    res.end("b-native-node");
  }, 3 * 1000);
};

const server = http.createServer(requestListener);
server.listen(4003);
