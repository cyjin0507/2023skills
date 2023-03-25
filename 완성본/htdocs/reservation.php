<?php
require_once('./header.php');
?>
    <!-- 서브 템플릿 -->

    <section id="sub-visual">
        <div id="sub-visual-txt">
            <div>예약하기</div>
            <div>남녀노소 모두가 행복한 Skills Camping을 소개합니다!</div>
        </div>
    </section>
    <div id="url-show">
        <div class="content flex">
            <a href="./index.html" class="home"><i class="fa-solid fa-house"></i></a>
            <div>예약하기</div>
        </div>
    </div>

    <!-- 서브 템플릿 -->

    <section id="reservation-table" class="content mt-5" style="width: 1400px;">
        <div class="between">
        <div class="title">
            <div>예약하기</div>
            <h2>서브페이지 <span>예약 현황표</span></h2>
        </div>
        <div class="flex" style="margin-top:40px;">예약가능&nbsp;<span class="W"><i class="fa-solid fa-tents"></i></span> &nbsp;&nbsp;&nbsp;&nbsp;
            예약중&nbsp;<span class="R"><i class="fa-solid fa-kiwi-bird"></i></span>&nbsp;&nbsp;&nbsp;&nbsp;
            예약완료&nbsp;<span class=C><i class="fa-solid fa-person-shelter"></i></span></div>
        </div>
        
        <table class="table mt-5">
            <thead class="table-success"></thead>
            <tbody></tbody>
        </table>
    </section>

    <script src="./js/util/Popup.js"></script>
    <script src="./js/util/Util.js"></script>
    <script src="./js/reservation/ReservationPopup.js"></script>
    <script src="./js/reservation/ReservationPopupControl.js"></script>
    <script src="./js/reservation/ReservationTableControl.js"></script>
    <script src="./js/reservation/ReservationApp.js"></script>
<?php
require_once('./footer.php');
?>