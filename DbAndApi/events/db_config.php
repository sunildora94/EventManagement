<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', '');
    define('DB_DATABASE', 'db_events');
    $db = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

    // Check connection
    if ($db->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
?>