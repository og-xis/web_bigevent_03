$(function(){
    var form=layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        samePwd:function(value){
            if(value==$('[name=oldPwd]').val()){
                return '新密码和旧密码不能一样'
            }
        },
        rePwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return '俩次密码输入不一致'
            }
        }
    })
    // 表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:"/my/updatepwd",
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('修改密码成功')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})