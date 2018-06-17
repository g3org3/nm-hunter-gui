const express = require('express');
const next = require('next');
const { readFileSync } = require('fs');
const bodyParser = require('body-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  // parse application/x-www-form-urlencoded
  server.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  server.use(bodyParser.json());

  server.get('/nm-hunter', (req, res) => {
    const a = readFileSync('./output.raw')
      .toString()
      .split('\n');
    a.pop();
    a.pop();
    a.pop();
    a.pop();
    a.pop();
    const [one, two, three, ...rest] = a;
    res.json({ files: rest.map(r => r.split(' ').filter(r => r)) });
  });

  server.post('/delete', (req, res) => {
    const { files } = req.body;
    res.json({ files });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
