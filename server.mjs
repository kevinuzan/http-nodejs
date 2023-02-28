// import { createServer } from 'http';

// createServer((req, res) => {
//   res.('./html/loginWindow.html');
//   res.end();
// }).listen(process.env.PORT);


// import { createServer } from 'http';
// import { readFile } from 'fs';
// readFile('./html/loginWindow.html', function (err, html) {
//   if (err) {
//     throw err;
//   }
//   createServer(function (request, response) {
//     response.writeHeader(200, { "Content-Type": "text/html" });
//     response.write(html);
//     response.end();
//   }).listen(process.env.PORT);
// });



import express from 'express';
var app = express();
import path, { join } from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



var server = createServer(app);

server.listen(process.env.PORT);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/src',express.static(path.join(__dirname, 'public/src')));
app.use('/node_modules',express.static(path.join(__dirname, 'node_modules')));
app.use('/html',express.static(path.join(__dirname, 'public/html')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/html/index_2.html');
});

