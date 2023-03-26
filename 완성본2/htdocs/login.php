<?php
require_once('./header.php');
?>
<div id="sub-visual">
            <div class="sub-visual-txt">
                <div>로그인</div>
                <div>자연과 인간의 아름다운 조화! Skills 캠핑장입니다.</div>
            </div>
        </div>


<section class="content mt-5" style="width: 400px;">
    <form action="./login_process.php" method="POST" style="margin-top: 127px;">
        <div class="input-group">
            <span class="input-group-text">이름</span>
            <input type="text" class="form-control" name="name" placeholder="이름을 입력해주세요.">
        </div>
        <div class="input-group mt-3">
            <span class="input-group-text">전화번호</span>
            <input type="text" class="form-control" name="phone" placeholder="휴대폰 번호를 입력해주세요.">
        </div>
        <button class="btn btn-success mt-3" style="width: 100%;">로그인</button>
    </form>
</section>

<script src="./js/util/Util.js"></script>
<script>
    document.querySelector('input[name="phone"]').addEventListener('input', ()=> {
        document.querySelector('input[name="phone"]').value = phoneFormat(document.querySelector('input[name="phone"]').value)
    })
</script>


<?php
require_once('./footer.php');
?>