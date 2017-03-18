$(document).ready(function(){
	var root = 'https://jsonplaceholder.typicode.com';

$.ajax({
  url: root + '/posts',
  method: 'GET'
}).then(function(data) {

	$(data).slice(0,10).each(function(i,item){
		 $("#timeline").prepend("<div class='post panel panel-default'>"
			+"<div class='btn-group'>"+
			"<button type='button' class='dropdown-toggle' data-toggle='dropdown'>"+
			"<i class='fa fa-chevron-down'>"+"</i>"+"</button>"+
			"<ul class='dropdown-menu' role='menu'>"+
				"<li class='modify '> Chỉnh sửa</li>"+
				"<li class='confirm'> Xóa</li>"+
			"</ul>"+
			"</div>"
			+"<img class='user' src='"+	$(".user").attr("src")+"'><a> User</a>"+item.id+
			"<div class='_status'>"+item.body+"</div>"
			 +"</div>");
		
		});

	var dataLength = $(data).length;

	if(dataLength%10==0){
		for(var num = 1; num<=dataLength/10;num++){
		var page ="";
				page+='<li ><a class="page" >'+num+'</a></li>';
				$("#timeline").append('<ul class=pagination>'+page+'</ul>');
				$(".page").first().parent().addClass("active");
	}}
	else{
		for(var num = 1; num<=dataLength/10+1;num++){
		var page ="";
				page+='<li ><a class="page" >'+num+'</a></li>';
				$("#timeline").append('<ul class=pagination>'+page+'</ul>');
				$(".page").first().parent().addClass("active");
	}
	}
	
	$(document).on("click",".page", function(){
		$(".page").parent().removeClass("active");
		$(this).parent().addClass("active");
		

		var numpage= parseFloat($(this).html())
		$(data).slice((numpage-1)*10,numpage*10).each(function(i,item){
		 $("#timeline").prepend("<div class='post panel panel-default'>"
			+"<div class='btn-group'>"+
			"<button type='button' class='dropdown-toggle' data-toggle='dropdown'>"+
			"<i class='fa fa-chevron-down'>"+"</i>"+"</button>"+
			"<ul class='dropdown-menu' role='menu'>"+
				"<li class='modify '> Chỉnh sửa</li>"+
				"<li class='confirm'> Xóa</li>"+
			"</ul>"+
			"</div>"
			+"<img class='user' src='"+	$(".user").attr("src")+"'><a> User</a>"+item.id+
			"<div class='_status'>"+item.body+"</div>"
			 +"</div>");
		
		});
		$(".post").slice(10).hide();
	})

});

	$(".avatar").hover(function() {
	$(".changeAvatar").show();
	},
	function(){
	$(".changeAvatar").hide();
	});
$("#changeAvatar").click(function(){
	});
	$(".changeAvatar").click(function(){
		$("#changeAvatar").click();
	});
$(document).on("change","#changeAvatar",function(){
	$(".user").attr("src",$(this).val().replace("C:\\fakepath\\", "images\\"));
})

		$("#uploadimg").click(function(){
	});
	$(".upload").click(function(){
		$("#uploadimg").click();
	});
	$("#uploadimg").change(function(){
		$(".load").append("<div class='imageLoad'>"+"<img>"+"</div");
		$(".imageLoad>img:last-child").attr("src",$(this).val().replace("C:\\fakepath\\", "images\\"));
		$(".imageLoad:last-child").append("<button type='button' class='removeImg'>"+"<i class='fa fa-times'>"+"</i>"+"</button>");
		$("#uploadimg").val("");
	});
	$(document).on("click",".removeImg",function(){
		$(this).prev().remove();
		$(this).remove()
	});
	$("#btnSub").click(function(){
		var img="";
		if($("#status").val() !=="" || $(".imageLoad img").length>0){
		$(".imageLoad img").each(function() {
				var img_src = $(this);
				img += "<div class='box'> <img src='"+img_src.attr("src")+"'/></div>";
		});
		$("#timeline").prepend("<div class='post panel panel-default '>"
			+"<div class='btn-group'>"+
			"<button type='button' class='dropdown-toggle' data-toggle='dropdown'>"+
			"<i class='fa fa-chevron-down'>"+"</i>"+"</button>"+
			"<ul class='dropdown-menu' role='menu'>"+
				"<li class='modify '> Chỉnh sửa</li>"+
				"<li class='confirm'> Xóa</li>"+
			"</ul>"+
			"</div>"
			+"<img class='user' src='"+	$(".user").attr("src")+"'><a>  User</a>"+
			"<div class='_status'>"+$("#status").val()+"</div>"+"<div class='containerimg'>"+img+"</div>"+"</div>");	
			$("#boxImage").prepend("<div class='containerimg'>"+img+"</div>");	
			$("#boxImage .box").slice(4).hide()
		
	}
		$("#status").val("");
		$(".imageLoad").remove();
		img="";
	});
	$(document).on("click",".confirm",function(){
		var el = $(this).parents('.post').find('._status')
		el.before("<div class='deleteTag' class='panel panel-default'>"
	 +"<div class='panel-heading' style='background-color: #f6f7f9'>Xóa bài viết</div>"
	 +"<div class='panel-body'>"+
	  	"<p>"+
	  		"Bài viết này sẽ bị xóa và bạn sẽ không thể tìm thấy nữa"+
	  	"</p>"+
	 "</div>"+
	 "<div class='panel-footer'>"+
	 "<button id='cancel' class='btn btn-default' type='button'>Hủy</button>"+
	 "<button id='ok' class='btn btn-default'>OK</button>"+
	 "</div>"+
	"</div> ");
		$(".deleteTag").fadeIn();
			
		});
$(document).on("click","#ok",function() {
		$(this).parents('.post').find(".box img").each(function(){
		var src = $(this).attr("src");
		$("#boxImage .box img").each(function(){
		if($(this).attr("src")==src){
			$(this).parent().remove();	
		}
		});	
		});
	var boxLength = $("#boxImage .box").length;
	if(boxLength>=4){
		$("#boxImage .box").slice(0,4).show()
	}
	else{
		$("#boxImage .box").slice(0).show()
	}	
		
	$(this).parents(".post").remove();
	
	$(".deleteTag").fadeOut();
		});
$(document).on("click","#cancel",function(){
	$(".deleteTag").fadeOut();
});

$(document).on("click",".modify",function(){
	var el = $(this).parents('.post').find('._status')
	el.hide();

	el.before(" <textarea class='statusNew form-control' rows='2' placeholder='Bạn đang nghĩ gì?' ></textarea>"

		+" <button class='update btn btn-default' >Update</button>"
		);
	$(this).parents('.post').find(".statusNew").val(el.html());
	
});
$(document).on("click",".update",function(){
	$(this).next().html($(this).prev().val()).show();
	$(this).siblings("textarea").remove();
	$(this).remove()

});

});
	


	


