$(function(){
    toUserInfo()
})
function toUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ""
        // },
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg(res.message)
            }
            // 渲染头像
            renderAvatar(res.data)
        }
    })
}
function renderAvatar(user){
    var name =user.nickname || user.username
    $("#welcome").html('欢迎&nbsp;&nbsp;'+name)
    if(user.user_pic!==null ){
        $('.layui-nav-img').show().attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var text=name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}