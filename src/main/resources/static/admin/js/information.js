var page = 0;
window.onload=function loadSearchCourse(page){
var new_element=document.createElement("script");
	 new_element.setAttribute("type","text/javascript");
	 new_element.setAttribute("src","layer/layer.js");
	 document.body.appendChild(new_element);
	 var totalNum = 0;
	 $.ajax({
			url:"/gm/getResSystemMessgaeCount",
			type:'get',
			success:function(result){
				if(result==null || result == 0){
					totalNum = 0;
				} else {
					totalNum = result;
				}
			}
	   })
var reportPage = 1;
	$('#informationBox').html("");
	var sendPage = 1;
	if(page > sendPage){
		sendPage = page;
		achievementAtPage = page;
	} 
	if(page == 1){
		achievementAtPage = 1;
	}
	$.ajax({
		url:"/gm/listPlayerMessge",
		type:'get',	
		data:{
			page:sendPage,
			count:50,
			state:0
		},
		success:function(result){
			$('#informationBox').html("");
			var str = "";
			var numbe = 1;
			if(result==null){
				str += "<tr>" ;
				str += '<p style="text-align:center"><b>历史通知列表为空</b></p>';               
				str += "</tr>";
			} else {
				str +=  '<table class="table table-hover">';
				str +=  '<caption><h4 style="text-align:center">历史通知列表为空</h4></caption>';
				str +=  '<thead>';
				str +=  '<tr>';
				str +=  "<td width='80px' align='center'>序号</td>";
				str +=  "<td width='80px' align='center'>内容</td>";
				str +=  "<td width='80px' align='center'>操作人</td>";
				str +=  "<td width='60px' align='center'>发送时间</td>";
				str +=  "<td width='60px' align='center'>接收用户</td>";
				str +=  "<td width='60px' align='center'>操作</td>";
				str +=  '</tr>';
				str +=  '</thead>';
				str += "<tbody>";
				for (i in result) {  
			    str += "<tr>";
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+numbe+"</td>" ;
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].content+"</td>" ;
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].fromUser+"</td>" ;
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].sendTime+"</td>" ;
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].toUser +"</td>" ;
				str += "<td width='100px' align='center'style='display:table-cell; vertical-align:middle'><button id='dispose' name="+result[i].playerId+" class='btn btn-success' onclick='insCell(this)'>查看历史记录</button>";
				str += "</tr>";
				numbe++;
				}
				str += "</tbody>";
				str += "</table>";
				str +='<div id="myPage" class="Cpage"></div><br/><br/><br/>';
				str += "<div class='top'>";
				str += 	"<a href='#top' target='_self' id='topArrow'></a>";
				str += "</div>";
				$(document).ready(function(){
					$("#myPage").sPage({
					    page:reportPage,//当前页码，必填
					    total:totalNum,//数据总条数，必填
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
			informationBox.innerHTML = str;  
		}
});
}
$(function(){
$("#phoneReceive").click(function(){
	var data = document.getElementById('inData').innerText;
	var playerData = document.getElementById('receivePlayer').value;
	var posPattern = /^[1][3,4,5,6,7,8][0-9]{9}$/;
	var selectedColor = $('#selects input:radio:checked').val();
	if(selectedColor == undefined){
		layer.msg("请选择发送格式");
		return;
	}
	if(data.length <= 0 || data.length >= 200){
		if(playerData == null || playerData =="" || !posPattern.test(playerData)){
			layer.msg("内容与手机号码格式错误请重新输入");
			return;
		}
		layer.msg("请输入1~200个字之间的内容");
	} if(playerData == null || playerData =="" || !posPattern.test(playerData)){
		layer.msg("请输入正确的11位手机号码");
		return;
	} else {
		if(selectedColor == 0){
			$.ajax({
				url:"/gm/systemSendMessgaeByPhone",
				type:'get',	
				data:{
					content:data,
					contentType:0,
					phone:playerData
				},
				success:function(result){
					alert(result);
					if(result){
						layer.msg("发送消息成功");
					} else {
						layer.msg("手机号不存在");
					}
				},
				error:function(jqXHR,textStatus,errorThrown){ 
					layer.msg("发送失败");
				}
			});
		} else {
			$.ajax({
				url:"/gm/systemSendMessgaeByPhone",
				type:'get',	
				data:{
					content:data,
					contentType:1,
					phone:playerData
				},
				success:function(result){
					if(result){
						layer.msg("发送消息成功");
					} else {
						layer.msg("手机号不存在");
					}
				},
				error:function(jqXHR,textStatus,errorThrown){ 
					layer.msg("发送失败");
				}
			});
		}
	}
});
$("#idReceive").click(function(){
	var data = document.getElementById('inData').innerText;
	var playerData = document.getElementById('receivePlayer').value;
	var posPattern = /^\d*\.?\d+$/;
	var selectedColor = $('#selects input:radio:checked').val();
	if(selectedColor == undefined){
		layer.msg("请选择发送格式");
		return;
	}
	if(data.length <= 0 || data.length >= 200){
		if(playerData == null || playerData =="" || !posPattern.test(playerData)){
			layer.msg("ID与内容格式错误请重新输入");
			return;
		}
		layer.msg("请输入1~200个字之间的内容");
	} if(playerData == null || playerData =="" || !posPattern.test(playerData)){
		layer.msg("请输入正确格式的ID");
		return;
	} else {
		if(selectedColor == 0){
			$.ajax({
				url:"/gm/systemSendMessgaeByRoleId",
				type:'get',	
				data:{
					content:data,
					contentType:0,
					RoleId:playerData
				},
				success:function(result){
					if(result){
						layer.msg("发送消息成功");
					} else {
						layer.msg("ID不存在");
					}
				}
			});
		} else {
			$.ajax({
				url:"/gm/systemSendMessgaeByRoleId",
				type:'get',	
				data:{
					content:data,
					contentType:1,
					RoleId:playerData
				},
				success:function(result){
					if(result){
						layer.msg("发送消息成功");
					} else {
						layer.msg("ID不存在");
					}
				}
			});
		}
	}
});
$("#allReceive").click(function loadSearchCourse(page){
	var totalNum = 0;
	 $.ajax({
			url:"/gm/getAchievementCount",
			type:'get',
			dataType:"json",
			success:function(result){
				if(result==null){
					totalNum = 0;
				} else {
					totalNum = result;
				}
			}
	   })
var explorationAtPage = 1;
	$('#informationBox').html("");
	var sendPage = 1;
	if(page > sendPage){
		sendPage = page;
		explorationAtPage = page;
	} 
	if(page == 1){
		explorationAtPage = 1;
	}
	$.ajax({
		url:"/gm/getExploration",
		type:'get',	
		data:{
			start:sendPage,
			page:50
		},
		success:function(result){
			$('#informationBox').html("");
			var str = "";
			if(result==null){
				str += "<tr>" ; 
				str += '<p style="text-align:center"><b>探索排行榜为空</b></p>';               
				str +="</tr>";
			} else {
				str +=  '<table class="table table-hover">';
				str +=  '<caption><h4 style="text-align:center">探索排行榜如下</h4></caption>';
				str +=  '<thead>';
				str +=  '<tr class="success">';
				str +=  "<td align='center'><input type='checkbox' id='selectAll' name='selectAll' onclick='insAell(this)'>全选</td>";
				str +=  "<td align='center'>头像</td>";
				str +=  "<td align='center'>角色ID</td>";
				str +=  "<td align='center'>角色昵称</td>";
				str +=  "<td align='center'>排行分数</td>";
				str +=  "<td align='center'>手机号码</td>";
				str +=  '</tr>';
				str +=  '</thead>';
				str += "<tbody>";
				for (i in result) {  
			    str += "<tr>";
				str +="<td align='center'style='display:table-cell; vertical-align:middle'><div class='checkbox' id='checkbox'>";
				str +="<label><input type='checkbox' name='chooseInfo' id='chooseInfo' value="+result[i].id+"></label>";
				str +="</div></td>";
				if(result[i].avatar_url == "玩家没有上传头像"){
					str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].avatar_url+"</td>" ;
				} else {
					str +="<td align='center'style='display:table-cell; vertical-align:middle'><img class='img-circle' src="+result[i].avatar_url+"></td>" ;
				}
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].role_id+"</td>" ;
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].nick_name+"</td>" ;
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].topScore+"</td>" ;
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].phone+"</td>" ;
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
					    page:explorationAtPage,//当前页码，必填
					    total:totalNum,//数据总条数，必填
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
			informationBox.innerHTML = str;  
		}
	});
});
});
//全选 未完成
function insAell(tq){
	if(tq.name == "selectAll"){
		var name = document.getElementById("chooseInfo").name;
		var box = document.getElementById('checkbox').getElementsByTagName("input");
		name.onchange = function(){
	        var chk = this.checked;
	        for(var i = 0;i<box.length;i++){
	            box[i].checked = chk;
	        }
	    }
	}
	
}
function insCell(th){
	var datas = th.value 
	var arr=datas.split(',');
	if(th.id == "dispose"){
		$.ajax({
			url:"/gm/getPlayerMessgeByPlayerId/"+th.name,
			type:'get',	
			success:function(result){
				str="";
				str += "<br>";
				var name = "";
				for(var i = result.length -1;i >= 0;i--){
					if(result[i].fromUser == "超级管理员"){
						str += "<div id='adminTime'>"+result[i].sendTime+"</div>";
						str += "<li class='msgContent right'>"+result[i].content+"</li>";
						str += "<div style='clear:both'></div><br>";
					} else {
						str += "<div id='userTime'>"+result[i].sendTime+"</div>";
						str += "<li class='msgContent left'>"+result[i].content+"</li>";
						str += "<div style='clear:both'></div><br>";
						name = result[i].fromUser;
					}
				 }
				layer.open({
					  type: 1,
					  skin: 'layui-layer-rim', //加上边框
					  area: ['910px', '600px'], //宽高
					  content:"<div id='dialogBox'><h4><b>与玩家<span><font color='#FD7E3D'> " + name + " </font></span>的对话记录</b></h4></div><div id='main' class='main'>"
								+"<ul id='neirong' class='content'></ul>"
								+"<textarea id='msg_input' class='msgInput'></textarea>"
								+"<div class='radio' id='selectds' style='margin-left:12px;'>"
								+"   <label>"
								+"       <input type='radio' name='optionsRadios' id='optionsRadios1' value='0' checked>纯文本"
								+"   </label>&nbsp;"
								+"   <label>"
								+"       <input type='radio' name='optionsRadios' id='optionsRadios2' value='1'>文本加链接"
								+"   </label>"
								+"</div>"
								+"<button id='sendbtn' class='sendbtn' value="+result[1].playerId+" onclick='insTell(this)'>发送</button>"
								+"</div>"
								
				});
				neirong.innerHTML = str;
			}
		});
	} 
}
function insTell(td){
	var datas = td.value 
	var input1 = document.getElementById('msg_input').value;
	var selectedColor = $('#selectds input:radio:checked').val();
	if(selectedColor == undefined){
		layer.msg("请选择发送格式");
		return;
	}
	if(input1.length < 1 || input1.length > 200){
		layer.msg("请输入1~200个字");
		return;
	}
	sendMsg();
	if(selectedColor == 0){
		$.ajax({
			url:"/gm/systemSendMessgae",
			type:'get',	
			data:{
				content:input1,
				contentType:0,
				playerIds:datas
			},
			success:function(result){
				if(result){
					layer.msg("消息发送成功");
				} else {
					layer.msg("消息发送失败");
				}
			}
		});
	} else {
		$.ajax({
			url:"/gm/systemSendMessgae",
			type:'get',	
			data:{
				content:input1,
				contentType:1,
				playerIds:datas
			},
			success:function(result){
				if(result){
					layer.msg("消息发送成功");
				} else {
					layer.msg("消息发送失败");
				}
			}
		});
	}
	
	function sendMsg() {
		var input = document.getElementById('msg_input');//查找缓存
		var ul = document.getElementById('neirong');

		var newLi = document.createElement('li');
		newLi.innerHTML = input.value;
		newLi.className = 'msgContent right';
		ul.appendChild(newLi);

		var div = document.createElement('div');
		div.style = 'clear:both';
		ul.appendChild(div);

		input.value = '';
		newLi.scrollIntoView();//将元素滚动到可见位置
	}
}