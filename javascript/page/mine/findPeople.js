var url = "http://139.129.25.229:31010/";
var page = 1;

function ShowSearchPeople(data) {
	for(var i = 0; i < data.length; i++) {
		$("#searchResult").append("<li class='mui-table-view-cell'><a>" + data[i] + "</a></li>")
	}
}

function pullupRefresh() {
	var searchInput = $.trim($("#searchInput").val());
	$.ajax({
		type: "GET",
		url: "", //url+"/prometheus/news/search?searchKey=" + searchInput + "&page=" + page,
		dataType: 'JSON',
		beforeSend: function(XMLHttpRequest) {},
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				showSearchPeople(data["data"]);
			} else {
				mui.toast("获取失败，稍后重试…");
			}
		},
		complete: function(XMLHttpRequest, textStatus) {

		},
		error: function() { //请求出错处理
		}
	});
	page++;
}

$(document).ready(function() {

	if(window.localStorage) {
		var myToken = localStorage.getItem("myToken");
		var myUserId = localStorage.getItem("myUserId");
	}

	mui.init({
		pullRefresh: {
			container: '#searchResult',
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});

	document.getElementById("searchBtn").addEventListener("tap", function() {
		var searchInput = $.trim($("#searchInput").val());
		$.ajax({
			type: "GET",
			url: "", //url+"/prometheus/news/search?searchKey=" + searchInput + "&page=" + page,
			dataType: 'JSON',
			beforeSend: function(XMLHttpRequest) {},
			success: function(data, textStatus) {
				var errCode = data["errCode"];
				if(errCode == 0) {
					showSearchPeople(data["data"]);
				} else {
					mui.toast("获取失败，稍后重试…");
				}
			},
			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() { //请求出错处理
			}
		});
		page++;
	});
});