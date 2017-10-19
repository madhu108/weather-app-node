$(document).ready(function () {

	var owmUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
	var inputCity;
	var apiKey = "&appid=6d066bc084f1eb21dcd8d852fb0d02e1";
	var lat;
	var lon;
	var weatherFun = function () {

		$.getJSON(owmUrl + inputCity + apiKey, function (data) {
			console.log(data);
			var temp = data.main.temp;
			var celsia = ((temp - 32) / 1.8).toFixed(1);
			var farenheit = (data.main.temp).toFixed(1);
			var wind = data.wind.speed;
			var icon = data.weather[0].icon;
			var desc = data.weather[0].description;

			$('#icondiv').empty().append('<img src="https://openweathermap.org/img/w/' + icon + '.png" height="52" width="52">');
			$('#descriptiondiv').empty().append('<p>' + desc + '</p>');
			$(" #loc").text(data.name);
			$(" #temp-p").text(celsia + " °C");
			$(" #wind").text(wind + " m/s");
			$(".toggle").on("click", (function () {
				$(".f").toggleClass("selected"),
					$(".c").toggleClass("unselected");
				if ($(".f").hasClass("selected")) {
					$(" #temp-p").text(farenheit + " °F");
				} else {
					$(" #temp-p").text(celsia + " °C");
				}
			}));
		});

	};

	$("#city").on('keyup', function (cityName) {
		if (cityName.keyCode == 13) {
			inputCity = $('#city').val();
			weatherFun(inputCity);
		}
	});
	
	if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
	  var pos = JSON.parse(position);
//	  console.log(`here is your geo: ${pos}`);
	  lat = position.crd.latitude;
	  lon = position.crd.longitude;
	  console.log(`lat: ${lat} and lon: ${lon}`);

  });
}

	$('#go').click(function () {
		inputCity = $('#city').val();
		weatherFun(inputCity);
	});

	$.get("https://ipinfo.io", function (response) {
		inputCity = response.city;
		weatherFun(inputCity);
	}, "jsonp");

});