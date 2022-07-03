<?php

if (!isset($_SESSION)) {
    session_start();
}

require_once "../classes/utils.php";
 
$uc = new User();
$conn = $uc->db_connect();

    $sql = "SELECT * FROM `users` ORDER BY `addedOn` DESC LIMIT 5";

// prepare and bind
$stmt = $conn->prepare($sql);
// $stmt->bind_param('s', 'Yes');

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {

    echo "<table class='table'>
    <tr>
    <th>S/N</th>
    <th>User</th>
    <th>Package</th>
    </tr>
    "; 

    $sn = 1;

while ($row = $result->fetch_assoc()) {
        echo "<tr><td>" . $sn . "</td><td><img src='pr/user/pp/" . $row['pp'] . "'><span>" . $row['username'] . "</td><td>". $row['subtype'] ."</td></tr>";

        $sn++;
    }

    echo "</table>";
}

$conn->close();