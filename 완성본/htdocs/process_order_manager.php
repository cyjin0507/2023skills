<?php
require_once('./module/DB.php');
require_once('./module/lib.php');

if(
    !isset($_GET['id']) ||
    !isset($_GET['process'])
) {
    back("잘못된 접근");
}

$id = $_GET['id'];
$process = $_GET['process'];

DB::execute("UPDATE orders SET type=? where id=?", [$process, $id]);

if($process == 'complete') {
    back("배달이 완료되었습니다.");
} else {
    back("배달이 취소되었습니다.");
}
