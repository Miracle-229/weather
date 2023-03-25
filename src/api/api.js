import axios from "axios";

export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e7570d208amsh0afcc05e8d8c305p19650djsn0493e9d485d1",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const WEATHER_URL = "https://api.openweathermap.org/data/2.5";

export const WEATHER_CODE = "895284fb2d2c50a520ea537456963d9c";

export const handleOnSearchChange = (searchData, setWeather) => {
  const [lat, lon] = searchData.value.split(" ");
  const url1 = `${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_CODE}&units=metric`;
  axios.get(url1).then(async (response) => {
    const weatherResponse = response.data;
    setWeather({ city: searchData.label, ...weatherResponse });
  });
};

export const handleOnSearchChangeStatic = (searchData, setWeather) => {
  const [lat, lon] = searchData.value.split(" ");
  const url1 = `${WEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_CODE}&units=metric`;
  axios.get(url1).then(async (response) => {
    const weatherResponse = response.data;
    setWeather({ city: searchData.label, ...weatherResponse });
  });
};
