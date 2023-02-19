function cb_single(id) { //checkbox unicos (apenas um do mesmo tipo pode ser selecionado)
    clicked_cb = document.getElementById(id);//checkbox clicado
    var cbs = document.querySelectorAll(`[name="${clicked_cb.getAttribute('name')}"]`);//pegar o tipo (nome)do checkbox clicado

    for (var i = 0; i < cbs.length; i++) {
        if (cbs[i].id != id) {
            cbs[i].checked = false;//todos os checkbox do seu tipo tera o valor false
        }

        if (cbs[i].classList.contains('treeview')) {//se a função for detectar um checkbox que abre outras checknoxes
            if (cbs[i].checked == false) {
                var cb = cbs[i].parentElement.querySelectorAll('.cb');//todos os checkboxes dentro do pai do botão clicado
                var openable = cbs[i].parentElement.querySelectorAll('.openable');//todos os 'ul'

                for (var i = 0; i < cb.length; i++) {
                    cb[i].checked = false;//todos os checkboxes serão falsos ao serem escondidos
                }
                for (var i = 0; i < openable.length; i++) {
                    openable[i].style.display = null;//tornar invisivel
                }
            }
        }
    }
}

function cb_treeview(id) {//modo treeview dos elementos checkbox
    clicked_cb = document.getElementById(id);//botão que chamou a função
    var parent_name = document.getElementById(id).parentElement.parentElement.getAttribute('name');//nome do pai do botão clicado

    if (clicked_cb.checked) {//se estiver checado
        var cb = clicked_cb.parentElement.querySelectorAll(`[name='${"cb" + (Number(parent_name.slice(-1)) + Number('1'))}']`);//pegar todos os elementos com o nome cb1, cb2, cb3...
        for (var i = 0; i < cb.length; i++) {
            cb[i].style.display = 'block';//tornar visivel
        }
    } else {
        var cb = clicked_cb.parentElement.querySelectorAll('.cb');//todos os checkboxes dentro do pai do botão clicado
        var openable = clicked_cb.parentElement.querySelectorAll('.openable');//todos od 'ul'

        // for (var i = 0; i < cb.length; i++){
        //     cb[i].checked = false;//todos os checboxes serão falsos ao serem escondidos
        // }
        for (var i = 0; i < openable.length; i++) {
            openable[i].style.display = null;//tornar invisivel
        }
    }
}

function changeBorder() {
    var myDivs = document.querySelectorAll('.cbList');

    for (var i = 0; i < myDivs.length; i++) {
        var cbs = myDivs[i].querySelectorAll('input[type="checkbox"]:checked')
        if (cbs.length > 0) {
            myDivs[i].style.border = '2px solid #3399ff';
        } else {
            myDivs[i].style.border = null;
        }
    }
};

