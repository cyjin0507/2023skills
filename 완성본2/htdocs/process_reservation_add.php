<?php
require_once('./util/DB.php');
require_once('./util/lib.php');

$jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);

if(
    !isset($jsonData['price']) ||
    !isset($jsonData['place']) ||
    !isset($jsonData['phone']) ||
    !isset($jsonData['date']) ||
    !isset($jsonData['name'])
) {
    echo "잘못된 접근";
    exit;
}

$price = $jsonData['price'];
$place = $jsonData['place'];
$phone = $jsonData['phone'];
$date = $jsonData['date'];
$name = $jsonData['name'];

$reservation = DB::fetch("SELECT * FROM reservation where date=? and place=?", [$date, $place]);

if($reservation) {
    echo "이미 예약이 완료된 자리입니다.";
    exit;
}

$insert = DB::execute("INSERT INTO `reservation`(`name`, `phone`, `place`, `date`, `type`, `price`, `create_date`) VALUES (?,?,?,?,'ongoing',?,NOW())", [$name,$phone,$place,$date,$price]);

$_SESSION['user'] = [
    "name" => $name,
    "phone" => $phone
];

echo "예약정보가 정상 등록되었습니다. 관리자 승인 후 예약이 최종 완료됩니다.";