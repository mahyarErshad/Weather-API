'use strict'
import {getLocation} from './getuserlocation.js'

const input = document.getElementById("input-for-city");
const weatherIcon = document.getElementById("weather-icon");
const outputSection = document.getElementById("output-section");
const weatherDegree = document.getElementById("weather-degree");
const weatherDescription = document.getElementById("weather-description");
const weatherLocation = document.getElementById("weather-location");
const feelsLikeDegree = document.getElementById("feels-like-degree");
const feelsLikeText = document.getElementById("feels-like-text");
const humidityIcon = document.getElementById("humidity-icon");
const humidityText = document.getElementById("humidity-text");
const humidityPercent = document.getElementById("humidity-percent");
const locationBtn = document.getElementById("location-btn");


const getSingleCityWeatherStatus = async (cityName) => {
        const API_KEY = "60aff6ef6f4277d41a57eff7380749a1";
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
        const res = await fetch(API_URL);
        const data = await res.json();
        // console.log(data);
        return data;
};
const  weatherIconChange = (data) => {
    if (data.weather[0].main.startsWith("Clear")) {
        weatherIcon.src = "https://img.icons8.com/office/50/000000/summer.png";
    } else if (data.weather[0].main.startsWith("Clouds")) {
        weatherIcon.src = "https://img.icons8.com/office/50/000000/cloud.png";
    } else if (data.weather[0].main.startsWith("Rain")) {
        weatherIcon.src = "https://img.icons8.com/office/50/000000/heavy-rain.png";
    } else if (data.weather[0].main.startsWith("Snow")) {
        weatherIcon.src = "https://img.icons8.com/office/50/000000/snow.png";
    }
}
const weatherDegreeChange = (data) => {
    document.getElementById("thermometer-icon").innerHTML = `<img src="https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/40/000000/external-thermometer-weather-vitaliy-gorbachev-blue-vitaly-gorbachev.png"/>`;
    const kelvin = data.main.temp;
    // console.log(kelvin);
    const celsius = kelvin - 273.15;
    weatherDegree.innerHTML = Math.floor(celsius) + "&#176;" + "C";
    weatherDegree.className = "fw-bolder fs-1"
}
const weatherDescriptionChange = (data) => {
    weatherDescription.innerHTML = data.weather[0].description;
    weatherDescription.className = "fw-bold fs-3"
}
const weatherLocationChange = (data) => {
    weatherLocation.innerHTML = `<img src="https://img.icons8.com/material-outlined/20/000000/marker.png"/> ${data.name} ${data.sys.country}`;
    weatherLocation.className = "fw-bold fs-4 mb-3"
}
const feelsLikeDegreeChange = (data) => {
    const kelvin = data.main.feels_like;
    // console.log(kelvin);
    const celsius = kelvin - 273.15;
    feelsLikeDegree.innerHTML = Math.floor(celsius) + "&#176;" + "C";
    feelsLikeDegree.className = "fw-bold fs-5"
}
const feelsLikeTextChange = (data) => {
    feelsLikeText.innerHTML = `Feels like`;
    feelsLikeText.className = "fw-bold fs-5"
}
const humidityChange = (data) => {
    humidityIcon.innerHTML = `<img src="https://img.icons8.com/external-justicon-flat-justicon/40/000000/external-humidity-weather-justicon-flat-justicon.png"/>`;
    humidityText.innerHTML = `Humidity`;
    humidityText.className = "fw-bold fs-5"
    humidityPercent.innerHTML = `${data.main.humidity}%`;
    humidityPercent.className = "fw-bold fs-5"
}








input.addEventListener("keyup", async (e)=>{
    // console.log(e.target.value);
    if(e.keyCode === 13) {
        // console.log("hi")
        const cityName = input.value;
        // console.log(cityName);
            const data = await getSingleCityWeatherStatus(cityName);
            input.value = "";
            if (data.cod === "404") {
                alert("City not found");
                outputSection.style.display = "none";
            } else {
                // console.log(data);
                outputSection.style.display = "block";
                weatherIconChange(data);}
                weatherDegreeChange(data);
                weatherDescriptionChange(data);
                weatherLocationChange(data);
                feelsLikeDegreeChange(data);
                feelsLikeTextChange(data);
                humidityChange(data);
}})

locationBtn.addEventListener("click" ,  () => {
    getLocation();
    async () => {
        const API_KEY = "60aff6ef6f4277d41a57eff7380749a1";
        const URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;
        const res = await fetch(URL);
        const data = await res.json();
        // console.log(data);
        weatherIconChange(data);
        weatherDegreeChange(data);
        weatherDescriptionChange(data);
        weatherLocationChange(data);
        feelsLikeDegreeChange(data);
        feelsLikeTextChange(data);
        humidityChange(data);
        return data;
    } });
