
import path from '/node_modules/path';
import { fileURLToPath } from '/node_modules/url';

import * as path from 'path'
import * as fileURLToPath from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
 

// const path = require("path")

// const __dirname = path.dirname(filename);

async function teste() {
  document.getElementById("teste").value = "oi"
}




async function abrirpg2() {
  window.location.replace('/html/index2.html')
  console.log("oi")
}
