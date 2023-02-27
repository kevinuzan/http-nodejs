async function teste() {
  document.getElementById("teste").value = "oi"
}

const path = require("path")


const fileURLToPath =require('url')

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

async function abrirpg2() {
  window.location.replace(__dirname + '/html/index2.html')
}
