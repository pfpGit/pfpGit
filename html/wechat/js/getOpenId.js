// JavaScript Document
$.get(basePath+"/wechatuser/getOpenid.do",function(data){
	if(data.status == 1){
			$.get(basePath+"/wechatuser/getWXUrl.do?hrefUrl="+window.location.href,function(data1){
				if(data1.status == 0){
					var url = data1.message;
					location.href = url;
//					$.ajax({
//						url:url,
//						type:'GET'
//					},success:function(data){
//						
//					});
				}
			});
	}
});