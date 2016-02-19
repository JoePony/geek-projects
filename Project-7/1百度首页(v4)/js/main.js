$(document).ready(function() {
    /* 顶部用户中心、设置的下拉菜单 */ 
    $('.top-shortcut .has-sub').on({
        mouseenter: function() {
            $(this).find('.sub-wrap').css('display', 'block'); //光标进入显示下拉菜单
        },
        mouseleave: function() {
            $(this).find('.sub-wrap').css('display', 'none'); //光标移出隐藏下拉菜单
        }
    });

    /* 搜索框聚焦、失去焦点的边框变化 */ 
    $('#kw').on({
        focus: function() {
            $(this).parent('span').addClass('kw-wrap-focus'); //聚焦时添加样式
        },
        blur: function() {
            $(this).parent('span').removeClass('kw-wrap-focus'); //失去焦点时删除样式
        }
    });

    /* 推荐、导航切换 */ 
    $('#menu-list li').each(function(index) {
        var liNow = $(this);
        liNow.on('click', function() {
            if (!liNow.hasClass('menu-item-curr')) {  //不对当前菜单做切换
                liNow.siblings('.menu-item-curr').removeClass('menu-item-curr'); //删除当前元素样式
                liNow.not('.menu-item-curr').addClass('menu-item-curr');  //为点击菜单添加当前样式

                $('#scroll-wrap > div').filter('.scroll-item-curr').fadeOut(50).removeClass('scroll-item-curr');  //显示对应切换主体
                $('#scroll-wrap > div').eq(index).fadeIn(50).addClass('scroll-item-curr');  //隐藏当前主体
            }
        });
    });

    /* 切换新闻轮播图片 */ 
    $('#news-thumbs li').each(function(index) {
        var thumbNow = $(this);
        thumbNow.on('click', function() {       //为缩略图添加点击事件
            if (!thumbNow.hasClass('curr')) {   //只对非当前元素生效
                thumbNow.siblings('.curr').removeClass('curr'); //删除当前缩略图样式
                thumbNow.addClass('curr');  //为点击缩略图添加当前样式
 
                $('#newPic-list li').filter('.curr').fadeOut('normal').removeClass('curr');       //显示对应的轮播图片
                $('#newPic-list li').eq(index).fadeIn('normal').addClass('curr'); //隐藏当前轮播图片

                $('#news-titles li').filter('.curr').removeClass('curr'); //隐藏当前标题
                $('#news-titles li').eq(index).addClass('curr'); //显示对应标题
            }
        });
    });


    /* 换一换实时热点 */ 
    $('#refresh').on('click', function() {  //换一换点击事件
        setRefresh();  //调用刷新方法

        var rotateIcon=$(this).children('#refresh-rotate'); //获取刷新图标
        rotateIcon.addClass('rotate');      //刷新图标旋转,css样式定义为旋转360°
        setTimeout(                         //刷新图标旋转后,删除旋转类,便于下次旋转
            function(){ rotateIcon.removeClass('rotate'); },500
        );
    });


    /* 换一换自动刷新 */ 
    var autoRefresh;                                      //定义刷新方法
    autoRefresh=setInterval(function(){
        setRefresh();                                     //调用公共刷新方法
    },2000);
    
    $('#latest-news').hover(                              //换一换主体hover事件
        function(){ clearInterval(autoRefresh); },        //光标进入停止自动刷新
        function(){ autoRefresh=setInterval(function(){   //光标移出继续自动刷新
            setRefresh();                                 //调用公共刷新方法
        },2000); }
    );
 
    /* 新闻推荐不感兴趣 */ 
    $('#dustBin').on('click',function(){   //点击不感兴趣时
        var msg=confirm('确定不感兴趣吗？'+'\n'+'以后这类信息会少出现哒！(=￣ω￣=)✧');
        if(msg==true){     
            $(this).parents('li').remove();  //确定不感兴趣时移除相应头条
        }
    });

    /* 右侧更多产品 */ 
    $('#more-porducts').on('mouseenter',function(){    //光标进入更多产品时
        var h=$('body').height();                      //获取body高度
        $('#more-products-aside').fadeIn(100);         //显示更多产品面板
        $('#more-products-aside').css('minHeight',h);  //与body高度保持一致,对齐显示
    });
    $('#more-products-aside').on('mouseleave',function(){
        $(this).fadeOut(0);                            //光标移出时隐藏面板
    });

    /* 鼠标滚动事件 */ 
    $(document).scroll(function(){
        if( $(this).scrollTop() > $('.myMain').offset().top ){  
            $('#top').fadeIn('fast');     //主体元素顶部超出界面时显示返回顶部
        }else{
            $('#top').fadeOut('fast');    //否则隐藏返回顶部
        }
    });

    /* 返回顶部 */ 
    $('#top').on('click',function(){
        $('html,body').animate({scrollTop:0},300);  //点击top是页面返回顶部
    });
});

/* 换一换公共刷新方法 */
var setRefresh=function(){
    var curr = $('#latest-news ul').filter('.curr');      //声明当前切换主体
    var next = curr.next('ul').is('ul') ? curr.next('ul') : $('#latest-news ul').eq(0);  //声明下一个切换主体,如果到达最后一个,则声明为第一个
    curr.fadeOut(0).removeClass('curr')  //隐藏当前主体
    next.fadeIn(300).addClass('curr');   //显示下一个主体
}
