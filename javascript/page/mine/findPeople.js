var url = "http://139.129.25.229:31010/";
var page = 1;

function showSearchPeople(data) {
	for (var i = 0; i < data.length; i++) {
		$("#searchResult").append("<li class='mui-table-view-cell'><a>" + data[i] + "</a></li>")
	}
}

function firstSearchPeople(data) {
	var html = "";
	for (var i = 0; i < data.length; i++) {
		html = html + "<li class='mui-table-view-cell'><a>" + data[i] + "</a></li>";
	}
	$("#searchResult").html(html);
}

function pulldownRefresh() {
	setTimeout(function() {
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.mui-table-view-cell');
		for (var i = cells.length, len = i + 3; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'mui-table-view-cell';
			li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
			//下拉刷新，新纪录插到最前面；
			table.insertBefore(li, table.firstChild);
		}
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}

function pullupRefresh() {
	if (page != 1) {
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

$(document).ready(function() {

	if (window.localStorage) {
		var myToken = localStorage.getItem("myToken");
		var myUserId = localStorage.getItem("myUserId");
	}

	

	var searchInput;
	$("#search").bind('input propertychange', function(e) {
		searchInput = $.trim($("#searchInput").val());
		$.ajax({
			type: "GET",
			url: "", //url+"/prometheus/news/search?searchKey=" + searchInput + "&page=" + "1",
			dataType: 'JSON',
			beforeSend: function(XMLHttpRequest) {},
			success: function(data, textStatus) {
				var errCode = data["errCode"];
				if (errCode == 0) {
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
});