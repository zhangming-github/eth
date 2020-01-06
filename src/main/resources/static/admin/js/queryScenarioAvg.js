window.onload=function loadSearchCourse(page){
var new_element=document.createElement("script");
	 new_element.setAttribute("type","text/javascript");
	 new_element.setAttribute("src","layer/layer.js");
	 document.body.appendChild(new_element);
	$('#scenarioAvgBox').html("");
	$.ajax({
		url:"/gm/getAverageScore",
		type:'get',
		dataType:"json",
		success:function(result){
			$('#scenarioAvgBox').html("");
			var str = "";
			if(result==null){
				str += "<tr>" ;
				str += '<p style="text-align:center"><b>未找到剧本</b></p>';         
				str += "</tr>";
			} else {
				str +=  '<table class="table table-hover">';
				str +=  '<caption><h4 style="text-align:center">剧本信息如下</h4></caption>';
				str +=  '<thead>';
				str +=  '<tr>';
				str +=  "<td align='center'>剧本编号</td>";
				str +=  "<td align='center'>剧本平均分</td>";
				str +=  "<td align='center'>剧本已评论人数</td>";
				str +=  '</tr>';
				str +=  '</thead>';
				str += "<tbody>";
				for (i in result) {  
			    str += "<tr>";
			    if(result[i].score == 0){
					str +="<td align='center'style='display:table-cell; vertical-align:middle'>" + i + "</td>" ;
					str +="<td align='center'style='display:table-cell; vertical-align:middle'>没有玩家进行评分</td>" ;
					str +="<td align='center'style='display:table-cell; vertical-align:middle'>没有玩家进行评分</td>" ;
				} else {
					str +="<td align='center'style='display:table-cell; vertical-align:middle'>" + i + "</td>";    
					str +="<td align='center'style='display:table-cell; vertical-align:middle'> " +  result[i].score.toFixed(2)  + "</td>"; 
					str += "<td align='center'style='display:table-cell; vertical-align:middle'> " +  result[i].playerNum  + "</td>"; 
				}
				str += "</tr>";
				}
				str += "</tbody>";
				str += "</table>";
				str += "<div class='top'>";
				str += 	"<a href='#top' target='_self' id='topArrow'></a>";
				str += "</div>";
			}
			scenarioAvgBox.innerHTML = str;  
		}
	})
}