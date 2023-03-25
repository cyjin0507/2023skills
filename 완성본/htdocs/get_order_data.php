<?php
require_once('./module/DB.php');
require_once('./module/lib.php');

$data = DB::fetchAll("SELECT * FROM orders");

echo json_encode($data);