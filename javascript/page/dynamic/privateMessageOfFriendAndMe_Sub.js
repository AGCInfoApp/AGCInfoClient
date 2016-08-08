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
		//		url: url + "prometheus/moment/listMoment?userId=" + myUserId + "&friendUserId=" + friendUserId + "&page=" + pageBottom,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if (errCode == 0) {

				if (data["data"].length > 0) {
					for (var i = data["data"].length - 1; i >= 0; i--) {
						appendNewShare(data["data"][i], "top");
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

							appendNewShare(data["data"][i], "top");
						}
					}
					oldestShare = data["data"][data["data"].length - 1].id;
					pageBottom++;
				} else {
					mui.toast("没有更多记录了...");
				}
			}
		},
	});
}

function appendNewShare(data, type) {

	var html = "";
	html = html + "<li class='mui-media dynamicWidth'>";

	//头像data.userPic
	if (data.userPic != "") {
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
	if (data.newsId != 0) {
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
	if (data.hasVote == 0) {
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
	if (data.vote.length == 0 && data.comment.length == 0) {
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
	for (var j = 0; j < data.vote.length; j++) {
		html = html + data.vote[j].userName;
		if (j < data.vote.length - 1) {
			html = html + ",";
		}
	}
	html = html + "</span>";
	html = html + "</p>";
	html = html + "<hr>";
	//评论容器id
	//评论
	for (var j = 0; j < data.comment.length; j++) {
		html = html + "<p class='oneComment' id='" + data.id + "," + data.comment[j].userId + "," + data.comment[j].userName + "'>";
		if (data.comment[j] != null) {
			if (data.comment[j].reId == 0) {
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