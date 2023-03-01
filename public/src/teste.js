import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function teste() {
  document.getElementById("teste").value = "oi"
}

async function abrirpg2() {
  window.location.replace('/html/index_2.html')
  console.log("oi")
}
