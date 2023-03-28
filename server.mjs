import express from 'express';
var app = express();
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import pg from "pg";
import { Client } from "@googlemaps/google-maps-services-js";
import bodyParser from "body-parser";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

import fs, { futimesSync } from "fs"
import ImageModule from 'docxtemplater-image-module-free'
import PizZip from "pizzip"
import Docxtemplater from "docxtemplater"
import sizeOf from "image-size"
import request from 'request'

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

app.get('/resetPass', async function (req, res) {
    var user = req.query.name
    sendPasswordResetEmail(auth, user)
        .then(() => {
            res.json(1)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            res.json(errorMessage)
        });
})

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

// FUNÇÃO QUE FAZ UPDATE NO SERVIDOR
async function updatePostgre(csv, query, data) {
    var queryAux = ''
    try {
        data.forEach(element => {
            if (element.length > 1) {
                if (csv == 'distribuidora_TB3.csv') {
                    queryAux += 'update tarifab3 set '
                    if (element[0] != '') {
                        queryAux += `estado='${element[0]}',`
                    }
                    if (element[2] != '') {
                        queryAux += `tusd='${element[2]}',`
                    }
                    if (element[3] != '') {
                        queryAux += `te='${element[3]}',`
                    }
                    if (element[4] != '') {
                        queryAux += `s_imposto='${element[4]}',`
                    }
                    if (element[1] != '') {
                        queryAux = queryAux.slice(0, -1)
                        queryAux += `where distribuidora='${element[1]}'; `
                    }
                }
                if (csv == 'modulos.csv') {
                    queryAux += 'update modulos set '
                    if (element[0] != '') {
                        queryAux += `fornecedor = '${element[0]}'`
                    }
                    if (element[1] != '') {
                        queryAux += `codigo = '${element[1]}'`
                    }
                    if (element[3] != '') {
                        queryAux += `pmax = '${element[3]}'`
                    }
                    if (element[4] != '') {
                        queryAux += `vmp = '${element[4]}'`
                    }
                    if (element[5] != '') {
                        queryAux += `imp = '${element[5]}'`
                    }
                    if (element[6] != '') {
                        queryAux += `voc = '${element[6]}'`
                    }
                    if (element[7] != '') {
                        queryAux += `isc = '${element[7]}'`
                    }
                    if (element[8] != '') {
                        queryAux += `eficiencia = '${element[8]}'`
                    }
                    if (element[9] != '') {
                        queryAux += `tpmax = '${element[9]}'`
                    }
                    if (element[10] != '') {
                        queryAux += `tvoc = '${element[10]}'`
                    }
                    if (element[11] != '') {
                        queryAux += `tisc = '${element[11]}'`
                    }
                    if (element[12] != '') {
                        queryAux += `altura = '${element[12]}'`
                    }
                    if (element[13] != '') {
                        queryAux += `largura = '${element[13]}'`
                    }
                    if (element[14] != '') {
                        queryAux += `espessura = '${element[14]}'`
                    }
                    if (element[15] != '') {
                        queryAux += `area = '${element[15]}'`
                    }
                    if (element[16] != '') {
                        queryAux += `celulas = '${element[16]}'`
                    }
                    if (element[17] != '') {
                        queryAux += `estilo = '${element[17]}'`
                    }
                    if (element[18] != '') {
                        queryAux += `peso = '${element[18]}'`
                    }
                    if (element[2] != '') {
                        queryAux += `where modelo = '${element[2]}'`
                    }
                }
                //queryAux = queryAux.slice(0, -1)

            } else {
                return
            }
        });
        // queryAux = queryAux.slice(0, -2)
        var queryFinal = query + queryAux
        try {
            var { rows } = await pgClient.query(queryFinal)
            return true
        } catch (e) {
            console.log(e)
            return e
        }

    } catch (error) {
        console.log(error)
        return error
    }
}

function base64ToArrayBuffer(base64) {

    // var binaryString = window.atob(base64);
    var binaryString = Buffer.from(base64).toString('base64')
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    // console.log(bytes)
    return bytes;
}

server.listen(process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/src', express.static(path.join(__dirname, 'public/src')));
app.use('/html', express.static(path.join(__dirname, 'public/html')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/temp_folder', express.static(path.join(__dirname, 'public/temp_folder')));
app.use('/', express.static(path.join(__dirname, '/login.html')));


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



var dataTotalGrafico = ''
app.get('/downloadImage', function (req, res) {
    var size = req.query.name.split(';')[0]
    var filename = req.query.name.split(';')[1]
    var data = req.query.name.split(';')[2].replaceAll("*", "+")
    if (dataTotalGrafico.length < Number(size)) {
        dataTotalGrafico += data.replaceAll(" ", "").replaceAll("\n", "")
        res.json(false)
    }
    console.log(dataTotalGrafico.length, Number(size))
    if (dataTotalGrafico.length >= Number(size)) {
        var base64Data = dataTotalGrafico
        fs.writeFile(path.join(__dirname + `/public/temp_folder/${filename}.png`), base64Data, 'base64', function (err) {
            console.log(err);
        });
        dataTotalGrafico = ''
        res.json(true)
    }
})

app.get('/docxTemplater', function (req, res) {
    const content = fs.readFileSync(
        path.join(__dirname + '/public/resourceFiles/modelo_proposta_DANIG.docx'),
        "binary"
    );

    //Below the options that will be passed to ImageModule instance
    var opts = {}
    opts.centered = false; //Set to true to always center images
    opts.fileType = "docx"; //Or pptx

    //Pass your image loader
    opts.getImage = function (tagValue, tagName) {
        return fs.readFileSync(tagValue);
    }

    //Pass the function that return image size
    opts.getSize = function (img, tagValue, tagName) {
        const sizeObj = sizeOf(img);
        const forceWidth = 600;
        const ratio = forceWidth / sizeObj.width;
        return [
            forceWidth,
            // calculate height taking into account aspect ratio
            Math.round(sizeObj.height * ratio),
        ];
    }

    // var imageModule = new ImageModule(opts);

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
        modules: [new ImageModule(opts)]
    });
    var image1 = path.join(__dirname + '/public/temp_folder/graficoConsumoGeracao.png')
    var image2 = path.join(__dirname + '/public/temp_folder/graficoPayback.png')
    // Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
    doc.render({
        cliente: "cliente",
        vendedor: "vendedor",
        validade: "dias",
        vendedor_tel: "vendedor_tel",
        vendedor_email: "vendedor_email",
        endereco: "endereco",
        cep: "cep",
        estimativa_mes: "estimativa_mes",
        tipo_telhado: "tipo_telhado",
        porcentagem_sistema: "porcentagem_sistema",
        tamanho: "tamanho",
        economia_ano: "economia_ano",
        investimento_inicial: "investimento_inicial",
        payback: "payback",
        gasto_antigo: "gasto_antigo",
        gasto_novo: "gasto_novo",
        retorno_anual: "retorno_anual",
        qtde_modulos: "qtde_modulos",
        fabricante_inversor: "fabricante_inversor",
        qtde_inversor: "qtde_inversor",
        estrutura_fixa: "estrutura_fixa",
        area: "area",
        fator_simultaneidade: "fator_simultaneidade",
        fator_injetado: "fator_injetado",
        tarifa_imposto: "tarifa_imposto",
        degradacao_anual: "degradacao_anual",
        geracao_anual: "geracao_anual",
        km: "km",
        arvores: "arvores",
        co2: "co2",
        desconto: "desconto",
        valor_desconto: "valor_desconto",
        finan_12: "finan_12",
        finan_48: "finan_48",
        finan_60: "finan_60",
        finan_120: "finan_120",
        finan_150: "finan_150",
        grafico_payback: image1,
        grafico_cons_gera: image2,
    });

    var buffer = doc
        .getZip()
        .generate({
            type: "nodebuffer",
        });

    var exportPath = path.join(__dirname + '/public/temp_folder/proposta.docx')
    fs.writeFileSync(exportPath, buffer);
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/login.html');
});

app.get('/updateTask', async function (req, res) {

    var option = req.query.name.split(";")[0];
    var data = JSON.parse(req.query.name.split(";")[1])
    var csv = ''
    var query = ''
    console.log(option == 'tarifab3')
    if (option == 'tarifab3') {
        csv = 'distribuidora_TB3.csv'
        query = ""
    } else if (option == 'modulo') {
        csv = 'modulos.csv'
        query = "";
    } else if (option == 'inversor') {
        csv = 'inversores.csv'
        query = "";
    } else if (option == 'tarifafiob') {
        csv = 'TarifaFioB.csv'
        query = "";
    }
    var data = await updatePostgre(csv, query, data)
    res.json(data)
})

app.get('/firstPage', function (req, res) {
    res.sendFile(__dirname + '/login.html');
});

app.get('/vendedores', async function (req, res) {
    var query = "SELECT nome FROM vendedores ORDER BY nome ASC"
    var { rows } = await pgClient.query(query)
    // const { rows } = await pool.query(query)
    res.json(rows)
});

app.get('/vendedoresData', async function (req, res) {
    var name = req.query.name;
    var query = `SELECT * FROM vendedores where nome = '${name}'`
    var { rows } = await pgClient.query(query)
    // const { rows } = await pool.query(query)
    res.json(rows)
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

app.post('/tarifaData', async function (req, res) {
    let name = req.query.name;
    var query = `SELECT * FROM tarifab3 where distribuidora = '${name}'`
    var { rows } = await pgClient.query(query)
    // const { rows } = await pool.query(query)
    res.json(rows)
})

app.post('/clienteInsert', async function (req, res) {
    let cliente = req.query.name.split(';')[0];
    console.log(req.query.name)
    var queryId = `select cliente from erp where LOWER(cliente) = LOWER('${cliente}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length == 0) {
        var queryId = 'select max(id) from erp'
        var { rows } = await pgClient.query(queryId)
        let id = (rows[0].max + 1)
        let Telefone = req.query.name.split(';')[1]
        let Telhado = req.query.name.split(';')[2]
        let Estado = req.query.name.split(';')[3]
        let Cidade = req.query.name.split(';')[4]
        let Rua = req.query.name.split(';')[5]
        let Numero = req.query.name.split(';')[6]
        let Bairro = req.query.name.split(';')[7]
        let Cep = req.query.name.split(';')[8]
        let Distribuidora = req.query.name.split(';')[9]
        let Icms = req.query.name.split(';')[10]
        let Pis = req.query.name.split(';')[11]
        let Cofins = req.query.name.split(';')[12]
        let Porcentagem = req.query.name.split(';')[13]
        let Area = req.query.name.split(';')[14]
        let Consumo = req.query.name.split(';')[15]
        let Taxa = req.query.name.split(';')[16]
        let IlumPub = req.query.name.split(';')[17]
        let UniCons = req.query.name.split(';')[18]
        let Bandeira = req.query.name.split(';')[19]
        var query = `insert into erp values ('${id}','${cliente}','${Telefone}','${Telhado}','${Estado}','${Cidade}','${Rua}','${Numero}','${Bairro}','${Cep}','${Distribuidora}','${Icms}','${Pis}','${Cofins}','${Porcentagem}','${Area}','${Consumo}','${Taxa}','${IlumPub}','${UniCons}','${Bandeira}')`
        console.log(query)
        var { rows } = await pgClient.query(query)
        // const { rows } = await pool.query(query)
        res.json(rows)
    } else {
        res.json('existe')
    }
});

app.post('/clienteUpdate', async function (req, res) {
    let cliente = req.query.name.split(';')[0];
    var queryId = `select id from erp where LOWER(cliente) = LOWER('${cliente}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length != 0) {
        let id = rows[0].id
        let Telefone = req.query.name.split(';')[1]
        let Telhado = req.query.name.split(';')[2]
        let Estado = req.query.name.split(';')[3]
        let Cidade = req.query.name.split(';')[4]
        let Rua = req.query.name.split(';')[5]
        let Numero = req.query.name.split(';')[6]
        let Bairro = req.query.name.split(';')[7]
        let Cep = req.query.name.split(';')[8]
        let Distribuidora = req.query.name.split(';')[9]
        let Icms = req.query.name.split(';')[10]
        let Pis = req.query.name.split(';')[11]
        let Cofins = req.query.name.split(';')[12]
        let Porcentagem = req.query.name.split(';')[13]
        let Area = req.query.name.split(';')[14]
        let Consumo = req.query.name.split(';')[15]
        let Taxa = req.query.name.split(';')[16]
        let IlumPub = req.query.name.split(';')[17]
        let UniCons = req.query.name.split(';')[18]
        let Bandeira = req.query.name.split(';')[19]
        var query = `update erp set id='${id}', telefone = '${Telefone}', tipo_telhado = '${Telhado}', estado = '${Estado}', cidade = '${Cidade}', rua = '${Rua}', numero = '${Numero}', bairro = '${Bairro}', cep = '${Cep}', distribuidora = '${Distribuidora}', icms = '${Icms}', pis = '${Pis}', cofins = '${Cofins}', porcentagem = '${Porcentagem}', area = '${Area}', consumo = '${Consumo}', taxa = '${Taxa}', ilum_pub = '${IlumPub}', unid_consid = '${UniCons}', bandeira = '${Bandeira}' WHERE LOWER(cliente) = LOWER('${cliente}')`
        console.log(query)
        var { rows } = await pgClient.query(query)
        // const { rows } = await pool.query(query)
        res.json(rows)
    } else {
        res.json("nexiste")
    }
});

app.get('/distribuidoraData', async function (req, res) {
    var query = "SELECT distribuidora FROM tarifafiob group by distribuidora"
    var { rows } = await pgClient.query(query)
    // const { rows } = await pool.query(query)
    res.json(rows)
});

app.get('/tarifafiobData', async function (req, res) {
    let distribuidora = req.query.name;
    var query = `SELECT tusd_fiob FROM tarifafiob where distribuidora = '${distribuidora}'`
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

app.get('/irradiationLat_Lon', async function (req, res) {
    var lat = req.query.name.split(";")[0]
    var lon = req.query.name.split(";")[1]
    var query = `SELECT lat, lon, jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec, annual FROM irradiation_data WHERE LAT = (SELECT LAT FROM irradiation_data ORDER BY ABS(${lat} - LAT) ASC LIMIT 1) ORDER BY ABS(${lon} - LON) ASC LIMIT 1`
    var { rows } = await pgClient.query(query)
    res.json(rows)
})

app.get('/fatorK', async function (req, res) {
    var latInt = req.query.name.split(";")[0]
    var latCor = req.query.name.split(";")[1]
    var query = `SELECT MEDIA FROM fatork where latitude = 'Latitude ${latInt}${latCor}'`
    var { rows } = await pgClient.query(query)
    res.json(rows)
})

app.get('/greener', async function (req, res) {
    var query = `SELECT * FROM greener_orca`
    var { rows } = await pgClient.query(query)
    res.json(rows)
})

app.get('/updateGreener', async function (req, res) {
    try {
        var greenerData = JSON.parse(req.query.name)
        console.log(greenerData)
        var sizeGreener = Object.keys(greenerData)
        var queryAux = `update greener_orca as g set 
            value = u.value from (values `
        for (let i = 0; i < sizeGreener.length; i++) {
            queryAux += `('${sizeGreener[i]}', '${greenerData[sizeGreener[i]]}'),`
        }
        queryAux = queryAux.slice(0, -1)
        queryAux += `) as u(name, value)
            where g.name = u.name`
        console.log(queryAux)
        var { rows } = await pgClient.query(queryAux)
        res.json(true)
    } catch (err) {
        res.json(err)
    }
})