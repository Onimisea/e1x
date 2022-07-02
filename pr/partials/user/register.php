<?php

require_once "../../classes/utils.php";

if (!isset($_POST['subpin']) || $_POST['subpin'] == '' || strlen($_POST['subpin']) !== 16 || !preg_match('/^(?=.*GLD|SIL|BRZ:)(?=.*[a-zA-Z0-9])/', $_POST['subpin'])) {
    echo "Invalid Subscription Pin";
}

if (!isset($_POST['firstname']) || $_POST['firstname'] == '' || strlen($_POST['firstname']) > 20 || !preg_match('/^[a-zA-Z]+$/', $_POST['firstname'])) {
    echo "Invalid firstname";
}

if (!isset($_POST['lastname']) || $_POST['lastname'] == '' || strlen($_POST['lastname']) > 20 || !preg_match('/^[a-zA-Z]+$/', $_POST['lastname'])) {
    echo "Invalid lastname";
}

if (!isset($_POST['email']) || strlen($_POST['email']) > 60 || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email";
} else if (!checkdnsrr(substr($_POST['email'], strpos($_POST['email'], '@') + 1), 'MX')) {
    echo "Email could not be verified";
}

if (!isset($_POST['username']) || $_POST['username'] == '' || strlen($_POST['username']) > 20 || !preg_match('/^[a-zA-Z0-9]+$/', $_POST['username'])) {
    echo "Invalid username";
}

if (!isset($_POST['phone-number']) || $_POST['phone-number'] == '' || strlen($_POST['phone-number']) > 14 || !preg_match('/^(\+[0-9])/', $_POST['phone-number'])) {
    echo "Invalid phone number";
}

if (!isset($_POST['country']) || $_POST['country'] == '' || strlen($_POST['country']) > 8 || !preg_match('/^[a-zA-Z]+$/', $_POST['country'])) {
    echo "Invalid country";
}

if (!isset($_POST['state']) || $_POST['state'] == '' || strlen($_POST['state']) > 8 || !preg_match('/^[a-zA-Z]+$/', $_POST['state'])) {
    echo "Invalid state";
}

if (!isset($_POST['password']) || $_POST['password'] == '' || !preg_match('/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[<>,.;\'":\{\}\[\]\/=\*\-_()&\^%\$#!|@~`])(?=.{6,})/', $_POST['password'])) {
    echo "Invalid password";
} else if (!isset($_POST['confirm-password']) || $_POST['confirm-password'] !== $_POST['password']) {
    echo "Password does not match";
}

/*
 **  Image Validation $errors[] = 12;
 */

$regUrl = $_POST['regUrl'];
$subpin = $_POST['subpin'];
$fname = $_POST['firstname'];
$lname = $_POST['lastname'];
$email = $_POST['email'];
$username = $_POST['username'];
$pn = $_POST['phone-number'];
$country = $_POST['country'];
$state = $_POST['state'];
$password = $_POST['password'];
$pp = $_FILES['profile-picture']['name'];
$tos = $_POST['tos'];
$subtype = getSubtype($subpin);
$veriCode = genVeriCode();
$refLink = genRefLink($username);
$tmp_name = $_FILES['pp']['tmp_name'];
$pwd = password_hash($password, PASSWORD_DEFAULT);

if (str_contains($regUrl, "refer=")) {
    $rflArr = explode("refer=", $regUrl);
    $referred_by = end($rflArr);
} else {
    $referred_by = "Nil";
}

$total_quiz = 0;
$quiz_earnings = 0;
$total_referrals = 0;
$referral_earnings = 0;
$reg_fee = 0;
$reg_bonus = 0;
$ref_bonus = 0;
$total_earnings = 0;
$last_withdrawal = 0.00;
$total_withdrawal = 0.00;
$withdrawal_threshold = 0;
$balance = 0.00;
$acct_num = "Nil";
$acct_name = "Nil";
$acct_type = "Savings";
$bank_name = "Nil";
$verified = 'No';
$srd = `DATE_ADD(now(), INTERVAL 2190 HOUR)`;
$addedOn = '';
$nqb = 0;
$cae = 0;
$next_quiz = '';
$last_quiz = '';
$aus = 0;

if ($subtype === "Gold") {
    $reg_fee = 30000;
    $withdrawal_threshold = 30000;
    $reg_bonus = 1000;
    $ref_bonus = 9000;
    $cae = 100;
}

if ($subtype === "Silver") {
    $reg_fee = 15000;
    $withdrawal_threshold = 20000;
    $reg_bonus = 500;
    $ref_bonus = 4500;
    $cae = 60;
}

if ($subtype === "Bronze") {
    $reg_fee = 7500;
    $withdrawal_threshold = 10000;
    $reg_bonus = 300;
    $ref_bonus = 2300;
    $cae = 30;
}

$total_earnings = $quiz_earnings + $referral_earnings + $reg_bonus;
$balance = $total_earnings;

// Rename the uploaded file
$uploadName = $_FILES['pp']['name'];
$ext = strtolower(substr($uploadName, strripos($uploadName, '.') + 1));
$nfn = $_POST['username'] . '.' . $ext;

if (count($errors) === 0) {
    if (isset($_POST['csrfToken']) && validateToken($_POST['csrfToken'])) {
        $uc = new User();
        $uc->setSubpin($subpin);
        $uc->setFirstname($fname);
        $uc->setLastname($lname);
        $uc->setEmail($email);
        $uc->setUsername($username);
        $uc->setPn($pn);
        $uc->setCountry($country);
        $uc->setState($state);
        $uc->setPp($pp);
        $uc->setPpNfn($nfn);
        $uc->setPpTmpName($tmp_name);
        $uc->setPassword($pwd);
        $uc->setTos($tos);
        $uc->setSubtype($subtype);
        $uc->setSrd($srd);
        $uc->setRegfee($reg_fee);
        $uc->setRegbonus($reg_bonus);
        $uc->setRefbonus($ref_bonus);
        $uc->setCae($cae);
        $uc->setTotalQuiz($total_quiz);
        $uc->setQuizEarnings($quiz_earnings);
        $uc->setTotalReferrals($total_referrals);
        $uc->setReferralEarnings($referral_earnings);
        $uc->setTotalEarnings($total_earnings);
        $uc->setLastWithdrawal($last_withdrawal);
        $uc->setTotalWithdrawal($total_withdrawal);
        $uc->setWithdrawalThreshold($withdrawal_threshold);
        $uc->setBalance($balance);
        $uc->setAcctnum($acct_num);
        $uc->setAcctname($acct_name);
        $uc->setAccttype($acct_type);
        $uc->setBankname($bank_name);
        $uc->setNextQuiz($next_quiz);
        $uc->setLastQuiz($last_quiz);
        $uc->setNqb($nqb);
        $uc->setReferredBy($referred_by);
        $uc->setReferralLink($refLink);
        $uc->setAddedOn($addedOn);
        $uc->setVericode($veriCode);
        $uc->setVerified($verified);
        $uc->setAus($aus);

        $chkSp = $uc->chkSubpin($subpin);
        $chkUsr = $uc->chkUsername($username);
        $chkEma = $uc->chkEmail($email);
        $chkReffby = $uc->chkRefby($referred_by);
        $chkPP = chkPp();

        if ($chkSp == 1) {
            if ($chkUsr == 1 || $chkEma == 1) {
                $errors[] = "Username or email already exists";
            } else {
                if ($chkPP === 1) {
                    if ($referred_by == "Nil") {
                        $usrReg = $uc->regUser();

                        if ($usrReg == 1) {
                            if (move_uploaded_file($tmp_name, "../../user/pp/" . $nfn)) {
                            }

                            $uc->togSubpin($subpin);
                        }
                    } else {
                        if ($chkReffby == 0) {
                            // referrer is not a user
                            $errors[] = "Referrer is not a user";
                        } else {
                            $usrReg = $uc->regUser();

                            if ($usrReg == 1) {
                                if (move_uploaded_file($tmp_name, "../../user/pp/" . $nfn)) {
                                }

                                $uc->togSubpin($subpin);

                                // pay referrer
                                $uc->payReferrer($subtype, $referred_by);
                            } else {
                                $errors[] = "Registration failed";
                            }
                        }
                    }
                } else {
                    $errors[] = "Invalid profile picture uploaded";
                }
            }

        } else {
            $errors[] = "USED or invalid pin";
        }
    } else {
        $errors[] = "Invalid CSRF Token";
    }
}
