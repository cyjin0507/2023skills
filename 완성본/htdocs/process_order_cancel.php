<?php
require_once('./module/DB.php');
require_once('./module/lib.php');

$id = $_GET['id'];

DB::execute("UPDATE orders SET type = 'cancel' where id=?", [$id]);

echo "주문 취소 완료";