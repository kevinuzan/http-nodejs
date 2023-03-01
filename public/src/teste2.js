

async function teste() {
  document.getElementById("teste").value = "oi"
}

async function buscaCliente() {
  var nome = document.getElementById("inputCliente").value
  const resp = await fetch('https://danig-budget.up.railway.app/clienteData?name=' + nome, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    }
  });

  // Handle any errors please

  const data = await resp.json();
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
  console.log(data);

  // var data = await httpPost("/clienteData", query)
  // console.log(data)
}


window.onload = async function (event) {
  await onLoad()
};

async function onLoad() {
  document.getElementById("inputCliente") = "Sasaki"
  var data = await httpGet("/cliente")
  console.log(data)
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