var url = "http://139.129.25.229:31010/";
$(document).ready(function() {
    mui.init();
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
				$("#myNickname").html(nickname);
				$("#myUsername").html(username);
				$("#mySex").html(sex);
				$("#myBirthday").html(numberToDate(birthday));
				$("#mySignature").html(signature);
				$("#myEmail").html(email);
				
			} else {
				mui.toast(data["msg"]);
			}
		}
	});
    
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