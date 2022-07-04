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

if ($_POST['refby'] !== '') {
    if (strlen($_POST['refby']) !== 9 || !preg_match('/^(?=.*E1X|e1x)(?=.*[a-zA-Z0-9])/', $_POST['refby'])) {
        echo "Invalid Referral Code";
        $error2 = 1;
    } else {
        $refby = $_POST['refby'];
        $error2 = 0;
    }
} else {
    $refby = 'Nil';
    $error2 = 0;
}

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
$perref = "45%";
$earning;

if ($country === "Nigeria") {
    $regfee = 20;
    $earning = $comm * $regfee;
}

if ($country === "Other Countries") {
    $regfee = 50;
    $earning = $comm * $regfee;
}

$total_referrals = 0;
$total_earnings = 0;

if ($error === 0 && $error2 === 0) {
    $newRefCode = generateCode();

    $usr = new User();

    $usr->setFirstname($fname);
    $usr->setLastname($lname);
    $usr->setEmail($email);
    $usr->setUsername($username);
    $usr->setPhone($phone);
    $usr->setPassword($pwd);
    $usr->setRefby($refby);
    $usr->setRefcode($newRefCode);
    $usr->setRewpro($rewpro);
    $usr->setCountry($country);
    $usr->setRegfee($regfee);
    $usr->setPerref($perref);
    $usr->setTotalReferrals($total_referrals);
    $usr->setTotalEarnings($total_earnings);

    $chkUsr = $usr->chkUsername($username);
    $chkEma = $usr->chkEmail($email);

    // echo $chkUsr;
    // echo $chkEma;

    // $userReg = $usr->insertData();

    // if ($userReg === 1) {
    //     echo "Registration successful. Login to your dashboard.";
    // } else {
    //     echo "Registration failed. Try again.";
    // }

    // $host = "localhost";
    // $user = "e1x";
    // $pass = "e1x@demo.com";
    // $name = "e1x";

    // $dsn = "mysql:host=$host;dbname=$name;charset=UTF8";

    // try {
    //     $pdo = new PDO($dsn, $user, $pass, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

    //     if ($pdo) {
    //         echo "Database connection successful via PDO";
    //     }
    // } catch (PDOException $e) {
    //     echo $e->getMessage();
    // }

    // $conn = $db->db_connect();

    // echo $error;
    // echo $error2;

    // echo $conn;

    // $tr = 0;
    // $te = 0;

    // $sql = "INSERT INTO `users`(`firstname`, `lastname`, `username`, `phone`, `email`, `password`, `country`, `reward_programme`, `reg_fee`, `per_ref`, `total_referrals`, `total_earnings`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // $stmt = $conn->prepare($sql);
    // $stmt->bind_param('ssssssssidid', $fname, $lname, $username, $phone, $email, $pwd, $country, $rewpro, $regfee, $perref, $tr, $te);

    // if ($stmt->execute()) {
    //     echo "Registration successful. Login to your dashboard.";
    // } else {
    //     echo "Registration failed. Try again.";
    // }

    // $conn->close();

}
