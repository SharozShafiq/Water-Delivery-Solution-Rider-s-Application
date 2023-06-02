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
$str = file_get_contents("php://input");
$data = json_decode(utf8_encode($str));
$data = [];
        try {
            $result = array("data" => array());

            $fetch_user_by_email = "SELECT * FROM `products`";

            $query_stmt = $conn->query($fetch_user_by_email);
           
            if($query_stmt->num_rows > 0){
                $row = $query_stmt->fetch_assoc();
                $id = $row['id']; 
                $get_query = "SELECT * FROM `products`";

                $get_stmt = $conn->query($get_query);
                if($get_stmt->num_rows > 0){
                    while ($rows = mysqli_fetch_assoc($get_stmt)) {
                        $id=$rows['id'];
                        $catId = $rows['category_id'];
            $name = $rows['name'];
            $description = $rows['description'];
            $slug = $rows['slug'];
            $price = $rows['price'];
            $photo = $rows['photo'];
            //$Status = $rows['Status'];
            //$date_created = $rows['date_created'];
         $data[] = array('id'=>$id,'category_id'=>$catId,'name'=>$name,'description'=>$description,'slug'=>$slug,'price'=>$price,'photo'=>$photo);
            //append the current data to a new entry in the "dashboard_content" array
             
        }
        $result["data"] = $data;
                 }

                $returnData = msg(1, 201, "Data Success",$result);


            } else {
            $returnData = msg(0, 401, "Invalid Token!");    
            }

        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }

echo json_encode($returnData);
