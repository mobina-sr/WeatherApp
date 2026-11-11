export function getWeatherInfo(code) {
  if (code === 0) return { label: "Sunny", icon: "ti-sun" };
  if (code === 1) return { label: "Mostly sunny", icon: "ti-sun" };
  if (code === 2) return { label: "Partly cloudy", icon: "ti-cloud" };
  if (code === 3) return { label: "Overcast", icon: "ti-cloud" };
  if (code === 45 || code === 48)
    return { label: "Foggy", icon: "ti-cloud-fog" };
  if (code >= 51 && code <= 57)
    return { label: "Drizzle", icon: "ti-cloud-rain" };
  if (code >= 61 && code <= 67)
    return { label: "Rainy", icon: "ti-cloud-rain" };
  if (code >= 71 && code <= 77)
    return { label: "Snowy", icon: "ti-cloud-snow" };
  if (code >= 80 && code <= 82)
    return { label: "Showers", icon: "ti-cloud-rain" };
  if (code === 85 || code === 86)
    return { label: "Snow showers", icon: "ti-cloud-snow" };
  if (code >= 95) return { label: "Thunderstorm", icon: "ti-cloud-storm" };
  return { label: "Unknown", icon: "ti-cloud" };
}

export function formatHour(time) {
  const hour = Number(time.slice(11, 13));
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12} ${suffix}`;
}

export function formatDay(time, index) {
  if (index === 0) return "Today";
  return new Date(`${time}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });
}
