import React, { useState, useEffect } from "react";

import WeatherCard from "./components/WeatherCard/component";
import "./App.css";

function App() {
  // init for our state variables
  const [query, setQuery] = useState("Sydney, au");
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null
  });

  //defining the data fetchin function
  const data = async q => {
    const apiRes = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=c80b69787ac9c776d1cf86f8a6c50ce7`
    );
    const resJSON = await apiRes.json();
    return resJSON;
  };
  //Function to handle search queries from the user side
  const handleSearch = e => {
    e.preventDefault();
    data(query).then(res => {
      setWeather({
        temp: res.main.temp,
        city: res.name,
        condition: res.weather[0].main,
        country: res.country
      });
    });
  };
  // this hook will make the code run only once the component is mounted and never again (remeber the empty dependency array)
  useEffect(() => {
    data(query).then(res => {
      setWeather({
        temp: res.main.temp,
        city: res.name,
        condition: res.weather[0].main,
        country: res.country
      });
    });
  }, []);

  return (
    <div className="App">
      <WeatherCard
        temp={weather.temp}
        condition={weather.condition}
        city={weather.city}
        country={weather.country}
      />
      <form>
        <input value={query} onChange={e => setQuery(e.target.value)} />
        <button onClick={e => handleSearch(e)}>Search</button>
      </form>
    </div>
  );
}

export default App;
