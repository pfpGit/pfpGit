$(document).ready(function(){
	// dropload
	var dropload = $('.inner').dropload({
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
		loadUpFn : function(me){
			$.ajax({
				type: 'GET',
				url: basePath+'/data/bill/wechat/month_bill',
				dataType: 'json',
				success: function(data){
					var result = '';
					// for(var i = 0; i < data.lists.length; i++){
					// 	result +=   '';
					// }
					// 为了测试，延迟1秒加载
					setTimeout(function(){
						$('.lists').html('');
						$('.lists').prepend(result);
						me.resetload();
					},1000);
				},
				error: function(xhr, type){
					alert('Ajax error!');
					me.resetload();
				}
			});
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
						$('.lists').append(result);
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
});
