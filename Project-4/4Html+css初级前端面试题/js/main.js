$(function(){
    $('li > h3').click(function(){                   //点击标题弹出对话框
        $(this).siblings('.answer-wrapper').addClass('answer-wrapper-v');
        $(this).siblings('.answer-wrapper').find('.answer-inner > h3').text($(this).text());  
        //给对话框赋予标题
    })
    $('.close').click(function(){                    //关闭对话框
        $(this).parent('.answer-wrapper').removeClass('answer-wrapper-v');
    })
})