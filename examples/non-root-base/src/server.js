const express = require('express');
const path = require('path');
const http = require('http');

// import { match, RouterContext } from 'react-router';
// import createHistory from 'react-router/lib/createMemoryHistory';

// Create the express server
const app = express();
const server = new http.Server(app);

app.use(express.static(path.join(__dirname, '..', 'static')));

app.use('/path', (req, res) => {
  res.send(`<!doctype html>
    <body>
      <div id="root"></div>
      <script src="/bundle.js"></script>
    </body>`);
});


const port = 3000;
const host = 'localhost';
// start listening on the port
server.listen(port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.',
    host, port);
});
