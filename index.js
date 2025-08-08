const apiKey = "d956f9be67f1bd8838306d9a6974bd1f";

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherCard = document.getElementById("weather-card");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  fetchWeatherByCity(city);
});

window.addEventListener("load", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      err => {
        console.warn("Location blocked. Please search manually.");
      }
    );
  }
});

async function fetchWeatherByCity(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    alert("Error: " + err.message);
  }
}

async function fetchWeatherByCoords(lat, lon) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather not found for your location");
    const data = await res.json();
    displayWeather(data);
  } catch (err) {
    alert("Error: " + err.message);
  }
}

function displayWeather(data) {
  document.getElementById("city-name").textContent = data.name;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("temp").textContent = data.main.temp;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("wind").textContent = data.wind.speed;
  weatherCard.classList.remove("hidden");
}
