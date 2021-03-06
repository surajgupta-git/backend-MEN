const express = require('express');
const http = require('http');
const morg=require('morgan');
const dishRouter = require('./routes/dishRouter');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morg('dev'));
app.use('/dishes', dishRouter); // try implementing sidhId using the expres router

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});


const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});