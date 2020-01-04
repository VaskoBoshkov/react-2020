import React from "react";

import WeatherCard from "./components/WeatherCard/component";
import "./App.css";

function App() {
  const data = async () => {
    const apiRes = await fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=London,gb&units=metric&APPID=c80b69787ac9c776d1cf86f8a6c50ce7"
    );
    const resJSON = await apiRes.json();
    return resJSON;
  };
  data().then(res => {
    console.log("the feels like is " + res.main.feels_like);
    console.log("the temp is " + res.main.temp);
  });

  return (
    <div className="App">
      <WeatherCard temp={3} condition="Rain" city="Sydney" country="AU" />
      <WeatherCard temp={20} condition="Dust" city="Melbourne" country="AU" />
      <WeatherCard temp={40} condition="Tornado" city="Lodnon" country="GB" />
    </div>
  );
}

export default App;
