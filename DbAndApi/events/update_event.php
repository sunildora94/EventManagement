<?php

include('db_config.php');


if($_SERVER['REQUEST_METHOD'] == "POST"){
	$request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
	
	// Get data from the REST client
	$event_id = isset($data->event_id) ? mysqli_real_escape_string($db, $data->event_id) : "";
	
	$event_name = isset($data->event_name) ? mysqli_real_escape_string($db, $data->event_name) : "";
	$event_date = isset($data->event_date) ? mysqli_real_escape_string($db, $data->event_date) : "";
	$event_desc = isset($data->event_desc) ? mysqli_real_escape_string($db, $data->event_desc) : "";
	$event_price = isset($data->event_price) ? mysqli_real_escape_string($db, $data->event_price) : "";
	$event_type = isset($data->event_type) ? mysqli_real_escape_string($db, $data->event_type) : "";
	if( $event_id != "" && $event_name != "" && $event_date != "" && $event_desc != "" && $event_price != "" ){
		// Insert data into database
		$update_item_sql = "UPDATE tbl_events SET event_name = '".$event_name."', event_date = '".$event_date."', event_desc = '".$event_desc."', event_price = ".$event_price.", event_type = ".$event_type.", `updated_date` = NOW() WHERE event_id = '$event_id'";
		$results = mysqli_query($db, $update_item_sql);
        if( $results ){
            $json = array("status" => 1, "msg" => "Event has been updated successfully!");
        } else{
            $json = array("status" => 0, "msg" => "Error updating Event! Please try again!");
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