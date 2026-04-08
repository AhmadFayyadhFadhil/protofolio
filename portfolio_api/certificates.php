<?php
require_once 'db.php';
require_once 'upload_helper.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM certificates ORDER BY date DESC");
    echo json_encode($stmt->fetchAll());
}
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    $issuer = isset($_POST['issuer']) ? $_POST['issuer'] : '';
    $date = isset($_POST['date']) ? $_POST['date'] : '';

    $imageUrl = '';
    if (isset($_FILES['image'])) {
        $imageUrl = handleUpload($_FILES['image']);
    }

    if (!empty($title) && !empty($issuer) && !empty($imageUrl)) {
        $sql = "INSERT INTO certificates (title, issuer, date, image) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        if ($stmt->execute([$title, $issuer, $date, $imageUrl])) {
            echo json_encode(["status" => "success", "message" => "Certificate created."]);
        }
        else {
            echo json_encode(["status" => "error", "message" => "Failed to create certificate."]);
        }
    }
    else {
        echo json_encode(["status" => "error", "message" => "Incomplete data or upload failed."]);
    }
}
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM certificates WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(["status" => "success"]);
    }
}
?>
