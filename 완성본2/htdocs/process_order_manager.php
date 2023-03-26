<?php
require_once('./util/DB.php');
require_once('./util/lib.php');

$id = $_GET['id'];
$process = $_GET['process'];

$insert = DB::execute("UPDATE orders SET type=? where id=?", [$process, $id]);

if($process == 'cancel') {
    back("주문 취소 되었습니다.");
} else {
    back("배달완료 처리 되었습니다.");
}