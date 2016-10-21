$(function(){
	

		var datePicker;
		function DatePicker($input){//参数为jquery对象input
				this.$input=$input;
				//this.year和this.month是指用户点击上月、下月时当前选定 的年月
				//this.todayYear和this.todayMonth才是指当前系统时间中真实的年月
				//点击下一月时
				this.initNextMonth=function(){
							if(this.month==12){
								this.year++;
								this.month=1;
							}else{
								this.month++;
							}
							this.day=1;
							//根据得到的this.year和this.month组装代表下月1号00:00:00的date对象,再调用初始化某一具体月份的方法
							var date=new Date();
							this.packageDate(date,this.year,this.month-1,1,0,0,0);
							this.initTheMonth(date); 
				}
				//点击上一月
				this.initPreMonth=function(){
							if(this.month==1){
								this.year--;
								this.month=12;
							}else{
								this.month--;
							}
							this.day=1;
							var date=new Date();
							this.packageDate(date,this.year,this.month-1,1,0,0,0);//因为this.month是+1处理以后的月份
							this.initTheMonth(date);
				}
				
				//组装日期
				this.packageDate=function(date,year,month,dayOfMonth,hours,minute,seconds){
							date.setFullYear(year);
							date.setMonth(month);
							date.setDate(dayOfMonth);
							date.setHours(hours);
							date.setMinutes(minute);
							date.setSeconds(seconds);
				}
				
				
				
				this.initEvent=function(){
							
							var this_=this;//表示datePicker对象
							//鼠标悬浮指定日期时变蓝色事件
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .tr_day").mouseover(function(e){
									var td=$(e.target);
									if(td.hasClass("td_validDay")){
											td.removeClass("btn-gray");
											td.addClass("btn-blue");
									}
							});
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .tr_day").mouseout(function(e){
									var td=$(e.target);
									if(td.hasClass("td_validDay")){
											td.removeClass("btn-blue");
											td.addClass("btn-gray");
									}
							});
							
						
							//上月、下月、上年、下年悬浮变灰色事件
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_preMonth," +
							  "#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_nextMonth," +
							  "#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_lastYear," +
							  "#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_nextYear").bind("mouseover",function(){
									$(this).removeClass("btn-gray");
									$(this).addClass("btn-darkGray");
							});
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_preMonth," +
							  "#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_nextMonth," +
							  "#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_lastYear," +
							  "#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_nextYear").bind("mouseout",function(){
									$(this).removeClass("btn-darkGray");
									$(this).addClass("btn-gray");
							});
							
							
							//上月、下月click事件
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_nextMonth").bind("click",function(){
									datePicker.initNextMonth();
							});
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_preMonth").bind("click",function(){
									datePicker.initPreMonth();
							});
							
							
							
							//上年、下年click事件
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_lastYear").click(function(){//year--,month不变，day变为1
									this_.year--;
									this_.day=1;
									
									this_.updateTitleDate();
									
									var date=new Date();
									this_.packageDate(date,this_.year,this_.month-1,1,0,0,0);
									this_.initTheMonth(date); 
							});
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .td_nextYear").click(function(){
									this_.year++;
									this_.day=1;
									
									this_.updateTitleDate();
									
									var date=new Date();
									this_.packageDate(date,this_.year,this_.month-1,1,0,0,0);
									this_.initTheMonth(date); 
							});
							
							
							
							
							//双击日期选择日期事件
						    $("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .tr_day").bind("click",function(e){
						    		 var td=$(e.target);
							    	 var dayOfMonthText=td.text();
									 if(td.hasClass("td_validDay")){
											 var dateStr=datePicker.year+"-"+datePicker.month+"-"+dayOfMonthText;
											 //隐藏，将选择日期显示到input中
											 $("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb").hide();
											 datePicker.$input.val(dateStr);
									 }
						    });
						    
						    
						    
							
							//鼠标离开隐藏日期控件事件
						    $("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb").bind("mouseleave",function(){
						    		$(this).hide();
						    });
				}
			
				
				this.clearAllDayAndClass=function(){//重新为所有td添加日期前的清理工作（包括td的text和class）
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .tr_day td").css("color","black");
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .tr_day td").removeClass("btn-blue");
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .tr_day td").removeClass("td_validDay");
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .tr_day td").addClass("btn-gray");
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .tr_day td").empty();
				}		
				
				this.updateTitleDate=function(){//更新显示顶部中间日期
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .font_showYear").text(this.year);
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .font_showMonth").text(this.month);
							$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb .font_showDayOfMonth").text(this.day);
				}
				
				this.initTheMonth=function(date){//初始化指定月份,参数为代表该月1号00:00:00的日期对象
							//首先清空所有td内容和样式
							this.clearAllDayAndClass();
							
							var year=date.getFullYear();    //获取完整的年份(4位,1970-????)
							var month=date.getMonth()+1;       //获取当前月份(0-11,0代表1月)
							var daysNumber=getDaysNumberByMonth(year, month);//本月一共多少天
							var dayOfWeek=date.getDay();//本月1号是星期几
							
							//alert(month+"月1号星期"+dayOfWeek);
							var table=$("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb table")[0];
							
							this.updateTitleDate();
							
							
							var counter=0;
							for(col=dayOfWeek;col<7;col++){
									counter++;
									table.rows[3].cells[col].innerHTML=counter;
									$(table.rows[3].cells[col]).addClass("td_validDay");
									if(counter==this.day){
										$(table.rows[3].cells[col]).removeClass("btn-gray");
										$(table.rows[3].cells[col]).addClass("btn-blue");
									}
							}
							
							var counter3=1;
							for(var row=4;row<9;row++){
									for(var col=0;col<7;col++){
											counter++;
											if(counter>daysNumber){
													//下月起始残留部分
													//当for循环中的counter超过本月天数时以1,2,3,4,5...填充即可
													table.rows[row].cells[col].innerHTML=counter3;
													table.rows[row].cells[col].style.color="gray";
													counter3++;
											}else{
													table.rows[row].cells[col].innerHTML=counter;
													$(table.rows[row].cells[col]).addClass("td_validDay");
													if(counter==this.day){
															$(table.rows[row].cells[col]).removeClass("btn-gray");
															$(table.rows[row].cells[col]).addClass("btn-blue");
													}
											}
									}
							} 
							//补全上月结尾残留
							//得到上月多少天
							var daysNumberOfLastMonth=0;
							if(month==1){
									daysNumberOfLastMonth=getDaysNumberByMonth(year-1, 12);
							}else{
									daysNumberOfLastMonth=getDaysNumberByMonth(year, month-1);
							}
							
							var counter1=daysNumberOfLastMonth;
							for(var col=dayOfWeek-1;col>=0;col--){
									table.rows[3].cells[col].innerHTML=counter1;
									table.rows[3].cells[col].style.color="gray";
									counter1--;
							}
				}
			
				this.init=function(){
							var today=new Date();
							this.year=today.getFullYear();
							this.month=today.getMonth()+1;
							this.day=today.getDate();
							this.packageDate(today,this.year, this.month-1, 1, 0, 0, 0);
							this.initTheMonth(today);
				}
				
				//更新显示时间
				this.updteShowTime=function(date){
					       //将文本为dayOfMonth处的td背景变蓝色
					        this.year=date.getFullYear();
					        this.month=date.getMonth()+1;
							//根据得到的this.year和this.month组装代表下月1号00:00:00的date对象,再调用初始化某一具体月份的方法
							this.initTheMonth(date); 
				}
		}
		
		
		//判断是否为闰年
		function isLeapYear(year){
				if(year%100==0){
					if(year%400==0){
						return true;
					}
				}else{
					if(year%4==0){
						return true;
					}
				}
				return false;
		}
		
		
		function getDaysNumberByMonth(year,month){
				var daysNumber=0;
				switch(month){
						case 1:
						case 3:
						case 5:
						case 7:
						case 8:
						case 10:
						case 12:
							daysNumber=31;
							break;
						case 2:
							daysNumber=(isLeapYear(year)?29:28);
							break;
						case 4:
						case 6:
						case 9:
						case 11:
							daysNumber=30;
							break;
						default:
							daysNumber=-1;
				}
				return daysNumber;
		}
		
		//下一步就是如何做成插件
		
		$(".myDatePicker").attr("readonly","true");
		$(".myDatePicker").click(function(){
					triggerMyDatePicker(this);
		});
/*		$(".myDatePicker")[0].oninput=function(){
			alert($(this).val());
			//triggerMyDatePicker(this);
		}
		*/
		
		
		
		
		function triggerMyDatePicker(this_){//this_表示触发的这个input
					if(datePicker){//click input时如果有时间则初始化picker时间为该时间
						 $("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb").show();//并且要重新显示到现在点击的input旁边，并将该日期插件的$input更新为现在点击的input
						 datePicker.$input=$(this_);
						 var offset = $(this_).offset();
						 $("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb").css("position","absolute");
						 $("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb").css("left",offset.left); 
						 $("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb").css("top",offset.top);
						 
						 var dateStr=$(this_).val();
						 var dateReg=/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/;
						 if(dateReg.test(dateStr)){
							 	var arr=dateStr.split("-");
							 	var year=parseInt(arr[0]);
							 	var month=parseInt(arr[1]);
							 	var dayOfMonth=parseInt(arr[2]);
							 	var date=new Date();
							 	
							 	date.setFullYear(year);
							 	date.setMonth(month-1);
							 	date.setDate(1);
							 	//alert(year+","+month+","+dayOfMonth);
								date.setHours(0);
								date.setMinutes(0);
								date.setSeconds(0);
								datePicker.day=parseInt(dayOfMonth);
							 	datePicker.updteShowTime(date);
						 }else{//也显示今天
							 	var today=new Date();
							 	datePicker.day=today.getDate();
							 	today.setDate(1);
								today.setHours(0);
								today.setMinutes(0);
								today.setSeconds(0);
								
							 	datePicker.updteShowTime(today);
						 }
						 return;
				 }
				//初始化为现在系统时间
			    
			 	//初次创建datePicker对象
				 var tableHtml='<div id="tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb" style="width:200px;height:176px;">';
				 tableHtml+='<table    cellpadding="0" cellspacing="0" bordercolor="black">'+
									'<tr>'+
											'<td rowspan=2 class="btn-gray td_preMonth border_left_top" style="font-size:11px">上月</td>'+
											'<td  class="btn-gray  border_left_top td_lastYear" style="font-size:9px;height:10px">上年</td>'+
											'<td rowspan=2 colspan=4 class="btn-gray td_today border_left_top" style="font-size:13px">'+
													'<font  class="font_showYear">2016</font>-'+
													'<font  class="font_showMonth">10</font>-'+
													'<font  class="font_showDayOfMonth">23</font>'+
											'</td>'+
											'<td rowspan=2 class="btn-gray td_nextMonth border_left_top border_right" style="font-size:11px">下月</td>'+
									'</tr>'+
									'<tr>'+
											'<td class="btn-gray border_left_top td_nextYear" style="font-size:9px;height:10px">下年</td>'+
									'</tr>'+
									'<tr style="font-size:12px">'+
											'<td class="btn-red border_left_top">Sun</td>'+
											'<td class="btn-red border_left_top">Mon</td>'+
											'<td class="btn-red border_left_top">Tue</td>'+
											'<td class="btn-red border_left_top">Wed</td>'+
											'<td class="btn-red border_left_top">Thu</td>'+
											'<td class="btn-red border_left_top">Fri</td>'+
											'<td class="btn-red border_left_top border_right">Sat</td>'+
									'</tr>';
				 
				 for(var row=0;row<5;row++){
					 	tableHtml+='<tr class="tr_day">';
					 	for(var col=0;col<6;col++){
					 				tableHtml+='<td class="btn-gray border_left_top"></td>';
					 	}	
					 	tableHtml+='<td class="btn-gray border_left_top border_right"></td>';
					 	tableHtml+='</tr>';
				 }	
				 
				 tableHtml+='<tr class="tr_day">';
			 	 for(var col=0;col<6;col++){
			 				tableHtml+='<td class="btn-gray border_left_top border_bottom"></td>';
			 	 }	
			 	 tableHtml+='<td class="btn-gray border_left_top border_bottom border_right"></td>';
			 	 tableHtml+='</tr>';
				 
				 tableHtml+='</table>';
				 tableHtml+='</div>';
									
				 $(this_).parent().append($(tableHtml));
				 var offset = $(this_).offset();
				 $("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb").css("position","absolute");
				 $("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb").css("left",offset.left); 
				 $("#tsnhisksdfhirgjrwegvsdgfvsfgsdhfbsdhgfb").css("top",offset.top);
				 
				 
			    datePicker=new DatePicker($(this_));//将该input赋给该日期插件
			    datePicker.init();
			    datePicker.initEvent();
		}
		
});	
		