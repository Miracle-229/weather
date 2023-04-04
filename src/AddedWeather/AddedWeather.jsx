import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import WeatherCard from '../WeatherCard/WeatherCard';
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from 'react-icons/ai';
import { getAddedWeather, getLocalStorage, setLocalStorage } from '../api/api';
import style from './AddedWeather.module.scss';

function AddedWeather() {
  const [addedWeather, setAddedWeather] = useState([]);

  const addNewWeather = () => {
    const newId = `added_${Math.random().toString(36).substring(2, 9)}`;
    const newData = { id: newId, data: null };
    setAddedWeather([...addedWeather, newData]);
    const addedWeatherData = getLocalStorage();
    addedWeatherData[newId] = newData;
    setLocalStorage(addedWeatherData);
  };

  const deleteNewWeather = (id) => {
    const addedWeatherData = getLocalStorage();
    delete addedWeatherData[id];
    setLocalStorage(addedWeatherData);
    setAddedWeather((prevData) => prevData.filter((item) => item.id !== id));
  };

  const getOnAddedWeather = (searchData, id) => {
    getAddedWeather(searchData, id, setAddedWeather);
  };

  useEffect(() => {
    const addedWeatherData = getLocalStorage();
    const weatherData = Object.values(addedWeatherData);
    setAddedWeather(weatherData);
  }, []);

  return (
    <div className={style.weather_static}>
      {addedWeather.map((item) => (
        <div key={item.id} className={style.weather_static_block}>
          <div className={style.static_search}>
            <Search
              onSearchChange={(data) => getOnAddedWeather(data, item.id)}
            />
          </div>
          {item.data && (
            <AiOutlineMinusSquare
              onClick={() => deleteNewWeather(item.id)}
              className={style.button_search}
              id={item.id}
            />
          )}
          {item.data && <WeatherCard data={item.data} />}
        </div>
      ))}
      <AiOutlinePlusSquare
        onClick={addNewWeather}
        className={style.button_add}
      />
    </div>
  );
}

export default AddedWeather;
