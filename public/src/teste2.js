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


async function buscaCliente() {
  var nome = document.getElementById("inputCliente").value
  const data = await fecthPost('/clienteData?name=' + nome)
  // const resp = await fetch('/clienteData?name=' + nome, {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json",
  //   }
  // });

  // Handle any errors please

  // const data = await resp.json();

  document.getElementById("inputTelefone").value = data[0]["telefone"]
  document.getElementById("inputTelhado").value = data[0]["tipo_telhado"]
  document.getElementById("inputEstado").value = data[0]["estado"]
  document.getElementById("inputCidade").value = data[0]["cidade"]
  document.getElementById("inputRua").value = data[0]["rua"]
  document.getElementById("inputNumero").value = data[0]["numero"]
  document.getElementById("inputBairro").value = data[0]["bairro"]
  document.getElementById("inputCep").value = data[0]["cep"]
  document.getElementById("inputVendedor").value = data[0]["vendedor"]
  document.getElementById("inputDistribuidora").value = data[0]["distribuidora"]
  document.getElementById("inputIcms").value = data[0]["icms"]
  document.getElementById("inputPis").value = data[0]["pis"]
  document.getElementById("inputCofins").value = data[0]["cofins"]
  document.getElementById("inputPorcentagem").value = data[0]["porcentagem"]
  document.getElementById("inputArea").value = data[0]["area"]
  document.getElementById("inputConsumo").value = data[0]["consumo"]
  document.getElementById("inputTaxa").value = data[0]["taxa"]
  document.getElementById("inputIlumPub").value = data[0]["ilum_pub"]
  document.getElementById("inputUniCons").value = data[0]["unid_consid"]
  document.getElementById("inputBandeira").value = data[0]["bandeira"]


  document.getElementById('inputRuaDadoTec').value = data[0]["rua"]
  document.getElementById('inputNumeroDadoTec').value = data[0]["numero"]
  document.getElementById('inputBairroDadoTec').value = data[0]["bairro"]
}

async function getLocation() {
  var rua = document.getElementById('inputRuaDadoTec').value
  var numero = document.getElementById('inputNumeroDadoTec').value
  var bairro = document.getElementById('inputBairroDadoTec').value
  var endereco = rua + " " + numero + " " + bairro
  var address = '/lat_lon?name=' + endereco
  const data = JSON.parse(await fecthGet(address))
  // var data = await httpGet("/lat_lon")
  document.getElementById("inputLatitudeDadoTec").value = data.lat
  document.getElementById("inputLongitudeDadoTec").value = data.lng
}

async function onLoad() {
  //DADOS DE CLIENTES
  var data = await fecthGet("/cliente")
  data.forEach(function (item) {
    if (optionsClient.indexOf(item["cliente"]) == -1) {
      optionsClient += '<option value="' + item["cliente"] + '" />';
    }
  });
  document.getElementById("inputClienteList").innerHTML = optionsClient
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
  document.getElementById('dadosModulo').style.display = 'none'
  document.getElementById('dadosInversor').style.display = 'none'
}
//#region MÓDULOS
// PREENCHER AS DATALISTS DA PARTE DE MÓDULO
async function fillMdl(wish, option) {
  if (wish == 'OLD') {
    if (option == 'FORNECEDOR') {
      document.getElementById("inputFabricanteModuloList").innerHTML = optionsFornMdl
      document.getElementById("inputPotenciaModuloList").innerHTML = optionsPoteMdl
      document.getElementById("inputTipo_CelModuloList").innerHTML = optionsTipoMdl
      document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdl
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
  }
}
//#endregion

//#region INVERSORES
// PREENCHER AS DATALISTS DA PARTE DE INVERSOR
async function fillInv(wish, option) {
  if (wish == 'OLD') {
    if (option == 'FORNECEDOR') {
      document.getElementById("inputFabricanteInversorList").innerHTML = optionsFornInv
      document.getElementById("inputFasesInversorList").innerHTML = optionsFaseInv
      document.getElementById("inputStringsInversorList").innerHTML = optionsStriInv
      document.getElementById("inputTipoInversorList").innerHTML = optionsInveInv
      document.getElementById("inputPotenciaInversorList").innerHTML = optionsPoteInv
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
  } else if (option == 'CLEAR') {
    $('#inputFaixaMPPTInversor')[0].value = ''
    $('#inputTensaoCCInversor')[0].value = ''
    $('#inputMaxTensaoCCInversor')[0].value = ''
    $('#inputEficienciaInversor')[0].value = ''
    $('#inputFaixaTensaoInversor')[0].value = ''
    $('#inputCorrenteMaxCCInversor')[0].value = ''
    $('#inputCorrenteMaxCAInversor')[0].value = ''
    
  }
}
//#endregion

//#region MÉTODOS
async function fecthGet(url) {
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
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
      "Content-Type": "application/json",
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


async function calcMdlCorr() {

  inputPmaxCorrModulo
  inputVocCorrModulo
  inputIscCorrModulo
}


window.onload = async function (event) {
  await onLoad()
};
//#region MÓDULOS - FILTRO
var element1 = document.getElementById("inputFabricanteModulo")
var element2 = document.getElementById("inputPotenciaModulo")
var element3 = document.getElementById("inputTipo_CelModulo")
var element4 = document.getElementById("inputTecnologiaModulo")
var element5 = document.getElementById("inputPecaModulo")

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
var element6 = document.getElementById("inputFabricanteInversor")
var element7 = document.getElementById("inputFasesInversor")
var element8 = document.getElementById("inputStringsInversor")
var element9 = document.getElementById("inputTipoInversor")
var element10 = document.getElementById("inputPotenciaInversor")
var element11 = document.getElementById("inputPecaInversor")

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