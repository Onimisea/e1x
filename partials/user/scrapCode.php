// connect to database
// $C = connect();
// if ($C) {
// check if subpin is available

// check if user with the same username already exists

// check if user with the same email already exists

// $res = sqlSelect($C, 'SELECT `id` FROM `users` where email=?', 's', $_POST['email']);

// if ($res && $res->num_rows === 0) {
// create the account

// $query1 = "INSERT INTO `users`(`firstname`, `lastname`, `email`, `username`, `pn`, `country`, `state`, `pp`, `password`, `tos`, `subtype`, `subpin`, `srd`, `reg_fee`, `reg_bonus`, `ref_bonus`, `cae`, `total_quiz`, `quiz_earnings`, `total_referrals`, `referral_earnings`, `total_earnings`, `last_withdrawal`, `total_withdrawal`, `withdrawal_threshold`, `balance`, `acct_num`, `acct_name`, `acct_type`, `bank_name`, `next_quiz`, `quiz_dur`, `nqb`, `referred_by`, `referral_link`, `addedOn`, `vericode`, `verified`, `aus`) VALUES (':fname',':lname',':email',':username',':pn',':country',':state',':pp',':password',':tos',':subtype',':subpin',':srd',':reg_fee',':reg_bonus',':ref_bonus',':cae',':total_quiz',':quiz_earnings',':total_referrals',':referral_earnings',':total_earnings',':last_withdrawal',':total_withdrawal',':withdrawal_threshold',':balance',':acct_num',':acct_name',':acct_type',':bank_name',':next_quiz',':quiz_dur',':nqb',':referred_by',':referral_link',':addedOn',':vericode',':verified',':aus')";

// echo $usrId;

// $id = sqlInsert($C, 'INSERT INTO users VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', "sssssssssssssiiiiiiiiiddiissssssissssii", $fname, $lname, $email, $username, $pn, $country, $state, $pp, $pwd, $tos, $subtype, $subpin, `ADDDATE(NOW(), INTERVAL 2195 HOUR)`, $reg_fee, $reg_bonus, $ref_bonus, $cae, $total_quiz, $quiz_earnings, $total_referrals, $referral_earnings, $total_earnings, $last_withdrawal, $total_withdrawal, $withdrawal_threshold, $balance, $acct_num, $acct_name, $acct_type, $bank_name, `DATE_ADD(NOW(), INTERVAL 5 HOUR)`, `DATE_ADD(NOW(), INTERVAL 5 HOUR)`, $nqb, $referred_by, $refLink, `DATE_ADD(NOW(), INTERVAL 5 HOUR)`, $veriCode, $verified, $aus);
// if ($id !== -1) {
//     $errors[] = 0;
// } else {
//     // Failed to insert into database
//     $errors[] = 14;
// }

//     } else {
//         // This email is already in use
//         $errors[] = 15;
//     }
// } else {
//     // failed to connect to database
//     $errors[] = 16;
//     echo "unable to connect to database";
// }
