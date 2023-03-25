import React, { useRef, useState } from "react";
import style from "./App.module.scss";
import Search from "./Search/Search";
import Component from "./Component/Component";
import { handleOnSearchChange } from "./api/api";
import Moment from "react-moment";
import StaticWeather from "./StaticWeather/StaticWeather";

function App() {
  const [currentWeather, setCurrentWeather] = useState(
    JSON.parse(localStorage.getItem("currentWeather")) || null
  );  
  localStorage.setItem("currentWeather", JSON.stringify(currentWeather));

  const handleSearchChange = (searchData) => {
    handleOnSearchChange(searchData, setCurrentWeather);
  };

  const searchRef = useRef(false);

  const container = useRef(null);

  const handleSearchFocus = () => {
    searchRef.current = true;
    container.current.style.gridTemplateRows = "8% 22% 30% 40%";
  };

  const handleSearchBlur = () => {
    searchRef.current = false;
    container.current.style.gridTemplateRows = "8% 4% 48% 40%";
  };
  return (
    <div className="App">
      <div ref={container} className={style.container}>
        <div
          onBlur={handleSearchBlur}
          onFocus={handleSearchFocus}
          className={style.input}
        >
          <Search onSearchChange={handleSearchChange} />
        </div>
        <div className={style.time}>
          <Moment
            interval={1000}
            format="HH:mm:ss"
            className={style.date}
          ></Moment>
        </div>
        {currentWeather && <Component data={currentWeather}></Component>}
        <StaticWeather></StaticWeather>
      </div>
    </div>
  );
}

export default App;
