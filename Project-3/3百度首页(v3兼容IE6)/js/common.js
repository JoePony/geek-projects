function clearKw(){          //点击关键词清除按钮
    document.getElementById('kw').value='';  //点击清除关键词
}

function typeKw(){           //点击关键词文本框
    document.getElementById('clear_kw').style.display='block';      //显示清除按钮       
    document.getElementById('clear_kw').style.cursor='pointer';     //添加按钮的cursor样式(兼容IE6)
    document.getElementById('kw_wrap').className+=' kw_wrap_c';   //搜索外框变色
}

function changeColor(){      //光标移入搜索外框
    document.getElementById('kw_wrap').className+=' kw_wrap_h';   //外框变色(兼容IE6)
}
function retainColor(){      //光标移出搜索外框
    document.getElementById('kw_wrap').className='kw_wrap fll';   //去除变色样式,恢复原有样式
}

function btnH(){             //光标移入搜索按钮
    document.getElementById('s_btn').className+=' s_btn_h';       //添加变色样式(兼容IE6)
}
function btnR(){             //光标移出搜索按钮
    document.getElementById('s_btn').className='s_btn';           //去除变色样式,恢复原有样式
}

function clearColor(){       //光标移入"清除关键词"按钮
    document.getElementById('clear_kw').className+=' clear_kw_h';   //变色(兼容IE6)
}
function clearColorR(){      //光标移出"清除关键词"按钮
    document.getElementById('clear_kw').className='clear_kw';       //去除变色样式，恢复原样式
}

function showSetting(){      //光标移入导航的"设置"
    document.getElementById('show_setting').style.display='block';  //显示更多设置(兼容IE6,但还是有点问题，貌似用javascript无法解决)    
}
function hideSetting(){      //光标移出导航的"设置"
    document.getElementById('show_setting').style.display='none';   //隐藏更多设置 
}
