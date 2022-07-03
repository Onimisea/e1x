<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$updateNQ = "UPDATE `users` SET `next_quiz` = ? WHERE `username` = ?";

$nqt = time() + 10800;
$nq = date("Y-m-d H:i:s", $nqt);

// prepare and bind
$stmt = $conn->prepare($updateNQ);
$stmt->bind_param('ss', $nq, $username);

$stmt->execute();
$result = $stmt->get_result();

$conn->close();
