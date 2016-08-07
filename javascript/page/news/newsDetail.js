var url = "http://139.129.25.229:31010";
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
            	console.log(JSON.stringify(data));
                var errCode=data["errCode"];
                if(errCode==0){
                    handleData(data["data"]);
                    console.log(JSON.stringify(data["data"]));
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
            url: url+"/prometheus/comment/getByNews?newsId="+newsId+"&page="+1+"&size="+4,
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
            html += '<img class="mui-media-object mui-pull-left comment-user-pic" src="'+data[i]["userPic"]+'" />';
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


    $('#backBtn').on('click',function(event){
            window.history.back(-1);
    });





    //发表评论
    $('#createComment').on("tap",function(){
        var content=$("#commentContent").val();
        $("#commentContent").val("");
        if(content.length>0) {
            $.ajax({
                type: "POST",
                url: url+"/prometheus/comment/create",
                contentType: "application/json", //必须有
                dataType: 'JSON',
                data: JSON.stringify({
                    'newsId': parseInt(newsId),
                    'cateId': parseInt(cateId),
                    'content': content,
                    'reId': 0
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