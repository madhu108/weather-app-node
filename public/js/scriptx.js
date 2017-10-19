$(document).ready(function () {

	var inputCity;
	var lat;
	var lon;
	var apiKey = '6d066bc084f1eb21dcd8d852fb0d02e1';

	var cityFun = function () {

		$.getJSON(`https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${inputCity}&appid=${apiKey}`, function (data) {
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
		}))
	});

	};
	var latLonFun = function(){
		$.getJSON(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`, function (data) {
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
		}))
	});
	};
	var err = function(){
		console.log(`geoloc error`);
		$.get("https://ipinfo.io", function (response) {
			inputCity = response.city;
			console.log(`inputCity: ${inputCity}`);
			cityFun();
		}, "jsonp");
	}
	

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			console.log(`lat: ${lat} and lon: ${lon}`);
			latLonFun();			
		},err());
	};
	
	$("#city").on('keyup', function (cityName) {
		if (cityName.keyCode == 13) {
			inputCity = $('#city').val();
			cityFun();
		}
	});
	$('#go').click(function () {
		inputCity = $('#city').val();
		weatherFun();
	});

});