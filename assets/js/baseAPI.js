// 开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
// ajax请求拦截
$.ajaxPrefilter(function (params) {
    // 拼接对应环境的服务器地址
    params.url = baseURL + params.url
    // 对有需要的接口配置头信息
    if (params.url.indexOf('/my/') !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
    params.complete=function(res){
        console.log(res.responseJSON);
        var obj=res.responseJSON
        if(obj.status==1&&obj.message=='身份认证失败！'){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }


})
var layer=layui.layer
$('#btnLogout').on('click',function(){
    layer.confirm('确认是否退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')
        location.href='/login.html'
        layer.close(index);
      });
})