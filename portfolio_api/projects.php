<?php
require_once 'db.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Read all projects
    $stmt = $conn->query("SELECT * FROM projects ORDER BY created_at DESC");
    $projects = $stmt->fetchAll();

    // Convert JSON tech_stack back to array for front-end
    foreach ($projects as &$p) {
        if ($p['tech_stack']) {
            $p['tech'] = json_decode($p['tech_stack']);
            unset($p['tech_stack']);
        }
        else {
            $p['tech'] = [];
        }
    }

    echo json_encode($projects);
}

elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->title) && !empty($data->description) && !empty($data->image)) {
        $tech = isset($data->tech) ? json_encode($data->tech) : '[]';

        $sql = "INSERT INTO projects (title, description, image, tech_stack) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if ($stmt->execute([$data->title, $data->description, $data->image, $tech])) {
            echo json_encode(["status" => "success", "message" => "Project created."]);
        }
        else {
            echo json_encode(["status" => "error", "message" => "Failed to create project."]);
        }
    }
    else {
        echo json_encode(["status" => "error", "message" => "Incomplete data."]);
    }
}
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = isset($_GET['id']) ? $_GET['id'] : die(json_encode(["error" => "ID needed."]));

    $stmt = $conn->prepare("DELETE FROM projects WHERE id = ?");
    if ($stmt->execute([$id])) {
        echo json_encode(["status" => "success", "message" => "Project deleted."]);
    }
    else {
        echo json_encode(["status" => "error", "message" => "Failed to delete project."]);
    }
}
?>
