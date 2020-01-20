import React, { useState, useEffect } from "react";

import WeatherCard from "./WeatherCard/component";

const WeatherEngine = ({ location }) => {
  // init for our state variables
  const [query, setQuery] = useState(""); // for user query
  const [error, setError] = useState(false); // for error handeling
  const [loading, setLoading] = useState(false); // for loading state
  const [weather, setWeather] = useState({
    // to display and store weather for specific cities
    temp: null,
    city: null,
    condition: null,
    country: null
  });

  //defining the data fetchin function
  const getWeather = async q => {
    setQuery(""); // reset the query to empty
    setLoading(true); // set loading to true while we fetch the results
    try {
      const apiRes = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=c80b69787ac9c776d1cf86f8a6c50ce7`
      );
      const resJSON = await apiRes.json();
      setWeather({
        temp: resJSON.main.temp,
        city: resJSON.name,
        condition: resJSON.weather[0].main,
        country: resJSON.country
      });
    } catch (error) {
      setError(true); // If there is any error just set error to true
    }
    setLoading(false);
  };
  //Function to handle search queries from the user side
  const handleSearch = e => {
    e.preventDefault();
    getWeather(query);
  };
  // this hook will make the code run only once the component is mounted and will only run when Location changes which won't happen
  useEffect(() => {
    getWeather(location);
  }, [location]);

  return (
    <div>
      {!loading && !error ? ( // If there is no error and no loading
        <div>
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
      ) : loading ? ( // if there is loading
        <div style={{ color: "black" }}>Loading</div>
      ) : !loading && error ? ( // if there is an error and no loading
        <div style={{ color: "black" }}>
          There has been an error!
          <br />
          <button onClick={() => setError(false)}>Reset!</button>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherEngine;
