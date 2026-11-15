import { GEO_URL, WEATHER_URL, REVERSE_URL } from "./config.js";

//------------------------------------

export async function geocodeCity(name) {
  const res = await fetch(
    `${GEO_URL}?name=${encodeURIComponent(name)}&count=1`,
  );
  if (!res.ok) throw new Error("Geocoding request failed");

  const data = await res.json();
  if (!data.results) throw new Error("City not found");

  const { name: city, latitude, longitude, country } = data.results[0];
  return { city, latitude, longitude, country };
}

//------------------------------------

export async function fetchWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,uv_index,weather_code,is_day",
    hourly: "temperature_2m,weather_code,is_day",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: "auto",
  });

  const res = await fetch(`${WEATHER_URL}?${params}`);
  if (!res.ok) throw new Error("Weather request failed");

  return res.json();
}

//------------------------------------
// reverse

export async function reverseGeocode(latitude, longitude) {
  const res = await fetch(
    `${REVERSE_URL}?lat=${latitude}&lon=${longitude}&format=jsonv2&zoom=10&accept-language=en`,
  );
  if (!res.ok) throw new Error("Reverse geocoding failed");

  const data = await res.json();
  const a = data.address;
  const city = a?.city || a?.town || a?.village || a?.county || a?.state;

  return { city: city ?? "Unknown place", latitude, longitude, country: "" };
}
