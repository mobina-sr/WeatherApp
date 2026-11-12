import { geocodeCity, fetchWeather } from "./api.js";
import { renderWeather } from "./ui.js";
import { getUserPosition } from "./helpers.js";
import { saveLastPlace, loadLastPlace } from "./storage.js";

//--------------------------------------

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const locateBtn = document.getElementById("locate-btn");
const loader = document.querySelector(".ti-loader");

//--------------------------------------

const USER_ERRORS = {
  "City not found": "City not found. Try another name.",
  "Location unavailable":
    "Could not get your location. Check the browser permission.",
  "Geolocation unsupported": "Your browser does not support geolocation.",
};

async function showPlace(place) {
  const weather = await fetchWeather(place.latitude, place.longitude);
  renderWeather(place, weather);
  saveLastPlace(place);
}

async function run(task) {
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
  }
}

//--------------------------------------
// city load

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
    await showPlace({ city: "My location", latitude, longitude, country: "" });
  }),
);

//------------------------------

const lastPlace = loadLastPlace();
if (lastPlace) loadPlaceWeather(lastPlace);
else loadCityWeather("Tehran");
