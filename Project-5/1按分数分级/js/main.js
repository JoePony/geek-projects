function queryScore(){
    var score=document.getElementById('score');  
    var scoreV=score.value;                            //获取分数
    var output;                                        //定义输入
    var reg=new RegExp(/^\s*$/);                       //为空的正则式              
    switch(true){
        case reg.test(scoreV):                         //判断是否为空
            output='不能输入空值';
            break;
        case isNaN(scoreV):                            //判断是否为数字
            output='请输入数值';
            break;
        case scoreV>100:                               //判断是否大于100
            output='成绩超出上限100';
            break;
        case scoreV<0:                                 //判断是否小于0
            output='成绩低于下限0';
            break;
        case scoreV<=100 && scoreV>=90:
            output='成绩：A';
            break;
        case scoreV<90 && scoreV>=80:
            output='成绩：B';
            break;
        case scoreV<80 && scoreV>=70:
            output='成绩：C';
            break;
        case scoreV<70 && scoreV>=60:
            output='成绩：F';
            break;
        case scoreV<60 && scoreV>=50:
            output='成绩：E';
            break;
        default:                                                //低于50分时
            output='成绩：G';
    }
    var result=document.getElementById('result');               //获取结果输入元素
    result.innerHTML='您输入的分数是：'+scoreV+'<br />'+output; //输出结果
    score.value='';                                             //清空输入框
}