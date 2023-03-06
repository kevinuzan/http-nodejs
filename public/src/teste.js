async function abrirpg2() {
  window.location.replace("/html/index_2.html")
}

function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.response;
}

function httpPost(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", theUrl, true); // false for synchronous request
  xmlHttp.send(null);
}

async function showPass() {
  var x = document.getElementById("loginPassword");
  var icon = document.getElementById('showPassIcon')
  if (x.type === "password") {
    x.type = "text";
    icon.classList.toggle('fa-eye-slash')
  } else {
    x.type = "password";
    icon.classList.toggle('fa-eye')
  }
}