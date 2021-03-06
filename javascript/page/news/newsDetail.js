var url = "http://139.129.25.229:31010";
var picServer = "http://139.129.25.229/"
var myToken;
var myUserId;
 
    var newsId=GetQueryString("newsId");

    if (window.sessionStorage) {
        sessionStorage.setItem("newsId", newsId);
    }
    if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
	}
    
    mui('body').on('shown', '.mui-popover', function(e) {
	    //console.log('shown', e.detail.id);//detail为当前popover元素
	});
	mui('body').on('hidden', '.mui-popover', function(e) {
		//console.log('hidden', e.detail.id);//detail为当前popover元素
	});



    getNewsDetail(newsId);
    getComment(newsId);
    getRecommentNews(newsId);


    //获取新闻详情
    function getNewsDetail(newsId){
    	console.log(url+"/prometheus/news/getInfo?newsId="+newsId+"&userId="+myUserId);
        $.ajax({
            type: "GET",
            url: url+"/prometheus/news/getInfo?newsId="+newsId+"&userId="+myUserId,
            dataType: 'JSON',
            beforeSend: function(XMLHttpRequest){
            },
            success: function(data, textStatus){
                var errCode=data["errCode"];
                if(errCode==0){
                    handleData(data["data"]);
                }else{

                }
            },
            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){//请求出错处理
            }
        });
    }

    //获取热门评论
    function getComment(newsId){
        $.ajax({
            type: "GET",
            url: url+"/prometheus/news/comment/getByNews?newsId="+newsId+"&page="+1+"&pageSize="+4,
            dataType: 'JSON',
            beforeSend: function(XMLHttpRequest){
            },
            success: function(data, textStatus){
                var errCode=data["errCode"];
                if(errCode==0){
                    updateCommentList(data["data"]);
                }else{
                }
            },
            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){//请求出错处理
            }
        });
    }

    //获取推荐新闻
    function getRecommentNews(newsId){
        $.ajax({
            type: "GET",
            url: url+"/prometheus/news/getRecommentNews?newsId="+newsId,
            dataType: 'JSON',
            beforeSend: function(XMLHttpRequest){
            },
            success: function(data, textStatus){
                var errCode=data["errCode"];
                if(errCode==0){
                    updateRecommentList(data["data"]);
                }else{
                }
            },
            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){//请求出错处理
            }
        });
    }
    
    //分享
    function shareNews(newsId,message){
    	console.log(message);
        $.ajax({
            type: "POST",
            url: url+"/prometheus/moment/createMoment",
            contentType: "application/json", //必须有
                dataType: 'JSON',
                data: JSON.stringify({
                    'newsId': parseInt(newsId),
                    'userId': parseInt(myUserId),
                    'token': myToken,
                    'message': message
                }),
            beforeSend: function(XMLHttpRequest){
            },
            success: function(data, textStatus){
                var errCode=data["errCode"];
                if(errCode==0){
                    mui.toast("分享成功！");
                }else{
                }
            },
            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){//请求出错处理
            }
        });
    }

    //收藏
    function collectNews(newsId){
        $.ajax({
            type: "GET",
            url: url+"/prometheus/news/collect/create?newsId="+newsId+
            "&userId="+myUserId+"&token="+myToken,
            dataType: 'JSON',
            beforeSend: function(XMLHttpRequest){
            },
            success: function(data, textStatus){
                var errCode=data["errCode"];
                if(errCode==0){
                    mui.toast("收藏成功！");
                }else{
                }
            },
            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){//请求出错处理
            }
        });
    }


    function handleData(data){
        $("#newsTitle").html(data["title"]);
        $("title").html(data["title"]);
        $("#newsSource").html(data["source"]);
        $("#newsTime").html(formatDate(data["createTime"]));
        var html="";
        if(data["thumbnail"].length>1){
            html+='<div class="news-detail-picture">';
            html+='<img src="'+data["thumbnail"]+'"/></div>';
        }
        html+=data["content"];
        $("#newsContent").html(html);
    }


    /**更新热门评论DOM*/
    function updateCommentList(data){
        $("#commentBoard").html("");
        for(var i=0;i<data.length;i++) {
            var html = "";
            html += '<li class="mui-table-view-cell mui-media">';
            html += '<a href="#">';
            html += '<img class="mui-media-object mui-pull-left comment-user-pic" src="'+picServer+data[i]["userPic"]+'" />';
            html += '<div class="mui-media-body">';
            html += '<div class="news-list-title">';
            html += data[i]["userName"];
            html += '</div>';
            html += '<div class="news-list-description">';
            html += data[i]["content"];
            html += '</div>';
            html += '<div class="news-list-info">';
            html += '<span>'+formatDate(data[i]["createTime"])+'</span>';
            html += '<span class="comment">99顶</span>';
            html += '</div></div>';
            html += '</a></li>';
            $("#commentBoard").append(html);
        }
        var html="";
        html += '<li class="mui-table-view-cell mui-media">';
        html += '<a href="#">';
        html += '<div class="comment-more-btn">';
        html += '查看全部评论';
        html += '</div>';
        html += '</a></li>';
        $("#commentBoard").append(html);
    }

    //更新推荐新闻的DOM
    function updateRecommentList(data){
        $("#recoBoard").html("");
        for(var i=0;i<data.length;i++) {
            var html = "";
            html += '<li class="mui-table-view-cell mui-media" >';
            html += '<a href="newsDetail.html?newsId='+data[i]["id"]+"&userId="+myUserId+'" >';
            if(data[i]["thumbnail"].length>10) {
                html += '<img class="mui-media-object mui-pull-left thumb-nail" src="' + data[i]["thumbnail"] + '">';
            }
            html += '<div class="mui-media-body">';
            html += '<div class="reco-news-title">';
            html += data[i]["title"];
            html += '</div>';
            html += '<div class="news-list-info">';
            html += '<span>'+data[i]["source"]+'</span>';
            html += '<span class="comment">'+formatDate(data[i]["createTime"])+'</span>';
            html += '</div>';
            html += '</div></a></li>';
            $("#recoBoard").append(html);
        }
    }
    
    $("#share").on("tap",function(e){
		e.detail.gesture.preventDefault(); //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
		mui("#topPopover").popover('hide');//show hide toggle
		var btnArray = ['取消', '确定'];
		mui.prompt($("title").html(), '说点什么吧…', '分享到动态', btnArray, function(e) {
			if (e.index == 1) {
				shareNews(newsId,e.value);
			} else {
				mui.toast("取消！");
			}
		})
    });
    
    $("#collect").on("tap",function(e){
    	mui("#topPopover").popover('hide');//show hide toggle
		collectNews(newsId);
    });

    //发表评论
    document.getElementById("createComment").addEventListener('tap', function() {
        var content=$("#commentContent").val();
        $("#commentContent").val("");
        if(content.length>0) {
            $.ajax({
                type: "POST",
                url: url+"/prometheus/news/comment/create",
                contentType: "application/json", //必须有
                dataType: 'JSON',
                data: JSON.stringify({
                    'newsId': parseInt(newsId),
                    'userId': parseInt(myUserId),
                    'content': content,
                    'reUid': 0
                }),
                beforeSend: function (XMLHttpRequest) {
                },
                success: function (data, textStatus) {
                    var errCode = data["errCode"];
                    if (errCode == 0) {
                        mui.toast("评论成功！");
                        getComment(newsId);
                    } else {
                        mui.toast("评论失败，稍后重试…");
                    }
                },
                complete: function (XMLHttpRequest, textStatus) {

                },
                error: function () {//请求出错处理
                }
            });
        }
    });