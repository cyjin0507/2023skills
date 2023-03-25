<?php
require_once('./header.php');
if(isset($_SESSION['user'])) {
    back("이미 로그인 중입니다.");
}
?>

<!-- 서브 템플릿 -->

<section id="sub-visual">
    <div id="sub-visual-txt">
        <div>로그인</div>
        <div>남녀노소 모두가 행복한 Skills Camping을 소개합니다!</div>
    </div>
</section>
<!-- <div id="url-show">
    <div class="content flex">
        <a href="./index.html" class="home"><i class="fa-solid fa-house"></i></a>
        <div>로그인</div>
    </div>
</div> -->

<!-- 서브 템플릿 -->

<section class="content mt-5" style="width: 300px; padding-top: 37px;">
    <div class="title tc">
        <!-- <h2>서브페이지 <span>로그인</span></h2> -->
    </div>
    <form action="./login_process.php" method="POST" class="mt-5">
        <div class="input-group">
            <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
            <input type="text" class="form-control" name="name" placeholder="이름을 입력하세요.">
        </div>
        <div class="input-group mt-4">
            <span class="input-group-text"><i class="fa-solid fa-mobile-screen"></i></span>
            <input type="text" class="form-control" name="phone" placeholder="전화번호을 입력하세요.">
        </div>
        <button class="btn btn-success mt-4" style="width: 100%;">로그인</button>
    </form>
</section>

<script src="./js/util/Util.js"></script>
<script>
    document.querySelector('input[name="phone"]').addEventListener('input', e=> {
        document.querySelector('input[name="phone"]').value = phoneFormat(document.querySelector('input[name="phone"]').value)
    })

</script>
<?php
require_once('./footer.php');
?>