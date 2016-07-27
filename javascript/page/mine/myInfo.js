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
				$("#myNickname").html(data["data"].nickname);
				$("#myUsername").html(data["data"].username);
				$("#mySex").html(data["data"].sex);
				$("#mySignature").html(data["data"].signature);
				
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