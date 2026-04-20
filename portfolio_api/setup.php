<?php
require_once 'db.php';

try {
    // Users table
    $conn->exec("CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // Projects table
    $conn->exec("CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        tech_stack JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // Skills table
    $conn->exec("CREATE TABLE IF NOT EXISTS skills (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        logo VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // Certificates table
    $conn->exec("CREATE TABLE IF NOT EXISTS certificates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        issuer VARCHAR(150) NOT NULL,
        date VARCHAR(50) NOT NULL,
        image VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // Organizations table
    $conn->exec("CREATE TABLE IF NOT EXISTS organizations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        role VARCHAR(150) NOT NULL,
        period VARCHAR(100) NOT NULL,
        description TEXT,
        logo VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )");

    // Insert Default User (admin@example.com / admin)
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute(['admin@example.com']);
    if ($stmt->rowCount() == 0) {
        $hashed_password = password_hash('admin', PASSWORD_DEFAULT);
        $conn->exec("INSERT INTO users (email, password) VALUES ('admin@example.com', '$hashed_password')");
    }

    echo json_encode(["status" => "success", "message" => "Database tables created successfully. Default admin account setup completed!"]);

}
catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    http_response_code(500);
}
?>
