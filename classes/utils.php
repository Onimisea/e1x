<?php

require_once "config.php";

function createToken()
{
    $seed = 'Aprendicash' . bin2hex(openssl_random_pseudo_bytes(8));
    $t = time() . 'Onimisea';
    $hash = hash_hmac('sha256', session_id() . $seed . $t, CSRF_TOKEN_SECRET, true);
    return urlSafeEncode($hash . '|' . $seed . '|' . $t);
}

function validateToken($token)
{
    $parts = explode('|', urlSafeDecode($token));

    if (count($parts) === 3) {
        $hash2 = hash_hmac('sha256', session_id() . $parts[1] . $parts[2], CSRF_TOKEN_SECRET, true);

        if (hash_equals($hash2, $parts[0])) {
            return true;
        }
    }
    return false;
}

function urlSafeEncode($data)
{
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function urlSafeDecode($data)
{
    return base64_decode(strtr($data, '-_', '+/'));
}

class User
{
    private $id;
    private $firstname;
    private $lastname;
    private $phone;
    private $username;
    private $email;
    private $password;
    private $refby;
    private $refcode;
    private $rewpro;
    private $country;
    private $regfee;
    private $perref;
    private $total_referrals;
    private $total_earnings;

    protected $dbCnx;
    // private $id;

    public function __construct($id = 0, $firstname = '', $lastname = '', $phone = '', $username = '', $email = '', $password = '', $refcode = '', $refby = '', $rewpro = '', $country = '', $regfee = '', $perref = '', $total_referrals = '', $total_earnings = '')
    {
        $this->id = $id;
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->phone = $phone;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->refby = $refby;
        $this->refcode = $refcode;
        $this->rewpro = $rewpro;
        $this->country = $country;
        $this->regfee = $regfee;
        $this->perref = $perref;
        $this->total_referrals = $total_referrals;
        $this->total_earnings = $total_earnings;

        $this->dbCnx = new PDO(DB_TYPE . ":host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS, [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getId($id)
    {
        return $this->id;
    }

    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;
    }

    public function getFirstname($firstname)
    {
        return $this->firstname;
    }

    public function setLastname($lastname)
    {
        $this->lastname = $lastname;
    }

    public function getLastname($lastname)
    {
        return $this->lastname;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getEmail($email)
    {
        return $this->email;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function getUsername($username)
    {
        return $this->username;
    }

    public function setPhone($phone)
    {
        $this->phone = $phone;
    }

    public function getPhone($phone)
    {
        return $this->phone;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function getPassword($password)
    {
        return $this->password;
    }

    public function setRefby($refby)
    {
        $this->refby = $refby;
    }

    public function getRefby($refby)
    {
        return $this->refby;
    }

    public function setRefcode($refcode)
    {
        $this->refcode = $refcode;
    }

    public function getRefcode($refcode)
    {
        return $this->refcode;
    }

    public function setRewpro($rewpro)
    {
        $this->rewpro = $rewpro;
    }

    public function getRewpro($rewpro)
    {
        return $this->rewpro;
    }

    public function setCountry($country)
    {
        $this->country = $country;
    }

    public function getCountry($country)
    {
        return $this->country;
    }

    public function setRegfee($regfee)
    {
        $this->regfee = $regfee;
    }

    public function getRegfee($regfee)
    {
        return $this->regfee;
    }

    public function setPerref($perref)
    {
        $this->perref = $perref;
    }

    public function getPerref($perref)
    {
        return $this->perref;
    }

    public function setTotalReferrals($total_referrals)
    {
        $this->total_referrals = $total_referrals;
    }

    public function getTotalReferrals($total_referrals)
    {
        return $this->total_referrals;
    }

    public function setTotalEarnings($total_earnings)
    {
        $this->total_earnings = $total_earnings;
    }

    public function getTotalEarnings($total_earnings)
    {
        return $this->total_earnings;
    }

    public function chkUsername($username)
    {
        $username = $this->username;

        try {
            $stm = $this->dbCnx->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
            $stm->execute([$this->username]);
            $count = $stm->fetchColumn();

            return $count;
        } catch (Exception $e) {
            // echo $e->getMessage();
            return $e->getMessage();
        }
    }

    public function chkEmail($email)
    {
        $email = $this->email;

        try {
            $stm = $this->dbCnx->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
            $stm->execute([$this->email]);
            $count = $stm->fetchColumn();

            return $count;
        } catch (Exception $e) {
            // echo $e->getMessage();
            return $e->getMessage();
        }
    }

    public function chkRefby($refby)
    {
        $refby = $this->refby;

        try {
            $stm = $this->dbCnx->prepare("SELECT COUNT(*) FROM users WHERE referral_code = ?");
            $stm->execute([$this->refby]);
            $count = $stm->fetchColumn();

            return $count;
        } catch (Exception $e) {
            echo $e->getMessage();
            return 0;
        }
    }

    public function payReferrer()
    {
        // $country = $this->country;
        $refby = $this->refby;
        $regfee = $this->regfee;

        try {
            $stm = $this->dbCnx->prepare("SELECT * FROM users WHERE referral_code = ?");
            $stm->execute([$this->refby]);
            $row = $stm->fetch(PDO::FETCH_ASSOC);

            if ($row === false) {
                return 0;
            } else {
                $earning = 0.45 * $regfee;
                $tr = $row['total_referrals'];
                $te = $row['total_earnings'];

                $tr2 = $tr + 1;
                $te2 = $te + $earning;

                $stm2 = $this->dbCnx->prepare("UPDATE `users` SET `total_referrals`=?,`total_earnings`=? WHERE referral_code = ?");
                $stm2->execute([$tr2, $te2, $this->refby]);
                $row = $stm2->fetch(PDO::FETCH_ASSOC);

                if ($row) {
                    return 1;
                }
            }
        } catch (Exception $e) {
            echo $e->getMessage();
            return 0;
        }
    }

    public function insertData()
    {
        try {
            $stm = $this->dbCnx->prepare("INSERT INTO `users`(`firstname`, `lastname`, `username`, `phone`, `email`, `password`, `country`, `referral_code`, `reward_programme`, `reg_fee`, `per_ref`, `total_referrals`, `total_earnings`, `referred_by`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            $stm->execute([$this->firstname,
                $this->lastname,
                $this->username,
                $this->phone,
                $this->email,
                $this->password,
                $this->country,
                $this->refcode,
                $this->rewpro,
                $this->regfee,
                $this->perref,
                $this->total_referrals,
                $this->total_earnings,
                $this->refby,
            ]);

            return 1;
        } catch (Exception $e) {
            echo $e->getMessage();
            return $e->getMessage();
        }
    }

    public function loginUser()
    {
        $username = $this->username;
        $email = $this->email;
        $password = $this->password;

        // print_r($row);

        if ($username) {
            $stm = $this->dbCnx->prepare("SELECT * FROM `users` WHERE `username` = ?");
            $stm->execute([$username]);
        }

        if ($email) {
            $stm = $this->dbCnx->prepare("SELECT * FROM `users` WHERE `email` = ?");
            $stm->execute([$email]);
        }

        $row = $stm->fetch(PDO::FETCH_ASSOC);

        if ($row === false) {
            echo "User does not exist";
            return 0;
        } else {
            if (password_verify($this->password, $row["password"])) {
                $_SESSION["loggedIn"] = true;
                $_SESSION["username"] = $row["username"];
                $_SESSION["refcode"] = $row['referral_code'];

                echo "Logged in successfully...";
                return 1;
            }
        }
    }
}

function generateCode()
{
    $pin = "";

    $pinChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    $pinCharArr = str_split($pinChars);

    for ($i = 0; $i < 6; $i++) {
        $randChar = array_rand($pinCharArr);
        $pin .= $pinCharArr[$randChar];
    }
    $finalPin = "E1X" . $pin;

    return $finalPin;
}
