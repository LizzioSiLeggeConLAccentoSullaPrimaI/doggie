<?php

function getTipologie()
{
    if(empty($errors))
	{
        include 'config.php';
        $conn = mysqli_connect($servername, $username, $password,  $dbname);
        if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}

        $sql = "SELECT tipologia, difficolta, nome, cognome 
        FROM corso inner join assegnazione on idCorso=	id_corso inner join educatori on idEducatore=id_educatore";
		$result = mysqli_query($conn, $sql);
        if(mysqli_num_rows($result) > 0)
        {
            while($row = mysqli_fetch_assoc($result))
            {
                echo json_encode($row);
            }
        }
        else{
            die();
        }
    }
}

?>