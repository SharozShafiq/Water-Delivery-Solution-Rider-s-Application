<?php

// Set up a connection to your database

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "ecomm";

try {
    $db = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

// Get the data from the request body
$data = json_decode(file_get_contents('php://input'), true);
$status = $data['status'];
if($status == "p") { $status = "Pending"; }
else if($status == "d") { $status = "Delivered"; }
else if($status == "u") { $status = "Undelivered"; }
else if($status == "c") { $status = "Cancelled"; }
else { $status = "Pending"; }


    $stmt = $db->prepare("UPDATE sales SET status=:status, reason=:reason WHERE id:id");
    $stmt->bindValue(':status', $status);
    $stmt->bindValue(':reason', $data['reason']);
    $stmt->bindValue(':id', $data['sale_id']);
    $stmt->execute();
    
echo json_encode(array("status"=>"updated"));