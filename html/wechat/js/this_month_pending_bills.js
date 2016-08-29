$(document).ready(function(){
	// htmlobj=$.ajax({url:"http://dev.home.maimaiti.cn/data/bill/wechat/month_bill",async:false});
	// console.log(htmlobj.responseText);

	// dropload
	var dropload = $('#monthList').dropload({
		domUp : {
			domClass   : 'dropload-up',
			domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
			domUpdate  : '<div class="dropload-update">↑释放更新</div>',
			domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		},
		domDown : {
			domClass   : 'dropload-down',
			domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
			domUpdate  : '<div class="dropload-update">↓释放加载</div>',
			domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		},
		loadDownFn : function(me){
			$.ajax({
				type: 'GET',
				url: basePath+'/data/bill/wechat/month_bill',
				dataType: 'json',
				success: function(data){
					var result = '';
					// for(var i = 0; i < data.lists.length; i++){
					// 	result +=   '<a class="item opacity">'
					// 					+'<img src="'+data.lists[i].pic+'" alt="">'
					// 					+'<h3 href="'+data.lists[i].link+'" >'+data.lists[i].title+'</h3>'
					// 					+'<span class="date">'+data.lists[i].date+'</span>'
					// 				+'</a>';
					// }
					// 为了测试，延迟1秒加载
					setTimeout(function(){
						$('#monthList').append(result);
						me.resetload();
					},1000);
				},
				error: function(xhr, type){
					alert('Ajax error!');
					me.resetload();
				}
			});
		}
	});
	
	var dropload = $('#allList').dropload({
		domUp : {
			domClass   : 'dropload-up',
			domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
			domUpdate  : '<div class="dropload-update">↑释放更新</div>',
			domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		},
		domDown : {
			domClass   : 'dropload-down',
			domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
			domUpdate  : '<div class="dropload-update">↓释放加载</div>',
			domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
		},
		loadDownFn : function(me){
			$.ajax({
				type: 'GET',
				url: basePath+'/data/bill/wechat/month_bill',
				dataType: 'json',
				success: function(data){
					var result = '';
					// for(var i = 0; i < data.lists.length; i++){
					// 	result +=   '<a class="item opacity">'
					// 					+'<img src="'+data.lists[i].pic+'" alt="">'
					// 					+'<h3 href="'+data.lists[i].link+'" >'+data.lists[i].title+'</h3>'
					// 					+'<span class="date">'+data.lists[i].date+'</span>'
					// 				+'</a>';
					// }
					// 为了测试，延迟1秒加载
					setTimeout(function(){
						$('#allList').append(result);
						me.resetload();
					},1000);
				},
				error: function(xhr, type){
					alert('Ajax error!');
					me.resetload();
				}
			});
		}
	});

	$(".fixboxmenuButton").click(function(){
		$(".fixboxmenuButton").removeClass("fixboxmenuUnderLine");
		$(this).addClass("fixboxmenuUnderLine");
		var index = $(".fixboxmenu .fixboxmenuButton").index(this);
		$(".outer .inner").hide();
		$(".outer .inner").eq(index).show();
	});

	//$(".fixboxmenuLeft").click(function(){
//		$("#footPanel").css("display","block");
//	});
//	$(".fixboxmenuRight").click(function(){
//		$("#footPanel").css("display","none");
//	});
	
    $.getJSON(basePath+"/data/bill/wechat/month_bill",function(data){
		isLogin(data);
		if(data.status == 0){
			$.each(data.data,function(i,item){
				var src = "billDetails.html?detail="+item.billId;
				var div = "<a href="+src+" class='NowlistBodyBox'><div class='NowlistBodyBoxMiddle' style='margin-left:8%;'><p><span>￥"+item.payAmount+"</span>";
				var sign = item.sign;
				if(sign == "OVERDUE"){
					div += "<span class='asdee'>逾期账单</span></p><p style='margin-top:6px;'>["+item.sbSn+"/"+item.periods+"期]"+item.goodsNotes+"</p><p style='font-size:0.71rem;color:#808080;'>还款日"+item.strSbPayDate+"</p></div><div class='NowlistBodyBoxRight'><img src='img/csdc.png'/></div><div style='clear:both'></div></a>";
				}else if(sign == "THISPERIODS"){
					div += "<span class='asooodee'>本期账单</span></p><p style='margin-top:6px;'>["+item.sbSn+"/"+item.periods+"期]"+item.goodsNotes+"</p><p style='font-size:0.71rem;color:#808080;'>还款日"+item.strSbPayDate+"</p></div><div class='NowlistBodyBoxRight'><img src='img/csdc.png'/></div><div style='clear:both'></div></a>";
				}
				$(div).appendTo("#monthList");
		    });
		}else{
			textLog(data.message);
		}
	})	
	
	$.get(basePath+"/data/bill/wechat/all_bill",function(data){
		isLogin(data);
		if(data.status == 0){
			$.each(data.data,function(i,item){
				var src = "billDetails.html?detail="+item.billId;
				var div = "<a href="+src+" class='NowlistBodyBox'><div class='NowlistBodyBoxMiddle' style='margin-left:8%;'><p><span>￥"+item.payAmount+"</span>";
				if(item.sbStatus == 2){
					div += "<span class='sbStatus'>已还款</span></p><p style='margin-top: 6px;'>["+item.sbSn+"/"+item.periods+"期]"+item.goodsNotes+"</p><p style='font-size:0.71rem;color:#808080;'>还款日："+item.strSbPayDate+"</p></div><div class='NowlistBodyBoxRight'><img src='img/csdc.png'/></div><div style='clear:both'></div></a>";
				}else{
					var sign = item.sign;
					if(sign == "OVERDUE"){
						div += "<span class='asdee'>逾期</span></p><p style='margin-top: 6px;'>["+item.sbSn+"/"+item.periods+"期]"+item.goodsNotes+"</p><p style='font-size:0.71rem;color:#808080;'>还款日："+item.strSbPayDate+"</p></div><div class='NowlistBodyBoxRight'><img src='img/csdc.png'/></div><div style='clear:both'></div></a>";
					}else if(sign == "THISPERIODS"){
						div += "<span class='asooodee'>本期</span></p><p style='margin-top: 6px;'>["+item.sbSn+"/"+item.periods+"期]"+item.goodsNotes+"</p><p style='font-size:0.71rem;color:#808080;'>还款日："+item.strSbPayDate+"</p></div><div class='NowlistBodyBoxRight'><img src='img/csdc.png'/></div><div style='clear:both'></div></a>";
					}else{
						div += "<span class='sbStatus'>未还款</span></p><p style='margin-top: 6px;'>["+item.sbSn+"/"+item.periods+"期]"+item.goodsNotes+"</p><p style='font-size:0.71rem;color:#808080;'>还款日："+item.strSbPayDate+"</p></div><div class='NowlistBodyBoxRight'><img src='img/csdc.png'/></div><div style='clear:both'></div></a>";
					}
				}
				$(div).appendTo("#allList");
			})
		}else{
			textLog(data.message);
		}
	})
});
