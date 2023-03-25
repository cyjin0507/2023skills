<?php
require_once('./module/DB.php');
require_once('./module/lib.php');
$jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);

if(
    !isset($jsonData['reservationId']) ||
    !isset($jsonData['orderList']) ||
    !isset($jsonData['tool'])
) {
    echo "잘못된 접근";
    exit;
}
$reservationId = $jsonData['reservationId'];
$orderList = $jsonData['orderList'];
$tool = $jsonData['tool'];

$reservation = DB::fetch("SELECT * FROM reservation where id=?", [$reservationId]);

if(!$reservation) {
    echo "유효하지 않은 예약";
    exit;
}

$jsonData = json_encode([
    "orderList" => $orderList,
    "tool" => $tool
]);

$insert = DB::execute("INSERT INTO `orders`(`reservation_id`, `json_data`, `type`, `create_date`) VALUES (?,?,'accept',NOW())", [$reservationId,$jsonData]);

echo "주문 성공";
