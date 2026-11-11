export function getWeatherInfo(code, isDay = 1) {
  if (code === 0)
    return {
      label: isDay ? "Sunny" : "Clear night",
      icon: isDay ? "ti-sun" : "ti-moon",
      color: isDay ? "#FFC107" : "#94A3B8",
    };

  if (code === 1)
    return {
      label: isDay ? "Mostly sunny" : "Mostly clear",
      icon: isDay ? "ti-sun" : "ti-moon",
      color: isDay ? "#FFC107" : "#94A3B8",
    };
  if (code === 2)
    return { label: "Partly cloudy", icon: "ti-cloud", color: "#CBD5E1" };

  if (code === 3)
    return { label: "Overcast", icon: "ti-cloud", color: "#94A3B8" };

  if (code === 45 || code === 48)
    return { label: "Foggy", icon: "ti-cloud-fog", color: "#94A3B8" };

  if (code >= 51 && code <= 57)
    return { label: "Drizzle", icon: "ti-cloud-rain", color: "#38BDF8" };

  if (code >= 61 && code <= 67)
    return { label: "Rainy", icon: "ti-cloud-rain", color: "#38BDF8" };

  if (code >= 71 && code <= 77)
    return { label: "Snowy", icon: "ti-cloud-snow", color: "#E0F2FE" };

  if (code >= 80 && code <= 82)
    return { label: "Showers", icon: "ti-cloud-rain", color: "#0EA5E9" };

  if (code === 85 || code === 86)
    return { label: "Snow showers", icon: "ti-cloud-snow", color: "#E0F2FE" };

  if (code >= 95)
    return { label: "Thunderstorm", icon: "ti-cloud-storm", color: "#A78BFA" };

  return { label: "Unknown", icon: "ti-cloud", color: "#CBD5E1" };
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
