<?php

// Database Credentials
define('DB_TYPE', 'mysql');
define('DB_HOST', 'localhost');
define('DB_DATABASE', 'apr');
define('DB_USERNAME', 'aprAdmin');
define('DB_PASSWORD', 'apr@2022');

// Code we want to run on every page/script
date_default_timezone_set('GMT');
error_reporting(0);
session_set_cookie_params(['samesite' => 'Strict']);
session_start();
