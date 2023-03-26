<?php
require_once('./header.php');

unset($_SESSION['user']);

movePage('로그아웃 되었습니다.', '/');