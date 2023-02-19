// import { createServer } from 'http';

// createServer((req, res) => {
//   res.('./html/loginWindow.html');
//   res.end();
// }).listen(process.env.PORT);


var http = require('http')
fs = require('fs');
fs.readFile('./html/loginWindow.html', function (err, html) {
  if (err) {
    throw err;
  }
  http.createServer(function (request, response) {
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(html);
    response.end();
  }).listen(8000);
});