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


// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/cliente', async function (req, res) {
    var query = req.toString()
    const { rows } = await pool.query(query)
    // const { rows } = await pool.query("SELECT * FROM erp")

    res.json(rows)
});

// const { rows } = await pool.query("SELECT * FROM jokes")

// res.json(rows)

// async function connect(query) {
    
//     const pool = new Pool({
//         connectionString: url_base
//     });

//     const client = await pool.connect();

//     const res = await client.query(query);
//     const array = res.rows
//     client.release();
//     return array;
// }