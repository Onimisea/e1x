<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$sql = "SELECT * FROM `users` ORDER BY `total_earnings` DESC LIMIT 5";

// prepare and bind
$stmt = $conn->prepare($sql);
// $stmt->bind_param('s', 'Yes');

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "<table class='table dte'>
        <tr>
          <th class='dtesnth'>S/N</th>
          <th>User</th>
          <th>Amount</th>
        </tr>";

    $sn = 1;

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
            <td class='dtesntd'>" . $sn . "</td>
            <td><img src='pr/user/pp/" . $row['pp'] . "'><span>" . $row['username'] . "</td><td><span class='packAmt'>" . number_format($row['total_earnings']) . "</span></td></tr>";

        $sn++;
    }

    echo "</table>";

    $conn->close();
}
