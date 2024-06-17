import React, { useState } from "react";
const api = {
  key: "6c2c84e3d37cf7aaa80e882b7f620cb6",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch operation
        console.error("Fetch error:", error);
      });
  };
  return (
    <div className="container">
      <div className=" full-height w-300  d-flex justify-content-center align-items-center text-center">
        <div class="container mt-5">
          <div class="card">
            {/* header */}
            <h1 className="display-2 mb-4">Weather app</h1>
            <div class="card-body">
              {/* search box */}
              <div>
                <input
                  type="text"
                  className="mb-3"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Enter city/town..."
                />
                <br />
                <button
                  onClick={searchPressed}
                  className="btn p-2 btn-warning "
                >
                  Search
                </button>
                {/* location */}
                <h5 class="card-title mt-3">
                  <p>{weather.name}</p>
                </h5>
              </div>
              {typeof weather.main !== "undefined" ? (
                <div>
                  {/* TEMPERATURE */}
                  <p> {weather.main.temp} C</p>

                  {/* CONDITION */}
                  <p>{weather.weather[0].description}</p>
                </div>
              ) : ( ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
