import axios from 'axios';

export const geoApiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_GEO_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_GEO_API_HOST,
  },
};

export const GEO_URL = process.env.REACT_APP_GEO_URL;

export const WEATHER_URL = process.env.REACT_APP_WEATHER_URL;

export const WEATHER_CODE = process.env.REACT_APP_WEATHER_CODE;

export const searchWeather = async (inputValue) => {
  const url = `${GEO_URL}/cities?namePrefix=${inputValue}`;
  try {
    const response = await axios.get(url, geoApiOptions);
    return {
      options: response.data.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name},${city.countryCode}`,
        };
      }),
    };
  } catch (error) {
    console.log(error);
  }
};

export const getWeather = async (searchData) => {
  const [lat, lon] = searchData.value.split(' ');
  const url1 = `${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_CODE}&units=metric`;
  try {
    const response = await axios.get(url1);
    const weatherResponse = response.data;
    return { city: searchData.label, ...weatherResponse };
  } catch (error) {
    console.log(error);
  }
}; 

export const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('addedWeatherData')) || {};
};
export const setLocalStorage = (data) => {
  localStorage.setItem('addedWeatherData', JSON.stringify(data));
};

export const getAddedWeather = async (searchData, id) => {
  const [lat, lon] = searchData.value.split(' ');
  const url1 = `${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_CODE}&units=metric`;
  try {
    const response = await axios.get(url1);
    const weatherResponse = response.data;
    const newData = { city: searchData.label, ...weatherResponse };
    return newData;
  } catch (error) {
    console.log(error);
  }
};
