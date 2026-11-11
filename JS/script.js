import { geocodeCity, fetchWeather } from "./api.js";
import { renderWeather } from "./ui.js";

//--------------------------------------

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const loader = document.querySelector(".ti-loader");

async function loadCityWeather(city) {
  try {
    loader.classList.add("loading");

    const place = await geocodeCity(city);
    const weather = await fetchWeather(place.latitude, place.longitude);

    renderWeather(place, weather);
    searchInput.value = "";

    window.weather = weather;
    console.log(weather.daily.time, weather.daily.weather_code);
    console.table(weather.current);
  } catch (error) {
    console.error(error);

    alert(
      error.message === "City not found"
        ? "City not found. Try another name."
        : "Unable to load weather. Please try again.",
    );

    searchInput.value = "";
  } finally {
    loader.classList.remove("loading");
  }
}

//------------------------------
// form

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = searchInput.value.trim();

  if (!city) return;
  loadCityWeather(city);
});

loadCityWeather("Tehran");
