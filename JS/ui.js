import { getWeatherInfo } from "./helpers.js";

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

export function renderWeather(place, weather) {
  const { current, daily } = weather;
  const { label, icon } = getWeatherInfo(weather.current.weather_code);

  const max = Math.round(weather.daily.temperature_2m_max[0]);
  const min = Math.round(weather.daily.temperature_2m_min[0]);
  const rain = weather.daily.precipitation_probability_max[0];

  // main card
  setText("city", place.city);
  setText("temp", `${Math.round(current.temperature_2m)}°`);
  setText("condition", `${label} · H ${max}° - L ${min}°`);
  setText("rain-chance", `Chance of rain: ${rain ?? 0}%`);
  document.getElementById("current-icon").innerHTML =
    `<i class="ti ${icon}"></i>`;

  // air conditions
  setText("feels-like", `${Math.round(current.apparent_temperature)}°`);
  setText("wind", `${Math.round(current.wind_speed_10m)} km/h`);
  setText("humidity", `${Math.round(current.relative_humidity_2m)}%`);
  setText("uv-index", Math.round(current.uv_index));
}
