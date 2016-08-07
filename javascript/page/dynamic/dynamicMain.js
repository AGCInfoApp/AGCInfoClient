var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId"); 
	}

	document.getElementById("myMessage").addEventListener("tap", function() {
		mui.openWindow({
			id: "myMessage",
			url: "../dynamic/myMessage.html",
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
			url: "../dynamic/selfShare.html",
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
			url: "../dynamic/selfCollect.html",
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

	document.getElementById("friendShare").addEventListener("tap", function() {
		mui.openWindow({
			id: "friendShare_Main",
			url: "../dynamic/friendShare_Main.html",
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

