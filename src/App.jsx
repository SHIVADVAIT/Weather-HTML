import React, { useState } from 'react'
import SearchResult from './components/SearchResult'
import Notfound from './components/Notfound'
import axios from 'axios'
import Images from './components/Images'

const App = () => {
  const [search, setSearch] = useState('');
  const [weatherDetails, setWeatherDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [notFound, SetnotFound] = useState(false)

  const searchCity = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=7f6eecc0b413522481298bfde454583a
`;
      const res = await axios.get(url);
      setWeatherDetails(res.data)
      setRefresh(true);
      SetnotFound(false)
      setSearch("");
    } catch (error) {
      if (!search) {
        alert("Enter city name first!!");
      }
      setRefresh(true);
      SetnotFound(true);
      return console.log(error.message);
    }
  }
  let bgImage;
  if (refresh && !notFound) {
    console.log(weatherDetails.weather[0].main)
    switch (weatherDetails.weather[0].main) {
      case "Clear":
        bgImage = { backgroundImage: `url(${Images.clear})` }
        break;
      case "Clouds":
        bgImage = { backgroundImage: `url(${Images.clouds})` }
        break;
      case "Snow":
        bgImage = { backgroundImage: `url(${Images.snow})` }
        break;
      case "Rain":
        bgImage = { backgroundImage: `url(${Images.rain})` }
        break;
      case "Drizzle":
        bgImage = { backgroundImage: `url(${Images.drizzle})` }
        break;
      case "Thunderstorm":
        bgImage = { backgroundImage: `url(${Images.thunderstorm})` }
        break;
    }
  }
  if (notFound) {
    bgImage = { backgroundImage: `url(${Images.nf})` }
  }
  return (
    <>
      <div className={`container`} style={bgImage}>
        <p className="title">Weather App</p>
        <div className="searchBar">
          <input
            type="text"
            placeholder='Enter your city name...'
            value={search}
            onChange={((e) => { setSearch(e.target.value) })}
          />
          <button className='searchbtn' onClick={searchCity}>Search</button>
        </div>
        {
          refresh ?
            (notFound ? (<Notfound />) : (<SearchResult weatherDetails={weatherDetails} />)) :
            (<p className='bottom-text'>Know your city's weather</p>)
        }
      </div>
    </>
  )
}

export default App
