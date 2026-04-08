<?php
require_once 'db.php';
session_start();

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data->email) && isset($data->password)) {
    $email = $data->email;
    $password = $data->password;

    $stmt = $conn->prepare("SELECT id, password FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(["status" => "success", "token" => "dummy-jwt-token-" . $user['id']]);
    }
    else {
        echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
        http_response_code(401);
    }
}
else {
    echo json_encode(["status" => "error", "message" => "Bad request"]);
    http_response_code(400);
}
?>
