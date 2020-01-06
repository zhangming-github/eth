window.onload=function loadSearchCourse(page){
var new_element=document.createElement("script");
	 new_element.setAttribute("type","text/javascript");
	 new_element.setAttribute("src","layer/layer.js");
	 document.body.appendChild(new_element);
	$('#scenarioNumBox').html("");
	$.ajax({
		url:"/gm/getScenario",
		type:'get',
		dataType:"json",
		success:function(result){
			$('#scenarioNumBox').html("");
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
				str +=  "<td align='center'>剧本总人数</td>";
				str +=  '</tr>';
				str +=  '</thead>';
				str += "<tbody>";
				for (i in result) {  
			    str += "<tr>";
			    str += "<td align='center'style='display:table-cell; vertical-align:middle'>" + i + "</td>";
				str += "<td align='center'style='display:table-cell; vertical-align:middle'>" + result[i] + "</td>";
				str += "</tr>";
				}
				str += "</tbody>";
				str += "</table>";
				str += "<div class='top'>";
				str += 	"<a href='#top' target='_self' id='topArrow'></a>";
				str += "</div>";
			}
			scenarioNumBox.innerHTML = str;  
		}
	})
}