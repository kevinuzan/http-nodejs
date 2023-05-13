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
  // var sampleArr = base64ToArrayBuffer(data);
  // saveByteArray("teste.jpg", sampleArr);
  var dataUrl = `opi`
  var pathName = 'graficoConsumoGeracao'
  var mldGetData = `/downloadImage?name=oi;oia`
  const dataMdlForn = await fetchGet(mldGetData)
  console.log(dataMdlForn)
}

async function exportData() {
  await createCharts()
  await exportChart()
  await exportChart2()
  var cliente = $('#inputCliente')[0].value
  var vendedor = $('#inputVendedor')[0].value
  var validade = 10
  var vendedor_tel = $('#inputVendedorTelefone')[0].value
  var vendedor_email = $('#inputVendedorEmail')[0].value
  var endereco = $('#inputRua')[0].value + " " + $('#inputNumero')[0].value + " " + $('#inputBairro')[0].value
  var cep = $('#inputCep')[0].value
  var estimativa_mes = Number(emmConsumo).toFixed(2) + " kWh"
  var tipo_telhado = $('#inputTelhado')[0].value
  var porcentagem_sistema = $('#inputPorcentagem')[0].value
  var tamanho = Number(potTotalOrca).toFixed(2) + " kWp"
  var economia_ano = brlBrazil.format(mediaAnualEconomia)
  var investimento_inicial = brlBrazil.format(Math.round(totalGeralOrcaFinal))
  var payback = paybackCompleto
  var gasto_antigo = brlBrazil.format(valorFaturaAtualSSolarResumo)
  var gasto_novo = brlBrazil.format(valorFaturaAtualCSolarResumo)
  var retorno_anual = ((1 / payback_valor) * 100).toFixed(2)
  var fabricante_modulo = fornecedorMdlResumo
  var qtde_modulos = qtdeMdlCalc
  var modeloMdl = modeloMdlResumo
  var potencia_modulo = pmax

  var fabricante_inversor = fornecedorInvResumo
  var qtde_inversor = inversoresResumo.toFixed(2)
  var modeloInv = modeloInvResumo
  var potencia_inversor = potenciaInv

  var estrutura_fixa = $('#inputTelhado')[0].value
  var area = Math.round(areaTotalResumo)
  var fator_simultaneidade = Math.round(consumoInst)
  var fator_injetado = Math.round(100 - consumoInst)
  var tarifa_imposto = (tarifaTotal_cImposto).toFixed(2)
  var degradacao_anual = await valNum($('#inputDegraAnual')[0].value) * 100
  var geracao_anual = Math.round(geracaoAnualResumo) + " kWh"
  var reajuste_tarifa = await valNum($('#inputInflacaoEletricaFluxo')[0].value) * 100

  var km = Math.round(kmRodado)
  var arvores = Math.round(arvorePoupada)
  var co2 = Math.round(co2Evitado)

  var desconto = descontoOrca.toFixed(2)
  var valor_desconto = totalDescontoOrcaFinal.toFixed(2)

  var finan_12 = finalFinanciamento12.toFixed(2)
  var finan_48 = finalFinanciamento48.toFixed(2)
  var finan_60 = finalFinanciamento60.toFixed(2)
  var finan_120 = finalFinanciamento120.toFixed(2)
  var finan_150 = finalFinanciamento150.toFixed(2)

  var projectName = `PMC_${Number(potTotalOrca).toFixed(2)}_${cliente}`

  var tipoMdl = tipoMdl
  var estiloMdl = estiloMdl
  var eficienciaMdl = eficienciaMdl

  var mppt_inversor = mpptInversor
  var fase_inversor = faseInversor
  var faixa_inversor = faixaInversor

  var mldGetData = `/docxTemplater?name=${cliente};${vendedor};${validade};${vendedor_tel};${vendedor_email};${endereco};${cep};${estimativa_mes};${tipo_telhado};${porcentagem_sistema};${tamanho};${economia_ano};${investimento_inicial};${payback};${gasto_antigo};${gasto_novo};${retorno_anual};${qtde_modulos};${fabricante_inversor};${qtde_inversor};${estrutura_fixa};${area};${fator_simultaneidade};${fator_injetado};${tarifa_imposto};${degradacao_anual};${geracao_anual};${km};${arvores};${co2};${desconto};${valor_desconto};${finan_12};${finan_48};${finan_60};${finan_120};${finan_150};${fabricante_modulo};${modeloMdl};${modeloInv};${potencia_modulo};${potencia_inversor};${reajuste_tarifa};${tipoMdl};${estiloMdl};${eficienciaMdl};${mppt_inversor};${fase_inversor};${faixa_inversor}`
  const dataMdlForn = await fetchGet(mldGetData)
  console.log(dataMdlForn)
  $('#downloadProposta').attr("download", `${projectName}.docx`);
  $('#downloadProposta')[0].click()
  await salvarProposta()
}

async function exportChart() {
  await Plotly.toImage('graficoConsumoGeracao', { format: 'png', width: 500, height: 300 }).then(
    async function (dataUrl) {
      var dataUrl_Final = dataUrl.split(',')[1]
      var i
      var fileName = 'graficoConsumoGeracao'
      console.log(dataUrl_Final)
      for (i = 0; i < dataUrl_Final.length; i += 1900) {
        var dataSent = dataUrl_Final.slice(i, (i + 1900)).replaceAll("+", "*")
        var mldGetData = `/downloadImage?name=${dataUrl_Final.length};${fileName};${dataSent}`
        const dataMdlForn = await fetchGet(mldGetData)
        console.log(dataMdlForn)
      }
    })
}

async function exportChart2() {
  await Plotly.toImage('graficoPayback', { format: 'png', width: 500, height: 300 }).then(
    async function (dataUrl) {
      var dataUrl_Final = dataUrl.split(',')[1]
      var i
      var fileName = 'graficoPayback'
      for (i = 0; i < dataUrl_Final.length; i += 1900) {
        var dataSent = dataUrl_Final.slice(i, (i + 1900)).replaceAll("+", "*")
        var mldGetData = `/downloadImage?name=${dataUrl_Final.length};${fileName};${dataSent}`
        const dataMdlForn = await fetchGet(mldGetData)
        console.log(dataMdlForn)
      }
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
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  };

  Plotly.newPlot('graficoConsumoGeracao', data, layout, config);


  var dtickUser = 1000000

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
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
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

// // Select your input type file and store it in a variable
// const input2 = document.getElementById('fileinput');
// // This will upload the file after having read it
// var options = {
//   method: 'POST',
//   body: input2.files[0],
//   headers: {
//     // Content-Type may need to be completely **omitted**
//     // or you may need something
//     "Content-Type": "You will perhaps need to define a content-type here"
//   },
// }

// const upload = (file) => {
//   delete options.headers['Content-Type'];
//   fetch('/testeImagem', options).then(
//     response => response.json() // if the response is a JSON object
//   ).then(
//     success => console.log(success) // Handle the success response object
//   ).catch(
//     error => console.log(error) // Handle the error response object
//   );
// };

// // Event handler executed when a file is selected
// const onSelectFile = () => upload(input.files[0]);

// // Add a listener on your input
// // It will be triggered when a file will be selected
// // input2.addEventListener('change', onSelectFile, false);

// input2.addEventListener('change', testeword, false);

// async function testeword() {
//   let photo = document.getElementById("fileinput").files[0];
//   let formData = new FormData();
//   console.log(photo, formData)
//   formData.append("photo", photo);
//   console.log(formData)
//   options = {
//     method: 'POST',
//     body: photo,
//     headers: {
//       // Content-Type may need to be completely **omitted**
//       // or you may need something
//       "Content-Type": "multipart/form-data; boundary=--WebKitFormBoundaryfgtsKTYLsT7PNUVD"
//     },
//   }
//   // delete options.headers['Content-Type'];
//   var r = await fetch('/testeImagem', options);
//   console.log(r)
// }

var potenciaResumo = 0
var modulosResumo = 0
var areaTotalResumo = 0
var pesoTotalResumo = 0
var fornecedorMdlResumo = 0
var modeloMdlResumo = 0
var fornecedorInvResumo = 0
var modeloInvResumo = 0
var inversoresResumo = 0
var geracaoMensalResumo = 0
var geracaoAnualResumo = 0
var percentualGerConResumo = 0
var economia25anosResumo = 0
var tirResumo = 0
var rentabilidadeMensalResumo = 0
var paybackResumo = 0
var investimentoResumo = 0
var valorFinanciamento1xResumo = 0

var kmRodadoResumo = 0
var arvorePoupadaResumo = 0
var co2EvitadoResumo = 0

var faturaBTSSolarResumo = 0
var demandaSSolarResumo = 0
var impostosSSolarResumo = 0
var valorFaturaAtualSSolarResumo = 0
var faturaBTCSolarResumo = 0
var demandaCSolarResumo = 0
var impostoCSSolarResumo = 0
var valorFaturaAtualCSolarResumo = 0
var economiaEnergiaMensalResumo = 0
var economiaPercentualResumo = 0

async function resumoFill() {
  potenciaResumo = potTotalOrca
  modulosResumo = qtdeMdlCalc
  areaTotalResumo = (qtdeMdlCalc * areaMdl).toFixed(2)
  pesoTotalResumo = (qtdeMdlCalc * pesoMdl).toFixed(2)
  fornecedorMdlResumo = fornecedorMdl
  modeloMdlResumo = element5.value
  fornecedorInvResumo = fornecedorInv
  modeloInvResumo = element11.value
  inversoresResumo = Number($('#inputQtdeInversor')[0].value)
  geracaoMensalResumo = (geracaoMedia).toFixed(2)
  geracaoAnualResumo = (geracaoTotal).toFixed(2)
  percentualGerConResumo = (geracaoMedia / consumoMedia).toFixed(2) + ' %'
  if (dictValorFluxo.length > 0) {
    economia25anosResumo = dictValorFluxo[24].vpa
  } else {
    economia25anosResumo = 0
  }
  tirResumo = (tirResultado).toFixed(2) + ' %'
  rentabilidadeMensalResumo = ((Math.pow((1 + (tirResultado / 100)), (1 / 12)) - 1) * 100).toFixed(2) + ' %'
  paybackResumo = paybackCompleto
  investimentoResumo = totalDescontoOrcaFinal
  valorFinanciamento1xResumo = finalFinanciamento1

  kmRodadoResumo = (kmRodado).toFixed(2)
  arvorePoupadaResumo = (arvorePoupada).toFixed(2)
  co2EvitadoResumo = (co2Evitado).toFixed(2)

  faturaBTSSolarResumo = CreditoSomaTotal
  demandaSSolarResumo = ''
  impostosSSolarResumo = CreditoPIS + CreditoCOFINS + CreditoConsumoTUSDIcms + CreditoConsumoTEIcms
  valorFaturaAtualSSolarResumo = CreditoSomaTotal

  faturaBTCSolarResumo = CreditoSomaTotal
  demandaCSolarResumo = ''
  impostoCSSolarResumo = CreditoPIS + CreditoCOFINS + CreditoConsumoTUSDIcms + CreditoConsumoTEIcms

  for (i = 0; i < listFinalGeracao.length; i++) {
    if (anoAtual == listFinalGeracao[i][0]) {
      console.log(anoAtual, listFinalGeracao[i][0], listFinalGeracao[i][6])
      tarifaTotalCSolarResumo = Number(listFinalGeracao[i][6])
      break
    }
  }
  valorFaturaAtualCSolarResumo = tarifaTotalCSolarResumo

  economiaEnergiaMensalResumo = CreditoSomaTotal - tarifaTotalCSolarResumo
  economiaPercentualResumo = (CreditoSomaTotal - tarifaTotalCSolarResumo) / CreditoSomaTotal


  $('#inputPotenciaResumo')[0].value = potenciaResumo
  $('#inputNumeroMdlResumo')[0].value = modulosResumo
  $('#inputAreaResumo')[0].value = areaTotalResumo
  $('#inputPesoResumo')[0].value = pesoTotalResumo
  $('#inputFabricanteMdlResumo')[0].value = fornecedorMdlResumo
  $('#inputPecaMdlResumo')[0].value = modeloMdlResumo
  $('#inputFabricanteInvResumo')[0].value = fornecedorInvResumo
  $('#inputPecaInvResumo')[0].value = modeloInvResumo
  $('#inputNumeroInvResumo')[0].value = inversoresResumo
  $('#inputGeracaoMensalResumo')[0].value = geracaoMensalResumo
  $('#inputGeracaoAnualResumo')[0].value = geracaoAnualResumo
  $('#inputGeracaoXConsumo')[0].value = percentualGerConResumo

  $('#inputKmRodadosResumo')[0].value = kmRodadoResumo
  $('#inputArvoresPoupadasResumo')[0].value = arvorePoupadaResumo
  $('#inputTonCo2Resumo')[0].value = co2EvitadoResumo

  $('#inputEconomiaAnualResumo')[0].value = brlBrazil.format(economiaEnergiaMensalResumo * 12)
  $('#inputEconomia25Resumo')[0].value = brlBrazil.format(economia25anosResumo)
  $('#inputTirResumo')[0].value = tirResumo
  $('#inputRentabilidadeMensalResumo')[0].value = rentabilidadeMensalResumo
  $('#inputPaybackResumo')[0].value = paybackResumo
  $('#inputValorInvestimentoResumo')[0].value = brlBrazil.format(investimentoResumo)
  $('#inputParcelaFinanciamentoResumo')[0].value = brlBrazil.format(valorFinanciamento1xResumo)

  $('#inputFaturaSSolarResumo')[0].value = brlBrazil.format(faturaBTSSolarResumo)
  $('#inputFaturaCSolarResumo')[0].value = brlBrazil.format(faturaBTCSolarResumo)
  $('#inputDemandaSSolarResumo')[0].value = brlBrazil.format(demandaSSolarResumo)
  $('#inputDemandaCSolarResumo')[0].value = brlBrazil.format(demandaCSolarResumo)
  $('#inputImpostosSSolarResumo')[0].value = brlBrazil.format(impostosSSolarResumo)
  $('#inputImpostosCSolarResumo')[0].value = brlBrazil.format(impostoCSSolarResumo)
  $('#inputValFaturaSSolarResumo')[0].value = brlBrazil.format(valorFaturaAtualSSolarResumo)
  $('#inputValFaturaCSolarResumo')[0].value = brlBrazil.format(valorFaturaAtualCSolarResumo)

  $('#inputEconomiaEnergiaMensalResumo')[0].value = brlBrazil.format(economiaEnergiaMensalResumo)
  $('#inputEconomiaPercentualResumo')[0].value = (economiaPercentualResumo * 100) + " %"
  await createCharts()
}
var tarifaTotalCSolarResumo = 0
var fatorKdata = ''
var optionsDistribuidora = ''

var itemsConsumo = {

}
var somaConsumo = 0

var itemsCorrecao = {
  inputPosTelhado: 0,
  inputTPmaxPerModulo: 0,
  inputTVocPerModulo: 0,
  inputTIscPerModulo: 0,
  inputFatorCorr: 0,
  inputDegraAnual: 0,
}
var somaCorrecao = 0

const sumValues = obj => Object.values(obj).reduce((a, b) => a + b, 0);

var CreditoConsumoTUSD = 0
var CreditoConsumoTE = 0
var CreditoPIS = 0
var CreditoCOFINS = 0
var CreditoConsumoTUSDIcms = 0
var CreditoConsumoTEIcms = 0
var CreditoTaxaIlum = 0
var CreditoSomaTotal = 0

//#region UPDATE EM MASSA
var resultExcelData = 0
var inputMdl = document.getElementById('excelDataMdl');
inputMdl.addEventListener('change', async function () {
  console.log
  if (inputMdl.files[0]['name'].indexOf('.xlsx') != -1) {
    resultExcelData = await readXlsxFile(inputMdl.files[0]).then(function (data) {
      data.shift()
      return data
    })
    var dataToSend = JSON.stringify(resultExcelData)
    var typeFile = 'modulo'
    var size = dataToSend.length
    var i
    var resp
    for (i = 0; i < size; i += 1900) {
      var dataToSend_final = dataToSend.slice(i, (i + 1900))
      resp = await fetchGet(`/updateTask?name=${typeFile};${size};${dataToSend_final}`)
      // const dataMdlForn = await fetchGet(mldGetData)
      console.log(resp)
    }
    if (resp) {
      alert('DADOS ATUALIZADOS')
    }
    // var resp = await fetchGet(`/updateTask?name=${typeFile};${size};${dataToSend}`)
    //console.log(resp)
  } else {
    alert('Por favor, selecione um arquivo de extensão xlsx')
  }
})
var resultExcelData = 0
var inputInv = document.getElementById('excelDataInv');
inputInv.addEventListener('change', async function () {
  if (inputInv.files[0]['name'].indexOf('.xlsx') != -1) {
    resultExcelData = await readXlsxFile(inputInv.files[0]).then(function (data) {
      data.shift()
      return data
    })
    var dataToSend = JSON.stringify(resultExcelData)
    var typeFile = 'inversor'
    var size = dataToSend.length
    var i
    var resp
    for (i = 0; i < size; i += 1900) {
      var dataToSend_final = dataToSend.slice(i, (i + 1900))
      resp = await fetchGet(`/updateTask?name=${typeFile};${size};${dataToSend_final}`)
      // const dataMdlForn = await fetchGet(mldGetData)
      console.log(resp)
    }
    if (resp) {
      alert('DADOS ATUALIZADOS')
    }
    // var resp = await fetchGet(`/updateTask?name=${typeFile};${size};${dataToSend}`)
    //console.log(resp)
  } else {
    alert('Por favor, selecione um arquivo de extensão xlsx')
  }
})
var resultExcelData = 0
var inputB3 = document.getElementById('excelDataB3');
inputB3.addEventListener('change', async function () {
  console.log
  if (inputB3.files[0]['name'].indexOf('.xlsx') != -1) {
    resultExcelData = await readXlsxFile(inputB3.files[0]).then(function (data) {
      data.shift()
      return data
    })
    var dataToSend = JSON.stringify(resultExcelData)
    var typeFile = 'tarifab3'
    var size = dataToSend.length
    var i
    var resp
    for (i = 0; i < size; i += 1900) {
      var dataToSend_final = dataToSend.slice(i, (i + 1900))
      resp = await fetchGet(`/updateTask?name=${typeFile};${size};${dataToSend_final}`)
      // const dataMdlForn = await fetchGet(mldGetData)
      console.log(resp)
    }
    if (resp) {
      alert('DADOS ATUALIZADOS')
    }
    // var resp = await fetchGet(`/updateTask?name=${typeFile};${size};${dataToSend}`)
    //console.log(resp)
  } else {
    alert('Por favor, selecione um arquivo de extensão xlsx')
  }
})
var resultExcelData = 0
var inputFio = document.getElementById('excelDataFio');
inputFio.addEventListener('change', async function () {
  console.log
  if (inputFio.files[0]['name'].indexOf('.xlsx') != -1) {
    resultExcelData = await readXlsxFile(inputFio.files[0]).then(function (data) {
      data.shift()
      return data
    })
    var dataToSend = JSON.stringify(resultExcelData)
    var typeFile = 'tarifafiob'
    var size = dataToSend.length
    var i
    var resp
    for (i = 0; i < size; i += 1900) {
      var dataToSend_final = dataToSend.slice(i, (i + 1900))
      resp = await fetchGet(`/updateTask?name=${typeFile};${size};${dataToSend_final}`)
      // const dataMdlForn = await fetchGet(mldGetData)
      console.log(resp)
    }
    if (resp) {
      alert('DADOS ATUALIZADOS')
    }
    // var resp = await fetchGet(`/updateTask?name=${typeFile};${size};${dataToSend}`)
    //console.log(resp)
  } else {
    alert('Por favor, selecione um arquivo de extensão xlsx')
  }
})
var resultExcelData = 0
var inputFatK = document.getElementById('excelDataFatK');
inputFatK.addEventListener('change', async function () {
  console.log
  if (inputFatK.files[0]['name'].indexOf('.xlsx') != -1) {
    resultExcelData = await readXlsxFile(inputFatK.files[0]).then(function (data) {
      data.shift()
      return data
    })
    var dataToSend = JSON.stringify(resultExcelData)
    var typeFile = 'fatork'
    var size = dataToSend.length
    var i
    var resp
    for (i = 0; i < size; i += 1900) {
      var dataToSend_final = dataToSend.slice(i, (i + 1900))
      resp = await fetchGet(`/updateTask?name=${typeFile};${size};${dataToSend_final}`)
      // const dataMdlForn = await fetchGet(mldGetData)
      console.log(resp)
    }
    if (resp) {
      alert('DADOS ATUALIZADOS')
    }
    // var resp = await fetchGet(`/updateTask?name=${typeFile};${size};${dataToSend}`)
    //console.log(resp)
  } else {
    alert('Por favor, selecione um arquivo de extensão xlsx')
  }
})
async function updateTarifaB3() {
  var data = await fetchGet(`/updateTask?name=tarifab3`)
  console.log(data)
}
async function updateModulos() {
  var data = await fetchGet(`/updateTask?name=modulos`)
  console.log(data)
}
async function updateInversores() {
  var data = await fetchGet(`/updateTask?name=inversores`)
  console.log(data)
}
async function updateTarifaFioB() {
  var data = await fetchGet(`/updateTask?name=tarifafiob`)
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
  var result = await fetchGet(`/updateGreener?name=${sendData}`)
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

async function fillConsumo(valor) {
  $('#inputJanConsumo')[0].value = valor
  $('#inputFevConsumo')[0].value = valor
  $('#inputMarConsumo')[0].value = valor
  $('#inputAbrConsumo')[0].value = valor
  $('#inputMaiConsumo')[0].value = valor
  $('#inputJunConsumo')[0].value = valor
  $('#inputJulConsumo')[0].value = valor
  $('#inputAgoConsumo')[0].value = valor
  $('#inputSetConsumo')[0].value = valor
  $('#inputOutConsumo')[0].value = valor
  $('#inputNovConsumo')[0].value = valor
  $('#inputDezConsumo')[0].value = valor
  for (let i = 0; i < 12; i++) {
    itemsConsumo[listInputs[i]] = parseFloat(valor)
  }
  await sumItems('function', 123)


}

var paybackCompleto = 0
var dictValorFluxo = []
var vpTotal = 0
var soma25Anos = 0
var tir25Anos = []
var kmRodado = 0
var arvorePoupada = 0
var co2Evitado = 0
var listAnoPayback = []
var listFluxoPayback = []
var tirResultado = 0
var payback_valor = 0
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
      payback_valor = (-dictValorFluxo[i].fluxo / dictValorFluxo[i].vp) + i - 1
      var anoPayback = Math.floor(payback_valor)
      var mesPayback = Math.floor((payback_valor - anoPayback) * 12)
      var diaPayback = Math.floor((((payback_valor - anoPayback) * 12) - mesPayback) * 30)
      paybackCompleto = `${anoPayback} Anos ${mesPayback} Meses`
      $('#inputPaybackAnoResultado')[0].value = payback_valor.toFixed(2)
      $('#inputPaybackCompletoResultado')[0].value = paybackCompleto
      $('#inputPaybackAnualResultado')[0].value = (1 / payback_valor).toFixed(2) + ' %'
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
  tirResultado = (await IRR(tir25Anos,)) * 100
  $('#inputTirResultado')[0].value = (tirResultado).toFixed(2) + ' %'

  kmRodado = ((geracaoTotal * 25) * 0.7097)
  arvorePoupada = ((geracaoTotal * 25) * 5.04 * 0.0001)
  co2Evitado = ((gerConsumo * 5.3622972))
  $('#inputKmRodadosResultado')[0].value = kmRodado.toFixed(2)
  $('#inputArvoresResultado')[0].value = arvorePoupada.toFixed(2)
  $('#inputCo2Resultado')[0].value = co2Evitado.toFixed(2)
  await resumoFill()
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
  await resumoFill()
}

async function pgto(taxa, parcelas, valor) {
  return valor * (taxa) / (1 - (Math.pow(1 + taxa, -parcelas)));
}
var finalFinanciamento1 = 0
var finalFinanciamento12 = 0
var finalFinanciamento48 = 0
var finalFinanciamento60 = 0
var finalFinanciamento120 = 0
var finalFinanciamento150 = 0
async function valFinanciamento() {
  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento1')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento1')[0].value) / 100
  finalFinanciamento1 = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento1')[0].value = brlBrazil.format(finalFinanciamento1)

  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento12')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento12')[0].value) / 100
  finalFinanciamento12 = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento12')[0].value = brlBrazil.format(finalFinanciamento12)

  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento48')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento48')[0].value) / 100
  finalFinanciamento48 = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento48')[0].value = brlBrazil.format(finalFinanciamento48)

  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento60')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento60')[0].value) / 100
  finalFinanciamento60 = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento60')[0].value = brlBrazil.format(finalFinanciamento60)

  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento120')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento120')[0].value) / 100
  finalFinanciamento120 = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento120')[0].value = brlBrazil.format(finalFinanciamento120)

  var parcelasFinanciamento = await valNum($('#inputNumeroParcelasFinanciamento150')[0].value)
  var inputJurosMesFinanciamento = await valNum($('#inputJurosMesFinanciamento150')[0].value) / 100
  finalFinanciamento150 = await pgto(inputJurosMesFinanciamento, parcelasFinanciamento, totalGeralOrcaFinal)
  $('#inputValorFinalFinanciamento150')[0].value = brlBrazil.format(finalFinanciamento150)

  await resumoFill()
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
var Aterramento = 0
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
  Aterramento = await valNum($('#inputAterramentoOrca')[0].value)
  CustoViagem = await valNum($('#inputCustoViagemOrca')[0].value)
  Lucro = await valNum($('#inputLucroOrca')[0].value)
  LucroMg = lucroMargem
  somaOrcaFinal = (projeHomo - moTerceira) + moTerceira + MatFotov + PainelProt + StringBox + MaterialCa + EstruCobert + Eletroduto + Aterramento + CustoViagem

  var inputImpostoOrca = await valNum($('#inputImpostoOrca')[0].value)
  impostoOrcaFinal = (somaOrcaFinal / (1 - (inputImpostoOrca / 100))) * (inputImpostoOrca / 100)
  totalGeralOrcaFinal = somaOrcaFinal + impostoOrcaFinal
  $('#inputTotalOrcaFinal')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento1')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento12')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento48')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento60')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento120')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputValorFinanciamento150')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  $('#inputInvestInicialFluxo')[0].value = brlBrazil.format(totalGeralOrcaFinal)
  await descontoOrcaFinal()
  await valFinanciamento()
  await fluxoCaixa()
  await resumoFill()
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
  await resumoFill()
}
var moTerceira = 0
var lucroMargem = 0
var lucro = 0
var porcentForn = 0
var painelCA = 0
var comissao = 0
var comissaoValor = 0
var lucroLiq = 0
var precoKwp = 0
var precoPorServKwp = 0
var precoPorMatKwp = 0
async function updateLucro() {
  porcentForn = await valNum($('#inputPorcentagemFornOrca')[0].value) / 100
  // comissao = await valNum($('#inputComissaoOrca')[0].value) / 100

  if (potPicoReal <= 112.5) {
    comissao = 7 / 100
    $('#inputComissaoOrca')[0].value = 7
  } else if (potPicoReal > 112.5 && potPicoReal <= 300) {
    comissao = 6 / 100
    $('#inputComissaoOrca')[0].value = 6
  } else if (potPicoReal > 300 && potPicoReal <= 500) {
    comissao = 5.5 / 100
    $('#inputComissaoOrca')[0].value = 5.5
  } else {
    comissao = 5 / 100
    $('#inputComissaoOrca')[0].value = 5
  }

  comissaoValor = comissao * totalGeralOrcaFinal
  lucroLiq = lucroMargem - comissaoValor
  lucro = await valNum($('#inputLucroOrca')[0].value)
  painelCA = await valNum($('#inputPainelProtOrca')[0].value)
  lucroMargem = projeHomo + (painelCA * porcentForn) + lucro - moTerceira
  $('#inputLucroMgOrca')[0].value = brlBrazil.format(lucroMargem)
  $('#inputLucroBrutoValorOrcaFinal')[0].value = brlBrazil.format(lucroMargem)
  $('#inputLucroBrutoPercentualOrcaFinal')[0].value = ((lucroMargem / totalGeralOrcaFinal) * 100).toFixed(2) + ' %'
  $('#inputComissaoValorOrcaFinal')[0].value = brlBrazil.format(comissaoValor)
  $('#inputComissaoPercentualOrcaFinal')[0].value = ((comissaoValor / totalGeralOrcaFinal) * 100).toFixed(2) + ' %'
  $('#inputLucroLiqValorOrcaFinal')[0].value = brlBrazil.format(lucroLiq)
  $('#inputLucroLiqPercentualOrcaFinal')[0].value = ((lucroLiq / totalGeralOrcaFinal) * 100).toFixed(2) + ' %'

  precoKwp = totalGeralOrcaFinal / gerConsumo
  precoPorServKwp = (somaOrcaFinal - Eletroduto - Aterramento - StringBox) / gerConsumo
  precoPorMatKwp = (LucroMg + Eletroduto + Aterramento + StringBox) / gerConsumo
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
    } else if (element.titulo == 'ATERRAMENTO') {
      element.valor = Aterramento
      element.percentual = (Aterramento / totalGeralOrcaFinal) * 100
      element.valorWp = Aterramento / potPicoReal / 1000
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
var totalDescontoOrcaFinal = 0
var descontoOrca = 0
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
var valorBandeira = 0
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
var gerConsumo = 0
var emmConsumo = 0
var fatConsumo = 0
var addConsumo = 0
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
    await resumoFill()
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
  'ATERRAMENTO',
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
    titulo: 'ATERRAMENTO',
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
var economiaAnual = 0
var mediaAnualEconomia = 0
var anoAtual = 0
async function tableTaxacaoFioB() {
  var tarifafiob = await fetchGet(`/tarifafiobData?name=${distribuidora}`)
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
    anoAtual = Number($('#inputAno')[0].value)
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
var consumoInst = 0
var porcentagem = 0
var distribuidora = ''
var tarifaTotal_cImposto = 0
// Buscar dados de cliente
async function buscaCliente(tipo) {
  var nome = document.getElementById(`inputCliente${tipo}`).value
  const data = await fetchPost('/clienteData?name=' + nome)
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
  const tarifaData = await fetchPost(`/tarifaData?name=${data[0]["distribuidora"]}`)
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
  tarifaTotal_cImposto = tarifaTusdImp + tarifaTeImp
  $('#inputTarifaTUSDImp')[0].value = tarifaTusdImp.toFixed(2)
  $('#inputTarifaTEImp')[0].value = tarifaTeImp.toFixed(2)
  $('#inputTarifaTotal')[0].value = tarifaTotal_cImposto.toFixed(2)
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
var tarifaTusdImp = 0
var tarifaTeImp = 0
var pis = 0
var cofins = 0
var icms = 0
var tusd = 0
var te = 0
var ilum_pub = 0
var s_imposto = 0

// #region CONFIGURAÇÕES
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
  var Porcentagem = 0
  var Area = document.getElementById(`inputAreaConfigInsert`).value
  var Consumo = document.getElementById(`inputConsumoConfigInsert`).value
  var Taxa = document.getElementById(`inputTaxaConfigInsert`).value
  var IlumPub = document.getElementById(`inputIlumPubConfigInsert`).value
  var UniCons = document.getElementById(`inputUniConsConfigInsert`).value
  var Bandeira = document.getElementById(`inputBandeiraConfigInsert`).value
  var query = `${nome};${Telefone};${Telhado};${Estado};${Cidade};${Rua};${Numero};${Bairro};${Cep};${Distribuidora};${Icms};${Pis};${Cofins};${Porcentagem};${Area};${Consumo};${Taxa};${IlumPub};${UniCons};${Bandeira};`
  const data = await fetchPost('/clienteInsert?name=' + query)
  if (data == 'existe') {
    alert("ERRO: CLIENTE JÁ ESTÁ CADASTRADO!")
  } else {
    //DADOS DE CLIENTES
    var dataCliente = await fetchGet("/cliente")

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
  var Porcentagem = 0
  var Area = document.getElementById(`inputAreaConfigEdit`).value
  var Consumo = document.getElementById(`inputConsumoConfigEdit`).value
  var Taxa = document.getElementById(`inputTaxaConfigEdit`).value
  var IlumPub = document.getElementById(`inputIlumPubConfigEdit`).value
  var UniCons = document.getElementById(`inputUniConsConfigEdit`).value
  var Bandeira = document.getElementById(`inputBandeiraConfigEdit`).value
  var query = `${nome};${Telefone};${Telhado};${Estado};${Cidade};${Rua};${Numero};${Bairro};${Cep};${Distribuidora};${Icms};${Pis};${Cofins};${Porcentagem};${Area};${Consumo};${Taxa};${IlumPub};${UniCons};${Bandeira};`
  const data = await fetchPost('/clienteUpdate?name=' + query)
  if (data == 'nexiste') {
    alert("ERRO: CLIENTE NÃO ESTÁ CADASTRADO!")
  } else {
    //DADOS DE CLIENTES
    var dataCliente = await fetchGet("/cliente")
    dataCliente.forEach(function (item) {
      if (optionsClient.indexOf(item["cliente"]) == -1) {
        optionsClient += '<option value="' + item["cliente"] + '" />';
      }
    });
    alert("CLIENTE ATUALIZADO COM SUCESSO!")
  }
}

// Inserir novo vendedor
async function insereVendedor() {
  var vendedor = document.getElementById(`inputVendedorInserir`).value
  var telefone = document.getElementById(`inputVendedorTelefoneInserir`).value
  var email = document.getElementById(`inputVendedorEmailInserir`).value
  var query = `${vendedor};${telefone};${email}`
  const data = await fetchPost('/vendedorInsert?name=' + query)
  if (data == 'existe') {
    alert("ERRO: VENDEDOR JÁ ESTÁ CADASTRADO!")
  } else {
    //DADOS DE VENDEDOR
    var dataVendedor = await fetchGet("/vendedores")
    dataVendedor.forEach(function (item) {
      if (optionsVendedores.indexOf(item["nome"]) == -1) {
        optionsVendedores += `<option value= "${item["nome"]}">${item["nome"]}</option>`;
      }
    });
    document.getElementById("inputVendedor").innerHTML = optionsVendedores
    document.getElementById("inputVendedorEditarList").innerHTML = optionsVendedores
    alert("VENDEDOR CADASTRADO COM SUCESSO!")
  }
}
// Atualizar dados de vendedor
async function atualizaVendedor() {
  var vendedor = document.getElementById(`inputVendedorEditarList`).value
  var telefone = document.getElementById(`inputVendedorTelefoneEditar`).value
  var email = document.getElementById(`inputVendedorEmailEditar`).value
  var query = `${vendedor};${telefone};${email}`
  const data = await fetchPost('/vendedorUpdate?name=' + query)
  if (data == 'nexiste') {
    alert("ERRO: VENDEDOR NÃO ESTÁ CADASTRADO!")
  } else {
    //DADOS DE VENDEDOR
    var dataVendedor = await fetchGet("/vendedores")
    dataVendedor.forEach(function (item) {
      if (optionsVendedores.indexOf(item["nome"]) == -1) {
        optionsVendedores += `<option value= "${item["nome"]}">${item["nome"]}</option>`;
      }
    });
    document.getElementById("inputVendedor").innerHTML = optionsVendedores
    document.getElementById("inputVendedorEditarList").innerHTML = optionsVendedores
    alert("VENDEDOR ATUALIZADO COM SUCESSO!")
  }
}

// Inserir novo tarifa b3
async function insereTarifaB3() {
  var estado = document.getElementById(`inputEstadoTarifaB3Insere`).value
  var distribuidora = document.getElementById(`inputDistribuidoraTarifaB3Insere`).value
  var tusd = document.getElementById(`inputTusdTarifaB3Insere`).value
  var te = document.getElementById(`inputTeTarifaB3Insere`).value
  var s_imposto = document.getElementById(`inputSImpostoTarifaB3Insere`).value
  var query = `${estado};${distribuidora};${tusd};${te};${s_imposto}`
  const data = await fetchPost('/tarifaB3Insert?name=' + query)
  if (data == 'existe') {
    alert("ERRO: TARIFA B3 JÁ ESTÁ CADASTRADA!")
  } else {
    //DADOS DE VENDEDOR
    var distribuidora = await fetchGet("/distribuidoraData")
    distribuidora.forEach(function (item) {
      if (optionsDistribuidora.indexOf(item["distribuidora"]) == -1) {
        optionsDistribuidora += '<option value="' + item["distribuidora"] + '" />';
      }
    });
    document.getElementById("inputDistribuidoraListConfigInsert").innerHTML = optionsDistribuidora
    document.getElementById("inputDistribuidoraListConfigEdit").innerHTML = optionsDistribuidora
    document.getElementById("inputDistribuidoraTarifaB3Editar").innerHTML = optionsDistribuidora
    alert("TARIFA B3 CADASTRADA COM SUCESSO!")
  }
}
// Atualizar dados de tarifa b3
async function atualizaTarifaB3() {
  var estado = document.getElementById(`inputEstadoTarifaB3Editar`).value
  var distribuidora = document.getElementById(`inputDistribuidoraTarifaB3Editar`).value
  var tusd = document.getElementById(`inputTusdTarifaB3Editar`).value
  var te = document.getElementById(`inputTeTarifaB3Editar`).value
  var s_imposto = document.getElementById(`inputSImpostoTarifaB3Editar`).value
  var query = `${estado};${distribuidora};${tusd};${te};${s_imposto}`
  const data = await fetchPost('/tarifaB3Update?name=' + query)
  if (data == 'nexiste') {
    alert("ERRO: TARIFA B3 NÃO ESTÁ CADASTRADA!")
  } else {
    //DADOS DE VENDEDOR
    var distribuidora = await fetchGet("/distribuidoraData")
    distribuidora.forEach(function (item) {
      if (optionsDistribuidora.indexOf(item["distribuidora"]) == -1) {
        optionsDistribuidora += '<option value="' + item["distribuidora"] + '" />';
      }
    });
    document.getElementById("inputDistribuidoraListConfigInsert").innerHTML = optionsDistribuidora
    document.getElementById("inputDistribuidoraListConfigEdit").innerHTML = optionsDistribuidora
    document.getElementById("inputDistribuidoraTarifaB3Editar").innerHTML = optionsDistribuidora
    alert("TARIFA B3 ATUALIZADA COM SUCESSO!")
  }
}

// Inserir novo tarifa fiob
async function insereTarifaFioB() {
  var estado = document.getElementById(`inputEstadoTarifaFioBInsere`).value
  var distribuidora = document.getElementById(`inputDistribuidoraTarifaFioBInsere`).value
  var tusd = document.getElementById(`inputTusdTarifaFioBInsere`).value
  var query = `${estado};${distribuidora};${tusd}`
  const data = await fetchPost('/tarifaFioBInsert?name=' + query)
  if (data == 'existe') {
    alert("ERRO: TARIFA FIO B JÁ ESTÁ CADASTRADA!")
  } else {
    alert("TARIFA FIO B CADASTRADA COM SUCESSO!")
  }
}
// Atualizar dados de tarifa fiob
async function atualizaTarifaFioB() {
  var estado = document.getElementById(`inputEstadoTarifaFioBEditar`).value
  var distribuidora = document.getElementById(`inputDistribuidoraTarifaFioBEditar`).value
  var tusd = document.getElementById(`inputTusdTarifaFioBEditar`).value
  var query = `${estado};${distribuidora};${tusd}`
  const data = await fetchPost('/tarifaFioBUpdate?name=' + query)
  if (data == 'nexiste') {
    alert("ERRO: TARIFA FIO B NÃO ESTÁ CADASTRADA!")
  } else {
    //DADOS DE TARIFA FIOB
    alert("TARIFA FIO B ATUALIZADA COM SUCESSO!")
  }
}

// Inserir novo inversor
async function insereInversor() {
  var Fabricante = $('#inputFabricanteInversorConfigInsert')[0].value
  var Fases = $('#inputFasesInversorConfigInsert')[0].value
  var Strings = $('#inputStringsInversorConfigInsert')[0].value
  var Tipo = $('#inputTipoInversorConfigInsert')[0].value
  var Potencia = $('#inputPotenciaInversorConfigInsert')[0].value
  var Peca = $('#inputPecaInversorConfigInsert')[0].value
  var FaixaMPPT = $('#inputFaixaMPPTInversorConfigInsert')[0].value
  var TensaoCC = $('#inputTensaoCCInversorConfigInsert')[0].value.replaceAll(",", ".")
  var MaxTensaoCC = $('#inputMaxTensaoCCInversorConfigInsert')[0].value.replaceAll(",", ".")
  var Eficiencia = $('#inputEficienciaInversorConfigInsert')[0].value
  var FaixaTensao = $('#inputFaixaTensaoInversorConfigInsert')[0].value
  var CorrenteMaxCC = $('#inputCorrenteMaxCCInversorConfigInsert')[0].value
  var CorrenteMaxCA = $('#inputCorrenteMaxCAInversorConfigInsert')[0].value

  var query = `${Fabricante};${Fases};${Strings};${Tipo};${Potencia};${Peca};${FaixaMPPT};${TensaoCC};${MaxTensaoCC};${Eficiencia};${FaixaTensao};${CorrenteMaxCC};${CorrenteMaxCA}`
  const data = await fetchPost('/inversorInsert?name=' + query)
  if (data == 'existe') {
    alert("ERRO: INVERSOR JÁ ESTÁ CADASTRADO!")
  } else {
    alert("INVERSOR CADASTRADO COM SUCESSO!")
  }
}
// Atualizar dados de inversor
async function atualizaInversor() {
  var Fabricante = $('#inputFabricanteInversorConfigEdit')[0].value
  var Peca = $('#inputPecaInversorConfigEdit')[0].value
  var Fases = $('#inputFasesInversorConfigEdit')[0].value
  var Strings = $('#inputStringsInversorConfigEdit')[0].value
  var Tipo = $('#inputTipoInversorConfigEdit')[0].value
  var Potencia = $('#inputPotenciaInversorConfigEdit')[0].value
  var FaixaMPPT = $('#inputFaixaMPPTInversorConfigEdit')[0].value
  var TensaoCC = $('#inputTensaoCCInversorConfigInsert')[0].value.replaceAll(",", ".")
  var MaxTensaoCC = $('#inputMaxTensaoCCInversorConfigInsert')[0].value.replaceAll(",", ".")
  var Eficiencia = $('#inputEficienciaInversorConfigEdit')[0].value
  var FaixaTensao = $('#inputFaixaTensaoInversorConfigEdit')[0].value
  var CorrenteMaxCC = $('#inputCorrenteMaxCCInversorConfigEdit')[0].value
  var CorrenteMaxCA = $('#inputCorrenteMaxCAInversorConfigEdit')[0].value

  var query = `${Fabricante};${Fases};${Strings};${Tipo};${Potencia};${Peca};${FaixaMPPT};${TensaoCC};${MaxTensaoCC};${Eficiencia};${FaixaTensao};${CorrenteMaxCC};${CorrenteMaxCA}`
  const data = await fetchPost('/inversorUpdate?name=' + query)
  if (data == 'nexiste') {
    alert("ERRO: INVERSOR NÃO ESTÁ CADASTRADO!")
  } else {
    //DADOS DE TARIFA FIOB
    alert("INVERSOR ATUALIZADO COM SUCESSO!")
  }
}

// Inserir novo modulo
async function insereModulo() {
  var Fabricante = $('#inputFabricanteModuloConfigInsert')[0].value
  var Potencia = $('#inputPotenciaModuloConfigInsert')[0].value.replaceAll(",", ".")
  var Tipo_Cel = $('#inputTipo_CelModuloConfigInsert')[0].value
  var Tecnologia = $('#inputTecnologiaModuloConfigInsert')[0].value
  var Peca = $('#inputPecaModuloConfigInsert')[0].value
  var Vmp = $('#inputVmpModuloConfigInsert')[0].value
  var Imp = $('#inputImpModuloConfigInsert')[0].value
  var Voc = $('#inputVocModuloConfigInsert')[0].value
  var Isc = $('#inputIscModuloConfigInsert')[0].value
  var Eficiencia = $('#inputEficienciaModuloConfigInsert')[0].value
  var TPmax = $('#inputTPmaxModuloConfigInsert')[0].value
  var TVoc = $('#inputTVocModuloConfigInsert')[0].value
  var TIsc = $('#inputTIscModuloConfigInsert')[0].value
  var AreaOcupada = $('#inputAreaOcupadaModuloConfigInsert')[0].value
  var Peso = $('#inputPesoModuloConfigInsert')[0].value
  var Espessura = $('#inputEspessuraModuloConfigInsert')[0].value.replaceAll(",", ".")
  var Largura = $('#inputLarguraModuloConfigInsert')[0].value.replaceAll(",", ".")
  var Altura = $('#inputAlturaModuloConfigInsert')[0].value.replaceAll(",", ".")

  var query = `${Fabricante};${Potencia};${Tipo_Cel};${Tecnologia};${Peca};${Vmp};${Imp};${Voc};${Isc};${Eficiencia};${TPmax};${TVoc};${TIsc};${AreaOcupada};${Peso};${Espessura};${Largura};${Altura};`
  const data = await fetchPost('/moduloInsert?name=' + query)
  if (data == 'existe') {
    alert("ERRO: MÓDULO JÁ ESTÁ CADASTRADO!")
  } else {
    alert("MÓDULO CADASTRADO COM SUCESSO!")
  }
}
// Atualizar dados de modulo
async function atualizaModulo() {
  var Fabricante = $('#inputFabricanteModuloConfigEdit')[0].value
  var Potencia = $('#inputPotenciaModuloConfigEdit')[0].value.replaceAll(",", ".")
  var Tipo_Cel = $('#inputTipo_CelModuloConfigEdit')[0].value
  var Tecnologia = $('#inputTecnologiaModuloConfigEdit')[0].value
  var Peca = $('#inputPecaModuloConfigEdit')[0].value
  var Vmp = $('#inputVmpModuloConfigEdit')[0].value
  var Imp = $('#inputImpModuloConfigEdit')[0].value
  var Voc = $('#inputVocModuloConfigEdit')[0].value
  var Isc = $('#inputIscModuloConfigEdit')[0].value
  var Eficiencia = $('#inputEficienciaModuloConfigEdit')[0].value
  var TPmax = $('#inputTPmaxModuloConfigEdit')[0].value
  var TVoc = $('#inputTVocModuloConfigEdit')[0].value
  var TIsc = $('#inputTIscModuloConfigEdit')[0].value
  var AreaOcupada = $('#inputAreaOcupadaModuloConfigEdit')[0].value
  var Peso = $('#inputPesoModuloConfigEdit')[0].value
  var Espessura = $('#inputEspessuraModuloConfigEdit')[0].value.replaceAll(",", ".")
  var Largura = $('#inputLarguraModuloConfigEdit')[0].value.replaceAll(",", ".")
  var Altura = $('#inputAlturaModuloConfigEdit')[0].value.replaceAll(",", ".")

  var query = `${Fabricante};${Potencia};${Tipo_Cel};${Tecnologia};${Peca};${Vmp};${Imp};${Voc};${Isc};${Eficiencia};${TPmax};${TVoc};${TIsc};${AreaOcupada};${Peso};${Espessura};${Largura};${Altura};`
  const data = await fetchPost('/moduloUpdate?name=' + query)
  if (data == 'nexiste') {
    alert("ERRO: MÓDULO NÃO ESTÁ CADASTRADO!")
  } else {
    //DADOS DE TARIFA FIOB
    alert("MÓDULO ATUALIZADO COM SUCESSO!")
  }
}


// Inserir novo vendedor
async function insereFornecedor() {
  var nome = document.getElementById(`inputFornNomeInsere`).value
  var porcentagem = document.getElementById(`inputFornPorcentagemInsere`).value
  var query = `${nome};${porcentagem}`
  const data = await fetchPost('/fornecedorInsert?name=' + query)
  if (data == 'existe') {
    alert("ERRO: FORNECEDOR JÁ ESTÁ CADASTRADO!")
  } else {
    //DADOS DE VENDEDOR
    var dataFornecedor = await fetchGet("/getFornecedor")
    dataFornecedor.forEach(function (item) {
      if (optionsfornecedor.indexOf(item["nome"]) == -1) {
        optionsfornecedor += `<option value= "${item["nome"]}">${item["nome"]}</option>`;
      }
    });
    document.getElementById("inputFornOrcaList").innerHTML = optionsfornecedor
    document.getElementById("inputFornNomeEditarList").innerHTML = optionsfornecedor
    alert("FORNECEDOR CADASTRADO COM SUCESSO!")
  }
}
// Atualizar dados de vendedor
async function atualizaFornecedor() {
  var nome = document.getElementById(`inputFornNomeEditar`).value
  var porcentagem = document.getElementById(`inputFornPorcentagemEditar`).value
  var query = `${nome};${porcentagem}`
  const data = await fetchPost('/fornecedorUpdate?name=' + query)
  if (data == 'nexiste') {
    alert("ERRO: FORNECEDOR NÃO ESTÁ CADASTRADO!")
  } else {
    //DADOS DE VENDEDOR
    var dataFornecedor = await fetchGet("/getFornecedor")
    dataFornecedor.forEach(function (item) {
      if (optionsfornecedor.indexOf(item["nome"]) == -1) {
        optionsfornecedor += `<option value= "${item["nome"]}">${item["nome"]}</option>`;
      }
    });
    document.getElementById("inputFornOrcaList").innerHTML = optionsfornecedor
    document.getElementById("inputFornNomeEditarList").innerHTML = optionsfornecedor
    alert("FORNECEDOR ATUALIZADO COM SUCESSO!")
  }
}


// Buscar dados de Modulos
async function buscaModulo() {
  var peca = $('#inputPecaModuloConfigEdit')[0].value
  var mldGetData = `/mdlDataPeca?name=${peca}`
  const dataMdlPeca = await fetchGet(mldGetData)
  await fillMdlData('ConfigEdit', dataMdlPeca)
}
// Buscar dados de Inversores
async function buscaInversor() {
  var peca = $('#inputPecaInversorConfigEdit')[0].value
  var invGetData = `/invDataPeca?name=${peca}`
  const dataInvPeca = await fetchGet(invGetData)
  await fillInvData('ConfigEdit', dataInvPeca)
}
// Buscar dados de Vendedor
async function buscaVendedor() {
  var peca = $('#inputVendedorEditar')[0].value
  var vendedorGetData = `/vendedorEditar?name=${peca}`
  const dataVendedor = await fetchGet(vendedorGetData)
  document.getElementById('inputVendedorTelefoneEditar').value = dataVendedor[0].telefone
  document.getElementById('inputVendedorEmailEditar').value = dataVendedor[0].email
}
// Buscar dados de Tarifa Fio B
async function buscaTarifaFioB() {
  var peca = $('#inputDistribuidoraTarifaFioBEditar')[0].value
  var fiobGetData = `/tarifaFioBEditar?name=${peca}`
  const dataFioB = await fetchGet(fiobGetData)
  document.getElementById(`inputEstadoTarifaFioBEditar`).value = dataFioB[0].estado
  document.getElementById(`inputTusdTarifaFioBEditar`).value = dataFioB[0].tusd_fiob
}
// Buscar dados de Tarifa B3
async function buscaTarifaB3() {
  var peca = $('#inputDistribuidoraTarifaB3Editar')[0].value
  var b3GetData = `/tarifaB3Editar?name=${peca}`
  const dataB3 = await fetchGet(b3GetData)
  document.getElementById(`inputEstadoTarifaB3Editar`).value = dataB3[0].estado
  document.getElementById(`inputTusdTarifaB3Editar`).value = dataB3[0].tusd
  document.getElementById(`inputTeTarifaB3Editar`).value = dataB3[0].te
  document.getElementById(`inputSImpostoTarifaB3Editar`).value = dataB3[0].s_imposto
}
// Buscar dados de Tarifa B3
async function buscaFornecedor() {
  var peca = $('#inputFornNomeEditar')[0].value
  var fornGetData = `/fornecedorEditar?name=${peca}`
  const dataforn = await fetchGet(fornGetData)
  document.getElementById(`inputFornPorcentagemEditar`).value = dataforn[0].porcentagem
}

// BUSCACLIENTE ESTÁ EM OUTRA FUNÇÃO
//#endregion
$('.onlyDot').on('input', function (e) {
  this.value = this.value.replaceAll(',', '.');
  this.value = this.value
    .replace(/[^0-9.,]/g, '')
    .replace(/(\..?)\../g, '$1')
    .replace(/^0[^.]/, '0')
});

async function buscaCep() {
  try {
    var cep = $('#inputCepConfigInsert')[0].value
    const data = await fetchGet(`https://viacep.com.br/ws/${cep}/json/`)
    if (data.erro) {
      alert('DIGITE UM CEP VÁLIDO')
      return
    }
    var bairro = data.bairro
    var cidade = data.localidade
    var rua = data.logradouro
    var estado = data.uf
    $('#inputEstadoConfigInsert')[0].value = estado
    $('#inputCidadeConfigInsert')[0].value = cidade
    $('#inputRuaConfigInsert')[0].value = rua
    $('#inputBairroConfigInsert')[0].value = bairro
  } catch (e) {
    alert('DIGITE UM CEP VÁLIDO')
  }
}

var dataIrr = 0
// Dados de Latitude e Longitude
async function getLocation() {
  var rua = document.getElementById('inputRuaDadoTec').value
  var numero = document.getElementById('inputNumeroDadoTec').value
  var bairro = document.getElementById('inputBairroDadoTec').value
  var endereco = rua + " " + numero + " " + bairro
  var address = '/lat_lon?name=' + endereco
  const data = JSON.parse(await fetchGet(address))
  // var data = await httpGet("/lat_lon")
  document.getElementById("inputLatitudeDadoTec").value = data.lat
  document.getElementById("inputLatitudeOngDadoTec").value = Math.abs(parseFloat(data.lat)) - 5
  document.getElementById("inputLatitudeIntDadoTec").value = `${Math.abs(Math.ceil(data.lat))}`
  document.getElementById("inputLongitudeDadoTec").value = data.lng
  var address = `/irradiationLat_Lon?name=${data.lat};${data.lng}`
  dataIrr = await fetchGet(address)
  await loadTableData(dataIrr, "bodyIrradiacao")
  hsp = parseFloat(dataIrr[0].annual) / 1000
  document.getElementById('inputHSPDadoTec').value = parseFloat(dataIrr[0].annual) / 1000
  document.getElementById('inputHSPCalculo').value = parseFloat(dataIrr[0].annual) / 1000
  await geracaoConsumo()
}
async function getVendedor() {
  var nome = $('#inputVendedor')[0].value
  if (nome != '') {
    var data = await fetchGet(`/vendedoresData?name=${nome}`)
    var email = data[0].email
    var telefone = data[0].telefone
    $('#inputVendedorTelefone')[0].value = telefone
    $('#inputVendedorEmail')[0].value = email
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
var userConnected
var optionsUsers = '`<option selected disabled value= "...">...</option>`'
var optionsProject = ''
var optionsfornecedor = `<option selected disabled value= "...">...</option>`
// Ao abrir a página, carrega os clientes do banco de dados
async function onLoad() {
  userConnected = await fetchGet("/loginVerifyResult")
  if (userConnected == 'false') {
    window.location.replace("/")
  } else {
    var userRole1 = await fetchGet(`/getRole?name=${userConnected}`)
    console.log(userRole1.rows[0].role)
    userRole = userRole1.rows[0].role
    await disabledUser(userRole)
    var users = await fetchGet(`/getUser`)
    users.forEach(function (item) {
      if (optionsUsers.indexOf(item["email"]) == -1) {
        optionsUsers += `<option value= "${item["email"]}">${item["email"]}</option>`;
      }
    })
    document.getElementById("inputEmailUserEdit").innerHTML = optionsUsers
  }

  //DADOS DE PROJETO
  var dataFornecedor = await fetchGet('/getFornecedor')
  dataFornecedor.forEach(function (item) {
    if (optionsfornecedor.indexOf(item["nome"]) == -1) {
      optionsfornecedor += '<option value="' + item["nome"] + '" />';
    }
  })

  //DADOS DE PROJETO
  var dataProjeto = await fetchGet('/getProject')
  dataProjeto.forEach(function (item) {
    if (optionsProject.indexOf(item["projectname"]) == -1) {
      optionsProject += '<option value="' + item["projectname"] + '" />';
    }
  })

  //DADOS DE VENDEDORES
  var data = await fetchGet("/vendedores")
  console.log(data)
  data.forEach(function (item) {
    if (optionsVendedores.indexOf(item["nome"]) == -1) {
      optionsVendedores += `<option value= "${item["nome"]}">${item["nome"]}</option>`;
    }
  });
  //DADOS DE CLIENTES
  var data = await fetchGet("/cliente")
  data.forEach(function (item) {
    if (optionsClient.indexOf(item["cliente"]) == -1) {
      optionsClient += '<option value="' + item["cliente"] + '" />';
    }
  });
  //DADOS DE DISTRIBUIDORAS
  var distribuidora = await fetchGet("/distribuidoraData")
  distribuidora.forEach(function (item) {
    if (optionsDistribuidora.indexOf(item["distribuidora"]) == -1) {
      optionsDistribuidora += '<option value="' + item["distribuidora"] + '" />';
    }
  });
  
  document.getElementById("inputFornOrcaList").innerHTML = optionsfornecedor
  document.getElementById("inputFornNomeEditarList").innerHTML = optionsfornecedor

  document.getElementById("projectDataList").innerHTML = optionsProject
  document.getElementById("inputVendedor").innerHTML = optionsVendedores
  document.getElementById("inputVendedorEditarList").innerHTML = optionsVendedores
  document.getElementById("inputClienteList").innerHTML = optionsClient
  document.getElementById("inputClienteListConfigEdit").innerHTML = optionsClient
  document.getElementById("inputDistribuidoraListConfigInsert").innerHTML = optionsDistribuidora
  document.getElementById("inputDistribuidoraListConfigEdit").innerHTML = optionsDistribuidora
  document.getElementById("inputDistribuidoraTarifaB3EditarList").innerHTML = optionsDistribuidora
  document.getElementById("inputDistribuidoraTarifaFioBEditarList").innerHTML = optionsDistribuidora

  //DADOS DE MÓDULOS
  var mldGetData = '/mdlData'
  const dataMdl = await fetchGet(mldGetData)
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
  const dataInv = await fetchGet(mldGetData)
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
  const greenerDados = await fetchGet(greenerQuery)
  for (let i = 0; i < greenerDados.length; i++) {
    greenerData[greenerDados[i]['name']] = await valNum(greenerDados[i]['value'])
  }
  await fillGreener()
}
async function onChangeForn(valor){
  var fornGetData = `/fornecedorEditar?name=${valor}`
  const dataforn = await fetchGet(fornGetData)
  document.getElementById(`inputPorcentagemFornOrca`).value = dataforn[0].porcentagem

  inputPorcentagemFornOrca
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
    $('#inputEficienciaModulo')[0].value = await valNum(dataMdlPeca[0].eficiencia) * 100
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
    areaMdl = await valNum(dataMdlPeca[0].area)
    pesoMdl = await valNum(dataMdlPeca[0].peso)
    tipoMdl = dataMdlPeca[0].celulas
    estiloMdl = dataMdlPeca[0].estilo
    eficienciaMdl = await valNum(dataMdlPeca[0].eficiencia) * 100
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
    $('#inputEficienciaModuloConfigEdit')[0].value = await valNum(dataMdlPeca[0].eficiencia) * 100
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
var tipoMdl = ''
var estiloMdl = ''
var eficienciaMdl = 0
var areaMdl = 0
var pesoMdl = 0
var tpmax = 0
var tvoc = 0
var tisc = 0
var pmax = 0
var voc = 0
var isc = 0
var pmaxCorr = 0
var vocCorr = 0
var iscCorr = 0
var imp = 0
var vmp = 0
var fornecedorMdl = 0
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
var eficienciaInv = 0
var tensaoCCinversor = 0
var maxTensaoCCinversor = 0
var maxCorrenteCCinversor = 0
var maxCorrenteCAinvesor = 0
var fornecedorInv = 0
var potenciaInv = 0
var mpptInversor = 0
var faseInversor = 0
var faixaInversor = 0
// PREENCHER OS INPUTS DE INVERSOR
async function fillInvData(option, dataInvPeca) {
  if (option == 'FILL') {
    $('#inputFaixaMPPTInversor')[0].value = dataInvPeca[0].faixamppt
    $('#inputTensaoCCInversor')[0].value = dataInvPeca[0].tenspart
    $('#inputMaxTensaoCCInversor')[0].value = dataInvPeca[0].maxtens
    $('#inputEficienciaInversor')[0].value = (await valNum(dataInvPeca[0].eficiencia) * 100)
    $('#inputFaixaTensaoInversor')[0].value = dataInvPeca[0].faixatens
    $('#inputCorrenteMaxCCInversor')[0].value = dataInvPeca[0].entradaimp
    $('#inputCorrenteMaxCAInversor')[0].value = dataInvPeca[0].correntesaída
    tensaoCCinversor = await valNum(dataInvPeca[0].tenspart)
    eficienciaInv = await valNum(dataInvPeca[0].eficiencia)
    maxTensaoCCinversor = await valNum(dataInvPeca[0].maxtens)
    maxCorrenteCCinversor = await valNum(dataInvPeca[0].entradaimp)
    maxCorrenteCAinvesor = await valNum(dataInvPeca[0].correntesaída)
    fornecedorInv = dataInvPeca[0].fornecedor

    mpptInversor = dataInvPeca[0].mppt
    faseInversor = dataInvPeca[0].conexaoca
    faixaInversor = dataInvPeca[0].faixatens
    $('#inputFabriInvOrca')[0].value = fornecedorInv
    potenciaInv = await valNum(dataInvPeca[0].potnomi)
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
    $('#inputFasesInversorConfigEdit')[0].value = dataInvPeca[0].conexaoca
    $('#inputStringsInversorConfigEdit')[0].value = dataInvPeca[0].mppt
    $('#inputTipoInversorConfigEdit')[0].value = dataInvPeca[0].tipo
    $('#inputPotenciaInversorConfigEdit')[0].value = dataInvPeca[0].potnomi
    $('#inputFaixaMPPTInversorConfigEdit')[0].value = dataInvPeca[0].faixamppt
    $('#inputTensaoCCInversorConfigEdit')[0].value = dataInvPeca[0].tenspart
    $('#inputMaxTensaoCCInversorConfigEdit')[0].value = dataInvPeca[0].maxtens
    $('#inputEficienciaInversorConfigEdit')[0].value = dataInvPeca[0].eficiencia
    $('#inputFaixaTensaoInversorConfigEdit')[0].value = dataInvPeca[0].faixatens
    $('#inputCorrenteMaxCCInversorConfigEdit')[0].value = dataInvPeca[0].entradaimp
    $('#inputCorrenteMaxCAInversorConfigEdit')[0].value = dataInvPeca[0].correntesaída
    tensaoCCinversor = await valNum(dataInvPeca[0].tenspart)
    eficienciaInv = await valNum(dataInvPeca[0].eficiencia)
    maxTensaoCCinversor = await valNum(dataInvPeca[0].maxtens)
    maxCorrenteCCinversor = await valNum(dataInvPeca[0].entradaimp)
    maxCorrenteCAinvesor = await valNum(dataInvPeca[0].correntesaída)
    fornecedorInv = dataInvPeca[0].fornecedor
    potenciaInv = await valNum(dataInvPeca[0].potnomi)
  }

  await qtdeMdl()
  await protDimenCabos()
  await energiaInversor()

}
//#endregion

//#region MÉTODOS
async function fetchGet(url) {
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

async function fetchPost(url) {
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
    const dataMdlForn = await fetchGet(mldGetData)
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
    const dataMdlPote = await fetchGet(mldGetData)
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
    const dataMdlTipo = await fetchGet(mldGetData)
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
    const dataMdlTecn = await fetchGet(mldGetData)
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
    const dataMdlPeca = await fetchGet(mldGetData)

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
    const dataInvForn = await fetchGet(mldGetData)
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
    const dataInvFase = await fetchGet(mldGetData)
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
    const dataInvStri = await fetchGet(mldGetData)
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
    const dataInvTipo = await fetchGet(mldGetData)
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
    const dataInvPote = await fetchGet(mldGetData)
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
    const dataInvPeca = await fetchGet(invGetData)

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
var qtdMaxParal = 0
var qtdeMdlCalc = 0
var potTotalOrca = 0
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
  await resumoFill()
}
let element42 = document.getElementById('inputCorrenteDisjCACalculo')
let element43 = document.getElementById('inputDisjEscolhaCACalculo')
let element44 = document.getElementById('inpuCaboEscolhaCACalculo')
let element45 = document.getElementById('inputCorrenteMaxCAInversor')
let element46 = document.getElementById('inputImpModulo')
let element47 = document.getElementById('inputCorrenteNomiCCCalculo')
let element48 = document.getElementById('inputCaboEscolhaCCCalculo')
let element49 = document.getElementById('inpuFusivelCCCalculo')
var corrNomi = 0
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
  element18_1.value = ((emmDiario / hspFinal) / (eficienciaInv)).toFixed(2)
  console.log(emmDiario, hspFinal, eficienciaInv)
  potPicoReal = (emmDiario / hspFinal) / (eficienciaInv)
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
  fatorKdata = await fetchGet(`/fatorK?name=${element29.value};${element13.value}`)
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
  await resumoFill()
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


$("input").on('keypress', function (e) {
  var chr = String.fromCharCode(e.which);
  if ("%".indexOf(chr) != -1) {
    return false;
  }
}).on('input', function (e) {
  this.value = this.value.replaceAll("%", "")
});
var userRole = 'user'
async function disabledUser(userRole) {
  console.log(userRole)
  if (userRole == 'admin') {
    var listDisabled = [
      'erpConfig',
      'vendedoresConfig',
      'modulosConfig',
      'inversoresConfig',
      'fiobConfig',
      'b3Config',
      'usuariosConfig',
      'fornConfig'
    ]
    for (i = 0; i < listDisabled.length; i++) {
      var elemento = document.getElementById(listDisabled[i])
      elemento.classList.remove("disabled");
    }
  }
}

async function insereUsuario() {
  var Email = $('#inputEmailUser')[0].value
  var Senha = $('#inputSenhaUser')[0].value
  var Cargo = $('#inputCargoUser')[0].value
  if (Email != '' && Senha != '' && Cargo != '') {
    var r = await fetchGet(`/createUser?name=${Email};${Senha};${Cargo}`)
    console.log(r)
    if (r == true) {
      alert('USUÁRIO CADASTRADO')
    } else {
      alert('ERRO: PREENCHA UM EMAIL VÁLIDO E QUE NÃO ESTEJA CADASTRADO!')
    }
  } else {
    alert('POR FAVOR, PREENCHA OS DADOS CORRETAMENTE')
  }
}
async function atualizaUsuario() {
  var Email = $('#inputEmailUserEdit')[0].value
  var Cargo = $('#inputCargoUserEdit')[0].value
  var r = await fetchGet(`/updateUser?name=${Email};${Cargo}`)
  if (r) {
    alert('CARGO ATUALIZADO')
  } else {
    alert(r)
  }
}

async function getRole(valor) {
  var userRole1 = await fetchGet(`/getRole?name=${valor}`)
  userRole = userRole1.rows[0].role
  $('#inputCargoUserEdit')[0].value = userRole
}

async function deslogar() {
  var r = await fetchGet(`/loginVerify`)
  window.location.replace("/")
}

async function salvarProposta() {
  //ERP
  var Cliente = $('#inputCliente')[0].value //CLIENTE  
  if (Cliente != '') {
    var Vendedor = $('#inputVendedor')[0].value //VENDEDOR 
    var Ano = $('#inputAno')[0].value //ANO 
    var RuaDadoTec = $('#inputRuaDadoTec')[0].value //RUA
    var NumeroDadoTec = $('#inputNumeroDadoTec')[0].value //NUMERO
    var BairroDadoTec = $('#inputBairroDadoTec')[0].value //BAIRRO
    var TipoTelhaDadoTec = $('#inputTipoTelhaDadoTec')[0].value //TIPO DE TELHADO
    var AngTelhaDadoTec = $('#inputAngTelhaDadoTec')[0].value //ANG. DO TELHADO
    var PosicionamentoDadoTec = $('#inputPosicionamentoDadoTec')[0].value //POSICIONAMENTO
    //------
    var PecaModulo = $('#inputPecaModulo')[0].value //PEÇA MÓDULO
    var TempMediaModulo = $('#inputTempMediaModulo')[0].value //TEMPERATURA MÉDIA LOCAL
    var Sujeira = $('#inputSujeira')[0].value //SUJEIRA
    var DegraAnual = $('#inputDegraAnual')[0].value //DEGRADAÇÃO ANUAL
    //------
    var PecaInversor = $('#inputPecaInversor')[0].value //PEÇA INVERSOR
    var QtdeInversor = $('#inputQtdeInversor')[0].value //QUANTIDADE INVERSOR
    //------
    var JanConsumo = $('#inputJanConsumo')[0].value //JANEIRO
    var FevConsumo = $('#inputFevConsumo')[0].value //FEVEREIRO
    var MarConsumo = $('#inputMarConsumo')[0].value //MARÇO
    var AbrConsumo = $('#inputAbrConsumo')[0].value //ABRIL
    var MaiConsumo = $('#inputMaiConsumo')[0].value //MAIO
    var JunConsumo = $('#inputJunConsumo')[0].value //JUNHO
    var JulConsumo = $('#inputJulConsumo')[0].value //JULHO
    var AgoConsumo = $('#inputAgoConsumo')[0].value //AGOSTO
    var SetConsumo = $('#inputSetConsumo')[0].value //SETEMBRO
    var OutConsumo = $('#inputOutConsumo')[0].value //OUTUBRO
    var NovConsumo = $('#inputNovConsumo')[0].value //NOVEMBRO
    var DezConsumo = $('#inputDezConsumo')[0].value //DEZEMBRO
    var AddConsumo = $('#inputAddConsumo')[0].value //ADIÇÃO
    //------
    //------
    //ORÇAMENTO
    //------
    var PorcentagemFornOrca = $('#inputPorcentagemFornOrca')[0].value //PORCENTAGEM FORNECEDOR
    //------
    var MatFotovOrca = $('#inputMatFotovOrca')[0].value //MATERIAL FOTOVOLTAICO
    var PainelProtOrca = $('#inputPainelProtOrca')[0].value //PAINEL DE PROTEÇÃO CA
    var StringBoxOrca = $('#inputStringBoxOrca')[0].value //STRING BOX CC
    var MaterialCaOrca = $('#inputMaterialCaOrca')[0].value //MATERIAL CA
    var EstruCobertOrca = $('#inputEstruCobertOrca')[0].value //ESTRUTURA COBERTURA
    var EletrodutoOrca = $('#inputEletrodutoOrca')[0].value //ELETRODUTO
    var AterramentoOrca = $('#inputAterramentoOrca')[0].value //ATERRAMENTO
    var CustoViagemOrca = $('#inputCustoViagemOrca')[0].value //CUSTO VIAGEM
    var LucroOrca = $('#inputLucroOrca')[0].value //LUCRO
    var ComissaoOrca = $('#inputComissaoOrca')[0].value //COMISSÃO
    var ImpostoOrca = $('#inputImpostoOrca')[0].value //IMPOSTO
    var FornOrca = $('#inputFornOrca')[0].value //FORNECEDOR
    //------
    var DescontoOrcaFinal = $('#inputDescontoOrcaFinal')[0].value //DESCONTO
    //------
    var InflacaoEletricaFluxo = $('#inputInflacaoEletricaFluxo')[0].value //INFLAÇÃO DA ENERGIA ELÉTRICA (%)
    //------
    //TAXAS DE JUROS AO MES
    var JurosMesFinanciamento1 = $('#inputJurosMesFinanciamento1')[0].value //TAXA JUROS AO MES 1
    var JurosMesFinanciamento12 = $('#inputJurosMesFinanciamento12')[0].value //TAXA JUROS AO MES 12
    var JurosMesFinanciamento48 = $('#inputJurosMesFinanciamento48')[0].value //TAXA JUROS AO MES 48
    var JurosMesFinanciamento60 = $('#inputJurosMesFinanciamento60')[0].value //TAXA JUROS AO MES 60
    var JurosMesFinanciamento120 = $('#inputJurosMesFinanciamento120')[0].value //TAXA JUROS AO MES 120
    var JurosMesFinanciamento150 = $('#inputJurosMesFinanciamento150')[0].value //TAXA JUROS AO MES 150

    var projectName = `PMC_${Number(potTotalOrca).toFixed(2)}_${Cliente}`

    var query = `${projectName};${Cliente};${Vendedor};${Ano};${RuaDadoTec};${NumeroDadoTec};${BairroDadoTec};${TipoTelhaDadoTec};${AngTelhaDadoTec};${PosicionamentoDadoTec};${PecaModulo};${TempMediaModulo};${Sujeira};${DegraAnual};${PecaInversor};${QtdeInversor};${JanConsumo};${FevConsumo};${MarConsumo};${AbrConsumo};${MaiConsumo};${JunConsumo};${JulConsumo};${AgoConsumo};${SetConsumo};${OutConsumo};${NovConsumo};${DezConsumo};${AddConsumo};${PorcentagemFornOrca};${MatFotovOrca};${PainelProtOrca};${StringBoxOrca};${MaterialCaOrca};${EstruCobertOrca};${EletrodutoOrca};${CustoViagemOrca};${LucroOrca};${ComissaoOrca};${ImpostoOrca};${FornOrca};${DescontoOrcaFinal};${InflacaoEletricaFluxo};${JurosMesFinanciamento1};${JurosMesFinanciamento12};${JurosMesFinanciamento48};${JurosMesFinanciamento60};${JurosMesFinanciamento120};${JurosMesFinanciamento150};${AterramentoOrca}`
    var r = await fetchPost(`/saveErp?name=${query}`)
    console.log(r)
    if (r == 'updated') {
      alert('PROPOSTA ATUALIZADA!')
    } else if (r == 'inserted') {
      alert('PROPOSTA INSERIDA!')
    } else {
      alert('ERROR: ' + r)
    }
  } else {
    alert('SELECIONE AO MENOS O CLIENTE PARA SALVAR A PROPOSTA!')
  }
}

async function openProject() {
  var selected_Project = $('#projectData')[0].value
  var r = await fetchGet(`/getProjectData?name=${selected_Project}`)
  console.log(r)
  var projectname = r[0].projectname
  var cliente = r[0].cliente
  var vendedor = r[0].vendedor
  var ano = r[0].ano
  var rua = r[0].rua
  var numero = r[0].numero
  var bairro = r[0].bairro
  var tipo_telhado = r[0].tipo_telhado
  var ang_telhado = r[0].ang_telhado
  var posicionamento = r[0].posicionamento
  var pecamdl = r[0].pecamdl
  var temp_mdl = r[0].temp_mdl
  var sujeira = r[0].sujeira
  var degra_anual = r[0].degra_anual
  var pecainv = r[0].pecainv
  var qtdeinv = r[0].qtdeinv
  var jan_consumo = r[0].jan_consumo
  var fev_consumo = r[0].fev_consumo
  var mar_consumo = r[0].mar_consumo
  var abr_consumo = r[0].abr_consumo
  var mai_consumo = r[0].mai_consumo
  var jun_consumo = r[0].jun_consumo
  var jul_consumo = r[0].jul_consumo
  var ago_consumo = r[0].ago_consumo
  var set_consumo = r[0].set_consumo
  var out_consumo = r[0].out_consumo
  var nov_consumo = r[0].nov_consumo
  var dez_consumo = r[0].dez_consumo
  var add_consumo = r[0].add_consumo
  var porcentagem_forn = r[0].porcentagem_forn
  var mat_fotov = r[0].mat_fotov
  var painel_prot = r[0].painel_prot
  var string_box = r[0].string_box
  var material_ca = r[0].material_ca
  var estrutura_cob = r[0].estrutura_cob
  var eletroduto = r[0].eletroduto
  var custo_viagem = r[0].custo_viagem
  var lucro = r[0].lucro
  var comissao = r[0].comissao
  var imposto = r[0].imposto
  var fornecedor_orca = r[0].fornecedor_orca
  var desconto = r[0].desconto
  var inflacao_eletrica = r[0].inflacao_eletrica
  var juros_1 = r[0].juros_1
  var juros_12 = r[0].juros_12
  var juros_48 = r[0].juros_48
  var juros_60 = r[0].juros_60
  var juros_120 = r[0].juros_120
  var juros_150 = r[0].juros_150
  var aterramento = r[0].aterramento

  $('#inputCliente')[0].value = r[0].cliente
  $('#inputVendedor')[0].value = r[0].vendedor
  $('#inputAno')[0].value = r[0].ano
  $('#inputRuaDadoTec')[0].value = r[0].rua
  $('#inputNumeroDadoTec')[0].value = r[0].numero
  $('#inputBairroDadoTec')[0].value = r[0].bairro
  $('#inputTipoTelhaDadoTec')[0].value = r[0].tipo_telhado
  $('#inputAngTelhaDadoTec')[0].value = r[0].ang_telhado
  $('#inputPosicionamentoDadoTec')[0].value = r[0].posicionamento
  $('#inputPecaModulo')[0].value = r[0].pecamdl
  $('#inputTempMediaModulo')[0].value = r[0].temp_mdl
  $('#inputSujeira')[0].value = r[0].sujeira
  $('#inputDegraAnual')[0].value = r[0].degra_anual
  $('#inputPecaInversor')[0].value = r[0].pecainv
  $('#inputQtdeInversor')[0].value = r[0].qtdeinv
  $('#inputJanConsumo')[0].value = r[0].jan_consumo
  $('#inputFevConsumo')[0].value = r[0].fev_consumo
  $('#inputMarConsumo')[0].value = r[0].mar_consumo
  $('#inputAbrConsumo')[0].value = r[0].abr_consumo
  $('#inputMaiConsumo')[0].value = r[0].mai_consumo
  $('#inputJunConsumo')[0].value = r[0].jun_consumo
  $('#inputJulConsumo')[0].value = r[0].jul_consumo
  $('#inputAgoConsumo')[0].value = r[0].ago_consumo
  $('#inputSetConsumo')[0].value = r[0].set_consumo
  $('#inputOutConsumo')[0].value = r[0].out_consumo
  $('#inputNovConsumo')[0].value = r[0].nov_consumo
  $('#inputDezConsumo')[0].value = r[0].dez_consumo
  $('#inputAddConsumo')[0].value = r[0].add_consumo
  $('#inputPorcentagemFornOrca')[0].value = r[0].porcentagem_forn
  $('#inputMatFotovOrca')[0].value = r[0].mat_fotov
  $('#inputPainelProtOrca')[0].value = r[0].painel_prot
  $('#inputStringBoxOrca')[0].value = r[0].string_box
  $('#inputMaterialCaOrca')[0].value = r[0].material_ca
  $('#inputEstruCobertOrca')[0].value = r[0].estrutura_cob
  $('#inputEletrodutoOrca')[0].value = r[0].eletroduto
  $('#inputAterramentoOrca')[0].value = r[0].aterramento
  $('#inputCustoViagemOrca')[0].value = r[0].custo_viagem
  $('#inputLucroOrca')[0].value = r[0].lucro
  $('#inputComissaoOrca')[0].value = r[0].comissao
  $('#inputImpostoOrca')[0].value = r[0].imposto
  $('#inputFornOrca')[0].value = r[0].fornecedor_orca
  $('#inputDescontoOrcaFinal')[0].value = r[0].desconto
  $('#inputInflacaoEletricaFluxo')[0].value = r[0].inflacao_eletrica
  $('#inputJurosMesFinanciamento1')[0].value = r[0].juros_1
  $('#inputJurosMesFinanciamento12')[0].value = r[0].juros_12
  $('#inputJurosMesFinanciamento48')[0].value = r[0].juros_48
  $('#inputJurosMesFinanciamento60')[0].value = r[0].juros_60
  $('#inputJurosMesFinanciamento120')[0].value = r[0].juros_120
  $('#inputJurosMesFinanciamento150')[0].value = r[0].juros_150

  $('#inputQuantInvCalculo')[0].value = r[0].qtdeinv
  await buscaCliente('')
  await getLocation()
  await getVendedor()
  var listInput2 = [
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
    'inputDezConsumo'
  ]
  var listConsumo2 = [
    r[0].jan_consumo,
    r[0].fev_consumo,
    r[0].mar_consumo,
    r[0].abr_consumo,
    r[0].mai_consumo,
    r[0].jun_consumo,
    r[0].jul_consumo,
    r[0].ago_consumo,
    r[0].set_consumo,
    r[0].out_consumo,
    r[0].nov_consumo,
    r[0].dez_consumo
  ]
  for (let i = 0; i < listInput2.length; i++) {
    itemsConsumo[listInput2[i]] = parseFloat(listConsumo2[i])
  }
  await sumItems('function', 123)
  var mldGetData = `/mdlDataPeca?name=${r[0].pecamdl}`
  const dataMdlPeca = await fetchGet(mldGetData)
  element1.value = dataMdlPeca[0].fornecedor
  element2.value = dataMdlPeca[0].pmax
  element3.value = dataMdlPeca[0].celulas
  element4.value = dataMdlPeca[0].estilo
  await fillMdlData('FILL', dataMdlPeca)
  fatorCorrecao('inputSujeira', r[0].sujeira)
  var invGetData = `/invDataPeca?name=${r[0].pecainv}`
  const dataInvPeca = await fetchGet(invGetData)
  element6.value = dataInvPeca[0].fornecedor
  element7.value = dataInvPeca[0].conexaoca
  element8.value = dataInvPeca[0].mppt
  element9.value = dataInvPeca[0].tipo
  element10.value = dataInvPeca[0].potnomi
  await fillInvData('FILL', dataInvPeca)
  await updateDataBegin()
  await getDataOrcaFinal()
  await descontoOrcaFinal();
  await fluxoCaixa()
  await valFinanciamento()
  await closeModal()
}