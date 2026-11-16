import { geocodeCity, fetchWeather, reverseGeocode } from "./api.js";
import { renderWeather } from "./ui.js";
import { getUserPosition } from "./helpers.js";
import { saveLastPlace, loadLastPlace } from "./storage.js";
import { initCityMenu, setActiveCity } from "./cities.js";
import { initMap, showOnMap, onMapClick } from "./map.js";

//--------------------------------------

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const locateBtn = document.getElementById("locate-btn");
const loader = document.querySelector(".loader");

let currentPlace = null;
let busy = false;

//--------------------------------------

const USER_ERRORS = {
  "City not found": "City not found. Try another name.",
  "Location unavailable":
    "Could not get your location. Check the browser permission.",
  "Geolocation unsupported": "Your browser does not support geolocation.",
};

async function showPlace(place, { recenter = true } = {}) {
  const weather = await fetchWeather(place.latitude, place.longitude);

  renderWeather(place, weather);
  saveLastPlace(place);
  setActiveCity(place);
  showOnMap(place, {
    recenter,
    label: `${place.city} · ${Math.round(weather.current.temperature_2m)}°`,
  });
}

async function run(task) {
  if (busy) return;
  busy = true;

  try {
    loader.classList.add("loading");
    await task();
  } catch (error) {
    console.error(error);
    alert(
      USER_ERRORS[error.message] ?? "Unable to load weather. Please try again.",
    );
  } finally {
    searchInput.value = "";
    loader.classList.remove("loading");
    busy = false;
  }
}

//--------------------------------------
// search city

function loadCityWeather(city) {
  return run(async () => {
    const place = await geocodeCity(city);
    await showPlace(place);
  });
}

function loadPlaceWeather(place) {
  return run(() => showPlace(place));
}

//------------------------------
// event listener

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = searchInput.value.trim();
  if (!city) return;
  loadCityWeather(city);
});

locateBtn.addEventListener("click", () =>
  run(async () => {
    const { latitude, longitude } = await getUserPosition();
    const place = await reverseGeocode(latitude, longitude);
    await showPlace(place);
  }),
);

//------------------------------
// init

initMap();

onMapClick((lat, lng) =>
  run(async () => {
    const place = await reverseGeocode(lat, lng);
    await showPlace(place, { recenter: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }),
);

initCityMenu(loadPlaceWeather);

//------------------------------
// sidebar: smooth scroll

document
  .querySelector('[data-action="weather"]')
  .addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

document.querySelector('[data-action="map"]').addEventListener("click", (e) => {
  e.preventDefault();
  document
    .getElementById("map-section")
    .scrollIntoView({ behavior: "smooth", block: "start" });
});

//------------------------------
// startup

const lastPlace = loadLastPlace();

if (lastPlace) {
  loadPlaceWeather(lastPlace);
} else {
  loadCityWeather("Tehran");
}
