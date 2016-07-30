var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
	}
    getMyInfo();
	
	

	document.getElementById("myMessage").addEventListener("tap", function() {
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

	document.getElementById("selfShare").addEventListener("tap", function() {
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

	document.getElementById("selfCollect").addEventListener("tap", function() {
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

	document.getElementById("myInfo").addEventListener("tap", function() {
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

	document.getElementById("concernList").addEventListener("tap", function() {
		mui.openWindow({
			id: "concernList",
			url: "concernList.html",
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

function getMyInfo(){
	$.ajax({
		type: "GET",
		url: url + "prometheus/user/getInfo?userId=" + myUserId + "&token=" + myToken,
		dataType: 'JSON',
		beforeSend: function(XMLHttpRequest) {},
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				id = data["data"].id;
				nickname = data["data"].nickname;
				mobile = data["data"].mobile;
				email = data["data"].email;
				username = data["data"].username;
				sex = data["data"].sex;
				birthday = data["data"].birthday;
				pic = data["data"].pic;
				readNum = data["data"].readNum;
				commentNum = data["data"].commentNum;
				level = data["data"].level;
				preference = data["data"].preference;
				signature = data["data"].signature;
				$("#welcome").html(nickname);
			} else {
				mui.toast(data["msg"]);
			}
		}
	});
}