

async function teste() {
  document.getElementById("teste").value = "oi"
}

async function buscaCliente() {
  var nome = document.getElementById("inputCliente")
  const resp = await fetch('https://danig-budget.up.railway.app/cliente?name=' + nome, {
    Method: 'POST',
    headers: {
      "Content-Type": "application/json",
    }
  });

  // Handle any errors please

  const data = await resp.json();

  console.log(data);

  // var data = await httpPost("/clienteData", query)
  // console.log(data)
}

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