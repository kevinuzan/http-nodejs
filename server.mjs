import express from 'express';
var app = express();
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';

// import * as pg from 'pg'
// const { Pool } = pg

import pg from "pg";

const pool = new pg.Pool();

import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


var url_base = 'postgresql://postgres:2oOG2Ds7OMpQAI50gjk6@containers-us-west-107.railway.app:6236/railway'

var server = createServer(app);

server.listen(process.env.PORT);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'public/src')));
app.use('/html', express.static(path.join(__dirname, 'public/html')));


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/cliente', async function (req, res) {
    var query = "SELECT CLIENTE FROM ERP ORDER BY CLIENTE ASC"
    const { rows } = await pool.query(query)
    res.json(rows)
});

app.post('/clienteData', async function (req, res) {
    let name = req.query.name;
    // var query = "SELECT * FROM ERP where cliente = '" + name + "'"
    // const { rows } = await pool.query(query)
    res.send(name)
});