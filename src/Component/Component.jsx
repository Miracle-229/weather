import React, { useEffect, useRef } from "react";
import style from "./Component.module.scss";
import { TiWeatherWindy, TiThermometer } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";

function Component({ data }) {
  const back = useRef(null);
  useEffect(() => {
    if (back.current && data.main.temp > 17) {
      back.current.style.backgroundImage = "url(original.jpg)";
    } else back.current.style.backgroundImage = "url(forest.jpg)";
  }, [data]);
  return (
    <div className={style.component_block}>
      <div ref={back} className={style.component}>
        <div className={style.left_content}>
          <p className={style.city}>{data.city}</p>
          {data.name ? (
            <p className={style.temp}>{Math.round(data.main.temp)}°C</p>
          ) : null}
          {data.weather ? (
            <p className={style.description}>{data.weather[0].main}</p>
          ) : null}
        </div>
        <div className={style.right_content}>
          {data.main ? (
            <p className={style.humidity}>
              <WiHumidity className={style.icon} />
              {data.main.humidity}%
            </p>
          ) : null}
          {data.main ? (
            <p className={style.feels}>
              <TiThermometer className={style.icon} />
              {Math.ceil(data.main.feels_like)}°C
            </p>
          ) : null}
          {data.wind ? (
            <p className={style.wind}>
              <TiWeatherWindy className={style.icon}></TiWeatherWindy>
              {(data.wind.speed).toFixed(1)} KMH
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Component;
