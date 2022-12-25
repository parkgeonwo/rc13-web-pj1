

///////////////////////// 상단 캐러샐 버튼 함수

let top_carousel_current_vw = 0;
let top_carousel_current_page = 1;
let top_carousel_play = true;

function top_carousel_nav_change(page){   // top_carousel 현재 페이지 style 변경, page 변경, navbar translate

    top_carousel_current_vw = (page-1)*(-100);  // vw 값 변화
    top_carousel_current_page = page;  // page 값변화
    $('.swiper__img-container').css('transform','translateX('+String(top_carousel_current_vw)+'vw)');  // page 이동
    $('.current-index').html(String(top_carousel_current_page)); // page 수 변경
    if(page<=5){
        $('.swiper__pagination-wrapper-div').css('transform','translateX(0px)');  // navbar 이동
    } else if(page==6){
        $('.swiper__pagination-wrapper-div').css('transform','translateX(-69px)');  // navbar 이동
    } else if(page==7){
        $('.swiper__pagination-wrapper-div').css('transform','translateX(-178px)');  // navbar 이동
    } else if(page>=8){
        $('.swiper__pagination-wrapper-div').css('transform','translateX(-214px)');  // navbar 이동
    } 

    /// navbar의 해당 페이지는 스타일 변경, 나머지는 원래대로 
    $(`.swiper__pagination-wrapper-div span:nth-child(${page})`).css(
        {'color':'#00c471',
        'box-shadow':'inset 0 0 0 2px #00c471'});
    for (let i=1; i<11; i++){
        if(i != page){
            $(`.swiper__pagination-wrapper-div span:nth-child(${i})`).css(
                {'color':'#495057',
                'box-shadow':'inset 0 0 0 1px #ced4da'});
        }
    }
}

top_carousel_nav_change(1);  // 기본값


// top_carousel next 버튼
$(".control-next-button").on('click',function(){
    top_carousel_current_page += 1;

    if(top_carousel_current_page == 11){  // 10page에서는 1페이지로
        top_carousel_current_page = 1
    }

    top_carousel_nav_change(top_carousel_current_page);
});

// top_carousel before 버튼
$(".control-before-button").on('click',function(){ 
    top_carousel_current_page -= 1;

    if(top_carousel_current_page == 0){  // 1page에서는 10페이지로
        top_carousel_current_page = 10
    }

    top_carousel_nav_change(top_carousel_current_page);

});

// top_carousel navbar 클릭시 변화 함수
$('.swiper__pagination-wrapper-div').on('click',function(e){   
    // console.log(e.target.dataset.id);  // swiper navbar에서 누른 버튼 data-id 값

    for (let i=1; i<11; i++){
        if (e.target.dataset.id==i){   // 누른 id 값과 i 값이 같으면
            top_carousel_nav_change(i);
        }
    }
});


// 캐러샐 재생 및 정지 버튼 변환
$('.control-play-pause-button').on('click',function(){
    if (top_carousel_play == true){
        top_carousel_play = false;
        $('.control-play-pause-button').html('<i class="fas fa-play"></i>')
    } else{
        top_carousel_play = true;
        $('.control-play-pause-button').html('<i class="fas fa-pause"></i>')
    }
})


// 일정시간마다 캐러샐 넘기기

setInterval(function(){
    if(top_carousel_play == true){
        top_carousel_current_page += 1;

        if(top_carousel_current_page == 11){  // 10page에서는 1페이지로
            top_carousel_current_page = 1
        }
        top_carousel_nav_change(top_carousel_current_page);
    }

}, 3000);







//////////////////// 스크롤 캐러샐

// $('.review-content__right-container').on('scroll',function(){
//     var scroll_amt = document.querySelector('.review-content__right-container').scrollTop;
//     console.log(scroll_amt);
// })

// $('.review-content__right-container').bind('wheel', function(event){
//     var scroll_amt = document.querySelector('.review-content__right-container').scrollTop;
//     console.log(scroll_amt);
//     var scroll_amt_up = scroll_amt - 100;
//     var scroll_amt_down = scroll_amt + 100;
//     if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
//         // scroll up
//         console.log("스크롤 위로");
//         $('.review-content__right-wrapper').css(
//             {
//                 'transition-duration':'1000ms'
//             }
//         ); 
//     }
//     else {
//         // scroll down
//         console.log("스크롤 아래로");
//         $('.review-content__right-wrapper').css('transform',`translateY(${scroll_amt_down}px)`);
//     }
// });


// // 쓰로틀링: 이벤트가 한번 발생하면 일정 시간 동안은 발생하지 않음!
// let timer;

// $('.review-content__right-container').bind('wheel', function(event){
//     if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
//         console.log("스크롤 위로");
//         if (!timer) {
//             timer = setTimeout(() => {
//                 timer = null;
//                 var scroll_amt = document.querySelector('.review-content__right-container').scrollTop;
//                 var scroll_amt_up = scroll_amt + 100;
//                 console.log(scroll_amt_up);
//                 $('.review-content__right-wrapper').css('transform',`translateY(${scroll_amt_up}px)`);
//             }, 1000);
//         }
//     } 
//     else {
//         // scroll down
//         console.log("스크롤 아래로");
//         if (!timer) {
//             timer = setTimeout(() => {
//                 timer = null;
//                 var scroll_amt = document.querySelector('.review-content__right-container').scrollTop;
//                 var scroll_amt_down = scroll_amt - 100;
//                 console.log(scroll_amt_down);
//                 $('.review-content__right-wrapper').css('transform',`translateY(${scroll_amt_down}px)`);
//             }, 500);
//         }
//     }
// });


///////////////////////// 캐러샐에 사용하는 버튼 스타일 변경 - 사용할 수 없게 바꿔주기
function btn_style_chage(btn,type){
    
    if (type==0){   /// 비활성화
        $(btn).css({
            'color':'#efefef',
            'border':'1px solid #efefef',
            'box-shadow':'0 2px 8px 0 transparent',
            'cursor':'not-allowed'
        });
    }

    else if (type==1){  /// 활성화
        $(btn).css({
            'color':'#333',
            'border':'1px solid #ccc',
            'box-shadow':'0 2px 8px 0 rgb(0 0 0 / 10%)',
            'cursor':'pointer'
        });
    }

}


/////////////////////////////////// free course 캐러샐
let free_course_carousel_current_px = 0;
btn_style_chage(".free-course-before-btn",0);  // before 버튼 비활성화

$(".free-course-next-btn").on('click',function(){
    if (free_course_carousel_current_px == 0){
        btn_style_chage(".free-course-before-btn",1);   // before 버튼 활성화
        free_course_carousel_current_px = -1180;
    } else if(free_course_carousel_current_px == -1180){
        btn_style_chage(".free-course-next-btn",0);   // next 버튼 비활성화
        free_course_carousel_current_px = -1652;
    }
    $('.free-course-content-div').css('transform',`translateX(${free_course_carousel_current_px}px)`);  // page 이동
});
$(".free-course-before-btn").on('click',function(){
    if (free_course_carousel_current_px == -1652){
        btn_style_chage(".free-course-next-btn",1);   // next 버튼 활성화
        free_course_carousel_current_px = -1180;
    } else if(free_course_carousel_current_px == -1180){
        btn_style_chage(".free-course-before-btn",0);   // before 버튼 비활성화
        free_course_carousel_current_px = 0;
    }
    $('.free-course-content-div').css('transform',`translateX(${free_course_carousel_current_px}px)`);  // page 이동
});



/////////////////////////////////// 왕초보 course 캐러샐
let easy_course_carousel_current_px = 0;
btn_style_chage(".easy-course-before-btn",0);   // before 버튼 비활성화

$(".easy-course-next-btn").on('click',function(){
    if (easy_course_carousel_current_px == 0){
        btn_style_chage(".easy-course-before-btn",1);   // before 버튼 활성화
        easy_course_carousel_current_px = -1180;
    } else if(easy_course_carousel_current_px == -1180){
        btn_style_chage(".easy-course-next-btn",0);   // next 버튼 비활성화
        easy_course_carousel_current_px = -2360;
    }
    $('.easy-course-content-div').css('transform',`translateX(${easy_course_carousel_current_px}px)`);  // page 이동
});
$(".easy-course-before-btn").on('click',function(){
    if (easy_course_carousel_current_px == -2360){
        btn_style_chage(".easy-course-next-btn",1);   // next 버튼 활성화
        easy_course_carousel_current_px = -1180;
    } else if(easy_course_carousel_current_px == -1180){
        btn_style_chage(".easy-course-before-btn",0);   // before 버튼 비활성화
        easy_course_carousel_current_px = 0;
    }
    $('.easy-course-content-div').css('transform',`translateX(${easy_course_carousel_current_px}px)`);  // page 이동
});


/////////////////////////////////// 로드맵 course 캐러샐

let roadmap_course_carousel_current_px = 0;
btn_style_chage(".roadmap-course-before-btn",0);   // before 버튼 비활성화

$(".roadmap-course-next-btn").on('click',function(){
    if (roadmap_course_carousel_current_px == 0){
        btn_style_chage(".roadmap-course-before-btn",1);   // before 버튼 활성화
        roadmap_course_carousel_current_px = -1180;
    } else if(roadmap_course_carousel_current_px == -1180){
        btn_style_chage(".roadmap-course-next-btn",0);   // next 버튼 비활성화
        roadmap_course_carousel_current_px = -2360;
    }
    $('.roadmap-course-content-div').css('transform',`translateX(${roadmap_course_carousel_current_px}px)`);  // page 이동
});
$(".roadmap-course-before-btn").on('click',function(){
    if (roadmap_course_carousel_current_px == -2360){
        btn_style_chage(".roadmap-course-next-btn",1);   // next 버튼 활성화
        roadmap_course_carousel_current_px = -1180;
    } else if(roadmap_course_carousel_current_px == -1180){
        btn_style_chage(".roadmap-course-before-btn",0);   // before 버튼 비활성화
        roadmap_course_carousel_current_px = 0;
    }
    $('.roadmap-course-content-div').css('transform',`translateX(${roadmap_course_carousel_current_px}px)`);  // page 이동
});

/////////////////////////////////// 신규 course 캐러샐

let recent_course_carousel_current_px = 0;
btn_style_chage(".recent-course-before-btn",0);   // before 버튼 비활성화

$(".recent-course-next-btn").on('click',function(){
    if (recent_course_carousel_current_px == 0){
        btn_style_chage(".recent-course-before-btn",1);   // before 버튼 활성화
        recent_course_carousel_current_px = -1180;
    } else if(recent_course_carousel_current_px == -1180){
        btn_style_chage(".recent-course-next-btn",0);   // next 버튼 비활성화
        recent_course_carousel_current_px = -2360;
    }
    $('.recent-course-content-div').css('transform',`translateX(${recent_course_carousel_current_px}px)`);  // page 이동
});
$(".recent-course-before-btn").on('click',function(){
    if (recent_course_carousel_current_px == -2360){
        btn_style_chage(".recent-course-next-btn",1);   // next 버튼 활성화
        recent_course_carousel_current_px = -1180;
    } else if(recent_course_carousel_current_px == -1180){
        btn_style_chage(".recent-course-before-btn",0);   // before 버튼 비활성화
        recent_course_carousel_current_px = 0;
    }
    $('.recent-course-content-div').css('transform',`translateX(${recent_course_carousel_current_px}px)`);  // page 이동
});



/////////////////////////// 하단 배너 캐러샐

let bottom_carousel_current_vw = 0;
btn_style_chage(".bottom-banner__before-button",0);   // before 버튼 비활성화

$(".bottom-banner__next-button").on('click',function(){
    if (bottom_carousel_current_vw == 0){
        btn_style_chage(".bottom-banner__before-button",1);   // before 버튼 활성화
        bottom_carousel_current_vw = -100;
    } else if(bottom_carousel_current_vw == -100){
        btn_style_chage(".bottom-banner__next-button",0);   // next 버튼 비활성화
        bottom_carousel_current_vw = -200;
    }
    $('.bottom-banner__swiper').css('transform',`translateX(${bottom_carousel_current_vw}vw)`);  // page 이동
});
$(".bottom-banner__before-button").on('click',function(){
    if (bottom_carousel_current_vw == -200){
        btn_style_chage(".bottom-banner__next-button",1);   // next 버튼 활성화
        bottom_carousel_current_vw = -100;
    } else if(bottom_carousel_current_vw == -100){
        btn_style_chage(".bottom-banner__before-button",0);   // before 버튼 비활성화
        bottom_carousel_current_vw = 0;
    }
    $('.bottom-banner__swiper').css('transform',`translateX(${bottom_carousel_current_vw}vw)`);  // page 이동
});







///////////////////////////////// mentor.html //////////////////////////////////////



//////////////////////////////// card 그리기

let card_data = [
    {
        type : 'dev',
        title:'신입~주니어 개발자 취직, 이력서&amp;프론트엔드 상담 및 고민, 커리어 및 로드맵 설계',
        jobInfo : '<div><dt>직무</dt><dd>프론트엔드/웹퍼블리셔</dd></div><div><dt>경력</dt><dd>미들 (4~8년)</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/36294/c14ef375-cddf-4d75-82d9-055109c79eb6" alt="멘토 이미지" loading="lazy">',
        name : '장현석',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'network',
        title:'개발자 취업, 기술 면접 준비 / 앱개발 방법 / 기술사',
        jobInfo : '<div><dt>직무</dt><dd>안드로이드 개발자</dd></div><div><dt>경력</dt><dd>Lead 레벨</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/491366/311487a6-1734-427c-ab8c-5641bf12c403" alt="멘토 이미지" loading="lazy">',
        name : '기술노트with알렉',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'data',
        title:'비전공자? 학부 출신? Data Scientist / ML Enginner, 당신도 할 수 있습니다!',
        jobInfo : '<div><dt>직무</dt><dd>데이터 사이언티스트</dd></div><div><dt>경력</dt><dd>주니어 (1~3년)</dd></div><div><dt>현직</dt><dd class="mentor-card__company-name">카카오 계열사</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/231664/b63ef4f9-7bf5-4dde-829c-40e8b1902a86" alt="멘토 이미지" loading="lazy">',
        name : '밑바닥개발자',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'game',
        title:'게임서버개발 멘토링.. (취업 준비생 대상)',
        jobInfo : '<div><dt>직무</dt><dd>게임 서버 개발자</dd></div><div><dt>경력</dt><dd>신입 (1년이하)</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/main/profile/default_profile.png" alt="멘토 이미지" loading="lazy">',
        name : 'gameServerMaster',
        star : ''
    },
    {
        type : 'network',
        title:'개발자 취업, 기술 면접 준비 / 앱개발 방법 / 기술사',
        jobInfo : '<div><dt>직무</dt><dd>안드로이드 개발자</dd></div><div><dt>경력</dt><dd>Lead 레벨</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/491366/311487a6-1734-427c-ab8c-5641bf12c403" alt="멘토 이미지" loading="lazy">',
        name : '기술노트with알렉',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'data',
        title:'비전공자? 학부 출신? Data Scientist / ML Enginner, 당신도 할 수 있습니다!',
        jobInfo : '<div><dt>직무</dt><dd>데이터 사이언티스트</dd></div><div><dt>경력</dt><dd>주니어 (1~3년)</dd></div><div><dt>현직</dt><dd class="mentor-card__company-name">카카오 계열사</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/231664/b63ef4f9-7bf5-4dde-829c-40e8b1902a86" alt="멘토 이미지" loading="lazy">',
        name : '밑바닥개발자',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'game',
        title:'게임서버개발 멘토링.. (취업 준비생 대상)',
        jobInfo : '<div><dt>직무</dt><dd>게임 서버 개발자</dd></div><div><dt>경력</dt><dd>신입 (1년이하)</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/main/profile/default_profile.png" alt="멘토 이미지" loading="lazy">',
        name : 'gameServerMaster',
        star : ''
    },
    {
        type : 'dev',
        title:'신입~주니어 개발자 취직, 이력서&amp;프론트엔드 상담 및 고민, 커리어 및 로드맵 설계',
        jobInfo : '<div><dt>직무</dt><dd>프론트엔드/웹퍼블리셔</dd></div><div><dt>경력</dt><dd>미들 (4~8년)</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/36294/c14ef375-cddf-4d75-82d9-055109c79eb6" alt="멘토 이미지" loading="lazy">',
        name : '장현석',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'data',
        title:'비전공자? 학부 출신? Data Scientist / ML Enginner, 당신도 할 수 있습니다!',
        jobInfo : '<div><dt>직무</dt><dd>데이터 사이언티스트</dd></div><div><dt>경력</dt><dd>주니어 (1~3년)</dd></div><div><dt>현직</dt><dd class="mentor-card__company-name">카카오 계열사</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/231664/b63ef4f9-7bf5-4dde-829c-40e8b1902a86" alt="멘토 이미지" loading="lazy">',
        name : '밑바닥개발자',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'game',
        title:'게임서버개발 멘토링.. (취업 준비생 대상)',
        jobInfo : '<div><dt>직무</dt><dd>게임 서버 개발자</dd></div><div><dt>경력</dt><dd>신입 (1년이하)</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/main/profile/default_profile.png" alt="멘토 이미지" loading="lazy">',
        name : 'gameServerMaster',
        star : ''
    },
    {
        type : 'dev',
        title:'신입~주니어 개발자 취직, 이력서&amp;프론트엔드 상담 및 고민, 커리어 및 로드맵 설계',
        jobInfo : '<div><dt>직무</dt><dd>프론트엔드/웹퍼블리셔</dd></div><div><dt>경력</dt><dd>미들 (4~8년)</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/36294/c14ef375-cddf-4d75-82d9-055109c79eb6" alt="멘토 이미지" loading="lazy">',
        name : '장현석',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'network',
        title:'개발자 취업, 기술 면접 준비 / 앱개발 방법 / 기술사',
        jobInfo : '<div><dt>직무</dt><dd>안드로이드 개발자</dd></div><div><dt>경력</dt><dd>Lead 레벨</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/491366/311487a6-1734-427c-ab8c-5641bf12c403" alt="멘토 이미지" loading="lazy">',
        name : '기술노트with알렉',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'game',
        title:'게임서버개발 멘토링.. (취업 준비생 대상)',
        jobInfo : '<div><dt>직무</dt><dd>게임 서버 개발자</dd></div><div><dt>경력</dt><dd>신입 (1년이하)</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/main/profile/default_profile.png" alt="멘토 이미지" loading="lazy">',
        name : 'gameServerMaster',
        star : ''
    },
    {
        type : 'dev',
        title:'신입~주니어 개발자 취직, 이력서&amp;프론트엔드 상담 및 고민, 커리어 및 로드맵 설계',
        jobInfo : '<div><dt>직무</dt><dd>프론트엔드/웹퍼블리셔</dd></div><div><dt>경력</dt><dd>미들 (4~8년)</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/36294/c14ef375-cddf-4d75-82d9-055109c79eb6" alt="멘토 이미지" loading="lazy">',
        name : '장현석',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'network',
        title:'개발자 취업, 기술 면접 준비 / 앱개발 방법 / 기술사',
        jobInfo : '<div><dt>직무</dt><dd>안드로이드 개발자</dd></div><div><dt>경력</dt><dd>Lead 레벨</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/491366/311487a6-1734-427c-ab8c-5641bf12c403" alt="멘토 이미지" loading="lazy">',
        name : '기술노트with알렉',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    {
        type : 'data',
        title:'비전공자? 학부 출신? Data Scientist / ML Enginner, 당신도 할 수 있습니다!',
        jobInfo : '<div><dt>직무</dt><dd>데이터 사이언티스트</dd></div><div><dt>경력</dt><dd>주니어 (1~3년)</dd></div><div><dt>현직</dt><dd class="mentor-card__company-name">카카오 계열사</dd></div>',
        img : '<img src="https://cdn.inflearn.com/public/users/thumbnails/231664/b63ef4f9-7bf5-4dde-829c-40e8b1902a86" alt="멘토 이미지" loading="lazy">',
        name : '밑바닥개발자',
        star : '<button class="mentor-card__rating e-show-reviews"> <span class="has-icon rating-star"><i class="fas fa-star" style="font-size: 14px; margin-right: 3px;"></i></span> <span class="rating-number" style="font-size: 14px;"><b> 5.0</b></span> <i class="far fa-chevron-right" style="margin-left: 3px; font-size: 12px; "></i></button>'
    },
    // {
    //     type : '',
    //     title:'',
    //     jobInfo : '',
    //     img : '',
    //     name : '',
    //     star : ''
    // }
]


function cardAppend(type){
    card_data.forEach((a,i)=>{  // 가져온 데이터를 하나씩 뽑아냄
        
        if(type=='all'){
            let cardContent = `
            <section class="mentor-card">
                <div class="mentor-card__top">
                    <h3 class="mentor-card__title">${a['title']}</h3>
                    <div class="mentor-card__job-wrapper">
                    <dl class="mentor-card__job-info-list">
                        ${a['jobInfo']}
                    </dl>
                    <figure class="mentor-card__thumbnail">
                        ${a['img']}
                    </figure>
                    </div>
                </div>
                <div class="mentor-card__bottom">
                    <div>
                    <a href="/" target="_blank" rel="noopener noreferrer" class="mentor-card__name">${a['name']}</a>
                    ${a['star']}
                    </div>
                </div>
            </section>`
            $('.mentor-cards').append(cardContent);  // append 해주기
        }
        
        // 변수에 html을 담고
        else if (a['type']==type){
            let cardContent = `
            <section class="mentor-card">
                <div class="mentor-card__top">
                    <h3 class="mentor-card__title">${a['title']}</h3>
                    <div class="mentor-card__job-wrapper">
                    <dl class="mentor-card__job-info-list">
                        ${a['jobInfo']}
                    </dl>
                    <figure class="mentor-card__thumbnail">
                        ${a['img']}
                    </figure>
                    </div>
                </div>
                <div class="mentor-card__bottom">
                    <div>
                    <a href="/" target="_blank" rel="noopener noreferrer" class="mentor-card__name">${a['name']}</a>
                    ${a['star']}
                    </div>
                </div>
            </section>`
    
        $('.mentor-cards').append(cardContent);  // append 해주기
        }
    })
}

cardAppend('all');




let checkTypeArray = ['.check-dev','.check-network','.check-data','.check-game']

checkTypeArray.forEach((a,i)=>{ 
    $(a).on('click',()=>{   // check-dev를 눌렀을때
        $('.mentor-cards').html('');
        if ( $('.check-dev').is(":checked") ){  // check-dev가 true라면
            cardAppend('dev');
            $('.right-panel-paginate').css('display','none');
        }
        if ($('.check-network').is(":checked")){
            cardAppend('network');
            $('.right-panel-paginate').css('display','none');
        }
        if ($('.check-data').is(":checked")){
            cardAppend('data');
            $('.right-panel-paginate').css('display','none');
        }
        if ($('.check-game').is(":checked")){
            cardAppend('game');
            $('.right-panel-paginate').css('display','none');
        }
        if ($('.check-dev').is(":checked")==false && $('.check-network').is(":checked")==false && $('.check-data').is(":checked")==false && $('.check-game').is(":checked")==false ) {
            $('.mentor-cards').html('');
            cardAppend('all');
            $('.right-panel-paginate').css('display','block');
        }
    })
})







/////////////////////////////// detai.html ///////////////////////////////////

// 2750 50 780 

////// 첫번째 섹션
let section_0_current_state = true;  // true 면 펼쳐져 있는 false면 접음
$('.cd-accordion__unit-cover').eq(0).css('max-height','2750px');
$('.is-open').eq(0).css('display','block');
$('.is-close').eq(0).css('display','none');

$('.cd-accordion__section-cover').eq(0).on('click',function(){
    if( section_0_current_state == true ){
        $('.cd-accordion__unit-cover').eq(0).css('max-height','0px');
        $('.is-open').eq(0).css('display','none');
        $('.is-close').eq(0).css('display','block');
        section_0_current_state = false;
    } else {
        $('.cd-accordion__unit-cover').eq(0).css('max-height','2750px');
        $('.is-open').eq(0).css('display','block');
        $('.is-close').eq(0).css('display','none');
        section_0_current_state = true;
    }
})





// ////////// 두번째 섹션

for (let i=1; i<10; i++){
    $('.cd-accordion__unit-cover').eq(i).css('max-height','0px');
    $('.is-open').eq(i).css('display','none');
    $('.is-close').eq(i).css('display','block');
}


let section_1_current_state = false;  // true 면 펼쳐져 있는 false면 접음

$('.cd-accordion__section-cover').eq(1).on('click',function(){
    if( section_1_current_state == true ){
        $('.cd-accordion__unit-cover').eq(1).css('max-height','0px');
        $('.is-open').eq(1).css('display','none');
        $('.is-close').eq(1).css('display','block');
        section_1_current_state = false;
    } else {
        $('.cd-accordion__unit-cover').eq(1).css('max-height','50px');
        $('.is-open').eq(1).css('display','block');
        $('.is-close').eq(1).css('display','none');
        section_1_current_state = true;
    }
})


let section_2_current_state = false;  // true 면 펼쳐져 있는 false면 접음

$('.cd-accordion__section-cover').eq(2).on('click',function(){
    if( section_2_current_state == true ){
        $('.cd-accordion__unit-cover').eq(2).css('max-height','0px');
        $('.is-open').eq(2).css('display','none');
        $('.is-close').eq(2).css('display','block');
        section_2_current_state = false;
    } else {
        $('.cd-accordion__unit-cover').eq(2).css('max-height','780px');
        $('.is-open').eq(2).css('display','block');
        $('.is-close').eq(2).css('display','none');
        section_2_current_state = true;
    }
})
















