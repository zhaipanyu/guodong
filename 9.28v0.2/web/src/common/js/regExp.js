let name = {
        name: '姓名', regexp: /^[A-Za-z\u4e00-\u9fa5][\w\._-]{0,44}$/
    },
    username = {
        name: '用户名', regexp: /^[A-Za-z][\w\._-]{0,44}$/
    },
    password = {//6--18位的数字和字母组合
        name: '密码', regexp: /^(?:\d+|[a-zA-Z]+){6,18}$/
    },
    routerURL ={//格式如：/abc/cba
        name: 'API-UR／页面URL', regexp: /^\/\w+\/?\w*$/
    },
    phone = {
        name: '手机号码', regexp: /^1[3|4|5|7|8]\d{9}$/
    },
    /*email = {
        name: '邮箱', regexp: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
    },*/
    email = {
        name: '邮箱', regexp:/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    },
    postcode = {
        name: '邮编', regexp: /^[1-9][0-9]{5}$/
    },
    date = {
        name: '日期', regexp: /^[0-9]{4}[-/.][0-9]{2}[-/.][0-9]{2}$/
    };
export {name,username,password,routerURL,phone,email,postcode,date};

