getJsApiconfig();

var imgObj ;
wx.ready(function(){
	$(".imgcont img").click(function(){
		wxChooseImage();
		imgObj = this;
	});
	
});

//选择图片
var images = {
	localId : [],
	serverId : []
};
function wxChooseImage() {
	wx.chooseImage({
		count: 1,
		success : function(res) {
			images.localId = res.localIds;
			setTimeout(uploadImg, 100);
		}
	});
}

//上传图片

function uploadImg() {
	if (images.localId.length == 0) {
		textLog('请先选择图片');
		return;
	}
	var i = 0, length = 1;//目前默认选中第一张   images.localId.length;
	images.serverId = [];
	function upload() {
		wx.uploadImage({
			localId : images.localId[i],
			success : function(res) {
				i++;
				//下载图片
				showImg(res.serverId);
				if (i < length) {
					upload();
				}
			},
			fail : function(res) {
				textLog("上传图片失败");
			}
		});
	}
	upload();
}
;

//下载微信图片，实现预览
function showImg(serverId) {
	//加载中样式
	var data = {};
	data.serverId = serverId;
	$.ajax({
		type : "get",
		async : true,
		url : basePath+"/wechatuser/downWxImg.do",
		data : data,
		dataType : 'json',
		error : function() {
			textLog("网络出错啦！");
		},
		success : function(res) {
			//res.data.imgPath = "/images/linghuofenqi.png";
			res.data.imgPath = staticPath+res.data.imgPath;
			if (res.status == '0') {
				setTimeout(function(){
					$(imgObj).attr("src",res.data.imgPath);
				},1500);
				imageServerId = serverId;//当前上传成功的图片；
			} else {
				textLog("上传图片失败，请重试！");
			}
		}
	});
}




$(document).ready(function(){
	$(".uploadButton").click(function(){
		
		var goodsName = decodeURIComponent(GetQueryString("goodsName"));
		var assGoodsUrl = GetQueryString("goodsUrl");
		var upload_data = {
				'purchaseId':GetQueryString("id"),
				'assReason':$("#inputTextE").val(),
				'assGoodsName':goodsName,
				'assGoodsUrl':assGoodsUrl,
				'channelId': GetQueryString("channelId")
		};
		upload_data['asstype'] = $('input:radio[name=btype]:checked').val();
		var picture = '';
		$(".imgcont img").each(function(index){
			if($(this).attr("src")!='img/fafrger.png'){
				picture = picture + $(this).attr("src")+",";
			}
		});
		upload_data['assPicture'] = picture;
//		alert(JSON.stringify(upload_data));return;
		$.ajax({
			type: 'PUT',
			url: basePath+"/wechat/wechatuser/wxApplyReturnGoods.do",
			data: upload_data,
			success: function(data){
				if(data.status=='0'){
					textLog("操作成功！");
					window.location.href=basePath+"/order_all.html";
				}else{
					textLog("操作失败！");
				}
			},error:function(err){
				textLog(JSON.stringify(err));
			},
			dataType: "json"
		});
		
	});
	
});