const KEY = "weather:lastPlace";

export function saveLastPlace(place) {
  try {
    localStorage.setItem(KEY, JSON.stringify(place));
  } catch (err) {
    console.log(err);
  }
}

export function loadLastPlace() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
