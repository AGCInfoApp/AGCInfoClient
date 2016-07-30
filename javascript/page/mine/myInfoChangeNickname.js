var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var newNickname;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
	}
    getMyInfo();
    
	

	document.getElementById("save").addEventListener('tap', function() {
		newNickname = $.trim($("#nickname").val());
		if (newNickname.length < 15) {
			var btnArray = ['是', '否'];
			mui.confirm('是否确认保存？', '', btnArray, function(e) {
				if (e.index == 1) {
					//否
				} else {
					//是
					$.ajax({
						type: "POST",
						url: url + "prometheus/user/editInfo",
						contentType: "application/json", //必须有
						dataType: 'JSON',
						data: JSON.stringify({
							"userId": id,
							"token": myToken,
							"nickname": newNickname,
							"mobile": mobile,
							"email": email,
							"username": username,
							"sex": sex,
							"birthday": birthday,
							"pic": pic,
							"signature": signature
						}),
						beforeSend: function(XMLHttpRequest) {},
						success: function(data, textStatus) {
							var errCode = data["errCode"];
							if (errCode == 0) {
								mui.toast("保存成功");
							} else {
								mui.toast("保存失败，稍后重试…");
							}
						},
						complete: function(XMLHttpRequest, textStatus) {

						},
						error: function() { //请求出错处理
						}
					});
				}
			});
		} else {
			mui.toast("名字过长");
		}
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
			if (errCode == 0) {
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
