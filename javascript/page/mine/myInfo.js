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

	document.getElementById("myInfoChangePicture").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangePicture",
			url: "myInfoChangePicture.html",
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

	document.getElementById("myInfoChangeNickname").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangeNickname",
			url: "myInfoChangeNickname.html",
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

	document.getElementById("myInfoChangeSex").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangeSex",
			url: "myInfoChangeSex.html",
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

	document.getElementById("myInfoChangeBirthday").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangeBirthday",
			url: "myInfoChangeBirthday.html",
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

	document.getElementById("myInfoChangeEmail").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangeEmail",
			url: "myInfoChangeEmail.html",
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

	document.getElementById("myInfoChangeSignature").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangeSignature",
			url: "myInfoChangeSignature.html",
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

function getMyInfo() {

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
				$("#myNickname").html(nickname);
				$("#myUsername").html(username);
				$("#mySex").html(sex);
				$("#myBirthday").html(numberToDate(birthday));
				$("#mySignature").html(signature);
				$("#myEmail").html(email);
				$("#myMobile").html(mobile);
				$("#myLevel").html(level);
			} else {
				mui.toast(data["msg"]);
			}
		}
	});

}