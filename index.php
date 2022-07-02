<?php

$page = isset($_GET['url']) ? $_GET['url'] : 'home';

// includes folder
$inc_folder = "pr/";

// get all files in the includes folder
$inc_files = glob($inc_folder . "*.html");

$inc_file_name = $inc_folder . $page . ".html";

if (in_array($inc_file_name, $inc_files)) {
    include $inc_file_name;
} else {
    include $inc_folder . "404.html";
}
