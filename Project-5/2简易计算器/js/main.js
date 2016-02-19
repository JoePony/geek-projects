function calculate(){
    var first=document.getElementById('first');        //获取第一个数
    var firstV=parseFloat(first.value);
    var second=document.getElementById('second');      //获取第二个数
    var secondV=parseFloat(second.value);
    var result=document.getElementById('result');
    var c;                                             //声明运算符
    var output;                                        //声明运算结果
    var reBlank=new RegExp(/^\s*$/);                   //正则式判断空否
    var reNumber=new RegExp(/^\s*-?\d+(.?\d+)?\s*$/);  //正则式判断运算数字是否适合运算
    var getC=getCharacter();                           //获取运算符
    //如果运算数字为空，或没有填写适合运算的数字
    if(reBlank.test(firstV) || reBlank.test(secondV) || !reNumber.test(firstV) || !reNumber.test(secondV)){
        output='请填写有效的运算数字！';         
    }else if(getC==undefined){
        output='请选择运算符！';                       //如果没选运算符
    }else{                                             //如果填选内容符合规范则开始运算
        switch(getC){
            case 'plus':                               //如果为+
            // output=parseInt(firstV)+parseInt(secondV); //运算
            output=firstV+secondV; //运算
            c='+';                                     //定义运算符以便在结果中输出
            break;

            case 'subtract':
            output=firstV-secondV;
            c='-';
            break;

            case 'multiply':
            output=firstV*secondV;
            c='*';
            break;

            case 'devide':
            output=firstV/secondV;
            c='/';
            break;

            case 'remainder':
            output=firstV%secondV;
            c='%';
            break;
        }
        firstV=(firstV>0) ? firstV : '('+firstV+')';    //如果运算数为负数，则外加()
        secondV=(secondV>0) ? secondV : '('+secondV+')';
        output=firstV+' '+c+' '+secondV+' = '+output;   //给运算结果添加附加内容
    }
    result.innerHTML=output;                            //输出结果
}
/* 
* 获取用户选择的运算符
*/
function getCharacter(){                                       
    var character=document.getElementsByName('character');
    var returnC;                                //声明运算符变量
    for(var i=0;i<character.length;i++){
        if(character[i].checked){
            returnC=character[i].value;         //如果运算符有选择，则赋值相应的运算符
            break;                              //有选择即跳出循环
        }
    }
    return returnC;           //如果对运算符有选择，则返回运算符，否则返回undifined
}