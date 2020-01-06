/*$(function (){*/
var page = 0;
	 window.onload=function loadSearchCourse(page){
	//$('#comment').click(function loadSearchCourse(page){
	var new_element=document.createElement("script");
	 new_element.setAttribute("type","text/javascript");
	 new_element.setAttribute("src","layer/layer.js");
	 document.body.appendChild(new_element);
		var commentPage = 1;
		$('#commentBox').html("");
		$.ajax({
			url:"/gm/getCommentCount",
			type:'get',	
			success:function(result){
				var countNum = result;
				if(result == 0){
					$('#commentBox').html("");
					str += "<tr>";
					str += '<p style="text-align:center"><b>未找到评论信息</b></p>';                  
					str += "</tr>";
				} else {
					var sendPage = 1;
					if(page > sendPage){
						sendPage = page;
						commentPage = page;
					} 
					if(page == 1){
						commentPage = 1;
					}
					$.ajax({
						url:"/gm/getDiscussAll",
						type:'get',
						data:{
							page:sendPage,
							count:50
						},
						dataType:"json",
						success:function(result){
							$('#commentBox').html("");
							var str = "";
							if(result==null){
								str += "<tr>" ;
								str += '<p style="text-align:center"><b>未找到评论信息</b></p>';                  
								str += "</tr>";
							} else {
								str +=  '<table class="table table-hover">';
								str +=  '<caption><h4 style="text-align:center"><b>评论信息如下</b></h4></caption>';
								str +=  '<thead>';
								str +=  '<tr>';
								str +=  "<td width='70px' align='center'><b>剧本名称</b></td>";   
								str +=  "<td width='150px' align='center'><b>评论内容</b></td>"; 
								str +=  "<td width='50px' align='center'><b>用户点赞</b></td>";
								str +=  "<td width='50px' align='center'><b>被评论次数</b></td>";
								str +=  "<td width='80px' align='center'><b>评论玩家</b></td>";
								str +=  "<td width='80px' align='center'><b>评论时间</b></td>";
								str +=  "<td width='100px' align='center'><b>操作</b></td>";
								str +=  '</tr>';
								str +=  '</thead>';
								str += "<tbody>";
								for (i in result) {  
								datas = result[i].content;
							    str += "<tr>";
							    str += "<td width='70px'  align='center'style='display:table-cell; vertical-align:middle'> " + result[i].scenario + "</td>";
							    str += "<td width='150px' align='center'style='display:table-cell; vertical-align:middle'> " + result[i].content + "</td>";
								str += "<td width='50px'  align='center'style='display:table-cell; vertical-align:middle'> " + result[i].praiseNum + "</td>";
								str += "<td width='50px' align='center'style='display:table-cell; vertical-align:middle'> " + result[i].replieNum + "</td>";
								str += "<td width='80px' align='center'style='display:table-cell; vertical-align:middle'> " + result[i].fromNickName + "</td>";
								str += "<td width='80px' align='center'style='display:table-cell; vertical-align:middle'> " + result[i].createTime + "</td>";
								if(result[i].isBest == 0){
									str += "<td width='100px' align='center'style='display:table-cell; vertical-align:middle'><button id='setHotId' name="+result[i].id+" class='btn btn-success' onclick='insCell(this)'>给神评</button>" +
									"<button id='delectComment' class='btn btn-danger' name="+result[i].id+" onclick='insCell(this)'>删除评论</button></td>";
									str += "</tr>";
								} else {
									str += "<td width='100px' align='center'style='display:table-cell; vertical-align:middle'><button id='setHotId' name="+result[i].id+" class='btn btn-large disabled' >已神评</button>" +
									"<button id='delectComment' class='btn btn-danger' name="+result[i].id+" onclick='insCell(this)'>删除评论</button></td>";
									str += "</tr>";
								}
								}
								str += "</tbody>";
								str += "</table>";
								str +='<div id="myPage" class="Cpage"></div><br/><br/><br/>';
								str += "<div class='top'>";
								str += 	"<a href='#top' target='_self' id='topArrow'></a>";
								str += "</div>";
								$(document).ready(function(){
									$("#myPage").sPage({
									    page:commentPage,//当前页码，必填
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
							commentBox.innerHTML = str;
						}
					})
				}
			}
		});
	 }
	//});
/*});*/
	function insCell(th){
		if(th.id == "setHotId"){
			layer.confirm("确定设置该条评论为神评论吗?",{
			    title: false,
			    btn: ['确定','取消']
			},function(){
				$.ajax({
					url:"/gm/setGmIsHot/"+th.name+"",
					type:'get',
					dataType:"json",
					success:function(result){
						if(result == 1){
							layer.msg('设置神评成功');
							setTimeout(function(){window.location.reload();},2000);
						} else {
							layer.msg('该条评论已经为神评');
							setTimeout(function(){window.location.reload();},2000);
						}
					}
				});
			});
		} 
		if(th.id == "delectComment"){
			layer.confirm("确定要删除该条评论吗?",{
			    title: false,
			    btn: ['确定','取消']
			},function(){
				$.ajax({
					url:"/gm/removeDiscuss/"+th.name+"",
					type:'get',
					dataType:"json",
					success:function(result){
						if(result == 1){
							layer.msg('删除评论成功');
							setTimeout(function(){window.location.reload();},2000);
						} else {
							layer.msg('删除评论失败');
							setTimeout(function(){window.location.reload();},2000);
						}
					}
				});
			});
		}
	}