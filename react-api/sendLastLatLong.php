<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once 'database.php';

function msg($success, $status, $message, $extra = [])
{
    return array_merge([
        'success' => $success,
        'status' => $status,
        'message' => $message
    ], $extra);
}

// DATA FORM REQUEST
$data = json_decode(file_get_contents("php://input"));
$returnData = [];
print_r($data);

if(empty($data)) { $returnData = msg(0, 404, 'Nikal!'); }

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    $returnData = msg(0, 404, 'Page Not Found!'); }

elseif (!isset($data->rider_id)) {

    $fields = ['fields' => ['rider_id','latsEnd','longsEnd']];
    $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);
}
// IF THERE ARE NO EMPTY FIELDS THEN-
else {
    //$id = trim($data->id);
    //$order_id = trim($data->order_id);
    $rider_id =trim($data->rider_id);
    $lastlats = trim($data->latsEnd);
    $lastlongs = trim($data->longsEnd);
    

        try {

            $fetch_user_by_email = "SELECT id FROM `riders` WHERE `id`='".$data->rider_id."'";
            
            $query_stmt = $conn->query($fetch_user_by_email);
            
            if($query_stmt->num_rows > 0){
                $row = $query_stmt->fetch_assoc();
                
                $insert_query = "INSERT INTO `location`(`rider_id`,`latsEnd`,`longsEnd`) VALUES('".$rider_id."','".$lastlats."','".$lastlongs."')";

                $insert_stmt = $conn->query($insert_query);

                $returnData = msg(1, 201, 'Data Saved.');
            } else {
            $returnData = msg(0, 401, "Invalid Token!");    
            }

        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    }

echo json_encode($returnData);
