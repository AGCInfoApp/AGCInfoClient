var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var newPic;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

$(document).ready(function() {

	if (window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = parseInt(localStorage.getItem("myUserId"));
	}
	getMyInfo();
	preparePhoto();

	document.getElementById("save").addEventListener('tap', function() {

		var btnArray = ['是', '否'];
		mui.confirm('是否确认保存？', '', btnArray, function(e) {
			if (e.index == 1) {
				//否
			} else {
				//是

			}
		});

	});

	document.getElementById('headPhoto').addEventListener('tap', function() {
		if (mui.os.plus) {
			var a = [{
				title: "拍照"
			}, {
				title: "从手机相册里选择"
			}];
			plus.nativeUI.actionSheet({
				title: "修改用户头像",
				cancel: "取消",
				buttons: a
			}, function(b) {
				switch (b.index) {
					case 0:
						break;
					case 1:
						getImage();
						break;
					case 2:
						galleryImg();
						break;
					default:
						break;
				}
			});
		}
	}, false);

});

function uploadHead() {
	var btnArray = ['是', '否'];
	mui.confirm('是否确认保存？', '', btnArray, function(e) {
		if (e.index == 1) {
			//否
		} else {
			//是
			var task = plus.uploader.createUpload(url + "prometheus/service/uploadPic", {
					method: "POST",
					blocksize: 204800,
					priority: 100
				},
				function(t, status) {
					// 上传完成
					if (status == 200) {
						newPic = t.responseText.data;
						$.ajax({
							type: "POST",
							url: url + "prometheus/user/editInfo",
							contentType: "application/json", //必须有
							dataType: 'JSON',
							data: JSON.stringify({
								"userId": id,
								"token": myToken,
								"nickname": nickname,
								"mobile": mobile,
								"email": email,
								"username": username,
								"sex": sex,
								"birthday": birthday,
								"pic": newPic,
								"signature": signature
							}),
							beforeSend: function(XMLHttpRequest) {},
							success: function(data, textStatus) {
								var errCode = data["errCode"];
								if (errCode == 0) {
									mui.toast("保存成功");
								} else {
									mui.toast("保存失败，稍后重试…");
								}
							},
							complete: function(XMLHttpRequest, textStatus) {

							},
							error: function() { //请求出错处理
							}
						});
					} else {
						alert("Upload failed: " + status);
					}
				}
			);
			task.addFile(imgPath, {
				key: "image"
			});
			task.start();

		}
	});

	//var imgData = getBase64Image(image);
	var task = plus.uploader.createUpload(url + "prometheus/service/uploadPic", {
			method: "POST",
			blocksize: 204800,
			priority: 100
		},
		function(t, status) {
			// 上传完成
			if (status == 200) {
				newPic = t.responseText.data;
			} else {
				alert("Upload failed: " + status);
			}
		}
	);
	task.addFile(imgPath, {
		key: "image"
	});
	task.start();

}

function getImage() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			exhibitHead(s);
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("error" + s);
	}, {
		filename: "_doc/head"
	});
}

function galleryImg() {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("head.jpg", {}, function(file) {
					file.remove(function() {
						console.log("file remove success");
						entry.copyTo(root, 'head.jpg', function(e) {
								var e = e.fullPath + "?version=" + new Date().getTime();
								exhibitHead(e);
							},
							function(e) {
								console.log("copy image file:" + e.message);
							});
					}, function() {
						entry.copyTo(root, 'head.jpg', function(e) {
								var path = e.fullPath + "?version=" + new Date().getTime();
								exhibitHead(path);
							},
							function(e) {
								console.log("get _www folder fail");
							});
					}, function(e) {
						console.log("读取拍照文件错误：" + e.message);
					});
				}, function(a) {}, {
					filter: "image"
				});
			});
		});
	});
}

function exhibitHead(imgPath) {
	console.log("imgPath = " + imgPath);
	//显示照片
	$("#headPhoto").attr("src", imgPath);

	//var imgData = getBase64Image(image);
	var task = plus.uploader.createUpload(url + "prometheus/service/uploadPic", {
			method: "POST",
			blocksize: 204800,
			priority: 100
		},
		function(t, status) {
			// 上传完成
			if (status == 200) {
				newPic = t.responseText.data;
			} else {
				alert("Upload failed: " + status);
			}
		}
	);
	task.addFile(imgPath, {
		key: "image"
	});
	task.start();

}

function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	if (width > height) {
		if (width > 100) {
			height = Math.round(height *= 100 / width);
			width = 100;
		}
	} else {
		if (height > 100) {
			width = Math.round(width *= 100 / height);
			height = 100;
		}
	}
	canvas.width = width;
	canvas.height = height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height);
	var dataURL = canvas.toDataURL("image/png", 0.8);

	return dataURL.replace("data:image/png;base64,", "");
}

function preparePhoto() {
	if ($("#headPhoto").attr("src") == null) {
		$("#headPhoto").attr("src", "../../images/noHeadPhoto.jpg");
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
				$("#headPhoto").attr("src", pic);
			} else {
				mui.toast(data["msg"]);
			}
		}
	});
}