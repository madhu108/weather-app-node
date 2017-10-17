
$(function(){
    alert('haribol');
    $.getJSON("http://ip-api.com/json", function(json){
      var lat = json.lat;
      var lon = json.lon;
      var city = json.city;
      var cC = json.countryCode;
        $.getJSON("https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city + "," + cC + "&appid=6d066bc084f1eb21dcd8d852fb0d02e1",function(data){
        //console.log(data);
            var temp = data.main.temp; 
            var celsia = ((temp - 32)/1.8).toFixed(1);
            var farenheit = (data.main.temp).toFixed(1);
            var wind = data.wind.speed;
            var icon = data.weather[0].icon;
            var desc = data.weather[0].description;
        
            $('#icondiv').empty().append('<img src="https://crossorigin.me/https://openweathermap.org/img/w/'+ icon +'.png" height="52" width="52">');
            $('#descriptiondiv').empty().append('<p>'+ desc +'</p>');     
            $(" #loc").text(city);
            $(" #temp-p").text(celsia + " °C");
            $(" #wind").text(wind + " m/s");
            $(".toggle").on("click",(function(){
            $(".f").toggleClass("selected"),
            $(".c").toggleClass("unselected");
                if($(".f").hasClass("selected")){
                    $(" #temp-p").text(farenheit + " °F");
                } else {
                    $(" #temp-p").text(celsia + " °C");
                }
            }));
        });
    });
})
