var optionsClient = ''
var optionsFornMdl = ''
var optionsPoteMdl = ''
var optionsTipoMdl = ''
var optionsTecnMdl = ''
var optionsPecaMdl = ''
var optionsFornMdlNew = ''
var optionsPoteMdlNew = ''
var optionsTipoMdlNew = ''
var optionsTecnMdlNew = ''
var optionsPecaMdlNew = ''

var optionsFornInv = ''
var optionsFaseInv = ''
var optionsStriInv = ''
var optionsInveInv = ''
var optionsPoteInv = ''
var optionsPecaInv = ''
var optionsFornInvNew = ''
var optionsFaseInvNew = ''
var optionsStriInvNew = ''
var optionsInveInvNew = ''
var optionsPoteInvNew = ''
var optionsPecaInvNew = ''

var listInputs = [
  'inputJanConsumo',
  'inputFevConsumo',
  'inputMarConsumo',
  'inputAbrConsumo',
  'inputMaiConsumo',
  'inputJunConsumo',
  'inputJulConsumo',
  'inputAgoConsumo',
  'inputSetConsumo',
  'inputOutConsumo',
  'inputNovConsumo',
  'inputDezConsumo',
]
async function deletaDepois() {
  var listConsumo = [
    23960,
    24240,
    24280,
    27540,
    23080,
    21360,
    22680,
    24000,
    19720,
    20720,
    22800,
    24920,
  ]
  $('#inputJanConsumo')[0].value = listConsumo[0]
  $('#inputFevConsumo')[0].value = listConsumo[1]
  $('#inputMarConsumo')[0].value = listConsumo[2]
  $('#inputAbrConsumo')[0].value = listConsumo[3]
  $('#inputMaiConsumo')[0].value = listConsumo[4]
  $('#inputJunConsumo')[0].value = listConsumo[5]
  $('#inputJulConsumo')[0].value = listConsumo[6]
  $('#inputAgoConsumo')[0].value = listConsumo[7]
  $('#inputSetConsumo')[0].value = listConsumo[8]
  $('#inputOutConsumo')[0].value = listConsumo[9]
  $('#inputNovConsumo')[0].value = listConsumo[10]
  $('#inputDezConsumo')[0].value = listConsumo[11]
  for (let i = 0; i < listInputs.length; i++) {
    itemsConsumo[listInputs[i]] = parseFloat(listConsumo[i])
  }
  await sumItems('function', 123)
}

function base64ToArrayBuffer(base64) {
  var binaryString = window.atob(base64);
  var binaryLen = binaryString.length;
  var bytes = new Uint8Array(binaryLen);
  for (var i = 0; i < binaryLen; i++) {
    var ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }
  return bytes;
}
function saveByteArray(reportName, byte) {
  var blob = new Blob([byte], { type: "image/png" });
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
};

async function downloadImage() {
  var sampleArr = base64ToArrayBuffer(data);
  saveByteArray("teste.jpg", sampleArr);
  // var dataUrl = `opi`
  // var pathName = 'graficoConsumoGeracao'
  // var mldGetData = `/downloadImage?name=${dataUrl};${pathName}`
  // const dataMdlForn = await fecthGet(mldGetData)
  // console.log(dataMdlForn)
}

async function exportData() {
  var mldGetData = '/docxTemplater'
  const dataMdlForn = await fecthGet(mldGetData)
  console.log(dataMdlForn)
}

async function exportChart() {
  Plotly.toImage('graficoConsumoGeracao', { format: 'png', width: 800, height: 600 }).then(
    function (dataUrl) {
      console.log(dataUrl.split(',')[1])
      var sampleArr = base64ToArrayBuffer(dataUrl.split(',')[1]);
      saveByteArray("/temp_folder/graficoConsumoGeracao.png", sampleArr);
    })
}

async function createCharts() {
  var config = { responsive: true }

  var trace1 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: listConsumoGeracao,
    type: 'scatter',
    name: 'Consumo'
  };

  var trace2 = {
    x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    y: listGeracaoConsumo,
    type: 'bar',
    name: 'Geração'
  };
  var data = [trace1, trace2];
  var dtickUserGera = 5000
  if (consumoTotal / 12 > 2) {
    dtickUserGera = 5000
  } else {
    dtickUserGera = 2500
  }
  var layout = {
    title: 'CONSUMO X GERAÇÃO',
    xaxis: {
      title: 'Meses do Ano',
      autotick: false,
      dtick: 1,
    },
    yaxis: {
      title: 'Potência Gerada (kW)',
      autotick: false,
      dtick: dtickUserGera,
    }
  };

  Plotly.newPlot('graficoConsumoGeracao', data, layout, config);


  var dtickUser = 1000000
  if (soma25Anos / 25 > 1000000) {
    dtickUser = 1000000
  } else {
    dtickUser = 500000
  }
  var layoutPayback = {
    title: 'PAYBACK',
    xaxis: {
      title: 'Ano',
      autotick: false,
      dtick: 1,
    },
    yaxis: {
      title: 'Valor (R$)',
      autotick: false,
      dtick: dtickUser,
    }
  };
  var dataPayback = [
    {
      x: listAnoPayback,
      y: listFluxoPayback,
      type: 'bar'
    }
  ];

  Plotly.newPlot('graficoPayback', dataPayback, layoutPayback, config);
}

var fatorKdata = ''
var optionsDistribuidora = ''

var itemsConsumo = {

}
var somaConsumo = 0

var itemsCorrecao = {
  inputSujeira: 0,
  inputPosTelhado: 0,
  inputTPmaxPerModulo: 0,
  inputTVocPerModulo: 0,
  inputTIscPerModulo: 0,
  inputFatorCorr: 0,
  inputDegraAnual: 0,
}
var somaCorrecao = 0

const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);

var CreditoConsumoTUSD
var CreditoConsumoTE
var CreditoPIS
var CreditoCOFINS
var CreditoConsumoTUSDIcms
var CreditoConsumoTEIcms
var CreditoTaxaIlum
var CreditoSomaTotal

//#region REPLICAR PARA OUTROS TÓPICOS (tarifa fio b, modulos e inversores)
var resultExcelData
var input = document.getElementById('excelDataMdl');
input.addEventListener('change', async function () {
  console.log
  if (input.files[0]['name'].indexOf('.xlsx') != -1) {
    resultExcelData = await readXlsxFile(input.files[0]).then(function (data) {
      data.shift()
      return data
    })
    var dataToSend = JSON.stringify(resultExcelData)
    var resp = await fecthGet(`/updateTask?name=tarifab3;${dataToSend}`)
    console.log(resp)
  } else {
    alert('Por favor, selecione um arquivo de extensão xlsx')
  }
})
async function updateTarifaB3() {
  var data = await fecthGet(`/updateTask?name=tarifab3`)
  console.log(data)
}
async function updateModulos() {
  var data = await fecthGet(`/updateTask?name=modulos`)
  console.log(data)
}
async function updateInversores() {
  var data = await fecthGet(`/updateTask?name=inversores`)
  console.log(data)
}
async function updateTarifaFioB() {
  var data = await fecthGet(`/updateTask?name=tarifafiob`)
}
//#endregion

//#region GREENER
var greenerData = {
  '2': 2.45,
  '4': 1.67,
  '8': 1.32,
  '12': 1.20,
  '30': 1.13,
  '50': 1.04,
  '75': 1.22,
  '150': 1.15,
  '300': 1.05,
  '500': 1.05,
  '1000': 1.18,
  'MO': 150
}
async function fillGreener() {
  $('#input2potOrca')[0].value = greenerData['2']
  $('#input4potOrca')[0].value = greenerData['4']
  $('#input8potOrca')[0].value = greenerData['8']
  $('#input12potOrca')[0].value = greenerData['12']
  $('#input30potOrca')[0].value = greenerData['30']
  $('#input50potOrca')[0].value = greenerData['50']
  $('#input75potOrca')[0].value = greenerData['75']
  $('#input150potOrca')[0].value = greenerData['150']
  $('#input300potOrca')[0].value = greenerData['300']
  $('#input500potOrca')[0].value = greenerData['500']
  $('#input1000potOrca')[0].value = greenerData['1000']
  $('#inputMoTerceiroOrca')[0].value = greenerData['MO']
}
async function saveGreener() {
  var input2potOrca = $('#input2potOrca')[0].value
  var input4potOrca = $('#input4potOrca')[0].value
  var input8potOrca = $('#input8potOrca')[0].value
  var input12potOrca = $('#input12potOrca')[0].value
  var input30potOrca = $('#input30potOrca')[0].value
  var input50potOrca = $('#input50potOrca')[0].value
  var input75potOrca = $('#input75potOrca')[0].value
  var input150potOrca = $('#input150potOrca')[0].value
  var input300potOrca = $('#input300potOrca')[0].value
  var input500potOrca = $('#input500potOrca')[0].value
  var input1000potOrca = $('#input1000potOrca')[0].value
  var inputMoTerceiroOrca = $('#inputMoTerceiroOrca')[0].value
  greenerData['2'] = input2potOrca
  greenerData['4'] = input4potOrca
  greenerData['8'] = input8potOrca
  greenerData['12'] = input12potOrca
  greenerData['30'] = input30potOrca
  greenerData['50'] = input50potOrca
  greenerData['75'] = input75potOrca
  greenerData['150'] = input150potOrca
  greenerData['300'] = input300potOrca
  greenerData['500'] = input500potOrca
  greenerData['1000'] = input1000potOrca
  greenerData['MO'] = inputMoTerceiroOrca

  var sendData = JSON.stringify(greenerData)
  var result = await fecthGet(`/updateGreener?name=${sendData}`)
  if (result) {
    alert('DADOS ATUALIZADOS')
  } else {
    alert('ERRO: ' + result)
  }
}
//#endregion

function IRR(values, guess) {
  // Credits: algorithm inspired by Apache OpenOffice

  // Calculates the resulting amount
  var irrResult = function (values, dates, rate) {
    var r = rate + 1;
    var result = values[0];
    for (var i = 1; i < values.length; i++) {
      result += values[i] / Math.pow(r, (dates[i] - dates[0]) / 365);
    }
    return result;
  }

  // Calculates the first derivation
  var irrResultDeriv = function (values, dates, rate) {
    var r = rate + 1;
    var result = 0;
    for (var i = 1; i < values.length; i++) {
      var frac = (dates[i] - dates[0]) / 365;
      result -= frac * values[i] / Math.pow(r, frac + 1);
    }
    return result;
  }

  // Initialize dates and check that values contains at least one positive value and one negative value
  var dates = [];
  var positive = false;
  var negative = false;
  for (var i = 0; i < values.length; i++) {
    dates[i] = (i === 0) ? 0 : dates[i - 1] + 365;
    if (values[i] > 0) positive = true;
    if (values[i] < 0) negative = true;
  }

  // Return error if values does not contain at least one positive value and one negative value
  if (!positive || !negative) return '#NUM!';

  // Initialize guess and resultRate
  var guess = (typeof guess === 'undefined') ? 0.1 : guess;
  var resultRate = guess;

  // Set maximum epsilon for end of iteration
  var epsMax = 1e-10;

  // Set maximum number of iterations
  var iterMax = 50;

  // Implement Newton's method
  var newRate, epsRate, resultValue;
  var iteration = 0;
  var contLoop = true;
  do {
    resultValue = irrResult(values, dates, resultRate);
    newRate = resultRate - resultValue / irrResultDeriv(values, dates, resultRate);
    epsRate = Math.abs(newRate - resultRate);
    resultRate = newRate;
    contLoop = (epsRate > epsMax) && (Math.abs(resultValue) > epsMax);
  } while (contLoop && (++iteration < iterMax));

  if (contLoop) return '#NUM!';

  // Return internal rate of return
  return resultRate;
}

var paybackCompleto
var dictValorFluxo = []
var vpTotal
var soma25Anos = 0
var tir25Anos = []
var kmRodado
var arvorePoupada
var co2Evitado
var listAnoPayback = []
var listFluxoPayback = []
async function fluxoCaixa() {
  listAnoPayback = []
  listFluxoPayback = []
  dictValorFluxo = []
  var vp
  var vpa
  var checkVpa = false
  vpTotal = 0
  tir25Anos = []
  var inflacao = await valNum($('#inputInflacaoEletricaFluxo')[0].value) / 100
  for (i = 0; i <= 25; i++) {
    if (i == 0) {
      dictValorFluxo.push({
        ano: i,
        fluxo: -totalGeralOrcaFinal,
        vp: -totalGeralOrcaFinal,
        vpa: -totalGeralOrcaFinal
      })
    } else {
      vp = mediaAnualEconomia * Math.pow((1 + inflacao), i)
      vpa = dictValorFluxo[i - 1].vpa + vp
      dictValorFluxo.push({
        ano: i,
        fluxo: dictValorFluxo[i - 1].vpa,
        vp: vp,
        vpa: vpa
      })
      vpTotal += vp
      listAnoPayback.push(i)
      listFluxoPayback.push(vpa)
      soma25Anos += vpa
    }
    if (vpa > 0 && checkVpa == false) {
      var payback = (-dictValorFluxo[i].fluxo / dictValorFluxo[i].vp) + i - 1
      var anoPayback = Math.floor(payback)
      var mesPayback = Math.floor((payback - anoPayback) * 12)
      var diaPayback = Math.floor((((payback - anoPayback) * 12) - mesPayback) * 30)
      paybackCompleto = `${anoPayback} Anos ${mesPayback} Meses ${diaPayback} Dias`
      $('#inputPaybackAnoResultado')[0].value = payback.toFixed(2)
      $('#inputPaybackCompletoResultado')[0].value = paybackCompleto
      $('#inputPaybackAnualResultado')[0].value = (1 / payback).toFixed(2) + ' %'
      checkVpa = true
    }
    tir25Anos.push(dictValorFluxo[i].fluxo)
  }
  await loadTableData(dictValorFluxo, "bodyFluxo")
  $('#inputSomaVpResultado')[0].value = brlBrazil.format(vpTotal)
  $('#inputVplProjetoResultado')[0].value = brlBrazil.format(vpTotal - totalGeralOrcaFinal)
  $('#inputTaxaLucraResultado')[0].value = (vpTotal / totalGeralOrcaFinal).toFixed(2)
  $('#inputRoiResultado')[0].value = (((mediaAnualEconomia * 25) - totalGeralOrcaFinal) / totalGeralOrcaFinal).toFixed(2)
  console.log(tir25Anos, await IRR(tir25Anos,))
  $('#inputTirResultado')[0].value = ((await IRR(tir25Anos,)) * 100).toFixed(2) + ' %'

  kmRodado = ((geracaoTotal * 25) * 0.7097)
  arvorePoupada = ((geracaoTotal * 25) * 5.04 * 10000)
  co2Evitado = ((gerConsumo * 5.3622972))
  $('#inputKmRodadosResultado')[0].value = kmRodado.toFixed(2)
  $('#inputArvoresResultado')[0].value = arvorePoupada.toFixed(2)
  $('#inputCo2Resultado')[0].value = co2Evitado.toFixed(2)
}
var dictGeracaoConsumo = []
var meses = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
]
var mesesPt = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
]
var geracaoTotal = 0
var geracaoMedia = 0
var consumoAddTotal = 0
var consumoAddMedia = 0
var consumoTotal = 0
var consumoMedia = 0
var listConsumoGeracao = []
var listGeracaoConsumo = []
async function geracaoConsumo() {
  listConsumoGeracao = []
  listGeracaoConsumo = []
  dictGeracaoConsumo = []

  geracaoTotal = 0
  geracaoMedia = 0
  consumoAddTotal = 0
  consumoAddMedia = 0
  consumoTotal = 0
  consumoMedia = 0
  geracaoTotal = 0
  for (let i = 0; i < meses.length; i++) {
    var geracao = (emmConsumo * (await valNum(dataIrr[0][meses[i]]) / 1000) * 30 * (fatConsumo / 100)) / 100
    var consumoAdd = await valNum(itemsConsumo[listInputs[i]]) + addConsumo
    var consumo = await valNum(itemsConsumo[listInputs[i]])
    dictGeracaoConsumo.push({
      mes: mesesPt[i],
      geracao: geracao,
      consumoAdd: consumoAdd,
      consumo: consumo
    })
    geracaoTotal += geracao
    consumoAddTotal += consumoAdd
    consumoTotal += consumo
  }
  for (i = 0; i < dictGeracaoConsumo.length; i++) {
    listConsumoGeracao.push(dictGeracaoConsumo[i]['consumo'])
    listGeracaoConsumo.push(dictGeracaoConsumo[i]['geracao'])
  }

  geracaoMedia = geracaoTotal / 12
  consumoAddMedia = consumoAddTotal / 12
  consumoMedia = consumoTotal / 12
  dictGeracaoConsumo.push({
    mes: 'MÉDIA KWH',
    geracao: geracaoMedia,
    consumoAdd: consumoAddMedia,
    consumo: consumoMedia
  })
  dictGeracaoConsumo.push({
    mes: 'ANUAL KWH',
    geracao: geracaoTotal,
    consumoAdd: consumoAddTotal,
    consumo: consumoTotal
  })


  await loadTableData(dictGeracaoConsumo, 'bodyGeracaoConsumo')
}

async function pgto(taxa, parcelas, valor) {
  return valor * (taxa) / (1 - (Math.pow(1 + taxa, -parcelas)));
}
var finalFinanciamento
async function valFinanciamento() {
  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento12')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento12')[0].value) / 100
  finalFinanciamento = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento12')[0].value = brlBrazil.format(finalFinanciamento)

  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento48')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento48')[0].value) / 100
  finalFinanciamento = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento48')[0].value = brlBrazil.format(finalFinanciamento)

  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento60')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento60')[0].value) / 100
  finalFinanciamento = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento60')[0].value = brlBrazil.format(finalFinanciamento)

  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento120')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento120')[0].value) / 100
  finalFinanciamento = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento120')[0].value = brlBrazil.format(finalFinanciamento)

  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento150')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento150')[0].value) / 100
  finalFinanciamento = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento150')[0].value = brlBrazil.format(finalFinanciamento)

}

var somaOrcaFinal = 0
var impostoOrcaFinal = 0
var totalGeralOrcaFinal = 0

var MatFotov = 0
var PainelProt = 0
var StringBox = 0
var MaterialCa = 0
var EstruCobert = 0
var Eletroduto = 0
var CustoViagem = 0
var Lucro = 0
var LucroMg = 0
async function sumOrcaFinal() {
  MatFotov = await valNum($('#inputMatFotovOrca')[0].value)
  PainelProt = await valNum($('#inputPainelProtOrca')[0].value)
  StringBox = await valNum($('#inputStringBoxOrca')[0].value)
  MaterialCa = await valNum($('#inputMaterialCaOrca')[0].value)
  EstruCobert = await valNum($('#inputEstruCobertOrca')[0].value)
  Eletroduto = await valNum($('#inputEletrodutoOrca')[0].value)
  CustoViagem = await valNum($('#inputCustoViagemOrca')[0].value)
  Lucro = await valNum($('#inputLucroOrca')[0].value)
  LucroMg = lucroMargem
  somaOrcaFinal = (projeHomo - moTerceira) + moTerceira + MatFotov + PainelProt + StringBox + MaterialCa + EstruCobert + Eletroduto + CustoViagem

  var inputImpostoOrca = await valNum($('#inputImpostoOrca')[0].value)
  impostoOrcaFinal = (somaOrcaFinal / (1 - (inputImpostoOrca / 100))) * (inputImpostoOrca / 100)
  totalGeralOrcaFinal = somaOrcaFinal + impostoOrcaFinal
  $('#inputTotalOrcaFinal')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento12')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento48')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento60')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento120')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento150')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputInvestInicialFluxo')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  await descontoOrcaFinal()
  await valFinanciamento()
  await fluxoCaixa()
}

var projeHomo
async function getProjetoHomo() {
  switch (true) {
    case (potTotalOrca < 2):
      projeHomo = potTotalOrca * greenerData['2'] * 1000
      break
    case (potTotalOrca >= 2 && potTotalOrca < 4):
      projeHomo = potTotalOrca * greenerData['4'] * 1000
      break
    case (potTotalOrca >= 4 && potTotalOrca < 8):
      projeHomo = potTotalOrca * greenerData['8'] * 1000
      break
    case (potTotalOrca >= 8 && potTotalOrca < 12):
      projeHomo = potTotalOrca * greenerData['12'] * 1000
      break
    case (potTotalOrca >= 12 && potTotalOrca < 30):
      projeHomo = potTotalOrca * greenerData['30'] * 1000
      break
    case (potTotalOrca >= 30 && potTotalOrca < 50):
      projeHomo = potTotalOrca * greenerData['50'] * 1000
      break
    case (potTotalOrca >= 50 && potTotalOrca < 75):
      projeHomo = potTotalOrca * greenerData['75'] * 1000
      break
    case (potTotalOrca >= 75 && potTotalOrca < 150):
      projeHomo = potTotalOrca * greenerData['150'] * 1000
      break
    case (potTotalOrca >= 150 && potTotalOrca < 300):
      projeHomo = potTotalOrca * greenerData['300'] * 1000
      break
    case (potTotalOrca >= 300 && potTotalOrca < 500):
      projeHomo = potTotalOrca * greenerData['500'] * 1000
      break
    case (potTotalOrca >= 500 && potTotalOrca < 1000):
      projeHomo = potTotalOrca * greenerData['1000'] * 1000
      break
  }
  $('#inputProjHomOrca')[0].value = brlBrazil.format(projeHomo)
}
var moTerceira
var lucroMargem
var lucro
var porcentForn
var painelCA
var comissao
var comissaoValor
var lucroLiq
var precoKwp
var precoPorServKwp
var precoPorMatKwp
async function updateLucro() {
  porcentForn = await valNum($('#inputPorcentagemFornOrca')[0].value) / 100
  comissao = await valNum($('#inputComissaoOrca')[0].value) / 100
  comissaoValor = comissao * totalGeralOrcaFinal
  lucroLiq = lucroMargem - comissaoValor
  lucro = await valNum($('#inputLucroOrca')[0].value)
  painelCA = await valNum($('#inputPainelProtOrca')[0].value)
  lucroMargem = projeHomo + (painelCA * porcentForn) + lucro - moTerceira
  $('#inputLucroMgOrca')[0].value = brlBrazil.format(lucroMargem)
  $('#inputLucroBrutoValorOrcaFinal')[0].value = brlBrazil.format(lucroMargem)
  $('#inputLucroBrutoPercentualOrcaFinal')[0].value = (lucroMargem / totalGeralOrcaFinal).toFixed(2) + ' %'
  $('#inputComissaoValorOrcaFinal')[0].value = brlBrazil.format(comissaoValor)
  $('#inputComissaoPercentualOrcaFinal')[0].value = (comissaoValor / totalGeralOrcaFinal).toFixed(2) + ' %'
  $('#inputLucroLiqValorOrcaFinal')[0].value = brlBrazil.format(lucroLiq)
  $('#inputLucroLiqPercentualOrcaFinal')[0].value = (lucroLiq / totalGeralOrcaFinal).toFixed(2) + ' %'

  precoKwp = totalGeralOrcaFinal / gerConsumo
  precoPorServKwp = (somaOrcaFinal - Eletroduto - StringBox) / gerConsumo
  precoPorMatKwp = (LucroMg + Eletroduto + StringBox) / gerConsumo
  $('#inputPrecoKwpValorOrcaFinal')[0].value = brlBrazil.format(precoKwp)
  $('#inputPrecoKwpPercentualOrcaFinal')[0].value = brlBrazil.format(precoKwp / 1000)
  $('#inputPrecoServKwpValorOrcaFinal')[0].value = brlBrazil.format(precoPorServKwp)
  $('#inputPrecoServKwpPercentualOrcaFinal')[0].value = brlBrazil.format(precoPorServKwp / 1000)
  $('#inputPrecoMatKwpValorOrcaFinal')[0].value = brlBrazil.format(precoPorMatKwp)
  $('#inputPrecoMatKwpPercentualOrcaFinal')[0].value = brlBrazil.format(precoPorMatKwp / 1000)

}
async function getDataOrcaFinal() {
  await getProjetoHomo() //projeHomo
  await sumOrcaFinal()
  dictValorOrca.forEach(element => {
    if (element.titulo == 'PROJETO + HOMOLOGAÇÃO') {
      element.valor = projeHomo - moTerceira
      element.percentual = ((projeHomo - moTerceira) / totalGeralOrcaFinal) * 100
      element.valorWp = (projeHomo - moTerceira) / potPicoReal / 1000
    } else if (element.titulo == 'MÃO DE OBRA TERCEIRA') {
      element.valor = moTerceira
      element.percentual = (moTerceira / totalGeralOrcaFinal) * 100
      element.valorWp = moTerceira / potPicoReal / 1000
    } else if (element.titulo == 'MATERIAL FOTOVOLTAICO') {
      element.valor = MatFotov
      element.percentual = (MatFotov / totalGeralOrcaFinal) * 100
      element.valorWp = MatFotov / potPicoReal / 1000
    } else if (element.titulo == 'PAINEL DE PROTEÇÃO CA') {
      element.valor = PainelProt
      element.percentual = (PainelProt / totalGeralOrcaFinal) * 100
      element.valorWp = PainelProt / potPicoReal / 1000
    } else if (element.titulo == 'STRING BOX CC') {
      element.valor = StringBox
      element.percentual = (StringBox / totalGeralOrcaFinal) * 100
      element.valorWp = StringBox / potPicoReal / 1000
    } else if (element.titulo == 'MATERIAL CA') {
      element.valor = MaterialCa
      element.percentual = (MaterialCa / totalGeralOrcaFinal) * 100
      element.valorWp = MaterialCa / potPicoReal / 1000
    } else if (element.titulo == 'ESTRUTURA COBERTURA') {
      element.valor = EstruCobert
      element.percentual = (EstruCobert / totalGeralOrcaFinal) * 100
      element.valorWp = EstruCobert / potPicoReal / 1000
    } else if (element.titulo == 'ELETRODUTO') {
      element.valor = Eletroduto
      element.percentual = (Eletroduto / totalGeralOrcaFinal) * 100
      element.valorWp = Eletroduto / potPicoReal / 1000
    } else if (element.titulo == 'CUSTO VIAGEM') {
      element.valor = CustoViagem
      element.percentual = (CustoViagem / totalGeralOrcaFinal) * 100
      element.valorWp = CustoViagem / potPicoReal / 1000
    } else if (element.titulo == 'LUCRO') {
      element.valor = lucro
      element.percentual = (lucro / totalGeralOrcaFinal) * 100
      element.valorWp = lucro / potPicoReal / 1000
    } else if (element.titulo == 'LUCRO BRUTO(R$)') {
      element.valor = lucroMargem
      element.percentual = (lucroMargem / totalGeralOrcaFinal) * 100
      element.valorWp = lucroMargem / potPicoReal / 1000
    } else if (element.titulo == 'TOTAL DE CUSTOS') {
      element.valor = somaOrcaFinal
      element.percentual = (somaOrcaFinal / totalGeralOrcaFinal) * 100
      element.valorWp = somaOrcaFinal / potPicoReal / 1000
    } else if (element.titulo == 'IMPOSTOS') {
      element.valor = impostoOrcaFinal
      element.percentual = (impostoOrcaFinal / totalGeralOrcaFinal) * 100
      element.valorWp = impostoOrcaFinal / potPicoReal / 1000
    } else if (element.titulo == 'TOTAL GERAL') {
      element.valor = totalGeralOrcaFinal
      element.percentual = 100
      element.valorWp = (impostoOrcaFinal / potPicoReal / 1000) + (totalGeralOrcaFinal / potPicoReal / 1000)
    }
  });
  console.log(dictValorOrca)
  await loadTableData(dictValorOrca, 'bodyOrcaFinal')
  await updateLucro()
}
var totalDescontoOrcaFinal
var descontoOrca
async function descontoOrcaFinal() {
  descontoOrca = await valNum($('#inputDescontoOrcaFinal')[0].value)
  totalDescontoOrcaFinal = totalGeralOrcaFinal * (1 - await valNum($('#inputDescontoOrcaFinal')[0].value) / 100)
  $('#inputTotalCDescOrcaFinal')[0].value = brlBrazil.format(totalDescontoOrcaFinal)
  $('#inputTaxaDescontoFluxo')[0].value = descontoOrca.toFixed(2) + ' %'
}
async function fatorCorrecao(id, value) {
  if (id != 'function') {
    itemsCorrecao[id] = parseFloat(value)
  }
  somaCorrecao = sumValues(itemsCorrecao)
  element27.value = (parseFloat(1 + (somaCorrecao / 100)) * 100).toFixed(2)
  fatConsumo = (1 + (somaCorrecao / 100)) * 100
}
var valorBandeira
async function checkBandeira(valor) {
  var bandeira = valor
  var addBand = 0
  switch (bandeira) {
    case 'VERDE':
      addBand = 0
      valorBandeira = 0
      break
    case 'AMARELA':
      addBand = 0.01872 * emmConsumo
      valorBandeira = 0.01872
      break
    case 'VERMELHA I':
      addBand = 0.03971 * emmConsumo
      valorBandeira = 0.03971
      break
    case 'VEMRELHA II':
      addBand = 0.0949 * emmConsumo
      valorBandeira = 0.0949
      break
    case 'ESCASSEZ HÍDRICA':
      addBand = 0.142 * emmConsumo
      valorBandeira = 0.142
      break
  }
  $('#inputCreditoBandTarifa')[0].value = addBand.toFixed(2)
  $('#inputBandTarifa')[0].value = addBand.toFixed(2)
  $('#inputBaseCalc')[0].value = (parseFloat(somaConsumo / somaItens) * (PIS + COFINS + tarifaTusdImp + tarifaTeImp)) + addBand
}
var gerConsumo
var emmConsumo
var fatConsumo
var addConsumo
async function sumItems(id, value) {
  if (value != '') {
    if (id != 'function') {
      itemsConsumo[id] = parseFloat(value)
    }
    //await fatorCorrecao('function', 123)
    var somaItens = Object.keys(itemsConsumo).length
    somaConsumo = sumValues(itemsConsumo)
    emmConsumo = parseFloat(somaConsumo / somaItens)
    addConsumo = $('#inputAddConsumo')[0].value
    if (addConsumo == '') {
      addConsumo = 0
    } else {
      addConsumo = parseFloat($('#inputAddConsumo')[0].value)
    }
    console.log(fatConsumo)
    gerConsumo = ((emmConsumo + addConsumo) / fatConsumo) * porcentagem
    $('#inputSumConsumo')[0].value = parseFloat(somaConsumo).toFixed(2)
    $('#inputEmmConsumo')[0].value = emmConsumo.toFixed(2)
    $('#inputConsumoBT')[0].value = emmConsumo.toFixed(2)
    $('#inputEMMCalculo')[0].value = gerConsumo.toFixed(2)
    $('#inputEnergiaMediaDiariaCalculo')[0].value = (gerConsumo / 30).toFixed(2)
    emmDiario = gerConsumo / 30

    var bandeira = document.getElementById(`inputBandeira`).value
    var ICMS = parseFloat(icms) / 100
    var PIS = parseFloat(pis) / 100
    var COFINS = parseFloat(cofins) / 100
    var addBand = 0
    switch (bandeira) {
      case 'VERDE':
        addBand = 0
        valorBandeira = 0
        break
      case 'AMARELA':
        addBand = 0.01872 * emmConsumo
        valorBandeira = 0.01872
        break
      case 'VERMELHA I':
        addBand = 0.03971 * emmConsumo
        valorBandeira = 0.03971
        break
      case 'VEMRELHA II':
        addBand = 0.0949 * emmConsumo
        valorBandeira = 0.0949
        break
      case 'ESCASSEZ HÍDRICA':
        addBand = 0.142 * emmConsumo
        valorBandeira = 0.142
        break
    }
    var baseCalc = (parseFloat(somaConsumo / somaItens) * (PIS + COFINS + tarifaTusdImp + tarifaTeImp)) + addBand
    $('#inputCreditoBandTarifa')[0].value = addBand.toFixed(2)
    $('#inputBandTarifa')[0].value = addBand.toFixed(2)
    $('#inputBaseCalc')[0].value = baseCalc.toFixed(2)
    var economiaSolar = $('#inputEconomiaSolar')[0].value
    CreditoConsumoTUSD = (emmConsumo * tarifaTusdImp)
    CreditoConsumoTE = (emmConsumo * tarifaTeImp)
    CreditoPIS = (baseCalc * PIS)
    CreditoCOFINS = (baseCalc * COFINS)
    CreditoConsumoTUSDIcms = (emmConsumo * tarifaTusdImp * ICMS)
    CreditoConsumoTEIcms = (emmConsumo * tarifaTeImp * ICMS)
    CreditoTaxaIlum = parseFloat(ilum_pub)

    CreditoSomaTotal = CreditoConsumoTUSD + CreditoConsumoTE + CreditoPIS + CreditoCOFINS + CreditoTaxaIlum + addBand

    $('#inputCreditoConsumoTUSD')[0].value = CreditoConsumoTUSD.toFixed(2)
    $('#inputCreditoConsumoTE')[0].value = CreditoConsumoTE.toFixed(2)
    $('#inputCreditoPIS')[0].value = CreditoPIS.toFixed(2)
    $('#inputCreditoCOFINS')[0].value = CreditoCOFINS.toFixed(2)
    $('#inputCreditoConsumoTUSDIcms')[0].value = CreditoConsumoTUSDIcms.toFixed(2)
    $('#inputCreditoConsumoTEIcms')[0].value = CreditoConsumoTEIcms.toFixed(2)
    $('#inputCreditoTotalFatura')[0].value = CreditoSomaTotal.toFixed(2)

    $('#inputFaturaSSolar')[0].value = CreditoSomaTotal.toFixed(2)
    if (economiaSolar == '') { economiaSolar = 0 } else { economiaSolar = parseFloat(economiaSolar) }
    $('#inputResidualFatura')[0].value = (CreditoSomaTotal - economiaSolar).toFixed(2)

    $('#inputGerConsumo')[0].value = gerConsumo.toFixed(2)
    $('#inputPotConsumo')[0].value = gerConsumo.toFixed(2)
    $('#inputDemConsumo')[0].value = (gerConsumo / 1.3).toFixed(2)
    element50.value = emmConsumo.toFixed(2)

    await energiaInversor()
    await tableTaxacaoFioB()
    await geracaoConsumo()
  }

}
var listTituloOrcaFinal = [
  'PROJETO + HOMOLOGAÇÃO',
  'MÃO DE OBRA TERCEIRA',
  'MATERIAL FOTOVOLTAICO',
  'PAINEL DE PROTEÇÃO CA',
  'STRING BOX CC',
  'MATERIAL CA',
  'ESTRUTURA COBERTURA',
  'ELETRODUTO',
  'CUSTO VIAGEM',
  'LUCRO',
  'LUCRO BRUTO(R$)',
  'TOTAL DE CUSTOS',
  'IMPOSTOS',
]
var dictValorOrca = [
  {
    titulo: 'PROJETO + HOMOLOGAÇÃO',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'MÃO DE OBRA TERCEIRA',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'MATERIAL FOTOVOLTAICO',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'PAINEL DE PROTEÇÃO CA',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'STRING BOX CC',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'MATERIAL CA',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'ESTRUTURA COBERTURA',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'ELETRODUTO',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'CUSTO VIAGEM',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'LUCRO',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'LUCRO BRUTO(R$)',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'TOTAL DE CUSTOS',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'IMPOSTOS',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }, {
    titulo: 'TOTAL GERAL',
    valor: 0,
    percentual: 0,
    valorWp: 0
  }]
async function tableOrcaFinal() {



}

var listFinalTaxacao = []
var listFinalGeracao = []
var listFinalEconomia = []
var economiaAnual
var mediaAnualEconomia
async function tableTaxacaoFioB() {
  var tarifafiob = await fecthGet(`/tarifafiobData?name=${distribuidora}`)
  console.log(tarifafiob)
  var tusd_fiob = await valNum(tarifafiob[0].tusd_fiob)
  var valConsumo = Number(s_imposto)
  var custoDispon = Number(tipoSis * s_imposto)
  $('#inputValConsumoTaxacaoFioB')[0].value = brlBrazil.format(s_imposto)
  $('#inputCustoDispoTaxacaoFioB')[0].value = brlBrazil.format(custoDispon)
  $('#inputIcmsGeracaoBt')[0].value = (icms / 100).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
  $('#inputConstEscHidGeracaoBt')[0].value = brlBrazil.format(valorBandeira)
  $('#inputIlumPubGeracaoBt')[0].value = brlBrazil.format(ilum_pub)
  var listAno = [
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
  ]
  var listTaxa = [
    0.15,
    0.30,
    0.45,
    0.60,
    0.75,
    0.90,
    1.00,
  ]
  listFinalTaxacao = []
  listFinalGeracao = []
  listFinalEconomia = []
  for (let i = 0; i < listTaxa.length; i++) {
    var custoDisponTable = 0
    var fiobInjetadaTable = tusd_fiob * listTaxa[i]
    var energiaInjetadaTable = valConsumo - fiobInjetadaTable
    var pagoFioBTable = emmConsumo * (1 - (Number(consumoInst) / 100)) * tusd_fiob * listTaxa[i]
    if (pagoFioBTable < custoDispon) {
      custoDisponTable = custoDispon
    } else {
      custoDisponTable = pagoFioBTable
    }
    listFinalTaxacao.push([
      listAno[i],
      listTaxa[i],
      fiobInjetadaTable,
      energiaInjetadaTable,
      pagoFioBTable,
      custoDisponTable
    ])
    var tarifaicms = custoDisponTable * (1 + (icms / 100))
    var tarifapis = custoDisponTable * (pis / 100)
    var tarifacofins = custoDisponTable * (cofins / 100)
    var tarifabandeira = custoDisponTable * valorBandeira
    var tarifaTotal = 0
    if (porcentagem == 100) {
      tarifaTotal = tarifaicms + tarifapis + tarifacofins + tarifabandeira + ilum_pub
    } else {
      tarifaTotal = CreditoSomaTotal * (1 - (porcentagem / 100))
    }
    listFinalGeracao.push([
      listAno[i],
      custoDisponTable,
      tarifaicms,
      tarifapis,
      tarifacofins,
      tarifabandeira,
      tarifaTotal
    ])
    var economiaMensal = CreditoSomaTotal - tarifaTotal
    economiaAnual = economiaMensal * 12
    listFinalEconomia.push([
      listAno[i],
      economiaMensal,
      economiaAnual
    ])
    var anoAtual = Number($('#inputAno')[0].value)
    var somaEconomiaAnual = 0
    var somaItens = 0
    if (listAno[i] >= anoAtual) {
      somaEconomiaAnual += economiaAnual
      somaItens++
    }
  }
  mediaAnualEconomia = somaEconomiaAnual / somaItens
  $('#inputEconomiaMediaEconomia')[0].value = brlBrazil.format(mediaAnualEconomia)
  $('#inputEconomiaAnualFluxo')[0].value = brlBrazil.format(mediaAnualEconomia)
  await loadTableData(listFinalTaxacao, 'bodyTaxacao')
  await loadTableData(listFinalGeracao, 'bodyGeracao')
  await loadTableData(listFinalEconomia, 'bodyEconomia')
  await fluxoCaixa()
}
//Dados da tabela de Irradiação
async function loadTableData(items, tabelaId) {
  const table = document.getElementById(tabelaId);
  document.getElementById(tabelaId).innerHTML = ''
  if (tabelaId == "bodyIrradiacao") {
    items.forEach(item => {
      let row = table.insertRow();
      let lat = row.insertCell(0);
      lat.innerHTML = parseFloat(item.lat);
      let lon = row.insertCell(1);
      lon.innerHTML = parseFloat(item.lon);
      let jan = row.insertCell(2);
      jan.innerHTML = parseFloat(item.jan) / 1000;
      let feb = row.insertCell(3);
      feb.innerHTML = parseFloat(item.feb) / 1000;
      let mar = row.insertCell(4);
      mar.innerHTML = parseFloat(item.mar) / 1000;
      let apr = row.insertCell(5);
      apr.innerHTML = parseFloat(item.apr) / 1000;
      let may = row.insertCell(6);
      may.innerHTML = parseFloat(item.may) / 1000;
      let jun = row.insertCell(7);
      jun.innerHTML = parseFloat(item.jun) / 1000;
      let jul = row.insertCell(8);
      jul.innerHTML = parseFloat(item.jul) / 1000;
      let aug = row.insertCell(9);
      aug.innerHTML = parseFloat(item.aug) / 1000;
      let sep = row.insertCell(10);
      sep.innerHTML = parseFloat(item.sep) / 1000;
      let oct = row.insertCell(11);
      oct.innerHTML = parseFloat(item.oct) / 1000;
      let nov = row.insertCell(12);
      nov.innerHTML = parseFloat(item.nov) / 1000;
      let dez = row.insertCell(13);
      dez.innerHTML = parseFloat(item.dec) / 1000;
      let anu = row.insertCell(14);
      anu.innerHTML = parseFloat(item.annual) / 1000;
    });
  } else if (tabelaId == "bodyTaxacao") {
    items.forEach(item => {
      let row = table.insertRow();
      var i = 0
      item.forEach(itemFinal => {
        let lat = row.insertCell(i);
        if (itemFinal == item[0]) {
          lat.innerHTML = itemFinal;
        } else if (itemFinal == item[1]) {
          lat.innerHTML = itemFinal.toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
        } else {
          lat.innerHTML = brlBrazil.format(itemFinal);
        }
        i++
      })
    });
  } else if (tabelaId == "bodyGeracao") {
    items.forEach(item => {
      let row = table.insertRow();
      var i = 0
      item.forEach(itemFinal => {
        let lat = row.insertCell(i);
        if (itemFinal == item[0]) {
          lat.innerHTML = itemFinal;
        } else {
          lat.innerHTML = brlBrazil.format(itemFinal);
        }
        i++
      })
    });
  } else if (tabelaId == "bodyEconomia") {
    items.forEach(item => {
      let row = table.insertRow();
      var i = 0
      item.forEach(itemFinal => {
        let lat = row.insertCell(i);
        if (itemFinal == item[0]) {
          lat.innerHTML = itemFinal;
        } else {
          lat.innerHTML = brlBrazil.format(itemFinal);
        }
        i++
      })
    });
  } else if (tabelaId == "bodyOrcaFinal") {
    items.forEach(item => {
      let row = table.insertRow();
      let titulo = row.insertCell(0);
      titulo.innerHTML = item.titulo;
      let valor = row.insertCell(1);
      valor.innerHTML = brlBrazil.format(item.valor);
      let percentual = row.insertCell(2);
      percentual.innerHTML = item.percentual.toFixed(2) + " %";
      let valorWp = row.insertCell(3);
      valorWp.innerHTML = brlBrazil.format(item.valorWp);
    });
  } else if (tabelaId == "bodyFluxo") {
    items.forEach(item => {
      let row = table.insertRow();
      let ano = row.insertCell(0);
      ano.innerHTML = item.ano;
      let fluxo = row.insertCell(1);
      fluxo.innerHTML = brlBrazil.format(item.fluxo);
      let vp = row.insertCell(2);
      vp.innerHTML = brlBrazil.format(item.vp);
      let vpa = row.insertCell(3);
      vpa.innerHTML = brlBrazil.format(item.vpa);
    });
  } else if (tabelaId == "bodyGeracaoConsumo") {
    items.forEach(item => {
      let row = table.insertRow();
      let mes = row.insertCell(0);
      mes.innerHTML = item.mes;
      let geracao = row.insertCell(1);
      geracao.innerHTML = item.geracao.toFixed(2);
      let consumoAdd = row.insertCell(2);
      consumoAdd.innerHTML = item.consumoAdd.toFixed(2);
      let consumo = row.insertCell(3);
      consumo.innerHTML = item.consumo.toFixed(2);
    });
  }
}
// Cálculo "TETO.MAT" do Excel
async function ceilLat(x, s) {
  return s * Math.ceil(parseFloat(x) / s)
}
let brlBrazil = Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
var consumoInst
var porcentagem
var distribuidora
// Buscar dados de cliente
async function buscaCliente(tipo) {
  var nome = document.getElementById(`inputCliente${tipo}`).value
  const data = await fecthPost('/clienteData?name=' + nome)
  consumoInst = await valNum(data[0]["consumo"])
  document.getElementById(`inputTelefone${tipo}`).value = data[0]["telefone"]
  document.getElementById(`inputTelhado${tipo}`).value = data[0]["tipo_telhado"]
  document.getElementById(`inputEstado${tipo}`).value = data[0]["estado"]
  document.getElementById(`inputCidade${tipo}`).value = data[0]["cidade"]
  document.getElementById(`inputRua${tipo}`).value = data[0]["rua"]
  document.getElementById(`inputNumero${tipo}`).value = data[0]["numero"]
  document.getElementById(`inputBairro${tipo}`).value = data[0]["bairro"]
  document.getElementById(`inputCep${tipo}`).value = data[0]["cep"]
  document.getElementById(`inputDistribuidora${tipo}`).value = data[0]["distribuidora"]
  document.getElementById(`inputIcms${tipo}`).value = data[0]["icms"]
  document.getElementById(`inputPis${tipo}`).value = data[0]["pis"]
  document.getElementById(`inputCofins${tipo}`).value = data[0]["cofins"]
  document.getElementById(`inputPorcentagem${tipo}`).value = data[0]["porcentagem"]
  document.getElementById(`inputArea${tipo}`).value = data[0]["area"]
  document.getElementById(`inputConsumo${tipo}`).value = data[0]["consumo"]
  document.getElementById(`inputTaxa${tipo}`).value = data[0]["taxa"]
  document.getElementById(`inputIlumPub${tipo}`).value = data[0]["ilum_pub"]
  document.getElementById(`inputUniCons${tipo}`).value = data[0]["unid_consid"]
  document.getElementById(`inputBandeira${tipo}`).value = data[0]["bandeira"]

  document.getElementById('inputRuaDadoTec').value = data[0]["rua"]
  document.getElementById('inputNumeroDadoTec').value = data[0]["numero"]
  document.getElementById('inputBairroDadoTec').value = data[0]["bairro"]
  document.getElementById('inputTelhadoOrca').value = data[0]["tipo_telhado"]

  document.getElementById(`inputDistribuidoraTaxacaoFioB`).value = data[0]["distribuidora"]
  porcentagem = data[0]["porcentagem"]
  distribuidora = data[0]["distribuidora"]
  const tarifaData = await fecthPost(`/tarifaData?name=${data[0]["distribuidora"]}`)
  pis = await valNum(data[0]["pis"])
  cofins = await valNum(data[0]["cofins"])
  icms = await valNum(data[0]["icms"])
  tusd = await valNum(tarifaData[0]["tusd"])
  te = await valNum(tarifaData[0]["te"])
  ilum_pub = await valNum(data[0]["ilum_pub"])
  s_imposto = await valNum(tarifaData[0]["s_imposto"])
  $('#inputTarifaPIS')[0].value = pis.toFixed(2)
  $('#inputTarifaCOFINS')[0].value = cofins.toFixed(2)
  $('#inputTarifaICMS')[0].value = icms.toFixed(2)
  $('#inputTarifaTUSD')[0].value = tusd.toFixed(2)
  $('#inputTarifaTE')[0].value = te.toFixed(2)
  $('#inputCreditoTaxaIlum')[0].value = ilum_pub.toFixed(2)

  tarifaTusdImp = (parseFloat(tarifaData[0]["tusd"].replaceAll(",", ".")) / (1 - (parseFloat(data[0]["icms"].replaceAll(",", ".")) / 100)))
  tarifaTeImp = (parseFloat(tarifaData[0]["te"].replaceAll(",", ".")) / (1 - (parseFloat(data[0]["icms"].replaceAll(",", ".")) / 100)))
  var tarifaTotal = tarifaTusdImp + tarifaTeImp
  $('#inputTarifaTUSDImp')[0].value = tarifaTusdImp.toFixed(2)
  $('#inputTarifaTEImp')[0].value = tarifaTeImp.toFixed(2)
  $('#inputTarifaTotal')[0].value = tarifaTotal.toFixed(2)
  tipoSis = 0
  switch (data[0]["taxa"]) {
    case 'MONOFÁSICO':
      tipoSis = 30
      break
    case 'BIFÁSICO':
      tipoSis = 50
      break
    case 'TRIFÁSICO':
      tipoSis = 100
      break
  }
  $('#inputTipoSistema')[0].value = tipoSis.toFixed(2)

}
var tipoSis = 0
var tarifaTusdImp
var tarifaTeImp
var pis
var cofins
var icms
var tusd
var te
var ilum_pub
var s_imposto
// Inserir novo cliente
async function insereCliente() {
  var nome = document.getElementById(`inputClienteConfigInsert`).value
  var Telefone = document.getElementById(`inputTelefoneConfigInsert`).value
  var Telhado = document.getElementById(`inputTelhadoConfigInsert`).value
  var Estado = document.getElementById(`inputEstadoConfigInsert`).value
  var Cidade = document.getElementById(`inputCidadeConfigInsert`).value
  var Rua = document.getElementById(`inputRuaConfigInsert`).value
  var Numero = document.getElementById(`inputNumeroConfigInsert`).value
  var Bairro = document.getElementById(`inputBairroConfigInsert`).value
  var Cep = document.getElementById(`inputCepConfigInsert`).value
  var Distribuidora = document.getElementById(`inputDistribuidoraConfigInsert`).value
  var Icms = document.getElementById(`inputIcmsConfigInsert`).value
  var Pis = document.getElementById(`inputPisConfigInsert`).value
  var Cofins = document.getElementById(`inputCofinsConfigInsert`).value
  var Porcentagem = document.getElementById(`inputPorcentagemConfigInsert`).value
  var Area = document.getElementById(`inputAreaConfigInsert`).value
  var Consumo = document.getElementById(`inputConsumoConfigInsert`).value
  var Taxa = document.getElementById(`inputTaxaConfigInsert`).value
  var IlumPub = document.getElementById(`inputIlumPubConfigInsert`).value
  var UniCons = document.getElementById(`inputUniConsConfigInsert`).value
  var Bandeira = document.getElementById(`inputBandeiraConfigInsert`).value
  var query = `${nome};${Telefone};${Telhado};${Estado};${Cidade};${Rua};${Numero};${Bairro};${Cep};${Distribuidora};${Icms};${Pis};${Cofins};${Porcentagem};${Area};${Consumo};${Taxa};${IlumPub};${UniCons};${Bandeira};`
  const data = await fecthPost('/clienteInsert?name=' + query)
  if (data == 'existe') {
    alert("ERRO: CLIENTE JÁ ESTÁ CADASTRADO!")
  } else {
    //DADOS DE CLIENTES
    var dataCliente = await fecthGet("/cliente")

    dataCliente.forEach(function (item) {
      if (optionsClient.indexOf(item["cliente"]) == -1) {
        optionsClient += '<option value="' + item["cliente"] + '" />';
      }
    });
    document.getElementById("inputClienteList").innerHTML = optionsClient
    document.getElementById("inputClienteListConfigEdit").innerHTML = optionsClient
    alert("CLIENTE CADASTRADO COM SUCESSO!")
  }
}

$("input").on('keypress', function (e) {
  var chr = String.fromCharCode(e.which);
  if ("%".indexOf(chr) != -1) {
    return false;
  }
}).on('input', function (e) {
  this.value = this.value.replaceAll("%", "")
});
// Atualizar dados de cliente
async function atualizaCliente() {
  var nome = document.getElementById(`inputClienteConfigEdit`).value
  var Telefone = document.getElementById(`inputTelefoneConfigEdit`).value
  var Telhado = document.getElementById(`inputTelhadoConfigEdit`).value
  var Estado = document.getElementById(`inputEstadoConfigEdit`).value
  var Cidade = document.getElementById(`inputCidadeConfigEdit`).value
  var Rua = document.getElementById(`inputRuaConfigEdit`).value
  var Numero = document.getElementById(`inputNumeroConfigEdit`).value
  var Bairro = document.getElementById(`inputBairroConfigEdit`).value
  var Cep = document.getElementById(`inputCepConfigEdit`).value
  var Distribuidora = document.getElementById(`inputDistribuidoraConfigEdit`).value
  var Icms = document.getElementById(`inputIcmsConfigEdit`).value
  var Pis = document.getElementById(`inputPisConfigEdit`).value
  var Cofins = document.getElementById(`inputCofinsConfigEdit`).value
  var Porcentagem = document.getElementById(`inputPorcentagemConfigEdit`).value
  var Area = document.getElementById(`inputAreaConfigEdit`).value
  var Consumo = document.getElementById(`inputConsumoConfigEdit`).value
  var Taxa = document.getElementById(`inputTaxaConfigEdit`).value
  var IlumPub = document.getElementById(`inputIlumPubConfigEdit`).value
  var UniCons = document.getElementById(`inputUniConsConfigEdit`).value
  var Bandeira = document.getElementById(`inputBandeiraConfigEdit`).value
  var query = `${nome};${Telefone};${Telhado};${Estado};${Cidade};${Rua};${Numero};${Bairro};${Cep};${Distribuidora};${Icms};${Pis};${Cofins};${Porcentagem};${Area};${Consumo};${Taxa};${IlumPub};${UniCons};${Bandeira};`
  const data = await fecthPost('/clienteUpdate?name=' + query)
  if (data == 'nexiste') {
    alert("ERRO: CLIENTE NÃO ESTÁ CADASTRADO!")
  } else {
    //DADOS DE CLIENTES
    var dataCliente = await fecthGet("/cliente")
    dataCliente.forEach(function (item) {
      if (optionsClient.indexOf(item["cliente"]) == -1) {
        optionsClient += '<option value="' + item["cliente"] + '" />';
      }
    });
    alert("CLIENTE ATUALIZADO COM SUCESSO!")
  }
}
// Buscar dados de Modulos
async function buscaModulo() {
  var peca = $('#inputPecaModuloConfigEdit')[0].value
  var mldGetData = `/mdlDataPeca?name=${peca}`
  const dataMdlPeca = await fecthGet(mldGetData)
  await fillMdlData('ConfigEdit', dataMdlPeca)
}
// Buscar dados de Inversores
async function buscaInversor() {
  var peca = $('#inputPecaInversorConfigEdit')[0].value
  var invGetData = `/invDataPeca?name=${peca}`
  const dataInvPeca = await fecthGet(invGetData)
  await fillInvData('ConfigEdit', dataInvPeca)
}
var dataIrr
// Dados de Latitude e Longitude
async function getLocation() {
  var rua = document.getElementById('inputRuaDadoTec').value
  var numero = document.getElementById('inputNumeroDadoTec').value
  var bairro = document.getElementById('inputBairroDadoTec').value
  var endereco = rua + " " + numero + " " + bairro
  var address = '/lat_lon?name=' + endereco
  const data = JSON.parse(await fecthGet(address))
  // var data = await httpGet("/lat_lon")
  document.getElementById("inputLatitudeDadoTec").value = data.lat
  document.getElementById("inputLatitudeOngDadoTec").value = Math.abs(parseFloat(data.lat)) - 5
  document.getElementById("inputLatitudeIntDadoTec").value = `${Math.abs(Math.ceil(data.lat))}`
  document.getElementById("inputLongitudeDadoTec").value = data.lng
  var address = `/irradiationLat_Lon?name=${data.lat};${data.lng}`
  dataIrr = await fecthGet(address)
  await loadTableData(dataIrr, "bodyIrradiacao")
  hsp = parseFloat(dataIrr[0].annual) / 1000
  document.getElementById('inputHSPDadoTec').value = parseFloat(dataIrr[0].annual) / 1000
  document.getElementById('inputHSPCalculo').value = parseFloat(dataIrr[0].annual) / 1000
  await geracaoConsumo()
}
async function getVendedor() {
  var nome = $('#inputVendedor')[0].value
  if (nome != '') {
    var data = await fecthGet(`/vendedoresData?name=${nome}`)
    var email = data[0].email
    var telefone = data[0].telefone
    $('#inputVendedorTelefone')[0].value = email
    $('#inputVendedorEmail')[0].value = telefone
  } else {
    $('#inputVendedorTelefone')[0].value = ''
    $('#inputVendedorEmail')[0].value = ''
  }

}
// Função que chama 'onLoad'
window.onload = async function (event) {
  await onLoad()
};
var optionsVendedores = '`<option selected disabled value= "...">...</option>`'
// Ao abrir a página, carrega os clientes do banco de dados
async function onLoad() {
  //DADOS DE VENDEDORES
  var data = await fecthGet("/vendedores")
  console.log(data)
  data.forEach(function (item) {
    if (optionsVendedores.indexOf(item["nome"]) == -1) {
      optionsVendedores += `<option value= "${item["nome"]}">${item["nome"]}</option>`;
    }
  });
  document.getElementById("inputVendedor").innerHTML = optionsVendedores
  //DADOS DE CLIENTES
  var data = await fecthGet("/cliente")
  data.forEach(function (item) {
    if (optionsClient.indexOf(item["cliente"]) == -1) {
      optionsClient += '<option value="' + item["cliente"] + '" />';
    }
  });
  //DADOS DE DISTRIBUIDORAS
  var distribuidora = await fecthGet("/distribuidoraData")
  distribuidora.forEach(function (item) {
    if (optionsDistribuidora.indexOf(item["distribuidora"]) == -1) {
      optionsDistribuidora += '<option value="' + item["distribuidora"] + '" />';
    }
  });

  document.getElementById("inputDistribuidoraListConfigInsert").innerHTML = optionsDistribuidora
  document.getElementById("inputDistribuidoraListConfigEdit").innerHTML = optionsDistribuidora
  document.getElementById("inputClienteList").innerHTML = optionsClient
  document.getElementById("inputClienteListConfigEdit").innerHTML = optionsClient
  //DADOS DE MÓDULOS
  var mldGetData = '/mdlData'
  const dataMdl = await fecthGet(mldGetData)
  dataMdl.forEach(function (item) {
    if (optionsFornMdl.indexOf(item["fornecedor"]) == -1) {
      optionsFornMdl += '<option value="' + item["fornecedor"] + '" />';
    }
    if (optionsPoteMdl.indexOf(item["pmax"]) == -1) {
      optionsPoteMdl += '<option value="' + item["pmax"] + '" />';
    }
    if (optionsTipoMdl.indexOf(item["celulas"]) == -1) {
      optionsTipoMdl += '<option value="' + item["celulas"] + '" />';
    }
    if (optionsTecnMdl.indexOf(item["estilo"]) == -1) {
      optionsTecnMdl += '<option value="' + item["estilo"] + '" />';
    }
    if (optionsPecaMdl.indexOf(item["modelo"]) == -1) {
      optionsPecaMdl += '<option value="' + item["modelo"] + '" />';
    }
  });

  await fillMdl('OLD', 'FORNECEDOR')
  document.getElementById("inputPecaModuloListConfigEdit").innerHTML = optionsPecaMdl
  document.getElementById("inputFabricanteModuloListConfigInsert").innerHTML = optionsFornMdl

  //DADOS DE INVERSORES

  var mldGetData = '/invData'
  const dataInv = await fecthGet(mldGetData)
  dataInv.forEach(function (item) {
    if (optionsFornInv.indexOf(item["fornecedor"]) == -1) {
      optionsFornInv += '<option value="' + item["fornecedor"] + '" />';
    }
    if (optionsFaseInv.indexOf(item["conexaoca"]) == -1) {
      optionsFaseInv += '<option value="' + item["conexaoca"] + '" />';
    }
    if (optionsStriInv.indexOf(item["mppt"]) == -1) {
      optionsStriInv += '<option value="' + item["mppt"] + '" />';
    }
    if (optionsInveInv.indexOf(item["tipo"]) == -1) {
      optionsInveInv += '<option value="' + item["tipo"] + '" />';
    }
    if (optionsPoteInv.indexOf(item["potnomi"]) == -1) {
      optionsPoteInv += '<option value="' + item["potnomi"] + '" />';
    }
    if (optionsPecaInv.indexOf(item["modelo"]) == -1) {
      optionsPecaInv += '<option value="' + item["modelo"] + '" />';
    }
  });
  await fillInv('OLD', 'FORNECEDOR')
  document.getElementById("inputPecaInversorListConfigEdit").innerHTML = optionsPecaInv
  document.getElementById("inputFabricanteInversorListConfigInsert").innerHTML = optionsFornInv
  document.getElementById('dadosModulo').style.display = 'none'
  document.getElementById('dadosInversor').style.display = 'none'

  //DADOS DE GREENER E MÃO DE OBRA
  var greenerQuery = '/greener'
  const greenerDados = await fecthGet(greenerQuery)
  for (let i = 0; i < greenerDados.length; i++) {
    greenerData[greenerDados[i]['name']] = await valNum(greenerDados[i]['value'])
  }
  await fillGreener()
}

//#region MÓDULOS
// PREENCHER AS DATALISTS DA PARTE DE MÓDULO
async function fillMdl(wish, option) {
  if (wish == 'OLD') {
    if (option == 'FORNECEDOR') {
      document.getElementById("inputFabricanteModuloList").innerHTML = optionsFornMdl
      document.getElementById("inputPotenciaModuloList").innerHTML = ''
      document.getElementById("inputTipo_CelModuloList").innerHTML = ''
      document.getElementById("inputTecnologiaModuloList").innerHTML = ''
      document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdl
    } else if (option == 'POTENCIA') {
      document.getElementById("inputTipo_CelModuloList").innerHTML = optionsTipoMdl
      document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdl
      document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdl
    } else if (option == 'TIPO') {
      document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdl
      document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdl
    } else if (option == 'TECNOLOGIA') {
      document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdl
    } else if (option == 'PECA') {
      document.getElementById("inputFabricanteModuloList").innerHTML = optionsFornMdl
      document.getElementById("inputPotenciaModuloList").innerHTML = optionsPoteMdl
      document.getElementById("inputTipo_CelModuloList").innerHTML = optionsTipoMdl
      document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdl
      document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdl
    }
  } else {
    if (option == 'FORNECEDOR') {
      document.getElementById("inputFabricanteModuloList").innerHTML = optionsFornMdlNew
      document.getElementById("inputPotenciaModuloList").innerHTML = optionsPoteMdlNew
      document.getElementById("inputTipo_CelModuloList").innerHTML = optionsTipoMdlNew
      document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdlNew
      document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdlNew
    } else if (option == 'POTENCIA') {
      document.getElementById("inputPotenciaModuloList").innerHTML = optionsPoteMdlNew
      document.getElementById("inputTipo_CelModuloList").innerHTML = optionsTipoMdlNew
      document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdlNew
      document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdlNew
    } else if (option == 'TIPO') {
      document.getElementById("inputTipo_CelModuloList").innerHTML = optionsTipoMdlNew
      document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdlNew
      document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdlNew
    } else if (option == 'TECNOLOGIA') {
      document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdlNew
      document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdlNew
    } else if (option == 'PECA') {
      document.getElementById("inputFabricanteModuloList").innerHTML = optionsFornMdlNew
      document.getElementById("inputPotenciaModuloList").innerHTML = optionsPoteMdlNew
      document.getElementById("inputTipo_CelModuloList").innerHTML = optionsTipoMdlNew
      document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdlNew
      document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdlNew
    }
  }
}
// MOSTRAR TODOS OS INPUTS DE MÓDULO
async function showModulo() {
  var display = document.getElementById('dadosModulo').style.display
  var icon = document.getElementById('iconMdl')
  if (display == 'none') {
    document.getElementById('dadosModulo').style.display = ''
    icon.classList.toggle('fa-eye-slash')
  } else {
    document.getElementById('dadosModulo').style.display = 'none'
    $('#showModulo').find('i').toggleClass('fa-eye fa-eye-slash');
    icon.classList.toggle('fa-eye')
  }
}
// PREENCHER OS INPUTS DE MÓDULO
async function fillMdlData(option, dataMdlPeca) {
  if (option == 'FILL') {
    $('#inputVmpModulo')[0].value = dataMdlPeca[0].vmp
    $('#inputImpModulo')[0].value = dataMdlPeca[0].imp
    $('#inputVocModulo')[0].value = dataMdlPeca[0].voc
    $('#inputIscModulo')[0].value = dataMdlPeca[0].isc
    $('#inputEficienciaModulo')[0].value = dataMdlPeca[0].eficiencia
    $('#inputTPmaxModulo')[0].value = dataMdlPeca[0].tpmax
    $('#inputTVocModulo')[0].value = dataMdlPeca[0].tvoc
    $('#inputTIscModulo')[0].value = dataMdlPeca[0].tisc
    $('#inputAreaOcupadaModulo')[0].value = dataMdlPeca[0].area
    $('#inputPesoModulo')[0].value = dataMdlPeca[0].peso
    $('#inputEspessuraModulo')[0].value = dataMdlPeca[0].espessura
    $('#inputLarguraModulo')[0].value = dataMdlPeca[0].largura
    $('#inputAlturaModulo')[0].value = dataMdlPeca[0].altura
    vmp = await valNum(dataMdlPeca[0].vmp)
    pmax = await valNum(dataMdlPeca[0].pmax)
    voc = await valNum(dataMdlPeca[0].voc)
    isc = await valNum(dataMdlPeca[0].isc)
    tpmax = await valNum(dataMdlPeca[0].tpmax)
    tvoc = await valNum(dataMdlPeca[0].tvoc)
    tisc = await valNum(dataMdlPeca[0].tisc)
    imp = await valNum(dataMdlPeca[0].imp)
    fornecedorMdl = dataMdlPeca[0].fornecedor
    $('#inputFabriMdlOrca')[0].value = fornecedorMdl
    await checkTemp()
  } else if (option == 'CLEAR') {
    $('#inputVmpModulo')[0].value = ''
    $('#inputImpModulo')[0].value = ''
    $('#inputVocModulo')[0].value = ''
    $('#inputIscModulo')[0].value = ''
    $('#inputEficienciaModulo')[0].value = ''
    $('#inputTPmaxModulo')[0].value = ''
    $('#inputTVocModulo')[0].value = ''
    $('#inputTIscModulo')[0].value = ''
    $('#inputAreaOcupadaModulo')[0].value = ''
    $('#inputPesoModulo')[0].value = ''
    $('#inputEspessuraModulo')[0].value = ''
    $('#inputLarguraModulo')[0].value = ''
    $('#inputAlturaModulo')[0].value = ''
  } if (option == 'ConfigEdit') {
    $('#inputFabricanteModuloConfigEdit')[0].value = dataMdlPeca[0].fornecedor
    $('#inputPotenciaModuloConfigEdit')[0].value = dataMdlPeca[0].pmax
    $('#inputTipo_CelModuloConfigEdit')[0].value = dataMdlPeca[0].celulas
    $('#inputTecnologiaModuloConfigEdit')[0].value = dataMdlPeca[0].estilo
    $('#inputVmpModuloConfigEdit')[0].value = dataMdlPeca[0].vmp
    $('#inputImpModuloConfigEdit')[0].value = dataMdlPeca[0].imp
    $('#inputVocModuloConfigEdit')[0].value = dataMdlPeca[0].voc
    $('#inputIscModuloConfigEdit')[0].value = dataMdlPeca[0].isc
    $('#inputEficienciaModuloConfigEdit')[0].value = dataMdlPeca[0].eficiencia
    $('#inputTPmaxModuloConfigEdit')[0].value = dataMdlPeca[0].tpmax
    $('#inputTVocModuloConfigEdit')[0].value = dataMdlPeca[0].tvoc
    $('#inputTIscModuloConfigEdit')[0].value = dataMdlPeca[0].tisc
    $('#inputAreaOcupadaModuloConfigEdit')[0].value = dataMdlPeca[0].area
    $('#inputPesoModuloConfigEdit')[0].value = dataMdlPeca[0].peso
    $('#inputEspessuraModuloConfigEdit')[0].value = dataMdlPeca[0].espessura
    $('#inputLarguraModuloConfigEdit')[0].value = dataMdlPeca[0].largura
    $('#inputAlturaModuloConfigEdit')[0].value = dataMdlPeca[0].altura
  }
  await qtdeMdl()
  await protDimenCabos()
  await energiaInversor()
}
// CHECAR SE A TEMPERATURA ESTÁ PREENCHIDA E PREENCHER O RESTANTE DE FATORE DE CORREÇÃO
var tpmax
var tvoc
var tisc
var pmax
var voc
var isc
var pmaxCorr
var vocCorr
var iscCorr
var imp
var vmp
var fornecedorMdl
async function checkTemp() {
  if (element20.value != '') {
    tempMedia = element20.value
  } else {
    tempMedia = 0
  }
  element21.value = (tempMedia * tpmax * 100).toFixed(2)
  element22.value = (tempMedia * tvoc * 100).toFixed(2)
  element23.value = (tempMedia * tisc * 100).toFixed(2)
  itemsCorrecao['inputTPmaxPerModulo'] = tempMedia * tpmax * 100
  itemsCorrecao['inputTVocPerModulo'] = tempMedia * tvoc * 100
  itemsCorrecao['inputTIscPerModulo'] = tempMedia * tisc * 100
  somaCorrecao = sumValues(itemsCorrecao)
  fatConsumo = (parseFloat(1 + (somaCorrecao / 100)) * 100).toFixed(2)
  pmaxCorr = pmax * (1 + (tpmax * tempMedia))
  vocCorr = voc * (1 + (tvoc * tempMedia))
  iscCorr = isc * (1 + (tisc * tempMedia))

  element31.value = pmaxCorr.toFixed(3)
  element32.value = vocCorr.toFixed(3)
  element33.value = iscCorr.toFixed(3)

  await qtdeMdl()
}
//#endregion

//#region INVERSORES
// PREENCHER AS DATALISTS DA PARTE DE INVERSOR
async function fillInv(wish, option) {
  if (wish == 'OLD') {
    if (option == 'FORNECEDOR') {
      document.getElementById("inputFabricanteInversorList").innerHTML = optionsFornInv
      document.getElementById("inputFasesInversorList").innerHTML = ''
      document.getElementById("inputStringsInversorList").innerHTML = ''
      document.getElementById("inputTipoInversorList").innerHTML = ''
      document.getElementById("inputPotenciaInversorList").innerHTML = ''
      document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInv
    } else if (option == 'FASE') {
      document.getElementById("inputStringsInversorList").innerHTML = optionsStriInv
      document.getElementById("inputTipoInversorList").innerHTML = optionsInveInv
      document.getElementById("inputPotenciaInversorList").innerHTML = optionsPoteInv
      document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInv
    } else if (option == 'STRING') {
      document.getElementById("inputTipoInversorList").innerHTML = optionsInveInv
      document.getElementById("inputPotenciaInversorList").innerHTML = optionsPoteInv
      document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInv
    } else if (option == 'TIPO') {
      document.getElementById("inputPotenciaInversorList").innerHTML = optionsPoteInv
      document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInv
    } else if (option == 'POTENCIA') {
      document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInv
    }
  } else {
    if (option == 'FORNECEDOR') {
      document.getElementById("inputFabricanteInversorList").innerHTML = optionsFornInvNew
      document.getElementById("inputFasesInversorList").innerHTML = optionsFaseInvNew
      document.getElementById("inputStringsInversorList").innerHTML = optionsStriInvNew
      document.getElementById("inputTipoInversorList").innerHTML = optionsInveInvNew
      document.getElementById("inputPotenciaInversorList").innerHTML = optionsPoteInvNew
      document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInvNew
    } else if (option == 'FASES') {
      document.getElementById("inputStringsInversorList").innerHTML = optionsStriInvNew
      document.getElementById("inputTipoInversorList").innerHTML = optionsInveInvNew
      document.getElementById("inputPotenciaInversorList").innerHTML = optionsPoteInvNew
      document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInvNew
    } else if (option == 'STRING') {
      document.getElementById("inputTipoInversorList").innerHTML = optionsInveInvNew
      document.getElementById("inputPotenciaInversorList").innerHTML = optionsPoteInvNew
      document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInvNew
    } else if (option == 'TIPO') {
      document.getElementById("inputPotenciaInversorList").innerHTML = optionsPoteInvNew
      document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInvNew
    } else if (option == 'POTENCIA') {
      document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInvNew
    }
  }
}
// MOSTRAR TODOS OS INPUTS DE INVERSOR
async function showInversor() {
  var display = document.getElementById('dadosInversor').style.display
  var icon = document.getElementById('iconInv')
  if (display == 'none') {
    document.getElementById('dadosInversor').style.display = ''
    icon.classList.toggle('fa-eye-slash')
  } else {
    document.getElementById('dadosInversor').style.display = 'none'
    $('#showInversor').find('i').toggleClass('fa-eye fa-eye-slash');
    icon.classList.toggle('fa-eye')
  }
}
var eficienciaInv
var tensaoCCinversor
var maxTensaoCCinversor
var maxCorrenteCCinversor
var maxCorrenteCAinvesor
// PREENCHER OS INPUTS DE INVERSOR
async function fillInvData(option, dataInvPeca) {
  if (option == 'FILL') {
    $('#inputFaixaMPPTInversor')[0].value = dataInvPeca[0].faixamppt
    $('#inputTensaoCCInversor')[0].value = dataInvPeca[0].tenspart
    $('#inputMaxTensaoCCInversor')[0].value = dataInvPeca[0].maxtens
    $('#inputEficienciaInversor')[0].value = dataInvPeca[0].eficiencia
    $('#inputFaixaTensaoInversor')[0].value = dataInvPeca[0].faixatens
    $('#inputCorrenteMaxCCInversor')[0].value = dataInvPeca[0].entradaimp
    $('#inputCorrenteMaxCAInversor')[0].value = dataInvPeca[0].correntesaída
    tensaoCCinversor = await valNum(dataInvPeca[0].tenspart)
    eficienciaInv = await valNum(dataInvPeca[0].eficiencia)
    maxTensaoCCinversor = await valNum(dataInvPeca[0].maxtens)
    maxCorrenteCCinversor = await valNum(dataInvPeca[0].entradaimp)
    maxCorrenteCAinvesor = await valNum(dataInvPeca[0].correntesaída)
    fornecedorInv = dataInvPeca[0].fornecedor
    $('#inputFabriInvOrca')[0].value = fornecedorInv
  } else if (option == 'CLEAR') {
    $('#inputFaixaMPPTInversor')[0].value = ''
    $('#inputTensaoCCInversor')[0].value = ''
    $('#inputMaxTensaoCCInversor')[0].value = ''
    $('#inputEficienciaInversor')[0].value = ''
    $('#inputFaixaTensaoInversor')[0].value = ''
    $('#inputCorrenteMaxCCInversor')[0].value = ''
    $('#inputCorrenteMaxCAInversor')[0].value = ''

  } else if (option == 'ConfigEdit') {
    $('#inputFabricanteInversorConfigEdit')[0].value = dataInvPeca[0].fornecedor
    $('#inputFasesInversorConfigEdit')[0].value = dataInvPeca[0].mppt
    $('#inputStringsInversorConfigEdit')[0].value = dataInvPeca[0].conexaoca
    $('#inputTipoInversorConfigEdit')[0].value = dataInvPeca[0].tipo
    $('#inputPotenciaInversorConfigEdit')[0].value = dataInvPeca[0].potnomi
    $('#inputFaixaMPPTInversorConfigEdit')[0].value = dataInvPeca[0].faixamppt
    $('#inputTensaoCCInversorConfigEdit')[0].value = dataInvPeca[0].tenspart
    $('#inputMaxTensaoCCInversorConfigEdit')[0].value = dataInvPeca[0].maxtens
    $('#inputEficienciaInversorConfigEdit')[0].value = dataInvPeca[0].eficiencia
    $('#inputFaixaTensaoInversorConfigEdit')[0].value = dataInvPeca[0].faixatens
    $('#inputCorrenteMaxCCInversorConfigEdit')[0].value = dataInvPeca[0].entradaimp
    $('#inputCorrenteMaxCAInversorConfigEdit')[0].value = dataInvPeca[0].correntesaída
  }

  await qtdeMdl()
  await protDimenCabos()
  await energiaInversor()

}
//#endregion

//#region MÉTODOS
async function fecthGet(url) {
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=UTF-8;",
    }
  });

  // Handle any errors please

  const data = await resp.json();
  return data
}

async function fecthPost(url) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=UTF-8;",
    }
  });


  const data = await resp.json();
  return data
}

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  // xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xmlHttp.send(null);
  return xmlHttp.response;
}

async function httpPost(theUrl, sendData) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", theUrl, true); // false for synchronous request
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xmlHttp.send(JSON.stringify(sendData));
  return xmlHttp.response;
}
//#endregion

//#region MÓDULOS - FILTRO
let element1 = document.getElementById("inputFabricanteModulo")
let element2 = document.getElementById("inputPotenciaModulo")
let element3 = document.getElementById("inputTipo_CelModulo")
let element4 = document.getElementById("inputTecnologiaModulo")
let element5 = document.getElementById("inputPecaModulo")

element1.addEventListener('change', async function () {
  if (element1.value == '') {
    element2.value = ''
    element3.value = ''
    element4.value = ''
    element5.value = ''
    await fillMdlData('CLEAR', '')
    await fillMdl('OLD', 'FORNECEDOR')
  } else {
    optionsFornMdlNew = ''
    optionsPoteMdlNew = ''
    optionsTipoMdlNew = ''
    optionsTecnMdlNew = ''
    optionsPecaMdlNew = ''
    var mldGetData = '/mdlDataForn?name=' + element1.value
    const dataMdlForn = await fecthGet(mldGetData)
    dataMdlForn.forEach(function (item) {
      if (optionsPoteMdlNew.indexOf(item["pmax"]) == -1) {
        optionsPoteMdlNew += '<option value="' + item["pmax"] + '" />';
      }
      if (optionsTipoMdlNew.indexOf(item["celulas"]) == -1) {
        optionsTipoMdlNew += '<option value="' + item["celulas"] + '" />';
      }
      if (optionsTecnMdlNew.indexOf(item["estilo"]) == -1) {
        optionsTecnMdlNew += '<option value="' + item["estilo"] + '" />';
      }
      if (optionsPecaMdlNew.indexOf(item["modelo"]) == -1) {
        optionsPecaMdlNew += '<option value="' + item["modelo"] + '" />';
      }
    });
    if (dataMdlForn.length == 1) {
      element2.value = dataMdlForn[0].pmax
      element3.value = dataMdlForn[0].celulas
      element4.value = dataMdlForn[0].estilo
      element5.value = dataMdlForn[0].modelo
      await fillMdlData('FILL', dataMdlForn)
    }
    await fillMdl('NEW', 'FORNECEDOR')
  }
})
element2.addEventListener('change', async function () {
  optionsTipoMdlNew = ''
  optionsTecnMdlNew = ''
  optionsPecaMdlNew = ''
  if (element1.value != '' && element2.value != '') {
    var mldGetData = `/mdlDataPote?name=${element1.value};${element2.value}`
    const dataMdlPote = await fecthGet(mldGetData)
    dataMdlPote.forEach(function (item) {
      if (optionsTipoMdlNew.indexOf(item["celulas"]) == -1) {
        optionsTipoMdlNew += '<option value="' + item["celulas"] + '" />';
      }
      if (optionsTecnMdlNew.indexOf(item["estilo"]) == -1) {
        optionsTecnMdlNew += '<option value="' + item["estilo"] + '" />';
      }
      if (optionsPecaMdlNew.indexOf(item["modelo"]) == -1) {
        optionsPecaMdlNew += '<option value="' + item["modelo"] + '" />';
      }
    });

    if (dataMdlPote.length == 1) {
      element3.value = dataMdlPote[0].celulas
      element4.value = dataMdlPote[0].estilo
      element5.value = dataMdlPote[0].modelo
      await fillMdlData('FILL', dataMdlPote)
    }
    await fillMdl('NEW', 'POTENCIA')
  } else if (element2.value == '') {
    element3.value = ''
    element4.value = ''
    element5.value = ''
    await fillMdlData('CLEAR', '')
    await fillMdl('OLD', 'POTENCIA')
  }
})
element3.addEventListener('change', async function () {
  optionsTecnMdlNew = ''
  optionsPecaMdlNew = ''
  if (element1.value != '' && element2.value != '' && element3.value != '') {
    var mldGetData = `/mdlDataTipo?name=${element1.value};${element2.value};${element3.value}`
    const dataMdlTipo = await fecthGet(mldGetData)
    dataMdlTipo.forEach(function (item) {
      if (optionsTecnMdlNew.indexOf(item["estilo"]) == -1) {
        optionsTecnMdlNew += '<option value="' + item["estilo"] + '" />';
      }
      if (optionsPecaMdlNew.indexOf(item["modelo"]) == -1) {
        optionsPecaMdlNew += '<option value="' + item["modelo"] + '" />';
      }
    });

    if (dataMdlTipo.length == 1) {
      element4.value = dataMdlTipo[0].estilo
      element5.value = dataMdlTipo[0].modelo
      await fillMdlData('FILL', dataMdlTipo)
    }
    await fillMdl('NEW', 'TIPO')
  } else if (element3.value == '') {
    element4.value = ''
    element5.value = ''
    await fillMdlData('CLEAR', '')
    await fillMdl('OLD', 'TIPO')
  }
})
element4.addEventListener('change', async function () {
  optionsPecaMdlNew = ''
  if (element1.value != '' && element2.value != '' && element3.value != '' && element4.value != '') {
    var mldGetData = `/mdlDataTecn?name=${element1.value};${element2.value};${element3.value};${element4.value}`
    const dataMdlTecn = await fecthGet(mldGetData)
    dataMdlTecn.forEach(function (item) {
      if (optionsPecaMdlNew.indexOf(item["modelo"]) == -1) {
        optionsPecaMdlNew += '<option value="' + item["modelo"] + '" />';
      }
    });
    if (dataMdlTecn.length == 1) {
      element5.value = dataMdlTecn[0].modelo
      await fillMdlData('FILL', dataMdlTecn)
    }
    await fillMdl('NEW', 'TECNOLOGIA')
  } else if (element4.value == '') {
    element5.value = ''
    await fillMdlData('CLEAR', '')
    await fillMdl('OLD', 'TECNOLOGIA')
  }
})
element5.addEventListener('change', async function () {
  if (element5.value == '') {
    await fillMdlData('CLEAR', '')
  } else {
    var mldGetData = `/mdlDataPeca?name=${element5.value}`
    const dataMdlPeca = await fecthGet(mldGetData)

    element1.value = dataMdlPeca[0].fornecedor
    element2.value = dataMdlPeca[0].pmax
    element3.value = dataMdlPeca[0].celulas
    element4.value = dataMdlPeca[0].estilo
    await fillMdlData('FILL', dataMdlPeca)
  }
})
//#endregion

//#region INVERSORES - FILTRO
let element6 = document.getElementById("inputFabricanteInversor")
let element7 = document.getElementById("inputFasesInversor")
let element8 = document.getElementById("inputStringsInversor")
let element9 = document.getElementById("inputTipoInversor")
let element10 = document.getElementById("inputPotenciaInversor")
let element11 = document.getElementById("inputPecaInversor")

element6.addEventListener('change', async function () {
  if (element6.value == '') {
    element7.value = ''
    element8.value = ''
    element9.value = ''
    element10.value = ''
    element11.value = ''
    await fillInvData('CLEAR', '')
    await fillInv('OLD', 'FORNECEDOR')
  } else {
    optionsFornInvNew = ''
    optionsFaseInvNew = ''
    optionsStriInvNew = ''
    optionsInveInvNew = ''
    optionsPoteInvNew = ''
    optionsPecaInvNew = ''
    var mldGetData = '/invDataForn?name=' + element6.value
    const dataInvForn = await fecthGet(mldGetData)
    dataInvForn.forEach(function (item) {
      if (optionsFaseInvNew.indexOf(item["conexaoca"]) == -1) {
        optionsFaseInvNew += '<option value="' + item["conexaoca"] + '" />';
      }
      if (optionsStriInvNew.indexOf(item["mppt"]) == -1) {
        optionsStriInvNew += '<option value="' + item["mppt"] + '" />';
      }
      if (optionsInveInvNew.indexOf(item["tipo"]) == -1) {
        optionsInveInvNew += '<option value="' + item["tipo"] + '" />';
      }
      if (optionsPoteInvNew.indexOf(item["potnomi"]) == -1) {
        optionsPoteInvNew += '<option value="' + item["potnomi"] + '" />';
      }
      if (optionsPecaInvNew.indexOf(item["modelo"]) == -1) {
        optionsPecaInvNew += '<option value="' + item["modelo"] + '" />';
      }
    });
    if (dataInvForn.length == 1) {
      element7.value = dataInvForn[0].conexaoca
      element8.value = dataInvForn[0].mppt
      element9.value = dataInvForn[0].tipo
      element10.value = dataInvForn[0].potnomi
      element11.value = dataInvForn[0].modelo
      await fillInvData('FILL', dataInvForn)
    }
    await fillInv('NEW', 'FORNECEDOR')
  }
})
element7.addEventListener('change', async function () {
  if (element6.value != '' && element7.value != '') {
    optionsStriInvNew = ''
    optionsInveInvNew = ''
    optionsPoteInvNew = ''
    optionsPecaInvNew = ''
    var mldGetData = `/invDataFases?name=${element6.value};${element7.value}`
    const dataInvFase = await fecthGet(mldGetData)
    dataInvFase.forEach(function (item) {
      if (optionsStriInvNew.indexOf(item["mppt"]) == -1) {
        optionsStriInvNew += '<option value="' + item["mppt"] + '" />';
      }
      if (optionsInveInvNew.indexOf(item["tipo"]) == -1) {
        optionsInveInvNew += '<option value="' + item["tipo"] + '" />';
      }
      if (optionsPoteInvNew.indexOf(item["potnomi"]) == -1) {
        optionsPoteInvNew += '<option value="' + item["potnomi"] + '" />';
      }
      if (optionsPecaInvNew.indexOf(item["modelo"]) == -1) {
        optionsPecaInvNew += '<option value="' + item["modelo"] + '" />';
      }
    });
    console.log(dataInvFase)
    if (dataInvFase.length == 1) {
      element8.value = dataInvFase[0].mppt
      element9.value = dataInvFase[0].tipo
      element10.value = dataInvFase[0].potnomi
      element11.value = dataInvFase[0].modelo
      await fillInvData('FILL', dataInvFase)
    }
    await fillInv('NEW', 'FASES')
  } else if (element7.value == '') {
    element8.value = ''
    element9.value = ''
    element10.value = ''
    element11.value = ''
    await fillInvData('CLEAR', '')
    await fillInv('OLD', 'FASES')
  }
})
element8.addEventListener('change', async function () {
  if (element6.value != '' && element7.value != '' && element8.value != '') {
    optionsInveInvNew = ''
    optionsPoteInvNew = ''
    optionsPecaInvNew = ''
    var mldGetData = `/invDataStrings?name=${element6.value};${element7.value};${element8.value}`
    const dataInvStri = await fecthGet(mldGetData)
    dataInvStri.forEach(function (item) {
      if (optionsInveInvNew.indexOf(item["tipo"]) == -1) {
        optionsInveInvNew += '<option value="' + item["tipo"] + '" />';
      }
      if (optionsPoteInvNew.indexOf(item["potnomi"]) == -1) {
        optionsPoteInvNew += '<option value="' + item["potnomi"] + '" />';
      }
      if (optionsPecaInvNew.indexOf(item["modelo"]) == -1) {
        optionsPecaInvNew += '<option value="' + item["modelo"] + '" />';
      }
    });
    if (dataInvStri.length == 1) {
      element9.value = dataInvStri[0].tipo
      element10.value = dataInvStri[0].potnomi
      element11.value = dataInvStri[0].modelo
      await fillInvData('FILL', dataInvStri)
    }
    await fillInv('NEW', 'STRING')
  } else if (element7.value == '') {
    element9.value = ''
    element10.value = ''
    element11.value = ''
    await fillInvData('CLEAR', '')
    await fillInv('OLD', 'STRING')
  }
})
element9.addEventListener('change', async function () {
  if (element6.value != '' && element7.value != '' && element8.value != '' && element9.value != '') {
    optionsPoteInvNew = ''
    optionsPecaInvNew = ''
    var mldGetData = `/invDataTipo?name=${element6.value};${element7.value};${element8.value};${element9.value}`
    const dataInvTipo = await fecthGet(mldGetData)
    dataInvTipo.forEach(function (item) {
      if (optionsPoteInvNew.indexOf(item["potnomi"]) == -1) {
        optionsPoteInvNew += '<option value="' + item["potnomi"] + '" />';
      }
      if (optionsPecaInvNew.indexOf(item["modelo"]) == -1) {
        optionsPecaInvNew += '<option value="' + item["modelo"] + '" />';
      }
    });
    if (dataInvTipo.length == 1) {
      element10.value = dataInvTipo[0].potnomi
      element11.value = dataInvTipo[0].modelo
      await fillInvData('FILL', dataInvTipo)
    }
    await fillInv('NEW', 'TIPO')
  } else if (element7.value == '') {
    element10.value = ''
    element11.value = ''
    await fillInvData('CLEAR', '')
    await fillInv('OLD', 'TIPO')
  }
})
element10.addEventListener('change', async function () {
  if (element6.value != '' && element7.value != '' && element8.value != '' && element9.value != '' && element10.value != '') {
    optionsPecaInvNew = ''
    var mldGetData = `/invDataPote?name=${element6.value};${element7.value};${element8.value};${element9.value};${element10.value}`
    const dataInvPote = await fecthGet(mldGetData)
    dataInvPote.forEach(function (item) {
      if (optionsPecaInvNew.indexOf(item["modelo"]) == -1) {
        optionsPecaInvNew += '<option value="' + item["modelo"] + '" />';
      }
    });
    if (dataInvPote.length == 1) {
      element11.value = dataInvPote[0].modelo
      await fillInvData('FILL', dataInvPote)
    }
    await fillInv('NEW', 'POTENCIA')
  } else if (element7.value == '') {
    element11.value = ''
    await fillInvData('CLEAR', '')
    await fillInv('OLD', 'POTENCIA')
  }
})
element11.addEventListener('change', async function () {
  if (element11.value == '') {
    await fillInvData('CLEAR', '')
  } else {
    var invGetData = `/invDataPeca?name=${element11.value}`
    const dataInvPeca = await fecthGet(invGetData)

    element6.value = dataInvPeca[0].fornecedor
    element7.value = dataInvPeca[0].conexaoca
    element8.value = dataInvPeca[0].mppt
    element9.value = dataInvPeca[0].tipo
    element10.value = dataInvPeca[0].potnomi
    await fillInvData('FILL', dataInvPeca)
  }
})
//#endregion

var items = document.getElementsByName('tabNew');

for (var i = 0; i < items.length; i++) {
  items[i].addEventListener('click', activeClass(items));
}

let element34 = document.getElementById('inputQuantMdlCalculo')
let element35 = document.getElementById('inputQuantMdlMinSerieCalculo')
let element36 = document.getElementById('inputQuantMdlMaxSerieCalculo')
let element37 = document.getElementById('inputQuantMdlMaxParaleloCalculo')
let element38 = document.getElementById('inputVmpModulo')
let element39 = document.getElementById('inputTensaoCCInversor')
let element40 = document.getElementById('inputMaxTensaoCCInversor')
let element41 = document.getElementById('inputCorrenteMaxCCInversor')
var qtdMaxParal
var qtdeMdlCalc
var potTotalOrca
async function qtdeMdl() {
  element34.value = await ceilLat(potPicoReal * 1000 / pmaxCorr, 1)
  element35.value = await ceilLat(tensaoCCinversor / vmp, 1)
  element36.value = parseInt(Math.floor(maxTensaoCCinversor / vmp))
  element37.value = await ceilLat(maxCorrenteCCinversor / iscCorr, 1)
  qtdMaxParal = await ceilLat(maxCorrenteCCinversor / iscCorr, 1)
  qtdeMdlCalc = await ceilLat(potPicoReal * 1000 / pmaxCorr, 1)
  element51.value = await ceilLat(potPicoReal * 1000 / pmaxCorr, 1)
  element53.value = await ceilLat(potPicoReal * 1000 / pmaxCorr, 1)
  $('#inputNumMdlOrca')[0].value = qtdeMdlCalc
  potTotalOrca = qtdeMdlCalc * pmax / 1000
  moTerceira = qtdeMdlCalc * await valNum(greenerData['MO'])
  $('#inputPotTotalOrca')[0].value = potTotalOrca.toFixed(2)
  $('#inputMaoObraOrca')[0].value = brlBrazil.format(moTerceira)
  await getProjetoHomo()
  await updateLucro()
}
let element42 = document.getElementById('inputCorrenteDisjCACalculo')
let element43 = document.getElementById('inputDisjEscolhaCACalculo')
let element44 = document.getElementById('inpuCaboEscolhaCACalculo')
let element45 = document.getElementById('inputCorrenteMaxCAInversor')
let element46 = document.getElementById('inputImpModulo')
let element47 = document.getElementById('inputCorrenteNomiCCCalculo')
let element48 = document.getElementById('inputCaboEscolhaCCCalculo')
let element49 = document.getElementById('inpuFusivelCCCalculo')
var corrNomi
async function protDimenCabos() {
  element42.value = Math.floor(maxCorrenteCAinvesor * 1.2).toFixed(2)
  var corrDisj = await valNum(element42.value)
  console.log(corrDisj, corrDisj >= 125, corrDisj < 150, corrDisj >= 125 && corrDisj < 150)
  switch (true) {
    case (corrDisj < 10):
      element43.value = 10
      break
    case (corrDisj >= 10 && corrDisj < 16):
      element43.value = 16
      break
    case (corrDisj >= 16 && corrDisj < 20):
      element43.value = 20
      break
    case (corrDisj >= 20 && corrDisj < 25):
      element43.value = 25
      break
    case (corrDisj >= 25 && corrDisj < 32):
      element43.value = 32
      break
    case (corrDisj >= 32 && corrDisj < 40):
      element43.value = 40
      break
    case (corrDisj >= 40 && corrDisj < 50):
      element43.value = 50
      break
    case (corrDisj >= 50 && corrDisj < 63):
      element43.value = 63
      break
    case (corrDisj >= 63 && corrDisj < 80):
      element43.value = 80
      break
    case (corrDisj >= 80 && corrDisj < 90):
      element43.value = 90
      break
    case (corrDisj >= 90 && corrDisj < 100):
      element43.value = 100
      break
    case (corrDisj >= 100 && corrDisj < 125):
      element43.value = 125
      break
    case (corrDisj >= 125 && corrDisj < 150):
      console.log("é pra ir")
      element43.value = 150
      break
    case (corrDisj >= 150 && corrDisj < 160):
      element43.value = 160
      break
  }
  switch (true) {
    case (corrDisj < 24):
      element44.value = 2.5
      break
    case (corrDisj >= 24 && corrDisj < 28):
      element44.value = 4
      break
    case (corrDisj >= 28 && corrDisj < 36):
      element44.value = 6
      break
    case (corrDisj >= 36 && corrDisj < 50):
      element44.value = 10
      break
    case (corrDisj >= 50 && corrDisj < 68):
      element44.value = 16
      break
    case (corrDisj >= 68 && corrDisj < 89):
      element44.value = 25
      break
    case (corrDisj >= 89 && corrDisj < 110):
      element44.value = 35
      break
    case (corrDisj >= 110 && corrDisj < 134):
      element44.value = 50
      break
    case (corrDisj >= 134 && corrDisj < 171):
      element44.value = 70
      break
    case (corrDisj >= 171 && corrDisj < 207):
      element44.value = 95
      break
  }
  element47.value = (qtdMaxParal * imp).toFixed(2)
  corrNomi = qtdMaxParal * imp
  switch (true) {
    case (corrNomi < 35):
      element48.value = 4
      break
    case (corrNomi >= 35 && corrNomi < 44):
      element48.value = 6
      break
    case (corrNomi >= 44 && corrNomi < 61):
      element48.value = 10
      break
    case (corrNomi >= 61 && corrNomi < 79):
      element48.value = 16
      break
  }
  element49.value = (maxCorrenteCCinversor * 0.9).toFixed(2)
}
async function energiaInversor() {
  switch (element16.value) {
    case 'NORTE':
      porcentagemHSP = 1
      break
    case 'NOROESTE':
      porcentagemHSP = 0.92
      break
    case 'NORDESTE':
      porcentagemHSP = 0.92
      break
    case 'LESTE':
      porcentagemHSP = 0.80
      break
    case 'OESTE':
      porcentagemHSP = 0.80
      break
    case 'SUDESTE':
      porcentagemHSP = 0.85
      break
    case 'SUL':
      porcentagemHSP = 0.3
      break
    case 'SUDOESTE':
      porcentagemHSP = 0.85
      break
  }
  if (element17_3.value != '') {
    sujeira = await valNum(element17_3.value) / 100
  }
  console.log(hsp, sujeira, fatorKVal)
  element17.value = parseFloat(porcentagemHSP * hsp).toFixed(2)
  element17_1.value = parseFloat(porcentagemHSP * hsp).toFixed(2)
  element17_2.value = parseFloat(porcentagemHSP * hsp * (1 + sujeira)).toFixed(2)
  console.log(porcentagemHSP, hsp, sujeira, fatorKVal)
  hspFinal = parseFloat(porcentagemHSP * hsp * (1 + sujeira) * fatorKVal)
  element17_5.value = hspFinal.toFixed(2)
  element17_6.value = hspFinal.toFixed(2)
  element17_7.value = hspFinal.toFixed(2)
  element17_8.value = (emmDiario / hspFinal).toFixed(2)
  element18_3.value = (await ceilLat((1.2 * emmDiario / hspFinal), 0.01)).toFixed(2)
  element18_1.value = ((emmDiario / hspFinal) / (eficienciaInv / 100)).toFixed(2)
  console.log(emmDiario, hspFinal, eficienciaInv)
  potPicoReal = (emmDiario / hspFinal) / (eficienciaInv / 100)
  element19.value = Math.round(-(1 - porcentagemHSP) * 100)
  itemsCorrecao['inputPosTelhado'] = parseFloat(element19.value)
  somaCorrecao = sumValues(itemsCorrecao)
  fatConsumo = parseFloat(1 + (somaCorrecao / 100)) * 100
  element27.value = fatConsumo.toFixed(2)
  element52.value = potPicoReal.toFixed(2)
  $('#inputPotPerdaOrca')[0].value = potPicoReal.toFixed(2)
  await qtdeMdl()
}
var potPicoReal = 0
let element50 = document.getElementById('inputMediaAnualCalculo')
let element51 = document.getElementById('inputNumModulosCalculo')
let element52 = document.getElementById('inpuPotenciaComPerdasCalculo')
let element53 = document.getElementById('inputNumModulosEscolhaCalculo')

async function valNum(valor) {
  try {
    var resposta = Number(valor.toString().replaceAll(",", "."))
  } catch {
    var resposta = 0
  }
  return resposta
}

class activeClass {
  constructor(items) {
    for (var i = 0; i < items.length; i++) {
      if (items[i].classList.contains("active")) {
        items[i].classList.toggle("active")
        items[i].ariaSelected = "false"
      }
    }
    this.classList.add("active")
    this.ariaSelected = "true"

  }
}
// Dados de Fator K e de Posicionamento do telhado
async function fatorK() {
  if (element12.value == 'SOLO') {
    element13.value = await ceilLat(Math.abs(element14.value), 5)
  } else {
    element13.value = element15.value
  }
  fatorKdata = await fecthGet(`/fatorK?name=${element29.value};${element13.value}`)
  fatorKVal = await valNum(fatorKdata[0].media)
  element28.value = fatorKdata[0].media
}

async function changeQtdInversor(valor) {
  element18_4.value = valor
}

async function updateDataBegin() {
  await fatorK()
  await energiaInversor()
  await sumItems('function', 123)
}

let element28 = document.getElementById('inputFatorKDadoTec')
let element29 = document.getElementById("inputLatitudeIntDadoTec")
let element12 = document.getElementById('inputTipoTelhaDadoTec')
let element13 = document.getElementById('inputLatitudeCorDadoTec')
let element14 = document.getElementById("inputLatitudeOngDadoTec")
let element15 = document.getElementById("inputAngTelhaDadoTec")
element12.addEventListener('change', async function () {
  await updateDataBegin()
})
element15.addEventListener('change', async function () {
  await updateDataBegin()
})

let element16 = document.getElementById('inputPosicionamentoDadoTec')
let element17 = document.getElementById('inputHSPPerdasDadoTec')
let element17_1 = document.getElementById('inputPerdasIrrCalculo')
let element17_2 = document.getElementById('inpuHSPCorrSujCalculo')
let element17_3 = document.getElementById('inputSujeira')
let element17_4 = document.getElementById('inputFatorKDadoTec')
let element17_5 = document.getElementById('inputHSPCorrFatorKCalculo')
let element17_6 = document.getElementById('inputHPSFinalCalculo')
let element17_7 = document.getElementById('inputHSPCorrCalculo')
let element17_8 = document.getElementById('inputPotenciaPicoCalculo')
let element17_9 = document.getElementById('inputEnergiaMediaDiariaCalculo')
let element18_1 = document.getElementById('inputPotenciaPicoRealCalculo')
let element18_2 = document.getElementById('inputEficienciaInversor')
let element18_3 = document.getElementById('inputPotenciaNominalInvCalculo')
let element18_4 = document.getElementById('inputQuantInvCalculo')

let element18 = document.getElementById('inputHSPDadoTec')
let element19 = document.getElementById('inputPosTelhado')
var porcentagemHSP = 0
var hsp = 0
var sujeira = 0
var fatorKVal = 0
var emmDiario = 0
var hspFinal = 0
element16.addEventListener('change', async function () {
  await updateDataBegin()
})
element18.addEventListener('change', async function () {
  element17.value = parseFloat(porcentagemHSP * hsp).toFixed(2)
})

let element20 = document.getElementById('inputTempMediaModulo')
let element21 = document.getElementById('inputTPmaxPerModulo')
let element22 = document.getElementById('inputTVocPerModulo')
let element23 = document.getElementById('inputTIscPerModulo')
let element24 = document.getElementById('inputTPmaxModulo')
let element25 = document.getElementById('inputTVocModulo')
let element26 = document.getElementById('inputTIscModulo')
let element27 = document.getElementById('inputFatorCorr')
var tempMedia = 0
element20.addEventListener('change', async function () {
  await checkTemp()
  await updateDataBegin()
})

let element30 = document.getElementById('inputAddConsumo')
element30.addEventListener('change', async function () {
  await sumItems('function', 123)
  // somaConsumo = sumValues(itemsConsumo)
  // var porcentagem = parseFloat($('#inputPorcentagem')[0].value)
  // var addConsumo = $('#inputAddConsumo')[0].value
  // if (addConsumo == '') {
  //   addConsumo = 0
  // } else {
  //   addConsumo = parseFloat($('#inputAddConsumo')[0].value)
  // }
  // var emmConsumo = parseFloat($('#inputEmmConsumo')[0].value)
  // var fatConsumo = parseFloat($('#inputFatorCorr')[0].value)
  // $('#inputGerConsumo')[0].value = (((emmConsumo + addConsumo) / porcentagem) * fatConsumo).toFixed(2)
  // $('#inputPotConsumo')[0].value = (((emmConsumo + addConsumo) / porcentagem) * fatConsumo).toFixed(2)
  // $('#inputDemConsumo')[0].value = ((((emmConsumo + addConsumo) / porcentagem) * fatConsumo) / 1.3).toFixed(2)
})

let element31 = document.getElementById('inputPmaxCorrModulo')
let element32 = document.getElementById('inputVocCorrModulo')
let element33 = document.getElementById('inputIscCorrModulo')