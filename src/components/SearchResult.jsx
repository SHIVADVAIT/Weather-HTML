import React from 'react'
import sunrise_img from "../Assets/sunrise.gif"
import sunset_img from "../Assets/sunset.gif"
import wind_img from "../Assets/wind.gif"
import humidity_img from "../Assets/dryness.gif"


const SearchResult = ({ weatherDetails }) => {
  const { main, name, sys, weather, wind } = weatherDetails;
  const { humidity, temp, temp_max, temp_min } = main;

  const time = (time) => {
    const data = new Date(time * 1000);
    const hr = data.getHours();
    const ampm = hr > 12 ? "PM" : "AM";
    const hours = hr > 12 ? hr - 12 : hr;
    const minutes = data.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  }
  const sunrise = time(sys.sunrise);
  const sunset = time(sys.sunset);


  return (
    name ?
      <>
        <div className="weatherDetails">
          {/* Left Side */}
          <div className="left-block">
            {/* City name */}
            <div>
              <p className='name'>{name}, {sys.country}</p>
              <span>{weather[0].description}</span>
            </div>
            {/* Sunrise */}
            <div className="sun">
              <p><img src={sunrise_img} alt="sunrise_img" className='sun_img' /><br /> {sunrise} IST</p>
            </div>
            {/* Wind */}
            <p><img src={wind_img} alt="wind_img" className='sun_img' /><br /> {Math.floor(wind.speed * 1.609)} km/h</p>
          </div>
          {/* Right Side */}
          <div className="right-block">
            {/* Temperature */}
            <div className='temperature'>
              <p className='temp small-caps'>{Math.floor(temp - 273.15)}°C</p>
              <span>{Math.floor(temp_min - 273.15)}°C | {Math.floor(temp_max - 273.15)}°C </span>
            </div>
            {/* Sunset */}
            <p><img src={sunset_img} alt="sunset_img" className='sun_img' /><br /> {sunset} IST</p>
            {/* Humidity */}
            <p><img src={humidity_img} alt="humidity_img" className='sun_img' /><br />{humidity}%</p>
          </div>
        </div>
      </> : <p>Find Weather of your city</p>
  )
}

export default SearchResult