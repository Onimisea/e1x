<?php

// Database Credentials
if (!defined('DB_TYPE')) {
  define('DB_TYPE', 'mysql');
}

if (!defined('DB_HOST')) {
  define('DB_HOST', 'localhost');
}

if (!defined('DB_NAME')) {
  define('DB_NAME', 'e1x');
}

if (!defined('DB_USER')) {
  define('DB_USER', 'e1x');
}

if (!defined('DB_PASS')) {
  define('DB_PASS', 'e1x@demo.com');
}

// Code we want to run on every page/script
date_default_timezone_set('GMT');
error_reporting(0);
session_set_cookie_params(['samesite' => 'Strict']);
session_start();
