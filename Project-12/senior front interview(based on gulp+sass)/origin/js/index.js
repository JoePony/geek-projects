define(['lib/jquery-1.11.3.min'], function(){
    var header=$('header');           //顶部
    var h=header.outerHeight(true);           //顶部高度
    var aside=$('aside');             //侧边栏
    var t=aside.offset().top,             //侧边栏距顶高度
        l=aside.offset().left;            //侧边栏距左侧宽度

    var scroll={                                   //声明页面滚动单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$(document);
        },
        bind:function(){
            var _self=this;
            _self.item.on('scroll', _self.fn_s)
        },
        fn_s:function(){                           //页面滚动时间
            if($(this).scrollTop() > t){           //滚动超过侧边栏距顶高度时
                aside.addClass('fixed').css({'top':t-h, 'left':l}); //设置侧边栏固定显示
            }else{
                aside.removeClass('fixed');
            }
        }
    }
    scroll.init();   //执行单例

    var asideItem={                          //声明侧边栏内栏目的单例
        init:function(){
            this.render();
            this.bind();
        },
        render:function(){
            this.item=$('aside');
            this.primaryLi=this.item.find('.primary');    //一级栏目
            this.subLi=this.primaryLi.find('.sub li');    //二级子栏目
        },
        bind:function(){
            var _self=this;
            _self.primaryLi.on('click', _self.switchLi);  //一级栏目绑定点击事件
            _self.subLi.on('click', _self.switchSubLi);  //二级栏目绑定点击事件

        },
        switchLi:function(){                      //一级栏目点击事件
            var _self=$(this);
            var curr='curr';
                _self.siblings('.curr').removeClass(curr);          //移除其他li的当前样式
                _self.addClass(curr);           //添加点击元素为当前样式
        },
        switchSubLi:function(){                       //二级子栏目点击事件
            $(this).siblings('.curr').removeClass('curr');          //移除其他当前样式
            $(this).addClass('curr');           //添加点击栏目为当前样式
        },
        addInitalCurr:function(){             
            this.item.find('.primary:eq(0)').addClass('curr');  //初次加载时一级栏目默认第一个元素添加当前样式
            this.item.find('.sub li:eq(0)').addClass('curr');   //初次加载时二级子栏目默认第一个元素添加当前样式
        }
    };
    asideItem.init();             //执行单例
    asideItem.addInitalCurr();    //初次加载时默认第一个元素添加当前样式
});