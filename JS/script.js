import { geocodeCity, fetchWeather } from "./api.js";
import { renderWeather } from "./ui.js";

async function init() {
  const place = await geocodeCity("Karaj");
  const weather = await fetchWeather(place.latitude, place.longitude);
  renderWeather(place, weather);
}

init();
