let map = null;
let marker = null;

export function initMap() {
  if (typeof L === "undefined") return;

  map = L.map("map", { scrollWheelZoom: false }).setView([32, 53], 5);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  map.on("click", () => map.scrollWheelZoom.enable());
  map.on("mouseout", () => map.scrollWheelZoom.disable());
}

export function showOnMap(place) {
  if (!map) return;

  const pos = [place.latitude, place.longitude];

  if (marker) marker.setLatLng(pos);
  else
    marker = L.circleMarker(pos, {
      radius: 8,
      color: "#3b82f6",
      fillColor: "#3b82f6",
      fillOpacity: 0.6,
    }).addTo(map);

  map.setView(pos, 8);
}
