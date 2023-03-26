<?php
require_once('./util/DB.php');
require_once('./util/lib.php');

if(!isset($_GET['id'])) {
    echo "잘못된 접근";
    exit;
}

$insert = DB::execute("UPDATE orders SET type='cancel' where id=?", [$_GET['id']]);

echo "주문이 취소되었습니다.";