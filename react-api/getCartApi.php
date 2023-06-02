<?php

// Set headers to allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Connect to the MySQL database
$host = "localhost";
$user = "root";
$password = "";
$dbname = "ecomm";
$conn = mysqli_connect($host, $user, $password, $dbname);

// Check for errors
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Check if a user ID was provided
if (isset($_GET["uid"])) {
    $uid = mysqli_real_escape_string($conn, $_GET["uid"]);

    // Retrieve all rows from the cart table where the user ID matches
    $sql = "SELECT * FROM cart WHERE user_id = '$uid' AND cart_order=0";
    $result = mysqli_query($conn, $sql);

    // Create an array to hold the cart data
   // $cart_data = array();

    // Loop through each row and add it to the array
    while ($row = mysqli_fetch_assoc($result)) {
        // Retrieve product data for each row from the products table
        $product_id = $row["product_id"];
        $sql = "SELECT * FROM products WHERE id = '$product_id'";
        $product_result = mysqli_query($conn, $sql);
        $product_data = mysqli_fetch_assoc($product_result);

        // Add the cart data and product data to the array
        $row["product"] = $product_data;
        $cart_data[] = $row;
    }

    // Encode the array as a JSON object and return it
    echo json_encode($cart_data);
} else {
    // If no user ID was provided, return an error message
    echo "User ID not provided.";
}

// Close the MySQL connection
mysqli_close($conn);