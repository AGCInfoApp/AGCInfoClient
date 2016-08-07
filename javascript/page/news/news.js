var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;

	
    $('#searchBtn').on('click',function(event){
            mui.openWindow({
                id: "search",
                url: "search.html",
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

    function toggleChooseCateBtn(){
        $(".cate-choose-div").slideToggle("400");
        if($("#chooseCateIcon").hasClass("mui-icon-arrowdown")){
            $("#chooseCateIcon").removeClass("mui-icon-arrowdown");
            $("#chooseCateIcon").addClass("mui-icon-arrowup");
        }else{
            $("#chooseCateIcon").removeClass("mui-icon-arrowup");
            $("#chooseCateIcon").addClass("mui-icon-arrowdown");
        }
    }

    $('#chooseCateBtn').on('click',function(){
        toggleChooseCateBtn();
    });

    $('.cate-choose-div').on('click', 'button', function() {
        var cate=this.getAttribute('cate');
        $(".mui-btn-danger,.choose-cate-button").removeClass("mui-btn-danger");
        jQuery(this).addClass("mui-btn-danger");
        toggleChooseCateBtn();
    });



    var host="http://localhost:31010/prometheus";
    var cateId=1;
    var nextPage=1;//记录下一页 每次页面渲染之后之后 +1
    var prePage=0;//记录上一页
    var curPage=1; //当前页 用来存放sessionStory数据
    var isloading=0;//如果isloading=1 表示正在加载
    //to flag witch page and witch news has been clicked
    var newsId=0;
    var newsPage=1;
    var index=0; //新闻的序号 1-20

    mui.init({
        gestureConfig:{
            tap: true, //默认为true
            doubletap: true, //默认为false
            longtap: true, //默认为false
            swipe: true, //默认为true
            drag: true, //默认为true
            hold:false,//默认为false，不监听
            release:false//默认为false，不监听
        }
    });

    var titleBar = new Swiper('#titleBar',{
//    cssWidthAndHeight : true,
        mode:'horizontal',
        visibilityFullFit : true,
        freeMode : true,
        watchActiveIndex: true
    });



    var mySwiper = new Swiper('.swiper-container',{
        slidesPerView:'auto',
        mode:'vertical',
        watchActiveIndex: true,
        onTouchStart: function() {
            holdPosition = 0;
        },
        onResistanceBefore: function(s, pos){
            holdPosition = pos;
        },
        onTouchEnd: function(){
            console.log("---"+holdPosition);
            if (holdPosition>100) {
                mySwiper.setWrapperTranslate(0,75,0);
                mySwiper.params.onlyExternal=true;
                $('.preloader').addClass('visible');
                pulldownRefresh(); //实现下拉
            }
            if (mySwiper.isEnd) {
                console.log("-------end");
            }
        }
    });


    function loadNewSlides(){
        setTimeout(function(){
            //Prepend new slide
            for(i=0;i<10;i++){
                var html='';
                html+='<li class="mui-table-view-cell mui-media" >';
                html+='      <a href="">';
                html+='<img class="mui-media-object mui-pull-left thumb-nail" src="">';
                html+='<div class="mui-media-body">';
                html+='<div class="news-list-title">标题标题标题标题标题</div>';
                html+='<div class="news-list-description">';
                html+='合肥网互粉哦无法复合物ifnmfv发阿三生生死死生生死死生生死死生生死死';
                html+='</div>';
                html+='<div class="news-list-info"> <span>22333</span> <span class="comment">1000评论</span>';
                html+='</div> </div> </a> </li>';
                mySwiper.prependSlide(html);
            }
            //Release interactions and set wrapper
            mySwiper.setWrapperTranslate(0,-300,0);
            mySwiper.params.onlyExternal=false;
            //Update active slide
            mySwiper.updateActiveSlide(0);
            //Hide loader
            $('.preloader').removeClass('visible');
        },1000)
    }


    /**第一次获取数据 */
    function firstGetData(page){
        $.ajax({
            type: "GET",
            url: url+"prometheus/news/listByCat?cateId="+cateId+"&page="+page,
            dataType: 'JSON',
            beforeSend: function(XMLHttpRequest){
            },
            success: function(data, textStatus){
                var errCode=data["errCode"];
                var cur=data["curPage"];
                if(errCode==0){
                    if(newsId>0)
                        refreshNewsList(data["data"],cur,1);
                    else
                        refreshNewsList(data["data"],cur,0);
                    nextPage+=1;
                }

                if (window.sessionStorage) {
                    sessionStorage.setItem("curPage", 1);
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){//请求出错处理
            }
        });
    }


    /**
     * 下拉刷新具体业务实现
     */
    function pulldownRefresh() {
        if(newsPage==1 || prePage==0) { // newsPage=1 means first come in and has not read news set the next page=2
            setTimeout(function () {
                $.ajax({
                    type: "GET",
                    url: url+"prometheus/news/listByCat?cateId="+cateId+"&page=1",
                    dataType: 'JSON',
                    beforeSend: function (XMLHttpRequest) {
                    },
                    success: function (data, textStatus) {
                        var errCode = data["errCode"];
                        var cur=data["curPage"];
                        if (errCode == 0) {
                            refreshNewsList(data["data"],cur,0);
                            isloading=0;
                            nextPage = 2;
                        }
                    },

                    complete: function (XMLHttpRequest, textStatus) {

                    },
                    error: function () {//请求出错处理
                    }
                });
            }, 1000);
        }else{ //加载前一页
            $.ajax({
                type: "GET",
                url: url+"prometheus/news/listByCat?cateId="+cateId+"&page="+prePage,
                dataType: 'JSON',
                beforeSend: function (XMLHttpRequest) {
                },
                success: function (data, textStatus) {
                    var errCode = data["errCode"];
                    var cur=data["curPage"];
                    if (errCode == 0) {
                        prependNewsList(data["data"],cur);
                        isloading=0;
                        prePage=prePage-1;
                    }
                },

                complete: function (XMLHttpRequest, textStatus) {
                },
                error: function () {//请求出错处理
                }
            });
        }
    }

    /**
     * 上拉加载具体业务实现
     */
    function pullupRefresh() {
        setTimeout(function() {
            $.ajax({
                type: "GET",
                url: url+"prometheus/news/listByCat?cateId="+cateId+"&page="+nextPage,
                dataType: 'JSON',
                beforeSend: function(XMLHttpRequest){
                },
                success: function(data, textStatus){
                    var errCode=data["errCode"];
                    var cur=data["curPage"];
                    if(errCode==0){
                        appendNewsList(data["data"],cur);
                        console.log("appendNewsList finish---");
                        isloading=0;
                        loadingEnd();
                    }
                    nextPage+=1;
                    if (window.sessionStorage) {
                        sessionStorage.setItem("curPage", nextPage-1);
                    }
                },

                complete: function(XMLHttpRequest, textStatus){

                },
                error: function(){//请求出错处理
                }
            });
        }, 1000);
    }



    function appendNewsList(data,newsPage){
        mySwiper.removeLastSlide(); //移除最后一个slide 即底部loader
        for(var i=0;i<data.length;i++){
            var html="";
            html+='<li class="mui-table-view-cell mui-media" id='+data[i]["id"]+' name='+data[i]["id"]+' >';
            html+='<a href="newsDetail.html?newsId='+data[i]["newsId"]+"&userId="+myUserId+'" page='+newsPage+' index='+i+'>';
            if(data[i]["thumbnail"].length>10) {
                html += '<img class="mui-media-object mui-pull-left thumb-nail" src="' + data[i]["thumbnail"] + '">';
            }
            html+='<div class="mui-media-body">';
            html+='<div class="news-list-title">'+data[i]["title"]+'</div>';
            html+='<div class="news-list-description">';
            html+=data[i]["description"];
            html+='</div>';
            html+=' <div class="news-list-info">';
            html+='<span>'+formatDate(data[i]["createTime"])+'</span>';
            html+='<span class="comment">1000评论</span>';
            html+='</div></div></a></li>';
            mySwiper.appendSlide(html);
        }
        appendLoader();//重新添加底部loader
    }



    function refreshNewsList(data,newsPage,needLocation){
        mySwiper.removeAllSlides();
        for(var i=0;i<data.length;i++){
            var html="";
            html+='<li class="mui-table-view-cell mui-media" id='+data[i]["id"]+' name='+data[i]["id"]+'>';
            html+='<a href="newsDetail.html?newsId='+data[i]["newsId"]+"&userId="+myUserId+'" page='+newsPage+' index='+i+'>';
            if(data[i]["thumbnail"].length>10) {
                html += '<img class="mui-media-object mui-pull-left thumb-nail" src="' + data[i]["thumbnail"] + '">';
            }
            html+='<div class="mui-media-body">';
            html+='<div class="news-list-title">'+data[i]["title"]+'</div>';
            html+='<div class="news-list-description">';
            html+=data[i]["description"];
            html+='</div>';
            html+=' <div class="news-list-info">';
            html+='<span>'+formatDate(data[i]["createTime"])+'</span>';
            html+='<span class="comment">1000评论</span>';
            html+='</div></div></a></li>';
            mySwiper.appendSlide(html);
        }
        appendLoader(); //每次刷新列表是加入底部loader
        if(needLocation==1){
            var perHeight=$("#newsList li").innerHeight();
            var pos=index*perHeight;
            mySwiper.setWrapperTranslate(0,-pos+30,0);
        }else{
            console.log("//??????????? curpage="+curPage);
            mySwiper.setWrapperTranslate(0,30,0);
        }
        mySwiper.params.onlyExternal=false;
        //Update active slide
        mySwiper.updateActiveSlide(0);
        //Hide loader
        $('.preloader').removeClass('visible');
    }


    function prependNewsList(data,newsPage){
        for(var i=data.length-1;i>=0;i--){
            var html="";
            html+='<li class="mui-table-view-cell mui-media" id='+data[i]["id"]+' name='+data[i]["id"]+' >';
            html+='<a href="newsDetail.html?newsId='+data[i]["newsId"]+"&userId="+myUserId+'" page='+newsPage+' index='+i+'>';
            if(data[i]["thumbnail"].length>10) {
                html += '<img class="mui-media-object mui-pull-left thumb-nail" src="' + data[i]["thumbnail"] + '">';
            }
            html+='<div class="mui-media-body">';
            html+='<div class="news-list-title">'+data[i]["title"]+'</div>';
            html+='<div class="news-list-description">';
            html+=data[i]["description"];
            html+='</div>';
            html+=' <div class="news-list-info">';
            html+='<span>'+formatDate(data[i]["createTime"])+'</span>';
            html+='<span class="comment">1000评论</span>';
            html+='</div></div></a></li>';
            mySwiper.prependSlide(html);
        }
        //Release interactions and set wrapper
        var perHeight=$("#newsList li").innerHeight();
        mySwiper.setWrapperTranslate(0,-data.length*perHeight+50,10);
        mySwiper.params.onlyExternal=false;
        //Update active slide
        mySwiper.updateActiveSlide(0);
        //Hide loader
        $('.preloader').removeClass('visible');
    }

    function appendLoader(){
        var html='';
        html+='<li class="mui-table-view-cell mui-media" id="loader" style="height: 50px">';
        html+='<a href="loader" id="loader">';
        html+='点击加载更多……';
        html+='</a></li>';
        mySwiper.appendSlide(html);
    }

    function isLoading(){
        $("#loader a").html("正在加载");
    }

    function loadingEnd(){
        $("#loader a").html("点击加载更多……");
    }

    //主列表点击事件
    mui('#newsList').on('tap', 'a', function() {
        if($("#backDiv").hasClass("lateral-menu-is-open")){
            closeSlideMenu();
        }else {
            var id = this.getAttribute('href');
            var href = this.href;
            if (id == "loader" && isloading == 0) {
                isLoading();
                pullupRefresh();
            } else {
                var index = parseInt(this.getAttribute("index"));
                var newsPage = parseInt(this.getAttribute("page"));
                console.log("--------newsPage===" + parseInt(this.getAttribute("page")) + "  " + index);
                if (window.sessionStorage) {
                    sessionStorage.setItem("newsPage", newsPage);
                    sessionStorage.setItem("index", index);
                }
                mui.openWindow({
                    id: id,
                    url: this.href,
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
            }
        }
    });


    mui('.swiper-wrapper').on('swipeup', 'li', function() {
        var offset=$("#newsList").offset();
        var height=$("#newsList").innerHeight();
        console.log("--------上拉==="+offset.top+"=="+height+"=="+mySwiper.getWrapperTranslate('y'));
        if(((height+offset.top) < 1000) || (offset.top/height < -0.8)){
            console.log(height+offset.top+ " === " +offset.top/height);
            if(isloading==0) {
                isloading=1;
                console.log("加载下一页……");
                pullupRefresh();
            }
        }
    });


    /**the onclick event of title bar */
    mui('#titleBar').on('tap', 'a', function() {
        var cate=this.getAttribute('cate');
        if (window.sessionStorage) {
            sessionStorage.setItem("cateId", parseInt(cate));
        }
        if(cate==1){
            cateId=1;
            nextPage=1;//记录下一页 每次页面渲染之后之后 +1
            prePage=0;//记录上一页
            curPage=1; //当前页 用来存放sessionStory数据
            newsId=0;
            newsPage=1;
            index=0; //新闻的序号 1-20
            firstGetData(newsPage);
        }else if(cate==2){
            cateId=2;
            nextPage=1;//记录下一页 每次页面渲染之后之后 +1
            prePage=0;//记录上一页
            curPage=1; //当前页 用来存放sessionStory数据
            newsId=0;
            newsPage=1;
            index=0; //新闻的序号 1-20
            firstGetData(newsPage);
        }else{
            mySwiper.removeAllSlides();
        }
    }


    );




    $(document).ready(function(){
        if (window.sessionStorage) {
        	var token=sessionStorage.getItem("token");
            var a=sessionStorage.getItem("curPage");
            var b =sessionStorage.getItem("newsId");
            var c =sessionStorage.getItem("newsPage");
            var d=sessionStorage.getItem("index");
            if(a!=null){
                curPage = parseInt(a);
            }
            if(b!=null){
                newsId=parseInt(b);
            }
            if(c!=null){
                newsPage=parseInt(c);
                curPage=newsPage;
                prePage=newsPage-1;
                nextPage=newsPage;
            }
            if(d!=null){
                index=parseInt(d);
            }
            if(sessionStorage.getItem("cateId")!=null){
                cateId=parseInt(sessionStorage.getItem("cateId"));
            }
        }
       if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
	   }

        firstGetData(newsPage);

    });

