

async function teste() {
  document.getElementById("teste").value = "oi"
}

async function buscaCliente() {

  var data = await httpPost("/clienteData", query)
  console.log(data)
}

async function onLoad() {
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