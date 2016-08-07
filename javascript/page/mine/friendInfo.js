var url = "http://139.129.25.229:31010/";
var headPhotoUrl = "http://139.129.25.229/";
var myToken;
var myUserId;
var friendUserId;
var remarkNameByMe;
var friendSex;
var friendUsername = "";
var friendNickname = "";
var friendPic = "";

$(document).ready(function() {
	
	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
		friendUserId = localStorage.getItem("friendId");
	}
	
	getFriendInfo();
	showFriendInfo();
	
	document.getElementById("changeRemarkName").addEventListener("tap", function() {
		mui.openWindow({
			id: "changeRemarkName",
			url: "changeRemarkName.html",
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

function getFriendInfo(){
	//得到备注
	//$.ajax({
	//		type: "GET",
	//		url: url + "prometheus/user/getOtherRemarkName?userId=" + friendUserId+"&firendId="+friendUserId,
	//		dataType: 'JSON',
	//	async: false,
	//		beforeSend: function(XMLHttpRequest) {},
	//		success: function(data, textStatus) {
	//			var errCode = data["errCode"];
	//			if(errCode == 0) {
	//				remarkNameByMe = data["remarkName"];
	//			}
	//		},
	//		complete: function(XMLHttpRequest, textStatus) {
	//
	//		},
	//		error: function() { //请求出错处理
	//		}
	//	});
	//得到其他信息
	$.ajax({
		type: "GET",
		url: url + "prometheus/user/getOtherInfo?userId=" + friendUserId,
		dataType: 'JSON',
		async: false,
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				friendSex = data["data"].sex;
				friendUsername = data["data"].username;
				friendNickname = data["data"].nickname;
				friendPic = data["data"].pic;

			} 
		},

	});
}

function showFriendInfo(){
	if(friendSex == ""||friendSex == null){
		friendSex = "未设置性别"
	}
	if(remarkNameByMe == ""||remarkNameByMe == null){
		remarkNameByMe = friendNickname;
	}
	//显示信息
	if(friendPic!=""){
		$("#headPhoto").attr("src",headPhotoUrl+friendPic);
	}
	
	$("#friendInfo").html(remarkNameByMe + "  " + friendSex + "<p class='mui-ellipsis'>用户名:" + friendUsername + "</p>							<p class='mui-ellipsis'>    昵称:" + friendNickname + "</p>");

}
