//1.点击搜索按钮搜索歌曲
$(".search-btn").click(function(){
	getSongs();
});
//回车键搜索
$("body").keydown(function(){
    if(event.keyCode==13){
        getSongs();
    }
});

function getSongs(){
	var keyword=$(".search-text").val();
	$.ajax({
		url:"http://s.music.163.com/search/get/",
		dataType:"jsonp",
		data:{
			type:1,
			limit:15,//搜索歌曲数目
			s:keyword//搜索关键字
		},
    	success:function(data){
    		$(".defalut-result").remove();
    		$("#songs-list li").remove();//先移除上一次搜索的li
    		var html;
    		var songLis=data.result.songs;
    		for(var i=0;i<songLis.length;i++){

                var oLi=$("<li class='list-group-item'>"+"<span>"+(i+1)+"</span>"+"."+"<a>"+songLis[i].name+"--"+songLis[i].artists[0].name+"</a></li>");
                
                oLi.attr("data-id",songLis[i].id)//歌曲id
                oLi.attr("data-img",songLis[i].album.picUrl);//歌曲图片
                oLi.attr("data-src",songLis[i].audio);//播放地址
                //oLi.attr("data-dur",songLis[i].duration)//歌曲时长
                $("#songs-list").append(oLi);
    		}

            //给每个li添加点击事件
		    $("#songs-list li").each(function(){
	        	$(this).click(function(){
	        		//1.图片
	        		$(".defalut-Info").remove()
	        		$(".song-img").remove();//先移除上一次生成的img
	        		var imgSrc=$(this).attr("data-img");
	                var oImg=$("<img src="+imgSrc+" class="+"song-img"+">");
	                $("#media-img").append(oImg);

	                //2.歌曲播放地址
	                $(".song-detial").remove();//先移除上一次生成的歌曲信息
	                var nameSinger=$(this).children("a:eq(0)").text();
	                var songSrc=$(this).attr("data-src");
                    var songInfo=$("<div class='song-detial'><h5 style='margin-bottom:20px'>"+nameSinger+"</h5><h5>歌曲地址："+songSrc+"</h5><button class='btn btn-primary play' style='margin:10px 30px 0 0'>播放</button><a download href="+songSrc+"><button style='margin-top:10px' class='btn btn-primary'>下载</button></a></div>");
                    $("#song-info").append(songInfo);

                    //3.点击播放
                    var songId=$(this).attr("data-id");
                    $(".play").click(function(){
                        var oPlay=$("<iframe class='play-iframe' frameborder='no' border='0' marginwidth='0' marginheight='0' width=400 height=86 src='//music.163.com/outchain/player?type=2&id="+songId+"&auto=1&height=66'></iframe>");
                        $(".play-position").append(oPlay);
                        $(".play-iframe").css("margin","10px 0 0 0 -10px");
                    });

                    //4.查看歌词
                    // getLyric(songId);
	        	});
	        });
    	}
	});
}

//歌词
// function getLyric(songId){
// 	$.ajax({
// 		url:"http://music.163.com/api/song/lyric",
//         dataType:"jsonp",
// 		data:{
//             os:"pc",
//             id:songId,
//             lv:-1,
//             kv:-1,
//             tv:-1,
//             callback:success
// 		}
// 		success:function(data){
//             // ss=data.lrc;
//             // console.log(ss);
//             console.log(123);
// 		}
// 	});
// }
