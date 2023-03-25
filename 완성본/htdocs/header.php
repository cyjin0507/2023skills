<?php
require_once('./module/DB.php');
require_once('./module/lib.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./resources/bootstrap-5.2.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="./resources/fontawesome-free-6.2.0-web/css/all.min.css">
    <script src="./js/jquery-3.6.0.js"></script>
    <title>Document</title>
</head>
<body>

    <!-- 헤더 -->

    <header>
        <div id="header" class="between content">
            <a href="/"><img src="./resources/img/logo.png" alt="img" title="img" id="logo"></a>
            <div id="menu" class="flex center">
                <nav>
                    <ul class="flex">
                        <a href="./sub.php"><li>캠핑장소개</li><hr class="header-line"></a>
                        <a href="./reservation.php"><li>예약하기</li><hr class="header-line"></a>
                        <a href="./mypage.php"><li>마이페이지</li><hr class="header-line"></a>
                    </ul>
                </nav>
                <div id="util" class="flex">
                    <?php
                    if(isset($_SESSION['user'])) {
                        ?>
                        <div><a href="./logout.php">로그아웃</a></div>
                        <?php
                    } else {
                        ?>
                        <div><a href="./login.php">로그인</a></div>
                        <?php
                    }
                    ?>
                    <div><a href="./manager.php#reservation">운영관리</a>
                        <div id="sub-menu" class="flex">
                            <a href="./manager.php#reservation">예약관리</a>
                            <a href="./manager.php#order">주문관리</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <div id="header-def"></div>

    <!-- 헤더 -->