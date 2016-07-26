var url = "http://139.129.25.229:31010/";
$(document).ready(function() {

	if(window.localStorage) {
		var myToken = localStorage.getItem("myToken");
		var myUserId = localStorage.getItem("myUserId");
	}
	alert(myUserId);
	$.ajax({
		type: "GET",
		url: url + "prometheus/user/getInfo?userId=" + myUserId + "&token=" + myToken,
		dataType: 'JSON',
		beforeSend: function(XMLHttpRequest) {},
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				$("#welcome").html(data["nickname"]);
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