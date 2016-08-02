var url = "http://139.129.25.229:31010/";
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
            url: url+"prometheus/user/login",
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
                if (errCode == 0) {
                	localStorage.setItem("myToken", data["token"]);
                	localStorage.setItem("myUserId", data["userId"]);
                    mui.openWindow({
                        id: "dynamic",
                        //url: "../dynamic/dynamicMain.html",
                        url: "Main.html",
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
                } else{
                	mui.toast(data["msg"]);
                }
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

//  document.getElementById("forgetPassword").addEventListener("tap",function(){
//      mui.openWindow({
//          id: "findPassword",
//          url: "findPassword.html",
//          styles: {
//              popGesture: 'close'
//          },
//          show: {
//              aniShow: "pop-in"
//          },
//          waiting: {
//              autoShow: true
//          }
//      });
//  });
});


