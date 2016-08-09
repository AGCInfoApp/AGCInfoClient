var url = "http://139.129.25.229:31010/";
var headPhotoUrl = "http://139.129.25.229/";
var myToken;
var myUserId;
var friendUserId;
var remarkNameByMe = "";
var friendSex;
var friendUsername = "";
var friendNickname = "";
var friendPic = "";
var pageLength = 20;
var pageTop = 1;
var newestShare;
var oldestShare;
var momentId = 0;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;
$(document).ready(function() {

	if (window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = parseInt(localStorage.getItem("myUserId"));
		friendUserId = parseInt(localStorage.getItem("friendId"));
	}
	window.addEventListener('refresh', function(e) {
		location.reload();
	});
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				callback: pulldownRefresh
			}

		}
	});
	getMyInfo();
	getFriendInfo();
	showFirstPrivateMessage();




});

/**
 * 上拉加载具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		showMorePrivateMessageOnTop();
		mui('#pullrefresh').pullRefresh().endPullupToRefresh();
	}, 1000);
}

function showFirstPrivateMessage() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/news/message/chatMessage?userId=" + myUserId + "&chatUserId=" + friendUserId + "&token=" + myToken + "&page=" + pageTop,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if (errCode == 0) {
				alert(JSON.stringify(data))
				if (data["data"].length > 0) {
					for (var i = data["data"].length - 1; i >= 0; i--) {
						appendNewPrivateMessage(data["data"][i], "top");
					}
					oldestShare = data["data"][data["data"].length - 1].id;
					pageTop++;
				} else {
					mui.toast("你跟他（她）没有私信记录...");
				}

			}
		},
	});
}

function showMorePrivateMessageOnTop() {
	$.ajax({
		type: "GET",
		//		url: url + "prometheus/moment/listMoment?userId=" + myUserId + "&friendUserId=" + friendUserId + "&page=" + pageBottom,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if (errCode == 0) {
				if (data["data"].length > 0) {
					for (var i = data["data"].length - 1; i >= 0; i--) {
						if (data["data"][i].id < oldestShare) {

							appendNewPrivateMessage(data["data"][i], "top");
						}
					}
					oldestShare = data["data"][data["data"].length - 1].id;
					pageTop++;
				} else {
					mui.toast("没有更多记录了...");
				}
			}
		},
	});
}

function appendNewPrivateMessage(data, type) {

	var html = "";
	html = html + "<li class='mui-media'>";
	html = html + "<div class='mui-media-body'>";
	html = html + "<div>";
	if (data.sendId == myUserId) {
		html = html + "<p class='myNameStyle'>" + nickname + "</p>";
		html = html + "</div>";
		html = html + "<div>";
		html = html + "<p class='myMessageStyle'>" + data.message + "</p>";
	} else {
		html = html + "<p class='freindNameStyle'>" + friendNickname + "</p>";
		html = html + "</div>";
		html = html + "<div>";
		html = html + "<p class='freindMessageStyle'>" + data.message + "</p>";
	}

	html = html + "</div>";
	html = html + "</div>";
	html = html + "</li>";
	html = html + "<hr class='caseBorder'>";
	if (type == "top") {
		$("#privateMessageList").prepend(html);
	} else {
		$("#privateMessageList").append(html);
	}

}

function getMyInfo() {

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
			} else {
				mui.toast(data["msg"]);
			}
		}
	});

}

function getFriendInfo() {
	//得到备注
	//$.ajax({
	//		type: "GET",
	//		url: url + "prometheus/user/getOtherRemarkName?userId=" + myUserId+"&firendId="+friendUserId,
	//		dataType: 'JSON',
	//	async: false,
	//		beforeSend: function(XMLHttpRequest) {},
	//		success: function(data, textStatus) {
	//			var errCode = data["errCode"];
	//			if(errCode == 0) {
	//				remarkNameByMe = data["remarkName"];
	//			}
	//		},
	//		complete: function(XMLHttpRequest, textStatus) {
	//
	//		},
	//		error: function() { //请求出错处理
	//		}
	//	});
	//得到其他信息
	$.ajax({
		type: "GET",
		url: url + "prometheus/user/getOtherInfo?userId=" + friendUserId,
		dataType: 'JSON',
		async: false,
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if (errCode == 0) {
				friendNickname = data["data"].nickname;
				friendUsername = data["data"].username;
				friendPic = data["data"].pic;
			}
		},
	});

	//显示备注或昵称
	if (remarkNameByMe == "" || remarkNameByMe == null) {
		if (friendNickname == "" || friendNickname == null) {
			$("#privateMessageInput").attr("placeholder", "你想说什么...");
		} else {
			$("#privateMessageInput").attr("placeholder", "你想对" + friendNickname + "说什么...");
		}
	} else {
		$("#privateMessageInput").attr("placeholder", "你想对" + remarkNameByMe + "说什么...");
	}
}