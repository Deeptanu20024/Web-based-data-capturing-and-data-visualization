<?php
// Assuming you have a database connection established
// Replace the database credentials with your own
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "base4";

// Create a connection to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to fetch the 4 products with the highest profit
$sql = "SELECT month, profit , product FROM dummy_data ORDER BY profit DESC LIMIT 4";

// Execute the query
$result = $conn->query($sql);

// Array to store the products
$products = array();

// Fetch the products from the result set
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $product = array(
            'month' => $row['month'],
            'profit' => $row['profit'],
            'product' => $row['product']
        );
        $products[] = $product;
    }
}

// Close the database connection
$conn->close();

// Return the products as JSON
header('Content-Type: application/json');
echo json_encode($products);
?>
