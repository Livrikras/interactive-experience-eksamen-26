"use strict";

// Videoelement i projektionsvinduet
const videoElement = document.querySelector("#projectionVideo");

// Sæt videospath og afspil videoen
function showVideo(videoPath) {
  videoElement.src = videoPath;
  videoElement.play();
}

// Lyt efter beskederkommer fra hovedvinduet
window.addEventListener("message", (event) => {
  const selectedVideo = event.data.video;

  // Afspil video hvis der er videosti i besked
  if (selectedVideo) {
    showVideo(selectedVideo);
  }

  // Stop videoafspilning hvis stop-signal modtages
  if (event.data.action === "stop") {
    stopProjection();
  }
});

// Pause video, nulstil source og rediger baggrund
function stopProjection() {
  videoElement.pause();
  videoElement.src = "";
  document.body.style.backgroundColor = "#000000";
}

// Stop automatisk når videoen slutter
videoElement.addEventListener("ended", () => {
  stopProjection();
});
