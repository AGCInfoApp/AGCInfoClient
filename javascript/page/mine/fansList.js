var url = "http://139.129.25.229:31010/";
var headPhotoUrl = "http://139.129.25.229/";
var myUserId;
var myToken;
var fansList = new Array();

$(document).ready(function() {

	if(window.localStorage) {
		myToken = localStorage.getItem("myToken");
		myUserId = localStorage.getItem("myUserId");
	}
	getFriend();

	$(document).on('click', '.friend', function() {
		var friendId = $(this).attr("id");
		localStorage.setItem("strangerUserId", friendId);
		mui.openWindow({
			id: "concernPeople",
			url: "concernPeople.html",
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

	mui.init();
	mui.ready(function() {
		var header = document.querySelector('header.mui-bar');
		var list = document.getElementById('list');
		//calc hieght
		list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
		//create
		window.indexedList = new mui.IndexedList(list);
	});
});

function showFriend() {
	/**
	 * concernlist
	 * 0:"userId"
      1:"remarkName"
      2:"nickname"
      3:"sex"
      4:"pic"
      5:"level"
      6:"signature"
	 */

	//定义二维数组        0为我给好友起的名字的拼音      1为我给好友起的名字    2为好友的id
	var pinyin = new Array();
	for(var i = 0; i < fansList.length; i++) {
		pinyin[i] = new Array();
	}
	//将数据放入二维数组	
	for(var i = 0; i < fansList.length; i++) {
		if(fansList[i][1] != "" && fansList[i][1] != null) {
			$("#toPinYin").attr("value", fansList[i][1]);
			pinyin[i][1] = fansList[i][1];
		} else {
			$("#toPinYin").attr("value", fansList[i][2]);
			pinyin[i][1] = fansList[i][2];
		}
		pinyin[i][0] = $("#toPinYin").toPinyin();
		pinyin[i][2] = fansList[i][0];
		pinyin[i][3] = fansList[i][3];
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
				if(i == 0 && af.length == 0) {
					return 1;
				}
				return 0;
			}
		}
	});

	i = 0;
	tag = 0;
	while(i < fansList.length) {
		var j = pinyin[i][0].charAt(0);
		if(j >= "0" && j <= "9") {
			if(!tag) {
				$("#friendList").append("<li data-group='1' class='mui-table-view-divider mui-indexed-list-group'>1</li>");
				$("#index").append("<a>1</a>");
				tag = 1;
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "a" || j == "A") {
			if(tag != "a") {
				$("#friendList").append("<li data-group='A' class='mui-table-view-divider mui-indexed-list-group'>A</li>");
				$("#index").append("<a>A</a>");
				tag = "a";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "b" || j == "B") {
			if(tag != "b") {
				$("#friendList").append("<li data-group='B' class='mui-table-view-divider mui-indexed-list-group'>B</li>");
				$("#index").append("<a>B</a>");
				tag = "b";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "c" || j == "C") {
			if(tag != "c") {
				$("#friendList").append("<li data-group='C' class='mui-table-view-divider mui-indexed-list-group'>C</li>");
				$("#index").append("<a>C</a>");
				tag = "c";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "d" || j == "D") {
			if(tag != "d") {
				$("#friendList").append("<li data-group='D' class='mui-table-view-divider mui-indexed-list-group'>D</li>");
				$("#index").append("<a>D</a>");
				tag = "d";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "e" || j == "E") {
			if(tag != "e") {
				$("#friendList").append("<li data-group='E' class='mui-table-view-divider mui-indexed-list-group'>E</li>");
				$("#index").append("<a>E</a>");
				tag = "e";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "f" || j == "F") {
			if(tag != "f") {
				$("#friendList").append("<li data-group='F' class='mui-table-view-divider mui-indexed-list-group'>F</li>");
				$("#index").append("<a>F</a>");
				tag = "f";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "g" || j == "G") {
			if(tag != "g") {
				$("#friendList").append("<li data-group='G' class='mui-table-view-divider mui-indexed-list-group'>G</li>");
				$("#index").append("<a>G</a>");
				tag = "g";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "h" || j == "H") {
			if(tag != "h") {
				$("#friendList").append("<li data-group='H' class='mui-table-view-divider mui-indexed-list-group'>H</li>");
				$("#index").append("<a>H</a>");
				tag = "h";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "i" || j == "I") {
			if(tag != "i") {
				$("#friendList").append("<li data-group='I' class='mui-table-view-divider mui-indexed-list-group'>I</li>");
				$("#index").append("<a>I</a>");
				tag = "i";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "j" || j == "J") {
			if(tag != "j") {
				$("#friendList").append("<li data-group='J' class='mui-table-view-divider mui-indexed-list-group'>J</li>");
				$("#index").append("<a>J</a>");
				tag = "j";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "k" || j == "K") {
			if(tag != "k") {
				$("#friendList").append("<li data-group='K' class='mui-table-view-divider mui-indexed-list-group'>K</li>");
				$("#index").append("<a>K</a>");
				tag = "k";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "l" || j == "L") {
			if(tag != "l") {
				$("#friendList").append("<li data-group='L' class='mui-table-view-divider mui-indexed-list-group'>L</li>");
				$("#index").append("<a>L</a>");
				tag = "l";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "m" || j == "M") {
			if(tag != "m") {
				$("#friendList").append("<li data-group='M' class='mui-table-view-divider mui-indexed-list-group'>M</li>");
				$("#index").append("<a>M</a>");
				tag = "m";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "n" || j == "N") {
			if(tag != "n") {
				$("#friendList").append("<li data-group='N' class='mui-table-view-divider mui-indexed-list-group'>N</li>");
				$("#index").append("<a>N</a>");
				tag = "n";

			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "o" || j == "O") {
			if(tag != "o") {
				$("#friendList").append("<li data-group='O' class='mui-table-view-divider mui-indexed-list-group'>O</li>");
				$("#index").append("<a>O</a>");
				tag = "o";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "p" || j == "P") {
			if(tag != "p") {
				$("#friendList").append("<li data-group='P' class='mui-table-view-divider mui-indexed-list-group'>P</li>");
				$("#index").append("<a>P</a>");
				tag = "p";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "q" || j == "Q") {
			if(tag != "q") {
				$("#friendList").append("<li data-group='Q' class='mui-table-view-divider mui-indexed-list-group'>Q</li>");
				$("#index").append("<a>Q</a>");
				tag = "q";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "r" || j == "R") {
			if(tag != "r") {
				$("#friendList").append("<li data-group='R' class='mui-table-view-divider mui-indexed-list-group'>R</li>");
				$("#index").append("<a>R</a>");
				tag = "r";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "s" || j == "S") {
			if(tag != "s") {
				$("#friendList").append("<li data-group='S' class='mui-table-view-divider mui-indexed-list-group'>S</li>");
				$("#index").append("<a>S</a>");
				tag = "s";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "t" || j == "T") {
			if(tag != "t") {
				$("#friendList").append("<li data-group='T' class='mui-table-view-divider mui-indexed-list-group'>T</li>");
				$("#index").append("<a>T</a>");
				tag = "t";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "u" || j == "U") {
			if(tag != "u") {
				$("#friendList").append("<li data-group='U' class='mui-table-view-divider mui-indexed-list-group'>U</li>");
				$("#index").append("<a>U</a>");
				tag = "u";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "v" || j == "V") {
			if(tag != "v") {
				$("#friendList").append("<li data-group='V' class='mui-table-view-divider mui-indexed-list-group'>V</li>");
				$("#index").append("<a>V</a>");
				tag = "v";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "w" || j == "W") {
			if(tag != "w") {
				$("#friendList").append("<li data-group='W' class='mui-table-view-divider mui-indexed-list-group'>W</li>");
				$("#index").append("<a>W</a>");
				tag = "w";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "x" || j == "X") {
			if(tag != "x") {
				$("#friendList").append("<li data-group='X' class='mui-table-view-divider mui-indexed-list-group'>X</li>");
				$("#index").append("<a>X</a>");
				tag = "x";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "y" || j == "A") {
			if(tag != "y") {
				$("#friendList").append("<li data-group='Y' class='mui-table-view-divider mui-indexed-list-group'>Y</li>");
				$("#index").append("<a>Y</a>");
				tag = "y";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if(j == "z" || j == "Z") {
			if(tag != "z") {
				$("#friendList").append("<li data-group='Z' class='mui-table-view-divider mui-indexed-list-group'>Z</li>");
				$("#index").append("<a>Z</a>");
				tag = "z";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		} else if((j > "9" || j < "0") && (j < "A" || (j > "Z" && j < "a") || j > "z")) {
			if(tag != "#") {
				$("#friendList").append("<li data-group='#' class='mui-table-view-divider mui-indexed-list-group'>#</li>");
				$("#index").append("<a>#</a>");
				tag = "#";
			}
			if(pinyin[i][3]!=""){
				$("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='"+headPhotoUrl+pinyin[i][3]+"' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}else{
                $("#friendList").append("<li class='friend mui-table-view-cell mui-indexed-list-item' id='" + pinyin[i][2] + "'><img class='headPhoto' src='../../images/noHeadPhoto.jpg' /><p class='name'>" + pinyin[i][1] + "</p></li>");
			}
		}
		i++;
	}
}

function getFriend() {
	//fansList

	$.ajax({
		type: "GET",
		url: url + "prometheus/user/getFans?userId=" + myUserId,
		dataType: 'JSON',
		beforeSend: function(XMLHttpRequest) {},
		success: function(data, textStatus) {
			var errCode = data["errCode"];
			if(errCode == 0) {
				//得到二维数组
				for(var i = 0; i < data.data.length; i++) {
					fansList[i] = new Array();
					fansList[i][0] = data.data[i].userId;
					fansList[i][1] = data.data[i].remarkName;
					fansList[i][2] = data.data[i].nickname;
                    fansList[i][3] = data.data[i].pic;
				}

				showFriend();

			}
		},
		complete: function(XMLHttpRequest, textStatus) {

		},
		error: function() { //请求出错处理
		}
	});

}
