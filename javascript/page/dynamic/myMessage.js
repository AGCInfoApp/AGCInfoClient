var url = "http://139.129.25.229:31010/";
var headPhotoUrl = "http://139.129.25.229/";
var myToken;
var myUserId;
var pageLength = 20;
var page = 1;
var newestShare;
var oldestShare;
var momentId = 0;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;
$(document).ready(function() {

	if (window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = parseInt(localStorage.getItem("myUserId"));
	}

	getMyInfo();
	showPrivateMessageList();

	$(document).on('click', '.chatUserId', function() {
		chatUserId = parseInt($(this).attr("id").replace("chatUserId", ""));
		localStorage.setItem("friendId", chatUserId);
		mui.openWindow({
			id: "privateMessageOfFriendAndMe_Main",
			url: "privateMessageOfFriendAndMe_Main.html",
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

function showPrivateMessageList() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/news/message/chatList?userId=" + myUserId + "&token=" + myToken,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if (errCode == 0) {
				alert(JSON.stringify(data))
				if (data["data"].length > 0) {
					for (var i = 0; i < data["data"].length; i++) {
						appendNewCollect(data["data"][i], "bottom");
					}
				} else {
					mui.toast("你没有收藏...");
				}

			}
		},
	});
}

function showMoreFriendDynamicOnBottom() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/news/collect/getByUser?userId=" + myUserId + "&token=" + myToken + "&page=" + page,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if (errCode == 0) {
				if (data["data"].length > 0) {
					for (var i = 0; i < data["data"].length; i++) {
						if (data["data"][i].id < oldestShare) {

							appendNewCollect(data["data"][i], "bottom");
						}
					}
					oldestShare = data["data"][data["data"].length - 1].id;
					page++;
				} else {
					mui.toast("没有更多收藏了...");
				}
			}
		},
	});
}

function appendNewCollect(data, type) {

	var html = "";
	html = html + "<li class='mui-table-view-cell mui-media'>";
	html = html + "<a class='mui-navigate-right chatUserId' id='chatUserId" + data.chatUserId + "'>";
	if (data.chatUserPic != "") {
		html = html + "<img class='mui-media-object mui-pull-left'  src='" + headPhotoUrl + data.chatUserPic + "' style='margin-top: 0.6em;'>";
	} else {
		html = html + "<img class='mui-media-object mui-pull-left'  src='../../images/noHeadPhoto.jpg' style='margin-top: 0.6em;'>";
	}
	html = html + "<div class='mui-media-body'>";
	html = html + data.chatUserName;
	html = html + "<p class='mui-ellipsis'>" + data.message + "</p>";
	html = html + "<p>" + formatDate(data.createTime) + "</p>";
	html = html + "</div>";
	html = html + "</a>";

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