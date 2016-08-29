/*
	a. 若是代购订单则调用接口
	http://dev.home.maimaiti.cn/data/purchase/wechat/purchase_detail/{purchaseId}
	http://dev.home.maimaiti.cn/data/purchase/wechat/purchase_detail/2016041902

	b. 其他
	http://dev.home.maimaiti.cn/data/order/wechat/order_detail/{orderNO}
	http://dev.home.maimaiti.cn/data/order/wechat/order_detail/1000000466590890
*/

var interface_url = {
	"host":basePath+"/",
	"order_id" : "",
	"category" : "",
	"url" : ""
};

function interface_to_url(){
	interface_url["url"] = interface_url["host"];
	interface_url["url"] = interface_url["url"] + "data/";
	switch(interface_url["category"]){
		case "purchase":
			interface_url["url"] = interface_url["url"] + "purchase/wechat/purchase_detail/";
		break;
		default:
	}
	interface_url["url"] = interface_url["url"] + interface_url["order_id"];
	console.log(interface_url["url"]);
	return interface_url["url"];
}

function show_details(json){
	if(json["status"] == "0"){
		var src = "staging_progress.html?orderNo="+json["data"]["orderId"];
		var btnWl = "";
		var wlHtml = "";
		if(json["data"]["orderStatus"]>520&&json["data"]["orderStatus"]!=599){
			btnWl ='<div class="Logistics_Button" id="查看物流"></div>';
			wlHtml = '<div class="Titlec">'+
			'<div class="TitlecLeft"><img src="img/cevvvesr.png"/></div>'+
			'<div class="TitlecMiddle">'+
			'<div>物流进度</div>'+
			'<div>SA张某已接单，电话[136XXXXXXXX]</div>'+
			'<div>2016-04-13 10:30:12</div>'+
			'</div>'+
			'<div class="TitlecRight"><img src="img/desdD.png"/></div>'+
			'</div>';
		}
  var div = '<div class="Titlea">订单号：'+json["data"]["orderId"]+'<span>('+json["data"]["strOrderStatus"]+')</span></div>';
        if(json["data"]["progressRemarks"] == null){
			div += wlHtml+
			'<div class="aaa">'+
			'<span style="color:#c4000e;font-size:1.1rem;font-weight: bold;">JD</span>'+
			'<span style="font-size:1.16rem;">京东</span>'+
			'</div>'+
			'<div class="bbb">'+
				'<div class="bbbLeft"><img src="'+json["data"]["goodsImage"]+'" style="width:4.16rem;height:4.16rem;background-color:#ffffff;margin-top: 0.41rem;"/></div>'+
				'<div class="bbbRight">'+json["data"]["goodsNotes"]+'</div>'+
			'</div>'+
			'<div class="ddd">'+
				'备注信息：'+json["data"]["goodsRemarks"]+
			'</div>'+
			'<div class="ccc">'+
				'商品总额：￥'+json["data"]["amount"]+
			'</div>'+
			'<div style="height:0.67rem;width:100%;background-color:#f6f6f6;">'+
			'</div>'+
			'<div class="eee">'+
			'<div>分期金额：'+json["data"]["stagesMoney"]+'</div>'+
			'<div>分期数：'+json["data"]["periods"]+'期</div>'+
			'<div>每期还款：'+json["data"]["monthRepayment"]+'</div>'+
			'<div>含每期分期服务费：'+json["data"]["serviceCharge"]+'</div>'+
			'</div>'+
			'<div style="height:0.67rem;width:100%;background-color:#f6f6f6;">'+
			'</div>'+
			'<div class="fff">'+
				'<p>客户信息</p>'+
				'<p>姓名:'+json["data"]["userName"]+'</p>'+
				'<p>身份证号:'+json["data"]["idCard"]+'</p>'+
				'<p>联系电话:'+json["data"]["mobile"]+'</p>'+
				'<p>面签地址:'+json["data"]["address"]+'</p>'+
				'<p>收货地址:'+json["data"]["receiverAddress"]+'</p>'+
				'<p>下单时间:'+json["data"]["createTime"]+'</p>'+
			'</div>'+
			'<div style="height:0.67rem;width:100%;background-color:#f6f6f6;">'+
			'</div>'+
			'<div class="button_area">'+btnWl+
			'</div>'+
			'<div style="height:0.67rem;width:100%;background-color:#f6f6f6;">'+
			'</div>';
		}else{
			div += "<a href="+src+" class='Titleb'>"+
			'<div class="TitlebLeft"><img src="img/DQwd.png"/></div>'+
			'<div class="TitlebMiddle">'+
			'<div>分期进度</div>'+
			'<div style="color:#ff6700;">'+json["data"]["progressRemarks"]+'</div>'+
			'<div>'+json["" +
					"data"]["progressUpdateTime"]+'</div>'+
			'</div>'+
			'<div class="TitlebRight"><img src="img/desdD.png"/></div>'+
			'</a>'+ wlHtml+
			'<div class="aaa">'+
			'<span style="color:#c4000e;font-size:1.1rem;font-weight: bold;">JD</span>'+
			'<span style="font-size:1.16rem;">京东</span>'+
			'</div>'+
			'<div class="bbb">'+
				'<div class="bbbLeft"><img src="'+json["data"]["goodsImage"]+'" style="width:4.16rem;height:4.16rem;background-color:#ffffff;margin-top: 0.41rem;"/></div>'+
				'<div class="bbbRight">'+json["data"]["goodsNotes"]+'</div>'+
			'</div>'+
			'<div class="ddd">'+
				'备注信息：'+json["data"]["goodsRemarks"]+
			'</div>'+
			'<div class="ccc">'+
				'商品总额：￥'+json["data"]["amount"]+
			'</div>'+
			'<div style="height:0.67rem;width:100%;background-color:#f6f6f6;">'+
			'</div>'+
			'<div class="eee">'+
			'<div>分期金额：'+json["data"]["stagesMoney"]+'</div>'+
			'<div>分期数：'+json["data"]["periods"]+'期</div>'+
			'<div>每期还款：'+json["data"]["monthRepayment"]+'</div>'+
			'<div>含每期分期服务费：'+json["data"]["serviceCharge"]+'</div>'+
			'</div>'+
			'<div style="height:0.67rem;width:100%;background-color:#f6f6f6;">'+
			'</div>'+
			'<div class="fff">'+
				'<p>客户信息</p>'+
				'<p>姓名:'+json["data"]["userName"]+'</p>'+
				'<p>身份证号:'+json["data"]["idCard"]+'</p>'+
				'<p>联系电话:'+json["data"]["mobile"]+'</p>'+
				'<p>面签地址:'+json["data"]["address"]+'</p>'+
				'<p>收货地址:'+json["data"]["receiverAddress"]+'</p>'+
				'<p>下单时间:'+json["data"]["createTime"]+'</p>'+
			'</div>'+
			'<div style="height:0.67rem;width:100%;background-color:#f6f6f6;">'+
			'</div>'+
			'<div class="button_area">'+btnWl+
			'</div>'+
			'<div style="height:0.67rem;width:100%;background-color:#f6f6f6;">'+
			'</div>';
		}
			
			
		return div;
	}
	else{
		return "";
	}
}

$(document).ready(function(){
	$(window).load(function(){
		interface_url["category"] = GetQueryString("category");
		interface_url["order_id"] = GetQueryString("order_id");
		
		$.ajax({
			type: 'GET',
			url: interface_to_url(),
			dataType: 'json',
			success: function(data){
				$('#listsContent').html('');
				$('#listsContent').prepend(show_details(data));
			},
			error: function(xhr, type){
				alert('Ajax error!');
			}
		});
	});
	
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
				url: interface_to_url(),
				dataType: 'json',
				success: function(data){
					$('#listsContent').html('');
					$('#listsContent').prepend(show_details(data));
					
					// 为了测试，延迟1秒加载
					setTimeout(function(){
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
				url: interface_to_url(),
				dataType: 'json',
				success: function(data){
					$('#listsContent').html('');
					$('#listsContent').prepend(show_details(data));
					
					// 为了测试，延迟1秒加载
					setTimeout(function(){
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
