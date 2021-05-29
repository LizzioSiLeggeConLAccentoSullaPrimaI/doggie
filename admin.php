<?php

// questa ti prende le tipologie dal db, commentatela come ti pare
function getTipologie()
{
    if (empty($errors)) {
        include 'config.php';
        $conn = mysqli_connect($servername, $username, $password,  $dbname);
        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        }

        $sql = "SELECT tipologia, difficolta, nome, cognome 
        FROM corso inner join assegnazione on idCorso=	id_corso inner join educatori on idEducatore=id_educatore";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                echo json_encode($row);
            }
        } else {
            die();
        }
    }
}

//funzione per inserire un nuovo corso
function insertNuovoCorso()
{
    include 'config.php';
    $conn = mysqli_connect($servername, $username, $password,  $dbname);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $data = file_get_contents("php://input");       //prende dall'api
    $data = json_decode($data, true);               //array associativo
    insertEducatore();
    //inserisce in corso
    $stmt = $conn->prepare("INSERT INTO corso (tipologia) VALUES (?)");
    $stmt->bind_param("s", $tipologia);
    $tipologia=$data["tipologia"];
    $stmt->execute();
}

//funzione per inserire un educatore
function insertEducatore()
{
    include 'config.php';
    $conn = mysqli_connect($servername, $username, $password,  $dbname);
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $data = file_get_contents("php://input");       //prende dall'api
    $data = json_decode($data, true);               //array associativo
    $stmt = $conn->prepare("INSERT INTO educatori (cognome,nome) VALUES (?,?)");
    $stmt->bind_param("ss", $nome, $cognome);
    $nome = $data["nome"];
    $cognome= $data["cognome"];
    $stmt->execute();
}
