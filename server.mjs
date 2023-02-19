// import { createServer } from 'http';

// createServer((req, res) => {
//   res.('./html/loginWindow.html');
//   res.end();
// }).listen(process.env.PORT);


import { createServer } from 'http';
import { readFile } from 'fs';
readFile('./html/loginWindow.html', function (err, html) {
  if (err) {
    throw err;
  }
  createServer(function (request, response) {
    response.writeHeader(200, { "Content-Type": "text/html" });
    response.write(html);
    response.end();
  }).listen(process.env.PORT);
});

async function teste(){
  document.getElementById("teste").value = "oi"
}