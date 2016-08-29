$(function(){
	$("input").focus(function(){
		var This = $(this);
		if(This.val() != ""){
			This.siblings(".iDele").show();
		}
		This.keyup(function(){
			if(This.val() != ""){
				This.siblings(".iDele").show();
			}else{
				This.siblings(".iDele").hide();
			}
		});
		
		var bot = This.offset().top + This.height();
		var windH = $(window).height();
		if(bot > windH){
			$(window).scrollTop(bot-windH);
		}
	});
	
	$("input").blur(function(){
		var This = $(this);
		setTimeout(function(){
			This.siblings(".iDele").hide();
		},300)
	});
	
	$("textarea").focus(function(){
		var bot = $(this).offset().top + $(this).height();
		var windH = $(window).height();
		if(bot > windH){
			$(window).scrollTop(bot-windH);
		}
	});
})

function iDele(obj){
	$(obj).siblings("input").val("");
}

function iOpen(obj){
	var src = $(obj).children().attr("src");
	if(src == "images/close.png"){
		$(obj).children().attr("src","images/open.png");
		$(obj).siblings(".iOpen").val($(obj).siblings(".iClose").val());
		$(obj).siblings(".iClose").css("display","none");
		$(obj).siblings(".iOpen").css("display","block");
	}else{
		$(obj).children().attr("src","images/close.png");
		$(obj).siblings(".iClose").val($(obj).siblings(".iOpen").val());
		$(obj).siblings(".iClose").css("display","block");
		$(obj).siblings(".iOpen").css("display","none");
	}
}