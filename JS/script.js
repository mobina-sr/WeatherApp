import { geocodeCity, fetchWeather } from "./api.js";
import { renderWeather } from "./ui.js";

async function init() {
  const place = await geocodeCity("Karaj");
  const weather = await fetchWeather(place.latitude, place.longitude);
  renderWeather(place, weather);

  window.weather = weather;
  console.log(weather);
  console.table(weather.current);
}

init();
