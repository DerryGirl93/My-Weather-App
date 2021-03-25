// current Date & Time
function formatDate(timestamp){
let now = new Date(timestamp);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];
return `${currentDay} ${formatHours(timestamp)}`;
}

// format forecast time
function formatHours(timestamp){
let date = new Date(timestamp);
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let min = date.getMinutes();
if (min < 10) {
  min = `0${min}`;
}

return `${hour}:${min}`
}

//Search engine Function
function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleInputEmail1").value;
  search(city);
}
let city = document.querySelector("form");
city.addEventListener("submit", handleSearch);

//weather api
function showTemperature(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherDiscription").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon")
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  ); 
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celciusTemperature = response.data.main.temp;
  date.innerHTML = formatDate(response.data.dt * 1000);
}

//forecast
function displayForecast(response){
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
  let forecast = null;

 for (let index = 0; index < 6; index++) {
   forecast = response.data.list[index];
   forecastElement.innerHTML += `
<div class="col-2">
  <p>
  <strong>${formatHours(forecast.dt * 1000)}</strong> <br />
  <span> Min ${Math.round(forecast.main.temp_max)}</span>°C | <span>Max ${Math.round(forecast.main.temp_min)}</span>°C <br />
  </p>
  <img
   src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
    }@2x.png"
    />
</div>`
 }
}

//Default city
function search(city) {
  let apiKey = "00579ce2b45dcca0b61cea4da9a1d794";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Current Location
function searchLocation(position) {
  let apiKey = "00579ce2b45dcca0b61cea4da9a1d794";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocation = document.querySelector("#currentCity");
currentLocation.addEventListener("click", getCurrentLocation);


//temperature conversion
function showFahrenheitTemperature(event){
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9/5) + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);

  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function showCelciusTemperature(event){
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celciusTemperature);

  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celciusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemperature);

search("London");