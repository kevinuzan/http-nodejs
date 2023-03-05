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
  console.log(data);
}

async function getLocation() {
  var rua = document.getElementById('inputRuaDadoTec').value
  var numero = document.getElementById('inputNumeroDadoTec').value
  var bairro = document.getElementById('inputBairroDadoTec').value
  var endereco = rua + " " + numero + " " + bairro
  var address = '/lat_lon?name=' + endereco
  const data = JSON.parse(await fecthGet(address))
  // var data = await httpGet("/lat_lon")
  console.log(data)
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
  console.log(dataMdl)
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

  await fillMdl('OLD')

  //DADOS DE INVERSORES

  var mldGetData = '/invData'
  const dataInv = await fecthGet(mldGetData)
  console.log(dataInv)
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
  await fillInv()
  document.getElementById('dadosModulo').style.display = 'none'
  document.getElementById('dadosInversor').style.display = 'none'
}

async function fillMdl(wish) {
  if (wish == 'OLD') {
    document.getElementById("inputFabricanteModuloList").innerHTML = optionsFornMdl
    document.getElementById("inputPotenciaModuloList").innerHTML = optionsPoteMdl
    document.getElementById("inputTipo_CelModuloList").innerHTML = optionsTipoMdl
    document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdl
    document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdl
  } else {
    document.getElementById("inputFabricanteModuloList").innerHTML = optionsFornMdlNew
    document.getElementById("inputPotenciaModuloList").innerHTML = optionsPoteMdlNew
    document.getElementById("inputTipo_CelModuloList").innerHTML = optionsTipoMdlNew
    document.getElementById("inputTecnologiaModuloList").innerHTML = optionsTecnMdlNew
    document.getElementById("inputPecaModuloList").innerHTML = optionsPecaMdlNew
  }
}

async function fillInv() {
  document.getElementById("inputFabricanteInversorList").innerHTML = optionsFornInv
  document.getElementById("inputFasesInversorList").innerHTML = optionsFaseInv
  document.getElementById("inputStringsInversorList").innerHTML = optionsStriInv
  document.getElementById("inputTipoInversorList").innerHTML = optionsInveInv
  document.getElementById("inputPotenciaInversorList").innerHTML = optionsPoteInv
  document.getElementById("inputPecaInversorList").innerHTML = optionsPecaInv
}

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

window.onload = async function (event) {
  await onLoad()
};

var element1 = document.getElementById("inputFabricanteModulo")
var element2 = document.getElementById("inputPotenciaModulo")
var element3 = document.getElementById("inputTipo_CelModulo")
var element4 = document.getElementById("inputTecnologiaModulo")
var element5 = document.getElementById("inputPecaModulo")

var element6 = document.getElementById("inputFabricanteInversor")
var element7 = document.getElementById("inputFasesInversor")
var element8 = document.getElementById("inputStringsInversor")
var element9 = document.getElementById("inputTipoInversor")
var element10 = document.getElementById("inputPotenciaInversor")
var element11 = document.getElementById("inputPecaInversor")

element1.addEventListener('change', async function () {
  console.log(element1.value)
  if (element1.value == '') {
    element2.value = ''
    element3.value = ''
    element4.value = ''
    element5.value = ''
    await fillMdl('OLD')
  } else {
    optionsFornMdlNew = ''
    optionsPoteMdlNew = ''
    optionsTipoMdlNew = ''
    optionsTecnMdlNew = ''
    optionsPecaMdlNew = ''
    var mldGetData = '/mdlDataForn?name=' + element1.value
    const dataMdlForn = await fecthGet(mldGetData)
    dataMdlForn.forEach(function (item) {
      if (optionsFornMdlNew.indexOf(item["fornecedor"]) == -1) {
        optionsFornMdlNew += '<option value="' + item["fornecedor"] + '" />';
      }
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
    await fillMdl('NEW')
  }
})
element2.addEventListener('change', async function () {

})
element3.addEventListener('change', async function () {

})
element4.addEventListener('change', async function () {

})
element5.addEventListener('change', async function () {

})
element6.addEventListener('change', async function () {

})
element7.addEventListener('change', async function () {

})
element8.addEventListener('change', async function () {

})
element9.addEventListener('change', async function () {

})
element10.addEventListener('change', async function () {

})
element11.addEventListener('change', async function () {

})