<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$updateQD = "UPDATE `users` SET `last_quiz` = ? WHERE `username` = ?";

$nlqt = time() + 3630;
$nlq = date("Y-m-d H:i:s", $nlqt);

$stmt = $conn->prepare($updateQD);
$stmt->bind_param('ss', $nlq, $username);

$stmt->execute();
$result = $stmt->get_result();

$conn->close();
