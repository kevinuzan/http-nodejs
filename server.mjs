import express from 'express';
var app = express();
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import pg from "pg";

import {Client} from "@googlemaps/google-maps-services-js";


import nodeGeocoder from "node-geocoder"

const pool = new pg.Pool();

import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

var apiMapsCode = process.env.apiMaps
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
    var query = "SELECT * FROM ERP where cliente = '" + name + "'"
    const { rows } = await pool.query(query)
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


    
    // let options = {
    //     provider: 'openstreetmap'
    // };

    // let geoCoder = nodeGeocoder(options);
    // geoCoder.geocode(address)
    //     .then((lat_lon) => {
    //         res.json(lat_lon)
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.json(err)
    //     });
})
 