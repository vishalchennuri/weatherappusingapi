import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const api = {
  key: "6c2c84e3d37cf7aaa80e882b7f620cb6",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const searchPressed = () => {
    setError(null);
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('City not found');
        }
        return res.json();
      })
      .then((result) => {
        setWeather(result);
      })
      .catch((error) => {
        setError(error.message);
        setWeather(null);
      });
  };

  return (
    <div className="container-fluid bg-dark text-white vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-secondary text-white">
              <div className="card-header text-center">
                <h2 className="mb-0">Weather App</h2>
              </div>
              <div className="card-body">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter city/town..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button 
                    className="btn btn-primary" 
                    type="button" 
                    onClick={searchPressed}
                  >
                    Search
                  </button>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {weather && (
                  <div className="text-center">
                    <h3>{weather.name}, {weather.sys.country}</h3>
                    <h1 className="display-4">{Math.round(weather.main.temp)}°C</h1>
                    <p className="text-capitalize">
                      {weather.weather[0].description}
                    </p>
                    <div className="row mt-3">
                      <div className="col">
                        <strong>Humidity</strong>
                        <p>{weather.main.humidity}%</p>
                      </div>
                      <div className="col">
                        <strong>Wind</strong>
                        <p>{weather.wind.speed} m/s</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
