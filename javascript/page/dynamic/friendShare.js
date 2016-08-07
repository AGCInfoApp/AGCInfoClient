var url = "http://139.129.25.229:31010/";
var headPhotoUrl = "http://139.129.25.229/";
var myToken;
var myUserId;
var pageLength = 20;
var pageTop = 1;
var pageBottom = 1;
var newestShare;
var oldestShare;
var momentId = 0;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;
$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = parseInt(localStorage.getItem("myUserId"));
	}
	window.addEventListener('refresh', function(e) {
		location.reload();
	});
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				callback: pulldownRefresh
			},
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	getMyInfo();

	showFirstFriendDynamic();

	$(document).on('click', '.goodButton', function() {
		momentId = parseInt($(this).attr("id").replace("goodButton", ""));
		vote();
	});

	$(document).on('click', '.commentButton', function() {
		momentId = parseInt($(this).attr("id").replace("commentButton", ""));
		var btnArray = ['取消', '评论'];
		mui.prompt(' ', '请输入评论内容', '评论：', btnArray, function(e) {
			if(e.index == 1) {
				commonComment(e.value);
			} else {

			}
		})
	});

	$(document).on('click', '.oneComment', function() {
		momentId = parseInt($(this).attr("id").split(",")[0]);
		var reId = parseInt($(this).attr("id").split(",")[1]);
		var reName = $(this).attr("id").split(",")[2];
		if(reId != myUserId) {
			var btnArray = ['取消', '评论'];
			mui.prompt(' ', '请输入评论内容', '评论：', btnArray, function(e) {
				if(e.index == 1) {
					commentToPeople(e.value, reId, reName);
				} else {

				}
			})
		}

	});

});

function commentToPeople(commentMessage, reId, reName) {

	if(commentMessage == null) {
		mui.toast("评论内容不能为空");
	} else {
		alert(momentId + " " + myUserId + " " + commentMessage);
		$.ajax({
			type: "POST",
			url: url + "prometheus/moment/createComment",
			contentType: "application/json", //必须有
			dataType: 'JSON',
			data: JSON.stringify({
				"momentId": momentId,
				"userId": myUserId,
				"content": commentMessage,
				"reUid": reId
			}),
			beforeSend: function(XMLHttpRequest) {},
			success: function(data, textStatus) {
				var errCode = data["errCode"];
				if(errCode == 0) {
					var html = "";
					html = html + "<p class='oneComment'>";

					//回复的人
					html = html + "<span class='replyPeople'>" + nickname + "</span>";
					html = html + "<span class='replyWord'>回复</span>";
					//被回复的人
					html = html + "<span class='replyPeople'>" + reName + "</span>";
					html = html + "<span class='replyWord'>:</span>";
					//回复内容
					html = html + "<span class='replyWord'>" + commentMessage + "</span>";

					html = html + "</p>";
					$("#commentTable" + momentId).append(html);

					mui.toast("评论成功");
				} else {
					mui.toast("评论失败");
				}
			},
			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() { //请求出错处理
			}
		});

	}

}

function commonComment(commentMessage) {

	if(commentMessage == null) {
		mui.toast("评论内容不能为空");
	} else {
		alert(momentId + " " + myUserId + " " + commentMessage);
		$.ajax({
			type: "POST",
			url: url + "prometheus/moment/createComment",
			contentType: "application/json", //必须有
			dataType: 'JSON',
			data: JSON.stringify({
				"momentId": momentId,
				"userId": myUserId,
				"content": commentMessage,
				"reUid": 0
			}),
			beforeSend: function(XMLHttpRequest) {},
			success: function(data, textStatus) {
				var errCode = data["errCode"];
				if(errCode == 0) {
					var html = "";
					html = html + "<p class='oneComment'>";

					//回复的人
					html = html + "<span class='replyPeople'>" + nickname + "</span>";
					html = html + "<span class='replyWord'>:</span>";
					//回复内容
					html = html + "<span class='replyWord'>" + commentMessage + "</span>";

					html = html + "</p>";
					$("#commentTable" + momentId).append(html);

					mui.toast("评论成功");
				} else {
					mui.toast("评论失败");
				}
			},
			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() { //请求出错处理
			}
		});

	}

}

function vote() {
	$.ajax({
		type: "POST",
		url: url + "prometheus/moment/createVote",
		contentType: "application/json", //必须有
		dataType: 'JSON',
		data: JSON.stringify({
			"momentId": momentId,
			"userId": myUserId
		}),
		beforeSend: function(XMLHttpRequest) {},
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				$("#goodButton" + momentId).html(" 已赞");
				$("#goodButton" + momentId).attr("class", "mui-icon iconfont icon-dianzan hasGoodButton");
				$("#goodButton" + momentId).attr("id", "hasGoodButton" + momentId);
				$("#commentTable" + momentId).attr("hidden", null);
				if($("#goodPeopleContainer" + momentId).html() != "") {
					$("#goodPeopleContainer" + momentId).append(",");
				}
				$("#goodPeopleContainer" + momentId).append(nickname);
			} else {
				mui.toast(data["msg"]);
			}
		},
		complete: function(XMLHttpRequest, textStatus) {

		},
		error: function() { //请求出错处理
		}
	});
}

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {
		showMoreFriendDynamicOnTop();
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
	}, 1000);
}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		showMoreFriendDynamicOnBottom();
		mui('#pullrefresh').pullRefresh().endPullupToRefresh();
	}, 1000);
}

function showFirstFriendDynamic() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/moment/listMoment?userId=" + myUserId + "&page=" + pageBottom,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {

				if(data["data"].length > 0) {
					for(var i = 0; i < data["data"].length; i++) {
						appendNewShare(data["data"][i], "bottom");
					}
					newestShare = data["data"][0].id;
					oldestShare = data["data"][data["data"].length - 1].id;
					pageBottom++;
				} else {
					mui.toast("你没有动态...");
				}

			}
		},
	});
}

function showMoreFriendDynamicOnBottom() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/moment/listMoment?userId=" + myUserId + "&page=" + pageBottom,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				if(data["data"].length > 0) {
					for(var i = 0; i < data["data"].length; i++) {
						if(data["data"][i].id < oldestShare) {

							appendNewShare(data["data"][i], "bottom");
						}
					}
					oldestShare = data["data"][data["data"].length - 1].id;
					pageBottom++;
				} else {
					mui.toast("没有更多动态了...");
				}
			}
		},
	});
}

function showMoreFriendDynamicOnTop() {
	var tag = 1;
	alert(tag)
	while(tag == 1) {
		$.ajax({
			type: "GET",
			url: url + "prometheus/moment/listMoment?userId=" + myUserId + "&page=" + pageTop,
			async: false,
			dataType: 'JSON',
			success: function(data, textStatus) {
				var errCode = data["errCode"];
				if(errCode == 0) {

					//长度为0
					if(data["data"].length == 0) {
						//pageTop=1
						if(pageTop == 1) {
							mui.toast("没有新动态...");
							tag = -1;
						}
						//pageTop>1
						else {
							pageTop--;
							tag = 0;
						}
					}
					//长度居中
					else if(0 < data["data"].length < pageLength) {
						//pageTop=1
						if(pageTop == 1) {
							if(data["data"][0].id == newestShare) {
								mui.toast("没有新动态...");
								tag = -1;
							} else {
								tag = 0;
							}
						}
						//pageTop>1
						else {
							if(data["data"][0].id == newestShare) {
								pageTop--;
								tag = 0;
							} else {
								tag = 0;
							}
						}
					}
					//长度满
					else if(data["data"].length == pageLength) {
						//情况一
						if(data["data"][pageLength - 1] > newestShare) {
							pageTop++;
						}
						//情况二
						else if(data["data"][0] > newestShare >= data["data"][pageLength - 1]) {
							tag = 0;
						}
						//情况三
						else if(data["data"][0] == newestShare) {
							//pageTop=1
							if(pageTop == 1) {
								mui.toast("没有新动态...");
								tag = -1;
							}
							//pageTop>1
							else {
								pageTop--;
								tag = 0;
							}
						}
					}
				}
			},
		});
	}

	if(tag == 0) {
		while(pageTop >= 1) {
			$.ajax({
				type: "GET",
				url: url + "prometheus/moment/listMoment?userId=" + myUserId + "&page=" + pageTop,
				async: false,
				dataType: 'JSON',
				success: function(data, textStatus) {
					var errCode = data["errCode"];
					if(errCode == 0) {
						for(var i = data["data"].length - 1; i >= 0; i--) {
							if(data["data"][i].id > newestShare) {
								appendNewShare(data["data"][i], "top");
							}
						}
					}
				},
			});
			pageTop--;
		}
	}
	pageTop = 1;
}

function appendNewShare(data, type) {

	var html = "";
	html = html + "<li class='mui-media dynamicWidth'>";

	//头像data.userPic
	if(data.userPic != "") {
		html = html + "<img class='mui-media-object mui-pull-left headPhoto'  src='" + headPhotoUrl + data.userPic + "'>";
	} else {
		html = html + "<img class='mui-media-object mui-pull-left headPhoto'  src='../../images/noHeadPhoto.jpg'>";
	}
	html = html + "<div class='mui-media-body'>";

	//昵称
	html = html + "<div>";
	//用户昵称data.username
	html = html + "<p class='nameStyle'>" + data.userName + "</p>";
	html = html + "</div>";

	//信息
	html = html + "<div>";
	html = html + "<p class='messageStyle'>" + data.message + "</p>";
	html = html + "</div>";

	//照片
	html = html + "<div class='photoContainer'>";
	//照片，未设置<img class="photo" src="../../images/myPhoto.png">
	html = html + "";
	html = html + "</div>";

	//新闻
	if(data.newsId != 0) {
		//新闻id
		html = html + "<a id='" + data.newsId + "'>";
		html = html + "<table class='newsTable'>";
		html = html + "<tr>";
		html = html + "<td>";
		//新闻标题
		html = html + "<p class='newsTitle'>" + data.newsTitle + "</p>";
		//新闻简介
		html = html + "<p class='newsDesc'>" + data.newsDesc + "</p>";
		html = html + "<hr>";
		html = html + "<div class='newsPicContainer'>";
		//新闻图片
		html = html + "<img class='newsPhoto' src=" + data.newsPic + "/>";
		html = html + "</div>";
		html = html + "</td>";
		html = html + "</tr>";
		html = html + "</table>";
		html = html + "</a>";
	}

	//点赞评论按钮
	html = html + "<table class='commentButtonTable'>";
	html = html + "<tr>";
	html = html + "<td width='60%'></td>";
	html = html + "<td width='20%'>";
	//点赞按钮id
	if(data.hasVote == 0) {
		var hasVoteText = "点赞";
		var hasVoteClass = "goodButton";
		var hasVoteId = "goodButton"
	} else {
		var hasVoteText = "已赞";
		var hasVoteClass = "hasGoodButton";
		var hasVoteId = "hasGoodButton";
	}
	html = html + "<span class='mui-icon iconfont icon-dianzan " + hasVoteClass + "' id='" + hasVoteId + data.id + "'> " + hasVoteText + "</span>";
	html = html + "</td>";
	html = html + "<td width='20%'>";
	//评论按钮id	
	html = html + "<div class='mui-icon mui-icon-chat commentButton' id='commentButton" + data.id + "'> 评论</div>";
	html = html + "</td>";
	html = html + "</tr>";
	html = html + "</table>";

	//点赞评论面板
	if(data.vote.length == 0 && data.comment.length == 0) {
		var commentTable = "hidden='hidden'";
	} else {
		var commentTable = "";
	}
	html = html + "<table class='commentTable' id='commentTable" + data.id + "' " + commentTable + ">";
	html = html + "<tr>";
	html = html + "<td class='commentList'>";
	html = html + "<p class='good'>";
	html = html + "<span class='mui-icon iconfont icon-dianzan goodicon'></span>";
	//点赞容器id
	html = html + "<span class='goodPeople' id='goodPeopleContainer" + data.id + "'>";
	//点赞的人
	for(var j = 0; j < data.vote.length; j++) {
		html = html + data.vote[j].userName;
		if(j < data.vote.length - 1) {
			html = html + ",";
		}
	}
	html = html + "</span>";
	html = html + "</p>";
	html = html + "<hr>";
	//评论容器id
	//评论
	for(var j = 0; j < data.comment.length; j++) {
		html = html + "<p class='oneComment' id='" + data.id + "," + data.comment[j].userId + "," + data.comment[j].userName + "'>";
		if(data.comment[j] != null) {
			if(data.comment[j].reId == 0) {
				//回复的人
				html = html + "<span class='replyPeople'>" + data.comment[j].userName + "</span>";
				html = html + "<span class='replyWord'>:</span>";
				//回复内容
				html = html + "<span class='replyWord'>" + data.comment[j].content + "</span>";
			} else {
				//回复的人
				html = html + "<span class='replyPeople'>" + data.comment[j].userName + "</span>";
				html = html + "<span class='replyWord'>回复</span>";
				//被回复的人
				html = html + "<span class='replyPeople'>" + data.comment[j].reName + "</span>";
				html = html + "<span class='replyWord'>:</span>";
				//回复内容
				html = html + "<span class='replyWord'>" + data.comment[j].content + "</span>";
			}
			html = html + "</p>";
		}
	}

	html = html + "</td>";
	html = html + "</tr>";
	html = html + "</table>";
	html = html + "</div>";
	html = html + "<hr>";
	html = html + "</li>";
	if(type == "top") {
		$("#shareList").prepend(html);
	} else {
		$("#shareList").append(html);
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
			} else {
				mui.toast(data["msg"]);
			}
		}
	});

}