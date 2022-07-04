<?php

if (!isset($_SESSION)) {
    session_start();
}

require_once "../classes/utils.php";

$error = 0;

if (isset($_POST['usrema']) && isset($_POST['password'])) {
    // print_r($_POST);

    if (str_contains($_POST['usrema'], ".com")) {
        if (!isset($_POST['usrema']) || strlen($_POST['usrema']) > 60 || !filter_var($_POST['usrema'], FILTER_VALIDATE_EMAIL)) {
            echo "Invalid email";
            $error = 1;
        } else if (!checkdnsrr(substr($_POST['usrema'], strpos($_POST['usrema'], '@') + 1), 'MX')) {
            echo "Email could not be verified";
            $error = 1;
        } else {
            $email = $_POST['usrema'];
            $error = 0;
        }
    } else {
        if (!isset($_POST['usrema']) || $_POST['usrema'] == '' || strlen($_POST['usrema']) > 20 || !preg_match('/^[a-zA-Z0-9]+$/', $_POST['usrema'])) {
            echo "Invalid username";
            $error = 1;
        } else {
            $username = $_POST['usrema'];
            $error = 0;
        }
    }

    if (!isset($_POST['password']) || $_POST['password'] == '' || !preg_match('/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[<>,.;\'":\{\}\[\]\/=\*\-_()&\^%\$#!|@~`])(?=.{6,})/', $_POST['password'])) {
        echo "Password must contain an uppercase, lowercase, number and a symbol. It must be more than 7 characters";
        $error = 1;
    } else {
        $password = $_POST['password'];
        $error = 0;
    }

    $uc = new User();

    if (isset($username)) {
        $uc->setUsername($username);
    }
    if (isset($email)) {
        $uc->setEmail($email);
    }
    if (isset($password)) {
        $uc->setPassword($password);
    }

    if ((isset($password) && isset($username)) || (isset($password) && isset($email))) {
        $uc->loginUser();
    }

} else {
    echo "Invalid Login";
}
