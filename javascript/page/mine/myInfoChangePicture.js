var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = parseInt(localStorage.getItem("myUserId"));
	}

	preparePhoto();
	document.getElementById('headPhoto').addEventListener('tap', function() {
		if(mui.os.plus) {
			var a = [{
				title: "拍照"
			}, {
				title: "从手机相册里选择"
			}];
			plus.nativeUI.actionSheet({
				title: "修改用户头像",
				cancel: "取消",
				buttons: a
			}, function(b){
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
	},false);

});

function getImage() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			uploadHead(s);
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("error" + s);
	}, {
		filename: "_doc/head.png"
	});
}

function galleryImg() {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("head.png", {}, function(file) {
					file.remove(function() {
						console.log("file remove success");
						entry.copyTo(root, 'head.png', function(e) {
								var e = e.fullPath + "?version=" + new Date().getTime();
								uploadHead(e);
							},
							function(e) {
								console.log("copy image file:" + e.message);
							});
					}, function() {
						entry.copyTo(root, 'head.png', function(e) {
								var path = e.fullPath + "?version=" + new Date().getTime();
								uploadHead(path);
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

function uploadHead(imgPath) {
   console.log("imgPath = "+imgPath);
}

function preparePhoto() {
	if($("#headPhoto").attr("src") == null) {
		$("#headPhoto").attr("src", "../../images/noHeadPhoto.jpg");
	}

}

function uploadImage() {
	//判断是否有选择上传文件
	var imgPath = $("#selectPhoto").val();
	if(imgPath == "") {
		alert("请选择上传图片！");
		return;
	}
	//判断上传文件的后缀名
	var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
	if(strExtension != 'jpg' && strExtension != 'gif' && strExtension != 'png' && strExtension != 'bmp') {
		alert("请选择图片文件");
		return;
	}
	$.ajax({
		type: "POST",
		url: "handler/UploadImageHandler.ashx",
		data: {
			imgPath: $("#selectPhoto").val()
		},
		cache: false,
		success: function(data) {
			alert("上传成功");
			$("#imgDiv").empty();
			$("#imgDiv").html(data);
			$("#imgDiv").show();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("上传失败，请检查网络后重试");
		}
	});
}