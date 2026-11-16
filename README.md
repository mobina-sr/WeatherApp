# Weather Dashboard

A responsive weather app built with HTML, CSS and vanilla JavaScript. Weather data comes from the free [Open-Meteo](https://open-meteo.com/) API (no API key needed).

**Live demo:** [mobina-sr.github.io/WeatherApp](https://mobina-sr.github.io/WeatherApp/)

## Features

- Search any city, or use your current location (shows the real place name)
- Click anywhere on the map to get the weather for that spot
- Current weather, today's high/low and chance of rain
- Feels like, wind, humidity and UV index
- Hourly forecast (next 24 hours) and 7-day forecast
- Quick access to Iranian cities from the sidebar
- Toast notifications for loading, success and errors
- Remembers the last place you viewed
- Responsive design for desktop and mobile

## Built with

- HTML, CSS, JavaScript (ES modules)
- [Open-Meteo API](https://open-meteo.com/) for weather and city search
- [Nominatim](https://nominatim.org/) (OpenStreetMap) for place names
- [Leaflet](https://leafletjs.com/) + OpenStreetMap for the map
- [Tabler Icons](https://tabler.io/icons)

## Run locally

ES modules need a local server, so don't open `index.html` by double-clicking it.

1. Clone the repo
   ```bash
   git clone https://github.com/mobina-sr/WeatherApp.git
   cd WeatherApp
   ``
   ```
2. Install and start the dev server
   ```bash
   npm install
   npm start
   ```
3. Open the folder in VS Code and run **Live Server** on `index.html`.

## Credits

Weather data by [Open-Meteo](https://open-meteo.com/) · Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors

## Author

Mobina · [GitHub](https://github.com/mobina-sr)
