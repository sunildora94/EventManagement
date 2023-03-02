<?php

include('db_config.php');


if($_SERVER['REQUEST_METHOD'] == "POST"){
	$request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
	
	// Get data from the REST client
	$event_name = isset($data->event_name) ? mysqli_real_escape_string($db, $data->event_name) : "";
	$event_date = isset($data->event_date) ? mysqli_real_escape_string($db, $data->event_date) : "";
	$event_desc = isset($data->event_desc) ? mysqli_real_escape_string($db, $data->event_desc) : "";
	$event_price = isset($data->event_price) ? mysqli_real_escape_string($db, $data->event_price) : "";
	$event_type = isset($data->event_type) ? mysqli_real_escape_string($db, $data->event_type) : "";
	if( $event_name != "" && $event_date != "" && $event_desc != "" && $event_price != "" ){
		// Insert data into database
		$item_entry = mysqli_query( $db, "INSERT INTO tbl_events (event_name, event_date, event_desc, event_price, event_type) VALUES ('".$event_name."', '".$event_date."', '".$event_desc."', $event_price, $event_type)");
        if( $item_entry ){
            $json = array("status" => 1, "msg" => "Event has been added successfully!");
        } else{
            $json = array("status" => 0, "msg" => "Error adding event! Please try again!");
        }
	} else{
		$json = array("status" => 0, "msg" => "Please send valid data.");	
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