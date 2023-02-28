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

// The below works but isn't a good practice because it's not scalable
// app.use('/app.js', static(join(__dirname, '/app.js')));

// You should create a public directory in your project folder and
// place all your static files there and the below app.use() will
// serve all files and sub-directories contained within it.
app.use(express.static(join(__dirname, 'public')));
app.use('/src',express.static(join(__dirname, 'public/src')));
// app.use(express.static(join(__dirname, 'node_modules')));
app.use('/node_modules',express.static(join(__dirname, 'node_modules')));
app.use('/html',express.static(join(__dirname, 'public/html')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

