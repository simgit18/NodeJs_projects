const express = require("express");
const https = require("https");
var app = express();

app.get("/", function(req,res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=b00dbcca40f06426f34c4e13353f93fa"
    https.get(url, function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var iconCode =  weatherData.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/"+iconCode+"@2x.png";

            res.write('<head><meta charset="utf-8"></head>');
            res.write("<img src="+iconUrl+">");
            res.write("<h1>The weather in london is "+temp+" degree celcius</h1>");
            
            res.send();
        })
    
    
    });

})







app.listen(3000, function(){
    console.log("Server is running.")
})