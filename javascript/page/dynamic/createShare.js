var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var newNickname;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = parseInt(localStorage.getItem("myUserId"));
	}
	
	getMyInfo();

	document.getElementById("save").addEventListener('tap', function() {
		shareMessage = $.trim($("#shareInput").val());
		if(shareMessage.length < 200 && shareMessage.length > 0) {
			var btnArray = ['是', '否'];
			mui.confirm('是否确认保存？', '', btnArray, function(e) {
				if(e.index == 1) {
					//否
				} else {
					//是
					$.ajax({
						type: "POST",
						url: url + "prometheus/moment/createMoment",
						contentType: "application/json", //必须有
						dataType: 'JSON',
						data: JSON.stringify({
							"userId": myUserId,
							"token": myToken,
							"message": shareMessage
						}),
						beforeSend: function(XMLHttpRequest) {},
						success: function(data, textStatus) {
							if(data["errCode"] == 0){
								mui.toast("发表成功")
							}else{
								mui.toast("发表失败，稍后重试..")
							}

						}
					});
				}
			});
		} else if(shareMessage.length > 200) {
			mui.toast("名字过长");
		} else if(shareMessage.length == 0) {
			mui.toast("不能什么都不说");
		}
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
				$("#nickname").attr(nickname);
				container = data["data"];
			} else {
				mui.toast(data["msg"]);
			}
		}
	});
}