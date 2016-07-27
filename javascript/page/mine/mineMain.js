var url = "http://139.129.25.229:31010/";
$(document).ready(function() {

	if(window.localStorage) {
		var myToken = localStorage.getItem("myToken");
		var myUserId = localStorage.getItem("myUserId");
	}

	$.ajax({
		type: "GET",
		url: url + "prometheus/user/getInfo?userId=" + myUserId + "&token=" + myToken,
		dataType: 'JSON',
		beforeSend: function(XMLHttpRequest) {},
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				var id = data["data"].id;
				var nickname = data["data"].nickname;
				var mobile = data["data"].mobile;
				var email = data["data"].email;
				var username = data["data"].username;
				var sex = data["data"].sex;
				var birthday = data["data"].birthday;
				var pic = data["data"].pic;
				var readNum = data["data"].readNum;
				var commentNum = data["data"].commentNum;
				var level = data["data"].level;
				var preference = data["data"].preference;
				var signature = data["data"].signature;
				$("#welcome").html(nickname);
			} else {
				mui.toast(data["msg"]);
			}
		}
	});

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

	document.getElementById("friendList").addEventListener("tap", function() {
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