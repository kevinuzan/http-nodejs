
import path from '../../node_modules/path';
import { fileURLToPath } from '../../node_modules/url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


async function teste() {
  document.getElementById("teste").value = "oi"
}

// const path = require("path")

// const __dirname = path.dirname(filename);




async function abrirpg2() {
  window.location.replace(__dirname + '/html/index2.html')
}
