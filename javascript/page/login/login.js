var url = "http://139.129.25.229:31010/";
var headPhotoUrl = "http://139.129.25.229/";
var myToken = "";
var myUserId = "";
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

function checkNull() {
	if($.trim($("#account").val()).length == 0 || $.trim($("#password").val()).length == 0) {
		mui.toast("账号或密码不能为空");
		return 0;
	} else {
		return 1;
	}
}

function login() {
	if(checkNull()) {
		var username = $.trim($("#account").val());
		var password = $.trim($("#password").val());
		$.ajax({
			type: "POST",
			url: url + "prometheus/user/login",
			contentType: "application/json", //必须有
			dataType: 'JSON',
			data: JSON.stringify({
				'login': username,
				'password': password
			}),
			beforeSend: function(XMLHttpRequest) {},
			success: function(data, textStatus) {
				var errCode = data["errCode"];
				if(errCode == 0) {
					localStorage.setItem("myToken", data["token"]);
					localStorage.setItem("myUserId", data["userId"]);
					mui.openWindow({
						id: "main",
						url: "main.html",

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
					main = plus.webview.getWebviewById('main');
					mui.fire(main, 'refresh');
					mui.toast("登录成功！");
				} else {
					mui.toast(data["msg"]);
				}
			}
		});

	}
}

$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
	}

	window.addEventListener('refresh', function(e) {
		location.reload();
	})

	document.getElementById("login").addEventListener("tap", function() {
		login();
	});

	document.getElementById("reg").addEventListener("tap", function() {
		mui.openWindow({
			id: "register",
			url: "register.html",
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

	document.getElementById("autoLogin").addEventListener("tap", function() {

		mui.openWindow({
			id: "main",
			url: "main.html",

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
		main = plus.webview.getWebviewById('main');
		mui.fire(main, 'refresh');
		mui.toast("自动登录成功");
	});

	if(myToken == "" || myToken == null) {
		$("#autoLogin").html("");

	} else {
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
					$('#autoLoginUsername').html(username);
					if(pic != "") {
						$("#autoLoginHeadPhoto").attr("src", headPhotoUrl + pic);
					}
				} else {
					mui.toast(data["msg"]);
				}
			}
		});
	}

	//  document.getElementById("forgetPassword").addEventListener("tap",function(){
	//      mui.openWindow({
	//          id: "findPassword",
	//          url: "findPassword.html",
	//          styles: {
	//              popGesture: 'close'
	//          },
	//          show: {
	//              aniShow: "pop-in"
	//          },
	//          waiting: {
	//              autoShow: true
	//          }
	//      });
	//  });
});