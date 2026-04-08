require_once 'db.php';
require_once 'upload_helper.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->query("SELECT * FROM skills ORDER BY id ASC");
    echo json_encode($stmt->fetchAll());
}
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    
    $logoUrl = '';
    if (isset($_FILES['logo'])) {
        $logoUrl = handleUpload($_FILES['logo']);
    }

    if (!empty($name) && !empty($logoUrl)) {
        $stmt = $conn->prepare("INSERT INTO skills (name, logo) VALUES (?, ?)");
        if ($stmt->execute([$name, $logoUrl])) {
            echo json_encode(["status" => "success", "message" => "Skill created."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to create skill."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Incomplete data or upload failed."]);
    }
}
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = $_GET['id'];
    $stmt = $conn->prepare("DELETE FROM skills WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(["status" => "success"]);
    }
}
?>
