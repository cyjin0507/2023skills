<?php
require_once('./header.php');

$name = $_POST['name'];
$phone = $_POST['phone'];

if($phone == '000-0000-0000') {
    $_SESSION['user'] = [
        "name" => '관리자',
        "phone" => '000-0000-0000'
    ];
    movePage("관리자 로그인", "./manager.php#reservation");
}

$user = DB::fetch("SELECT * FROM reservation where name=? and phone=?", [$name, $phone]);

if($user) {
    $_SESSION['user'] = [
        "name" => $name,
        "phone" => $phone
    ];
    movePage('로그인되었습니다.', './mypage.php');
} else {
    back('예약정보가 없습니다.');
}