<?php

if (!isset($_SESSION)) {
    session_start();
}

require_once "../../classes/utils.php";

if (isset($_POST['username']) && isset($_POST['password'])) {
    if (!isset($_POST['username']) || $_POST['username'] == '' || strlen($_POST['username']) > 20 || !preg_match('/^[a-zA-Z0-9]+$/', $_POST['username'])) {
        echo "error=invalidUsername";
        exit();
    } else {
        $username = trim($_POST['username']);
    }

    if (!isset($_POST['password']) || $_POST['password'] == '' || !preg_match('/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[<>,.;\'":\{\}\[\]\/=\*\-_()&\^%\$#!|@~`])(?=.{6,})/', $_POST['password'])) {
        echo "error=invalidPassword";
        exit();
    } else {
        $password = trim($_POST['password']);
    }

    $uc = new User();
    $uc->setUsername($username);
    $uc->setPassword($password);

    $uc->loginUser();

}
