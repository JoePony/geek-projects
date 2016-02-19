$(function() {
    var windowH = $(window).height();           //获取当前窗口高度
    $('.container').css( 'minHeight',windowH ); //容器min-height设定为当前窗口高度,防止页面缩放到最小时因容器高度不够而无法触发滚动事件

    imgPosition();              //加载瀑布流位置方法

    var wrap=$('#wrap');        //获取外边div
    var url1='images/temp/loadingImg1.jpeg';       //设定滚动加载图片
    var url2='images/temp/loadingImg2.jpg';
    var url3='images/temp/11.jpg';
    var loadImgs={data:[{src:url1},{src:url2},{src:url3},{src:url2},{src:url1},{src:url3},{src:url3},{src:url1},{src:url2}]}; //外网图片json
    var loadItem;   //声明加载图片列表元素
    var loadItemA;  //声明加载图片外a元素
    
    $(window).on('scroll', function(){   //鼠标滚动事件
        if(startLoad()){      //如果滚动到设定高度
            $.each(loadImgs.data,function(k,v){     //遍历外网图片
                loadItem=$('<div>').addClass('item').appendTo(wrap);
                loadItemA=$('<a>').attr('href','').appendTo(loadItem);
                $('<img>').attr('src',v.src).appendTo(loadItemA);  //动态添加图片
                imgPosition();  //设定瀑布流位置
            });
        }
    });
});

/* 是否加载的判定方法 */ 
function startLoad() {
    var last = $('.wrap .item').last();     //获取之前加载过的图片的最后一张
    var loadRange = last.offset().top + (last.height() / 3);  //设定加载零界点为最后一张距顶+其高度的1/3
    var windowH = $(window).height();    //视窗高度
    var scrollT = $(window).scrollTop(); //滚动高度
    return (windowH + scrollT > loadRange) ? true : false; //如果滚动高度+视口高度>临界高度
}

/* 瀑布流位置方法 */ 
function imgPosition() {
    var items = $('.wrap .item');            //获取图片列表元素
    var totalW=$('.wrap').outerWidth(true);  //列表父元素宽度
    var columnNum = Math.floor(totalW / items.eq(0).outerWidth(true));  //最大图片列数
    var arrItem = [];                        //声明图片元素数组
    var minH;                                //最小高度
    var minIndex;                            //最小高度元素的索引值
    var minLeft;                             //最小高度元素的距左偏移
    $('.item').each(function(index) {        //遍历图片列表元素
        var itemCurr = $(this);
        if (index < columnNum) {             //对于第一行元素
            arrItem.push(itemCurr.outerHeight(true));  //将其宽度+margn放入数组
        } else {                             //从第二行起
            minH = Math.min.apply(null, arrItem);  //获取之前元素的最小高度
            minIndex = $.inArray(minH, arrItem);   //最小高度元素索引值
            minLeft = items.eq(minIndex).offset().left; //最小高度元素距左偏移值
            $('.item').eq(index).css({             //对当前元素设定瀑布流位置
                'position': 'absolute',
                'top': minH,                       //跟在最小高度元素之后
                'left': minLeft                    //与最小高度元素纵向保持一致
            });
            arrItem[minIndex] += itemCurr.outerHeight(true); //将高度更新为原高度+当前元素的高度+外边距
        }
    });
}
