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
				$("#myPersonalSign").html("2333333333!!!");
				
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

	document.getElementById("myInfoChangeName").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangeName",
			url: "myInfoChangeName.html",
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

	document.getElementById("myInfoChangePersonalSign").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangePersonalSign",
			url: "myInfoChangePersonalSign.html",
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