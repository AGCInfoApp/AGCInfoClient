    function checkNull(){
        if($.trim($("#account").val()).length==0){
            mui.toast("请输入手机号或邮箱");
            return 0;
        }
        else{
            return 1;
        }
    }



    $(document).ready(function(){
        document.getElementById("send").addEventListener("tap",function(){
        	if(checkNull()){
        		
        		//sendmessage!!!!!!!!!!!
        		
        		mui.toast("发送成功！");
        	}
        });
    });
