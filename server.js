import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import serverModule from './dist/server/server.js';

const handler = (serverModule && (serverModule.fetch ?? serverModule.default?.fetch)) || (() => new Response('Not Found', { status: 404 }));

const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_DIR = path.join(__dirname, 'dist', 'client');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml',
  '.map':  'application/json',
};

function serveStatic(req, res) {
  // Only handle GET and HEAD for static files
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;

  // Strip query string to get the file path
  const urlPath = req.url.split('?')[0];

  // Prevent directory traversal
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(CLIENT_DIR, safePath);

  // Ensure the resolved path is still inside CLIENT_DIR
  if (!filePath.startsWith(CLIENT_DIR + path.sep) && filePath !== CLIENT_DIR) return false;

  let stat;
  try {
    stat = fs.statSync(filePath);
  } catch {
    return false; // File not found — fall through to SSR
  }

  if (!stat.isFile()) return false;

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Hashed assets (e.g. assets/index-Bx3kL9.js) get long-lived cache;
  // everything else gets a short revalidation window.
  const isHashed = /\/assets\//.test(urlPath);
  const cacheControl = isHashed
    ? 'public, max-age=31536000, immutable'
    : 'public, max-age=3600';

  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': stat.size,
    'Cache-Control': cacheControl,
  });

  if (req.method === 'HEAD') {
    res.end();
    return true;
  }

  fs.createReadStream(filePath).pipe(res);
  return true;
}

const server = http.createServer(async (req, res) => {
  // Serve static assets from dist/client before handing off to SSR
  if (serveStatic(req, res)) return;

  try {
    const host = req.headers.host || `localhost:${PORT}`;
    const url = `http://${host}${req.url}`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value == null) continue;
      if (Array.isArray(value)) headers.set(key, value.join(', '));
      else headers.set(key, String(value));
    }

    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const body = chunks.length ? Buffer.concat(chunks) : undefined;

    const requestInit = {
      method: req.method,
      headers,
      body,
    };

    const request = new Request(url, requestInit);
    const response = await handler(request);

    const headersObj = {};
    response.headers.forEach((v, k) => (headersObj[k] = v));
    res.writeHead(response.status, headersObj);

    if (response.body) {
      const buffer = Buffer.from(await response.arrayBuffer());
      res.end(buffer);
    } else {
      res.end();
    }
  } catch (err) {
    console.error('Server error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

export default server;
