var url = "http://139.129.25.229:31010/";
$(document).ready(function() {

	if (window.localStorage) {
		var myToken = localStorage.getItem("myToken");
		var myUserId = localStorage.getItem("myUserId");
	}
	var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

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
				if (sex == "男") {
					$("#maleSelect").attr("class", "mui-table-view-cell mui-selected");
					$("#famaleSelect").attr("class", "mui-table-view-cell");
				} else {
					$("#maleSelect").attr("class", "mui-table-view-cell");
					$("#famaleSelect").attr("class", "mui-table-view-cell mui-selected");
				}
			} else {
				mui.toast(data["msg"]);
			}
		}
	});

	var newSex;
	document.querySelector('.mui-table-view.mui-table-view-radio').addEventListener('selected', function(e) {
		newSex = e.detail.el.innerText;
	});

	document.getElementById("save").addEventListener('tap', function() {

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
						"nickname": nickname,
						"mobile": mobile,
						"email": email,
						"username": username,
						"sex": newSex,
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

	});

});