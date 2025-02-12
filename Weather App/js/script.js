let input = document.querySelector(".input");
let searchBtn = document.querySelector("#search-btn");
let updateLocationBtn = document.querySelector("#update-location-btn");
let cityName = document.querySelector(".city");
let sunrise = document.querySelector(".sunrise");
let sunset = document.querySelector(".sunset");
let time = document.querySelector(".time");
let description = document.querySelector(".description");
let wispeed = document.querySelector(".wispeed");
let humidity = document.querySelector(".humidity");
let pressure = document.querySelector(".pressure");
let temprature = document.querySelector(".temprature");

const api_key = "f2911c52d9ab55be6518521a5d51e84a";
let userTimezoneOffset = 0;

async function showWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

  try {
    let weather = await fetch(url);
    if (!weather.ok) {
      throw new Error("City not found or API error");
    }
    let weatherData = await weather.json();

    cityName.innerHTML = weatherData.name;
    description.innerHTML = `Description: ${weatherData.weather[0].description}`;
    wispeed.innerHTML = `Wind Speed: ${(weatherData.wind.speed * 3.6).toFixed(
      2
    )} Km/h`;
    humidity.innerHTML = `Humidity: ${weatherData.main.humidity}%`;
    pressure.innerHTML = `Pressure: ${weatherData.main.pressure} hPa`;
    temprature.innerHTML = `Temperature: ${weatherData.main.temp.toFixed(2)}°C`;

    let sunriseTime = new Date(weatherData.sys.sunrise * 1000);
    let sunsetTime = new Date(weatherData.sys.sunset * 1000);
    sunrise.innerHTML = `Sunrise: ${
      sunriseTime.getHours().toString().padStart(2, "0") +
      ":" +
      sunriseTime.getMinutes().toString().padStart(2, "0") +
      ":" +
      sunriseTime.getSeconds().toString().padStart(2, "0")
    }`;
    sunset.innerHTML = `Sunset: ${
      sunsetTime.getHours().toString().padStart(2, "0") +
      ":" +
      sunsetTime.getMinutes().toString().padStart(2, "0") +
      ":" +
      sunsetTime.getSeconds().toString().padStart(2, "0")
    }`;

    function updateLocalTime() {

    let localTime = new Date(
      new Date().getTime() + userTimezoneOffset * 1000
    );
      time.innerHTML = `Local Time: ${
        localTime.getHours().toString().padStart(2, "0") +
        ":" +
        localTime.getMinutes().toString().padStart(2, "0") +
        ":" +
        localTime.getSeconds().toString().padStart(2, "0")
      }`;
    }

    updateLocalTime();
    setInterval(updateLocalTime, 1000);
  } catch (error) {
    cityName.innerHTML = "City not found or API error";
  }
}

function getUserLocation() {
  let savedLocation = localStorage.getItem("userLocation");

  if (savedLocation) {
    let { lat, lon } = JSON.parse(savedLocation);
    fetchWeatherByCoords(lat, lon);
  } else {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let lat = position.coords.latitude;
          let lon = position.coords.longitude;
          localStorage.setItem("userLocation", JSON.stringify({ lat, lon }));
          fetchWeatherByCoords(lat, lon);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  }
}

async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

  try {
    let weather = await fetch(url);
    if (!weather.ok) {
      throw new Error("Location-based weather fetch failed");
    }
    let weatherData = await weather.json();
    showWeather(weatherData.name);
  } catch (error) {
    console.error("Error fetching weather for location:", error.message);
  }
}

updateLocationBtn.addEventListener("click", () => {
  localStorage.removeItem("userLocation");
  getUserLocation();
});

window.addEventListener("load", getUserLocation);

searchBtn.addEventListener("click", () => {
  let city = input.value;
  showWeather(city);
  input.value = "";
});
