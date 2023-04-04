import React, { useRef, useState } from 'react';
import style from './App.module.scss';
import Search from './Search/Search';
import WeatherCard from './WeatherCard/WeatherCard';
import { getWeather } from './api/api';
import Moment from 'react-moment';
import AddedWeather from './AddedWeather/AddedWeather';

function App() {
  const [currentWeather, setCurrentWeather] = useState(
    JSON.parse(localStorage.getItem('currentWeather')) || null
  );
  localStorage.setItem('currentWeather', JSON.stringify(currentWeather));

  const getOnWeather = (searchData) => {
    getWeather(searchData, setCurrentWeather);
  };

  const searchRef = useRef(false);

  const container = useRef(null);

  const handleSearchFocus = () => {
    searchRef.current = true;
    container.current.style.gridTemplateRows = '8% 22% 26% 44%';
  };

  const handleSearchBlur = () => {
    searchRef.current = false;
    container.current.style.gridTemplateRows = '8% 4% 44% 44%';
  };
  return (
    <div className="App">
      <div ref={container} className={style.container}>
        <div
          onBlur={handleSearchBlur}
          onFocus={handleSearchFocus}
          className={style.input}
        >
          <Search onSearchChange={getOnWeather} />
        </div>
        <div className={style.time}>
          <Moment
            interval={1000}
            format="HH:mm:ss"
            className={style.date}
          ></Moment>
        </div>
        {currentWeather && <WeatherCard data={currentWeather}/>}
        <AddedWeather/>
      </div>
    </div>
  );
}

export default App;
