/*$(function (){*/
var page = 0;
window.onload=function loadSearchCourse(page){
	var new_element=document.createElement("script");
	 new_element.setAttribute("type","text/javascript");
	 new_element.setAttribute("src","layer/layer.js");
	 document.body.appendChild(new_element);
	/*$('#itemTitles').click(function loadSearchCourse(page){*/
		var titleBoxPage = 1;
		$('#itemTitleBox').html("");
		$.ajax({
			url:"/gm/getItemTitleCount",
			type:'get',	
			success:function(result){
				var countNum = result;
				str = "";
				if(result == 0){
					$('#itemTitleBox').html("");
					str += "<tr>";
					str += '<p style="text-align:center"><b>未找到护眼大队玩家</b></p>';                  
					str += "</tr>";
				} else {
					var sendPage = 1;
					if(page > sendPage){
						sendPage = page;
						titleBoxPage = page;
					} 
					if(page == 1){
						titleBoxPage = 1;
					}
					$.ajax({
						url:"/gm/getItemTitlePlayer",
						type:'get',
						data:{
							page:sendPage,
							count:result
						},
						dataType:"json",
						success:function(result){
							$('#itemTitleBox').html("");
							var str = "";
							if(result==null){
								str += "<tr>" ;
								str += '<p style="text-align:center"><b>未找到护眼大队玩家</b></p>';                  
								str += "</tr>";
							} else {
								str +=  '<table class="table table-hover">';
								str +=  '<caption><h4 style="text-align:center">护眼大队玩家如下</h4></caption>';
								str +=  '<thead>';
								str +=  '<tr>';
								str +=  "<th>角色ID</th>";   
								str +=  "<th>昵称</th>"; 
								str +=  "<th>性别</th>";
								str +=  "<th>粉丝数</th>";
								str +=  "<th>关注数</th>";
								str +=  "<th>热评数</th>";
								str +=  '</tr>';
								str +=  '</thead>';
								str += "<tbody>";
								for (i in result) {  
								 str += "<tr>";
								 str += "<td> " + result[i].roleId + "</td>";
								 str += "<td> " + result[i].nickName + "</td>";
								if(result[i].sex == 1){
									 str += "<td>男</td>";
								}else {
									 str += "<td>女</td>";
								}
								str += "<td> " + result[i].fansCount + "</td>";
								str += "<td> " + result[i].attentionCount + "</td>";
								str += "<td> " + result[i].hotDiscussCount + "</td>";
								str += "</tr>";
								}
								str += "</tbody>";
								str += "</table>";
								str +='<div id="myPage" class="Cpage"></div><br/><br/><br/>';
								str += "<div class='top'>";
								str += 	"<a href='#top' target='_self' id='topArrow'></a>";
								str += "</div>";
								$(document).ready(function(){
									$("#myPage").sPage({
									    page:titleBoxPage,//当前页码，必填
									    total:countNum,//数据总条数，必填
									    pageSize:50,//每页显示多少条数据，默认10条
									    totalTxt:"共{total}条",//数据总条数文字描述，{total}为占位符，默认"共{total}条"
									    showTotal:true,//是否显示总条数，默认关闭：false
									    showSkip:true,//是否显示跳页，默认关闭：false
									    showPN:true,//是否显示上下翻页，默认开启：true
									    prevPage:"上一页",//上翻页文字描述，默认“上一页”
									    nextPage:"下一页",//下翻页文字描述，默认“下一页”
									    backFun:function(page){
									        //点击分页按钮回调函数，返回当前页码
									       loadSearchCourse(page);
									    }
									});
								})
							}
							itemTitleBox.innerHTML = str;
						}
					})
				}
			}
		});
/*	});*/
	$('#byIdItemTitle').click(function(page){
		var roleId = document.getElementById('assignData').value;
		var posPattern = /^\d*\.?\d+$/;
		if(roleId == null || roleId =="" || !posPattern.test(roleId)){
			$("#assignData").val("");
			layer.msg('请输入正确的ID');
			return;
		}
		layer.confirm("确定要设置此玩家为护眼大队吗?",{
		    title: false,
		    btn: ['确定设置','取消']
		},function(){
		    $.ajax({
			url:"/gm/setByIdItemTitle/"+roleId+"",
			type:'get',	
			success:function(result){
				if(result == 0){
					layer.msg("设置失败");
					setTimeout(function(){window.location.reload();},2000);
				} else if(result == 1){
					layer.msg("设置成功");
					setTimeout(function(){window.location.reload();},2000);
				} else {
					layer.msg("没有找到该玩家");
					setTimeout(function(){window.location.reload();},2000);
				}
			}
		});
		});
	});
	$('#byPhoneItemTitle').click(function(page){
		var phone = document.getElementById('assignData').value;
		var posPattern=/^[1][3,4,5,6,7,8][0-9]{9}$/;
		if(phone == null || phone =="" || !posPattern.test(phone)){
			$("#assignData").val("");
			layer.msg('请输入正确的手机号码');
			return;
		}
		layer.confirm("确定要设置此玩家为护眼大队吗?",{
		    title: false,
		    btn: ['确定设置','取消']
		},function(){
			$.ajax({
				url:"/gm/setByPhoneItemTitle/"+phone+"",
				type:'get',	
				success:function(result){
					if(result == 0){
						layer.msg("设置失败");
						setTimeout(function(){window.location.reload();},2000);
					} else if(result == 1){
						layer.msg("设置成功");
						setTimeout(function(){window.location.reload();},2000);
					} else {
						layer.msg("没有找到此手机号码玩家");
						setTimeout(function(){window.location.reload();},2000);
					}
				}
			});
		});
	});
}
/*});*/