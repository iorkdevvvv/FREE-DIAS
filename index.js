const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT || 5000);
const publicDir = path.join(__dirname, "public");
const videoFile = path.join(publicDir, "media", "free-claim.mp4");
const iconFile = path.join(__dirname, "generated-icon.png");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
};

function sendFile(res, filePath, contentType) {
  fs.stat(filePath, (statError, stats) => {
    if (statError || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": stats.size,
      "Cache-Control": "no-store",
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (requestUrl.pathname === "/media/free-claim.mp4") {
    sendFile(res, videoFile, "video/mp4");
    return;
  }

  if (requestUrl.pathname === "/favicon.ico") {
    sendFile(res, iconFile, "image/png");
    return;
  }

  const requestedPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  const safePath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(publicDir, safePath);
  const extension = path.extname(filePath).toLowerCase();
  sendFile(res, filePath, contentTypes[extension] || "application/octet-stream");
});

server.listen(port, "0.0.0.0", () => {
  console.log(`FREE CLAIM DIAS listening on port ${port}`);
});
