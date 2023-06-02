<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
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

if ($_SERVER["REQUEST_METHOD"] != "GET") {

    $returnData = msg(0, 404, 'Page Not Found!'); }

elseif (!isset($data->rider_id)) {

    $fields = ['fields' => ['rider_id']];
    $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);
    

}

// IF THERE ARE NO EMPTY FIELDS THEN-
else {
    $id = trim($data->rider_id);
    $status = trim($data->status);

        try {

            $fetch_user_by_email = "SELECT * FROM `riders` WHERE `id`='".$id."'";
         
            $query_stmt = $conn->query($fetch_user_by_email);
            //print_r($query_stmt);      
            if($query_stmt->num_rows > 0){
                $order_data = [];
                $row = $query_stmt->fetch_assoc();
                
                $insert_query = "SELECT *, sales.id AS salesid,sales.status as status FROM sales LEFT JOIN riders ON riders.id=sales.rider_assigned WHERE sales.rider_assigned = '".$id."' AND sales.status = '".$status."' ORDER BY sales_date DESC;";

                $insert_stmt = $conn->query($insert_query);
                //$rows = mysqli_fetch_assoc($insert_stmt);
                $i = 0;
                while($row = $insert_stmt->fetch_assoc()){
                    
                    $order_data[$i] = $row;
                    $stmt = $conn->query("SELECT * FROM details LEFT JOIN products ON products.id=details.product_id WHERE details.sales_id='".$row['salesid']."'");
                    //$stmt->execute(['id'=>$row['salesid']]);
                    //$stmt = mysqli_fetch_assoc($stmt);
                    $total = 0;
                    $i++;
                    while($details = $stmt->fetch_assoc()){
                        $order_data[$i]['details'] = $details;
                      $subtotal = $details['price']*$details['quantity'];
                      $total += $subtotal;
                    }
                    $order_data[$i]['total'] = $total;
                    
                  }
                    
                    $order_data[] = $row;
                
                $returnData = $order_data;
            } else {
            $returnData = msg(0, 401, "Invalid Token!");    
            }

        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    }

echo json_encode($returnData);
