import express from 'express';
var app = express();
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';

import * as pg from 'pg'
const { Pool } = pg

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


var url_base = 'postgresql://postgres:2oOG2Ds7OMpQAI50gjk6@containers-us-west-107.railway.app:6236/railway'

var server = createServer(app);

server.listen(process.env.PORT);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'public/src')));
app.use('/html', express.static(path.join(__dirname, 'public/html')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/cliente', async function (req, res) {
    //ABRIU E LEU O EXCEL
    // res.sendStatus(200);
    console.log(req)
    var array = await connect(req)
    console.log(array)
    res.send(array)
});



async function connect(query) {
    if (global.connection)
        return global.connection.connect();

    const pool = new Pool({
        connectionString: url_base
    });

    const client = await pool.connect();

    const res = await client.query(query);
    const array = res.rows
    client.release();
    return array;
}