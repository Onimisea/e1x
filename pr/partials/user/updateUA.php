<?php

if(!isset($_SESSION)) {
    session_start();
}

$username = $_SESSION["username"];

require "../functions/functions.php";

$conn = db_connect();

if ($conn) {
    if (isset($_FILES['pp']['name'])) {
        $fname = mysqli_real_escape_string($conn, strip_tags($_POST['firstname']));
        $lname = mysqli_real_escape_string($conn, strip_tags($_POST['lastname']));
        $state = mysqli_real_escape_string($conn, strip_tags($_POST['state']));
        $acct_num = mysqli_real_escape_string($conn, strip_tags($_POST['acct_num']));
        $acct_name = mysqli_real_escape_string($conn, strip_tags($_POST['acct_name']));
        $acct_type = mysqli_real_escape_string($conn, strip_tags($_POST['acct_type']));
        $bank_name = mysqli_real_escape_string($conn, strip_tags($_POST['bank_name']));
        
        $pp =
        mysqli_real_escape_string($conn, strip_tags($_FILES['pp']['name']));
    
        $tn = explode(".", $pp);
        
        $nfn = $username . round(microtime(true)) . '.' . end($tn);
        
        $tmp_name = $_FILES['pp']['tmp_name'];
        
        $updUser = "UPDATE `users` SET `firstname` = '$fname', `lastname` = '$lname', `state` = '$state', `pp` = '$nfn', `acct_num` = '$acct_num', `acct_name` = '$acct_name', `acct_type` = '$acct_type', `bank_name` = '$bank_name', `aus` = 1 WHERE `username` = '$username'";
        
        $updt = mysqli_query($conn, $updUser);
        
        if ($updt) {
            move_uploaded_file($tmp_name, "../user/pp/$nfn");
            $_SESSION['pp'] = $nfn;
            echo "Updated successfully!";
        }
    
    
    } else {
        $fname = mysqli_real_escape_string($conn, strip_tags($_POST['firstname']));
        $lname = mysqli_real_escape_string($conn, strip_tags($_POST['lastname']));
        $state = mysqli_real_escape_string($conn, strip_tags($_POST['state']));
        $acct_num = mysqli_real_escape_string($conn, strip_tags($_POST['acct_num']));
        $acct_name = mysqli_real_escape_string($conn, strip_tags($_POST['acct_name']));
        $acct_type = mysqli_real_escape_string($conn, strip_tags($_POST['acct_type']));
        $bank_name = mysqli_real_escape_string($conn, strip_tags($_POST['bank_name']));
        
        $updUser = "UPDATE `users` SET `firstname` = '$fname', `lastname` = '$lname', `state` = '$state', `acct_num` = '$acct_num', `acct_name` = '$acct_name', `acct_type` = '$acct_type', `bank_name` = '$bank_name', `aus` = 1 WHERE `username` = '$username'";
        
        $updt = mysqli_query($conn, $updUser);
        
        if ($updt) {
            echo "Updated successfully!";
        }
    }
}