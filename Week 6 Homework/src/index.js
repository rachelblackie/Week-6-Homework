let now = new Date();
now.getDate();
let date = document.querySelector("#date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
date.innerHTML = `${day} ${hour}:${minute}`;

function updateWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp) + "°C";
  let humidity = document.querySelector("#humid");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${response.data.wind.speed} km/hr`;
}

function searchCity(city) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(updateWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = searchInput.value;

  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "1266ad07b66517497b1acf79ea5a6a64";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-city");
currentLocationButton.addEventListener("click", getCurrentLocation);
