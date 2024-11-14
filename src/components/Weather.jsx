/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import search_i from '../assets/search.png'
import clear from '../assets/clear.png'
import rain from '../assets/rain.png'
import humidity from '../assets/humidity.png'
import drizzle from '../assets/drizzle.png'
import cloud from '../assets/cloud.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'

const Weather = () => {

    const inputRef=useRef()
    const [weather_d,set_weather]=useState(false);

    const allIcons={
        "01d": clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow
    }
    const search = async(city_name)=>{
        if(city_name===""){
            alert("Enter City Naem");
            return;
        }
        try {
            console.log(import.meta.env.VITE_API_KEY)
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=+${import.meta.env.VITE_API_KEY}`   
            const res=await fetch(url);
            const data=await res.json();
            console.log(data);
            const icon=allIcons[data.weather[0].icon] || clear
            set_weather({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {
            set_weather(false);
            console.log("API FETCH ERROR");
        }
    }

    useEffect(()=>{
        search("New York");
    },[])

    return (
    <div className='weather'>
      <div className='search_bar'>
        <input ref={inputRef} type='text' placeholder='Search' className='search_icon'/>
        <img src={search_i} alt='' onClick={()=>{search(inputRef.current.value)}} />
      </div>
      {weather_d?<>
        <img src={weather_d.icon} alt='' className='weather_icon' />
      <p className='temp'>{weather_d.temperature}°C</p>
      <p className='city'>{weather_d.location}</p>
      <div className='weather-data'>
        <div className='col'>
            <img src={humidity} alt=''/>
            <div>
                <p>{weather_d.humidity}</p>
                <span>humidity</span>
            </div>
        </div>
        <div className='col'>
            <img src={wind} alt=''/>
            <div>
                <p>{weather_d.windspeed} kmph</p>
                <span>wind</span>
            </div>
        </div>
      </div>
      </>:<>    </>}
    </div>
  )
}

export default Weather