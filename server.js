import http from 'node:http';
import serverModule from './dist/server/server.js';

const handler = (serverModule && (serverModule.fetch ?? serverModule.default?.fetch)) || (() => new Response('Not Found', { status: 404 }));

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
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
  console.log(`Listening on http://0.0.0.0:${PORT}`);
});

export default server;
