<?php
require_once('./util/DB.php');
require_once('./util/lib.php');

$id = $_GET['id'];
$state = $_GET['state'];

if($state == 'cancel') {
    $insert = DB::execute("DELETE FROM reservation where id=?", [$id]);
    back("예약 취소 완료");
} else {
    $insert = DB::execute("UPDATE reservation SET type='complete' where id=?",[$id]);
    back("예약 수락 완료");
}