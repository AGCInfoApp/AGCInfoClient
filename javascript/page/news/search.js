var url = "http://139.129.25.229:31010";
var myToken;
var myUserId;

function updateSearchResultList(data){
        $("#searchBoard").html("");
        $("#boardTip").html("搜索结果");
        for(var i=0;i<data.length;i++){
            var html="";
            html+='<li class="mui-table-view-cell mui-media"  >';
            html+='<a href="newsDetail.html?newsId='+data[i]["id"]+"&cateId="+data[i]["cateId"]+'" >';
            html+='<div class="mui-media-body">';
            html+='<div class="reco-news-title">';
            html+=data[i]["title"];
            html+='</div><div class="news-list-info">';
            html+='<span>'+formatDate(data[i]["createTime"])+'</span>';
            html+='</div></div></a></li>';
            $("#searchBoard").append(html);
        }
    }

    function updateKeywordBoard(data){
        $("#boardTip").html("近期热词");
        var html='<div style="width:90%;margin-left:5%">';
        for(var i=0;i<data.length;i++){
            html+='<input type="button" value="'+data[i]+'" class="search-keyword" onclick="searchNews(\''+data[i]+' \') " />';
        }
        html+='</div>';
        $("#searchBoard").html(html);
    }

    function getKeyword(){
        $.ajax({
            type: "GET",
            url: url + "/prometheus/news/getKeyword",
            dataType: 'JSON',
            beforeSend: function (XMLHttpRequest) {
            },
            success: function (data, textStatus) {
                var errCode = data["errCode"];
                if (errCode == 0) {
                    updateKeywordBoard(data["data"]);
                } else {
                    mui.toast("获取热词失败，稍后重试…");
                }
            },
            complete: function (XMLHttpRequest, textStatus) {

            },
            error: function () {//请求出错处理
            }
        });
    }

    function searchNews(keyword){
        if(keyword==0){
            keyword=$.trim($("#searchInput").val());
        }
            if(keyword.length>0) {
                $.ajax({
                    type: "GET",
                    url: url + "/prometheus/news/search?searchKey="+keyword,
                    dataType: 'JSON',
                    beforeSend: function (XMLHttpRequest) {
                    },
                    success: function (data, textStatus) {
                        var errCode = data["errCode"];
                        if (errCode == 0) {
                            updateSearchResultList(data["data"]);
                        } else {
                            mui.toast("获取失败，稍后重试…");
                        }
                    },
                    complete: function (XMLHttpRequest, textStatus) {

                    },
                    error: function () {//请求出错处理
                    }
                });
            }
    }



    $(document).ready(function(){
       getKeyword();
    });
