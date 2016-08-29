
//var basePath = "http://www.maimaiti.cn/wechat";//因为开发环境没有外网，所以通过该路径进行映射，路径中必须包含“/wechat”,否则不会映射到开发环境
//var basePath = "https://www.maimaiti.cn";
var basePath = "http://m.maimaiti.cn";
var homePath = "https://uat.maimaiti.cn";
//var homePath = "http://www.maimaiti.cn";
//var host_url = "http://www.maimaiti.cn";
var staticPath = "https://uat.maimaiti.cn/static";

function GetQueryString(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}

//=====================微信jssdk 配置============================
function getJsApiconfig(){
	//加载中样式
	var data= {};
	data.url = window.location.href;
	$.ajax({
		type: "post",
	   	async: true,
	   	data:data,
	   	url: basePath+"/wechatuser/getJsApiConfig.do",
	  	dataType: 'json',
	  	timeout:30000,
	  	error: function()
	  	{	
	  		textLog("页面加载错误，请刷新");
	  	},
		success: function(res){
			if (res.status == "0")
			{	 
				wx.config({
				    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				    appId: res.data.appId, // 必填，公众号的唯一标识
				    timestamp: ""+res.data.timestamp,
				    nonceStr: res.data.nonceStr,
				    signature: res.data.signature,
				    jsApiList: [
				                'checkJsApi',
				                'onMenuShareTimeline',
				                'onMenuShareAppMessage',
				                'onMenuShareQQ',
				                'onMenuShareWeibo',
				                'hideMenuItems',
				                'showMenuItems',
				                'hideAllNonBaseMenuItem',
				                'showAllNonBaseMenuItem',
				                'translateVoice',
				                'startRecord',
				                'stopRecord',
				                'onRecordEnd',
				                'playVoice',
				                'pauseVoice',
				                'stopVoice',
				                'uploadVoice',
				                'downloadVoice',
				                'chooseImage',
				                'previewImage',
				                'uploadImage',
				                'downloadImage',
				                'getNetworkType',
				                'openLocation',
				                'getLocation',
				                'hideOptionMenu',
				                'showOptionMenu',
				                'closeWindow',
				                'scanQRCode',
				                'chooseWXPay',
				                'openProductSpecificView',
				                'addCard',
				                'chooseCard',
				                'openCard'
				    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
			} else{
				textLog("页面加载失败，请刷新");
			}
		}
	});
}
//======================微信 jssdk end=========================


//消息提示框
function textLog(str){
	String.prototype.len = function(){
		return this.replace(/[^\x00-\xff]/g, "xx").length;
	}
	var textDiv = "<div class='alert'><div class='bg'></div><div class='alerCon'>"+str+"</div></div>";
	$(textDiv).appendTo("body");
	var len = str.len() + 8;
	$(".bg").height($(window).height());
	var height = -$(".alerCon").height()/2;
	$(".alerCon").css({"margin-left":-(len/2)*0.6+"rem","margin-top":height});
	setTimeout(function(){
		$(".alert").fadeOut(500);
	},1500);
	setTimeout(function(){
		$(".alert").remove();
	},2000);
}

//消息确认提示框
function conFirm(title,con,arr,fun){
	var conFirm = "<div class='confirm'><div class='conBg'></div><div class='conCon'><div class='conTile'>"+title+"</div><p>"+con+"</p><div class='conA'></div></div></div>";
	$(conFirm).appendTo("body");
	$(".conBg").height($(window).height());
	var height = -($(".conCon").height() + parseFloat($(".conCon").css("padding-top")))/2;
	console.log(height);
	$(".conCon").css("margin-top",height);
	if(arr.length == 1){
		var a = "<a href='javascript:' onClick='conClose()'>"+arr[0]+"</a>";
		$(a).appendTo(".conA");
		$(".conA a").width($(".conCon").width());
		$(".conA a").css({"border-bottom-left-radius":"0.25rem", "border-bottom-right-radius":"0.25rem"});
	}else{
		var a = "<a href='javascript:' onClick='conClose()' style='border-bottom-left-radius:0.25rem'>"+arr[0]+"</a><a href='javascript:' onClick='conClose()' style='border-bottom-right-radius:0.25rem'>"+arr[1]+"</a>";
		$(a).appendTo(".conA");
		$(".conA a").width($(".conCon").width()/2);
	}
	$(".conA a:last").bind("click",fun);
}

function conClose(){
	$(".confirm").fadeOut(400);
	setTimeout(function(){
		$(".confirm").remove();
	},500);
}

//时间格式化  例子var time1 = new Date(1462413639233).Format("yyyy-MM-dd hh:mm:ss"); alert(time1);
function myDate(date){
	if(date==null||date==undefined||date=='null'){
		return "";
	}
	return new Date(date).Format("yyyy-MM-dd hh:mm:ss");
}
Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

//判断是否登录
function isLogin(data){
	if(data.status == 3){
		var url = location.href;
		location.href = "login.html?url="+url;
	}
}

//截取url后面的json对象
function GetRequest(){
	var url = location.search;
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++){
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
} 
function toDecimal(x) {  
    var f = parseFloat(x);  
    if (isNaN(f)) {  
        return;  
    }  
    f = Math.round(x*100)/100;  
    return f;  
}  


//加载动画
function loading(){
	var documentH ,//文档高度
	winH , 		   //窗口高度
	loadingHtml;	//结构
	documentH = $(document).height();
	winH = $(window).height();
	loadingHtml = '<div id="loadingMask" class="p-loading-mask"><img id="loadingGif" class="p-loading-gif" src="'+ staticPath +'/images/loading-gray.gif"/></div>';
	
	$("body").append(loadingHtml);
	//mask样式
	$('#loadingMask').css({
		"width":"100%",
		"text-align":"center",
		"background":"rgba(0,0,0,.7)",
		"filter":"progid:DXImageTransform.Microsoft.gradient(startColorstr=#B2000000,endColorstr=#B2000000)",
		"position":"fixed",
		"top":"0",
		"left":"0",
		"bottom":"0",
		"z-index":"9999",
		"zoom":"1"});
	//gif样式
	$('#loadingGif').css({
		"position":"absolute",
		"top":"50%",
		"left":"50%",
	});
	
}
//加载完去掉动画
function removeLoading(){
	$('#loadingMask').remove();
}


(function($) {
	//备份jquery的ajax方法     
	var _ajax = $.ajax;
	//重写jquery的ajax方法     
	$.ajax = function(opt) {
		//备份opt中error和success方法     
		var fn = {
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			},
			success : function(data, textStatus) {
			}
		}
		if (opt.error) {
			fn.error = opt.error;
		}
		if (opt.success) {
			fn.success = opt.success;
		}
		if(opt.loading){
			loading();
		}
		//扩展增强处理     
		var _opt = $.extend(opt, {
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				//错误方法增强处理     
				fn.error(XMLHttpRequest, textStatus, errorThrown);
			},
			success : function(data, textStatus) {
				//成功回调方法增强处理     
				fn.success(data, textStatus);
			},
			complete : function(httpRequest, status){ 
				//统一的结束状态显示 
				if(opt.loading){
					removeLoading();
				}
			}
		});
		_ajax(_opt);
	};
})(jQuery);
