
function digitalWatch()
{
            var date = new Date();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            if (hours < 10) hours = "0" + hours;
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            document.getElementById("digital_watch").innerHTML = hours + ":" + minutes + ":" + seconds;

			var dateStartWork = new Date(0,0,0,8,0,0,0);
			var dateFinishWork = new Date(0,0,0,23,59,0,0);
			var dateStartLunch = new Date(0,0,0,13,0,0,0);
			var dateFinishLunch = new Date(0,0,0,14,0,0,0);
			var workText = "WORK";
			var finishWork = "SLEEP";
			var luchText = "LUNCH";
			var nullText = "____";
			var outText;

            var isSleep = timeDifference(new Date(0,0,0,0,0,0,0), dateStartWork, date);
            var isLunch = timeDifference(dateStartLunch, dateFinishLunch, date);
            var isWORK = timeDifference(dateStartWork, dateFinishWork, date);
            if (isSleep) outText = finishWork;
            else if (isLunch) outText = luchText;
            else if (isWORK) outText = workText;
			else outText = nullText;
			
			document.getElementById("text").innerHTML = outText;
			
			var weekday = new Array(7);
			weekday[0] = "SUNDAY";
			weekday[1] = "MONDAY";
			weekday[2] = "TUESDAY";
			weekday[3] = "WEDNSDAY";
			weekday[4] = "THURSDAY";
			weekday[5] = "FRIDAY";
			weekday[6] = "SATURDAY";

			var dayOfWeek = weekday[date.getDay()];
			document.getElementById("dayOfWeek").innerHTML = dayOfWeek;
			
			var months = new Array(12);
			months[0] = "JANUARY";
			months[1] = "FEBRUARY";
			months[2] = "MARTCH";
			months[3] = "APRIL";
			months[4] = "MAY";
			months[5] = "JUN";
			months[6] = "JULY";
			months[7] = "AUGUST";
			months[8] = "SEPTEMBER";
			months[9] = "OCTOBER";
			months[10] = "NOVEMBER";
			months[11] = "DECEMBER";
			
			var month = date.getMonth();
			var date_name = months[month];
			document.getElementById("date").innerHTML = date.getDate() + " " + date_name;
			
            setTimeout("digitalWatch()", 1000);
}
		
function timeDifference(date1, date2, date)
{
			if (date.getHours() > date1.getHours())
			{
			    if (date.getHours() < date2.getHours())
				return true;
			    else if (date.getHours() == date2.getHours())
			        if (date.getMinutes() <= date2.getMinutes())
			            return true;
			        else return false;
			}
			else if (date.getHours() == date1.getHours())
			{
				if (date.getMinutes() >= date1.getMinutes())
				{
					return true;
				}
				else return false;
			}
}
