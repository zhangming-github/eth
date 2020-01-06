var page = 0;
window.onload=function loadSearchCourse(page){
var new_element=document.createElement("script");
	 new_element.setAttribute("type","text/javascript");
	 new_element.setAttribute("src","layer/layer.js");
	 document.body.appendChild(new_element);
	 var totalNum = 0;
	 $.ajax({
			url:"/gm/getReportDiscussCount",
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
var reportPage = 1;
	$('#reportDiscussBox').html("");
	var sendPage = 1;
	if(page > sendPage){
		sendPage = page;
		achievementAtPage = page;
	} 
	if(page == 1){
		achievementAtPage = 1;
	}
	$.ajax({
		url:"/gm/getListReportInfo",
		type:'get',	
		data:{
			page:sendPage,
			count:50,
			state:0
		},
		success:function(result){
			$('#reportDiscussBox').html("");
			var str = "";
			var numbe = 1;
			if(result==null){
				str += "<tr>" ;
				str += '<p style="text-align:center"><b>举报评论列表为空</b></p>';               
				str += "</tr>";
			} else {
				str +=  '<table class="table table-hover">';
				str +=  '<caption><h4 style="text-align:center">举报评论列表如下</h4></caption>';
				str +=  '<thead>';
				str +=  '<tr>';
				str +=  "<td width='80px' align='center'>序号</td>";
				str +=  "<td width='80px' align='center'>被举报人名字</td>";
				str +=  "<td width='80px' align='center'>违规评论内容</td>";
				str +=  "<td width='60px' align='center'>举报人名字</td>";
				str +=  "<td width='60px' align='center'>举报人是否为护眼大队</td>";
				str +=  "<td width='60px' align='center'>举报时间</td>";
				str +=  "<td width='100px' align='center'>操作</td>";
				str +=  '</tr>';
				str +=  '</thead>';
				str += "<tbody>";
				for (i in result) {  
			    str += "<tr>";
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+numbe+"</td>" ;
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].toplayer+"</td>" ;
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].content+"</td>" ;
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].fromplayer+"</td>" ;
				if(result[i].protectEyeTitle == 0){
					str +="<td align='center'style='display:table-cell; vertical-align:middle'>✖</td>" ;
				} else {
					str +="<td align='center'style='display:table-cell; vertical-align:middle'>✔</td>" ;
				}
				str +="<td align='center'style='display:table-cell; vertical-align:middle'>"+result[i].timestamp +"</td>" ;
				str += "<td width='100px' align='center'style='display:table-cell; vertical-align:middle'><button id='dispose' value="+result[i].fromplayer+","+result[i].id+","+result[i].protectEyeTitle+" name="+result[i].toplayerId+" class='btn btn-success' onclick='insCell(this)'>处理</button>" +
				"<button id='shelve' class='btn btn-danger' name="+result[i].toplayerId+" value="+result[i].fromplayer+","+result[i].id+","+result[i].protectEyeTitle+" onclick='insCell(this)'>删除举报信息</button></td>";
				str += "</tr>";
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
			reportDiscussBox.innerHTML = str;  
		}
});
}

function insCell(th){
	var datas = th.value 
	var arr=datas.split(',');
	if(th.id == "dispose"){
		if(arr[2] == 0){
			layer.open({
				  type: 1,
				  skin: 'layui-layer-rim', //加上边框
				  area: ['910px', '325px'], //宽高
				  content: "<br>&nbsp&nbsp<b>玩家  :</b>&nbsp;<b>" + arr[0] +"</b><br><br>"
					+"&nbsp&nbsp<b>操作 :</b><button class='btn btn-danger' id='delectShelve' style='margin-left:5px;'>删除评论</button><br><br>"
					+"<button class='btn btn-danger' style='margin-left:48px;' id='banned'>封号并删除评论</button><br><br>"
					+"<button class='btn btn-danger' style='margin-left:48px;'>禁言并删除评论</button><b> : </b>"
					+"<button class='btn btn-default' id='fiveMinute' style='margin-left:0px;'>5分钟</button>"
					+"<button class='btn btn-default' id='thirtyMinute' style='margin-left:3px;'>30分钟</button>"
					+"<button class='btn btn-default' id='towHour' style='margin-left:3px;'>2小时</button>"
					+"<button class='btn btn-default' id='oneDay' style='margin-left:3px;'>1天</button>"
					+"<button class='btn btn-default' id='sevenDay' style='margin-left:3px;'>7天</button>"
					+"<button class='btn btn-default' id='thirtyDay' style='margin-left:3px;'>30天</button>"
					+"<div class='input-group'  style='width:200px;' id='pjinyan'><input type='text' id='duration' class='form-control' placeholder='区间5分钟~9999分钟'></div>"
					+"<div><button class='btn btn-warning' id='pcustom'>自定义时长禁言</button></div>"
			});
		} else {
			layer.open({
				  type: 1,
				  skin: 'layui-layer-rim', //加上边框
				  area: ['910px', '370px'], //宽高
				  content: "<br>&nbsp&nbsp<b>玩家  :</b>&nbsp;<b>" + arr[0] +"</b><br><br>"
				    +"&nbsp&nbsp<b>操作 :</b><button class='btn btn-danger' id='delectShelve' style='margin-left:5px;'>删除评论</button><br><br>"
					+"<button class='btn btn-danger' style='margin-left:48px;' id='banned'>封号并删除评论</button><br><br>"
					+"<button class='btn btn-danger' style='margin-left:48px;'>禁言并删除评论</button><b> : </b>"
					+"<button class='btn btn-default' id='fiveMinute' style='margin-left:0px;'>5分钟</button>"
					+"<button class='btn btn-default' id='thirtyMinute' style='margin-left:3px;'>30分钟</button>"
					+"<button class='btn btn-default' id='towHour' style='margin-left:3px;'>2小时</button>"
					+"<button class='btn btn-default' id='oneDay' style='margin-left:3px;'>1天</button>"
					+"<button class='btn btn-default' id='sevenDay' style='margin-left:3px;'>7天</button>"
					+"<button class='btn btn-default' id='thirtyDay' style='margin-left:3px;'>30天</button>"
					+"<div class='input-group'  style='width:200px;' id='pjinyan'><input type='text' id='duration' class='form-control' placeholder='区间5分钟~9999分钟'></div>"
					+"<div><button class='btn btn-warning' id='pcustom'>自定义时长禁言</button></div>"
					+"<div id='shenfen'><button class='btn btn-danger' style='margin-left:48px;'>身份</button><b> : </b>"
					+"<button class='btn btn-primary' style='margin-left:0px;'>护眼大队</button>" 
					+"<button class='btn btn-default' id='removeEye' style='margin-left:8px;'>移除权限</button>"
					+"<button class='btn btn-default' id='updataEye' style='margin-left:3px;'>修改权限</button></div>"
			});
		}
	} 
	
	$('#banned').click( function(){
		layer.confirm("确定要封禁此玩家并删除评论吗?",{
		    title: false,
		    btn: ['确定','取消']
		},function(){
			$.ajax({
				url:"/gm/setDiscussBlockPlayer",
				type:'get',
				dataType:"json",
				data:{
					id:arr[1],
					playerId:th.name
				},
				success:function(result){
					if(result){
						$.ajax({
							url:"/gm/removeDiscussReportPlayer/"+arr[1],
							type:'get',
							dataType:"json",
							success:function(result){
								if(result){
									layer.msg("操作成功");
									setTimeout(function(){window.location.reload();},2000);
								} else {
									layer.msg('操作失败');
								}
							}
						});
					} else {
						layer.msg('操作失败');
					}
				}
			});
		})
	});
	
	$('#fiveMinute').click( function(){
		layer.confirm("确定要禁言此账号5分钟吗?",{
		    title: false,
		    btn: ['确定','取消']
		},function(){
			$.ajax({
				url:"/gm/setDiscussNoSpeak",
				type:'get',
				dataType:"json",
				data:{
					id:arr[1],
					playerId:th.name,
					noSpeakTime:300000
				},
				success:function(result){
					if(result){
						$.ajax({
							url:"/gm/removeDiscussReportPlayer/"+arr[1],
							type:'get',
							dataType:"json",
							success:function(result){
								if(result){
									layer.msg('成功禁言此玩家5分钟');
									setTimeout(function(){window.location.reload();},2000);
								} else {
									layer.msg('禁言失败');
								}
							}
						});
					} else {
						layer.msg('禁言失败');
					}
				}
			});
		})
	});
	
	$('#thirtyMinute').click( function(){
		layer.confirm("确定要禁言此账号30分钟吗?",{
		    title: false,
		    btn: ['确定','取消']
		},function(){
			$.ajax({
				url:"/gm/setDiscussNoSpeak",
				type:'get',
				dataType:"json",
				data:{
					id:arr[1],
					playerId:th.name,
					noSpeakTime:1800000
				},
				success:function(result){
					if(result){
						$.ajax({
							url:"/gm/removeDiscussReportPlayer/"+arr[1],
							type:'get',
							dataType:"json",
							success:function(result){
								if(result){
									layer.msg('成功禁言此玩家30分钟');
									setTimeout(function(){window.location.reload();},2000);
								} else {
									layer.msg('禁言失败');
								}
							}
						});
					} else {
						layer.msg('禁言失败');
					}
				}
			});
		})
	});
	
	$('#towHour').click( function(){
		var times = 7200000;
		layer.confirm("确定要禁言此账号2小时吗?",{
		    title: false,
		    btn: ['确定','取消']
		},function(){
			$.ajax({
				url:"/gm/setDiscussNoSpeak",
				type:'get',
				dataType:"json",
				data:{
					id:arr[1],
					playerId:th.name,
					noSpeakTime:times
				},
				success:function(result){
					if(result){
						$.ajax({
							url:"/gm/removeDiscussReportPlayer/"+arr[1],
							type:'get',
							dataType:"json",
							success:function(result){
								if(result){
									layer.msg('成功禁言此玩家2小时');
									setTimeout(function(){window.location.reload();},2000);
								} else {
									layer.msg('禁言失败');
								}
							}
						});
					} else {
						layer.msg('禁言失败');
					}
				}
			});
		})
	});
	
	$('#oneDay').click( function(){
		var times = 86400000;
		layer.confirm("确定要禁言此账号1天吗?",{
		    title: false,
		    btn: ['确定','取消']
		},function(){
			$.ajax({
				url:"/gm/setDiscussNoSpeak",
				type:'get',
				dataType:"json",
				data:{
					id:arr[1],
					playerId:th.name,
					noSpeakTime:times
				},
				success:function(result){
					if(result){
						$.ajax({
							url:"/gm/removeDiscussReportPlayer/"+arr[1],
							type:'get',
							dataType:"json",
							success:function(result){
								if(result){
									layer.msg('成功禁言此玩家1天');
									setTimeout(function(){window.location.reload();},2000);
								} else {
									layer.msg('禁言失败');
								}
							}
						});
					} else {
						layer.msg('禁言失败');
					}
				}
			});
		})
	});
	
	$('#sevenDay').click( function(){
		var times = 604800000;
		layer.confirm("确定要禁言此账号7天吗?",{
		    title: false,
		    btn: ['确定','取消']
		},function(){
			$.ajax({
				url:"/gm/setDiscussNoSpeak",
				type:'get',
				dataType:"json",
				data:{
					id:arr[1],
					playerId:th.name,
					noSpeakTime:times
				},
				success:function(result){
					if(result){
						$.ajax({
							url:"/gm/removeDiscussReportPlayer/"+arr[1],
							type:'get',
							dataType:"json",
							success:function(result){
								if(result){
									layer.msg('成功禁言此玩家7天');
									setTimeout(function(){window.location.reload();},2000);
								} else {
									layer.msg('禁言失败');
								}
							}
						});
					} else {
						layer.msg('禁言失败');
					}
				}
			});
		})
	});
	
	$('#thirtyDay').click( function(){
		var times = 2592000000;
		layer.confirm("确定要禁言此账号30天吗?",{
		    title: false,
		    btn: ['确定','取消']
		},function(){
			$.ajax({
				url:"/gm/setDiscussNoSpeak",
				type:'get',
				dataType:"json",
				data:{
					id:arr[1],
					playerId:th.name,
					noSpeakTime:times
				},
				success:function(result){
					if(result){
						$.ajax({
							url:"/gm/removeDiscussReportPlayer/"+arr[1],
							type:'get',
							dataType:"json",
							success:function(result){
								if(result){
									layer.msg('成功禁言此玩家30天');
									setTimeout(function(){window.location.reload();},2000);
								} else {
									layer.msg('禁言失败');
								}
							}
						});
					} else {
						layer.msg('禁言失败');
					}
				}
			});
		})
	});
	
	$('#pcustom').click( function(){
		var times = document.getElementById("duration").value;
		if(times >= 5 && times <= 9999){
			layer.confirm("确定要禁言此账号"+times+"分钟嘛吗?",{
			    title: false,
			    btn: ['确定','取消']
			},function(){
				$.ajax({
					url:"/gm/setDiscussNoSpeak",
					type:'get',
					dataType:"json",
					data:{
						id:arr[1],
						playerId:th.name,
						noSpeakTime:(times*1000*60)
					},
					success:function(result){
						if(result){
							$.ajax({
								url:"/gm/removeDiscussReportPlayer/"+arr[1],
								type:'get',
								dataType:"json",
								success:function(result){
									if(result){
										layer.msg("成功禁言此玩家"+times+"分钟");
										setTimeout(function(){window.location.reload();},2000);
									} else {
										layer.msg('禁言失败');
									}
								}
							});
						} else {
							layer.msg('禁言失败');
						}
					}
				});
			})
			return;
		}
		layer.msg('请输入5~9999之间的整数');
	});
	
	$('#removeEye').click( function(){
			layer.confirm("确定要移除该玩家护眼大队权限吗?",{
			    title: false,
			    btn: ['确定','取消']
			},function(){
				$.ajax({
					url:"/gm/removeDiscussProTitle/"+th.name,
					type:'get',
					dataType:"json",
					success:function(result){
						if(result){
							layer.msg("移除权限成功");
							setTimeout(function(){window.location.reload();},2000);
						} else {
							layer.msg('禁言失败');
						}
					}
				});
			})
	});
	
	$('#updataEye').click( function(){
		layer.msg("功能开发中...");
    });
	
	if(th.id == "shelve"){
		layer.confirm("确定要删除该条举报信息吗?",{
		    title: false,
		    btn: ['确定','取消']
		},function(){
			$.ajax({
				url:"/gm/removeDiscussReportPlayer/"+arr[1],
				type:'get',
				dataType:"json",
				success:function(result){
					if(result){
						layer.msg("删除成功");
						setTimeout(function(){window.location.reload();},2000);
					} else {
						layer.msg('删除失败');
					}
				}
			});
		})
	}
	
	$('#delectShelve').click( function(){
	layer.confirm("确定要删除该条举报信息吗?",{
	    title: false,
	    btn: ['确定','取消']
	},function(){
		$.ajax({
			url:"/gm/removeDiscussReportPlayer/"+arr[1],
			type:'get',
			dataType:"json",
			success:function(result){
				if(result){
					layer.msg("删除成功");
					setTimeout(function(){window.location.reload();},2000);
				} else {
					layer.msg('删除失败');
				}
			}
		});
	})
});
}