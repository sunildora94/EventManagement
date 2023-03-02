<?php

include('db_config.php');

if($_SERVER['REQUEST_METHOD'] == "GET"){
	// Get data from database
	$get_sql = "SELECT * FROM tbl_events";
	$get_results = mysqli_query($db, $get_sql);
    $prot_data = mysqli_fetch_all($get_results, MYSQLI_ASSOC);
    $get_row_count = mysqli_num_rows($get_results);

    if( $get_row_count >= 1 ){
        $json = array("status" => 1, "msg" => "Records matched", 'data' => $prot_data);
    } else{
        $json = array("status" => 0, "msg" => "Please enter valid data.");
    }
}
else{
	$json = array("status" => 0, "msg" => "Request method not accepted!");
}
mysqli_close($db);
// Set Content-type to JSON
header('Content-type: application/json');
echo json_encode($json);

?>