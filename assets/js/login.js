$(function () {
    // 点击去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从layui中获取form对象
    var form = layui.form
    // 自定义表单校验规则pwd
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 行参拿到确认密码框内容。 需要拿到密码框内容 然后判断
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })


    // 从layui中获取layer对象
    var layer = layui.layer
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1.阻止默认的提交行为
        e.preventDefault()
        // 2.发起Ajax的post请求
        var data = { 
            username: $('#form_reg [name=username]').val(), 
            password: $('#form_reg [name=password]').val() 
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        // 1.阻止默认提交行为
        e.preventDefault()
        // 2.发起Ajax的post请求
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // console.log(res.token)
                // 将登陆成功得到的token字符串保存到localStorage中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})