<?php
require_once('./util/DB.php');
require_once('./util/lib.php');

$data = DB::fetchAll("SELECT * FROM orders");

echo json_encode($data);