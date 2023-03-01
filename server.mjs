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
    res.send(__dirname + '/html/index_2.html');
    //res.sendFile(__dirname + '/html/index_2.html');
});