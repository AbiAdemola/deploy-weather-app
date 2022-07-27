//
function getDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
// month and year //

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let now = new Date();
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let fullDateValue = document.querySelector("#monthYear");
fullDateValue.innerHTML = `${month} ${date}, ${year}`;

//   Future Daily Forecast   //

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayDailyForecast(response) {
  let forecastDaily = response.data.daily;

  let forecastElement = document.querySelector("#future-forecast");

  let futureForecastHTML = `<div class="row">`;

  forecastDaily.forEach(function (forecastDays, index) {
    if (index < 6) {
      futureForecastHTML =
        futureForecastHTML +
        `
  <div class="col col-2">
    <strong class="day-date" id="future-forecast">${formatDay(
      forecastDays.dt
    )}</strong>
    <br /><span class="future-icon"> <img src="http://openweathermap.org/img/wn/${
      forecastDays.weather[0].icon
    }@2x.png" alt="icon"/> </span> <br />
    <span id="max-temperature"> ${Math.round(
      forecastDays.temp.max
    )}° </span> <span id="min-temperature">${Math.round(
          forecastDays.temp.min
        )}°</span>
  </div>`;
    }
  });

  futureForecastHTML = futureForecastHTML + `</div>`;
  forecastElement.innerHTML = futureForecastHTML;
}

//   Current Location     //

function getFutureForecast(coordinates) {
  let apiKey = "b785eaa2a07ee94e53f57f59eb305d73";
  let apiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiLink).then(displayDailyForecast);
}

//  Main Weather Display  //

function showWeatherCondition(weatherResult) {
  let cityValue = document.querySelector(".city");
  cityValue.innerHTML = weatherResult.data.name;

  celciusTemperature = weatherResult.data.main.temp;

  let temperatureValue = document.querySelector(".temperature-data");
  temperatureValue.innerHTML = Math.round(celciusTemperature);

  let dateValue = document.querySelector("#date");
  dateValue.innerHTML = getDate(weatherResult.data.dt * 1000);

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
  getFutureForecast(weatherResult.data.coord);
}

// City //

function citySearch(city) {
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let apiKey = "b785eaa2a07ee94e53f57f59eb305d73";
  axios.get(`${apiLink}&appid=${apiKey}`).then(showWeatherCondition);
}

function weatherSearch(search) {
  search.preventDefault();
  let searchInput = document.querySelector(".form-control");
  let city = `${searchInput.value}`;
  citySearch(city);
}

// Current Location //

function searchLocation(mylocation) {
  let apiKey = "b785eaa2a07ee94e53f57f59eb305d73";
  let lat = mylocation.coords.latitude;
  let lon = mylocation.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function getMyCurrentLocation(currentlocation) {
  currentlocation.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let myCurrentLocation = document.querySelector(".current-location");
myCurrentLocation.addEventListener("click", getMyCurrentLocation);

// Temperature //

function celciusTemp(valueCelcius) {
  valueCelcius.preventDefault();

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  let units = document.querySelector(".temperature-data");
  units.innerHTML = Math.round(celciusTemperature);
}

function fahrenheitTemp(valueFahrenheit) {
  valueFahrenheit.preventDefault();

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");

  let units = document.querySelector(".temperature-data");
  units.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);
}
let celciusTemperature = null;

//  //
citySearch("Salford");

//  //
let form = document.querySelector(".search-form");
form.addEventListener("submit", weatherSearch);

let celsius = document.querySelector("#celcius");
celsius.addEventListener("click", celciusTemp);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitTemp);
