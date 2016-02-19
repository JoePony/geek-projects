$(function() {
    /* 后台导航'新闻列表'、'新增新闻'标签切换 */
    $('#adminNavSwitch > li').each(function(k,v){
        $(this).on('click',function(){
            var _self=$(this);
            $('#adminMainSwitch > div').filter('.curr').removeClass('curr');  //导航栏目当前样式切换
            _self.siblings('.curr').removeClass('curr');
            $('#adminMainSwitch > div').eq(k).addClass('curr');
            _self.addClass('curr');

            var categorySelect=$('#categoryList');
            if(_self.hasClass('add') && categorySelect.find('option').length==0){    
            //如果切换到添加新闻页面，并且判断是第一次加载，则动态添加导航列表
                $.ajax({                
                    url:'/getCategoryList/'+'all',  //ajax获取导航栏目
                    type:'GET',
                    dataType:'json',
                    success:function(data){
                        var item, name;
                        for(var i in data){
                            name=data[i]['nameCH'];
                            item="<option value='"+name+"'>"+name+"</option>";  //动态生成、添加导航栏目
                            $(item).appendTo(categorySelect);
                        }
                    }
                });
            }
        });
    });
    
        // 后台新闻列表分页
    // var adminNewsNum=$('#adminNewslist > tr').length;
    // if($('#adminNewslist').length>0 && adminNewsNum>0 ){
    //     $.ajax({
    //         url: '/getTotal',
    //         type: 'GET',
    //         dataType:'json',
    //         success:function(data){
    //             var total=data.total;
    //             var start=$('#start').text();
    //             var numPerPage=$('#numPerPage').text();
    //             var numPage;
    //             if(total > adminNewsNum){
    //                 numPage=Math.ceil(total/adminNewsNum);
    //                 // for(var i;i<numPage;i++){
    //                 //     console.log(i);
    //                 //     alert(i);
    //                 // }
    //                 console.log(adminNewsNum+' '+ start+' '+numPerPage+' '+total+' 页数'+numPage);
    //             }
    //         }
    //     });
    // }
    
    var getNewsNum = 5;    //客户端新闻显示和加载更多默认条数
    var categoryList = {}; //声明导航栏目对象
    $.ajax({
        url: '/getCategoryList/' + 'all',  //首次加载异步获取导航栏目，以便定义导航栏目对象
        type: 'GET',
        dataType: 'json',
        success: function(data) {        
            var k;
            for (var i in data) {
                k = data[i]['nameEN'];     //以导航栏目id作为键名，便于后期根据id获取栏目名
                categoryList[k] = data[i]; //返回的导航栏目对象逐个赋值给新对象
            }
            if($('#nav').length>0){                        //仅对有导航栏的页面进行操作
                var initialId = $('#nav li:eq(0)')[0].id;  //默认设定第一个导航栏目为当前栏目
                console.log('默认：',initialId);
                // var initialCategory = categoryList[initialId]['nameCH'];
                // getNews(initialCategory, initialId, 'change');
                getNews(initialId, 'change');   //调用加载方法，方式为切换导航栏目
            }
            if($('#categorySelect').length>0){
                var option;
                var categorySelected=$('#categorySelected').text();
                var category;
                for(var i in data){
                    category=data[i]['nameCH'];
                    if(categorySelected==category){
                        option='<option value="'+category+'" selected >'+category+'</option>';
                    }else{
                        option='<option value="'+category+'"  >'+category+'</option>';    
                    }
                    $(option).appendTo($('#categorySelect'));
                }
            }
        }
    });
    
    /* 点击加载更多 */ 
    $('#loadMore').on('click', function() {
        var currCategoryId = $('#nav li').filter('.curr')[0].id;  //获取当前导航栏目id
        // var currCategory = categoryList[currCategoryId]['nameCH'];
        var currNewsNum = $('#newsList li').length;      //根据已显示条数设定加载开始位置
        // getNews(currCategory, currCategoryId, 'append', currNewsNum);
        getNews(currCategoryId, 'append', currNewsNum);  //调用加载方法，方式为追加
    });

    /* 点击导航栏目动态加载相应新闻 */ 
    $('#nav').on('click', 'li', function() {
        if ($(this).hasClass('curr')) {
            return false;                       //恶意重复点击当前栏目则不再向下执行
        }
        var clickedCategoryId = $(this)[0].id;  //获取当前导航栏目id
        // var clickedCategory = categoryList[clickedCategoryId]['nameCH'];
        // getNews(clickedCategory, clickedCategoryId, 'change');
        getNews(clickedCategoryId, 'change');   //调用加载方法，方式为切换导航栏目
    });
    
    /* 删除新闻 */ 
    $('.delete').on('click',function(e){
        if(!confirm('确定删除吗?')){
            e.preventDefault();
        }
    });

    /* 后台登录 */ 
    $('#loginForm').on('submit',function(e){
        var username=$('#username').val();
        var psw=$('#psw').val();
        $.post(
            '/login',
            {username:username,psw:psw},
            function(data){
                if(data.num==0){
                    $('#help').text('用户名或密码错误!');     //无刷新登录
                }else{
                    $('#help').text('');
                    window.location.href='admin';
                }
            }
        );
        e.preventDefault();   //防止表单提交
    });

    $('#back').on('click', function() {
        window.history.go(-1)
    });

    /* 根据导航异步加载新闻列表数据 */
    function getNews(categoryId, type, start) {
        var category = categoryList[categoryId]['nameCH'];
        (start == undefined || start == null) ? (start = 0) : (start = start);   //start缺省则从默认第一条开始获取，否则从指定条获取
        $.ajax({
            url: '/newsByCategory/' + category + '/' + start + '/' + getNewsNum, //异步请求地址,参数为导航栏目名、获取的开始位置
            type: 'GET',
            dataType: 'json',
            success: function(data) {                       
                if (type == 'change') {              
                    $('#newsList li').remove();           //如果切换导航，则移除之前的新闻列表
                }
                var news;
                for (var i in data) {
                    news = createListNews(data[i]);                        //调用方法动态创建新闻列表
                    $(news).appendTo($('#newsList'));                      //动态追加
                };
                $('#nav li').filter('.curr').removeClass('curr');            //切换导航当前样式
                $('#nav li').filter('#' + categoryId + '').addClass('curr'); 

                $.ajax({     //继续异步获取该导航栏目新闻总条数,以便确定是否显示'点击加载更多'
                    url: '/getTotal/' + category,
                    type: 'GET',
                    dataType: 'json',
                    success: function(data) {
                        console.log('OK');
                        var currListNum = $('#newsList li').length;
                        var total = data.total;
                        var loadMore = $('#loadMore');
                        if (currListNum < total) {  //如果当前显示条数小于总条数则显示'点击加载更多'
                            loadMore.show(0);
                        } else {
                            loadMore.hide(0);                //否则隐藏
                        }
                        $('#loading').hide(0);               //两次异步结束后隐藏'正在加载动画'
                    }
                });
            }
        });
    }

    /* 客户端新闻列表动态生成 */
    function createListNews(d) {
        var title = d.title;                                 //对异步返回的相关新闻数据进行声明
        var url = '/shownews/' + d.id;
        var img = d.imgPath;
        var source = d.source;
        var publishTime = d.time;
        var now = Date.parse(new Date() / 1000);
        var time;
        switch (true) {                                      //根据发布时间戳定义不同的时间格式
            case (now - publishTime) < 60:
                time = parseInt((now - publishTime)) + '秒前';
                break;
            case (now - publishTime) / 60 < 60:
                time = parseInt((now - publishTime) / 60) + '分钟前';
                break;
            case (now - publishTime) / 3600 < 24:
                time = parseInt(now - publishTime) / 3600 + '小时前';
                break;
            default:
                time = new Date(publishTime * 1000);
                time = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日';
        }
        var item = "<li class='clearfix'>";                   //声明新闻条目DOM
        if (img !== '') {
            item += "<a href=" + url + " class='img-a fl'><img src=" + img + " alt=" + title + "></a>";
        }
        item += "<div class='title-wrap'><a href=" + url + " class='title'>" + title + "</a></div>";
        item += "<p><span class='time'>" + time + "</span>";
        if (source != '') {
            item += "<span class='source fr'>" + source + "</span>";
        }
        item += "</p>";
        item += "</li>";
        return item;                                          //动态生成后返回该DOM
    }
})