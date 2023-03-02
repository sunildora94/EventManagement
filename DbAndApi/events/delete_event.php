<?php

include('db_config.php');


if($_SERVER['REQUEST_METHOD'] == "POST"){
	$request_body = file_get_contents('php://input');
    $data = json_decode($request_body);
	
	// Get data from the REST client
	$event_id = isset($data->event_id) ? mysqli_real_escape_string($db, $data->event_id) : "";
	if( $event_id ){
		// Insert data into database
		$delete_item_sql = "DELETE FROM tbl_events WHERE event_id = ". $event_id;
		$results = mysqli_query($db, $delete_item_sql);
        if( $results ){
            $json = array("status" => 1, "msg" => "Event has been delete successfully!");
        } else{
            $json = array("status" => 0, "msg" => "Error deleting Event! Please try again!");
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