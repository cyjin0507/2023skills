<?php
require_once('./util/DB.php');
require_once('./util/lib.php');

header('Content-Type: application/json');

$output = [];
$output['reservation'] = DB::fetchAll("SELECT * FROM reservation");
$output['serverDate'] = date('Y-m-d', time());

echo json_encode($output);