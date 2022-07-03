<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$selectNQ = "SELECT `next_quiz` FROM `users` WHERE `username` = ?";

// prepare and bind
$stmt = $conn->prepare($selectNQ);
$stmt->bind_param('s', $username);

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $nq = $row['next_quiz'];
    }
    echo $nq;
    $conn->close();
}
$conn->close();