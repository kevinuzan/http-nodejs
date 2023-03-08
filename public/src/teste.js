async function abrirpg2() {
  window.location.replace("/html/index_2.html")
}
async function abrirpg3() {
  window.location.replace("/html/index_3.html")
}
var messageError = ''
async function login() {
  var user = document.getElementById('loginUsername').value
  var pass = document.getElementById('loginPassword').value
  const login = await fecthGet(`/login?name=${user};${pass}`)
  console.log(login)
  if (login != true) {
    if (login.indexOf('invalid-email') != -1 || login.indexOf('wrong-password') != -1) {
      messageError = 'EMAIL E/OU SENHA INVÁLIDOS'
      alert(messageError)
    } else {
      alert(login)
    }
  } else {

    window.location.replace("/html/index_2.html")
  }
}

async function fecthGet(url) {
  const resp = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  });

  // Handle any errors please

  const data = await resp.json();
  return data
}

async function fecthPost(url) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    }
  });


  const data = await resp.json();
  return data
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