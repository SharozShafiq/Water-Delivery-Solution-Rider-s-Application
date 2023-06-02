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


    $stmt = $db->prepare("UPDATE cart SET quantity:quantity WHERE id:cart_id");
    $stmt->bindValue(':cart_id', $data['cart_id']);
    $stmt->bindValue(':quantity', $data['quantity']);
    $stmt->execute();
    
    // Get the ID of the new cart item
    $cart_item_id = $data['cart_id'];
    
    // Get the details of the new cart item
    $stmt = $db->prepare("SELECT * FROM cart WHERE id = :id");
    $stmt->bindValue(':id', $cart_item_id);
    $stmt->execute();
    $cart_item = $stmt->fetch(PDO::FETCH_ASSOC);
        
// Insert the new cart item into the database

// Send a response with the new cart item details
header('Content-Type: application/json');
echo json_encode($cart_item);