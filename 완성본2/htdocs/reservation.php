<?php
require_once('./header.php');
?>

        <!--  -->

        <div id="sub-visual">
            <div class="sub-visual-txt">
                <div>예약하기</div>
                <div>자연과 인간의 아름다운 조화! Skills 캠핑장입니다.</div>
            </div>
        </div>


        <!--  -->

        <section class="content" style="margin-top: 150px; width: 1400px;">
            <div class="between">
                <div class="title">
                    <div>예약하기</div>
                    <h2>서브페이지 <span>예약 현황표</span></h2>
                </div>
                <div style="margin-top: 45px;">
                    예약가능 : <i class="fa-solid fa-tents W"></i>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    예약중 : <i class="fa-solid fa-kiwi-bird R"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    예약완료 : <i class="fa-solid fa-person-shelter C"></i>
                </div>
            </div>

            <table class="table mt-5 table-striped">
                <thead class="table-success"></thead>
                <tbody></tbody>
            </table>
        </section>
        
<script src="./js/util/Popup.js"></script>
    <script src="./js/util/Util.js"></script>
    <script src="./js/reservation/ReservationPopupControl.js"></script>
    <script src="./js/reservation/ReservationPopup.js"></script>
    <script src="./js/reservation/ReservationTableControl.js"></script>
    <script src="./js/reservation/ReservationApp.js"></script>

<?php
require_once('./footer.php');
?>