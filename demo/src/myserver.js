var http = require("http");
var fs = require("fs");

var server = http
  .createServer(function (req, res) {
    if (req.method === "POST") {
      var body = "";
      req.on("data", function (chunk) {
        body += chunk;
      });

      req.on("end", function () {
        console.log("BODY: ", JSON.parse(data));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(body);
      });
    }
  })
  .listen(3001);
