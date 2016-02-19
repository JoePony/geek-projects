define(['require','index'],function(require){
    $('#adminNavSwitch > li').each(function(k,v){
        $(this).on('click',function(){
            var _self=$(this);
            $('#adminMainSwitch > div').filter('.curr').removeClass('curr');
            _self.siblings('.curr').removeClass('curr');
            $('#adminMainSwitch > div').eq(k).addClass('curr');
            _self.addClass('curr');
        });
    });
});