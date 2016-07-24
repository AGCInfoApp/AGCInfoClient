var host="http://localhost:31010/prometheus";

    var cateId=GetQueryString("cateId");
    var newsId=GetQueryString("newsId");

    if (window.sessionStorage) {
        sessionStorage.setItem("newsId", newsId);
    }



    getNewsDetail(cateId,newsId);
    getComment(cateId,newsId);
    getRecommentNews(cateId,newsId);

    //获取新闻详情
    function getNewsDetail(cateId,newsId){
        $.ajax({
            type: "GET",
            url: "/prometheus/news/getInfo?cateId="+cateId+"&id="+newsId,
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
    function getComment(cateId,newsId){
        $.ajax({
            type: "GET",
            url: "/prometheus/comment/getByNews?cateId="+cateId+"&newsId="+newsId+"&page="+1+"&size="+4,
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
    function getRecommentNews(cateId,newsId){
        $.ajax({
            type: "GET",
            url: "/prometheus/news/getRecommentNews?cateId="+cateId+"&newsId="+newsId,
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
            html += '<a href="/prometheus/assets/customer/newsDetail.html?newsId='+data[i]["id"]+"&cateId="+data[i]["cateId"] +'" >';
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


     var btn = document.getElementById("backBtn");
     btn.addEventListener("tap",function () {
        window.history.back(-1);
    });





    //发表评论
    document.getElementById("createComment").addEventListener("tap",function(){
        var content=$("#commentContent").val();
        $("#commentContent").val("");
        if(content.length>0) {
            $.ajax({
                type: "POST",
                url: "/prometheus/comment/create",
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
                        getComment(cateId,newsId);
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