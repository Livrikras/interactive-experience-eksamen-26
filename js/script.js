"use strict";

const videoElement = document.querySelector("#projectionVideo");

function showVideo(videoPath) {
  videoElement.src = videoPath;

  videoElement.play();
}

window.addEventListener("message", (event) => {
  const selectedVideo = event.data.video;

  if (selectedVideo) {
    showVideo(selectedVideo);
  }

  if (event.data.action === "stop") {
    stopProjection();
  }
});

function stopProjection() {
  videoElement.pause();
  videoElement.src = "";
  document.body.style.backgroundColor = "#564A45";
}

videoElement.addEventListener("ended", () => {
  stopProjection();
});
