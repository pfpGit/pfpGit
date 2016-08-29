/*
10.1 待核实
	http://dev.home.maimaiti.cn/data/purchase/wechat/purchase_list?selectType=01&rows=&page=

10.2 待签署
	http://dev.home.maimaiti.cn/data/order/wechat/order_list?selectType=02&rows=&page=

10.3 待首付
	http://dev.home.maimaiti.cn/data/order/wechat/order_list?selectType=03&rows=&page=

10.4 待收货
	http://dev.home.maimaiti.cn/data/purchase/wechat/purchase_list?selectType=04&rows=&page=

10.6  全部订单
	http://dev.home.maimaiti.cn/data/purchase/wechat/all_order_list?selectType=00&rows=&page=

使用说明：
OrderInterFace 属于全局变量
*/
var ext = 'html';

var OrderInterFace = {
	"host": basePath,
	"path": "/data/purchase/wechat/",
	"interface": "purchase_list",
	"selectType": "01",
	"rows": 10,
	"page": 1,
	"url":""
};

//对接口进行拼接生成
function OrderInterFaceToUrl(next) {
	OrderInterFace["url"] = OrderInterFace["host"];
	OrderInterFace["url"] = OrderInterFace["url"]+OrderInterFace["path"];
	OrderInterFace["url"] = OrderInterFace["url"]+OrderInterFace["interface"]+"?";
	OrderInterFace["url"] = OrderInterFace["url"]+"selectType="+OrderInterFace["selectType"];
	OrderInterFace["url"] = OrderInterFace["url"]+"&pageSize="+OrderInterFace["rows"];
	switch (next) {
		case 0:
			OrderInterFace["page"] = 1;
			break;
		case 1:
			OrderInterFace["page"]++;
			break;
		default:
	}
	OrderInterFace["url"] = OrderInterFace["url"]+"&pageIndex="+OrderInterFace["page"];
	console.log(OrderInterFace["url"]);
	return OrderInterFace["url"];
}

//执行数据更新
function GetDataFromInterFace(InterFaceUrl) {
	$('#listsContent').html('');
	$.ajax({
		type: 'GET',
		url: InterFaceUrl,
//		url: "http://www.maimaiti.cn/data/purchase/wechat/purchase_list.do",
		dataType: 'json',
		success: function(data){
			var result = '';
			isLogin(data);
			if (data.status == "0") {
				for(var i = 0; i < data.data.length; i++){
					console.log(data.data[i]);
					result += orderElement(data.data[i]);
				}
			}

			// 为了测试，延迟1秒加载
			setTimeout(function(){
				$('#listsContent').html('');
				$('#listsContent').prepend(result);
			},1000);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			textLog("加载失败！");
			  
		}
	});
}

/*
	待核实中”取消订单”
	http://dev.home.maimaiti.cn/data/purchase/wechat/update_status_purchase/{purchaseId}?updateType=01

	待签署中” 取消订单”
	http://dev.home.maimaiti.cn/data/order/wechat/update_status_order/{orderNo}?updateType=02

	待首付中“取消订单”
	http://dev.home.maimaiti.cn/data/order/wechat/update_status_order/{orderNo}?updateType=02
	
	执行取消订单的操作
	InputData = {
		"updateType" : "01",
		"id" : "xxxxxx",
	}
*/
function cancel_order(updateType,id){
	/*var cancel_url = '';
	switch(updateType){
		case "01":
			cancel_url = basePath+'/data/purchase/wechat/update_status_purchase/'+id+'?updateType=01&_method=put';
			break;
		case "02":
			cancel_url = basePath+'/data/order/wechat/update_status_purchase/'+id+'?updateType=02&_method=put';
			break;
		default:
	}*/
	var cancel_url = basePath+'/data/purchase/wechat/update_status_purchase/'+id+'?updateType='+updateType+'&_method=put';
	//开始执行取消订单的操作
	conFirm("确认取消订单？","订单取消之后不能恢复",["取消","确定"],function(){
		$.ajax({
			url: cancel_url,
			type: 'post',
			dataType:"json",
			success: function( response ) {
				if(response.status == "0"){
					 textLog("操作成功！");
					 GetDataFromInterFace(OrderInterFaceToUrl(0));
				}else{
					textLog("操作失败！");
				}
			}
		});
	});
	
}

function cancel_return(type,orderId){
	
	$.ajax({
		url: OrderInterFace.host+"/data/purchase/wechat/update_status_purchase/"+orderId+"?updateType="+type,
		type: 'put',
		dataType:"json",
		success: function( response ) {
			if(response.status == "0"){
				 textLog("操作成功！");
				 GetDataFromInterFace(OrderInterFaceToUrl(0));
			}else{
				textLog("操作失败！");
			}
		}
	});
}
 
function confirmButton(id){
	conFirm("确认收货",'请收到货之后再点击"确认"',["取消","确定"],function(){
		var Url = [
		   		basePath+"/data/purchase/wechat/update_status_purchase/",
		   		"?updateType=04&_method=put"
		   	];
		   	$.ajax({
		   		url: Url[0]+id+Url[1],
		   		type: 'post',
		   		dataType:"json",
		   		success: function( response ) {
		   			if(response.status == "0"){
		   				 textLog("操作成功！");
		   				 GetDataFromInterFace(OrderInterFaceToUrl(0));
		   			}else{
		   				textLog("操作失败！");
		   			}
		   		}
		   	});
	});
	
}

//签署合同
function signContact(visaNo){
	
	$.ajax({
		url: basePath+"/data/order/signContact.do?applyNo="+visaNo,
		type: 'get',
		dataType:"json",
		success: function( response ) {
			if(response.status == "0"){
				// textLog("操作成功！");
				 window.location.href=response.data.url;
			}else{
				textLog("操作失败！");
			}
		}
	});
	
}


function orderElement(data_i){
	var category = "order";
	if(data_i["orderType"] == "代购"){
		category = "purchase";
	}
	
	data_i["orderId"]
	var orderInfo = "{\"orderId\":"+data_i["orderNo"]+",\"goodsNotes\":\""+myencodeURI(data_i["goodsNotes"])+"\",\"amount\":"+data_i["firstPayment"]+"}";
	var src = "pay.html?orderInfo="+orderInfo;
	var afSaInfo = "{\"purchaseId\":"+data_i["orderId"]+",\"assType\":\""+myencodeURI(data_i["orderType"])+"\",\"assGoodsName\":\""+myencodeURI(data_i["goodsNotes"])+"\",\"assGoodsUrl\":\""+myencodeURI(data_i["purchaseGoodsUrl"])+"\",\"channelId\":"+data_i["channelId"]+",\"assGoodsImage\":\""+myencodeURI(data_i["goodsImage"])+"\"}"
	var afSrc = "afterSaleApply.html?afSaInfo="+afSaInfo;
	return '<div class="item">'+
			'<div class="content_box">'+
			'<div class="content_box_title">'+
			'<div class="content_box_title_left">'+
			'<span style="color:#c4000e;font-size:1.1rem;font-weight: bold;">JD</span>'+
			'<span style="font-size:1.16rem;">京东</span>'+
			((data_i["orderType"] == "代购")?('<img src="img/dai.png" style="width:1.33rem;margin-top:0.01rem;"/>'):(''))+
			'</div>'+
			'<div class="content_box_title_right">'+data_i["strOrderStatus"]+'</div>'+
			'</div>'+
			'<a href="order_details.html?category='+category+'&order_id='+data_i["orderId"]+'"><div class="aaa">'+
			'<div class="aaa_left"><img src="'+data_i["goodsImage"]+'" style="width:4.16rem;"/></div>'+
			'<div class="aaa_right">'+data_i["goodsNotes"]+'</div>'+
			'</div></a>'+
			'<div class="bbb">'+
			'<span>商品总额：</span><span>￥'+data_i["amount"]+'</span>'+
			'</div>'+
			'<div class="ccc">'+
			'<div class="ccc_left"><span style="font-size:1rem;">首付：￥</span><span style="font-size:1.25rem;">'+data_i["firstPayment"]+'</span></div>'+
			'<div class="ccc_right"><span style="font-size:1rem;">分期金额：￥</span><span style="font-size:1.25rem;">'+data_i["stagesMoney"]+'</span></div>'+
			'</div>'+
			'<div class="ddd">'+
				'<div class="ddd_left">分期数：'+data_i["periods"]+'期</div>'+
				'<div class="ddd_right">每期还款：￥<span style="font-size:1.25rem;">'+data_i["monthRepayment"]+'</span></div>'+
			'</div>'+
			'<div class="eee">'+
				(((data_i["orderType"] != "代购")&&(data_i["strOrderStatus"] == "待审核"))?(''):(''))+
				(((data_i["orderType"] != "代购")&&(data_i["strOrderStatus"] == "待签署"))?('<div class="eee_signature_Button defaultButton"><div style="margin-top:0.33rem;"><a href="javascript:;" onclick="signContact(\''+data_i.visaNo+'\')">签署合同</a></div></div>'):(''))+
				(((data_i["orderType"] != "代购")&&(data_i["strOrderStatus"] == "待首付"))?('<div class="eee_signature_Button defaultButton"><div style="margin-top:0.33rem;">支付首付</div></div>'):(''))+
				(((data_i["orderType"] != "代购")&&(data_i["strOrderStatus"] == "待收货"))?(' '):(''))+
				(((data_i["orderType"] != "代购")&&(data_i["strOrderStatus"] == "已完成"))?(' '):(''))+
				(((data_i["orderType"] == "代购")&&(data_i["strOrderStatus"] == "待审核"))?('<div class="eee_cancel_Button defaultButton"><div style="margin-top:0.33rem;"><a href="#" onclick="cancel_order(\'01\',\''+data_i["orderId"]+'\')">取消订单</a></div></div>'):(''))+
				(((data_i["orderType"] == "代购")&&(data_i["strOrderStatus"] == "待签署"))?('<div class="eee_signature_Button defaultButton">'+
					'<div style="margin-top:0.33rem;"><a href="javascript:;" onclick="signContact(\''+data_i.visaNo+'\')">签署合同</a></div>'+
					'</div>'+
					'<div class="eee_cancel_Button defaultButton">'+
					'<div style="margin-top:0.33rem;"><a href="#" onclick="cancel_order(\'02\',\''+data_i["orderId"]+'\')">取消订单</a></div>'+
					'</div>'):(''))+
				(((data_i["orderType"] == "代购")&&(data_i["strOrderStatus"] == "待首付"))?('<div class="eee_signature_Button defaultButton">'+
					'<div style="margin-top:0.33rem;"><a href='+src+' >支付首付</a></div>'+
					'</div>'+
					'<div class="eee_cancel_Button defaultButton">'+
					'<div style="margin-top:0.33rem;"><a href="#" onclick="cancel_order(\'02\',\''+data_i["orderId"]+'\')">取消订单</a></div>'+
					'</div>'):(''))+
				(((data_i["orderType"] == "代购")&&(data_i["strOrderStatus"] == "待收货"))?( 
					'<div class="eee_cancel_Button defaultButton">'+
					'<div style="margin-top:0.33rem;"><a href="#" onclick="confirmButton(\''+data_i["orderId"]+'\')">确认收货</a></div>'+
					'</div>'):(''))+
				(((data_i["orderType"] == "代购")&&(data_i["strOrderStatus"] == "已完成"))?( 
					'<div class="eee_cancel_Button defaultButton">'+
					'<div style="margin-top:0.33rem;"><a href='+afSrc+'>退换货</a></div>'+
					'</div>'):(''))+
			'</div>'+
			'</div>'+
			'</div>';
}
$(document).ready(function(){
	$(window).load(function(){
		$(".fixboxmenuButton").removeClass("fixboxmenuUnderLine");
		switch(GetQueryString("order_page")){
			case "01":
				$("#fixboxmenuButton_01").addClass("fixboxmenuUnderLine");
				OrderInterFace["path"] = "/data/purchase/wechat/";
				OrderInterFace["interface"] = "purchase_list";
				OrderInterFace["selectType"] = "01";
				OrderInterFace["rows"] = 10;
				OrderInterFace["page"] = 1;
				GetDataFromInterFace(OrderInterFaceToUrl(0));
			break;
			case "02":
				$("#fixboxmenuButton_02").addClass("fixboxmenuUnderLine");
				OrderInterFace["path"] = "/data/purchase/wechat/";
				OrderInterFace["interface"] = "purchase_list";
				OrderInterFace["selectType"] = "02";
				OrderInterFace["rows"] = 10;
				OrderInterFace["page"] = 1;
				GetDataFromInterFace(OrderInterFaceToUrl(0));
			break;
			case "03":
				$("#fixboxmenuButton_03").addClass("fixboxmenuUnderLine");
				OrderInterFace["path"] = "/data/purchase/wechat/";
				OrderInterFace["interface"] = "purchase_list";
				OrderInterFace["selectType"] = "03";
				OrderInterFace["rows"] = 10;
				OrderInterFace["page"] = 1;
				GetDataFromInterFace(OrderInterFaceToUrl(0));
			break;
			case "04":
				$("#fixboxmenuButton_04").addClass("fixboxmenuUnderLine");
				OrderInterFace["path"] = "/data/purchase/wechat/";
				OrderInterFace["interface"] = "purchase_list";
				OrderInterFace["selectType"] = "04";
				OrderInterFace["rows"] = 10;
				OrderInterFace["page"] = 1;
				GetDataFromInterFace(OrderInterFaceToUrl(0));
			break;
			
			case "05":
			    $("#fixboxmenuButton_05").addClass("fixboxmenuUnderLine");
			    OrderInterFace["path"] = "/data/purchase/wechat/";
				OrderInterFace["interface"] = "purchase_list";
				OrderInterFace["selectType"] = "06";
				OrderInterFace["rows"] = 10;
				OrderInterFace["page"] = 1;
				GetDataFromInterFace(OrderInterFaceToUrl(0));
			break;
			
			default:$("#fixboxmenuButton_01").addClass("fixboxmenuUnderLine");
		}
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
				url: OrderInterFaceToUrl(0),
				dataType: 'json',
				success: function(data){
					console.log(data);
					var result = '';
					for(var i = 0; i < data.data.length; i++){
						result += orderElement(data.data[i]);
					}
					// 为了测试，延迟1秒加载
					setTimeout(function(){
						$('.lists').html('');
						$('.lists').prepend(result);
						me.resetload();
					},1000);
				},
				error: function(xhr, type){
					textLog("加载失败！");
					me.resetload();
				}
			});
		},
		loadDownFn : function(me){
			$.ajax({
				type: 'GET',
				url: OrderInterFaceToUrl(1),
				dataType: 'json',
				success: function(data){
					console.log(data);
					var result = '';
					for(var i = 0; i < data.data.length; i++){
						result += orderElement(data.data[i]);
					}
					// 为了测试，延迟1秒加载
					setTimeout(function(){
						$('.lists').append(result);
						me.resetload();
					},1000);
				},
				error: function(xhr, type){
					textLog("加载失败！");
					me.resetload();
				}
			});
		}
	});
	
	

	$("#fixboxmenuButton_01").click(function(){
		$(".fixboxmenuButton").removeClass("fixboxmenuUnderLine");
		$(this).addClass("fixboxmenuUnderLine");
		OrderInterFace["path"] = "/data/purchase/wechat/";
		OrderInterFace["interface"] = "purchase_list";
		OrderInterFace["selectType"] = "01";
		OrderInterFace["rows"] = 10;
		OrderInterFace["page"] = 1;
		GetDataFromInterFace(OrderInterFaceToUrl(0));
	});

	$("#fixboxmenuButton_02").click(function(){
		$(".fixboxmenuButton").removeClass("fixboxmenuUnderLine");
		$(this).addClass("fixboxmenuUnderLine");
		OrderInterFace["path"] = "/data/purchase/wechat/";
		OrderInterFace["interface"] = "purchase_list";
		OrderInterFace["selectType"] = "02";
		OrderInterFace["rows"] = 10;
		OrderInterFace["page"] = 1;
		GetDataFromInterFace(OrderInterFaceToUrl(0));
	});

	$("#fixboxmenuButton_03").click(function(){
		$(".fixboxmenuButton").removeClass("fixboxmenuUnderLine");
		$(this).addClass("fixboxmenuUnderLine");
		OrderInterFace["path"] = "/data/purchase/wechat/";
		OrderInterFace["interface"] = "purchase_list";
		OrderInterFace["selectType"] = "03";
		OrderInterFace["rows"] = 10;
		OrderInterFace["page"] = 1;
		GetDataFromInterFace(OrderInterFaceToUrl(0));
	});

	$("#fixboxmenuButton_04").click(function(){
		$(".fixboxmenuButton").removeClass("fixboxmenuUnderLine");
		$(this).addClass("fixboxmenuUnderLine");
		OrderInterFace["path"] = "/data/purchase/wechat/";
		OrderInterFace["interface"] = "purchase_list";
		OrderInterFace["selectType"] = "04";
		OrderInterFace["rows"] = 10;
		OrderInterFace["page"] = 1;
		GetDataFromInterFace(OrderInterFaceToUrl(0));
	});

	$("#fixboxmenuButton_05").click(function(){
		$(".fixboxmenuButton").removeClass("fixboxmenuUnderLine");
		$(this).addClass("fixboxmenuUnderLine");
		OrderInterFace["path"] = "/data/purchase/wechat/";
		OrderInterFace["interface"] = "purchase_list";
		OrderInterFace["selectType"] = "06";
		OrderInterFace["rows"] = 10;
		OrderInterFace["page"] = 1;
		GetDataFromInterFace(OrderInterFaceToUrl(0));
	});

});

function myencodeURI(str){
	 return  encodeURIComponent(encodeURIComponent(str));
}
