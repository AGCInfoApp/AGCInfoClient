var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var strangerUserId;
var strangerSex;
var strangerUsername;
var strangerNickname;
var strangerPic = "";

$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
		strangerUserId = localStorage.getItem("strangerUserId");
	}
	
	friendJudge();

    $(document).on('click', '#concernButton', function() {
		$.ajax({
			type: "POST",
			url: url + "prometheus/user/followOther",
			contentType: "application/json", //必须有
			dataType: 'JSON',
			data: JSON.stringify({
				"userId": parseInt(myUserId),
				"friendId": parseInt(strangerUserId),
				"token": myToken
			}),
			beforeSend: function(XMLHttpRequest) {},
			success: function(data, textStatus) {
				var errCode = data["errCode"];
				if(errCode == 0) {
                    mui.toast("关注成功");
				} else {
					mui.toast("关注失败，稍后再试...");
				}
			}
		});

		$("#concernJudge").html("<div class='mui-btn mui-btn-block mui-btn-outlined'>已关注</div>");

	});

});

function friendJudge() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/user/getFriend?userId=" + myUserId,
		dataType: 'JSON',
		beforeSend: function(XMLHttpRequest) {},
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				//是否为好友
				var judge = 0;
				for(var i = 0; i < data.data.length; i++) {
					if(strangerUserId == data.data[i].userId) {
						judge = 1;
					}
				}
				getStrangerInfo(judge);

			}
		},
		complete: function(XMLHttpRequest, textStatus) {

		},
		error: function() { //请求出错处理
		}
	});
}

function getStrangerInfo(judge) {

	//得到陌生人信息
	$.ajax({
		type: "GET",
		url: url + "prometheus/user/getOtherInfo?userId=" + strangerUserId,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				strangerSex = data["data"].sex;
				strangerUsername = data["data"].username;
				strangerNickname = data["data"].nickname;
				strangerPic = data["data"].pic;
				showStrangerInfo(judge);
			}
		},

	});
}

function showStrangerInfo(judge) {
	if(strangerSex == "" || strangerSex == null) {
		strangerSex = "未设置性别"
	}

	//显示信息
	$("#strangerInfo").html(strangerNickname + "  " + strangerSex + "<p class='mui-ellipsis'>用户名:" + strangerUsername + "</p>							<p class='mui-ellipsis'>    昵称:" + strangerNickname + "</p>");

	//显示按钮
	if(judge == 0) {
		$("#concernJudge").html("<button id='concernButton' class='mui-btn mui-btn-block mui-btn-primary'>关注</button>");
	} else {
		$("#concernJudge").html("<div class='mui-btn mui-btn-block mui-btn-outlined'>已关注</div>");
	}

}