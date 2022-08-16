// 每次调用$.get() 或 $.post() 或 $.ajax()时，会先调用 $.ajaxPrefilter()，从该函数中可以获得我们给Ajax提供的配置对象。
$.ajaxPrefilter( function(options){
    // 发起真正的Ajax请求前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007'+options.url
    console.log(options.url)
})