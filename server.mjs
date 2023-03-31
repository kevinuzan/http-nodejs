import express from 'express';
var app = express();
import path from 'path';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import pg from "pg";
import { Client } from "@googlemaps/google-maps-services-js";
import bodyParser from "body-parser";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";

import fs, { futimesSync } from "fs"
import ImageModule from 'docxtemplater-image-module-free'
import PizZip from "pizzip"
import Docxtemplater from "docxtemplater"
import sizeOf from "image-size"
import request from 'request'
import formidable from 'formidable'

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
    var usuario = login.split(';')[0]
    var senha = login.split(';')[1]
    signInWithEmailAndPassword(auth, usuario, senha)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            conectado = usuario
            res.json(true)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            conectado = 'false'
            res.json(errorMessage)
            // ..
        });
})
var conectado = 'false'
app.get('/loginVerify', async function (req, res) {
    conectado = 'false'
    res.json(conectado)
})
app.get('/loginVerifyResult', async function (req, res) {
    res.json(conectado)
})

app.get('/createUser', async function (req, res) {
    var login = req.query.name
    var usuario = login.split(';')[0]
    var senha = login.split(';')[1]
    var role = login.split(';')[2]
    var resultado = createUserWithEmailAndPassword(auth, usuario, senha, role)
        .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;
            var resposta = await createUserPostgre(usuario, role)
            return resposta
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return errorMessage
            // ..
        });
    res.json(resultado)
})

app.get('/getRole', async function (req, res) {
    var email = req.query.name
    var resultado = await getRolePostgre(email)
    res.json(resultado)
})
app.get('/getUser', async function (req, res) {
    var resultado = await getUserPostgre()
    res.json(resultado)
})
app.get('/updateUser', async function (req, res) {
    var email = req.query.name.split(';')[0]
    var role = req.query.name.split(';')[1]
    var resultado = await updateUserPostgre(email, role)
    res.json(resultado)
})
async function createUserPostgre(user, role) {
    try {
        var query = `INSERT INTO users values('${user}','${role}')`
        var { rows } = await pgClient.query(query)
        return true
    } catch (e) {
        console.log(e)
        return e
    }
}

async function getRolePostgre(email) {
    try {
        var query = `select role from users where LOWER(email) = LOWER('${email}')`
        var { rows } = await pgClient.query(query)
        return { rows }
    } catch (e) {
        console.log(e)
        return e
    }
}

async function getUserPostgre() {
    try {
        var query = `select email from users`
        var { rows } = await pgClient.query(query)
        return rows
    } catch (e) {
        console.log(e)
        return e
    }
}
async function updateUserPostgre(email, role) {
    try {
        var query = `update users set role = '${role}' where lower(email) = lower('${email}')`
        var { rows } = await pgClient.query(query)
        return rows
    } catch (e) {
        console.log(e)
        return e
    }
}
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
                        queryAux += `fornecedor = '${element[0]}',`
                    }
                    if (element[1] != '') {
                        queryAux += `codigo = '${element[1]}',`
                    }
                    if (element[3] != '') {
                        queryAux += `pmax = '${element[3]}',`
                    }
                    if (element[4] != '') {
                        queryAux += `vmp = '${element[4]}',`
                    }
                    if (element[5] != '') {
                        queryAux += `imp = '${element[5]}',`
                    }
                    if (element[6] != '') {
                        queryAux += `voc = '${element[6]}',`
                    }
                    if (element[7] != '') {
                        queryAux += `isc = '${element[7]}',`
                    }
                    if (element[8] != '') {
                        queryAux += `eficiencia = '${element[8]}',`
                    }
                    if (element[9] != '') {
                        queryAux += `tpmax = '${element[9]}',`
                    }
                    if (element[10] != '') {
                        queryAux += `tvoc = '${element[10]}',`
                    }
                    if (element[11] != '') {
                        queryAux += `tisc = '${element[11]}',`
                    }
                    if (element[12] != '') {
                        queryAux += `altura = '${element[12]}',`
                    }
                    if (element[13] != '') {
                        queryAux += `largura = '${element[13]}',`
                    }
                    if (element[14] != '') {
                        queryAux += `espessura = '${element[14]}',`
                    }
                    if (element[15] != '') {
                        queryAux += `area = '${element[15]}',`
                    }
                    if (element[16] != '') {
                        queryAux += `celulas = '${element[16]}',`
                    }
                    if (element[17] != '') {
                        queryAux += `estilo = '${element[17]}',`
                    }
                    if (element[18] != '') {
                        queryAux += `peso = '${element[18]}',`
                    }
                    if (element[2] != '') {
                        queryAux = queryAux.slice(0, -1)
                        queryAux += `where modelo = '${element[2]}';`
                    }
                }
                if (csv == 'inversores.csv') {
                    queryAux += 'update inversores set '
                    if (element[0] != '') {
                        queryAux += `fornecedor = '${element[0]}',`
                    }
                    if (element[1] != '') {
                        queryAux += `codigo = '${element[1]}',`
                    }
                    if (element[2] != '') {
                        queryAux += `tipo = '${element[2]}',`
                    }
                    if (element[4] != '') {
                        queryAux += `potnomi = '${element[4]}',`
                    }
                    if (element[5] != '') {
                        queryAux += `faixamppt = '${element[5]}',`
                    }
                    if (element[6] != '') {
                        queryAux += `tenspart = '${element[6]}',`
                    }
                    if (element[7] != '') {
                        queryAux += `maxtens = '${element[7]}',`
                    }
                    if (element[8] != '') {
                        queryAux += `entradaimp = '${element[8]}',`
                    }
                    if (element[9] != '') {
                        queryAux += `eficiencia = '${element[9]}',`
                    }
                    if (element[10] != '') {
                        queryAux += `conexaoca = '${element[10]}',`
                    }
                    if (element[11] != '') {
                        queryAux += `correntesaída = '${element[11]}',`
                    }
                    if (element[12] != '') {
                        queryAux += `faixatens = '${element[12]}',`
                    }
                    if (element[13] != '') {
                        queryAux += `mppt = '${element[13]}',`
                    }
                    if (element[3] != '') {
                        queryAux = queryAux.slice(0, -1)
                        queryAux += `where modelo = '${element[3]}';`
                    }
                }
                if (csv == 'fatork.csv') {
                    queryAux += 'update fatork set '
                    if (element[1] != '') {
                        queryAux += `jan = '${element[1]}',`
                    }
                    if (element[2] != '') {
                        queryAux += `fev = '${element[2]}',`
                    }
                    if (element[3] != '') {
                        queryAux += `mar = '${element[3]}',`
                    }
                    if (element[4] != '') {
                        queryAux += `abr = '${element[4]}',`
                    }
                    if (element[5] != '') {
                        queryAux += `mai = '${element[5]}',`
                    }
                    if (element[6] != '') {
                        queryAux += `jun = '${element[6]}',`
                    }
                    if (element[7] != '') {
                        queryAux += `jul = '${element[7]}',`
                    }
                    if (element[8] != '') {
                        queryAux += `ago = '${element[8]}',`
                    }
                    if (element[9] != '') {
                        queryAux += `set = '${element[9]}',`
                    }
                    if (element[10] != '') {
                        queryAux += `out = '${element[10]}',`
                    }
                    if (element[11] != '') {
                        queryAux += `nov = '${element[11]}',`
                    }
                    if (element[12] != '') {
                        queryAux += `dez = '${element[12]}',`
                    }
                    if (element[13] != '') {
                        queryAux += `media = '${element[13]}',`
                    }
                    if (element[0] != '') {
                        queryAux = queryAux.slice(0, -1)
                        queryAux += `where latitude = '${element[0]}';`
                    }
                }
                if (csv == 'tarifafiob.csv') {
                    queryAux += 'update tarifafiob set '
                    if (element[0] != '') {
                        queryAux += `estado = '${element[0]}',`
                    }
                    if (element[2] != '') {
                        queryAux += `tusd_fiob = '${element[2]}',`
                    }
                    if (element[0] != '') {
                        queryAux = queryAux.slice(0, -1)
                        queryAux += `where distribuidora = '${element[1]}';`
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


async function saveDataPostgre(arrayData) {
    var listaHeader = [
        'projectname',
        'cliente',
        'vendedor',
        'ano',
        'rua',
        'numero',
        'bairro',
        'tipo_telhado',
        'ang_telhado',
        'posicionamento',
        'pecamdl',
        'temp_mdl',
        'sujeira',
        'degra_anual',
        'pecainv',
        'qtdeinv',
        'jan_consumo',
        'fev_consumo',
        'mar_consumo',
        'abr_consumo',
        'mai_consumo',
        'jun_consumo',
        'jul_consumo',
        'ago_consumo',
        'set_consumo',
        'out_consumo',
        'nov_consumo',
        'dez_consumo',
        'add_consumo',
        'porcentagem_forn',
        'mat_fotov',
        'painel_prot',
        'string_box',
        'material_ca',
        'estrutura_cob',
        'eletroduto',
        'custo_viagem',
        'lucro',
        'comissao',
        'imposto',
        'fornecedor_orca',
        'desconto',
        'inflacao_eletrica',
        'juros_1',
        'juros_12',
        'juros_48',
        'juros_60',
        'juros_120',
        'juros_150'
    ]
    var checkQuery = `select projectname from projectdata where projectname = '${arrayData[0]}'`
    var { rows } = await pgClient.query(checkQuery)
    console.log(rows)
    if (rows.length == 0) {
        var queryUpdate = 'insert into projectdata values ('
        for (var i = 0; i < arrayData.length; i++) {
            queryUpdate += `'${arrayData[i]}', `
        }
        queryUpdate = queryUpdate.slice(0, -2)
        queryUpdate += ')'
        try {
            var { rows } = await pgClient.query(queryUpdate)
            return 'inserted'
        } catch (e) {
            return e
        }
    } else {
        var queryUpdate = 'update projectdata '
        for (var i = 1; i < arrayData.length; i++) {
            queryUpdate += `set ${listaHeader[i]} = '${arrayData[i]}', `
        }
        queryUpdate = queryUpdate.slice(0, -2)
        queryUpdate += `where projectname = '${projectname}'`
        try {
            var { rows } = await pgClient.query(queryUpdate)
            return 'updated'
        } catch (e) {
            return e
        }
    }
}

async function getProject() {
    var checkQuery = `select projectname from projectdata`
    var { rows } = await pgClient.query(checkQuery)
    return rows
}

async function getProjectData(project) {
    var checkQuery = `select * from projectdata where projectname = '${project}'`
    var { rows } = await pgClient.query(checkQuery)
    return rows
}

app.post('/saveErp', async function (req, res) {
    // var projectName = req.query.name.split(";")[0]
    // var Cliente = req.query.name.split(";")[1]
    // var Vendedor = req.query.name.split(";")[2]
    // var Ano = req.query.name.split(";")[3]
    // var RuaDadoTec = req.query.name.split(";")[4]
    // var NumeroDadoTec = req.query.name.split(";")[5]
    // var BairroDadoTec = req.query.name.split(";")[6]
    // var TipoTelhaDadoTec = req.query.name.split(";")[7]
    // var AngTelhaDadoTec = req.query.name.split(";")[8]
    // var PosicionamentoDadoTec = req.query.name.split(";")[9]
    // var PecaModulo = req.query.name.split(";")[10]
    // var TempMediaModulo = req.query.name.split(";")[11]
    // var Sujeira = req.query.name.split(";")[12]
    // var DegraAnual = req.query.name.split(";")[13]
    // var PecaInversor = req.query.name.split(";")[14]
    // var QtdeInversor = req.query.name.split(";")[15]
    // var JanConsumo = req.query.name.split(";")[16]
    // var FevConsumo = req.query.name.split(";")[17]
    // var MarConsumo = req.query.name.split(";")[18]
    // var AbrConsumo = req.query.name.split(";")[19]
    // var MaiConsumo = req.query.name.split(";")[20]
    // var JunConsumo = req.query.name.split(";")[21]
    // var JulConsumo = req.query.name.split(";")[22]
    // var AgoConsumo = req.query.name.split(";")[23]
    // var SetConsumo = req.query.name.split(";")[24]
    // var OutConsumo = req.query.name.split(";")[25]
    // var NovConsumo = req.query.name.split(";")[26]
    // var DezConsumo = req.query.name.split(";")[27]
    // var AddConsumo = req.query.name.split(";")[28]
    // var PorcentagemFornOrca = req.query.name.split(";")[29]
    // var MatFotovOrca = req.query.name.split(";")[30]
    // var PainelProtOrca = req.query.name.split(";")[31]
    // var StringBoxOrca = req.query.name.split(";")[32]
    // var MaterialCaOrca = req.query.name.split(";")[33]
    // var EstruCobertOrca = req.query.name.split(";")[34]
    // var EletrodutoOrca = req.query.name.split(";")[35]
    // var CustoViagemOrca = req.query.name.split(";")[36]
    // var LucroOrca = req.query.name.split(";")[37]
    // var ComissaoOrca = req.query.name.split(";")[38]
    // var ImpostoOrca = req.query.name.split(";")[39]
    // var FornOrca = req.query.name.split(";")[40]
    // var DescontoOrcaFinal = req.query.name.split(";")[41]
    // var InflacaoEletricaFluxo = req.query.name.split(";")[42]
    // var JurosMesFinanciamento1 = req.query.name.split(";")[43]
    // var JurosMesFinanciamento12 = req.query.name.split(";")[44]
    // var JurosMesFinanciamento48 = req.query.name.split(";")[45]
    // var JurosMesFinanciamento60 = req.query.name.split(";")[46]
    // var JurosMesFinanciamento120 = req.query.name.split(";")[47]
    // var JurosMesFinanciamento150 = req.query.name.split(";")[48]

    var dataTotal = req.query.name.split(";")

    var r = await saveDataPostgre(dataTotal)
    res.json(r)
})

app.get('/getProject', async function (req, res) {
    var r = await getProject()
    res.json(r)
})

app.get('/getProjectData', async function (req, res) {
    var project = req.query.name
    var r = await getProjectData(project)
    res.json(r)
})

var dataTotalGrafico = ''
app.get('/downloadImage', function (req, res) {
    var size = req.query.name.split(';')[0]
    var filename = req.query.name.split(';')[1]
    var data = req.query.name.split(';')[2].replaceAll("*", "+")
    var resposta = false
    if (dataTotalGrafico.length < Number(size)) {
        dataTotalGrafico += data.replaceAll(" ", "").replaceAll("\n", "")
        resposta = false
    }
    if (dataTotalGrafico.length >= Number(size)) {
        var base64Data = dataTotalGrafico
        fs.writeFile(path.join(__dirname + `/public/temp_folder/${filename}.png`), base64Data, 'base64', function (err) {
            console.log(err);
        });
        dataTotalGrafico = ''
        resposta = true
    }
    res.json(resposta)
})

app.get('/docxTemplater', function (req, res) {
    var cliente = req.query.name.split(";")[0]
    var vendedor = req.query.name.split(";")[1]
    var validade = req.query.name.split(";")[2]
    var vendedor_tel = req.query.name.split(";")[3]
    var vendedor_email = req.query.name.split(";")[4]
    var endereco = req.query.name.split(";")[5]
    var cep = req.query.name.split(";")[6]
    var estimativa_mes = req.query.name.split(";")[7]
    var tipo_telhado = req.query.name.split(";")[8]
    var porcentagem_sistema = req.query.name.split(";")[9]
    var tamanho = req.query.name.split(";")[10]
    var economia_ano = req.query.name.split(";")[11]
    var investimento_inicial = req.query.name.split(";")[12]
    var payback = req.query.name.split(";")[13]
    var gasto_antigo = req.query.name.split(";")[14]
    var gasto_novo = req.query.name.split(";")[15]
    var retorno_anual = req.query.name.split(";")[16]
    var qtde_modulos = req.query.name.split(";")[17]
    var fabricante_inversor = req.query.name.split(";")[18]
    var qtde_inversor = req.query.name.split(";")[19]
    var estrutura_fixa = req.query.name.split(";")[20]
    var area = req.query.name.split(";")[21]
    var fator_simultaneidade = req.query.name.split(";")[22]
    var fator_injetado = req.query.name.split(";")[23]
    var tarifa_imposto = req.query.name.split(";")[24]
    var degradacao_anual = req.query.name.split(";")[25]
    var geracao_anual = req.query.name.split(";")[26]
    var km = req.query.name.split(";")[27]
    var arvores = req.query.name.split(";")[28]
    var co2 = req.query.name.split(";")[29]
    var desconto = req.query.name.split(";")[30]
    var valor_desconto = req.query.name.split(";")[31]
    var finan_12 = req.query.name.split(";")[32]
    var finan_48 = req.query.name.split(";")[33]
    var finan_60 = req.query.name.split(";")[34]
    var finan_120 = req.query.name.split(";")[35]
    var finan_150 = req.query.name.split(";")[36]
    var fabricante_modulo = req.query.name.split(";")[37]
    var modeloMdl = req.query.name.split(";")[38]
    var modeloInv = req.query.name.split(";")[39]
    var potencia_modulo = req.query.name.split(";")[40]
    var potencia_inversor = req.query.name.split(";")[41]
    var reajuste_tarifa = req.query.name.split(";")[42]


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
        const forceWidth = 500;
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
        cliente: cliente,
        vendedor: vendedor,
        validade: validade,
        vendedor_tel: vendedor_tel,
        vendedor_email: vendedor_email,
        endereco: endereco,
        cep: cep,
        estimativa_mes: estimativa_mes,
        tipo_telhado: tipo_telhado,
        porcentagem_sistema: porcentagem_sistema,
        tamanho: tamanho,
        economia_ano: economia_ano,
        investimento_inicial: investimento_inicial,
        payback: payback,
        gasto_antigo: gasto_antigo,
        gasto_novo: gasto_novo,
        retorno_anual: retorno_anual,
        fabricante_modulo: fabricante_modulo,
        qtde_modulos: qtde_modulos,
        modeloMdl: modeloMdl,
        potencia_modulo: potencia_modulo,

        fabricante_inversor: fabricante_inversor,
        qtde_inversor: qtde_inversor,
        modeloInv: modeloInv,
        potencia_inversor: potencia_inversor,

        estrutura_fixa: estrutura_fixa,
        area: area,
        fator_simultaneidade: fator_simultaneidade,
        fator_injetado: fator_injetado,
        tarifa_imposto: tarifa_imposto,
        degradacao_anual: degradacao_anual,
        geracao_anual: geracao_anual,
        reajuste_tarifa: reajuste_tarifa,

        km: km,
        arvores: arvores,
        co2: co2,

        desconto: desconto,
        valor_desconto: valor_desconto,
        finan_12: finan_12,
        finan_48: finan_48,
        finan_60: finan_60,
        finan_120: finan_120,
        finan_150: finan_150,
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
    res.json(true)
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/login.html');
});
var dataTotalUpdate = ''
app.get('/updateTask', async function (req, res) {
    var option = req.query.name.split(';')[0]
    var size = req.query.name.split(';')[1]
    var data = req.query.name.split(";")[2]
    var resposta = false
    if (dataTotalUpdate.length < Number(size)) {
        dataTotalUpdate += data
        resposta = false
    }
    if (dataTotalUpdate.length >= Number(size)) {
        dataTotalUpdate = JSON.parse(dataTotalUpdate)
        var csv = ''
        var query = ''
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
        } else if (option == 'fatork') {
            csv = 'fatork.csv'
            query = "";
        }
        var data = await updatePostgre(csv, query, dataTotalUpdate)
        dataTotalUpdate = ''
        resposta = true
        // dataTotalUpdate = ''
        // res.json(true)
    }
    res.json(resposta)
    // var option = req.query.name.split(";")[0];
    // var data = JSON.parse(req.query.name.split(";")[1])

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
    var queryId = `select cliente from erp where LOWER(cliente) = LOWER('${cliente}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length == 0) {
        var queryId = 'select max(id) from erp'
        var { rows } = await pgClient.query(queryId)
        let id = (Number(rows[0].max) + 1)
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
        var { rows } = await pgClient.query(query)
        // const { rows } = await pool.query(query)
        res.json(rows)
    } else {
        res.json("nexiste")
    }
});

app.post('/vendedorInsert', async function (req, res) {
    let vendedor = req.query.name.split(';')[0];
    var queryId = `select nome from vendedores where LOWER(nome) = LOWER('${vendedor}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length == 0) {
        var queryId = 'select max(id) from vendedores'
        var { rows } = await pgClient.query(queryId)
        let id = (Number(rows[0].max) + 1)
        let telefone = req.query.name.split(';')[1]
        let email = req.query.name.split(';')[2]
        var query = `insert into vendedores values ('${id}','${vendedor}','${telefone}','${email}')`
        var { rows } = await pgClient.query(query)
        res.json(rows)
    } else {
        res.json('existe')
    }
});

app.post('/vendedorUpdate', async function (req, res) {
    let vendedor = req.query.name.split(';')[0];
    var queryId = `select id from vendedores where LOWER(nome) = LOWER('${vendedor}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length != 0) {
        let id = rows[0].id
        let telefone = req.query.name.split(';')[1]
        let email = req.query.name.split(';')[2]

        var query = `update vendedores set telefone = '${telefone}', email = '${email}' WHERE LOWER(nome) = LOWER('${vendedor}')`
        var { rows } = await pgClient.query(query)
        // const { rows } = await pool.query(query)
        res.json(rows)
    } else {
        res.json("nexiste")
    }
});
app.get('/vendedorEditar', async function (req, res) {
    var nome = req.query.name
    var query = `SELECT * FROM vendedores WHERE nome = '${nome}'`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.post('/tarifaB3Insert', async function (req, res) {
    let distribuidora = req.query.name.split(';')[1];
    var queryId = `select distribuidora from tarifab3 where LOWER(distribuidora) = LOWER('${distribuidora}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length == 0) {
        var queryId = 'select max(id) from tarifab3'
        var { rows } = await pgClient.query(queryId)
        let id = (Number(rows[0].max) + 1)
        let estado = req.query.name.split(';')[0]
        let tusd = req.query.name.split(';')[2]
        let te = req.query.name.split(';')[3]
        let s_imposto = req.query.name.split(';')[4]
        var query = `insert into tarifab3 values ('${id}','${estado}','${distribuidora}','${tusd}','${te}','${s_imposto}')`
        var { rows } = await pgClient.query(query)
        res.json(rows)
    } else {
        res.json('existe')
    }
});

app.post('/tarifaB3Update', async function (req, res) {
    let distribuidora = req.query.name.split(';')[1];
    var queryId = `select id from tarifab3 where LOWER(distribuidora) = LOWER('${distribuidora}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length != 0) {
        let id = rows[0].id
        let estado = req.query.name.split(';')[0]
        let tusd = req.query.name.split(';')[2]
        let te = req.query.name.split(';')[3]
        let s_imposto = req.query.name.split(';')[4]

        var query = `update tarifab3 set estado = '${estado}', tusd = '${tusd}', te = '${te}', s_imposto = '${s_imposto}' WHERE LOWER(distribuidora) = LOWER('${distribuidora}')`
        var { rows } = await pgClient.query(query)
        res.json(rows)
    } else {
        res.json("nexiste")
    }
});
app.get('/tarifaB3Editar', async function (req, res) {
    var distribuidora = req.query.name
    var query = `SELECT * FROM tarifab3 WHERE distribuidora = '${distribuidora}'`
    var { rows } = await pgClient.query(query)
    res.json(rows)
});

app.post('/tarifaFioBInsert', async function (req, res) {
    let distribuidora = req.query.name.split(';')[1];
    var queryId = `select distribuidora from tarifafiob where LOWER(distribuidora) = LOWER('${distribuidora}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length == 0) {
        var queryId = 'select max(index) from tarifafiob'
        var { rows } = await pgClient.query(queryId)
        let id = (Number(rows[0].max) + 1)
        let estado = req.query.name.split(';')[0]
        let tusd = req.query.name.split(';')[2]
        var query = `insert into tarifafiob values ('${id}','${estado}','${distribuidora}','${tusd}')`
        var { rows } = await pgClient.query(query)
        res.json(rows)
    } else {
        res.json('existe')
    }
});

app.post('/tarifaFioBUpdate', async function (req, res) {
    let distribuidora = req.query.name.split(';')[1];
    var queryId = `select index from tarifafiob where LOWER(distribuidora) = LOWER('${distribuidora}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length != 0) {
        let id = rows[0].id
        let estado = req.query.name.split(';')[0]
        let tusd = req.query.name.split(';')[2]

        var query = `update tarifafiob set estado = '${estado}', tusd_fiob = '${tusd}' WHERE LOWER(distribuidora) = LOWER('${distribuidora}')`
        var { rows } = await pgClient.query(query)
        res.json(rows)
    } else {
        res.json("nexiste")
    }
});
app.get('/tarifaFioBEditar', async function (req, res) {
    var distribuidora = req.query.name
    var query = `SELECT * FROM tarifafiob WHERE distribuidora = '${distribuidora}'`
    var { rows } = await pgClient.query(query)
    res.json(rows)
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

app.post('/moduloInsert', async function (req, res) {
    let modelo = req.query.name.split(';')[4];
    var queryId = `select modelo from modulos where LOWER(modelo) = LOWER('${modelo}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length == 0) {
        var queryId = 'select max(index) from modulos'
        var { rows } = await pgClient.query(queryId)
        let id = (Number(rows[0].max) + 1)
        var Fabricante = req.query.name.split(';')[0]
        var Potencia = req.query.name.split(';')[1]
        var Tipo_Cel = req.query.name.split(';')[2]
        var Tecnologia = req.query.name.split(';')[3]
        var Vmp = req.query.name.split(';')[5]
        var Imp = req.query.name.split(';')[6]
        var Voc = req.query.name.split(';')[7]
        var Isc = req.query.name.split(';')[8]
        var Eficiencia = req.query.name.split(';')[9]
        var TPmax = req.query.name.split(';')[10]
        var TVoc = req.query.name.split(';')[11]
        var TIsc = req.query.name.split(';')[12]
        var AreaOcupada = req.query.name.split(';')[13]
        var Peso = req.query.name.split(';')[14]
        var Espessura = req.query.name.split(';')[15]
        var Largura = req.query.name.split(';')[16]
        var Altura = req.query.name.split(';')[17]

        var query = `insert into modulos values ('${id}','${Fabricante}','','${modelo}','${Potencia}','${Vmp}','${Imp}','${Voc}','${Isc}','${Eficiencia}','${TPmax}','${TVoc}','${TIsc}','${Altura}','${Largura}','${Espessura}','${AreaOcupada}','${Tipo_Cel}','${Tecnologia}','${Peso}')`
        var { rows } = await pgClient.query(query)
        res.json(rows)
    } else {
        res.json('existe')
    }
});

app.post('/moduloUpdate', async function (req, res) {
    let modelo = req.query.name.split(';')[4];
    var queryId = `select index from modulos where LOWER(modelo) = LOWER('${modelo}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length != 0) {
        var Fabricante = req.query.name.split(';')[0]
        var Potencia = req.query.name.split(';')[1]
        var Tipo_Cel = req.query.name.split(';')[2]
        var Tecnologia = req.query.name.split(';')[3]
        var Vmp = req.query.name.split(';')[5]
        var Imp = req.query.name.split(';')[6]
        var Voc = req.query.name.split(';')[7]
        var Isc = req.query.name.split(';')[8]
        var Eficiencia = req.query.name.split(';')[9]
        var TPmax = req.query.name.split(';')[10]
        var TVoc = req.query.name.split(';')[11]
        var TIsc = req.query.name.split(';')[12]
        var AreaOcupada = req.query.name.split(';')[13]
        var Peso = req.query.name.split(';')[14]
        var Espessura = req.query.name.split(';')[15]
        var Largura = req.query.name.split(';')[16]
        var Altura = req.query.name.split(';')[17]

        var query = `update modulos set fornecedor = '${Fabricante}', pmax = '${Potencia}', vmp = '${Vmp}', imp = '${Imp}', voc = '${Voc}', isc = '${Isc}', eficiencia = '${Eficiencia}', tpmax = '${TPmax}', tvoc = '${TVoc}', tisc = '${TIsc}', altura = '${Altura}', largura = '${Largura}', espessura = '${Espessura}', area = '${AreaOcupada}', celulas = '${Tipo_Cel}', estilo = '${Tecnologia}', peso = '${Peso}' WHERE LOWER(modelo) = LOWER('${modelo}')`
        var { rows } = await pgClient.query(query)
        // const { rows } = await pool.query(query)
        res.json(rows)
    } else {
        res.json("nexiste")
    }
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

app.post('/inversorInsert', async function (req, res) {
    let modelo = req.query.name.split(';')[5];
    var queryId = `select modelo from inversores where LOWER(modelo) = LOWER('${modelo}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length == 0) {
        var queryId = 'select max(index) from inversores'
        var { rows } = await pgClient.query(queryId)
        let id = (Number(rows[0].max) + 1)
        var Fabricante = req.query.name.split(';')[0]
        var Fases = req.query.name.split(';')[1]
        var Strings = req.query.name.split(';')[2]
        var Tipo = req.query.name.split(';')[3]
        var Potencia = req.query.name.split(';')[4]
        var FaixaMPPT = req.query.name.split(';')[6]
        var TensaoCC = req.query.name.split(';')[7]
        var MaxTensaoCC = req.query.name.split(';')[8]
        var Eficiencia = req.query.name.split(';')[9]
        var FaixaTensao = req.query.name.split(';')[10]
        var CorrenteMaxCC = req.query.name.split(';')[11]
        var CorrenteMaxCA = req.query.name.split(';')[12]

        var query = `insert into inversores values ('${id}','${Fabricante}','','${Tipo}','${modelo}','${Potencia}','${FaixaMPPT}','${TensaoCC}','${MaxTensaoCC}','${CorrenteMaxCC}','${Eficiencia}','${Strings}','${CorrenteMaxCA}','${FaixaTensao}','${Fases}')`
        var { rows } = await pgClient.query(query)
        res.json(rows)
    } else {
        res.json('existe')
    }
});

app.post('/inversorUpdate', async function (req, res) {
    let modelo = req.query.name.split(';')[5];
    var queryId = `select index from inversores where LOWER(modelo) = LOWER('${modelo}')`
    var { rows } = await pgClient.query(queryId)
    if (rows.length != 0) {
        var Fabricante = req.query.name.split(';')[0]
        var Fases = req.query.name.split(';')[1]
        var Strings = req.query.name.split(';')[2]
        var Tipo = req.query.name.split(';')[3]
        var Potencia = req.query.name.split(';')[4]
        var FaixaMPPT = req.query.name.split(';')[6]
        var TensaoCC = req.query.name.split(';')[7]
        var MaxTensaoCC = req.query.name.split(';')[8]
        var Eficiencia = req.query.name.split(';')[9]
        var FaixaTensao = req.query.name.split(';')[10]
        var CorrenteMaxCC = req.query.name.split(';')[11]
        var CorrenteMaxCA = req.query.name.split(';')[12]

        var query = `update inversores set fornecedor = '${Fabricante}', tipo = '${Tipo}', potnomi = '${Potencia}', faixamppt = '${FaixaMPPT}', tenspart = '${TensaoCC}', maxtens = '${MaxTensaoCC}', entradaimp = '${CorrenteMaxCC}', eficiencia = '${Eficiencia}', conexaoca = '${Strings}', correntesaída = '${CorrenteMaxCA}', faixatens = '${FaixaTensao}', mppt = '${Fases}' WHERE LOWER(modelo) = LOWER('${modelo}')`
        var { rows } = await pgClient.query(query)
        // const { rows } = await pool.query(query)
        res.json(rows)
    } else {
        res.json("nexiste")
    }
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
        var sizeGreener = Object.keys(greenerData)
        var queryAux = `update greener_orca as g set 
            value = u.value from (values `
        for (let i = 0; i < sizeGreener.length; i++) {
            queryAux += `('${sizeGreener[i]}', '${greenerData[sizeGreener[i]]}'),`
        }
        queryAux = queryAux.slice(0, -1)
        queryAux += `) as u(name, value)
            where g.name = u.name`
        var { rows } = await pgClient.query(queryAux)
        res.json(true)
    } catch (err) {
        res.json(err)
    }
})