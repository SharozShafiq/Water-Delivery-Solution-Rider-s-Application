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


    $stmt = $db->prepare("DELETE cart WHERE id:cart_id");
    $stmt->bindValue(':cart_id', $data['cart_id']);
    $stmt->execute();
    
echo json_encode(array("status"=>"deleted"));