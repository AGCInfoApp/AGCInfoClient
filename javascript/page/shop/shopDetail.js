var url = "http://139.129.25.229:31010/";
var myToken;
var myUserId;
var goodsId = GetQueryString("goodsId");

/**获取列表 */
    function getGoodsInfo(){
        $.ajax({
            type: "GET",
            url: url+"prometheus/shop/getGoodsInfo?goodsId="+goodsId,
            dataType: 'JSON',
            beforeSend: function(XMLHttpRequest){
            },
            success: function(data, textStatus){
                var errCode=data["errCode"];
                if(errCode==0){
                    appendGoodsInfo(data["data"]);
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
    
    
    function appendPicLoop(pics){
	  for(i=0;i<pics.length;i++){
		var html="";
		var html2="";
		html+='<div class="mui-slider-item"><a href="#">';
		html+='<img src="'+pics[i]+'">';
		html+='</a></div>';
        $("#picLoop").append(html);
        
        if(i==0){
          html2+='<div class="mui-indicator mui-active"></div>';
        }else{
          html2+='<div class="mui-indicator"></div>';	
        }
        $("#picLoopIndicator").append(html2);
	  }
    }
    
  /**添加商品*/
    function appendGoodsInfo(data){
    	appendPicLoop(data["pics"]);
    	$("#goodsTitle").html(data["title"]);
    	$("#goodsPrice").html(data["price"]);
    	for(i=0;i<data["infoPics"].length;i++){
    		var html="";
            html+='<img  src="'+data["infoPics"][i]+'" width="100%">';
            $("#goodsInfo").append(html);
    	}
    	$("#goodsDesc").html(data["description"]);
        
    }
    

    $(document).ready(function(){
       if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
	   }
       getGoodsInfo();
    });