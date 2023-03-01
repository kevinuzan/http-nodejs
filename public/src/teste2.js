

async function teste() {
  document.getElementById("teste").value = "oi"
}

async function buscaCliente() {
  var query = "SELECT CLIENTE FROM ERP ORDER BY CLIENTE ASC"
  var data = httpGet("/cliente", query)
  console.log(data)
}

function httpGet(theUrl, sendData)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( sendData );
    return xmlHttp.response;
}