import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import Component from "../Component/Component";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { handleOnSearchChangeStatic } from "../api/api";
import style from "./StaticWeather.module.scss";

function StaticWeather() {
  const [staticWeather, setStaticWeather] = useState([]);

  const addNewWeather = () => {
    const newId = `static${staticWeather.length + 1}`;
    const newData = { id: newId, data: null };
    setStaticWeather([...staticWeather, newData]);
    localStorage.setItem(newId, JSON.stringify(newData));
  };

  const handleSearchChangeStatic = (searchData, id) => {
    handleOnSearchChangeStatic(searchData, id, setStaticWeather);
  };

  const buttonSearchRefs = {};
  const inputSearchRefs = {};

  const displayStates = JSON.parse(localStorage.getItem("displayStates")) || {};

  const onHidden = (id) => {
    const display = inputSearchRefs[id].style.display;
    inputSearchRefs[id].style.display = display === "none" ? "block" : "none";
    const top = buttonSearchRefs[id].style.marginTop;
    buttonSearchRefs[id].style.marginTop = top === "0px" ? "40px" : "0px";
    console.log(buttonSearchRefs[id].style.marginTop);

    displayStates[id] = {
      searchDisplay: inputSearchRefs[id].style.display,
      buttonDisplay: buttonSearchRefs[id].style.marginTop,
    };

    localStorage.setItem("displayStates", JSON.stringify(displayStates));
  };

  useEffect(() => {
    staticWeather.forEach((item) => {
      const displayState = displayStates[item.id];
      if (displayState) {
        inputSearchRefs[item.id].style.display = displayState.searchDisplay;
        buttonSearchRefs[item.id].style.marginTop = displayState.buttonDisplay;
      }
    });
    const weatherIds=Object.keys(localStorage).filter((key)=>key.startsWith("static"))
    const weatherData=weatherIds.map((id)=>{
      const data=localStorage.getItem(id);
      return {id:id,data:JSON.parse(data)}
    })
    setStaticWeather(weatherData)
  },[]);
  return (
    <div className={style.weather_static}>
      {staticWeather.map((item) => (
        <div key={item.id} className={style.weather_static_block}>
          <div
            ref={(inputSearch) => (inputSearchRefs[item.id] = inputSearch)}
            className={style.static_search}
          >
            <Search
              onSearchChange={(data) => handleSearchChangeStatic(data, item.id)}
            />
          </div>
          {item.data && (
            <button
              ref={(buttonSearch) => (buttonSearchRefs[item.id] = buttonSearch)}
              onClick={() => onHidden(item.id)}
              className={style.button_search}
              id={item.id}
            >
              <BiSearch />
            </button>
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
