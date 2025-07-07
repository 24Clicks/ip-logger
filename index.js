const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  if (req.path === '/') {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const log = `${new Date().toISOString()} - IP: ${ip}\n`;
    fs.appendFile('ips.log', log, (err) => {
      if (err) console.error(err);
    });
  }
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
