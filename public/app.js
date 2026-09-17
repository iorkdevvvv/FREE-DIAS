const form = document.querySelector("#claim-form");
const userId = document.querySelector("#user-id");
const zoneId = document.querySelector("#zone-id");
const errorMessage = document.querySelector("#error-message");
const modal = document.querySelector("#video-modal");
const video = document.querySelector("#prank-video");
const closeButton = document.querySelector("#close-video");

function digitsOnly(input) {
  input.value = input.value.replace(/\D/g, "");
}

userId.addEventListener("input", () => digitsOnly(userId));
zoneId.addEventListener("input", () => digitsOnly(zoneId));

function closeSurprise() {
  modal.hidden = true;
  video.pause();
  video.currentTime = 0;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  errorMessage.textContent = "";

  if (userId.value.length < 5) {
    errorMessage.textContent = "Enter a valid User ID with at least 5 digits.";
    userId.focus();
    return;
  }

  if (zoneId.value.length < 2) {
    errorMessage.textContent = "Enter a valid Zone ID with at least 2 digits.";
    zoneId.focus();
    return;
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  video.play().catch(() => {});
});

closeButton.addEventListener("click", () => {
  closeSurprise();
  document.body.style.overflow = "";
});

modal.querySelector(".modal-backdrop").addEventListener("click", () => {
  closeSurprise();
  document.body.style.overflow = "";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeSurprise();
    document.body.style.overflow = "";
  }
});