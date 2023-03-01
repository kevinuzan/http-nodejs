

async function teste() {
  document.getElementById("teste").value = "oi"
}

async function buscaCliente() {
  var query = { query: "SELECT CLIENTE FROM ERP ORDER BY CLIENTE ASC" }
  var data = httpPost("/cliente", query)
  console.log(data)
}

function httpGet(theUrl, sendData) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(sendData);
  return xmlHttp.response;
}

function httpPost(theUrl, sendData) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", theUrl, true); // false for synchronous request
  xmlHttp.send(sendData);
  xmlHttp.setRequestHeader('Content-Type', 'application/json')
  return xmlHttp.response;
}