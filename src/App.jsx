import React, { useRef, useState } from "react";
import "./App.scss";

function App() {
    const [city, setCity] = useState();
    const containerEl = useRef();
    const weatherBoxEl = useRef();
    const weatherDetailsEl = useRef();
    const error404El = useRef();
    const imageInWeatherBox = useRef();
    const temperatureInWeatherBox = useRef();
    const descriptionInWeatherBox = useRef();
    const humidityInWeatherDetails = useRef();
    const windInWeatherDetails = useRef();

    const handleChange = (e) => {
        setCity(e.target.value);
        console.log(city);
    };
    const ApiSelection = () => {
        const APIKey = "bd26e48ffaa56db522a092868c5979f5";
        if (city === "") return;
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
        )
            .then((res) => res.json())
            .then((json) => {
                if (json.cod === "404") {
                    containerEl.current.style.height = "400px";
                    weatherBoxEl.current.style.display = "none";
                    weatherDetailsEl.current.style.display = "none";
                    error404El.current.style.display = "block";
                    error404El.current.classList.add("fade-in");
                    return;
                }
                error404El.current.style.display = "none";
                error404El.current.classList.remove("fade-in");

                switch (json.weather[0].main) {
                    case "Clear":
                        imageInWeatherBox.current.src = "./images/clear.svg";
                        break;
                    case "Rain":
                        imageInWeatherBox.current.src = "./images/rain.svg";
                        break;
                    case "Snow":
                        imageInWeatherBox.current.src = "./images/snow.svg";
                        break;
                    case "Clouds":
                        imageInWeatherBox.current.src = "./images/cloud.svg";
                        break;
                    case "Haze":
                        imageInWeatherBox.current.src = "./images/mist.svg";
                        break;

                        default: 
                        imageInWeatherBox.current.src = '';
                }

                temperatureInWeatherBox.current.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`
                descriptionInWeatherBox.current.innerHTML = `${json.weather[0].description}`
                humidityInWeatherDetails.current.innerHTML = `${json.main.humidity}%`
                windInWeatherDetails.current.innerHTML = `${parseInt(json.wind.speed)}m/s`

                weatherBoxEl.current.style.display = '';
                weatherDetailsEl.current.style.display = "";
                weatherBoxEl.current.classList.add('fade-in');
                weatherDetailsEl.current.classList.add('fade-in');
                containerEl.current.style.height = "590px";
            });
    };

    return (
        <div className="container" ref={containerEl}>
            <div className="search-box">
                <i className="fa-solid fa-location-dot"></i>
                <input
                    type="text"
                    placeholder="Enter your location"
                    onChange={handleChange}
                />
                <button
                    className="fa-solid fa-magnifying-glass"
                    onClick={ApiSelection}
                ></button>
            </div>
            <div className="not-found" ref={error404El}>
                <img src="./images/ErrorPage.jpg" alt="error 404" />
                <p>Oops! Invalid location :/</p>
            </div>

            <div className="weather-box" ref={weatherBoxEl}>
                <img src="" alt="" ref={imageInWeatherBox} />
                <p className="temperature" ref={temperatureInWeatherBox}></p>
                <p className="description" ref={descriptionInWeatherBox}></p>
            </div>

            <div className="weather-details" ref={weatherDetailsEl}>
                <div className="humidity">
                    <i className="fa-solid fa-water"></i>
                    <div className="text">
                        <span ref={humidityInWeatherDetails}></span>
                        <p>Humidity</p>
                    </div>
                </div>
                <div className="wind">
                    <i className="fa-solid fa-wind"></i>
                    <div className="text">
                        <span ref={windInWeatherDetails}></span>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
