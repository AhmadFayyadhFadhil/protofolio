<?php
require_once 'db.php';

// Prepare static project data to be seeded
$projectsToSeed = [
    [
        "title" => "Ruang Pulih",
        "description" => "Berfokus pada kesadaran kesehatan mental, menyediakan berbagai panduan dan alat edukasi untuk kesejahteraan emosi secara holistik.",
        "tech" => ["Laravel", "Mysql"],
        "image" => "./project/ruangpulih.png"
    ],
    [
        "title" => "CurtainCall",
        "description" => "Aplikasi pintar berbasis AI yang dirancang untuk mengotomatisasi dan mempermudah manajemen tirai untuk rumah modern.",
        "tech" => ["React", "MongoDB", "Tailwind CSS", "Flutter"],
        "image" => "./project/CurtainCall.png"
    ],
    [
        "title" => "Rizza Jaya Trans",
        "description" => "Platform web kolaboratif yang memberdayakan UMKM lokal untuk meningkatkan kualitas layanan dan daya saing pasar dengan mulus.",
        "tech" => ["React", "Linux", "Cloudflare"],
        "image" => "./project/rizzajayatrans.png"
    ]
];

$skillsToSeed = [
    ["name" => "Figma", "logo" => "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"],
    ["name" => "Html", "logo" => "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg"],
    ["name" => "Css", "logo" => "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg"],
    ["name" => "Javascript", "logo" => "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg"],
    ["name" => "React", "logo" => "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"],
    ["name" => "Laravel", "logo" => "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg"],
    ["name" => "PHP", "logo" => "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"],
    ["name" => "Mysql", "logo" => "https://upload.wikimedia.org/wikipedia/commons/0/0f/MySQL_textlogo.svg"],
    ["name" => "Linux", "logo" => "https://upload.wikimedia.org/wikipedia/commons/a/ab/Linux_Logo_in_Linux_Libertine_Font.svg"],
    ["name" => "Canva", "logo" => "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_logo.svg"]
];

$certsToSeed = [
    ["title" => "Pelatihan AI Elevate", "issuer" => "Elevate AI Academy", "date" => "Sep 2025", "image" => "/certificates/Sertifikat-elevate.png"],
    ["title" => "Semifinalis BPC", "issuer" => "ITS", "date" => "Okt 2024", "image" => "certificates/sertifikatbpc1.png"],
    ["title" => "Semifinalis BPC", "issuer" => "Universitas Indonesia", "date" => "May 2025", "image" => "certificates/sertifikatbpc2.png"],
    ["title" => "OWASP Keamanan Jaringan", "issuer" => "Universitas Narotama", "date" => "Sep 2024", "image" => "certificates/sertifikatOwasp.png"],
    ["title" => "Cyber Security", "issuer" => "PT Telkom Indonesia", "date" => "Des 2024", "image" => "certificates/sertifikatpelatihan.png"],
    ["title" => "Sistem Informasi", "issuer" => "Telkom University", "date" => "May 2023", "image" => "certificates/sertifikattrialclass.png"]
];

try {
    // Clear existing tables
    $conn->exec("TRUNCATE TABLE projects");
    $conn->exec("TRUNCATE TABLE skills");
    $conn->exec("TRUNCATE TABLE certificates");

    $sql = "INSERT INTO projects (title, description, image, tech_stack) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    foreach ($projectsToSeed as $p) {
        $stmt->execute([$p['title'], $p['description'], $p['image'], json_encode($p['tech'])]);
    }

    $sqlSkills = "INSERT INTO skills (name, logo) VALUES (?, ?)";
    $stmtSkills = $conn->prepare($sqlSkills);
    foreach ($skillsToSeed as $s) {
        $stmtSkills->execute([$s['name'], $s['logo']]);
    }

    $sqlCerts = "INSERT INTO certificates (title, issuer, date, image) VALUES (?, ?, ?, ?)";
    $stmtCerts = $conn->prepare($sqlCerts);
    foreach ($certsToSeed as $c) {
        $stmtCerts->execute([$c['title'], $c['issuer'], $c['date'], $c['image']]);
    }

    echo json_encode([
        "status" => "success",
        "message" => "Imported " . count($projectsToSeed) . " projects, " . count($skillsToSeed) . " skills, and " . count($certsToSeed) . " certs."
    ]);

}
catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>
