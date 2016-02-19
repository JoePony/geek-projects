requirejs.config({
    baseUrll:'./',     //基础路径
    path:{
        index:'index' //声明自定义主库
        //requireJS貌似会把index.min认作index，所以压缩后文件就不用index.min命名了
    }
});
requirejs(['index'],function(){});   //载入index库