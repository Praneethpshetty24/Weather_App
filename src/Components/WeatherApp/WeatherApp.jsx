import React from 'react';
import { useState } from 'react';
import './WeatherApp.css';
import searchIcon from '../Assets/search.png';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import drizzleIcon from '../Assets/drizzle.png';
import humidityIcon from '../Assets/humidity.png';
import rainIcon from '../Assets/rain.png';
import snowIcon from '../Assets/snow.png';
import windIcon from '../Assets/wind.png';

export const WeatherApp = () => {
    let api_key = "f4ca41090461737d3585ad9af01f0346";
    const [wicon, setWicon] = useState(cloudIcon);

    const search = async () =>{
        const element = document.getElementsByClassName("cityInput")
        if(element[0].value === ""){
            return 0;
        }
        let url =`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}`;
        let response = await fetch(url);
        if (response.status !== 200) {
          alert("City not found. Please enter a valid city name.");
          return;
      }
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        temperature[0].innerHTML = `${(data.main.temp - 273.15).toFixed(2)} °C`;
        humidity[0].innerHTML = `${data.main.humidity} %`;
        wind[0].innerHTML = `${(data.wind.speed * 3.6).toFixed(2)} km/h`;
        location[0].innerHTML = data.name;

      
      

        if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setWicon(clearIcon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setWicon(cloudIcon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setWicon(drizzleIcon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setWicon(drizzleIcon);
        }
       
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setWicon(rainIcon);
        }
        else if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setWicon(snowIcon);
        }
        else if (temperature < 0) {
          setWicon(rainIcon);
      }
        else{
            setWicon(clearIcon);
        }



    }
  return (
    <div className='container'>
      <div className='top-bar'>
        <input type="text" className="cityInput" placeholder='Search'/>
        <div className="search-icon" onClick={()=>{search()}}>
          <img src={searchIcon} alt="search icon" />
        </div>
      </div>

      <div className='weather-image'>
        <img src={wicon} alt="..." />
      </div>

      <div className='weather-temp'>
        24°C
      </div>

      <div className='weather-location'>
        Bangalore
      </div>

      <div className='data-container'>
        <div className='element'>
          <img src={humidityIcon} alt="Humidity icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">
              64%
            </div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={windIcon} alt="wind icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">
             wind
            </div>
            <div className="wind-rate">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

