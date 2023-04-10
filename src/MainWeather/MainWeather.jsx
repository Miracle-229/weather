import React, { useRef, useState } from 'react';
import style from './MainWeather.module.scss';
import Search from '../Search/Search'
import WeatherCard from '../WeatherCard/WeatherCard';
import { getWeather } from '../api/api';
import Moment from 'react-moment';

function MainWeather() {
  const [currentWeather, setCurrentWeather] = useState(
    JSON.parse(localStorage.getItem('currentWeather')) || null
  );
  localStorage.setItem('currentWeather', JSON.stringify(currentWeather));

  const getOnWeather = (searchData) => {
    getWeather(searchData)
      .then((weatherResponse) => {
        setCurrentWeather(weatherResponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchRef = useRef(false);

  const containerRef = useRef(null);

  const handleSearchFocus = () => {
    searchRef.current = true;
    containerRef.current.style.gridTemplateRows = '14% 40% 46%';
  };

  const handleSearchBlur = () => {
    searchRef.current = false;
    containerRef.current.style.gridTemplateRows = '14% 8% 78%';
  };
  return (
    <div ref={containerRef} className={style.container}>
      <div
        ref={searchRef}
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
      {currentWeather && <WeatherCard data={currentWeather} />}
    </div>
  );
}

export default MainWeather;
