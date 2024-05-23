<?php
$servername = "localhost";
$username = "seu-usuario-do-banco-de-dados";
$password = "sua-senha-do-banco-de-dados";
$dbname = "guita770_music_users";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
