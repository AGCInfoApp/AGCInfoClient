function showFriend(friendNameByMeAndToken) {
	//定义二维数组        0为我给好友起的名字的拼音      1为我给好友起的名字    2为好友的token
	var pinyin = new Array();
	for(var i = 0; i < friendNameByMeAndToken.length; i++) {
		pinyin[i] = new Array();
	}
	//将数据放入二维数组	
	for(var i = 0; i < friendNameByMeAndToken.length; i++) {
		$("#toPinYin").attr("value", friendNameByMeAndToken[i][0]);
		pinyin[i][0] = $("#toPinYin").toPinyin();
		pinyin[i][1] = friendNameByMeAndToken[i][0];
		pinyin[i][2] = friendNameByMeAndToken[i][1];
	}
	//二维数组排序
	var reg = /^\s+|\s+$/g;
	pinyin.sort(function(a, b) {
		var i = 0;
		var tag = 1;
		while(tag) {
			var af = a[0].replace(reg, "").charAt(i);
			var bf = b[0].replace(reg, "").charAt(i);
			if(af.length == 1 && bf.length == 1) {

				if(af.localeCompare(bf) > 0) {
					tag = 0;
					return 1;
				} else if(af.localeCompare(bf) < 0) {
					tag = 0;
					return -1;
				} else {
					i++;
				}
			} else {
				return 0;
			}
		}
	});

	i = 0;
	tag = 0;
	while(i < friendNameByMeAndToken.length) {
		var j = pinyin[i][0].charAt(0);
		if(j >= "0" && j <= "9") {
			if(!tag) {
				$("#friendList").append("<li data-group='1' class='mui-table-view-divider mui-indexed-list-group'>1</li>");
				$("#index").append("<a>1</a>");
				tag = 1;
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "a" || j == "A") {
			if(tag != "a") {
				$("#friendList").append("<li data-group='A' class='mui-table-view-divider mui-indexed-list-group'>A</li>");
				$("#index").append("<a>A</a>");
				tag = "a";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "b" || j == "B") {
			if(tag != "b") {
				$("#friendList").append("<li data-group='B' class='mui-table-view-divider mui-indexed-list-group'>B</li>");
				$("#index").append("<a>B</a>");
				tag = "b";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "c" || j == "C") {
			if(tag != "c") {
				$("#friendList").append("<li data-group='C' class='mui-table-view-divider mui-indexed-list-group'>C</li>");
				$("#index").append("<a>C</a>");
				tag = "c";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "d" || j == "D") {
			if(tag != "d") {
				$("#friendList").append("<li data-group='D' class='mui-table-view-divider mui-indexed-list-group'>D</li>");
				$("#index").append("<a>D</a>");
				tag = "d";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "e" || j == "E") {
			if(tag != "e") {
				$("#friendList").append("<li data-group='E' class='mui-table-view-divider mui-indexed-list-group'>E</li>");
				$("#index").append("<a>E</a>");
				tag = "e";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "f" || j == "F") {
			if(tag != "f") {
				$("#friendList").append("<li data-group='F' class='mui-table-view-divider mui-indexed-list-group'>F</li>");
				$("#index").append("<a>F</a>");
				tag = "f";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "g" || j == "G") {
			if(tag != "g") {
				$("#friendList").append("<li data-group='G' class='mui-table-view-divider mui-indexed-list-group'>G</li>");
				$("#index").append("<a>G</a>");
				tag = "g";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "h" || j == "H") {
			if(tag != "h") {
				$("#friendList").append("<li data-group='H' class='mui-table-view-divider mui-indexed-list-group'>H</li>");
				$("#index").append("<a>H</a>");
				tag = "h";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "i" || j == "I") {
			if(tag != "i") {
				$("#friendList").append("<li data-group='I' class='mui-table-view-divider mui-indexed-list-group'>I</li>");
				$("#index").append("<a>I</a>");
				tag = "i";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "j" || j == "J") {
			if(tag != "j") {
				$("#friendList").append("<li data-group='J' class='mui-table-view-divider mui-indexed-list-group'>J</li>");
				$("#index").append("<a>J</a>");
				tag = "j";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "k" || j == "K") {
			if(tag != "k") {
				$("#friendList").append("<li data-group='K' class='mui-table-view-divider mui-indexed-list-group'>K</li>");
				$("#index").append("<a>K</a>");
				tag = "k";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "l" || j == "L") {
			if(tag != "l") {
				$("#friendList").append("<li data-group='L' class='mui-table-view-divider mui-indexed-list-group'>L</li>");
				$("#index").append("<a>L</a>");
				tag = "l";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "m" || j == "M") {
			if(tag != "m") {
				$("#friendList").append("<li data-group='M' class='mui-table-view-divider mui-indexed-list-group'>M</li>");
				$("#index").append("<a>M</a>");
				tag = "m";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "n" || j == "N") {
			if(tag != "n") {
				$("#friendList").append("<li data-group='N' class='mui-table-view-divider mui-indexed-list-group'>N</li>");
				$("#index").append("<a>N</a>");
				tag = "n";

			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "o" || j == "O") {
			if(tag != "o") {
				$("#friendList").append("<li data-group='O' class='mui-table-view-divider mui-indexed-list-group'>O</li>");
				$("#index").append("<a>O</a>");
				tag = "o";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "p" || j == "P") {
			if(tag != "p") {
				$("#friendList").append("<li data-group='P' class='mui-table-view-divider mui-indexed-list-group'>P</li>");
				$("#index").append("<a>P</a>");
				tag = "p";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "q" || j == "Q") {
			if(tag != "q") {
				$("#friendList").append("<li data-group='Q' class='mui-table-view-divider mui-indexed-list-group'>Q</li>");
				$("#index").append("<a>Q</a>");
				tag = "q";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "r" || j == "R") {
			if(tag != "r") {
				$("#friendList").append("<li data-group='R' class='mui-table-view-divider mui-indexed-list-group'>R</li>");
				$("#index").append("<a>R</a>");
				tag = "r";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "s" || j == "S") {
			if(tag != "s") {
				$("#friendList").append("<li data-group='S' class='mui-table-view-divider mui-indexed-list-group'>S</li>");
				$("#index").append("<a>S</a>");
				tag = "s";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "t" || j == "T") {
			if(tag != "t") {
				$("#friendList").append("<li data-group='T' class='mui-table-view-divider mui-indexed-list-group'>T</li>");
				$("#index").append("<a>T</a>");
				tag = "t";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "u" || j == "U") {
			if(tag != "u") {
				$("#friendList").append("<li data-group='U' class='mui-table-view-divider mui-indexed-list-group'>U</li>");
				$("#index").append("<a>U</a>");
				tag = "u";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "v" || j == "V") {
			if(tag != "v") {
				$("#friendList").append("<li data-group='V' class='mui-table-view-divider mui-indexed-list-group'>V</li>");
				$("#index").append("<a>V</a>");
				tag = "v";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "w" || j == "W") {
			if(tag != "w") {
				$("#friendList").append("<li data-group='W' class='mui-table-view-divider mui-indexed-list-group'>W</li>");
				$("#index").append("<a>W</a>");
				tag = "w";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "x" || j == "X") {
			if(tag != "x") {
				$("#friendList").append("<li data-group='X' class='mui-table-view-divider mui-indexed-list-group'>X</li>");
				$("#index").append("<a>X</a>");
				tag = "x";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if(j == "y" || j == "A") {
			if(tag != "y") {
				$("#friendList").append("<li data-group='Y' class='mui-table-view-divider mui-indexed-list-group'>Y</li>");
				$("#index").append("<a>Y</a>");
				tag = "y";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		}
		if(j == "z" || j == "Z") {
			if(tag != "z") {
				$("#friendList").append("<li data-group='Z' class='mui-table-view-divider mui-indexed-list-group'>Z</li>");
				$("#index").append("<a>Z</a>");
				tag = "z";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		} else if((j > "9" || j < "0") && (j < "A" || (j > "Z" && j < "a") || j > "z")) {
			if(tag != "#") {
				$("#friendList").append("<li data-group='#' class='mui-table-view-divider mui-indexed-list-group'>#</li>");
				$("#index").append("<a>#</a>");
				tag = "#";
			}
			$("#friendList").append("<li class='mui-table-view-cell mui-indexed-list-item friend' id='" + pinyin[i][2] + "'>" + pinyin[i][1] + "</li>");
		}
		i++;
	}
}

function getFriend() {
	//取friendNameByMeAndToken列表
	var friendNameByMeAndToken = new Array();
	friendNameByMeAndToken[0] = new Array();
	friendNameByMeAndToken[1] = new Array();
	"金麒旻";
	friendNameByMeAndToken[2] = new Array();
	"宋帅妤";
	friendNameByMeAndToken[3] = new Array();
	"也能";
	friendNameByMeAndToken[4] = new Array();
	"阿凡达";
	friendNameByMeAndToken[5] = new Array();
	"还是";
	friendNameByMeAndToken[6] = new Array();
	friendNameByMeAndToken[0][0] = "王春则";
	friendNameByMeAndToken[1][0] = "金麒旻";
	friendNameByMeAndToken[2][0] = "宋帅妤";
	friendNameByMeAndToken[3][0] = "也能";
	friendNameByMeAndToken[4][0] = "阿凡达";
	friendNameByMeAndToken[5][0] = "还是";
	friendNameByMeAndToken[6][0] = "图标"
	friendNameByMeAndToken[0][1] = "王春则"
	friendNameByMeAndToken[1][1] = "金麒旻";
	friendNameByMeAndToken[2][1] = "宋帅妤";
	friendNameByMeAndToken[3][1] = "也能";
	friendNameByMeAndToken[4][1] = "阿凡达";
	friendNameByMeAndToken[5][1] = "还是";
	friendNameByMeAndToken[6][1] = "图标"
	showFriend(friendNameByMeAndToken);

	//	$.ajax({
	//          type: "GET",
	//          url: "用我的token得到所有好友的token和friendNameByMeAndToken",
	//          data: JSON.stringify({
	//							'token': "token",
	//						}),
	//          dataType: 'JSON',
	//          beforeSend: function(XMLHttpRequest){
	//          },
	//          success: function(data, textStatus){
	//              var errCode=data["errCode"];
	//              if(errCode==0){
	//              //得到二维数组
	//              }
	//          },
	//          complete: function(XMLHttpRequest, textStatus){
	//
	//          },
	//          error: function(){//请求出错处理
	//          }
	//      });
}

$(document).ready(function() {
	$("#toPinYin").hide();
	getFriend();
	$(".friend").click(function() {
		var friendToken = $(this).attr("id");
		localStorage.setItem("friendToken",friendToken);
		mui.openWindow({
			id: "friendInfo",
			url: "friendInfo.html",
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

});

mui.init();
mui.ready(function() {
	var header = document.querySelector('header.mui-bar');
	var list = document.getElementById('list');
	//calc hieght
	list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
	//create
	window.indexedList = new mui.IndexedList(list);
});