var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

$(document).ready(function() {

	if (window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = parseInt(localStorage.getItem("myUserId"));
	}
	preparePhoto();
});

function preparePhoto() {
	if ($("#headPhoto").attr("src") == null) {
		$("#headPhoto").attr("src", "../../images/noHeadPhoto.jpg");
	}

}

function selectPhoto() {
    var headPhotoUrl = $("#selectPhoto").val();

while(headPhotoUrl.indexOf("\\") >= 0)
headPhotoUrl = headPhotoUrl.replace("\\","/");
//	for (var i = 0; i < headPhotoUrl.length; i++) {
//		alert(headPhotoUrl[i]);
//		if (headPhotoUrl[i] == '\\'){
//         headPhotoUrl[i]='/';
//         alert(headPhotoUrl[i]);
//		}
//	}
	headPhotoUrl = "file://"+headPhotoUrl;
	headPhotoUrl="file://C:/Users/hq-pc/Desktop/jqm.jpg"
	alert(headPhotoUrl);
	$("#headPhoto").attr("src", headPhotoUrl);
}

function uploadImage() {
	//判断是否有选择上传文件
	var imgPath = $("#selectPhoto").val();
	if (imgPath == "") {
		alert("请选择上传图片！");
		return;
	}
	//判断上传文件的后缀名
	var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
	if (strExtension != 'jpg' && strExtension != 'gif' && strExtension != 'png' && strExtension != 'bmp') {
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