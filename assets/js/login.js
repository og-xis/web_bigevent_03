$(function(){
    $('#links_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#links_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form=layui.form
    form.verify({
        // 验证表单
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwe: function(value){
            var pwd=$('.reg-box input[name=password]').val()
            if(value!==pwd){
                return "俩次输入不一样"
            }
        }
    })
    // 注册功能
    var layer=layui.layer
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/api/reguser',
            data:{
                username:$('.reg-box input[name=username]').val(),
                password:$('.reg-box input[name=password]').val()
            },
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，注册成功')
                $('#links_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })
    // 登录功能
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，登录成功')
                // 保存token
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })

})