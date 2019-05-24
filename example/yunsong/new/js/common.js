

// 十一位电话号码加密
function secretkey(str){
    if(str.length === 11){
        console.log(1,str);
        console.log(2,str.substr(0,3));
        str = str.substr(0,3) + "****" + str.substr(7,4);
    }
    return str;
}

// 登录状态改变导航栏登录按钮显示用户信息
function isLogin(){
    if(window.localStorage.getItem("login")){
        $.ajax({
            type:"POST",
            url:"http://api.1yunsong.com/user/index/web_index",
            data:{
                userId: JSON.parse(window.localStorage.getItem("login")).userId,
                tokenSession:JSON.parse(window.localStorage.getItem("login")).tokenSession,
                WEB: "LY"
            },
            success:function(res){
                // console.log(res);
                if(res.ret ){
                    $('.rightBtn').html('<p>欢迎你，'+ secretkey(res.data.username)+'</p>');
                }
            },
            error:function(err){
                console.log(err);
            }
        })
    }else{
        $('.rightBtn').html('<a href="login.html" class="btn checked" rel="nofollow">登陆</a>\n' +
            '            <a href="login.html" class="btn" rel="nofollow">注册</a>')
    }
}

