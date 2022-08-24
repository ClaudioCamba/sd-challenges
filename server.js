const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 7000;

http
  .createServer((request, response) => {
    console.log(`request ${request.url}`);

    let filePath = `.${request.url}`;
    if (filePath.indexOf("challenge-1.js") > -1) {
      filePath = "./js/challenge-1.js";
    } else if (filePath.indexOf("challenge-1.css") > -1) {
      filePath = "./css/challenge-1.css";
    } else if (filePath.indexOf("challenge-2.js") > -1) {
      filePath = "./js/challenge-2.js";
    } else if (filePath.indexOf("challenge-2.css") > -1) {
      filePath = "./css/challenge-2.css";
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
      ".html": "text/html",
      ".js": "text/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpg",
      ".gif": "image/gif",
      ".svg": "image/svg+xml",
      ".wav": "audio/wav",
      ".mp4": "video/mp4",
      ".woff": "application/font-woff",
      ".ttf": "application/font-ttf",
      ".eot": "application/vnd.ms-fontobject",
      ".otf": "application/font-otf",
      ".wasm": "application/wasm",
    };

    const contentType = mimeTypes[extname] ?? "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === "ENOENT") {
          fs.readFile("./404.html", (error, content) => {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end(content, "utf-8");
          });
        } else {
          response.writeHead(500);
          response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
        }
      } else {
        response.writeHead(200, { "Content-Type": contentType });
        response.end(content, "utf-8");
      }
    });
  })
  .listen(port);
console.log(`Server running at ${port}`);
