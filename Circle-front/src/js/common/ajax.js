function ajax(opt) {
    //1.创建ajax对象
    var def = {
            method: 'GET',
            async: true,
            data: '',
            success: null,
            error: null
        },
        options = ajax.extend({}, def, opt);
    var xhr = new XMLHttpRequest();
    //0-4 4
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) { //准备已就绪响应以成功
            if (xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304) { //服务器状态成功
                options.success(xhr.response);
            } else {
                options.error(new Error(xhr.statusText));
            }
        } else {
            console.log('loading...');
        }
    };
    //2.连接服务器
    //因为data可以是对象也可以字符串所以做了一个判断
    var data = typeof options.data === 'string' ? options.data : ajax.format(options.data);
    // console.log(data);
    // key=value&key=value 查询字符串
    //是不是get请求
    var isget = /get/i.test(options.method);
    //如果是get请求并且要传递参数所以url+'?'+参数（data） 否则返回 url本身
    xhr.open(options.method, isget && data ? options.url + '?' + data : options.url, options.async);
    //3.发送
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json'); //要在发送前设置请求头类型
    if (!isget) {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    }
    //发送参数get请求null post请求发送data
    xhr.send(isget ? null : data);

    //4.接受响应

};

ajax.extend = function() {
    var results = arguments[0];
    Array.prototype.slice.call(arguments, 1).map(function(item) {
        for (var key in item) {
            results[key] = item[key];
        }
    });
    return results;
};

ajax.format = function(obj) {
    // console.log(obj);
    var str = '';
    for (var key in obj) {
        str += key + '=' + obj[key] + '&';
    };
    return str.replace(/&$/, '');
}