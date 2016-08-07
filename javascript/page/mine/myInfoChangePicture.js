var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var newPic;
var imgBlob;
var id, nickname, mobile, email, username, sex, birthday, pic, readNum, commentNum, level, preference, signature;

$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken"); 
		myUserId = parseInt(localStorage.getItem("myUserId"));
	}
	mui.init({
		beforeback: function() {
			//获得列表界面的webview  
			var list = plus.webview.currentWebview().opener();
			//触发列表界面的自定义事件（refresh）,从而进行数据刷新  
			mui.fire(list, 'refresh');
			//返回true，继续页面关闭逻辑  
			return true;
		}
	});
	getMyInfo();

	var clipArea = new bjj.PhotoClip("#clipArea", {
		size: [260, 260],
		outputSize: [150, 150],
		file: "#file",
		view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("照片读取中");
		},
		loadComplete: function() {
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
			console.log(dataURL);
			imgBlob = convertBase64UrlToBlob(dataURL);

		}
	});

	document.getElementById("save").addEventListener('tap', function() {

		var btnArray = ['是', '否'];
		mui.confirm('是否确认保存？', '', btnArray, function(e) {
			if(e.index == 1) {
				//否
			} else {
				//是
				uploadHead();
			}
		});

	});
	//	document.getElementById('headPhotoImage').addEventListener('tap', function() {
	//		if(mui.os.plus) {
	//			var a = [{
	//				title: "拍照"
	//			}, {
	//				title: "从手机相册里选择"
	//			}];
	//			plus.nativeUI.actionSheet({
	//				title: "修改用户头像",
	//				cancel: "取消",
	//				buttons: a
	//			}, function(b) {
	//				switch(b.index) {
	//					case 0:
	//						break;
	//					case 1:
	//						getImage();
	//						break;
	//					case 2:
	//						galleryImg();
	//						break;
	//					default:
	//						break;
	//				}
	//			});
	//		}
	//	}, false);

});

function convertBase64UrlToBlob(urlData){
    
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }

    return new Blob( [ab] , {type : 'image/png'});
}

function uploadHead() {
/**
 * @param base64Codes
 *            图片的base64编码
 */

    var form=document.forms[0];
    
    var formData = new FormData(form);   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
    
    //convertBase64UrlToBlob函数是将base64编码转换为Blob
    formData.append("image",imgBlob,"head"+myUserId+".png");  //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同
    
    //ajax 提交form
    $.ajax({
        url : url + "prometheus/service/uploadPic",
        type : "POST",
        data : formData,
        dataType:"json",
        processData : false,         // 告诉jQuery不要去处理发送的数据
        contentType : false,        // 告诉jQuery不要去设置Content-Type请求头
        
        success:function(data){
            if(data["errCode"]==0){
            	newPic=data["data"];
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
							if(errCode == 0) {
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
            }
        },
        xhr:function(){            //在jquery函数中直接使用ajax的XMLHttpRequest对象
            var xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener("progress", function(evt){
                if (evt.lengthComputable) {
                    var percentComplete = Math.round(evt.loaded * 100 / evt.total);  
                    console.log("正在提交."+percentComplete.toString() + '%');        //在控制台打印上传进度
                }
            }, false);
            
            return xhr;
        }
        
    });


/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
//	$.ajaxFileUpload({
//		url: url + "prometheus/service/uploadPic", //用于文件上传的服务器端请求地址
//		secureuri: false, //是否需要安全协议，一般设置为false
//      data:{
//      	"image":imgBlob
//      },
//	//文件上传域的ID
//		dataType: 'json', //返回值类型 一般设置为json
//		success: function(data, status) //服务器成功响应处理函数
//			{
//				alert(JSON.stringify(data))
//			},
//		error: function(data, status, e) //服务器响应失败处理函数
//			{
//				alert(e);
//			}
//	});

	//	var task = plus.uploader.createUpload(url + "prometheus/service/uploadPic", {
	//			method: "POST",
	//			blocksize: 204800,
	//			priority: 100
	//		},
	//		function(t, status) {
	//			// 上传完成
	//			alert(JSON.stringify(t));
	//			if(status == 200) {
	//				newPic = t.responseText.data;
//					$.ajax({
//						type: "POST",
//						url: url + "prometheus/user/editInfo",
//						contentType: "application/json", //必须有
//						dataType: 'JSON',
//						data: JSON.stringify({
//							"userId": id,
//							"token": myToken,
//							"nickname": nickname,
//							"mobile": mobile,
//							"email": email,
//							"username": username,
//							"sex": sex,
//							"birthday": birthday,
//							"pic": newPic,
//							"signature": signature
//						}),
//						beforeSend: function(XMLHttpRequest) {},
//						success: function(data, textStatus) {
//							var errCode = data["errCode"];
//							if(errCode == 0) {
//								mui.toast("保存成功");
//							} else {
//								mui.toast("保存失败，稍后重试…");
//							}
//						},
//						complete: function(XMLHttpRequest, textStatus) {
//	
//						},
//						error: function() { //请求出错处理
//						}
//					});
	//			} else {
	//				alert("Upload failed: " + status);
	//			}
	//		}
	//	);
	//	task.addFile(imgBlob, {
	//		key: "image"
	//	});
	//	task.start();

}

function getImage() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			imgPath = s;
			exhibitHead();
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
								imgPath = e;
								exhibitHead();
							},
							function(e) {
								console.log("copy image file:" + e.message);
							});
					}, function() {
						entry.copyTo(root, 'head.jpg', function(e) {
								var path = e.fullPath + "?version=" + new Date().getTime();
								imgPath = path;
								exhibitHead();
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

function exhibitHead() {
	alert("jqm")
	console.log("imgPath = " + imgPath);
	//显示照片
	$("#headPhotoImage").attr("src", imgPath);

	var imageFile = new File();

	var clipArea = new bjj.PhotoClip("#clipArea", {
		size: [260, 260],
		outputSize: [640, 640],

		view: "#view",
		ok: "#clipBtn",
		loadStart: function() {
			console.log("照片读取中");
		},
		loadComplete: function() {
			console.log("照片读取完成");
		},
		clipFinish: function(dataURL) {
			console.log(dataURL);
		}
	});

}

function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	if(width > height) {
		if(width > 100) {
			height = Math.round(height *= 100 / width);
			width = 100;
		}
	} else {
		if(height > 100) {
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

	$("#headPhotoImage").attr("src", "../../images/noHeadPhoto.jpg");

	alert($("#headPhotoImage").attr("src"));
}

function getMyInfo() {
	$.ajax({
		type: "GET",
		url: url + "prometheus/user/getInfo?userId=" + myUserId + "&token=" + myToken,
		dataType: 'JSON',
		async: false,
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
				$("#headPhotoImage").attr("src", pic);
			} else {
				mui.toast(data["msg"]);
			}
		}
	});
}