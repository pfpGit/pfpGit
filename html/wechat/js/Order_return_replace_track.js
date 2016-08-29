/*
10.5.1.  http请求方式：GET （请使用http协议）
http://dev.home.maimaiti.cn/data/purchase/wechat/purchase_list?selectType=05&rows=&page=

*/

var interface_url = {
	"host": basePath,
	"path": "/wechatuser/wxReturnGoodsList.do",
	"selectType" : "05",
	"rows" : 10,
	"page" : 1,
	"url":""
};
function InterFaceToUrl(){
	interface_url["url"] = interface_url["host"];
	interface_url["url"] = interface_url["url"] + interface_url["path"];
	interface_url["url"] = interface_url["url"] + "?selectType=" + interface_url["selectType"];
	interface_url["url"] = interface_url["url"] + "&rows=" + interface_url["rows"];
	interface_url["url"] = interface_url["url"] + "&page=" + interface_url["page"];
	return interface_url["url"];
}

function cancel_return(type,orderId){
	
	$.ajax({
		url: basePath+"/data/purchase/wechat/update_status_purchase/"+orderId+"?updateType="+type+"&_method=put",
		type: 'post',
		dataType:"json",
		success: function( response ) {
			if(response.status == "0"){
				 textLog("操作成功！");
			}
			GetDataFromInterFace(InterFaceToUrl());
		}
	});
}

function GetDataFromInterFace(InterFaceUrl) {
	$.ajax({
		type: 'GET',
		url: InterFaceUrl,
		dataType: 'json',
		success: function(data){
			var result = '';
			console.log(data);
			if (data.status == "0") {
				for(var i = 0; i < data.data.length; i++){
					console.log(data.data[i]);
					result += '<div class="item">'+
					'<div class="content_box">'+
					'<div class="content_box_title">'+
					'<div class="content_box_title_left">'+
					'<span style="color:#c4000e;font-size:1.1rem;font-weight: bold;">JD</span>'+
					'<span style="font-size:1.16rem;">京东</span>'+
					'<img src="img/dai.png" style="width:1.33rem;margin-top:0.01rem;"></div>'+
					'<div class="content_box_title_right">退货申请中</div>'+
					'</div>'+
					'<div class="aaa">'+
					'<div class="aaa_left"><img src="'+data.data[i]['goodsImage']+'" style="width:4.16rem;"></div>'+
					'<div class="aaa_right">'+data.data[i]['goodsNotes']+'</div>'+
					'</div>'+
					'<div class="ccc">'+
					'<div class="ccc_left"><span style="font-size:1rem;">退款金额：￥</span><span style="font-size:1.25rem;">12000.00</span></div>'+
					'<div class="ccc_right"><span style="font-size:1rem;">金额金额：￥</span><span style="font-size:1.25rem;">21499.00</span></div>'+
					'</div>'+
					'<div class="eee">'+
					'<div class="eee_signature_Button defaultButton">'+
					//'<div style="margin-top:0.33rem;" id="查看物流"></div>'+
					'</div>'+
					'<div class="eee_cancel_Button defaultButton">'+
					'<div style="margin-top:0.33rem;"><a href="#" onclick="cancel_return(\'05\',\''+data.data[i]["orderId"]+'\')">取消退货</a></div>'+
					'</div>'+
					'</div>'+
					'</div>'+
					'</div>';
				}
			}

			// 为了测试，延迟1秒加载
			setTimeout(function(){
				$('#listsContent').html('');
				$('#listsContent').prepend(result);
			},800);
		},
		error: function(xhr, type){
			alert('Ajax error!');
		}
	});
}

$(document).ready(function(){
	$(window).load(function(){
		GetDataFromInterFace(InterFaceToUrl());
	});
	
	
});