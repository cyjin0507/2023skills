<?php
require_once('./header.php');

if (!isset($_SESSION['user'])) {
    movePage("로그인 후 이용할 수 있습니다.", './login.php');
}

if ($_SESSION['user']['phone'] != '000-0000-0000') {
    back("관리자만 이용할 수 있습니다.");
}

$startDate = date('Y-m-d', time());
$endDate = date('Y-m-d', strtotime($startDate . "+13 day"));

if (isset($_GET['startDate']) && isset($_GET['endDate'])) {
    $startDate = $_GET['startDate'];
    $endDate = $_GET['endDate'];
}

$reservation = DB::fetchAll("SELECT * FROM reservation where date>=? and date<=?", [$startDate, $endDate]);
$reservationTotalCount = DB::fetch("SELECT sum(price) as price FROM reservation where date>=? and date<=?", [$startDate, $endDate])->price;
?>


<!-- 서브 템플릿 -->

<section id="sub-visual">
    <div id="sub-visual-txt">
        <div>운영관리</div>
        <div>남녀노소 모두가 행복한 Skills Camping을 소개합니다!</div>
    </div>
</section>
<div id="url-show">
    <div class="content flex">
        <a href="./index.html" class="home"><i class="fa-solid fa-house"></i></a>
        <div>운영관리</div>
    </div>
</div>

<!-- 서브 템플릿 -->

<section id="reservation" class="mt-5 content">
    <div class="title">
        <div>예약관리</div>
        <h2>서브페이지 <span>예약목록</span></h2>
    </div>

    <div class="between mt-5">
        <div class="tabs">
            <a href="./manager.php#reservation" class="active">예약관리</a>
            <a href="./manager.php#order">주문관리</a>
        </div>
        <form action="./manager.php#reservation" class="between" style="width: 550px;">
            <div class="input-group" style="width: 240px;">
                <span class="input-group-text">시작일</span>
                <input type="date" name="startDate" class="form-control" value="<?=$startDate?>">
            </div>
            <div class="input-group" style="width: 240px;">
                <span class="input-group-text">종료일</span>
                <input type="date" name="endDate" class="form-control" value="<?=$endDate?>">
            </div>
            <button class="btn btn-success">조회</button>
        </form>
        <button class="btn btn-success">예약의 총 건수 : <?=count($reservation)?>건</button>
        <button class="btn btn-success">합계금액 : <?=$reservationTotalCount?>원</button>
    </div>

    <table class="table mt-5 table-striped">
        <thead>
            <tr class="table-success">
                <td>예약날짜</td>
                <td>자리번호</td>
                <td>예약자명</td>
                <td>예약자휴대폰번호</td>
                <td>예약상태</td>
                <td>예약처리(승인/취소)버튼</td>
                <td>신청일</td>
            </tr>
        </thead>
        <tbody>
            <?php
            foreach($reservation as $key=>$value) {
                ?>
                <tr>
                    <td><?=$reservation[$key]->date?></td>
                    <td><?=$reservation[$key]->place?></td>
                    <td><?=$reservation[$key]->name?></td>
                    <td><?=$reservation[$key]->phone?></td>
                    <td><?=$reservation[$key]->type == 'complete' ? '예약완료' : '예약중'?></td>
                    <?php
                    if($reservation[$key]->type == 'complete') {
                        ?>
                        <td>수락된 예약</td>
                        <?php
                    } else {
                        ?>
                        <td>
                            <a class="btn btn-success" href="./process_reservation_manager.php?id=<?=$reservation[$key]->id?>&state=complete">승인</a>
                            <a class="btn btn-danger" href="./process_reservation_manager.php?id=<?=$reservation[$key]->id?>&state=cancel">취소</a>
                        </td>
                        <?php
                    }
                    ?>
                    <td><?=$reservation[$key]->create_date?></td>
                </tr>
                <?php
            }
            ?>
        </tbody>
    </table>

</section>

<?php
$orderList = DB::fetchAll("SELECT * FROM orders");
$reservation = DB::fetchAll("SELECT * FROM reservation");
?>

<section id="order" class="content mt-5">
<div class="title">
        <div>주문관리</div>
        <h2>서브페이지 <span>주문목록</span></h2>
    </div>
    <div class="flex mt-5" style="gap: 15px;">
        <div class="tabs">
            <a href="./manager.php#reservation">예약관리</a>
            <a href="./manager.php#order" class="active">주문관리</a>
        </div>
        <input type="date" name="orderdate" class="form-control" id="orderdate" style="width: 160px;">
        <div class="flex" style="gap:20px;">
            <button class="btn btn-success">주문접수총건수 : <span class="order-one"></span>건</button>
            <button class="btn btn-success">주문취소총건수 : <span class="order-two"></span>건</button>
            <button class="btn btn-success">배달완료총건수 : <span class="order-three"></span>건</button>
            <button class="btn btn-success">배달완료 합계금액 : <span class="order-four"></span>원</button>
        </div>
    </div>

    <table class="table mt-5 table-striped" id="order-table">
        <thead>
            <tr class="table-success">
                <th>(예약/주문)날짜</th>
                <th>자리번호</th>
                <th>주문건수</th>
                <th>배달완료건수</th>
                <th>주문합계금액</th>
                <th>주문상세보기 버튼</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <div class="order-data" style="display: none;"><?=json_encode($orderList)?></div>
    <div class="reservation-data" style="display: none;"><?=json_encode($reservation)?></div>

    <script src="./js/util/Util.js"></script>
    <script src="./js/util/Popup.js"></script>
    <script src="./js/manager/Manager.js"></script>

    <script>

        let lastDate = null
        const currentReservationList = []
        const refreshFunc = () => {
            this.setTable(lastDate)
        }


        const popup = new ManagerPopup(refreshFunc)
        const order = JSON.parse(document.querySelector('.order-data').innerHTML)
        const reservation = JSON.parse(document.querySelector('.reservation-data').innerHTML)

        order.forEach(x=> {
            x.data = JSON.parse(x.json_data)
            x.price = x.data.orderList[0] * 12000
            x.price += x.data.orderList[1] * 15000
            x.price += x.data.orderList[2] * 3000
            x.price += x.data.orderList[3] * 5000
            x.price += x.data.orderList[4] * 4000
            x.price += x.data.tool ? 10000 : 0
        })

        reservation.forEach(x=> {
            x.order = order.filter(y=>y.reservation_id == x.id)
        })

        document.querySelector('input[name="orderdate"]').addEventListener('change', (e)=> setTable(e.target.value))

        refreshFunc()

        function setTable(date) {
            lastDate = date


            document.querySelector('#order-table tbody').innerHTML = ''
            currentReservationList.length = 0

            reservation.forEach(x=> {
                if(date && date !== x.date) {
                    return
                }

                currentReservationList.push(x)
                const tr = createTr(x)

                document.querySelector('#order-table tbody').appendChild(tr)
                popup.saveOrder(x.id, x.order, tr.querySelector('.order-count'))
            })

            setTotal()
        }

        function createTr({
            id, date, place, order
        }) {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <tr>
                    <td>${date} / ${order.reduce((s, order)=>(order.create_date), '주문X')}</td>
                    <td>${place}</td>
                    <td class="order-count">${order.reduce((s,order)=>(order.type!=="cancel"?s+1:s),0)}</td>
                    <td>${order.reduce((s,order)=>(order.type=="complete"?s+1:s),0)}</td>
                    <td>${order.reduce((s,order)=>(order.type=="complete"?s+(order.price):s),0)}</td>
                    <td><button class="btn btn-success">주문상세보기</button></td>
                <tr>
            `
            tr.querySelector('button').addEventListener('click', ()=> {
                popup.open({
                    index: id
                })
            })

            return tr
        }

        function setTotal() {
            document.querySelector('.order-one').innerHTML =currentReservationList.reduce((s, {
                order
            })=>
            s + order.reduce((s,order)=> (order.type !== 'cancel' ? s+1 : s),0),0)

            document.querySelector('.order-two').innerHTML =currentReservationList.reduce((s, {
                order
            })=>
            s + order.reduce((s,order)=> (order.type == 'cancel' ? s+1 : s),0),0)

            document.querySelector('.order-three').innerHTML =currentReservationList.reduce((s, {
                order
            })=>
            s + order.reduce((s,order)=> (order.type == 'complete' ? s+1 : s),0),0)

            document.querySelector('.order-four').innerHTML =currentReservationList.reduce((s, {
                order
            })=>
            s + order.reduce((s,order)=> (order.type == 'complete' ? s+(order.price) : s),0),0)
        }

    </script>

</section>




<?php
require_once('./footer.php');
?>