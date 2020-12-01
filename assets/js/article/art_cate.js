$(function(){
    initArtCateList()
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                var str=template('tpl-art-cate',res)
                $('tbody').html(str)
            }
        })
    }
    var layer=layui.layer
    $('#btnAdd').on('click',function(){
        indexAdd=layer.open({
            type:1,
            title:'文章标题分类',
            area: ['500px', '250px'],
            content:$('#dialog-add').html()
        })
    })
    var indexAdd=null
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return console.log(res.message);
                }
                initArtCateList()
                layer.msg('更新成功')
                // 关闭弹出层
                layer.close(indexAdd);
            }
        })
    })
    var indexEdit=null
    $('tbody').on('click','.btn-edit',function(){
        indexEdit=layer.open({
            type:1,
            title:'文章标题分类',
            area: ['500px', '250px'],
            content:$('#dialog-edit').html()
        })
        var Id=$(this).attr('data-id')
        $.ajax({
            method:'GET',
            url:'/my/article/cates/'+Id,
            success:function(res){
                form.val('form-edit',res.data)
            }
        })
    })
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return console.log(res.message);
                }
                initArtCateList()
                layer.msg('更新文章类别成功')
                // 关闭弹出层
                layer.close(indexEdit);
            }
        })
    })
    $('tbody').on('click','.btn-delete',function(){
        var Id=$(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+Id,
                success:function(res){
                    if(res.status){
                        return console.log(res.message);
                    }
                    initArtCateList()
                    layer.msg('删除文章类别成功')
                    // 关闭弹出层
                    layer.close(index);
                }
            })
            
            layer.close(index);
          });
        
    })

})