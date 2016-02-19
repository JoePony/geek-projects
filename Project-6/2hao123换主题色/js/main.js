


/* 搜索框内更多展开效果 start */ 
var kwMore = document.getElementById('kw-more');              //获取更多元素
var moreCategory = document.getElementById('more-category');  //获取展开其它元素
kwMore.onclick = function(e){                                 //点击更多时
    var arrowIcon = this.getElementsByTagName('i')[0];
    if(arrowIcon.className == 'curr'){              //如果已展开
        arrowIcon.className = '';                   //小三角图标恢复正常样式
        moreCategory.style.display = 'none';        //隐藏更多元素 
    }else{
        arrowIcon.className = 'curr';               //小三角图标变倒立样式
        moreCategory.style.display = 'block';       //展开更多元素                    
    }
}
kwMore.onblur = function(e){                                  //更多失去焦点时
    this.getElementsByTagName('i')[0].className = '';          //小三角图标恢复样式
    moreCategory.style.display = 'none';                      //隐藏更多元素
}
/* 搜索框内更多展开效果 end */ 

/* 点击换主题 start */ 
var body = document.getElementsByTagName('body')[0];                //获取body
//获取主题选项
Concurrent.Thread.create(function(){                
//点击事件与小广告轮播多线程进行,防止前者影响后者运行
    var themeOptions = document.getElementsByClassName('theme-option'); 
    //遍历主题选项(点击li间隙,或ul时会有bug,故未用代理方式)
    var now = 0;
    var i;                                            //统一声明循环增量i
    for(i = 0;  i < themeOptions.length;  i++){       //遍历主题选项按钮元素
        var option = themeOptions[i];
        themeOptions[i].onclick = function(e){        //如果有点击事件
            var self=this;                            //统一声明this
            if( !hasClass(self.className,'curr') ){   //若当前主题和所选一致,则不必重复操作
                body.className = self.id;        //为body添加相应主题样式,各样式在css已设定
                //localStorage.theme = self.id;    //在浏览器端localStorage记录点击样式,但是这一项是多余的，只localStorage.indexNow即可!!!
                localStorage.indexNow = self.id;      //在浏览器端localStorage记录点击元素
                clearCurr(themeOptions);  //调用clearCurr方法删除其它主题选项按钮的当前样式
                self.className = 'theme-option curr'; 
                //立即为点击项添加当前样式,否则只能在刷新后生效
            }
        };
    } 

    var indexNow = (localStorage.indexNow === undefined) ? themeOptions[0].id : localStorage.indexNow;
    //从localStorage读取之前点击的选项按钮并添加当前突出样式,以便刷新或关闭时仍然生效。首次加载时,设置第一个主题选项

    var optionNow=document.getElementById(indexNow);
    // if( !hasClass(optionNow.className,'curr') ){  //刷新网页必然删除curr,所以if也不必了
        optionNow.className = 'theme-option curr';   //所以要加再次添加
    // }
    body.className = indexNow;       
    //从localStorage读取之前选择的主题色并添加给页面父元素,便于刷新或关闭后依然保持主题色
    

    /* 顶部幻灯小广告，发现bug:点击换主题时会影响本效果 */ 
    var adList=document.getElementById('ad-list');
    var adItem=adList.getElementsByTagName('li');
    var i = 0;
    var slide = setInterval(function(){          
        if(i > 0){
            adItem[i-1].className = 'hidden';
        }
        if(i > adItem.length-1){
            i = 0;
        }
        adItem[i].className = 'vis';
        // for(var j=0;j<adList.length;j++){

        //      adItem[j].style.display='none';
        //      console.log(adItem[j]);
        // }
        // console.log();
    // setTimeout(function(){ clearInterval(alert1); },6000);
        i++;
    },1000)
    //setTimeout(function (){ slide(); },0) //如果让slide立即执行而不是等2s后才执行
    
    adList.onmouseenter=function(e){     //光标移入时停止interval轮播
        clearInterval(slide);
    };
    adList.onmouseleave=function(e){     //光标移出时继续interval轮播
        slide = setInterval(function(){          
            if(i > 0){
                adItem[i-1].className = 'hidden';
            }
            if(i > adItem.length-1){
                i = 0;
            }
            adItem[i].className = 'vis';
            i++;
        },1000)
    }
});


/* 判断obj元素是否含有cName样式 */ 
function hasClass(obj , cName){
    var r = obj.indexOf(cName);
    if(-1 == r){
       return false; 
    }else{
       return true;
    }
}
/* 清除带有curr(当前样式)的选项按钮样式 */
function clearCurr(options){
    for(i = 0;  i < options.length;  i++){
        if( hasClass(options[i].className,'curr') ){ //调用hasClass判断是否含有curr样式
            options[i].className = 'theme-option';
            break;
        }
    }
}
/* 点击换主题 end */ 

