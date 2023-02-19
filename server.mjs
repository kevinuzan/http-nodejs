// import { createServer } from 'http';

// createServer((req, res) => {
//   res.('./html/loginWindow.html');
//   res.end();
// }).listen(process.env.PORT);


import { createServer } from 'http';
import { readFile } from 'fs';
readFile('loginWindow.html', function (err, html) {
  if (err) {
    throw err;
  }
  createServer(function (request, response) {
    response.write(html);
    response.end();
  }).listen(8000);
});