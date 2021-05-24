const alert = document.querySelector(".alert");
const defaultIcon =document.querySelector(".default-icon") ;
const tempValue =document.querySelector(".temp-value p");
const tempDesc =document.querySelector(".temp-desc p");
const locationElement=document.querySelector(".location p");

const weather = {};

weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;
const key = "9cd6803239df20c9f4c8f0844bb1bd83";



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    alert.style.display = "block";
    alert.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}


function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

function showError(error){
    alert.style.display = "block";
    alert.innerHTML = `<p> ${error.message} </p>`;
}


function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
   
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            console.log(data);
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    defaultIcon.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempValue.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    tempDesc.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
