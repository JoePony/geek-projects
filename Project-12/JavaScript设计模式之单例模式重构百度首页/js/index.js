$(function(){
    /* 顶部用户中心、设置的下拉菜单 */ 
    var top={                           //单例模式，代码层次更明确
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('.top-shortcut .has-sub');
        },
        bind:function(){
            var _self=this;
            _self.item.on({mouseenter:_self.fn_e, mouseleave:_self.fn_l});   //绑定事件
        },
        fn_e:function(){
            $(this).find('.sub-wrap').css('display', 'block'); //光标进入显示下拉菜单
        },
        fn_l:function(){
            $(this).find('.sub-wrap').css('display', 'none'); //光标移出隐藏下拉菜单
        }
    };
    top.init();        //执行单例
    
    /* 搜索框聚焦、失去焦点的边框变化 */
    var kw={                                      //声明单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('#kw');
            this.span=this.item.parent('span');
        },
        bind:function(){
            var _self=this;
            _self.item.on({focus:_self.fn_f, blur:_self.fn_b});   //绑定事件
        },
        fn_f:function(){
            $(this).parent('span').addClass('kw-wrap-focus'); //聚焦时添加样式   
        },
        fn_b:function(){
            $(this).parent('span').removeClass('kw-wrap-focus'); //失去焦点时删除样式
        }
    };
    kw.init();        //执行单例
    
    /* 推荐、导航切换 */ 
    var menuList={                                      //声明单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('#menu-list li');
        },
        bind:function(){   //绑定事件
            this.item.each(function(index){
                var liCurr = $(this);
                liCurr.on('click',function(){
                    if (!liCurr.hasClass('menu-item-curr')) {  //不对当前菜单做切换
                        liCurr.siblings('.menu-item-curr').removeClass('menu-item-curr'); //删除当前元素样式
                        liCurr.not('.menu-item-curr').addClass('menu-item-curr');  //为点击菜单添加当前样式

                        $('#scroll-wrap > div').filter('.scroll-item-curr').fadeOut(50).removeClass('scroll-item-curr');  //显示对应切换主体
                        $('#scroll-wrap > div').eq(index).fadeIn(50).addClass('scroll-item-curr');  //隐藏当前主体
                    }
                });
            });
        }
    };
    menuList.init();        //执行单例

    /* 切换新闻轮播图片 */ 
    var newsThumbs={                                      //声明单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('#news-thumbs li');
        },
        bind:function(){   //绑定事件
            this.item.each(function(index){
                var thumbCurr = $(this);
                thumbCurr.on('click', function() {       //为缩略图添加点击事件
                    if (!thumbCurr.hasClass('curr')) {   //只对非当前元素生效
                        thumbCurr.siblings('.curr').removeClass('curr'); //删除当前缩略图样式
                        thumbCurr.addClass('curr');  //为点击缩略图添加当前样式
                        
                        $('#newPic-list li').filter('.curr').fadeOut('normal').removeClass('curr');//显示对应的轮播图片
                        $('#newPic-list li').eq(index).fadeIn('normal').addClass('curr'); //隐藏当前轮播图片

                        $('#news-titles li').filter('.curr').removeClass('curr'); //隐藏当前标题
                        $('#news-titles li').eq(index).addClass('curr'); //显示对应标题
                    }
                });
            });
        }
    };
    newsThumbs.init();        //执行单例

    /* 换一换实时热点 */ 
    var refresh={                                      //声明单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('#refresh');
        },
        bind:function(){
            var _self=this;
            _self.item.on('click',_self.fn_c);   //绑定事件
        },
        fn_c:function(){
            setRefresh();  //调用刷新方法
            var rotateIcon=$(this).children('#refresh-rotate'); //获取刷新图标
            rotateIcon.addClass('rotate');      //刷新图标旋转,css样式定义为旋转360°
            setTimeout(                         //刷新图标旋转后,删除旋转类,便于下次旋转
                function(){ rotateIcon.removeClass('rotate'); },500
            );
        }
    };
    refresh.init();        //执行单例

    /* 换一换自动刷新 */ 
    var autoRefresh;                                      //定义刷新方法
    autoRefresh=setInterval(function(){
        setRefresh();                                     //调用公共刷新方法
    },2000);
    
    /* 换一换自动刷新 */ 
    var latestNews={                                      //声明单例                                          //声明单例           
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('#latest-news');
        },
        bind:function(){
            var _self=this;
            _self.item.hover(_self.fn_clear, _self.fn_refresh); //绑定光标移入、移出时事件
        },
        fn_clear:function(){      //光标移入函数，停止自动刷新新闻    
            clearInterval(autoRefresh);
        },
        fn_refresh:function(){    //光标移出函数
            autoRefresh=setInterval(function(){   //光标移出继续自动刷新
                setRefresh();                     //调用公共刷新方法
            },2000);
        }
    }
    latestNews.init();        //执行单例

    /* 新闻推荐不感兴趣 */ 
    var dustBin={                                      //声明单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('.dustBin');
        },
        bind:function(){
            var _self=this;
            _self.item.on('click',_self.fn_c);   //绑定事件
        },
        fn_c:function(){
            var msg=confirm('确定不感兴趣吗？'+'\n'+'以后这类信息会少出现哒！(=￣ω￣=)✧');
            if(msg==true){     
                $(this).parents('li').remove();  //确定不感兴趣时移除相应头条
            }
        }
    };
    dustBin.init();        //执行单例

    /* 右侧更多产品 */ 
    var moreProducts={                                      //声明单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('#more-porducts');
        },
        bind:function(){
            var _self=this;
            _self.item.on('mouseenter',_self.fn_m);   //绑定事件
        },
        fn_m:function(){
            var h=$('body').height();                      //获取body高度
            $('#more-products-aside').fadeIn(100);         //显示更多产品面板
            $('#more-products-aside').css('minHeight',h);  //与body高度保持一致,对齐显示
        }
    };
    moreProducts.init();    

    /* 右侧更多产品隐藏 */ 
    var moreProductsAside={                                      //声明单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('#more-products-aside');
        },
        bind:function(){
            var _self=this;
            _self.item.on('mouseleave',_self.fn_m);
        },
        fn_m:function(){
            $(this).fadeOut(0);                            //光标移出时隐藏面板
        }
    };
    moreProductsAside.init(); 

    /* 鼠标滚动事件 */ 
    var toTopFade={                                      //声明单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$(document);
        },
        bind:function(){
            var _self=this;
            _self.item.on('scroll',_self.fn_s);   //绑定事件
        },
        fn_s:function(){
            if($(this).scrollTop() > $('.myMain').offset().top ){
                $('#top').fadeIn('fast');     //主体元素顶部超出界面时显示"返回顶部"
            }else{
                $('#top').fadeOut('fast');    //否则隐藏返回顶部
            }
        }
    };
    toTopFade.init();

    /* 返回顶部 */ 
    var toTop={                                      //声明单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('#top');
        },
        bind:function(){
            var _self=this;
            _self.item.on('click',_self.fn_c);   //绑定事件        
        },
        fn_c:function(){
            $('html,body').animate({scrollTop:0},300); //点击top是页面返回顶部
        }
    };
    toTop.init();


    /* 换一换公共刷新函数 */
    var setRefresh=function(){
        var curr = $('#latest-news ul').filter('.curr');      //声明当前切换主体
        var next = curr.next('ul').is('ul') ? curr.next('ul') : $('#latest-news ul').eq(0);  //声明下一个切换主体,如果到达最后一个,则声明为第一个
        curr.fadeOut(0).removeClass('curr')  //隐藏当前主体
        next.fadeIn(300).addClass('curr');   //显示下一个主体
    };
});