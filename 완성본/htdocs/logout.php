<?php
require_once('./header.php');

unset($_SESSION['user']);

movePage('로그아웃 성공', './index.php');