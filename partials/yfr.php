<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$sql = "SELECT * FROM `users` WHERE `referred_by` = ? ORDER BY `addedOn` DESC LIMIT 5";

// prepare and bind
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "<table class='table'>
        <tr>
          <th>Date</th>
          <th>Users</th>
          <th>Package</th>
        </tr>";

    while ($row = $result->fetch_assoc()) {
        $date = date_create($row['addedOn']);

        echo "<tr><td>" . date_format($date, "l, dS F, Y") . "</td><td><img src='pr/user/pp/" . $row['pp'] . "'><span>" . $row['username'] . "</td><td>" . $row['subtype'] . "</td></tr>";

    }

    echo "</table>";

    $conn->close();
} else {
    echo "<table class='table'>
        <tr>
          <th>Date</th>
          <th>Users</th>
          <th>Package</th>
        </tr>";

    echo "<tr><td></td><td><span> You have not REFERRED anybody! </td><td> </td></tr>";

    echo "</table>";
}
