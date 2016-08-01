var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;

$(document).ready(function() {

	if (window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = parseInt(localStorage.getItem("myUserId"));
	}

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


//		$.ajax({
//				type: "POST",
//				url: url + "prometheus/moment/createMoment",
//				contentType: "application/json", //必须有
//				dataType: 'JSON',
//				data: JSON.stringify({
//					"userId": myUserId,
//					"token": myToken,
//					"message": "牛逼！"
//				}),
//				beforeSend: function(XMLHttpRequest) {},
//				success: function(data, textStatus) {
//					alert(data["errCode"]);
//					
//				}
//			});

});

/**
 * 下拉刷新具体业务实现
 */
function pulldownRefresh() {
	setTimeout(function() {

		mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
	}, 3000);
}

/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {

		mui('#pullrefresh').pullRefresh().endPullupToRefresh();
	}, 1500);
}

function getFirstFriendDynamic() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/moment/listMoment?userId=" + myUserId + "&page=" + 1,
		dataType: 'JSON',
		success: function(data, textStatus) { 
			var errCode = data["errCode"];
			if (errCode == 0) {
				for(var i = 0;i<20;i++){
					
				}
				
				data["data"][2].message;
			}
		},

	});
}