$(document).ready(function() {

	document.getElementById("save").addEventListener('tap', function() {
		var signature = $.trim($("#signature").val());
		if(signature.length < 20) {
			var btnArray = ['是', '否'];
			mui.confirm('是否确认保存？', '', btnArray, function(e) {
				if(e.index == 1) {
					//否
				} else {
					//是
					$.ajax({
						type: "POST",
						url: "将个性签名存入",
						dataType: 'JSON',
						data: JSON.stringify({
							'newPersonalSign': signature,
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
			});
		}
		else{
			mui.toast("个性签名过长");
		}
	});

});