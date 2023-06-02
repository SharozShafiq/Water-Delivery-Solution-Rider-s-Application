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
//print_r($fields);

if(empty($data)) { $returnData = msg(0, 404, 'No data Found'); }

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    $returnData = msg(0, 404, 'Page Not Found!'); }

elseif (!isset($data->pay_id)) {

    $fields = ['fields' => ['user_id','pay_id','delivery_charges','total_price','status']];
    $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);
    

}

// IF THERE ARE NO EMPTY FIELDS THEN-
else {
    //$id = trim($data->id);
    //$order_id = trim($data->order_id);
    
    $user_id =trim($data->user_id);
    $user_id = stripslashes($user_id);
    $user_id = str_replace('"','',$user_id);
    $pay_id = trim($data->pay_id);
    $delivery_charges = trim($data->delivery_charges);
    $total_price = trim($data->total_price);
    $status = trim($data->status);
    $address = $data->address;
    $other_info = $data->other_info;
    $lat = $data->lat;
    $long = $data->long;

        try {

            $fetch_user_by_email = "SELECT * FROM `users` WHERE `id`='".$user_id."'";
         
            $query_stmt = $conn->query($fetch_user_by_email);
            //print_r($query_stmt);      
            if($query_stmt->num_rows > 0){
                $row = $query_stmt->fetch_assoc();
                $customer_name = $row['firstname']." ".$row['lastname'];
                $phone_no = $row['contact_info'];
                $email = $row['email'];

                $insert_query = "INSERT INTO `sales`(`user_id`,`pay_id`,`delivery_charges`,`total_price`,`status`) VALUES('".$user_id."','".$pay_id."','".$delivery_charges."','".$total_price."','".$status."')";
//echo($insert_query);
                $insert_stmt = $conn->query($insert_query);
                //last insert id
                $sale_id = $conn->insert_id; //$sale_id = ;
                //print_r($sale_id);
                foreach ($data->product as $value) {
                    $insert_query1 = "INSERT INTO `details`(`sales_id`,`product_id`,`quantity`) VALUES('".$sale_id."','".$value->product_id."','".$value->quantity."')";
                    //echo($insert_query1);
                    $insert_stmt = $conn->query($insert_query1);
                } 
                //delivery detail
                $insert_query = "INSERT INTO `delivery_details`(`sale_id`, `customer_name`, `phone_no`, `email`, `address`, `other_information`, `latitude`, `longitude`) VALUES('".$sale_id."','".$customer_name."','".$phone_no."','".$email."','".$address."','".$other_info."','".$lat."','".$long."')";

                $insert_stmt = $conn->query($insert_query);
                               
                //delete from cart
                $delete_cart = "DELETE FROM cart WHERE user_id='".$data->user_id."'";
                $query_stmt = $conn->query($delete_cart);
                //auto assign to rider
                $insert_query1 = "SELECT COALESCE(s.rider_assigned, (SELECT id FROM riders LIMIT 1)) AS rider_id, COUNT(s.id) AS sales_count
                FROM riders r
                LEFT JOIN sales s ON s.rider_assigned = r.id AND s.status = 'pending'
                GROUP BY s.rider_assigned
                ORDER BY sales_count ASC
                LIMIT 1;";

                $insert_stmt = $conn->query($insert_query1);
                $row = mysqli_fetch_assoc($insert_stmt);
                $rider_id = $row['rider_id'];
                $rider_order = "UPDATE `sales` SET `rider_assigned` = '".$rider_id."' WHERE `sales`.`id` = ".$sale_id.";";
                $query_stmt = $conn->query($rider_order);
                

                $returnData = msg(1, 201, 'Data Saved.');
            } else {
            $returnData = msg(0, 401, "Invalid Token!");    
            }

        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    }

echo json_encode($returnData);
