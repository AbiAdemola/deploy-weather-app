//

let now = new Date();
console.log(now);

let date = now.getDate();
console.log(date);

let hours = now.getHours();
console.log(hours);
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
console.log(minutes);
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
  "Saturday"
];
let day = days[now.getDay()];
console.log(day);

let dayDated = document.querySelector(".date");
dayDated.innerHTML = `${day} ${hours}:${minutes}`;

//

function showWeatherCondition(weatherResult) {
  document.querySelector(".spec").innerHTML = weatherResult.data.name;
  document.querySelector(".celfah-data").innerHTML = Math.round(
    weatherResult.data.main.temp
  );
  console.log(weatherResult);
  document.querySelector(".pressure").innerHTML =
    weatherResult.data.main.pressure;
  document.querySelector(".humidity").innerHTML =
    weatherResult.data.main.humidity;
  document.querySelector(".wind").innerHTML = Math.round(
    weatherResult.data.wind.speed
  );
  document.querySelector(".description").innerHTML =
    weatherResult.data.weather[0].main;
  document.querySelector(".emoji").innerHTML = "🛰️";
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
