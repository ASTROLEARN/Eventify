const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function safeJoin(base, target) {
  const targetPath = path.posix.normalize(path.posix.join('/', target));
  return path.join(base, targetPath);
}

function send(res, statusCode, headers, body) {
  res.writeHead(statusCode, headers);
  if (body && (res.req.method === 'GET' || res.req.method === 'HEAD')) {
    res.end(body);
  } else {
    res.end();
  }
}

const server = http.createServer((req, res) => {
  if (!['GET', 'HEAD'].includes(req.method || '')) {
    send(res, 405, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Method Not Allowed');
    return;
  }

  const parsed = url.parse(req.url || '/');
  let pathname = decodeURIComponent(parsed.pathname || '/');
  if (pathname === '/') pathname = '/index.html';

  let filePath = safeJoin(PUBLIC_DIR, pathname);

  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        if (readErr.code === 'ENOENT') {
          send(res, 404, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Not Found');
        } else {
          send(res, 500, { 'Content-Type': 'text/plain; charset=utf-8' }, 'Internal Server Error');
        }
        return;
      }

      const ext = path.extname(filePath).toLowerCase();
      const type = MIME_TYPES[ext] || 'application/octet-stream';
      const headers = { 'Content-Type': type, 'Cache-Control': 'no-store' };
      send(res, 200, headers, data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
