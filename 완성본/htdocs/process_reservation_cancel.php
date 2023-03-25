<?php
require_once('./module/DB.php');
require_once('./module/lib.php');

if(
    !isset($_GET['id'])
) {
    back("잘못된 접근");
}

$id = $_GET['id'];

$insert = DB::execute("DELETE FROM reservation where id=?", [$id]);

$user = DB::fetch("SELECT * FROM reservation where name=? and phone=?", [$_SESSION['user']['name'],$_SESSION['user']['phone']]);

if($user) {
    back("예약취소 완료");
} else {
    unset($_SESSION['user']);
    back("더 이상의 예약이 없어 로그아웃합니다.");
}