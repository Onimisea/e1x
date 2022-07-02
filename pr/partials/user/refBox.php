<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$sql = "SELECT `referred_by`, `addedOn` FROM `users` WHERE `username` = ?";

// prepare and bind
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $date = date_create($row['addedOn']);

        if ($row['referred_by'] === "Nil") {
            echo "Registered On: <span class='refBy'>" . date_format($date, "l, dS F, Y - H:i:sA") . "</span>.";
        } else {
            echo "Referred By: <span class='refBy'>" . $row['referred_by'] . "</span>. Registered On: <span class='refBy'>" . date_format($date, "l, dS F, Y - H:i:sA") . "</span>.";
        }
    }
    $conn->close();
} else {
    echo "error=errorLoadingRefDetails";
    return 0;
    exit();
}
