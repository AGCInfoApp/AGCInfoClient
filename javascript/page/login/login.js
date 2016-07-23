function checkNull(){
    if($.trim($("#account").val()).length==0 || $.trim($("#password").val()).length==0){
        mui.toast("账号或密码不能为空");
        return 0;
    }
    else{
        return 1;
    }
}

function login(){
    if(checkNull()){
        var username= $.trim($("#account").val());
        var password = $.trim($("#password").val());
        $.ajax({
            type: "POST",
            url: "检查用户名密码是否正确",
            contentType: "application/json", //必须有
            dataType: 'JSON',
            data: JSON.stringify({
                'login': username,
                'password': password
            }),
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (data, textStatus) {
                var errCode = data["errCode"];
                var token = "jqm";
                //var token = data["token"];
                if (errCode == 0) {
                    mui.openWindow({
                        id: "register",
                        url: "../news/news.html",
                        extras:{
                            token:token,
                        },
                        styles: {
                            popGesture: 'close'
                        },
                        show: {
                            aniShow: "pop-in"
                        },
                        waiting: {
                            autoShow: true
                        }
                    });
                    mui.toast("登录成功！");
                } else if(errCode==1000201) {
                    mui.toast("账号不存在！");
                } else if(errCode==1000202){
                    mui.toast("密码错误！");
                } else{
                    mui.toast("登录失败！稍后重试");
                }
            }
        });
        mui.openWindow({
                        id: "register",
                        url: "../news/news.html",
                        extras:{
                            token:123,
                        },
                        styles: {
                            popGesture: 'close'
                        },
                        show: {
                            aniShow: "pop-in"
                        },
                        waiting: {
                            autoShow: true
                        }
                    });
    }
}


$(document).ready(function(){
    document.getElementById("login").addEventListener("tap",function(){
                login();
            }
    );

    document.getElementById("reg").addEventListener("tap",function(){
        mui.openWindow({
            id: "register",
            url: "register.html",
            styles: {
                popGesture: 'close'
            },
            show: {
                aniShow: "pop-in"
            },
            waiting: {
                autoShow: true
            }
        });
    });

    document.getElementById("forgetPassword").addEventListener("tap",function(){
        mui.openWindow({
            id: "findPassword",
            url: "findPassword.html",
            styles: {
                popGesture: 'close'
            },
            show: {
                aniShow: "pop-in"
            },
            waiting: {
                autoShow: true
            }
        });
    });
});


