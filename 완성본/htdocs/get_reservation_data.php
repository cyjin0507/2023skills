<?php
require_once('./module/lib.php');
require_once('./module/DB.php');

$output = [];
$output['reservation'] = DB::fetchAll("SELECT * FROM reservation");
$output['serverDate'] = date('Y-m-d', time());

echo json_encode($output);