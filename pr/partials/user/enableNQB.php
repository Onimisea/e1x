<?php

if (!isset($_SESSION)) {
    session_start();
}
 
$username = $_SESSION["username"];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$enableNQB = "UPDATE `users` SET `nqb`= ? WHERE `username` = ?";

$i = 1;

// prepare and bind
$stmt = $conn->prepare($enableNQB);
$stmt->bind_param('is', $i, $username);

$stmt->execute();
$result = $stmt->get_result();

$conn->close();
