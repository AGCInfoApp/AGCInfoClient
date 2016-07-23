function showWarning(msg){
        $("#tips").html(msg);
        $("#tips").show();
    }

    function hideWarning(){
        $("#tips").hide();
    }

    function checkPassword(){
        var pwd1= $.trim($("#password").val());
        var pwd2= $.trim($("#password_confirm").val());
        console.log(pwd1+"  "+pwd2);
        if(pwd1==pwd2){
            return 1;
        }else{
            showWarning("两次密码不一致、重新输入");
            return 0;
        }
    }

    function checkMobile(){
        var mobile=$.trim($("#mobile").val());
        console.log(mobile+"="+mobile.length)
        if(mobile.length!=11){
            showWarning("请输入正确的手机号");
            return 0;
        }else{
            return 1;
        }
    }

    function register(){
        if(checkPassword()==1 && checkMobile()==1){
            var username=$.trim($("#account").val());
            var password=$.trim($("#password").val());
            var mobile = $.trim($("#mobile").val());
            $.ajax({
                type: "POST",
                url: "把注册的东西写入数据库",
                contentType: "application/json", //必须有
                dataType: 'JSON',
                data: JSON.stringify({
                    'username': username,
                    'password': password,
                    'mobile': mobile
                }),
                beforeSend: function (XMLHttpRequest) {
                },
                success: function (data, textStatus) {
                    var errCode = data["errCode"];
                    if (errCode == 0) {
                        mui.toast("注册成功！");
                    } else {
                        mui.toast("注册失败，稍后重试…");
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {

                },
                error: function () {//请求出错处理
                }
            });
        }
    }

    $(document).ready(function(){
        document.getElementById("reg").addEventListener("tap",function(){
            register();
        });
    });


