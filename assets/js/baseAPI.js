// 每次调用$.get() 或 $.post() 或 $.ajax()时，会先调用 $.ajaxPrefilter()，从该函数中可以获得我们给Ajax提供的配置对象。
$.ajaxPrefilter(function (options) {
    // 发起真正的Ajax请求前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 统一为需权限的接口设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete=function(res){
        // console.log(res)
        // complete回调函数中，可以使用responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
            // 1.强制清空token
            localStorage.removeItem('token');
            // 2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})