<?php
require_once('./module/DB.php');
require_once('./module/lib.php');

if(
    !isset($_GET['id']) ||
    !isset($_GET['state'])
) {
    back("잘못된 접근");
}

$id = $_GET['id'];
$state = $_GET['state'];

if($state == 'complete') {
    DB::execute("UPDATE reservation set type=? where id=?", [$state, $id]);
    back("예약 수락 성공");
} else {
    DB::execute("DELETE FROM reservation where id=?", [$id]);
    back("예약 삭제 성공");
}
