<?php

if (!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require_once "../classes/utils.php";

$uc = new User();

$uc->getDashTable();
