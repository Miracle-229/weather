import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import Component from '../Component/Component';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { handleOnSearchChangeStatic } from '../api/api';
import style from './StaticWeather.module.scss';

function StaticWeather() {
  const [staticWeather, setStaticWeather] = useState([]);

  const addNewWeather = () => {
    const newId = `static${Math.random().toString(36).substring(2, 9)}`;
    const newData = { id: newId, data: null };
    setStaticWeather([...staticWeather, newData]);
    const staticWeatherData =
      JSON.parse(localStorage.getItem('staticWeatherData')) || {};
    staticWeatherData[newId] = newData;
    localStorage.setItem(
      'staticWeatherData',
      JSON.stringify(staticWeatherData)
    );
  };

  const deleteNewWeather = (id) => {
    const staticWeatherData =
      JSON.parse(localStorage.getItem('staticWeatherData')) || {};
    delete staticWeatherData[id];
    localStorage.setItem(
      'staticWeatherData',
      JSON.stringify(staticWeatherData)
    );
    setStaticWeather((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleSearchChangeStatic = (searchData, id) => {
    handleOnSearchChangeStatic(searchData, id, setStaticWeather);
  };

  useEffect(() => {
    const staticWeatherData =
      JSON.parse(localStorage.getItem('staticWeatherData')) || {};
    const weatherData = Object.values(staticWeatherData);
    setStaticWeather(weatherData);
  }, []);

  return (
    <div className={style.weather_static}>
      {staticWeather.map((item) => (
        <div key={item.id} className={style.weather_static_block}>
          <div className={style.static_search}>
            <Search
              onSearchChange={(data) => handleSearchChangeStatic(data, item.id)}
            />
          </div>
          {item.data && (
            <AiOutlineMinusSquare
              onClick={() => deleteNewWeather(item.id)}
              className={style.button_search}
              id={item.id}
            />
          )}
          {item.data && <Component data={item.data} />}
        </div>
      ))}
      <AiOutlinePlusSquare
        onClick={addNewWeather}
        className={style.button_add}
      />
    </div>
  );
}

export default StaticWeather;
