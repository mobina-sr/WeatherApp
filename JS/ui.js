import { getWeatherInfo, formatHour, formatDay } from "./helpers.js";

//---------------------------------
// hourly

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function renderHourly(hourly, currentTime) {
  const list = document.getElementById("hourly-list");

  const nowHour = currentTime.slice(0, 13);
  const start = hourly.time.findIndex((t) => t.startsWith(nowHour));
  if (start === -1) return;

  list.innerHTML = "";

  for (let i = start; i < start + 24; i++) {
    const { icon } = getWeatherInfo(hourly.weather_code[i]);
    const isNow = i === start;

    const item = document.createElement("div");

    item.className = isNow ? "hourly-item active" : "hourly-item";
    item.innerHTML = `
      <span class="time">${isNow ? "Now" : formatHour(hourly.time[i])}</span>
      <i class="ti ${icon}"></i>
      <span class="temp">${Math.round(hourly.temperature_2m[i])}°</span>
    `;

    list.appendChild(item);
  }
}

//----------------------------------------
// daily

function renderDaily(daily) {
  const list = document.getElementById("daily-list");
  list.innerHTML = "";

  daily.time.forEach((date, i) => {
    const { icon } = getWeatherInfo(daily.weather_code[i]);

    const item = document.createElement("li");
    item.className = "daily__item";
    item.innerHTML = `
      <span class="day">${formatDay(date, i)}</span>
      <i class="ti ${icon}"></i>
      <span class="min">${Math.round(daily.temperature_2m_min[i])}°</span>
      <div class="bar"></div>
      <span class="max">${Math.round(daily.temperature_2m_max[i])}°</span>
    `;

    list.appendChild(item);
  });
}

//----------------------------
// render weather

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

  // hourly
  renderHourly(weather.hourly, current.time);

  // daily
  renderDaily(daily);
}
