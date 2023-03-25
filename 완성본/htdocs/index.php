<?php
require_once('./header.php');
?>

    <!-- 비주얼 -->

    <section id="visual">
        <div class="visual-img"></div>
        <div class="visual-img"></div>
        <div class="visual-img"></div>
        <div class="visual-txt">
            <div>비주얼이미지</div>
            <h2>Skills Camping <br> 올해 첫 개장!</h2>
            <div>지치고 힘든 일상생활 속에 가족, 연인과 함께 <br>
                자연과 하나가 되는 나만의 아지트! Skills Camping을 소개합니다.
            </div>
            <div class="flex">
                <div class="btn-box"></div>
                <i class="fa-solid fa-play start-btn" style="display: none;"></i>
                <i class="fa-solid fa-pause stop-btn"></i>
            </div>
        </div>
    </section>

    <!-- 비주얼 -->

    <!-- 섹션1 -->

    <section id="section1" class="content">
        <div class="title tc">
            <div>캠핑장 소개</div>
            <h2>메인페이지 <span>캠핑장 소개</span></h2>
        </div>
        <div class="title-btn tc">자세히보기 <i class="fa-solid fa-chevron-right"></i></div>

        <div id="section1-main" class="between">
            <div class="sec1-card">
                <div class="sec1-txt">
                    온가족이 함께 즐기는<br>
                    Skills Camping
                    <div class="tc title-btn">자세히보기 <i class="fa-solid fa-chevron-right"></i></div>
                </div>
            </div>
            <div class="sec1-card">
                
            </div>
            <div class="sec1-card">
                <div class="sec1-info">
                    <i class="fa-sharp fa-solid fa-quote-left"></i>
                    <div><span> * 캠핑장 구성</span></div>
                    <div>
                        - 텐트데크(3m X 5m) : 10 개소 <br>
                        - 오토캠핑(5m X 8m) : 7 개소
                    </div>
                    <div><span> * 부대시설 :</span> 관리소, 취사장, 세면장,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 화장실, 포토존, 전망대,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 잔디밭, 어린이놀이터</div>
                </div>
            </div>
        </div>

    </section>

    <!-- 섹션1 -->

    <!-- 섹션2 -->

    <section id="section2" class="content">
        <div class="title tc">
            <div>예약안내</div>
            <h2>메인페이지 <span>예약안내</span></h2>
        </div>
        <div id="section2-main" class="flex">
            <div class="sec2-img">
                <img src="./resources/img/01/image_01 (17).jpg" alt="img" title="img">
                <div>온가족이 함께 즐기는 Skills Camping</div>
            </div>
            <div class="sec2-info">
                <div>
                    * 캠핑장 예약은 당일부터 <span>2주간</span> 가능합니다. <br>
                    * 캠핑장 입영은 예약한 날의 <span>14시부터</span> 가능 합니다. <br>
                    * 당일 예약의 경우 <span>17시부터</span> 입영할 수 있습니다.
                </div>
                <div>
                    *예약문의
                </div>
                <div>
                    - <span>전화번호</span> : 041-987-1234<br>
                    - <span>운영시간</span> : 평일 09:00 ~ 18:00, 주말 10:00 ~ 15:00, 점심시간 12:30~13:30
                </div>
                <div class="title-btn">자세히보기 <i class="fa-solid fa-chevron-right"></i></div>

            </div>
        </div>
    </section>

    <!-- 섹션2 -->

    <!-- 섹션3 -->

    <section id="section3" class="between content">
        <div class="title">
            <div>오시는길</div>
            <h2>메인페이지 <span>오시는길</span></h2>
        </div>

        <div id="section3-main" class="flex">
            <div id="sec3-info">
                <div>
                    <div>예약문의</div>
                    <div>
                        <i class="fa-solid fa-phone"></i> 010-1234-1234 <br>
                        <i class="fa-solid fa-envelope"></i> abc1234@gmail.com
                    </div>
                </div>
                <div>
                    <div>시설관리팀</div>
                    <div>
                        <i class="fa-solid fa-phone"></i> 010-1234-1234 <br>
                        <i class="fa-solid fa-envelope"></i> abc1234@gmail.com
                    </div>
                </div>
                <div class="title-btn">자세히보기 <i class="fa-solid fa-chevron-right"></i></div>
            </div>
            <div id="sec3-img">
                <img src="./resources/img/make/map.jpg" alt="img" title="img" id="">
            </div>
        </div>

    </section>

    <!-- 섹션3 -->

    <div class="round" id="round1"></div>
    <div class="round" id="round2"></div>
    <div class="round" id="round3"></div>
    <div class="round" id="round4"></div>

    <script src="./js/Slide/Slide.js"></script>
    <script src="./js/Slide/SlideApp.js"></script>

<?php
require_once('./footer.php');
?>