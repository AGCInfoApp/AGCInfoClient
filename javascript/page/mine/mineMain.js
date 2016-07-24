$(document).ready(function(){
	
    if(window.sessionStorage){
    	var token = sessionStorage.getItem("token");
    }
    $("#welcome").html("<div class='title' id='welcome'>"+token+"，欢迎您！</div>");
    
    document.getElementById("myMessage").addEventListener("tap",function(){
        mui.openWindow({
            id: "myMessage",
            url: "myMessage.html",
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
    
    document.getElementById("selfShare").addEventListener("tap",function(){
        mui.openWindow({
            id: "selfShare",
            url: "selfShare.html",
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
    
    document.getElementById("selfCollect").addEventListener("tap",function(){
        mui.openWindow({
            id: "selfCollect",
            url: "selfCollect.html",
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
    
    document.getElementById("myInfo").addEventListener("tap",function(){
        mui.openWindow({
            id: "myInfo",
            url: "myInfo.html",
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
    
    document.getElementById("friendList").addEventListener("tap",function(){
        mui.openWindow({
            id: "friendList",
            url: "friendList.html",
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