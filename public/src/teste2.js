

async function teste() {
  document.getElementById("teste").value = "oi"
}

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

async function getLocation(query) {
  var rua = document.getElementById('inputRuaDadoTec').value
  var numero = document.getElementById('inputNumeroDadoTec').value
  var bairro = document.getElementById('inputBairroDadoTec').value
  var endereco =  rua + " " + numero+ " " + bairro
  var address = '/lat_lon?name=' + endereco
  const data = await fecthGet(address)
  // var data = await httpGet("/lat_lon")
  console.log(data)
}

window.onload = async function (event) {
  await onLoad()
};
var optionsClient = ''
async function onLoad() {
  // const data = await fecthGet("/cliente")
  var data = await httpGet("/cliente")
  data = JSON.parse(data)
  console.log(data)
  data.forEach(function (item) {
    if (optionsClient.indexOf(item["cliente"]) == -1) {
      optionsClient += '<option value="' + item["cliente"] + '" />';
    }
  });
  document.getElementById("inputClienteList").innerHTML = optionsClient
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