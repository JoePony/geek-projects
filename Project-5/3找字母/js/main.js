function seek() {
    var arr = ['a', 'x', 'b', 'd', 'm', 'a', 'k', 'm', 'p', 'j', 'a'];
    var helpBlock = document.getElementById('helpBlock');  //获取结果显示元素
    var output = '';                                       //申明输出结果
    var str = arr.join('');                                //转为字符串用于循环中比对
    var arrN = [];                                    
    //新数组，索引为出现的字母(不重复)，结构:arrN['a']={元素:a,次数:3,位置:[0,5]}
    arr.forEach(function(v, i) {                           //遍历每个字母 start
        var m = 0;                                         //出现次数计数器
        var oItem = {};                                    //用于放入元素,次数,出现位置
        oItem.position = [];                               //出现位置放入数组
        while (str.indexOf(v) != -1) {                     //只要首次出现或重复出现
            m++;                                           //出现次数++
            if (v in arrN) {
            //如果出现重复字母                                               
                arrN[v].number = m;                        //更改出现次数
                arrN[v].position.push(str.indexOf(v));     //更新存放位置的数组
            } else {                                       //如果是首次出现的字母
                oItem.item = v;                            //新建对象并写入属性为该字母
                oItem.number = m;                          //写入次数
                oItem.position.push(str.indexOf(v));       //写入出现位置
            }
            arrN[v] = (oItem);                            
            //元素,次数,出现位置放入新数组(不用数字索引,方便第13行代码查找是否重复出现)
            str = str.replace(v, '*');                   
            //比对过的字母用*替换，防止重复比对
        }
    })                                                     //数组遍历 end

    var n = 0;                                             //出现次数的初始对比值
    var oResult = {};                                      //用于赋给最多出现的元素
    for (i in arrN) {                                      //开始找最大出现次数
        if (arrN[i].number > n) {                          //看谁大
            n = arrN[i].number;                            //找到更大的就设置为对比值
            oResult = arrN[i];                             //同时赋值
        }
    }
    oResult.position.forEach(function(v, i) { 
            oResult.position[i] = v + 1;                   //找到后对出现位置加1
    })
    output = '出现最多的元素: '                            //结果字符串
            + oResult.item 
            + '<br/>出现次数: ' 
            + oResult.number 
            + '次<br/>分别位于: 第' 
            + oResult.position.join('、') 
            + '位';
    helpBlock.innerHTML = output;                          //打印结果
}
