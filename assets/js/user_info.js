$(function () {
    var form = layui.form
    initUserInfo()
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1 ～6个字符之间！'
            }
        }
    })

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                console.log(res)
                // 调用form.val()快速为表单赋值
                form.val('formUserInfo', res.data)

            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function (e) {
        // 1.阻止表单的默认重置行为
        e.preventDefault()
        // 2.重新填写表单
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e){
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function (res){
                if (res.status !== 0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')
                // 调用iframe父页面的方法重新渲染用户的头像和昵称
                window.parent(getUserInfo())
            }
        })
    })

})

