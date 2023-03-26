<?php
require_once('./util/lib.php');
require_once('./util/DB.php');

if(!isset($_GET['id'])) {
    back("잘못된 접근");
}

$insert = DB::execute("DELETE FROM reservation where id=?", [$_GET['id']]);

back("삭제 완료");