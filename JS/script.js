import { geocodeCity, fetchWeather, reverseGeocode } from "./api.js";
import { renderWeather } from "./ui.js";
import { getUserPosition } from "./helpers.js";
import { saveLastPlace, loadLastPlace } from "./storage.js";
import { initCityMenu, setActiveCity } from "./cities.js";
import { initMap, showOnMap, onMapClick } from "./map.js";
import { showToast } from "./toast.js";

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
  "Location denied":
    "Location access was denied. Allow it in your browser settings.",
  "Location timeout": "Getting your location took too long. Try again.",
  "Location unavailable": "Could not get your location.",
  "Geolocation unsupported": "Your browser does not support geolocation.",
};

async function showPlace(
  place,
  { recenter = true, toast = `Weather updated for ${place.city}` } = {},
) {
  const weather = await fetchWeather(place.latitude, place.longitude);

  renderWeather(place, weather);
  saveLastPlace(place);
  setActiveCity(place);
  showOnMap(place, {
    recenter,
    label: `${place.city} · ${Math.round(weather.current.temperature_2m)}°`,
  });

  if (toast) showToast(toast, "success");
}

async function run(task) {
  if (busy) {
    showToast("Still loading, one moment...", "info", 1500);
    return;
  }

  busy = true;

  try {
    loader.classList.add("loading");
    await task();
  } catch (error) {
    console.error(error);
    showToast(
      USER_ERRORS[error.message] ?? "Unable to load weather. Please try again.",
      "error",
      4000,
    );
  } finally {
    searchInput.value = "";
    loader.classList.remove("loading");
    busy = false;
  }
}

//--------------------------------------
// search city

function loadCityWeather(city, options) {
  return run(async () => {
    const place = await geocodeCity(city);
    await showPlace(place, options);
  });
}

function loadPlaceWeather(place, options) {
  return run(() => showPlace(place, options));
}

//------------------------------
// event listener

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const city = searchInput.value.trim();
  if (!city) {
    showToast("Type a city name first.", "info");
    return;
  }
  loadCityWeather(city);
});

locateBtn.addEventListener("click", () =>
  run(async () => {
    showToast("Getting your location...", "info", 2000);

    const { latitude, longitude } = await getUserPosition();
    const place = await reverseGeocode(latitude, longitude);

    await showPlace(place, {
      toast: `Showing weather for your location: ${place.city}`,
    });
  }),
);

//------------------------------
// init

initMap();

onMapClick((lat, lng) =>
  run(async () => {
    showToast("Looking up this spot...", "info", 1500);

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
  loadPlaceWeather(lastPlace, { toast: false });
} else {
  loadCityWeather("Tehran", { toast: false });
}
