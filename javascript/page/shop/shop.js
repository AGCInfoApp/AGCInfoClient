var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;


/**获取列表 */
    function getGoodsList(){
        $.ajax({
            type: "GET",
            url: url+"prometheus/shop/listGoods?page=1",
            dataType: 'JSON',
            beforeSend: function(XMLHttpRequest){
            },
            success: function(data, textStatus){
                var errCode=data["errCode"];
                if(errCode==0){
                    appendGoodsList(data["data"]);
                    console.log(data["data"]);
                }else{
                	mui.toast(data["msg"]);
                }
            },

            complete: function(XMLHttpRequest, textStatus){

            },
            error: function(){//请求出错处理
            }
        });
    }
    
  /**添加商品*/
    function appendGoodsList(data){
    	for(var i=0;i<data.length;i++){
            var html="";
            html+='<li class="mui-table-view-cell mui-media mui-col-xs-6">';
            html+='<a href="shopDetail.html?goodsId='+data[i]["goodsId"] +'" >';
            html+='<img class="mui-media-object" src="'+data[i]["goodsPic"]+'" >';
            html+='<div class="mui-media-body" ><div class="goods-title">';
            html+=data[i]["title"];
            html+='</div><div class="goods-price">';
            html+='￥'+data[i]["price"];
            html+='</div></div></a></li>';
            
            $("#goodsList").append(html);
        }
    }
    

//主列表点击事件
    mui('#goodsList').on('tap', 'a', function() {
    	var id = this.getAttribute('href');
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
    });
    

    $(document).ready(function(){
       if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
	   }
       getGoodsList();
    });