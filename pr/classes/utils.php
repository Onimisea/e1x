<?php

require_once "config.php";

class DB
{
    // properties
    private $dbh = DB_HOST;
    private $dbu = DB_USERNAME;
    private $dbp = DB_PASSWORD;
    private $dbd = DB_DATABASE;

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
