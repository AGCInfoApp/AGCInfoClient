var url = "http://139.129.25.229:31010/";
var index = 1;

function showSearchPeople() {

}

$(document).ready(function() {
	var index = 1;
	document.getElementById("searchBtn").addEventListener("tap", function() {
		var searchInput = $.trim($("#searchInput").val());
		$.ajax({
			type: "GET",
			url: //url+"/prometheus/news/search?searchKey=" + searchInput + "&index=" + index,
				dataType: 'JSON',
			beforeSend: function(XMLHttpRequest) {},
			success: function(data, textStatus) {
				var errCode = data["errCode"];
				if (errCode == 0) {
					updateSearchResultList(data["data"]);
				} else {
					mui.toast("获取失败，稍后重试…");
				}
			},
			complete: function(XMLHttpRequest, textStatus) {

			},
			error: function() { //请求出错处理
			}
		});
	});
});