//prendi le tipologie da php
function getTipologie() {
    caricatipologie()          //RICOORDATI DI LEVARE QUESTO QUANDO FUNZIONERà
    // let conn = new XMLHttpRequest();
    // conn.open("GET", "/area-utente/admin.php", true);
    // conn.onreadystatechange = function () {
    //     if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    //         localStorage.setItem("tipologie", conn.response);
    //         caricatipologie()
    //     }
    // };
    // conn.send();
}

//stampi le tipologie
function creaTipologie() {
    let tipologie = localStorage.getItem("tipologie");
    for (let i = 0; i < tipologie.length; i++) {
        let op = document.createElement("p");
        op.setAttribute("id", "opzione");
        op.innerHTML = tipologie[i]["tipologia"] + tipologie[i]["difficolta"] + " " + tipologie[i]["nome"] + " " + tipologie[i]["cognome"];
        let div = document.getElementById("selectTipologie");
        div.appendChild(op);
    }
}

//form iniziale onload alla pagina
function caricatipologie() {
    let html = '<div id="wrapper"><div name="tipologie" id="selectTipologie"> </div></div>' +
        '<div id="button"><input type="button" id="bottoneCambio" onclick="cambiaTipologia()" value="Inserisci corso"></button></div>';
    //  creaTipologie();        RICORDATI DI SCOMMENTARLO
    document.getElementById("divTipologie").innerHTML = html;
}

function inserisciCorso() {
    let html = '<div id="wrapper"><input type="text" class="inputText" id="tipo" placeholder="inserisci tipologia..."></div>' +
        '<div id="wrapper"><input type="text" class="inputText" id="nome" placeholder="inserisci nome tutor..."></div>' +
        '<div id="wrapper"><input type="text" class="inputText" id="cognome" placeholder="inserisci cognome tutor..."></div>' +
        '<div id="button"><input type="button" id="bottoneCambio" onclick="cambiaTipologia()" value="Inserisci corso"></button></div>' +
        '<div id="submitbutton"><input type="button" id="bottoneInvio" value="Aggiungi" onclick="sendData()"></button>'
    document.getElementById("divTipologie").innerHTML = html;
}

//quello che fa il bottone
function cambiaTipologia() {
    if (document.getElementById("bottoneCambio").value == "Inserisci corso") {
        let num = document.querySelectorAll("[id='wrapper']");
        //cancella la roba che vedi appena carichi
        for (let i = 0; i < num.length; i++) {
            num[i].style.visibility = "hidden";
        }
        inserisciCorso();
        document.getElementById("bottoneCambio").value = "Vedi corsi";
    }
    else //riporti a quando carichi la pagina
    {
        let num = document.querySelectorAll("[id='wrapper']");
        //ristampa la roba che vedi appena carichi
        for (let i = 0; i < num.length; i++) {
            num[i].style.visibility = "visible";
        }
        caricatipologie();
        document.getElementById("bottoneCambio").value = "Inserisci corso";
    }
}

//API
function sendData() {
    $(document).on('click', '#bottoneInvio', function () {
        let tipo = $("#tipo").val();
        let nome= $("#nome").val();
        let cognome = $("#cognome").val();
        console.log(tipo);
        //creation of the JSON
        let postData =
        {
            "tipologia": tipo,
            "nome": nome,
            "cognome": cognome,
        };
        //asynchronous http request
        $.ajax({
            url: "area-utente/admin.php",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({ "tipologie": postData }),
            accept: "*/*",
            success: function (data) {
                getTipologie();     //se funziona esegue la funzione per prendere le tipologie così si aggiorna quando torni indietro
                cambiaTipologia(); //torna alla pagina prima
            },
            error: function (errorThrown) {
                console.log(errorThrown);
            }
        });
    });
}