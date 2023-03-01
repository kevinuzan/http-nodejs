

async function teste() {
  document.getElementById("teste").value = "oi"
}

async function buscaCliente() {
  var query = "SELECT CLIENTE FROM ERP ORDER BY CLIENTE ASC"
  var data = await httpGet("/cliente", query)
  console.log(data)

  // var query = { query: "SELECT CLIENTE FROM ERP ORDER BY CLIENTE ASC" }
  // var myJsonString = JSON.stringify(query);
  // var data = await httpGet("/cliente", myJsonString)
  // console.log(data)
}

function httpGet(theUrl, sendData) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  // xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xmlHttp.send(sendData);
  return xmlHttp.response;
}

async function httpPost(theUrl, sendData) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", theUrl, true); // false for synchronous request
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  xmlHttp.send(sendData);
  return xmlHttp.response;
}