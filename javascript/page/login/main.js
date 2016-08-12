var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;
$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
	}
	window.addEventListener('refresh', function(e) {
		location.reload();
	})
	
    mui.init({
		swipeBack: true //启用右滑关闭功能
	});

});

function shopLogin(){
	alert("1")
	if(myToken!=""||myToken!=null){
		
		$("#shop").attr("src","login.html");
	}
}
