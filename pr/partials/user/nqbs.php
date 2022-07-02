<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$checkNQBS = "SELECT `nqb` FROM `users` WHERE `username` = ?";

// prepare and bind
$stmt = $conn->prepare($checkNQBS);
$stmt->bind_param('s', $username);

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $currBtnStatus = $row['nqb'];
        echo $currBtnStatus;
    }
    $conn->close();
}
