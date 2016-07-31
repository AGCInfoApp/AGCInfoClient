var url = "http://139.129.25.229:31010/";
var page = 1;
var searchInput;
var myToken;
var myUserId;

$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
	}

	mui.init({
		pullRefresh: {
			container: '#pullRefresh',
			down: {
				callback: pulldownRefresh
			},
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});

	$("#search").bind('input propertychange', function(e) {
		searchInput = $.trim($("#searchInput").val());
		$.ajax({
			type: "GET",
			url: url + "prometheus/user/searchUser?searchKey=" + searchInput, //+ "&page=" + "1",
			dataType: 'JSON',
			async: false,
			beforeSend: function(XMLHttpRequest) {},
			success: function(data, textStatus) {
				var errCode = data["errCode"];
				if(errCode == 0) {
					firstSearchPeople(data["data"]);

				} else {
					mui.toast("获取失败，稍后重试…");
				}
			},
			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() { //请求出错处理
			}
		});
		page = 2;
	});

	$(document).on('click', '.stranger', function() {
		var strangerUserId = $(this).attr("id");
		localStorage.setItem("strangerUserId", strangerUserId);
		mui.openWindow({
			id: "concernPeople",
			url: "concernPeople.html",
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

function showSearchPeople(data) {
	for(var i = 0; i < data.length; i++) {
		$("#searchResult").append("<li class='mui-table-view-cell stranger' id='" + data[i].userId + "'>" + data[i].nickname + "</li>")
	}
}

function firstSearchPeople(data) {
	$("#searchResult").html("");
	var html = "";
	for(var i = 0; i < data.length; i++) {
		html = html + "<li class='mui-table-view-cell stranger' id='" + data[i].userId + "'>" + data[i].nickname + "</li>";
	}
	$("#searchResult").html(html);
}

function pulldownRefresh() {

}

function pullupRefresh() {
	if(page != 1) {
		var data = [];
		data[0] = 1;
		data[1] = 1;
		data[2] = 1;

		//	$.ajax({
		//		type: "GET",
		//		url: "", //url+"/prometheus/news/search?searchKey=" + searchInput + "&page=" + page,
		//		dataType: 'JSON',
		//		beforeSend: function(XMLHttpRequest) {},
		//		success: function(data, textStatus) {
		//			var errCode = data["errCode"];
		//			if (errCode == 0) {
		//				showSearchPeople(data["data"]);
		//			} else {
		//				mui.toast("获取失败，稍后重试…");
		//			}
		//		},
		//		complete: function(XMLHttpRequest, textStatus) {
		//
		//		},
		//		error: function() { //请求出错处理
		//		}
		//	});
		//	page++;
		setTimeout(function() {
			showSearchPeople(data);
			mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
		}, 500);
	}

}