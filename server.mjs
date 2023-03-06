import express from 'express';
var app = express();
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import pg from "pg";
import { Client } from "@googlemaps/google-maps-services-js";
import bodyParser from "body-parser";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.apiFirebase,
    authDomain: process.env.authDomainFirebase,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

const appFirebase = initializeApp(firebaseConfig);

const auth = getAuth();

app.get('/login', async function (req, res) {
    var login = req.query.name
    var user = login.split(';')[0]
    var pass = login.split(';')[1]
    signInWithEmailAndPassword(auth, user, pass)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            res.json(true)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.json(errorMessage)
            // ..
        });
})

const pool = new pg.Pool();
var connectionString = process.env.DATABASE_URL
var pgClient = new pg.Client(connectionString)
pgClient.connect()

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

var apiMapsCode = process.env.apiMaps
var server = createServer(app);

// server.listen(process.env.PORT);
server.listen(process.env.PORT || 3000);

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
    var { rows } = await pgClient.query(query)
    // const { rows } = await pool.query(query)
    res.json(rows)
});

app.post('/clienteData', async function (req, res) {
    let name = req.query.name;
    var query = "SELECT * FROM ERP where cliente = '" + name + "'"
    var { rows } = await pgClient.query(query)
    // const { rows } = await pool.query(query)
    res.json(rows)
});

app.get('/mdlData', async function (req, res) {
    var query = "SELECT * FROM modulos ORDER BY modelo ASC"
    var { rows } = await pgClient.query(query)
    // const { rows } = await pool.query(query)
    res.json(rows)
});

app.get('/mdlDataForn', async function (req, res) {
    var fornecedor = req.query.name
    var query = `SELECT * FROM modulos WHERE fornecedor = '${fornecedor}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/mdlDataPote', async function (req, res) {
    var fornecedor = req.query.name.split(";")[0]
    var potencia = req.query.name.split(";")[1]
    var query = `SELECT * FROM modulos WHERE fornecedor = '${fornecedor}' and pmax = '${potencia}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/mdlDataTipo', async function (req, res) {
    var fornecedor = req.query.name.split(";")[0]
    var potencia = req.query.name.split(";")[1]
    var tipo = req.query.name.split(";")[2]
    var query = `SELECT * FROM modulos WHERE fornecedor = '${fornecedor}' and pmax = '${potencia}' and celulas = '${tipo}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/mdlDataTecn', async function (req, res) {
    var fornecedor = req.query.name.split(";")[0]
    var potencia = req.query.name.split(";")[1]
    var tipo = req.query.name.split(";")[2]
    var tecnologia = req.query.name.split(";")[3]
    var query = `SELECT * FROM modulos WHERE fornecedor = '${fornecedor}' and pmax = '${potencia}' and celulas = '${tipo}' and estilo = '${tecnologia}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/mdlDataPeca', async function (req, res) {
    var peca = req.query.name
    var query = `SELECT * FROM modulos WHERE modelo = '${peca}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/invData', async function (req, res) {
    var query = "SELECT * FROM inversores ORDER BY modelo ASC"
    var { rows } = await pgClient.query(query)
    // const { rows } = await pool.query(query)
    res.json(rows)
});

app.get('/invDataForn', async function (req, res) {
    var fornecedor = req.query.name
    var query = `SELECT * FROM inversores WHERE fornecedor = '${fornecedor}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/invDataFases', async function (req, res) {
    var fornecedor = req.query.name.split(";")[0]
    var fase = req.query.name.split(";")[1]
    var query = `SELECT * FROM inversores WHERE fornecedor = '${fornecedor}' and conexaoca = '${fase}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/invDataStrings', async function (req, res) {
    var fornecedor = req.query.name.split(";")[0]
    var fase = req.query.name.split(";")[1]
    var string = req.query.name.split(";")[2]
    var query = `SELECT * FROM inversores WHERE fornecedor = '${fornecedor}' and conexaoca = '${fase}' and mppt = '${string}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/invDataTipo', async function (req, res) {
    var fornecedor = req.query.name.split(";")[0]
    var fase = req.query.name.split(";")[1]
    var string = req.query.name.split(";")[2]
    var tipo = req.query.name.split(";")[3]
    var query = `SELECT * FROM inversores WHERE fornecedor = '${fornecedor}' and conexaoca = '${fase}' and mppt = '${string}' and tipo = '${tipo}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/invDataPote', async function (req, res) {
    var fornecedor = req.query.name.split(";")[0]
    var fase = req.query.name.split(";")[1]
    var string = req.query.name.split(";")[2]
    var tipo = req.query.name.split(";")[3]
    var potencia = req.query.name.split(";")[4]
    var query = `SELECT * FROM inversores WHERE fornecedor = '${fornecedor}' and conexaoca = '${fase}' and mppt = '${string}' and tipo = '${tipo}' and potnomi = '${potencia}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/invDataPeca', async function (req, res) {
    var peca = req.query.name
    var query = `SELECT * FROM inversores WHERE modelo = '${peca}' ORDER BY modelo ASC`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.get('/lat_lon', async function (req, res) {
    let address = req.query.name;
    const args = {
        params: {
            key: apiMapsCode,
            address: address,
        }
    };
    const client = new Client();
    client.geocode(args).then(gcResponse => {
        const str = JSON.stringify(gcResponse.data.results[0].geometry.location);
        //const str = JSON.stringify(gcResponse);
        res.json(str)
    });
})
