
async function resetPass(user) {
    const reset = await fecthGet(`/resetPass?name=${user}`)
    console.log(reset)
    if (reset == 1) {
        alert(`EMAIL ENVIADO PARA ${user}`)
        window.location.replace("/")
    } else {
        alert(`ERROR: ${reset}`)
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
