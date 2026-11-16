const container = document.getElementById("toasts");

const ICONS = {
  success: "ti-circle-check",
  error: "ti-alert-circle",
  info: "ti-info-circle",
};

export function showToast(message, type = "info", duration = 3000) {
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `<i class="ti ${ICONS[type]}"></i><span></span>`;
  toast.querySelector("span").textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast--hide");
    setTimeout(() => toast.remove(), 250);
  }, duration);
}
