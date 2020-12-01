$(function () {
    // 时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var h = padZero(dt.getHours())
        var f = padZero(dt.getMinutes())
        var s = padZero(dt.getSeconds())
        return y + "-" + m + "-" + d + " " + h + ":" + f + ":" + s
    }
    // 时间补零
    function padZero(n) {
        return n > 9 ? n : "0" + n
    }
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //   每页显示几条
        cate_id: '', //    文章 id
        state: '' //   文章状态
    }
    initTable()

    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res);
                var str = template('tpl-table', res)
                $('tbody').html(str)
                renderPage(res.total)
            }
        })
    }
    // 初始化分类
    var form=layui.form
    initCate()
    function initCate(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                var str=template('tpl-cate',res)
                $('[name=cate_id]').html(str)
                form.render()
            }
        })
    }
    // 筛选
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        var state=$('[name=state]').val()
        var cate_id=$('[name=cate_id]').val()
        q.state=state
        q.cate_id=cate_id
        initTable()
    })
    // 分页
    laypage=layui.laypage
    function renderPage(total){
        laypage.render({
            elem: 'pageBox',//注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit:q.pagesize,//每页几条
            curr:q.pagenum,  // 页码值
            layout:['count','limit','prev', 'page', 'next','skip'],
            limits:[2,3,5,10],
            jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数
                q.pagenum=obj.curr
                q.pagesize=obj.limit
                //首次不执行
                if(!first){
                  //do something
                  initTable()
                }
              }
        });
    }
    // 删除
    layer=layui.layer
    $('tbody').on('click','.btn-delete',function(){
        var Id=$(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/delete/' + Id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg(res.message)
                    }
                    // 删除后重新渲染页面
                    layer.msg('删除成功')
                    if($('.btn-delete').length == 1 && q.pagenum >1) q.pagenum--
                    initTable()
                }
            })
            layer.close(index);
          });
    })
})