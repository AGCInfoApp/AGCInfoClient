var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var friendUserId;
var remarkNameByMe = "";
var friendSex;
var friendUsername = "";
var friendNickname = "";
var friendPic = "";

$(document).ready(function() {
	if (window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = parseInt(localStorage.getItem("myUserId"));
		friendUserId = localStorage.getItem("friendId");

	}

	getFriendInfo();

	mui.init({
		gestureConfig: {
			doubletap: true
		},
		subpages: [{
			url: 'privateMessageOfFriendAndMe_Sub.html',
			id: 'privateMessageOfFriendAndMe_Sub.html',
			styles: {
				top: '45px',
				bottom: '0px',
			}
		}]
	});
	

	var contentWebview = null;
	document.querySelector('header').addEventListener('doubletap', function() {
		if (contentWebview == null) {
			contentWebview = plus.webview.currentWebview().children()[0];
		}
		contentWebview.evalJS("mui('#pullrefresh').pullRefresh().scrollTo(0,0,100)");
	});
	
	});
	
	


function getFriendInfo() {
	//得到备注
	//$.ajax({
	//		type: "GET",
	//		url: url + "prometheus/user/getOtherRemarkName?userId=" + myUserId+"&firendId="+friendUserId,
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
			if (errCode == 0) {
				friendNickname = data["data"].nickname;
			}
		},
	});
	
	//显示备注或昵称
	if (remarkNameByMe == "" || remarkNameByMe == null) {
		if (friendNickname == "" || friendNickname == null) {
			$("#friendNickname").html("未设置昵称");
		} else {
			$("#friendNickname").html(friendNickname);
		}
	} else {
		$("#friendNickname").html(remarkNameByMe);
	}
	

	
}