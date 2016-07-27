var url = "http://139.129.25.229:31010/";
$(document).ready(function() {
    mui.init();
	if(window.localStorage) {
		var myToken = localStorage.getItem("myToken");
		var myUserId = localStorage.getItem("myUserId");
	}
    ;

	var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

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
				$('#selectBrithday').html(numberToDate(birthday));
			} else {
				mui.toast(data["msg"]);
			}
		}
	});

	
	var btns = $('.btn');
	btns.each(function(i, btn) {
		btn.addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var picker = new mui.DtPicker(options);
			picker.show(function(rs) {
				/*
				 * rs.value 拼合后的 value
				 * rs.text 拼合后的 text
				 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
				 * rs.m 月，用法同年
				 * rs.d 日，用法同年
				 * rs.h 时，用法同年
				 * rs.i 分（minutes 的第二个字母），用法同年
				 */
				birthday = dateToNumber(rs.text);
				$('#selectBrithday').html(rs.text);
				picker.dispose();
			});
		}, false);
	});

	document.getElementById("save").addEventListener('tap', function() {
		var btnArray = ['是', '否'];
		mui.confirm('是否确认保存？', '', btnArray, function(e) {
			if(e.index == 1) {
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
						"sex": sex,
						"birthday": birthday,
						"pic": pic,
						"signature": signature
					}),
					beforeSend: function(XMLHttpRequest) {},
					success: function(data, textStatus) {
						var errCode = data["errCode"];
						if(errCode == 0) {
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