// js、css、图片引用URL添加md5戳
fis.match('*.{js,css,png,jpg,jpeg,gif}', {
  useHash: true
});

//对js、css、图片静态资源进行压缩
fis.match('*.js', {
  optimizer: fis.plugin('uglify-js') //压缩js文件
});
fis.match('*.css', {
  optimizer: fis.plugin('clean-css') //压缩css文件
});
fis.match('*.png', {
  optimizer: fis.plugin('png-compressor') //压缩png图片
});

// 设置图片合并的最小间隔
fis.config.set('settings.spriter.csssprites.margin', 50); 
// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
});
// 对css进行图片合并
fis.match('*.css', { // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

// 开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
// fis.config.set('modules.postpackager', 'simple');

//////////////////////
// css文件太少，所以暂不启用打包 //
//////////////////////
// fis.config.set('pack', {
//     '/pkg/lib.js': [
//         'js/*.js'
//     ],
//     '/pkg/aio.css': 'css/**.css'  //设置CSS打包规则，
// });

//取消fis3部分功能
// fis.media('debug').match('*.{js,css,png}', {
//   useHash: false,   //取消md5戳
//   useSprite: false, //取消图片合并
//   optimizer: null   //取消文件压缩
// });