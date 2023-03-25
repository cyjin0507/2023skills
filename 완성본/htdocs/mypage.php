<?php
require_once('./header.php');
if(!isset($_SESSION['user'])) {
    movePage('로그인 후 이용할 수 있습니다.', './login.php');
}
?>

<!-- 서브 템플릿 -->

<section id="sub-visual">
    <div id="sub-visual-txt">
        <div>마이페이지</div>
        <div>남녀노소 모두가 행복한 Skills Camping을 소개합니다!</div>
    </div>
</section>
<div id="url-show">
    <div class="content flex">
        <a href="./index.html" class="home"><i class="fa-solid fa-house"></i></a>
        <div>마이페이지</div>
    </div>
</div>

<!-- 서브 템플릿 -->

<?php
$reservation = DB::fetchAll("SELECT * FROM reservation where name=? and phone=? order by date desc", [$_SESSION['user']['name'], $_SESSION['user']['phone']])

?>

<section id="mypage" class="content mt-5">
    <div class="title">
        <div>마이페이지</div>
        <h2>서브페이지 <span>예약목록</span></h2>
    </div>

    <table class="table mt-5">
        <thead>
            <tr>
                <th>예약날짜</th>
                <th>예약자리</th>
                <th>예약상태</th>
                <th>예약취소버튼</th>
                <th>바비큐 주문하기</th>
                <th>주문건수</th>
                <th>주문내역보기</th>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach ($reservation as $key => $value) {
                $orderList = DB::fetchAll("SELECT * FROM orders where reservation_id=?", [$reservation[$key]->id]);
                $orderCnt = DB::fetch("SELECT count(*) as cnt FROM orders where reservation_id=?", [$reservation[$key]->id])->cnt;
            ?>
                <tr class="reservation-row" data-id="<?=$reservation[$key]->id?>">
                    <td><?=$reservation[$key]->date?></td>
                    <td><?=$reservation[$key]->place?></td>
                    <td><?=$reservation[$key]->type=='ongoing' ? '예약중' : '예약완료'?></td>
                    <td><button class="btn btn-danger reservation-cancel-btn">예약취소</button></td>
                    <td><button class="btn btn-success bbq-order-btn">바비큐 주문하기</button></td>
                    <td class="order-count"><?=$orderCnt?>건</td>
                    <td><button class="btn btn-success order-detail-btn">주문상세보기</button>
                        <div class="orderdata" style="display:none"><?=json_encode($orderList)?></div>
                    </td>
                </tr>
            <?php
            }
            ?>

        </tbody>
    </table>

</section>

<script src="./js/util/Popup.js"></script>
<script src="./js/util/Util.js"></script>
<script src="./js/mypage/MyPageDetailControl.js"></script>
<script src="./js/mypage/MypageBBQControl.js"></script>
<script src="./js/mypage/MypageApp.js"></script>
<?php
require_once('./footer.php');
?>