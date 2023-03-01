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
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);



var server = createServer(app);

server.listen(process.env.PORT);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'public/src')));
app.use('/html', express.static(path.join(__dirname, 'public/html')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/excel', function (req, res) {
    //ABRIU E LEU O EXCEL
    res.sendFile(__dirname + '/index_2.html');
});