export function renderWeather(place, weather) {
  const city = document.getElementById("city");
  const temp = document.getElementById("temp");

  city.textContent = place.city;
  temp.textContent = `${Math.round(weather.current.temperature_2m)}°`;
}
