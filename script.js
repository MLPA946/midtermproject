const apiKey = "1c83fda13bbdb5feaeb48a47488f824d"; // Replace with your API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchForm = document.querySelector(".weather__search");
const searchInput = document.querySelector(".weather__searchform");

const cityElem = document.querySelector(".weather__city");
const datetimeElem = document.querySelector(".weather__datetime");
const forecastElem = document.querySelector(".weather__forecast");
const iconElem = document.querySelector(".weather__icon");
const tempElem = document.querySelector(".weather__temperature");
const minMaxElem = document.querySelector(".weather__minmax");
const realFeelElem = document.querySelector(".weather__realfeel");
const humidityElem = document.querySelector(".weather__humidity");
const windElem = document.querySelector(".weather__wind");
const pressureElem = document.querySelector(".weather__pressure");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) fetchWeather(city);
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        cityElem.textContent = data.name;
        datetimeElem.textContent = new Date().toLocaleString();
        forecastElem.textContent = data.weather[0].description;
        tempElem.textContent = `${Math.round(data.main.temp)}°C`;
        minMaxElem.innerHTML = `Min: ${Math.round(data.main.temp_min)}°C | Max: ${Math.round(data.main.temp_max)}°C`;
        realFeelElem.textContent = `${Math.round(data.main.feels_like)}°C`;
        humidityElem.textContent = `${data.main.humidity}%`;
        windElem.textContent = `${data.wind.speed} km/h`;
        pressureElem.textContent = `${data.main.pressure} hPa`;

        iconElem.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="weather icon">`;

    } catch (error) {
        alert("Error fetching weather data");
    }
}
