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
var pageBottom = 1;
var newestPrivateMessage;
var oldestPrivateMessage;
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
	
	document.getElementById("sendPrivateMessage").addEventListener("tap", function() {
		if ($("#privateMessageInput").val().length == 0) {
			mui.toast("输点东西才能发...")
		} else {
			$.ajax({
				type: "POST",
				url: url + "prometheus/news/message/create",
				contentType: "application/json", //必须有
				dataType: 'JSON',
				async: false,
				data: JSON.stringify({
					"sendId": myUserId,
					"receiveId": friendUserId,
					"token": myToken,
					"message": $("#privateMessageInput").val()
				}),
				beforeSend: function(XMLHttpRequest) {},
				success: function(data, textStatus) {
					var errCode = data["errCode"];
					if (errCode == 0) {
						mui.toast("发送私信成功！");
					} else {
						mui.toast("发送私信失败，稍后重试…");
					}
				},
				complete: function(XMLHttpRequest, textStatus) {

				},
				error: function() { //请求出错处理
				}
			});
			$("#privateMessageInput").val("");
			var tag = 1;
			while (tag == 1) {
				$.ajax({
					type: "GET",
					url: url + "prometheus/news/message/chatMessage?userId=" + myUserId + "&chatUserId=" + friendUserId + "&token=" + myToken + "&page=" + pageBottom,
					async: false,
					dataType: 'JSON',
					success: function(data, textStatus) {
						var errCode = data["errCode"];
						if (errCode == 0) {
							//长度为0
							if (data["data"].length == 0) {
								//pageBottom=1
								if (pageBottom == 1) {
									mui.toast("没有新动态...");
									tag = -1;
								}
								//pageBottom>1
								else {
									pageBottom--;
									tag = 0;
								}
							}
							//长度居中
							else if (0 < data["data"].length < pageLength) {
								//pageBottom=1
								if (pageBottom == 1) {
									if (data["data"][0].id == newestPrivateMessage) {
										mui.toast("没有新动态...");
										tag = -1;
									} else {
										tag = 0;
									}
								}
								//pageBottom>1
								else {
									if (data["data"][0].id == newestPrivateMessage) {
										pageBottom--;
										tag = 0;
									} else {
										tag = 0;
									}
								}
							}
							//长度满
							else if (data["data"].length == pageLength) {
								//情况一
								if (data["data"][pageLength - 1] > newestPrivateMessage) {
									pageBottom++;
								}
								//情况二
								else if (data["data"][0] > newestPrivateMessage >= data["data"][pageLength - 1]) {
									tag = 0;
								}
								//情况三
								else if (data["data"][0] == newestPrivateMessage) {
									//pageBottom=1
									if (pageBottom == 1) {
										mui.toast("没有新动态...");
										tag = -1;
									}
									//pageBottom>1
									else {
										pageBottom--;
										tag = 0;
									}
								}
							}
						}
					},
				});
			}
			if (tag == 0) {
				while (pageBottom >= 1) {
					$.ajax({
						type: "GET",
						url: url + "prometheus/news/message/chatMessage?userId=" + myUserId + "&chatUserId=" + friendUserId + "&token=" + myToken + "&page=" + pageBottom,
						async: false,
						dataType: 'JSON',
						success: function(data, textStatus) {
							var errCode = data["errCode"];
							if (errCode == 0) {
								for (var i = data["data"].length - 1; i >= 0; i--) {
									if (data["data"][i].id > newestPrivateMessage) {
										appendNewPrivateMessage(data["data"][i], "bottom");
						
									}
								}
							}
						},
					});
					pageBottom--;
				}
			}
			pageBottom = 1;
		}
		$("html,body").animate({scrollTop:$("#bottomDiv").offset().top},300);
	});

});

/**
 * 上拉加载具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		showMorePrivateMessageOnTop();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
	}, 200);
}

function showFirstPrivateMessage() {

	$.ajax({
		type: "GET",
		url: url + "prometheus/news/message/chatMessage?userId=" + myUserId + "&chatUserId=" + friendUserId + "&token=" + myToken + "&page=" + pageTop,
		dataType: 'JSON',
		async: false,
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if (errCode == 0) {
				if (data["data"].length > 0) {
					for (var i = 0; i < data["data"].length; i++) {
						appendNewPrivateMessage(data["data"][i], "top");
					}
					oldestPrivateMessage = data["data"][data["data"].length - 1].id;
					newestPrivateMessage = data["data"][0].id;
					pageTop++;
				} else {
					mui.toast("你跟他（她）没有私信记录...");
				}

			}
		},
	});
	$("html,body").animate({scrollTop:$("#bottomDiv").offset().top},800)
}

function showMorePrivateMessageOnTop() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/news/message/chatMessage?userId=" + myUserId + "&chatUserId=" + friendUserId + "&token=" + myToken + "&page=" + pageTop,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if (errCode == 0) {
				if (data["data"].length > 0) {
					for (var i = 0; i < data["data"].length; i++) {
						if (data["data"][i].id < oldestPrivateMessage) {

							appendNewPrivateMessage(data["data"][i], "top");
						}
					}
					oldestPrivateMessage = data["data"][data["data"].length - 1].id;
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

	if (data.sendId == myUserId) {
		html+='<div class="chat-header">'+formatDate(data.createTime)+'</div>';
        html+='<div class="chat-item chat-right">';
        html+='<div class="chat-media">';
        html+='  <img src="'+headPhotoUrl+friendPic+'" /></div>';
        html+='<div class="chat-inner">';
        html+='<div class="chat-name">'+friendNickname+'</div>';
        html+='<div class="chat-content">';
        html+='<div class="chat-arrow"></div>';
        html+=   data.message;
        html+='</div></div></div>';
	} else {
		html+='<div class="chat-header">'+formatDate(data.createTime)+'</div>';
        html+='<div class="chat-item chat-left">';
        html+='<div class="chat-media">';
        html+='  <img src="'+headPhotoUrl+friendPic+'" /></div>';
        html+='<div class="chat-inner">';
        html+='<div class="chat-name">'+friendNickname+'</div>';
        html+='<div class="chat-content">';
        html+='<div class="chat-arrow"></div>';
        html+=   data.message;
        html+='</div></div></div>';
	}

//	html = html + "</div>";
//	html = html + "</div>";
//	html = html + "</li>";
//	html = html + "<hr class='caseBorder'>";
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
		async: false,
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