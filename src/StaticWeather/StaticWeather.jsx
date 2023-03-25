import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import Component from "../Component/Component";
import { initialWeatherData } from "../api/api";
import { BiSearch } from "react-icons/bi";
import { handleOnSearchChangeStatic } from "../api/api";
import style from "./StaticWeather.module.scss";

function StaticWeather() {
  const [staticWeather, setStaticWeather] = useState(
    JSON.parse(localStorage.getItem("staticWeather")) || null
  );
  localStorage.setItem("staticWeather", JSON.stringify(staticWeather));

  const handleSearchChangeStatic = (searchData) => {
    handleOnSearchChangeStatic(searchData, setStaticWeather);
  };

  const buttonSearchRefs = {};
  const inputSearchRefs = {};

  const displayStates = JSON.parse(localStorage.getItem("displayStates")) || {};

  // const onHidden = (id) => {
  //   const display = inputSearchRefs[id].style.display;
  //   inputSearchRefs[id].style.display = display === "none" ? "block" : "none";
  //   const top = buttonSearchRefs[id].style.marginTop;
  //   buttonSearchRefs[id].style.marginTop = top === "0px" ? "40px" : "0px";
  //   console.log(buttonSearchRefs[id].style.marginTop);

  //   displayStates[id] = {
  //     searchDisplay: inputSearchRefs[id].style.display,
  //     buttonDisplay: buttonSearchRefs[id].style.marginTop,
  //   };

  //   localStorage.setItem("displayStates", JSON.stringify(displayStates));
  // };

  // useEffect(() => {
  //   initialWeatherData.forEach((item) => {
  //     const displayState = displayStates[item.id];
  //     if (displayState) {
  //       inputSearchRefs[item.id].style.display = displayState.searchDisplay;
  //       buttonSearchRefs[item.id].style.marginTop = displayState.buttonDisplay;
  //     }
  //   });
  // },);
  return (
    <div className={style.weather_static}>
      {/* {staticWeather.map((item) => ( */}
      <div className={style.weather_static_block}>
        <div
          // ref={(inputSearch) => (inputSearchRefs[item.id] = inputSearch)}
          className={style.static_search}
        >
          <Search onSearchChange={(data) => handleSearchChangeStatic(data)} />
        </div>
        {/* {item.data && ( */}
        <button
          // ref={(buttonSearch) => (buttonSearchRefs[item.id] = buttonSearch)}
          // onClick={() => onHidden(item.id)}
          className={style.button}
          // id={current.id}
        >
          <BiSearch />
        </button>
        {/* )} */}
        {staticWeather && <Component data={staticWeather} />}
      </div>
    </div>
  );
}

export default StaticWeather;
