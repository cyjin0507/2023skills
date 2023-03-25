<?php
require_once('./header.php');
if(
    !isset($_POST['name']) ||
    !isset($_POST['phone'])
) {
    back("잘못된 접근");
}

$name = $_POST['name'];
$phone = $_POST['phone'];

if($phone == '000-0000-0000') {
    $_SESSION['user'] = [
        "name" => $name,
        "phone" => $phone
    ];
    movePage('관리자 로그인 완료되었습니다.', './manager.php#reservation');
}

$user = DB::fetch("SELECT * FROM reservation where phone=? and name=?", [$phone, $name]);


if($user) {
    $_SESSION['user'] = [
        "name" => $name,
        "phone"=> $phone
    ];
    movePage('로그인 완료되었습니다.', '/');
} else {
    back("예약정보가 없습니다.");
}