<?php
require_once('./module/lib.php');
require_once('./module/DB.php');

$jsonData = json_decode(file_get_contents('php://input'), true, 512, JSON_THROW_ON_ERROR);

if(
    !isset($jsonData['name']) ||
    !isset($jsonData['price']) ||
    !isset($jsonData['place']) ||
    !isset($jsonData['phone']) ||
    !isset($jsonData['date'])
) {
    echo "잘못된 접근";
    exit;
}

$name = $jsonData['name'];
$price = $jsonData['price'];
$place = $jsonData['place'];
$phone = $jsonData['phone'];
$date = $jsonData['date'];

if($phone == '000-0000-0000') {
    echo "사용할수 없는 휴대폰 번호입니다.";
    exit;
}

$insert = DB::execute("INSERT INTO `reservation`(`name`, `phone`, `place`, `date`, `type`, `price`, `create_date`) VALUES (?,?,?,?,'ongoing',?,NOW())",[$name,$phone,$place,$date,$price]);

$_SESSION['user'] = [
    "name" => $name,
    "phone" => $phone
];

echo "예약이 완료되었습니다.";