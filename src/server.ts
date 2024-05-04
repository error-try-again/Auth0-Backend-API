import { app } from './app';
import http from 'node:http';
import https from 'node:https';
import fs from 'node:fs';
import { config } from './config/config';

const startServer = () => {
  if (config.ssl) {
    const sslOptions = {
      cert: fs.readFileSync(`/etc/letsencrypt/live/${config.domain}/fullchain.pem`),
      key: fs.readFileSync(`/etc/letsencrypt/live/${config.domain}/privkey.pem`)
    };
    https.createServer(sslOptions, app).listen(config.port, () => {
      console.log(`HTTPS server running on https://localhost:${config.port}`);
    });
  } else {
    http.createServer(app).listen(config.port, () => {
      console.log(`HTTP server running on http://localhost:${config.port}`);
    });
  }
};

startServer();