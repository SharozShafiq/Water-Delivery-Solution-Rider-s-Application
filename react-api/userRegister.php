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

if(empty($data)) { $returnData = msg(0, 404, 'Error $04'); }

if ($_SERVER["REQUEST_METHOD"] != "POST") {

    $returnData = msg(0, 404, 'Page Not Found!'); }

elseif (!isset($data->email)) {

    $fields = ['fields' => ['email', 'password', 'firstname','lastname','address']];
    $returnData = msg(0, 422, 'Please Fill in all Required Fields!', $fields);
}
// IF THERE ARE NO EMPTY FIELDS THEN-
else {
    $firstname = trim($data->firstname);
    $lastname = trim($data->lastname);
    $email = trim($data->email);
    $password = trim($data->password);
    $address = trim($data->address);
    

   
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $returnData = msg(0, 422, 'Invalid Email Address!'.$data->email);
    }

    elseif (strlen($password) < 8) {
        $returnData = msg(0, 422, 'Your password must be at least 8 characters long!');
    }

    elseif (strlen($firstname) < 3) {
        $returnData = msg(0, 422, 'Your name must be at least 3 characters long!');
    }

    else {
        try {

            $check_email = "SELECT `email` FROM `users` WHERE `email`='".$email."'";
            $check_email_stmt = $conn->query($check_email);
            if ($check_email_stmt->num_rows > 0) {
                $returnData = msg(0, 422, 'This E-mail already in use!');
            }

            else {
                $insert_query = "INSERT INTO `users`(`firstname`,`lastname`,`email`,`password`,`address`) VALUES('".$firstname."','".$lastname."','".$email."','".$password."','".$address."')";

                $insert_stmt = $conn->query($insert_query);

                $returnData = msg(1, 201, 'You have successfully registered.');

            }
        } catch (PDOException $e) {
            $returnData = msg(0, 500, $e->getMessage());
        }
    }
}

echo json_encode($returnData);
