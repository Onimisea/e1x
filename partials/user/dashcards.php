<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require_once "../../classes/utils.php";

$uc = new User();
$conn = $uc->db_connect();

$sql = "SELECT * FROM `users` WHERE `username` = ?";

// prepare and bind
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);

$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        echo "<section class='card-single'>";

        echo "<h1 class=''>" . number_format($row['total_quiz']) . "</h1>";

        echo "<span>Total Quiz</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class='card-nums'>" . number_format($row['quiz_earnings']) . "</h1>";

        echo "<span>Quiz Earnings</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class=''>" . number_format($row['total_referrals']) . "</h1>";

        echo "<span>Total Referrals</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class='card-nums'>" . number_format($row['referral_earnings']) . "</h1>";

        echo "<span>Referral Earnings</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class='card-nums'>" . number_format($row['reg_bonus']) . "</h1>";

        echo "<span>Registration Bonus</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class='card-nums'>" . number_format($row['total_earnings']) . "</h1>";

        echo "<span>Total Earnings</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class='card-nums'>" . number_format($row['last_withdrawal']) . "</h1>";

        echo "<span>Last Withdrawal</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class='card-nums'>" . number_format($row['total_withdrawal']) . "</h1>";

        echo "<span>Total Withdrawal</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class='card-nums'>" . number_format($row['withdrawal_threshold']) . "</h1>";

        echo "<span>Withdrawal Threshold</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class='card-nums'>" . number_format($row['balance']) . "</h1>";

        echo "<span>Balance</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class='card-nums'>" . number_format($row['cae']) . "</h1>";

        echo "<span>Per Quiz</span>";

        echo "</section>";

        echo "<section class='card-single'>";

        echo "<h1 class='card-nums'>" . number_format($row['ref_bonus']) . "</h1>";

        echo "<span>Per Referral</span>";

        echo "</section>";

        return 1;
        $conn->close();
    }

    $conn->close();
} else {
    echo "error=errorLoadingCards";
    return 0;
    exit();
}
