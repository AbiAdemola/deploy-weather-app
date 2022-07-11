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

function showWeatherCondition(weatherResult) {
  let cityValue = document.querySelector(".city");
  cityValue.innerHTML = weatherResult.data.name;

  let celfahValue = document.querySelector(".celfah-data");
  celfahValue.innerHTML = Math.round(weatherResult.data.main.temp);

  let pressureValue = document.querySelector("#pressure");
  pressureValue.innerHTML = weatherResult.data.main.pressure;

  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = weatherResult.data.main.humidity;

  let windValue = document.querySelector("#wind");
  windValue.innerHTML = Math.round(weatherResult.data.wind.speed);

  let descriptionValue = document.querySelector(".weather-description");
  descriptionValue.innerHTML = weatherResult.data.weather[0].description;

  let emojiValue = document.querySelector(".emoji");
  emojiValue.innerHTML = "🛰️";
}

function citySearch(city) {
  console.log(city);
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let apiKey = "b785eaa2a07ee94e53f57f59eb305d73";
  axios.get(`${apiLink}&appid=${apiKey}`).then(showWeatherCondition);
}

//

function weatherSearch(push) {
  push.preventDefault();
  let searchInput = document.querySelector(".form-control");
  let city = `${searchInput.value}`;

  citySearch(city);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", weatherSearch);

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

function unitChangeClick(caller) {
  caller.preventDefault();
  let units = document.querySelector(".celfah-data");
  units.innerHTML = 11;
}
function unitChangeClicker(called) {
  called.preventDefault();
  let units = document.querySelector(".celfah-data");
  let fahconvert = units.innerHTML;
  units.innerHTML = Math.round((fahconvert * 9) / 5 + 32);
}
let celsius = document.querySelector("#celcius");
celsius.addEventListener("click", unitChangeClick);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", unitChangeClicker);
