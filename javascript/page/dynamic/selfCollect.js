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

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = parseInt(localStorage.getItem("myUserId"));
	}
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	getMyInfo();
	showFirstSelfCollect();

$(document).on('click', '.newsId', function() {
		newsId = parseInt($(this).attr("id").replace("newsId", ""));
		mui.openWindow({
                    id: "newsDetail",
                    url: "../news/newsDetail.html?newsId="+newsId+"&userId="+myUserId,
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

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		showMoreSelfCollectOnBottom();
		mui('#pullrefresh').pullRefresh().endPullupToRefresh();
	}, 1000);
}

function showFirstSelfCollect() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/news/collect/getByUser?userId="+myUserId+"&token="+myToken+"&page="+page,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				if(data["data"].length > 0) {
					for(var i = 0; i < data["data"].length; i++) {
						appendNewCollect(data["data"][i], "bottom");
					}
					newestShare = data["data"][0].id;
					oldestShare = data["data"][data["data"].length - 1].id;
					page++;
				} else {
					mui.toast("你没有收藏...");
				}

			}
		},
	});
}

function showMoreSelfCollectOnBottom() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/news/collect/getByUser?userId="+myUserId+"&token="+myToken+"&page="+page,
		dataType: 'JSON',
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				if(data["data"].length > 0) {
					for(var i = 0; i < data["data"].length; i++) {
						if(data["data"][i].id < oldestShare) {

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
	html = html + "<li class='mui-media collectWidth'>";

	html = html + "<div class='mui-media-body'>";

	//新闻

		//新闻id
		html = html + "<a class='newsId' id='newsId" + data.newsId + "'>";
		html = html + "<table class='newsTable'>";
		html = html + "<tr>";
		html = html + "<td>";
		//新闻标题
		html = html + "<p class='newsTitle'>" + data.title + "</p>";
        html = html + "<div class='newsTimeContainer'>";
        html = html + "<p class='newsTime'>" + formatDate(data.createTime) + "</p>";
        html = html + "</div>";
		html = html + "</td>";
		html = html + "</tr>";
		html = html + "</table>";
		html = html + "</a>";
	

	html = html + "</div>";

	html = html + "</li>";
	if(type == "top") {
		$("#collectList").prepend(html);
	} else {
		$("#collectList").append(html);
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