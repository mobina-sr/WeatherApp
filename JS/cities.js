const IRAN_CITIES = [
  { city: "Tehran", latitude: 35.69, longitude: 51.42, country: "Iran" },
  { city: "Karaj", latitude: 35.83266, longitude: 50.99155, country: "Iran" },
  { city: "Mashhad", latitude: 36.3, longitude: 59.6, country: "Iran" },
  { city: "Isfahan", latitude: 32.65, longitude: 51.67, country: "Iran" },
  { city: "Shiraz", latitude: 29.59, longitude: 52.58, country: "Iran" },
  { city: "Tabriz", latitude: 38.1, longitude: 46.27, country: "Iran" },
  { city: "Rasht", latitude: 37.28, longitude: 49.58, country: "Iran" },
  { city: "Ahvaz", latitude: 31.32, longitude: 48.67, country: "Iran" },
  { city: "Yazd", latitude: 31.9, longitude: 54.36, country: "Iran" },
];

const toggle = document.getElementById("cities-toggle");
const menu = document.getElementById("cities-menu");

export function initCityMenu(select) {
  IRAN_CITIES.forEach((place) => {
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = "#";
    link.className = "nav__city";
    link.textContent = place.city;
    link.addEventListener("click", (e) => {
      e.preventDefault();
      select(place);
    });

    li.appendChild(link);
    menu.appendChild(li);
  });

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
  });
}

export function setActiveCity(place) {
  menu.querySelectorAll(".nav__city").forEach((link) => {
    link.classList.toggle("active", link.textContent === place.city);
  });
}
