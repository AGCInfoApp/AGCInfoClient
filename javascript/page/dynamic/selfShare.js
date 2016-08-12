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
	showFirstSelfShare();

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
		showMoreSelfShareOnBottom();
		mui('#pullrefresh').pullRefresh().endPullupToRefresh();
	}, 1000);
}

function showFirstSelfShare() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/moment/getShare?userId="+myUserId+"&token="+myToken+"&page="+page,
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
					page++;
				} else {
					mui.toast("你还没有分享任何东西...");
				}

			}
		},
	});
}

function showMoreSelfShareOnBottom() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/moment/getShare?userId="+myUserId+"&token="+myToken+"&page="+page,
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
					page++;
				} else {
					mui.toast("没有更多分享了...");
				}
			}
		},
	});
}



function appendNewShare(data, type) {

	var html = "";
	html = html + "<li class='mui-media shareWidth'>";

	html = html + "<div class='mui-media-body'>";

	//新闻

		//新闻id
		html = html + "<a class='newsId' id='newsId" + data.newsId + "'>";
		html = html + "<table class='newsTable'>";
		html = html + "<tr>";
		html = html + "<td>";
		//新闻标题
		html = html + "<p class='newsTitle'>" + data.newsTitle + "</p>";
		html = html + "<hr style='width:95%;'>";
		html = html + "<div class='newsPicContainer'>";
		html = html + "<img src='"+data.newsPic+"' class='newsPhoto'/>";
		html = html + "</div>";
		html = html + "<hr style='width:95%;'>";	
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