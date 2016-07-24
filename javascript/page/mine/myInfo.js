$(document).ready(function() {

	if(window.sessionStorage) {
		var token = sessionStorage.getItem("token");
	}

	document.getElementById("myInfoChangePicture").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangePicture",
			url: "myInfoChangePicture.html",
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

	document.getElementById("myInfoChangeName").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangeName",
			url: "myInfoChangeName.html",
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

	document.getElementById("myInfoChangeSex").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangeSex",
			url: "myInfoChangeSex.html",
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

	document.getElementById("myInfoChangePersonalSign").addEventListener("tap", function() {
		mui.openWindow({
			id: "myInfoChangePersonalSign",
			url: "myInfoChangePersonalSign.html",
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