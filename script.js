//

let now = new Date();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

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

let dayDated = document.querySelector(".date");
dayDated.innerHTML = `${day} ${hours}:${minutes}`;

//
function displayForecast() {
  let forecastElement = document.querySelector("#future-forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col col-2">
    <strong class="day-date" id="future-forecast"> Thurs 02</strong>
    <br /><span class="future-icon"> <img src="http://openweathermap.org/img/wn/10d@2x.png" alt="icon"/> </span> <br />
    <span id="max-temperature"> 18°C </span> <span id="min-temperature"> 11℃</span>
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
//

function showWeatherCondition(weatherResult) {
  let cityValue = document.querySelector(".city");
  cityValue.innerHTML = weatherResult.data.name;

  celsiusTemperature = weatherResult.data.main.temp;

  let temperatureValue = document.querySelector(".temperature-data");
  temperatureValue.innerHTML = Math.round(celsiusTemperature);

  let pressureValue = document.querySelector("#pressure");
  pressureValue.innerHTML = weatherResult.data.main.pressure;

  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = weatherResult.data.main.humidity;

  let windValue = document.querySelector("#wind");
  windValue.innerHTML = Math.round(weatherResult.data.wind.speed);

  let descriptionValue = document.querySelector("#weatherdescription");
  descriptionValue.innerHTML = weatherResult.data.weather[0].description;

  let iconValue = document.querySelector("#icon");
  iconValue.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherResult.data.weather[0].icon}@2x.png`
  );
  iconValue.setAttribute("alt", weatherResult.data.weather[0].description);
}

function citySearch(city) {
  console.log(city);
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let apiKey = "b785eaa2a07ee94e53f57f59eb305d73";
  axios.get(`${apiLink}&appid=${apiKey}`).then(showWeatherCondition);
}

//
function weatherSearch(search) {
  search.preventDefault();
  let searchInput = document.querySelector(".form-control");
  let city = `${searchInput.value}`;
  citySearch(city);
}

function searchLocation(mylocation) {
  let apiKey = "b785eaa2a07ee94e53f57f59eb305d73";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${mylocation.coords.latitude}&lon=${mylocation.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getMyCurrentLocation(currentlocation) {
  currentlocation.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let myCurrentLocation = document.querySelector(".current-location");
myCurrentLocation.addEventListener("click", getMyCurrentLocation);

//

function celsiusTemp(valueCelcius) {
  valueCelcius.preventDefault();

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let units = document.querySelector(".temperature-data");
  units.innerHTML = Math.round(celsiusTemperature);
}

function fahrenheitTemp(valueFahrenheit) {
  valueFahrenheit.preventDefault();

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");

  let units = document.querySelector(".temperature-data");
  units.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let celsiusTemperature = null;

citySearch("Salford");

let form = document.querySelector(".search-form");
form.addEventListener("submit", weatherSearch);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusTemp);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitTemp);
