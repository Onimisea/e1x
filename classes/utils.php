<?php

require_once "config.php";

class DB
{
    // properties
    private $dbh = "localhost";
    private $dbu = "e1x";
    private $dbp = "e1x@demo.com";
    private $dbd = "e1x";

    private $conn = null;

    private function __construct()
    {
        $this->dbh = $dbh;
        $this->dbu = $dbu;
        $this->dbp = $dbp;
        $this->dbd = $dbd;
    }

    public function db_connect()
    {
        $this->conn = new mysqli($this->dbh, $this->dbu, $this->dbp, $this->dbd);

        if ($this->conn->connect_error) {
            return "Failed to connect to database: " . connect_error();
        }
        return $this->conn;
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
