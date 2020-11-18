#!/usr/bin/env node
'use strict';

const http = require('http');

const CONFIG = {
  host: '0.0.0.0',
  port: 9999,
};

const requestListener = (req, res) => {
  console.time('---');

  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);

  let data = '';
  req.on('data', (chunk) => {
    data = data + chunk;
  });

  req.on('end', () => {
    console.log('Data:', data.toString('utf-8'));

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    console.timeEnd('---');
  });
};

const server = http.createServer(requestListener);

server.listen(CONFIG.port, CONFIG.host, () => {
  console.log(`Blackhole Server is running at http://${CONFIG.host}:${CONFIG.port}`);
});
