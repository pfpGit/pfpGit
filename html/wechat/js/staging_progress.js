$(document).ready(function(){
	var orderNo = (GetQueryString("orderNo"));
	$(".title_info span").text(orderNo);
	$.get(basePath+"/data/order/wechat/order_progress/"+orderNo,function(data){
		if(data.status == 0){
			$.each(data.data,function(i,item){
				var div = "<div class='status status_off'><div class='left'><img src='img/freggh.png'/></div><div class='right'>"+item.remarks+"<br/>"+item.strUpdateTime+"</div><div style='clear:both;'></div></div>";
				$(div).appendTo(".the_progress");
				var status = $(".the_progress .status:first");
				status.addClass("status_on").removeClass("status_off");
				status.find("img").attr("src","img/tgetrhyhrty.png");
			});
		}else{
			alert(data.message);
		}
	})
});