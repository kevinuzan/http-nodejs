import { getPage } from "../../server.mjs"

async function teste() {
  document.getElementById("teste").value = "oi"
}

async function abrirpg2() {
  getPage('/public/html/index_2.html')
}
