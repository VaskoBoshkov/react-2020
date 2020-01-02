import React from "react";

import WeatherCard from "./components/WeatherCard/component";
import "./App.css";

function App() {
  return (
    <div className="App">
      <WeatherCard temp={3} condition="Rain" city="Sydney" country="AU" />
      <WeatherCard temp={20} condition="Dust" city="Melbourne" country="AU" />
      <WeatherCard temp={40} condition="Tornado" city="Lodnon" country="GB" />
    </div>
  );
}

export default App;
