<?php

include('db_config.php');

if($_SERVER['REQUEST_METHOD'] == "POST"){
    $request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
    
    // Get data from the REST client
    $event_id = isset($data->event_id) ? mysqli_real_escape_string($db, $data->event_id) : "";
	// Get data from database
	$get_sql = "SELECT *, DATE_FORMAT(event_date, '%Y-%m-%d') as event_date_data FROM tbl_events WHERE event_id = " . $event_id;
	$get_results = mysqli_query($db, $get_sql);
    $prot_data = mysqli_fetch_array($get_results, MYSQLI_ASSOC);
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