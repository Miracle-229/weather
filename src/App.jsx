import React from 'react';
import style from './App.module.scss';
import AddedWeather from './AddedWeather/AddedWeather';
import MainWeather from './MainWeather/MainWeather';

function App() {

  return (
    <div className="App">
      <div className={style.container}>
        <MainWeather/>
        <AddedWeather />
      </div>
    </div>
  );
}

export default App;
