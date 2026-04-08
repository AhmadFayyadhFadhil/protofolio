<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$db_name = 'portfolio_db';
$username = 'root';
$password = '';

try {
    $conn = new PDO("mysql:host=$host;dbname=$db_name", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Set default fetch mode to associative array
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    if (strpos($e->getMessage(), 'Unknown database') !== false) {
        echo json_encode(["status" => "error", "message" => "Database 'portfolio_db' not found. Please create it in phpMyAdmin first."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Connection Error: " . $e->getMessage()]);
    }
    http_response_code(500);
    exit();
}
?>
