<?php

require_once "../classes/utils.php";

$error = 0;

if (!isset($_POST['fname']) || $_POST['fname'] == '' || strlen($_POST['fname']) > 20 || !preg_match('/^[a-zA-Z]+$/', $_POST['fname'])) {
    echo "Invalid firstname";
    $error = 1;
} else if (!isset($_POST['lname']) || $_POST['lname'] == '' || strlen($_POST['lname']) > 20 || !preg_match('/^[a-zA-Z]+$/', $_POST['lname'])) {
    echo "Invalid lastname";
    $error = 1;
} else if (!isset($_POST['phone']) || $_POST['phone'] == '' || strlen($_POST['phone']) > 14 || !preg_match('/^(\+[0-9])/', $_POST['phone'])) {
    echo "Invalid phone number";
    $error = 1;
} else if (!isset($_POST['username']) || $_POST['username'] == '' || strlen($_POST['username']) > 20 || !preg_match('/^[a-zA-Z0-9]+$/', $_POST['username'])) {
    echo "Invalid username";
    $error = 1;
} else if (!isset($_POST['email']) || strlen($_POST['email']) > 60 || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email";
    $error = 1;
} else if (!checkdnsrr(substr($_POST['email'], strpos($_POST['email'], '@') + 1), 'MX')) {
    echo "Email could not be verified";
    $error = 1;
} else if (!isset($_POST['password']) || $_POST['password'] == '' || !preg_match('/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[<>,.;\'":\{\}\[\]\/=\*\-_()&\^%\$#!|@~`])(?=.{6,})/', $_POST['password'])) {
    echo "Invalid password";
    $error = 1;
} else if (!isset($_POST['confirm-password']) || $_POST['confirm-password'] !== $_POST['password']) {
    echo "Password does not match";
    $error = 1;
} else if (!isset($_POST['country']) || $_POST['country'] == '' || strlen($_POST['country']) > 30 || !preg_match('/^[a-zA-Z0-9()$ ]+$/', $_POST['country'])) {
    echo "Invalid country";
    $error = 1;
} else if (!isset($_POST['rewpro']) || $_POST['rewpro'] == '' || strlen($_POST['rewpro']) > 30 || !preg_match('/^[a-zA-Z\' ]+$/', $_POST['rewpro'])) {
    echo "Invalid reward programme";
    $error = 1;
} else {
    $error = 0;
}

$error2;

if ($_POST['refcode'] !== '') {
    if (strlen($_POST['refcode']) !== 9 || !preg_match('/^(?=.*E1X|e1x)(?=.*[a-zA-Z0-9])/', $_POST['refcode'])) {
        echo "Invalid Referral Code";
        $error2 = 1;
    } else {
        $error2 = 0;
    }
} else {
    $error2 = 0;
}

$refcode = $_POST['refcode'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$phone = $_POST['phone'];
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$rewpro = $_POST['rewpro'];
$country = $_POST['country'];

$pwd = password_hash($password, PASSWORD_DEFAULT);

$comm = 0.45;
$regfee;
$perref;

if ($country === "Nigeria") {
    $regfee = 20;
    $perref = $comm * $regfee;
}

if ($country === "Other Countries") {
    $regfee = 50;
    $perref = $comm * $regfee;
}

if ($error === 0 && $error2 === 0) {
    $newRefCode = generateCode();

    function db_connect()
    {
        $dbh = "localhost";
        $dbu = "e1x";
        $dbp = "e1x@demo.com";
        $dbd = "e1x";

        $this->conn = new mysqli($this->dbh, $this->dbu, $this->dbp, $this->dbd);

        if ($this->conn->connect_error) {
            return "Failed to connect to database: " . connect_error();
        }
        return $this->conn;
    }

    $conn = $db->db_connect();

    echo $error;
    echo $error2;

    echo $conn;

    $tr = 0;
    $te = 0;

    $sql = "INSERT INTO `users`(`firstname`, `lastname`, `username`, `phone`, `email`, `password`, `country`, `reward_programme`, `reg_fee`, `per_ref`, `total_referrals`, `total_earnings`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssssssssidid', $fname, $lname, $username, $phone, $email, $pwd, $country, $rewpro, $regfee, $perref, $tr, $te);

    if ($stmt->execute()) {
        echo "Registration successful. Login to your dashboard.";
    } else {
        echo "Registration failed. Try again.";
    }

    $conn->close();
}
